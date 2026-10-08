"""Read-only validation of supplied Olist CSVs; emit aggregate evidence only.

Run with bundled Python: script SOURCE_PROJECT OUTPUT_DIRECTORY.
Order-grain outcomes, item-grain GMV, and distinct category-order bridges
follow the original SQL. No source CSV, database or page is modified.
"""
from pathlib import Path
import sys, hashlib, json, re
import pandas as pd
import numpy as np

source, out = map(Path, sys.argv[1:3])
out.mkdir(parents=True, exist_ok=True)
raw = source / 'data/raw'
manifest = (source / 'docs/DATA_MANIFEST.md').read_text()
hashes = {}
for p in sorted(raw.glob('*.csv')):
    h = hashlib.sha256(p.read_bytes()).hexdigest()
    assert re.search(r'`' + re.escape(p.name) + r'`.*`' + h + r'`', manifest), p.name
    hashes[p.name] = h

def read(name, **kw):
    return pd.read_csv(raw / name, **kw)

orders = read('olist_orders_dataset.csv')
customers = read('olist_customers_dataset.csv', usecols=['customer_id','customer_state'])
items = read('olist_order_items_dataset.csv')
products = read('olist_products_dataset.csv', usecols=['product_id','product_category_name'])
sellers = read('olist_sellers_dataset.csv', usecols=['seller_id','seller_state'])
translation = read('product_category_name_translation.csv')
reviews = read('olist_order_reviews_dataset.csv', usecols=['order_id','review_id','review_score','review_creation_date','review_answer_timestamp'])
for df, key in [(orders,'order_id'), (customers,'customer_id'), (products,'product_id'), (sellers,'seller_id'), (translation,'product_category_name')]:
    assert df[key].is_unique
assert not items.duplicated(['order_id','order_item_id']).any()
for c in ['order_purchase_timestamp','order_delivered_customer_date','order_estimated_delivery_date']:
    orders[c] = pd.to_datetime(orders[c])
for c in ['review_creation_date','review_answer_timestamp']:
    reviews[c] = pd.to_datetime(reviews[c])
# PostgreSQL DESC defaults to NULLS FIRST; retain that convention explicitly.
selected = reviews.sort_values(['order_id','review_answer_timestamp','review_creation_date','review_id'], ascending=[True,False,False,False], na_position='first').drop_duplicates('order_id')
assert selected.order_id.is_unique
items = items.merge(products, on='product_id', validate='many_to_one').merge(translation, on='product_category_name', how='left', validate='many_to_one').merge(sellers, on='seller_id', validate='many_to_one')
assert len(items)==112650
items['category_name'] = items.product_category_name_english.fillna('[unmapped] '+items.product_category_name).fillna('[unknown]')
items['gmv_cents'] = (items.price*100).round().astype('int64')
item_summary = items.groupby('order_id').agg(gmv_cents=('gmv_cents','sum'), seller_count=('seller_id','nunique'),category_count=('category_name','nunique'))
o = orders.merge(customers, on='customer_id', validate='many_to_one').merge(item_summary, on='order_id', how='left', validate='one_to_one').merge(selected, on='order_id', how='left', validate='one_to_one')
o['commercial'] = o.order_status.eq('delivered') & o.gmv_cents.notna()
o['eligible'] = o.commercial & o.order_delivered_customer_date.notna() & o.order_estimated_delivery_date.notna() & o.order_delivered_customer_date.ge(o.order_purchase_timestamp)
o['days'] = (o.order_delivered_customer_date.dt.normalize()-o.order_estimated_delivery_date.dt.normalize()).dt.days
o['on_time'] = o.days.le(0)
o['reviewed'] = o.review_score.notna()
o['low'] = o.review_score.le(2)
o['year'] = o.order_purchase_timestamp.dt.year
o['month'] = o.order_purchase_timestamp.dt.month
o['cohort'] = o.order_purchase_timestamp.dt.strftime('%Y-%m')
matched = o[o.commercial & o.year.isin([2017,2018]) & o.month.le(8)].copy()
baseline=[]
expected = pd.read_csv(source/'dashboard/data/executive_kpis.csv')
for year, group in matched.groupby('year'):
    e = group[group.eligible]; r=group[group.reviewed]
    result={'year':int(year),'orders':len(group),'gmv_cents':int(group.gmv_cents.sum()),'eligible':len(e),'on_time':int(e.on_time.sum()),'reviewed':len(r),'low':int(r.low.sum())}
    saved = expected[expected.yoy_comparison_period.str.startswith(str(year))].iloc[0]
    for key,field in [('orders','delivered_orders'),('eligible','on_time_eligible_orders'),('on_time','on_time_orders'),('reviewed','reviewed_orders'),('low','low_review_orders')]:
        assert result[key]==int(saved[field]), (year,key)
    assert result['gmv_cents']==round(saved.delivered_gmv_proxy*100)
    baseline.append(result)

