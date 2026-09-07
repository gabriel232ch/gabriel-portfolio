import { expect, test } from '@playwright/test';

test('Home narrative stages enter once they reach the viewport', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');

  const stages = page.locator('[data-home-motion]');
  expect(await stages.count()).toBeGreaterThan(0);

  for (const stage of await stages.all()) {
    await stage.scrollIntoViewIfNeeded();
    await expect(stage).toHaveAttribute('data-motion-state', 'entered');
  }
});

test('reduced motion preserves all Home information without displacement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const states = await page.locator('[data-home-motion]').evaluateAll((nodes) =>
    nodes.map((node) => ({
      opacity: Number(getComputedStyle(node).opacity),
      transform: getComputedStyle(node).transform,
    })),
  );

  expect(states.length).toBeGreaterThan(0);
  expect(states.every((state) => state.opacity > 0)).toBe(true);
  expect(states.every((state) => state.transform === 'none')).toBe(true);
  await expect(page.locator('[data-home-ambient]')).toHaveCount(0);
  const notes = page.locator('[data-research-notes]').first();
  await notes.locator('summary').click();
  await expect(notes.locator('[data-work-question]')).toHaveCSS('opacity', '1');
});

test('unsupported IntersectionObserver browsers enter Home stages immediately', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: undefined,
    });
  });
  await page.goto('/');

  const stages = page.locator('[data-home-motion]');
  expect(await stages.count()).toBeGreaterThan(0);

  for (const stage of await stages.all()) {
    await expect(stage).toHaveAttribute('data-motion-state', 'entered');
  }
});
