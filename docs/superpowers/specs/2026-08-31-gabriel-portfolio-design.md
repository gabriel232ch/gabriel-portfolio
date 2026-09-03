# Gabriel Portfolio Design Specification v1.0

**Project:** `gabrielchen.me`  
**Date:** 2026-08-31  
**Status:** Living specification; Phase 0 complete; Phase 1 active and governed by human review
**Primary domain:** `gabrielchen.me`

---

## 0. Product Thesis

`gabrielchen.me` is not primarily a recruiting website, a blog, or a static portfolio. It is Gabriel Chen's long-term digital identity: a living, curated record of work, research, writing, phases of life, and how ideas evolve over time.

The product should launch first as a complete, beautiful, durable portfolio, then deepen into a connected personal archive and eventually a personal digital world.

### North Star

> **V1 should already be a complete, beautiful, long-lasting website. It should not feel like an incomplete V2. As the system grows, it gains depth rather than merely accumulating features.**

### Core build rules

1. **Launch before automation.**
2. **One flagship before many projects.**
3. **Typography and information design before WebGL.**
4. **Every milestone must leave a complete, usable website.**

### Human Review Precedence

Human visual review is an authoritative design gate, not an informal comment layer.

When review changes an earlier design hypothesis:

1. The explicitly human-approved outcome supersedes earlier exploratory assumptions.
2. Record the decision in the repository.
3. Reconcile this specification and the active implementation plan before dependent work continues.
4. Later tasks must consume the latest approved design state rather than mechanically reproduce older exploratory instructions.
5. Passing automated tests never overrides a failed human visual review.

---

# Section 1 — Technology Foundation

## 1.1 Chosen architecture

Use a **code-first Astro architecture** with Markdown/MDX as the primary content format, GitHub as the source of truth, and Cloudflare Workers as the deployment foundation.

### Primary stack

- **Framework:** Astro
- **Content:** Markdown + MDX + Astro Content Collections
- **Source of truth:** GitHub repository
- **Hosting:** Cloudflare Workers, static-first
- **Motion:** CSS / native browser APIs + GSAP
- **Data visualization:** D3 + SVG + Canvas
- **Special hero moments:** Three.js / WebGL, only when justified
- **Deployment flow:** Git branches → preview deployments → review → merge → production

## 1.2 Why not Framer-first

Framer remains useful as a visual reference and rapid-prototyping tool, but it is not the production foundation because the site requires:

- GitHub-native content ownership
- Markdown/MDX
- AI-native publishing
- structured relationships between content
- long-term portability
- custom data storytelling
- custom transitions and visualization systems

## 1.3 Why not Next.js-first

Next.js can support the required functionality but introduces full-stack complexity before it is needed. Astro is a better fit for a content-first, static-first site with selective interactive islands.

## 1.4 Hosting principle

The initial site is static-first. Visual dynamism does not imply server-side dynamism. The site may include rich browser-side animation, interactive data visualization, and occasional WebGL while remaining statically generated.

Server-side capabilities are reserved for future needs such as search, AI, forms, or private content.

---

# Section 2 — Information Architecture & Content Model

## 2.1 Visitor-facing structure

The visible navigation remains intentionally restrained.

Primary navigation concept:

- **Home**
- **Index**
- **About**

The full information architecture becomes discoverable through `Index`:

- Work
- Research
- Writing
- Now
- Archive
- About

## 2.2 Home is editorial cover, not directory

The homepage should function as a living editorial cover rather than a list of everything on the site.

Expected layers:

1. Identity / Hero
2. Selected Work
3. Now / Current Phase
4. Current Threads
5. Recently
6. From the Archive
7. Index / About entry points

The homepage is curated, not exhaustive.

## 2.3 Core content types

Only four first-class content types are required initially:

### Work
For completed or ongoing output worth presenting as a body of work.

Examples:
- business analysis
- strategy projects
- tools
- experiments
- data projects
- products

### Research
For questions being actively investigated or developed.

