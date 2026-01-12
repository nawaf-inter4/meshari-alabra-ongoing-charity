import { Metadata } from 'next';
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import HadithSectionWrapper from "@/components/sections/HadithSectionWrapper";
import { generateSectionMetadata } from "@/lib/section-metadata";

// MIGRATED: Removed headers() call - use default locale for metadata
// Metadata is now static to work with Cache Components
export function generateMetadata(): Metadata {
  return generateSectionMetadata('hadith', 'ar');
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
