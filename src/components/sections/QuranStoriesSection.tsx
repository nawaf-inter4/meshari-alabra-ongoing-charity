"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../LanguageProvider";
import { BookOpen, Download, Eye, FileText, Heart, Star, ExternalLink } from "lucide-react";
import PDFThumbnail from "../PDFThumbnail";
import PDFViewer from "../PDFViewer";
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
import { isSupportedLocale, type SupportedLocale } from "@/config/site";

export default function QuranStoriesSection() {
  const { t, locale, direction } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<QuranStoryDefinition | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeLocale: SupportedLocale = isSupportedLocale(locale) ? locale : "ar";

  const handleStoryClick = (story: QuranStoryDefinition) => {
    setSelectedStory(story);
    setPdfPreviewUrl(resolveStoryPdf(story.slug, safeLocale));
    setIsPreviewOpen(true);
  };

  const handleDownload = (story: QuranStoryDefinition) => {
    if (typeof document === "undefined" || !document.body?.parentNode) return;
    try {
      const pdfPath = resolveStoryPdf(story.slug, safeLocale);
      const link = document.createElement("a");
      link.href = pdfPath;
      link.download = pdfPath.split("/").pop() || `${story.slug}.pdf`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        document.body.removeChild(link);
      }
    } catch {
      // Silently fail if DOM manipulation fails
    }
  };

  const handleViewInBrowser = (story: QuranStoryDefinition) => {
    window.open(resolveStoryPdf(story.slug, safeLocale), "_blank");
  };

  if (!mounted) {
    return (
      <section id="quran-stories" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-islamic-gold" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {t("quran_stories.title")}
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t("quran_stories.description")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quran-stories" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text leading-tight py-2">
              {t("quran_stories.title")}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("quran_stories.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {QURAN_STORIES.map((story, index) => {
            const title = t(storyTitleKey(story.slug));
            const description = t(storyDescriptionKey(story.slug));
            const pdfUrl = resolveStoryPdf(story.slug, safeLocale);
            const readingTime = calculateReadingTime(story.pages);

            return (
              <div
                key={story.slug}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-islamic-gold"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <div className="absolute inset-0">
                    <PDFThumbnail
                      pdfUrl={pdfUrl}
                      className="w-full h-full"
                      width={400}
                      height={192}
                      priority={index === 0}
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleStoryClick(story)}
                        className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{t("quran_stories.preview")}</span>
                      </button>
                      <Link
                        href={localizedStoryHref(safeLocale, story.slug)}
                        className="bg-islamic-gold text-white px-4 py-2 rounded-full hover:bg-islamic-green transition-colors duration-200 flex items-center space-x-2 glow"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>{t("quran_stories.read")}</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-islamic-gold fill-current" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {t("quran_stories.featured_story")}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <Heart className="w-4 h-4" />
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
                    <Link
                      href={localizedStoryHref(safeLocale, story.slug)}
                      className="hover:text-islamic-green transition-colors"
                    >
                      {title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {description}
                  </p>

                  {isStoryPdfFallback(story.slug, safeLocale) && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {t("quran_stories.pdf_language_note")}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>
                          {readingTime.replace("min", t("quran_stories.reading_time"))}
                        </span>
                      </span>
                    </div>

                    <button
                      onClick={() => handleDownload(story)}
                      className="bg-gradient-to-r from-islamic-gold to-islamic-green text-white px-6 py-3 rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 flex items-center space-x-2 text-sm font-medium glow"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t("quran_stories.download")}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isPreviewOpen && selectedStory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t(storyTitleKey(selectedStory.slug))}
                </h3>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="rounded-2xl mb-4 overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  {pdfPreviewUrl ? (
                    <PDFViewer pdfUrl={pdfPreviewUrl} className="w-full" />
                  ) : (
                    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <FileText className="w-20 h-20 mx-auto mb-4 text-islamic-gold" />
                        <p>Loading PDF preview...</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center mb-4">
                  <h4
                    className={`text-xl font-bold text-gray-800 dark:text-white mb-2 ${
                      direction === "rtl" ? "font-arabic" : ""
                    }`}
                  >
                    {t(storyTitleKey(selectedStory.slug))}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {t(storyDescriptionKey(selectedStory.slug))}
                  </p>
                  {isStoryPdfFallback(selectedStory.slug, safeLocale) && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("quran_stories.pdf_language_note")}
                    </p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleViewInBrowser(selectedStory)}
                    className="flex-1 bg-gradient-to-r from-islamic-gold to-islamic-green text-white px-6 py-3 rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 flex items-center justify-center space-x-2 font-medium glow"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>{t("quran_stories.open_in_browser")}</span>
                  </button>
                  <Link
                    href={localizedStoryHref(safeLocale, selectedStory.slug)}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>{t("quran_stories.read")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
