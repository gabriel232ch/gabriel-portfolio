import {readMotionPreference} from '../motion-preference';

export function initReveal(selector: string): void {
  const nodes=[...document.querySelectorAll<HTMLElement>(selector)];
  const holder: {observer?: IntersectionObserver} = {};
  const enterAll=()=>{holder.observer?.disconnect();nodes.forEach(node=>node.dataset.motionState='entered');};
  if(readMotionPreference().quiet || typeof IntersectionObserver!=='function') { enterAll(); return; }
  // A small positive intersection works even for a chapter taller than the viewport.
  // Assigned once after the fallback guard.
  holder.observer=new IntersectionObserver(entries=>{
    for(const entry of entries) if(entry.isIntersecting){(entry.target as HTMLElement).dataset.motionState='entered';holder.observer?.unobserve(entry.target);}
  },{threshold:0});
  nodes.forEach(node=>{node.dataset.motionState='pending';holder.observer?.observe(node);});
  document.addEventListener('site:motion-change',()=>{if(readMotionPreference().quiet) enterAll();});
}
