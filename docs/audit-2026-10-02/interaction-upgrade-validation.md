# Interaction upgrade validation

Interaction implementation is ready for visual review. Production has not been updated.

## Implemented behavior

- Accurate chapter returns, shared research headers and two other genuine research destinations on every detail page.
- Home starts with WORK/NOW, then provides contextual Explore and current chapter after the hero. Native links, keyboard focus, Escape and history remain intact.
- Persistent Quiet respects live system reduced-motion preferences. Denied storage, missing IntersectionObserver, oversized narrative nodes and JavaScript-disabled content remain readable.
- Three research directories use semantic disclosures, current-location links and progress measured over research content. Chanel retains all ten sections.
- Chart selection supports hover preview, click/touch/Enter locking, independent charts, visible authoritative values, polite committed announcements, Escape and Clear. Transparent hit regions preserve data-encoded heights.
- Tablet heatmap values remain readable in horizontal scrollers. Overflowing tables have focusable labelled regions and visible scrolling guidance.
- Olist now explains five questions, their rationale, observations and expandable methods/sources. Key findings remain visible. Numbers are unchanged. See [evidence map](olist-evidence-map.md).
- Now retains daily-life content; its existing research question links to the actual inquiry.

## Automated evidence

Node 24.19.0; lockfile dependencies; Astro 7.2.9. Check, ESLint, unit and build commands passed. Unit result: 22/22.

Behavioral regression: 154 passes in the final main run plus the corrected capture test passing separately = 155 distinct passes. An added missing-IntersectionObserver case subsequently passed in both projects; 157 distinct behavior cases verified overall. Platform/project matrix duplication produces 13 intentional skips; skips are not passes. A final navigation/capture/fallback rerun verifies the last mobile disclosure offset.

The managed environment isolates local server network namespaces. E2E used built static output with a same-command HTTP server, matching custom 404 behavior, instead of the unavailable Astro dev preview. Browser: Chromium 153.0.8010.0 from a temporary npm-registry binary; project Playwright expects Chromium 151.0.7922.34. No browser package or preview override was added to production dependencies/configuration.

The six screenshot-baseline tests were run separately: all six fail because the repository contains Darwin baselines and no Linux baselines. Newly auto-written Linux images were removed, and Darwin baselines were preserved. This is not a claim that the full `npm run verify` pipeline passes here. Current screenshots were visually inspected independently.

Security/hygiene: Gitleaks 8.30.0 working-tree and history scans passed; Vale passed. Pre-commit is not configured. Final diff whitespace check passed. Approved architecture/spec/audit documents are retained as durable project rationale.

## Visual and interaction review

Four public pages were exercised at 390px and 1440px in light/dark with regular, explicit Quiet and system reduced-motion states (48 page-state combinations). Captures in [after](after/) cover first views, contextual Explore, chart locks and Olist methods. Keyboard, touch, no-JS, deep-link, explicit return, native history, storage denial, live preference changes and article progress were tested. An independent code review approved the corrected interaction scope.

Representative captures:

- [Mobile research header](after/page-1-390-light.png)
- [Mobile Explore](after/explore-390-light.png)
- [Mobile selected chart value](after/chart-390-light.png)
- [Olist reasoning](after/trail-1440-light.png)
- [Dark homepage](after/page-0-1440-dark.png)

Safari/Firefox, real screen-reader sessions and 200% text zoom were not verified in this environment. Visual approval from Gabriel is still pending.

## Unresolved dependencies

1. The companion inquiry archive `gabriel232ch/candidate-information-research` returns GitHub 404. Required local private evidence is not in this checkout. Existing verified smaller-company content is preserved, and its independent interactions are upgraded. The expanded narrative, baseline findings and archive links remain incomplete; no guessed link or unsupported claim was published.
2. `wrangler whoami` reports unauthenticated. An existing-account Cloudflare preview cannot be uploaded here. Production deployment remains pending preview access and the approved visual review workflow.
