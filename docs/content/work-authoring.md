# Maintaining Work pages

Work lives in `src/content/work/<slug>.md`. The slug is the URL; retain it when changing the title. The body provides the shared case-study narrative. `home.question`, `home.outcome` and `home.evidence` provide the case opening and evidence summary, so edits remain consistent with Home.

Use three second-level headings: Context, Analysis, Limits. Their generated anchors supply the contents navigation. Put the question before method and qualify conclusions with the limits of the source. Do not turn GMV exposure into recoverable revenue, a price sample into a complete assortment, or comparative mechanisms into causal claims.

For sources, maintain `src/data/work-sources.ts` alongside the evidence. Current bodies are editorial expansions of the repository's `50a6949` curated snapshot:

| Work | Existing evidence |
| --- | --- |
| Luxury | Work frontmatter, `src/data/luxury.ts` and its canonical CSV link |
| Olist | Work frontmatter, `src/data/olist.ts` and its README/KPI links |
| Competitive | Work frontmatter, `src/data/competitive.ts`, Phase 2 spec section 6.7 |

The source projects may evolve independently; these pages do not automatically claim the newest research. Review new claims against their canonical outputs before updating them. Mark private source access honestly and never copy additional private research into the public portfolio without authorization.

## Publication policy

`src/lib/content/work.ts` is used by the index and route generators. It permits public published entries, plus the three already-approved public Home review snapshots. Changing a known entry to draft/private/unlisted removes it from those generators. Do not expand the exception for convenience. All current routes remain noindex, which is search guidance and not an access-control mechanism. Private material must never enter output.

Published entries still require a permanent ID under the original collection schema and explicit registry process. This change assigns no IDs and changes no publication state. Reading Mode currently exists only for Luxury; both renderers consume the same Markdown and price component.

## Verification

```sh
npm ci
ASTRO_TELEMETRY_DISABLED=1 npm run verify
node scripts/verify-built-site.mjs
```

The static script checks built local links/assets/fragments, headings, noindex, unassigned IDs and exact equality of reading/visual prose and tables. It supplements browser tests; it cannot prove visual layout or interaction.

Review Home's three new reading links, the closing Work-index link, all case routes, mode switching, tables, sources and the return journey on desktop/mobile in both themes. Check keyboard, 320/768/1024 widths, no-JS and reduced motion, plus printing the Luxury Reading Mode.

Existing approved screenshots are Darwin-specific. Review the intended Home link changes before updating snapshots on the original platform. Linux images, if created later, are separate baselines and must not replace or be described as reproductions of the approved Darwin images.
