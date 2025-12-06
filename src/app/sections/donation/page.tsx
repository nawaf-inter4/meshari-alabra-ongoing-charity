import { Metadata } from 'next';
import { headers } from 'next/headers';
import DonationSection from '@/components/sections/DonationSection';
import ClientHeader from '@/components/ClientHeader';
import Footer from '@/components/Footer';
import SectionSchema from '@/components/SectionSchema';
import { generateSectionMetadata } from '@/lib/section-metadata';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'ar';
  return generateSectionMetadata('donation', locale);
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
