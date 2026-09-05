# Phase 2 Execution Workflow

**Date:** 2026-09-05  
**Status:** Active

## Decision

Phase 2 implementation is owned by Codex as the primary engineering executor.

Gabriel + ChatGPT are the human product/design review layer. They do not re-run or duplicate Codex's technical verification when Codex has already completed the required checks successfully.

## Ownership

### Codex owns

- repository inspection and local working-tree checks;
- implementation from the approved Phase 2 spec and implementation plan;
- TDD and task-level automated verification;
- `npm run verify` and any targeted test runs required by the plan;
- technical self-review;
- commits, pushes, branch management, preview deployment, merge and production verification when authorized by the plan;
- reporting concrete failures, source gaps, scope conflicts, or unexpected repository reality.

### Gabriel + ChatGPT own

- visual and product judgment on actual browser previews;
- subjective review of hierarchy, composition, motion, responsive behavior and overall editorial quality;
- explicit Phase 2 acceptance;
- decisions when Codex reports a real blocker, source gap, failed verification, or scope/requirement conflict.

## No duplicate verification

When Codex reports that required automated verification has passed, ChatGPT does not independently repeat the same tests, Git checks, or repository validation solely for reassurance.

Human review should rely on Codex's concise verification evidence unless one of these conditions is present:

- a required test failed or was skipped unexpectedly;
- Codex reports uncertainty or incomplete coverage;
- repository reality differs from the approved plan;
- source material cannot be verified;
- a change crosses the approved Phase 2 scope;
- the browser outcome indicates a defect that automated tests did not catch.

## Review cadence

Codex may proceed through non-visual engineering steps and internal verification without pausing for Gabriel.

For visual work, Codex should stop only when a meaningful browser result is ready for human judgment. The preferred review package is concise:

```text
AUTOMATED
PASS
<relevant test/verify summary>

PREVIEW
<localhost or Cloudflare preview URL>

REVIEW TARGET
<what changed and what subjective decision is needed>
```

Gabriel reviews the actual page. ChatGPT may help critique the visual/product outcome. Neither Gabriel nor ChatGPT needs to repeat Codex's technical validation.

If a visual state is approved, Codex may perform final verification, commit, push and continue according to the implementation plan without asking for a second technical confirmation.

## Governing documents

- Design spec: `docs/superpowers/specs/2026-09-05-gabriel-portfolio-phase-2-home-v1-design.md`
- Implementation plan: `docs/superpowers/plans/2026-09-05-gabriel-portfolio-phase-2-home-v1-implementation-plan.md`

This workflow decision changes execution ownership and review cadence only. It does not alter the approved Home v1 design, technical scope, evidence rules, accessibility requirements, or quality gates.