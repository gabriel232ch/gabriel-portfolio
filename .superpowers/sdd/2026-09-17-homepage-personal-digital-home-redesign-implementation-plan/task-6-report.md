# Task 6 report

## Implementation

- Added `/work/olist-marketplace-analysis/` using `BaseLayout` and the approved Olist narrative.
- Rendered every item in `OLIST_DATA_METRICS`, including delivered GMV proxy, on-time delivery, and Fix-market exposure.
- Added the required observational limits and public GitHub source link.
- Added `/work/why-some-people-choose-smaller-companies/` using the approved public comparison set and `COMPETITIVE_MECHANISMS` as analytical patterns under examination.
- Kept the smaller-company page self-contained and free of employer-specific/private-process details.
- Added the route-resolution E2E test for both local expansion pages.

## TDD evidence

The route test was added before the routes existed. Its first executable run failed at the expected missing-page assertion for the Olist heading. After implementation, the focused test passed in both Playwright projects:

```text
2 passed (desktop-chromium, mobile-chromium)
```

## Verification

- `npm run lint` — passed.
- `git diff --check` — passed.
- Focused route test — passed, 2/2.
- `npm run check` — blocked by pre-existing Task 1 homepage schema mismatches in `NowSection.astro`, `EditorialClosing.astro`, and `index.astro` (`HOME_STATE` no longer exposes the legacy `primary`, `side`, `authorNote`, `archive`, and top-level `personalSnapshot` fields).
- `npm run build` — generated both new route entrypoints, then exited 1 while prerendering the unchanged home route because `NowSection.astro` reads the missing `now.primary` field.

## Scope review

Implementation changes are limited to the two requested route files and the route-resolution additions in `tests/e2e/home.spec.ts`. The only additional artifact is this task report. `git diff --check` is clean, and a focused privacy scan found no `JoinQuant`, `聚宽`, or private-process terms in either new route.
