import { expect, test, type Page } from "@playwright/test";
import { mockExternalApis } from "./mock-api";

test.beforeEach(async ({ page }) => {
  await mockExternalApis(page);
});

/** Scroll until a lazy iframe mounts. Soft navigations / Suspense remounts can
 *  reset IntersectionObserver state and scroll position on WebKit. */
async function revealLazySection(page: Page, sectionId: string, iframeLocator: string) {
  const section = page.locator(`#${sectionId}`);
  await expect(section).toBeAttached({ timeout: 15_000 });
  const frame = section.locator(iframeLocator);
  await expect(async () => {
    await page.evaluate((id) => {
      document.querySelector(`#${id}`)?.scrollIntoView({ block: "center" });
      window.dispatchEvent(new Event("scroll"));
    }, sectionId);
    await expect(frame).toBeVisible({ timeout: 2_500 });
  }).toPass({ timeout: 30_000 });
  return { section, frame };
}

test("native YouTube players defer third-party scripts while memorial audio autoplays", async ({ page }) => {
  const embedRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("youtube.com/embed/")) embedRequests.push(request.url());
  });

  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1_000);
  expect(embedRequests).toHaveLength(0);

  const memorialAudio = page.locator('audio:has(source[src="/audio-webiste.mp3"])');
  // Memorial audio is started via JS (muted autoplay → unmute) to protect LCP;
  // do not require the HTML autoplay attribute or eager preload.
  await expect(memorialAudio).toHaveAttribute("preload", "none");
  await expect(memorialAudio).toBeAttached();

  await revealLazySection(page, "youtube", "iframe[title='Quran Playlist']");
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
  await page.goto("/en", { waitUntil: "domcontentloaded" });

  const { section: quranSection, frame: quranPlayer } = await revealLazySection(
    page,
    "youtube",
    "iframe[title='Quran Playlist']",
  );
  await expect(quranPlayer).toHaveAttribute(
    "src",
    /youtube\.com\/embed\/VXb36Nzybps\?.*list=PLozaqJ9egxJegXbK52PNLLlvWf4K5g-Cb/,
  );
  await expect(
    page.locator("#youtube").getByRole("button", { name: /Play Quran Recitations playlist/ }),
  ).toHaveCount(0);

  const { section: reciterSection, frame: reciterPlayer } = await revealLazySection(
    page,
    "meshari-favorite-reciter",
    "iframe",
  );
  await expect(reciterPlayer).toHaveAttribute("title", /Favorite Quran Reciter$/);
  await expect(reciterPlayer).toHaveAttribute(
    "src",
    /youtube\.com\/embed\/VzsvG9K1qqQ\?.*list=PLA3B14EC1634EA167/,
  );
  await expect(
    page.locator("#meshari-favorite-reciter").getByRole("button", {
      name: /Play Meshari's Favorite Reciter playlist/,
    }),
  ).toHaveCount(0);

  const { frame: chantPlayer } = await revealLazySection(page, "islamic-chant", "iframe");
  const chantCard = chantPlayer.locator("../..");
  await expect(chantCard).toHaveClass(/shadow-2xl/);
  await expect(chantCard).toHaveClass(/glow/);
});
