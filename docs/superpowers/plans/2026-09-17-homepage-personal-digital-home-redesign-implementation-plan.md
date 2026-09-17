# Gabriel Portfolio Homepage Personal Digital Home Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Home page from a taxonomy-heavy research portfolio into the approved personal digital home: identity-first Hero, distinct Chanel / Olist / smaller-company narratives, a human `Now`, and a warm unfinished ending, while preserving evidence, accessibility, theme support, and the existing Astro production foundation.

**Architecture:** Keep Astro static rendering, the existing global design system, theme behavior, signature SVG, and source-backed data modules. Replace the old homepage-specific feature components with purpose-built chapter components, centralize approved public copy in `src/data/home.ts`, split chapter CSS by responsibility, and keep deeper evidence on local work routes instead of forcing all research into the homepage. No new runtime service, CMS, animation library, or dependency is introduced.

**Tech Stack:** Astro 7, TypeScript 6, CSS, Vitest, Playwright, existing font packages, Node >=22.12.0. Use the existing lockfile and scripts from `package.json`.

**Spec:** `docs/superpowers/specs/2026-09-17-homepage-personal-digital-home-redesign-design.md`

**Companion Chanel spec:** `docs/superpowers/specs/2026-09-17-chanel-homepage-cinematic-chapter-design.md`

## Global Constraints

- Read both specs completely before changing code.
- The public page must not expose internal design language such as `cinematic chapter`, `capability progression`, `living snapshot`, `research notebook`, `Scene 1`, `truthful abstraction`, `ongoing inquiry`, or equivalent planning labels.
- Remove reader-facing taxonomy that no longer belongs in the design: `RESEARCH / SYSTEMS / NOTES`, `VISUAL / MARKET`, `SYSTEM / ANALYTICS`, `STRATEGY / COMPARATIVE`, `CURRENT SNAPSHOT`, `PRIMARY THREAD / CURRENT ATTENTION`, `PRICE / HISTORY / PERFORMANCE`, `CLOSING / SOURCES`, folio numbering, and project-index language.
- Preserve the exact Hero sentence: `I like following questions until they become clearer — and building things that help me think better.`
- Preserve the exact canonical project titles from the spec.
- Do not publicly name JoinQuant as the source of the employer-brand inquiry in this release.
- Do not publish employee names, interview transcripts, mentor comments, candidate feedback, internal recruiting metrics, internal EVP/slogan exploration, or internal meeting/process details.
- Do not imply that smaller companies are categorically better or that all strong candidates prefer them.
- Do not imply that three GitHub SQL practice repositories represent Gabriel's complete SQL learning history.
- Do not claim Chanel campaign ROI, causal marketing impact, or pricing power from higher prices alone.
- Do not invent a predefined Olist research question; the public narrative must say there was no research question at the beginning.
- Keep the established black/white/grey direction, theme behavior, typography quality, responsive grid discipline, reduced-motion support, semantic HTML, and keyboard accessibility.
- Do not introduce a new framework, CMS, analytics service, animation package, social API, Duolingo integration, Instagram integration, or other new dependency in this v1.
- Do not require a personal photo for v1. The `Now` composition must work with `personalSnapshot: null`.
- Use browser QA to tune spacing, line breaks, chart geometry, and motion, but do not silently change the approved narrative architecture or canonical copy.
- Start implementation in an isolated worktree using `superpowers:using-git-worktrees` if the executor is working locally through Codex.
- Follow TDD: each task begins by changing or adding the smallest relevant test, verify failure for the intended reason, implement, rerun, then commit.

---

## File Structure and Responsibilities

### Keep and modify

- `src/pages/index.astro` — compose the new Home sequence only; no project copy should live here.
- `src/data/home.ts` — single source of approved homepage copy, project deep-link routes, Now items, optional snapshot state, and closing links.
- `src/data/luxury.ts` — keep as source-backed Chanel evidence; do not change numerical facts to fit the design.
- `src/data/olist.ts` — keep as source-backed Olist evidence; use only the two comparison metrics on Home.
- `src/data/competitive.ts` — keep as current-research evidence for the deeper smaller-companies page.
- `src/components/home/HomeNavigation.astro` — retain `WORK`, `NOW`, and ThemeToggle.
- `src/components/home/HomeHero.astro` — signature plus one approved statement only.
- `src/components/home/HomeMotionController.astro` — retain the generic reveal contract; simplify counter logic only if counters disappear entirely.
- `src/styles/home.css` — shared Home shell, navigation, Hero, Now, ending, common chapter tokens.
- `tests/unit/home.test.ts` — canonical content/privacy contract.
- `tests/e2e/home.spec.ts` — page order, public copy, deep links, accessibility-relevant behavior, overflow.
- `tests/e2e/home-motion.spec.ts` — reveal/reduced-motion behavior after old research-note assumptions are removed.
- `tests/e2e/home-visual.spec.ts` — final full-page desktop/mobile light/dark visual baselines.

### Create

- `src/components/home/ChanelChapter.astro` — Chanel narrative orchestration and scene order.
- `src/components/home/ChanelPricePosition.astro` — compact source-backed current-price peer position visual.
- `src/components/home/ChanelHistorySignal.astro` — concise historical repricing visual.
- `src/components/home/ChanelBusinessSignal.astro` — concise non-linear business evidence visual.
- `src/components/home/OlistChapter.astro` — Samsung → learning → unfamiliar dataset → business tension narrative.
- `src/components/home/OlistDataMap.astro` — lightweight, accessible relational map; no technical schema showcase.
- `src/components/home/SmallerCompaniesChapter.astro` — text-led unfinished inquiry.
- `src/components/home/HomeClosing.astro` — warm closing sentence and only real available public links.
- `src/pages/work/olist-marketplace-analysis.astro` — local deeper-analysis route using existing public evidence and GitHub source link.
- `src/pages/work/why-some-people-choose-smaller-companies.astro` — local current-research route using safe public benchmark material only.
- `src/styles/home-chanel.css` — Chanel-only chapter styles.
- `src/styles/home-olist.css` — Olist-only chapter styles.
- `src/styles/home-inquiry.css` — smaller-company chapter styles.

### Retire after replacement is integrated

- `src/components/home/LuxuryFeature.astro`
- `src/components/home/OlistFeature.astro`
- `src/components/home/CompetitiveFeature.astro`
- `src/components/home/EditorialClosing.astro`

Do not delete the old components before the new page is compiling and the replacement tests are passing. Delete them in Task 8 so rollback remains easy during development.

### Stable public selectors for tests

Use these data attributes deliberately; do not expose them as visible labels:

```text
[data-signature-reveal]
[data-home-chapter="chanel"]
[data-home-chapter="olist"]
[data-home-chapter="smaller-companies"]
[data-home-motion]
[data-chanel-price-position]
[data-chanel-history]
[data-chanel-business]
[data-olist-data-map]
[data-olist-tension]
[data-now-item]
[data-home-closing]
```

Keep the existing internal `data-work-slug` values on the three homepage chapters for continuity with source content and tests:

```text
luxury-handbag-pricing-architecture
olist-marketplace-analysis
competitive-positioning-against-giants
```

---

## Task 1: Replace the Home content contract with approved public copy

**Files:**
- Modify: `src/data/home.ts`
- Modify: `tests/unit/home.test.ts`

**Interfaces:**
- Produces: `HOME_STATE.intro.statement`
- Produces: `HOME_STATE.projects.chanel`
- Produces: `HOME_STATE.projects.olist`
- Produces: `HOME_STATE.projects.smallerCompanies`
- Produces: `HOME_STATE.now.items`
- Produces: `HOME_STATE.now.personalSnapshot`
- Produces: `HOME_STATE.closing.message`
- Produces: `HOME_STATE.closing.links`
- Preserves: `HOME_WORK_SLUGS`

- [ ] **Step 1: Rewrite the unit tests to lock the new canonical content and privacy boundary**

Replace the old reading/primary-thread assertions in `tests/unit/home.test.ts` with explicit assertions like:

