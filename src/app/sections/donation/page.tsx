import { Metadata } from 'next';
import DonationSection from '@/components/sections/DonationSection';
import ClientHeader from '@/components/ClientHeader';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'كفالة يتيم - صدقة جارية لمشاري',
  description: 'ساهم في كفالة يتيم كصدقة جارية لمشاري، رفقة النبي ﷺ في الجنة',
  keywords: 'كفالة يتيم, صدقة جارية, تبرع, خير, مشاري, يتيم',
  openGraph: {
    title: 'كفالة يتيم - صدقة جارية لمشاري',
    description: 'ساهم في كفالة يتيم كصدقة جارية لمشاري، رفقة النبي ﷺ في الجنة',
    type: 'website',
    locale: 'ar_SA',
  },
  alternates: {
    canonical: '/sections/donation',
    languages: {
      'ar': '/sections/donation',
      'en': '/en/sections/donation',
      'tr': '/tr/sections/donation',
      'ur': '/ur/sections/donation',
      'id': '/id/sections/donation',
      'ms': '/ms/sections/donation',
      'bn': '/bn/sections/donation',
      'fr': '/fr/sections/donation',
      'zh': '/zh/sections/donation',
      'it': '/it/sections/donation',
      'ja': '/ja/sections/donation',
      'ko': '/ko/sections/donation',
    },
  },
};

export default function DonationPage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
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
