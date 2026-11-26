/* ==========================================================================
   Modern Web Guidance Progressive Enhancement Runtime
   ========================================================================== */

interface NavigationActivationLike {
  from?: { url?: string } | null;
  entry?: { url?: string } | null;
}

interface PageRevealEventLike extends Event {
  viewTransition?: {
    types: Set<string>;
  } | null;
}

interface CommandEventLike extends Event {
  command?: string;
  source?: HTMLElement | null;
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function runViewTransition(update: () => void) {
  if (
    !prefersReducedMotion() &&
    document.visibilityState === 'visible' &&
    typeof document.startViewTransition === 'function'
  ) {
    return document.startViewTransition(update);
  }
  update();
  return null;
}

// 1. Directional Cross-Document View Transition types (forward vs back)
if ('onpagereveal' in window) {
  window.addEventListener('pagereveal', (rawEvent) => {
    const event = rawEvent as PageRevealEventLike;
    const nav = (window as unknown as { navigation?: { activation?: NavigationActivationLike } })
      .navigation;
    if (!event.viewTransition || !nav?.activation?.from?.url || !nav.activation.entry?.url) return;

    try {
      const fromPath = new URL(nav.activation.from.url).pathname;
      const toPath = new URL(nav.activation.entry.url).pathname;
      const fromDepth = fromPath.split('/').filter(Boolean).length;
      const toDepth = toPath.split('/').filter(Boolean).length;
      event.viewTransition.types.add(toDepth < fromDepth ? 'back' : 'forward');
    } catch {
      // Ignore malformed URLs
    }
  });
}

// 2. Scroll Progress Indicator fallback ONLY when native animation-timeline: scroll() is unsupported
if (!CSS.supports('animation-timeline', 'scroll()')) {
  const progressBars = document.querySelectorAll<HTMLElement>(
    '[data-scroll-progress], [data-report-progress], [data-olist-progress]',
  );
  if (progressBars.length > 0) {
    let scheduled = false;
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      progressBars.forEach((bar) => {
        bar.style.transform = `scaleX(${ratio})`;
      });
      scheduled = false;
    };
    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(updateProgress);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }
}

// 3. Scrollspy ARIA sync (native scroll-target-group + IO fallback)
const initScrollspy = () => {
  const navContainers = document.querySelectorAll<HTMLElement>(
    '.report-index ol, .inquiry-toc ol',
  );
  if (navContainers.length === 0) return;

  const supportsNative = CSS.supports('scroll-target-group: auto');

  navContainers.forEach((container) => {
    const links = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
    if (links.length === 0) return;

    if (supportsNative) {
      const syncAria = () => {
        const current = container.querySelector<HTMLAnchorElement>('a:target-current');
        links.forEach((link) => {
          const active = link === current;
          link.dataset.active = String(active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      };
      syncAria();
      document.addEventListener('scrollend', syncAria, { passive: true });
    } else if (typeof IntersectionObserver === 'function') {
      const sections = links
        .map((link) => {
          const id = link.getAttribute('href')?.slice(1);
          return id ? document.getElementById(id) : null;
        })
        .filter((el): el is HTMLElement => el !== null);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const activeId = entry.target.id;
            links.forEach((link) => {
              const active = link.getAttribute('href') === `#${activeId}`;
              link.dataset.active = String(active);
              if (active) link.setAttribute('aria-current', 'location');
              else link.removeAttribute('aria-current');
            });
          });
        },
        { rootMargin: '-18% 0px -60% 0px', threshold: 0 },
      );

      sections.forEach((section) => observer.observe(section));
    }
  });
};

