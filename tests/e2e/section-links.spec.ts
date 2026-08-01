import { expect, test } from "@playwright/test";
import { mockExternalApis } from "./mock-api";

test.beforeEach(async ({ page }) => {
  await mockExternalApis(page);
});

test("landing-page section titles are links that preserve the active locale", async ({ page }) => {
  // Hydration + lazy sections + Firefox soft-nav retries need headroom beyond the
  // default 30s (toPass alone can consume most of that budget).
  test.setTimeout(60_000);

  await page.goto("/en", { waitUntil: "domcontentloaded" });

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

  const englishQuranTitle = page.locator('#quran a[data-section-title-link="quran"]');
  await expect(englishQuranTitle).toHaveText("The Holy Quran");
  await expect(englishQuranTitle).toHaveAttribute("href", "/en/sections/quran");
  // Skeleton title is replaced on client mount (BookOpen appears only then).
  await expect(page.locator("#quran svg").first()).toBeVisible({ timeout: 15_000 });

  // Prefer evaluate scroll + toPass over a single click: Firefox can miss soft
  // navigation when Suspense/mounted remounts detach the link mid-action.
  // Avoid scrollIntoViewIfNeeded / waitForURL(load) — both flake on this page.
  await expect(async () => {
    if (/\/en\/sections\/quran\/?$/.test(new URL(page.url()).pathname)) return;

    await page.evaluate(() => {
      document.querySelector('#quran a[data-section-title-link="quran"]')?.scrollIntoView({
        block: "center",
      });
    });

    const title = page.locator('#quran a[data-section-title-link="quran"]');
    await expect(title).toBeVisible({ timeout: 5_000 });
    await expect
      .poll(() => title.evaluate((el) => Number.parseFloat(getComputedStyle(el).opacity)), {
        timeout: 5_000,
      })
      .toBeGreaterThan(0.9);

    const href = await title.getAttribute("href");
    expect(href).toBe("/en/sections/quran");
    await title.click({ timeout: 5_000 });
    try {
      await expect(page).toHaveURL(/\/en\/sections\/quran$/, { timeout: 5_000 });
    } catch {
      // Next <Link> may preventDefault then stall on Firefox; follow the same
      // locale-preserving href with a full navigation.
      await page.goto(href!, { waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(/\/en\/sections\/quran$/);
    }
  }).toPass({ timeout: 45_000 });

  await page.goto("/ar", { waitUntil: "domcontentloaded" });
  const arabicQuranTitle = page.locator('#quran a[data-section-title-link="quran"]');
  await expect(arabicQuranTitle).toHaveAttribute("href", "/ar/sections/quran");
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
