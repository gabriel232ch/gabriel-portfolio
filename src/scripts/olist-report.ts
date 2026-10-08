  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealNodes = document.querySelectorAll<HTMLElement>('[data-olist-reveal]');
  if (!reduced.matches && typeof IntersectionObserver === 'function') {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.revealState = 'entered'; observer.unobserve(entry.target); }
    }), {threshold: 0.08});
    revealNodes.forEach(node => {node.dataset.revealState = 'pending'; observer.observe(node);});
  }
  const panels = document.querySelectorAll<HTMLElement>('[data-candidate-panel]');
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-candidate-button]');
  const choose = (index: string) => {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.candidateButton === index)));
    panels.forEach(panel => { panel.hidden = panel.dataset.candidatePanel !== index; });
  };
  choose('0');
  buttons.forEach(button => button.addEventListener('click', () => choose(button.dataset.candidateButton ?? '0')));
  document.querySelectorAll<HTMLElement>('[data-line-chart]').forEach(chart => {
    const rows: string[] = JSON.parse(chart.dataset.chartRows ?? '[]');
    const range = chart.querySelector<HTMLInputElement>('[data-chart-range]');
    const readout = chart.querySelector<HTMLElement>('[data-chart-readout]');
    const update = (month: number) => {
      if (readout) readout.textContent = rows[month];
      if (range) {range.value = String(month); range.setAttribute('aria-valuetext', rows[month]);}
      const guide = chart.querySelector('[data-chart-guide]');
      guide?.setAttribute('x1', String(52 + month * 88));
      guide?.setAttribute('x2', String(52 + month * 88));
      chart.querySelectorAll<SVGElement>('[data-chart-month]').forEach(point => {point.dataset.selected = String(Number(point.dataset.chartMonth) === month);});
    };
    range?.addEventListener('input', () => update(Number(range.value)));
    chart.querySelectorAll<SVGElement>('[data-chart-month]').forEach(point => point.addEventListener('pointerenter', () => update(Number(point.dataset.chartMonth))));
    update(0);
  });
  const progress = document.querySelector<HTMLElement>('[data-olist-progress]');
  let scheduled = false;
  const updateProgress = () => {
    const denominator = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${denominator > 0 ? Math.min(1, window.scrollY / denominator) : 0})`;
    scheduled = false;
  };
  window.addEventListener('scroll', () => {if (!scheduled) {scheduled = true; requestAnimationFrame(updateProgress);}}, {passive: true});
  window.addEventListener('resize', updateProgress);
  updateProgress();
  if (typeof IntersectionObserver === 'function') {
    const links = document.querySelectorAll<HTMLAnchorElement>('.olist-report .report-index a');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');});
    }), {rootMargin:'-15% 0px -55% 0px'});
    document.querySelectorAll('.olist-report .report-section').forEach(section=>observer.observe(section));
  }
