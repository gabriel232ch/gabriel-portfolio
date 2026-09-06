# Gabriel Portfolio — Phase 2 Home v1 Design

**Date:** 2026-09-05  
**Status:** Design approved; implementation not started  
**Scope:** Phase 2 — Home v1  
**Foundation:** Phase 0–1 complete and frozen

## 1. Purpose

Phase 2 creates the first complete Home experience for Gabriel Portfolio.

The Home is not a recruiting landing page, a conventional portfolio grid, or a personal dashboard. It is the entrance to a living editorial world owned by Gabriel: a place where finished work, current practice, evolving interests, and personal history can coexist without pretending that all of them are final.

The intended first-read sequence is:

**Living World → Credible Work → Current Practice → Person → Depth**

The page-level rhythm is:

**Signal → Story → Signal → Depth**

The site should remain useful and desirable to Gabriel even when no recruiter, hiring manager, or external audience is present. Professional credibility should emerge from the quality of the work and the clarity of the thinking rather than from self-promotional framing.

## 2. Phase 2 boundary

Phase 2 is strictly:

**Home v1 + the minimum curated content required to make Home real.**

Phase 2 does not include:

- full Work detail pages;
- a full Work index;
- a Living Index graph or explorer;
- Life OS;
- CMS, database, or SSR work;
- automated cross-repository synchronization;
- AI publishing automation;
- GSAP flagship choreography;
- D3, Three.js, WebGL, or unrelated visual experiments;
- unrelated refactors of the frozen Phase 1 design system.

The existing Astro, Cloudflare, Light/Dark, typography, 4/6/12 grid, ThemeToggle contract, editorial primitives, and base motion grammar remain frozen unless implementation demonstrates a concrete defect.

## 3. Approved design approach

Home v1 uses an **Editorial Living System** model.

The page combines two complementary modes:

1. **Living-system signals** for current state, phase, movement, and ongoing practice.
2. **Editorial storytelling** for selected work and deeper evidence.

The Home must not become either extreme:

- not a static magazine cover with no sense of continued growth;
- not a dashboard overloaded with status, metrics, activity, or quantified-self UI.

The approved top-level structure is:

```text
Lightweight Navigation
        ↓
Living Signal Hero
        ↓
Selected Work
  01 Luxury Handbag Pricing Architecture
  02 Olist Marketplace Analysis
  03 Competitive Positioning Against Giants
        ↓
Now
  Primary + 2 Side Threads
        ↓
Optional Human Moment
        ↓
Editorial Closing
  Archive Glimpse
  About / Index
  Closing Notation
```

## 4. Navigation

Home v1 uses a lightweight hybrid navigation.

The top of the page exposes only:

- `WORK`
- `ABOUT`
- `INDEX`

These are plain editorial text coordinates, not a conventional navbar container. There is no sticky header, pill navigation, boxed navigation, or mobile hamburger menu.

For Phase 2, all three entries are in-page anchors:

- `WORK` → Selected Work;
- `ABOUT` → Now / human layer;
- `INDEX` → Editorial Closing / index coordinate.

Phase 2 must not create placeholder `/work`, `/about`, or `/index` pages merely to satisfy navigation. Those routes can replace the anchors later when their own systems are designed.

The existing fixed pure-text ThemeToggle remains independent and unchanged.

## 5. Living Signal Hero

### 5.1 Role

The Hero must communicate that the site has a stable owner while the world itself is changing.

It is not a résumé header and does not lead with a role label such as Business Analyst, Strategist, AI Enthusiast, or similar professional positioning.

The Hero has four information layers.

### 5.2 Identity anchor

`Gabriel Chen` is the largest single visual element in the Hero.

It provides identity and visual weight but must not consume the entire viewport or behave like a poster-sized personal-brand lockup.

### 5.3 Current Phase

Current Phase is the second-most important Hero element.

It represents a longer-lived personal or creative phase rather than a narrow employer label. JoinQuant/GEO belongs in `Now`, not as a permanent Hero identity.

The Phase presentation may use the existing `PH.xx` vocabulary when a real phase coordinate exists. The accompanying copy should describe the current direction in natural language and remain durable enough not to expire whenever a job or individual task changes.

