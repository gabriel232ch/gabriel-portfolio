# Smaller-Companies Inquiry Website Evolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the existing `Why Do Some People Choose Smaller Companies?` website chapter and detail page into the approved first-person living narrative, linking to a separate public research archive while preserving privacy, evidence boundaries, accessibility, theme support, and the site’s existing design system.

**Architecture:** Keep the existing Astro 7 site and current homepage chapter title/route. Centralize the expanded public narrative in a dedicated data module, keep the homepage chapter concise, rebuild the detail page around problem reframing rather than a task log, and link evidence-heavy passages to the public `candidate-information-research` repository created by the companion archive plan. Do not embed private employer artifacts, raw evaluation data, internal skills, or private HTML.

**Tech Stack:** Astro 7, TypeScript 6, CSS, Vitest, Playwright, Node >=22.12.0. Use the existing lockfile and scripts from `package.json`.

**Spec:** `docs/superpowers/specs/2026-10-02-smaller-companies-inquiry-public-archive-and-site-design.md`

**Companion plan:** `docs/superpowers/plans/2026-10-02-candidate-information-research-archive-implementation-plan.md`

## Global Constraints

- The public title remains exactly `Why Do Some People Choose Smaller Companies?`.
- The page must not claim to explain why people choose companies in general.
- The bounded research object is how companies can reduce information asymmetry in candidate career decisions and improve mutual matching.
- Preserve first-person voice on the website; use neutral analytical prose only in the linked public archive.
- Do not publicly name the employer as the source of the internal project.
- Do not publish employee names, interview transcripts, Golden Sample text, internal skills, vendor bundles, raw baseline data, internal source-of-truth documents, internal meeting notes, internal research-organization material, private HTML, or private harness artifacts.
- The “crossroads” concept may be described abstractly only: concept developed, interactive prototype completed, direction selected; do not claim shipment, live-candidate validation, or completed latest iteration.
- Keep timing observations approximate and descriptive; do not publish a formal speedup multiplier.
- Keep the working synthesis explicitly provisional; do not expose `Employer Brand as Candidate Decision Infrastructure` as a universal law.
- Preserve existing theme behavior, typography system, responsive layout, reduced-motion support, semantic HTML, keyboard accessibility, and no-horizontal-overflow guarantees.
- No new runtime dependency, CMS, analytics service, animation package, or external API is introduced.
- Use the final stable public archive URL `https://github.com/gabriel232ch/candidate-information-research` only after the companion archive plan has published it successfully.
- Start implementation in an isolated worktree using `superpowers:using-git-worktrees` when Codex executes locally.
- Follow TDD: tests first, observe intended failure, implement minimal change, rerun, commit.

## Review Focus

- **Privacy regression:** rendered Home and detail route must contain none of the local redaction patterns or employer identifiers.
- **Narrative overclaim:** the final sections must remain open-ended and distinguish a working interpretation from a general theory.
- **Broken archive dependency:** archive CTAs must resolve to the published repository and must not expose private paths.
- **Responsive reading failure:** the longer inquiry page must remain readable at 320px/mobile and wide desktop without horizontal overflow or overlong line measures.
- **AI-workflow misrepresentation:** systemization passages must show human judgment + AI-assisted execution, not “AI automated everything” or “manual research only.”

---

## File Structure and Responsibilities

### Create

- `src/data/smaller-companies-inquiry.ts` — single source for the expanded public inquiry narrative, safe aggregate process observations, archive URLs, and section metadata.
- `src/styles/work-inquiry.css` — detail-page-only layout, section rhythm, process markers, evidence links, and responsive rules.
- `tests/unit/smaller-companies-inquiry.test.ts` — content/privacy/epistemic contract for the new data module.
- `tests/e2e/smaller-companies-inquiry.spec.ts` — route-level narrative, privacy, archive links, themes, accessibility-relevant structure, and overflow.

### Modify

