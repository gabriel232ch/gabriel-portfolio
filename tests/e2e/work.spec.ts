import { expect, test } from "@playwright/test";
import { HOME_WORK_SLUGS } from "../../src/data/home";

const luxury = `/work/${HOME_WORK_SLUGS[0]}/`;

test("Work index opens all three case studies and offers a way back", async ({
  page,
}) => {
  await page.goto("/work/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Work");
  for (const slug of HOME_WORK_SLUGS) {
    await page.locator(`a[href="/work/${slug}/"]`).click();
    await expect(page.locator("[data-case-body] h2")).toHaveCount(3);
    await expect(page.locator("#sources")).toBeVisible();
    await page.getByRole("link", { name: "Work index", exact: true }).click();
    await expect(page).toHaveURL(/\/work\/$/);
  }
});

test("Home links each story into its case study", async ({ page }) => {
  await page.goto("/");
  for (const slug of HOME_WORK_SLUGS) {
    await expect(
      page.locator(`[data-work-slug="${slug}"] a[href="/work/${slug}/"]`),
    ).toHaveCount(1);
  }
  await page
    .locator('.editorial-closing__coordinates a[href="/work/"]')
    .click();
  await expect(page).toHaveURL(/\/work\/$/);
});

test("Luxury reading mode preserves prose and every numeric observation", async ({
  page,
}) => {
  await page.goto(luxury);
  const body = await page.locator("[data-case-body]").innerText();
  const data = await page.locator("[data-price-table]").allTextContents();
  await page.getByRole("link", { name: "Reading mode", exact: true }).click();
  await expect(page.locator("[data-case-body]")).toHaveText(body);
  expect(await page.locator("[data-price-table]").allTextContents()).toEqual(
    data,
  );
  await expect(page.locator("details[open]")).toHaveCount(2);
  await expect(page.locator("[data-price-chart]")).toHaveCount(0);
  await page.getByRole("link", { name: "Visual essay", exact: true }).click();
  await expect(page).toHaveURL(luxury);
});

test("Case navigation and native evidence remain usable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto(luxury);
  await page.getByRole("link", { name: "Context", exact: true }).click();
  await expect(page.locator("#context")).toBeInViewport();
  await page.getByText("France — exact values", { exact: true }).click();
  await expect(page.locator("[data-price-table]").first()).toBeVisible();
  await expect(page.locator("[data-price-table]").first()).toContainText(
    "€6,500",
  );
  await page.getByRole("link", { name: "Reading mode", exact: true }).click();
  await expect(page.locator("[data-case-body]")).toBeVisible();
  await context.close();
});

test("Case pages preserve theme across routes and reduced-motion content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(luxury);
  await page.getByRole("button", { name: "Switch color theme" }).click();
  const theme = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("link", { name: "Reading mode", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme!);
  await expect(page.locator("[data-case-body]")).toHaveCSS("opacity", "1");
});

for (const width of [320, 768, 1024]) {
  test(`Work routes avoid page overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/work/",
      ...HOME_WORK_SLUGS.map((id) => `/work/${id}/`),
      `${luxury}reading/`,
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  });
}

test("Unknown Work route returns 404", async ({ page }) => {
  expect((await page.goto("/work/not-a-real-project/"))?.status()).toBe(404);
});
