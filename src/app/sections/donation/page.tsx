import { Metadata } from 'next';
import DonationSection from '@/components/sections/DonationSection';
import ClientHeader from '@/components/ClientHeader';
import Footer from '@/components/Footer';
import SectionSchema from '@/components/SectionSchema';
import { generateSectionMetadata } from '@/lib/section-metadata';
import { Suspense } from 'react';

// MIGRATED: Removed headers() call - use default locale for metadata
// Metadata is now static to work with Cache Components
export function generateMetadata(): Metadata {
  // Use default locale 'ar' for metadata generation
  // Language-specific content is handled client-side
  return generateSectionMetadata('donation', 'ar');
}

export default function DonationPage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <SectionSchema sectionId="donation" />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-islamic-gold"></div></div>}>
        <ClientHeader />
        <div className="pt-20">
          <DonationSection />
        </div>
        <Footer />
      </Suspense>
    </main>
  );
}
