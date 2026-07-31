import {
  SUPPORTED_LOCALES,
  siteAssetUrl,
  siteConfig,
} from "@/config/site";
import { translate } from "@/lib/translations";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const siteUrl = siteConfig.identity.siteUrl;
  const defaultUrl = `${siteUrl}/${siteConfig.identity.defaultLocale}`;
  const title = siteConfig.seo.title || siteConfig.identity.name;
  const description =
    siteConfig.seo.description ||
    translate(siteConfig.identity.defaultLocale, "hero.description");

  const items = SUPPORTED_LOCALES.map((locale) => {
    const url = `${siteUrl}/${locale}`;
    const localeTitle =
      siteConfig.seo.title || translate(locale, "site.title", siteConfig.identity.name);
    const localeDescription =
      siteConfig.seo.description || translate(locale, "hero.description");

    return `
    <item>
      <title>${escapeXml(localeTitle)}</title>
      <description>${escapeXml(localeDescription)}</description>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <language>${locale}</language>
    </item>`;
  }).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <description>${escapeXml(description)}</description>
    <link>${escapeXml(defaultUrl)}</link>
    <language>${siteConfig.identity.defaultLocale}</language>
    <generator>Next.js</generator>
    <atom:link href="${escapeXml(`${siteUrl}/feed.xml`)}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${escapeXml(siteAssetUrl(siteConfig.assets.openGraphImage))}</url>
      <title>${escapeXml(siteConfig.identity.shortName)}</title>
      <link>${escapeXml(defaultUrl)}</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
