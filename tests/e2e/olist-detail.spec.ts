import { expect, test } from '@playwright/test';

const route = '/work/olist-marketplace-analysis/';
const viewports = [390, 768, 1024, 1440];

test('Olist detail fits review widths in light and dark themes', async ({ page }) => {
  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });

    for (const theme of ['light', 'dark'] as const) {
      await page.goto(route);
      await page.evaluate((selectedTheme) => localStorage.setItem('theme', selectedTheme), theme);
      await page.reload();

      await expect(page.locator('.research-page')).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);

      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth,
      );
      expect(overflow, `horizontal overflow at ${width}px in ${theme} theme`).toBe(false);
      await expect(page.locator('.research-page__grain-map')).toBeVisible();
      await expect(page.locator('.research-page__scale-figure')).toBeVisible();
      await expect(page.locator('.research-page__fix-list > li')).toHaveCount(6);
      await expect(page.locator('.research-page__delay-figure')).toBeVisible();
    }
  }
});

test('Olist detail has working section anchors, source links, and keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto(route);

  await page.keyboard.press('Tab');
  const focusedLink = page.locator(':focus');
  await expect(focusedLink).toHaveAttribute('href', '/');
  await expect(focusedLink).toHaveCSS('outline-style', 'solid');

  await page.getByRole('link', { name: 'Where I looked first ↓' }).click();
  await expect(page).toHaveURL(/#where-first$/);
  await expect(page.getByRole('heading', { level: 2, name: 'I started with markets where scale and service risk overlapped' })).toBeVisible();

  const sourceLinks = await page.locator('#sources a').evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).href),
  );
  expect(sourceLinks).toHaveLength(7);
  expect(sourceLinks.every((href) => href.startsWith('https://github.com/gabriel232ch/olist-marketplace-analytics/blob/main/'))).toBe(true);

  const sourceResponses = await Promise.all(sourceLinks.map((url) => page.request.get(url)));
  expect(sourceResponses.map((response) => response.status())).toEqual(sourceResponses.map(() => 200));
});
