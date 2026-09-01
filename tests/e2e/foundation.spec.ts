import { expect, test } from '@playwright/test';

test('foundation page exposes the intended temporary construction state', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Gabriel Chen');
  await expect(page.getByRole('heading', { name: 'Gabriel Chen' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});

test('unknown routes return the custom 404', async ({ page }) => {
  const response = await page.goto('/this-route-must-not-exist');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'This page does not exist.' })).toBeVisible();
});
