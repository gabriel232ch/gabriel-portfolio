# Repository workflow

The authoritative baseline is always the latest `origin/main`. Production
(`https://gabrielchen.me`) is published exclusively by merging reviewed pull
requests into `main`, which triggers Cloudflare Workers Builds automatically.

For each new change:

1. Fetch the latest `origin/main` and create a short-lived feature branch from
   it. Never start new work from an old branch or stale worktree.
2. Preserve all approved, published projects. Keep their case pages, supporting
   data, Olist research CSVs, and homepage content intact.
3. Run `npm run verify:ci` (and `npm run test:e2e` on macOS when changing UI or
   visuals). Produce and verify a concrete preview via branch push (Cloudflare
   Workers Builds preview) or `npm run deploy:preview`.
4. Obtain the user's preview confirmation, ensure the PR branch is up to date
   with `origin/main` and GitHub Actions `verify` CI is green, then merge the PR
   into `main`.
5. Never deploy production directly from a local branch or worktree. Wait for
   Cloudflare Workers Builds to deploy `main`, then verify the live site and
   confirm `/api/portfolio.json` reports the merged `build.commit`.

Historical references are preserved as immutable Git tags (`release/*`,
`archive/*`), not lingering branches or worktrees. Delete merged feature
branches and remove temporary worktrees once work is landed. Never restore an
old branch, tag, or preview over the live website.

Preserve the existing Olist research files. Source data, arithmetic
decompositions, observational associations, rule-based candidates, and
implemented business outcomes must remain distinct. Do not redistribute raw
orders, identifiers, or review text in public assets.
