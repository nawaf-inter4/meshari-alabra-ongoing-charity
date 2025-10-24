import { Metadata } from 'next';
import { LanguageProvider } from "@/components/LanguageProvider";
import TafseerSection from '@/components/sections/TafseerSection';
import ClientHeader from '@/components/ClientHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'تفسير القرآن - صدقة جارية لمشاري',
  description: 'فهم معاني كلام الله العظيم، تفسير القرآن الكريم كصدقة جارية لمشاري',
  keywords: 'تفسير القرآن, تفسير, ابن كثير, الطبري, الميسر, مشاري',
  openGraph: {
    title: 'تفسير القرآن - صدقة جارية لمشاري',
    description: 'فهم معاني كلام الله العظيم، تفسير القرآن الكريم كصدقة جارية لمشاري',
    type: 'website',
    locale: 'ar_SA',
  },
  alternates: {
    canonical: '/sections/tafseer',
    languages: {
      'ar': '/sections/tafseer',
      'en': '/en/sections/tafseer',
      'tr': '/tr/sections/tafseer',
      'ur': '/ur/sections/tafseer',
      'id': '/id/sections/tafseer',
      'ms': '/ms/sections/tafseer',
      'bn': '/bn/sections/tafseer',
      'fr': '/fr/sections/tafseer',
      'zh': '/zh/sections/tafseer',
      'it': '/it/sections/tafseer',
      'ja': '/ja/sections/tafseer',
      'ko': '/ko/sections/tafseer',
    },
  },
};

export default function TafseerPage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <ClientHeader />
      <div className="pt-20">
        <TafseerSection />
      </div>
      <Footer />
          </main>
    </LanguageProvider>
  );
}
