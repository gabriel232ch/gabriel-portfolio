import { describe, expect, it } from 'vitest';
import { HOME_STATE, HOME_WORK_SLUGS } from '../../src/data/home';
import { LUXURY_FLAGSHIP } from '../../src/data/luxury';

describe('Home content contract', () => {
  it('keeps the approved project order', () => {
    expect(HOME_WORK_SLUGS).toEqual([
      'luxury-handbag-pricing-architecture',
      'olist-marketplace-analysis',
      'competitive-positioning-against-giants',
    ]);
  });

  it('locks the identity-first Hero copy', () => {
    expect(HOME_STATE.intro.statement).toBe(
      'I like following questions until they become clearer — and building things that help me think better.',
    );
  });

  it('locks the three public project identities', () => {
    expect(HOME_STATE.projects.chanel.title).toBe(
      'Luxury Was Slowing. Why Did Chanel Look Different?',
    );
    expect(HOME_STATE.projects.olist.title).toBe(
      'SQL Wasn’t the Hard Part. Knowing What to Ask Was.',
    );
    expect(HOME_STATE.projects.smallerCompanies.title).toBe(
      'Why Do Some People Choose Smaller Companies?',
    );
  });

  it('keeps the active-employer inquiry anonymized', () => {
    const publicCopy = JSON.stringify(HOME_STATE.projects.smallerCompanies);
    expect(publicCopy).toContain('a quantitative investment firm');
    expect(publicCopy).not.toContain('JoinQuant');
    expect(publicCopy).not.toContain('聚宽');
  });

  it('exposes four human Now items and no required photo', () => {
    expect(HOME_STATE.now.items.map((item) => item.id)).toEqual([
      'learning',
      'working',
      'playing',
      'thinking',
    ]);
    expect(HOME_STATE.now.personalSnapshot).toBeNull();
  });

  it('locks the warm unfinished ending', () => {
    expect(HOME_STATE.closing.message).toBe('I’ll keep adding things here as I go.');
    expect(HOME_STATE.closing.links).toEqual([
      { label: 'GitHub', href: 'https://github.com/gabriel232ch' },
    ]);
  });

  it('keeps the flagship evidence facts source-backed', () => {
    expect(LUXURY_FLAGSHIP.snapshot.acceptedObservations).toBe(41);
    expect(LUXURY_FLAGSHIP.snapshot.numericPrices).toBe(35);
    expect(LUXURY_FLAGSHIP.financial.period).toBe('Chanel consolidated / FY2020–FY2025');
  });
});
