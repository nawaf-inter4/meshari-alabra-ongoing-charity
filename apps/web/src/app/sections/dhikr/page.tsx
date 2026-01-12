import { Metadata } from 'next';
import DhikrCounter from '@/components/sections/DhikrCounter';
import ClientHeader from '@/components/ClientHeader';
import Footer from '@/components/Footer';
import SectionSchema from '@/components/SectionSchema';
import { generateSectionMetadata } from '@/lib/section-metadata';

// MIGRATED: Removed headers() call - use default locale for metadata
// Metadata is now static to work with Cache Components
export function generateMetadata(): Metadata {
  return generateSectionMetadata('dhikr', 'ar');
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
