import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES, siteConfig } from "@/config/site";
import { STORY_SLUGS } from "@/content/stories";
import { SECTION_IDS } from "@/lib/routes";

function languageAlternates(suffix = "") {
  return Object.fromEntries([
    ...SUPPORTED_LOCALES.map((locale) => [
      locale,
      `${siteConfig.identity.siteUrl}/${locale}${suffix}`,
    ]),
    [
      "x-default",
      `${siteConfig.identity.siteUrl}/${siteConfig.identity.defaultLocale}${suffix}`,
    ],
  ]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const landingPages: MetadataRoute.Sitemap = SUPPORTED_LOCALES.map((locale) => ({
    url: `${siteConfig.identity.siteUrl}/${locale}`,
    changeFrequency: locale === siteConfig.identity.defaultLocale ? "daily" : "weekly",
    priority: locale === siteConfig.identity.defaultLocale ? 1 : 0.9,
    alternates: { languages: languageAlternates() },
  }));

  const sectionPages: MetadataRoute.Sitemap = SUPPORTED_LOCALES.flatMap((locale) =>
    SECTION_IDS.map((section) => ({
      url: `${siteConfig.identity.siteUrl}/${locale}/sections/${section}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: { languages: languageAlternates(`/sections/${section}`) },
    })),
  );

  const storyIndexPages: MetadataRoute.Sitemap = SUPPORTED_LOCALES.map((locale) => ({
    url: `${siteConfig.identity.siteUrl}/${locale}/stories`,
    changeFrequency: "weekly" as const,
    priority: 0.75,
    alternates: { languages: languageAlternates("/stories") },
  }));

  const storyPages: MetadataRoute.Sitemap = SUPPORTED_LOCALES.flatMap((locale) =>
    STORY_SLUGS.map((slug) => ({
      url: `${siteConfig.identity.siteUrl}/${locale}/stories/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.72,
      alternates: { languages: languageAlternates(`/stories/${slug}`) },
    })),
  );

  return [...landingPages, ...sectionPages, ...storyIndexPages, ...storyPages];
}
