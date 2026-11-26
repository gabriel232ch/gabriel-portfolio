import { runViewTransition } from './modern-web';

const motionNodes = document.querySelectorAll<HTMLElement>('[data-report-motion]');
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

interface TrajectoryRecord {
  year: number;
  x: number;
  metrics: { label: string; value: string; index: string; position: number }[];
}

document.querySelectorAll<HTMLElement>('[data-chanel-trajectory]').forEach((chart) => {
  const records = JSON.parse(chart.dataset.records || '[]') as TrajectoryRecord[];
  const years = [...chart.querySelectorAll<HTMLButtonElement>('[data-trajectory-year]')];
  const guide = chart.querySelector<SVGLineElement>('[data-trajectory-guide]');
  const plot = chart.querySelector<SVGSVGElement>('[data-trajectory-plot]');
  let activeYear = records.length - 1;

  const activate = (index: number) => {
    if (index === activeYear) return;
    const row = records[index];
    if (!row) return;
    activeYear = index;
    years.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    guide?.setAttribute('x1', String(row.x));
    guide?.setAttribute('x2', String(row.x));
    const label = chart.querySelector('[data-trajectory-label]');
    if (label) {
      label.textContent = (chart.classList.contains('chanel-viz--price') ? '' : 'FY') + row.year;
    }
    row.metrics.forEach((metric, i) => {
      const value = chart.querySelector(`[data-trajectory-value="${i}"]`);
      const indexValue = chart.querySelector(`[data-trajectory-index="${i}"]`);
      if (value) value.textContent = metric.value;
      if (indexValue) indexValue.textContent = metric.index;
      const point = chart.querySelector(`[data-trajectory-focus="${i}"]`);
      point?.setAttribute('cx', String(row.x));
      point?.setAttribute('cy', String(metric.position));
      const halo = chart.querySelector(`[data-trajectory-halo="${i}"]`);
      halo?.setAttribute('cx', String(row.x));
      halo?.setAttribute('cy', String(metric.position));
    });
  };

  let selectedYear = records.length - 1;
  years.forEach((button, i) =>
    button.addEventListener('click', () => {
      selectedYear = i;
      activate(i);
    }),
  );

  // Full-column hover zones with pointerleave ONLY on the plot SVG (prevents node-under-cursor oscillation)
  chart.querySelectorAll<SVGElement>('[data-trajectory-observation]').forEach((zone) => {
    const idx = Number(zone.dataset.trajectoryObservation);
    zone.addEventListener('pointerenter', () => activate(idx));
    zone.addEventListener('click', () => {
      selectedYear = idx;
      activate(selectedYear);
    });
  });

  plot?.addEventListener('pointerleave', () => activate(selectedYear));

  chart.querySelectorAll<HTMLButtonElement>('[data-trajectory-series]').forEach((button) =>
    button.addEventListener('click', () => {
      const selected = button.dataset.trajectorySeries;
      chart
        .querySelectorAll<HTMLButtonElement>('[data-trajectory-series]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      chart.querySelectorAll<SVGGElement>('[data-trajectory-line]').forEach((line) => {
        line.dataset.muted = String(selected !== 'all' && line.dataset.trajectoryLine !== selected);
      });
    }),
  );
});

const supportsUntilFound = 'onbeforematch' in HTMLElement.prototype;

document.querySelectorAll<HTMLElement>('[data-chanel-recovery]').forEach((chart) => {
  let group = 'region';
  let period = '2';
  const readout = chart.querySelector('[data-recovery-readout]');

  const applyPanelState = () => {
    const activeKey = `${group}-${period}`;
    chart.querySelectorAll<HTMLElement>('[data-recovery-panel]').forEach((panel) => {
      const isVisible = panel.dataset.recoveryPanel === activeKey;
      if (isVisible) {
        panel.removeAttribute('hidden');
        const first = panel.querySelector<HTMLButtonElement>('[data-recovery-row]');
        if (readout) readout.textContent = first?.dataset.readout || '';
      } else if (supportsUntilFound) {
        panel.setAttribute('hidden', 'until-found');
      } else {
        panel.hidden = true;
      }
    });
    chart
      .querySelectorAll<HTMLButtonElement>('[data-recovery-group]')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.recoveryGroup === group)));
    chart
      .querySelectorAll<HTMLButtonElement>('[data-recovery-period]')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.recoveryPeriod === period)));
    chart
      .querySelectorAll<HTMLButtonElement>('[data-recovery-row]')
      .forEach((b) => b.setAttribute('aria-pressed', 'false'));
  };

  const update = (animate = true) => {
    if (animate) runViewTransition(applyPanelState);
    else applyPanelState();
  };

  applyPanelState();

  chart.querySelectorAll<HTMLButtonElement>('[data-recovery-group]').forEach((b) =>
    b.addEventListener('click', () => {
      group = b.dataset.recoveryGroup || 'region';
      update(true);
    }),
  );
  chart.querySelectorAll<HTMLButtonElement>('[data-recovery-period]').forEach((b) =>
    b.addEventListener('click', () => {
      period = b.dataset.recoveryPeriod || '2';
      update(true);
    }),
  );
  chart.querySelectorAll<HTMLButtonElement>('[data-recovery-row]').forEach((b) =>
    b.addEventListener('click', () => {
      chart
        .querySelectorAll<HTMLButtonElement>('[data-recovery-row]')
        .forEach((row) => row.setAttribute('aria-pressed', String(row === b)));
      if (readout) readout.textContent = b.dataset.readout || '';
    }),
  );

  // Sync panel state if Find-in-Page matches hidden="until-found" content
  chart.addEventListener('beforematch', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const panel = target.closest<HTMLElement>('[data-recovery-panel]');
    const key = panel?.dataset.recoveryPanel;
    if (!key) return;
    const [nextGroup, nextPeriod] = key.split('-');
    if (nextGroup && nextPeriod) {
      group = nextGroup;
      period = nextPeriod;
      applyPanelState();
    }
  });
});

