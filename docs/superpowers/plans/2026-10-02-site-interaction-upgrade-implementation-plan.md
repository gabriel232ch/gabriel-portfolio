# Gabriel Portfolio Site Interaction Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade navigation, research exploration and reading continuity while preserving Gabriel's approved personal digital home.

**Architecture:** Keep the existing Astro multipage site. Use a small chapter registry, shared page controls, progressive enhancement and independent reading/chart controllers. Derive navigation from semantic sections; preserve real links and native disclosures.

**Tech Stack:** Existing Astro 7, TypeScript, CSS, Vitest, Playwright, GitHub and Cloudflare Workers; no new framework or animation dependency.

**Spec:** `docs/superpowers/specs/2026-10-02-site-interaction-upgrade-design.md` (user approved 2026-10-02).

**Status:** Plan prepared for review; implementation has not started. Recommend native execution by Codex, with a final independent review under the execution skill.

## Global Constraints

- Preserve Hero → Chanel → Olist → Smaller companies → Now → Closing and existing public titles/routes.
- Mobile body at least 20px; detail titles no larger than homepage project titles; use approved semantic typography tokens.
- Keep `#work` and `#about`; add `#chanel`, `#olist`, `#smaller-companies`.
- Controls at least 44×44 CSS px; mobile header can use two rows.
- New feedback 120–220ms; cross-page continuity 180–280ms; existing narrative pacing is not globally shortened.
- Effective Quiet = system reduced-motion OR explicit user Quiet. All information remains visible.
- No full Index/Archive/CMS product, new content routes, tracking, employer-private artifacts or recruiter CTA.
- Sources must be read and verified; do not create fake links, fabricated methods or unsupported numerical/causal claims.
- Execute the smaller-company content requirements through the existing October 2 design/companion plans, not an alternative story.
- Do not deploy production until an actual preview has been reviewed under the project's existing workflow.

## Review Focus

1. Denied storage must not prevent readable content or theme/Quiet controls (Task 2).
2. A tall narrative node and a deep link must never remain hidden in pending state (Tasks 2, 4).
3. History Back restores the reader's position; explicit home return goes to the correct chapter (Task 4).
4. Touch and keyboard chart selection expose the same correct value without hover (Task 6).
5. Concurrent inquiry updates and unavailable source archives must not be overwritten or disguised as completed evidence work (Task 8).

## Execution Setup

After plan review, use `using-git-worktrees` to isolate implementation. Carry the approved spec/plan and audit commit into the implementation branch. Read any AGENTS.md discovered in that checkout. Check current remote HEAD and inquiry companion progress before edits; retain unrelated changes.

Run `npm ci` under Node >=22.12.0, then repository check/lint/unit/build to establish a baseline. Existing Darwin screenshot baselines are platform-specific: record baseline differences before any screenshot update, and visually review intentional changes. Current dependency versions come from the lockfile.

## File Map

- `src/data/site-navigation.ts`: homepage anchor/title/route registry; does not replace Living Index.
- `src/components/system/SiteHeader.astro`: shared header/controls; `ThemeToggle.astro` stops owning fixed placement.
- `src/components/system/QuietToggle.astro`, `src/lib/motion-preference.ts`: accessible control, storage-safe effective preference.
- `src/lib/interactions/navigation.ts`: disclosure behavior and active chapter state.
- `src/lib/interactions/reading.ts`, `src/components/research/ReadingContents.astro`: directory/progress enhancement.
- `src/lib/interactions/chart-selection.ts`: preview/selection/readout behavior.
- `src/components/research/ResearchFooter.astro`: other genuine research links.
- `src/styles/interactions.css`: shared header, focus, reading controls and enhancement styles; imports through BaseLayout.
- `src/data/olist-trail.ts`: verified method/observation/source records.
- October 2 companion files `src/data/smaller-companies-inquiry.ts` and `src/styles/work-inquiry.css`: reuse or create through their existing plan.
- Existing home chapters, BaseLayout, three detail pages and related styles: integrate new components without unrelated refactoring.

## Task 1: Accurate Destinations and Shared Detail Headers

**Files:** Create navigation registry, SiteHeader and ResearchFooter; modify ThemeToggle, HomeNavigation, three home chapters and three detail pages; create `tests/e2e/site-navigation.spec.ts`.

**Interfaces:** `ResearchId = 'chanel' | 'olist' | 'smaller-companies'`; `SITE_RESEARCH: readonly {id: ResearchId; title: string; shortTitle: string; homeHref: string; detailHref: string}[]`; titles use HOME_STATE. `SiteHeader` Props `{home?: boolean; researchId?: ResearchId}`; `ResearchFooter` Props `{current: ResearchId}`.

