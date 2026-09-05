# Gabriel Portfolio — Phase 2 Home v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved Home v1 as a living editorial front door using only real curated content, the frozen Phase 1 design system, responsive editorial compositions, and discrete viewport-driven motion.

**Architecture:** Home remains a static Astro page composed from focused Home components. Selected Work is sourced from Astro content entries that carry a small Home-presentation contract; current-state signals live in a typed `src/data/home.ts` object. Three work features remain intentionally different in composition while sharing the frozen grid, typography, primitives, and motion grammar.

**Tech Stack:** Astro 7 static output, Astro Content Collections, TypeScript 6, CSS, Vitest 4, Playwright 1.62, Cloudflare Workers/Wrangler 4. No new runtime dependency is authorized for Phase 2.

**Spec:** `docs/superpowers/specs/2026-09-05-gabriel-portfolio-phase-2-home-v1-design.md`

## Global Constraints

- Start execution from approved `main` and isolate implementation on branch `phase-2/home-v1`; use `superpowers:using-git-worktrees` at execution start.
- Node requirement remains `>=22.12.0`.
- Astro remains `output: 'static'`; do not introduce SSR, a database, CMS, or framework migration.
- Reuse the frozen Light/Dark worlds, 4/6/12 grid, Inter/Cormorant Garamond/IBM Plex Mono typography roles, ThemeToggle, editorial primitives, symmetric main gutter, and Reveal/Assemble/Shift/Morph grammar.
- Do not edit Phase 1 primitives or global tokens unless an automated or browser defect proves the frozen contract insufficient; if that happens, stop for scope review.
- Do not add GSAP, D3, Three.js, WebGL, scroll-scrubbing libraries, long sticky pinning, or major parallax.
- Core Home information must render without client-side JavaScript. JavaScript may progressively enhance motion only.
- Preserve `noindex` during Phase 2; SEO/indexing is not part of this phase.
- Never invent project claims, evidence, dates, IDs, or visuals. If source material is absent, stop the affected content step and report the exact source gap.
- `src/data/living-index.json` remains unchanged unless a later explicit decision assigns permanent IDs. Home v1 must not fabricate `G.xxx` values.
- Desktop and mobile must tell the same story with different compositions; mobile must not simply scale down desktop.
- Non-visual engineering tasks may commit and push automatically after verification and self-review.
- Every visual task must pass automated verification, then STOP before commit and provide a localhost or Cloudflare preview. Explicit visual approval authorizes final verification, commit, push, and remote verification for that task.
- Do not deploy the final Home to production until Gabriel explicitly accepts Phase 2.

## File Structure

### Create

- `src/data/home.ts` — typed current phase, two movements, Now threads, optional personal snapshot, optional archive glimpse, and approved Selected Work slug order.
- `src/components/home/HomeNavigation.astro` — lightweight in-page WORK / ABOUT / INDEX navigation plus unchanged ThemeToggle.
- `src/components/home/HomeHero.astro` — balanced-asymmetry Living Signal Hero.
- `src/components/home/LuxuryFeature.astro` — Visual / Market composition.
- `src/components/home/OlistFeature.astro` — System / Analytics composition.
- `src/components/home/CompetitiveFeature.astro` — Argument / Strategy composition.
- `src/components/home/HomeMotionController.astro` — progressive-enhancement viewport observer for `[data-home-motion]` nodes.
- `src/components/home/NowSection.astro` — primary + two side threads and optional personal snapshot.
- `src/components/home/EditorialClosing.astro` — optional archive glimpse, About/Index coordinates, closing notation.
- `src/styles/home.css` — Home-only layout, responsive composition, section pacing, and approved ambient-motion CSS.
- `src/content/work/luxury-handbag-pricing-architecture.md`
- `src/content/work/olist-marketplace-analysis.md`
- `src/content/work/competitive-positioning-against-giants.md`
- `public/work/luxury-handbag/01_four_brand_current_architecture.svg`
- `public/work/olist/executive-overview.jpg`
- `tests/unit/home.test.ts`
- `tests/e2e/home.spec.ts`
- `tests/e2e/home-motion.spec.ts`
- `tests/e2e/home-visual.spec.ts` — added only at final integrated acceptance so approved screenshots become the baseline.
- `docs/decisions/phase-2-home-v1-review.md` — created only after explicit Phase 2 acceptance.

### Modify

