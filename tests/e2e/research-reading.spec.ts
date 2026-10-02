import {test,expect} from '@playwright/test';
const pages=[['luxury-handbag-pricing-architecture','boundaries','Evidence boundaries'],['olist-marketplace-analysis','limits-title','Limits'],['why-some-people-choose-smaller-companies','patterns-title','Patterns']];
for(const [route,id,label] of pages) test(`${route} directory gives keyboard reading access`,async({page})=>{
  await page.setViewportSize({width:390,height:844}); await page.goto(`/work/${route}/`);
  const directory=page.locator('[data-reading-contents]');
  await directory.getByText('On this page',{exact:true}).click();
  await directory.getByRole('link',{name:label,exact:true}).click();
  await expect(page.locator(`#${id}`)).toBeInViewport();
  await expect(directory.locator('details')).not.toHaveAttribute('open','');
  await expect(directory.getByRole('link',{name:label,exact:true,includeHidden:true})).toHaveAttribute('aria-current','location');
  const focused=page.locator(`#${id}`).locator('h2').or(page.locator(`h2#${id}`));
  await expect(focused).toBeFocused();
});
