import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { COMPETITIVE_MECHANISMS } from '../../src/data/competitive';

const source = readFileSync(
  new URL('../../src/content/work/competitive-positioning-against-giants.md', import.meta.url),
  'utf8',
);
const metadata = source.split('---')[1] ?? '';

describe('earlier competitive analysis metadata', () => {
  it('keeps the title and frames this work as an earlier artifact in the inquiry', () => {
    expect(metadata).toContain('title: Competitive Positioning Against Giants');
    expect(metadata).toMatch(/summary: An earlier comparative analysis/);
    expect(metadata).not.toMatch(/summary: An independent comparative business analysis/);
  });

  it('links to the published research archive and preserves the original study scope', () => {
    expect(metadata).toContain(
      'https://github.com/gabriel232ch/candidate-information-research/blob/main/research/01_smaller_high_impact_companies/public_synthesis.md',
    );
    expect(metadata).not.toContain('small-high-impact-companies/tree/main/06_outputs/');
    expect(metadata).toContain('28-company initial longlist / 12-company structured screening');
    expect(metadata).toContain('Six longitudinal deep dives / two counterexamples');
    expect(COMPETITIVE_MECHANISMS).toHaveLength(5);
  });
});