- `src/content.config.ts` — add the minimum justified Home-presentation object to `work`; keep all existing publication/Living Index rules.
- `src/pages/index.astro` — replace the construction shell with section-level composition and data loading; keep it small.
- `tests/e2e/foundation.spec.ts` — replace the obsolete “temporary construction state” wording while retaining title, noindex, and 404 regression coverage.

---

### Task 1: Establish the Curated Home Content Contract

**Type:** Non-visual engineering/content-foundation task. No human visual gate.

**Files:**
- Create: `src/data/home.ts`
- Create: `src/content/work/luxury-handbag-pricing-architecture.md`
- Create: `src/content/work/olist-marketplace-analysis.md`
- Create: `src/content/work/competitive-positioning-against-giants.md`
- Create: `public/work/luxury-handbag/01_four_brand_current_architecture.svg`
- Create: `public/work/olist/executive-overview.jpg`
- Modify: `src/content.config.ts`
- Test: `tests/unit/home.test.ts`

**Interfaces:**
- Produces `HOME_WORK_SLUGS` in exact order: `['luxury-handbag-pricing-architecture', 'olist-marketplace-analysis', 'competitive-positioning-against-giants']`.
- Produces `HOME_STATE` with `currentPhase`, exactly two `movements`, `now.primary`, exactly two `now.side`, `personalSnapshot`, and `archive`.
- Adds optional `home` metadata to the work schema. Featured Home work must have this object.
- `home.evidence` is a list of `{ label: string; value: string; note?: string }` so each feature can render evidence differently without inventing a universal card.
- `home.visual` is optional and, when present, contains `{ src: string; alt: string; caption?: string }`.
- `home.signals` is an optional string array for real project vocabularies such as Olist decision postures.

- [ ] **Step 1: Verify all three source packages before writing copy**

For Luxury and Olist, verify the canonical repositories and the exact asset paths used by the plan:

```text
gabriel232ch/luxury-handbag-price-architecture
  final_report_assets/01_four_brand_current_architecture.svg

gabriel232ch/olist-marketplace-analytics
  dashboard/images/executive-overview.jpg
```

For Competitive Positioning, search the executor workspace and connected project material for this canonical source package:

```text
02_evidence_ledger.md
03_gap_log.md
04_benchmark_selection.md
05_analysis_and_insights.md
06_recommendations.md
FINAL_REPORT.md
```

Required behavior: if the Competitive package cannot be opened, STOP Task 1 and report these exact missing source files. Do not write a substitute project narrative from memory.

- [ ] **Step 2: Write the failing Home-state unit test**

Create `tests/unit/home.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { HOME_STATE, HOME_WORK_SLUGS } from '../../src/data/home';

describe('Home content contract', () => {
  it('locks the approved Selected Work order', () => {
    expect(HOME_WORK_SLUGS).toEqual([
      'luxury-handbag-pricing-architecture',
      'olist-marketplace-analysis',
      'competitive-positioning-against-giants',
    ]);
  });

  it('exposes one primary thread, two side threads, and exactly two movements', () => {
    expect(HOME_STATE.movements).toHaveLength(2);
    expect(HOME_STATE.now.side).toHaveLength(2);
    expect(HOME_STATE.now.primary.title).toBe('Employer Brand / GEO at JoinQuant');
  });

  it('does not pretend a personal photo or archive entry exists', () => {
    expect(HOME_STATE.personalSnapshot).toBeNull();
    expect(HOME_STATE.archive).toBeNull();
  });
});
```

- [ ] **Step 3: Run the unit test and verify the expected failure**

Run:

```bash
npm run test -- tests/unit/home.test.ts
```

Expected: FAIL because `src/data/home.ts` does not exist.

- [ ] **Step 4: Add the minimum Home metadata schema**

Extend `work` in `src/content.config.ts` with:

```ts
home: z
  .object({
    question: z.string().min(1),
    outcome: z.string().min(1),
    evidence: z
      .array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
          note: z.string().min(1).optional(),
        }),
      )
      .min(1),
    signals: z.array(z.string().min(1)).default([]),
    visual: z
      .object({
        src: z.string().startsWith('/'),
        alt: z.string().min(1),
        caption: z.string().min(1).optional(),
      })
      .optional(),
  })
  .optional(),
```

Add one `superRefine` rule: `curation === 'featured'` requires `home` in addition to the existing public-visibility requirement. Do not change the published-work Living Index requirement.

