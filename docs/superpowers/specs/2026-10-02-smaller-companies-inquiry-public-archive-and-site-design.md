# Why Do Some People Choose Smaller Companies? — Public Research Archive + Website Evolution Design

日期：2026-10-02

状态：Draft for final written review. The design below reflects the approved discussion. Implementation must not begin until this written spec is reviewed and explicitly approved.

## 1. Why this redesign exists

The current public website already contains a living inquiry titled:

> **Why Do Some People Choose Smaller Companies?**

That question should remain the public title and point of entry. It reflects the real question that started the work, even though the work has since moved beyond it.

Over roughly six weeks, the underlying project evolved through GEO research, source-of-truth work, employer-positioning exploration, employee interviews, query-oriented content design, evaluation, external case studies, AI workflow systematization, and an interactive candidate-experience concept.

The public site currently exposes only an early slice of that journey. The purpose of this redesign is to update the existing inquiry so that it reflects the full progression **without pretending that the project has reached a universal answer**.

The public work should show two things at once:

1. Gabriel can follow a vague, ambiguous question upstream until the real problem becomes clearer.
2. Once a method becomes stable, Gabriel can turn repeated manual work into reusable AI-assisted systems and then convert the learning into a new design.

The desired reader impression is not:

> “He completed an employer-brand project.”

It is closer to:

> “He can reframe an ambiguous problem, research it deeply, systematize the work, and turn the resulting understanding into something new.”

The project should remain visibly unfinished in the intellectual sense. The website should document **where the question has led so far**, not claim that human career choice has been solved.

---

## 2. Core research boundary

This project must **not** claim to explain why a person chooses one company over another.

A job choice is contextual and temporary. Different people assign different weights to compensation, scale, reputation, location, international exposure, autonomy, stability, learning, ownership, identity, family constraints, career optionality, and many other factors. A person joining a company does not necessarily imply deep or lasting endorsement of that company.

The working research object is narrower and more defensible:

> **How can a company reduce information asymmetry in a candidate’s career decision by making real, relevant, and inspectable information easier to understand?**

The current working implication is:

> Employer branding should not try to make the decision for the candidate. It can improve the information environment for mutual selection.

The goal is therefore not maximum persuasion. The goal is better matching:

- candidates can judge more clearly whether the work and organization fit them;
- companies can surface reality earlier rather than rely on broad claims;
- both sides can reduce avoidable mismatch and wasted time.

This is a **working interpretation**, not a general causal theory.

---

## 3. Public product architecture

The project has two public surfaces with different responsibilities.

### 3.1 Website = living narrative

`gabrielchen.me` is the interpretive layer.

It should explain, in first person:

- what Gabriel initially thought the problem was;
- what evidence or experience made that interpretation insufficient;
- how the question changed;
- what methods were introduced to answer the new question;
- where repeated work was systematized;
- how the learning eventually informed a new candidate-experience concept;
- what remains unresolved.

The website should read as a changing line of thought, not as a consulting report or a finished framework presentation.

### 3.2 GitHub = public research archive

A dedicated public research archive should serve as the evidence layer behind the website.

It should contain only material that is safe and useful to publish:

- public-source external research;
- public case-study summaries;
- cross-case synthesis;
- research-method evolution;
- public project timeline;
- public references and source notes;
- carefully aggregated, non-confidential process metrics.

The archive should make the website’s narrative inspectable without reproducing private employer materials.

The website may link to relevant archive sections through understated CTAs such as:

> **Explore the research →**

The GitHub archive does not need to reproduce the full first-person story. Its role is traceability.

---

## 4. Hard confidentiality boundary

The public website, the public archive, and this implementation must not publish or reconstruct confidential employer material.

The following remain private unless separately approved in the future:

- employer name as the source of the internal project;
- employee names or identifiable employee stories;
- interview transcripts or raw interview notes;
- Golden Sample article text derived from internal interviews;
- internal content-generation skills or skill packages containing private examples;
- internal prompt-test raw datasets;
- internal brand/source-of-truth documents;
- internal meeting notes or manager comments;
- internal research-organization materials;
- internal recruiting metrics or candidate-level feedback;
- private HTML or production candidate-facing pages;
- internal system prompts, workflow assets, or vendor bundles that embed confidential examples;
- private research-harness source code if it contains internal project context.

The public work may describe **how the method evolved** without publishing the internal assets that make the method executable.