- [ ] Write failing E2E cases for all three detail pages: one theme button, correctly targeted Back to home, two Other questions links. Assert the existing `#work`/`#about` and all three new chapter targets resolve. At 390px and 1440px assert header controls' rectangles do not overlap and interactive dimensions are >=44px.
  ```ts
  await expect(page.getByRole('link', {name: 'Back to home', exact: true})).toHaveAttribute('href', '/#olist');
  await expect(page.getByRole('button', {name: 'Switch color theme'})).toHaveCount(1);
  ```
- [ ] Run `npx playwright test tests/e2e/site-navigation.spec.ts`; expect failure against missing shared behavior.
- [ ] Implement the registry and shared header/footer. Keep original home WORK/NOW links; use stable real anchors with focusable headings. Move theme positioning to header layout, remove decorative report taxonomy/folio, retain data periods and reference figure numbers.
- [ ] Run the new suite and existing home/theme/typography suites; correct overlap and semantics without shrinking copy.
- [ ] Commit the tested header/destination changes with a focused message.

## Task 2: Storage-Safe Quiet and Readable Motion

**Files:** Create motion-preference, QuietToggle; modify BaseLayout, SiteHeader, ThemeToggle, HomeMotionController, Chanel report motion code and motion/home/report CSS; create `tests/e2e/site-motion.spec.ts`.

**Interfaces:** `readMotionPreference(): {userQuiet: boolean; systemReduced: boolean; quiet: boolean}`; `setUserQuiet(value: boolean): void`; use `quiet-motion` storage key, `html[data-quiet='true'|'false']`, event `site:motion-change` with the same state object. Consumers react dynamically, rather than initializing twice. Storage access is guarded.

- [ ] Write failing cases for Quiet persistence across routes/reload, dynamic system reduced-motion, denied localStorage, absent IntersectionObserver, no-JS content and a motion node taller than the viewport. Use actual CSS opacity/transform and content visibility as assertions, not just data attributes.
  ```ts
  await page.emulateMedia({reducedMotion: 'reduce'});
  await expect(page.locator('html')).toHaveAttribute('data-quiet', 'true');
  await expect(page.getByRole('heading', {name: 'Gabriel Chen', exact: true})).toBeVisible();
  ```
- [ ] Run `npx playwright test tests/e2e/site-motion.spec.ts`; expect missing Quiet behavior to fail.
- [ ] Implement preference bootstrap before paint, accessible Quiet state and dynamic listeners. System preference dominates, with visible explanation. Home/report nodes are visible unless enhancement initializes successfully; entry uses intersection sufficient for oversized nodes. When Quiet activates, disconnect observers and reveal everything. Avoid creating duplicate listeners.
- [ ] Run site-motion, existing home-motion and theme suites. Verify no-JS signature/content is visible and theme still works when storage throws.
- [ ] Commit motion preference and resilience changes.

## Task 3: Contextual Home Navigation

**Files:** Create navigation controller; modify HomeNavigation/SiteHeader and interactions.css; extend site-navigation E2E.

**Interfaces:** `initNavigation(root: HTMLElement): () => void`; root contains native details/summary and real links; `data-current-chapter` receives registry shortTitle. Disposing removes observers/listeners.

- [ ] Write failing tests: Hero first view has small WORK/NOW controls; after reaching Olist, compact nav identifies Olist and Explore lists all full research titles. Keyboard opens Explore, Escape closes and restores trigger focus; choosing a chapter closes it and focuses target heading. Hidden disclosure content is not tabbable.
- [ ] Run `npx playwright test tests/e2e/site-navigation.spec.ts`; expect new compact navigation cases to fail.
- [ ] Implement compact nav triggered by Hero visibility. Derive active section from document position; do not let pending animation styles confuse detection. Outside-click close preserves clicked links. Mobile uses the specified two-row arrangement.
- [ ] Re-run navigation tests and review desktop/mobile first-view and scrolled headers in both themes.
- [ ] Commit contextual navigation changes.

## Task 4: Cross-Page Continuity and History

**Files:** Modify BaseLayout, home signature styles and interactions.css; create `tests/e2e/site-continuity.spec.ts`.

**Interfaces:** Use native cross-document view transitions with CSS feature detection; no client router. Session signature state is optional/storage-safe; history-restored and hash-targeted home visits present completed signature. Explicit links and browser history remain distinct operations.