// 4. Accessible Sortable Tables (Invoker Commands --sort + click fallback + moveBefore)
const initSortableTables = () => {
  const tables = document.querySelectorAll<HTMLTableElement>('table[data-sortable-table]');
  if (tables.length === 0) return;

  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  const supportsInvokerCommands = 'commandForElement' in HTMLButtonElement.prototype;

  tables.forEach((table) => {
    const tbody = table.tBodies[0];
    const headRow = table.tHead?.rows[0];
    if (!tbody || !headRow) return;

    let status = table.parentElement?.querySelector<HTMLElement>('[data-sort-status]');
    if (!status) {
      status = document.createElement('p');
      status.className = 'sr-status';
      status.setAttribute('role', 'status');
      status.dataset.sortStatus = 'true';
      table.after(status);
    }

    const reorder = (rows: HTMLTableRowElement[]) => {
      const canMoveBefore = typeof (tbody as unknown as { moveBefore?: unknown }).moveBefore === 'function';
      for (const row of rows) {
        if (canMoveBefore) {
          (tbody as unknown as { moveBefore: (node: Node, child: Node | null) => void }).moveBefore(
            row,
            null,
          );
        } else {
          tbody.append(row);
        }
      }
    };

    const sortBy = (button: HTMLButtonElement) => {
      const th = button.closest('th');
      if (!th) return;

      const direction = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
      for (const header of [...headRow.cells]) {
        header.removeAttribute('aria-sort');
      }
      th.setAttribute('aria-sort', direction);

      const colIndex = th.cellIndex;
      const type = th.dataset.type ?? 'text';
      const factor = direction === 'ascending' ? 1 : -1;

      const indexed = [...tbody.rows].map((row) => {
        const cell = row.cells[colIndex];
        const raw = cell?.dataset.value ?? cell?.textContent?.trim() ?? '';
        return { row, raw, num: Number(raw) };
      });

      indexed.sort((a, b) => {
        if (type === 'number') {
          const aNan = Number.isNaN(a.num);
          const bNan = Number.isNaN(b.num);
          if (aNan && bNan) return 0;
          if (aNan) return 1;
          if (bNan) return -1;
          return factor * (a.num - b.num);
        }
        return factor * collator.compare(a.raw, b.raw);
      });

      const orderedRows = indexed.map((entry) => entry.row);
      const tableWithVT = table as unknown as {
        startViewTransition?: (cb: () => void) => unknown;
      };

      if (!prefersReducedMotion() && typeof tableWithVT.startViewTransition === 'function') {
        tableWithVT.startViewTransition(() => reorder(orderedRows));
      } else {
        reorder(orderedRows);
      }

      const label = button.dataset.sortLabel ?? button.textContent?.replace(/[⇅↑↓]/g, '').trim() ?? 'column';
      status!.textContent = `Sorted by ${label}, ${direction}, ${orderedRows.length} rows`;
    };

    table.addEventListener('command', (rawEvent) => {
      const event = rawEvent as CommandEventLike;
      if (event.command === '--sort' && event.source instanceof HTMLButtonElement) {
        sortBy(event.source);
      }
    });

    // Only attach click listener when invoker commands are unsupported (avoids double-sort).
    if (!supportsInvokerCommands) {
      table.tHead?.querySelectorAll<HTMLButtonElement>('button[command="--sort"]').forEach((btn) => {
        btn.addEventListener('click', () => sortBy(btn));
      });
    }
  });
};

// 5. Accordion Expand All / Collapse All (Invoker Commands + click fallback)
const initAccordionToggleAll = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>('button[command="--toggle-all"]');
  if (buttons.length === 0) return;

  const supportsInvokerCommands = Object.hasOwn(HTMLButtonElement.prototype, 'commandForElement');

  const syncButton = (container: Element, button: HTMLButtonElement) => {
    const items = [...container.querySelectorAll<HTMLDetailsElement>(':scope > details')];
    if (items.length === 0) return;
    button.setAttribute('aria-expanded', String(items.every((details) => details.open)));
  };

  const toggleGroup = (container: Element, button: HTMLButtonElement) => {
    const shouldExpand = button.getAttribute('aria-expanded') !== 'true';
    container.querySelectorAll<HTMLDetailsElement>(':scope > details').forEach((details) => {
      details.open = shouldExpand;
    });
    syncButton(container, button);
  };

  document.addEventListener(
    'command',
    (rawEvent) => {
      const event = rawEvent as CommandEventLike;
      if (event.command !== '--toggle-all') return;
      if (event.target instanceof Element && event.source instanceof HTMLButtonElement) {
        toggleGroup(event.target, event.source);
      }
    },
    { capture: true },
  );

  if (!supportsInvokerCommands) {
    buttons.forEach((button) => {
      const targetId = button.getAttribute('commandfor');
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;
      button.addEventListener('click', () => toggleGroup(target, button));
    });
  }

  document.addEventListener(
    'toggle',
    (event) => {
      if (!(event.target instanceof HTMLDetailsElement)) return;
      const parent = event.target.parentElement;
      if (!parent) return;
      const button = parent.querySelector<HTMLButtonElement>(
        `:scope > .accordion-toolbar button[command="--toggle-all"], :scope > button[command="--toggle-all"]`,
      );
      if (button) syncButton(parent, button);
    },
    { capture: true },
  );

  buttons.forEach((button) => {
    const targetId = button.getAttribute('commandfor');
    const target = targetId ? document.getElementById(targetId) : null;
    if (target) syncButton(target, button);
  });
};

