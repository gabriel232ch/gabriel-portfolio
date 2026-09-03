# Gabriel Portfolio Phase 0–1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the production-ready Astro/Cloudflare foundation and implement the approved Editorial Intelligence design system, ending with a reviewed visual system that is ready—but not yet used—to build Home v1.

**Architecture:** Build a static-first Astro site in a single Git repository, deploy static assets through Cloudflare Workers, and use Git branches for preview deployments. Phase 0 establishes infrastructure, tests, content contracts, and the Living Index registry; Phase 1 establishes design tokens, typography, editorial primitives, theme behavior, and motion grammar. No Home v1, flagship case study, D3, GSAP, Three.js, CMS, database, or AI publishing automation is implemented in this plan.

**Tech Stack:** Astro 6+, TypeScript strict mode, Markdown/MDX, Astro Content Collections, modern CSS, Cloudflare Workers Static Assets, Wrangler, Vitest, Playwright, ESLint + eslint-plugin-astro, Fontsource.

**Spec:** `docs/superpowers/specs/2026-08-31-gabriel-portfolio-design.md`

## Global Constraints

- **Launch before automation.**
- **One flagship before many projects.**
- **Typography and information design before WebGL.**
- **Every milestone must leave a complete, usable website.**
- Use Astro with Markdown/MDX and Astro Content Collections.
- GitHub repository is the only final source of truth.
- Human-approved decision records and review outcomes supersede earlier exploratory assumptions; reconcile this plan and the design spec before dependent work continues.
- Hosting foundation is Cloudflare Workers, static-first.
- V1 has no database, login, headless CMS, full SSR, custom backend, R2 infrastructure, site-wide WebGL, automatic public publishing, or automatic Phase creation.
- Desktop grid is 12 columns; tablet is 6; mobile is 4.
- Light is the default world; Dark is a separate art direction, not a simple inversion.
- Accessibility requires semantic HTML, keyboard navigation, mobile touch support, adequate contrast, reduced-motion support, and critical-information fallback when JavaScript is absent.
- Persistent identity concepts are `G.xxx` Living Index IDs and `PH.xx` Phase IDs; drafts do not receive permanent `G.xxx` IDs.
- Human-readable URLs remain independent of Living Index IDs.
- Do not modify or delete the existing Hugo experiment at `~/mysite`; the Astro portfolio is a new project.
- Execute one task at a time. Do not start the next task until the current task passes its tests, has been reviewed, and is committed.
- If any expected verification result differs from this plan, stop and investigate before continuing. Do not stack speculative fixes.

---

# Stage Map and Hard Review Gates

This specification covers several independent subsystems. To preserve quality, **only Phase 0 and Phase 1 are executable in this plan**. Later phases receive their own implementation plans after the preceding review gate passes against real code and real content.

| Stage | Scope | Exit gate | Next plan only after gate |
|---|---|---|---|
| **Phase 0** | Astro, testing, GitHub, Cloudflare Workers, `gabrielchen.me`, content contracts, Living Index registry | A commit on a non-main branch produces a preview URL; merge to `main` deploys to `gabrielchen.me`; all checks pass | Phase 1 continues in this plan |
| **Phase 1** | Tokens, Light/Dark, grid, typography, editorial primitives, motion grammar, visual regression | Human visual review explicitly approves the implemented design system on desktop + mobile + Light + Dark + reduced motion | Write **Phase 2 Home v1 plan** |
| **Phase 2** | Home v1 using the three approved real projects | Home is visually approved before flagship work begins | Write **Phase 3 Flagship plan** |
| **Phase 3** | Luxury Handbag flagship Experience + Reading Mode; first GSAP/D3 scene | Flagship is content-accurate, performant, accessible, and visually approved | Write **Phase 4 Launch plan** |
| **Phase 4** | Work index, two simpler work pages, Now, About, Index, quiet Archive, production polish | Formal V1 Definition of Done | V1 launch; then separate V1.5 plans |

**Non-negotiable stop rule:** after Task 10, stop. Do not “keep going” into Home because momentum feels good. Phase 2 is replanned from the actual Phase 1 codebase and the actual three source projects.

---

# File Structure Locked by This Plan

The Phase 0–1 implementation should end with the following responsibility boundaries:

```text
gabriel-portfolio/
├── .github/
│   └── pull_request_template.md
├── docs/
│   ├── decisions/
│   │   ├── phase-0-foundation-review.md
│   │   └── phase-1-design-system-review.md
│   └── superpowers/
│       ├── specs/
│       │   └── 2026-08-31-gabriel-portfolio-design.md
│       └── plans/
│           └── 2026-08-31-gabriel-portfolio-phase-0-1-implementation-plan.md
├── public/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── editorial/
│   │   │   ├── EditorialRule.astro
│   │   │   ├── FolioNumber.astro
│   │   │   ├── GIndex.astro
│   │   │   ├── ImagePlate.astro
│   │   │   ├── Marginalia.astro
│   │   │   ├── PhaseMarker.astro
│   │   │   └── SectionLabel.astro
│   │   └── system/
│   │       └── ThemeToggle.astro
│   ├── content/
│   │   ├── phases/
│   │   │   └── .gitkeep
│   │   └── work/
│   │       └── .gitkeep
│   ├── data/
│   │   └── living-index.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   ├── content/
│   │   │   ├── ids.ts
│   │   │   └── registry.ts
│   │   └── theme.ts
│   ├── pages/
│   │   ├── 404.astro
│   │   ├── index.astro
│   │   └── lab/
│   │       ├── design-system.astro
│   │       └── typography.astro
│   ├── styles/
│   │   ├── global.css
│   │   ├── grid.css
│   │   ├── motion.css
│   │   ├── tokens.css
│   │   └── typography.css
│   └── content.config.ts
├── tests/
│   ├── e2e/
│   │   ├── foundation.spec.ts
│   │   ├── design-system.spec.ts
│   │   ├── motion.spec.ts
│   │   ├── theme.spec.ts
│   │   └── typography.spec.ts
│   └── unit/
│       ├── ids.test.ts
│       ├── registry.test.ts
│       └── theme.test.ts
├── astro.config.mjs
├── eslint.config.js
├── package-lock.json
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── vitest.config.ts
└── wrangler.jsonc
```

**Boundary rules:**

- `src/content/` owns public editorial content only.
- `src/data/` owns system registries/data, not prose.
- `src/lib/` owns pure logic; visual components must not duplicate it.
- `src/components/` owns visual language; no raw project-specific data belongs there.
- `src/pages/lab/` is unlinked and `noindex`; it is a deterministic visual QA surface, not a public navigation destination.

---

# PHASE 0 — FOUNDATION

## Task 1: Bootstrap the Astro Repository and Preserve the Approved Spec

**Files:**
- Create: `~/gabriel-portfolio/` repository
- Create: `astro.config.mjs`
- Create: `src/pages/index.astro`
- Create: `src/pages/404.astro`
- Create: `public/robots.txt`
- Copy: `docs/superpowers/specs/2026-08-31-gabriel-portfolio-design.md`
- Copy: `docs/superpowers/plans/2026-08-31-gabriel-portfolio-phase-0-1-implementation-plan.md`

**Interfaces:**
- Consumes: approved design spec.
- Produces: a strict-TypeScript Astro repository with MDX enabled and a deterministic static build.

- [ ] **Step 1: Run environment preflight and stop on an unsuitable Node version**

Run:

```bash
cd ~
node --version
npm --version
git --version
```

Expected:
- `node` exists and major version is **24 or newer**.
- `npm` and `git` exist.

If Node is missing or below 24, **stop this task** and resolve the Node environment as a separate environment issue. Do not bundle Node installation experiments into the website scaffold.

- [ ] **Step 2: Create the Astro project interactively with the exact choices below**

Run:

```bash
cd ~
npm create astro@latest gabriel-portfolio
```

Choose:

```text
Template: A basic, minimal starter
Install dependencies: Yes
Initialize a new git repository: Yes
TypeScript: Strict
```

Then:

```bash
cd ~/gabriel-portfolio
npx astro add mdx
```

Accept the MDX integration changes.

- [ ] **Step 3: Replace `astro.config.mjs` with the static production contract**

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://gabrielchen.me',
  output: 'static',
  integrations: [mdx()],
});
```

- [ ] **Step 4: Replace `src/pages/index.astro` with the minimal Phase 0 foundation page**

```astro
---
const title = 'Gabriel Chen';
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="robots" content="noindex" />
    <title>{title}</title>
  </head>
  <body>
    <main>
      <h1>Gabriel Chen</h1>
      <p>Portfolio foundation in progress.</p>
    </main>
  </body>
</html>
```

The `noindex` meta is intentional until the V1 launch plan removes it.

- [ ] **Step 5: Create a deterministic 404 page**

Create `src/pages/404.astro`:

```astro
---
Astro.response.status = 404;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="robots" content="noindex" />
    <title>Not Found — Gabriel Chen</title>
  </head>
  <body>
    <main>
      <p>404</p>
      <h1>This page does not exist.</h1>
      <a href="/">Return home</a>
    </main>
  </body>
</html>
```

- [ ] **Step 6: Keep search engines out during construction**

Create `public/robots.txt`:

```text
User-agent: *
Disallow: /
```

The V1 launch plan—not this plan—replaces this file.

- [ ] **Step 7: Copy the approved spec and this plan into the repository**

```bash
mkdir -p docs/superpowers/specs docs/superpowers/plans
cp ~/Downloads/2026-08-31-gabriel-portfolio-design.md \
  docs/superpowers/specs/2026-08-31-gabriel-portfolio-design.md
cp ~/Downloads/2026-08-31-gabriel-portfolio-phase-0-1-implementation-plan.md \
  docs/superpowers/plans/2026-08-31-gabriel-portfolio-phase-0-1-implementation-plan.md
```

Before Task 1 begins, download the two approved artifacts into `~/Downloads/` using exactly the filenames shown above; then the copy commands are deterministic.

- [ ] **Step 8: Verify the clean static build**

Run:

```bash
npm run build
```

Expected:

```text
Result: success
Output directory: dist/
No server adapter added
```

- [ ] **Step 9: Commit the foundation**

```bash
git add .
git commit -m "chore: bootstrap Gabriel portfolio foundation"
```

**Review gate:** inspect `git status` and `git show --stat --oneline HEAD`. Do not continue if generated junk, the Hugo experiment, or unrelated user files entered the commit.

---

## Task 2: Add Quality Gates Before Design Work

**Files:**
- Modify: `package.json`
- Create: `eslint.config.js`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `tests/e2e/foundation.spec.ts`
- Create: `.github/pull_request_template.md`

**Interfaces:**
- Consumes: Astro app from Task 1.
- Produces: `npm run verify`, which becomes the mandatory local gate for every later task.

- [ ] **Step 1: Install test, type-check, lint, and browser-test dependencies**

Run:

```bash
npm install --save-dev \
  @astrojs/check \
  @playwright/test \
  eslint \
  eslint-plugin-astro \
  typescript \
  typescript-eslint \
  vitest

