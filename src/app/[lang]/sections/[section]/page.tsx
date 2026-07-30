import type { ComponentType } from "react";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import QuranSectionWrapper from "@/components/sections/QuranSectionWrapper";
import TafseerSection from "@/components/sections/TafseerSection";
import DhikrCounter from "@/components/sections/DhikrCounter";
import PrayerTimesSectionWrapper from "@/components/sections/PrayerTimesSectionWrapper";
import QiblaSectionWrapper from "@/components/sections/QiblaSectionWrapper";
import DonationSection from "@/components/sections/DonationSection";
import SupplicationsSectionWrapper from "@/components/sections/SupplicationsSectionWrapper";
import HadithSectionWrapper from "@/components/sections/HadithSectionWrapper";
import YouTubeSectionWrapper from "@/components/sections/YouTubeSectionWrapper";
import {
  SECTION_IDS,
  generateSectionMetadata,
  getSectionCopy,
  isSectionId,
  type SectionId,
} from "@/lib/section-metadata";
import {
  isSupportedLocale,
  type SupportedLocale,
} from "@/config/site";

const sectionComponents: Record<SectionId, ComponentType> = {
  quran: QuranSectionWrapper,
  tafseer: TafseerSection,
  dhikr: DhikrCounter,
  "prayer-times": PrayerTimesSectionWrapper,
  qibla: QiblaSectionWrapper,
  donation: DonationSection,
  supplications: SupplicationsSectionWrapper,
  hadith: HadithSectionWrapper,
  youtube: YouTubeSectionWrapper,
};

export const instant = true;

export function generateStaticParams() {
  return SECTION_IDS.map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}) {
  const { lang, section } = await params;
  if (!isSupportedLocale(lang) || !isSectionId(section)) notFound();
  return generateSectionMetadata(section, lang);
}

function LoadingSection({ title = "Loading section" }: { title?: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status">
      <div className="text-center">
        <div className="inline-block size-12 animate-spin rounded-full border-4 border-islamic-gold border-r-transparent" />
        <span className="sr-only">{title}</span>
      </div>
    </div>
  );
}

interface SectionPageProps {
  params: Promise<{ lang: string; section: string }>;
}

async function LocalizedSectionContent({ params }: SectionPageProps) {
  const { lang, section } = await params;
  if (!isSupportedLocale(lang) || !isSectionId(section)) notFound();

  const locale: SupportedLocale = lang;
  const { title } = getSectionCopy(section, locale);
  const SectionComponent = sectionComponents[section];

  return (
    <>
      <SectionSchema sectionId={section} locale={locale} />
      <div className="pt-20">
        <h1 className="sr-only">{title}</h1>
        <Suspense fallback={<LoadingSection title={title} />}>
          <SectionComponent />
        </Suspense>
      </div>
    </>
  );
}

export default function LocalizedSectionPage({ params }: SectionPageProps) {
  return (
    <main id="main-content" className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <ClientHeader />
      <Suspense fallback={<LoadingSection />}>
        <LocalizedSectionContent params={params} />
      </Suspense>
      <Footer />
    </main>
  );
}
