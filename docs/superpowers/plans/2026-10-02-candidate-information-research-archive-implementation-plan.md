# Candidate Information Research Archive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new public GitHub research archive that documents the public-source research, method evolution, evidence boundaries, and current synthesis behind the `Why Do Some People Choose Smaller Companies?` inquiry without publishing confidential employer materials or executable internal workflows.

**Architecture:** Create a separate public Markdown-first repository named `candidate-information-research`. Use a local, untracked evidence ledger and redaction-pattern file to derive public-safe summaries from private source material. The public repository is an evidence layer, not a reproducible internal workflow: it contains public-source case research, method evolution, aggregate process observations, citations, and limitations, plus a standard-library verification script for structure, relative links, placeholders, and local redaction scans.

**Tech Stack:** Git, GitHub CLI, Markdown, Python 3 standard library. No runtime framework or package dependency is required.

**Spec:** `gabriel-portfolio/docs/superpowers/specs/2026-10-02-smaller-companies-inquiry-public-archive-and-site-design.md`

## Global Constraints

- The archive is public; assume every committed byte can be read externally.
- Do not publish employer identity as the source of the internal project.
- Do not publish employee names, interview transcripts, raw interview notes, Golden Sample article text, internal skills, vendor bundles, raw prompt-test data, internal source-of-truth documents, meeting notes, internal research-organization material, private HTML, or private harness source/artifacts.
- Publish reasoning patterns and aggregate process history, not private executable assets.
- External-company claims must retain public-source support.
- The five employer-brand cases remain independent; cross-case meaning belongs in the synthesis.
- The archive must not claim to explain why people choose companies in general.
- `Employer Brand as Candidate Decision Infrastructure` may appear only as a working interpretation, never as a validated general theory.
- Timing observations remain approximate: first content article ~2–3h, next two ~20–30m each; first case ~1 day, next two ~half-day each; harness build ~most of a day; two later cases completed in parallel in roughly one-hour-plus wall-clock time.
- Do not convert the timing observations into a percentage, multiplier, or formal benchmark unless local logs independently support it.
- The public archive must stand alone without requiring access to the private workspace.
- The exact public repository name in this plan is `gabriel232ch/candidate-information-research`. If the human changes the name during plan review, update every later URL consistently before implementation.

## Review Focus

- **Confidential copy-through:** any text copied from a private artifact must pass a local redaction scan before commit.
- **Unsupported external claims:** every case file needs a `Sources` section with the public references actually used.
- **Broken archive navigation:** all relative Markdown links must resolve from a clean clone.
- **Overstated process metrics:** time observations must remain approximate and descriptive, not converted into performance ratios.
- **Framework overclaim:** cross-case synthesis must preserve uncertainty, boundaries, and narrowed mechanisms rather than presenting a universal employer-brand playbook.

---

## File Structure and Responsibilities

Create the new repository with this structure:

```text
README.md
PROJECT_TIMELINE.md
METHOD_EVOLUTION.md
.gitignore

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

scripts/
  verify_public_archive.py

tests/
  test_verify_public_archive.py
```

Local-only staging files live under `.tmp/` and are gitignored:

```text
.tmp/source-map.json
.tmp/evidence-ledger.md
.tmp/redaction-patterns.txt
```

`evidence-ledger.md` maps each candidate public claim to: private source, public external source if available, publication status, and notes about abstraction/redaction. It is never committed.

---

### Task 1: Scaffold the public archive and its verification gate

**Files:**
- Create: new local repository `candidate-information-research/`
- Create: `.gitignore`
- Create: `scripts/verify_public_archive.py`
- Create: `tests/test_verify_public_archive.py`
- Create: empty directory structure above using placeholder `.gitkeep` only where Git requires it

**Interfaces:**
- `verify_public_archive.py --root <repo> [--redaction-file <path>]` returns exit code `0` only when required files exist, relative Markdown links resolve, no `TODO`/`TBD`/`REPLACE_ME` placeholders remain, and no supplied redaction pattern occurs in tracked text files.
- `.tmp/` is ignored and may contain confidential local evidence maps.

- [ ] **Step 1: Initialize the repository locally**

```bash
mkdir candidate-information-research
cd candidate-information-research
git init -b main
mkdir -p research/01_smaller_high_impact_companies research/02_employer_brand_case_studies methods references scripts tests .tmp
printf '.tmp/\n__pycache__/\n' > .gitignore
```

- [ ] **Step 2: Write failing verifier tests**

Cover four cases in `tests/test_verify_public_archive.py`: missing required file fails, broken relative Markdown link fails, placeholder token fails, supplied redaction-pattern match fails.

- [ ] **Step 3: Run tests and confirm failure**

Run: `python3 -m unittest tests/test_verify_public_archive.py -v`
Expected: FAIL because `scripts.verify_public_archive` does not exist.

- [ ] **Step 4: Implement the verifier**