npx playwright install chromium
```

- [ ] **Step 2: Add exact scripts to `package.json`**

Keep Astro's existing dependencies and replace/add the `scripts` object with:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "lint": "eslint \"src/**/*.{astro,js,ts}\" \"tests/**/*.ts\" *.js *.ts",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:update": "playwright test --update-snapshots",
    "verify": "npm run check && npm run lint && npm run test && npm run build && npm run test:e2e"
  }
}
```

- [ ] **Step 3: Configure ESLint for Astro and TypeScript**

Create `eslint.config.js`:

```js
import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
];
```

- [ ] **Step 4: Configure Vitest for pure TypeScript unit tests**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 5: Configure Playwright with a deterministic local Astro server**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 6: Write the first failing E2E contract**

Create `tests/e2e/foundation.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('foundation page exposes the intended temporary construction state', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Gabriel Chen');
  await expect(page.getByRole('heading', { name: 'Gabriel Chen' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});

test('unknown routes return the custom 404', async ({ page }) => {
  const response = await page.goto('/this-route-must-not-exist');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'This page does not exist.' })).toBeVisible();
});
```

- [ ] **Step 7: Run the E2E test and resolve only real discrepancies**

Run:

```bash
npm run test:e2e
```

Expected: both tests pass on desktop and mobile projects.

If the 404 status behavior differs under Astro dev, verify the behavior under `npm run build && npm run preview` before changing the test. Do not weaken the test to `200` simply to make it green.

- [ ] **Step 8: Add a PR review template that forces the project quality gates**

Create `.github/pull_request_template.md`:

```markdown
## Scope

- [ ] This PR implements one reviewed task only.
- [ ] No unrelated refactor or scope expansion is included.

## Verification

- [ ] `npm run verify` passes.
- [ ] Desktop checked.
- [ ] Mobile checked.
- [ ] Light checked when visual changes apply.
- [ ] Dark checked when visual changes apply.
- [ ] Reduced motion checked when motion changes apply.

## Visual review

Describe what changed and attach the preview URL for visual work.

## Scope guard

List anything tempting that was deliberately deferred.
```

- [ ] **Step 9: Run the complete verification command**

```bash
npm run verify
```

Expected: `check`, `lint`, `test`, `build`, and E2E all pass.

- [ ] **Step 10: Commit the quality harness**

```bash
git add package.json package-lock.json eslint.config.js vitest.config.ts playwright.config.ts tests .github
git commit -m "test: establish portfolio quality gates"
```

**Review gate:** `npm run verify` must remain the single command a reviewer can use to reject or accept later implementation tasks.

---

## Task 3: Establish GitHub → Cloudflare Workers Preview/Production Delivery

**Files:**
- Create: `wrangler.jsonc`
- Modify: `package.json`
- GitHub: create `gabriel232ch/gabriel-portfolio`
- Cloudflare: create Worker from Git repository and enable branch previews

**Interfaces:**
- Consumes: verified static `dist/` from Task 2.
- Produces: production Worker deployment, non-main branch preview URLs, and GitHub as remote source of truth.

- [ ] **Step 1: Write the static-only Wrangler configuration before touching DNS**

Create `wrangler.jsonc`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "gabriel-portfolio",
  "compatibility_date": "2026-08-31",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

Do not add a `main` field and do not add `@astrojs/cloudflare`. The site is static in this phase.

- [ ] **Step 2: Install Wrangler and add explicit deploy commands**

```bash
npm install --save-dev wrangler
```

Add these scripts to `package.json`:

```json
{
  "deploy": "npm run build && wrangler deploy",
  "deploy:preview": "npm run build && wrangler versions upload"
}
```

- [ ] **Step 3: Verify Wrangler can package the static site locally**

Run:

```bash
npm run build
npx wrangler deploy --dry-run
```

Expected:
- static assets are discovered from `./dist`;
- no Worker entry script is required;
- no SSR adapter is generated.

- [ ] **Step 4: Create the GitHub repository and push the existing `main` history**

First check GitHub CLI status:

```bash
gh auth status
```

If authenticated, run:

```bash
gh repo create gabriel232ch/gabriel-portfolio \
  --public \
  --source=. \
  --remote=origin \
  --push
```

If `gh` is unavailable or unauthenticated, create the empty public repository `gabriel232ch/gabriel-portfolio` in GitHub without README/license/gitignore, then run:

```bash
git remote add origin git@github.com:gabriel232ch/gabriel-portfolio.git
git push -u origin main
```

Expected: remote repository contains exactly the two reviewed commits from Tasks 1–2 plus the uncommitted Wrangler work.

- [ ] **Step 5: Create a local Cloudflare deployment to `workers.dev` before changing `gabrielchen.me`**

Authenticate:

```bash
npx wrangler login
```

Then:

```bash
npm run deploy
```

Expected: Cloudflare prints a `*.workers.dev` URL for `gabriel-portfolio`.

Open the URL and verify:
- foundation page renders;
- unknown URL returns custom 404;
- no domain cutover has happened yet.

- [ ] **Step 6: Connect the GitHub repository to Cloudflare Workers Builds**

In Cloudflare Dashboard:

```text
Workers & Pages
→ Create application / select existing gabriel-portfolio Worker
→ Settings
→ Builds
→ Connect repository
→ GitHub
→ gabriel232ch/gabriel-portfolio
```

Use:

```text
Production branch: main
Build command: npm run build
Production deploy command: npx wrangler deploy
Non-production branch builds: Enabled
Non-production deploy command: npx wrangler versions upload
```

Cloudflare's current Workers Builds behavior uses production deploys for `main` and preview-version uploads for non-production branches.

- [ ] **Step 7: Test branch preview behavior before domain cutover**

Create a branch:

```bash
git switch -c chore/preview-pipeline-test
printf '\n<!-- preview pipeline test -->\n' >> src/pages/index.astro
git add src/pages/index.astro
git commit -m "chore: verify Cloudflare branch preview"
git push -u origin chore/preview-pipeline-test
```

Expected:
- Cloudflare runs a non-production build;
- a stable branch preview URL is produced;
- production Worker remains unchanged.

After verifying preview behavior, remove the test comment in a new commit on the same branch:

```bash
git checkout -- src/pages/index.astro
```

If the command does not remove the committed line because it is already part of `HEAD`, edit the exact comment out, then:

```bash
git add src/pages/index.astro
git commit -m "chore: remove preview pipeline marker"
git push
```

Open the same branch preview URL and verify it updates.

- [ ] **Step 8: Merge only after preview verification**

Create the PR, verify `npm run verify`, review the Cloudflare preview, then merge to `main`.

Expected: merge triggers a production deployment to the Workers `workers.dev` URL.

- [ ] **Step 9: Commit Wrangler configuration before any DNS changes**

On `main`:

```bash
git pull --ff-only
npm run verify
git add wrangler.jsonc package.json package-lock.json
git commit -m "chore: configure Cloudflare Workers static deployment"
git push
```

**Review gate:** do not touch Namecheap until the Workers production URL is confirmed correct.

---

## Task 4: Move `gabrielchen.me` DNS to Cloudflare and Attach the Worker Safely

**Files:**
- Modify: `wrangler.jsonc`
- Create: `docs/decisions/phase-0-foundation-review.md` later in Task 5
- External control planes: Namecheap DNS + Cloudflare zone

**Interfaces:**
- Consumes: verified production Worker from Task 3.
- Produces: `https://gabrielchen.me` served by the Astro/Workers foundation with Cloudflare managing DNS and certificates.

- [ ] **Step 1: Record the existing Namecheap/GitHub Pages DNS state before changing it**

In Namecheap:

```text
Domain List
→ gabrielchen.me
→ Manage
→ Advanced DNS
```

Save a screenshot or written record of all `@` and `www` records and current nameserver mode. This is the rollback record.

- [ ] **Step 2: Add `gabrielchen.me` to Cloudflare without deleting the existing records yet**

In Cloudflare:

```text
Add a domain
→ gabrielchen.me
→ Free plan
```

Let Cloudflare scan/import DNS records. Confirm the imported records match the Namecheap record from Step 1 before continuing.

- [ ] **Step 3: Switch Namecheap nameservers to the two exact Cloudflare nameservers assigned to this zone**

In Namecheap:

```text
Domain List
→ gabrielchen.me
→ Manage
→ Nameservers
→ Custom DNS
```

Enter the two nameservers Cloudflare assigned to the zone and save.

Expected: Cloudflare eventually reports the zone as **Active**. Do not continue to Worker custom-domain attachment while the zone is Pending.

- [ ] **Step 4: Remove only the old GitHub Pages origin records after the Cloudflare zone is Active**

In Cloudflare DNS, identify the `@`/`www` records that point to GitHub Pages from the earlier Namecheap Student setup. Remove those origin records only after the `workers.dev` production URL has already been verified.

Do not delete unrelated verification, email, or domain ownership records.

- [ ] **Step 5: Add only the apex custom domain to `wrangler.jsonc`**

Modify `wrangler.jsonc` to:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "gabriel-portfolio",
  "compatibility_date": "2026-08-31",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  },
  "routes": [
    {
      "pattern": "gabrielchen.me",
      "custom_domain": true
    }
  ]
}
```

- [ ] **Step 6: Deploy and verify the apex custom domain**

```bash
npm run verify
npm run deploy
```

Expected:

```text
https://gabrielchen.me/ → 200 and the construction page
https://gabrielchen.me/this-route-must-not-exist → 404
TLS certificate valid
```

- [ ] **Step 7: Configure `www.gabrielchen.me` as a redirect to the apex, not duplicate content**

In Cloudflare DNS, create the proxied placeholder record needed for the redirect:

```text
Type: A
Name: www
IPv4: 192.0.2.0
Proxy: Proxied
```

Then create a Cloudflare Redirect Rule:

```text
If hostname equals www.gabrielchen.me
Then dynamic redirect to https://gabrielchen.me${uri.path}
Status: 301
Preserve query string: Yes
```

Verify:

```bash
curl -I https://www.gabrielchen.me/
```

Expected: `301` to `https://gabrielchen.me/`.

- [ ] **Step 8: Commit the custom-domain configuration**

```bash
git add wrangler.jsonc
git commit -m "chore: attach gabrielchen.me to Cloudflare Worker"
git push
```

**Review gate:** both root domain and branch previews must work before content-model work starts.

---

## Task 5: Implement the Phase 0 Content Contract and Living Index Registry

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/work/.gitkeep`
- Create: `src/content/phases/.gitkeep`
- Create: `src/data/living-index.json`
- Create: `src/lib/content/ids.ts`
- Create: `src/lib/content/registry.ts`
- Create: `tests/unit/ids.test.ts`
- Create: `tests/unit/registry.test.ts`
- Create: `docs/decisions/phase-0-foundation-review.md`

**Interfaces:**
- Consumes: Astro Content Collections and verified deployment pipeline.
- Produces:
  - `formatLivingIndexId(value: number): string`
  - `isLivingIndexId(value: string): boolean`
  - `isPhaseId(value: string): boolean`
  - `validateLivingIndexRegistry(registry: LivingIndexRegistry): void`
  - Work and Phase schemas used by later plans.

- [ ] **Step 1: Write the ID unit tests before implementation**

Create `tests/unit/ids.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  formatLivingIndexId,
  isLivingIndexId,
  isPhaseId,
} from '../../src/lib/content/ids';

