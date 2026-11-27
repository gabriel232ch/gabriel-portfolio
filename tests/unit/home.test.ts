import { describe, expect, it } from 'vitest';
import { HOME_STATE, HOME_WORK_SLUGS } from '../../src/data/home';
import { LUXURY_FLAGSHIP } from '../../src/data/luxury';

describe('Home content contract', () => {
  it('keeps the analytics-first project order', () => {
    expect(HOME_WORK_SLUGS).toEqual([
      'olist-marketplace-analysis',
      'luxury-handbag-pricing-architecture',
      'competitive-positioning-against-giants',
    ]);
  });

  it('preserves the Hero identity statement alongside remote positioning', () => {
    expect(HOME_STATE.intro.statement).toBe(
      'I like following questions until they become clearer — and building things that help me think better.',
    );
    expect(HOME_STATE.profile.email).toBe('gabrielchen060@gmail.com');
    expect(HOME_STATE.profile.linkedin).toBe('https://www.linkedin.com/in/wentao-chen-476155367');
  });

  it('locks the three public project identities', () => {
    expect(HOME_STATE.projects.olist.title).toBe(
      'SQL Wasn’t the Hard Part. Knowing What to Ask Was.',
    );
    expect(HOME_STATE.projects.chanel.title).toBe(
      'Luxury Was Slowing. Why Did Chanel Look Different?',
    );
    expect(HOME_STATE.projects.smallerCompanies.title).toBe(
      'Why Do Some People Choose Smaller Companies?',
    );
  });

  it('keeps the active-employer inquiry and experience ledger anonymized', () => {
    const publicCopy = JSON.stringify(HOME_STATE);
    expect(publicCopy).toContain('a quantitative investment firm');
    expect(publicCopy).not.toContain('JoinQuant');
    expect(publicCopy).not.toContain('聚宽');
    expect(publicCopy).not.toContain('19857170382');
    expect(publicCopy).not.toContain('gabriel-finance');
  });

  it('exposes capabilities, AI workflows, and real contact links', () => {
    expect(HOME_STATE.capabilities.pillars).toHaveLength(3);
    expect(HOME_STATE.capabilities.experience).toHaveLength(3);
    expect(HOME_STATE.workWithMe.modes).toHaveLength(2);
    expect(HOME_STATE.profile.resumeEnUrl).toBe('/resume/Gabriel-Chen-Resume-EN.pdf');
    expect(HOME_STATE.profile.resumeZhUrl).toBe('/resume/Gabriel-Chen-Resume-ZH.pdf');
    expect(HOME_STATE.closing.links).toEqual([
      { label: 'Email', href: 'mailto:gabrielchen060@gmail.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wentao-chen-476155367' },
      { label: 'GitHub', href: 'https://github.com/gabriel232ch' },
      { label: 'Resume (EN)', href: '/resume/Gabriel-Chen-Resume-EN.pdf' },
      { label: 'Resume (ZH)', href: '/resume/Gabriel-Chen-Resume-ZH.pdf' },
    ]);
  });

  it('exposes four human Now items', () => {
    expect(HOME_STATE.now.items.map((item) => item.id)).toEqual([
      'learning',
      'working',
      'playing',
      'thinking',
    ]);
  });

  it('keeps the warm closing message', () => {
    expect(HOME_STATE.closing.message).toBe('I’ll keep adding things here as I go.');
  });

  it('keeps the flagship evidence facts source-backed', () => {
    expect(LUXURY_FLAGSHIP.snapshot.acceptedObservations).toBe(41);
    expect(LUXURY_FLAGSHIP.snapshot.numericPrices).toBe(35);
    expect(LUXURY_FLAGSHIP.financial.period).toBe('Chanel consolidated / FY2020–FY2025');
  });
});