Research may be:
- open
- ongoing
- dormant
- concluded

### Writing
For long-form and short-form thinking.

Subtypes may include:
- essay
- note
- reflection
- observation
- learning note

### Phase
A semantic life-stage container that represents what Gabriel was doing, thinking, building, and learning during a period.

## 2.4 Phase as temporal backbone

Time should not be represented only by publication dates.

Each meaningful life period is modeled as a `Phase`.

Example:

```yaml
id: PH.04
title: Quant Finance, Thesis & Building
start: 2026-08
end: null
status: active
location: Beijing
```

Content can relate to one or more phases.

## 2.5 Now derives from the active Phase

`/now` should not be independently maintained. It should render the active Phase.

The same active Phase should power:

- `/now`
- homepage Now section
- current Archive state

This avoids duplicated maintenance.

## 2.6 Life OS Archive

Archive is not an old-posts list. It is a life-version archive.

Users should be able to explore:

- years
- phases
- work
- research
- writing
- interests over time
- changes in direction

The archive eventually becomes a visual biography.

## 2.7 Content relationships

The site forms a content graph rather than a folder tree.

Supported relationships include:

- related to
- informed
- evolved from
- evolved into
- belongs to Phase

This graph powers Trace, Current Threads, Related Work, and Archive experiences.

## 2.8 URL system

Stable routes:

- `/work/...`
- `/research/...`
- `/writing/...`
- `/now`
- `/archive`
- `/archive/<phase>`
- `/about`
- `/index`

Avoid generic `/posts/`, `/blog/`, or year-specific URL structures.

## 2.9 Publication state model

Publication, visibility, and curation are independent.

### Publication
- draft
- review
- published

### Visibility
- private
- unlisted
- public

### Curation
- normal
- featured

A public piece does not automatically appear on the homepage.

---

# Section 3 — Visual Identity & Design System

## 3.1 Visual thesis

Internal definition:

> **Editorial Intelligence**

A living digital publication in which typography, information, data, and time become motion.

The refined identity is:

> **Editorial Intelligence + The Living Index**

## 3.2 Visual hierarchy

Three primary layers:

1. **Editorial** — typography, grid, whitespace, reading
2. **Information** — data, evidence, relationships, annotation
3. **Cinematic** — motion, space, transitions, memorable moments

Approximate emphasis:

- Editorial / publishing: 45%
- Data / information design: 30%
- Motion / cinematic: 20%
- Material / light: 5%

## 3.3 Typography roles

Phase 1 human review replaced the original serif-led display hypothesis with a restrained sans-led hybrid system.

The approved semantic roles are:

### Structural Display — Inter Variable

Used for:
- hero statements
- case study titles
- section-scale structural typography
- navigation-scale display
- major analytical conclusions

The display voice should feel quiet, lightweight, spacious, and precise.

Default direction:
- light weights, typically around `200`
- generous tracking
- deliberate line breaks
- large scale without visual aggression
- luxury through proportion and restraint rather than ornament

### Editorial Serif — Cormorant Garamond Variable

Used selectively for:
- small italic kickers
- editorial ledes
- pull quotes
- reflective passages
- occasional expressive moments

Cormorant Garamond is not the dominant display face. Its value comes from contrast with the quieter Inter-based structural system.

### Functional Sans — Inter Variable

Used for:
- body text
- navigation
- interface copy
- general reading
- functional metadata where Mono is unnecessary

### Data / Mono — IBM Plex Mono

Used for:
- `G.xxx` identifiers
- `PH.xx` identifiers
- numbers
- timestamps
- folio references
- sources
- figures
- index markers
- analytical metadata

System:
- **Sans = structure / clarity**
- **Serif = character / editorial narrative**
- **Mono = evidence / data / system**

Core principle:

> **Sans builds structure. Serif adds character.**

The intended result is refined, spacious, editorial, and analytical without becoming decorative, fashion-template generic, or dashboard-like.

The authoritative typography decision is recorded in:

