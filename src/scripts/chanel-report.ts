export {};
const motionNodes = document.querySelectorAll<HTMLElement>('[data-report-motion]');
  const progress = document.querySelector<HTMLElement>('[data-report-progress]');
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.report-index a')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || typeof IntersectionObserver !== 'function') {
    motionNodes.forEach((node) => {
      node.dataset.motionState = 'entered';
    });
  } else {
    motionNodes.forEach((node) => {
      node.dataset.motionState = 'pending';
    });

    const motionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          node.dataset.motionState = 'entered';
          motionObserver.unobserve(node);
        });
      },
      { threshold: 0.12 },
    );

    motionNodes.forEach((node) => motionObserver.observe(node));
  }

  const updateProgress = () => {
    if (!progress) return;
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollRange > 0 ? window.scrollY / scrollRange : 0;
    progress.style.transform = 'scaleX(' + amount + ')';
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  document.querySelectorAll<HTMLElement>('[data-interactive-chart]').forEach((chart) => {
    const bars = [...chart.querySelectorAll<HTMLButtonElement>('[data-chart-bar]')];
    const clearSelection = () => {
      chart.removeAttribute('data-has-selection');
      bars.forEach((bar) => {
        bar.dataset.selected = 'false';
        bar.setAttribute('aria-pressed', 'false');
      });
    };

    bars.forEach((bar) => {
      bar.addEventListener('click', (event) => {
        event.stopPropagation();
        const wasSelected = bar.dataset.selected === 'true';
        bars.forEach((item) => {
          const isSelected = item === bar && !wasSelected;
          item.dataset.selected = String(isSelected);
          item.setAttribute('aria-pressed', String(isSelected));
        });

        if (wasSelected) chart.removeAttribute('data-has-selection');
        else chart.dataset.hasSelection = 'true';
      });
    });

    chart.addEventListener('click', clearSelection);
  });

  if (typeof IntersectionObserver === 'function') {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const activeId = entry.target.id;
          links.forEach((link) => {
            const isActive = link.getAttribute('href') === '#' + activeId;
            link.dataset.active = String(isActive);
            if (isActive) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-18% 0px -65% 0px', threshold: 0 },
    );

    links.forEach((link) => {
      const id = link.getAttribute('href')?.slice(1);
      const section = id ? document.getElementById(id) : null;
      if (section) sectionObserver.observe(section);
    });
  }

interface TrajectoryRecord { year: number; x: number; metrics: { label: string; value: string; index: string; position: number }[] }
document.querySelectorAll<HTMLElement>('[data-chanel-trajectory]').forEach((chart) => {
  const records = JSON.parse(chart.dataset.records || '[]') as TrajectoryRecord[];
  const years = [...chart.querySelectorAll<HTMLButtonElement>('[data-trajectory-year]')];
  const guide = chart.querySelector<SVGLineElement>('[data-trajectory-guide]');
  const activate = (index: number) => {
    const row = records[index];
    if (!row) return;
    years.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    guide?.setAttribute('x1', String(row.x));
    guide?.setAttribute('x2', String(row.x));
    const label = chart.querySelector('[data-trajectory-label]');
    if (label) label.textContent = (chart.classList.contains('chanel-viz--price') ? '' : 'FY') + row.year;
    row.metrics.forEach((metric, i) => {
      const value = chart.querySelector(`[data-trajectory-value="${i}"]`);
      const indexValue = chart.querySelector(`[data-trajectory-index="${i}"]`);
      if (value) value.textContent = metric.value;
      if (indexValue) indexValue.textContent = metric.index;
      const point = chart.querySelector(`[data-trajectory-focus="${i}"]`);
      point?.setAttribute('cx', String(row.x));
      point?.setAttribute('cy', String(metric.position));
    });
  };
  let selectedYear = records.length - 1;
  years.forEach((button, i) => button.addEventListener('click', () => { selectedYear = i; activate(i); }));
  chart.querySelectorAll<SVGCircleElement>('[data-trajectory-observation]').forEach(point => {
    const inspect = () => activate(Number(point.dataset.trajectoryObservation));
    point.addEventListener('pointermove', inspect);
    point.addEventListener('pointerleave', () => activate(selectedYear));
    point.addEventListener('click', () => { selectedYear = Number(point.dataset.trajectoryObservation); activate(selectedYear); });
  });
  chart.querySelectorAll<HTMLButtonElement>('[data-trajectory-series]').forEach((button) => button.addEventListener('click', () => {
    const selected = button.dataset.trajectorySeries;
    chart.querySelectorAll<HTMLButtonElement>('[data-trajectory-series]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    chart.querySelectorAll<SVGGElement>('[data-trajectory-line]').forEach(line => {
      line.dataset.muted = String(selected !== 'all' && line.dataset.trajectoryLine !== selected);
    });
  }));
});

document.querySelectorAll<HTMLElement>('[data-chanel-recovery]').forEach((chart) => {
  let group = 'region';
  let period = '2';
  const readout = chart.querySelector('[data-recovery-readout]');
  const update = () => {
    chart.querySelectorAll<HTMLElement>('[data-recovery-panel]').forEach(panel => {
      panel.hidden = panel.dataset.recoveryPanel !== `${group}-${period}`;
      if (!panel.hidden) {
        const first = panel.querySelector<HTMLButtonElement>('[data-recovery-row]');
        if (readout) readout.textContent = first?.dataset.readout || '';
      }
    });
    chart.querySelectorAll<HTMLButtonElement>('[data-recovery-group]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.recoveryGroup === group)));
    chart.querySelectorAll<HTMLButtonElement>('[data-recovery-period]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.recoveryPeriod === period)));
    chart.querySelectorAll<HTMLButtonElement>('[data-recovery-row]').forEach(b => b.setAttribute('aria-pressed', 'false'));
  };
  chart.querySelectorAll<HTMLButtonElement>('[data-recovery-group]').forEach(b => b.addEventListener('click', () => {group = b.dataset.recoveryGroup || 'region';update();}));
  chart.querySelectorAll<HTMLButtonElement>('[data-recovery-period]').forEach(b => b.addEventListener('click', () => {period = b.dataset.recoveryPeriod || '2';update();}));
  chart.querySelectorAll<HTMLButtonElement>('[data-recovery-row]').forEach(b => b.addEventListener('click', () => {
    chart.querySelectorAll<HTMLButtonElement>('[data-recovery-row]').forEach(row => row.setAttribute('aria-pressed', String(row === b)));
    if (readout) readout.textContent = b.dataset.readout || '';
  }));
});

document.querySelectorAll<HTMLElement>('.chanel-bridge').forEach(chart => {
  const all = chart.querySelector<HTMLButtonElement>('[data-bridge-all]');
  const initialReadout = chart.querySelector('[data-bridge-readout]')?.textContent || '';
  all?.addEventListener('click', () => {
    all.setAttribute('aria-pressed', 'true');
    chart.querySelectorAll<HTMLButtonElement>('[data-bridge-step]').forEach(b => b.setAttribute('aria-pressed', 'false'));
    chart.querySelectorAll<SVGGElement>('.chanel-bridge__step').forEach(step => step.dataset.muted = 'false');
    const readout = chart.querySelector('[data-bridge-readout]');
    if (readout) readout.textContent = initialReadout;
  });
  chart.querySelectorAll<HTMLButtonElement>('[data-bridge-step]').forEach((button,i) => button.addEventListener('click', () => {
    all?.setAttribute('aria-pressed', 'false');
    chart.querySelectorAll<HTMLButtonElement>('[data-bridge-step]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    chart.querySelectorAll<SVGGElement>('.chanel-bridge__step').forEach((step,si) => step.dataset.muted = String(i !== si));
    const readout = chart.querySelector('[data-bridge-readout]');
    if (readout) readout.textContent = button.dataset.readout || '';
  }));
});

// Enter once; content and exact data remain available without animation or JavaScript.
const revealNodes = document.querySelectorAll<HTMLElement>('[data-chanel-reveal], .chanel-report .report-section > h2, .chanel-report .report-hero__main');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches && typeof IntersectionObserver === 'function') {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      (entry.target as HTMLElement).dataset.chanelVisible = 'true';
      revealObserver.unobserve(entry.target);
    });
  }, {threshold: 0.08});
  revealNodes.forEach(node => {node.dataset.chanelVisible = 'false';revealObserver.observe(node);});
  motionPreference.addEventListener('change', () => {
    if (!motionPreference.matches) return;
    revealObserver.disconnect();
    revealNodes.forEach(node => node.dataset.chanelVisible = 'true');
  });
}

// Selection adds an exact readout instead of only dimming the other marks.
document.querySelectorAll<HTMLElement>('.chanel-report [data-interactive-chart]').forEach(chart => {
  const output = document.createElement('p');
  output.className = 'chanel-selection-readout';
  output.setAttribute('aria-live', 'polite');
  output.textContent = 'Select a mark to inspect the observation.';
  chart.append(output);
  chart.querySelectorAll<HTMLButtonElement>('[data-chart-bar]').forEach(button => button.addEventListener('click', () => {
    output.textContent = button.dataset.selected === 'true' ? button.getAttribute('aria-label') || '' : 'Select a mark to inspect the observation.';
  }));
  chart.addEventListener('click', event => {
    if (!(event.target instanceof Element) || !event.target.closest('[data-chart-bar]')) output.textContent = 'Select a mark to inspect the observation.';
  });
});
