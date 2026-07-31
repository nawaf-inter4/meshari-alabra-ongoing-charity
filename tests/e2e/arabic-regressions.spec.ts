import { expect, test } from "@playwright/test";
import { mockExternalApis } from "./mock-api";

test.beforeEach(async ({ page }) => {
  await mockExternalApis(page);
});

async function expectTextNotClipped(locator: import("@playwright/test").Locator) {
  const result = await locator.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const text = range.getBoundingClientRect();
    const box = element.getBoundingClientRect();
    return {
      top: text.top,
      bottom: text.bottom,
      boxTop: box.top,
      boxBottom: box.bottom,
    };
  });
  expect(result.top).toBeGreaterThanOrEqual(result.boxTop - 3);
  expect(result.bottom).toBeLessThanOrEqual(result.boxBottom + 3);
}

test("Arabic memorial parentheses retain their phrase order", async ({ page }) => {
  await page.goto("/ar", { waitUntil: "domcontentloaded" });
  const charity = page.locator("[data-footer-charity]");
  await expect(charity).toBeVisible({ timeout: 15_000 });
  await expect(charity).toHaveAttribute("dir", "rtl");
  const parenthetical = charity.locator('span[dir="ltr"]');
  await expect(parenthetical).toHaveText("(رحمه الله)");
  await expect(parenthetical.locator('bdi[dir="rtl"]')).toHaveText("رحمه الله");
});

test("original Quran framing phrases remain green in dark and light mode", async ({ page }) => {
  for (const theme of ["dark", "light"] as const) {
    await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
    await page.goto("/ar", { waitUntil: "domcontentloaded" });
    if (theme === "dark") {
      await expect(page.locator("html")).toHaveClass(/dark/);
    } else {
      await expect(page.locator("html")).not.toHaveClass(/dark/);
    }

    for (const phrase of ["بسم الله الرحمن الرحيم", "صدق الله العلي العظيم"]) {
      const matches = page.getByText(phrase, { exact: true });
      await expect(matches).toHaveCount(2);
      for (const match of await matches.all()) {
        await expect(match).toHaveCSS("color", "rgb(0, 107, 63)");
      }
    }
  }
});

test("Arabic memorial identity is localized in the server HTML", async ({ request }) => {
  const response = await request.get("/ar?server-localization=1");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toMatch(/<h1[^>]*>مشاري بن أحمد بن سليمان العبره<\/h1>/u);
  expect(html).toMatch(/<p class="text-xl text-islamic-gold[^>]*>صفحة مخصصة لأخي مشاري/u);
});

test("footer and Quran actions retain their original colors", async ({ page }) => {
  await page.goto("/ar", { waitUntil: "domcontentloaded" });
  const footerShare = page.locator("footer").getByRole("button", { name: "مشاركة" });
  await expect(footerShare).toBeVisible({ timeout: 15_000 });
  // Avoid scrollIntoViewIfNeeded — WebKit can detach nodes during soft navigations.
  await expect(footerShare).toHaveCSS("color", "rgb(255, 255, 255)");
  const xLink = page.locator('footer a[href*="x.com/"]');
  await expect(xLink).toBeVisible({ timeout: 15_000 });
  await xLink.hover();
  const bg = await xLink.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bg).toMatch(/rgb\((\d+, ){2}\d+\)/);
  const [r, g, b] = bg.match(/\d+/g)!.map(Number);
  expect(r).toBeGreaterThanOrEqual(50);
  expect(r).toBeLessThanOrEqual(80);
  expect(g).toBeGreaterThanOrEqual(50);
  expect(g).toBeLessThanOrEqual(90);
  expect(b).toBeGreaterThanOrEqual(60);
  expect(b).toBeLessThanOrEqual(100);

  await page.goto("/ar/sections/quran?surah=1&ayah=1");
  const favoriteBadge = page.locator("[data-meshari-favorite-badge]").first();
  await expect(favoriteBadge).toHaveCSS("color", "rgb(255, 255, 255)");
});

test("client-side locale changes do not render an inert theme script", async ({ page }) => {
  const themeScriptErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" && message.text().includes("Encountered a script tag while rendering React component")) {
      themeScriptErrors.push(message.text());
    }
  });

  await page.goto("/ar");
  await page.getByRole("button", { name: "Select language" }).click();
  await page.getByRole("button", { name: "English English" }).click();
  await expect(page).toHaveURL(/\/en(?:[/?#]|$)/u);
  await expect(page.locator("html")).toHaveClass(/\bdark\b/u);
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).not.toHaveClass(/\bdark\b/u);
  expect(themeScriptErrors).toEqual([]);
});

