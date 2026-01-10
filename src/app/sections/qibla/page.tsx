import { Metadata } from 'next';
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import QiblaSectionWrapper from "@/components/sections/QiblaSectionWrapper";
import { generateSectionMetadata } from "@/lib/section-metadata";

// MIGRATED: Removed headers() call - use default locale for metadata
// Metadata is now static to work with Cache Components
export function generateMetadata(): Metadata {
  return generateSectionMetadata('qibla', 'ar');
}

export default function QiblaPage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <SectionSchema sectionId="qibla" />
      <ClientHeader />
      <div className="pt-20">
        <QiblaSectionWrapper />
      </div>
      <Footer />
    </main>
  );
}
