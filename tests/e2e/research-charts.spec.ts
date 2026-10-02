import {test,expect} from '@playwright/test';
test('chart selection locks accurate values independently and clears with keyboard',async({page})=>{
 await page.goto('/work/luxury-handbag-pricing-architecture/');
 const first=page.locator('[data-interactive-chart]').first();
 const entry=first.getByRole('button',{name:'France entry price: EUR 4,850',exact:true});
 await entry.click();
 await expect(first.locator('[data-chart-readout]')).toHaveText('France entry price: EUR 4,850');
 await first.locator('[data-chart-bar]').nth(1).hover();
 await expect(first.locator('[data-chart-readout]')).toHaveText('France entry price: EUR 4,850');
 const next=page.locator('[data-interactive-chart]').nth(1);
 await next.locator('[data-chart-bar]').first().focus(); await page.keyboard.press('Enter');
 await expect(first.locator('[data-chart-bar][aria-pressed="true"]')).toHaveCount(1);
 await expect(next.locator('[data-chart-bar][aria-pressed="true"]')).toHaveCount(1);
 await page.keyboard.press('Escape'); await expect(next.locator('[data-chart-bar][aria-pressed="true"]')).toHaveCount(0);
 await first.getByRole('button',{name:'Clear selection',exact:true}).click();
 await expect(first.locator('[data-chart-bar][aria-pressed="true"]')).toHaveCount(0);
});
test('touch provides the same readout and repeated selection clears it',async({browser})=>{
 const context=await browser.newContext({hasTouch:true,viewport:{width:390,height:844}}); const page=await context.newPage();
 await page.goto('/work/luxury-handbag-pricing-architecture/'); const chart=page.locator('[data-interactive-chart]').first();
 const entry=chart.getByRole('button',{name:'France entry price: EUR 4,850',exact:true}); await entry.tap();
 await expect(chart.locator('[data-chart-readout]')).toHaveText('France entry price: EUR 4,850'); await entry.tap();
 await expect(entry).toHaveAttribute('aria-pressed','false'); await context.close();
});
test('touch targets preserve the encoded FCF proportions',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('quiet-motion','true'));await page.goto('/work/luxury-handbag-pricing-architecture/');
 const bars=page.locator('[data-chart-bar][data-series="fcf"]');
 const heights=await bars.evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().height));
 expect(heights[0]/heights[4]).toBeCloseTo(679/1842,2);
});
