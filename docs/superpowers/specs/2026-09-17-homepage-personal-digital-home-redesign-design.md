# Gabriel Portfolio Homepage — Personal Digital Home Redesign v1

日期：2026-09-17

状态：Draft for final written review. The narrative and product decisions below reflect approved discussion. Implementation must not begin until this written spec is reviewed and explicitly approved.

## 1. Why this redesign exists

The current homepage is visually polished but still behaves like a designed research portfolio: the Hero exposes taxonomy, project reading links, folio numbering, and report-like categories; the three work sections use similar analytical structures; `Now` is framed as a professional status panel; and the closing behaves like an index / source directory.

That no longer matches the intended role of `gabrielchen.me`.

The homepage should become a **personal digital home with an art-directed portfolio inside it**. It should reveal Gabriel as a living, thinking, learning person first, while still preserving serious analytical work and evidence underneath.

The desired reader impression is not primarily:

> "This is a polished portfolio."

It is closer to:

> "This person is thoughtful, curious, alive, and keeps growing."

The site must earn that impression through the work, interests, pacing, writing, and lived details. It must not state it as branding copy.

## 2. Core product direction

The homepage should foreground:

- how Gabriel notices questions;
- how he follows them and changes his understanding;
- how he deliberately challenges his own capability;
- what he is still learning and does not yet know;
- what he is doing outside narrowly professional work;
- the fact that the website itself continues to change as Gabriel changes.

The homepage is **not recruiter-first**. It does not optimize its voice around conventional portfolio expectations such as skill lists, project taxonomies, polished certainty, standard case-study cards, or calls to hire Gabriel.

This does not mean the site is careless about professional readability. The work must remain credible, sourced, legible, and easy to explore. The difference is that professional value emerges from authentic thinking rather than from self-positioning language.

A useful internal principle is:

> **The site should document genuine thinking, not perform certainty.**

Another useful internal principle is:

> **Visible artifacts are evidence of learning, not the definition of learning.**

Neither sentence is required public copy.

## 3. Public-language hard rule

This is a hard implementation constraint:

> **Internal design language must never become public-facing website copy unless this spec explicitly marks the exact phrase as public copy.**

Internal planning terms such as the following are for design and implementation only:

- cinematic chapter;
- capability progression;
- living snapshot;
- research notebook;
- Scene 1 / Scene 2 / Scene 3;
- truthful abstraction;
- slow-changing / living content;
- ongoing inquiry;
- narrative beat;
- evidence layer;
- design for expansion.

Do not render them merely because they appear in planning documents.

Likewise, avoid exposing internal / CMS / consulting-style taxonomy such as:

- `RESEARCH / SYSTEMS / NOTES`;
- `VISUAL / MARKET`;
- `SYSTEM / ANALYTICS`;
- `STRATEGY / COMPARATIVE`;
- `CURRENT SNAPSHOT`;
- `PRIMARY THREAD / CURRENT ATTENTION`;
- `PRICE / HISTORY / PERFORMANCE`;
- `CLOSING / SOURCES`;
- numbered section labels whose only purpose is system organization.

The reader should encounter natural language, not the information architecture used to build the page.

## 4. Overall homepage sequence

The approved top-level sequence is:

1. **Hero — identity first**
2. **Chanel — curiosity pulls the question deeper**
3. **Olist — deliberate capability growth**
4. **Smaller companies / talent — a question still being learned**
5. **Now — present life, not productivity status**
6. **Ending — warm, light, unfinished**

The three work chapters should not be normalized into one reusable public-facing card pattern. They belong to one website but express different kinds of growth and should therefore have different pacing and visual logic.

The site should feel coherent through typography, palette, spacing discipline, motion restraint, and authorial voice — not through forcing every project into the same template.

## 5. Hero — identity first

### Role

The Hero should do one thing well:

> **Let the reader meet Gabriel before the site starts explaining Gabriel's work.**

It should not function as a project index or publication table of contents.

### Approved composition

