# Typography Scale v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace production-facing typography drift with one enforceable semantic scale shared by Home, Chanel, Olist, and smaller-companies routes while preserving the approved project-title value and visual/content decisions.

**Architecture:** Keep the global tokens in `src/styles/tokens.css`, expose the four family primitives and Body/Data defaults from `src/styles/typography.css`, and make all migrated selectors consume semantic size variables. Migrate Home/shared editorial styles and report/detail-page styles in separate reviewable slices, then add computed-style and source-contract tests that prevent sub-14px text, page-specific body/title scales, and arbitrary production font-size declarations.

**Tech Stack:** Astro 7, TypeScript, CSS custom properties, Vitest, Playwright, ESLint.

**Spec:** `docs/superpowers/specs/2026-09-18-typography-scale-v1-design.md`

## Global Constraints

- There are exactly four visible production typography families: Cormorant Garamond, Baskerville, Didot, and IBM Plex Mono.
- The eight production semantic size roles are `--font-size-micro`, `--font-size-supporting`, `--font-size-secondary-reading`, `--font-size-body`, `--font-size-lead`, `--font-size-statement`, `--font-size-section-title`, and the preserved `--font-size-project-title`.
- Micro is 14px mobile and desktop; Supporting is 16px mobile and desktop; Secondary Reading is 18px mobile and desktop.
- Body is 20px mobile and 22px desktop with line-height `1.58`.
- Lead is 24px mobile and 26px desktop; Statement is 30px mobile and 32px desktop; Section Title is 36px mobile and 40px desktop.
- Preserve the exact production-approved Project Title declaration `clamp(3rem, 6vw, 5.5rem)` and use it for Home and report project titles.
- 14px is the minimum for meaningful visible reader-facing production text.
- Didot uses the same semantic scale: Statement for normal major KPIs and Section Title for exceptionally important KPIs; do not create a parallel numeric scale.
- Components choose a semantic role; they must not create arbitrary local `font-size` values or role-specific responsive `clamp()` declarations.
- Migrate `/`, `/work/luxury-handbag-pricing-architecture/`, `/work/olist-marketplace-analysis/`, `/work/why-some-people-choose-smaller-companies/`, and shared navigation/closing/footer/editorial/theme components used by them.
- Do not migrate lab pages, experiments, historical fixtures, or unrelated documentation except where shared build/test behavior requires it.
- Preserve approved copy, hierarchy, colors, data, charts, privacy constraints, signature behavior, and layout architecture; change width/spacing only to resolve typography-induced wrapping or overflow.

---

### Task 1: Establish the global semantic typography contract

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/typography.css`
- Modify: `src/styles/global.css`
- Test: `tests/unit/typography-contract.test.ts`

**Interfaces:**
- Produces the eight `--font-size-*` tokens and four family tokens consumed by Tasks 2–4.
- Preserves `--font-size-project-title: clamp(3rem, 6vw, 5.5rem)` exactly.
- Keeps `.display`, `.editorial`, `.body-copy`, and `.data-copy` as reusable family primitives; `.body-copy` owns Body size and `1.58` line-height, while `.data-copy` defaults to Micro size.

- [ ] **Step 1: Write the failing token contract test**

Create `tests/unit/typography-contract.test.ts` that reads `src/styles/tokens.css` and asserts:

```ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const tokens = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');

