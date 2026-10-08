import { expect, test } from '@playwright/test';

test('Home opens with Gabriel identity rather than a project index', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'WORK', exact: true })).toHaveAttribute('href', '#work');
  await expect(page.getByRole('link', { name: 'NOW', exact: true })).toHaveAttribute('href', '#about');
  await expect(page.getByRole('heading', { level: 1, name: 'Gabriel Chen' })).toBeVisible();
  await expect(page.locator('[data-signature-reveal] svg')).toHaveCount(1);
  await expect(page.getByText(
    'I like following questions until they become clearer — and building things that help me think better.',
  )).toBeVisible();

  for (const retiredCopy of [
    'RESEARCH / SYSTEMS / NOTES',
    'START READING',
    'PRICING RESEARCH',
    'MARKETPLACE ANALYSIS',
  ]) {
    await expect(page.getByText(retiredCopy, { exact: true })).toHaveCount(0);
  }
  await expect(page.locator('.folio-number')).toHaveCount(0);
});

test('Chanel preserves the approved operating-recovery narrative', async ({ page }) => {
  await page.goto('/');
  const chanel = page.locator('[data-home-chapter="chanel"]');

  await expect(chanel).toBeVisible();
  await expect(chanel.getByText('MILAN · 2025 → NOW')).toBeVisible();
  await expect(chanel.getByRole('heading', {
    level: 2,
    name: 'Luxury Was Slowing. Why Did Chanel Look Different?',
  })).toBeVisible();
  await expect(chanel.locator('.chanel-chapter__opening > .body-copy')).toHaveText(
    'I first started thinking about this while studying luxury at Bocconi in Milan. The market was slowing, and I kept coming across brands like Gucci and Zegna trying to adapt in very different ways.',
  );
  await expect(chanel.locator('.chanel-chapter__return > .body-copy')).toHaveText(
    'Later, a passing conversation brought Chanel to mind. It seemed to be holding up differently. I wanted to understand whether that impression was real — and, if it was, why.',
  );
  await expect(chanel.locator('.chanel-chapter__visible')).toBeVisible();
  await expect(chanel.getByRole('heading', { name: 'What actually recovered?' })).toBeVisible();
  await expect(chanel.locator('.chanel-chapter__turn')).toBeVisible();
  await expect(chanel.getByRole('heading', { name: 'Where did revenue return?' })).toBeVisible();
  await expect(chanel.locator('[data-chanel-business]')).toBeVisible();
  await expect(chanel.locator('.chanel-chapter__current')).toBeVisible();
  await expect(chanel.locator('.chanel-chapter__current > .body-copy').first()).toHaveText(
    'That business scope changes how I read the possible explanations. Beauty has substantial scale. Selected public accounts describe CHANEL 25 as an everyday-use option. Chanel also continued updating products, stores and client services. The price study shows positioning and selected price increases; it does not measure how much pricing added to the recovery.',
  );
  await expect(chanel.locator(
    '.chanel-chapter__opening, .chanel-chapter__return, .chanel-chapter__visible, .chanel-chapter__turn, .chanel-chapter__current',
  )).toHaveCount(5);

  await expect(chanel.getByRole('heading', { name: 'What could explain it?' })).toBeVisible();
  await expect(chanel.locator('[data-chanel-price-position]')).toHaveCount(0);
  await expect(chanel.locator('[data-chanel-history]')).toHaveCount(0);
  await expect(chanel.locator('[data-chanel-business] .chanel-business-signal__baseline > span')).toHaveCount(2);
  await expect(chanel.locator('[data-chanel-business] .chanel-business-signal__shock > span')).toHaveCount(3);
  await expect(chanel.locator('.chanel-business-signal__shock strong')).toHaveText([
    '97.6%', '73.5%', '70.5%',
  ]);
  await expect(chanel.getByText('FY2025 as a share of FY2023 · reported USD · Chanel group')).toBeVisible();
  await expect(chanel.getByRole('link', { name: 'Results and sources →' })).toHaveAttribute(
    'href', '/work/luxury-handbag-pricing-architecture/#performance',
  );
  await expect(chanel.getByText('An uneven, partial recovery.')).toBeVisible();
  await expect(chanel.getByRole('link', { name: 'Explore the research →' })).toHaveAttribute(
    'href',
    '/work/luxury-handbag-pricing-architecture/',
  );

  for (const forbidden of [
    'VISUAL / MARKET',
    'CHANEL PREMIUMIZATION STRATEGY',
    'CURRENT SNAPSHOT',
    'Price, history, performance',
  ]) {
    await expect(chanel.getByText(forbidden, { exact: true })).toHaveCount(0);
  }
});

