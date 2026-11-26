import { expect, test } from '@playwright/test';

test('Home interactive Olist constellation and clickable market matrix work smoothly', async ({ page }) => {
  await page.goto('/');

  const map = page.locator('[data-olist-data-map]');
  await map.scrollIntoViewIfNeeded();
  await map.getByRole('button', { name: 'reviews', exact: true }).click();
  await expect(map.locator('[data-map-readout]')).toContainText('97.39% before-receipt');
  await expect(map.locator('[data-map-edge="reviews"]')).toHaveAttribute('data-active', 'true');

  await page.getByText('Explore all six markets', { exact: false }).click();
  const matrix = page.locator('[data-market-matrix]');
  await matrix.locator('[data-matrix-cell="1"]').first().click();
  await expect(matrix.locator('[data-matrix-output]')).toHaveText('February 2018');
  await expect(matrix.locator('[data-matrix-cell="1"][data-selected="true"]')).toHaveCount(6);
});

test('Chanel case study supports popovers, sortable tables, brand filter, waterfall bars, and expand-all', async ({
  page,
}) => {
  await page.goto('/work/luxury-handbag-pricing-architecture/');

  // Evidence popover opens via native popovertarget
  const trigger = page.locator('button[popovertarget="popover-chanel-scope"]');
  await trigger.click();
  const popover = page.locator('#popover-chanel-scope');
  await expect(popover).toBeVisible();
  await popover.locator('[data-popover-close]').click();
  await expect(popover).not.toBeVisible();

  // Sortable table updates aria-sort and reorders rows numerically
  const peerTable = page.locator('#table-chanel-peers');
  const fy25Header = peerTable.locator('thead th').nth(2);
  await fy25Header.locator('button').click();
  await expect(fy25Header).toHaveAttribute('aria-sort', 'ascending');
  await fy25Header.locator('button').click();
  await expect(fy25Header).toHaveAttribute('aria-sort', 'descending');

  // Hovering a trajectory observation column stays stable without oscillating back to FY2025
  const trajectory = page.locator('[data-chanel-trajectory]').first();
  await trajectory.scrollIntoViewIfNeeded();
  const fy23Zone = trajectory.locator('[data-trajectory-observation="0"]');
  await fy23Zone.hover();
  await page.waitForTimeout(450);
  await expect(trajectory.locator('[data-trajectory-year="0"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(trajectory.locator('[data-trajectory-label]')).toHaveText('FY2023');

  // Waterfall SVG bar click syncs readout
  const bridge = page.locator('.chanel-bridge');
  await bridge.scrollIntoViewIfNeeded();
  await bridge.locator('[data-bridge-bar="2"]').click();
  await expect(bridge.locator('[data-bridge-readout]')).toContainText('SG&A expense increased');

  // Brand focus filter inside Competition by Price Band
  const bandBrowser = page.locator('[data-band-browser]');
  await bandBrowser.locator('summary').click();
  await bandBrowser.getByRole('button', { name: 'Chanel', exact: true }).click();
  await expect(bandBrowser.locator('[data-band-table]').first()).toHaveAttribute('data-brand-focus', '1');

  // Appendix Expand all / Collapse all
  const expandAll = page.locator('#chanel-appendix-group button[command="--toggle-all"]');
  await expandAll.click();
  await expect(expandAll).toHaveAttribute('aria-expanded', 'true');
  await expandAll.click();
  await expect(expandAll).toHaveAttribute('aria-expanded', 'false');
});

test('Olist case study supports popovers, sortable tables, market tabs, month ticks, and expand-all', async ({
  page,
}) => {
  await page.goto('/work/olist-marketplace-analysis/');

  // Popover
  await page.locator('button[popovertarget="popover-olist-decomp"]').click();
  await expect(page.locator('#popover-olist-decomp')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#popover-olist-decomp')).not.toBeVisible();

  // Clickable month tick on line chart
  const deliveryChart = page.locator('[data-line-chart]').first();
  await deliveryChart.locator('[data-chart-tick="2"]').click();
  await expect(deliveryChart.locator('[data-chart-readout]')).toContainText('Mar');

  // Historical Fix market switcher
  const officeBtn = page.getByRole('button', { name: 'office_furniture × SP' });
  await officeBtn.click();
  await expect(officeBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#candidate-3')).toBeVisible();

  // Sortable SP->RJ table
  const spTable = page.locator('#table-olist-sp-origin');
  const lateHeader = spTable.locator('thead th').nth(1);
  await lateHeader.locator('button').click();
  await expect(lateHeader).toHaveAttribute('aria-sort', 'ascending');

  // Dual-segment Review Timing chart
  await expect(page.locator('.olist-timing-row--peak')).toContainText('97.4%');

  // Appendix Expand all / Collapse all
  const expandAll = page.locator('#olist-appendix-group button[command="--toggle-all"]');
  await expandAll.click();
  await expect(expandAll).toHaveAttribute('aria-expanded', 'true');
});

test('Smaller Companies Inquiry exposes interactive evolution arc and method popover', async ({ page }) => {
  await page.goto('/work/why-some-people-choose-smaller-companies/');

  const arc = page.locator('[data-inquiry-arc]');
  await expect(arc).toBeVisible();
  await arc.locator('[data-arc-node="3"]').click();
  await expect(arc.locator('[data-arc-node="3"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(arc.locator('[data-arc-jump]')).toContainText('Jump to Stage 04');

  await page.locator('button[popovertarget="popover-inquiry-matrix"]').click();
  await expect(page.locator('#popover-inquiry-matrix')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#popover-inquiry-matrix')).not.toBeVisible();
});
