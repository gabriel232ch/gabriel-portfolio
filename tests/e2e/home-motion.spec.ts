import { expect, test, type Page } from '@playwright/test';

const nextFrame = (page: Page) =>
  page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

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
  const signatureState = await page.locator('[data-signature-reveal]').evaluate((node) => ({
    drawCount: node.querySelectorAll('.home-hero__signature-draw').length,
    drawOffset: getComputedStyle(node.querySelector('.home-hero__signature-draw')!).strokeDashoffset,
    drawAnimation: getComputedStyle(node.querySelector('.home-hero__signature-draw')!).animationName,
    fillCount: node.querySelectorAll('.home-hero__signature-fill').length,
    fillOpacity: getComputedStyle(node.querySelector('.home-hero__signature-fill')!).opacity,
    fillAnimation: getComputedStyle(node.querySelector('.home-hero__signature-fill')!).animationName,
  }));
  expect(signatureState.drawCount).toBe(11);
  expect(signatureState.drawOffset).toBe('0px');
  expect(signatureState.drawAnimation).toBe('none');
  expect(signatureState.fillCount).toBe(11);
  expect(signatureState.fillOpacity).toBe('1');
  expect(signatureState.fillAnimation).toBe('none');
  await expect(page.locator('[data-home-ambient]')).toHaveCount(0);
  await expect(page.locator('[data-home-chapter="chanel"]')).toBeVisible();
  await expect(page.locator('[data-home-chapter="olist"]')).toBeVisible();
  await expect(page.locator('[data-home-chapter="smaller-companies"]')).toBeVisible();
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

test('Homepage data blocks auto-play once and remain entered after scrolling back', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');

  const blocks = page.locator('[data-motion-sequence]');
  await expect(blocks).toHaveCount(5);

  for (const block of await blocks.all()) {
    await block.scrollIntoViewIfNeeded();
    await expect(block).toHaveAttribute('data-motion-state', 'entered');
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await blocks.nth(0).scrollIntoViewIfNeeded();
  await expect(blocks.nth(0)).toHaveAttribute('data-motion-state', 'entered');
});

test('Homepage replay restarts only the associated data block', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');

  const history = page.locator('[data-motion-sequence="history-signal"]');
  const business = page.locator('[data-motion-sequence="business-signal"]');
  await history.scrollIntoViewIfNeeded();
  await business.scrollIntoViewIfNeeded();
  await expect(history).toHaveAttribute('data-motion-state', 'entered');
  await expect(business).toHaveAttribute('data-motion-state', 'entered');

  const stateAfterReplay = await page.evaluate(() => {
    document.querySelector<HTMLElement>('[data-motion-sequence="history-signal"] [data-motion-replay]')?.click();
    return document.querySelector<HTMLElement>('[data-motion-sequence="history-signal"]')?.dataset.motionState;
  });
  expect(stateAfterReplay).toBe('pending');
  await nextFrame(page);
  await expect(history).toHaveAttribute('data-motion-state', 'entered');
  await expect(business).toHaveAttribute('data-motion-state', 'entered');
});

test('clicking a KPI number replays its complete data block', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');

  const history = page.locator('[data-motion-sequence="history-signal"]');
  await history.scrollIntoViewIfNeeded();
  await expect(history).toHaveAttribute('data-motion-state', 'entered');

  const stateAfterKpiClick = await page.locator('[data-motion-sequence="history-signal"] [data-motion-replay-number]').first().evaluate((button) => {
    (button as HTMLButtonElement).click();
    return button.closest<HTMLElement>('[data-motion-sequence]')?.dataset.motionState;
  });
  expect(stateAfterKpiClick).toBe('pending');
  await nextFrame(page);
  await expect(history).toHaveAttribute('data-motion-state', 'entered');
  await expect(history.locator('strong').first()).toHaveText('+18.1%');
  await expect(history.locator('[data-motion-replay-number]')).toHaveCount(2);
});

test('rapid replay settles deterministically without queued restarts', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');

  const metrics = page.locator('[data-motion-sequence="olist-metrics"]');
  await metrics.scrollIntoViewIfNeeded();
  await expect(metrics).toHaveAttribute('data-motion-state', 'entered');

  const stateAfterRapidClicks = await page.evaluate(() => {
    const button = document.querySelector<HTMLElement>('[data-motion-sequence="olist-metrics"] [data-motion-replay]');
    for (let index = 0; index < 12; index += 1) button?.click();
    return document.querySelector<HTMLElement>('[data-motion-sequence="olist-metrics"]')?.dataset.motionState;
  });
  expect(stateAfterRapidClicks).toBe('pending');
  await nextFrame(page);
  await expect(metrics).toHaveAttribute('data-motion-state', 'entered');
  await page.waitForTimeout(900);
  await expect(metrics).toHaveAttribute('data-motion-state', 'entered');
  await expect(metrics.locator('strong').first()).toHaveText('R$2.99M → R$7.22M');
});

test('reduced motion keeps Homepage data immediately readable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const states = await page.locator('[data-motion-sequence]').evaluateAll((blocks) =>
    blocks.map((block) => ({
      state: block.getAttribute('data-motion-state'),
      numbers: [...block.querySelectorAll<HTMLElement>('[data-motion-part="number"]')].map((number) => {
        const style = getComputedStyle(number);
        return { opacity: style.opacity, filter: style.filter, transform: style.transform, transition: style.transitionDuration };
      }),
      parts: [...block.querySelectorAll<HTMLElement>('[data-motion-part]')].map((part) => getComputedStyle(part).transitionDuration),
    })),
  );

  expect(states.every((block) => block.state === 'entered')).toBe(true);
  expect(states.flatMap((block) => block.numbers).every((number) =>
    number.opacity === '1' && number.filter === 'none' && number.transform === 'none' && number.transition === '0s')).toBe(true);
  expect(states.flatMap((block) => block.parts).every((duration) => duration === '0s')).toBe(true);

  await page.locator('[data-motion-sequence="history-signal"] [data-motion-replay]').click();
  await expect(page.locator('[data-motion-sequence="history-signal"]')).toHaveAttribute('data-motion-state', 'entered');
});