test('Home typography uses Baskerville body, Didot metrics, and editorial display', async ({ page }) => {
  await page.goto('/');

  const narrativeStyles = await page.locator('.body-copy').evaluateAll((nodes) =>
    nodes.map((node) => {
      const style = getComputedStyle(node);
      return {
        family: style.fontFamily,
        weight: style.fontWeight,
        size: Number.parseFloat(style.fontSize),
        lineHeight: Number.parseFloat(style.lineHeight),
      };
    }),
  );

  expect(narrativeStyles.length).toBeGreaterThan(0);
  expect(narrativeStyles.every((style) => style.family.includes('Baskerville'))).toBe(true);
  expect(narrativeStyles.every((style) => style.weight === '400')).toBe(true);
  expect(narrativeStyles.every((style) => style.size >= 20 && style.size <= 22)).toBe(true);
  expect(narrativeStyles.every((style) => style.lineHeight / style.size >= 1.5)).toBe(true);

  const colors = await page.evaluate(() => {
    const returnCopy = document.querySelector('.chanel-chapter__return .body-copy');
    const root = getComputedStyle(document.documentElement);
    return {
      returnColor: returnCopy ? getComputedStyle(returnCopy).color : '',
      ink: root.color,
    };
  });
  expect(colors.returnColor).toBe(colors.ink);
  await expect(page.locator('.chanel-chapter__opening h2')).toHaveCSS(
    'font-family',
    /Cormorant Garamond Variable/,
  );

  const majorMetrics = await page.locator(
    '.chanel-history-signal__rows strong, .chanel-business-signal strong, .olist-chapter__tension strong',
  ).evaluateAll((nodes) => nodes.map((node) => {
    const style = getComputedStyle(node);
    return {
      family: style.fontFamily,
      weight: style.fontWeight,
      featureSettings: style.fontFeatureSettings,
      variant: style.fontVariantNumeric,
      letterSpacing: style.letterSpacing,
      lineHeight: style.lineHeight,
    };
  }));

  expect(majorMetrics.length).toBeGreaterThan(0);
  expect(majorMetrics.every((style) => style.family.includes('Didot'))).toBe(true);
  expect(majorMetrics.every((style) => style.weight === '400')).toBe(true);
  expect(majorMetrics.every((style) => style.featureSettings.includes('lnum'))).toBe(true);
  expect(majorMetrics.every((style) => style.variant.includes('lining-nums'))).toBe(true);
  expect(majorMetrics.every((style) => style.variant.includes('proportional-nums'))).toBe(true);
  expect(majorMetrics.every((style) => style.letterSpacing !== 'normal')).toBe(true);
});

test('Olist shows capability growth rather than a SQL skill showcase', async ({ page }) => {
  await page.goto('/');
  const olist = page.locator('[data-home-chapter="olist"]');

  await expect(olist.getByText('SAMSUNG · 2025 → OLIST · 2026')).toBeVisible();
  await expect(olist.getByRole('heading', {
    level: 2,
    name: 'SQL Wasn’t the Hard Part. Knowing What to Ask Was.',
  })).toBeVisible();
  await expect(olist.getByText('What I wanted to learn next was how to know what to ask.')).toBeVisible();
  await expect(olist.getByText(
    'There was no research question at the beginning. I started by understanding what was in the data — and what wasn’t.',
  )).toBeVisible();
  await expect(olist.locator('[data-olist-data-map]')).toBeVisible();
  await expect(olist.locator('[data-olist-tension]')).toContainText('R$2.99M');
  await expect(olist.locator('[data-olist-tension]')).toContainText('R$7.22M');
  await expect(olist.locator('[data-olist-tension]')).toContainText('96.50%');
  await expect(olist.locator('[data-olist-tension]')).toContainText('92.27%');
  await expect(olist.locator('[data-olist-tension]')).toContainText('JAN–AUG / 2017 → 2018');
  await expect(olist.getByText('SQL stopped being the task. It became the language I used to investigate a business.')).toBeVisible();
  await expect(olist.getByRole('link', { name: 'Explore the analysis →' })).toHaveAttribute(
    'href',
    '/work/olist-marketplace-analysis/',
  );
  await expect(olist.getByText('GROW', { exact: true })).toHaveCount(0);
  await expect(olist.getByText('DEFEND', { exact: true })).toHaveCount(0);
  await expect(olist.getByText('FIX', { exact: true })).toHaveCount(0);
  await expect(olist.getByText('INVESTIGATE', { exact: true })).toHaveCount(0);
});

