"use client";

import { useLanguage } from "../LanguageProvider";
import { PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function MeshariFavoriteReciter() {
  const { locale, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reciterData = {
    youtubeUrl: "https://youtube.com/playlist?list=PL5YnzBdhLdkXy12BLR-2mjj9qrPg4QL-N&si=G8WskIhXXLYNQr-N",
    youtubeEmbedUrl: "https://www.youtube.com/embed/videoseries?list=PL5YnzBdhLdkXy12BLR-2mjj9qrPg4QL-N&autoplay=0&modestbranding=1&rel=0"
  };

  if (!mounted) {
    return (
      <section id="meshari-favorite-reciter" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="shimmer w-96 h-12 mx-auto mb-4 rounded-lg"></div>
            <div className="shimmer w-80 h-6 mx-auto rounded-lg"></div>
          </div>
          <div className="shimmer w-full h-96 rounded-2xl"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="meshari-favorite-reciter" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <PlayCircle className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text leading-tight py-2">
              {t("meshari_favorite_reciter.title")}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t("meshari_favorite_reciter.subtitle")}
          </p>
        </div>

        {/* Bismillah */}
        <div className="text-center mb-8">
          <p className="text-lg text-islamic-green dark:text-islamic-gold">
            ﷽
          </p>
        </div>

        {/* YouTube Video */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl glow" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={reciterData.youtubeEmbedUrl}
            title="Meshari's Favorite Quran Reciter"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}