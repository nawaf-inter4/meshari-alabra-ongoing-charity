import { expect, test } from "@playwright/test";
import { mockExternalApis } from "./mock-api";

test.beforeEach(async ({ page }) => {
  await mockExternalApis(page);
});

test("native YouTube players defer third-party scripts while memorial audio autoplays", async ({ page }) => {
  const embedRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("youtube.com/embed/")) embedRequests.push(request.url());
  });

  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1_000);
  expect(embedRequests).toHaveLength(0);

  const memorialAudio = page.locator('audio:has(source[src="/audio-webiste.mp3"])');
  await expect(memorialAudio).toHaveAttribute("preload", "metadata");
  await expect(memorialAudio).toHaveAttribute("autoplay", "");

  await page.locator("#youtube").scrollIntoViewIfNeeded();
  await expect.poll(() => embedRequests.some((url) => url.includes("/embed/VXb36Nzybps"))).toBeTruthy();
});

test("Quran story cards render their first-page PDF thumbnails", async ({ page }) => {
  await page.goto("/ar", { waitUntil: "domcontentloaded" });
  const stories = page.locator("#quran-stories");
  await expect(stories).toBeAttached();
  await page.evaluate(() => document.querySelector("#quran-stories")?.scrollIntoView());
  await expect(stories.locator("canvas").first()).toBeVisible({ timeout: 15_000 });
});

test("playlist sections use YouTube's native one-click players", async ({ page }) => {
  await page.goto("/en");

  const quranSection = page.locator("#youtube");
  await quranSection.scrollIntoViewIfNeeded();
  const quranPlayer = quranSection.locator("iframe[title='Quran Playlist']");
  await expect(quranPlayer).toBeVisible();
  await expect(quranPlayer).toHaveAttribute(
    "src",
    /youtube\.com\/embed\/VXb36Nzybps\?.*list=PLozaqJ9egxJegXbK52PNLLlvWf4K5g-Cb/,
  );
  await expect(quranSection.getByRole("button", { name: /Play Quran Recitations playlist/ })).toHaveCount(0);

  const reciterSection = page.locator("#meshari-favorite-reciter");
  await reciterSection.scrollIntoViewIfNeeded();
  const reciterPlayer = reciterSection.locator("iframe");
  await expect(reciterPlayer).toBeVisible();
  await expect(reciterPlayer).toHaveAttribute("title", /Favorite Quran Reciter$/);
  await expect(reciterPlayer).toHaveAttribute(
    "src",
    /youtube\.com\/embed\/VzsvG9K1qqQ\?.*list=PLA3B14EC1634EA167/,
  );
  await expect(reciterSection.getByRole("button", { name: /Play Meshari's Favorite Reciter playlist/ })).toHaveCount(0);

  const chantSection = page.locator("#islamic-chant");
  await chantSection.scrollIntoViewIfNeeded();
  const chantPlayer = chantSection.locator("iframe");
  await expect(chantPlayer).toBeVisible();
  const chantCard = chantPlayer.locator("../..");
  await expect(chantCard).toHaveClass(/shadow-2xl/);
  await expect(chantCard).toHaveClass(/glow/);
});