// 6. Editorial Range Slider progress custom property synchronization
const initEditorialSliders = () => {
  const sliders = document.querySelectorAll<HTMLInputElement>('input[type="range"].editorial-slider');
  sliders.forEach((slider) => {
    const sync = () => {
      slider.style.setProperty('--attr-min', slider.min || '0');
      slider.style.setProperty('--attr-max', slider.max || '100');
      slider.style.setProperty('--control-value', slider.value);
    };
    sync();
    slider.addEventListener('input', sync);
    // Keep synced when scripts update value programmatically (e.g. Replay / year buttons)
    const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    if (descriptor?.set) {
      const originalSet = descriptor.set;
      Object.defineProperty(slider, 'value', {
        configurable: true,
        get: () => descriptor.get!.call(slider),
        set(val: string) {
          originalSet.call(slider, val);
          sync();
        },
      });
    }
  });
};

// 7. Popover Top-Layer Exit Fallback for browsers without overlay / discrete display transitions
let supportsDisplayTransition: boolean | undefined;
const canTransitionDisplay = (): boolean => {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
    return false;
  }
  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  void getComputedStyle(probe).display;
  probe.style.display = 'none';
  supportsDisplayTransition = getComputedStyle(probe).display === 'block';
  probe.remove();
  return supportsDisplayTransition;
};

const supportsTopLayerExit = () =>
  window.CSS?.supports?.('overlay', 'auto') && canTransitionDisplay();

const initEvidencePopovers = () => {
  document.querySelectorAll<HTMLButtonElement>('[data-popover-close]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const popover = btn.closest<HTMLElement>('[popover]');
      if (!popover) return;
      if (!supportsTopLayerExit() && !prefersReducedMotion()) {
        popover.setAttribute('data-closing', '');
        const animations = popover.getAnimations({ subtree: true });
        if (animations.length > 0) {
          await Promise.race([
            Promise.allSettled(animations.map((a) => a.finished)),
            new Promise((resolve) => setTimeout(resolve, 600)),
          ]);
        }
        if (!popover.hasAttribute('data-closing')) return;
        popover.removeAttribute('data-closing');
      }
      if (typeof popover.hidePopover === 'function') {
        popover.hidePopover();
      }
    });
  });
};

// 8. Scroll-Position-Aware Back-to-Top button with focusout recovery
const initBackToTop = () => {
  const sentinel = document.querySelector<HTMLElement>('[data-scroll-sentinel]');
  const button = document.querySelector<HTMLButtonElement>('[data-back-to-top]');
  if (!sentinel || !button) return;

  if (typeof IntersectionObserver === 'function') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        document.documentElement.classList.toggle('is-scrolled', !entry.isIntersecting);
      });
    });
    observer.observe(sentinel);
  }

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    const main = document.querySelector<HTMLElement>('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
  });

  // Focus recovery if button hides while focused
  button.addEventListener('focusout', (event) => {
    if (!event.relatedTarget && !document.documentElement.classList.contains('is-scrolled')) {
      const main = document.querySelector<HTMLElement>('main');
      main?.focus({ preventScroll: true });
    }
  });
};

// Initialize all enhancements
initScrollspy();
initSortableTables();
initAccordionToggleAll();
initEditorialSliders();
initEvidencePopovers();
initBackToTop();
