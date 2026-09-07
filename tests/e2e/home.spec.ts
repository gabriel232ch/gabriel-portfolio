import { expect, test } from '@playwright/test';

test('Home exposes lightweight navigation and the editorial Hero', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'WORK', exact: true })).toHaveAttribute('href', '#work');
  await expect(page.getByRole('link', { name: 'NOW', exact: true })).toHaveAttribute('href', '#about');
  await expect(page.getByRole('link', { name: 'INDEX', exact: true })).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1, name: 'Gabriel Chen' })).toBeVisible();
  await expect(page.getByText('RESEARCH / SYSTEMS / NOTES')).toBeVisible();
  await expect(page.getByText('I explore how businesses work, and how research can become useful systems.')).toBeVisible();
  await expect(page.locator('[data-home-reading]')).toHaveCount(2);
  await expect(page.locator('[data-home-reading]').nth(0)).toHaveAttribute('href', '#work');
  await expect(page.locator('[data-home-reading]').nth(1)).toHaveAttribute('href', '#olist');
});

test('Home exposes the Now layer and quieter editorial closing', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#about')).toContainText('Employer Brand / GEO at JoinQuant');
  await expect(page.locator('#about [data-now-side]')).toHaveCount(2);
  await expect(page.locator('[data-author-note]')).toContainText('A place to keep thinking');
  await expect(page.locator('[data-author-note]')).toContainText(
    'This is a place for work, research, and ideas I want to return to.',
  );
  await expect(page.locator('[data-personal-snapshot]')).toHaveCount(0);
  await expect(page.locator('#index')).toBeVisible();

  await page.getByRole('link', { name: 'NOW', exact: true }).click();
  await expect(page.locator('#about')).toBeInViewport();

  await page.locator('[data-home-reading]').nth(1).click();
  await expect(page.locator('#olist')).toBeInViewport();

  await page.locator('.editorial-closing a[href="#work"]').click();
  await expect(page.locator('#work')).toBeInViewport();
  await expect(page.locator('#index a[href="#index"]')).toHaveCount(0);
});

test('Home preserves the integrated editorial order and image-free work stories', async ({ page }) => {
  await page.goto('/');

  const sections = page.locator('main > header, main > section');
  await expect(sections).toHaveCount(7);
  await expect(sections.nth(0)).toHaveClass(/home-navigation/);
  await expect(sections.nth(1)).toHaveClass(/home-hero/);
  await expect(sections.nth(2)).toHaveAttribute(
    'data-work-slug',
    'luxury-handbag-pricing-architecture',
  );
  await expect(sections.nth(3)).toHaveAttribute('data-work-slug', 'olist-marketplace-analysis');
  await expect(sections.nth(4)).toHaveAttribute(
    'data-work-slug',
    'competitive-positioning-against-giants',
  );
  await expect(sections.nth(5)).toHaveId('about');
  await expect(sections.nth(6)).toHaveId('index');

  const workStories = page.locator('[data-work-slug]');
  await expect(workStories).toHaveCount(3);
  for (const story of await workStories.all()) {
    await expect(story.locator('img')).toHaveCount(0);
    await expect(story.locator('[data-work-title]')).toBeVisible();
    await expect(story.locator('[data-work-takeaway]')).toBeVisible();
    const notes = story.locator('[data-research-notes]');
    await expect(notes).not.toHaveAttribute('open', '');
    await notes.locator('summary').click();
    await expect(story.locator('[data-work-question]')).toBeVisible();
    await expect(story.locator('[data-work-outcome]')).toBeVisible();
    await expect(story.locator('[data-work-evidence]')).toHaveCount(3);
  }

  await expect(page.locator('[data-luxury-data-story]')).toBeVisible();
  await expect(page.locator('[data-olist-data-story]')).toBeVisible();
  await expect(page.locator('[data-competitive-data-story]')).toBeVisible();
});

test('Home renders Luxury as an expandable source-backed market story', async ({ page }) => {
  await page.goto('/');

  const luxury = page.locator('[data-work-slug="luxury-handbag-pricing-architecture"]');
  await expect(luxury).toBeVisible();
  await expect(luxury.locator('img')).toHaveCount(0);
  await expect(luxury.locator('[data-work-title]')).toHaveText('Luxury pricing, compared');
  await expect(luxury.locator('[data-work-takeaway]')).toBeVisible();
  const notes = luxury.locator('[data-research-notes]');
  await expect(notes).not.toHaveAttribute('open', '');
  await notes.locator('summary').click();
  await expect(luxury.locator('[data-work-question]')).toBeVisible();
  await expect(luxury.locator('[data-work-outcome]')).toBeVisible();
  await expect(luxury.locator('[data-work-evidence]')).toHaveCount(3);
  await expect(luxury.locator('[data-luxury-data-story]')).toBeVisible();

  const markets = luxury.locator('details[data-market-panel]');
  await expect(markets).toHaveCount(2);

  const france = luxury.locator('details[data-market="FR"]');
  const unitedStates = luxury.locator('details[data-market="US"]');
  await expect(france.locator('[data-brand-row]')).toHaveCount(4);
  await expect(unitedStates.locator('[data-brand-row]')).toHaveCount(4);
  await expect(france.locator('[data-brand-row="CHANEL"]')).toContainText(
    '€4,850–€12,250',
  );
  await expect(unitedStates.locator('[data-brand-row="Hermès"]')).toContainText(
    '$3,075–$13,200',
  );

  await expect(france).not.toHaveAttribute('open', '');
  await france.locator('summary').click();
  await expect(france).toHaveAttribute('open', '');
});