- `src/data/home.ts` — keep only the concise homepage version and update the current-research link/copy if needed.
- `src/components/home/SmallerCompaniesChapter.astro` — preserve light unfinished homepage treatment; optionally add a very small “question evolved” cue only if approved copy fits without turning Home into the full case study.
- `src/pages/work/why-some-people-choose-smaller-companies.astro` — replace the current two-section benchmark summary with the full approved living narrative using `src/data/smaller-companies-inquiry.ts`.
- `src/content/work/competitive-positioning-against-giants.md` — update public metadata/source link so the older smaller-company analysis remains one research artifact, not the definition of the whole inquiry.
- `tests/unit/home.test.ts` — preserve title/privacy contract and test any revised Home copy.
- `tests/e2e/home.spec.ts` — preserve Home title/status/deep-link/privacy behavior.
- `tests/e2e/home-motion.spec.ts` — only if markup changes affect existing motion selectors.
- `tests/e2e/typography-system.spec.ts` and `tests/unit/typography-source-contract.test.ts` — include new detail-page stylesheet/data file only if required by existing typography contracts.

### Preserve

- `src/data/competitive.ts` — remains a public snapshot of the earlier smaller-company mechanism research; do not rewrite it into the new cross-case employer-brand synthesis.
- `/work/why-some-people-choose-smaller-companies/` route — no route rename.
- `data-home-chapter="smaller-companies"` and current Home work slug — preserve selectors and existing homepage continuity.

---

### Task 1: Create the inquiry data contract and privacy tests

**Files:**
- Create: `src/data/smaller-companies-inquiry.ts`
- Create: `tests/unit/smaller-companies-inquiry.test.ts`

**Interfaces:**
- Export `PUBLIC_RESEARCH_ARCHIVE_URL = 'https://github.com/gabriel232ch/candidate-information-research'`.
- Export `SMALLER_COMPANIES_INQUIRY` with `title`, `dek`, `opening`, ordered `chapters`, `systemizationNodes`, `currentSynthesis`, `currentDesign`, `closing`, and evidence-link metadata.
- Each chapter has `id`, `heading`, `questionBefore`, `evidenceOrProblem`, `reframe`, `body`, and optional `archiveHref`.

- [ ] **Step 1: Write failing unit tests**

Assert:

- exact title is preserved;
- archive URL is exact;
- chapter order follows `geo → source-truth → positioning → reality → information-gap → query → evaluation → case-studies → decision-support → crossroads`;
- closing communicates open status rather than a final answer;
- public serialized data excludes employer identifiers and known private-asset labels;
- synthesis contains information-asymmetry / mutual-selection language and does not contain universal claims such as `why people choose companies is`.

- [ ] **Step 2: Run the unit test and confirm failure**

Run: `npm test -- tests/unit/smaller-companies-inquiry.test.ts`
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the typed public data module**

Use concise fields; keep long prose out of component markup. The module may contain approved approximate timing observations but no raw private examples.

- [ ] **Step 4: Run unit tests and confirm pass**

Run: `npm test -- tests/unit/smaller-companies-inquiry.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/smaller-companies-inquiry.ts tests/unit/smaller-companies-inquiry.test.ts
git commit -m "feat: add evolving inquiry content contract"
```

---

### Task 2: Rebuild the detail route around problem reframing

**Files:**
- Modify: `src/pages/work/why-some-people-choose-smaller-companies.astro`
- Create: `src/styles/work-inquiry.css`
- Create: `tests/e2e/smaller-companies-inquiry.spec.ts`

**Interfaces:**
- Route remains `/work/why-some-people-choose-smaller-companies/`.
- Render one `<article>` with stable section anchors from the inquiry data module.
- Use public archive links for evidence-heavy stages; do not inline the public archive’s full reports.

- [ ] **Step 1: Write failing route E2E tests**

Test that the route renders:

- the exact title;
- opening line that the question changed over the project;
- GEO → source-of-truth reframing;
- positioning → reality reframing;
- employee-information-gap reframing;
- query-based content logic;
- both systemization nodes;
- evaluation stage without raw baseline table;
- five-case research stage;
- bounded mutual-matching synthesis;
- abstract crossroads concept and truthful prototype status;
- `This is where the question has taken me so far.` or the final approved equivalent;
- links to the public archive repository;
- no employer identifiers, employee names from local redaction file, private skill names/paths, raw private HTML, or `10×` claim.

- [ ] **Step 2: Run the focused E2E test and confirm failure**

Run: `npx playwright test tests/e2e/smaller-companies-inquiry.spec.ts`
Expected: FAIL because the current route contains only `Current research` and `Patterns I’m looking at`.

- [ ] **Step 3: Rebuild the Astro route**