- [ ] Write failing tests for each homepage CTA → detail → explicit return, plus browser Back restoring the CTA reading position within 100 CSS px after layout settles. Assert hash entry reveals target, signature does not restart on research return, and new-tab navigation keeps its real destination.
  ```ts
  await page.getByRole('link', {name: 'Back to home', exact: true}).click();
  await expect(page).toHaveURL(/\/#olist$/);
  await expect(page.locator('#olist')).toBeInViewport();
  ```
- [ ] Run `npx playwright test tests/e2e/site-continuity.spec.ts`; expect missing signature/history integration cases to fail.
- [ ] Implement native navigation enhancement only. Use light fade where title copy differs. Do not manually reset native history scroll restoration. Hash/explicit return offset accounts for header. Never intercept modified clicks.
- [ ] Run continuity under normal/Quiet and unsupported-transition conditions; manually review first home entry vs research return. Do not animate keyboard location changes unnecessarily.
- [ ] Commit continuity changes.

## Task 5: Shared Reading Directory and Progress

**Files:** Create ReadingContents and reading controller; modify three detail pages/report CSS; create `tests/e2e/research-reading.spec.ts`.

**Interfaces:** `ReadingSection = {id: string; label: string}`; ReadingContents Props `{sections: readonly ReadingSection[]}`. `initReading(article: HTMLElement, contents: HTMLElement, progress?: HTMLElement): () => void`. Active link uses aria-current='location'; progress is visual/decorative, measured over article.

- [ ] Write failing tests for correct anchor activation, mobile directory close/focus, desktop sticky directory and no obscured headings. Assert progress is zero before article and complete at article end; changes do not continuously update aria-live.
- [ ] Run `npx playwright test tests/e2e/research-reading.spec.ts`; expect mobile/shared-directory behavior to fail.
- [ ] Replace Chanel's duplicated directory/progress handlers with shared enhancement, retaining its ten sections. Add compact directories for Olist/inquiry semantic sections; content tasks can later update their registry. Use native details on mobile, expanded desktop layout, and real headings/links without script.
- [ ] Run reading/navigation/continuity suites; review long directory at narrow width, both themes and 200% text zoom.
- [ ] Commit reading controls.

## Task 6: Inspectable Chart Selection

**Files:** Create chart-selection controller; modify Chanel report/chart markup and report CSS; create `tests/e2e/research-charts.spec.ts`.

**Interfaces:** `initChartSelection(chart: HTMLElement): () => void`; buttons retain `data-chart-bar`/aria-pressed and add `data-readout` containing authoritative formatted series/market/year/value/unit. Each chart has separate preview/selected state, visible output, polite committed-selection status and an explicit Clear selection control. Readout text uses textContent.

- [ ] Write failing cases: France entry selection reads EUR 4,850, keyboard/actual touch match, repeated activation and Escape/Clear remove selection, hover does not replace locked selection, selecting another chart leaves the first chart independent. Check native full-data table access at mobile width.
  ```ts
  await page.getByRole('button', {name: 'France entry price: EUR 4,850', exact: true}).click();
  await expect(page.getByRole('button', {name: 'France entry price: EUR 4,850', exact: true})).toHaveAttribute('aria-pressed', 'true');
  await expect(chart.locator('[data-chart-readout]')).toContainText('4,850');
  ```
- [ ] Run `npx playwright test tests/e2e/research-charts.spec.ts`; expect missing persistent visible readout behavior to fail.
- [ ] Implement state and styling for all existing report charts. Preserve source values/units/periods and complete tables. Use shape/border/text as well as color. Enlarge hit areas without overlapping adjacent targets; no global body horizontal overflow.
- [ ] Run chart and reading suites across themes/motion preferences. Verify data-table values and selected readouts agree.
- [ ] Commit chart interaction changes.

## Task 7: Source-Backed Olist Analysis Trail

**Files:** Create olist-trail; modify Olist detail page and HOME_STATE Now href support; update NowSection; create `tests/e2e/olist-reading.spec.ts`.

**Interfaces:** `OlistTrailStep = {id: string; question: string; rationale: string; method: string; observation: string; sourceHref: string}`; `OLIST_TRAIL: readonly OlistTrailStep[]` has five verified steps matching the existing analysis trail. Now items accept optional href; only existing destinations become links.

