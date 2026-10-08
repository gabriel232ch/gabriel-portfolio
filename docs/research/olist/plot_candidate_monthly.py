"""Plot validated aggregate monthly outcomes; no raw records are read."""
from pathlib import Path
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import PercentFormatter

directory=Path(__file__).parent/'2026-10-05-raw-followup'
data=pd.read_csv(directory/'candidate_monthly.csv')
keys=[('watches_gifts','RJ'),('bed_bath_table','RJ'),('bed_bath_table','MG'),('office_furniture','SP'),('sports_leisure','RJ'),('computers_accessories','RJ')]
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':10,'axes.spines.top':False,'axes.spines.right':False})
fig,axes=plt.subplots(2,3,figsize=(13,8),sharey=True)
for ax,(category,state) in zip(axes.flat,keys):
    g=data[data.category_name.eq(category)&data.customer_state.eq(state)].sort_values('cohort')
    assert len(g)==8
    months=g.cohort.str[-2:].astype(int)
    overall=g.on_time.sum()/g.eligible.sum()
    ax.axvspan(.7,3.5,color='#eee9e0',zorder=0)
    ax.axhline(overall,color='#a6a09a',ls='--',lw=1.2)
    ax.plot(months,g.on_time_rate,color='#235a70',lw=2,marker='o',ms=5)
    ax.set_title(f'{category} × {state}',loc='left',fontsize=11,pad=12)
    ax.set_xticks(range(1,9),['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'])
    ax.set_ylim(0,1.06)
    ax.yaxis.set_major_formatter(PercentFormatter(1))
    ax.grid(axis='y',alpha=.18)
    ax.text(.02,.06,'Eligible n: '+', '.join(str(int(n)) for n in g.eligible),transform=ax.transAxes,fontsize=8,color='#555')
    ax.text(.02,.14,f'Jan–Aug: {overall:.1%}',transform=ax.transAxes,fontsize=9,color='#777')
for ax in axes[:,0]: ax.set_ylabel('On-time delivery rate')
fig.suptitle('The six historical Fix candidates followed different monthly paths',x=.07,ha='left',fontsize=17,y=.98)
fig.text(.07,.93,'2018 purchase cohorts · Delivered orders eligible for on-time measurement',fontsize=11,color='#555')
fig.text(.07,.055,'Solid line: monthly rate. Dashed line: Jan–Aug rate. Shading: Jan–Mar descriptive window.',fontsize=10,color='#444')
fig.text(.07,.03,'Small monthly samples can fluctuate; these plots do not establish intervention effects or new classifications.',fontsize=9,color='#555')
fig.subplots_adjust(left=.07,right=.98,top=.86,bottom=.13,hspace=.32,wspace=.15)
for extension in ['png','pdf']:
    fig.savefig(directory/f'candidate_monthly_on_time.{extension}',dpi=160,facecolor='white')
plt.close(fig)
