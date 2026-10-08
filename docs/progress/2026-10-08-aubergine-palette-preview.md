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
