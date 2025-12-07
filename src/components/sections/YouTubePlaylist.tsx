"use client";

import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";

interface YouTubePlaylistProps {
  playlistId: string;
}

export default function YouTubePlaylist({ playlistId }: YouTubePlaylistProps) {
  const { t } = useLanguage();
  const [shouldLoad, setShouldLoad] = useState(false);
  
  // Lazy load YouTube iframe only when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before viewport
    );
    
    const container = document.getElementById('youtube-container');
    if (container) {
      observer.observe(container);
    }
    
    return () => observer.disconnect();
  }, []);

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
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t("youtube.title")}
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
          {shouldLoad ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1&playsinline=1`}
              title="Quran Playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              suppressHydrationWarning
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-islamic-gold mx-auto mb-4" />
                <p className="text-lg text-gray-600 dark:text-gray-400">{t("youtube.loading") || "Loading playlist..."}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
