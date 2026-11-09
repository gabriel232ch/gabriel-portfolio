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

- User reviewed the concrete local preview and approved placement. They then explicitly authorized upload, merge and direct deployment, requesting the concert identification and original-quality images before publication.
- The earlier automatic approval rejection is resolved by that explicit authorization. Continue through a PR into main, build main and verify the live deployment.

## Approved final revision

- Concert is The Weeknd on the evening of 24 October 2026, confirmed by the user. Artist spelling and Hong Kong dates checked against the venue's official event listing: https://www.kaitaksportspark.com.hk/events-tickets/the-weeknd-after-hours-til-dawn-tour
- Night photograph is served directly from the original 1536×2720 JPEG, without recompression. The original HEIC is also included verbatim and linked for download.
- HEIC display uses a full-resolution 3024×4032 lossless WebP conversion for browser compatibility. No resize, sharpening or lossy re-encoding is applied. Each photograph has a clearly labelled original-download link.
- Removed the earlier 480px/960px derivatives so browsers always receive the full-resolution display assets. This revision supersedes the initial derivative sizes described above.
- Preserve the approved composition and date range. Recheck download hashes, full-resolution image decoding and caption layout before merge and deployment.

## Final validation and deployment candidate

- Astro check, lint, build, 35 unit tests and 40 desktop/mobile browser checks pass for the final full-resolution revision. Desktop/mobile light/dark inspection confirms 3024×4032 and 1536×2720 images load without horizontal overflow.
- Original-file SHA-256 hashes match their Photos-library sources. The decoded 8-bit RGB pixel hash of the full-resolution lossless WebP matches the oriented HEIC source exactly.
- Cloudflare candidate version: c2e0a8ba-ad08-4224-9d67-8c7b351c9131.
- Candidate preview: https://c2e0a8ba-gabriel-portfolio.gabrielchen.workers.dev/#about
- User has already authorized publication after these requested revisions; no further design approval is pending. Build the merged main and compare its full asset manifest with this candidate before deploying.
