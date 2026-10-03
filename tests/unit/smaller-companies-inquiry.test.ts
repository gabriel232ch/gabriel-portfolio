import { describe, expect, it } from 'vitest';
import {
  PUBLIC_RESEARCH_ARCHIVE_URL,
  SMALLER_COMPANIES_INQUIRY,
} from '../../src/data/smaller-companies-inquiry';

describe('smaller-companies inquiry public content', () => {
  it('preserves the public inquiry title and points to the published archive', () => {
    expect(SMALLER_COMPANIES_INQUIRY.title).toBe(
      'Why Do Some People Choose Smaller Companies?',
    );
    expect(PUBLIC_RESEARCH_ARCHIVE_URL).toBe(
      'https://github.com/gabriel232ch/candidate-information-research',
    );
  });

  it('presents the project as an evolving question rather than a completed answer', () => {
    expect(SMALLER_COMPANIES_INQUIRY.closing.toLowerCase()).toContain('so far');
    expect(SMALLER_COMPANIES_INQUIRY.closing.toLowerCase()).not.toContain('solved');
  });

  it('keeps the narrative chapters in the approved evidence sequence', () => {
    expect(SMALLER_COMPANIES_INQUIRY.chapters.map(({ id }) => id)).toEqual([
      'geo',
      'source-truth',
      'positioning',
      'reality',
      'information-gap',
      'query',
      'evaluation',
      'case-studies',
      'decision-support',
      'crossroads',
    ]);
  });

  it('keeps the early GEO test qualitative and the later evaluation after query content', () => {
    const geo = SMALLER_COMPANIES_INQUIRY.chapters.find(({ id }) => id === 'geo');
    const evaluation = SMALLER_COMPANIES_INQUIRY.chapters.find(
      ({ id }) => id === 'evaluation',
    );

    expect(geo?.body.join(' ')).not.toMatch(/\b\d+\s*\/\s*\d+\b/);
    expect(geo?.body.join(' ').toLowerCase()).not.toContain('baseline');
    expect(
      SMALLER_COMPANIES_INQUIRY.chapters.findIndex(({ id }) => id === 'query'),
    ).toBeLessThan(
      SMALLER_COMPANIES_INQUIRY.chapters.findIndex(({ id }) => id === 'evaluation'),
    );
    expect(evaluation?.body.join(' ').toLowerCase()).toContain('later');
  });

  it('places the first landing-page transition between evaluation and case research', () => {
    expect(SMALLER_COMPANIES_INQUIRY.transitions).toEqual([
      expect.objectContaining({
        id: 'first-landing-page',
        afterChapterId: 'evaluation',
      }),
    ]);
  });

  it('gives each chapter the fields needed to explain the reframing', () => {
    for (const chapter of SMALLER_COMPANIES_INQUIRY.chapters) {
      expect(chapter.id).toBeTruthy();
      expect(chapter.heading).toBeTruthy();
      expect(chapter.questionBefore).toBeTruthy();
      expect(chapter.evidenceOrProblem).toBeTruthy();
      expect(chapter.reframe).toBeTruthy();
      expect(chapter.body.length).toBeGreaterThan(0);
    }
  });

  it('keeps archive evidence links on the public repository', () => {
    const archiveLinks = SMALLER_COMPANIES_INQUIRY.chapters
      .map(({ archiveHref }) => archiveHref)
      .filter((href): href is string => Boolean(href));

    expect(archiveLinks.length).toBeGreaterThan(0);
    expect(
      archiveLinks.every((href) => href.startsWith(PUBLIC_RESEARCH_ARCHIVE_URL)),
    ).toBe(true);
  });

  it('frames the synthesis around information asymmetry and mutual selection', () => {
    const synthesis = SMALLER_COMPANIES_INQUIRY.currentSynthesis.toLowerCase();

    expect(synthesis).toContain('information asymmetry');
    expect(synthesis).toContain('mutual selection');
    expect(synthesis).not.toContain('why people choose companies is');
    expect(synthesis).toContain('not a universal theory');
    expect(synthesis).not.toContain('is a universal theory');
  });

  it('keeps employer identity and private project assets out of public content', () => {
    const publicContent = JSON.stringify(SMALLER_COMPANIES_INQUIRY);

    for (const forbidden of [
      'JoinQuant',
      '聚宽',
      'Brand Master',
      'internal skill',
      'Golden Sample article text',
      'Employer Brand as Candidate Decision Infrastructure',
      '.codex/',
      '.tmp/',
      '10×',
    ]) {
      expect(publicContent).not.toContain(forbidden);
    }
  });
});