`docs/decisions/phase-1-typography-selection.md`

## 3.4 Grid

Desktop: 12-column editorial grid  
Tablet: 6-column grid  
Mobile: 4-column grid

The system should use strict grid discipline with intentional asymmetry.

## 3.5 Light world

Light is the default world.

Direction:

- warm paper
- ivory
- soft mineral gray
- ink black
- subtle hairlines

It should feel contemporary, not nostalgic or vintage.

## 3.6 Dark world

Dark is a separate art direction rather than a color inversion.

Direction:

- graphite
- carbon
- silver typography
- depth
- controlled light
- spatial information

## 3.7 Color strategy

Use **Neutral Identity + Project Color**.

The global website remains restrained. Color comes primarily from individual work or research contexts.

Do not create a dominant permanent “brand blue” system.

## 3.8 Signature system — The Living Index

Each published and curated node receives a permanent index coordinate:

```text
G.001
G.002
...
G.184
```

This is not an article number. It is a permanent node in Gabriel's public archive.

The Living Index expresses:

- Structure
- Evolution
- Curation

Internal identity:

- **Structure + Evolution** are the core logic
- **Taste / Curation** is the outward expression

## 3.9 Discoverability level

The Living Index should be **discoverable, not explained upfront**.

Visitors may first perceive `G.xxx`, `PH.xx`, and Trace as visual notation. Deeper exploration reveals that the notation corresponds to a real personal content system.

## 3.10 Trace

Trace expresses how one node influenced another.

Examples:

- evolved from
- later informed
- reconsidered in

Historical content should not be silently rewritten when later thinking changes. Instead, later nodes can reference earlier ones through Trace.

## 3.11 Living Folio visual language

Recurring motifs include:

- `G.xxx / ∞`
- Phase markers
- folio numbers
- marginalia
- source notes
- figure references
- information lines
- subtle registration / coordinate marks

These elements must remain analytical/editorial, not cyberpunk HUD decoration.

## 3.12 Data choreography principles

Data visualization should be integrated into the editorial composition.

Rules:

1. Data begins with a question.
2. Relationships are revealed progressively.
3. Typography itself can encode data.
4. Annotation is first-class.
5. A visual sequence resolves into an insight or conclusion.

Preferred concept:

> **Editorial Data Art / Information Choreography**

Avoid dashboard aesthetics.

## 3.13 Motion grammar

Reusable motion vocabulary:

- Reveal
- Assemble
- Expand
- Morph
- Shift
- Dissolve

Motion intensity: **C+**

Approximate balance:

- 65% editorial motion
- 25% strong interaction / data moments
- 10% signature cinematic moments

## 3.14 Main expressive technique

Primary composition:

- **Data choreography** = core language
- **Scroll storytelling** = primary narrative mechanism
- **Morphing / page transitions** = continuity and luxury feel
- **WebGL / spatial effects** = rare hero moments

## 3.15 Image direction

Images behave like editorial plates rather than thumbnails.

Supported behavior:

- crop
- mask
- bleed
- overlap grid
- reveal
- become data surfaces

Avoid conventional card grids.

## 3.16 Human imagery

Use:

- editorial portraiture
- curated personal archive imagery
- cities
- work environments
- travel fragments
- books / objects / places

Images are curated, not automatically synchronized like a social feed.

## 3.17 Accessibility

Visual sophistication must not depend on inaccessible behavior.

Required:

- adequate contrast
- readable body size
- keyboard navigation
- semantic HTML
- mobile touch support
- reduced-motion mode
- no-JS fallback for critical information

---

# Section 4 — Page & Experience Architecture

## 4.1 Experience depth

### Level 1 — Discover
- Home

### Level 2 — Explore
- Index
- Work
- Research
- Writing
- Now

### Level 3 — Understand
- Case Study
- Phase
- Archive
- About
- Trace

## 4.2 Home

Home is a living editorial cover.

Structure:

1. Typography-first hero
2. Selected Work
3. Now
4. Current Threads
5. From the Archive
6. Index / About entry

