# Gabriel Portfolio — Typography Scale v1

**Status:** Approved and frozen for implementation  
**Date:** 2026-09-18  
**Authority:** This specification supersedes older Gabriel Portfolio typography-size and role assignments. It does not reopen or rewrite unrelated visual, content, color, motion, data, privacy, or layout decisions.

## Purpose

Typography Scale v1 turns the production typography refinement into one enforceable, site-wide semantic system. Home, the Chanel research report, the Olist detail page, and the smaller-companies detail page choose from the same roles. Components do not invent page-local font sizes when an approved role exists.

The system should feel refined before it feels large. Hierarchy comes from whitespace, placement, measure, family, weight, and composition before a new or larger size is introduced. The Chanel report must not return to its former 100px-plus title treatment.

## Visible font-family roles

There are exactly four visible production typography families:

| Family | Token | Role | Typical content |
| --- | --- | --- | --- |
| Cormorant Garamond | `--font-display` | Editorial display | Project titles, section titles, statements, short reflective or expressive copy |
| Baskerville | `--font-reading` | Reading | Narrative prose, explanatory prose, long-form report text |
| Didot | `--font-numeric` | Expressive numerals | Major KPI and metric highlights only |
| IBM Plex Mono | `--font-metadata` | Metadata and compact data | Dates, locations, context lines, chart labels, axes, indexes, sources, compact technical labels |

The Gabriel signature is an SVG and is outside the font system. It is not a fifth font family.

Newsreader, Inter, and other finalist families may remain available to the noindex typography lab as historical/design-exploration fixtures. They are not visible Home or report roles and must not be imported into production-facing typography rules.

System-first Didot and Baskerville are intentional. Cross-platform fallback consistency is not a reason to replace either role.

## Semantic type-size roles

The following eight tokens are the only production-facing semantic type-size roles. Token names describe why the type exists, not merely how large it is. Responsive interpolation belongs inside the token; components must not define an alternative responsive `clamp()` for the same role.

| Role | Token | Mobile | Desktop | Use |
| --- | --- | ---: | ---: | --- |
| Micro | `--font-size-micro` | 14px | 14px | Metadata, axis labels, sources, index items, small meaningful auxiliary information |
| Supporting | `--font-size-supporting` | 16px | 16px | Captions, notes, table body where appropriate, secondary labels, supporting information |
| Secondary Reading | `--font-size-secondary-reading` | 18px | 18px | Secondary explanations and short supporting prose below primary body hierarchy |
| Body | `--font-size-body` | 20px | 22px | Primary Baskerville narrative prose, Home paragraphs, report paragraphs, explanatory body text; line-height `1.58` |
| Lead | `--font-size-lead` | 24px | 26px | Opening ledes, prominent introductory copy, important reader-facing guidance |
| Statement | `--font-size-statement` | 30px | 32px | Short editorial thoughts and standard large KPI numbers |
| Section Title | `--font-size-section-title` | 36px | 40px | Chapter/section headings and exceptionally important KPI numbers |
| Project Title | `--font-size-project-title` | Preserve production value | Preserve production value | Home and report project titles; the exact current production-approved token is preserved and shared |

The current approved project-title declaration is `clamp(3rem, 6vw, 5.5rem)`. It must not be made larger, duplicated, or replaced with a page-specific title clamp. There is no normal text role above Project Title.

The token implementation must resolve to the table’s values at the supported mobile and desktop breakpoints. Fixed roles remain fixed. Body retains the currently approved production interpolation that floors at 20px and caps at 22px.

## Family and size are independent dimensions

Components select a family role and a size role independently. Approved combinations include:

| Family | Approved size examples |
| --- | --- |
| Cormorant Garamond | Project Title, Section Title, Statement, Lead |
| Baskerville | Body, Secondary Reading, Supporting |
| Didot | Statement or Section Title for major KPIs only |
| IBM Plex Mono | Micro or Supporting for metadata and compact data |

Do not create a duplicate page-specific size token to encode a family choice. Do not turn every number into Didot: dense/supporting tables, years, axes, and compact chart labels use Baskerville with appropriate tabular numeral settings or IBM Plex Mono according to semantic role.

## Numeric typography

Didot has no parallel numeric scale. A normal major KPI uses Didot + Statement. An exceptionally important KPI uses Didot + Section Title. Major numeric styling retains the production-approved characteristics from the Chanel report:

- Didot family
- `font-weight: 400`
- lining numerals
- proportional numerals
- restrained negative tracking
- tight display line-height

Supporting numbers are not automatically Didot. Table body values, years, axes, chart labels, source values, and compact data retain Baskerville or IBM Plex Mono as their semantic role requires.

## Minimum readable size

14px is the minimum for meaningful visible reader-facing text on all current production-facing routes. This includes metadata, axis labels, sources, report index items, and chart labels users are expected to read.

