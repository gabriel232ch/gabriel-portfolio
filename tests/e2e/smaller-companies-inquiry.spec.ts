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
  const findings = evaluation.locator('.inquiry-page__findings li');
  await expect(findings).toHaveCount(3);
  await expect(findings.nth(0)).toContainText('7 of 30');
  await expect(findings.nth(1)).toContainText('13 of 60');
  await expect(findings.nth(2)).toContainText('40 of 60');
  await expect(evaluation).toContainText('not repeated independent trials');
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

test('uses the existing paper and ink tokens in light and dark themes', async ({ page }) => {
  const themes = {
    light: { background: 'rgb(244, 243, 246)', ink: 'rgb(36, 27, 41)' },
    dark: { background: 'rgb(20, 16, 22)', ink: 'rgb(242, 238, 245)' },
  } as const;

  for (const [theme, expected] of Object.entries(themes)) {
    await page.goto(route);
    await page.evaluate((selectedTheme) => localStorage.setItem('theme', selectedTheme), theme);
    await page.reload();

    const tokenColors = await page.locator('.inquiry-page').evaluate((element) => {
      const tokenProbe = document.createElement('div');
      tokenProbe.style.backgroundColor = 'var(--paper)';
      tokenProbe.style.color = 'var(--ink)';
      document.body.append(tokenProbe);
      const pageStyle = getComputedStyle(element);
      const tokenStyle = getComputedStyle(tokenProbe);
      const result = {
        theme: document.documentElement.dataset.theme,
        pageBackground: pageStyle.backgroundColor,
        pageInk: pageStyle.color,
        tokenBackground: tokenStyle.backgroundColor,
        tokenInk: tokenStyle.color,
      };
      tokenProbe.remove();
      return result;
    });

    expect(tokenColors.theme).toBe(theme);
    expect(tokenColors.pageBackground).toBe(expected.background);
    expect(tokenColors.pageInk).toBe(expected.ink);
    expect(tokenColors.pageBackground).toBe(tokenColors.tokenBackground);
    expect(tokenColors.pageInk).toBe(tokenColors.tokenInk);
  }
});

test('has no horizontal overflow at narrow, tablet, or desktop widths', async ({ page }) => {
  await page.goto(route);

  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth > window.innerWidth,
      body: document.body.scrollWidth > window.innerWidth,
    }));
    expect(overflow.document, `document overflow at ${width}px`).toBe(false);
    expect(overflow.body, `body overflow at ${width}px`).toBe(false);
  }
});

test('keeps archive links valid and reachable by keyboard focus', async ({ page }) => {
  await page.goto(route);

  const archiveLinks = page.locator(`main article a[href^="${archiveRoot}"]`);
  const count = await archiveLinks.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const link = archiveLinks.nth(index);
    await expect(link).toHaveAttribute(
      'href',
      /^https:\/\/github\.com\/gabriel232ch\/candidate-information-research(?:\/|$)/,
    );
    expect(await link.evaluate((node) => (node as HTMLAnchorElement).tabIndex)).toBeGreaterThanOrEqual(0);
    await link.focus();
    await expect(link).toBeFocused();
  }
});

test('uses a semantic heading order and renders without JavaScript or motion', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();

  try {
    await page.goto(route);
    const article = page.locator('main article');
    await expect(article.getByRole('heading', {
      level: 1,
      name: 'Why Do Some People Choose Smaller Companies?',
    })).toBeVisible();
    await expect(article.locator('[data-inquiry-stage]')).toHaveCount(13);
    await expect(article.locator('#evaluation')).toContainText('7 of 30');

    const headingLevels = await article.locator('h1, h2, h3, h4, h5, h6').evaluateAll((nodes) =>
      nodes.map((node) => Number(node.tagName.slice(1))),
    );
    expect(headingLevels[0]).toBe(1);
    for (let index = 1; index < headingLevels.length; index += 1) {
      expect(headingLevels[index]).toBeLessThanOrEqual(headingLevels[index - 1] + 1);
    }

    const hiddenStages = await article.locator('[data-inquiry-stage]').evaluateAll((nodes) =>
      nodes.filter((node) => {
        const style = getComputedStyle(node);
        return style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
      }).length,
    );
    expect(hiddenStages).toBe(0);
  } finally {
    await context.close();
  }
});
