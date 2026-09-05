import { describe, expect, it } from 'vitest';
import { HOME_STATE, HOME_WORK_SLUGS } from '../../src/data/home';

describe('Home content contract', () => {
  it('locks the approved Selected Work order', () => {
    expect(HOME_WORK_SLUGS).toEqual([
      'luxury-handbag-pricing-architecture',
      'olist-marketplace-analysis',
      'competitive-positioning-against-giants',
    ]);
  });

  it('exposes one primary thread, two side threads, and exactly two movements', () => {
    expect(HOME_STATE.movements).toHaveLength(2);
    expect(HOME_STATE.now.side).toHaveLength(2);
    expect(HOME_STATE.now.primary.title).toBe('Employer Brand / GEO at JoinQuant');
  });

  it('does not pretend a personal photo or archive entry exists', () => {
    expect(HOME_STATE.personalSnapshot).toBeNull();
    expect(HOME_STATE.archive).toBeNull();
  });
});
