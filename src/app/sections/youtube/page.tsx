"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

// Dynamically import the YouTubePlaylist to avoid SSR issues
const YouTubePlaylist = dynamic(() => import("@/components/sections/YouTubePlaylist"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-islamic-gold"></div>
    </div>
  ),
});


export default function YouTubePage() {
  const { locale, t } = useLanguage();

  useEffect(() => {
    // Update document title and meta tags based on current language
    const title = t("youtube.title") !== "youtube.title" ? t("youtube.title") : "قناة يوتيوب";
    const description = t("youtube.subtitle") !== "youtube.subtitle" ? t("youtube.subtitle") : "محتوى إسلامي";
    
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
        <YouTubePlaylist playlistId="PL5YnzBdhLdkXy12BLR-2mjj9qrPg4QL-N" />
      </div>
      <Footer />
    </main>
  );
}