Final wording must be curated from real current context during implementation; implementation must not invent a phase claim for layout convenience.

### 5.4 Latest Movement

The Hero contains exactly two **Latest Meaningful Movement** entries.

Each movement should contain only a small amount of information, conceptually:

```text
DATE / TYPE
Movement title
```

Movements are editorially curated, not a Git commit feed. Only meaningful changes should appear. A movement must correspond to a real event, project change, publication, design-system milestone, or other verifiable update.

### 5.5 Editorial notation

The Hero may use a restrained subset of:

- current date;
- folio;
- phase coordinate;
- real Living Index IDs.

No fake `G.xxx` IDs may be introduced for visual completeness. If the Living Index registry has not formally assigned an item an ID, the Hero must use phase, folio, or date notation instead.

### 5.6 Composition

Desktop uses **balanced asymmetry**.

- `Gabriel Chen` occupies a larger asymmetric region.
- Current Phase and the two movements form a second visual center rather than a simple 50/50 split.
- Whitespace is a structural element.

Mobile uses the same story with a different composition:

**Identity → Current Phase → Movements**

The mobile Hero must reveal enough of Current Phase in the first viewport that the experience does not collapse into a giant-name splash screen.

### 5.7 Hero motion

The Hero may contain subtle persistent ambient motion.

Allowed behavior includes:

- very low-amplitude rule or notation movement;
- restrained breathing/assemble behavior;
- soft entry reveals;
- very slow, non-distracting cycles.

The Hero must not use:

- large floating movement;
- infinite tickers;
- particle backgrounds;
- strong parallax;
- attention-seeking number animation;
- motion that makes the site resemble a technology-product landing page.

The governing rule is:

**Static reading first; subtle life signal second.**

Under `prefers-reduced-motion`, ambient motion must resolve to a fully static and information-equivalent state.

## 6. Selected Work

### 6.1 Role and order

Selected Work is the main content-weight section of Home v1.

The approved order is:

1. **Luxury Handbag Pricing Architecture**
2. **Olist Marketplace Analysis**
3. **Competitive Positioning Against Giants**

The order is intentionally visual-first: the page begins with the strongest existing visual research material and then moves toward systems thinking and finally more abstract strategic argument.

The deeper capability progression is:

**Visual / Market → System / Analytics → Argument / Strategy**

### 6.2 No universal project-card template

The three projects must not be forced into a single repeated card composition.

They share:

- the frozen editorial grid;
- typography;
- notation;
- spacing logic;
- motion grammar;
- content truth rules.

They do not need to share the same markup hierarchy, image proportion, visual density, or motion emphasis.

### 6.3 Shared narrative contract

Each selected work follows:

**Question → Outcome → Evidence**

The overall composition is **outcome-led**: a short question creates context, but the result and evidence must quickly become visually dominant.

The Home presents a curated snapshot of evolving work, not a permanent final case study. Project summaries, evidence, visuals, status, and updated dates may change as the underlying projects mature without requiring a redesign of Home architecture.

### 6.4 Luxury Handbag Pricing Architecture

Role: **Visual / Market**

Canonical project source:

- `gabriel232ch/luxury-handbag-price-architecture`

Verified available source material includes the final report, appendix, reproducible scripts, current/historical datasets and calculation outputs, and report visuals.

The current Home composition uses the canonical brand-price calculation output as a live data story rather than rendering a report image. Market panels expand natively to reveal the observed range, middle 50%, and median for each brand. The source asset remains provenance, not a requirement for the Home presentation.

Recommended narrative stages:

1. short research question;
2. core outcome statement;
3. source-backed price-architecture data story plus light methodological marginalia.

Luxury may carry the strongest motion of the three projects through rule/chart assembly, outcome reveal, and restrained annotation shifts. The implementation must not rewrite or visually animate the underlying data into a different claim.

### 6.5 Olist Marketplace Analysis

Role: **System / Analytics**

Canonical project source:

- `gabriel232ch/olist-marketplace-analytics`

Verified available source material includes the validated PostgreSQL analysis pipeline, decision-science documentation, verified findings, prioritization logic, Tableau deliverable, Power BI assets, executive KPI CSV, and static dashboard views.