## 4.3 Home Hero

The first screen should be typography-first with a restrained Living Index visual system.

Avoid traditional “Hi, I'm Gabriel” portfolio conventions.

The first major WOW moment should not happen immediately. The hero begins restrained and transitions into the first featured work.

## 4.4 Selected Work

Each selected work occupies an editorial spread rather than a card.

System is consistent; choreography may differ by project.

## 4.5 Home → Work WOW moment

Living Index notation becomes the transition mechanism.

Example:

`G.026` on Home migrates into the Case Study folio identity while project visuals expand into the next experience.

## 4.6 Now

Now is the current Phase rendered as editorial narrative rather than resume metadata.

May include:

- building
- researching
- exploring
- current questions

## 4.7 Current Threads

Current Threads should represent relationships between active themes and nodes without becoming a conventional tag cloud or knowledge-graph UI.

## 4.8 From the Archive

Homepage should surface a curated past Phase or node under a framing such as “From an earlier version.”

This signals that the site has historical depth.

## 4.9 Index

`Index` is the site's control center.

It should function as a full editorial overlay/page rather than a dropdown menu.

It reveals:

- Work
- Research
- Writing
- Now
- Archive
- About

## 4.10 Work index

Work should appear as an editorial index, not a card gallery.

Interactions may reveal large project previews and support alternate reading dimensions such as:

- year
- discipline
- phase

## 4.11 Case Study grammar

Important case studies share a narrative grammar:

1. Open
2. Question
3. Context
4. Analysis
5. Insight
6. Afterlife

The headings need not be displayed literally.

## 4.12 Question before method

A case study should establish why the problem matters before presenting methodology.

Methodology, sample size, sources, and technical detail can be surfaced through marginalia, data plates, or expandable notes.

## 4.13 Data scenes

Flagship case studies may contain multiple Data Scenes.

Each scene follows:

Question → Data enters → Relationship forms → Annotation → Conclusion

## 4.14 Experience Mode + Reading Mode

The same source content supports two renderers:

### Experience Mode
- curated
- interactive
- visual
- cinematic

### Reading Mode
- complete
- quiet
- rigorous
- minimal animation
- full methodology / sources / footnotes

## 4.15 Case Study Afterlife

A case study ends with connections, not a dead end.

May include:

- evolved from
- later informed
- related work
- phase

## 4.16 Research

Research pages resemble dossiers / research notebooks rather than incomplete work pages.

They can preserve open questions and changing hypotheses.

## 4.17 Writing

Writing is the quietest space on the site.

Prioritize:

- typography
- footnotes
- annotation
- image plates
- reading quality

## 4.18 Archive

Archive is the second major signature experience.

It should eventually reveal:

- phases
- G.xxx nodes
- disciplines
- evolving interests
- trajectories

It must also support a quiet Index/Timeline mode.

## 4.19 Phase pages

Each Phase is a life chapter, potentially including:

- editorial portrait / environmental image
- work
- research
- writing
- places
- questions
- what changed

## 4.20 About

About should be editorial and personal rather than a rewritten CV.

Career chronology, education, Resume, GitHub, LinkedIn, and contact can exist deeper in the page.

## 4.21 Navigation grammar

Persistent navigation should remain minimal, e.g.:

```text
GABRIEL CHEN                         INDEX
```

Case study context may replace the left label with the node ID.

## 4.22 Page transitions

Transitions should reinforce the Living Index.

Examples:

- Home node → Case Study hero
- Archive node → Case Study
- Case Study → Archive node

## 4.23 Signature WOW moments

V1/V2 should prioritize three truly memorable moments:

1. Home → Work cinematic morph
2. One flagship Data Choreography scene
3. Life OS Archive assembly

Avoid making every section equally theatrical.

## 4.24 Mobile

Mobile is not a compressed desktop design.

It uses the same semantics with different choreography.

---

# Section 5 — AI-Native Publishing & Content Pipeline

