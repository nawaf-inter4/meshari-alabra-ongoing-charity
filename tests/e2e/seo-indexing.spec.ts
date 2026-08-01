import { expect, test } from "@playwright/test";

const locales = ["ar", "en", "ur", "tr", "id", "ms", "bn", "fr", "zh", "it", "ja", "ko", "es", "pt", "hi"] as const;
const rtlLocales = new Set(["ar", "ur"]);
const sections = [
  "quran",
  "tafseer",
  "dhikr",
  "prayer-times",
  "qibla",
  "donation",
  "supplications",
  "hadith",
  "youtube",
  "quran-stories",
] as const;
const stories = ["al-khidr-or-destiny", "ash-shura", "al-jinn", "an-naml"] as const;
const siteUrl = "https://meshari.charity";
const expectedPageCount = locales.length * (1 + sections.length + stories.length);

function tags(html: string, name: string) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) || [];
}

function attribute(tag: string, name: string) {
  return tag.match(new RegExp(`${name}=["']([^"']+)["']`, "i"))?.[1];
}

function canonical(html: string) {
  const tag = tags(html, "link").find((candidate) => attribute(candidate, "rel") === "canonical");
  return tag ? attribute(tag, "href") : undefined;
}

function hreflangMap(html: string) {
  return new Map(
    tags(html, "link")
      .filter((tag) => attribute(tag, "rel") === "alternate" && attribute(tag, "hreflang"))
      .map((tag) => [attribute(tag, "hreflang")!, attribute(tag, "href")!]),
  );
}

function expectLocaleCluster(alternates: Map<string, string>, suffix = "") {
  expect(alternates.size).toBe(locales.length + 1);
  for (const locale of locales) {
    expect(alternates.get(locale)).toBe(`${siteUrl}/${locale}${suffix}`);
  }
  expect(alternates.get("x-default")).toBe(`${siteUrl}/ar${suffix}`);
}

test("normalizes root and legacy section URLs permanently", async ({ request }) => {
  const root = await request.get("/", { maxRedirects: 0 });
  expect(root.status()).toBe(308);
  expect(root.headers().location).toBe("/ar");

  const legacySection = await request.get("/sections/quran", { maxRedirects: 0 });
  expect(legacySection.status()).toBe(308);
  expect(legacySection.headers().location).toBe("/ar/sections/quran");
});

test("rejects unsupported locale paths instead of creating indexable duplicates", async ({ request }) => {
  const response = await request.get("/definitely-not-a-supported-locale");
  expect(response.status()).toBe(404);
  expect(await response.text()).toMatch(/noindex/i);
});

test("every localized landing is self-canonical with one reciprocal hreflang cluster", async ({ request }) => {
  for (const locale of locales) {
    const response = await request.get(`/${locale}`);
    expect(response.status(), `/${locale}`).toBe(200);
    const html = await response.text();
    const htmlTag = tags(html, "html")[0];
    expect(attribute(htmlTag || "", "lang"), `/${locale} lang`).toBe(locale);
    expect(attribute(htmlTag || "", "dir"), `/${locale} dir`).toBe(rtlLocales.has(locale) ? "rtl" : "ltr");
    expect(canonical(html), `/${locale} canonical`).toBe(`${siteUrl}/${locale}`);
    expectLocaleCluster(hreflangMap(html));
  }
});

test("every localized section is a real self-canonical server page", async ({ request }) => {
  for (const locale of locales) {
    for (const section of sections) {
      const path = `/${locale}/sections/${section}`;
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      const html = await response.text();
      const htmlTag = tags(html, "html")[0];
      expect(attribute(htmlTag || "", "lang"), `${path} lang`).toBe(locale);
      expect(attribute(htmlTag || "", "dir"), `${path} dir`).toBe(rtlLocales.has(locale) ? "rtl" : "ltr");
      expect(canonical(html), `${path} canonical`).toBe(`${siteUrl}${path}`);
      expectLocaleCluster(hreflangMap(html), `/sections/${section}`);
      expect(html).toMatch(/<h1\b/i);
      expect(html).toContain(`section-schema-${section}`);
    }
  }
});

