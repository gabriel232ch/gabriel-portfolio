import { expect, test } from '@playwright/test';

const motionKinds = ['reveal', 'assemble', 'shift', 'morph'] as const;

test('full-motion users receive the entered state for every motion primitive', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/lab/design-system');

  for (const kind of motionKinds) {
    const specimen = page.locator(`[data-motion-demo="${kind}"]`);
    await specimen.scrollIntoViewIfNeeded();
    await expect(specimen).toHaveAttribute('data-motion-state', 'entered');
  }
});

test('reduced-motion users see every specimen without opacity or displacement loss', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/lab/design-system');

  const states = await page.locator('[data-motion-demo]').evaluateAll((elements) =>
    elements.map((element) => {
      const style = getComputedStyle(element);
      return {
        visible: style.visibility !== 'hidden' && Number(style.opacity) > 0,
        transform: style.transform,
      };
    }),
  );

  expect(states).toHaveLength(motionKinds.length);
  expect(states.every(({ visible }) => visible)).toBe(true);
  expect(states.every(({ transform }) => transform === 'none')).toBe(true);
});

test('unsupported IntersectionObserver browsers receive the entered state immediately', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: undefined,
    });
  });
  await page.goto('/lab/design-system');

  for (const kind of motionKinds) {
    await expect(page.locator(`[data-motion-demo="${kind}"]`)).toHaveAttribute(
      'data-motion-state',
      'entered',
    );
  }
});
