import { execSync } from 'node:child_process';

export interface BuildInfo {
  commit: string;
  shortCommit: string;
  branch: string;
  builtAt: string;
}

function runGit(command: string): string | undefined {
  try {
    const value = execSync(command, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return value || undefined;
  } catch {
    return undefined;
  }
}

export function getBuildInfo(env: NodeJS.ProcessEnv = process.env): BuildInfo {
  const envCommit =
    env.WORKERS_CI_COMMIT_SHA ||
    env.CF_PAGES_COMMIT_SHA ||
    env.GITHUB_SHA;
  const commit = envCommit?.trim() || runGit('git rev-parse HEAD') || 'unknown';
  const shortCommit = commit === 'unknown' ? 'unknown' : commit.slice(0, 7);

  const envBranch =
    env.WORKERS_CI_BRANCH ||
    env.CF_PAGES_BRANCH ||
    env.GITHUB_HEAD_REF ||
    env.GITHUB_REF_NAME;
  const branch = envBranch?.trim() || runGit('git rev-parse --abbrev-ref HEAD') || 'unknown';

  return {
    commit,
    shortCommit,
    branch,
    builtAt: new Date().toISOString(),
  };
}
