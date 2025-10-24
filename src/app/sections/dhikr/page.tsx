import { Metadata } from 'next';
import DhikrCounter from '@/components/sections/DhikrCounter';
import ClientHeader from '@/components/ClientHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'أذكار وأدعية - صدقة جارية لمشاري',
  description: 'أذكار يومية وأدعية للميت، ذكر الله كصدقة جارية لمشاري',
  keywords: 'أذكار, أدعية, ذكر الله, تسبيح, تهليل, تكبير, مشاري',
  openGraph: {
    title: 'أذكار وأدعية - صدقة جارية لمشاري',
    description: 'أذكار يومية وأدعية للميت، ذكر الله كصدقة جارية لمشاري',
    type: 'website',
    locale: 'ar_SA',
  },
  alternates: {
    canonical: '/sections/dhikr',
    languages: {
      'ar': '/sections/dhikr',
      'en': '/en/sections/dhikr',
      'tr': '/tr/sections/dhikr',
      'ur': '/ur/sections/dhikr',
      'id': '/id/sections/dhikr',
      'ms': '/ms/sections/dhikr',
      'bn': '/bn/sections/dhikr',
      'fr': '/fr/sections/dhikr',
      'zh': '/zh/sections/dhikr',
      'it': '/it/sections/dhikr',
      'ja': '/ja/sections/dhikr',
      'ko': '/ko/sections/dhikr',
    },
  },
};

export default function DhikrPage() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <ClientHeader />
      <div className="pt-20">
        <DhikrCounter />
      </div>
      <Footer />
    </main>
  );
}
