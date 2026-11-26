import { execSync } from 'node:child_process';

function runGit(command) {
  return execSync(command, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function fail(lines) {
  for (const line of lines) {
    console.error(line);
  }
  process.exit(1);
}

// Cloudflare Workers Builds and GitHub Actions run inside controlled CI environments.
if (process.env.WORKERS_CI === '1' || process.env.CI === 'true') {
  console.log('[deploy-guard] CI environment detected; proceeding.');
  process.exit(0);
}

if (process.env.ALLOW_LOCAL_PROD_DEPLOY !== '1') {
  fail([
    '[deploy-guard] Blocked direct local production deploy.',
    '',
    'Production (gabrielchen.me) is published exclusively via GitHub main -> Cloudflare Workers Builds.',
    'To preview your changes before merging, run:',
    '  npm run deploy:preview',
    '',
    'If Cloudflare Workers Builds is unavailable and you must publish from an up-to-date, clean main branch:',
    '  ALLOW_LOCAL_PROD_DEPLOY=1 npm run deploy',
  ]);
}

let branch;
let status;
let headSha;
let originMainSha;

try {
  branch = runGit('git rev-parse --abbrev-ref HEAD');
  status = runGit('git status --porcelain');
  runGit('git fetch origin main');
  headSha = runGit('git rev-parse HEAD');
  originMainSha = runGit('git rev-parse origin/main');
} catch (error) {
  fail([
    '[deploy-guard] Failed to verify git repository state before production deploy.',
    error instanceof Error ? error.message : String(error),
  ]);
}

if (branch !== 'main') {
  fail([
    `[deploy-guard] Refusing to deploy production from branch "${branch}".`,
    'Switch to "main" and merge via pull request first.',
  ]);
}

if (status.length > 0) {
  fail([
    '[deploy-guard] Refusing to deploy with uncommitted local changes:',
    status,
  ]);
}

if (headSha !== originMainSha) {
  fail([
    '[deploy-guard] Local main does not match origin/main.',
    `  local HEAD:  ${headSha}`,
    `  origin/main: ${originMainSha}`,
    'Push or pull so local main matches origin/main exactly before deploying.',
  ]);
}

console.log(`[deploy-guard] Verified clean main at ${headSha.slice(0, 7)}. Proceeding.`);
