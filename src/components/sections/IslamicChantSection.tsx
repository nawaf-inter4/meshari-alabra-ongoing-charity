"use client";

import { useLanguage } from "../LanguageProvider";
import { PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function IslamicChantSection() {
  const { locale, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chantData = {
    youtubeUrl: "https://www.youtube.com/watch?v=1yP3UPr-L20",
    youtubeEmbedUrl: "https://www.youtube.com/embed/1yP3UPr-L20?autoplay=0&modestbranding=1&rel=0"
  };

  if (!mounted) {
    return (
      <section id="islamic-chant" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <PlayCircle className="w-8 h-8 text-islamic-gold" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {t("islamic_chant.title")}
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t("islamic_chant.subtitle")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="islamic-chant" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <PlayCircle className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text leading-tight py-2">
              {mounted && t("islamic_chant.title") !== "islamic_chant.title" ? t("islamic_chant.title") : "النشيد المفضل لمشاري رحمه الله"}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t("islamic_chant.subtitle")}
          </p>
        </div>

        {/* Embedded YouTube Video */}
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={chantData.youtubeEmbedUrl}
            title={mounted ? t("islamic_chant.title") : "النشيد المفضل لمشاري رحمه الله"}
            className="w-full h-full"
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