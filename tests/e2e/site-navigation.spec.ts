import { expect, test } from '@playwright/test';

const cases = [
  ['luxury-handbag-pricing-architecture', 'chanel'],
  ['olist-marketplace-analysis', 'olist'],
  ['why-some-people-choose-smaller-companies', 'smaller-companies'],
] as const;

for (const [slug, anchor] of cases) {
  test(`${anchor} exposes a correct return, theme and other research`, async ({ page }) => {
    await page.goto(`/work/${slug}/`);
    await expect(page.getByRole('link', { name: 'Back to home', exact: true })).toHaveAttribute('href', `/#${anchor}`);
    await expect(page.getByRole('button', { name: 'Switch color theme' })).toHaveCount(1);
    await expect(page.getByRole('navigation', { name: 'Other questions' }).getByRole('link')).toHaveCount(2);
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const boxes = await page.locator('[data-site-header] a, [data-site-header] button').evaluateAll(nodes => nodes.map(n => {
        const r = n.getBoundingClientRect();
        return { x:r.x, y:r.y, right:r.right, bottom:r.bottom, width:r.width, height:r.height };
      }));
      expect(boxes.length).toBeGreaterThan(2);
      for (const box of boxes) { expect(box.width).toBeGreaterThanOrEqual(44); expect(box.height).toBeGreaterThanOrEqual(44); }
      for (let i=0;i<boxes.length;i++) for (let j=i+1;j<boxes.length;j++) {
        const a=boxes[i], b=boxes[j];
        expect(a.right<=b.x || b.right<=a.x || a.bottom<=b.y || b.bottom<=a.y).toBe(true);
      }
    }
  });
}

test('all home destinations preserve old and new anchors', async ({ page }) => {
  await page.goto('/');
  for (const id of ['work','about','chanel','olist','smaller-companies']) await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
});
