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
