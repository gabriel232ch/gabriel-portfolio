import { expect, test, type Page } from '@playwright/test';

async function preparePhotographs(page: Page) {
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.locator('main img').evaluateAll((images) => {
    images.forEach((image) => { (image as HTMLImageElement).loading = 'eager'; });
  });
  await expect.poll(() => page.locator('main img').evaluateAll((images) =>
    images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0),
  )).toBe(true);
  await page.locator('main img').evaluateAll((images) =>
    Promise.all(images.map((image) => (image as HTMLImageElement).decode())),
  );
  await page.evaluate(() => window.scrollTo(0, 0));
}

test('desktop Home light visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('desktop'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await preparePhotographs(page);
  await expect(page).toHaveScreenshot('home-desktop-light.png', { fullPage: true });
});

test('desktop Home dark visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('desktop'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await preparePhotographs(page);
  await expect(page).toHaveScreenshot('home-desktop-dark.png', { fullPage: true });
});

test('mobile Home light visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await preparePhotographs(page);
  await expect(page).toHaveScreenshot('home-mobile-light.png', { fullPage: true });
});

test('mobile Home dark visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await preparePhotographs(page);
  await expect(page).toHaveScreenshot('home-mobile-dark.png', { fullPage: true });
});
