# Work depth implementation plan

Execution: inline, autonomous as explicitly requested by the user.
Goal: connect the editorial Home to readable, evidence-bounded Work.
Architecture: Astro Content Collections, shared route eligibility, reusable case layout, Markdown bodies, shared luxury data component.
Tech stack: existing Astro/TypeScript/CSS/Vitest/Playwright only.
Spec: `docs/superpowers/specs/2026-09-08-phase-3-work-reading-design.md`.

## Constraints

Frozen foundation and Home compositions; no new dependencies, IDs, publication-state changes or infrastructure. Use existing repository evidence only. No production merge.

## Task 1 — Route policy

- [x] Add `tests/unit/work.test.ts`: matrix for publication × visibility; only the three Home review entries receive the legacy review exception. Test an unknown review slug.
- [x] Run `npm test -- tests/unit/work.test.ts`, observe missing policy failure.
- [x] Add `src/lib/content/work.ts`: `isWorkRoutable(entry)`; use public visibility plus published state or allowlisted Home review state.
- [x] Re-run policy tests.

## Task 2 — Reading experience

- [x] Add `tests/e2e/work.spec.ts`: Home reading links, index → each case, native contents, Reading Mode data/body equivalence, no-JS, theme persistence, narrow widths, reduced motion, 404.
- [ ] Run route test and observe 404 before implementation.
- [x] Implement `/work/index.astro`, `/work/[slug].astro`, luxury Reading Mode route, `WorkLayout.astro`, `WorkNavigation.astro`, `LuxuryEvidence.astro`, `work.css`.
- [x] Add bounded analysis and limitations to all three Markdown bodies; use existing metadata for question, conclusion and evidence. Sources remain in one curated data module.
- [x] Add links after each Home outcome; closing Index leads to Work. Preserve top anchor navigation.
- [ ] Run check, lint, unit/build and targeted E2E; correct defects.

## Task 3 — QA and handoff

- [ ] Inspect actual Home baseline and new pages with Browser; traverse routes, open tables, switch modes and theme.
- [ ] Run `npm run verify`; establish separately labeled Linux baselines if absent, without replacing approved Darwin files.
- [ ] Inspect mobile screenshots, test 320/768/1024 widths, keyboard and no-JS, full internal link integrity.
- [x] Record actual results and limitations in `docs/progress/2026-09-08-phase-3-work-reading-handoff.md` and authoring guidance in `docs/content/work-authoring.md`.
- [ ] Self-review diff; commit and push feature branch, open draft PR where available. Do not mark human acceptance or merge into production.

## Execution outcome

Tasks 1 and 2 implementation are complete. Check/lint/24 unit tests/build and built-output integrity passed. Browser startup, E2E red/green and visual acceptance remain blocked; no visual baselines were changed. See the handoff for exact errors and the remaining verification steps.
