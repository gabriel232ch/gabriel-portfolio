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
  await expect(page.locator('[data-home-reading]')).toHaveCount(0);
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

test('Home exposes the Now layer and quieter editorial closing', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#about')).toContainText('Employer Brand / GEO at JoinQuant');
  await expect(page.locator('#about [data-now-side]')).toHaveCount(2);
  await expect(page.locator('[data-author-note]')).toContainText('A place to keep thinking');
  await expect(page.locator('[data-author-note]')).toContainText(
    'This is a place for work, research, and ideas I want to return to.',
  );
  await expect(page.locator('[data-personal-snapshot]')).toHaveCount(0);
  await expect(page.locator('#index')).toBeVisible();

  await page.getByRole('link', { name: 'NOW', exact: true }).click();
  await expect(page.locator('#about')).toBeInViewport();

  await page.locator('.editorial-closing a[href="#work"]').click();
  await expect(page.locator('#work')).toBeInViewport();
  await expect(page.locator('#index a[href="#index"]')).toHaveCount(0);
});

test('Home preserves the integrated editorial order and image-free work stories', async ({ page }) => {
  await page.goto('/');

  const sections = page.locator('main > header, main > section');
  await expect(sections).toHaveCount(7);
  await expect(sections.nth(0)).toHaveClass(/home-navigation/);
  await expect(sections.nth(1)).toHaveClass(/home-hero/);
  await expect(sections.nth(2)).toHaveAttribute(
    'data-work-slug',
    'luxury-handbag-pricing-architecture',
  );
  await expect(sections.nth(3)).toHaveAttribute('data-work-slug', 'olist-marketplace-analysis');
  await expect(sections.nth(4)).toHaveAttribute(
    'data-work-slug',
    'competitive-positioning-against-giants',
  );
  await expect(sections.nth(5)).toHaveId('about');
  await expect(sections.nth(6)).toHaveId('index');

  const workStories = page.locator('[data-work-slug]:not([data-home-chapter="chanel"])');
  await expect(workStories).toHaveCount(2);
  for (const story of await workStories.all()) {
    await expect(story.locator('img')).toHaveCount(0);
    await expect(story.locator('[data-work-title]')).toBeVisible();
    await expect(story.locator('[data-work-takeaway]')).toBeVisible();
    const notes = story.locator('[data-research-notes]');
    await expect(notes).not.toHaveAttribute('open', '');
    await notes.locator('summary').click();
    await expect(story.locator('[data-work-question]')).toBeVisible();
    await expect(story.locator('[data-work-outcome]')).toBeVisible();
    await expect(story.locator('[data-work-evidence]')).toHaveCount(3);
  }

  await expect(page.locator('[data-home-chapter="chanel"]')).toBeVisible();
  await expect(page.locator('[data-olist-data-story]')).toBeVisible();
  await expect(page.locator('[data-competitive-data-story]')).toBeVisible();
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

test('Home renders Olist as a decision-intelligence feature after Chanel', async ({ page }) => {
  await page.goto('/');

  const slugs = await page.locator('[data-work-slug]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('data-work-slug')),
  );
  expect(slugs.slice(0, 2)).toEqual([
    'luxury-handbag-pricing-architecture',
    'olist-marketplace-analysis',
  ]);

  const olist = page.locator('[data-work-slug="olist-marketplace-analysis"]');
  await expect(olist).toBeVisible();
  await expect(olist.locator('[data-decision-signal]')).toHaveText([
    'GROW',
    'DEFEND',
    'FIX',
    'INVESTIGATE',
  ]);
  await expect(olist.locator('img')).toHaveCount(0);
  await expect(olist.locator('[data-work-title]')).toHaveText('Growth and delivery, in tension');
  await expect(olist.locator('[data-work-takeaway]')).toBeVisible();
  await expect(olist.locator('[data-olist-data-story]')).toBeVisible();
  const metrics = olist.locator('[data-olist-metric]');
  await expect(metrics).toHaveCount(3);
  await expect(metrics.nth(0)).toHaveAttribute('open', '');
  await expect(metrics.nth(1)).toHaveAttribute('open', '');
  await expect(metrics.nth(0)).toContainText('R$2.99M');
  await expect(metrics.nth(0)).toContainText('R$7.22M');
  await expect(metrics.nth(1)).toContainText('96.50%');
  await expect(metrics.nth(1)).toContainText('92.27%');
  await expect(metrics.nth(1).locator('[role="img"]')).toBeVisible();
  await metrics.nth(2).locator('summary').click();
  await expect(metrics.nth(2)).toHaveAttribute('open', '');
  await expect(metrics.nth(2).locator('[data-olist-segment]')).toHaveCount(6);
  await expect(metrics.nth(2).locator('[data-olist-segment-caption]')).toHaveText(
    'ONE MARK = ONE MATERIAL FIX MARKET',
  );
  await expect(olist.locator('[data-olist-metric] a')).toHaveCount(0);
  await expect(olist.locator('[data-olist-signal]')).toHaveCount(4);
  await expect(olist.locator('[data-olist-data-story] a')).toHaveCount(2);
});

test('Home renders Competitive Positioning as a source-backed strategy feature after Olist', async ({ page }) => {
  await page.goto('/');

  const slugs = await page.locator('[data-work-slug]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('data-work-slug')),
  );
  expect(slugs.slice(0, 3)).toEqual([
    'luxury-handbag-pricing-architecture',
    'olist-marketplace-analysis',
    'competitive-positioning-against-giants',
  ]);

  const competitive = page.locator('[data-work-slug="competitive-positioning-against-giants"]');
  await expect(competitive).toBeVisible();
  await expect(competitive.locator('img')).toHaveCount(0);
  await expect(competitive.locator('[data-work-title]')).toHaveText('Smallness is not an advantage');
  await expect(competitive.locator('[data-work-takeaway]')).toBeVisible();
  await expect(competitive.locator('[data-competitive-data-story]')).toBeVisible();
  const mechanisms = competitive.locator('[data-competitive-mechanism]');
  await expect(mechanisms).toHaveCount(5);
  await expect(mechanisms.nth(0)).toContainText('Deliberate Constraint Advantage');
  await expect(mechanisms.nth(4)).toContainText('Selective Fit Flywheel');
  await mechanisms.nth(1).locator('summary').click();
  await expect(mechanisms.nth(1).locator('details')).toHaveAttribute('open', '');
  await expect(mechanisms.nth(1).locator('.competitive-data-story__mechanism-note')).toBeVisible();
  await expect(competitive.locator('[data-competitive-boundary]')).toHaveText(
    'INDEPENDENT COMPARATIVE ANALYSIS / NOT EMPLOYER-SPECIFIC',
  );
  await expect(competitive.locator('[data-competitive-data-story]')).not.toContainText('OPEN / CLOSE');
  await expect(competitive.locator('[data-competitive-data-story] a')).toHaveCount(1);
});

test('research remains readable with JavaScript disabled', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    await page.goto('/');
    for (const work of await page.locator('[data-work-slug]:not([data-home-chapter="chanel"])').all()) {
      await expect(work.locator('[data-work-title]')).toBeVisible();
      await expect(work.locator('[data-work-takeaway]')).toBeVisible();
      await work.locator('[data-research-notes] > summary').click();
      await expect(work.locator('[data-work-question]')).toBeVisible();
      await expect(work.locator('[data-work-outcome]')).toBeVisible();
      for (const evidence of await work.locator('[data-work-evidence]').all()) {
        await expect(evidence).toBeVisible();
      }
    }
  } finally {
    await context.close();
  }
});

test('Home has no viewport overflows', async ({ page }) => {
  await page.goto('/');

  for (const detail of await page.locator('details').all()) {
    if ((await detail.getAttribute('open')) === null) {
      await detail.locator('summary').click();
    }
  }

  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow, `overflow at ${width}px`).toBe(false);
  }
});

test('research notes can be opened with a keyboard', async ({ page }) => {
  await page.goto('/');
  const notes = page.locator('[data-work-slug]:not([data-home-chapter="chanel"]) [data-research-notes]').first();
  await notes.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(notes).toHaveAttribute('open', '');
  await expect(notes.locator('[data-work-question]')).toBeVisible();
});