Preserve the current large handwritten `Gabriel Chen` signature and the existing asymmetric composition: large signature / identity on the left, short text on the right.

The current composition is already strong. The redesign should remove content noise rather than discard the underlying layout.

Preserve the signature animation unless browser QA reveals a concrete issue. It remains the Hero's distinctive motion moment.

### Canonical public intro

Use this exact sentence as the v1 Hero statement:

> **I like following questions until they become clearer — and building things that help me think better.**

Place it on the right side in the existing asymmetric relationship to the signature. Do not add a second explanatory paragraph underneath.

### Remove from the public Hero

Remove:

- `RESEARCH / SYSTEMS / NOTES`;
- folio numbering such as `01 / ∞`;
- `START READING`;
- project reading links inside the Hero;
- `PRICING RESEARCH` / `MARKETPLACE ANALYSIS` metadata;
- any replacement taxonomy that serves the same function under different words.

### Navigation

`WORK` and `NOW` may remain for v1 because they are small, functional navigation rather than descriptive taxonomy. The theme toggle may remain.

Do not over-expand navigation during this redesign. Navigation wording can be reconsidered later if browser QA shows that `WORK` feels inconsistent with the new page.

### Transition out of the Hero

There should be no visible `Selected Work`, `Projects`, `Featured`, project number, or category gateway after the Hero.

The reader scrolls directly into:

> **MILAN · 2025 → NOW**
>
> **Luxury Was Slowing. Why Did Chanel Look Different?**

The transition is simply:

**Gabriel → something Gabriel has been thinking about.**

## 6. Chanel — flagship inquiry

The detailed Chanel design remains defined by:

`docs/superpowers/specs/2026-09-17-chanel-homepage-cinematic-chapter-design.md`

That specification remains the detailed authority for the Chanel chapter. This homepage spec only defines its role in the larger page.

### Public identity

Context:

> **MILAN · 2025 → NOW**

Title:

> **Luxury Was Slowing. Why Did Chanel Look Different?**

Canonical origin:

> **I first started thinking about this while studying luxury at Bocconi in Milan. The market was slowing, and I kept coming across brands like Gucci and Zegna trying to adapt in very different ways. Later, a passing conversation brought Chanel to mind. It seemed to be holding up differently. I wanted to understand whether that impression was real — and, if it was, why.**

### Role on the homepage

Chanel is the longest, slowest, most immersive work chapter. It demonstrates curiosity that keeps pulling Gabriel deeper:

luxury context → visible brand activity → pricing → historical pricing → something still feels missing → financial evidence → a more complicated provisional understanding.

It should end with openness rather than certainty:

> **The question is still open.**
>
> **Explore the research →**

The homepage is the narrative layer; the project subpage is the evidence / full-research layer.

## 7. Olist — compact capability progression

### Role

Olist must feel structurally different from Chanel.

It is not a second cinematic five-scene chapter. It should be shorter, tighter, and more forward-moving — roughly a compact three-part progression rather than repeated full-screen scenes.

Its meaning is not "Gabriel learned SQL." The core change is:

> Gabriel moved from answering predefined data questions toward independently discovering and defining business problems.

### Canonical public identity

Context:

> **SAMSUNG · 2025 → OLIST · 2026**

Title:

> **SQL Wasn’t the Hard Part. Knowing What to Ask Was.**

### Part 1 — real data begins at Samsung

Samsung stays because it is causally important, not because the homepage is reciting a resume.

Public narrative should communicate that Gabriel's first real exposure to data analysis came from working with large sales datasets at Samsung, often in Excel, including datasets reaching hundreds of thousands and sometimes millions of rows.

The key meaning is:

> Samsung was where data analysis started for Gabriel, but it was not meant to be the endpoint.

A suitable v1 opening direction is:

> *My first real exposure to data analysis came at Samsung, working with sales datasets that could run into hundreds of thousands — sometimes millions — of rows. Most of the work happened in Excel. That was where data analysis started for me, but I didn’t want it to be the endpoint.*

### Part 2 — from query exercises to finding the question

