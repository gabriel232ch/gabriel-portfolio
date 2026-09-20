import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const tokens = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');
const familyTokenNames = [...tokens.matchAll(/^\s*(--font-(?!size-)[\w-]+)\s*:/gm)]
  .map((match) => match[1])
  .sort();
const sizeTokenNames = [...tokens.matchAll(/^\s*(--font-size-[\w-]+)\s*:/gm)]
  .map((match) => match[1])
  .sort();

describe('Typography Scale v1 tokens', () => {
  test('defines the four production family roles', () => {
    expect(familyTokenNames).toEqual([
      '--font-display',
      '--font-metadata',
      '--font-numeric',
      '--font-reading',
    ]);
    expect(tokens).toContain("--font-display: 'Cormorant Garamond Variable'");
    expect(tokens).toContain('--font-reading: Baskerville');
    expect(tokens).toContain('--font-numeric: Didot');
    expect(tokens).toContain("--font-metadata: 'IBM Plex Mono'");
  });

  test('defines the frozen semantic size roles', () => {
    const expectedSizeTokenNames = [
      '--font-size-body',
      '--font-size-lead',
      '--font-size-micro',
      '--font-size-project-title',
      '--font-size-secondary-reading',
      '--font-size-section-title',
      '--font-size-statement',
      '--font-size-supporting',
    ];

    expect(sizeTokenNames).toEqual(expectedSizeTokenNames);
    expect(tokens).toContain('--font-size-project-title: clamp(3rem, 6vw, 5.5rem)');
    expect(tokens).toContain('--line-height-reading: 1.58');
  });
});