```ts
import { describe, expect, it } from 'vitest';
import { HOME_STATE, HOME_WORK_SLUGS } from '../../src/data/home';
import { LUXURY_FLAGSHIP } from '../../src/data/luxury';

describe('Home content contract', () => {
  it('keeps the approved project order', () => {
    expect(HOME_WORK_SLUGS).toEqual([
      'luxury-handbag-pricing-architecture',
      'olist-marketplace-analysis',
      'competitive-positioning-against-giants',
    ]);
  });

  it('locks the identity-first Hero copy', () => {
    expect(HOME_STATE.intro.statement).toBe(
      'I like following questions until they become clearer — and building things that help me think better.',
    );
  });

  it('locks the three public project identities', () => {
    expect(HOME_STATE.projects.chanel.title).toBe(
      'Luxury Was Slowing. Why Did Chanel Look Different?',
    );
    expect(HOME_STATE.projects.olist.title).toBe(
      'SQL Wasn’t the Hard Part. Knowing What to Ask Was.',
    );
    expect(HOME_STATE.projects.smallerCompanies.title).toBe(
      'Why Do Some People Choose Smaller Companies?',
    );
  });

  it('keeps the active-employer inquiry anonymized', () => {
    const publicCopy = JSON.stringify(HOME_STATE.projects.smallerCompanies);
    expect(publicCopy).toContain('a quantitative investment firm');
    expect(publicCopy).not.toContain('JoinQuant');
    expect(publicCopy).not.toContain('聚宽');
  });

  it('exposes four human Now items and no required photo', () => {
    expect(HOME_STATE.now.items.map((item) => item.id)).toEqual([
      'learning',
      'working',
      'playing',
      'thinking',
    ]);
    expect(HOME_STATE.now.personalSnapshot).toBeNull();
  });

  it('locks the warm unfinished ending', () => {
    expect(HOME_STATE.closing.message).toBe('I’ll keep adding things here as I go.');
    expect(HOME_STATE.closing.links).toEqual([
      { label: 'GitHub', href: 'https://github.com/gabriel232ch' },
    ]);
  });

  it('keeps the flagship evidence facts source-backed', () => {
    expect(LUXURY_FLAGSHIP.snapshot.acceptedObservations).toBe(41);
    expect(LUXURY_FLAGSHIP.snapshot.numericPrices).toBe(35);
    expect(LUXURY_FLAGSHIP.financial.period).toBe('Chanel consolidated / FY2020–FY2025');
  });
});
```

- [ ] **Step 2: Run the unit test and verify it fails because the old `HOME_STATE` shape still exists**

Run:

```bash
npm run test -- tests/unit/home.test.ts
```

Expected: FAIL on missing `projects`, new `now.items`, new `closing`, or the changed Hero statement.

- [ ] **Step 3: Replace the old Home state with a typed copy model**

Keep `HOME_WORK_SLUGS`, `PersonalSnapshot`, and define the public copy directly in `src/data/home.ts`. Use this exact v1 shape and content:

```ts
export const HOME_WORK_SLUGS = [
  'luxury-handbag-pricing-architecture',
  'olist-marketplace-analysis',
  'competitive-positioning-against-giants',
] as const;

export interface PersonalSnapshot {
  src: string;
  alt: string;
  caption?: string;
}

export const HOME_STATE = {
  intro: {
    statement:
      'I like following questions until they become clearer — and building things that help me think better.',
  },
  projects: {
    chanel: {
      context: 'MILAN · 2025 → NOW',
      title: 'Luxury Was Slowing. Why Did Chanel Look Different?',
      opening:
        'I first started thinking about this while studying luxury at Bocconi in Milan. The market was slowing, and I kept coming across brands like Gucci and Zegna trying to adapt in very different ways.',
      return:
        'Later, a passing conversation brought Chanel to mind. It seemed to be holding up differently. I wanted to understand whether that impression was real — and, if it was, why.',
      visibleStart: 'I started with what I could see.',
      marketing:
        'At first, I looked at the most visible explanations — what Chanel had been doing, how it was showing up, and whether recent brand activity could explain the difference I thought I was seeing. But public activity could tell me what the brand was doing — not whether those actions were actually driving the business.',
      missing: 'But something still felt missing.',
      missingBody:
        'By then, the pricing work was largely complete. I could see how Chanel was positioning itself. I still couldn’t tell whether that positioning was actually supported by the business.',
      current:
        'I no longer think Chanel’s relative resilience can be explained by a single price move or campaign. What I see now is a system: pricing, product, desirability, investment, client experience and brand identity all have to keep reinforcing one another.',
      unresolved:
        'I still don’t know which part of that system matters most. That is the part I am still trying to understand.',
      status: 'The question is still open.',
      cta: 'Explore the research →',
      href: '/work/luxury-handbag-pricing-architecture/',
    },
    olist: {
      context: 'SAMSUNG · 2025 → OLIST · 2026',
      title: 'SQL Wasn’t the Hard Part. Knowing What to Ask Was.',
      samsung:
        'My first real exposure to data analysis came at Samsung, working with sales datasets that could run into hundreds of thousands — sometimes millions — of rows. Most of the work happened in Excel. That was where data analysis started for me, but I didn’t want it to be the endpoint.',
      learning:
        'I had already been learning and practising SQL for some time. But most learning environments came with the question already defined: understand the task, write the right query, retrieve the answer. What I wanted to learn next was different — how to look at unfamiliar data, decide what was worth asking, and work my way toward a business problem on my own.',
      highlight: 'What I wanted to learn next was how to know what to ask.',
      arrival: 'That is what led me to Olist.',
      noQuestion:
        'There was no research question at the beginning. I started by understanding what was in the data — and what wasn’t.',
      businessQuestion:
        'How should Olist grow marketplace value without letting fulfillment reliability and customer experience deteriorate?',
      shift: 'SQL stopped being the task. It became the language I used to investigate a business.',
      reflection:
        'What changed wasn’t just what I could query. It was how I approached an unfamiliar problem.',
      cta: 'Explore the analysis →',
      href: '/work/olist-marketplace-analysis/',
    },
    smallerCompanies: {
      title: 'Why Do Some People Choose Smaller Companies?',
      opening:
        'I started thinking about this while working on employer branding at a quantitative investment firm. At first, I thought the challenge was to identify a clear differentiator — something that could be distilled into a positioning statement.',
      shift:
        'The more I worked on it, the less convincing that idea became. A company does not become compelling because it finds the right sentence. Whatever makes people choose it has to exist before the sentence does.',
      turn: 'So I started looking elsewhere.',
      research:
        'One place I started was smaller organizations already creating outsized impact — trying to understand what they actually offered people, how those qualities became visible, and whether any recurring patterns existed.',
      status: 'I’m still trying to understand this.',
      cta: 'Explore the current research →',
      href: '/work/why-some-people-choose-smaller-companies/',
    },
  },
  now: {
    items: [
      { id: 'learning', label: 'Learning', value: 'Italian' },
      { id: 'working', label: 'Working on', value: 'gabrielchen.me' },
      { id: 'playing', label: 'Playing', value: 'Baldur’s Gate 3' },
      {
        id: 'thinking',
        label: 'Thinking about',
        value: 'Why do some people choose smaller companies?',
      },
    ],
    personalSnapshot: null as PersonalSnapshot | null,
  },
  closing: {
    message: 'I’ll keep adding things here as I go.',
    links: [{ label: 'GitHub', href: 'https://github.com/gabriel232ch' }],
  },
} as const;
```

Do not add Instagram or email with fake/guessed hrefs. V1 renders only the real public GitHub destination currently available in the repository context.

- [ ] **Step 4: Run the unit test and verify it passes**

Run:

```bash
npm run test -- tests/unit/home.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit the content contract**

```bash
git add src/data/home.ts tests/unit/home.test.ts
git commit -m "refactor: define personal home content contract"
```

---

## Task 2: Simplify the Hero to identity + one sentence

**Files:**
- Modify: `src/components/home/HomeHero.astro`
- Modify: `src/styles/home.css`
- Modify: `tests/e2e/home.spec.ts`

**Consumes:** `HOME_STATE.intro.statement`

**Produces:** Hero with signature and one statement; no folio, taxonomy, reading index, or project teasers.

- [ ] **Step 1: Replace the first E2E test with the new Hero contract**

Use a focused test:

```ts
test('Home opens with Gabriel identity rather than a project index', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'WORK', exact: true })).toHaveAttribute('href', '#work');
  await expect(page.getByRole('link', { name: 'NOW', exact: true })).toHaveAttribute('href', '#about');
  await expect(page.getByRole('heading', { level: 1, name: 'Gabriel Chen' })).toBeVisible();
  await expect(page.locator('[data-signature-reveal] svg')).toHaveCount(1);
  await expect(page.getByText(
    'I like following questions until they become clearer — and building things that help me think better.',
  )).toBeVisible();

  for (const retiredCopy of [
    'RESEARCH / SYSTEMS / NOTES',
    'START READING',
    'PRICING RESEARCH',
    'MARKETPLACE ANALYSIS',
  ]) {
    await expect(page.getByText(retiredCopy, { exact: true })).toHaveCount(0);
  }
  await expect(page.locator('.folio-number')).toHaveCount(0);
  await expect(page.locator('[data-home-reading]')).toHaveCount(0);
});
```

- [ ] **Step 2: Run only the Hero E2E test and verify it fails against the current Hero**

Run:

```bash
npx playwright test tests/e2e/home.spec.ts -g "opens with Gabriel identity"
```

Expected: FAIL because old taxonomy/reading rows/folio still render and the approved sentence does not.

- [ ] **Step 3: Simplify `HomeHero.astro`**

Remove the `FolioNumber` import and the reading list. Keep signature markup intact. The component should reduce to this shape:

```astro
---
import type { HOME_STATE } from '../../data/home';
import { GABRIEL_SIGNATURE_GLYPHS } from '../../data/signature';