Olist must not read as a BI dashboard gallery or render the dashboard image on Home. Its current Home composition is a custom, source-backed data story built from the canonical executive KPI CSV and README findings. The display may animate and expand, but it must not invent intermediate values or alter the underlying claims.

Its central story is:

**Complex marketplace evidence → explainable decision system**

The real `GROW / DEFEND / FIX / INVESTIGATE` prioritization structure should provide the core conceptual visual language before the data story opens.

Recommended narrative stages:

1. resource-allocation question;
2. decision posture/outcome structure;
3. a slow, expandable data composition with a minimal verified evidence fragment.

Olist motion should emphasize hierarchy and system assembly rather than continuous dashboard movement. The data story uses discrete viewport-entered reveal and slow expansion states; reduced motion preserves the complete information without requiring animation.

### 6.6 Current Home typography direction

The current human-approved Home direction uses one shared hierarchy across the selected-work features. This is a composition decision within the frozen Phase 1 type system, not a reopening of the foundation:

- **Question:** the small italic Cormorant/editorial role used by `Selected Work`;
- **Outcome:** the restrained Cormorant/editorial lede role used by the `Research, systems...` treatment;
- **Supporting data:** IBM Plex Mono for labels, contexts, source paths, and compact values;
- **Supporting titles and signal names:** restrained Inter/display treatment at the already-approved smaller scale.

Luxury and Olist must keep these same roles and sizes. Feature sections may change composition, but they must not introduce a new oversized display treatment or a section-specific font hierarchy.

### 6.7 Competitive Positioning Against Giants

Role: **Argument / Strategy**

Canonical source material has been identified in the JoinQuant employer-brand/employee-experience benchmark research package, including evidence ledger, gap log, benchmark selection, analysis/insights, recommendations, and final report.

The Home must use those real research materials and evidence boundaries. It must not create decorative market numbers or a fictional dashboard merely to make the third project visually symmetrical with the first two.

Its composition should deliberately be the most textual and memo-like of the three projects, using real benchmark/evidence/implication structure through:

- typographic matrix;
- editorial rules;
- marginalia;
- strategic statement;
- evidence-led row or column progression.

Recommended narrative stages:

1. strategic question grounded in the real benchmark project;
2. core strategic conclusion;
3. benchmark/evidence/implication structure.

Motion is the most restrained of the three: progressive row reveal, rule assembly, marginalia shift, then conclusion emphasis.

## 7. Selected Work scroll choreography

Selected Work uses **expressive editorial scroll choreography** within the existing Phase 1 motion system.

Phase 2 intentionally defines this as **discrete viewport-driven narrative states**, not continuous scroll scrubbing.

A typical project has two or three states:

```text
Question
   ↓
Outcome
   ↓
Evidence
```

When a narrative stage enters the relevant viewport region, it transitions from a pending state to an entered state and uses the existing motion vocabulary:

- Reveal;
- Assemble;
- Shift;
- Morph where appropriate.

Phase 2 must not introduce long sticky pinning, pixel-by-pixel scroll timelines, heavy parallax, or cinematic sequencing.

### 7.1 Inter-project rhythm

Luxury → Olist:

**visual architecture → decision architecture**

The transition may retain grid/rule continuity so the page feels edited as a sequence rather than as three disconnected modules.

Olist → Competitive Positioning:

**dense evidence → deliberate pause → strategic argument**

Whitespace must increase before the strategic section so the page audibly/visually “quiets down.”

### 7.2 Reading state

When the user stops scrolling to read, Selected Work should be essentially stable. Persistent ambient motion belongs primarily to the Hero, not to analytical evidence.

## 8. Responsive composition

The approved rule is:

**Same story, different composition.**

Desktop may use:

- 12-column spatial relationships;
- asymmetric offsets;
- parallel text/visual relationships;
- layered editorial positioning.

Mobile should use:

- stronger vertical sequencing;
- one dominant moving element at a time;
- lower motion amplitude;
- more explicit Question → Outcome → Evidence timing.

Mobile must not be a scaled-down desktop layout. It may reorder supporting content to preserve reading clarity, but no key outcome or evidence may disappear solely because it is difficult to fit.

## 9. Now

### 9.1 Role

`Now` returns the page from selected work to current attention.