# State is mutually exclusive at order grain. All states occur in both years.
state=matched[matched.eligible].groupby(['year','customer_state']).agg(n=('order_id','size'),on_time=('on_time','sum')).reset_index()
state.to_csv(out/'state_period.csv',index=False)
prior=state[state.year.eq(2017)].set_index('customer_state'); current=state[state.year.eq(2018)].set_index('customer_state')
assert set(prior.index)==set(current.index)
current=current.reindex(prior.index)
w0=prior.n/prior.n.sum(); w1=current.n/current.n.sum(); r0=prior.on_time/prior.n; r1=current.on_time/current.n
decomp=pd.DataFrame({'prior_orders':prior.n,'current_orders':current.n,'prior_rate':r0,'current_rate':r1,'within_state_pp':(w0+w1)/2*(r1-r0)*100,'state_mix_pp':(r0+r1)/2*(w1-w0)*100})
delta=(current.on_time.sum()/current.n.sum()-prior.on_time.sum()/prior.n.sum())*100
assert abs(delta-decomp.within_state_pp.sum()-decomp.state_mix_pp.sum())<1e-10
decomp.to_csv(out/'state_decomposition.csv')

bridge=items[['order_id','category_name','seller_state','seller_id']].drop_duplicates()
category=bridge[['order_id','category_name']].drop_duplicates().merge(matched,on='order_id',validate='many_to_one')
saved=pd.read_csv(source/'dashboard/data/category_state.csv')
fix=saved[saved.action_posture.eq('Fix before growth')][['category_name','customer_state']]
focus=pd.concat([fix,saved[saved.action_posture.isin(['Grow','Defend']) & saved.segment_label.isin(['stationery × SP','housewares × MG','health_beauty × SP'])][['category_name','customer_state']]])
targets=category.merge(focus,on=['category_name','customer_state'],validate='many_to_one')
targets=targets[targets.year.eq(2018)].copy()
targets['eligible_on']=targets.eligible & targets.on_time
targets['reviewed_low']=targets.reviewed & targets.low
monthly=targets.groupby(['category_name','customer_state','cohort']).agg(orders=('order_id','size'),eligible=('eligible','sum'),on_time=('eligible_on','sum'),reviewed=('reviewed','sum'),low=('reviewed_low','sum')).reset_index()
monthly['on_time_rate']=monthly.on_time/monthly.eligible
monthly['low_review_rate']=monthly.low/monthly.reviewed
monthly.to_csv(out/'candidate_monthly.csv',index=False)
targets['window']=np.where(targets.month.le(3),'Jan–Mar','Apr–Aug')
windows=targets.groupby(['category_name','customer_state','window']).agg(orders=('order_id','size'),eligible=('eligible','sum'),on_time=('eligible_on','sum'),reviewed=('reviewed','sum'),low=('reviewed_low','sum')).reset_index()
windows['on_time_rate']=windows.on_time/windows.eligible;windows['low_review_rate']=windows.low/windows.reviewed
windows.to_csv(out/'candidate_windows.csv',index=False)
for key,g in monthly.groupby(['category_name','customer_state']):
    e=saved[saved.category_name.eq(key[0]) & saved.customer_state.eq(key[1])].iloc[0]
    assert g.orders.sum()==e.current_orders
    assert g.eligible.sum()==e.current_on_time_eligible_orders
    assert abs(g.on_time.sum()/g.eligible.sum()-e.current_on_time_rate)<1e-12
    assert abs(g.low.sum()/g.reviewed.sum()-e.current_low_review_rate)<1e-12

# Diagnose actual intersection: an order can touch multiple seller origins.
sp_orders=set(bridge.loc[bridge.seller_state.eq('SP'),'order_id'])
targets['has_SP_seller']=targets.order_id.isin(sp_orders)
targets['late']=targets.eligible & ~targets.on_time
targets['SP_late']=targets.late & targets.has_SP_seller
intersections=targets.groupby(['category_name','customer_state']).agg(orders=('order_id','size'),orders_with_SP_seller=('has_SP_seller','sum'),late=('late','sum'),late_with_SP_seller=('SP_late','sum')).reset_index()
intersections.to_csv(out/'candidate_SP_origin.csv',index=False)

