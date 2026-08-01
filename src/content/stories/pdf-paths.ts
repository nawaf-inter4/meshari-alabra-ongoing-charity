import type { SupportedLocale } from "@/config/site";
import { STORY_SLUGS, type StoryPdfLocale, type StorySlug } from "./types";

/**
 * Locales that have a complete dedicated PDF on disk under `/stories/{slug}/{locale}.pdf`.
 * Only full Arabic originals ship today. Incomplete one-page synopsis PDFs must not be
 * listed here — missing locales fall back to `ar.pdf` via `resolveStoryPdf`.
 * When a complete translation is ready, add the locale and place the PDF on disk.
 */
export const STORY_PDF_LOCALES = {
  "al-khidr-or-destiny": ["ar"],
  "ash-shura": ["ar"],
  "al-jinn": ["ar"],
  "an-naml": ["ar"],
} as const satisfies Record<StorySlug, readonly StoryPdfLocale[]>;

void STORY_SLUGS;

export function storyPdfPublicPath(slug: StorySlug, locale: StoryPdfLocale): string {
  return `/stories/${slug}/${locale}.pdf`;
}

function availablePdfLocales(slug: StorySlug): readonly StoryPdfLocale[] {
  return STORY_PDF_LOCALES[slug] ?? (["ar"] as const);
}

/** True when the UI locale has no dedicated PDF and must use the Arabic original. */
export function isStoryPdfFallback(slug: StorySlug, locale: SupportedLocale): boolean {
  return !(availablePdfLocales(slug) as readonly string[]).includes(locale);
}

/**
 * Resolve a public PDF URL for a story + UI locale.
 * Prefers `/stories/{slug}/{locale}.pdf` when present; otherwise falls back to `ar.pdf`.
 * Never returns a path that would 404 for a supported UI locale.
 */
export function resolveStoryPdf(slug: StorySlug, locale: SupportedLocale): string {
  const available = availablePdfLocales(slug);
  const pdfLocale = (available as readonly string[]).includes(locale)
    ? (locale as StoryPdfLocale)
    : "ar";
  return storyPdfPublicPath(slug, pdfLocale);
}
