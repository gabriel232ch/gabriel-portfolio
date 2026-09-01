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