test('smaller-company chapter stays open-ended and protects current-employer details', async ({ page }) => {
  await page.goto('/');
  const inquiry = page.locator('[data-home-chapter="smaller-companies"]');

  await expect(inquiry.getByRole('heading', {
    level: 2,
    name: 'Why Do Some People Choose Smaller Companies?',
  })).toBeVisible();
  await expect(inquiry).toContainText('a quantitative investment firm');
  await expect(inquiry).toContainText('So I started looking elsewhere.');
  await expect(inquiry).toContainText(
    'what information helps someone decide whether a smaller company is right for them',
  );
  await expect(inquiry).toContainText('I’m still trying to understand this.');
  await expect(inquiry.getByRole('link', { name: 'Explore the current research →' })).toHaveAttribute(
    'href',
    '/work/why-some-people-choose-smaller-companies/',
  );
  await expect(inquiry).not.toContainText('JoinQuant');
  await expect(inquiry).not.toContainText('聚宽');
  await expect(inquiry.locator('[data-competitive-mechanism]')).toHaveCount(0);
});

test('Olist and smaller-company CTAs resolve locally in light and dark themes', async ({ page }) => {
  const themes = {
    light: { background: 'rgb(244, 243, 246)', ink: 'rgb(36, 27, 41)' },
    dark: { background: 'rgb(20, 16, 22)', ink: 'rgb(242, 238, 245)' },
  } as const;

  for (const [theme, colors] of Object.entries(themes)) {
    await page.goto('/work/olist-marketplace-analysis/');
    await page.evaluate((selectedTheme) => localStorage.setItem('theme', selectedTheme), theme);
    await page.reload();
    const olistPage = page.locator('body');
    await expect(page.locator('.olist-report')).toBeVisible();
    await expect(olistPage).toHaveCSS('background-color', colors.background);
    await expect(olistPage).toHaveCSS('color', colors.ink);
    await expect(page.getByRole('heading', {
      level: 1,
      name: 'Growth, delivery & marketplace priorities',
    })).toBeVisible();
    await expect(page.locator('#appendix')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Original research snapshot ↗', includeHidden: true })).toHaveAttribute(
      'href',
      'https://github.com/gabriel232ch/olist-marketplace-analytics/tree/84819c37b79ab7fcf7982e2f7063124432fee0cc',
    );
    for (const retiredLabel of ['01 / METHOD', '02 / OBSERVATIONS', '03 / BOUNDARIES']) {
      await expect(page.getByText(retiredLabel, { exact: true })).toHaveCount(0);
    }

    await page.goto('/work/why-some-people-choose-smaller-companies/');
    await page.evaluate((selectedTheme) => localStorage.setItem('theme', selectedTheme), theme);
    await page.reload();
    const inquiryPage = page.locator('.inquiry-page');
    await expect(inquiryPage).toHaveCSS('background-color', colors.background);
    await expect(inquiryPage).toHaveCSS('color', colors.ink);
    await expect(page.getByRole('heading', {
      level: 1,
      name: 'Why Do Some People Choose Smaller Companies?',
    })).toBeVisible();
    await expect(page.locator('#evaluation')).toBeVisible();
    await expect(page.locator('#evaluation')).toContainText('12 prompts across five platforms');
    await expect(page.locator('.inquiry-page__status')).toContainText('so far');
    await expect(page.locator('body')).not.toContainText('JoinQuant');
    await expect(page.locator('body')).not.toContainText('聚宽');
    for (const retiredLabel of ['01 / CURRENT RESEARCH', '02 / OBSERVATIONS']) {
      await expect(page.getByText(retiredLabel, { exact: true })).toHaveCount(0);
    }
  }
});

test('Now shows a life in progress and the page ends warmly', async ({ page }) => {
  await page.goto('/');
  const now = page.locator('#about');

  await expect(now.locator('[data-now-item]')).toHaveCount(4);
  await expect(now).toContainText('Learning');
  await expect(now).toContainText('Italian');
  await expect(now).toContainText('Working on');
  await expect(now).toContainText('gabrielchen.me');
  await expect(now).toContainText('Playing');
  await expect(now).toContainText('Baldur’s Gate 3');
  await expect(now).toContainText('Thinking about');
  await expect(now).toContainText('Why do some people choose smaller companies?');
  await expect(now.locator('[data-personal-snapshot]')).toHaveCount(0);
  await expect(now).not.toContainText('PRIMARY THREAD / CURRENT ATTENTION');
  await expect(now).not.toContainText('Employer Brand / GEO at JoinQuant');

  const closing = page.locator('[data-home-closing]');
  await expect(closing).toContainText('I’ll keep adding things here as I go.');
  await expect(closing.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/gabriel232ch',
  );
  await expect(closing).not.toContainText('CLOSING / SOURCES');
  await expect(closing).not.toContainText('RETURN TO WORK');
  await expect(closing).not.toContainText('PUBLIC SOURCE');
});

