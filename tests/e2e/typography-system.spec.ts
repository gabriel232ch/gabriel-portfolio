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

  expect(roles.display).toContain('Cormorant Garamond Variable');
  expect(roles.editorial).toContain('Cormorant Garamond Variable');
  expect(roles.body).toContain('Baskerville');
  expect(roles.data).toContain('IBM Plex Mono');
});

test('Home and Chanel report resolve the approved visible typography roles', async ({ page }) => {
  await page.goto('/');

  const homeRoles = await page.evaluate(() => ({
    body: getComputedStyle(document.querySelector('.chanel-chapter__opening > .body-copy')!).fontFamily,
    metric: getComputedStyle(document.querySelector('.chanel-history-signal__rows strong')!).fontFamily,
    display: getComputedStyle(document.querySelector('.chanel-chapter__opening h2')!).fontFamily,
    data: getComputedStyle(document.querySelector('.chanel-chapter__opening > .data-copy')!).fontFamily,
  }));

  expect(homeRoles.body).toContain('Baskerville');
  expect(homeRoles.metric).toContain('Didot');
  expect(homeRoles.display).toContain('Cormorant Garamond Variable');
  expect(homeRoles.data).toContain('IBM Plex Mono');

  await page.goto('/work/luxury-handbag-pricing-architecture/');

  const reportRoles = await page.evaluate(() => ({
    body: getComputedStyle(document.querySelector('.report-section > p:not(.report-section__number):not(.report-claim):not(.report-note)')!).fontFamily,
    metric: getComputedStyle(document.querySelector('.report-kpi-card strong')!).fontFamily,
    claim: getComputedStyle(document.querySelector('.report-claim')!).fontFamily,
    sectionNumber: getComputedStyle(document.querySelector('.report-section__number')!).fontFamily,
    data: getComputedStyle(document.querySelector('.report-meta')!).fontFamily,
  }));

  expect(reportRoles.body).toContain('Baskerville');
  expect(reportRoles.metric).toContain('Didot');
  expect(reportRoles.claim).toContain('Cormorant Garamond Variable');
  expect(reportRoles.sectionNumber).toContain('IBM Plex Mono');
  expect(reportRoles.data).toContain('IBM Plex Mono');
});
