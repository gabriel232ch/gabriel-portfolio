# Aubergine palette preview

- Baseline: latest fetched origin/main, 8e184fff6d35f351960846ed43db236d6da04425.
- Branch: codex/aubergine-palette-preview.
- Change: shared light/dark palette only. Mist white #f4f3f6, aubergine ink #241b29, deep aubergine accent #49304f; coordinated muted text, lines, surfaces and dark theme. No acid-green accent in this first preview.
- Layout, typography, homepage copy, case pages, supporting data and Olist research are unchanged from baseline. Case-specific chart series colors remain intact.
- Existing browser tests updated for approved palette values; obsolete Olist detail expectations reconciled with the already-published report and its folded source link. Homepage Olist title remains unchanged.
- Validation: Astro check, ESLint, 35 unit tests, static build, 48 selected desktop/mobile browser tests passed. Four routes checked in light/dark at 1440px and 390px with no horizontal overflow. Desktop light and mobile dark screenshots inspected.
- Cloudflare version: c2a19ea0-4f6b-4fb3-aa76-312f0ebe6b4f.
- Immutable preview: https://c2a19ea0-gabriel-portfolio.gabrielchen.workers.dev/
- Remote preview: homepage and all three case pages returned 200 with the expected mist-white background; theme toggle produced the expected aubergine dark background.
- Await user preview confirmation before merging or publishing production. After approval, reconcile with latest main, merge via PR, build resulting main and verify it matches the approved preview before publication.

## Chart palette follow-up

User liked the base palette and requested matching project data and charts. Continued on the same branch and PR #8; fetched main, which remains 8e184ff.

- Added shared chart roles: aubergine #49304f, muted teal #466b68, slate #617087 and negative berry #92566d. Dark theme uses lighter corresponding colors.
- Chanel's revenue/profit/cash-flow series and homepage meters now match. Signed bridge/recovery losses use berry; gains use teal.
- Olist comparisons use aubergine and teal, with a matching dashed second-series line and legend. Single-series views remain aubergine.
- Financial appendix secondary bars use teal; growth heatmaps distinguish positive teal, negative berry and share slate, with capped tint for readable figures.
- Inquiry visual accents already inherit the shared aubergine palette and need no additional category colors.
- Data, labels, chart geometry, evidence, case narratives and research files are unchanged.
- Validation: Astro check, lint, 35 unit tests, build, 48 selected browser tests; four public routes at desktop/mobile widths in both themes with no overflow or page errors. All four chart colors exceed 3:1 against their theme backgrounds. Chart screenshots inspected.
- New version: 88f03528-d6f8-48e2-bbf6-dbad19ffc67f.
- New immutable preview: https://88f03528-gabriel-portfolio.gabrielchen.workers.dev/
- The prior palette preview remains a historical reference. Await confirmation of this updated chart preview before merge and production publication.
