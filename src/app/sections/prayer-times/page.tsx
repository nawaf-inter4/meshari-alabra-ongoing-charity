import { Metadata } from 'next';
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import PrayerTimesSectionWrapper from "@/components/sections/PrayerTimesSectionWrapper";
import { generateSectionMetadata } from "@/lib/section-metadata";

// MIGRATED: Removed headers() call - use default locale for metadata
// Metadata is now static to work with Cache Components
export function generateMetadata(): Metadata {
  return generateSectionMetadata('prayer-times', 'ar');
}

export default function PrayerTimesPage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <SectionSchema sectionId="prayer-times" />
      <ClientHeader />
      <div className="pt-20">
        <PrayerTimesSectionWrapper />
      </div>
      <Footer />
    </main>
  );
}
