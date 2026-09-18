# Task 4 report — Reshape Olist around problem discovery

## Result

Implemented the compact Olist capability-growth chapter:

- Replaced `OlistFeature` with `OlistChapter` on the Home route.
- Added Samsung origin, the approved no-predefined-question narrative, the business tension, and the local analysis deep link.
- Added a lightweight accessible Olist data map for the table relationships.
- Pulled only the GMV and on-time comparison metrics from `OLIST_DATA_METRICS`, with build-time assertions that both are present.
- Added tighter Olist-specific rhythm and responsive styling in `home-olist.css`.
- Replaced stale Olist E2E assertions for decision taxonomy, accordions, and the old report contract with the new chapter contract.

## TDD evidence

The Olist contract was added first and run against the unchanged page. It failed as expected because the old page had no `[data-home-chapter="olist"]` and no Samsung-origin narrative.

The focused browser test was rerun after implementation. It remains blocked before Olist assertions by the pre-existing `NowSection.astro` runtime mismatch: the unchanged component reads removed `now.primary` / `now.side` fields, so the page aborts while rendering.

## Verification

- `git diff --check`: passed.
- `npm run lint`: passed.
- `npm run check`: blocked by pre-existing `NowSection.astro`, `EditorialClosing.astro`, and `index.astro` schema errors; no Olist-file diagnostics were reported.
- `ASTRO_DEV_BACKGROUND=0 PLAYWRIGHT_BASE_URL=http://127.0.0.1:4330 npx playwright test tests/e2e/home.spec.ts -g "Olist shows capability growth" --workers=1`: initially failed against the old page as expected; post-implementation run was blocked by the same pre-existing `NowSection.astro` runtime error in desktop and mobile projects.
- Scoped copy review confirmed the rendered Olist chapter contains none of the retired `GROW`, `DEFEND`, `FIX`, or `INVESTIGATE` taxonomy labels.

## Scope review

Changed only the approved Olist components, Olist stylesheet, Home replacement/import, scoped Olist-related Home E2E coverage, and this report. No Task 5, routes, Now, cleanup, or retired-component deletion work was started.
