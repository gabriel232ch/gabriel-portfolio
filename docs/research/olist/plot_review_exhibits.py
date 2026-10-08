"""Plot research review exhibits using aggregate CSVs only.

Requires pandas and matplotlib; SOURCE_PROJECT is the sole CLI argument.
"""
from pathlib import Path
import sys, hashlib, json
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import PercentFormatter

source=Path(sys.argv[1])
directory=Path(__file__).parent/'2026-10-05-raw-followup'
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':10,'axes.spines.top':False,'axes.spines.right':False})
blue,orange='#235a70','#b96b37'

def save(fig,name):
    for ext in ['png','pdf']:
        fig.savefig(directory/f'{name}.{ext}',dpi=160,facecolor='white')
    plt.close(fig)

p=source/'dashboard/data/monthly_trend.csv'
monthly=pd.read_csv(p)
monthly['year']=monthly.purchase_month.str[:4].astype(int)
monthly['month']=monthly.purchase_month.str[5:7].astype(int)
monthly=monthly[monthly.month.le(8)]
monthly.to_csv(directory/'monthly_trend_matched.csv',index=False)
fig,axes=plt.subplots(1,2,figsize=(12,5.2))
for ax,field,title in zip(axes,['on_time_rate','low_review_rate'],['On-time delivery','Low-review incidence (scores 1–2)']):
    for year,color in [(2017,blue),(2018,orange)]:
        g=monthly[monthly.year.eq(year)].sort_values('month')
        assert len(g)==8
        ax.plot(g.month,g[field],marker='o',lw=2,label=str(year),color=color)
    ax.set_title(title,loc='left',pad=12)
    ax.set_xticks(range(1,9),['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'])
    ax.yaxis.set_major_formatter(PercentFormatter(1));ax.grid(axis='y',alpha=.18)
    ax.set_ylim((.75,1.01) if field=='on_time_rate' else (0,.25))
    ax.legend(frameon=False)
fig.suptitle('The aggregate decline was uneven across purchase months',x=.07,ha='left',fontsize=16,y=.98)
fig.text(.07,.91,'Matched Jan–Aug purchase cohorts · Delivered commercial orders',color='#555')
fig.text(.07,.075,'On-time denominator: eligible delivered orders. Low-review denominator: orders with a selected review.',fontsize=9,color='#555')
fig.text(.07,.035,'The two metrics use different vertical scales. Monthly co-movement does not establish causation.',fontsize=9,color='#555')
fig.subplots_adjust(left=.07,right=.98,top=.8,bottom=.2,wspace=.22)
save(fig,'marketplace_monthly_comparison')

timing=pd.read_csv(directory/'review_timing.csv').set_index('band')
pre=pd.read_csv(directory/'review_before_delivery.csv').set_index('band')
post=pd.read_csv(directory/'review_after_delivery.csv').set_index('band')
bands=['late1_2','late3_7','late8plus'];labels=['1–2 days late','3–7 days late','8+ days late']
t=timing.loc[bands];b=pre.loc[bands];a=post.loc[bands]
assert (b.reviewed+a.reviewed).eq(t.reviewed).all()
assert b.reviewed.eq(t.answered_before_delivery).all()
y=np.arange(3);before=b.reviewed/t.reviewed;after=a.reviewed/t.reviewed
fig,axes=plt.subplots(1,2,figsize=(13,5.6))
ax=axes[0]
ax.barh(y,before,color=blue,height=.55,label='Answered before receipt')
ax.barh(y,after,left=before,color='#c9d4d8',height=.55,label='Answered after receipt')
for i,(share,total) in enumerate(zip(before,t.reviewed)):
    ax.text(.015,i,f'{share:.1%} before receipt',va='center',color='white' if share>.5 else '#222',fontsize=10)
    ax.text(1.02,i,f'n={int(total):,}',va='center',fontsize=9)
ax.set_yticks(y,labels);ax.invert_yaxis();ax.set_xlim(0,1.2)
ax.set_xticks([0,.25,.5,.75,1]);ax.xaxis.set_major_formatter(PercentFormatter(1))
ax.set_title('When was the selected review answered?',loc='left',pad=15)
ax.legend(frameon=False,loc='lower left',bbox_to_anchor=(0,-.27),fontsize=9)
ax=axes[1]
ax.barh(y-.15,b.low_review_rate,height=.28,color=blue,label='Before receipt')
ax.barh(y+.15,a.low_review_rate,height=.28,color=orange,label='After receipt')
for i in range(3):
    for offset,row in [(-.15,b.iloc[i]),(.15,a.iloc[i])]:
        ax.text(row.low_review_rate+.012,i+offset,f'{row.low_review_rate:.1%} · n={int(row.reviewed):,}',va='center',fontsize=9)
ax.set_yticks(y,labels);ax.invert_yaxis();ax.set_xlim(0,1.15)
ax.set_xticks([0,.25,.5,.75,1]);ax.xaxis.set_major_formatter(PercentFormatter(1))
ax.set_title('Low-review rates in different subpopulations',loc='left',pad=15)
ax.legend(frameon=False,loc='lower left',bbox_to_anchor=(0,-.27),fontsize=9)
fig.suptitle('Final delay bands include reviews answered before receipt',x=.06,ha='left',fontsize=16,y=.98)
fig.text(.06,.91,'2018 Jan–Aug purchase cohorts · One selected review per eligible delivered order',color='#555')
fig.text(.06,.065,'Before/after groups contain different orders. Their rates do not measure the effect of receiving a delivery.',fontsize=9,color='#555')
fig.text(.06,.025,'Only 45 reviews in the 8+ days late group were answered after receipt; interpret that subgroup cautiously.',fontsize=9,color='#555')
fig.subplots_adjust(left=.115,right=.96,top=.8,bottom=.25,wspace=.39)
save(fig,'review_timing_comparison')
(directory/'exhibit_sources.json').write_text(json.dumps({'monthly_source':str(p),'monthly_source_sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'monthly_plot_rows':len(monthly),'timing_sources':['review_timing.csv','review_before_delivery.csv','review_after_delivery.csv'],'plot_script':'plot_review_exhibits.py'},indent=2))
