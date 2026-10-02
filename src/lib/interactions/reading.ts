export function initReading(article:HTMLElement,contents:HTMLElement,progress?:HTMLElement):()=>void {
  const links=[...contents.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const sections=links.map(link=>document.getElementById(link.hash.slice(1)));
  const details=contents.querySelector<HTMLDetailsElement>('details');
  const desktop=matchMedia('(min-width: 1100px)');
  let frame=0;
  const layout=()=>{if(details) details.open=desktop.matches;};
  const update=()=>{
    frame=0;
    const header=document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 80;
    let index=0;
    sections.forEach((section,i)=>{if(section && section.getBoundingClientRect().top <= header+130) index=i;});
    links.forEach((link,i)=>{link.dataset.active=String(i===index);if(i===index)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    const current=contents.querySelector<HTMLElement>('[data-reading-current]');
    if(current) current.textContent=links[index]?.textContent ?? '';
    const bounds=article.getBoundingClientRect();
    const amount=Math.max(0,Math.min(1,(header-bounds.top)/Math.max(1,bounds.height-(innerHeight-header))));
    if(progress) {progress.style.transform=`scaleX(${amount})`;progress.dataset.progress=String(amount);}
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const click=(event:MouseEvent)=>{
    const link=(event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if(!link || event.metaKey || event.ctrlKey || event.shiftKey || event.button !==0) return;
    if(details && !desktop.matches)details.open=false;
    const target=document.getElementById(link.hash.slice(1));
    const heading=target?.matches('h1,h2,h3')?target:target?.querySelector<HTMLElement>('h1,h2,h3');
    if(heading instanceof HTMLElement) {heading.tabIndex=-1;setTimeout(()=>{heading.focus({preventScroll:true});update();},0);}
  };
  const key=(event:KeyboardEvent)=>{if(event.key==='Escape' && details?.open && !desktop.matches){details.open=false;details.querySelector('summary')?.focus();}};
  article.addEventListener('toggle',schedule,true);contents.addEventListener('click',click);contents.addEventListener('keydown',key);window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);desktop.addEventListener('change',layout);layout();update();
  return ()=>{cancelAnimationFrame(frame);article.removeEventListener('toggle',schedule,true);contents.removeEventListener('click',click);contents.removeEventListener('keydown',key);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);desktop.removeEventListener('change',layout);};
}
