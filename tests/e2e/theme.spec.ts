import { expect, test } from '@playwright/test';

test('explicit theme choice survives reload', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const initial = await html.getAttribute('data-theme');
  const expected = initial === 'dark' ? 'light' : 'dark';

  await page.getByRole('button', { name: 'Switch color theme' }).click();

  await expect(html).toHaveAttribute('data-theme', expected);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('theme')))
    .toBe(expected);

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', expected);
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

test('theme toggle uses a view transition when the browser supports it', async ({ page }) => {
  await page.addInitScript(() => {
    const probe = { calls: 0 };

    Object.defineProperty(window, '__themeTransitionProbe', {
      configurable: true,
      value: probe,
    });

    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: (update: () => void | Promise<void>) => {
        probe.calls += 1;

        const updateCallbackDone = Promise.resolve().then(update);

        return {
          ready: Promise.resolve(),
          updateCallbackDone,
          finished: updateCallbackDone,
          skipTransition() {},
        };
      },
    });
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Switch color theme' }).click();

  const calls = await page.evaluate(
    () =>
      (
        window as typeof window & {
          __themeTransitionProbe?: { calls: number };
        }
      ).__themeTransitionProbe?.calls ?? 0,
  );

  expect(calls).toBe(1);
});

test('theme still toggles when view transitions cannot run', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'hidden',
    });

    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: () => {
        throw new Error('View transition should not run while document is hidden');
      },
    });
  });

  await page.goto('/');

  const html = page.locator('html');
  const initial = await html.getAttribute('data-theme');
  const expected = initial === 'dark' ? 'light' : 'dark';

  await page.getByRole('button', { name: 'Switch color theme' }).click();

  await expect(html).toHaveAttribute('data-theme', expected);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('theme')))
    .toBe(expected);
});
