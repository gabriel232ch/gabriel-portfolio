# Personal photographs on the homepage

The user supplied 47 photographs and asked for a selection to make the website feel more authentic. This continues the approved full-resolution photo work and the pending removal of download links.

## Direction

Select five photographs with distinct roles: a portrait at Milan Cathedral, the Bocconi entrance, a quiet street, a dog travelling by train, and a gelato. Keep the research chapters intact. Let the reader meet Gabriel in the opening, then see everyday surroundings in Now alongside the existing Hong Kong trip.

Palette remains paper #f4f3f6, raised paper #faf9fb, ink #241b29, muted ink #6b6570 and aubergine #49304f. The photographs retain their natural colour. Headings keep Cormorant Garamond; prose and captions retain the existing reading serif and semantic size roles.

```text
signature                  Milan portrait
short existing introduction

three existing research chapters

Now                        Hong Kong photographs

Milan and elsewhere
campus    street    fellow passenger    gelato

existing current-life items and closing
```

All text is left aligned. The portrait balances the signature and approved introduction without becoming a background image. The later photographs form a compact uneven row on wide screens and two columns on phones. Preserve full framing, including the casual angles. No new motion, carousel, filters or download links.

## Review against the brief

The selection favours Gabriel's actual viewpoint and ordinary details. Landmark-only and near-duplicate photographs are held for later; the four everyday photographs add different subjects rather than repeating a travel postcard. Captions describe visible subjects and verified locations without inventing anecdotes, dates or relationships. Existing Hong Kong dates and research findings remain unchanged.

## Asset quality

HEIC photographs are converted at full original resolution to lossless WebP for browser compatibility. Verify their decoded RGB pixel hashes against the oriented source. Supplied JPEGs are copied without recompression. Keep explicit dimensions and lazy-load below-fold photographs. The introductory portrait loads eagerly. No low-resolution source variants are introduced, following the user's original-quality preference.

Source selection: 7B015190-2A05-4DAE-A6A0-CD8844350140 (portrait), A0FFD729-1E78-4097-92CC-F98619E2B07D (Bocconi), CC035AB7-279F-4F4F-8862-D017B1B248F1 (street), 57FAC181-5960-4B0E-A99E-70D6E9FF2481 (dog), 9DC56F15-4CA9-45F0-8CE5-B2DCED32DC01 (gelato).

## Validation

Astro check, lint, 35 unit tests, build and 40 desktop/mobile homepage and research-interaction checks pass. Four existing homepage screenshot baselines were refreshed after checking the selected photographs; image readiness now waits for actual decoding as well as loading. No new tests were added for this content change.

Desktop and phone layouts were inspected in light and dark themes, with seven full-resolution photographs, no download links and no horizontal overflow. All three HEIC conversions have identical decoded RGB hashes to their oriented source; both JPEGs are byte-identical copies. Selected source resolutions are 2316×3088, 3024×4032, 3024×4032, 1080×1920 and 1125×1494. Below-fold photographs remain lazy-loaded to avoid downloading the whole collection on initial entry.

Reviewed modified UI against the current Vercel Web Interface Guidelines fetched on 2026-11-09. Descriptive alternatives, dimensions, image priority, headings, reading order, themes and responsive layouts were checked. Case pages, research inputs, public aggregates and analytical content are unchanged from the approved main baseline.

The pre-existing broader-suite failures documented and reproduced on unchanged main in PR #11 remain outside this photo-selection task. The same broad suite was not repeated for unchanged areas.
