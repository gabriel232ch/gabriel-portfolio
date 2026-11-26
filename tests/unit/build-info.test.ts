import { describe, expect, it } from 'vitest';
import { getBuildInfo } from '../../src/lib/build-info';

describe('build info fingerprint', () => {
  it('prefers Cloudflare Workers CI environment variables when present', () => {
    const info = getBuildInfo({
      WORKERS_CI_COMMIT_SHA: 'c54ca97c35993434024aacc9f53955090a251e4d',
      WORKERS_CI_BRANCH: 'main',
    });

    expect(info.commit).toBe('c54ca97c35993434024aacc9f53955090a251e4d');
    expect(info.shortCommit).toBe('c54ca97');
    expect(info.branch).toBe('main');
    expect(Number.isNaN(Date.parse(info.builtAt))).toBe(false);
  });

  it('falls back to GitHub Actions variables when Workers CI variables are absent', () => {
    const info = getBuildInfo({
      GITHUB_SHA: '0501d0d997617fdc687dd0986838910ef827785e',
      GITHUB_HEAD_REF: 'feat/example',
    });

    expect(info.commit).toBe('0501d0d997617fdc687dd0986838910ef827785e');
    expect(info.shortCommit).toBe('0501d0d');
    expect(info.branch).toBe('feat/example');
  });

  it('reads local git metadata when CI variables are absent', () => {
    const info = getBuildInfo({});

    expect(info.commit).toMatch(/^[0-9a-f]{40}$/);
    expect(info.shortCommit).toBe(info.commit.slice(0, 7));
    expect(info.branch.length).toBeGreaterThan(0);
  });
});
