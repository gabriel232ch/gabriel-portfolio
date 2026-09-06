import { expect, test } from '@playwright/test';

test('Home exposes lightweight navigation and the Living Signal Hero', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'WORK' })).toHaveAttribute('href', '#work');
  await expect(page.getByRole('link', { name: 'ABOUT' })).toHaveAttribute('href', '#about');
  await expect(page.getByRole('link', { name: 'INDEX' })).toHaveAttribute('href', '#index');
  await expect(page.getByRole('heading', { level: 1, name: 'Gabriel Chen' })).toBeVisible();
  await expect(page.getByText('CURRENT PHASE')).toBeVisible();
  await expect(page.locator('[data-home-movement]')).toHaveCount(2);
});

test('Home renders Luxury as an expandable source-backed market story', async ({ page }) => {
  await page.goto('/');

  const luxury = page.locator('[data-work-slug="luxury-handbag-pricing-architecture"]');
  await expect(luxury).toBeVisible();
  await expect(luxury.locator('img')).toHaveCount(0);
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
  await expect(olist.locator('[data-work-question]')).toBeVisible();
  await expect(olist.locator('[data-work-outcome]')).toBeVisible();
  await expect(olist.locator('[data-work-evidence]')).toHaveCount(3);
  await expect(olist.locator('[data-olist-data-story]')).toBeVisible();
  const metrics = olist.locator('[data-olist-metric]');
  await expect(metrics).toHaveCount(3);
  await expect(metrics.nth(0)).toHaveAttribute('open', '');
  await metrics.nth(1).locator('summary').click();
  await expect(metrics.nth(1)).toHaveAttribute('open', '');
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
