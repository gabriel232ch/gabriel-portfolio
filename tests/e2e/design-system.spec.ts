import { expect, test } from '@playwright/test';

test('design-system lab renders the approved editorial vocabulary', async ({ page }) => {
  await page.goto('/lab/design-system');

  await expect(page.getByText('G.026')).toBeVisible();
  await expect(page.getByText('BUILDING SYSTEMS')).toBeVisible();
  await expect(page.getByText('PH.04')).toBeVisible();
  await expect(page.getByText('How large is the premium?')).toBeVisible();
  await expect(page.getByText('10.5k')).toBeVisible();
  await expect(page.getByText('7.2k')).toBeVisible();
  await expect(page.getByText('+46%')).toBeVisible();
  await expect(page.getByText('182 SKUs')).toBeVisible();
  await expect(page.getByText('12 brands')).toBeVisible();
  await expect(page.getByText('2025 snapshot')).toBeVisible();
});

test('theme toggle remains accessible after scrolling', async ({ page }) => {
  await page.goto('/lab/design-system');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const toggle = page.locator('[data-theme-toggle]');
  const inViewport = await toggle.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  });

  expect(inViewport).toBe(true);
});

test('main preserves the full symmetric reading width', async ({ page }) => {
  await page.goto('/lab/design-system');

  const padding = await page.locator('main').evaluate((element) => {
    const style = getComputedStyle(element);

    return {
      start: Number.parseFloat(style.paddingInlineStart),
      end: Number.parseFloat(style.paddingInlineEnd),
    };
  });

  expect(padding.end).toBeCloseTo(padding.start, 3);
});

test('fixed theme toggle never crosses the right-edge editorial label while scrolling', async ({ page }, testInfo) => {
  if (testInfo.project.name.startsWith('mobile')) {
    await page.setViewportSize({ width: 440, height: 956 });
  }

  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/lab/design-system');

  const collision = await page.evaluate(async () => {
    const label = Array.from(document.querySelectorAll('*')).find(
      (element) => element.textContent?.trim() === 'SELECTED WORK'
    );
    const toggle = document.querySelector('[data-theme-toggle]');

    if (!(label instanceof HTMLElement) || !(toggle instanceof HTMLElement)) {
      throw new Error('Required elements not found');
    }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    for (let y = 0; y <= maxScroll; y += 8) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const a = label.getBoundingClientRect();
      const b = toggle.getBoundingClientRect();

      const overlaps = !(
        a.right <= b.left ||
        a.left >= b.right ||
        a.bottom <= b.top ||
        a.top >= b.bottom
      );

      if (overlaps) {
        return { y, label: a.toJSON(), toggle: b.toJSON() };
      }
    }

    return null;
  });

  expect(collision).toBeNull();
});

test('theme toggle uses the compact utility scale', async ({ page }) => {
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto('/lab/design-system');

  const toggle = page.locator('[data-theme-toggle]');

  await expect(toggle).toHaveCSS('font-size', '9px');

  await page.setViewportSize({ width: 1280, height: 800 });

  await expect(toggle).toHaveCSS('font-size', '10px');
});

test('desktop design-system light world visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('desktop'));
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  await page.goto('/lab/design-system');
  await expect(page).toHaveScreenshot('design-system-light.png', { fullPage: true });
});

test('desktop design-system dark world visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('desktop'));
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/lab/design-system');
  await expect(page).toHaveScreenshot('design-system-dark.png', { fullPage: true });
});
