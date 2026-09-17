# Chanel Homepage Cinematic Chapter — Design v1

日期：2026-09-17

状态：Approved in product/design discussion. This document defines the planning baseline for later Codex implementation. It is intentionally a v1 design: visual tuning after browser QA is expected, but the narrative logic and evidence boundaries below should not be silently rewritten during implementation.

## 1. Why this redesign exists

The current Chanel homepage feature presents the work primarily as a compact analytical report: taxonomy, project labels, price architecture, historical repricing, financial performance, and conclusions appear before the reader understands why Gabriel cared about the question.

That structure is visually polished but conceptually backwards for Gabriel Portfolio. The site should first reveal how Gabriel notices a question, follows it, changes his mind, and continues refining his understanding. Research evidence should support that narrative rather than replace it.

The new public architecture is therefore two-layered:

1. **Homepage narrative layer** — why the question mattered, how it evolved, what Gabriel currently understands, and what remains unresolved.
2. **Full research layer** — detailed evidence, methodology, source provenance, peer definitions, tables, charts, and analytical boundaries.

The homepage is not a mini-report. The full research page remains the evidence layer.

## 2. Core product principle

> **Home is where I tell you why I cared. The project page is where I show you what I found.**

The Chanel chapter should communicate that Gabriel is someone who continues to think, test explanations, revise his understanding, and leave questions open when the evidence is incomplete.

The public site must not expose internal content-management language unless it materially helps a reader understand the work.

> **Taxonomy belongs to the system, not to the reader.**

Internal labels can continue to exist in data structures, but public-facing strings such as `VISUAL / MARKET`, `CHANEL PREMIUMIZATION STRATEGY`, `PRICE / HISTORY / PERFORMANCE`, `CURRENT SNAPSHOT`, and similar system labels should not structure the Chanel homepage chapter.

## 3. Canonical public identity

### Context line

> **MILAN · 2025 → NOW**

This is not a category label. It communicates origin, time, place, and continuing development.

### Canonical title

> **Luxury Was Slowing. Why Did Chanel Look Different?**

The title intentionally preserves uncertainty. It does not assume Chanel outperformed, nor does it present a completed causal claim.

### Canonical opening

> **I first started thinking about this while studying luxury at Bocconi in Milan. The market was slowing, and I kept coming across brands like Gucci and Zegna trying to adapt in very different ways. Later, a passing conversation brought Chanel to mind. It seemed to be holding up differently. I wanted to understand whether that impression was real — and, if it was, why.**

Bocconi and Milan stay because they are causal to the intellectual origin of the question, not credential decoration.

## 4. Homepage placement

Chanel remains the first flagship work immediately after the existing identity Hero.

The transition should be:

**Gabriel → something Gabriel has been thinking about**

not:

**Gabriel → portfolio index → selected work → project taxonomy → Chanel**

There should be no visible intermediate heading such as `SELECTED WORK`, `PROJECTS`, `FEATURED`, `01`, or `VISUAL / MARKET` between the Hero and the beginning of the Chanel chapter.

The Hero is identity. Chanel is the first lived example of how Gabriel thinks.

The transition should remain visually gentle: the Hero leaves the viewport, then `MILAN · 2025 → NOW` enters before the project title. Do not create a hard “section switch” merely for navigation clarity.

## 5. Interaction model: soft cinematic

The chapter is a cinematic research narrative, not a scrolling presentation.

Use normal document scrolling. Do not use scroll snapping or hijack scrolling.

Cinematic pacing comes from changes in information density, whitespace, typography, and restrained reveal timing:

**quiet → slightly tense → analytical → suddenly quiet → analytical → reflective**

Motion should control pacing, not navigation.

Avoid:

- mandatory full-screen snap transitions;
- heavy parallax;
- constant animation in every scene;
- typewriter effects;
- large decorative motion that competes with the existing signature Hero;
- fashion-advertising treatment that turns the work into Chanel promotion.

Respect reduced-motion behavior already established by the site.

## 6. Scene structure

The scene names below are internal design language. They do not need to appear as public headings.

### Scene 1 — The question begins

**Role:** establish origin and let the reader enter the question before seeing evidence.

Near/full-screen composition with substantial whitespace and a left-weighted reading area.

Public hierarchy:

1. `MILAN · 2025 → NOW`
2. `Luxury Was Slowing. Why Did Chanel Look Different?`
3. Only the first portion of the opening copy initially needs to be visible.
4. A subtle continuation/scroll cue may be used if necessary.

The scene should begin with little or no analytical data.

Do not begin with a Chanel bag, logo, runway image, or product hero. If any atmospheric visual layer is used, it should evoke memory / Milan / an intellectual beginning rather than advertise Chanel. Pure whitespace is acceptable and preferred over a weak decorative image.

The design direction is **minimal editorial composition with very light atmospheric depth**, not an image-led fashion hero.