- [ ] Read `gabriel232ch/olist-marketplace-analytics` README and exact methodology/query/output files found through its tree. Record path and revision for every new method/observation in `docs/audit-2026-10-02/olist-evidence-map.md`. Do not invent filenames or derive unwarranted claims from the metric cards.
- [ ] Write failing E2E for five analysis steps: questions/findings remain visible, supplemental methods open through native disclosures, each source link points to a verified file, existing GMV/delivery/limits remain intact. Now thinking item links to the real inquiry; Italian/Baldur's Gate remain plain text.
- [ ] Run `npx playwright test tests/e2e/olist-reading.spec.ts`; expect richer source-backed trail cases to fail.
- [ ] Implement verified trail and clear growth/reliability relationship, reusing existing metric values. Add those section IDs to ReadingContents. If source is unavailable, keep verified current content and record unresolved gaps; do not mark this task fully complete.
- [ ] Run Olist and existing home/typography suites; review compact page pacing and absence of repeated generic dashboard cards.
- [ ] Commit content, evidence map and related interactions together.

## Task 8: Integrate the Existing Inquiry Evolution

**Files:** Reuse/create companion `smaller-companies-inquiry.ts` and `work-inquiry.css`, modify existing inquiry detail/SmallerCompaniesChapter and companion tests `tests/e2e/smaller-companies-inquiry.spec.ts`.

**Interfaces:** Existing October 2 content module and public archive contracts are authoritative. Shared navigation/reading/footer components consume its verified title, section IDs and real archive URLs; do not impose a second module shape.

- [ ] Read current remote inquiry state and both October 2 companion plans. If content has landed, preserve it and integrate controls. If not, execute the website plan's source-backed content steps using the approved design. Only reuse archive URLs whose repository/files are verified; creating or publishing a new external archive needs that companion task's scope, not a guessed URL.
- [ ] Write failing cases for evolving-question sections, real case/source links, the retained privacy abstraction and open-question ending. Add regression for preserved companion content plus shared controls; privacy fixtures remain local and must not be committed publicly.
- [ ] Run `npx playwright test tests/e2e/smaller-companies-inquiry.spec.ts`; expect missing evolution/interaction cases to fail against old summary.
- [ ] Integrate the living narrative and disclosures without exposing private transcripts/evaluation inputs/employee identifiers. Cases remain evidence within the broader question. If the archive dependency is unavailable, implement independently verified interactions, document the missing content dependency and keep overall content-upgrade status incomplete.
- [ ] Run inquiry, continuity, reading and homepage suites; scan newly rendered/public material for privacy leaks under the existing companion rules.
- [ ] Commit verified inquiry integration, preserving unrelated concurrent updates.

## Task 9: Full Review, Preview and Handoff

**Files:** Update relevant tests/intentional visual baselines; create `docs/audit-2026-10-02/interaction-upgrade-validation.md` and `docs/decisions/2026-10-02-site-interaction-upgrade-review.md`.

**Interfaces:** Validation report records commands/results, source revisions, exact preview version, screenshot states, limitations and unresolved dependencies. Review record distinguishes design approval, technical verification, visual approval and production deployment.

- [ ] Run `npm run verify`; diagnose failures before changes. Do not blindly refresh Darwin baselines or treat skipped tests as passing. Add only necessary behavior regressions discovered during QA.
- [ ] Browser-QA all four pages at 390px/1440px, light/dark, regular/Quiet/reduced-motion; inspect navigation, cross-page return, locked chart values, disclosures and source links. Save accepted before/after captures; no-JS/deep-link/keyboard checks must be evidenced, not inferred from screenshots.
- [ ] Review spec coverage, actual interaction speed, clipping/overlap, motion failures and source boundaries. Fix defects and rerun affected tests; run complete verify again only if changes warrant it.
- [ ] Commit the complete reviewed changes and documentation. Push the implementation branch and create an existing-Cloudflare preview when credentials/access permit. If preview access is missing, report the actual blocker and retain the reviewable local result.
- [ ] Present concrete preview and concise automated evidence for visual review. Do not claim shipped/production-updated before review and actual deploy verification. After authorized production deployment, verify all four public routes, their correct links and production version; record exact deployed commit.

## Plan Self-Review

- Spec coverage: header/anchors/metadata Task 1; Quiet/content resilience Task 2; contextual navigation Task 3; history/transitions/signature Task 4; directory/progress Task 5; charts/tables Task 6; Olist/Now Task 7; inquiry/privacy Task 8; responsive visual QA/release Task 9.
- Interfaces: ResearchId and SITE_RESEARCH consistently drive home/detail/footer destinations; motion change state is shared by all consumers; article/directory and chart state remain independent.
- All five Review Focus failures have explicit owning tests. Source dependencies cannot be declared complete through UI tests alone.
- No new implementation dependency, public taxonomy, private-data exposure or unreviewed production action is required by the plan.
