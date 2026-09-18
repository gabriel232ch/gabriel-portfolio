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

test('Chanel follows the approved question-first narrative', async ({ page }) => {
  await page.goto('/');
  const chanel = page.locator('[data-home-chapter="chanel"]');

  await expect(chanel).toBeVisible();
  await expect(chanel.getByText('MILAN · 2025 → NOW')).toBeVisible();
  await expect(chanel.getByRole('heading', {
    level: 2,
    name: 'Luxury Was Slowing. Why Did Chanel Look Different?',
  })).toBeVisible();
  await expect(chanel.locator('.chanel-chapter__opening > .editorial')).toHaveText(
    'I first started thinking about this while studying luxury at Bocconi in Milan. The market was slowing, and I kept coming across brands like Gucci and Zegna trying to adapt in very different ways.',
  );
  await expect(chanel.locator('.chanel-chapter__return > .editorial')).toHaveText(
    'Later, a passing conversation brought Chanel to mind. It seemed to be holding up differently. I wanted to understand whether that impression was real — and, if it was, why.',
  );
  await expect(chanel.locator('.chanel-chapter__visible')).toBeVisible();
  await expect(chanel.getByText('I started with what I could see.')).toBeVisible();
  await expect(chanel.locator('.chanel-chapter__turn')).toBeVisible();
  await expect(chanel.getByText('But something still felt missing.')).toBeVisible();
  await expect(chanel.locator('[data-chanel-business]')).toBeVisible();
  await expect(chanel.locator('.chanel-chapter__current')).toBeVisible();
  await expect(chanel.locator('.chanel-chapter__current > .editorial')).toHaveText(
    'I no longer think Chanel’s relative resilience can be explained by a single price move or campaign. What I see now is a system: pricing, product, desirability, investment, client experience and brand identity all have to keep reinforcing one another.',
  );
  await expect(chanel.locator(
    '.chanel-chapter__opening, .chanel-chapter__return, .chanel-chapter__visible, .chanel-chapter__turn, .chanel-chapter__current',
  )).toHaveCount(5);

  const pricePosition = chanel.locator('[data-chanel-price-position]');
  await expect(pricePosition).toBeVisible();
  await expect(pricePosition.locator('.chanel-price-position__market')).toHaveCount(2);
  await expect(pricePosition.locator('.chanel-price-position__row')).toHaveCount(8);
  const rails = pricePosition.locator('.chanel-price-position__rail');
  await expect(rails).toHaveCount(8);
  for (const rail of await rails.all()) {
    await expect(rail).toHaveAttribute('role', 'img');
    await expect(rail).toHaveAttribute('aria-label', /to .+, median/);
  }

  await expect(chanel.locator('[data-chanel-history]')).toBeVisible();
  await expect(chanel.locator('[data-chanel-history] .chanel-history-signal__rows > div')).toHaveCount(2);
  await expect(chanel.locator('[data-chanel-business] .chanel-business-signal__baseline > span')).toHaveCount(2);
  await expect(chanel.locator('[data-chanel-business] .chanel-business-signal__shock > span')).toHaveCount(4);
  await expect(chanel.getByText('The question is still open.')).toBeVisible();
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
  await expect(inquiry).toContainText('I’m still trying to understand this.');
  await expect(inquiry.getByRole('link', { name: 'Explore the current research →' })).toHaveAttribute(
    'href',
    '/work/why-some-people-choose-smaller-companies/',
  );
  await expect(inquiry).not.toContainText('JoinQuant');
  await expect(inquiry).not.toContainText('聚宽');
  await expect(inquiry.locator('[data-competitive-mechanism]')).toHaveCount(0);
});

test('Olist and smaller-company CTAs resolve to local expansion pages', async ({ page }) => {
  await page.goto('/work/olist-marketplace-analysis/');
  await expect(page.getByRole('heading', {
    level: 1,
    name: 'SQL Wasn’t the Hard Part. Knowing What to Ask Was.',
  })).toBeVisible();
  await expect(page.getByText('Analysis trail')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Source analysis on GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/gabriel232ch/olist-marketplace-analytics/blob/main/README.md',
  );

  await page.goto('/work/why-some-people-choose-smaller-companies/');
  await expect(page.getByRole('heading', {
    level: 1,
    name: 'Why Do Some People Choose Smaller Companies?',
  })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Current research' })).toBeVisible();
  await expect(page.getByText('I’m still trying to understand this.')).toBeVisible();
  await expect(page.locator('body')).not.toContainText('JoinQuant');
  await expect(page.locator('body')).not.toContainText('聚宽');
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

test('mobile Chanel price position keeps market rails within the viewport', async ({ page }) => {
  await page.goto('/');
  const position = page.locator('[data-chanel-price-position]');
  await expect(position).toBeVisible();

  for (const width of [375, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const rows = await position.locator('.chanel-price-position__row').evaluateAll((elements) =>
      elements.map((element) => {
        const label = element.querySelector('.data-copy')?.getBoundingClientRect();
        const rail = element.querySelector('.chanel-price-position__rail')?.getBoundingClientRect();
        return {
          labelRight: label?.right ?? 0,
          railLeft: rail?.left ?? 0,
          railRight: rail?.right ?? 0,
        };
      }),
    );

    for (const row of rows) {
      expect(row.labelRight).toBeLessThanOrEqual(row.railLeft + 1);
      expect(row.railLeft).toBeGreaterThanOrEqual(0);
      expect(row.railRight).toBeLessThanOrEqual(width);
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
  await link.focus();
  await expect(link).toBeFocused();
});
