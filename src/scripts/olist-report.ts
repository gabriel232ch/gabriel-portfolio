import { runViewTransition } from './modern-web';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealNodes = document.querySelectorAll<HTMLElement>('[data-olist-reveal]');
if (!reduced.matches && typeof IntersectionObserver === 'function') {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealState = 'entered';
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  revealNodes.forEach((node) => {
    node.dataset.revealState = 'pending';
    observer.observe(node);
  });
}

const stage = document.querySelector<HTMLElement>('[data-candidate-stage]');
const panels = [...document.querySelectorAll<HTMLElement>('[data-candidate-panel]')];
const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-candidate-button]')];
const supportsUntilFound = 'onbeforematch' in HTMLElement.prototype;

const hidePanel = (panel: HTMLElement) => {
  if (supportsUntilFound) {
    panel.setAttribute('hidden', 'until-found');
  } else {
    panel.hidden = true;
  }
};

const showPanel = (panel: HTMLElement) => {
  panel.removeAttribute('hidden');
};

const applyChoice = (index: string) => {
  buttons.forEach((button) => {
    const active = button.dataset.candidateButton === index;
    button.setAttribute('aria-pressed', String(active));
  });
  panels.forEach((panel) => {
    if (panel.dataset.candidatePanel === index) {
      showPanel(panel);
      // Ensure line chart inside newly revealed panel is entered cleanly
      panel.querySelectorAll<HTMLElement>('[data-olist-reveal]').forEach((node) => {
        node.dataset.revealState = 'entered';
      });
    } else {
      hidePanel(panel);
    }
  });
};

const choose = (index: string, animate = true) => {
  if (animate) {
    runViewTransition(() => applyChoice(index));
  } else {
    applyChoice(index);
  }
};

applyChoice('0');
buttons.forEach((button) =>
  button.addEventListener('click', () => choose(button.dataset.candidateButton ?? '0', true)),
);

// Synchronize active tab when browser Find-in-Page reveals a hidden="until-found" panel
stage?.addEventListener('beforematch', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const matchedPanel = target.closest<HTMLElement>('[data-candidate-panel]');
  if (matchedPanel?.dataset.candidatePanel) {
    applyChoice(matchedPanel.dataset.candidatePanel);
  }
});

// Interactive FT/NYT line charts (live KPI callout strip + full-column hover + month ticks + slider)
interface OlistChartRecord {
  month: string;
  x: number;
  readout: string;
  deltaText: string;
  isNegativeDelta: boolean;
  series: { val: string; n: string; y: number }[];
}

document.querySelectorAll<HTMLElement>('[data-line-chart]').forEach((chart) => {
  const records: OlistChartRecord[] = JSON.parse(chart.dataset.chartRecords ?? '[]');
  const rows: string[] = JSON.parse(chart.dataset.chartRows ?? '[]');
  const range = chart.querySelector<HTMLInputElement>('[data-chart-range]');
  const readout = chart.querySelector<HTMLElement>('[data-chart-readout]');
  const guide = chart.querySelector<SVGLineElement>('[data-chart-guide]');
  const monthBadge = chart.querySelector<HTMLElement>('[data-chart-month-badge]');
  const deltaEl = chart.querySelector<HTMLElement>('[data-chart-delta]');
  const svg = chart.querySelector<SVGSVGElement>('[data-chart-svg]');

  let selectedMonth = 0;

  const update = (month: number) => {
    const rec = records[month];
    if (readout && (rec?.readout || rows[month])) readout.textContent = rec?.readout ?? rows[month];
    if (monthBadge && rec) monthBadge.textContent = rec.month;
    if (range) {
      range.value = String(month);
      range.setAttribute('aria-valuetext', rec?.readout ?? rows[month] ?? '');
    }
    const xPos = String(rec ? rec.x : 44 + month * 76);
    guide?.setAttribute('x1', xPos);
    guide?.setAttribute('x2', xPos);

    if (rec) {
      rec.series.forEach((item, si) => {
        const valEl = chart.querySelector(`[data-chart-series-val="${si}"]`);
        const nEl = chart.querySelector(`[data-chart-series-n="${si}"]`);
        const focusEl = chart.querySelector<SVGCircleElement>(`[data-chart-focus="${si}"]`);
        if (valEl) valEl.textContent = item.val;
        if (nEl) nEl.textContent = item.n;
        focusEl?.setAttribute('cx', xPos);
        focusEl?.setAttribute('cy', String(item.y));
      });
      if (deltaEl) {
        deltaEl.textContent = rec.deltaText;
        deltaEl.classList.toggle('is-negative', rec.isNegativeDelta);
      }
    }

    chart.querySelectorAll<SVGElement>('[data-chart-month], [data-chart-x-label]').forEach((node) => {
      const targetMonth = Number(node.dataset.chartMonth ?? node.dataset.chartXLabel);
      node.dataset.selected = String(targetMonth === month);
    });
    chart.querySelectorAll<HTMLButtonElement>('[data-chart-tick]').forEach((tick) => {
      tick.setAttribute('aria-pressed', String(Number(tick.dataset.chartTick) === month));
    });
  };

  range?.addEventListener('input', () => {
    selectedMonth = Number(range.value);
    update(selectedMonth);
  });
  chart.querySelectorAll<SVGElement>('[data-chart-month]').forEach((point) => {
    const idx = Number(point.dataset.chartMonth);
    point.addEventListener('pointerenter', () => update(idx));
    point.addEventListener('click', () => {
      selectedMonth = idx;
      update(selectedMonth);
    });
  });
  svg?.addEventListener('pointerleave', () => update(selectedMonth));
  chart.querySelectorAll<HTMLButtonElement>('[data-chart-tick]').forEach((tick) => {
    tick.addEventListener('click', () => {
      selectedMonth = Number(tick.dataset.chartTick);
      update(selectedMonth);
    });
  });

  update(0);
});