- [ ] **Step 5: Create typed current Home state**

Create `src/data/home.ts` with exported readonly constants. Initial content must be factual and deliberately modest:

```ts
export const HOME_WORK_SLUGS = [
  'luxury-handbag-pricing-architecture',
  'olist-marketplace-analysis',
  'competitive-positioning-against-giants',
] as const;

export const HOME_STATE = {
  currentPhase: {
    label: 'CURRENT PHASE',
    statement: 'Building a durable personal system for work, research, and the things I want to keep.',
  },
  movements: [
    { date: '2026-09-05', type: 'SYSTEM', title: 'Home v1 architecture approved.' },
    { date: '2026-09-04', type: 'SYSTEM', title: 'Editorial design system frozen.' },
  ],
  now: {
    primary: {
      title: 'Employer Brand / GEO at JoinQuant',
      state: 'Turning interview evidence and benchmark research into a more grounded employer-brand and GEO direction.',
    },
    side: [
      {
        title: 'AI × Business Systems',
        state: 'Exploring how agents and AI-assisted workflows can turn analysis into repeatable systems.',
      },
      {
        title: 'Building Gabriel Portfolio',
        state: 'Building gabrielchen.me as a long-lived editorial archive rather than a one-off recruiting site.',
      },
    ],
  },
  personalSnapshot: null,
  archive: null,
} as const;
```

Do not add a `PH.xx` or `G.xxx` value because neither registry currently contains a real Home coordinate.

- [ ] **Step 6: Copy the two approved source visuals into the portfolio**

Use the canonical raw files; do not redraw them:

```bash
mkdir -p public/work/luxury-handbag public/work/olist
curl -fsSL \
  https://raw.githubusercontent.com/gabriel232ch/luxury-handbag-price-architecture/main/final_report_assets/01_four_brand_current_architecture.svg \
  -o public/work/luxury-handbag/01_four_brand_current_architecture.svg
curl -fsSL \
  https://raw.githubusercontent.com/gabriel232ch/olist-marketplace-analytics/main/dashboard/images/executive-overview.jpg \
  -o public/work/olist/executive-overview.jpg
```

If network policy blocks `curl`, retrieve the same exact repository files through the available GitHub connection; do not substitute screenshots from search engines.

- [ ] **Step 7: Create the three curated work entries**

All three start as evolving review-state content:

```yaml
publication: review
visibility: public
curation: featured
status: ongoing
```

No `indexId` is assigned in Phase 2.

Luxury must preserve these verified boundaries from its canonical repository:

```text
Question: How does Chanel's visible handbag price architecture differ from Louis Vuitton, Dior, and Hermès across France and the United States?
Outcome: Chanel combines a higher visible entry threshold with a stable Classic high-end anchor; lower tiers overlap more with Louis Vuitton and Dior while upper tiers overlap more with Hermès.
Evidence: 161 accepted current observations / 147 numeric prices; 77 accepted historical observations / 13 product lines; local France/U.S. list prices remain descriptive and are not FX/tax normalized.
Visual: /work/luxury-handbag/01_four_brand_current_architecture.svg
```

Olist must preserve these verified boundaries from its canonical repository:

```text
Question: Where should Olist allocate commercial and operational resources to grow marketplace value while protecting delivery reliability and customer experience?
Outcome: Growth was volume-led while operating quality weakened as scale grew, supporting distinct Grow / Defend / Fix / Investigate portfolios rather than one opaque score.
Evidence: Jan–Aug GMV proxy R$2.99M → R$7.22M (+141.13%), with 99.40% of change allocated to order volume; on-time delivery 96.50% → 92.27%; six material Fix markets cover 2,920 orders and R$409K GMV exposure.
Signals: GROW, DEFEND, FIX, INVESTIGATE
Visual: /work/olist/executive-overview.jpg
```

Competitive Positioning must be written only after opening the six named source files from Step 1. Its `question`, `outcome`, and evidence rows must be direct editorial compressions of the final report/evidence ledger, with no unsupported market-size, hiring-performance, causal, or financial claims. Store its canonical source label in `source.originalReport`; do not expose private local filesystem paths.

- [ ] **Step 8: Run the content contract verification**

Run:

```bash
npm run test -- tests/unit/home.test.ts
npm run check
npm run build
```

Expected: all PASS; Astro Content Collections accept all three entries.