test("every localized Quran story page is self-canonical with schema", async ({ request }) => {
  for (const locale of locales) {
    const indexPath = `/${locale}/sections/quran-stories`;
    const indexResponse = await request.get(indexPath);
    expect(indexResponse.status(), indexPath).toBe(200);
    const indexHtml = await indexResponse.text();
    expect(canonical(indexHtml), indexPath).toBe(`${siteUrl}${indexPath}`);
    expectLocaleCluster(hreflangMap(indexHtml), "/sections/quran-stories");
    expect(indexHtml).toContain("section-schema-quran-stories");

    for (const slug of stories) {
      const path = `/${locale}/sections/quran-stories/${slug}`;
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      const html = await response.text();
      const htmlTag = tags(html, "html")[0];
      expect(attribute(htmlTag || "", "lang"), `${path} lang`).toBe(locale);
      expect(attribute(htmlTag || "", "dir"), `${path} dir`).toBe(rtlLocales.has(locale) ? "rtl" : "ltr");
      expect(canonical(html), `${path} canonical`).toBe(`${siteUrl}${path}`);
      expectLocaleCluster(hreflangMap(html), `/sections/quran-stories/${slug}`);
      expect(html).toMatch(/<h1\b/i);
      expect(html).toContain(`story-schema-${slug}`);
      // Language switcher chips removed from the read-story page
      expect(html).not.toMatch(/aria-label=["']Language versions["']/i);
    }
  }
});

test("legacy /stories routes permanently redirect under sections", async ({ request }) => {
  for (const locale of ["ar", "en"] as const) {
    const index = await request.get(`/${locale}/stories`, { maxRedirects: 0 });
    expect(index.status(), `/${locale}/stories`).toBe(308);
    expect(index.headers().location).toBe(`/${locale}/sections/quran-stories`);

    const story = await request.get(`/${locale}/stories/al-khidr-or-destiny`, { maxRedirects: 0 });
    expect(story.status()).toBe(308);
    expect(story.headers().location).toBe(`/${locale}/sections/quran-stories/al-khidr-or-destiny`);
  }
});

test(`sitemap contains only the ${expectedPageCount} canonical localized HTML pages`, async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("xml");
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expected = [
    ...locales.map((locale) => `${siteUrl}/${locale}`),
    ...locales.flatMap((locale) => sections.map((section) => `${siteUrl}/${locale}/sections/${section}`)),
    ...locales.flatMap((locale) =>
      stories.map((slug) => `${siteUrl}/${locale}/sections/quran-stories/${slug}`),
    ),
  ];

  expect(new Set(locations).size).toBe(expectedPageCount);
  expect(new Set(locations)).toEqual(new Set(expected));
  expect(xml).not.toContain("manifest.webmanifest");
  expect(xml).not.toContain("llms.txt");
  expect(xml).not.toContain(`${siteUrl}</loc>`);
  // Legacy hub paths must not appear (section route is …/sections/quran-stories/…)
  expect(xml).not.toMatch(/meshari\.charity\/[a-z]{2}\/stories(?:\/|<)/);
});

test("new locales es/pt/hi are LTR, self-canonical, and present in sitemap", async ({ request }) => {
  for (const locale of ["es", "pt", "hi"] as const) {
    const response = await request.get(`/${locale}`);
    expect(response.status(), `/${locale}`).toBe(200);
    const html = await response.text();
    const htmlTag = tags(html, "html")[0];
    expect(attribute(htmlTag || "", "lang")).toBe(locale);
    expect(attribute(htmlTag || "", "dir")).toBe("ltr");
    expect(canonical(html)).toBe(`${siteUrl}/${locale}`);
    expect(hreflangMap(html).get(locale)).toBe(`${siteUrl}/${locale}`);
  }
});

test("robots and RSS use the same canonical locale policy", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const robotsText = await robots.text();
  expect(robotsText).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
  expect(robotsText).toContain("Disallow: /api/");
  expect(robotsText).toContain("Disallow: /offline.html");

  const feed = await request.get("/feed.xml");
  expect(feed.status()).toBe(200);
  expect(feed.headers()["content-type"]).toContain("application/rss+xml");
  const rss = await feed.text();
  const itemLinks = [...rss.matchAll(/<item>[\s\S]*?<link>([^<]+)<\/link>[\s\S]*?<\/item>/g)].map(
    (match) => match[1],
  );
  expect(itemLinks).toEqual(locales.map((locale) => `${siteUrl}/${locale}`));
  expect(rss).not.toContain("info@meshari.charity");
  expect(rss).not.toContain("<pubDate>");
});
