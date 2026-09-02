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
