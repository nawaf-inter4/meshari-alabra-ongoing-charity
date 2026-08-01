import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import StorySchema from "@/components/StorySchema";
import SectionSkeleton from "@/components/SectionSkeleton";
import {
  STORY_SLUGS,
  getStoryBody,
  getStoryBySlug,
  getStoryDescription,
  getStoryPdfPath,
  getStoryTitle,
  isStoryPdfFallback,
  isStorySlug,
  localizedStoriesIndexHref,
} from "@/content/stories";
import { generateStoryMetadata } from "@/lib/story-metadata";
import { translateWithConfig } from "@/lib/translations";
import {
  RTL_LOCALES,
  SUPPORTED_LOCALES,
  isSupportedLocale,
  type SupportedLocale,
} from "@/config/site";

export const instant = true;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((lang) =>
    STORY_SLUGS.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isSupportedLocale(lang) || !isStorySlug(slug)) notFound();
  return generateStoryMetadata(slug, lang);
}

interface StoryPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

async function StoryContent({ params }: StoryPageProps) {
  const { lang, slug } = await params;
  if (!isSupportedLocale(lang) || !isStorySlug(slug)) notFound();

  const locale: SupportedLocale = lang;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const title = getStoryTitle(story, locale);
  const description = getStoryDescription(story, locale);
  const body = getStoryBody(story, locale);
  const pdfPath = getStoryPdfPath(story, locale);
  const isRtl = RTL_LOCALES.has(locale);
  const showPdfNote = isStoryPdfFallback(story.slug, locale);

  return (
    <>
      <StorySchema story={story} locale={locale} />
      <article className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link
            href={localizedStoriesIndexHref(locale)}
            className="inline-flex text-sm text-islamic-green hover:text-islamic-gold transition-colors mb-6"
          >
            ← {translateWithConfig(locale, "quran_stories.title")}
          </Link>

          <header className="mb-8">
            <h1
              className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              {title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
            {story.surahName && (
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {locale === "ar" ? story.surahName.ar : story.surahName.en}
                {story.surahNumber ? ` · ${story.surahNumber}` : ""}
              </p>
            )}
          </header>

          <div
            className={`prose prose-lg dark:prose-invert max-w-none space-y-5 mb-10 ${
              isRtl ? "font-arabic text-right" : ""
            }`}
            dir={isRtl ? "rtl" : "ltr"}
          >
            {body.map((paragraph, index) => (
              <p
                key={`${story.slug}-${locale}-${index}`}
                className="text-gray-800 dark:text-gray-200 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 p-6">
            <a
              href={pdfPath}
              download
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-islamic-gold to-islamic-green text-white px-6 py-3 font-medium hover:from-islamic-green hover:to-islamic-blue transition-colors duration-300"
            >
              {translateWithConfig(locale, "quran_stories.download")}
            </a>
            {showPdfNote && (
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {translateWithConfig(locale, "quran_stories.pdf_language_note")}
              </p>
            )}
          </div>
        </div>
      </article>
    </>
  );
}

export default function StoryPage({ params }: StoryPageProps) {
  return (
    <main id="main-content" className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <ClientHeader />
      <Suspense fallback={<SectionSkeleton label="Loading story" className="min-h-[50vh]" />}>
        <StoryContent params={params} />
      </Suspense>
      <Footer />
    </main>
  );
}
