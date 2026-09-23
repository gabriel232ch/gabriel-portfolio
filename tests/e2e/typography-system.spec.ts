import { expect, test } from '@playwright/test';

const productionRoutes = [
  '/',
  '/work/luxury-handbag-pricing-architecture/',
  '/work/olist-marketplace-analysis/',
  '/work/why-some-people-choose-smaller-companies/',
];

const detailRoleSelectors = {
  '/work/olist-marketplace-analysis/': {
    title: '.research-page h1',
    lead: '.research-page__lede',
    sectionTitle: '.research-page h2',
    body: '.research-page section > p',
    metadata: '.research-page__kicker',
  },
  '/work/why-some-people-choose-smaller-companies/': {
    title: '.inquiry-page h1',
    lead: '.inquiry-page__opening',
    sectionTitle: '.inquiry-page h2',
    body: '.inquiry-page__article > p:not(.inquiry-page__kicker):not(.inquiry-page__opening):not(.inquiry-page__status)',
    metadata: '.inquiry-page__kicker',
  },
} as const;

test('approved typography roles are exposed through semantic tokens', async ({ page }) => {
  await page.goto('/');

  const roles = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);

    return {
      display: styles.getPropertyValue('--font-display').trim(),
      reading: styles.getPropertyValue('--font-reading').trim(),
      numeric: styles.getPropertyValue('--font-numeric').trim(),
      metadata: styles.getPropertyValue('--font-metadata').trim(),
      bodySize: styles.getPropertyValue('--font-size-body').trim(),
      projectTitleSize: styles.getPropertyValue('--font-size-project-title').trim(),
    };
  });

  expect(roles.display).toContain('Cormorant Garamond Variable');
  expect(roles.reading).toContain('Baskerville');
  expect(roles.numeric).toContain('Didot');
  expect(roles.metadata).toContain('IBM Plex Mono');
  expect(roles.bodySize).toContain('clamp');
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
    body: getComputedStyle(document.querySelector('.report-section > p:not(.report-claim):not(.report-note)')!).fontFamily,
    metric: getComputedStyle(document.querySelector('.report-kpi-card strong')!).fontFamily,
    claim: getComputedStyle(document.querySelector('.report-claim')!).fontFamily,
    origin: getComputedStyle(document.querySelector('.report-origin')!).fontFamily,
    data: getComputedStyle(document.querySelector('.report-meta')!).fontFamily,
  }));

  expect(reportRoles.body).toContain('Baskerville');
  expect(reportRoles.metric).toContain('Didot');
  expect(reportRoles.claim).toContain('Cormorant Garamond Variable');
  expect(reportRoles.origin).toContain('Baskerville');
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

test('Home expressive passages resolve the Statement role', async ({ page }) => {
  await page.goto('/');

  const sizes = await page.evaluate(() => {
    const statementToken = document.createElement('span');
    statementToken.style.fontSize = 'var(--font-size-statement)';
    document.body.append(statementToken);
    const resolvedStatement = Number.parseFloat(getComputedStyle(statementToken).fontSize);
    statementToken.remove();

    const passages = [
      document.querySelector('.olist-chapter__arrival')!,
      document.querySelector('.smaller-companies-chapter__turn')!,
    ];

    return {
      resolvedStatement,
      passages: passages.map((element) => ({
        className: element.className,
        size: Number.parseFloat(getComputedStyle(element).fontSize),
      })),
    };
  });

  expect(sizes.passages).toEqual([
    { className: 'editorial statement olist-chapter__arrival', size: sizes.resolvedStatement },
    { className: 'display statement smaller-companies-chapter__turn', size: sizes.resolvedStatement },
  ]);
});