When in doubt, publish the reasoning pattern, not the underlying private artifact.

---

## 5. Narrative principle

The website should not be organized as a chronological task log.

The primary structure is **problem reframing**.

A useful internal progression is:

`GEO visibility → information quality → source of truth → positioning → organizational reality → information gap → candidate query → candidate decision context`

A second, quieter progression runs underneath it:

`manual work → learned judgment → explicit method → reusable AI-assisted system`

The public story should foreground the first progression and use the second progression only at the moments where it materially changed how the work could scale.

This preserves the approved positioning of the project:

> **problem framing → research → systemization → creation**

---

## 6. Website narrative structure

The public title remains:

> **Why Do Some People Choose Smaller Companies?**

The title is the **starting question**, not the final answer.

The project page should explicitly allow the question to change over time.

A suitable opening direction is:

> *I started with what looked like a positioning problem. Over the next six weeks, the question kept changing.*

Exact public copy will be written during implementation, but it must preserve the factual and epistemic boundaries below.

### 6.1 Chapter 1 — I first thought this was a GEO problem

The initial objective was practical:

- increase the probability that relevant AI answers mention the company;
- improve factual accuracy when the company is mentioned;
- increase the chance that AI surfaces the messages and facts the company actually intends to communicate.

Gabriel had not previously worked deeply on GEO. The learning process therefore matters.

Publicly describe the learning pattern, not internal source material:

`AI-assisted orientation → practical learning / examples → authoritative research papers → first prompt tests`

The key point is not “AI taught me GEO.” The point is that Gabriel used multiple layers of evidence to move from unfamiliarity to an initial testable model.

### 6.2 Chapter 2 — The output problem was partly an upstream information problem

The first prompt tests, together with earlier difficulty finding employer information and later exposure to inconsistent internal materials, made the limitation clearer:

> AI cannot reliably reproduce information that is fragmented, inconsistent, or difficult to verify upstream.

The project therefore moved from output optimization toward information quality and source-of-truth thinking.

Do not frame this as a sudden revelation caused by one test. It was an accumulation of signals that the prompt tests made more concrete.

The public story may describe this shift as:

> Before trying to optimize what AI said, I needed to understand what information actually existed, how consistent it was, and which facts could be trusted.

### 6.3 Chapter 3 — Accurate facts still did not answer why anyone should care

Source-of-truth work could improve factual consistency, but the broader project goal was talent attraction.

That created a new question:

> **What, if anything, actually makes a smaller organization compelling to the people it wants to attract?**

At this point the work split in two directions:

- **inside:** employee interviews to compare external claims with lived experience and to understand what employees actually valued;
- **outside:** comparative research into smaller, high-impact organizations to understand what enabled them to compete for mission-critical talent despite smaller scale.

This is the correct place to introduce the earlier `small-high-impact-companies` research.

The public archive may expose the public-source research design and findings from that project. The website should keep the explanation concise.

### 6.4 Chapter 4 — A better story cannot substitute for a weaker reality

The external research and employee interviews gradually weakened the original positioning-first assumption.

The public synthesis should preserve this claim carefully:

> **Brand can amplify reality, but it cannot substitute for reality.**

The smaller, high-impact organizations studied were not compelling merely because they had better narratives. Many already had strong technical capability, visible output, specialized leverage, reputation, talent density, or other forms of organizational strength.

The work therefore moved away from:

`find differentiator → write positioning → tell better story`

and toward a longer-term view:

`organizational reality → output / employee experience → reputation → talent attraction → stronger future output`

Do not claim that this is a universal causal loop. Present it as a pattern that changed the project’s working assumption.

### 6.5 Chapter 5 — The interviews exposed an information-gap problem

The interviews remained valuable even after the positioning-first model weakened.

A different function emerged:

> employees themselves had often lacked important information before joining about the real work, work style, role expectations, or internal environment.

Some interview evidence suggested that clearer job information had materially helped candidates decide whether to apply.

The public site must not quote or identify those employees. It may state the generalized observation.

This reframed employee content from:

> “stories that prove a positioning”

into:

> “evidence that can reduce information gaps for future candidates.”

This is one of the project’s major conceptual pivots and should receive clear narrative emphasis.

### 6.6 Chapter 6 — If people search with questions, structure the content around questions

GEO re-entered the design at this stage.

Candidates using AI or search interfaces typically express uncertainty as queries, not as requests for an employee-story format.

