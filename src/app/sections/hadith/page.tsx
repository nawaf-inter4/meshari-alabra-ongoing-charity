import { Metadata } from 'next';
import { headers } from 'next/headers';
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import HadithSectionWrapper from "@/components/sections/HadithSectionWrapper";
import { generateSectionMetadata } from "@/lib/section-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'ar';
  return generateSectionMetadata('hadith', locale);
}

export default function HadithPage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <SectionSchema sectionId="hadith" />
      <ClientHeader />
      <div className="pt-20">
        <HadithSectionWrapper />
      </div>
      <Footer />
    </main>
  );
}
