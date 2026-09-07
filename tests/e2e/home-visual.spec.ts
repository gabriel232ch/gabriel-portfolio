import { expect, test } from '@playwright/test';

test('desktop Home light visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('desktop'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('home-desktop-light.png', { fullPage: true });
});

test('desktop Home dark visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('desktop'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('home-desktop-dark.png', { fullPage: true });
});

test('mobile Home light visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('home-mobile-light.png', { fullPage: true });
});

test('mobile Home dark visual baseline', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('home-mobile-dark.png', { fullPage: true });
});