- [ ] **Step 9: Self-review source truth and commit automatically**

Check that:

- every number in the Luxury and Olist entries exists in the canonical README/report;
- Competitive copy can be traced to the opened source package;
- no `G.xxx` or `PH.xx` was invented;
- copied assets are the canonical repository files;
- `git diff --check` is clean.

Then commit and push the implementation branch:

```bash
git add src/content.config.ts src/data/home.ts src/content/work public/work tests/unit/home.test.ts
git commit -m "feat: curate Home v1 content sources"
git push -u origin phase-2/home-v1
```

Remote branch SHA must equal local HEAD before continuing.

---

### Task 2: Build Navigation and Living Signal Hero

**Type:** Visual task. Human review required before commit.

**Files:**
- Create: `src/components/home/HomeNavigation.astro`
- Create: `src/components/home/HomeHero.astro`
- Create: `src/styles/home.css`
- Modify: `src/pages/index.astro`
- Modify: `tests/e2e/foundation.spec.ts`
- Create/Test: `tests/e2e/home.spec.ts`

**Interfaces:**
- `HomeNavigation` renders `href="#work"`, `href="#about"`, `href="#index"` and the unchanged `ThemeToggle`.
- `HomeHero` consumes `HOME_STATE.currentPhase` and `HOME_STATE.movements`.
- `index.astro` imports `home.css`, loads featured work for later tasks, and remains a small composition file.

- [ ] **Step 1: Write failing Hero/navigation E2E coverage**

Create `tests/e2e/home.spec.ts` with:

```ts
import { expect, test } from '@playwright/test';

test('Home exposes lightweight navigation and the Living Signal Hero', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'WORK' })).toHaveAttribute('href', '#work');
  await expect(page.getByRole('link', { name: 'ABOUT' })).toHaveAttribute('href', '#about');
  await expect(page.getByRole('link', { name: 'INDEX' })).toHaveAttribute('href', '#index');
  await expect(page.getByRole('heading', { level: 1, name: 'Gabriel Chen' })).toBeVisible();
  await expect(page.getByText('CURRENT PHASE')).toBeVisible();
  await expect(page.locator('[data-home-movement]')).toHaveCount(2);
});
```

Also update the first test title in `foundation.spec.ts` from the obsolete construction-state wording to `Home preserves the approved foundation metadata` while retaining title, heading, and `noindex` assertions.

- [ ] **Step 2: Run the new E2E test and verify failure**

```bash
npx playwright test tests/e2e/home.spec.ts
```

Expected: FAIL because navigation/current phase/movements are absent.

- [ ] **Step 3: Implement the lightweight Home shell and balanced-asymmetry Hero**

Use the existing `.editorial-grid`, `EditorialRule`, `SectionLabel`, `FolioNumber`, and typography classes. Do not use `GIndex` or `PhaseMarker` until real IDs exist.

`index.astro` must have this section ordering from the start:

```astro
<HomeNavigation />
<HomeHero state={HOME_STATE} />
<section id="work" aria-label="Selected Work"></section>
```

Keep later anchors out until their real sections exist in Task 7; the top links may already point to their future IDs.

Desktop Hero: name is the largest single element; current phase + movements form a second asymmetric center. Mobile: Identity → Current Phase → Movements, with part of Current Phase visible in the first viewport.

- [ ] **Step 4: Run targeted and full automated verification**

```bash
npx playwright test tests/e2e/foundation.spec.ts tests/e2e/home.spec.ts
npm run verify
```

Expected: all PASS, including existing theme/grid/design-system regressions.

- [ ] **Step 5: Human Visual Review Gate — STOP before commit**

Launch a reviewable localhost or Cloudflare preview and report only:

```text
AUTOMATED
PASS
<test count>

HUMAN ACTION
<preview URL>
Review Hero in Desktop Light, Desktop Dark, Mobile Light, Mobile Dark.
Decision: balanced asymmetry, information density, first-viewport mobile composition.
```

If rejected, refine only Task 2. If approved, run `npm run verify`, commit `feat: build Living Signal Home hero`, push branch, verify remote SHA, then proceed automatically to Task 3.

---

### Task 3: Compose Luxury Handbag as Visual / Market

**Type:** Visual task. Human review required before commit.

**Files:**
- Create: `src/components/home/LuxuryFeature.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/home.css`
- Modify/Test: `tests/e2e/home.spec.ts`