for (const width of [768, 1024]) {
  test(`pricing report keeps tablet chart labels and values legible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/work/luxury-handbag-pricing-architecture/');

    const geometry = await page.evaluate(() => {
      const endpointLabels = Array.from(document.querySelectorAll<HTMLElement>('.report-price-lane__node--max em'));
      const endpointContainment = endpointLabels.map((label) => {
        const chart = label.closest('.report-price-lanes')!.getBoundingClientRect();
        const bounds = label.getBoundingClientRect();
        return bounds.left >= chart.left && bounds.right <= chart.right;
      });

      const kpiValues = Array.from(document.querySelectorAll<HTMLElement>('.report-kpi-card strong'));
      const kpiSeparation = kpiValues.map((value) => {
        const card = value.closest('.report-kpi-card')!.getBoundingClientRect();
        const bounds = value.getBoundingClientRect();
        return bounds.left >= card.left && bounds.right <= card.right;
      });

      const heatmapCells = Array.from(document.querySelectorAll<HTMLElement>('.report-growth-cell'));
      const heatmapContainment = heatmapCells.map((cell) => cell.scrollWidth <= cell.clientWidth);

      return {
        endpointScroll: document.querySelector<HTMLElement>('.report-visual--architecture')!.scrollWidth,
        endpointViewport: document.querySelector<HTMLElement>('.report-visual--architecture')!.clientWidth,
        endpointContainment,
        kpiSeparation,
        heatmapContainment,
      };
    });

    expect(geometry.endpointContainment).toEqual([true, true]);
    expect(geometry.kpiSeparation.every(Boolean)).toBe(true);
    expect(geometry.heatmapContainment.every(Boolean)).toBe(true);
    expect(geometry.endpointScroll).toBeGreaterThanOrEqual(geometry.endpointViewport);
  });
}

test('Home and Chanel report share the approved reading and project-title scales', async ({ page }) => {
  await page.goto('/');

  const homeSizes = await page.evaluate(() => ({
    body: Number.parseFloat(getComputedStyle(document.querySelector('.chanel-chapter__opening > .body-copy')!).fontSize),
    title: Number.parseFloat(getComputedStyle(document.querySelector('.chanel-chapter__opening h2')!).fontSize),
  }));

  await page.goto('/work/luxury-handbag-pricing-architecture/');

  const reportSizes = await page.evaluate(() => ({
    body: Number.parseFloat(getComputedStyle(document.querySelector('.report-section > p:not(.report-claim):not(.report-note)')!).fontSize),
    title: Number.parseFloat(getComputedStyle(document.querySelector('.report-title')!).fontSize),
  }));

  expect(homeSizes.body).toBeGreaterThanOrEqual(20);
  expect(homeSizes.body).toBeLessThanOrEqual(22);
  expect(reportSizes.body).toBe(homeSizes.body);
  expect(reportSizes.title).toBe(homeSizes.title);
});

for (const viewport of [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1024, height: 900 },
  { name: 'wide desktop', width: 1440, height: 1000 },
]) {
  test(`Home and Chanel share detail roles at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');

    const home = await page.evaluate(() => {
      const resolveToken = (name: string) => {
        const probe = document.createElement('span');
        probe.style.fontSize = `var(${name})`;
        document.body.append(probe);
        const value = Number.parseFloat(getComputedStyle(probe).fontSize);
        probe.remove();
        return value;
      };
      const kpi = document.querySelector('.chanel-history-signal__rows strong')!;
      const kpiStyle = getComputedStyle(kpi);

      return {
        body: Number.parseFloat(getComputedStyle(document.querySelector('.chanel-chapter__opening > .body-copy')!).fontSize),
        bodyToken: resolveToken('--font-size-body'),
        title: Number.parseFloat(getComputedStyle(document.querySelector('.chanel-chapter__opening h2')!).fontSize),
        statementToken: resolveToken('--font-size-statement'),
        sectionTitleToken: resolveToken('--font-size-section-title'),
        kpiFamily: kpiStyle.fontFamily,
        kpiWeight: kpiStyle.fontWeight,
        kpiFeatures: kpiStyle.fontFeatureSettings,
        kpiVariant: kpiStyle.fontVariantNumeric,
        kpiSize: Number.parseFloat(kpiStyle.fontSize),
      };
    });

    await page.goto('/work/luxury-handbag-pricing-architecture/');

    const report = await page.evaluate(() => {
      const resolveToken = (name: string) => {
        const probe = document.createElement('span');
        probe.style.fontSize = `var(${name})`;
        document.body.append(probe);
        const value = Number.parseFloat(getComputedStyle(probe).fontSize);
        probe.remove();
        return value;
      };
      const body = document.querySelector('.report-section > p:not(.report-claim):not(.report-note)')!;
      const title = document.querySelector('.report-title')!;
      const lead = document.querySelector('.report-lede')!;
      const statement = document.querySelector('.report-claim')!;
      const sectionTitle = document.querySelector('.report-section h2')!;
      const kpi = document.querySelector('.report-kpi-card strong')!;
      const kpiStyle = getComputedStyle(kpi);

      return {
        body: Number.parseFloat(getComputedStyle(body).fontSize),
        title: Number.parseFloat(getComputedStyle(title).fontSize),
        lead: Number.parseFloat(getComputedStyle(lead).fontSize),
        statement: Number.parseFloat(getComputedStyle(statement).fontSize),
        sectionTitle: Number.parseFloat(getComputedStyle(sectionTitle).fontSize),
        kpiFamily: kpiStyle.fontFamily,
        kpiWeight: kpiStyle.fontWeight,
        kpiFeatures: kpiStyle.fontFeatureSettings,
        kpiVariant: kpiStyle.fontVariantNumeric,
        kpiSize: Number.parseFloat(kpiStyle.fontSize),
        bodyToken: resolveToken('--font-size-body'),
        projectTitleToken: resolveToken('--font-size-project-title'),
        leadToken: resolveToken('--font-size-lead'),
        sectionTitleToken: resolveToken('--font-size-section-title'),
        statementToken: resolveToken('--font-size-statement'),
      };
    });

    expect(home.body).toBe(home.bodyToken);
    expect(report.body).toBe(report.bodyToken);
    expect(report.body).toBe(home.body);
    expect(report.title).toBe(report.projectTitleToken);
    expect(report.title).toBe(home.title);
    expect(report.lead).toBe(report.leadToken);
    expect(report.statement).toBe(report.statementToken);
    expect(report.sectionTitle).toBe(report.sectionTitleToken);
    expect(home.kpiFamily).toContain('Didot');
    expect(home.kpiWeight).toBe('400');
    expect(home.kpiFeatures).toContain('lnum');
    expect(home.kpiFeatures).toContain('pnum');
    expect(home.kpiVariant).toContain('lining-nums');
    expect(home.kpiVariant).toContain('proportional-nums');
    expect([home.statementToken, home.sectionTitleToken]).toContain(home.kpiSize);
    expect(report.kpiFamily).toContain('Didot');
    expect(report.kpiWeight).toBe('400');
    expect(report.kpiFeatures).toContain('lnum');
    expect(report.kpiFeatures).toContain('pnum');
    expect(report.kpiVariant).toContain('lining-nums');
    expect(report.kpiVariant).toContain('proportional-nums');
    expect([report.statementToken, report.sectionTitleToken]).toContain(report.kpiSize);

    if (viewport.width === 390) {
      expect(report.body).toBe(20);
      expect(report.lead).toBe(24);
      expect(report.statement).toBe(30);
      expect(report.sectionTitle).toBe(36);
    }

    if (viewport.width === 1440) {
      expect(report.body).toBe(22);
      expect(report.lead).toBe(26);
      expect(report.statement).toBe(32);
      expect(report.sectionTitle).toBe(40);
    }
  });
}

