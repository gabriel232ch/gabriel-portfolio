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
