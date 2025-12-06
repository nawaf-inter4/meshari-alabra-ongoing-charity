import { Metadata } from 'next';
import { headers } from 'next/headers';
import TafseerSection from '@/components/sections/TafseerSection';
import ClientHeader from '@/components/ClientHeader';
import Footer from '@/components/Footer';
import SectionSchema from '@/components/SectionSchema';
import { generateSectionMetadata } from '@/lib/section-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'ar';
  return generateSectionMetadata('tafseer', locale);
}

export default function TafseerPage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <SectionSchema sectionId="tafseer" />
      <ClientHeader />
      <div className="pt-20">
        <TafseerSection />
      </div>
      <Footer />
    </main>
  );
}