It is not a task manager, changelog, or fourth case study. It should feel more personal, looser, and less finished than Selected Work.

### 9.2 Structure

`Now` contains one primary thread and two side threads.

Primary:

- **Employer Brand / GEO at JoinQuant**

Side threads:

- **AI × Business Systems**
- **Building Gabriel Portfolio**

The primary thread may contain:

- one current question;
- one short current-state note;
- restrained phase/date/status notation.

Each side thread should normally contain only a title and one short state line.

These are curated snapshots. They do not need to mirror daily activity or automatically sync with private work systems.

`Current Threads` is not a separate Home v1 section; its purpose is absorbed into `Now`.

## 10. Human layer

A personal photograph is optional.

Its role is a **personal snapshot**, not a professional portrait requirement or personal-brand asset.

The photograph may be an everyday image Gabriel genuinely likes: travel, street, work break, ordinary environment, or another natural personal moment.

The implementation contract is:

- the page must remain compositionally complete without a photo;
- if a photo exists, it appears naturally in the Now/About area;
- no circular avatar treatment;
- no required headshot crop;
- no empty placeholder when a photo is absent;
- optional short caption/date/location only when real and useful.

The photo can be replaced later without changing Home architecture.

## 11. Editorial Closing

The page must end by reducing information density rather than escalating it.

The closing contains three layers.

### 11.1 From the Archive glimpse

Exactly one historical item may appear as an archive glimpse.

It should contain only:

- type/date;
- title;
- one short contextual note when useful.

The archive entry must correspond to a real historical item. Before final visual approval, implementation should select one suitable existing item from Gabriel’s available body of work/history. If no suitable real item is available, the page should omit the archive glimpse rather than fabricate one.

Phase 2 does not build an archive subsystem.

### 11.2 About / Index coordinates

`ABOUT` and `INDEX` appear as large but restrained editorial coordinates rather than CTA buttons.

For Home v1 they still resolve to in-page anchors.

### 11.3 Closing notation

The final page region may include only a small amount of system information such as:

- last updated date;
- folio;
- phase coordinate;
- `gabrielchen.me`.

There is no traditional dense footer with a large social/contact/link list in Phase 2.

The final rhythm should be:

**content density ↓ / motion intensity ↓ / whitespace ↑**

## 12. Content architecture

Home must not render the three external project repositories directly as live presentation sources.

The content model is:

```text
Underlying project evidence
          ↓
Curated Gabriel Portfolio content entry
          ↓
Home composition
```

The underlying project repository/report remains the source of truth for research, calculations, evidence, and project claims.

The Gabriel Portfolio content entry becomes the source of truth for how that project is presented on Home.

This allows project presentation to evolve through curated updates to:

- summary;
- question;
- outcome;
- evidence selection;
- visual;
- updated date;
- status.

Phase 2 does not implement automated cross-repository synchronization.

## 13. Existing content contracts

The current `work` content collection already supports title, subtitle, summary, publication, visibility, curation, optional Living Index ID, language, status, phase IDs, disciplines, dates, source references, and visual metadata.

Phase 2 should use the existing schema where possible and must not extend it speculatively. Schema changes are justified only when an approved Home content requirement cannot be represented cleanly with the current contract.

`src/content/work/` is currently empty apart from its placeholder, so Phase 2 must create the minimum real curated work entries needed for Home.

The Living Index registry is currently empty. Permanent `G.xxx` IDs may be used only if Phase 2 formally registers the entries under the existing registry rules.

## 14. Content truth rules

No project content may be invented.

Every Home-level:

- number;
- finding;
- research question;
- outcome;
- methodology claim;
- status;
- source reference

must be traceable to real source material.

When source evidence is insufficient, Home must omit the claim or visual rather than fabricate a symmetrical replacement.

Home wording may compress and editorially rewrite verified material for clarity, but it must preserve evidence boundaries and must not strengthen observational evidence into causal, financial, or strategic claims that the source project itself does not support.

## 15. Component architecture

Phase 2 should compose the existing Phase 1 primitives and add only Home-specific composition boundaries.

Conceptually appropriate Home-level components may include:

- `HomeNavigation`;
- `HomeHero`;
- section-specific work features or a narrow `WorkFeature` shell where genuine common behavior exists;
- `CurrentThread`;
- `ArchiveGlimpse`.

