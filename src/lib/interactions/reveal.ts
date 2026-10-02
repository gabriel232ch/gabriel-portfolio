import {readMotionPreference} from '../motion-preference';

export function initReveal(selector: string): void {
  const nodes=[...document.querySelectorAll<HTMLElement>(selector)];
  let observer: IntersectionObserver | undefined;
  const enterAll=()=>{observer?.disconnect();nodes.forEach(node=>node.dataset.motionState='entered');};
  if(readMotionPreference().quiet || typeof IntersectionObserver!=='function') { enterAll(); return; }
  // A small positive intersection works even for a chapter taller than the viewport.
  observer=new IntersectionObserver(entries=>{
    for(const entry of entries) if(entry.isIntersecting){(entry.target as HTMLElement).dataset.motionState='entered';observer?.unobserve(entry.target);}
  },{threshold:0});
  nodes.forEach(node=>{node.dataset.motionState='pending';observer?.observe(node);});
  document.addEventListener('site:motion-change',()=>{if(readMotionPreference().quiet) enterAll();});
}
