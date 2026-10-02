export interface MotionPreference { userQuiet: boolean; systemReduced: boolean; quiet: boolean }
let userQuiet = document.documentElement.dataset.userQuiet === 'true';
const media = window.matchMedia('(prefers-reduced-motion: reduce)');
export const readMotionPreference = (): MotionPreference => ({userQuiet, systemReduced:media.matches, quiet:userQuiet || media.matches});
const sync = () => {
  const state = readMotionPreference();
  document.documentElement.dataset.quiet = String(state.quiet);
  document.documentElement.dataset.userQuiet = String(state.userQuiet);
  document.dispatchEvent(new CustomEvent('site:motion-change',{detail:state}));
};
export const setUserQuiet = (value: boolean): void => {
  userQuiet = value;
  try { localStorage.setItem('quiet-motion',String(value)); } catch { /* Current page still works. */ }
  sync();
};
media.addEventListener('change',sync);
sync();
