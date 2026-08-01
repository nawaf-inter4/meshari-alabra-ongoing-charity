import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSkeleton from "@/components/SectionSkeleton";
import {
  QURAN_STORIES,
  getStoryDescription,
  getStoryTitle,
  localizedStoryHref,
} from "@/content/stories";
import { generateStoriesIndexMetadata } from "@/lib/story-metadata";
import { translate } from "@/lib/translations";
import {
  RTL_LOCALES,
  SUPPORTED_LOCALES,
  isSupportedLocale,
  type SupportedLocale,
} from "@/config/site";

export const instant = true;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  return generateStoriesIndexMetadata(lang);
}

interface StoriesIndexProps {
  params: Promise<{ lang: string }>;
}

async function StoriesIndexContent({ params }: StoriesIndexProps) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const locale: SupportedLocale = lang;
  const title = translate(locale, "quran_stories.title");
  const subtitle = translate(locale, "quran_stories.description");
  const isRtl = RTL_LOCALES.has(locale);

  return (
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <h1
            className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 ${
              isRtl ? "font-arabic" : ""
            }`}
          >
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>
        </header>

        <ul className="grid gap-6 md:grid-cols-2">
          {QURAN_STORIES.map((story) => (
            <li key={story.slug}>
              <Link
                href={localizedStoryHref(locale, story.slug)}
                className="block h-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/50 p-6 hover:border-islamic-gold transition-colors"
              >
                <h2
                  className={`text-xl font-bold text-gray-900 dark:text-white mb-2 ${
                    isRtl ? "font-arabic" : ""
                  }`}
                >
                  {getStoryTitle(story, locale)}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {getStoryDescription(story, locale)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function StoriesIndexPage({ params }: StoriesIndexProps) {
  return (
    <main id="main-content" className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <ClientHeader />
      <Suspense fallback={<SectionSkeleton label="Loading stories" className="min-h-[50vh]" />}>
        <StoriesIndexContent params={params} />
      </Suspense>
      <Footer />
    </main>
  );
}