describe('Living Index and Phase IDs', () => {
  it('formats permanent Living Index coordinates with at least three digits', () => {
    expect(formatLivingIndexId(1)).toBe('G.001');
    expect(formatLivingIndexId(26)).toBe('G.026');
    expect(formatLivingIndexId(1000)).toBe('G.1000');
  });

  it('rejects invalid Living Index coordinates', () => {
    expect(isLivingIndexId('G.001')).toBe(true);
    expect(isLivingIndexId('G.DRAFT')).toBe(false);
    expect(isLivingIndexId('G.01')).toBe(false);
    expect(isLivingIndexId('26')).toBe(false);
  });

  it('validates Phase IDs independently from Living Index IDs', () => {
    expect(isPhaseId('PH.04')).toBe(true);
    expect(isPhaseId('PH.4')).toBe(false);
    expect(isPhaseId('G.004')).toBe(false);
  });
});
```

- [ ] **Step 2: Run the ID tests to verify the intended failure**

```bash
npm run test -- tests/unit/ids.test.ts
```

Expected: FAIL because `src/lib/content/ids.ts` does not exist.

- [ ] **Step 3: Implement the minimal ID module**

Create `src/lib/content/ids.ts`:

```ts
export const LIVING_INDEX_ID_PATTERN = /^G\.\d{3,}$/;
export const PHASE_ID_PATTERN = /^PH\.\d{2,}$/;

export function formatLivingIndexId(value: number): string {
  if (!Number.isInteger(value) || value < 1) {
    throw new RangeError('Living Index numbers must be positive integers.');
  }

  return `G.${String(value).padStart(3, '0')}`;
}

export function isLivingIndexId(value: string): boolean {
  return LIVING_INDEX_ID_PATTERN.test(value);
}

export function isPhaseId(value: string): boolean {
  return PHASE_ID_PATTERN.test(value);
}
```

- [ ] **Step 4: Run the ID tests and verify they pass**

```bash
npm run test -- tests/unit/ids.test.ts
```

Expected: PASS.

- [ ] **Step 5: Write registry tests before implementing registry validation**

Create `tests/unit/registry.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { validateLivingIndexRegistry } from '../../src/lib/content/registry';

const validRegistry = {
  nextNumber: 3,
  entries: [
    { id: 'G.001', collection: 'work', slug: 'one' },
    { id: 'G.002', collection: 'work', slug: 'two' },
  ],
} as const;

describe('Living Index registry', () => {
  it('accepts a monotonic registry with unique IDs and slugs', () => {
    expect(() => validateLivingIndexRegistry(validRegistry)).not.toThrow();
  });

  it('rejects duplicate permanent IDs', () => {
    expect(() =>
      validateLivingIndexRegistry({
        nextNumber: 3,
        entries: [
          { id: 'G.001', collection: 'work', slug: 'one' },
          { id: 'G.001', collection: 'work', slug: 'two' },
        ],
      }),
    ).toThrow(/duplicate Living Index ID/i);
  });

  it('rejects duplicate collection/slug coordinates', () => {
    expect(() =>
      validateLivingIndexRegistry({
        nextNumber: 3,
        entries: [
          { id: 'G.001', collection: 'work', slug: 'same' },
          { id: 'G.002', collection: 'work', slug: 'same' },
        ],
      }),
    ).toThrow(/duplicate collection\/slug/i);
  });

  it('requires nextNumber to be greater than every assigned number', () => {
    expect(() =>
      validateLivingIndexRegistry({
        nextNumber: 2,
        entries: [{ id: 'G.002', collection: 'work', slug: 'two' }],
      }),
    ).toThrow(/nextNumber/i);
  });
});
```

- [ ] **Step 6: Verify registry tests fail before implementation**

```bash
npm run test -- tests/unit/registry.test.ts
```

Expected: FAIL because `registry.ts` does not exist.

- [ ] **Step 7: Implement the registry validator**

Create `src/lib/content/registry.ts`:

```ts
import { isLivingIndexId } from './ids';

export type IndexedCollection = 'work' | 'research' | 'writing';

export interface LivingIndexEntry {
  id: string;
  collection: IndexedCollection;
  slug: string;
}

export interface LivingIndexRegistry {
  nextNumber: number;
  entries: ReadonlyArray<LivingIndexEntry>;
}

export function validateLivingIndexRegistry(registry: LivingIndexRegistry): void {
  const ids = new Set<string>();
  const coordinates = new Set<string>();
  let maxNumber = 0;

  for (const entry of registry.entries) {
    if (!isLivingIndexId(entry.id)) {
      throw new Error(`Invalid Living Index ID: ${entry.id}`);
    }

    if (ids.has(entry.id)) {
      throw new Error(`Duplicate Living Index ID: ${entry.id}`);
    }
    ids.add(entry.id);

    const coordinate = `${entry.collection}/${entry.slug}`;
    if (coordinates.has(coordinate)) {
      throw new Error(`Duplicate collection/slug coordinate: ${coordinate}`);
    }
    coordinates.add(coordinate);

    maxNumber = Math.max(maxNumber, Number(entry.id.slice(2)));
  }

  if (!Number.isInteger(registry.nextNumber) || registry.nextNumber < 1) {
    throw new Error('nextNumber must be a positive integer.');
  }

  if (registry.nextNumber <= maxNumber) {
    throw new Error('nextNumber must be greater than every assigned Living Index number.');
  }
}
```

- [ ] **Step 8: Seed an empty registry without allocating fake permanent IDs**

Create `src/data/living-index.json`:

```json
{
  "nextNumber": 1,
  "entries": []
}
```

Permanent IDs begin only when actual publication is approved in a later phase.

- [ ] **Step 9: Define strict Work and Phase collections**

Create `src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const livingIndexId = z.string().regex(/^G\.\d{3,}$/);
const phaseId = z.string().regex(/^PH\.\d{2,}$/);
const month = z.string().regex(/^\d{4}-\d{2}$/);

const publication = z.enum(['draft', 'review', 'published']);
const visibility = z.enum(['private', 'unlisted', 'public']);
const curation = z.enum(['normal', 'featured']);
const language = z.enum(['en', 'zh', 'mixed']);

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string().min(1),
      subtitle: z.string().optional(),
      summary: z.string().min(1),
      publication,
      visibility,
      curation,
      indexId: livingIndexId.optional(),
      language,
      status: z.enum(['completed', 'ongoing', 'archived']),
      phaseIds: z.array(phaseId).default([]),
      disciplines: z.array(z.string().min(1)).default([]),
      publishedAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      featuredOrder: z.number().int().positive().optional(),
      source: z
        .object({
          github: z.string().url().optional(),
          originalReport: z.string().optional(),
        })
        .default({}),
      visual: z
        .object({
          accent: z.string().optional(),
          mode: z.enum(['light', 'dark', 'adaptive']).default('adaptive'),
          motionLevel: z.enum(['quiet', 'featured', 'signature']).default('quiet'),
        })
        .default({}),
    })
    .superRefine((value, ctx) => {
      if (value.publication === 'published' && !value.indexId) {
        ctx.addIssue({
          code: 'custom',
          path: ['indexId'],
          message: 'Published work must have a permanent Living Index ID.',
        });
      }

      if (value.curation === 'featured' && value.visibility !== 'public') {
        ctx.addIssue({
          code: 'custom',
          path: ['curation'],
          message: 'Featured work must be public.',
        });
      }
    }),
});

const phases = defineCollection({
  loader: glob({ base: './src/content/phases', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    phaseId,
    title: z.string().min(1),
    summary: z.string().min(1),
    start: month,
    end: month.nullable().optional(),
    status: z.enum(['active', 'closed']),
    location: z.string().optional(),
  }),
});

export const collections = { work, phases };
```

Create empty directories:

```bash
mkdir -p src/content/work src/content/phases
touch src/content/work/.gitkeep src/content/phases/.gitkeep
```

- [ ] **Step 10: Run content contract verification**

```bash
npm run test
npm run check
npm run build
```

Expected: all pass with zero content entries and zero fake Living Index IDs.

- [ ] **Step 11: Record the Phase 0 review decision**

Create `docs/decisions/phase-0-foundation-review.md`:

```markdown
# Phase 0 Foundation Review

Date: 2026-08-31
Status: PASS

## Verified

- Astro builds statically.
- `npm run verify` is the mandatory quality gate.
- GitHub `main` is production source of truth.
- Non-production branches create Cloudflare preview versions.
- `gabrielchen.me` resolves through Cloudflare Workers.
- `www.gabrielchen.me` redirects permanently to the apex domain.
- Work and Phase schemas compile with zero fake content.
- Living Index registry begins empty at `nextNumber: 1`.

## Infrastructure freeze

No framework, hosting, CMS, database, SSR, or asset-infrastructure changes are authorized unless a later real requirement demonstrates that the current foundation is insufficient.
```

If any bullet is false, set Status to `FAIL`, list the exact discrepancy, and stop before Task 6.

- [ ] **Step 12: Run full verification and commit Phase 0**

```bash
npm run verify
git add src/content.config.ts src/content src/data src/lib/content tests/unit docs/decisions/phase-0-foundation-review.md
git commit -m "feat: define portfolio content and Living Index contracts"
git push
```

**PHASE 0 HARD GATE:** Human review must explicitly approve Phase 0 before Phase 1 begins.

---

# PHASE 1 — DESIGN SYSTEM IMPLEMENTATION

## Task 6: Implement Semantic Tokens, Grid, Base Layout, and Theme Behavior

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/grid.css`
- Create: `src/styles/global.css`
- Create: `src/styles/typography.css`
- Create: `src/lib/theme.ts`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/system/ThemeToggle.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/unit/theme.test.ts`
- Create: `tests/e2e/theme.spec.ts`

**Interfaces:**
- Consumes: static Astro foundation.
- Produces:
  - semantic CSS tokens used by all visual primitives;
  - `resolveTheme(storedTheme, prefersDark)`;
  - `BaseLayout` with FOUC-safe theme boot;
  - accessible ThemeToggle.

- [ ] **Step 1: Write the pure theme-resolution test first**

Create `tests/unit/theme.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { resolveTheme } from '../../src/lib/theme';

describe('resolveTheme', () => {
  it('honors an explicit stored theme', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });

  it('falls back to system preference when storage is absent or invalid', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme(null, false)).toBe('light');
    expect(resolveTheme('sepia', true)).toBe('dark');
  });
});
```

- [ ] **Step 2: Verify the theme unit test fails before implementation**

```bash
npm run test -- tests/unit/theme.test.ts
```

Expected: FAIL because `src/lib/theme.ts` does not exist.

- [ ] **Step 3: Implement the theme resolver**

Create `src/lib/theme.ts`:

```ts
export type Theme = 'light' | 'dark';

