import { Metadata } from 'next';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import QuranSectionWrapper from "@/components/sections/QuranSectionWrapper";
import { generateSectionMetadata } from "@/lib/section-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'ar';
  return generateSectionMetadata('quran', locale);
}

function SectionLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-islamic-gold border-r-transparent"></div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading Quran section...</p>
      </div>
    </div>
  );
}

export default function QuranPage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <SectionSchema sectionId="quran" />
      <ClientHeader />
      <div className="pt-20">
        <Suspense fallback={<SectionLoading />}>
          <QuranSectionWrapper />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