document.querySelectorAll<HTMLElement>('.chanel-bridge').forEach((chart) => {
  const all = chart.querySelector<HTMLButtonElement>('[data-bridge-all]');
  const buttons = [...chart.querySelectorAll<HTMLButtonElement>('[data-bridge-step]')];
  const steps = [...chart.querySelectorAll<SVGGElement>('.chanel-bridge__step')];
  const readout = chart.querySelector('[data-bridge-readout]');
  const initialReadout = readout?.textContent || '';

  const showAll = () => {
    all?.setAttribute('aria-pressed', 'true');
    buttons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
    steps.forEach((step) => {
      step.dataset.muted = 'false';
      step.dataset.active = 'false';
    });
    if (readout) readout.textContent = initialReadout;
  };

  const selectStep = (index: number) => {
    all?.setAttribute('aria-pressed', 'false');
    buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === index)));
    steps.forEach((step, si) => {
      step.dataset.muted = String(index !== si);
      step.dataset.active = String(index === si);
    });
    if (readout) readout.textContent = buttons[index]?.dataset.readout || initialReadout;
  };

  all?.addEventListener('click', showAll);
  buttons.forEach((button, i) => button.addEventListener('click', () => selectStep(i)));

  // Direct SVG bar click & hover interaction synced with step buttons (plot-level leave prevents inter-bar flicker)
  let lockedIndex: number | null = null;
  const plotSvg = chart.querySelector<SVGSVGElement>('svg');
  steps.forEach((step, i) => {
    step.addEventListener('pointerenter', () => {
      if (lockedIndex === null) selectStep(i);
    });
    step.addEventListener('click', () => {
      if (lockedIndex === i) {
        lockedIndex = null;
        showAll();
      } else {
        lockedIndex = i;
        selectStep(i);
      }
    });
  });
  plotSvg?.addEventListener('pointerleave', () => {
    if (lockedIndex === null) showAll();
  });

  all?.addEventListener('click', () => {
    lockedIndex = null;
  });
  buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
      lockedIndex = i;
    });
  });
});

// Competition by Price Band: brand column highlight filter
document.querySelectorAll<HTMLElement>('[data-band-browser]').forEach((browser) => {
  const filterButtons = [...browser.querySelectorAll<HTMLButtonElement>('[data-band-filter]')];
  const tables = [...browser.querySelectorAll<HTMLTableElement>('[data-band-table]')];

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.bandFilter ?? 'all';
      filterButtons.forEach((btn) =>
        btn.setAttribute('aria-pressed', String(btn === button)),
      );
      tables.forEach((table) => {
        if (selected === 'all') {
          table.removeAttribute('data-brand-focus');
        } else {
          table.dataset.brandFocus = selected;
        }
      });
    });
  });
});

// Enter once; content and exact data remain available without animation or JavaScript.
const revealNodes = document.querySelectorAll<HTMLElement>(
  '[data-chanel-reveal], .chanel-report .report-section > h2, .chanel-report .report-hero__main',
);
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches && typeof IntersectionObserver === 'function') {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.chanelVisible = 'true';
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  );
  revealNodes.forEach((node) => {
    node.dataset.chanelVisible = 'false';
    revealObserver.observe(node);
  });
  motionPreference.addEventListener('change', () => {
    if (!motionPreference.matches) return;
    revealObserver.disconnect();
    revealNodes.forEach((node) => (node.dataset.chanelVisible = 'true'));
  });
}

// Selection adds an exact readout instead of only dimming the other marks.
document.querySelectorAll<HTMLElement>('.chanel-report [data-interactive-chart]').forEach((chart) => {
  const output = document.createElement('p');
  output.className = 'chanel-selection-readout';
  output.setAttribute('aria-live', 'polite');
  output.textContent = 'Select a mark to inspect the observation.';
  chart.append(output);
  chart.querySelectorAll<HTMLButtonElement>('[data-chart-bar]').forEach((button) =>
    button.addEventListener('click', () => {
      output.textContent =
        button.dataset.selected === 'true'
          ? button.getAttribute('aria-label') || ''
          : 'Select a mark to inspect the observation.';
    }),
  );
  chart.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest('[data-chart-bar]')) {
      output.textContent = 'Select a mark to inspect the observation.';
    }
  });
});