Do not frame Gabriel's SQL learning as a three-repository progression.

The GitHub practice projects are only a visible fragment of a broader learning process that also included private practice and platforms such as DataCamp. The homepage and full analysis must not imply that three small GitHub repositories equal the full SQL learning journey.

A suitable v1 direction is:

> *I had already been learning and practising SQL for some time. But most learning environments came with the question already defined: understand the task, write the right query, retrieve the answer. What I wanted to learn next was different — how to look at unfamiliar data, decide what was worth asking, and work my way toward a business problem on my own.*

Give visual emphasis to:

> **What I wanted to learn next was how to know what to ask.**

Then:

> **That is what led me to Olist.**

And the important truthful condition:

> **There was no research question at the beginning. I started by understanding what was in the data — and what wasn’t.**

A light relational-data visual may enter here to communicate an unfamiliar business dataset rather than a solved SQL exercise. It should not become a technical schema showcase.

### Part 3 — SQL becomes investigative language

The homepage should show only enough analytical evidence to prove that a business problem emerged.

The strongest concise pair is the tension between growth and operating quality, for example:

- GMV proxy growth;
- declining on-time delivery.

Do not begin the homepage experience with `GROW / DEFEND / FIX / INVESTIGATE`, detailed portfolio frameworks, or a stack of expandable report metrics.

The emerging business question can then appear naturally:

> *How should Olist grow marketplace value without letting fulfillment reliability and customer experience deteriorate?*

The capability shift should land around:

> **SQL stopped being the task. It became the language I used to investigate a business.**

and / or:

> *What changed wasn’t just what I could query. It was how I approached an unfamiliar problem.*

End with:

> **Explore the analysis →**

### Full-analysis boundary

The subpage can show the real query logic, analytical chain, measurement choices, data-grain decisions, validation, detailed findings, and limitations.

Its purpose is not to certify how Gabriel learned SQL. It should show how the Olist analysis itself was reasoned through.

## 8. Smaller companies / talent — a living inquiry

### Role

This is the lightest and most explicitly unfinished of the three work chapters.

It should feel closer to an evolving research note than a completed consulting case study.

The homepage must not pretend the existing `small-high-impact-companies` benchmark is the whole project. That benchmark is one attempt to understand a larger question.

### Canonical public title

> **Why Do Some People Choose Smaller Companies?**

The wording matters:

- `Some` avoids implying that talented / ambitious people generally prefer smaller firms.
- `People` avoids HR-heavy labeling such as `great people` or `talent` in the title.
- `Smaller` is relative: the question concerns choosing a smaller organization when larger, better-known options exist.

The chapter must not persuade the reader that smaller companies are better.

It should acknowledge, implicitly or explicitly, that different people value different things: platform scale, brand, future optionality, ownership, team, learning, autonomy, mission, work type, or other factors — and that preferences may change by person and career stage.

### Public origin and privacy boundary

The real origin is employer-brand work at Gabriel's current quantitative-investment internship.

For now, do **not** name JoinQuant on the public homepage or project page as the source of the internal work.

Use truthful abstraction such as:

> *While working on employer branding at a quantitative investment firm...*

The public story may explain that Gabriel initially thought the task was to identify a clear differentiator / positioning statement, then became less convinced that one sentence could solve the problem.

A suitable v1 direction is:

> *While working on employer branding at a quantitative investment firm, I started with what seemed like a simple question: what actually makes a smaller company different to the people it wants to attract? At first, I thought the answer might be something we could distill into a clear positioning statement. The more I worked on it, the less convincing that idea became.*

A key idea is:

> *A company does not become compelling because it finds the right sentence. Whatever makes people choose it has to exist before the sentence does.*

### What appears on the homepage

The homepage only needs to say that one place Gabriel started looking was smaller organizations already creating outsized impact, trying to understand what they actually offered people and whether recurring patterns existed.

Do not place the full 28-company longlist, 12-company screening, six deep dives, counterexamples, or five mechanisms on the homepage.

