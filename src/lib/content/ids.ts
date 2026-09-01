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
