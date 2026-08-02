"use client";

import { useLanguage } from "../LanguageProvider";
import { PlayCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import NativeYouTubeIframe from "@/components/NativeYouTubeIframe";

export default function MeshariFavoriteReciter() {
  const { t } = useLanguage();

  const { favoriteReciterPlaylistId, favoriteReciterStartVideoId } = siteConfig.content;
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${favoriteReciterStartVideoId}?list=${favoriteReciterPlaylistId}&autoplay=0&modestbranding=1&rel=0&playsinline=1`;


  return (
    <section id="meshari-favorite-reciter" className="py-20 px-4">
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
          <p className="text-lg text-islamic-gold">
            ﷽
          </p>
        </div>

        {/* YouTube Video */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl glow" style={{ paddingBottom: "56.25%" }}>
          <NativeYouTubeIframe
            src={youtubeEmbedUrl}
            title={`${siteConfig.content.memorialName || siteConfig.content.memorialLegalName}'s Favorite Quran Reciter`}
          />
        </div>
      </div>
    </section>
  );
}