This led to a new content structure:

`Candidate Query → Direct Answer → Employee Evidence → Full Story`

The public project should explain the design logic but must not publish confidential employee stories.

The key learning is:

> the content unit changed from “employee story” to “candidate question supported by employee evidence.”

### 6.7 Systemization node 1 — Golden Samples → reusable content system

This is the first place where the project’s AI-native working model should become visible.

The first article required roughly **2–3 hours** of iterative work to reach a satisfactory form. As the judgment became clearer, the second and third articles fell to roughly **20–30 minutes each** within the same working context.

Those three mature outputs then became Golden Samples.

The important sequence is:

`manual refinement → Golden Samples → retrospective extraction of judgment → reusable internal skill → skill evaluation / revision → raw interview material could generate usable drafts with little or no article-level re-teaching`

The public site should not publish the private skill or its confidential examples.

It may explain that one supporting method was itself derived by re-analyzing the first three successful transformations, rather than simply importing a generic writing template.

The important distinction is:

> **context-dependent know-how became an explicit reusable process.**

Do not present the result as “AI wrote the remaining articles automatically.” The human contribution was the problem definition, judgment design, Golden Sample selection, skill iteration, and acceptance criteria.

### 6.8 Chapter 7 — Publishing content was not enough; it needed evaluation

The project then moved from content creation toward measurement.

Publicly describe the existence of a multi-prompt, multi-model baseline / evaluation layer.

During implementation, Codex must inspect the local original evaluation data and extract only **2–3 representative, evidence-backed findings** suitable for public use.

No baseline result may be reconstructed from memory.

The public website should explain why the evaluation existed:

> to test what models actually surfaced, cited, omitted, or misunderstood rather than assuming that publishing content changed model behavior.

The raw baseline dataset remains private.

### 6.9 Chapter 8 — The first landing-page work organized the information, but did not yet solve the framing

The query-based content then needed an interface.

The first landing-page work focused on discovery and navigation:

- how candidates enter;
- how questions are grouped;
- how direct answers and fuller stories relate;
- how the content can remain legible to both humans and AI.

Do not overstate this stage as the final concept. It is an intermediate product step.

### 6.10 Chapter 9 — A second round of external case studies changed the framing again

A later five-case employer-brand research program asked a different question from the earlier smaller-company research.

The earlier research asked:

> **What makes some smaller organizations genuinely compelling?**

The later research asked:

> **How do companies make organizational reality legible enough for candidates to judge what joining would actually mean?**

The five cases were selected as a planned research set from the beginning. The later two cases were not retroactively added to “disprove” the first three.

The website should preserve each case’s independence while using the final cross-case synthesis to show what held, narrowed, or weakened.

The key public learning is that employer evidence can live far beyond a Careers page, including research, technical output, open source, operating documentation, and other inspectable artifacts.

The site should also retain the information-governance insight:

> more information does not automatically reduce uncertainty if it is stale, difficult to navigate, inconsistent, or poorly maintained.

### 6.11 Systemization node 2 — manual case research → research harness

The research harness was originally motivated by **reuse and scale**, not by a desire to falsify previous conclusions.

Observed process history:

- first full case: roughly one day;
- second and third cases: roughly half a day each as the process stabilized;
- harness design / implementation: roughly most of a working day;
- two subsequent cases: executed by separate agents in parallel and completed in roughly the same one-hour-plus wall-clock window.

Do not convert these observations into an unverified “10× faster” claim.

The public explanation should be:

> once the recurring case-study method became stable, Gabriel encoded the workflow so multiple agents could execute the research protocol in parallel rather than repeating the entire process manually and sequentially.

The harness also produced a secondary research benefit:

`scale → greater procedural consistency → better comparability → stronger cross-case synthesis`

The public site should explain the method at a high level only. Private source code, private project context, internal prompts, or private execution artifacts should remain private unless separately reviewed.

### 6.12 Chapter 10 — The working synthesis moved from persuasion toward decision support

The cross-case synthesis should be described as a working interpretation, not a discovered law.

A useful internal label is:

> **Employer Brand as Candidate Decision Infrastructure**

But the website should not over-theorize this phrase or present it as a universal framework.

The more defensible public conclusion is:

> A company cannot decide for a candidate what should matter. It can make the real work, organizational mechanisms, role expectations, and employee evidence easier to inspect so the candidate can make a better-informed decision.

