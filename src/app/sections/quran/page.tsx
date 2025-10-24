"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

const EnhancedQuranSection = dynamic(() => import("@/components/sections/EnhancedQuranSection"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-islamic-gold"></div>
    </div>
  ),
});

export default function QuranPage() {
  const { locale, t } = useLanguage();

  useEffect(() => {
    const title = t("quran.title") !== "quran.title" ? t("quran.title") : "القرآن الكريم";
    const description = t("quran.subtitle") !== "quran.subtitle" ? t("quran.subtitle") : "اقرأ وتدبر آيات الله العظيم";
    
    document.title = `${title} - Meshari Alabra Ongoing Charity`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${title} - Meshari Alabra Ongoing Charity`);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
  }, [locale, t]);

  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <ClientHeader />
      <div className="pt-20">
        <EnhancedQuranSection />
      </div>
      <Footer />
    </main>
  );
}
