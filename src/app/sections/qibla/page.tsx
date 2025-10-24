"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

// Dynamically import the QiblaFinder to avoid SSR issues
const QiblaSection = dynamic(() => import("@/components/sections/QiblaFinder"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-islamic-gold"></div>
    </div>
  ),
});

export default function QiblaPage() {
  const { locale, t } = useLanguage();

  useEffect(() => {
    // Update document title and meta tags based on current language
    const title = t("qibla.title") !== "qibla.title" ? t("qibla.title") : "القبلة";
    const description = t("qibla.subtitle") !== "qibla.subtitle" ? t("qibla.subtitle") : "اتجاه القبلة";
    
    document.title = `${title} - Meshari Alabra Ongoing Charity`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Update Open Graph tags
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
        <QiblaSection />
      </div>
      <Footer />
    </main>
  );
}
