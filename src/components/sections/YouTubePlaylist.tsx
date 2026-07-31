"use client";

import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="text-center mb-12 motion-safe"
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Play className="w-8 h-8 text-islamic-gold" fill="currentColor" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text leading-tight py-1">
              <SectionTitleLink section="youtube">{t("youtube.title")}</SectionTitleLink>
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-loose py-4 px-6">
            {t("youtube.description")}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="text-center mb-8 text-lg text-islamic-green dark:text-islamic-gold motion-safe"
          style={{
            willChange: 'opacity',
            transform: 'translateZ(0)',
          }}
        >
          ﷽
        </motion.p>

        <motion.div
          id="youtube-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.6, 
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative rounded-2xl overflow-hidden shadow-2xl glow motion-safe"
          style={{ 
            paddingBottom: "56.25%",
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <NativeYouTubeIframe
            src={`https://www.youtube.com/embed/${quranPlaylistStartVideoId}?list=${quranPlaylistId}&rel=0&modestbranding=1&playsinline=1`}
            title="Quran Playlist"
          />
        </motion.div>
      </div>
    </section>
  );
}