describe('Typography Scale v1 tokens', () => {
  test('defines the four production family roles', () => {
    expect(tokens).toContain("--font-display: 'Cormorant Garamond Variable'");
    expect(tokens).toContain('--font-reading: Baskerville');
    expect(tokens).toContain('--font-numeric: Didot');
    expect(tokens).toContain("--font-metadata: 'IBM Plex Mono'");
  });

  test('defines the frozen semantic size roles', () => {
    for (const token of [
      '--font-size-micro',
      '--font-size-supporting',
      '--font-size-secondary-reading',
      '--font-size-body',
      '--font-size-lead',
      '--font-size-statement',
      '--font-size-section-title',
      '--font-size-project-title',
    ]) {
      expect(tokens).toContain(token);
    }
    expect(tokens).toContain('--font-size-project-title: clamp(3rem, 6vw, 5.5rem)');
    expect(tokens).toContain('--line-height-reading: 1.58');
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npx vitest run tests/unit/typography-contract.test.ts`
Expected: FAIL because the current code still exposes `--font-body`, `--font-data`, `--font-size-reading`, and report-specific aliases instead of the frozen global contract.

- [ ] **Step 3: Implement the global tokens and family primitives**

In `src/styles/tokens.css`:

```css
--font-display: 'Cormorant Garamond Variable', Georgia, serif;
--font-reading: Baskerville, 'Libre Baskerville', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif;
--font-numeric: Didot, 'Bodoni 72', 'Bodoni Moda', 'Cormorant Garamond Variable', Georgia, serif;
--font-metadata: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
--font-size-micro: 0.875rem;
--font-size-supporting: 1rem;
--font-size-secondary-reading: 1.125rem;
--font-size-body: clamp(1.25rem, calc(1rem + 0.5vw), 1.375rem);
--font-size-lead: clamp(1.5rem, calc(1.375rem + 0.5vw), 1.625rem);
--font-size-statement: clamp(1.875rem, calc(1.75rem + 0.5vw), 2rem);
--font-size-section-title: clamp(2.25rem, calc(2rem + 1vw), 2.5rem);
--font-size-project-title: clamp(3rem, 6vw, 5.5rem);
--line-height-reading: 1.58;
```

Remove the production-only `--font-report-display`, `--font-report-body`, and `--font-size-reading` declarations. Do not change the project-title value.

In `src/styles/typography.css`, use `--font-display`, `--font-reading`, `--font-numeric`, and `--font-metadata` for the existing family primitives. Add `font-size: var(--font-size-body)` and `line-height: var(--line-height-reading)` to `.body-copy`, and `font-size: var(--font-size-micro)` to `.data-copy`. Leave lab-only finalist imports/fixtures intact unless the production import graph requires a non-visible adjustment.

In `src/styles/global.css`, set the body family to `var(--font-reading)`.

- [ ] **Step 4: Run the focused test and project unit suite**

Run: `npx vitest run tests/unit/typography-contract.test.ts tests/unit`
Expected: the new contract test and all existing unit tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/styles/tokens.css src/styles/typography.css src/styles/global.css tests/unit/typography-contract.test.ts
git commit -m "feat: establish typography scale v1 tokens"
```

### Task 2: Migrate Home and shared production editorial components

**Files:**
- Modify: `src/styles/home.css`
- Modify: `src/styles/home-chanel.css`
- Modify: `src/styles/home-olist.css`
- Modify: `src/styles/home-inquiry.css`
- Modify: `src/components/editorial/FolioNumber.astro`
- Modify: `src/components/editorial/GIndex.astro`
- Modify: `src/components/editorial/ImagePlate.astro`
- Modify: `src/components/editorial/Marginalia.astro`
- Modify: `src/components/editorial/PhaseMarker.astro`
- Modify: `src/components/editorial/SectionLabel.astro`
- Modify: `src/components/system/ThemeToggle.astro`

**Interfaces:**
- Consumes the global tokens from Task 1.
- Keeps existing Home component markup, copy, data, motion attributes, signature SVG, colors, and layout structure unless a token-driven wrap/overflow fix is required.
- Uses Project Title for Home project `h2`s; Section Title for chapter/section headings; Statement for short expressive copy and normal Home KPI highlights; Lead for prominent introductions/questions; Body for `.body-copy`; Supporting or Micro for auxiliary content.

- [ ] **Step 1: Write failing computed-style assertions for Home/shared roles**

Extend `tests/e2e/typography-system.spec.ts` with a Home assertion that reads computed styles at a 390px viewport and checks:

```ts
const root = getComputedStyle(document.documentElement);
const bodyToken = parseFloat(root.getPropertyValue('--font-size-body'));
const titleToken = root.getPropertyValue('--font-size-project-title').trim();

return {
  body: parseFloat(getComputedStyle(document.querySelector('.chanel-chapter__opening > .body-copy')!).fontSize),
  title: parseFloat(getComputedStyle(document.querySelector('.chanel-chapter__opening h2')!).fontSize),
  tokenBody: bodyToken,
  tokenTitle: titleToken,
  metric: getComputedStyle(document.querySelector('.chanel-history-signal__rows strong')!).fontSize,
  metadata: getComputedStyle(document.querySelector('.chanel-chapter__opening > .data-copy')!).fontSize,
};
```

Assert body is 20px, body equals the body token, metadata is at least 14px, and the representative Home KPI equals the Statement token.

- [ ] **Step 2: Run the focused E2E test to verify the new assertions fail**

Run: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4331 npx playwright test tests/e2e/typography-system.spec.ts --project=desktop-chromium` against a built/static server when browser tooling is available.
Expected: the current Home body resolves from the old reading token and Home KPI selectors use local clamps rather than the new semantic tokens.

- [ ] **Step 3: Replace Home/shared local sizes with semantic roles**

Apply this mapping without changing copy or layout intent:

| Selector/content | Role |
| --- | --- |
| `.body-copy` and Home narrative paragraphs | Body |
| Home hero introduction, `chanel-question`, and Olist question/lede copy | Lead |
| Home project titles | Project Title |
| Chapter/Now headings and short expressive `.display`/`.editorial` statements | Section Title or Statement according to existing hierarchy |
| Normal Home KPI values and Olist tension values | Didot + Statement |
| Data-map nodes, captions, navigation labels, source-like auxiliary copy, folio/index/section labels, image captions, marginalia, phase markers, theme control | IBM Plex Mono + Micro (Supporting only when the content is genuinely supporting rather than metadata) |
| Secondary explanations and notes | Secondary Reading or Supporting |

All production `font-size` declarations in these files must become `var(--font-size-<role>)`; remove local values such as `0.75rem`, `clamp(2rem, 4vw, 3.6rem)`, or mobile overrides that duplicate a role. Use `--font-numeric` for major Home KPIs and preserve Didot numeric settings. Replace component-local report aliases with the global family tokens.

The theme control must use Micro at both widths so its meaningful label is not below 14px. Adjust padding or gaps only if the new minimum affects fit.

- [ ] **Step 4: Run Home unit/check and focused browser tests**

Run: `npm run check && npm run lint && npx vitest run tests/unit && npx playwright test tests/e2e/home.spec.ts tests/e2e/typography-system.spec.ts --project=desktop-chromium`
Expected: Astro check, lint, unit tests, and the focused Home/typography tests pass; any browser failure must be reported with its environment cause rather than hidden.

- [ ] **Step 5: Commit**

```bash
git add src/styles/home.css src/styles/home-chanel.css src/styles/home-olist.css src/styles/home-inquiry.css src/components/editorial src/components/system/ThemeToggle.astro tests/e2e/typography-system.spec.ts
git commit -m "refactor: apply semantic typography to home"
```

### Task 3: Migrate Chanel, Olist, and smaller-companies production detail pages

**Files:**
- Modify: `src/styles/report.css`
- Modify: `src/pages/work/olist-marketplace-analysis.astro`
- Modify: `src/pages/work/why-some-people-choose-smaller-companies.astro`
- Modify: `src/pages/work/luxury-handbag-pricing-architecture.astro` only if markup needs a semantic hook for a representative report KPI or metadata element

**Interfaces:**
- Consumes Task 1 global tokens and Task 2 family primitives.
- Keeps the Chanel report’s approved content, data, charts, numeric styling, motion, and report layout.
- Makes all three production detail pages use the shared Project Title, Body, Lead, Section Title, Statement, Supporting, Secondary Reading, and Micro roles.

- [ ] **Step 1: Write failing computed-style assertions for detail routes**

Extend `tests/e2e/typography-system.spec.ts` with a route loop for:

```ts
const routes = [
  '/',
  '/work/luxury-handbag-pricing-architecture/',
  '/work/olist-marketplace-analysis/',
  '/work/why-some-people-choose-smaller-companies/',
];
```

For Home and Chanel, compare the computed body and project-title pixel sizes at 390px, 1024px, and 1440px. On Chanel, assert the report body is 20px at 390px and reaches the approved 22px cap at 1440px; at 1024px assert Home and Chanel resolve the same shared Body token rather than requiring a page-local size. The title equals `getComputedStyle(document.documentElement).getPropertyValue('--font-size-project-title')` after resolving the same token, report section headings use the Section Title value, and a representative KPI uses Didot plus Statement or Section Title. For Olist and smaller-companies, assert the `h1`, lede/opening, `h2`, body paragraphs, and metadata are assigned to the shared role sizes and that no computed meaningful text is below 14px.

- [ ] **Step 2: Run the focused detail E2E test to verify it fails**

Run: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4331 npx playwright test tests/e2e/typography-system.spec.ts --project=desktop-chromium`
Expected: legacy report clamps and inline page styles produce mismatched title, lede, section, body, table, chart, and metadata sizes.

- [ ] **Step 3: Map shared report styles to semantic roles**

In `src/styles/report.css`, apply this selector mapping:

| Selector/content group | Family + role |
| --- | --- |
| `.report-page`, `.report-section p`, `.report-section li`, judgment/implication prose | Baskerville + Body, line-height `1.58` |
| `.report-title`, detail-page `h1` | Cormorant + Project Title |
| `.report-section h2`, detail-page `h2` | Cormorant + Section Title |
| `.report-section h3`, judgment/boundary/source headings, smaller-page `h3` | Cormorant + Statement |
| `.report-kicker`, `.report-lede`, detail-page ledes/openings, report claims/chains/boundaries/final statements | Cormorant + Lead or Statement according to existing content hierarchy; use Statement for claims/final expressive conclusions and Lead for opening guidance |
| `.report-kpi-card strong`, major chart callouts, major metric values, Olist detail metrics | Didot + Statement; use Section Title only for the report’s explicitly exceptionally important KPI |
| `.report-topline`, `.report-meta`, `.report-index`, section numbers, chart axes/years/legends, source links, report footer, detail-page identity/back/kicker/eyebrow/note | IBM Plex Mono + Micro |
| `.report-table-wrap th/td`, heatmap cells where values are dense, supporting notes | Baskerville or IBM Plex Mono + Supporting, with tabular numerals where appropriate |

Replace every production `font-size` value in `report.css` and the two inline detail-page style blocks with a semantic token. Remove every `!important` that only exists to force an old local size. Remove `--font-report-body`/`--font-report-display` references. Preserve tight display line-heights and restrained tracking as composition properties, but do not use them to justify a new size.

At mobile widths, keep layout adjustments that are necessary for the 14px chart labels and 16px supporting data to fit: horizontal scrolling, stacked panels, or changed gaps are acceptable; shrinking the labels is not.

- [ ] **Step 4: Run report/detail checks**

Run: `npm run check && npm run lint && npx vitest run tests/unit && npx playwright test tests/e2e/typography-system.spec.ts tests/e2e/foundation.spec.ts --project=desktop-chromium`
Expected: source compiles, lint and unit tests pass, and all detail typography assertions pass when browser execution is available.

- [ ] **Step 5: Commit**

```bash
git add src/styles/report.css src/pages/work/olist-marketplace-analysis.astro src/pages/work/why-some-people-choose-smaller-companies.astro src/pages/work/luxury-handbag-pricing-architecture.astro tests/e2e/typography-system.spec.ts
git commit -m "refactor: apply semantic typography to production reports"
```

### Task 4: Add the enforceable contract and complete verification/QA

**Files:**
- Modify: `tests/e2e/typography-system.spec.ts`
- Modify: `tests/e2e/home.spec.ts` only where existing assertions still encode the old independent size system
- Create: `tests/unit/typography-source-contract.test.ts`
- Modify: `package.json` only if a focused typography-contract script is needed; preserve existing scripts

**Interfaces:**
- Consumes all migrated selectors and tokens from Tasks 1–3.
- Produces a regression gate for future components: semantic token presence, computed responsive sizes, minimum readable size, shared Home/report title/body systems, and approved KPI roles.

- [ ] **Step 1: Write the failing source-contract test**

Create `tests/unit/typography-source-contract.test.ts` that recursively reads only these production-facing files: `src/styles/global.css`, `src/styles/typography.css`, `src/styles/home.css`, `src/styles/home-chanel.css`, `src/styles/home-olist.css`, `src/styles/home-inquiry.css`, `src/styles/report.css`, `src/components/editorial/*.astro`, `src/components/system/ThemeToggle.astro`, and the three production detail page files. Exclude `src/pages/lab/**`.

For every `font-size:` declaration, allow only a semantic variable or an intentional inherited value:

```ts
const semanticSize = /^var\(--font-size-(micro|supporting|secondary-reading|body|lead|statement|section-title|project-title)\)$/;
const declarations = source.match(/font-size\s*:\s*[^;]+/g) ?? [];
for (const declaration of declarations) {
  const value = declaration.replace(/^font-size\s*:\s*/, '').trim();
  expect(value === 'inherit' || semanticSize.test(value)).toBe(true);
}
```

Also assert the production source does not contain `--font-report-display`, `--font-report-body`, `--font-size-reading`, or the visible-family declarations `Newsreader` / `Inter Variable` outside the lab files.

- [ ] **Step 2: Run the source-contract and all unit tests to verify the guard is meaningful**

Run: `npx vitest run tests/unit/typography-source-contract.test.ts tests/unit`
Expected: the new guard fails against the remaining arbitrary local declarations before the final migration, then passes after Tasks 2–3 have completed.

- [ ] **Step 3: Add computed minimum-size and responsive contract coverage**

In `tests/e2e/typography-system.spec.ts`:

- Set viewport to 390px and assert representative Body is 20px, Lead is 24px, Statement is 30px, and Section Title is 36px.
- Set viewport to 1024px and assert the representative Home and Chanel Body values are equal and still resolve from the shared token; set viewport to 1440px and assert Body is 22px, Lead is 26px, Statement is 32px, and Section Title is 40px.
- Visit all four migrated routes and collect elements with meaningful direct text, excluding `script`, `style`, `svg`, `noscript`, `[aria-hidden='true']`, and elements with `display:none` or `visibility:hidden`; assert each computed font size is at least 14px.
- Assert Home and Chanel body/title computed pixel sizes match at both viewports.
- Assert Home and Chanel representative KPI values use `Didot`, `font-weight: 400`, lining/proportional numerals, and either the Statement or Section Title computed size.
- Keep the lab-specific finalist test unchanged as a deliberate noindex fixture.

- [ ] **Step 4: Run the full verification commands**

Run each command fresh and record exact results:

```bash
npm run check
npm run lint
npm run test
npm run build
npm run test:e2e
npm run verify
```

If the project’s dev server or Chromium remains blocked by the macOS sandbox, run the relevant E2E suite using the available elevated/local UI path and record the exact environment error instead of weakening the assertions. Inspect all migrated routes at 390px, 768px, 1024px, and 1440px in light and dark themes, including keyboard focus, reduced motion, overflow, wrapping, table/chart labels, navigation, and Home-vs-Chanel side-by-side comparisons.

- [ ] **Step 5: Review the final diff and commit verification changes**

```bash
git diff --check
git status -sb
git add tests/e2e/typography-system.spec.ts tests/e2e/home.spec.ts tests/unit/typography-source-contract.test.ts package.json
git commit -m "test: enforce typography scale v1 contract"
```

The branch is complete only when the final whole-branch review confirms spec compliance, task quality, and the verification evidence is recorded.