interface Props {
  state: typeof HOME_STATE;
}

const { state } = Astro.props;
---

<section class="home-hero editorial-grid" aria-labelledby="home-title">
  <div class="home-hero__identity">
    <h1 id="home-title" class="home-hero__name" aria-label="Gabriel Chen">
      <span class="home-hero__signature" data-signature-reveal>
        <svg viewBox="0 0 1000 260" role="img" aria-label="Gabriel Chen" focusable="false">
          {GABRIEL_SIGNATURE_GLYPHS.map((glyph) => (
            <g style={`--signature-index: ${glyph.index};`}>
              <path class="home-hero__signature-draw" d={glyph.path} transform={glyph.transform} pathLength="1" aria-hidden="true" />
              <path class="home-hero__signature-fill" d={glyph.path} transform={glyph.transform} aria-hidden="true" />
            </g>
          ))}
        </svg>
      </span>
    </h1>
  </div>

  <div class="home-hero__context">
    <p class="home-hero__intro editorial">{state.intro.statement}</p>
  </div>
</section>
```

- [ ] **Step 4: Remove dead Hero CSS and preserve the current asymmetric desktop composition**

Delete rules for:

```text
.home-hero__identity .folio-number
.home-hero__intro-label
.home-hero__reading-label
.home-hero__reading-meta
.home-hero__reading
.home-hero__reading ul
.home-hero__reading li
.home-hero__reading a
.home-hero__reading-title
```

Keep the established grid behavior and update the intro spacing so it does not look like a missing block:

```css
.home-hero {
  align-items: start;
  padding-block: clamp(4rem, 7vw, 7.5rem) clamp(5rem, 8vw, 8rem);
}

.home-hero__context {
  max-width: 38rem;
}

.home-hero__intro {
  max-width: 30ch;
  margin: 0;
  font-size: clamp(1.375rem, 2.2vw, 1.875rem);
  line-height: 1.22;
}

@media (min-width: 48rem) {
  .home-hero__identity { grid-column: 1 / span 3; grid-row: 1; }
  .home-hero__context { grid-column: 4 / span 3; grid-row: 1; padding-top: var(--space-2); }
}

@media (min-width: 72rem) {
  .home-hero__identity { grid-column: 1 / span 6; }
  .home-hero__context { grid-column: 8 / span 5; padding-top: var(--space-4); }
}
```

Do not change the signature drawing/fill animation unless browser QA finds a regression.

- [ ] **Step 5: Re-run Hero E2E + reduced-motion signature test**

```bash
npx playwright test tests/e2e/home.spec.ts -g "opens with Gabriel identity"
npx playwright test tests/e2e/home-motion.spec.ts -g "reduced motion"
```

Expected: both PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/HomeHero.astro src/styles/home.css tests/e2e/home.spec.ts
git commit -m "feat: simplify homepage hero around identity"
```

---

## Task 3: Build the Chanel narrative chapter from existing evidence

**Files:**
- Create: `src/components/home/ChanelChapter.astro`
- Create: `src/components/home/ChanelPricePosition.astro`
- Create: `src/components/home/ChanelHistorySignal.astro`
- Create: `src/components/home/ChanelBusinessSignal.astro`
- Create: `src/styles/home-chanel.css`
- Modify: `src/pages/index.astro` temporarily to render `ChanelChapter` in place of `LuxuryFeature`
- Modify: `tests/e2e/home.spec.ts`

**Consumes:** `HOME_STATE.projects.chanel`, `LUXURY_PRICE_SUMMARY`, `LUXURY_FLAGSHIP`

**Produces:** `#work`, `[data-home-chapter="chanel"]`, the five approved narrative beats, and local deep-link `/work/luxury-handbag-pricing-architecture/`.

- [ ] **Step 1: Add a failing Chanel narrative test**

Add:

```ts
test('Chanel follows the approved question-first narrative', async ({ page }) => {
  await page.goto('/');
  const chanel = page.locator('[data-home-chapter="chanel"]');

  await expect(chanel).toBeVisible();
  await expect(chanel.getByText('MILAN · 2025 → NOW')).toBeVisible();
  await expect(chanel.getByRole('heading', {
    level: 2,
    name: 'Luxury Was Slowing. Why Did Chanel Look Different?',
  })).toBeVisible();
  await expect(chanel.getByText('I started with what I could see.')).toBeVisible();
  await expect(chanel.getByText('But something still felt missing.')).toBeVisible();
  await expect(chanel.locator('[data-chanel-price-position]')).toBeVisible();
  await expect(chanel.locator('[data-chanel-history]')).toBeVisible();
  await expect(chanel.locator('[data-chanel-business]')).toBeVisible();
  await expect(chanel.getByText('The question is still open.')).toBeVisible();
  await expect(chanel.getByRole('link', { name: 'Explore the research →' })).toHaveAttribute(
    'href',
    '/work/luxury-handbag-pricing-architecture/',
  );

  for (const forbidden of [
    'VISUAL / MARKET',
    'CHANEL PREMIUMIZATION STRATEGY',
    'CURRENT SNAPSHOT',
    'Price, history, performance',
  ]) {
    await expect(chanel.getByText(forbidden, { exact: true })).toHaveCount(0);
  }
});
```

- [ ] **Step 2: Run the Chanel test and verify it fails against `LuxuryFeature`**

```bash
npx playwright test tests/e2e/home.spec.ts -g "Chanel follows"
```

Expected: FAIL because the new selectors/title/sequence are absent.

- [ ] **Step 3: Create `ChanelPricePosition.astro` using the existing peer data**

Use `LUXURY_PRICE_SUMMARY` directly. The component should display both markets as compact small multiples, not an expandable dashboard. Derive a shared per-market scale from min/max and render each brand range + median. Keep labels accessible.

Core structure:

```astro
---
import { LUXURY_PRICE_SUMMARY, type LuxuryPriceSummary } from '../../data/luxury';

const markets = ['FR', 'US'] as const;
const formatCurrency = (value: number, currency: LuxuryPriceSummary['currency']) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const panels = markets.map((market) => {
  const rows = LUXURY_PRICE_SUMMARY.filter((row) => row.market === market);
  const min = Math.min(...rows.map((row) => row.minimum));
  const max = Math.max(...rows.map((row) => row.maximum));
  return { market, rows, min, span: max - min };
});
---

<div class="chanel-price-position" data-chanel-price-position>
  <p class="chanel-question editorial">Where does Chanel actually sit?</p>
  <div class="chanel-price-position__markets">
    {panels.map((panel) => (
      <div class="chanel-price-position__market">
        <p class="data-copy">{panel.market === 'FR' ? 'France' : 'United States'}</p>
        {panel.rows.map((row) => {
          const left = ((row.minimum - panel.min) / panel.span) * 100;
          const width = ((row.maximum - row.minimum) / panel.span) * 100;
          const median = ((row.median - panel.min) / panel.span) * 100;
          return (
            <div class:list={['chanel-price-position__row', row.brand === 'CHANEL' && 'is-chanel']}>
              <span class="data-copy">{row.brand}</span>
              <span
                class="chanel-price-position__rail"
                role="img"
                aria-label={`${row.brand}: ${formatCurrency(row.minimum, row.currency)} to ${formatCurrency(row.maximum, row.currency)}, median ${formatCurrency(row.median, row.currency)}`}
              >
                <i style={`--range-left:${left}%;--range-width:${width}%;--median:${median}%;`}></i>
              </span>
            </div>
          );
        })}
      </div>
    ))}
  </div>
</div>
```

Do not add ranking language such as “most expensive”.

- [ ] **Step 4: Create `ChanelHistorySignal.astro` from the existing historical facts**

Render the exact source-backed facts:

```astro
---
import { LUXURY_FLAGSHIP } from '../../data/luxury';
---

<div class="chanel-history-signal" data-chanel-history data-home-motion>
  <p class="chanel-question editorial">Was this position new?</p>
  <div class="chanel-history-signal__rows">
    <div>
      <span class="data-copy">Classic median · 2022 → 2026</span>
      <strong class="display">+{LUXURY_FLAGSHIP.historical.classicShift.toFixed(1)}%</strong>
    </div>
    <div>
      <span class="data-copy">Mini / access-core · 2022 → 2026</span>
      <strong class="display">+{LUXURY_FLAGSHIP.historical.miniShift.toFixed(1)}%</strong>
    </div>
  </div>
  <p class="body-copy">
    The Classic-to-Mini ratio moved from {LUXURY_FLAGSHIP.historical.ratioFrom.toFixed(3)}× to {LUXURY_FLAGSHIP.historical.ratioTo.toFixed(3)}×, while the absolute gap expanded from €4,470 to €5,350.
  </p>
</div>
```

