# Task 3 report — Turn Chanel into a narrative chapter

## Result

Implemented the approved Chanel question-first chapter:

- Replaced `LuxuryFeature` with `ChanelChapter` on the Home route.
- Added the opening, return, visible evidence, turn, business complication, and unresolved-question beats in the approved order.
- Added compact France and United States price-position small multiples using `LUXURY_PRICE_SUMMARY`.
- Added the historical repricing signal and pressure/rebound business signal from `LUXURY_FLAGSHIP`.
- Added the local research deep-link and the scoped E2E contract for the public narrative and retired-copy boundary.
- Kept public copy free of the retired planning labels and strategy language checked by the focused test.

## TDD evidence

The Chanel E2E test was added first and run against the unchanged page. It failed as expected because `[data-home-chapter="chanel"]` and the new narrative were absent from `LuxuryFeature`.

After implementation, the focused test was run for desktop and mobile. Both projects are currently blocked before the Chanel assertions by the pre-existing Task 1 data/component mismatch: `NowSection.astro` reads removed `now.primary` / `now.side` fields and the page aborts while rendering.

## Verification

- `git diff --check`: passed.
- `npm run lint`: passed.
- `npm run test -- tests/unit/home.test.ts`: passed — 7 tests.
- `npm run check`: blocked by the pre-existing Task 1 schema errors in `NowSection.astro`, `EditorialClosing.astro`, and `src/pages/index.astro`; no Chanel-file diagnostics were reported.
- `npx playwright test tests/e2e/home.spec.ts -g "Chanel follows" --workers=1`: initially failed against the old page as expected; post-implementation run was blocked by the pre-existing `NowSection.astro` runtime error in both browser projects.

## Scope review

Changed only the requested Chanel components, `home-chanel.css`, the `index.astro` component replacement/import, the specified Chanel E2E addition, and this report. No Olist, smaller-company, Now, route, or retired-component cleanup work was started.

## Review fixes

- Replaced the old LuxuryFeature-specific Home test and mobile architecture test with the Chanel narrative and mobile price-position contracts.
- Scoped shared research-story assertions to the remaining Olist and competitive stories so they no longer require removed Chanel selectors such as `data-work-title` or `data-research-notes`.
- Strengthened the Chanel contract with exact opening/return/current copy, five beat containers, two markets, eight labeled price rails, and evidence metric counts.
- Rendered the historical gap from `LUXURY_FLAGSHIP.historical.gapFrom` and `.gapTo`.

## Review-fix verification

- `npm run lint`: passed.
- `npm run test -- tests/unit/home.test.ts`: passed — 7 tests.
- `npx playwright test tests/e2e/home.spec.ts --list`: passed — 20 tests discovered.
- Focused Chanel and mobile price-position browser tests completed without hanging but remain blocked before assertions by the pre-existing `NowSection.astro` schema/runtime mismatch in all four browser-project cases.