**Interfaces:**
- Props: `entry: CollectionEntry<'work'>`.
- The section root exposes `data-work-slug="luxury-handbag-pricing-architecture"`.
- Render Question → Outcome → Evidence from `entry.data.home`; do not duplicate project numbers in component source.

- [ ] **Step 1: Add failing E2E assertions**

```ts
const luxury = page.locator('[data-work-slug="luxury-handbag-pricing-architecture"]');
await expect(luxury).toBeVisible();
await expect(luxury.locator('img')).toHaveAttribute(
  'src',
  '/work/luxury-handbag/01_four_brand_current_architecture.svg',
);
await expect(luxury.locator('[data-work-question]')).toBeVisible();
await expect(luxury.locator('[data-work-outcome]')).toBeVisible();
await expect(luxury.locator('[data-work-evidence]')).toHaveCount(3);
```

Run `npx playwright test tests/e2e/home.spec.ts` and confirm FAIL.

- [ ] **Step 2: Implement the Luxury composition**

Use one dominant `ImagePlate`; do not add the other four available report visuals. Place the question first but keep the outcome visually dominant. Use marginalia for sample/method boundaries instead of turning the section into a report page.

Desktop may use asymmetric parallel visual/text relationships; mobile must sequence Question → Outcome → Evidence → visual without dropping evidence.

- [ ] **Step 3: Verify**

```bash
npx playwright test tests/e2e/home.spec.ts
npm run verify
```

- [ ] **Step 4: Human Visual Review Gate — STOP before commit**

Review Desktop/Mobile in Light/Dark. Decision required: visual impact, hierarchy, whether one SVG is sufficient, and whether the section feels like an editorial research spread rather than a card/gallery.

On approval: final verify, commit `feat: compose Luxury selected work`, push branch, verify remote SHA, proceed to Task 4.

---

### Task 4: Compose Olist as System / Analytics

**Type:** Visual task. Human review required before commit.

**Files:**
- Create: `src/components/home/OlistFeature.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/home.css`
- Modify/Test: `tests/e2e/home.spec.ts`

**Interfaces:**
- Props: `entry: CollectionEntry<'work'>`.
- Root: `data-work-slug="olist-marketplace-analysis"`.
- Render `home.signals` exactly as data, not hard-coded labels in the component.

- [ ] **Step 1: Add failing E2E assertions**

Assert the Olist section appears after Luxury, exposes four `[data-decision-signal]` nodes, renders one main dashboard image, and contains Question/Outcome/Evidence.

Use DOM order rather than pixel position:

```ts
const slugs = await page.locator('[data-work-slug]').evaluateAll((nodes) =>
  nodes.map((node) => node.getAttribute('data-work-slug')),
);
expect(slugs.slice(0, 2)).toEqual([
  'luxury-handbag-pricing-architecture',
  'olist-marketplace-analysis',
]);
```

Run the test and confirm FAIL.

- [ ] **Step 2: Implement the Olist composition**

Lead from the resource-allocation question into the real `GROW / DEFEND / FIX / INVESTIGATE` decision vocabulary, then the outcome/evidence, then one `executive-overview.jpg` visual. Do not create a three-dashboard gallery.

The dashboard is evidence, not the hero of the section. Keep the decision structure legible without the image.

- [ ] **Step 3: Verify**

Run targeted Home tests and full `npm run verify`.

- [ ] **Step 4: Human Visual Review Gate — STOP before commit**

Decision required: whether the section reads as decision intelligence rather than a BI portfolio, and whether its density provides a useful contrast with Luxury.

On approval: final verify, commit `feat: compose Olist selected work`, push, verify remote SHA, proceed to Task 5.

---

### Task 5: Compose Competitive Positioning as Argument / Strategy

**Type:** Visual task. Human review required before commit.

**Files:**
- Create: `src/components/home/CompetitiveFeature.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/home.css`
- Modify/Test: `tests/e2e/home.spec.ts`

**Interfaces:**
- Props: `entry: CollectionEntry<'work'>`.
- Root: `data-work-slug="competitive-positioning-against-giants"`.
- Evidence rows use the generic `{label, value, note}` content objects from Task 1.
- No image is required or implied.

- [ ] **Step 1: Add failing E2E assertions**

Assert exact Selected Work order of all three slugs, at least three evidence rows in Competitive, and zero `<img>` elements inside that section.

