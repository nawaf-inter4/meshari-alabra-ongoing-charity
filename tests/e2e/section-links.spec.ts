import { expect, test } from "@playwright/test";
import { mockExternalApis } from "./mock-api";

test.beforeEach(async ({ page }) => {
  await mockExternalApis(page);
});

test("landing-page section titles are links that preserve the active locale", async ({ page }) => {
  await page.goto("/en");

  const dedicatedSections = [
    "quran",
    "donation",
    "youtube",
    "supplications",
    "prayer-times",
    "tafseer",
    "hadith",
    "dhikr",
    "qibla",
  ];

  for (const section of dedicatedSections) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    const titleLink = page.locator(`[data-section-title-link="${section}"]`).first();
    await expect(titleLink).toHaveAttribute("href", `/en/sections/${section}`, { timeout: 15_000 });
  }

  const englishQuranTitle = page.locator('[data-section-title-link="quran"]').first();
  await page.locator("#quran").scrollIntoViewIfNeeded();
  await expect(englishQuranTitle).toHaveText("The Holy Quran");
  await expect(englishQuranTitle).toHaveAttribute("href", "/en/sections/quran");
  await englishQuranTitle.click();
  await expect(page).toHaveURL(/\/en\/sections\/quran$/);

  await page.goto("/ar");
  await page.locator("#quran").scrollIntoViewIfNeeded();
  const arabicQuranTitle = page.locator('[data-section-title-link="quran"]').first();
  await expect(arabicQuranTitle).toHaveAttribute("href", "/ar/sections/quran", { timeout: 15_000 });
});

test("section-directory cards preserve the active locale", async ({ page }, testInfo) => {
  testInfo.skip(testInfo.project.name !== "chromium", "WebKit client navigation after card click is unreliable");
  await mockExternalApis(page);

  await page.goto("/en");
  await page.waitForSelector('a[href="/en/sections/dhikr"]', { state: "visible" });
  const dhikrCard = page.locator('a[href="/en/sections/dhikr"]').first();
  await dhikrCard.scrollIntoViewIfNeeded();
  await expect(dhikrCard).toBeVisible();
  await dhikrCard.click();
  await expect(page).toHaveURL(/\/en\/sections\/dhikr$/);
});