### Scene 2 — The question returns

**Role:** move from general luxury context into the specific Chanel question.

Continue the opening rather than starting a new report section.

The narrative beat is:

> *Later, a passing conversation brought Chanel to mind.*

Then give visual emphasis to:

> **It seemed to be holding up differently.**

and resolve the scene into:

> *I wanted to understand whether that impression was real — and, if it was, why.*

This scene should still be mostly text and whitespace. Its job is ignition, not proof.

### Scene 3 — Following the visible clues

**Role:** show how investigation began and introduce the first substantive evidence.

Start naturally from:

> **I started with what I could see.**

#### Marketing / recent brand activity

For v1, this is text-only.

The existing campaign search is not currently treated as a complete causal analysis, and public campaign activity cannot establish campaign ROI, incremental sales, conversion, or business impact.

Use descriptive copy only, along the logic:

> *At first, I looked at the most visible explanations — what Chanel had been doing, how it was showing up, and whether recent brand activity could explain the difference I thought I was seeing. But public activity could tell me what the brand was doing — not whether those actions were actually driving the business.*

Then transition toward pricing.

Do not claim that Chanel marketing was effective without additional evidence.

#### Pricing enters

Pricing is the first substantive visual evidence on the homepage.

The visual should answer a simple reader question:

> **Where does Chanel actually sit?**

Use a restrained price-position / visible-ladder comparison against relevant peers. It should communicate relative market position without turning the homepage into the existing full dashboard.

Exact sample sizes, market-specific endpoints, methodology, tier definitions, and full peer detail belong in the full research layer.

Do not frame the visual as “who is most expensive.”

#### Historical pricing

Current price position should create the next question:

> **Was this position new?**

Introduce one concise historical visual showing comparable Chanel lines moving over time. Its narrative role is to show that pricing was not merely a static snapshot; a pattern was visible.

The scene should end with a partial sense that pricing is becoming a plausible explanation. This sets up the next reversal.

### Scene 4 — But something still felt missing

**Role:** the chapter’s central cognitive turn.

After the analytical density of Scene 3, remove the data and create a clear period of whitespace.

Give the line substantial visual space:

> **But something still felt missing.**

Then explain:

> *By then, the pricing work was largely complete. I could see how Chanel was positioning itself.*

followed by the key statement:

> **I still couldn't tell whether that positioning was actually supported by the business.**

This is why financial evidence enters. It must not feel like a mandatory “financial analysis section.”

Homepage financial evidence should be selective. Revenue, operating margin, free cash flow, and only the investment context needed to understand the story are sufficient candidates.

The visual should communicate a non-linear trajectory: strong years, visible 2024 pressure, and subsequent recovery/context rather than a simplistic upward-success chart.

The narrative implication is:

> **The business complicated the story.**

A useful internal closing logic for the scene is:

> **Price could explain the position. It could not fully explain the resilience.**

Exact wording can be tuned during content review, but the analytical meaning should remain.

### Scene 5 — Where Gabriel is now

**Role:** provide a provisional understanding without manufacturing finality.

Data recedes again. This scene should be reflective and relatively quiet.

Do not use public headings such as `CONCLUSION`, `KEY TAKEAWAYS`, or a report-style status block.

Current understanding:

- Chanel’s apparent relative resilience should not be attributed to a single campaign or price increase.
- The evidence increasingly suggests a system in which pricing, product, desirability, investment, client experience, and brand identity may reinforce one another.
- Pricing work helped explain how Chanel positioned itself.
- Financial evidence made the story less linear and more useful: resilience does not mean immunity, and higher prices alone do not establish pricing power.
- The evidence does not yet identify which mechanism matters most or establish a full causal model.

The public voice should remain first-person and provisional. A working expression is:

> *I no longer think Chanel’s relative resilience can be explained by a single price move or campaign. What I see now is a system: pricing, product, desirability, investment, client experience and brand identity all have to keep reinforcing one another.*
>
> *I still don’t know which part of that system matters most. That is the part I am still trying to understand.*

End quietly with:

> **The question is still open.**

then:

> **Explore the research →**

This is the transition into the full research layer.

## 7. Evidence rules

Homepage evidence exists to advance the narrative, not to prove that a lot of analysis was performed.

A visual belongs on the homepage only if the chapter can answer:

> **Why does the reader need to see this at this moment?**

If the answer is merely “because we already built the chart,” the chart stays in the full research layer.

For v1:

- Marketing / campaign exploration: descriptive text only.
- Current price positioning: one primary evidence visual.
- Historical pricing: one concise evidence beat.
- Financials: one restrained business-performance visual / small group of coordinated micro-visuals.
- Full tables, detailed source notes, methodology, peer-reporting grain, evidence boundaries, and extensive analytical judgments: full research only.

Core evidence principle:

> **Incomplete evidence should not block the narrative, but the narrative must never claim more than the evidence supports.**

