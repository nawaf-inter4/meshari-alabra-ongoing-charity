import type { SupportedLocale } from "@/config/site";

export const STORY_SLUGS = [
  "al-khidr-or-destiny",
  "ash-shura",
  "al-jinn",
  "an-naml",
] as const;

export type StorySlug = (typeof STORY_SLUGS)[number];

/** Locales that may have a dedicated story PDF file. */
export type StoryPdfLocale = SupportedLocale;

export type LocaleParagraphs = Record<SupportedLocale, string[]>;

export interface QuranStoryDefinition {
  slug: StorySlug;
  /** Estimated page count for UI hints (from QuranStoriesSection). */
  pages: number;
  surahNumber?: number;
  surahName?: {
    ar: string;
    en: string;
  };
  /** Full narrative body for HTML story pages (indexable). */
  body: LocaleParagraphs;
  /** Legacy filename kept at `public/stories/` for backwards compatibility. */
  legacyArabicFileName?: string;
}
