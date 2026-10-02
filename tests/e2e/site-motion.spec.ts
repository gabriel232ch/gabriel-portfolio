import { expect, test } from '@playwright/test';

test('Quiet persists and system preference takes precedence dynamically', async ({page}) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  await page.getByRole('button',{name:'Quiet motion',exact:true}).click();
  await expect(page.locator('html')).toHaveAttribute('data-quiet','true');
  await page.goto('/work/olist-marketplace-analysis/');
  await expect(page.getByRole('button',{name:'Quiet motion',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Quiet motion',exact:true}).click();
  await expect(page.locator('html')).toHaveAttribute('data-quiet','false');
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('html')).toHaveAttribute('data-quiet','true');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await expect(page.locator('html')).toHaveAttribute('data-quiet','false');
});

test('denied storage does not disable theme or Quiet', async ({page}) => {
  await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Denied','SecurityError');}}));
  await page.goto('/');
  const initial=await page.locator('html').getAttribute('data-theme');
  await page.getByRole('button',{name:'Switch color theme'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme',initial==='dark'?'light':'dark');
  await page.getByRole('button',{name:'Quiet motion',exact:true}).click();
  await expect(page.locator('html')).toHaveAttribute('data-quiet','true');
});

test('oversized narrative stages enter and dynamic Quiet reveals all stages',async ({page})=>{
  await page.goto('/');
  const stage=page.locator('[data-home-motion]').last();
  await stage.evaluate(n=>n.style.minHeight='3000px');
  await stage.scrollIntoViewIfNeeded();
  await expect(stage).toHaveAttribute('data-motion-state','entered');
  await page.emulateMedia({reducedMotion:'reduce'});
  const invisible=await page.locator('[data-home-motion]').evaluateAll(nodes=>nodes.filter(n=>Number(getComputedStyle(n).opacity)===0).length);
  expect(invisible).toBe(0);
});

test('without script all research and the signature remain visible', async ({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.getByRole('heading',{name:'Gabriel Chen',exact:true})).toBeVisible();
  await expect(page.locator('[data-home-chapter="olist"]')).toBeVisible();
  expect(await page.locator('.home-hero__signature-fill').first().evaluate(n=>Number(getComputedStyle(n).opacity))).toBe(1);
  await context.close();
});