test('Home renders Olist as a decision-intelligence feature after Luxury', async ({ page }) => {
  await page.goto('/');

  const slugs = await page.locator('[data-work-slug]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('data-work-slug')),
  );
  expect(slugs.slice(0, 2)).toEqual([
    'luxury-handbag-pricing-architecture',
    'olist-marketplace-analysis',
  ]);

  const olist = page.locator('[data-work-slug="olist-marketplace-analysis"]');
  await expect(olist).toBeVisible();
  await expect(olist.locator('[data-decision-signal]')).toHaveText([
    'GROW',
    'DEFEND',
    'FIX',
    'INVESTIGATE',
  ]);
  await expect(olist.locator('img')).toHaveCount(0);
  await expect(olist.locator('[data-work-title]')).toHaveText('Growth and delivery, in tension');
  await expect(olist.locator('[data-work-takeaway]')).toBeVisible();
  await expect(olist.locator('[data-olist-data-story]')).toBeVisible();
  const metrics = olist.locator('[data-olist-metric]');
  await expect(metrics).toHaveCount(3);
  await expect(metrics.nth(0)).toHaveAttribute('open', '');
  await expect(metrics.nth(1)).toHaveAttribute('open', '');
  await expect(metrics.nth(0)).toContainText('R$2.99M');
  await expect(metrics.nth(0)).toContainText('R$7.22M');
  await expect(metrics.nth(1)).toContainText('96.50%');
  await expect(metrics.nth(1)).toContainText('92.27%');
  await expect(metrics.nth(1).locator('[role="img"]')).toBeVisible();
  await metrics.nth(2).locator('summary').click();
  await expect(metrics.nth(2)).toHaveAttribute('open', '');
  await expect(metrics.nth(2).locator('[data-olist-segment]')).toHaveCount(6);
  await expect(metrics.nth(2).locator('[data-olist-segment-caption]')).toHaveText(
    'ONE MARK = ONE MATERIAL FIX MARKET',
  );
  await expect(olist.locator('[data-olist-metric] a')).toHaveCount(0);
  await expect(olist.locator('[data-olist-signal]')).toHaveCount(4);
  await expect(olist.locator('[data-olist-data-story] a')).toHaveCount(2);
});

test('Home renders Competitive Positioning as a source-backed strategy feature after Olist', async ({ page }) => {
  await page.goto('/');

  const slugs = await page.locator('[data-work-slug]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('data-work-slug')),
  );
  expect(slugs.slice(0, 3)).toEqual([
    'luxury-handbag-pricing-architecture',
    'olist-marketplace-analysis',
    'competitive-positioning-against-giants',
  ]);

  const competitive = page.locator('[data-work-slug="competitive-positioning-against-giants"]');
  await expect(competitive).toBeVisible();
  await expect(competitive.locator('img')).toHaveCount(0);
  await expect(competitive.locator('[data-work-title]')).toHaveText('Smallness is not an advantage');
  await expect(competitive.locator('[data-work-takeaway]')).toBeVisible();
  await expect(competitive.locator('[data-competitive-data-story]')).toBeVisible();
  const mechanisms = competitive.locator('[data-competitive-mechanism]');
  await expect(mechanisms).toHaveCount(5);
  await expect(mechanisms.nth(0)).toContainText('Deliberate Constraint Advantage');
  await expect(mechanisms.nth(4)).toContainText('Selective Fit Flywheel');
  await mechanisms.nth(1).locator('summary').click();
  await expect(mechanisms.nth(1).locator('details')).toHaveAttribute('open', '');
  await expect(mechanisms.nth(1).locator('.competitive-data-story__mechanism-note')).toBeVisible();
  await expect(competitive.locator('[data-competitive-boundary]')).toHaveText(
    'INDEPENDENT COMPARATIVE ANALYSIS / NOT EMPLOYER-SPECIFIC',
  );
  await expect(competitive.locator('[data-competitive-data-story]')).not.toContainText('OPEN / CLOSE');
  await expect(competitive.locator('[data-competitive-data-story] a')).toHaveCount(1);
});

test('research remains readable with JavaScript disabled', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    await page.goto('/');
    for (const work of await page.locator('[data-work-slug]').all()) {
      await expect(work.locator('[data-work-title]')).toBeVisible();
      await expect(work.locator('[data-work-takeaway]')).toBeVisible();
      await work.locator('[data-research-notes] > summary').click();
      await expect(work.locator('[data-work-question]')).toBeVisible();
      await expect(work.locator('[data-work-outcome]')).toBeVisible();
      for (const evidence of await work.locator('[data-work-evidence]').all()) {
        await expect(evidence).toBeVisible();
      }
    }
  } finally {
    await context.close();
  }
});

test('reading links resolve and no viewport overflows', async ({ page }) => {
  await page.goto('/');
  for (const link of await page.locator('[data-home-reading]').all()) {
    const href = await link.getAttribute('href');
    expect(href).toMatch(/^#/);
    await expect(page.locator(href!)).toHaveCount(1);
  }

  for (const detail of await page.locator('details').all()) {
    if ((await detail.getAttribute('open')) === null) {
      await detail.locator('summary').click();
    }
  }

  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow, `overflow at ${width}px`).toBe(false);
  }
});

test('research notes can be opened with a keyboard', async ({ page }) => {
  await page.goto('/');
  const notes = page.locator('[data-research-notes]').first();
  await notes.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(notes).toHaveAttribute('open', '');
  await expect(notes.locator('[data-work-question]')).toBeVisible();
});