Run the test and confirm FAIL.

- [ ] **Step 2: Implement the strategy-memo composition**

Render a typographic benchmark/evidence/implication structure with rules, marginalia, and generous whitespace. Use the actual content labels from the source-backed entry. Do not synthesize a chart, logo strip, fake market metric, or decorative company score.

Increase whitespace versus Olist so the transition is deliberately `dense evidence → pause → strategic argument`.

- [ ] **Step 3: Verify**

Run targeted Home tests and full `npm run verify`.

- [ ] **Step 4: Human Visual Review Gate — STOP before commit**

Decision required: strategic/editorial quality, readability of the matrix-like evidence, and whether the three projects now feel intentionally different but part of one system.

On approval: final verify, commit `feat: compose strategy selected work`, push, verify remote SHA, proceed to Task 6.

---

### Task 6: Add Expressive Discrete Scroll Choreography

**Type:** Visual interaction task. Human review required before commit.

**Files:**
- Create: `src/components/home/HomeMotionController.astro`
- Modify: `src/components/home/HomeHero.astro`
- Modify: `src/components/home/LuxuryFeature.astro`
- Modify: `src/components/home/OlistFeature.astro`
- Modify: `src/components/home/CompetitiveFeature.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/home.css`
- Create/Test: `tests/e2e/home-motion.spec.ts`

**Interfaces:**
- Motion-enhanced nodes use `data-home-motion` plus one frozen motion class.
- Script sets `data-motion-state="pending"` only when JS, full motion, and `IntersectionObserver` are available; no-JS markup remains visible.
- Entered nodes are unobserved after their first reveal.
- Hero ambient movement uses `[data-home-ambient]`; reduced-motion CSS sets its animation to `none`.

- [ ] **Step 1: Write failing motion tests**

Create `tests/e2e/home-motion.spec.ts` covering three contracts:

```ts
import { expect, test } from '@playwright/test';

test('Home narrative stages enter once they reach the viewport', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const stages = page.locator('[data-home-motion]');
  expect(await stages.count()).toBeGreaterThan(0);
  for (const stage of await stages.all()) {
    await stage.scrollIntoViewIfNeeded();
    await expect(stage).toHaveAttribute('data-motion-state', 'entered');
  }
});

test('reduced motion preserves all Home information without displacement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const states = await page.locator('[data-home-motion]').evaluateAll((nodes) =>
    nodes.map((node) => ({
      opacity: Number(getComputedStyle(node).opacity),
      transform: getComputedStyle(node).transform,
    })),
  );
  expect(states.every((state) => state.opacity > 0)).toBe(true);
  expect(states.every((state) => state.transform === 'none')).toBe(true);
  await expect(page.locator('[data-home-ambient]')).toHaveCSS('animation-name', 'none');
});
```

Add the same unsupported-`IntersectionObserver` fallback pattern already used by `tests/e2e/motion.spec.ts`; every Home motion node must resolve immediately to `entered`.

Run the file and confirm FAIL.

- [ ] **Step 2: Implement the controller by adapting the proven Phase 1 observer contract**

`HomeMotionController.astro` script:

```ts
const nodes = document.querySelectorAll<HTMLElement>('[data-home-motion]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || typeof IntersectionObserver !== 'function') {
  nodes.forEach((node) => (node.dataset.motionState = 'entered'));
} else {
  nodes.forEach((node) => (node.dataset.motionState = 'pending'));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.motionState = 'entered';
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.22 },
  );
  nodes.forEach((node) => observer.observe(node));
}
```

No continuous scroll progress state is added.

- [ ] **Step 3: Apply narrative motion with different intensity by project**

- Hero: subtle entry plus one slow low-amplitude ambient rule/notation animation.
- Luxury: strongest combination of Reveal + Assemble + small Shift.
- Olist: decision signals and evidence hierarchy reveal/assemble; dashboard remains stable.
- Competitive: restrained progressive row reveal/rule assembly with larger pauses.
- Mobile: one dominant moving element per narrative beat; lower displacement than desktop.

Use `@media (prefers-reduced-motion: reduce)` in `home.css` to set `[data-home-ambient] { animation: none; }` explicitly.

- [ ] **Step 4: Verify automated motion and all regressions**

```bash
npx playwright test tests/e2e/home-motion.spec.ts tests/e2e/motion.spec.ts
npm run verify
```