This reframes the objective from attraction alone toward **mutual matching efficiency**.

### 6.13 Chapter 11 — Learning became design: the “crossroads” concept

The project’s current design output is an interactive concept built around the idea that a candidate may be standing at a career crossroads.

The public site may describe the concept abstractly:

> instead of starting from “why you should join us,” the experience starts from the decision context the candidate may already be in, then surfaces relevant evidence and comparable lived experience.

The private employer-facing page and HTML must not be published.

Current completion status must be represented accurately:

- concept developed;
- interactive prototype completed;
- direction selected for continued internal work;
- no claim that it is publicly shipped;
- no claim that it has been validated by live candidate outcomes;
- no claim that the latest internal iteration is complete.

A suitable public closing idea is:

> **This is where the question has taken me so far.**

The page should remain open-ended.

---

## 7. Public GitHub archive design

The implementation should create or prepare a dedicated public research-archive repository with a neutral name that does not imply the project has solved human career choice or established a universal employer-brand theory.

The exact repository name is an implementation detail; the content architecture is fixed by this spec.

Recommended structure:

```text
README.md
PROJECT_TIMELINE.md
METHOD_EVOLUTION.md

research/
  01_smaller_high_impact_companies/
    README.md
    public_synthesis.md
    sources.md

  02_employer_brand_case_studies/
    README.md
    01_optiver.md
    02_two_sigma.md
    03_citadel_securities.md
    04_canva.md
    05_gitlab.md
    cross_case_synthesis.md
    sources.md

methods/
  golden_samples_to_reusable_system.md
  manual_cases_to_research_harness.md
  evaluation_design.md

references/
  bibliography.md
  external_links.md
```

This is a public reading archive, not an executable reproduction package.

Do not copy private repositories wholesale into it.

Do not publish internal skills, internal sample content, internal evaluation data, private HTML, or private harness artifacts merely to make the archive appear “complete.”

---

## 8. Relationship between the website and archive

The website is authoritative for the evolving first-person narrative.

The archive is authoritative for public evidence and research traceability.

The implementation should prefer links such as:

`website claim → public archive synthesis → public source`

rather than duplicating full research reports into the website.

The project page should remain readable even if the reader never opens GitHub.

The GitHub archive should remain understandable even if the reader arrives directly from GitHub.

---

## 9. AI-native workflow ownership model

The public project should represent the actual working model accurately.

Gabriel led:

- problem framing;
- hypothesis and question formation;
- research direction;
- prompt / evaluation design;
- judgment criteria;
- system design decisions;
- iteration decisions;
- final acceptance of outputs.

AI tools assisted throughout with:

- learning and synthesis;
- research execution;
- drafting;
- code and artifact production;
- prompt-test execution;
- repetitive transformations;
- multi-agent parallel case research.

A manager provided periodic direction review and helped confirm whether the project remained on a useful path, but the specific design and execution proposals were developed before review and iterated afterward.

The public narrative should therefore avoid both extremes:

- do not imply that all analysis was performed manually;
- do not reduce the work to “used AI to generate content.”

A more accurate internal model is:

`human judgment → AI-assisted execution → human evaluation → iteration`

As the project progressed, Gabriel’s role shifted further toward:

`define problem → encode judgment → design system → evaluate outputs`

This is a meaningful capability progression and may be made visible where relevant.

---

## 10. Evidence retrieval tasks for implementation

Before writing final public copy, Codex must retrieve and verify evidence from the local project files.

Required evidence checks include:

1. **Baseline / evaluation findings**
   - locate original prompt-test and multi-model baseline data;
   - identify 2–3 representative findings;
   - record exact source files;
   - do not infer metrics from memory;
   - keep raw internal data private.

2. **Golden Sample / content-system timing**
   - preserve only the user-confirmed approximate process history:
     - first article ~2–3 hours;
     - second / third ~20–30 minutes each;
     - mature internal skill later produced usable output from raw material with minimal article-level re-teaching after several rounds of skill revision.
   - do not claim a precise percentage or multiplier unless supported by logs.

3. **Harness timing**
   - preserve only the user-confirmed approximate process history:
     - first case ~1 day;
     - second / third ~half-day each;
     - harness build ~most of a day;
     - two later cases completed in parallel in roughly one-hour-plus wall-clock time.
   - do not convert this into a formal speedup ratio unless independently measured.

