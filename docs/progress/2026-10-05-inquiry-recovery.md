# Recover the approved Smaller Companies inquiry

Date: 2026-10-05 (Asia/Shanghai). Status: combined recovery validated and preview published; production awaiting visual approval.

## Root cause

The approved inquiry was committed on the local `codex/smaller-companies-inquiry` branch at `c74e86f2ebd05ab09c7d0ff18d35db722302013e`, tree `e3d5131ac9469d28bc580676df429468d5b54541`. It produced Cloudflare preview `456a2609-9939-4086-89d3-a2f17adab079` and the explicitly approved October 3 production deployment `e4fed1ab-fc7e-45bf-8b4e-31ac3b0dd32a`. The original worktree was clean.

The inquiry commits never entered main or a remote branch. Chanel PR #4 targeted main at `c44b2d63f1cb4e954892173d5b76f1fd41229e40`, which held the inquiry plan but not its implementation. The Chanel branch reflog records its creation from the older `862e00d` ancestor. Its October 4 production version `7e1bfb3d-eaef-46c4-89bc-59456899fe71` was built from `1ac1a00`. Current main is the PR’s squash commit `d60272d7fb80ac8d80d95cb2baa516ba5a50c5e9`; its src/public tree matches the Chanel production source.

Git ancestry confirms that c74e86f is not an ancestor of current main; their merge base is c44b2d63. The new inquiry was committed but unmerged, rather than an uncommitted build or a Git revert. The later whole-site deployment carried the older inquiry route back into production.

The approved preview’s inquiry HTML matches the preserved original dist artifact byte for byte: SHA-256 `932144d72c0f178e8f94ab881e06ba0240516d6da3d056485f1df5a3a1b08ef5`. Worktree/ref/reflog inspection recovered the exact reachable implementation, so unreachable-object recovery and rebuilding from the implementation plan were unnecessary.

## Recovery

A fresh `codex/inquiry-recovery` worktree starts from current origin/main d60272d. Six original commits were cherry-picked cleanly: bfce9d8, dbef8ad, a01e811, 65ba4b0, 220dcc7, and c74e86f. Their recovered commits are 9ff0981, 68f4588, eb72a2a, 592dbb4, 37f0d0f, and 51ca8ee.

Recovered product files:

- `src/data/smaller-companies-inquiry.ts`
- `src/pages/work/why-some-people-choose-smaller-companies.astro`
- `src/styles/work-inquiry.css`
- the Smaller Companies sentence in `src/data/home.ts`
- `src/content/work/competitive-positioning-against-giants.md`

Inquiry-specific unit/E2E tests, Home inquiry assertions, archive-link assertions, and the detail typography selector were recovered too. The Home data file merged automatically with only one inquiry sentence changed. Inquiry data/route/style/archive metadata match c74e86f exactly. No Chanel source, data, component, style, or detail-route file changed. Current public research archive links remain intact.

The early qualitative GEO exploration and later employee-story/query baseline retain their separate chronology and evidence boundaries. No source material was reinterpreted during recovery.

## Validation reconciliation

The first complete browser run identified 18 failures: four old Home screenshot baselines and 14 stale assertions referencing Chanel content/markup removed by the already approved Chanel update. The recovered inquiry checks passed. Those assertions now check the approved operating-recovery headings, three FY2025/FY2023 measures, sources link, mobile figure containment, and current numeric typography selector. The four Home baselines were regenerated for the combined tree. Product code was unchanged during this reconciliation.

Final `npm run verify` against the built local preview passed: Astro 0 errors/warnings/hints; ESLint passed; Vitest 35/35 across eight files; seven-page static build; Playwright 120 passed, six expected project skips, zero failures. The existing empty phases-directory build warning remains informational. A scan of 127 source/public/built files against 74 private redaction patterns found zero hits. Desktop 1440×1000 and mobile 390×844 inquiry layouts were inspected with no horizontal overflow.

## Publication

Only a new Cloudflare preview is authorized by the current recovery request. Review the combined preview before merging into main and promoting that reviewed version to production. Future production releases must include both approved projects in main so branch-only deployments cannot lose previously approved work.

## Combined review preview

- Preview: https://37b1b34e-gabriel-portfolio.gabrielchen.workers.dev
- Inquiry: https://37b1b34e-gabriel-portfolio.gabrielchen.workers.dev/work/why-some-people-choose-smaller-companies/
- Cloudflare version: `37b1b34e-4b8e-4510-ad38-499f6feed42e`.
- Uploaded source commit: `550792e6d5c1d433b23858a3e95821828c878f5d`. Subsequent commits only record publication details; product source is identical.
- Command: `npm run deploy:preview -- --message 'Recover approved inquiry at 550792e alongside current Chanel main'`; successful. No production deployment or main merge was run.