- [ ] **Step 5: Human Visual Review Gate — STOP before commit**

Review actual scrolling on desktop and mobile, not screenshots only. Decision required: expressive enough to feel authored, quiet enough to read, correct Olist→Competitive pause, and acceptable ambient Hero movement.

On approval: final verify, commit `feat: choreograph Home editorial motion`, push, verify remote SHA, proceed to Task 7.

---

### Task 7: Build Now, Optional Human Layer, and Editorial Closing

**Type:** Visual task. Human review required before commit.

**Files:**
- Create: `src/components/home/NowSection.astro`
- Create: `src/components/home/EditorialClosing.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/home.css`
- Modify/Test: `tests/e2e/home.spec.ts`

**Interfaces:**
- `NowSection` consumes `HOME_STATE.now` and `HOME_STATE.personalSnapshot`.
- Root of Now is `id="about"`.
- Closing root is `id="index"` and consumes `HOME_STATE.archive`.
- A null photo renders no photo container; a null archive renders no fake archive item.

- [ ] **Step 1: Add failing anchor/content E2E coverage**

Assert:

```ts
await expect(page.locator('#about')).toContainText('Employer Brand / GEO at JoinQuant');
await expect(page.locator('#about [data-now-side]')).toHaveCount(2);
await expect(page.locator('[data-personal-snapshot]')).toHaveCount(0);
await expect(page.locator('#index')).toBeVisible();
```

Click ABOUT and INDEX links and confirm the relevant section is in the viewport after navigation. Run and confirm FAIL.

- [ ] **Step 2: Implement Now with deliberate hierarchy**

Primary thread gets the dominant editorial region. Two side threads remain lighter and shorter. Do not turn status copy into task lists, progress bars, tags, or dashboards.

Photo branch:

```astro
{personalSnapshot && (
  <figure data-personal-snapshot>...</figure>
)}
```

Initial `personalSnapshot` stays null; there is no placeholder frame.

- [ ] **Step 3: Implement the closing**

Render a quieter closing with About/Index coordinates and minimal notation. `HOME_STATE.archive` is initially null because no canonical archive content entry exists in the current portfolio repository. If the executor can verify a suitable real historical item from Gabriel’s source material before this task, it may populate `HOME_STATE.archive`; otherwise omit the glimpse exactly as the design spec permits.

Do not add social-link grids, résumé CTA blocks, or a conventional dense footer.

- [ ] **Step 4: Verify**

Run Home E2E plus full `npm run verify`.

- [ ] **Step 5: Human Visual Review Gate — STOP before commit**

Decision required: transition from Work into Now, personal tone, optional-photo behavior, and whether the closing successfully decreases density/motion and leaves enough whitespace.

On approval: final verify, commit `feat: complete Home current and closing layers`, push, verify remote SHA, proceed to Task 8.

---

### Task 8: Integrate, Freeze Visual Baselines, and Accept Phase 2

**Type:** Final visual/Phase acceptance task. Explicit Phase acceptance required before production deployment.

**Files:**
- Create: `tests/e2e/home-visual.spec.ts`
- Create after approval: generated Home screenshot baselines under Playwright’s normal snapshot directory
- Create after approval: `docs/decisions/phase-2-home-v1-review.md`
- Modify as needed only for defects found during integrated review: Home files from Tasks 2–7

**Interfaces:**
- Final Home section order: navigation → Hero → Luxury → Olist → Competitive → Now → Closing.
- Light/Dark, Desktop/Mobile, no-JS content, reduced motion, ThemeToggle, noindex, and custom 404 all remain valid.

- [ ] **Step 1: Add final integrated E2E checks**

Expand `home.spec.ts` to assert full Selected Work order and section order. Add an asset-response check for the two local Home visuals:

```ts
for (const path of [
  '/work/luxury-handbag/01_four_brand_current_architecture.svg',
  '/work/olist/executive-overview.jpg',
]) {
  const response = await page.request.get(path);
  expect(response.ok()).toBe(true);
}
```

Ensure mobile contains the same three questions/outcomes/evidence sets as desktop; do not assert identical pixel layout.

- [ ] **Step 2: Run final automated engineering gate**

```bash
git diff --check
npm run verify
```

All tests must pass before preview deployment.

- [ ] **Step 3: Deploy a non-production Cloudflare review version**

```bash
npm run deploy:preview
```

