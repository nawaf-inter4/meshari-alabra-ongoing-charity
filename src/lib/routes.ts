import { isSupportedLocale, siteConfig } from "@/config/site";

export const SECTION_IDS = [
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

export type SectionId = (typeof SECTION_IDS)[number];

export function isSectionId(value: string): value is SectionId {
  return SECTION_IDS.includes(value as SectionId);
}

export function localizedSectionHref(locale: string, section: string) {
  const safeLocale = isSupportedLocale(locale) ? locale : siteConfig.identity.defaultLocale;
  const safeSection = section.replace(/^\/+|\/+$/g, "");
  return `/${safeLocale}/sections/${safeSection}`;
}