test("Arabic Quran controls keep localized badges and isolated mixed-direction text", async ({ page }) => {
  await page.goto("/ar/sections/quran?surah=1&ayah=1");

  const favoriteBadge = page.locator("[data-meshari-favorite-badge]").first();
  await expect(favoriteBadge).toHaveText("مفضل مشاري");
  await expect(favoriteBadge).not.toContainText("Favorite");

  const surahTrigger = page.locator("[data-surah-select-trigger]");
  await expect(surahTrigger.locator('bdi[dir="rtl"]', { hasText: "سُورَةُ ٱلْفَاتِحَةِ" })).toHaveText("سُورَةُ ٱلْفَاتِحَةِ");
  await expect(surahTrigger.locator('bdi[dir="ltr"]', { hasText: "Al-Faatiha" })).toHaveText("Al-Faatiha");
  await expect(surahTrigger).toContainText("7 آيات");
  await expect(surahTrigger).not.toContainText("verses");

  const verseMetadata = page.locator("[data-ayah-number='1'] [data-verse-metadata]");
  await expect(verseMetadata).toHaveText("آية 1 • الجزء 1 • الصفحة 1");
  await expect(page.locator("#quran")).toContainText("تم العثور على 1 آيات");

  const translation = page.locator("[data-quran-translation]").first();
  await expect(translation).toContainText("(الرَّحْمَنِ)");
  const parenthetical = translation.locator("[data-bidi-parenthetical]").first();
  await expect(parenthetical).toHaveAttribute("dir", "ltr");
  await expect(parenthetical.locator('bdi[dir="rtl"]')).toHaveText("الرَّحْمَنِ");

  const language = page.locator("[data-translation-language]").first();
  await expect(language.locator('bdi[dir="ltr"]')).toHaveText("(AR)");
});

test("Arabic section titles and the dhikr count are not clipped", async ({ page }, testInfo) => {
  testInfo.skip(testInfo.project.name !== "chromium", "WebKit and Firefox rendering differs on this assertion");
  await page.goto("/ar/sections/dhikr");
  const title = page.locator("#dhikr h2");
  const dhikr = page.locator("#dhikr .font-arabic").first();
  const count = page.locator("#dhikr p.text-6xl");
  await expect(title).toBeVisible();
  await expect(dhikr).toBeVisible();
  await expect(count).toBeVisible();
  await title.scrollIntoViewIfNeeded();
  await dhikr.scrollIntoViewIfNeeded();
  await count.scrollIntoViewIfNeeded();
  await expectTextNotClipped(title);
  await expectTextNotClipped(dhikr);
  await expectTextNotClipped(count);
});

test("Arabic verse share preview keeps the original Arabic memorial watermark", async ({ page }, testInfo) => {
  testInfo.skip(testInfo.project.name !== "chromium", "WebKit share-preview mount timing is unreliable");
  await page.goto("/ar/sections/quran?surah=1&ayah=1");
  const shareButton = page.getByRole("button", { name: "مشاركة الآية" }).first();
  await expect(shareButton).toBeVisible({ timeout: 20_000 });
  await shareButton.click();
  const preview = page.locator("[data-share-verse-preview]");
  await expect(preview).toBeVisible({ timeout: 10_000 });
  await expect(preview).toContainText("صدقة جارية لمشاري بن أحمد بن سليمان العبره");
  const watermarkParenthetical = preview.locator("[data-bidi-parenthetical]");
  if (await watermarkParenthetical.count() > 0) {
    await expect(watermarkParenthetical.first()).toHaveAttribute("dir", "ltr");
  }
  await expect(preview).not.toContainText("Test Charity — Meshari Ahmed Sulaiman Alabra");
});

test("Arabic Quran verse playback uses the valid Ahmed al-Ajamy audio edition", async ({ page }, testInfo) => {
  testInfo.skip(testInfo.project.name === "webkit", "WebKit media play() stub timing is unreliable");

  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = function play() {
      this.dispatchEvent(new Event("play"));
      return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function pause() {
      this.dispatchEvent(new Event("pause"));
    };
  });

  await page.goto("/ar/sections/quran?surah=1&ayah=1");
  const play = page.getByRole("button", { name: "تشغيل الآية" }).first();
  await expect(play).toBeVisible({ timeout: 15_000 });
  await play.click();
  await expect(page.locator('audio[src*="ar.ahmedajamy/1.mp3"]')).toHaveAttribute(
    "src",
    "https://cdn.islamic.network/quran/audio/128/ar.ahmedajamy/1.mp3",
    { timeout: 15_000 },
  );
  await expect(page.getByRole("button", { name: "إيقاف التشغيل" }).first()).toBeVisible();
});

test("locale and section navigation stays online", async ({ page }) => {
  await page.goto("/ar");
  await page.goto("/en/sections/quran");
  await expect(page.locator("h1")).toHaveClass(/\bsr-only\b/u);
  await expect(page.getByRole("heading", { name: "The Holy Quran", level: 2 })).toBeVisible();
  await expect(page.getByText("You are offline", { exact: true })).toHaveCount(0);

  await page.goto("/ur/sections/dhikr");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByText("You are offline", { exact: true })).toHaveCount(0);
});