## 5.1 Experience principle

The publishing experience should be AI-native while the technical system remains hybrid and Git-based.

Gabriel should mainly decide:

- what is worth publishing
- what is accurate
- what is representative
- what should be featured

AI handles much of the mechanical adaptation.

## 5.2 Source of truth

The website GitHub repository is the only final source of truth.

Possible inboxes:

- other GitHub repositories
- Markdown
- PDF
- Notion
- images
- datasets
- notes

These are inputs only.

## 5.3 Publishing pipeline

```text
Inbox
→ Ingestion
→ Editorial AI
→ Content Package
→ Draft
→ Preview
→ Human Review
→ Approval
→ Assign G.xxx
→ Merge
→ Production
```

## 5.4 AI responsibilities

AI may:

- ingest
- classify
- summarize
- extract evidence
- propose narrative
- identify data scenes
- propose relationships
- propose Phase association
- generate MDX
- prepare metadata
- prepare assets / data structure
- generate preview

AI may not autonomously decide public publication.

## 5.5 Editorial Brief

AI output should be an editorial brief, not merely a summary.

Expected fields:

- core question
- central claim
- best evidence
- narrative arc
- data moments
- visual opportunities
- full report link / retention
- proposed relationships
- proposed Phase

## 5.6 Draft numbering

Drafts do not receive permanent Living Index IDs.

Use temporary identifiers such as `G.DRAFT`.

Permanent `G.xxx` is assigned only after publication approval.

## 5.7 Permanent ID behavior

Once assigned:

- never reused
- never renumbered
- survives rename
- survives archive state

## 5.8 Art direction tiers

Automation should not force every work into the same template.

### Standard Work
System template + automatic editorial layout

### Flagship Work
System template + custom art direction + custom data scene + custom cinematic treatment

## 5.9 Relationship proposals

AI may propose relationships but must not invent intellectual history.

Relationships require review.

## 5.10 Phase authority

AI may recommend Phase association, but creation or redefinition of a Phase requires explicit human approval.

## 5.11 Preview-first review

Review should happen on actual rendered previews, not by reading MDX source.

Review modes should include:

- desktop
- mobile
- light
- dark
- reduced motion
- reading mode

## 5.12 Git workflow

New publication work happens on branches.

Example:

```text
content/g042-olist
```

Flow:

branch → generated content → preview → review → merge → production

## 5.13 Publish automation

Publishing may eventually trigger:

- assign G.xxx
- validate metadata
- validate links
- optimize images
- generate OG image
- update Index
- update Archive
- update Phase
- update Trace
- sitemap / RSS
- build / deploy

## 5.14 Historical integrity

AI may suggest maintenance but should not silently rewrite historical perspective.

Later changes in thinking should preferably be represented via Trace.

## 5.15 AI permissions

Four permanent rules:

1. AI may understand content, but cannot decide what deserves public publication.
2. AI may suggest relationships, but cannot fabricate intellectual evolution.
3. AI may generate layout, but flagship work may receive human art direction.
4. AI may maintain the system, but cannot silently rewrite history.

---

# Section 6 — Technical Architecture & Repository Design

## 6.1 Static-first

Initial Astro output should be static.

No V1 requirement for:

- database
- login
- custom CMS
- full SSR
- backend API

Future Cloudflare Worker functionality can be added without changing the hosting foundation.

## 6.2 Repository model

Use one primary repository.

Suggested structure:

```text
gabriel-portfolio/
├── src/
│   ├── content/
│   │   ├── work/
│   │   ├── research/
│   │   ├── writing/
│   │   ├── phases/
│   │   └── drafts/
│   ├── components/
│   │   ├── editorial/
│   │   ├── navigation/
│   │   ├── motion/
│   │   ├── visualization/
│   │   └── case-study/
│   ├── layouts/
│   ├── pages/
│   ├── data/
│   ├── lib/
│   └── styles/
├── public/
├── scripts/
│   └── publishing/
├── tests/
├── docs/
│   ├── design-system/
│   └── architecture/
├── astro.config.*
├── wrangler.*
└── package.json
```

