import { expect, test } from "@playwright/test";

test("hero LCP content is visible before client JavaScript hydrates", async ({ page }) => {
  await page.route(/\/_next\/static\/chunks\/.*\.js(?:\?.*)?$/, (route) => route.abort());
  await page.goto("/en", { waitUntil: "domcontentloaded" });

  await expect(page.locator("[data-memorial-card]")).toHaveCSS("opacity", "1");
  const verse = page.locator("main > section").first().getByText("In the name of Allah, the Most Gracious, the Most Merciful");
  await expect(verse.locator("../..")).toHaveCSS("opacity", "1");
  await expect(page.locator("[data-hero-verse]")).toBeVisible();
});

test("Quran stories hub SSR includes story cards without client JS", async ({ page }) => {
  await page.route(/\/_next\/static\/chunks\/.*\.js(?:\?.*)?$/, (route) => route.abort());
  await page.goto("/ar/sections/quran-stories", { waitUntil: "domcontentloaded" });

  const hub = page.locator("#quran-stories");
  await expect(hub).toBeVisible();
  const storyLinks = hub.locator('a[href*="/ar/sections/quran-stories/"]');
  await expect(storyLinks.first()).toBeVisible();
  expect(await storyLinks.count()).toBeGreaterThanOrEqual(4);
});

test("compact supplication tabs retain accessible names", async ({ page }) => {
  await page.goto("/en");
  await page.waitForSelector("#supplications button", { state: "visible" });
  const tabs = page.locator("#supplications button");
  await tabs.first().scrollIntoViewIfNeeded();
  const names = await tabs.evaluateAll((buttons) => buttons.map((button) => button.getAttribute("aria-label")));
  expect(names.length).toBeGreaterThan(5);
  expect(names.every(Boolean)).toBeTruthy();
});