# Timing is not restricted in the original selected-review metric.
v=matched[matched.year.eq(2018) & matched.eligible].copy()
v['band']=np.select([v.days.le(-7),v.days.between(-6,0),v.days.between(1,2),v.days.between(3,7)],['early7','early6_to_due','late1_2','late3_7'],default='late8plus')
v['creation_before_delivery_day']=v.review_creation_date.dt.normalize().lt(v.order_delivered_customer_date.dt.normalize())
v['answer_before_delivery']=v.review_answer_timestamp.lt(v.order_delivered_customer_date)
v['answer_before_due_day']=v.review_answer_timestamp.dt.normalize().lt(v.order_estimated_delivery_date.dt.normalize())
v['answer_after_delivery']=v.review_answer_timestamp.ge(v.order_delivered_customer_date)
rv=v[v.reviewed].copy()
timing=rv.groupby('band').agg(reviewed=('order_id','size'),low=('low','sum'),created_before_delivery_day=('creation_before_delivery_day','sum'),answered_before_delivery=('answer_before_delivery','sum'),answered_before_due_day=('answer_before_due_day','sum'))
timing.to_csv(out/'review_timing.csv')
post=rv[rv.answer_after_delivery].groupby('band').agg(reviewed=('order_id','size'),low=('low','sum'))
post['low_review_rate']=post.low/post.reviewed;post.to_csv(out/'review_after_delivery.csv')
pre=rv[rv.answer_before_delivery].groupby('band').agg(reviewed=('order_id','size'),low=('low','sum'))
pre['low_review_rate']=pre.low/pre.reviewed;pre.to_csv(out/'review_before_delivery.csv')
bands=v.groupby('band').agg(orders=('order_id','size'),reviewed=('reviewed','sum'),low=('low','sum'))
band_mapping={'early7':'early_7_plus_days','early6_to_due':'on_time_within_6_days','late1_2':'late_1_2_days','late3_7':'late_3_7_days','late8plus':'late_8_plus_days'}
saved_bands=pd.read_csv(source/'dashboard/data/delay_band.csv').set_index('delay_band')
for key,g in bands.iterrows():
    e=saved_bands.loc[band_mapping[key]]
    assert tuple(g)==(e.delivered_orders,e.reviewed_orders,e.low_review_orders)

# Unique category and single seller make conditioning keys unambiguous.
cat_one=bridge[['order_id','category_name']].drop_duplicates()
cat_one=cat_one[~cat_one.order_id.duplicated(keep=False)]
seller_one=bridge[['order_id','seller_id','seller_state']].drop_duplicates()
seller_one=seller_one[~seller_one.order_id.duplicated(keep=False)]
cx=rv[(rv.days.le(0)|rv.days.ge(3))].copy()
cx['severe']=cx.days.ge(3)
cx=cx.merge(cat_one,on='order_id',how='left',validate='one_to_one').merge(seller_one,on='order_id',how='left',validate='one_to_one')
cx['route']=cx.seller_state+'→'+cx.customer_state

def comparison(frame,keys,label):
    f=frame.dropna(subset=keys).copy()
    g=f.groupby(keys+['severe']).agg(n=('order_id','size'),low=('low','sum')).reset_index()
    counts=g.pivot(index=keys,columns='severe',values='n').reindex(columns=[False,True]).fillna(0)
    lows=g.pivot(index=keys,columns='severe',values='low').reindex(columns=[False,True]).fillna(0)
    keep=(counts[False]>=5)&(counts[True]>=5)
    c=counts[keep];l=lows[keep];weights=c.sum(axis=1)/c.to_numpy().sum()
    normal=(weights*l[False]/c[False]).sum();severe=(weights*l[True]/c[True]).sum()
    return {'comparison':label,'strata':int(keep.sum()),'nonlate_orders':int(c[False].sum()),'severe_orders':int(c[True].sum()),'eligible_nonlate_before_overlap':int((~f.severe).sum()),'eligible_severe_before_overlap':int(f.severe.sum()),'standardized_nonlate_low':float(normal),'standardized_severe_low':float(severe),'gap_pp':float((severe-normal)*100)}

adjusted=[]
for keys,label in [(['category_name'],'category'),(['route'],'single_seller_route'),(['seller_id'],'single_seller'),(['cohort'],'month'),(['category_name','route','cohort'],'category_route_month')]:
    adjusted.append(comparison(cx,keys,label))
    adjusted.append(comparison(cx[cx.answer_after_delivery],keys,label+'_answered_after_delivery'))
pd.DataFrame(adjusted).to_csv(out/'conditional_review_comparison.csv',index=False)
summary={'source':str(source),'hashes':hashes,'baseline':baseline,'state_decomposition':{'overall_delta_pp':delta,'within_state_pp':float(decomp.within_state_pp.sum()),'state_mix_pp':float(decomp.state_mix_pp.sum()),'current_at_prior_state_weights':float((w0*r1).sum())},'review_comparisons':adjusted,'timing':timing.reset_index().to_dict('records')}
(out/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2))
print(json.dumps(summary,ensure_ascii=False,indent=2))
print('\nCANDIDATE WINDOWS\n',windows.to_string(index=False))
