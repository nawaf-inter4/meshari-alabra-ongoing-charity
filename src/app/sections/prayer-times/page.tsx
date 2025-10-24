"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

const PrayerTimesSection = dynamic(() => import("@/components/sections/PrayerTimesSection"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-islamic-gold"></div>
    </div>
  ),
});

export default function PrayerTimesPage() {
  const { locale, t } = useLanguage();

  useEffect(() => {
    const title = t("prayer.title") !== "prayer.title" ? t("prayer.title") : "مواقيت الصلاة";
    const description = t("prayer.subtitle") !== "prayer.subtitle" ? t("prayer.subtitle") : "أوقات الصلاة اليومية";
    
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
        <PrayerTimesSection />
      </div>
      <Footer />
    </main>
  );
}