export function resolveTheme(storedTheme: string | null, prefersDark: boolean): Theme {
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return prefersDark ? 'dark' : 'light';
}
```

Run:

```bash
npm run test -- tests/unit/theme.test.ts
```

Expected: PASS.

- [ ] **Step 4: Implement semantic visual tokens**

Create `src/styles/tokens.css`:

```css
:root {
  color-scheme: light;

  --paper: #f2efe7;
  --paper-raised: #f8f6f0;
  --ink: #151515;
  --ink-muted: #69665f;
  --hairline: rgb(21 21 21 / 14%);
  --surface-soft: rgb(21 21 21 / 4%);
  --metal: #a8a39a;

  --font-display: Georgia, 'Times New Roman', serif;
  --font-body: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-data: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  --page-max: 96rem;
  --gutter: clamp(1rem, 3vw, 3.5rem);
  --column-gap: clamp(0.75rem, 1.4vw, 1.5rem);

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  --motion-fast: 160ms;
  --motion-editorial: 420ms;
  --motion-cinematic: 900ms;
  --ease-editorial: cubic-bezier(0.22, 0.8, 0.2, 1);
}

:root[data-theme='dark'] {
  color-scheme: dark;

  --paper: #111214;
  --paper-raised: #17181b;
  --ink: #efede7;
  --ink-muted: #aaa69f;
  --hairline: rgb(255 255 255 / 14%);
  --surface-soft: rgb(255 255 255 / 5%);
  --metal: #7e7f83;
}
```

These are semantic starting values; later visual review may tune values without changing token names.

- [ ] **Step 5: Implement the 4/6/12-column editorial grid**

Create `src/styles/grid.css`:

```css
.editorial-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: var(--column-gap);
}

@media (min-width: 48rem) {
  .editorial-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media (min-width: 72rem) {
  .editorial-grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
}
```

- [ ] **Step 6: Establish the global reading surface and reduced-motion baseline**

Create `src/styles/typography.css` initially with role-based fallbacks:

```css
.display {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.9;
}

.body-copy {
  font-family: var(--font-body);
  line-height: 1.58;
}

.data-copy {
  font-family: var(--font-data);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

Create `src/styles/global.css`:

```css
@import './tokens.css';
@import './typography.css';
@import './grid.css';

* {
  box-sizing: border-box;
}

html {
  background: var(--paper);
  color: var(--ink);
}

body {
  margin: 0;
  min-width: 20rem;
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

main {
  width: min(100%, var(--page-max));
  margin-inline: auto;
  padding-inline: var(--gutter);
}

a {
  color: inherit;
}

:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 0.25rem;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 900ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

- [ ] **Step 7: Build the FOUC-safe `BaseLayout`**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
  noindex?: boolean;
}

const {
  title,
  description = 'Gabriel Chen — work, research, writing, and evolving ideas.',
  noindex = true,
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="description" content={description} />
    {noindex && <meta name="robots" content="noindex" />}
    <title>{title}</title>
    <script is:inline>
      (() => {
        const stored = localStorage.getItem('theme');
        const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.dataset.theme =
          stored === 'light' || stored === 'dark' ? stored : dark ? 'dark' : 'light';
      })();
    </script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 8: Build the accessible ThemeToggle**

Create `src/components/system/ThemeToggle.astro`:

```astro
<button type="button" data-theme-toggle aria-label="Switch color theme">
  <span data-theme-label>Theme</span>
</button>

<script>
  const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  const label = document.querySelector<HTMLElement>('[data-theme-label]');

  const syncLabel = () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
    button?.setAttribute('aria-pressed', String(theme === 'dark'));
  };

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    syncLabel();
  };

  button?.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (
      !reduceMotion &&
      document.visibilityState === 'visible' &&
      'startViewTransition' in document
    ) {
      document.startViewTransition(toggleTheme);
      return;
    }

    toggleTheme();
  });

  syncLabel();
</script>
```

- [ ] **Step 9: Use the real BaseLayout on the construction home page**

Replace `src/pages/index.astro` with:

```astro
---
import ThemeToggle from '../components/system/ThemeToggle.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Gabriel Chen">
  <main>
    <header>
      <p class="data-copy">G. / ∞ · Portfolio foundation</p>
      <ThemeToggle />
    </header>
    <section>
      <h1 class="display">Gabriel Chen</h1>
      <p class="body-copy">A living editorial space for work, research, systems, and evolving ideas.</p>
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 10: Write E2E theme contracts**

Create `tests/e2e/theme.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('explicit theme choice survives reload', async ({ page }) => {
  await page.goto('/');
  const initial = await page.locator('html').getAttribute('data-theme');

  await page.getByRole('button', { name: 'Switch color theme' }).click();
  const toggled = await page.locator('html').getAttribute('data-theme');
  expect(toggled).not.toBe(initial);

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', toggled ?? 'light');
});

test('page exposes a four-column mobile grid and twelve-column desktop grid', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.className = 'editorial-grid';
    probe.dataset.gridProbe = 'true';
    document.body.appendChild(probe);
  });

  const columns = await page.locator('[data-grid-probe]').evaluate((element) =>
    getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
  );

  const width = page.viewportSize()?.width ?? 0;
  if (width >= 1152) expect(columns).toBe(12);
  else if (width >= 768) expect(columns).toBe(6);
  else expect(columns).toBe(4);
});
```

- [ ] **Step 11: Run verification and commit the visual foundation**

```bash
npm run verify
git add src/styles src/lib/theme.ts src/layouts src/components/system src/pages/index.astro tests/unit/theme.test.ts tests/e2e/theme.spec.ts
git commit -m "feat: establish editorial theme and grid foundation"
```

**Human-approved Task 6 outcome (authoritative):**

- Light and Dark are intentionally art-directed semantic worlds.
- Explicit theme choice persists across reload.
- Supported visible documents use the native View Transition API as progressive enhancement.
- The approved theme transition is `900ms` with `cubic-bezier(0.16, 1, 0.3, 1)`.
- Reduced-motion users, hidden documents, and unsupported browsers receive an immediate non-cinematic fallback.
- Theme transition behavior remains unified and smooth rather than animating individual page elements independently.

**Review gate:** Light and Dark must both feel intentional before typography work begins, and theme behavior must preserve reduced-motion equivalence.

---

## Task 7: Preserve and Lock the Human-Approved Phase 1 Typography System

**Files:**
- Create: `src/pages/lab/typography.astro`
- Modify: `src/styles/typography.css`
- Modify: `src/styles/tokens.css`
- Create: `tests/e2e/typography.spec.ts`
- Modify: `package.json` / `package-lock.json`

**Interfaces:**
- Consumes: the human-approved semantic theme and grid foundation from Task 6.
- Produces the human-approved Phase 1 semantic typography system:
  - Structural Display: Inter Variable
  - Editorial Serif: Cormorant Garamond Variable
  - Body: Inter Variable
  - Data: IBM Plex Mono

**Human-review outcome (authoritative):**

The original serif-led display hypothesis was rejected during visual review. Large serif headlines felt too visually active and too close to generic luxury / fashion-template language.

The approved system is a restrained sans-led hybrid:

- Inter Variable carries structural display and body roles.
- Cormorant Garamond Variable is used selectively for editorial kickers, ledes, quotes, and reflective moments.
- IBM Plex Mono carries evidence, data, index, folio, source, and system notation.

Core principle:

> **Sans builds structure. Serif adds character.**

The typography audition remains historical design evidence. Later tasks must consume this approved semantic system rather than restart serif-led display selection.

- [ ] **Step 1: Lock the approved production typography roles**

The Phase 1 production roles are fixed as:

```text
Structural Display: Inter Variable
Editorial Serif: Cormorant Garamond Variable
Body: Inter Variable
Data: IBM Plex Mono
```

`src/styles/tokens.css` must expose:

```css
--font-display: 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
--font-editorial: 'Cormorant Garamond Variable', Georgia, serif;
--font-body: 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
--font-data: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

`src/styles/typography.css` must preserve these semantic behaviors:

```css
.display {
  font-family: var(--font-display);
  font-weight: 200;
  letter-spacing: 0.08em;
  line-height: 0.96;
}

.editorial {
  font-family: var(--font-editorial);
  font-weight: 300;
  line-height: 1.48;
}

.body-copy {
  font-family: var(--font-body);
  line-height: 1.58;
}

