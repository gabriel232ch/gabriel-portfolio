export function initChartSelection(chart:HTMLElement):()=>void {
  const bars=[...chart.querySelectorAll<HTMLButtonElement>('[data-chart-bar]')];
  const panel=document.createElement('div'); panel.className='chart-inspector';
  const output=document.createElement('p'); output.dataset.chartReadout='';
  const status=document.createElement('span'); status.className='visually-hidden';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  const clear=document.createElement('button');clear.type='button';clear.textContent='Clear selection';clear.disabled=true;
  panel.append(output,clear,status);chart.append(panel);
  const initial='Hover, focus, or select a value to inspect it.';
  let selected:HTMLButtonElement|undefined;
  const value=(bar:HTMLButtonElement)=>bar.dataset.readout || bar.getAttribute('aria-label') || '';
  bars.forEach(bar=>bar.dataset.readout=value(bar));
  const render=()=>{
    chart.dataset.hasSelection=String(!!selected);
    bars.forEach(bar=>{const active=bar===selected;bar.dataset.selected=String(active);bar.setAttribute('aria-pressed',String(active));});
    output.textContent=selected?value(selected):initial;clear.disabled=!selected;
  };
  const commit=(bar?:HTMLButtonElement)=>{selected=bar;render();status.textContent=bar?`Selected: ${value(bar)}`:'Selection cleared.';};
  const click=(event:MouseEvent)=>{const bar=(event.target as Element).closest<HTMLButtonElement>('[data-chart-bar]');if(bar && bars.includes(bar))commit(selected===bar?undefined:bar);};
  const preview=(event:Event)=>{const bar=(event.target as Element).closest<HTMLButtonElement>('[data-chart-bar]');if(!selected && bar && bars.includes(bar))output.textContent=value(bar);};
  const leave=()=>{if(!selected)output.textContent=initial;};
  const escape=(event:KeyboardEvent)=>{if(event.key==='Escape' && selected)commit();};
  const reset=()=>commit();
  chart.addEventListener('click',click);chart.addEventListener('pointerover',preview);chart.addEventListener('focusin',preview);chart.addEventListener('pointerleave',leave);chart.addEventListener('focusout',leave);chart.addEventListener('keydown',escape);clear.addEventListener('click',reset);render();
  return ()=>{chart.removeEventListener('click',click);chart.removeEventListener('pointerover',preview);chart.removeEventListener('focusin',preview);chart.removeEventListener('pointerleave',leave);chart.removeEventListener('focusout',leave);chart.removeEventListener('keydown',escape);clear.removeEventListener('click',reset);panel.remove();};
}