for (const [route, selectors] of Object.entries(detailRoleSelectors)) {
  for (const viewport of [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'desktop', width: 1024, height: 900 },
  ]) {
    test(`${route} assigns shared detail roles at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(route);

      const sizes = await page.evaluate((pageSelectors) => {
        const resolveToken = (name: string) => {
          const probe = document.createElement('span');
          probe.style.fontSize = `var(${name})`;
          document.body.append(probe);
          const value = Number.parseFloat(getComputedStyle(probe).fontSize);
          probe.remove();
          return value;
        };
        const size = (selector: string) => Number.parseFloat(getComputedStyle(document.querySelector(selector)!).fontSize);

        return {
          title: size(pageSelectors.title),
          lead: size(pageSelectors.lead),
          sectionTitle: size(pageSelectors.sectionTitle),
          body: size(pageSelectors.body),
          metadata: size(pageSelectors.metadata),
          titleToken: resolveToken('--font-size-project-title'),
          leadToken: resolveToken('--font-size-lead'),
          sectionTitleToken: resolveToken('--font-size-section-title'),
          bodyToken: resolveToken('--font-size-body'),
          metadataToken: resolveToken('--font-size-micro'),
        };
      }, selectors);

      expect(sizes.title).toBe(sizes.titleToken);
      expect(sizes.lead).toBe(sizes.leadToken);
      expect(sizes.sectionTitle).toBe(sizes.sectionTitleToken);
      expect(sizes.body).toBe(sizes.bodyToken);
      expect(sizes.metadata).toBe(sizes.metadataToken);
    });
  }
}

for (const route of productionRoutes) {
  test(`${route} keeps meaningful visible text at 14px or larger`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);

    const undersized = await page.evaluate(() => Array.from(document.body.querySelectorAll<HTMLElement>('*'))
      .filter((element) => !element.closest("script, style, svg, noscript, [aria-hidden='true']"))
      .filter((element) => Array.from(element.childNodes).some((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()))
      .filter((element) => {
        const styles = getComputedStyle(element);
        return styles.display !== 'none' && styles.visibility !== 'hidden' && Number.parseFloat(styles.fontSize) < 14;
      })
      .map((element) => ({
        selector: `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''}${Array.from(element.classList).map((name) => `.${name}`).join('')}`,
        size: getComputedStyle(element).fontSize,
        text: element.textContent?.trim().slice(0, 80),
      })));

    expect(undersized).toEqual([]);
  });
}