Import `SMALLER_COMPANIES_INQUIRY`, render semantic sections with headings and short evidence CTAs, preserve the existing `BaseLayout`, identity/back navigation, theme variables, and natural editorial typography.

- [ ] **Step 4: Add detail-page stylesheet**

Use existing CSS variables and font roles. Keep body measure near existing reading widths, make process transitions visually distinct without turning them into dashboard cards, and support `prefers-reduced-motion` by relying on no required motion for comprehension.

- [ ] **Step 5: Run the focused E2E test**

Run: `npx playwright test tests/e2e/smaller-companies-inquiry.spec.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/work/why-some-people-choose-smaller-companies.astro src/styles/work-inquiry.css tests/e2e/smaller-companies-inquiry.spec.ts
git commit -m "feat: expand smaller-company inquiry narrative"
```

---

### Task 3: Add verified baseline findings without exposing raw data

**Files:**
- Modify: `src/data/smaller-companies-inquiry.ts`
- Modify: `tests/unit/smaller-companies-inquiry.test.ts`
- Modify: `tests/e2e/smaller-companies-inquiry.spec.ts`

**Interfaces:**
- `SMALLER_COMPANIES_INQUIRY` gains `evaluation.findings`, exactly 2–3 public-safe findings extracted from original local baseline data.
- Each finding contains `observation`, `scope`, and `archiveHref`; no raw prompt rows or private file paths.

- [ ] **Step 1: Retrieve original local baseline evidence**

Codex must locate the actual local baseline/evaluation files. Record the source path in a local scratch note outside tracked files. Do not derive findings from conversation memory.

- [ ] **Step 2: Write failing tests for the selected findings**

Assert there are 2–3 findings, every finding has scope language, none contains private file paths/employer identifiers, and no finding uses causal wording such as `caused`, `proved`, or `therefore AI will` unless the underlying data directly supports it.

- [ ] **Step 3: Add the verified findings to the data module**

Use the least specific public wording that still preserves the actual observation.

- [ ] **Step 4: Render findings on the detail page**

Keep them as concise evidence notes inside the evaluation chapter; do not make a dashboard or raw results table.

- [ ] **Step 5: Run unit + focused E2E tests**

```bash
npm test -- tests/unit/smaller-companies-inquiry.test.ts
npx playwright test tests/e2e/smaller-companies-inquiry.spec.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data/smaller-companies-inquiry.ts tests/unit/smaller-companies-inquiry.test.ts tests/e2e/smaller-companies-inquiry.spec.ts
git commit -m "docs: add verified GEO evaluation findings"
```

---

### Task 4: Keep the homepage concise while reflecting that the inquiry has evolved

**Files:**
- Modify: `src/data/home.ts`
- Modify: `src/components/home/SmallerCompaniesChapter.astro` only if needed
- Modify: `tests/unit/home.test.ts`
- Modify: `tests/e2e/home.spec.ts`

**Interfaces:**
- Home still renders one lightweight unfinished chapter and one CTA to the unchanged detail route.
- It must not duplicate the full 10-stage narrative.

- [ ] **Step 1: Update failing Home tests first**

Require Home to preserve:

- exact title;
- truthful abstract employer context (`a quantitative investment firm` or a more privacy-preserving approved equivalent);
- open-ended status;
- no employer identity;
- CTA to `/work/why-some-people-choose-smaller-companies/`;
- at most a brief hint that the original positioning question expanded into an information/matching question.

- [ ] **Step 2: Run Home tests and confirm intended failure**

```bash
npm test -- tests/unit/home.test.ts
npx playwright test tests/e2e/home.spec.ts -g "smaller-company"
```

- [ ] **Step 3: Update Home copy minimally**

Do not add case-study lists, Skill/Harness details, evaluation findings, or crossroads prototype details to the homepage.

- [ ] **Step 4: Run Home tests and confirm pass**

