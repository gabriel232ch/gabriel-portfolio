# Photographs woven through the homepage

The user chose the supplied Florence portrait at Piazzale Michelangelo for the opening and asked for more photographs distributed throughout the page, including banners and backgrounds rather than only separate photographs. This explicitly revises the previous full-framing-only composition; source images still retain their full resolution.

## Visual plan

Preserve the palette and fonts: paper #f4f3f6, raised paper #faf9fb, ink #241b29 and muted ink #6b6570, with photo text #ffffff and a deep-blue scrim #071622. Keep Cormorant Garamond for display, the existing reading serif for prose, and established semantic size roles. No new fonts.

```text
navigation
Florence night photograph with signature and introduction

Chanel opening
campus panorama with a smaller Milan portrait
existing research and charts

Olist narrative and interactive evidence

wide Venice photograph as a quiet transition

Smaller Companies inquiry

Now: Hong Kong skyline with concert photograph inset
small everyday photographs and existing life items

coastal background with the existing closing on a paper panel
```

Text remains left aligned. The Florence image is the main memorable composition. The desktop signature and introduction occupy its dark left side, clear of Gabriel's face. On phones, the complete landscape image carries the signature in the sky; the introduction follows on paper for readability.

Campus architecture becomes a horizontal contextual panel, with the previous Milan portrait inset as a personal annotation. Venice supplies a narrow image interlude between projects. The Hong Kong night image becomes a background with the concert portrait overlapping it. The coast supports the existing closing rather than becoming another gallery tile. Original everyday details remain as small photographs.

## Review against the brief

The earlier implementation concentrated images in the opening and Now. This plan distributes them across the full reading journey and gives each location a different role. Keep the research text, data graphics, project order and evidence boundaries intact. Travel images are personal context, never Olist market evidence or support for a business claim. Captions identify visible places conservatively; the unnamed coast remains simply a coastal scene.

Avoid adding more animations, decorative taxonomies, cloned image cards or repeated identical banners. Use CSS framing and position to adapt each full-resolution source. No AI retouching or fabricated anecdotes. No download controls.

## Asset sources

- Florence portrait: 60AFB2A8-4A7E-4620-B156-BFD5F6442C06.jpeg, copied exactly at 1126×837.
- Campus: 92760F8D-DC83-4418-8274-CEA299694ED7.heic, 3024×4032.
- Venice: FF43E230-DCC0-487C-98CC-5971B30FB0AA.heic, 4032×3024.
- Coast: 1692BF6E-D9FF-4AEF-9117-CA2544A2678D.heic, 3024×4032.

HEIC conversions are full-resolution lossless WebP, checked against the oriented source's decoded RGB pixels. All other existing photographs retain their current source files. Responsive cropping is presentation-only and follows the user's explicit banner/background request.

## Critique and validation

The Florence backdrop explicitly resets the earlier grid placement so it spans the full opening. The left scrim ends before Gabriel's face. On phones, the landscape photograph remains fully visible and prose returns to paper. The Venice frame was made taller to retain the bell tower and some water rather than clipping its main subject. Hong Kong's title/date use a sustained dark top scrim; the redundant skyline caption was removed.

Desktop and phone screenshots were inspected in light and dark themes for the opening, campus pair, interlude, Hong Kong composition and closing. No horizontal overflow at 320, 390, 768, 1024, 1440 or 1920px. Descriptive image alternatives, source dimensions, text contrast, reading order, keyboard destinations and reduced motion were reviewed against current Vercel guidelines fetched on 2026-11-09.

The homepage theme control has a paper background to remain legible over photographs; it and the closing link retain comfortable touch targets. These rules are scoped to the homepage stylesheet and do not change protected case pages.

Astro check, lint, 35 unit tests, build and 46 desktop/mobile homepage, research-interaction and motion checks passed. Four existing screenshot baselines were refreshed for the approved direction. Protected case-page sources, research inputs, public aggregates and analytical data files are unchanged. The previously reproduced unrelated full-suite baseline failures in PR #11 remain outside this task.
