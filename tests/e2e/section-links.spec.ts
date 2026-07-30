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
    const titleLink = page.locator(`[data-section-title-link="${section}"]`).first();
    await expect(titleLink).toHaveAttribute("href", `/en/sections/${section}`);
  }

  const englishQuranTitle = page.locator('[data-section-title-link="quran"]').first();
  await expect(englishQuranTitle).toHaveText("The Holy Quran");
  await expect(englishQuranTitle).toHaveAttribute("href", "/en/sections/quran");
  await englishQuranTitle.click();
  await expect(page).toHaveURL(/\/en\/sections\/quran$/);

  await page.goto("/ar");
  const arabicQuranTitle = page.locator('[data-section-title-link="quran"]').first();
  await expect(arabicQuranTitle).toHaveAttribute("href", "/ar/sections/quran");
});

test("section-directory cards preserve the active locale", async ({ page }) => {
  await mockExternalApis(page);

  await page.goto("/en");
  await page.waitForSelector('a[href="/en/sections/dhikr"]', { state: "attached" });
  const dhikrCard = page.locator('a[href="/en/sections/dhikr"]').first();
  await expect(dhikrCard).toBeVisible();
  await dhikrCard.click();
  await expect(page).toHaveURL(/\/en\/sections\/dhikr$/);
});