Use the same commands; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/home.ts src/components/home/SmallerCompaniesChapter.astro tests/unit/home.test.ts tests/e2e/home.spec.ts
git commit -m "refine: update smaller-company home inquiry"
```

---

### Task 5: Reposition the older competitive analysis as one artifact inside the broader inquiry

**Files:**
- Modify: `src/content/work/competitive-positioning-against-giants.md`
- Modify: `src/data/competitive.ts` only if a source URL needs to point to the new public archive; do not change the five mechanisms merely to fit the new narrative.
- Modify: `tests/unit/home.test.ts` or add a focused content test if the metadata contract needs coverage.

**Interfaces:**
- Existing older analysis remains public and source-backed.
- Its metadata must no longer imply that it is the whole `Why Do Some People Choose Smaller Companies?` project.
- `source.originalReport` should point to the new public archive’s relevant smaller-company research path once published.

- [ ] **Step 1: Write/update a failing metadata test**

Assert the older work title remains `Competitive Positioning Against Giants`, summary describes it as an earlier comparative analysis, and source points to the public archive rather than a private/obsolete repository.

- [ ] **Step 2: Run the test and confirm failure**

Run the focused Vitest file.

- [ ] **Step 3: Update content metadata**

Keep the 28/12/6+2 evidence and mechanism boundaries; adjust only framing/source relationship.

- [ ] **Step 4: Run the focused test and `npm run check`**

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/work/competitive-positioning-against-giants.md src/data/competitive.ts tests
git commit -m "docs: reposition competitive analysis within inquiry"
```

---

### Task 6: Privacy, theme, accessibility, overflow, and visual QA

**Files:**
- Modify only if QA reveals defects: `src/styles/work-inquiry.css`, detail route, related tests
- Update visual snapshots only if this repository already treats the changed route as a snapshot target and the change is intentional

**Interfaces:**
- Detail route must work in light/dark, mobile/desktop, keyboard navigation, and reduced-motion environments.

- [ ] **Step 1: Add/complete QA assertions**

In `tests/e2e/smaller-companies-inquiry.spec.ts`, cover:

- light and dark theme colors use existing CSS variables;
- no horizontal overflow at 320, 768, and 1440 widths;
- all external archive links are keyboard-focusable and use valid `https://github.com/gabriel232ch/candidate-information-research...` URLs;
- heading order is semantic;
- no content depends on animation;
- privacy scan checks rendered text against a local redaction-pattern list if available to the test runner, otherwise the fixed public deny-list.

- [ ] **Step 2: Run focused E2E QA**

Run: `npx playwright test tests/e2e/smaller-companies-inquiry.spec.ts`
Expected: PASS.

- [ ] **Step 3: Run browser QA manually**

Inspect the route in at least 1440px desktop and 390px mobile in light/dark. Tune only typography, spacing, line breaks, and section rhythm; do not change approved narrative conclusions during visual polish.

- [ ] **Step 4: Run full verification**

```bash
npm run check
npm run lint
npm run test
npm run build
npm run test:e2e
```

Expected: all PASS.

- [ ] **Step 5: Run source privacy scan**

Search tracked public source/content files for employer identifiers, employee names from the local redaction list, private skill paths, private HTML filenames, and `.tmp`/absolute local paths. Historical internal design docs may contain employer names by prior approved design history; the scan gate applies to newly published website/source content and generated public assets, not to rewriting historical private-planning documentation already committed.

- [ ] **Step 6: Commit final QA fixes**

```bash
git add src tests
 git diff --check
 git commit -m "test: verify evolving inquiry experience"
```

---

### Task 7: Preview deployment and final public review

**Files:**
- No planned source change; any review fix returns to the owning task and is re-tested.

**Interfaces:**
- Produces a Cloudflare preview URL for human review; production deployment is not automatic in this plan.

- [ ] **Step 1: Create preview deployment**

Run: `npm run deploy:preview`
Expected: Wrangler returns a preview/version URL.

- [ ] **Step 2: Review the live preview**

Check Home → inquiry route → public archive links. Confirm the page reads as a changing question rather than a completed consulting case, the systemization moments do not dominate the story, and confidential employer context remains abstracted.

- [ ] **Step 3: Record final verification evidence**

Save the final commit SHA, preview URL, commands run, and outcomes in the implementation report used by the chosen Superpowers execution workflow.

- [ ] **Step 4: Stop before production deploy**

Production deployment requires explicit human approval after preview review.

---

## Final Verification

From the `gabriel-portfolio` worktree:

```bash
npm run check
npm run lint
npm run test
npm run build
npm run test:e2e
git diff --check
git status --short
```

Expected:

- all checks PASS;
- no unexpected tracked/generated files;
- website Home remains concise;
- detail route presents the full approved evolving inquiry;
- archive links resolve to the stable public research repository;
- no confidential employer artifacts are exposed;
- no production deploy occurs without explicit approval.