## 6.3 Responsibility boundaries

- `content/` = Gabriel's public content
- `components/` = Gabriel's visual language
- `data/` = Living Index / relationship system
- `lib/` = reusable system logic
- `scripts/` = publishing automation

## 6.4 Content Collections

Use Astro Content Collections to enforce structured schemas and references.

Invalid Phase IDs, malformed metadata, or broken core relationships should fail validation/build.

## 6.5 Content Package concept

Important Work may include:

```text
work/example/
├── index.mdx
├── assets/
├── data/
└── sources.yaml
```

Content, data, assets, evidence, and metadata should remain separable.

## 6.6 Living Index registry

Maintain an explicit permanent registry for `G.xxx` IDs.

Rules:

- Draft: no permanent ID
- Approved: assign next ID
- Published: lock ID forever
- Archived: preserve ID
- Renamed: preserve ID

## 6.7 URL vs identity

Human-readable URLs remain independent of Living Index IDs.

Example:

```text
/work/competitive-positioning-against-giants
```

rather than:

```text
/work/g026-competitive-positioning
```

## 6.8 Central relationship graph

Maintain relationships centrally instead of duplicating symmetric relationship metadata across MDX files.

Possible edge types:

- informed
- related
- evolved_from
- evolved_into
- belongs_to_phase

## 6.9 Gabriel component vocabulary

Flagship MDX should use a controlled design vocabulary rather than arbitrary one-off markup.

Example components:

- `<DataScene />`
- `<EditorialPlate />`
- `<Insight />`
- `<SourceNote />`
- `<FolioNumber />`
- `<Trace />`
- `<PhaseLink />`
- `<PriceDistance />`
- `<RankShift />`
- `<RelationshipField />`
- `<TimelineField />`

## 6.10 Visualization architecture

Separate:

Raw Data → Transformer → Semantic Model → Visual Component → Animation

Do not mix all stages into a single D3 component.

## 6.11 Motion architecture

### CSS / native browser APIs
- hover
- microinteraction
- simple reveal
- theme transition

### GSAP
- scroll storytelling
- complex timelines
- data assembly
- cinematic sequencing

### View Transitions API
- page-to-page continuity
- shared element transitions

## 6.12 WebGL loading policy

Three.js / WebGL must be loaded only on pages that justify it.

No global WebGL dependency.

## 6.13 Styling architecture

Primary visual system:

- design tokens
- modern CSS
- Astro-scoped styles

Do not let a generic UI framework dictate the visual language.

## 6.14 Theme architecture

Components consume semantic tokens rather than hard-coded colors.

Light and Dark may alter:

- surfaces
- text
- image treatment
- visualization treatment
- motion feel

## 6.15 Images

Use local co-located assets initially.

Do not introduce R2 until asset scale justifies it.

## 6.16 Reading Mode renderer

Experience Mode and Reading Mode should use the same source package and different renderers.

## 6.17 Archive as subsystem

Archive receives a semantic model derived from:

- Living Index
- relationships
- phases
- disciplines
- time

It can produce multiple renderers:

- immersive timeline
- quiet index

## 6.18 Desktop / mobile / reduced-motion renderers

For complex scenes, support distinct choreography while preserving semantic equivalence.

## 6.19 GitHub as publishing backend

V1 does not require an `/admin` CMS.

AI / Codex can operate directly through Git branches, files, commits, and PRs.

## 6.20 Branch architecture

- `main` → production
- feature/content branches → preview

## 6.21 Preview security

Sensitive drafts should not rely on obscurity. Use protected preview mechanisms when necessary.

## 6.22 Quality gates

Before merge:

### Content
- schema validation
- G ID validation
- Phase validation
- relationship validation

### Build
- Astro build

### Code
- TypeScript / lint

### Links
- internal links
- important external links

### Experience
- desktop
- mobile
- reduced motion

