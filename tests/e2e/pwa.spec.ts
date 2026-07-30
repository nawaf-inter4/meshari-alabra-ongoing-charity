import { expect, test } from "@playwright/test";
import { mockExternalApis } from "./mock-api";

test("publishes a complete installable web app manifest", async ({ request }) => {
  const response = await request.get("/manifest.webmanifest");
  expect(response.ok()).toBeTruthy();

  const manifest = await response.json();
  expect(manifest).toMatchObject({
    display: "standalone",
    scope: "/",
    prefer_related_applications: false,
  });
  expect(manifest.id).toMatch(/^\//);
  expect(manifest.start_url).toContain("source=pwa");
  expect(manifest.icons).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ sizes: "192x192" }),
      expect.objectContaining({ sizes: "512x512" }),
      expect.objectContaining({ sizes: "512x512", purpose: "maskable" }),
    ]),
  );
  expect(manifest.shortcuts).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ url: expect.stringContaining("/sections/quran") }),
      expect.objectContaining({ url: expect.stringContaining("/sections/prayer-times") }),
    ]),
  );
});

test("serves an offline-capable service worker and fallback", async ({ request }) => {
  const [workerResponse, offlineResponse] = await Promise.all([
    request.get("/sw.js"),
    request.get("/offline.html"),
  ]);

  expect(workerResponse.status()).toBe(200);
  expect(workerResponse.headers()["content-type"]).toContain("javascript");
  const worker = await workerResponse.text();
  expect(worker).toContain("addEventListener(\"install\"");
  expect(worker).toContain("addEventListener(\"activate\"");
  expect(worker).toContain("addEventListener(\"fetch\"");
  expect(worker).toContain("/offline.html");
  expect(worker).toContain('const VERSION = "v5"');

  expect(offlineResponse.status()).toBe(200);
  expect(offlineResponse.headers()["content-type"]).toContain("text/html");
});

test("offline fallback uses one active locale and the site typography", async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("preferred-locale")) localStorage.setItem("preferred-locale", "fr");
    localStorage.setItem("theme", "light");
  });
  await page.route("**/icons/icon-192x192.png", (route) => route.abort());
  await page.goto("/offline.html");

  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.locator("h1")).toHaveText("Vous êtes hors ligne");
  await expect(page.getByRole("button")).toHaveText("Réessayer");
  await expect(page.getByRole("link")).toHaveText("Accueil");
  await expect(page.locator("body")).not.toContainText("أنت غير متصل");
  await expect(page.locator("body")).not.toContainText("You are offline");

  const bodyFont = await page.locator("body").evaluate((element) => getComputedStyle(element).fontFamily);
  expect(bodyFont).toContain("Lexend Deca");

  const brandMark = page.locator(".app-icon");
  await expect(brandMark).toBeVisible();
  expect(
    await brandMark.evaluate((element) =>
      element instanceof SVGElement ||
      (element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0),
    ),
  ).toBe(true);

  const retry = page.getByRole("button");
  await expect(retry).toHaveCSS("background-color", "rgb(212, 175, 55)");
  await expect(retry).toHaveCSS("color", "rgb(17, 24, 39)");
  expect(await retry.evaluate((element) => getComputedStyle(element).boxShadow)).toMatch(
    /(?:rgba\(212, 175, 55|color\(srgb 0\.83137\d* 0\.68627\d* 0\.21568\d*)/,
  );
  await retry.hover();
  await expect(retry).toHaveCSS("background-color", "rgb(0, 107, 63)");

  const home = page.getByRole("link");
  await expect(home).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await home.hover();
  await expect(home).toHaveCSS("background-color", "rgb(212, 175, 55)");
  await expect(home).toHaveCSS("color", "rgb(17, 24, 39)");

  await page.evaluate(() => localStorage.setItem("preferred-locale", "ur"));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ur");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("h1")).toHaveText("آپ آف لائن ہیں");
  const rtlFont = await page.locator("body").evaluate((element) => getComputedStyle(element).fontFamily);
  expect(rtlFont).toContain("Tajawal");
});

test("install guidance follows the active locale and direction", async ({ page }) => {
  await mockExternalApis(page);
  await page.addInitScript(() => {
    const nativeSetTimeout = window.setTimeout.bind(window);
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) =>
      nativeSetTimeout(handler, timeout === 8000 ? 0 : timeout, ...args)) as typeof window.setTimeout;
  });

  const announceInstallability = async () => {
    await page.evaluate(() => {
      const announce = () => {
        const event = new Event("beforeinstallprompt", { cancelable: true });
        Object.defineProperties(event, {
          prompt: { value: async () => undefined },
          userChoice: {
            value: Promise.resolve({ outcome: "dismissed", platform: "web" }),
          },
          platforms: { value: ["web"] },
        });
        window.dispatchEvent(event);
      };
      announce();
      const interval = window.setInterval(() => {
        if (document.querySelector("[data-pwa-install-prompt]")) {
          window.clearInterval(interval);
        } else {
          announce();
        }
      }, 50);
      window.setTimeout(() => window.clearInterval(interval), 2000);
    });
  };

  await page.goto("/fr");
  await announceInstallability();
  const frenchPrompt = page.locator("[data-pwa-install-prompt]");
  await expect(frenchPrompt).toBeVisible();
  await expect(frenchPrompt).toHaveAttribute("dir", "ltr");
  await expect(frenchPrompt).toContainText("Installer l’application");
  const promptBox = await frenchPrompt.boundingBox();
  expect(promptBox).not.toBeNull();
  expect(promptBox!.x).toBeLessThan(40);
  expect(promptBox!.width).toBeLessThanOrEqual(360);
  expect(promptBox!.height).toBeLessThanOrEqual(120);
  await expect(frenchPrompt.locator("[data-pwa-app-icon]")).toHaveCSS("border-radius", "9999px");
  await expect(frenchPrompt).toContainText("Test Charity");
  await frenchPrompt.getByRole("button", { name: "Fermer l’invite d’installation" }).click();

  await page.evaluate(() => localStorage.removeItem("pwa-install-prompt-dismissed-at"));
  await page.goto("/ur");
  await announceInstallability();
  const urduPrompt = page.locator("[data-pwa-install-prompt]");
  await expect(urduPrompt).toBeVisible();
  await expect(urduPrompt).toHaveAttribute("dir", "rtl");
  await expect(urduPrompt).toContainText("ایپ انسٹال کریں");
});
