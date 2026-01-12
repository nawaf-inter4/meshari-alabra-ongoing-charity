import { Metadata } from 'next';
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import YouTubeSectionWrapper from "@/components/sections/YouTubeSectionWrapper";
import { generateSectionMetadata } from "@/lib/section-metadata";

// MIGRATED: Removed headers() call - use default locale for metadata
// Metadata is now static to work with Cache Components
export function generateMetadata(): Metadata {
  return generateSectionMetadata('youtube', 'ar');
}

export default function YouTubePage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <SectionSchema sectionId="youtube" />
      <ClientHeader />
      <div className="pt-20">
        <YouTubeSectionWrapper />
      </div>
      <Footer />
    </main>
  );
}
