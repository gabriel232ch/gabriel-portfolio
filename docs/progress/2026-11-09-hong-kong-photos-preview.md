# Hong Kong photographs in Now

User supplied two photographs from a Hong Kong trip on 24–26 October 2026 and asked to place them on the site. Milan photographs will follow separately. Tracked as GAB-18, following GAB-17.

## Placement and visual decisions

- Baseline: fetched latest origin/main, cafefb3f6322180cd1bbdbd40ce60884e492760a.
- Branch: codex/hong-kong-photo-journal.
- Place both photographs together in Now, after the three research chapters and before the existing current-life items. The concert portrait introduces a person; the harbour photograph adds place and atmosphere.
- Preserve the current palette: paper #f4f3f6, raised paper #faf9fb, ink #241b29, muted ink #6b6570, aubergine #49304f. The photographs supply their own colour. Dark mode continues to use existing tokens.
- Keep Cormorant Garamond for headings and the existing reading serif for captions and dates. Use existing semantic size roles; no new fonts.
- Left-align title, captions and date. Desktop uses two unequal image columns, with the harbour image starting lower. Phones stack the photographs with alternating alignment. Preserve complete original framing, including the night sky.

```text
Now       Hong Kong
          24–26 October 2026

          concert portrait
                              harbour at night

          current-life items
```

Design review: the distinction comes from these personal photographs and their different compositions. Keep the surrounding interface quiet, with short factual captions and no invented travel narrative or new decorative motion.

## Assets and checks

- Generated 480px and 960px WebP derivatives with orientation applied and metadata stripped. Originals remain in the user's Photos library. No original HEIC/JPEG is copied into public assets.
- Both 960px photographs together are approximately 163 KiB; mobile can select the approximately 59 KiB pair of 480px variants. Explicit image dimensions reserve their natural proportions. Images use lazy loading and responsive sources.
- Updated existing assertions that previously required the optional photo slot to be empty. No research or project content changed.
- Astro check, lint and build pass. All 35 unit tests and 40 selected desktop/mobile homepage browser checks pass.
- Inspected desktop and mobile, light and dark screenshots. Both photographs decode successfully; no horizontal viewport overflow. Content is static and remains present without JavaScript.
- Reviewed modified UI against current Vercel Web Interface Guidelines fetched on 2026-11-09: descriptive alt text, explicit dimensions, lazy loading, semantic headings, responsive layout and existing theme tokens.
- Protected case-page source files, supporting research data and public research exports are unchanged from origin/main. Existing browser checks cover the published project narrative, links and interactions.

## Review status

- Local preview: http://127.0.0.1:4321/#about
- Cloudflare version upload was rejected by automatic approval review before execution: personal photographs require explicit authorization for upload to that external destination.
- No photographs have been uploaded to Cloudflare or pushed to GitHub in this change. No production deployment was attempted.
- Ask the user to authorize Cloudflare preview and GitHub upload of the compressed photographs. Repository AGENTS.md also requires confirmation of a concrete preview before merging and publishing main.