Capture the returned `workers.dev` preview URL. Verify `/`, `/lab/design-system`, and a known 404 route on the preview.

- [ ] **Step 4: Final Human Visual Review Gate — STOP before commit**

Provide concise evidence only:

```text
AUTOMATED
PASS
<unit/e2e totals>

GIT
branch: phase-2/home-v1
HEAD: <sha of last approved Task>
origin: same
working tree: contains only final uncommitted review refinements, if any

HUMAN ACTION
<Cloudflare preview URL>
Review: Desktop Light, Desktop Dark, Mobile Light, Mobile Dark, actual scrolling.
Decision requested: Phase 2 Home v1 acceptance.
```

Do not treat “looks good” on one subsection as Phase acceptance; Gabriel must explicitly accept Phase 2.

- [ ] **Step 5: After explicit Phase acceptance, freeze approved screenshot baselines**

Create `tests/e2e/home-visual.spec.ts` with four full-page checks: desktop-light, desktop-dark, mobile-light, mobile-dark. Follow the existing Playwright snapshot convention used by `design-system.spec.ts`.

Generate the approved baselines only now:

```bash
npm run test:e2e:update -- tests/e2e/home-visual.spec.ts
npm run verify
```

Expected: full verification PASS with the newly approved snapshots.

- [ ] **Step 6: Record Phase 2 decision evidence**

Create `docs/decisions/phase-2-home-v1-review.md` containing:

- review date `2026-09-05` or the actual later acceptance date;
- status `PASS`;
- the exact human approval wording;
- approved Home architecture and Selected Work order;
- review preview URL;
- actual automated test totals;
- confirmation of Desktop/Mobile and Light/Dark review;
- confirmation that reduced motion is automated and information-equivalent;
- frozen Phase 2 scope and deferred Phase 3 items.

Use actual runtime values; do not guess test counts or URLs.

- [ ] **Step 7: Final commit, push, merge, and remote verification**

On the implementation branch:

```bash
git add -A
git commit -m "feat: complete Home v1"
git push origin phase-2/home-v1
```

Verify branch origin SHA equals local HEAD. Then fast-forward approved `main` from the primary worktree:

```bash
git checkout main
git pull --ff-only
git merge --ff-only phase-2/home-v1
git push origin main
```

Verify local `main` SHA equals `origin/main` and working tree is clean.

- [ ] **Step 8: Production deploy and verification**

Only after Phase acceptance and main push:

```bash
npm run deploy
```

Verify:

```text
https://gabrielchen.me/                 → 200
https://www.gabrielchen.me/             → permanent redirect to apex
https://gabrielchen.me/unknown-smoke    → custom 404
```

Also verify the production Home loads both local project assets and ThemeToggle still persists across reload.

- [ ] **Step 9: Branch cleanup**

After production verification succeeds, delete the merged implementation branch locally and remotely. Leave `main` clean and document the final SHA in the Phase 2 review record if it was not already known when first written.

---

## Plan Self-Review Checklist

Before implementation begins, verify this plan against the approved design spec:

1. **Spec coverage:** Hero, navigation, three unique work compositions, expressive discrete scroll choreography, responsive recomposition, Now, optional personal snapshot, closing, content truth, accessibility, reduced motion, human gates, and Phase boundary each map to a task above.
2. **Source safety:** Luxury and Olist have named canonical repos/assets; Competitive has a named source-package gate and cannot proceed from memory.
3. **Type consistency:** `HOME_STATE`, `HOME_WORK_SLUGS`, and the `home` work metadata shape are defined once in Task 1 and consumed consistently afterward.
4. **Living Index safety:** review-state featured work remains without permanent IDs; no Home task changes `living-index.json`.
5. **Visual workflow:** Tasks 2–8 stop before committing unapproved visual states. Task 1 is the only non-visual implementation task and may commit automatically after verification.
6. **Phase boundary:** no Work detail pages, Living Index UI, CMS, automated repo syncing, GSAP, D3, Three.js, WebGL, or unrelated refactor appears in any task.

## Execution Handoff

After this plan is approved, execute with **superpowers:subagent-driven-development** as the default path, because Phase 2 contains multiple independently reviewable tasks and the project explicitly assigns Codex primary engineering ownership.

Execution must remain one Task at a time and one Step at a time. Human review is requested only at the visual gates described above or if repository/source reality contradicts the plan.