### Performance
- JS budgets
- image budgets
- WebGL dependency budgets

### Visual regression
Required for flagship pages and critical design primitives.

## 6.23 Accessibility contract

Every interactive visualization must preserve critical information in reduced-motion and no-JS contexts.

## 6.24 Complexity placement

Complexity should be concentrated in the Experience Layer, not infrastructure.

V1 explicitly excludes:

- database
- headless CMS
- login
- React everywhere
- full SSR
- custom backend
- R2 infrastructure
- site-wide WebGL
- automatic public publishing
- automatic Phase creation

---

# Section 7 — Implementation Strategy & Build Phases

## 7.1 Milestone principle

Every phase must end with a coherent, usable website state.

Avoid parallel partial implementation across many subsystems.

## 7.2 V1 success definition

V1 requires:

- visual identity
- design system
- selected work
- one flagship case study
- mobile
- light / dark
- custom domain
- production deployment

V1 does not require:

- cinematic Life OS Archive
- full AI publishing automation
- site-wide WebGL
- complete historical migration
- semantic search
- CMS

## 7.3 Phase 0 — Foundation

Build:

- Astro
- Cloudflare Workers
- GitHub repository
- domain connection
- design token foundations
- Content Collections
- Living Index registry
- Work schema
- Phase schema
- Light/Dark tokens
- 12/6/4 grid
- reduced motion

Success criterion:

> repo change → preview → merge → `gabrielchen.me` update

Then freeze infrastructure unless a real requirement appears.

## 7.4 Phase 1 — Design System Implementation

Implement core primitives first:

- EditorialTypography
- FolioNumber
- Marginalia
- EditorialRule
- ImagePlate
- SectionLabel
- PhaseMarker
- GIndex

Motion primitives:

- Reveal
- Assemble
- Shift
- Morph

Do not introduce Three.js yet.

## 7.5 Phase 2 — Home v1

Build:

- Hero
- Selected Work
- Now
- Current Threads
- From the Archive
- Index / About entry

First Selected Work set:

1. Competitive Positioning Against Giants
2. Luxury Handbag Pricing Architecture
3. Olist Business Analysis

These three stress-test different content types.

## 7.6 Phase 3 — Flagship Case Study No. 1

First flagship:

> **Luxury Handbag Pricing Architecture**

Reasons:

- data-rich
- strong visual domain
- natural spatial encoding
- strong narrative potential
- suitable for first Data Choreography implementation

First major technical additions:

- GSAP
- D3 / SVG

Three.js only if a uniquely justified scene emerges.

## 7.7 Reading Mode required in V1

The flagship must validate content/presentation separation by shipping both Experience Mode and Reading Mode from the same source package.

## 7.8 Phase 4 — V1 Launch

Production should include:

- Home
- Work index
- one flagship experience
- two simpler Work pages
- Now
- About
- Index
- Light/Dark
- Mobile
- Reading Mode

Archive may initially be a high-quality quiet timeline/index.

At this point:

> **Portfolio V1 = DONE**

The launch line must not continually move backward.

## 7.9 V1 prohibited scope creep

Do not add before V1 launch:

- Three.js hero by default
- Life OS WebGL map
- AI chat
- semantic search
- CMS
- database
- automatic Notion sync
- complex publishing UI
- full Archive animation
- custom art direction for every project

## 7.10 Phase 5 — Content Expansion

Migrate historical content gradually based on value.

Presentation tiers:

### Tier 1 — Signature
- custom art direction
- custom Data Scene
- custom transition
- possibly WebGL

### Tier 2 — Featured
- strong editorial layout
- standard visualization components
- polished motion

### Tier 3 — Archive
- excellent typography
- standard layout
- minimal motion

## 7.11 Phase 6 — Living Index + Trace

Add:

- relationships
- Trace
- related work
- evolved from
- informed
- current threads

This marks the transition from Portfolio to Living Portfolio.

## 7.12 Phase 7 — Life OS Archive