test('Home preserves the approved personal-digital-home order', async ({ page }) => {
  await page.goto('/');

  const landmarks = page.locator('main > header, main > section, main > footer');
  await expect(landmarks).toHaveCount(7);
  await expect(landmarks.nth(0)).toHaveClass(/home-navigation/);
  await expect(landmarks.nth(1)).toHaveClass(/home-hero/);
  await expect(landmarks.nth(2)).toHaveAttribute('data-home-chapter', 'chanel');
  await expect(landmarks.nth(3)).toHaveAttribute('data-home-chapter', 'olist');
  await expect(landmarks.nth(4)).toHaveAttribute('data-home-chapter', 'smaller-companies');
  await expect(landmarks.nth(5)).toHaveId('about');
  await expect(landmarks.nth(6)).toHaveAttribute('data-home-closing', '');

  await expect(page.getByText('Selected work', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Featured', { exact: true })).toHaveCount(0);
});

test('mobile Chanel recovery figures remain readable within the viewport', async ({ page }) => {
  await page.goto('/');
  const signal = page.locator('[data-chanel-business]');
  await expect(signal).toBeVisible();

  for (const width of [375, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const figures = await signal.locator('.chanel-business-signal__shock > span').evaluateAll((elements) =>
      elements.map((element) => {
        const label = element.querySelector('small')!.getBoundingClientRect();
        const value = element.querySelector('strong')!.getBoundingClientRect();
        return { labelBottom: label.bottom, valueTop: value.top, left: value.left, right: value.right };
      }),
    );
    expect(figures).toHaveLength(3);
    for (const figure of figures) {
      expect(figure.labelBottom).toBeLessThanOrEqual(figure.valueTop + 1);
      expect(figure.left).toBeGreaterThanOrEqual(0);
      expect(figure.right).toBeLessThanOrEqual(width);
    }
  }
});

test('Home renders the smaller-company inquiry after Olist', async ({ page }) => {
  await page.goto('/');

  const slugs = await page.locator('[data-work-slug]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('data-work-slug')),
  );
  expect(slugs.slice(0, 3)).toEqual([
    'luxury-handbag-pricing-architecture',
    'olist-marketplace-analysis',
    'competitive-positioning-against-giants',
  ]);

  const inquiry = page.locator('[data-home-chapter="smaller-companies"]');
  await expect(inquiry).toBeVisible();
  await expect(inquiry.getByRole('heading', {
    level: 2,
    name: 'Why Do Some People Choose Smaller Companies?',
  })).toBeVisible();
  await expect(inquiry).toContainText('So I started looking elsewhere.');
  await expect(inquiry).toContainText('I’m still trying to understand this.');
  await expect(inquiry.getByRole('link', { name: 'Explore the current research →' })).toHaveAttribute(
    'href',
    '/work/why-some-people-choose-smaller-companies/',
  );
  await expect(inquiry.locator('[data-competitive-mechanism]')).toHaveCount(0);
});

test('Home core narrative remains readable with JavaScript disabled', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Gabriel Chen' })).toBeVisible();
    await expect(page.locator('[data-home-chapter="chanel"]')).toBeVisible();
    await expect(page.locator('[data-home-chapter="olist"]')).toBeVisible();
    await expect(page.locator('[data-home-chapter="smaller-companies"]')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('[data-home-closing]')).toBeVisible();
  } finally {
    await context.close();
  }
});

test('Home has no viewport overflows', async ({ page }) => {
  await page.goto('/');

  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow, `overflow at ${width}px`).toBe(false);
  }
});

test('smaller-company research link can be reached with a keyboard', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: 'Explore the current research →' });

  for (let tab = 0; tab < 20; tab += 1) {
    if (await link.evaluate((element) => element === document.activeElement)) break;
    await page.keyboard.press('Tab');
  }

  await expect(link).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/work\/why-some-people-choose-smaller-companies\/$/);
});
