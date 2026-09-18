import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const tokens = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');

describe('Typography Scale v1 tokens', () => {
  test('defines the four production family roles', () => {
    expect(tokens).toContain("--font-display: 'Cormorant Garamond Variable'");
    expect(tokens).toContain('--font-reading: Baskerville');
    expect(tokens).toContain('--font-numeric: Didot');
    expect(tokens).toContain("--font-metadata: 'IBM Plex Mono'");
  });

  test('defines the frozen semantic size roles', () => {
    for (const token of [
      '--font-size-micro',
      '--font-size-supporting',
      '--font-size-secondary-reading',
      '--font-size-body',
      '--font-size-lead',
      '--font-size-statement',
      '--font-size-section-title',
      '--font-size-project-title',
    ]) {
      expect(tokens).toContain(token);
    }
    expect(tokens).toContain('--font-size-project-title: clamp(3rem, 6vw, 5.5rem)');
    expect(tokens).toContain('--line-height-reading: 1.58');
  });
});