- [ ] **Step 5: Create `ChanelBusinessSignal.astro` as a non-linear evidence beat**

Use only data already in `LUXURY_FLAGSHIP.financial`:

```astro
---
import { LUXURY_FLAGSHIP } from '../../data/luxury';
const signed = (value: number) => `${value > 0 ? '+' : '−'}${Math.abs(value).toFixed(1)}%`;
---

<div class="chanel-business-signal" data-chanel-business data-home-motion>
  <p class="chanel-question editorial">The business complicated the story.</p>
  <div class="chanel-business-signal__baseline">
    <span><small>Nominal revenue CAGR · FY20–25</small><strong>{signed(LUXURY_FLAGSHIP.financial.revenueCagr)}</strong></span>
    <span><small>Operating margin</small><strong>{LUXURY_FLAGSHIP.financial.marginFrom.toFixed(1)} → {LUXURY_FLAGSHIP.financial.marginTo.toFixed(1)}%</strong></span>
  </div>
  <div class="chanel-business-signal__shock">
    <span><small>2024 comparable revenue</small><strong>{signed(LUXURY_FLAGSHIP.financial.comparableGrowth)}</strong></span>
    <span><small>2024 operating profit</small><strong>{signed(LUXURY_FLAGSHIP.financial.operatingProfit)}</strong></span>
    <span><small>2024 free cash flow</small><strong>{signed(LUXURY_FLAGSHIP.financial.fcfChange)}</strong></span>
    <span><small>2025 free cash flow</small><strong>{signed(LUXURY_FLAGSHIP.financial.reboundFcf)}</strong></span>
  </div>
</div>
```

This deliberately shows pressure and rebound instead of a “success” chart.

- [ ] **Step 6: Create `ChanelChapter.astro` with the approved narrative order**

Use one semantic `section` with internal narrative blocks. Do not render `Scene` labels. The public flow must be:

```astro
<section
  id="work"
  class="chanel-chapter editorial-grid"
  aria-labelledby="chanel-title"
  data-home-chapter="chanel"
  data-work-slug="luxury-handbag-pricing-architecture"
>
  <div class="chanel-chapter__opening">
    <p class="data-copy">{copy.context}</p>
    <h2 id="chanel-title" class="display">{copy.title}</h2>
    <p class="editorial">{copy.opening}</p>
  </div>

  <div class="chanel-chapter__return motion-reveal" data-home-motion>
    <p class="editorial">{copy.return}</p>
  </div>

  <div class="chanel-chapter__visible">
    <h3 class="editorial">{copy.visibleStart}</h3>
    <p class="body-copy">{copy.marketing}</p>
    <ChanelPricePosition />
    <ChanelHistorySignal />
  </div>

  <div class="chanel-chapter__turn motion-reveal" data-home-motion>
    <h3 class="display">{copy.missing}</h3>
    <p class="editorial">{copy.missingBody}</p>
  </div>

  <ChanelBusinessSignal />

  <div class="chanel-chapter__current motion-reveal" data-home-motion>
    <p class="editorial">{copy.current}</p>
    <p class="body-copy">{copy.unresolved}</p>
    <p class="display chanel-chapter__status">{copy.status}</p>
    <a href={copy.href}>{copy.cta}</a>
  </div>
</section>
```

- [ ] **Step 7: Add `home-chanel.css` and import it from `index.astro`**

Use normal scrolling and density/whitespace for pacing. Baseline CSS:

```css
.chanel-chapter {
  border-top: 1px solid var(--hairline);
  padding-block: clamp(5rem, 10vw, 10rem);
  row-gap: clamp(5rem, 10vw, 10rem);
}

.chanel-chapter > * { grid-column: 1 / -1; }

.chanel-chapter__opening,
.chanel-chapter__return,
.chanel-chapter__turn,
.chanel-chapter__current {
  max-width: 48rem;
}

.chanel-chapter__opening h2 {
  max-width: 14ch;
  margin: var(--space-4) 0 var(--space-6);
  font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 300;
  line-height: 0.94;
  letter-spacing: -0.045em;
}

.chanel-chapter__turn {
  padding-block: clamp(4rem, 9vw, 9rem);
}

.chanel-chapter__turn h3 {
  max-width: 14ch;
  font-size: clamp(2.7rem, 6vw, 5.5rem);
  font-weight: 300;
  line-height: 0.95;
}

.chanel-price-position__markets {
  display: grid;
  gap: var(--space-8);
}

@media (min-width: 72rem) {
  .chanel-chapter__opening { grid-column: 1 / span 8; }
  .chanel-chapter__return { grid-column: 4 / span 6; }
  .chanel-chapter__visible { grid-column: 2 / span 10; }
  .chanel-chapter__turn { grid-column: 3 / span 8; }
  .chanel-business-signal { grid-column: 2 / span 10; }
  .chanel-chapter__current { grid-column: 5 / span 7; }
  .chanel-price-position__markets { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
```

Use `var(--ink)`, `var(--ink-muted)`, `var(--hairline)`, `var(--paper-raised)`, and existing motion tokens. Do not add brand colors.

- [ ] **Step 8: Replace `LuxuryFeature` with `ChanelChapter` in `src/pages/index.astro`**

For this task only, keep the rest of the old page components in place. Import:

```astro
import ChanelChapter from '../components/home/ChanelChapter.astro';
import '../styles/home-chanel.css';
```

Render:

```astro
<ChanelChapter copy={HOME_STATE.projects.chanel} />
```

`ChanelChapter` should not need the work collection entry for copy. Source-backed evidence comes from `src/data/luxury.ts`.

- [ ] **Step 9: Run focused checks**

```bash
npm run check
npm run lint
npx playwright test tests/e2e/home.spec.ts -g "Chanel follows"
npx playwright test tests/e2e/home-motion.spec.ts
```

Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add src/components/home/ChanelChapter.astro src/components/home/ChanelPricePosition.astro src/components/home/ChanelHistorySignal.astro src/components/home/ChanelBusinessSignal.astro src/styles/home-chanel.css src/pages/index.astro tests/e2e/home.spec.ts
git commit -m "feat: turn Chanel home feature into a narrative chapter"
```

---

## Task 4: Replace the Olist report module with the compact growth narrative

**Files:**
- Create: `src/components/home/OlistChapter.astro`
- Create: `src/components/home/OlistDataMap.astro`
- Create: `src/styles/home-olist.css`
- Modify: `src/pages/index.astro`
- Modify: `tests/e2e/home.spec.ts`

**Consumes:** `HOME_STATE.projects.olist`, `OLIST_DATA_METRICS`

**Produces:** `[data-home-chapter="olist"]`, Samsung origin, no-predefined-question copy, lightweight data map, two-metric tension, local deep link.

- [ ] **Step 1: Add the failing Olist contract**

```ts
test('Olist shows capability growth rather than a SQL skill showcase', async ({ page }) => {
  await page.goto('/');
  const olist = page.locator('[data-home-chapter="olist"]');

  await expect(olist.getByText('SAMSUNG · 2025 → OLIST · 2026')).toBeVisible();
  await expect(olist.getByRole('heading', {
    level: 2,
    name: 'SQL Wasn’t the Hard Part. Knowing What to Ask Was.',
  })).toBeVisible();
  await expect(olist.getByText('What I wanted to learn next was how to know what to ask.')).toBeVisible();
  await expect(olist.getByText(
    'There was no research question at the beginning. I started by understanding what was in the data — and what wasn’t.',
  )).toBeVisible();
  await expect(olist.locator('[data-olist-data-map]')).toBeVisible();
  await expect(olist.locator('[data-olist-tension]')).toContainText('R$2.99M');
  await expect(olist.locator('[data-olist-tension]')).toContainText('R$7.22M');
  await expect(olist.locator('[data-olist-tension]')).toContainText('96.50%');
  await expect(olist.locator('[data-olist-tension]')).toContainText('92.27%');
  await expect(olist.getByText('SQL stopped being the task. It became the language I used to investigate a business.')).toBeVisible();
  await expect(olist.getByRole('link', { name: 'Explore the analysis →' })).toHaveAttribute(
    'href',
    '/work/olist-marketplace-analysis/',
  );
  await expect(olist.getByText('GROW', { exact: true })).toHaveCount(0);
  await expect(olist.getByText('DEFEND', { exact: true })).toHaveCount(0);
  await expect(olist.getByText('FIX', { exact: true })).toHaveCount(0);
  await expect(olist.getByText('INVESTIGATE', { exact: true })).toHaveCount(0);
});
```

- [ ] **Step 2: Run it and verify failure against the old `OlistFeature`**

```bash
npx playwright test tests/e2e/home.spec.ts -g "Olist shows capability growth"
```

Expected: FAIL because old headline, decision paths, and accordion are still present.

- [ ] **Step 3: Create an accessible `OlistDataMap.astro`**

Use a small static map of the actual Olist table concepts. Do not create a full ERD.

```astro
<div
  class="olist-data-map"
  data-olist-data-map
  role="img"
  aria-label="Olist data connects orders with customers, order items, products, sellers, payments, and reviews"
