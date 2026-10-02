import {test,expect} from '@playwright/test';
const routes=['/','/work/luxury-handbag-pricing-architecture/','/work/olist-marketplace-analysis/','/work/why-some-people-choose-smaller-companies/'];
for(const width of [390,1440]) for(const theme of ['light','dark']) for(const motion of ['regular','quiet','reduced']) test(`review ${width} ${theme} ${motion}`,async({page},info)=>{
 test.skip(!info.project.name.startsWith('desktop'));
 await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:motion==='reduced'?'reduce':'no-preference'});
 await page.addInitScript(({theme,motion})=>{localStorage.setItem('theme',theme);localStorage.setItem('quiet-motion',String(motion==='quiet'));},{theme,motion});
 for(const [i,route] of routes.entries()) {
  await page.goto(route);await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator('h1')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if(motion!=='regular')await expect(page.locator('html')).toHaveAttribute('data-quiet','true');
  const controls=page.locator('header :is(a,button,summary)').filter({visible:true});
  for(const control of await controls.all()) {const box=await control.boundingBox();expect(box?.width).toBeGreaterThanOrEqual(44);expect(box?.height).toBeGreaterThanOrEqual(44);}
  if(motion==='quiet')await page.screenshot({path:`docs/audit-2026-10-02/after/page-${i}-${width}-${theme}.png`});
 }
});
test('article progress excludes the hero and footer',async({page})=>{
 await page.goto('/work/olist-marketplace-analysis/');const progress=page.locator('[data-reading-progress]');
 await expect(progress).toHaveAttribute('data-progress','0');
 await page.locator('.research-footer').scrollIntoViewIfNeeded();await expect(progress).toHaveAttribute('data-progress','1');
});
test('no-JS report still shows complete chart geometry',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('/work/luxury-handbag-pricing-architecture/');
 await expect(page.locator('.report-price-lane__node').first()).toHaveCSS('opacity','1');
 const transform=await page.locator('.report-history-bar').first().evaluate(n=>getComputedStyle(n).transform);expect(transform).toBe('matrix(1, 0, 0, 1, 0, 0)');await context.close();
});
test('captures contextual navigation and research interactions',async({page},info)=>{
 test.skip(!info.project.name.startsWith('desktop'));
 for(const width of [390,1440])for(const theme of ['light','dark']) {
  await page.setViewportSize({width,height:900});await page.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('quiet-motion','true');},theme);
  await page.goto('/#olist');await page.evaluate(()=>document.fonts.ready);
  await page.locator('[data-home-navigation] summary').click();await page.screenshot({path:`docs/audit-2026-10-02/after/explore-${width}-${theme}.png`});
  await page.goto('/work/luxury-handbag-pricing-architecture/');await page.getByRole('button',{name:'France entry price: EUR 4,850',exact:true}).click();
  await page.locator('.chart-inspector').first().scrollIntoViewIfNeeded();await page.screenshot({path:`docs/audit-2026-10-02/after/chart-${width}-${theme}.png`});
  const table=page.locator('.report-table-wrap').first();await table.scrollIntoViewIfNeeded();if(await table.getAttribute('data-overflow')==='true'){await table.focus();await page.keyboard.press('ArrowRight');await expect.poll(()=>table.evaluate(n=>n.scrollLeft)).toBeGreaterThan(0);}
  await page.goto('/work/olist-marketplace-analysis/#analysis-trail-title');await page.locator('[data-analysis-step]').first().locator('summary').click();await page.screenshot({path:`docs/audit-2026-10-02/after/trail-${width}-${theme}.png`});
 }
});
