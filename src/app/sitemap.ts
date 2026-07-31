import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES, siteConfig } from "@/config/site";
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

  return [...landingPages, ...sectionPages];
}