Those belong in the subpage as the **current research**, not as a final answer.

Canonical public status line:

> **I’m still trying to understand this.**

End with:

> **Explore the current research →**

The wording `current research` is intentional. It communicates that this page is a living state of understanding rather than a frozen final report.

### Confidentiality / internal-information hard boundary

Do not publish, unless separately approved later:

- the employer's name as the source of this inquiry;
- employee names;
- interview transcripts;
- internal sample details not already cleared for publication;
- mentor comments;
- internal meeting decisions;
- candidate-level feedback;
- private recruiting metrics;
- internal EVP / slogan exploration;
- internal process details whose publication could reveal company operations.

The public page may share Gabriel's question and the way the work changed his thinking. It must not publish the company's internal process.

## 9. Now — present life, not a productivity dashboard

### Role

After three work chapters, the homepage should deliberately widen back out to Gabriel as a person.

`Now` should answer a broad human question:

> What is Gabriel actually doing, learning, playing, and thinking about right now?

Work is allowed here, but it is only one part of life.

An internal principle is:

> **Now should make Gabriel feel present, not productive.**

Do not render that sentence publicly.

### V1 content model

For the first implementation, support four simple categories:

- what Gabriel is learning;
- what Gabriel is working on;
- what Gabriel is playing;
- what Gabriel is thinking about.

These may appear publicly with natural labels such as `Learning`, `Working on`, `Playing`, and `Thinking about` if they look good in-browser. They are not required to become a rigid permanent taxonomy. If the rendered page feels templated, the labels may be softened during browser QA while preserving the underlying content.

Current examples might include Italian, current work / site-building, Baldur's Gate 3, or a question Gabriel is thinking about, but implementation must use content explicitly approved / supplied for publication and must not infer private details from internal memory.

### Photo

A personal image area is optional in v1.

Do not block implementation because Gabriel has not selected a photo yet. The composition should work with or without one.

If a suitable image is later provided, it can enter naturally as a recent personal snapshot rather than a formal portrait.

### Future integrations

The structure should not make future integrations difficult, but v1 must not over-engineer them.

Potential later additions include:

- Duolingo streak / language-learning status;
- a curated recent Instagram image;
- music / reading / other lightweight living signals.

These are future enhancements, not current implementation requirements.

If Instagram is connected later, prefer a deliberately selected / recent image rather than mirroring the full feed.

If Duolingo or another dynamic source is connected later, the purpose is to add a small sign of ongoing life, not to turn `Now` into a quantified-self dashboard.

## 10. Ending — warm, light, unfinished

Remove the current closing behavior based on `CLOSING / SOURCES`, `Selected work`, `RETURN TO WORK`, `PUBLIC SOURCE`, and source-directory presentation.

After `Now`, the page should gradually become quieter.

Canonical public closing line:

> **I’ll keep adding things here as I go.**

Then provide a small set of simple personal destinations such as:

- Instagram;
- GitHub;
- Email.

Then `Gabriel Chen` / site identity and substantial whitespace.

Do not add a recruiter-style CTA such as:

- `LET'S WORK TOGETHER`;
- `AVAILABLE FOR OPPORTUNITIES`;
- `HIRE ME`;
- `VIEW MY RESUME`.

The final feeling should be warm, alive, and open-ended rather than transactional.

## 11. Visual rhythm across the whole homepage

The homepage should feel like one authored place, but the work chapters should not be visually homogenized.

### Hero

Large identity, asymmetry, silence, one sentence.

### Chanel

Slowest rhythm. Large whitespace, substantial chapter length, controlled evidence, reflective pauses. Soft-cinematic behavior through pacing rather than scroll effects.

### Olist

More compact and directional. The reader should feel progression. Data relationships and concise change visuals can create momentum.

### Smaller companies

Lightest work chapter. More text-led, notebook-like, fewer heavy data graphics, visible incompleteness.

### Now

Looser and more personal. It should not read like a fourth project section.

### Ending

Minimal and warm. Let the page breathe out.

