# Task 2 report — Simplify the Hero to identity + one sentence

## Result

Implemented the Task 2 Hero contract without changing the signature drawing or animation:

- Removed the Hero folio number and reading list.
- Removed the retired intro label and reading metadata markup.
- Rendered `HOME_STATE.intro.statement` as the sole Hero context sentence.
- Preserved the signature SVG and its accessibility label.
- Updated Hero spacing and desktop grid offsets for the simplified composition.
- Replaced the first Home E2E test with the approved identity-first contract.

## TDD evidence

The focused test was updated first and run against the unchanged Hero. It failed as expected: the pre-Task-2 Hero attempted to render removed `state.reading` data and the page errored before the new contract could pass.

After implementation, the focused Hero and reduced-motion tests were run. Both remain blocked by pre-existing Task 1 schema consumers outside this task's ownership: `NowSection.astro` still reads removed `now.primary`, `now.side`, and `HOME_STATE.authorNote` fields, so the page aborts before either test can reach its assertions.

## Verification

- `git diff --check`: passed.
- `npm run lint`: passed.
- `npm run test`: passed — 16 tests.
- `npm run check`: blocked by the pre-existing Task 1 data/component mismatch in `NowSection.astro`, `EditorialClosing.astro`, and `src/pages/index.astro`.
- `npx playwright test tests/e2e/home.spec.ts -g "opens with Gabriel identity"`: blocked by the same `NowSection.astro` runtime error.
- `npx playwright test tests/e2e/home-motion.spec.ts -g "reduced motion"`: blocked before page motion assertions by the same runtime error.

## Scope review

Only the requested Hero component, Hero/shared CSS rules, focused Home E2E contract, and this report were changed. No Task 3 component, route, data, snapshot, or unrelated edit was modified.

## Review fix

Removed the remaining legacy `[data-home-reading]` click and link-resolution loop from `tests/e2e/home.spec.ts`. The viewport-overflow test now checks only its current responsibility, and the identity-only Hero contract retains the explicit zero-count assertion for the retired selector.

Verification after the fix:

- `git diff --check`: passed.
- `npm run lint`: passed.
- `npm run test`: passed — 16 tests.
- Playwright discovery for the focused Hero test: passed — 2 projects listed.
- Focused Hero Playwright run: still blocked before assertions by the pre-existing `NowSection.astro` runtime/schema mismatch documented above.