Legacy 9px, 10px, 11px, and 12px declarations must be migrated upward by reconsidering hierarchy: meaningful micro information becomes Micro, supporting information becomes Supporting, and explanatory supporting copy becomes Secondary Reading. If 14px cannot fit, the layout must be adjusted rather than the text shrunk.

Decorative SVG geometry, borders, and non-text drawing dimensions are not typography. No meaningful HTML text may rely on a sub-14px production declaration.

## Production component rules

1. A production component chooses a semantic role; it does not invent an arbitrary local size such as `15px`, `17px`, `19px`, `2.7rem`, `3.35rem`, or a new role-specific `clamp()`.
2. The semantic token owns responsive behavior. A component may set family, weight, tracking, line-height, measure, spacing, and layout when those are part of its approved composition, but not an alternative size for the same role.
3. Home and report body copy both use Body and `1.58` line-height. Home and report project titles both use the shared Project Title token. Section headings use Section Title where that hierarchy is intended.
4. Shared navigation, index, folio, metadata, source, chart-label, and auxiliary components use Micro or Supporting according to information importance. They must not remain below 14px.
5. If a genuinely new semantic role becomes necessary, update this global authority intentionally before adding a component rule. Do not silently add a local size.
6. Preserve approved content, colors, data, charts, privacy constraints, signature behavior, and layout architecture. Width or spacing changes are allowed only when the frozen sizes change wrapping or overflow.

## How a future developer or agent chooses a role

Before writing CSS, classify the content by purpose:

1. If it is a project title, use Project Title.
2. If it is a chapter or section heading, use Section Title.
3. If it is a short expressive thought or standard major KPI, use Statement.
4. If it is an opening or prominent reader-facing introduction, use Lead.
5. If it is primary narrative or explanatory prose, use Body.
6. If it is readable supporting explanation below Body, use Secondary Reading.
7. If it is a caption, note, table body, or secondary label, use Supporting.
8. If it is metadata, an index, a source, an axis, or compact auxiliary data, use Micro.

Then choose the family independently: Cormorant for editorial display, Baskerville for reading, Didot only for major expressive numerals, and IBM Plex Mono for metadata/compact data. If none of these purposes fits, stop and propose an intentional update to this authority spec before adding a new token or local size.

## Migration scope and exceptions

Migrate every current production-facing route reachable from the live site:

- `/` Home
- `/work/luxury-handbag-pricing-architecture/` Chanel research report
- `/work/olist-marketplace-analysis/` Olist detail page
- `/work/why-some-people-choose-smaller-companies/` smaller-companies detail page
- shared navigation, closing, footer, editorial metadata, and theme-control components used by those routes

Inventory all public typography before migration. Neutralize legacy report-only family aliases, report-only body sizes, local title clamps, and sub-14px chart/data/source declarations. Lab pages, experiments, historical design-system fixtures, and internal documentation remain outside the migration unless a shared change is required for the build or tests to work. The lab’s finalist specimen typography is intentionally not a production-role exception.

## Enforcement and verification contract

Focused automated protection must verify computed or semantic behavior rather than duplicate the entire stylesheet:

1. Body computes to 20px at mobile and 22px at desktop.
2. Home and report project titles compute from the same shared Project Title role/value.
3. Meaningful public-facing text is not below 14px on the migrated routes.
4. Representative Home and report KPIs use Didot + Statement or Section Title, not an invented numeric size.
5. Home and report no longer maintain independent body/title size systems.
6. The four production families remain Cormorant Garamond, Baskerville, Didot, and IBM Plex Mono.

Browser QA must inspect light and dark modes at 390px, 768px, 1024px, and 1440px for all migrated routes, including overflow, measure, wrapping, table and chart-label legibility, KPI hierarchy, navigation, keyboard interaction, and reduced motion. Home and Chanel must be compared side by side for shared Body, Project Title, Section Title, metadata minimum, and KPI scale behavior.

## Self-review of this specification

- **Ambiguity:** “Desktop” is implemented by the project’s existing responsive breakpoint contract, while each token owns its own interpolation. Fixed roles remain fixed; Body, Lead, Statement, and Section Title floor/cap at the approved responsive values.
- **Conflicting roles:** Existing `--font-report-display`, `--font-report-body`, and `--font-size-reading` are legacy aliases/roles. The new global family and size tokens supersede them; the production Project Title value is the sole preserved title exception.
- **Missing responsive behavior:** Every role has an explicit mobile/desktop value above. Body’s line-height remains `1.58`; display roles retain tight composition line-heights where specified by the component.
- **Accidental page-specific typography:** Home, Chanel, Olist, and smaller-companies pages are all mapped to the same eight roles. Page-local `clamp()` declarations are migration targets, not new authority.
- **Undocumented exceptions:** The SVG signature, decorative geometry, and noindex lab fixtures are explicitly outside the production font/size contract. No meaningful visible production text is exempt from the 14px minimum.
