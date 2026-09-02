import { expect, test } from '@playwright/test';

test('approved typography roles are exposed through semantic tokens', async ({ page }) => {
  await page.goto('/');

  const roles = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);

    return {
      display: styles.getPropertyValue('--font-display').trim(),
      editorial: styles.getPropertyValue('--font-editorial').trim(),
      body: styles.getPropertyValue('--font-body').trim(),
      data: styles.getPropertyValue('--font-data').trim(),
    };
  });

  expect(roles.display).toContain('Inter Variable');
  expect(roles.editorial).toContain('Cormorant Garamond Variable');
  expect(roles.body).toContain('Inter Variable');
  expect(roles.data).toContain('IBM Plex Mono');
});
