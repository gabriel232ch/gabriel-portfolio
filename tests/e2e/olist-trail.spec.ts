import {test,expect} from '@playwright/test';
test('Olist reasoning connects questions, methods, observations and pinned sources',async({page})=>{
 await page.goto('/work/olist-marketplace-analysis/');
 const steps=page.locator('[data-analysis-step]'); await expect(steps).toHaveCount(5);
 for(const step of await steps.all()) {await step.locator('summary').click();await expect(step.getByText('Why this mattered',{exact:true})).toHaveCount(1);await expect(step.getByText('Method',{exact:true})).toHaveCount(1);await expect(step.getByText('Observation',{exact:true})).toHaveCount(1);await expect(step.getByRole('link',{name:'Inspect the source →',exact:true})).toHaveAttribute('href',/84819c37b79ab7fcf7982e2f7063124432fee0cc/);}
 await expect(page.getByText('R$2.99M → R$7.22M',{exact:true})).toBeVisible();
});
