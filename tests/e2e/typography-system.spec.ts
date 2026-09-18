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
      readingSize: styles.getPropertyValue('--font-size-reading').trim(),
      projectTitleSize: styles.getPropertyValue('--font-size-project-title').trim(),
    };
  });

  expect(roles.display).toContain('Cormorant Garamond Variable');
  expect(roles.editorial).toContain('Cormorant Garamond Variable');
  expect(roles.body).toContain('Baskerville');
  expect(roles.data).toContain('IBM Plex Mono');
  expect(roles.readingSize).toContain('clamp');
  expect(roles.projectTitleSize).toContain('clamp');
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

test('Home resolves semantic body, metadata, and KPI scales at mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const sizes = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const bodyToken = Number.parseFloat(root.getPropertyValue('--font-size-body'));
    const titleToken = root.getPropertyValue('--font-size-project-title').trim();
    const tokenProbe = document.createElement('span');
    tokenProbe.style.fontSize = 'var(--font-size-body)';
    document.body.append(tokenProbe);
    const resolvedBodyToken = Number.parseFloat(getComputedStyle(tokenProbe).fontSize);
    tokenProbe.style.fontSize = 'var(--font-size-statement)';
    const resolvedStatementToken = Number.parseFloat(getComputedStyle(tokenProbe).fontSize);
    tokenProbe.remove();

    return {
      body: Number.parseFloat(getComputedStyle(document.querySelector('.chanel-chapter__opening > .body-copy')!).fontSize),
      title: Number.parseFloat(getComputedStyle(document.querySelector('.chanel-chapter__opening h2')!).fontSize),
      tokenBody: bodyToken,
      resolvedBodyToken,
      tokenTitle: titleToken,
      metric: Number.parseFloat(getComputedStyle(document.querySelector('.chanel-history-signal__rows strong')!).fontSize),
      statementToken: Number.parseFloat(root.getPropertyValue('--font-size-statement')),
      resolvedStatementToken,
      metadata: Number.parseFloat(getComputedStyle(document.querySelector('.chanel-chapter__opening > .data-copy')!).fontSize),
    };
  });

  expect(sizes.body).toBe(20);
  expect(sizes.body).toBe(sizes.resolvedBodyToken);
  expect(sizes.title).toBe(48);
  expect(sizes.tokenTitle).toContain('clamp');
  expect(sizes.metric).toBe(sizes.resolvedStatementToken);
  expect(sizes.metadata).toBeGreaterThanOrEqual(14);
});

test('Home and Chanel report share the approved reading and project-title scales', async ({ page }) => {
  await page.goto('/');

  const homeSizes = await page.evaluate(() => ({
    body: Number.parseFloat(getComputedStyle(document.querySelector('.chanel-chapter__opening > .body-copy')!).fontSize),
    title: Number.parseFloat(getComputedStyle(document.querySelector('.chanel-chapter__opening h2')!).fontSize),
  }));

  await page.goto('/work/luxury-handbag-pricing-architecture/');

  const reportSizes = await page.evaluate(() => ({
    body: Number.parseFloat(getComputedStyle(document.querySelector('.report-section > p:not(.report-section__number):not(.report-claim):not(.report-note)')!).fontSize),
    title: Number.parseFloat(getComputedStyle(document.querySelector('.report-title')!).fontSize),
  }));

  expect(homeSizes.body).toBeGreaterThanOrEqual(20);
  expect(homeSizes.body).toBeLessThanOrEqual(22);
  expect(reportSizes.body).toBe(homeSizes.body);
  expect(reportSizes.title).toBe(homeSizes.title);
});