Build immersive visual biography only after the dataset contains meaningful real history.

Potential technologies:

- D3
- Canvas
- GSAP
- possibly WebGL

This is WOW Moment 03.

## 7.13 Phase 8 — AI Publishing Automation

Begin with AI/Codex + repository conventions.

Only automate recurring real workflows after observing them.

Potential scripts later:

- assign-id
- validate-content
- create-draft
- build-preview
- check-relationships

Avoid building an AI CMS prematurely.

## 7.14 Phase 9 — Signature WebGL / Cinematic

Only after the core site is already excellent.

Likely candidates:

1. Home signature moment
2. flagship project spatial scene
3. Archive personal evolution field

## 7.15 Complexity budget

Example page budgets:

- Writing: 1/5
- About: 2/5
- Normal Work: 2/5
- Featured Work: 3/5
- Signature Work: 4/5
- Archive: 5/5

Not every page should be maximal.

## 7.16 Reuse before custom

Always check the Gabriel Visualization Library before creating a new visualization primitive.

The goal is to evolve a coherent information-design language rather than accumulate one-off effects.

## 7.17 Definition of Done

A milestone is complete only when:

- desktop verified
- mobile verified
- light verified
- dark verified
- reduced motion verified
- build passes
- internal links pass
- preview reviewed
- production verified

## 7.18 Product eras

### V1 — Portfolio
**A beautiful digital identity.**

### V1.5 — Living Portfolio
**A connected record of work, thought and evolution.**

### V2 — Personal Digital World
**A living visual biography, publishing system and personal archive.**

---

# Final Product Principles

## 1. The site is not built for recruitment
Recruiting utility is welcome, especially in the short term, but it does not dictate the identity or architecture.

## 2. The site is a long-term personal asset
It should remain meaningful as Gabriel's work, interests, and career change.

## 3. The site should reveal depth gradually
The first impression is beautiful and restrained. Deeper exploration reveals the Living Index, Phase system, Trace, and personal archive.

## 4. Data is part of the visual language
Data visualization should feel editorial and cinematic rather than dashboard-like.

## 5. Visual sophistication is selective
The site is not an effects demo. WOW moments are concentrated where they carry identity, understanding, or memory.

## 6. Curation matters more than accumulation
Not everything created belongs on the public site. Receiving a permanent `G.xxx` means something was deliberately retained.

## 7. Historical integrity matters
Past thinking is preserved as past thinking. Evolution is represented through Trace, not silent rewriting.

## 8. AI removes maintenance burden, not authorship
AI assists with ingestion, editing, structure, visualization suggestions, metadata, and publishing mechanics. Gabriel retains judgment over publication, meaning, relationships, and art direction.

## 9. Complexity belongs in the experience layer
Infrastructure remains intentionally simple until a real requirement forces expansion.

## 10. V1 must be worth keeping
The first production release is not a placeholder. It should already be something worth sharing and continuing to build on.

---

# Explicit Non-Goals for V1

- full personal knowledge graph UI
- database-backed CMS
- user accounts
- AI chatbot
- semantic site search
- automatic public posting from Notion/GitHub
- site-wide WebGL
- full-screen 3D hero as default
- complete historical archive migration
- every project receiving bespoke art direction
- complex backend services

---

# Open Decisions Reserved for Implementation Planning

These do not change the approved architecture and can be resolved during planning / implementation:

1. Exact font families and licensing choices
2. Exact visual token values
3. Exact Cloudflare Worker / Astro adapter configuration
4. Final repository name
5. Exact schema field names and validation library details
6. Initial `G.xxx` numbering strategy for imported historical work
7. Which real source files become the canonical input for the first three Work entries
8. Exact flagship Data Scene for Luxury Handbag Pricing Architecture
9. Exact V1 homepage identity statement
10. Exact image assets / portraits used in V1

---

# Approval State

Sections 1–7 were approved during the design conversation on 2026-08-31.

**Next required step:** final human review of this written specification. After approval, create an implementation plan before writing production code.