These names are illustrative, not mandatory APIs. The implementation plan should choose boundaries based on the final markup and testing needs.

The architectural requirement is that Home-specific components own **composition**, not a new design system.

Avoid a monolithic `index.astro` containing all content, scroll state, and section styling in one oversized file.

## 16. Accessibility and resilience

Home must remain understandable without motion and without client-side JavaScript.

Requirements:

- all core content renders statically;
- anchors work without JavaScript;
- keyboard focus remains visible and reaches navigation;
- images use truthful alt text;
- decorative notation does not create unnecessary screen-reader noise;
- reduced-motion users receive the same information with displacement and nonessential animation removed;
- missing optional personal photography does not create broken layout;
- selected-work textual Question/Outcome/Evidence remains meaningful if a visual asset fails;
- Light and Dark remain equivalent semantic worlds.

## 17. Motion implementation boundary

Phase 2 reuses the frozen Phase 1 motion grammar.

Allowed:

- viewport-entered reveal states;
- small assemble/shift/morph compositions;
- subtle Hero ambient motion using existing timing/easing principles;
- section-local choreography that remains legible when paused.

Deferred:

- GSAP;
- ScrollTrigger-style continuous timelines;
- long sticky pinning;
- major parallax systems;
- 3D/WebGL;
- flagship data choreography.

If implementation cannot produce the approved experience without crossing these boundaries, work must stop for scope review rather than silently expanding Phase 2.

## 18. Verification strategy

Implementation must preserve the existing full verification gate:

- Astro check;
- lint;
- unit tests;
- build;
- Playwright E2E.

Home-specific automated coverage should include, where technically appropriate:

- section existence and order;
- in-page anchor navigation;
- real curated content rendering;
- work source/asset integrity;
- mobile/desktop information equivalence;
- reduced-motion behavior;
- ThemeToggle regression;
- viewport-entered motion-state behavior;
- optional-photo absence;
- content schema validity;
- no broken Home assets.

Automated tests are necessary but not sufficient for visual acceptance.

## 19. Human visual review gates

Subjective review is required only when the browser experience itself must be judged.

Recommended Phase 2 visual gates:

1. Hero — desktop and mobile;
2. Selected Work compositions;
3. Selected Work scroll choreography;
4. Now + Human Layer + Closing;
5. final integrated Home — desktop/mobile, Light/Dark.

For each visual task:

1. Codex implements;
2. automated verification passes;
3. Codex self-reviews;
4. a localhost or Cloudflare preview is provided;
5. Gabriel + ChatGPT approve or reject the actual browser outcome;
6. approved work receives final automated verification, commit, push, and remote verification automatically.

Rejected visual states are not committed as accepted task results.

## 20. Acceptance criteria

Home v1 is complete only when all of the following are true.

### Content

- all three selected works use real source material;
- current-state content is real and intentionally curated;
- no placeholder project copy remains;
- no fake Living Index IDs or project claims appear.

### Visual

- Light and Dark both feel intentional;
- desktop and mobile are separately composed;
- the three selected works have visibly different editorial identities;
- the page is display-strong without resembling a generic technology landing page or résumé portfolio.

### Motion

- the Hero has subtle life without distracting from reading;
- Selected Work uses expressive, discrete scroll storytelling;
- motion settles during reading;
- reduced-motion information equivalence is preserved;
- Phase 3 cinematic tooling has not been pulled forward.

### Architecture

- Phase 1 foundation remains frozen;
- Home has clear section/component boundaries;
- curated project content can be updated later without redesigning Home;
- Home does not depend on Work detail pages, Living Index UI, CMS, or automated syncing.

### Experience

A first-time visitor should be able to form the intended impression:

> This is Gabriel’s continuously growing world. It already contains work worth exploring, and it is still changing.

At the same time, Gabriel should be able to return to the site as a personal space rather than feeling that it exists primarily to perform for an external audience.

## 21. Implementation transition

This document defines design intent and boundaries only.

After this design spec is reviewed and approved in its committed form, the next step is `superpowers:writing-plans` to create a separate Phase 2 Home v1 implementation plan. Implementation must not begin before that plan is approved.