>
  <span class="olist-data-map__node is-core">orders</span>
  <span class="olist-data-map__node">customers</span>
  <span class="olist-data-map__node">order_items</span>
  <span class="olist-data-map__node">products</span>
  <span class="olist-data-map__node">sellers</span>
  <span class="olist-data-map__node">payments</span>
  <span class="olist-data-map__node">reviews</span>
</div>
```

This visual exists to communicate “an unfamiliar business dataset with relationships,” not SQL complexity.

- [ ] **Step 4: Create `OlistChapter.astro`**

Pull only `gmv` and `on-time` from `OLIST_DATA_METRICS` and assert both exist:

```astro
---
import { OLIST_DATA_METRICS } from '../../data/olist';
import OlistDataMap from './OlistDataMap.astro';

interface Props { copy: typeof import('../../data/home').HOME_STATE.projects.olist }
const { copy } = Astro.props;
const gmv = OLIST_DATA_METRICS.find((metric) => metric.id === 'gmv');
const onTime = OLIST_DATA_METRICS.find((metric) => metric.id === 'on-time');
if (!gmv || gmv.id !== 'gmv' || !onTime || onTime.id !== 'on-time') {
  throw new Error('Olist homepage requires GMV and on-time comparison metrics.');
}
---

<section
  id="olist"
  class="olist-chapter editorial-grid"
  aria-labelledby="olist-title"
  data-home-chapter="olist"
  data-work-slug="olist-marketplace-analysis"
>
  <div class="olist-chapter__intro">
    <p class="data-copy">{copy.context}</p>
    <h2 id="olist-title" class="display">{copy.title}</h2>
    <p class="editorial">{copy.samsung}</p>
  </div>

  <div class="olist-chapter__progression">
    <p class="body-copy">{copy.learning}</p>
    <p class="display olist-chapter__highlight">{copy.highlight}</p>
    <p class="editorial">{copy.arrival}</p>
    <p class="body-copy">{copy.noQuestion}</p>
    <OlistDataMap />
  </div>

  <div class="olist-chapter__tension" data-olist-tension data-home-motion>
    <div>
      <span class="data-copy">{gmv.label}</span>
      <strong>{gmv.fromLabel} → {gmv.toLabel}</strong>
      <small>{gmv.note}</small>
    </div>
    <div>
      <span class="data-copy">{onTime.label}</span>
      <strong>{onTime.fromLabel} → {onTime.toLabel}</strong>
      <small>{onTime.note}</small>
    </div>
  </div>

  <blockquote class="olist-chapter__question">{copy.businessQuestion}</blockquote>

  <div class="olist-chapter__end">
    <p class="display">{copy.shift}</p>
    <p class="body-copy">{copy.reflection}</p>
    <a href={copy.href}>{copy.cta}</a>
  </div>
</section>
```

- [ ] **Step 5: Add `home-olist.css` with a tighter rhythm than Chanel**

Use substantially smaller vertical gaps than `home-chanel.css`:

```css
.olist-chapter {
  border-top: 1px solid var(--hairline);
  padding-block: clamp(4rem, 7vw, 7rem);
  row-gap: clamp(2.5rem, 5vw, 5rem);
}

.olist-chapter > * { grid-column: 1 / -1; }

.olist-chapter__intro h2 {
  max-width: 17ch;
  margin: var(--space-3) 0 var(--space-5);
  font-size: clamp(2.6rem, 5.5vw, 5rem);
  font-weight: 300;
  line-height: 0.96;
}

.olist-chapter__highlight {
  max-width: 18ch;
  margin-block: clamp(2rem, 4vw, 4rem);
  font-size: clamp(2rem, 4vw, 3.6rem);
  font-weight: 300;
  line-height: 1;
}

.olist-data-map {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
  margin-top: var(--space-6);
}

.olist-data-map__node {
  border-top: 1px solid var(--hairline);
  padding-block: var(--space-3);
  font-family: var(--font-data);
  font-size: 0.75rem;
}

.olist-data-map__node.is-core {
  border-top-color: var(--ink);
  font-weight: 600;
}

.olist-chapter__tension {
  display: grid;
  gap: var(--space-6);
}

.olist-chapter__tension strong {
  display: block;
  margin-top: var(--space-2);
  font-family: var(--font-editorial);
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 300;
}

