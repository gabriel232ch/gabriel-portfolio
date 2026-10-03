import { existsSync, readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

const route = '/work/why-some-people-choose-smaller-companies/';
const archiveRoot =
  'https://github.com/gabriel232ch/candidate-information-research';

function redactionPatterns(): RegExp[] {
  const privatePatternFile = process.env.SMALLER_COMPANIES_REDACTION_FILE;
  const localPatterns =
    privatePatternFile && existsSync(privatePatternFile)
      ? readFileSync(privatePatternFile, 'utf8')
          .split(/\r?\n/)
          .map((pattern) => pattern.trim())
          .filter((pattern) => pattern && !pattern.startsWith('#'))
          .map((pattern) => new RegExp(pattern))
      : [];

  return [
    /JoinQuant/i,
    /聚宽/,
    /Brand Master/i,
    /internal skill/i,
    /Golden Sample article text/i,
    /Employer Brand as Candidate Decision Infrastructure/i,
    /\.codex\//i,
    /\.tmp\//i,
    /10×/,
    /private[^\s]*\.html/i,
    ...localPatterns,
  ];
}

test('renders the evolving inquiry in the approved evidence sequence', async ({ page }) => {
  await page.goto(route);

  const article = page.locator('main article');
  await expect(article).toHaveCount(1);
  await expect(article.getByRole('heading', {
    level: 1,
    name: 'Why Do Some People Choose Smaller Companies?',
  })).toBeVisible();
  await expect(article.locator('.inquiry-page__opening')).toContainText(
    'that question kept changing',
  );

  const stageIds = await article.locator('[data-inquiry-stage]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('data-inquiry-stage')),
  );
  expect(stageIds).toEqual([
    'geo',
    'source-truth',
    'positioning',
    'reality',
    'information-gap',
    'query',
    'golden-samples-to-system',
    'evaluation',
    'first-landing-page',
    'case-studies',
    'manual-cases-to-harness',
    'decision-support',
    'crossroads',
  ]);

  const geo = article.locator('#geo');
  await expect(geo.getByRole('heading', { level: 2 })).toHaveText(
    'I first thought this was a GEO problem',
  );
  await expect(geo).toContainText('exploratory prompt test');
  await expect(geo).not.toContainText(/\b\d+\s*\/\s*\d+\b/);
  await expect(geo).not.toContainText(/later employee-story query baseline/i);

  const sourceTruth = article.locator('#source-truth');
  await expect(sourceTruth).toContainText('available company information');
  await expect(sourceTruth).toContainText('source of truth');

  const positioning = article.locator('#positioning');
  await expect(positioning).toContainText('employee interviews');
  await expect(positioning).toContainText('comparative research');

  const reality = article.locator('#reality');
  await expect(reality).toContainText('could not substitute');
  await expect(reality).toContainText('not a universal loop');

  const informationGap = article.locator('#information-gap');
  await expect(informationGap).toContainText('role expectations');
  await expect(informationGap).toContainText('not representative');

  const query = article.locator('#query');
  await expect(query).toContainText(
    'Candidate Query → Direct Answer → Employee Evidence → Full Story',
  );

  const evaluation = article.locator('#evaluation');
  await expect(evaluation).toContainText('six story drafts');
  await expect(evaluation).toContainText('separate research moments');
  await expect(evaluation.locator('table')).toHaveCount(0);
  await expect(article.locator('#first-landing-page')).toBeVisible();
  await expect(article.locator('#case-studies')).toContainText('five-case');
});

test('shows both systemization stages, bounded synthesis, prototype status, and archive evidence', async ({
  page,
}) => {
  await page.goto(route);

  const article = page.locator('main article');
  await expect(article.locator('[data-systemization-node]')).toHaveCount(2);
  await expect(article.locator('#golden-samples-to-system')).toContainText('Golden Samples');
  await expect(article.locator('#golden-samples-to-system')).toContainText('2–3 hours');
  await expect(article.locator('#manual-cases-to-harness')).toContainText('parallel');
  await expect(article.locator('#manual-cases-to-harness')).toContainText('not a formal speedup');

  const synthesis = article.locator('#decision-support');
  await expect(synthesis).toContainText('mutual selection');
  await expect(synthesis).toContainText('working interpretation');
  await expect(synthesis).not.toContainText('why people choose companies is');

  const crossroads = article.locator('#crossroads');
  await expect(crossroads).toContainText('interactive prototype');
  await expect(crossroads).toContainText('has not shipped publicly');
  await expect(crossroads).toContainText('not been validated through live candidate outcomes');

  await expect(article.locator('.inquiry-page__status')).toContainText(
    'This is where the question has taken me so far.',
  );
  await expect(article.locator('table')).toHaveCount(0);

  const allExternalLinks = article.locator('a[href^="' + archiveRoot + '"]');
  expect(await allExternalLinks.count()).toBeGreaterThan(0);
  for (const link of await allExternalLinks.all()) {
    await expect(link).toHaveAttribute(
      'href',
      /^https:\/\/github\.com\/gabriel232ch\/candidate-information-research(?:\/|$)/,
    );
    await expect(link).toHaveAttribute('rel', /noreferrer/);
  }
});

test('keeps private employer material out of rendered page text', async ({ page }) => {
  await page.goto(route);

  const publicText = (await page.locator('body').innerText()).normalize('NFC');
  for (const pattern of redactionPatterns()) {
    expect(pattern.test(publicText), 'page text must pass the local privacy scan').toBe(false);
  }
});
