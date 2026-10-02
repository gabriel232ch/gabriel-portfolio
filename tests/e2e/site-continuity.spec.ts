import {expect,test} from '@playwright/test';
test('explicit return targets Olist and finishes the signature',async ({page})=>{
  await page.goto('/');
  await page.getByRole('link',{name:'Explore the analysis →',exact:true}).click();
  await expect(page).toHaveURL(/olist-marketplace-analysis/);
  await page.getByRole('link',{name:'Back to home',exact:true}).click();
  await expect(page).toHaveURL(/\/#olist$/);
  await expect(page.locator('#olist')).toBeInViewport();
  expect(await page.locator('.home-hero__signature-fill').first().evaluate(n=>getComputedStyle(n).animationName)).toBe('none');
});
test('history returns to the original reading position',async ({page})=>{
  await page.goto('/');
  const link=page.getByRole('link',{name:'Explore the current research →',exact:true});
  await link.scrollIntoViewIfNeeded();
  await link.click({trial:true});
  // Measure departure after the browser has positioned the activated link.
  await page.evaluate(()=>window.addEventListener('pagehide',()=>sessionStorage.setItem('test-departure-scroll',String(scrollY)),{once:true}));
  await link.click();
  await page.goBack();
  await expect.poll(()=>page.evaluate(()=>Math.abs(scrollY-Number(sessionStorage.getItem('test-departure-scroll'))))).toBeLessThan(100);
});
test('deep-linked home chapter is visible without replaying the identity',async ({page})=>{
  await page.goto('/#olist');
  await expect(page.locator('#olist')).toBeInViewport();
  expect(await page.locator('.home-hero__signature-fill').first().evaluate(n=>getComputedStyle(n).animationName)).toBe('none');
});
