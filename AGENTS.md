# Repository workflow

The authoritative baseline is the latest `origin/main`. On 2026-10-08 the
approved baseline was `38bbab7`, containing the published Chanel case and the
complete Smaller Companies Inquiry. That SHA is a historical reference, not
a permanently pinned starting point.

For each new change:

1. Fetch the latest `origin/main` and create the modification branch from it.
2. Preserve other approved, published projects. Check their case pages,
   supporting data, and homepage content before completing the change.
3. Produce and verify a concrete preview. Obtain the user's preview
   confirmation, then merge through a pull request into `main`.
4. Build the resulting approved `main`, verify that it matches the reviewed
   preview, publish that main build, and verify the live website.

Continue an existing change on its associated branch/PR; reconcile with newer
main changes before merging. Keep historical branches and previews as
references. Never restore an old branch or preview over the live website.

Preserve the existing Olist research files. Source data, arithmetic
decompositions, observational associations, rule-based candidates, and
implemented business outcomes must remain distinct. Do not redistribute raw
orders, identifiers, or review text in public assets.
