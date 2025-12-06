import { Metadata } from 'next';
import { headers } from 'next/headers';
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SectionSchema from "@/components/SectionSchema";
import QiblaSectionWrapper from "@/components/sections/QiblaSectionWrapper";
import { generateSectionMetadata } from "@/lib/section-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'ar';
  return generateSectionMetadata('qibla', locale);
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
