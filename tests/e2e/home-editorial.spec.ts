import { expect, test } from '@playwright/test';

test('market matrix follows the selected month with exact rates and denominators', async ({ page }) => {
  await page.goto('/');
  const matrix = page.locator('[data-market-matrix]');
  const watches = matrix.locator('[data-matrix-row]').first();
  await expect(watches.locator('[data-matrix-rate]')).toHaveText('94.87%');
  await expect(watches.locator('[data-matrix-count]')).toHaveText('n=39');
  const slider = matrix.getByRole('slider', { name: 'Explore month' });
  await slider.focus();
  await page.keyboard.press('Home');
  await expect(slider).toHaveAttribute('aria-valuetext', 'January 2018');
  await expect(watches.locator('[data-matrix-rate]')).toHaveText('90.70%');
  await expect(watches.locator('[data-matrix-count]')).toHaveText('n=43');
  await expect(matrix.locator('[data-matrix-cell="0"][data-selected="true"]')).toHaveCount(6);
  await page.keyboard.press('End');
  await expect(watches.locator('[data-matrix-rate]')).toHaveText('94.87%');
  await expect(matrix).toContainText('not a new ranking');
});

test('Chanel measure emphasis can be selected and cleared with the keyboard', async ({ page }) => {
  await page.goto('/');
  const portrait = page.locator('[data-recovery-portrait]');
  const profit = portrait.getByRole('button', { name: 'Operating profit', exact: true });
  await profit.focus();
  await page.keyboard.press('Enter');
  await expect(profit).toHaveAttribute('aria-pressed', 'true');
  await expect(portrait.locator('[data-portrait-series="0"]')).toHaveAttribute('data-muted', 'true');
  await expect(portrait.locator('[data-portrait-series="1"]')).toHaveAttribute('data-muted', 'false');
  await page.keyboard.press('Enter');
  await expect(profit).toHaveAttribute('aria-pressed', 'false');
  await expect(portrait.locator('[data-muted="true"]')).toHaveCount(0);
});

test('selected inquiry turns link to real evidence chapters', async ({ page }) => {
  await page.goto('/');
  const design = page.locator('.question-map').getByRole('link').last();
  await design.click();
  await expect(page).toHaveURL(/\/work\/why-some-people-choose-smaller-companies\/#crossroads$/);
  await expect(page.locator('#crossroads')).toContainText('has not shipped publicly');
});
