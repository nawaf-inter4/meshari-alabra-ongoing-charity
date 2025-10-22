"use client";

import { useLanguage } from "./LanguageProvider";
import { Heart, Share2 } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  
  // Get current year
  const currentYear = new Date().getFullYear().toString();
  
  // Fallback function for translations
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("site.title"),
          text: t("site.subtitle"),
          url: window.location.href,
        });
      } catch (error) {
        // Error sharing - fallback to copy
      }
    }
  };

  return (
    <footer className="py-12 px-4 bg-light-secondary dark:bg-dark-secondary border-t-2 border-islamic-gold/30">
      <div className="max-w-6xl mx-auto">
        {/* Memorial */}
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-islamic-gold mx-auto mb-4" fill="currentColor" />
          <h3 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
            {t("memorial.name")}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {t("memorial.death")}
          </p>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto text-islamic-green dark:text-islamic-gold">
            {t("footer.description")}
          </p>
        </div>

        {/* Separator */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-islamic-gold to-transparent" />

        {/* Share Button and Social Links */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 hover:scale-105"
            >
              <Share2 className="w-5 h-5" />
              {t("share")}
            </button>
            
            <a
              href="https://x.com/alabrameshari"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-bold rounded-full hover:bg-blue-500 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              {t("social.x_account")}
            </a>
          </div>
        </div>

        {/* Quranic Verse */}
        <div className="text-center mb-8">
          <p className="text-2xl md:text-3xl font-arabic mb-3 text-islamic-green dark:text-islamic-gold leading-loose">
            إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2">{getTranslation("footer.charity", "Meshari Al-Abra Ongoing Charity")}</p>
          <p>{getTranslation("footer.all_rights", "All rights reserved © 2025").replace(/\{\{year\}\}/g, currentYear)}</p>
          <p className="mt-4 text-xs">
            {getTranslation("footer.technology", "Built with ❤️ for the sake of Allah using modern web technologies")}
          </p>
          <div className="mt-2 text-xs flex justify-center gap-4">
            <a href="/sitemap.xml" className="text-islamic-gold hover:text-islamic-green transition-colors">
              {getTranslation("footer.sitemap", "Sitemap")}
            </a>
            <a href="/llm.txt" className="text-islamic-gold hover:text-islamic-green transition-colors">
              {getTranslation("footer.llm_txt", "LLM.txt")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
