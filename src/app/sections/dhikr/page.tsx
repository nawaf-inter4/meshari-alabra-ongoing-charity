import { Metadata } from 'next';
import { headers } from 'next/headers';
import DhikrCounter from '@/components/sections/DhikrCounter';
import ClientHeader from '@/components/ClientHeader';
import Footer from '@/components/Footer';
import SectionSchema from '@/components/SectionSchema';
import { generateSectionMetadata } from '@/lib/section-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'ar';
  return generateSectionMetadata('dhikr', locale);
}

export default function DhikrPage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <SectionSchema sectionId="dhikr" />
      <ClientHeader />
      <div className="pt-20">
        <DhikrCounter />
      </div>
      <Footer />
    </main>
  );
}