The visual system should continue to use the site's established restrained black / white / grey direction, typography quality, theme support, and careful grid discipline unless browser QA justifies a focused change.

Do not create spectacle merely to differentiate sections. Difference should come from narrative need, density, typography, evidence type, and pacing.

## 12. Motion principles

Motion remains restrained.

The signature animation can remain the Hero's main distinctive gesture.

Elsewhere, use motion to support reading rhythm, not to demonstrate frontend capability.

Avoid:

- scroll hijacking;
- mandatory snap scrolling;
- constant parallax;
- typewriter effects;
- every element animating independently;
- motion that makes research evidence harder to read.

Respect reduced-motion behavior.

## 13. Evidence and truthfulness rules

Homepage storytelling must remain evidence-bounded.

Do not make a story cleaner by inventing a causal link that is not supported.

Examples:

- Chanel marketing activity cannot be presented as proven campaign ROI.
- Higher prices alone cannot be presented as proof of pricing power.
- Olist must not pretend there was a predefined business question at the beginning.
- Olist GitHub practice repositories must not be presented as the total SQL-learning journey.
- The smaller-company inquiry must not imply that smaller companies are categorically better or that all high-performing people prefer them.
- Current employer-brand work must not expose private company processes.

The homepage may be selective, but selective does not mean misleading.

## 14. Relationship to subpages

Each homepage chapter should have a natural deeper destination, but the destination reflects the maturity of the work:

- Chanel: **Explore the research →**
- Olist: **Explore the analysis →**
- Smaller companies: **Explore the current research →**

These differences are intentional.

The subpages should not merely repeat the homepage narrative. They hold deeper evidence, methods, query / analytical logic, source provenance, limitations, and more detailed work.

The homepage explains why Gabriel cared and how his understanding changed. The subpages show what he found and how he got there.

## 15. Relationship to existing code and prior specs

The current homepage is composed as:

`HomeNavigation → HomeHero → LuxuryFeature → OlistFeature → CompetitiveFeature → NowSection → EditorialClosing → HomeMotionController`.

The implementation may refactor, replace, or split these homepage-specific components as needed to express the approved design. Do not preserve a component merely because it exists if its public model conflicts with this spec.

However, do not perform unrelated global refactors.

This specification supersedes conflicting reader-facing assumptions in:

- `docs/superpowers/specs/2026-09-07-home-editorial-refresh-design.md`;
- conflicting homepage-specific portions of earlier Phase 2 Home specifications.

It does **not** revoke unrelated frozen foundation / design-system contracts.

Continue to preserve, unless a later approved decision says otherwise:

- Astro architecture;
- existing theme behavior;
- established font assets / design-system quality;
- responsive grid contracts where useful;
- accessibility;
- reduced-motion support;
- truthful content boundaries;
- existing production reliability and test expectations.

The Chanel-specific spec from 2026-09-17 remains the detailed authority for the Chanel chapter. If wording between the two 2026-09-17 specs appears to conflict, use this homepage spec for whole-page architecture and the Chanel spec for detailed Chanel scene behavior, then return to review rather than silently guessing.

## 16. V1 scope

### In scope

- Hero simplification and canonical intro;
- direct Hero → Chanel transition;
- implementation of the approved Chanel homepage chapter;
- Olist homepage rewrite into the compact growth narrative;
- smaller-companies homepage rewrite into the living inquiry;
- Now redesign into a human present-life section;
- warm minimal ending;
- removal of reader-facing system taxonomy that conflicts with this design;
- mobile / desktop / light / dark browser QA;
- documentation of any implementation-level decisions that materially affect future work.

### Out of scope for this v1

- rebuilding every work subpage from scratch;
- finishing the unresolved Chanel causal question;
- completing the smaller-companies research program;
- publishing current-employer internal research details;
- Duolingo API integration;
- Instagram integration;
- a full social feed;
- a CMS migration;
- a new animation framework;
- new global design-system architecture without demonstrated need;
- adding features simply because they may be useful someday.

