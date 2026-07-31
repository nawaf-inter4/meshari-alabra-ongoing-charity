import { expect, test } from "@playwright/test";

test("hero LCP content is visible before client JavaScript hydrates", async ({ page }) => {
  await page.route(/\/_next\/static\/chunks\/.*\.js(?:\?.*)?$/, (route) => route.abort());
  await page.goto("/en", { waitUntil: "domcontentloaded" });

  await expect(page.locator("[data-memorial-card]")).toHaveCSS("opacity", "1");
  const verse = page.locator("main > section").first().getByText("In the name of Allah, the Most Gracious, the Most Merciful");
  await expect(verse.locator("../..")).toHaveCSS("opacity", "1");
});

test("compact supplication tabs retain accessible names", async ({ page }) => {
  await page.goto("/en");
  await page.locator("#supplications").scrollIntoViewIfNeeded();
  await page.waitForSelector("#supplications button", { state: "visible", timeout: 15_000 });
  const tabs = page.locator("#supplications button");
  await tabs.first().scrollIntoViewIfNeeded();
  const names = await tabs.evaluateAll((buttons) => buttons.map((button) => button.getAttribute("aria-label")));
  expect(names.length).toBeGreaterThan(5);
  expect(names.every(Boolean)).toBeTruthy();
});