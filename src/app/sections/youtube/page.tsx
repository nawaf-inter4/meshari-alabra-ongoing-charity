import { Metadata } from 'next';
import { headers } from 'next/headers';
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import YouTubeSectionWrapper from "@/components/sections/YouTubeSectionWrapper";
import { generateSectionMetadata } from "@/lib/section-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'ar';
  return generateSectionMetadata('youtube', locale);
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