## 17. Browser-iteration policy

This is a design baseline, not a pixel-locked storyboard.

The implementation agent is expected to use browser QA and may tune:

- exact section heights;
- whitespace;
- line breaks;
- typographic scale within the established system;
- chart / schema geometry;
- reveal timing;
- responsive stacking;
- optional labels whose public wording feels too templated;
- the exact presence / absence of a small scroll cue.

The implementation agent must **not** silently change:

- the Hero canonical intro;
- the removal of Hero taxonomy / project index behavior;
- the overall homepage sequence;
- the three projects' distinct narrative roles;
- canonical project titles;
- the privacy boundary around the current quantitative-investment employer;
- `I’m still trying to understand this.` as the third project's current status;
- the `Now` concept as human life rather than productivity status;
- the closing sentence;
- the rule against exposing internal design terminology.

Substantive changes to those items require product / design review.

## 18. Acceptance criteria for later implementation

The homepage is aligned with this design when all of the following are true:

1. The Hero still uses the Gabriel Chen signature as the primary visual identity.
2. The Hero right-side statement is exactly: `I like following questions until they become clearer — and building things that help me think better.`
3. The Hero no longer renders `RESEARCH / SYSTEMS / NOTES`, `01 / ∞`, `START READING`, project teaser rows, or equivalent replacement taxonomy.
4. `WORK` / `NOW` may remain as light functional navigation.
5. The Hero flows directly into the Chanel chapter with no `Selected Work` / `Featured` / numbered category gate.
6. Chanel follows the separately approved 2026-09-17 chapter design and ends with `Explore the research →`.
7. Olist is materially more compact than Chanel and uses the approved Samsung → SQL learning → unfamiliar Olist dataset → self-defined business problem progression.
8. Olist does not present GitHub SQL practice repositories as Gabriel's complete SQL-learning history.
9. Olist does not lead with `GROW / DEFEND / FIX / INVESTIGATE` or a report-style metric accordion.
10. Olist ends with `Explore the analysis →`.
11. The third project is titled `Why Do Some People Choose Smaller Companies?`.
12. The current quantitative-investment employer is not named publicly as the source of the employer-brand inquiry.
13. The third project does not expose private interview / recruiting / meeting details.
14. The existing benchmark is presented as one current attempt to understand the broader question, not as a final answer.
15. The third project visibly communicates `I’m still trying to understand this.` and ends with `Explore the current research →`.
16. `Now` is no longer structured as `PRIMARY THREAD / CURRENT ATTENTION` plus professional side threads.
17. V1 `Now` can represent learning, working on, playing, and thinking about; it works visually without a required photo.
18. No Duolingo / Instagram integration is required for v1.
19. The closing no longer renders `CLOSING / SOURCES`, `RETURN TO WORK`, `PUBLIC SOURCE`, or a source-directory block.
20. The closing includes `I’ll keep adding things here as I go.` and simple personal links such as Instagram / GitHub / Email.
21. No recruiter-first CTA is added.
22. Internal design terminology from this spec does not leak into the rendered UI.
23. Desktop and mobile layouts are browser-QA'd in light and dark themes.
24. Keyboard navigation, semantic headings, links, reduced motion, and existing accessibility expectations remain intact.
25. Existing tests are updated to assert the new public contracts rather than preserving superseded taxonomy.
26. Final browser QA is allowed to improve visual details without flattening the three projects into one repeated template.

## 19. Deliberately open revision points

These should be judged in-browser rather than over-specified now:

- exact responsive Hero line breaks;
- whether a subtle Hero scroll cue is useful;
- exact Olist relational-data visual form;
- exact amount of Olist evidence visible before the subpage link;
- exact visual treatment of the smaller-companies research trail;
- exact public labels, if any, inside `Now`;
- whether a personal photo is available for the first release;
- exact Instagram / email / GitHub footer layout;
- later dynamic integrations;
- future changes to navigation wording after the redesigned page exists as a whole.

These are iteration points, not reasons to delay the v1 redesign.
