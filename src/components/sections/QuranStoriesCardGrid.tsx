"use client";

import Link from "next/link";
import { BookOpen, Download, Eye, FileText, Heart, Star } from "lucide-react";
import PDFThumbnail from "../PDFThumbnail";
import {
  QURAN_STORIES,
  calculateReadingTime,
  isStoryPdfFallback,
  localizedStoryHref,
  resolveStoryPdf,
  storyDescriptionKey,
  storyTitleKey,
  type QuranStoryDefinition,
} from "@/content/stories";
import type { SupportedLocale } from "@/config/site";

type Translate = (key: string) => string;

interface QuranStoriesCardGridProps {
  locale: SupportedLocale;
  direction: "ltr" | "rtl";
  t: Translate;
  onPreview: (story: QuranStoryDefinition) => void;
  onDownload: (story: QuranStoryDefinition) => void;
  /** When false, skip client PDF canvases (SSR / no-JS still get titles + links). */
  showThumbnails?: boolean;
}

/**
 * Story cards + canonical links. Rendered on the server for the hub so
 * crawlers and no-JS clients see the full listing in initial HTML.
 */
export default function QuranStoriesCardGrid({
  locale,
  direction,
  t,
  onPreview,
  onDownload,
  showThumbnails = true,
}: QuranStoriesCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
      {QURAN_STORIES.map((story, index) => {
        const title = t(storyTitleKey(story.slug));
        const description = t(storyDescriptionKey(story.slug));
        const pdfUrl = resolveStoryPdf(story.slug, locale);
        const readingTime = calculateReadingTime(story.pages);
        const href = localizedStoryHref(locale, story.slug);

        return (
          <div
            key={story.slug}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-islamic-gold"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
              <div className="absolute inset-0">
                {showThumbnails ? (
                  <PDFThumbnail
                    pdfUrl={pdfUrl}
                    className="w-full h-full"
                    width={400}
                    height={192}
                    priority={index === 0}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-16 h-16 text-islamic-gold/70" aria-hidden="true" />
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => onPreview(story)}
                    className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-opacity duration-200 flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>{t("quran_stories.preview")}</span>
                  </button>
                  <Link
                    href={href}
                    className="bg-islamic-gold text-white px-4 py-2 rounded-full hover:bg-islamic-green transition-opacity duration-200 flex items-center space-x-2 glow"
                  >
                    <BookOpen className="w-4 h-4" aria-hidden="true" />
                    <span>{t("quran_stories.read")}</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-islamic-gold fill-current" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {t("quran_stories.featured_story")}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                  <Heart className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {story.pages} {t("quran_stories.pages")}
                  </span>
                </div>
              </div>

              <h3
                className={`text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 ${
                  direction === "rtl" ? "font-arabic" : ""
                }`}
              >
                <Link href={href} className="hover:text-islamic-green transition-opacity">
                  {title}
                </Link>
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {description}
              </p>

              {isStoryPdfFallback(story.slug, locale) && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {t("quran_stories.pdf_language_note")}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {readingTime.replace("min", t("quran_stories.reading_time"))}
                    </span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onDownload(story)}
                  className="bg-gradient-to-r from-islamic-gold to-islamic-green text-white px-6 py-3 rounded-full flex items-center space-x-2 text-sm font-medium glow"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>{t("quran_stories.download")}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