Implement `main(argv: list[str] | None = None) -> int` plus focused helpers for required-path checks, Markdown relative-link checks, placeholder checks, and optional redaction-pattern checks. Use only Python standard library.

- [ ] **Step 5: Run tests and confirm pass**

Run: `python3 -m unittest tests/test_verify_public_archive.py -v`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add .gitignore scripts tests
git commit -m "chore: scaffold public research archive"
```

---

### Task 2: Build the private evidence ledger before writing public prose

**Files:**
- Create locally only: `.tmp/source-map.json`
- Create locally only: `.tmp/evidence-ledger.md`
- Create locally only: `.tmp/redaction-patterns.txt`

**Interfaces:**
- `source-map.json` records resolved local paths for the earlier smaller-company research, five employer-brand case materials, baseline/evaluation data, and the private method/harness artifacts needed only for verification.
- `evidence-ledger.md` has one row per intended public claim with columns: `Public claim`, `Private source`, `Public source`, `Epistemic status`, `Publish?`, `Redaction note`.

- [ ] **Step 1: Locate source material on the local machine**

Search by known project/repository titles rather than assuming directory paths. At minimum resolve the local sources corresponding to: `small-high-impact-companies`, the five employer-brand case studies, the baseline/evaluation files, the content-skill iteration records, and the research-harness records.

- [ ] **Step 2: Create `.tmp/redaction-patterns.txt`**

Populate it locally with employer-specific identifiers, employee identifiers, private file labels, and any other strings that must not appear publicly. Do not commit this file.

- [ ] **Step 3: Create the evidence ledger**

Record the public-safe claims needed by the spec, including the confirmed process timings and the exact public sources behind external-company claims.

- [ ] **Step 4: Verify `.tmp/` is untracked**

Run: `git status --short --ignored .tmp`
Expected: `.tmp/` entries show as ignored and none are staged.

- [ ] **Step 5: Commit nothing for this task**

This task intentionally produces only local staging evidence. Proceed only after the ledger is complete enough to support Tasks 3–5.

---

### Task 3: Publish the smaller-high-impact-company research as a bounded public synthesis

**Files:**
- Create: `research/01_smaller_high_impact_companies/README.md`
- Create: `research/01_smaller_high_impact_companies/public_synthesis.md`
- Create: `research/01_smaller_high_impact_companies/sources.md`

**Interfaces:**
- `README.md` explains the research question, design (`28 → 12 → six deep dives + two counterexamples`), and limits.
- `public_synthesis.md` contains only public-source mechanisms and boundaries; it must state that smallness itself is not an advantage and avoid employer-specific recommendations.
- `sources.md` preserves the public references used for the six deep dives and two counterexamples.

- [ ] **Step 1: Draft the three files from the evidence ledger**

Keep the six deep dives and two counterexamples identifiable only where they were already part of public-source research. Do not import private employer discussion from later work.

- [ ] **Step 2: Run the archive verifier with redaction patterns**

Run: `python3 scripts/verify_public_archive.py --root . --redaction-file .tmp/redaction-patterns.txt`
Expected: it may still fail on missing later required files; it must report **no redaction-pattern hit and no broken links inside this research section**.

- [ ] **Step 3: Manually inspect public-source traceability**

Every material external claim in `public_synthesis.md` must be traceable to `sources.md`.

- [ ] **Step 4: Commit**

```bash
git add research/01_smaller_high_impact_companies
git commit -m "docs: publish smaller-company research synthesis"
```

---

### Task 4: Publish five independent employer-brand case summaries and the cross-case synthesis

**Files:**
- Create: `research/02_employer_brand_case_studies/README.md`
- Create: `research/02_employer_brand_case_studies/01_optiver.md`
- Create: `research/02_employer_brand_case_studies/02_two_sigma.md`
- Create: `research/02_employer_brand_case_studies/03_citadel_securities.md`
- Create: `research/02_employer_brand_case_studies/04_canva.md`
- Create: `research/02_employer_brand_case_studies/05_gitlab.md`
- Create: `research/02_employer_brand_case_studies/cross_case_synthesis.md`
- Create: `research/02_employer_brand_case_studies/sources.md`

**Interfaces:**
- Each case file uses the same light reading contract: `Why this case`, `Candidate decision context`, `Observed behavior`, `Evidence`, `What this case supports`, `What it does not prove`, `Contribution to synthesis`, `Sources`.
- `cross_case_synthesis.md` organizes stable mechanisms, narrowed mechanisms, rejected/unsupported propositions, and boundary conditions; cases are evidence, not repeated summaries.

- [ ] **Step 1: Draft all five case files independently**

Do not back-edit the cases into one identical narrative. Preserve differences in candidate context and public evidence.

- [ ] **Step 2: Draft the synthesis**

Include the working chain `Candidate Friction → Evidence Need → Organisational Evidence → Evidence Interface → Answer Legibility → Reality / Governance Check`, labeled explicitly as a working model.

- [ ] **Step 3: Preserve narrowed and rejected mechanisms**

At minimum distinguish stable mechanisms from context-sensitive ideas such as Talent Translation, and retain the representativeness boundary (`capability exists ≠ everyone experiences it`, etc.) in paraphrased public-safe form.

- [ ] **Step 4: Run verifier and inspect all source links**

Run: `python3 scripts/verify_public_archive.py --root . --redaction-file .tmp/redaction-patterns.txt`
Expected: no redaction hit or broken relative link in the case-study section.

- [ ] **Step 5: Commit**

```bash
git add research/02_employer_brand_case_studies
git commit -m "docs: publish employer-brand case research"
```

---

### Task 5: Publish method evolution, timeline, and evidence-backed evaluation observations

**Files:**
- Create: `PROJECT_TIMELINE.md`
- Create: `METHOD_EVOLUTION.md`
- Create: `methods/golden_samples_to_reusable_system.md`
- Create: `methods/manual_cases_to_research_harness.md`
- Create: `methods/evaluation_design.md`
- Create: `references/bibliography.md`
- Create: `references/external_links.md`

**Interfaces:**
- `PROJECT_TIMELINE.md` follows problem reframing, not a task dump: GEO → source-of-truth → positioning → organizational reality → information gap → query → candidate decision context.
- `METHOD_EVOLUTION.md` shows the two systemization loops without publishing internal skills or harness code.
- `evaluation_design.md` contains the public rationale for baseline/evaluation plus exactly 2–3 representative findings retrieved from local original data; raw data and private file paths remain absent.

- [ ] **Step 1: Extract baseline findings from original local data**

Use the private evidence ledger. Select 2–3 findings that are both representative and safe to publish. Record the private source path only in `.tmp/evidence-ledger.md`, never in the committed file.

- [ ] **Step 2: Write the method-evolution files**

Use the confirmed approximate timings exactly as bounded by Global Constraints. Emphasize `manual judgment → explicit reusable process` and `manual case research → reusable parallel research protocol`.

- [ ] **Step 3: Write the project timeline**

Each stage must state: prior question, new evidence/problem, resulting reframing. Avoid “lesson learned” listicle style.

- [ ] **Step 4: Consolidate public references**

`bibliography.md` is for papers/research; `external_links.md` is for public company pages, repositories, or other web evidence.

- [ ] **Step 5: Run verifier**

Run: `python3 scripts/verify_public_archive.py --root . --redaction-file .tmp/redaction-patterns.txt`
Expected: only `README.md` may remain missing at this point; no redaction, placeholder, or relative-link failures.

- [ ] **Step 6: Commit**

```bash
git add PROJECT_TIMELINE.md METHOD_EVOLUTION.md methods references
git commit -m "docs: publish project and method evolution"
```

---

### Task 6: Finish the archive README, run the publication gate, and publish the repository

**Files:**
- Create: `README.md`
- Modify only if needed after verification: any public archive Markdown file

**Interfaces:**
- `README.md` provides project scope, research boundary, two reading paths (`quick synthesis` and `trace the evidence`), repository map, current status, and link back to `gabrielchen.me` once the website route exists.

- [ ] **Step 1: Write `README.md`**

Lead with the bounded research question: reducing information asymmetry for candidate decisions, not explaining why people choose companies.

- [ ] **Step 2: Run full unit tests for the verifier**

Run: `python3 -m unittest tests/test_verify_public_archive.py -v`
Expected: PASS.

- [ ] **Step 3: Run the full publication gate**

Run: `python3 scripts/verify_public_archive.py --root . --redaction-file .tmp/redaction-patterns.txt`
Expected: PASS with zero missing required files, zero broken relative links, zero placeholders, zero redaction-pattern matches.

- [ ] **Step 4: Review the staged diff manually**

Run: `git diff --cached --check` after staging. Search for accidental private paths, copied interview text, executable internal skill content, private HTML fragments, and unbounded causal claims.

- [ ] **Step 5: Commit final archive entry point**

```bash
git add README.md
git commit -m "docs: complete public research archive"
```

- [ ] **Step 6: Create the public GitHub repository and push**

```bash
gh repo create gabriel232ch/candidate-information-research --public --source . --remote origin --push
```

Expected: repository exists publicly and `main` points to the verified local commit.

- [ ] **Step 7: Verify from a clean clone**

Clone the public repo into a temporary directory and run `python3 scripts/verify_public_archive.py --root .` without the private redaction file. Confirm all links and required files still pass from the public clone.

---

## Final Verification

Run from the final public archive checkout:

```bash
python3 -m unittest tests/test_verify_public_archive.py -v
python3 scripts/verify_public_archive.py --root .
git status --short
```

Expected:

- tests PASS;
- archive verification PASS;
- working tree clean;
- no `.tmp/` file is tracked;
- the repository is public and readable without private dependencies.

The website implementation plan may begin only after the archive URL is stable, because the site will link to this repository as its evidence layer.
