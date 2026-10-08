import { expect, test } from '@playwright/test';

test('market matrix follows the selected month with exact rates and denominators', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Explore all six markets', { exact: false }).click();
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

test('selected inquiry turns reveal evidence and link to the source chapter', async ({ page }) => {
  await page.goto('/');
  const map = page.locator('.question-map');
  await map.locator('summary').last().click();
  await map.getByRole('link', { name: 'Follow this question ↗' }).click();
  await expect(page).toHaveURL(/\/work\/why-some-people-choose-smaller-companies\/#decision-support$/);
  await expect(page.locator('#decision-support')).toContainText('cannot decide for a candidate');
});

test('main Olist trajectory moves the guide and rates with keyboard months', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const story = page.locator('[data-trajectory-story]');
  await expect(page.locator('[data-market-matrix]')).not.toBeVisible();
  const slider = story.getByRole('slider');
  await slider.focus();
  await page.keyboard.press('Home');
  await expect(story.locator('[data-story-rate="0"]')).toHaveText('90.70%');
  await expect(story.locator('[data-story-count="0"]')).toHaveText('n=43');
  await expect(story.locator('[data-story-guide]')).toHaveAttribute('x1', '44');
  await page.keyboard.press('End');
  await expect(story.locator('[data-story-rate="0"]')).toHaveText('94.87%');
});

test('chart entry animation advances observations and yields to user input', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const story = page.locator('[data-trajectory-story]');
  await story.scrollIntoViewIfNeeded();
  await expect(story).toHaveAttribute('data-motion-state', 'entered');
  await story.getByRole('button', { name: 'Replay months' }).click();
  await expect(story.locator('[data-story-range]')).toHaveValue('0');
  await expect(story.locator('[data-story-range]')).toHaveValue('7');
  const slider = story.getByRole('slider');
  await slider.focus();
  await page.keyboard.press('Home');
  await expect(story).toHaveAttribute('data-interacting', 'true');
  await expect(slider).toHaveValue('0');
  await expect(story.locator('[data-story-rate="0"]')).toHaveText('90.70%');
});


test('Chanel years and measures reveal the corresponding filed values', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const portrait = page.locator('[data-recovery-portrait]');
  await portrait.getByRole('button', { name: '2024 Decline' }).click();
  await expect(portrait.locator('[data-portrait-title]')).toHaveText('All three measures fell.');
  await expect(portrait.locator('[data-portrait-actual]')).toHaveText('$18,699.3m · FY2024');
  await portrait.getByRole('button', { name: 'Operating profit', exact: true }).click();
  await expect(portrait.locator('[data-portrait-index]')).toHaveText('69.9');
  await expect(portrait.locator('[data-portrait-actual]')).toHaveText('$4,478.6m · FY2024');
  const slider = portrait.getByRole('slider', { name: 'Chanel observation year' });
  await slider.focus();
  await page.keyboard.press('End');
  await expect(portrait.locator('[data-portrait-index]')).toHaveText('73.5');
  await expect(portrait.locator('[data-portrait-actual]')).toHaveText('$4,711.5m · FY2025');
});

test('Chanel playback advances through decline and return and stops on selection', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const portrait = page.locator('[data-recovery-portrait]');
  await portrait.scrollIntoViewIfNeeded();
  await portrait.getByRole('button', { name: 'Play the recovery' }).click();
  await expect(portrait).toHaveAttribute('data-year', '0');
  await expect(portrait).toHaveAttribute('data-year', '1');
  await expect(portrait).toHaveAttribute('data-year', '2');
  await portrait.getByRole('button', { name: '2024 Decline' }).click();
  await expect(portrait).toHaveAttribute('data-playing', 'false');
  await expect(portrait).toHaveAttribute('data-year', '1');
});
