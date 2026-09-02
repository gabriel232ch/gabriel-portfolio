import { expect, test } from '@playwright/test';

test('typography lab renders the three approved serif finalists in real editorial roles', async ({ page }) => {
  await page.goto('/lab/typography');

  await expect(page).toHaveTitle('Typography Lab — Gabriel Chen');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');

  const sections = page.locator('main > section');
  await expect(sections).toHaveCount(3);

  const finalists = [
    {
      label: 'C / Spectral',
      family: 'Spectral',
    },
    {
      label: 'A / Cormorant Garamond',
      family: 'Cormorant Garamond Variable',
    },
    {
      label: 'E / Newsreader',
      family: 'Newsreader Variable',
    },
  ];

  for (const [index, finalist] of finalists.entries()) {
    const section = sections.nth(index);

    await expect(section).toContainText(finalist.label);

    const displayFamily = await section.locator('h1').evaluate(
      (element) => getComputedStyle(element).fontFamily,
    );

    const kickerFamily = await section.locator('[data-serif-kicker]').evaluate(
      (element) => getComputedStyle(element).fontFamily,
    );

    const ledeFamily = await section.locator('[data-serif-lede]').evaluate(
      (element) => getComputedStyle(element).fontFamily,
    );

    const quoteFamily = await section.locator('[data-serif-quote]').evaluate(
      (element) => getComputedStyle(element).fontFamily,
    );

    expect(displayFamily).toContain('Inter Variable');
    expect(kickerFamily).toContain(finalist.family);
    expect(ledeFamily).toContain(finalist.family);
    expect(quoteFamily).toContain(finalist.family);
  }
});

test('typography finalist lab exposes the site theme control', async ({ page }) => {
  await page.goto('/lab/typography');

  await expect(
    page.getByRole('button', { name: 'Switch color theme' }),
  ).toBeVisible();
});
