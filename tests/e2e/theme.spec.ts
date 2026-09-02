import { expect, test } from '@playwright/test';

test('explicit theme choice survives reload', async ({ page }) => {
  await page.goto('/');
  const initial = await page.locator('html').getAttribute('data-theme');

  await page.getByRole('button', { name: 'Switch color theme' }).click();
  const toggled = await page.locator('html').getAttribute('data-theme');
  expect(toggled).not.toBe(initial);

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', toggled ?? 'light');
});

test('page exposes a four-column mobile grid and twelve-column desktop grid', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.className = 'editorial-grid';
    probe.dataset.gridProbe = 'true';
    document.body.appendChild(probe);
  });

  const columns = await page.locator('[data-grid-probe]').evaluate((element) =>
    getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
  );

  const width = page.viewportSize()?.width ?? 0;
  if (width >= 1152) expect(columns).toBe(12);
  else if (width >= 768) expect(columns).toBe(6);
  else expect(columns).toBe(4);
});
