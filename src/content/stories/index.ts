import type { SupportedLocale } from "@/config/site";
import { translate } from "@/lib/translations";
import { QURAN_STORIES } from "./stories";
import { isStoryPdfFallback, resolveStoryPdf } from "./pdf-paths";
import { STORY_SLUGS, type QuranStoryDefinition, type StorySlug } from "./types";

export type { QuranStoryDefinition, LocaleParagraphs, StoryPdfLocale, StorySlug } from "./types";
export { STORY_SLUGS } from "./types";
export { QURAN_STORIES } from "./stories";
export {
  STORY_PDF_LOCALES,
  isStoryPdfFallback,
  resolveStoryPdf,
  storyPdfPublicPath,
} from "./pdf-paths";

export function isStorySlug(value: string): value is StorySlug {
  return (STORY_SLUGS as readonly string[]).includes(value);
}

export function getStoryBySlug(slug: string): QuranStoryDefinition | undefined {
  return QURAN_STORIES.find((story) => story.slug === slug);
}

export function storyTitleKey(slug: StorySlug): string {
  return `quran_stories.stories.${slug}.title`;
}

export function storyDescriptionKey(slug: StorySlug): string {
  return `quran_stories.stories.${slug}.description`;
}

export function getStoryTitle(story: QuranStoryDefinition, locale: SupportedLocale): string {
  return translate(locale, storyTitleKey(story.slug));
}

export function getStoryDescription(story: QuranStoryDefinition, locale: SupportedLocale): string {
  return translate(locale, storyDescriptionKey(story.slug));
}

export function getStoryBody(story: QuranStoryDefinition, locale: SupportedLocale): string[] {
  return story.body[locale] || story.body.ar;
}

export function getStoryPdfPath(story: QuranStoryDefinition, locale: SupportedLocale): string {
  return resolveStoryPdf(story.slug, locale);
}

export function storyUsesArabicPdf(story: QuranStoryDefinition, locale: SupportedLocale): boolean {
  return isStoryPdfFallback(story.slug, locale);
}

export function localizedStoryHref(locale: string, slug: string): string {
  return `/${locale}/stories/${slug}`;
}

export function calculateReadingTime(pages: number): string {
  const minutes = Math.max(1, Math.round(pages * 1.1));
  return `${minutes} min`;
}
