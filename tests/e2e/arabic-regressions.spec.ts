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
  expect(result.top).toBeGreaterThanOrEqual(result.boxTop - 1);
  expect(result.bottom).toBeLessThanOrEqual(result.boxBottom + 1);
}

test("Arabic memorial parentheses retain their phrase order", async ({ page }) => {
  await page.goto("/ar");
  const charity = page.getByText("صدقة جارية لمشاري بن أحمد بن سليمان العبره (رحمه الله)", { exact: true }).last();
  await charity.scrollIntoViewIfNeeded();
  await expect(charity).toBeVisible();
  await expect(charity).toHaveAttribute("dir", "rtl");
  const parenthetical = charity.locator('span[dir="ltr"]');
  await expect(parenthetical).toHaveText("(رحمه الله)");
  await expect(parenthetical.locator('bdi[dir="rtl"]')).toHaveText("رحمه الله");
});

test("Arabic section titles and the dhikr count are not clipped", async ({ page }) => {
  await page.goto("/ar/sections/dhikr");
  const title = page.locator("#dhikr h2");
  const dhikr = page.locator("#dhikr .font-arabic").first();
  const count = page.locator("#dhikr p.text-6xl");
  await expect(title).toBeVisible();
  await expect(dhikr).toBeVisible();
  await expect(count).toBeVisible();
  await expectTextNotClipped(title);
  await expectTextNotClipped(dhikr);
  await expectTextNotClipped(count);
});

test("Arabic verse share preview keeps the original Arabic memorial watermark", async ({ page }) => {
  await page.goto("/ar/sections/quran?surah=1&ayah=1");
  const shareButton = page.getByRole("button", { name: "مشاركة الآية" }).first();
  await expect(shareButton).toBeVisible({ timeout: 20_000 });
  await shareButton.click();
  const preview = page.locator("[data-share-verse-preview]");
  await expect(preview).toContainText("صدقة جارية لمشاري بن أحمد بن سليمان العبره (رحمه الله)");
  await expect(preview).not.toContainText("Test Charity — Meshari Ahmed Sulaiman Alabra");
});

test("Arabic Quran verse playback uses the valid Ahmed al-Ajamy audio edition", async ({ page }) => {
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
  );
  await expect(page.getByRole("button", { name: "إيقاف التشغيل" }).first()).toBeVisible();
});

test("locale and section navigation stays online", async ({ page }) => {
  await page.goto("/ar");
  await page.goto("/en/sections/quran");
  await expect(page.getByRole("heading", { name: "The Holy Quran", level: 1 })).toBeVisible();
  await expect(page.getByText("You are offline", { exact: true })).toHaveCount(0);

  await page.goto("/ur/sections/dhikr");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByText("You are offline", { exact: true })).toHaveCount(0);
});