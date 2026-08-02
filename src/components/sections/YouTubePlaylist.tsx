"use client";

import { useLanguage } from "../LanguageProvider";
import { Play } from "lucide-react";
import { siteConfig } from "@/config/site";
import NativeYouTubeIframe from "@/components/NativeYouTubeIframe";
import SectionTitleLink from "./SectionTitleLink";

export default function YouTubePlaylist() {
  const { t } = useLanguage();
  const { quranPlaylistId, quranPlaylistStartVideoId } = siteConfig.content;

  return (
    <section id="youtube" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Play className="w-8 h-8 text-islamic-gold" fill="currentColor" aria-hidden="true" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text leading-tight py-1">
              <SectionTitleLink section="youtube">{t("youtube.title")}</SectionTitleLink>
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-loose py-4 px-6">
            {t("youtube.description")}
          </p>
        </div>

        <p className="text-center mb-8 text-lg text-islamic-gold" aria-hidden="true">
          ﷽
        </p>

        <div
          id="youtube-container"
          className="relative rounded-2xl overflow-hidden shadow-2xl glow"
          style={{ paddingBottom: "56.25%" }}
        >
          <NativeYouTubeIframe
            src={`https://www.youtube.com/embed/${quranPlaylistStartVideoId}?list=${quranPlaylistId}&rel=0&modestbranding=1&playsinline=1`}
            title="Quran Playlist"
          />
        </div>
      </div>
    </section>
  );
}