## 8. Relationship to the full research page

The existing research work is not discarded.

The full research page remains the place for:

- current price architecture;
- France / US detail;
- peer selection and competitive positioning;
- historical repricing;
- financial performance;
- investment context;
- Hermès / LVMH and other reporting-grain-valid benchmark material;
- methodology;
- source provenance;
- `can judge / cannot judge` boundaries;
- detailed analytical findings.

The full research page should receive a concise narrative context at its top so direct external visitors understand the question, but it should not repeat the entire five-scene homepage experience.

Future work may redesign the full research page separately. This specification does not require that redesign now.

## 9. Public language rules

Public copy should sound like Gabriel following a question, not a database, CMS, consulting deck, or research taxonomy speaking to the reader.

Prefer natural transitions such as:

- `I started with what I could see.`
- `But something still felt missing.`
- `Was this position new?`
- `The question is still open.`

Avoid exposing internal labels such as:

- editorial;
- visual / market;
- current snapshot;
- price / history / performance;
- project type taxonomies;
- evidence classes;
- internal workflow names such as BA OS.

Internal research tooling may remain documented elsewhere.

## 10. Visual principles

Preserve the site’s established restrained black/white/grey, high-quality, minimal direction unless browser iteration proves a targeted change necessary.

The Chanel chapter should feel cinematic through composition and pacing rather than through spectacle.

Preferred qualities:

- large controlled whitespace;
- clear typographic hierarchy;
- asymmetry / left-weighted composition where appropriate;
- evidence appearing only when motivated by the narrative;
- deliberate density changes between scenes;
- subtle motion;
- normal scroll behavior;
- high legibility on desktop and mobile.

The scene plan is not a pixel-locked storyboard. Codex should be allowed to tune spacing, exact viewport proportions, line breaks, chart geometry, and reveal timing after browser QA, while preserving the approved narrative structure and public-language rules.

## 11. Iteration policy

This website has already evolved through multiple accepted versions. This design follows the same model.

The written plan is a decision baseline, not a requirement to reproduce every sentence or visual proportion literally.

Implementation may iterate when the rendered result reveals problems, but changes should preserve:

- the two-layer architecture;
- the canonical project question;
- the five-scene causal/narrative progression;
- the removal of public taxonomy;
- the evidence boundaries;
- the unfinished / living nature of the inquiry.

Substantive changes to those items should return to product/design review rather than being made silently by the implementation agent.

## 12. Scope boundaries for this design

In scope:

- Chanel as the first full-screen / cinematic flagship chapter after the Hero;
- Hero-to-Chanel transition;
- Chanel homepage narrative;
- evidence-selection rules for the homepage;
- public taxonomy removal within this chapter;
- link/transition into the full research layer.

Out of scope for this specification:

- redesigning Olist or the third project;
- redesigning the entire Home Hero;
- final redesign of the full Chanel research page;
- rebuilding the campaign research;
- proving campaign ROI;
- resolving the remaining causal question of what mechanism explains Chanel resilience most strongly;
- introducing new frameworks, CMS, or dependencies solely for this feature.

## 13. Acceptance criteria for later Codex implementation

The implementation should be considered aligned with this design when:

1. The Hero flows directly into `MILAN · 2025 → NOW`; no visible Selected Work / project-number / category gate sits between them.
2. The canonical title is used as the project’s primary homepage identity.
3. Public taxonomy from the current Chanel feature is removed or no longer structures the reader experience.
4. The chapter follows the five approved narrative beats in the correct causal order.
5. Marketing remains descriptive in v1 and does not imply campaign ROI or causal business impact.
6. Pricing is the first substantive evidence visual, followed by concise historical evidence.
7. The pricing-to-financial transition is motivated by `something still felt missing`, not by report-module sequencing.
8. Financial evidence communicates a non-linear business story rather than a simplistic success trajectory.
9. The final scene communicates a provisional understanding and explicit unresolved question rather than a final conclusion.
10. `Explore the research →` provides a clear path to the deeper evidence layer.
11. Normal scrolling remains usable; no scroll hijacking or mandatory snap behavior is introduced.
12. Reduced motion, desktop/mobile readability, theme compatibility, keyboard/accessibility, and existing global site contracts remain intact.
13. Browser QA may tune visual details without silently changing the approved narrative architecture.

## 14. Open revision points deliberately left for implementation / later review

These are not blockers for v1:

- exact Scene 1 atmospheric treatment, including whether any visual image is needed at all;
- exact scene heights and line breaks;
- exact composition of the primary peer-pricing visual;
- exact historical-pricing visual form;
- whether financial evidence works best as one chart or coordinated micro-visuals;
- final prose tightening after the rendered page is evaluated;
- later enrichment of the marketing beat if stronger campaign evidence is recovered or produced.

These decisions should be judged in the browser, not over-specified in text before implementation.