.data-copy {
  font-family: var(--font-data);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

- [ ] **Step 2: Preserve the typography lab as design-decision evidence**

`/lab/typography` remains unlinked and `noindex`.

It preserves the finalist comparison that led to the approved system and should continue to demonstrate this composition grammar:

```text
Small Cormorant italic kicker
→ restrained lightweight tracked Inter structural display
→ Cormorant editorial lede
→ IBM Plex Mono index notation
→ Cormorant editorial pull quote
```

Spectral and Newsreader may remain installed because the lab preserves finalist evidence. They are not production semantic roles.

Do not reintroduce Instrument Serif or Bodoni Moda into the production system unless a new explicit human-approved typography decision reopens font-family selection.

- [ ] **Step 3: Preserve the authoritative typography decision record**

`docs/decisions/phase-1-typography-selection.md` is authoritative and must record:

```text
Display: Inter Variable
Editorial: Cormorant Garamond Variable
Body: Inter Variable
Data: IBM Plex Mono

Sans builds structure. Serif adds character.
```

- [ ] **Step 4: Verify the approved typography system**

Run:

```bash
npm run verify
git diff --check
```

Expected: PASS.

- [ ] **Step 5: Commit the approved typography system**

```bash
git add src/styles src/pages/lab/typography.astro package.json package-lock.json tests/e2e/typography.spec.ts docs/decisions/phase-1-typography-selection.md
git commit -m "feat: establish editorial typography system"
```

**Review gate:** the four semantic font families are frozen for Phase 2. Later visual tasks may tune composition, scale, weight, tracking, and spacing, but must not silently return to a serif-led display system or reopen font-family selection without a new explicit human-approved design decision.

---

## Task 8: Build the Reusable Editorial Primitive Library and the Phase 1 Style Tile

**Files:**
- Create: `src/components/editorial/EditorialRule.astro`
- Create: `src/components/editorial/FolioNumber.astro`
- Create: `src/components/editorial/GIndex.astro`
- Create: `src/components/editorial/ImagePlate.astro`
- Create: `src/components/editorial/Marginalia.astro`
- Create: `src/components/editorial/PhaseMarker.astro`
- Create: `src/components/editorial/SectionLabel.astro`
- Modify: `src/components/system/ThemeToggle.astro`
- Modify: `src/styles/global.css`
- Modify: `src/pages/lab/typography.astro`
- Create: `src/pages/lab/design-system.astro`
- Create: `tests/e2e/design-system.spec.ts`

**Interfaces:**
- Consumes the human-approved Light / Dark / grid foundation from Task 6.
- Consumes the human-approved sans-led typography system from Task 7.
- Produces a small controlled editorial primitive vocabulary that Phase 2 must reuse rather than replace with raw page-specific markup.
- Produces a deterministic style tile proving that the primitives support the approved composition grammar rather than redefining it.

**Composition guardrail:**

Task 8 must extend, not overwrite, the visual language approved in Task 7.

The approved grammar is restrained lightweight Inter structural display, generous tracking and whitespace, selective Cormorant editorial moments, IBM Plex Mono analytical metadata, and G.xxx / PH.xx / folio notation as supporting structure.

Editorial primitives support the composition. They must not make the page feel like a dashboard, cyberpunk HUD, generic SaaS design system, oversized information poster, or generic fashion template.

- [ ] **Step 1: Create `EditorialRule.astro`**

```astro
---
interface Props {
  axis?: 'horizontal' | 'vertical';
}

const { axis = 'horizontal' } = Astro.props;
---

<span class:list={['editorial-rule', `editorial-rule--${axis}`]} aria-hidden="true"></span>

<style>
  .editorial-rule {
    display: block;
    background: var(--hairline);
  }

  .editorial-rule--horizontal {
    width: 100%;
    height: 1px;
  }

  .editorial-rule--vertical {
    width: 1px;
    min-height: 3rem;
  }
</style>
```

- [ ] **Step 2: Create `FolioNumber.astro`**

```astro
---
interface Props {
  current: string;
  total?: string;
}

const { current, total = '∞' } = Astro.props;
---

<span class="folio-number data-copy" aria-label={`Folio ${current} of ${total}`}>
  {current} / {total}
</span>

<style>
  .folio-number {
    font-size: 0.72rem;
    color: var(--ink-muted);
  }
</style>
```

- [ ] **Step 3: Create `GIndex.astro`**

```astro
---
interface Props {
  id: string;
  subtle?: boolean;
}

const { id, subtle = false } = Astro.props;
---

<span class:list={['g-index', 'data-copy', { 'g-index--subtle': subtle }]}>{id}</span>

<style>
  .g-index {
    font-size: 0.72rem;
  }

  .g-index--subtle {
    color: var(--ink-muted);
  }
</style>
```

- [ ] **Step 4: Create `Marginalia.astro`**

```astro
---
interface Props {
  items: string[];
}

const { items } = Astro.props;
---

<aside class="marginalia data-copy" aria-label="Editorial notes">
  {items.map((item) => <span>{item}</span>)}
</aside>

<style>
  .marginalia {
    display: grid;
    gap: 0.45rem;
    align-content: start;
    font-size: 0.66rem;
    line-height: 1.45;
    color: var(--ink-muted);
  }
</style>
```

- [ ] **Step 5: Create `PhaseMarker.astro`**

```astro
---
interface Props {
  id: string;
  label?: string;
}

const { id, label } = Astro.props;
---

<span class="phase-marker data-copy">
  <span>{id}</span>
  {label && <span class="phase-marker__label">{label}</span>}
</span>

<style>
  .phase-marker {
    display: inline-flex;
    gap: 0.75rem;
    align-items: baseline;
    font-size: 0.68rem;
  }

  .phase-marker__label {
    color: var(--ink-muted);
  }
</style>
```

- [ ] **Step 6: Create `SectionLabel.astro`**

```astro
---
interface Props {
  index?: string;
  label: string;
}

const { index, label } = Astro.props;
---

<div class="section-label data-copy">
  {index && <span>{index}</span>}
  <span>{label}</span>
</div>

<style>
  .section-label {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-inline-end: 2rem;
    font-size: 0.68rem;
    color: var(--ink-muted);
  }

  @media (min-width: 48rem) {
    .section-label {
      padding-inline-end: 1.5rem;
    }
  }
</style>
```

- [ ] **Step 7: Create `ImagePlate.astro` with editorial—not card—semantics**

```astro
---
interface Props {
  src: string;
  alt: string;
  caption?: string;
  bleed?: boolean;
}

const { src, alt, caption, bleed = false } = Astro.props;
---

<figure class:list={['image-plate', { 'image-plate--bleed': bleed }]}>
  <img src={src} alt={alt} loading="lazy" />
  {caption && <figcaption class="data-copy">{caption}</figcaption>}
</figure>

<style>
  .image-plate {
    margin: 0;
  }

  .image-plate img {
    display: block;
    width: 100%;
    height: auto;
  }

  .image-plate figcaption {
    margin-top: 0.65rem;
    font-size: 0.64rem;
    color: var(--ink-muted);
  }

  .image-plate--bleed {
    width: calc(100% + var(--gutter));
  }
</style>
```

`ImagePlate` intentionally accepts a simple `src` in Phase 1. Astro Image optimization integration is deferred until real content assets exist in Phase 2; do not pre-build an abstraction without real images.

- [ ] **Step 8: Build the deterministic style tile from the Task 7 approved composition grammar**

Create `src/pages/lab/design-system.astro`:

```astro
---
import EditorialRule from '../../components/editorial/EditorialRule.astro';
import FolioNumber from '../../components/editorial/FolioNumber.astro';
import GIndex from '../../components/editorial/GIndex.astro';
import Marginalia from '../../components/editorial/Marginalia.astro';
import PhaseMarker from '../../components/editorial/PhaseMarker.astro';
import SectionLabel from '../../components/editorial/SectionLabel.astro';
import ThemeToggle from '../../components/system/ThemeToggle.astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Design System Lab — Gabriel Chen" noindex={true}>
  <main class="lab-shell">
    <header class="lab-topline">
      <GIndex id="G.026" subtle={true} />
      <span class="data-copy lab-identity">EDITORIAL INTELLIGENCE</span>
      <ThemeToggle />
    </header>

    <EditorialRule />

    <section class="editorial-grid approved-hero">
      <div class="hero-label">
        <SectionLabel index="01" label="SELECTED WORK" />
      </div>

      <div class="hero-study">
        <p class="editorial hero-kicker"><em>Selected Work</em></p>

        <h1 class="hero-display">
          BUILDING SYSTEMS
          <span>FOR BETTER DECISIONS</span>
        </h1>

        <p class="editorial hero-lede">
          Research, systems and ideas shaped through practice — designed
          to become clearer, more useful and more enduring over time.
        </p>

        <div class="hero-index">
          <FolioNumber current="01" />
          <PhaseMarker id="PH.04" label="BEIJING / 2026" />
        </div>
      </div>

      <div class="hero-notes">
        <Marginalia
          items={[
            'STRATEGY / RESEARCH',
            'SOURCE 07',
            'FIG.03',
            'UPDATED 2026.08',
          ]}
        />
      </div>
    </section>

    <EditorialRule />

    <section class="editorial-grid evidence-spread">
      <div class="evidence-label">
        <SectionLabel index="02" label="EVIDENCE" />
      </div>

      <div class="evidence-intro">
        <p class="editorial evidence-kicker"><em>Pricing Architecture</em></p>
        <h2 class="editorial evidence-question">How large is the premium?</h2>
        <p class="body-copy evidence-context">
          A compact analytical spread for presenting one quantified finding,
          the comparison behind it, and the evidence needed to interpret it.
        </p>
      </div>

      <div class="evidence-primary">
        <span class="data-copy evidence-entity">CHANEL</span>
        <div class="evidence-metric-row">
          <strong class="evidence-metric">10.5k</strong>
          <span class="data-copy evidence-unit">MEDIAN PRICE / USD</span>
        </div>
      </div>

      <div class="evidence-comparison">
        <div class="evidence-comparison-item">
          <span class="data-copy evidence-meta-label">PEER MEDIAN</span>
          <strong>7.2k</strong>
        </div>

        <div class="evidence-comparison-item">
          <span class="data-copy evidence-meta-label">PRICE PREMIUM</span>
          <strong>+46%</strong>
        </div>
      </div>

      <div class="evidence-facts">
        <div>
          <strong class="data-copy">182 SKUs</strong>
          <span class="data-copy">SAMPLE</span>
        </div>
        <div>
          <strong class="data-copy">12 brands</strong>
          <span class="data-copy">COVERAGE</span>
        </div>
        <div>
          <strong class="data-copy">2025 snapshot</strong>
          <span class="data-copy">PERIOD</span>
        </div>
      </div>

      <div class="evidence-interpretation">
        <span class="data-copy evidence-meta-label">INTERPRETATION</span>
        <p class="editorial">
          The premium remains substantial against the peer median, turning
          a single price point into a comparative finding rather than an isolated number.
        </p>
      </div>

      <div class="evidence-source data-copy">
        SOURCE 07 / ILLUSTRATIVE DATASET / DESIGN-SYSTEM DEMO
      </div>
    </section>
  </main>
</BaseLayout>

<style>
  .lab-shell {
    padding-block:
      clamp(2rem, 4vw, 4rem)
      clamp(8rem, 14vw, 14rem);
  }

  .lab-topline {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 2rem;
    padding-bottom: 1rem;
  }

  .lab-identity {
    color: var(--ink-muted);
    font-size: 0.68rem;
    text-align: center;
  }

  .lab-topline :global([data-theme-toggle]) {
    justify-self: end;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--ink);
    cursor: pointer;
    font-family: var(--font-data);
    font-size: 0.68rem;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .approved-hero {
    padding-block: clamp(5rem, 10vw, 10rem);
  }

  .hero-label,
  .data-label {
    grid-column: 1 / -1;
  }

  .hero-study {
    grid-column: 1 / -1;
    max-width: 82rem;
    margin-inline: auto;
    padding-top: clamp(4rem, 8vw, 8rem);
    text-align: center;
  }

  .hero-kicker {
    margin: 0 0 clamp(2rem, 4vw, 3.5rem);
    font-size: clamp(1.15rem, 1.8vw, 1.6rem);
  }

  .hero-kicker em,
  .data-kicker em {
    font-style: italic;
  }

  .hero-display {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5.6vw, 6.4rem);
    font-weight: 200;
    letter-spacing: 0.14em;
    line-height: 1.08;
  }

  .hero-display span {
    display: block;
    margin-top: 0.16em;
  }

  .hero-lede {
    max-width: 47rem;
    margin:
      clamp(3.5rem, 6vw, 6rem)
      auto
      0;
    font-size: clamp(1.35rem, 2vw, 1.85rem);
    font-weight: 300;
    line-height: 1.48;
  }

  .hero-index {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem 2rem;
    margin-top: clamp(3rem, 5vw, 5rem);
  }

  .hero-notes {
    grid-column: 1 / -1;
    justify-self: end;
    margin-top: clamp(3rem, 5vw, 5rem);
  }

  .data-spread {
    padding-block: clamp(5rem, 10vw, 10rem);
  }

  .data-question-wrap {
    grid-column: 1 / -1;
    padding-top: clamp(4rem, 7vw, 7rem);
  }

  .data-kicker {
    margin: 0 0 1.5rem;
    font-size: clamp(1.05rem, 1.5vw, 1.35rem);
  }

  .data-question {
    max-width: 12ch;
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 4.5vw, 5rem);
    font-weight: 200;
    letter-spacing: 0.06em;
    line-height: 1.06;
  }

  .data-answer {
    grid-column: 1 / -1;
    display: grid;
    gap: 1rem;
    margin-top: clamp(4rem, 8vw, 8rem);
  }

  .data-answer strong {
    font-family: var(--font-display);
    font-size: clamp(5rem, 12vw, 11rem);
    font-weight: 200;
    letter-spacing: -0.04em;
    line-height: 0.8;
  }

  @media (min-width: 48rem) {
    .hero-notes {
      grid-column: 5 / 7;
    }

    .data-question-wrap {
      grid-column: 1 / 4;
    }

    .data-answer {
      grid-column: 4 / 7;
      margin-top: clamp(4rem, 7vw, 7rem);
    }
  }

  @media (min-width: 72rem) {
    .hero-study {
      grid-column: 2 / 12;
    }

    .hero-notes {
      grid-column: 10 / 13;
    }

    .data-question-wrap {
      grid-column: 1 / 7;
    }

    .data-answer {
      grid-column: 8 / 13;
    }
  }

  @media (max-width: 47.99rem) {
    .lab-topline {
      grid-template-columns: 1fr auto;
    }

    .lab-identity {
      display: none;
    }

    .hero-study {
      text-align: left;
    }

    .hero-display {
      font-size: clamp(2.4rem, 10vw, 4rem);
      letter-spacing: 0.075em;
    }

    .hero-lede {
      margin-inline: 0;
    }

    .hero-index {
      justify-content: flex-start;
    }

    .hero-notes {
      justify-self: start;
    }
  }


  /* Experimental evidence composition. Keep Section 1 frozen during review. */
  .evidence-spread {
    padding-block: clamp(5rem, 9vw, 9rem);
  }

  .evidence-label {
    grid-column: 1 / -1;
  }

  .evidence-intro {
    grid-column: 1 / -1;
    max-width: 44rem;
    padding-top: clamp(4rem, 7vw, 7rem);
  }

  .evidence-kicker {
    margin: 0 0 1.25rem;
    font-size: clamp(1.1rem, 1.6vw, 1.45rem);
  }

  .evidence-kicker em {
    font-style: italic;
  }

  .evidence-question {
    max-width: 13ch;
    margin: 0;
    font-size: clamp(2.6rem, 5vw, 5.4rem);
    font-weight: 300;
    line-height: 0.98;
  }

  .evidence-context {
    max-width: 38rem;
    margin: clamp(2rem, 3vw, 3rem) 0 0;
    color: var(--ink-muted);
    font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  }

  .evidence-primary {
    grid-column: 1 / -1;
    margin-top: clamp(4rem, 8vw, 8rem);
    padding-block: clamp(2rem, 4vw, 3.5rem);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .evidence-entity {
    display: block;
    margin-bottom: 1rem;
    color: var(--ink-muted);
    font-size: 0.72rem;
  }

  .evidence-metric-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 1rem 1.5rem;
  }

  .evidence-metric {
    font-family: var(--font-display);
    font-size: clamp(4.5rem, 9vw, 8rem);
    font-weight: 200;
    letter-spacing: -0.045em;
    line-height: 0.82;
  }

  .evidence-unit {
    max-width: 14rem;
    padding-bottom: 0.35rem;
    color: var(--ink-muted);
    font-size: 0.68rem;
  }

  .evidence-comparison {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-bottom: 1px solid var(--line);
  }

  .evidence-comparison-item {
    display: grid;
    gap: 1.25rem;
    padding-block: clamp(2rem, 4vw, 3.5rem);
  }

  .evidence-comparison-item + .evidence-comparison-item {
    padding-left: clamp(1.5rem, 4vw, 4rem);
    border-left: 1px solid var(--line);
  }

  .evidence-meta-label {
    color: var(--ink-muted);
    font-size: 0.66rem;
  }

  .evidence-comparison-item strong {
    font-family: var(--font-display);
    font-size: clamp(2.3rem, 4.5vw, 4.5rem);
    font-weight: 200;
    letter-spacing: -0.03em;
    line-height: 0.9;
  }

  .evidence-facts {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
    padding-block: clamp(2rem, 4vw, 3rem);
    border-bottom: 1px solid var(--line);
  }

  .evidence-facts div {
    display: grid;
    gap: 0.6rem;
  }

  .evidence-facts strong {
    font-size: 0.78rem;
  }

  .evidence-facts span {
    color: var(--ink-muted);
    font-size: 0.62rem;
  }

  .evidence-interpretation {
    grid-column: 1 / -1;
    max-width: 50rem;
    padding-top: clamp(4rem, 7vw, 7rem);
  }

  .evidence-interpretation p {
    margin: 1.5rem 0 0;
    font-size: clamp(1.55rem, 2.6vw, 2.35rem);
    font-weight: 300;
    line-height: 1.35;
  }

  .evidence-source {
    grid-column: 1 / -1;
    margin-top: clamp(4rem, 6vw, 6rem);
    color: var(--ink-muted);
    font-size: 0.62rem;
  }

  @media (min-width: 48rem) {
    .evidence-intro {
      grid-column: 1 / 5;
    }

    .evidence-primary {
      grid-column: 1 / 7;
    }

    .evidence-comparison {
      grid-column: 1 / 7;
    }

    .evidence-facts {
      grid-column: 1 / 7;
    }

    .evidence-interpretation {
      grid-column: 2 / 6;
    }

    .evidence-source {
      grid-column: 1 / 7;
    }
  }

  @media (min-width: 72rem) {
    .evidence-intro {
      grid-column: 1 / 6;
    }

    .evidence-primary {
      grid-column: 7 / 13;
      margin-top: clamp(4rem, 7vw, 7rem);
    }

    .evidence-comparison {
      grid-column: 7 / 13;
    }

    .evidence-facts {
      grid-column: 7 / 13;
    }

    .evidence-interpretation {
      grid-column: 2 / 8;
      padding-top: clamp(6rem, 9vw, 9rem);
    }

    .evidence-source {
      grid-column: 8 / 13;
      align-self: end;
      text-align: right;
    }
  }

  @media (max-width: 47.99rem) {
    .evidence-question {
      font-size: clamp(2.4rem, 11vw, 4rem);
    }

    .evidence-comparison {
      grid-template-columns: 1fr;
    }

    .evidence-comparison-item + .evidence-comparison-item {
      padding-left: 0;
      border-top: 1px solid var(--line);
      border-left: 0;
    }

    .evidence-facts {
      grid-template-columns: 1fr;
    }
  }
</style>
```

This style tile deliberately carries forward the Task 7 human-approved composition:

```text
Cormorant kicker
→ restrained tracked Inter statement
→ Cormorant lede
→ quiet Mono / G.xxx / PH.xx evidence language
```

`ImagePlate` remains part of the primitive library but is intentionally not filled with a fake image on this deterministic Phase 1 surface. Its real visual composition is deferred until Phase 2 provides actual project assets.

- [ ] **Step 9: Add regression tests for the approved style tile**

Create `tests/e2e/design-system.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('design-system lab renders the approved editorial vocabulary', async ({ page }) => {
  await page.goto('/lab/design-system');

  await expect(page.getByText('G.026')).toBeVisible();
  await expect(page.getByText('BUILDING SYSTEMS')).toBeVisible();
  await expect(page.getByText('PH.04')).toBeVisible();
  await expect(page.getByText('How large is the gap?')).toBeVisible();
});

test('desktop design-system light world visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('desktop'));
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  await page.goto('/lab/design-system');
  await expect(page).toHaveScreenshot('design-system-light.png', { fullPage: true });
});

test('desktop design-system dark world visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('desktop'));
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/lab/design-system');
  await expect(page).toHaveScreenshot('design-system-dark.png', { fullPage: true });
});
```

Run static verification only:

```bash
npm run check
npx eslint tests/e2e/design-system.spec.ts
git diff --check
```

Do **not** generate or update screenshot baselines yet.

- [ ] **Step 10: Perform Human Visual Review on localhost before creating regression baselines**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Review:

```text
http://127.0.0.1:4321/lab/design-system
```

Review at minimum:

```text
Desktop Light
Desktop Dark
Mobile Light
Mobile Dark
```

The localhost page is the primary design-approval surface because it exposes real browser rendering, responsive behavior, theme switching, typography, spacing, and interaction.

Judge:

```text
1. The Task 7 approved sans-led composition is still clearly recognizable.
2. Inter structural typography feels lightweight, spacious, and restrained.
3. Cormorant adds character selectively rather than dominating.
4. G.xxx / PH.xx / folio / marginalia read as structural notation rather than HUD decoration.
5. Editorial / publishing remains visually dominant over data / information language.
6. The data spread feels analytical rather than dashboard-like.
7. Light feels warm, contemporary, and restrained.
8. Dark feels intentionally art-directed rather than mechanically inverted.
9. Mobile is recomposed rather than squeezed.
10. The result does not resemble a generic SaaS system, fashion template, cyberpunk HUD, or oversized information poster.
```

**If Human Visual Review rejects the page:**

- do not generate new baselines;
- do not weaken tests;
- remain inside Task 8;
- correct the implementation;
- if the rejection changes the design contract, reconcile this plan and the design spec before continuing.

Automated success never overrides a failed visual review.

**Human-approved Task 8 refinement — 2026-09-03**

- `ThemeToggle` remains a fixed, pure-text `LIGHT / DARK` utility with no background, border, shadow, pill, or sticky header.
- Compact scale is `9px` on mobile and `10px` from `48rem` upward.
- The global `main` reading surface keeps symmetric `var(--gutter)` padding; a global right-side safe gutter is explicitly rejected because it unnecessarily narrows the whole composition.
- Collision avoidance is targeted to the right-edge editorial primitive instead: `SectionLabel` reserves a micro-zone of `2rem` on mobile and `1.5rem` from `48rem` upward.
- The fixed utility remains accessible while scrolling, and automated regression verifies that it never crosses the right-edge `SectionLabel`.
- Desktop Light, Desktop Dark, Mobile Light, and Mobile Dark were explicitly Human-approved after localhost review.
- Rejected earlier visual baselines were removed; the approved Light / Dark baselines were regenerated and reproduced successfully in non-update mode.

- [ ] **Step 11: After explicit Human approval, create regression baselines, verify, and commit**

If rejected baselines from an earlier attempt exist, remove them first:

```bash
rm -rf tests/e2e/design-system.spec.ts-snapshots
```

Generate the approved baselines deliberately with the current Playwright CLI:

```bash
npx playwright test tests/e2e/design-system.spec.ts --update-snapshots=changed
```

Expected on the current desktop/mobile project matrix:

```text
12 passed
2 skipped
```

Then prove the approved baseline reproduces without update mode:

```bash
npx playwright test tests/e2e/design-system.spec.ts
```

Run the complete quality gate:

```bash
npm run verify
git diff --check
```

Commit only after automated gates and explicit Human Visual Review both pass:

```bash
git add   src/components/editorial   src/components/system/ThemeToggle.astro   src/styles/global.css   src/pages/lab/typography.astro   src/pages/lab/design-system.astro   tests/e2e/design-system.spec.ts   tests/e2e/design-system.spec.ts-snapshots   docs/superpowers/plans/2026-08-31-gabriel-portfolio-phase-0-1-implementation-plan.md

git commit -m "feat: build editorial primitive design system"
```

**Review gate:** reject Task 8 if the page diverges from the Task 7 approved visual language even when every automated test is green. Human visual approval and automated regression are both required.

---

## Task 9: Implement the Phase 1 Motion Grammar Without GSAP and Prove Reduced-Motion Equivalence

**Files:**
- Create: `src/styles/motion.css`
- Modify: `src/styles/global.css`
- Modify: `src/pages/lab/design-system.astro`
- Create: `tests/e2e/motion.spec.ts`
- Modify screenshot baselines only if the Human-approved settled frame actually changes.

**Interfaces:**
- Consumes: the frozen Task 8 editorial primitives, Section 01 `SELECTED WORK`, Section 02 `EVIDENCE`, and the fixed pure-text `LIGHT / DARK` ThemeToggle contract (no background, border, pill, shadow, or sticky header; 9px mobile and 10px from `48rem` upward), symmetric reading gutter, and targeted SectionLabel micro-zone (2rem mobile, 1.5rem from `48rem` upward).
- Produces four reusable native/CSS motion classes—Reveal, Assemble, Shift, and Morph—plus a lab-only IntersectionObserver driver. These are the only Phase 1 motion primitives; GSAP remains prohibited until Phase 3.
- Contract: JavaScript progressively enhances already-readable content. Browsers without IntersectionObserver and users with reduced motion receive the entered state immediately. Reduced motion must preserve information equivalence and remove displacement rather than merely shortening a transition.

- [ ] **Step 1: Write failing behavioral motion E2E contracts before changing production files**

Create `tests/e2e/motion.spec.ts` while `src/styles/motion.css`, the specimen, and its driver do not yet exist:

```ts
import { expect, test } from '@playwright/test';

const motionKinds = ['reveal', 'assemble', 'shift', 'morph'] as const;

test('full-motion users receive the entered state for every motion primitive', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/lab/design-system');

  for (const kind of motionKinds) {
    const specimen = page.locator(`[data-motion-demo="${kind}"]`);
    await specimen.scrollIntoViewIfNeeded();
    await expect(specimen).toHaveAttribute('data-motion-state', 'entered');
  }
});

test('reduced-motion users see every specimen without opacity or displacement loss', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/lab/design-system');

  const states = await page.locator('[data-motion-demo]').evaluateAll((elements) =>
    elements.map((element) => {
      const style = getComputedStyle(element);
      return {
        visible: style.visibility !== 'hidden' && Number(style.opacity) > 0,
        transform: style.transform,
      };
    }),
  );

  expect(states).toHaveLength(motionKinds.length);
  expect(states.every(({ visible }) => visible)).toBe(true);
  expect(states.every(({ transform }) => transform === 'none')).toBe(true);
});

test('unsupported IntersectionObserver browsers receive the entered state immediately', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: undefined,
    });
  });
  await page.goto('/lab/design-system');

  for (const kind of motionKinds) {
    await expect(page.locator(`[data-motion-demo="${kind}"]`)).toHaveAttribute(
      'data-motion-state',
      'entered',
    );
  }
});
```

The selectors intentionally cover observable entered states for all four primitives, information visibility, displacement removal, and the unsupported-browser fallback. Do not add tests for private timing values, exact easing, or the internal observer implementation beyond the required fallback contract.

- [ ] **Step 2: Run the new motion tests and explicitly observe RED**

Run:

```bash
npx playwright test tests/e2e/motion.spec.ts
```

Expected: FAIL because the current Task 8 lab has no `[data-motion-demo]` specimens or entered-state driver yet. Do not modify production code to hide this failure; the failing behavioral contract is the starting point for Task 9.

- [ ] **Step 3: Implement the minimal native motion vocabulary as progressive enhancement**

Create `src/styles/motion.css`. Keep the default state readable; only the lab driver should add `data-motion-state="pending"`, so content remains visible if JavaScript is absent. Use restrained distances and scale changes that support editorial hierarchy:

```css
.motion-reveal,
.motion-assemble,
.motion-shift,
.motion-morph {
  transition:
    opacity var(--motion-editorial) var(--ease-editorial),
    transform var(--motion-editorial) var(--ease-editorial),
    border-radius var(--motion-editorial) var(--ease-editorial);
}

[data-motion-state='pending'].motion-reveal {
  opacity: 0;
  transform: translateY(0.6rem);
}

[data-motion-state='entered'].motion-reveal {
  opacity: 1;
  transform: translateY(0);
}

[data-motion-state='pending'].motion-assemble {
  transform: scaleX(0.2);
  transform-origin: left center;
}

[data-motion-state='entered'].motion-assemble {
  transform: scaleX(1);
}

[data-motion-state='pending'].motion-shift {
  transform: translateX(var(--motion-shift-x, 0.5rem));
}

[data-motion-state='entered'].motion-shift {
  transform: translateX(0);
}

[data-motion-state='pending'].motion-morph {
  border-radius: 999px;
  transform: scaleX(0.7);
  transform-origin: left center;
}

[data-motion-state='entered'].motion-morph {
  border-radius: 0;
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .motion-reveal,
  .motion-assemble,
  .motion-shift,
  .motion-morph {
    opacity: 1;
    transform: none;
    border-radius: 0;
    transition: none;
  }
}
```

- [ ] **Step 4: Import the motion CSS globally without changing the existing theme transition**

Add the following to the import block in `src/styles/global.css`, before all non-import rules:

```css
@import './motion.css';
```

Do not alter the approved `900ms cubic-bezier(0.16, 1, 0.3, 1)` view-transition contract.

- [ ] **Step 5: Add one restrained third specimen and a lab-only native driver**

In `src/pages/lab/design-system.astro`, append this third controlled specimen before `</main>`. It must follow the existing editorial grammar, remain subordinate to Sections 01 and 02, and introduce no cards, dashboard, HUD, poster, or new hero language:

```astro
<section class="editorial-grid motion-specimen" aria-labelledby="motion-title">
  <div class="motion-label">
    <SectionLabel index="03" label="MOTION GRAMMAR" />
  </div>

  <div class="motion-intro">
    <p class="editorial motion-kicker"><em>Controlled movement</em></p>
    <h2 id="motion-title" class="display motion-title">
      Movement with intent
    </h2>
    <p class="body-copy motion-context">
      Four quiet behaviors for making hierarchy clearer without asking motion to become the subject.
    </p>
  </div>

  <div class="motion-vocabulary" aria-label="Motion vocabulary specimens">
    <div class="motion-item">
      <span class="data-copy">REVEAL / 01</span>
      <p class="editorial motion-reveal" data-motion-demo="reveal">Make the next idea legible.</p>
    </div>
    <div class="motion-item">
      <span class="data-copy">ASSEMBLE / 02</span>
      <div class="motion-line motion-assemble" data-motion-demo="assemble" aria-hidden="true"></div>
    </div>
    <div class="motion-item">
      <span class="data-copy">SHIFT / 03</span>
      <p class="data-copy motion-shift" data-motion-demo="shift" style="--motion-shift-x: 0.5rem;">
        Information moves with intent
      </p>
    </div>
    <div class="motion-item">
      <span class="data-copy">MORPH / 04</span>
      <div class="motion-block motion-morph" data-motion-demo="morph" aria-hidden="true"></div>
    </div>
  </div>
</section>
```

Use scoped CSS that reuses the approved display, editorial, body, data, spacing, and rule language. Keep the heading below the approved hero scale and keep the specimen visually subordinate:

```css
.motion-specimen {
  padding-block: clamp(5rem, 9vw, 9rem);
}

.motion-label {
  grid-column: 1 / -1;
}

.motion-intro {
  grid-column: 1 / -1;
  max-width: 42rem;
  padding-top: clamp(3rem, 6vw, 6rem);
}

.motion-kicker {
  margin: 0 0 1.25rem;
  font-size: clamp(1.05rem, 1.5vw, 1.3rem);
}

.motion-kicker em {
  font-style: italic;
}

.motion-title {
  max-width: 14ch;
  margin: 0;
  font-size: clamp(2rem, 4vw, 4.5rem);
  line-height: 1;
}

.motion-context {
  max-width: 34rem;
  margin: 2rem 0 0;
  color: var(--ink-muted);
}

.motion-vocabulary {
  grid-column: 1 / -1;
  display: grid;
  gap: 0;
  margin-top: clamp(4rem, 7vw, 7rem);
}

.motion-item {
  display: grid;
  grid-template-columns: minmax(8rem, 0.28fr) minmax(0, 1fr);
  align-items: center;
  gap: 1.5rem;
  padding-block: 1.5rem;
  border-top: 1px solid var(--hairline);
}

.motion-item > span {
  color: var(--ink-muted);
  font-size: 0.64rem;
}

.motion-item p {
  margin: 0;
}

.motion-line {
  width: 100%;
  height: 1px;
  background: var(--ink);
}

.motion-block {
  width: min(16rem, 70vw);
  height: 1.5rem;
  background: var(--ink);
}

@media (min-width: 48rem) {
  .motion-intro {
    grid-column: 1 / 7;
  }

  .motion-vocabulary {
    grid-column: 2 / 12;
  }
}

@media (max-width: 47.99rem) {
  .motion-item {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
```

Append this script after the page markup. Set `pending` only when full motion and IntersectionObserver are available; otherwise set `entered` immediately so unsupported browsers and reduced-motion users never lose information:

```astro
<script>
  const motionNodes = document.querySelectorAll<HTMLElement>('[data-motion-demo]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || typeof IntersectionObserver !== 'function') {
    motionNodes.forEach((node) => (node.dataset.motionState = 'entered'));
  } else {
    motionNodes.forEach((node) => (node.dataset.motionState = 'pending'));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.motionState = 'entered';
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 },
    );

    motionNodes.forEach((node) => observer.observe(node));
  }
</script>
```

- [ ] **Step 6: Run the motion tests and observe GREEN on both desktop and mobile projects**

Run:

```bash
npx playwright test tests/e2e/motion.spec.ts
```

Expected: all motion tests pass in both `desktop-chromium` and `mobile-chromium`. If a test fails, fix the smallest motion implementation or test-contract issue inside Task 9; do not weaken the contract or alter Sections 01 and 02.

- [ ] **Step 7: Perform Human Visual Review before any screenshot update**

Run the local site and review `/lab/design-system` at:

```text
Desktop Light
Desktop Dark
Mobile Light
Mobile Dark
Desktop prefers-reduced-motion: reduce
Mobile prefers-reduced-motion: reduce
```

Review all of the following:

```text
1. Motion is restrained and demonstrates behavior rather than spectacle.
2. The specimen extends the approved Task 8 editorial grammar without creating a new visual language.
3. Sections 01 SELECTED WORK and 02 EVIDENCE still feel like the approved Task 8 composition.
4. The fixed pure-text LIGHT / DARK utility remains usable and unobtrusive; it has no background, border, pill, shadow, or sticky header.
5. The fixed toggle does not collide with the right-edge SectionLabel micro-zone.
6. Mobile feels recomposed, not squeezed.
7. Reduced motion preserves all information and removes transitional displacement.
8. Reveal, Assemble, Shift, and Morph feel like one coherent grammar.
9. Motion supports hierarchy instead of competing with content.
10. The system feels premium because it is controlled, not because more things move.
```

If Human Review rejects the motion, do not regenerate visual baselines, do not weaken tests, and do not leave Task 9. Correct the motion implementation inside Task 9. Reconcile this plan only if Human Review changes the motion design contract.

- [ ] **Step 8: After Human approval, run the existing design-system screenshots without update mode**

Run exactly:

```bash
npx playwright test tests/e2e/design-system.spec.ts
```

Because Task 9 intentionally adds Section 03 `MOTION GRAMMAR` to a `fullPage` screenshot, the existing Task 8 baselines are expected to fail dimensionally. Inspect the actual/diff and confirm that the differences are limited to the Human-approved Section 03 and any explicitly approved settled-frame consequences. Do not treat this expected structural baseline failure as a motion-regression defect by itself.

- [ ] **Step 9: Deliberately regenerate the approved fullPage baselines and prove reproducibility**

After Step 7 Human approval and Step 8 diff inspection confirm the expected, limited changes, run:

```bash
npx playwright test tests/e2e/design-system.spec.ts --update-snapshots=changed
```

Immediately prove reproducibility without update mode:

```bash
npx playwright test tests/e2e/design-system.spec.ts
```

Never update snapshots before Human Review. Never use a bare `--update-snapshots` form here, because its optional mode can consume a following file path.

- [ ] **Step 10: Run full verification and commit only after GREEN and Human approval**

Run:

```bash
npm run verify
git diff --check
```

Expected: PASS, with the existing design-system regression suite still covering the fixed ThemeToggle, symmetric main gutter, and SectionLabel collision contract. Commit only after the motion tests, full verification, and Human Visual Review pass:

```bash
git add src/styles/motion.css src/styles/global.css src/pages/lab/design-system.astro tests/e2e/motion.spec.ts
git add tests/e2e/design-system.spec.ts-snapshots  # only when Step 9 changed approved baselines
git commit -m "feat: establish editorial motion grammar"
```

**Review gate:** native/CSS motion remains the only Phase 1 motion implementation; no GSAP, D3, Three.js, WebGL, animation library, scroll-jacking, complex choreography, or new card system may enter this task.

---

## Task 10: Phase 1 Human Acceptance, Production Preview, and Design-System Freeze

**Files:**
- Create: `docs/decisions/phase-1-design-system-review.md`
- No new production features.

**Interfaces:**
- Consumes: completed Tasks 6–9.
- Produces: an evidence-backed review record and, only after explicit approval, authorization to write a separate Phase 2 Home v1 implementation plan. Task 10 creates no production feature.

- [ ] **Step 1: Prepare the production-preview review branch without changing production code**

```bash
git switch -c review/phase-1-design-system
git push -u origin review/phase-1-design-system
```

Expected: Cloudflare generates a branch preview URL. Use normal `git push` first. If the known Mac-specific `LibreSSL SSL_connect: SSL_ERROR_SYSCALL` recurs, preserve the configured proxy (`http.proxy` and `https.proxy` remain `http://127.0.0.1:7897`) and retry only that command with:

```bash
git -c http.version=HTTP/1.1 push -u origin review/phase-1-design-system
```

Do not bypass or remove the proxy, and do not change Git's global HTTP version setting.

- [ ] **Step 2: Run the full automated gate before visual review**

```bash
npm run verify
```

Expected: PASS. If not, do not perform a “visual approval” on broken code.

- [ ] **Step 3: Perform the required human review matrix on the Cloudflare preview**

Review `/lab/design-system` and `/lab/typography` in:

```text
1. Desktop / Light
2. Desktop / Dark
3. Mobile / Light
4. Mobile / Dark
5. Desktop / prefers-reduced-motion: reduce
6. Mobile / prefers-reduced-motion: reduce
```

For each reduced-motion review, use Chromium DevTools: open `Rendering`, then set `Emulate CSS media feature prefers-reduced-motion` to `reduce`. This is a review-only browser setting; do not add a production reduced-motion UI control.

Evaluate against the approved Phase 1 system and Section 3 principles:

```text
Light / Dark are semantic worlds, not a light/dark filter.
The 4 / 6 / 12 editorial grid remains coherent across mobile / tablet / desktop.
Inter Variable carries structural display and body structure.
Cormorant Garamond Variable adds selective editorial character.
IBM Plex Mono carries data and system notation.
Sans builds structure. Serif adds character.
The editorial primitive vocabulary—G.xxx, PH.xx, folio, marginalia, rules, SectionLabel, and ImagePlate—feels structural.
The approved EVIDENCE language remains analytical and editorial rather than dashboard-like.
The fixed compact LIGHT / DARK utility remains unobtrusive and collision-safe.
Reveal / Assemble / Shift / Morph feel like one restrained, coherent grammar.
Reduced motion preserves the same information with no required displacement.
No conventional card system, HUD, poster aesthetic, or generic SaaS language has crept in.
Mobile feels recomposed rather than squeezed.
```

- [ ] **Step 4: Do not mark PASS until Gabriel gives an explicit approval statement**

The required approval is semantic, not exact wording. Examples that count:

```text
“Phase 1 approved.”
“Design system is approved; write the Home plan.”
```

Statements such as “looks pretty good” do **not** count as the gate.

- [ ] **Step 5: Record the actual review result and freeze only what was approved**

If approved, create `docs/decisions/phase-1-design-system-review.md`:

```markdown
# Phase 1 Design System Review

Date: [record the actual calendar date on which this review is performed, in YYYY-MM-DD format]
Status: PASS

## Approved system

- Editorial Intelligence visual foundation
- Light / Dark semantic worlds
- 4 / 6 / 12 editorial grid (mobile / tablet / desktop)
- Structural Display — Inter Variable
- Editorial Serif — Cormorant Garamond Variable
- Functional / Body Sans — Inter Variable
- Data / Mono — IBM Plex Mono
- Principle: Sans builds structure. Serif adds character.
- Editorial primitive vocabulary: G.xxx, PH.xx, folio, marginalia, rules, SectionLabel, and ImagePlate
- Approved Section 01 SELECTED WORK composition
- Approved Section 02 EVIDENCE language and composition
- Fixed pure-text LIGHT / DARK utility: 9px mobile, 10px at >=48rem, with no background, border, pill, shadow, or sticky header
- Symmetric main reading gutter with a targeted SectionLabel micro-zone; no global safe gutter
- Reveal / Assemble / Shift / Morph motion grammar
- Reduced-motion information equivalence with displacement removed

## Review evidence

- Reviewed `/lab/design-system` and `/lab/typography` on the Cloudflare production preview.
- Reviewed Desktop Light, Desktop Dark, Mobile Light, Mobile Dark, Desktop reduced motion, and Mobile reduced motion.
- Automated verification and the approved design-system regression suite passed before this decision was recorded.

## Freeze

Phase 2 must reuse this vocabulary. It may compose and extend it for real Home content, but it must not replace the foundation or restart framework/font/theme selection without a demonstrated defect.

## Deferred by design

- GSAP
- D3
- Three.js / WebGL
- Flagship data choreography
- Living Index relationship graph
- Life OS archive experience
- AI publishing automation
- CMS / database / SSR
```

The `Date` field must be filled with the actual review date when this task is performed; do not copy a historical plan/spec date. If not approved, set `Status: FAIL`, list each concrete visual defect, and write a small corrective plan for Phase 1 only. Do not start Phase 2.

- [ ] **Step 6: Commit and push the review record, merge the reviewed branch, and verify production health**

After approval:

```bash
git add docs/decisions/phase-1-design-system-review.md
git commit -m "docs: approve Phase 1 design system"
git push
```

Use normal `git push` first. If the known `SSL_ERROR_SYSCALL` transport failure recurs, preserve the configured proxy and retry the individual push with:

```bash
git -c http.version=HTTP/1.1 push
```

Do not bypass the proxy or alter global Git settings merely to complete Phase 1.

Merge the PR to `main`, then:

```bash
git switch main
git pull --ff-only
npm run verify
```

Verify:

```text
https://gabrielchen.me → healthy construction shell
Cloudflare main deployment → success
/lab/design-system → available but unlinked/noindex
/lab/typography → available but unlinked/noindex
```

- [ ] **Step 7: STOP at the Phase 1 boundary; plan Phase 2 separately from the verified repository**

Do not implement Home, create project cards, invent project content, or add any other production feature in Task 10.

After the explicit Phase 1 approval, the next artifact may be a **new** file under `docs/superpowers/plans/` following the writing-plans date convention and ending in `-gabriel-portfolio-phase-2-home-v1-implementation-plan.md`. That separate planning task must first inspect:

```text
- actual component APIs from Phase 1
- actual chosen typography
- actual Cloudflare preview behavior
- actual source Markdown/data for:
  1. Competitive Positioning Against Giants
  2. Luxury Handbag Pricing Architecture
  3. Olist Business Analysis
```

Then stop. Phase 2 implementation does not belong in this Phase 0–1 plan.

The Phase 2 plan must not invent project content or generic placeholder cards. It must be planned from the real source material.

---

# Phase 0–1 Final Acceptance Checklist

The plan is complete only when all statements below are true:

```text
[ ] Existing ~/mysite Hugo experiment remains untouched.
[ ] New Astro repository exists and has reviewed Git history.
[ ] `npm run verify` passes from a fresh checkout.
[ ] `main` deploys automatically through Cloudflare Workers Builds.
[ ] A non-main branch receives a stable preview URL.
[ ] gabrielchen.me is served by Cloudflare Workers over valid HTTPS.
[ ] www redirects to the apex domain.
[ ] Work and Phase schemas compile.
[ ] Living Index registry is empty and ready for first real G.xxx assignment.
[ ] Light and Dark are semantically tokenized.
[ ] Grid is 4 / 6 / 12 across mobile / tablet / desktop.
[ ] Typography was selected through an explicit human audition.
[ ] Editorial primitives are reusable and visually approved.
[ ] Motion primitives preserve information in reduced-motion mode.
[ ] Phase 1 visual regression baselines are reviewed, not blindly generated.
[ ] Human explicitly approved Phase 1.
[ ] No GSAP, D3, Three.js, CMS, database, SSR, AI automation, or Home implementation leaked into scope.
```

# Why the Plan Stops Here

The approved product is intentionally high-growth, but quality depends on sequential learning. Phase 2 needs the *actual* Phase 1 visual system and the *actual* three project sources. Phase 3 needs the *actual* Home composition and the *actual* Luxury Handbag data narrative. Writing those detailed execution plans now would force assumptions and encourage bulk implementation—the exact failure mode this project is designed to avoid.

The implementation discipline is therefore:

> **Plan one stable layer → implement → verify → visually review → freeze → plan the next layer.**

That is the operational form of the product thesis: V1 becomes complete by accumulating depth without accumulating uncontrolled complexity.