@media (min-width: 72rem) {
  .olist-chapter__intro { grid-column: 1 / span 7; }
  .olist-chapter__progression { grid-column: 4 / span 7; }
  .olist-chapter__tension { grid-column: 2 / span 10; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .olist-chapter__question { grid-column: 4 / span 7; }
  .olist-chapter__end { grid-column: 6 / span 6; }
  .olist-data-map { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
```

- [ ] **Step 6: Replace `OlistFeature` in `index.astro` and import the stylesheet**

```astro
import OlistChapter from '../components/home/OlistChapter.astro';
import '../styles/home-olist.css';
```

Render:

```astro
<OlistChapter copy={HOME_STATE.projects.olist} />
```

- [ ] **Step 7: Run focused tests and commit**

```bash
npm run check
npm run lint
npx playwright test tests/e2e/home.spec.ts -g "Olist shows capability growth"
```

Expected: PASS.

```bash
git add src/components/home/OlistChapter.astro src/components/home/OlistDataMap.astro src/styles/home-olist.css src/pages/index.astro tests/e2e/home.spec.ts
git commit -m "feat: reshape Olist around problem discovery"
```

---

## Task 5: Replace Competitive Positioning with the unfinished smaller-company inquiry

**Files:**
- Create: `src/components/home/SmallerCompaniesChapter.astro`
- Create: `src/styles/home-inquiry.css`
- Modify: `src/pages/index.astro`
- Modify: `tests/e2e/home.spec.ts`

**Consumes:** `HOME_STATE.projects.smallerCompanies`

**Produces:** light text-led chapter, explicit uncertainty, no employer name, no homepage mechanism list.

- [ ] **Step 1: Add the failing privacy + unfinished-status test**

```ts
test('smaller-company chapter stays open-ended and protects current-employer details', async ({ page }) => {
  await page.goto('/');
  const inquiry = page.locator('[data-home-chapter="smaller-companies"]');

  await expect(inquiry.getByRole('heading', {
    level: 2,
    name: 'Why Do Some People Choose Smaller Companies?',
  })).toBeVisible();
  await expect(inquiry).toContainText('a quantitative investment firm');
  await expect(inquiry).toContainText('So I started looking elsewhere.');
  await expect(inquiry).toContainText('I’m still trying to understand this.');
  await expect(inquiry.getByRole('link', { name: 'Explore the current research →' })).toHaveAttribute(
    'href',
    '/work/why-some-people-choose-smaller-companies/',
  );
  await expect(inquiry).not.toContainText('JoinQuant');
  await expect(inquiry).not.toContainText('聚宽');
  await expect(inquiry.locator('[data-competitive-mechanism]')).toHaveCount(0);
});
```

- [ ] **Step 2: Run the test and verify failure against the old Competitive feature**

```bash
npx playwright test tests/e2e/home.spec.ts -g "smaller-company chapter"
```

Expected: FAIL because the old feature title/mechanism list still renders.

- [ ] **Step 3: Create the text-led chapter**

```astro
---
interface Props { copy: typeof import('../../data/home').HOME_STATE.projects.smallerCompanies }
const { copy } = Astro.props;
---

<section
  id="smaller-companies"
  class="smaller-companies-chapter editorial-grid"
  aria-labelledby="smaller-companies-title"
  data-home-chapter="smaller-companies"
  data-work-slug="competitive-positioning-against-giants"
>
  <div class="smaller-companies-chapter__question">
    <h2 id="smaller-companies-title" class="display">{copy.title}</h2>
    <p class="editorial">{copy.opening}</p>
  </div>

  <div class="smaller-companies-chapter__shift motion-reveal" data-home-motion>
    <p class="editorial">{copy.shift}</p>
  </div>

  <div class="smaller-companies-chapter__trail">
    <p class="display">{copy.turn}</p>
    <p class="body-copy">{copy.research}</p>
  </div>

  <div class="smaller-companies-chapter__status motion-reveal" data-home-motion>
    <p class="display">{copy.status}</p>
    <a href={copy.href}>{copy.cta}</a>
  </div>
</section>
```

Do not add benchmark counts or mechanism names on Home.

- [ ] **Step 4: Add the lighter visual treatment**

```css
.smaller-companies-chapter {
  border-top: 1px solid var(--hairline);
  padding-block: clamp(4rem, 7vw, 7rem);
  row-gap: clamp(3rem, 6vw, 6rem);
}

.smaller-companies-chapter > * { grid-column: 1 / -1; }

.smaller-companies-chapter__question h2 {
  max-width: 18ch;
  margin: 0 0 var(--space-6);
  font-size: clamp(2.7rem, 5.5vw, 5rem);
  font-weight: 300;
  line-height: 0.98;
}

.smaller-companies-chapter__trail {
  border-left: 1px solid var(--hairline);
  padding-left: clamp(1rem, 3vw, 2rem);
}

.smaller-companies-chapter__status .display {
  max-width: 18ch;
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 300;
  line-height: 1;
}

@media (min-width: 72rem) {
  .smaller-companies-chapter__question { grid-column: 1 / span 7; }
  .smaller-companies-chapter__shift { grid-column: 5 / span 6; }
  .smaller-companies-chapter__trail { grid-column: 3 / span 7; }
  .smaller-companies-chapter__status { grid-column: 7 / span 5; }
}
```

- [ ] **Step 5: Replace `CompetitiveFeature` in `index.astro`, import `home-inquiry.css`, run, and commit**

```bash
npm run check
npm run lint
npx playwright test tests/e2e/home.spec.ts -g "smaller-company chapter"
```

Expected: PASS.

```bash
git add src/components/home/SmallerCompaniesChapter.astro src/styles/home-inquiry.css src/pages/index.astro tests/e2e/home.spec.ts
git commit -m "feat: add open-ended smaller-company inquiry"
```

---

## Task 6: Add local deeper routes for Olist and the current smaller-company research

**Files:**
- Create: `src/pages/work/olist-marketplace-analysis.astro`
- Create: `src/pages/work/why-some-people-choose-smaller-companies.astro`
- Modify: `tests/e2e/home.spec.ts`

**Consumes:** existing `BaseLayout`, `HOME_STATE`, `OLIST_DATA_METRICS`, Olist GitHub source, `COMPETITIVE_MECHANISMS`, existing work content metadata.

**Produces:** both Home CTAs resolve to local, readable pages instead of dead routes or private repositories.

- [ ] **Step 1: Add route-resolution tests**

```ts
test('Olist and smaller-company CTAs resolve to local expansion pages', async ({ page }) => {
  await page.goto('/work/olist-marketplace-analysis/');
  await expect(page.getByRole('heading', {
    level: 1,
    name: 'SQL Wasn’t the Hard Part. Knowing What to Ask Was.',
  })).toBeVisible();
  await expect(page.getByText('Analysis trail')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Source analysis on GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/gabriel232ch/olist-marketplace-analytics/blob/main/README.md',
  );

  await page.goto('/work/why-some-people-choose-smaller-companies/');
  await expect(page.getByRole('heading', {
    level: 1,
    name: 'Why Do Some People Choose Smaller Companies?',
  })).toBeVisible();
  await expect(page.getByText('Current research')).toBeVisible();
  await expect(page.getByText('I’m still trying to understand this.')).toBeVisible();
  await expect(page.locator('body')).not.toContainText('JoinQuant');
  await expect(page.locator('body')).not.toContainText('聚宽');
});
```

- [ ] **Step 2: Run and verify 404/failure**

```bash
npx playwright test tests/e2e/home.spec.ts -g "CTAs resolve to local expansion pages"
```

Expected: FAIL because both routes do not yet exist.

- [ ] **Step 3: Create the Olist expansion page**

Use `BaseLayout`, keep styling local in a `<style>` block or reuse established work-page classes if available. Content must be evidence-led, not a learning certificate. The page should include:

```astro
<h1>{HOME_STATE.projects.olist.title}</h1>
<p>{HOME_STATE.projects.olist.noQuestion}</p>

<section aria-labelledby="analysis-trail-title">
  <h2 id="analysis-trail-title">Analysis trail</h2>
  <ol>
    <li>Understand the available tables and their grain.</li>
    <li>Test how marketplace growth changed over time.</li>
    <li>Separate order-volume growth from value growth.</li>
    <li>Compare scale with delivery reliability and review outcomes.</li>
    <li>Translate the observed tension into market and route priorities.</li>
  </ol>
</section>

<section aria-labelledby="evidence-title">
  <h2 id="evidence-title">What the current analysis found</h2>
  <!-- render all three OLIST_DATA_METRICS here, including Fix evidence -->
</section>

<section aria-labelledby="limits-title">
  <h2 id="limits-title">What the data cannot tell me</h2>
  <p>
    The dataset does not provide commission revenue, complete costs or margins, marketing exposure,
    seller acquisition cost, inventory availability, carrier identity, complete refunds, or experiment assignment.
    The analysis is observational and does not establish causal impact.
  </p>
</section>

<a href={OLIST_DATA_SOURCES.readme} target="_blank" rel="noreferrer">Source analysis on GitHub</a>
```

Do not turn the page into a list of SQL functions used.

- [ ] **Step 4: Create the smaller-company current-research page**

Use only safe public comparative material. Do not include employer-specific interview/process content. The page should include:

```astro
<h1>{HOME_STATE.projects.smallerCompanies.title}</h1>
<p>{HOME_STATE.projects.smallerCompanies.opening}</p>
<p>{HOME_STATE.projects.smallerCompanies.shift}</p>

<section aria-labelledby="current-research-title">
  <h2 id="current-research-title">Current research</h2>
  <p>
    One current research pass screened 28 organizations, structured 12 cases, completed six longitudinal deep dives,
    and used two counterexamples to test whether recurring mechanisms survived a wider comparison.
  </p>
  <p>
    The deep-dive cases were Linear, 37signals, XTX Markets, Pentagram, Midjourney, and DeepSeek.
    Allbirds and IDEO were used as counterexamples.
  </p>
</section>

<section aria-labelledby="patterns-title">
  <h2 id="patterns-title">Patterns I’m looking at</h2>
  <!-- render COMPETITIVE_MECHANISMS; label them as current analytical patterns, not recipes -->
</section>

<p class="research-status">{HOME_STATE.projects.smallerCompanies.status}</p>
```

Do not link to the private source archive as the only way to understand the page. The local page itself must be readable.

- [ ] **Step 5: Run route tests + build and commit**

```bash
npm run check
npm run build
npx playwright test tests/e2e/home.spec.ts -g "CTAs resolve to local expansion pages"
```

Expected: PASS.

```bash
git add src/pages/work/olist-marketplace-analysis.astro src/pages/work/why-some-people-choose-smaller-companies.astro tests/e2e/home.spec.ts
git commit -m "feat: add local research expansion routes"
```

---

## Task 7: Redesign `Now` and replace the source-directory closing

**Files:**
- Modify: `src/components/home/NowSection.astro`
- Create: `src/components/home/HomeClosing.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/home.css`
- Modify: `tests/e2e/home.spec.ts`

**Consumes:** `HOME_STATE.now`, `HOME_STATE.closing`

**Produces:** four lightweight current-life signals, optional image support, warm closing, one real GitHub link.

- [ ] **Step 1: Replace the old Now/Closing test**

```ts
test('Now shows a life in progress and the page ends warmly', async ({ page }) => {
  await page.goto('/');
  const now = page.locator('#about');

  await expect(now.locator('[data-now-item]')).toHaveCount(4);
  await expect(now).toContainText('Learning');
  await expect(now).toContainText('Italian');
  await expect(now).toContainText('Working on');
  await expect(now).toContainText('gabrielchen.me');
  await expect(now).toContainText('Playing');
  await expect(now).toContainText('Baldur’s Gate 3');
  await expect(now).toContainText('Thinking about');
  await expect(now).toContainText('Why do some people choose smaller companies?');
  await expect(now.locator('[data-personal-snapshot]')).toHaveCount(0);
  await expect(now).not.toContainText('PRIMARY THREAD / CURRENT ATTENTION');
  await expect(now).not.toContainText('Employer Brand / GEO at JoinQuant');

  const closing = page.locator('[data-home-closing]');
  await expect(closing).toContainText('I’ll keep adding things here as I go.');
  await expect(closing.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/gabriel232ch',
  );
  await expect(closing).not.toContainText('CLOSING / SOURCES');
  await expect(closing).not.toContainText('RETURN TO WORK');
  await expect(closing).not.toContainText('PUBLIC SOURCE');
});
```

- [ ] **Step 2: Run and verify failure against the old professional-status section and EditorialClosing**

```bash
npx playwright test tests/e2e/home.spec.ts -g "Now shows a life in progress"
```

Expected: FAIL.

- [ ] **Step 3: Rewrite `NowSection.astro` around the item array**

Use this interface:

```astro
---
import type { HOME_STATE } from '../../data/home';
interface Props { now: typeof HOME_STATE.now }
const { now } = Astro.props;
---

<section id="about" class="home-now editorial-grid" aria-labelledby="now-title">
  <div class="home-now__heading">
    <h2 id="now-title" class="display">Now</h2>
  </div>

  <div class="home-now__items">
    {now.items.map((item) => (
      <article class="home-now__item motion-reveal" data-home-motion data-now-item={item.id}>
        <p class="data-copy">{item.label}</p>
        <p class="editorial">{item.value}</p>
      </article>
    ))}
  </div>

  {now.personalSnapshot && (
    <figure class="home-now__snapshot" data-personal-snapshot>
      <img src={now.personalSnapshot.src} alt={now.personalSnapshot.alt} />
      {now.personalSnapshot.caption && <figcaption>{now.personalSnapshot.caption}</figcaption>}
    </figure>
  )}
</section>
```

- [ ] **Step 4: Create `HomeClosing.astro`**

```astro
---
import type { HOME_STATE } from '../../data/home';
interface Props { closing: typeof HOME_STATE.closing }
const { closing } = Astro.props;
---

<footer class="home-closing editorial-grid" data-home-closing>
  <p class="home-closing__message editorial">{closing.message}</p>
  <nav class="home-closing__links" aria-label="Gabriel links">
    {closing.links.map((link) => (
      <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
    ))}
  </nav>
  <p class="home-closing__name data-copy">Gabriel Chen</p>
</footer>
```

- [ ] **Step 5: Replace old Now/Closing styles instead of layering overrides**

Delete selectors tied to:

```text
.home-now__label
.home-now__primary
.home-now__primary-title
.home-now__primary-state
.home-now__side
.home-now__side-thread
.home-now__author-note
.editorial-closing*
```

Add:

```css
.home-now {
  border-top: 1px solid var(--hairline);
  padding-block: clamp(5rem, 8vw, 8rem);
  row-gap: clamp(2.5rem, 5vw, 5rem);
}

.home-now__heading,
.home-now__items,
.home-now__snapshot { grid-column: 1 / -1; }

.home-now__heading h2 {
  margin: 0;
  font-size: clamp(2.8rem, 5vw, 4.8rem);
  font-weight: 300;
}

.home-now__items {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

.home-now__item {
  border-top: 1px solid var(--hairline);
  padding-top: var(--space-3);
}

.home-now__item p { margin: 0; }
.home-now__item .editorial {
  margin-top: var(--space-2);
  font-size: clamp(1.35rem, 2.2vw, 1.9rem);
}

.home-closing {
  border-top: 1px solid var(--hairline);
  padding-block: clamp(5rem, 8vw, 8rem) clamp(7rem, 12vw, 12rem);
  row-gap: var(--space-6);
}

.home-closing__message,
.home-closing__links,
.home-closing__name { grid-column: 1 / -1; }

.home-closing__message {
  max-width: 22ch;
  margin: 0;
  font-size: clamp(2.2rem, 4.5vw, 4rem);
  line-height: 1.02;
}

.home-closing__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
}

@media (min-width: 48rem) {
  .home-now__items { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 72rem) {
  .home-now__heading { grid-column: 1 / span 3; }
  .home-now__items { grid-column: 4 / span 9; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .home-closing__message { grid-column: 3 / span 8; }
  .home-closing__links { grid-column: 3 / span 8; }
  .home-closing__name { grid-column: 3 / span 8; }
}
```

- [ ] **Step 6: Update `index.astro`**

Import `HomeClosing`, remove `EditorialClosing`, remove closing-source derivation, and render:

```astro
<NowSection now={HOME_STATE.now} />
<HomeClosing closing={HOME_STATE.closing} />
```

- [ ] **Step 7: Run focused tests and commit**

```bash
npm run check
npm run lint
npx playwright test tests/e2e/home.spec.ts -g "Now shows a life in progress"
```

Expected: PASS.

```bash
git add src/components/home/NowSection.astro src/components/home/HomeClosing.astro src/pages/index.astro src/styles/home.css tests/e2e/home.spec.ts
git commit -m "feat: make Now and ending feel lived-in"
```

---

## Task 8: Integrate the whole page, remove retired components/styles, and update motion/responsive contracts

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/home.css`
- Modify: `src/components/home/HomeMotionController.astro` only if counter code is now dead
- Delete: `src/components/home/LuxuryFeature.astro`
- Delete: `src/components/home/OlistFeature.astro`
- Delete: `src/components/home/CompetitiveFeature.astro`
- Delete: `src/components/home/EditorialClosing.astro`
- Modify: `tests/e2e/home.spec.ts`
- Modify: `tests/e2e/home-motion.spec.ts`

**Produces:** final public sequence `navigation → Hero → Chanel → Olist → smaller companies → Now → closing`, no legacy report UI, no dead homepage CSS, no horizontal overflow.

- [ ] **Step 1: Replace the old integrated-order E2E test**

```ts
test('Home preserves the approved personal-digital-home order', async ({ page }) => {
  await page.goto('/');

  const landmarks = page.locator('main > header, main > section, main > footer');
  await expect(landmarks).toHaveCount(7);
  await expect(landmarks.nth(0)).toHaveClass(/home-navigation/);
  await expect(landmarks.nth(1)).toHaveClass(/home-hero/);
  await expect(landmarks.nth(2)).toHaveAttribute('data-home-chapter', 'chanel');
  await expect(landmarks.nth(3)).toHaveAttribute('data-home-chapter', 'olist');
  await expect(landmarks.nth(4)).toHaveAttribute('data-home-chapter', 'smaller-companies');
  await expect(landmarks.nth(5)).toHaveId('about');
  await expect(landmarks.nth(6)).toHaveAttribute('data-home-closing', '');

  await expect(page.getByText('Selected work', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Featured', { exact: true })).toHaveCount(0);
});
```

- [ ] **Step 2: Replace legacy research-notes/no-JS tests with readable-static-content tests**

The new homepage should remain readable with JavaScript disabled even though it no longer relies on `details` for research notes:

```ts
test('Home core narrative remains readable with JavaScript disabled', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Gabriel Chen' })).toBeVisible();
    await expect(page.locator('[data-home-chapter="chanel"]')).toBeVisible();
    await expect(page.locator('[data-home-chapter="olist"]')).toBeVisible();
    await expect(page.locator('[data-home-chapter="smaller-companies"]')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('[data-home-closing]')).toBeVisible();
  } finally {
    await context.close();
  }
});
```

Keep the overflow test but remove all references to `[data-home-reading]` and opening every `<details>` on Home.

- [ ] **Step 3: Update motion tests to match the new page**

Keep the generic `[data-home-motion]` and signature reduced-motion tests. Remove the old assertion that opens `[data-research-notes]`. Add a direct visibility assertion instead:

```ts
await expect(page.locator('[data-home-chapter="chanel"]')).toBeVisible();
await expect(page.locator('[data-home-chapter="olist"]')).toBeVisible();
await expect(page.locator('[data-home-chapter="smaller-companies"]')).toBeVisible();
```

If no `[data-count]` remains anywhere in the new Home, remove the counter query/reveal code from `HomeMotionController.astro`. If any `data-count` remains, keep it. Confirm by running:

```bash
rg "data-count" src/components/home src/pages/index.astro
```

Expected after this redesign: no result. In that case reduce the controller to observing only `[data-home-motion]`.

- [ ] **Step 4: Make `index.astro` the final thin composition**

It should be close to:

```astro
---
import '@fontsource-variable/newsreader/wght.css';
import BaseLayout from '../layouts/BaseLayout.astro';
import HomeNavigation from '../components/home/HomeNavigation.astro';
import HomeHero from '../components/home/HomeHero.astro';
import ChanelChapter from '../components/home/ChanelChapter.astro';
import OlistChapter from '../components/home/OlistChapter.astro';
import SmallerCompaniesChapter from '../components/home/SmallerCompaniesChapter.astro';
import NowSection from '../components/home/NowSection.astro';
import HomeClosing from '../components/home/HomeClosing.astro';
import HomeMotionController from '../components/home/HomeMotionController.astro';
import { HOME_STATE } from '../data/home';
import '../styles/home.css';
import '../styles/home-chanel.css';
import '../styles/home-olist.css';
import '../styles/home-inquiry.css';
---

<BaseLayout title="Gabriel Chen">
  <main>
    <HomeNavigation />
    <HomeHero state={HOME_STATE} />
    <ChanelChapter copy={HOME_STATE.projects.chanel} />
    <OlistChapter copy={HOME_STATE.projects.olist} />
    <SmallerCompaniesChapter copy={HOME_STATE.projects.smallerCompanies} />
    <NowSection now={HOME_STATE.now} />
    <HomeClosing closing={HOME_STATE.closing} />
    <HomeMotionController />
  </main>
</BaseLayout>
```

The homepage no longer needs `getCollection('work')` solely to feed the retired generic features.

- [ ] **Step 5: Remove retired components and dead CSS**

Delete the four retired components only now. In `home.css`, remove rules whose selectors exist only for the old features, including old `.luxury-feature`, `.olist-feature`, `.competitive-feature`, `.work-research-notes`, `.editorial-closing`, and old data-story styles that are not used by the new chapter files.

Verify selectors are not referenced before deletion:

```bash
rg "LuxuryFeature|OlistFeature|CompetitiveFeature|EditorialClosing|work-research-notes|olist-data-story|competitive-data-story" src tests
```

Expected after cleanup: no source/test references to retired components/styles.

Do not remove `src/data/luxury.ts`, `src/data/olist.ts`, `src/data/competitive.ts`, the existing Chanel work page, or global editorial primitives used elsewhere.

- [ ] **Step 6: Run the integrated behavior suite**

```bash
npm run check
npm run lint
npm run test
npx playwright test tests/e2e/home.spec.ts tests/e2e/home-motion.spec.ts tests/e2e/theme.spec.ts
```

Expected: all PASS.

- [ ] **Step 7: Verify overflow explicitly at the existing breakpoints**

Keep/add this E2E assertion:

```ts
for (const width of [390, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(overflow, `overflow at ${width}px`).toBe(false);
}
```

Run:

```bash
npx playwright test tests/e2e/home.spec.ts -g "overflow"
```

Expected: PASS at all four widths.

- [ ] **Step 8: Commit the integrated cleanup**

```bash
git add -A
git commit -m "refactor: integrate personal digital home architecture"
```

---

## Task 9: Browser QA, visual baselines, and final verification

**Files:**
- Modify: `src/styles/home.css` only for browser-proven shared fixes
- Modify: `src/styles/home-chanel.css` only for Chanel browser-proven fixes
- Modify: `src/styles/home-olist.css` only for Olist browser-proven fixes
- Modify: `src/styles/home-inquiry.css` only for inquiry browser-proven fixes
- Modify: `tests/e2e/home-visual.spec.ts` only if selector/setup changes are necessary
- Update generated visual snapshot files under the existing Playwright snapshot directory after QA

**Produces:** final visually checked Home across desktop/mobile, light/dark, reduced motion, with approved snapshots and full verification.

- [ ] **Step 1: Run the development server and inspect the whole Home at four widths**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Inspect at least:

```text
390 × 844
768 × 1024
1024 × 900
1440 × 900
```

For each width, verify all of the following in the browser:

```text
Hero signature and right-side sentence feel balanced.
No taxonomy or project-index language appears.
Hero flows directly into MILAN · 2025 → NOW.
Chanel is visibly the slowest / most spacious chapter without scroll hijacking.
Chanel price labels do not overlap at 390px.
The “But something still felt missing.” pause is visually obvious.
Olist is materially shorter and faster than Chanel.
Olist data map reads as relationships, not a dense ERD.
The two Olist metrics remain legible without shrinking below normal metadata sizes.
The smaller-company chapter feels lighter than Olist and does not resemble a completed case-study dashboard.
Now feels like a personal present-tense section rather than a work-status panel.
The ending has substantial whitespace after the closing line and link(s).
No section creates horizontal overflow.
```

- [ ] **Step 2: Check light and dark themes manually**

Use the existing theme toggle at desktop and mobile widths. Confirm:

```text
All hairlines remain visible but subdued.
No chart depends on a hard-coded light background.
Chanel emphasis survives dark mode without adding brand colors.
Olist rails/nodes remain legible.
Closing links have visible hover/focus states.
```

- [ ] **Step 3: Check reduced motion**

In browser devtools or Playwright, emulate `prefers-reduced-motion: reduce`. Confirm:

```text
Signature renders complete immediately.
All [data-home-motion] content is visible.
No content relies on animation to become readable.
No layout jumps occur while scrolling.
```

- [ ] **Step 4: Apply only browser-proven visual fixes**

When QA finds a defect, change the responsible stylesheet instead of adding a generic override block at the end of `home.css`. Keep chapter-specific fixes in their chapter stylesheet.

After every CSS adjustment run:

```bash
npm run check
npm run lint
npx playwright test tests/e2e/home.spec.ts tests/e2e/home-motion.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Update the approved visual baselines**

The existing visual tests already cover desktop/mobile light/dark. After manual browser QA is satisfactory, run:

```bash
npm run test:e2e:update -- tests/e2e/home-visual.spec.ts
```

Then inspect the generated four snapshots manually before committing them. The expected set remains:

```text
home-desktop-light.png
home-desktop-dark.png
home-mobile-light.png
home-mobile-dark.png
```

- [ ] **Step 6: Run full repository verification**

Run:

```bash
npm run verify
```

Expected:

```text
astro check: no errors
eslint: pass
vitest: pass
astro build: pass
playwright: pass, including Home visual baselines
```

Do not claim completion if any stage fails.

- [ ] **Step 7: Run a final public-copy leak scan**

Run:

```bash
rg -n "RESEARCH / SYSTEMS / NOTES|VISUAL / MARKET|SYSTEM / ANALYTICS|STRATEGY / COMPARATIVE|PRIMARY THREAD / CURRENT ATTENTION|CLOSING / SOURCES|CHANEL PREMIUMIZATION STRATEGY|JoinQuant|聚宽|Scene 1|cinematic chapter|capability progression|living snapshot" src/pages/index.astro src/components/home src/data/home.ts
```

Expected: no matches in rendered-home source, except internal code comments if they are not user-visible. Prefer removing even unnecessary internal comments from render components so the result is unambiguous.

- [ ] **Step 8: Commit QA-approved final state**

```bash
git add -A
git commit -m "test: approve personal digital home visual baseline"
```

---

## Final Self-Review Checklist for the Executor

Before reporting completion, verify the implementation against the design spec section by section:

```text
[ ] Hero is identity-only and preserves the exact approved sentence.
[ ] No Hero folio, Start Reading list, project teaser rows, or replacement taxonomy remains.
[ ] No Selected Work / Featured / numbered gate sits between Hero and Chanel.
[ ] Chanel uses the canonical title and five-beat question-first progression.
[ ] Chanel marketing is descriptive only; price is the first substantive evidence.
[ ] Chanel shows historical pricing before the “something missing” turn.
[ ] Chanel business evidence shows 2024 pressure and 2025 context, not a linear success story.
[ ] Chanel ends with “The question is still open.” and a local research link.
[ ] Olist is visibly more compact than Chanel.
[ ] Olist starts from Samsung as the real-data origin and does not reduce learning to GitHub exercises.
[ ] Olist explicitly states there was no research question at the beginning.
[ ] Olist homepage evidence is limited to the business tension needed for the narrative.
[ ] Olist local analysis route exists and is evidence/method oriented rather than a SQL syntax showcase.
[ ] Smaller-company chapter uses the exact title “Why Do Some People Choose Smaller Companies?”.
[ ] Current employer remains anonymized as “a quantitative investment firm”.
[ ] No private interview/recruiting/process information is published.
[ ] Smaller-company homepage does not show the full benchmark/mechanism dashboard.
[ ] Smaller-company local current-research route is readable without access to a private source archive.
[ ] “I’m still trying to understand this.” is visible.
[ ] Now contains Learning / Working on / Playing / Thinking about and works without a photo.
[ ] No Duolingo or Instagram API work was added.
[ ] Closing says “I’ll keep adding things here as I go.”
[ ] No recruiter-first CTA exists.
[ ] Internal planning vocabulary does not appear publicly.
[ ] Desktop/mobile and light/dark have been manually inspected.
[ ] Reduced motion works.
[ ] No horizontal overflow exists at 390 / 768 / 1024 / 1440 widths.
[ ] npm run verify passes from a clean working tree state except the intended uncommitted changes before the final commit.
```

## Execution Handoff

Recommended execution path for Codex:

1. Use `superpowers:using-git-worktrees` to create an isolated implementation worktree from the current approved main state.
2. Use `superpowers:subagent-driven-development` to execute Tasks 1–9 in order, with a fresh implementation subagent and review gate per task.
3. Use `superpowers:verification-before-completion` before claiming the redesign is complete.
4. Do not merge or deploy until Gabriel has reviewed the final browser result.

The alternative is `superpowers:executing-plans` in one implementation session with checkpoints after each task. The subagent-driven path is preferred because Chanel, Olist, the living inquiry, and the final integrated QA are separable review units while still sharing one approved architecture.
