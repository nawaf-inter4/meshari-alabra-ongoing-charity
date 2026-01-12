import { Metadata } from 'next';
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import SupplicationsSectionWrapper from "@/components/sections/SupplicationsSectionWrapper";
import { generateSectionMetadata } from "@/lib/section-metadata";

// MIGRATED: Removed headers() call - use default locale for metadata
// Metadata is now static to work with Cache Components
export function generateMetadata(): Metadata {
  return generateSectionMetadata('supplications', 'ar');
}

export default function SupplicationsPage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <SectionSchema sectionId="supplications" />
      <ClientHeader />
      <div className="pt-20">
        <SupplicationsSectionWrapper />
      </div>
      <Footer />
    </main>
  );
}
