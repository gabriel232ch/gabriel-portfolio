import { SITE_RESEARCH } from '../../data/site-navigation';
export function initNavigation(root: HTMLElement): () => void {
  const details = root.querySelector<HTMLDetailsElement>('details');
  const summary = details?.querySelector('summary');
  const current = root.querySelector<HTMLElement>('[data-current-chapter]');
  const hero = document.querySelector('.home-hero');
  const chapters = [...SITE_RESEARCH.map(item => ({id:item.id,label:item.shortTitle})), {id:'about',label:'Now'}];
  let frame = 0;
  const update = () => {
    frame = 0;
    root.dataset.compact = String(!!hero && hero.getBoundingClientRect().bottom <= root.getBoundingClientRect().bottom);
    const boundary = root.getBoundingClientRect().bottom + 100;
    const active = chapters.filter(c => (document.getElementById(c.id)?.getBoundingClientRect().top ?? Infinity) <= boundary).at(-1);
    if (current) current.textContent = active?.label ?? 'Work';
  };
  const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
  const key = (event: KeyboardEvent) => { if (event.key === 'Escape' && details?.open) { details.open=false; summary?.focus(); } };
  const click = (event: MouseEvent) => {
    if (!details?.open) return;
    const target = event.target as Element;
    const link = target.closest<HTMLAnchorElement>('[data-chapter-link]');
    if (link && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
      details.open=false;
      const section = document.getElementById(link.hash.slice(1));
      const heading = section?.matches('h1,h2,h3') ? section : section?.querySelector<HTMLElement>('h1,h2,h3');
      if (heading instanceof HTMLElement) { heading.tabIndex=-1; setTimeout(() => heading.focus({preventScroll:true}), 0); }
    } else if (!details.contains(target)) details.open=false;
  };
  window.addEventListener('scroll',scroll,{passive:true}); window.addEventListener('resize',scroll);
  document.addEventListener('keydown',key); document.addEventListener('click',click); update();
  return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll',scroll); window.removeEventListener('resize',scroll); document.removeEventListener('keydown',key); document.removeEventListener('click',click); };
}
