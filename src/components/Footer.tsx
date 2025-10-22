"use client";

import { useLanguage } from "./LanguageProvider";
import { Heart, Share2 } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("site.title"),
          text: t("site.subtitle"),
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
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

        {/* Share Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-6 py-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 hover:scale-105"
          >
            <Share2 className="w-5 h-5" />
            {t("share")}
          </button>
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
          <p className="mb-2">{t("footer.charity")}</p>
          <p>{t("footer.all_rights")}</p>
          <p className="mt-4 text-xs">
            Built with ❤️ using Next.js, Tailwind CSS, and Aceternity UI
          </p>
        </div>
      </div>
    </footer>
  );
}