4. **Current prototype status**
   - verify that the interactive “crossroads” concept exists locally;
   - do not publish private HTML;
   - describe only the abstract concept and truthful completion state.

5. **Public external research sources**
   - verify all claims about external companies against public sources already collected in the research archive;
   - keep source links intact.

---

## 11. Writing style

### Website

Use first person.

The voice should feel reflective, precise, and still in motion.

It should not sound like:

- a consulting retrospective;
- a “10 lessons I learned” article;
- a self-congratulatory AI productivity case study;
- a finished academic theory;
- employer-brand advice presented as universal truth.

Prefer:

> “I started with…”
>
> “That explanation became less convincing when…”
>
> “The interviews suggested a different problem…”
>
> “Once the process repeated, I stopped doing it one case at a time…”
>
> “This is where the question has taken me so far.”

The narrative should let the evidence create the sense of progress rather than repeatedly stating that Gabriel “grew” or “learned a lot.”

### GitHub archive

Use neutral analytical prose.

The archive should prioritize:

- scope;
- evidence;
- methodology;
- findings;
- limitations;
- traceability.

It should not duplicate the website’s personal reflection.

---

## 12. Public-language epistemic rules

Hard requirements:

- observation must not become causality;
- a selected employee story must not become a representative employee distribution;
- a company capability must not become an “everyone experiences this” claim;
- a public policy must not be treated as proof of universal compliance;
- a possibility example must not be written as a typical outcome;
- the five-case synthesis must remain a working model;
- the project must not claim to know why people choose companies in general;
- the “crossroads” prototype must not be described as shipped or outcome-validated.

When evidence is ambiguous, preserve the ambiguity.

---

## 13. Resume relationship

The website and archive should produce a factual base that can later support a concise resume update.

The implementation must not optimize website copy around resume bullets.

However, the final public artifacts should make the following capability chain supportable:

> **problem framing → mixed-method research → evidence-led content design → evaluation → AI workflow systemization → interactive concept design**

Any later resume metric must trace to verified project evidence.

Do not invent impact metrics for the sake of stronger bullets.

---

## 14. Implementation boundaries

This design does **not** require:

- publishing the private internal skill;
- publishing Golden Samples;
- publishing raw employee interviews;
- open-sourcing the private research harness;
- publishing the private candidate-facing HTML;
- creating a generalized employer-brand framework product;
- proving why people choose companies;
- turning the public archive into a tutorial for reproducing the internal workflow.

The project is a **public research archive + living first-person inquiry**, not an open-source employer-brand automation package.

---

## 15. Acceptance criteria

The implementation is successful when all of the following are true:

### Narrative

- The existing `Why Do Some People Choose Smaller Companies?` inquiry remains the public title and evolves rather than being replaced.
- The story clearly shows how the problem changed from GEO visibility toward information asymmetry and mutual selection.
- The narrative is first-person but not self-congratulatory.
- The work does not claim a universal answer to human career choice.
- The final state remains intellectually open.

### Method

- The Golden Sample → reusable system transition is visible at the correct point in the story.
- The manual case research → research harness transition is visible at the correct point in the story.
- AI assistance is represented accurately as part of the full workflow.
- Human judgment and ownership remain explicit.

### Evidence

- Baseline findings are extracted from local source data rather than memory.
- Public company claims are source-backed.
- Timing observations remain approximate unless stronger evidence exists.
- No causal or representativeness overclaim is introduced.

### Confidentiality

- No employer name is exposed as the source of the internal project.
- No employee-identifying material is published.
- No private Golden Samples are published.
- No private skill package is published.
- No private baseline dataset is published.
- No internal brand/source-of-truth documents are published.
- No private HTML or internal meeting material is published.

### Public architecture

- The website can stand alone as a coherent first-person narrative.
- The public GitHub archive can stand alone as a coherent evidence repository.
- Website links into the archive where deeper evidence is useful.
- The archive links onward to public external sources.
- The two surfaces do not duplicate each other unnecessarily.

---

## 16. Internal design summary

The project should ultimately communicate one integrated capability:

> **I started with a communication problem, kept following it upstream until the real constraint became clearer, systematized the parts of the work that began repeating, and then used the resulting understanding to design a new candidate experience.**

This sentence is an internal design summary, not required public copy.

The public work should earn that conclusion through the sequence of evidence rather than state it as personal branding.
