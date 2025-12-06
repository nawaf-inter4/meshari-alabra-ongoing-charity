import { Metadata } from 'next';
import { headers } from 'next/headers';
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import PrayerTimesSectionWrapper from "@/components/sections/PrayerTimesSectionWrapper";
import { generateSectionMetadata } from "@/lib/section-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'ar';
  return generateSectionMetadata('prayer-times', locale);
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
