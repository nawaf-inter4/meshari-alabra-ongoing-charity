import { Metadata } from 'next';
import { headers } from 'next/headers';
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

export default function QuranPage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <SectionSchema sectionId="quran" />
      <ClientHeader />
      <div className="pt-20">
        <QuranSectionWrapper />
      </div>
      <Footer />
    </main>
  );
}
