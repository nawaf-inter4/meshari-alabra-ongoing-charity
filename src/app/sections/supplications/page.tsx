import { Metadata } from 'next';
import { headers } from 'next/headers';
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import SupplicationsSectionWrapper from "@/components/sections/SupplicationsSectionWrapper";
import { generateSectionMetadata } from "@/lib/section-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'ar';
  return generateSectionMetadata('supplications', locale);
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
