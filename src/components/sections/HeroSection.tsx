"use client";

import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Heart, Star, FileText } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { t, direction, locale } = useLanguage();
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [starKey, setStarKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Regenerate stars when language changes
  useEffect(() => {
    setStarKey(prev => prev + 1);
  }, [direction]);

  // Generate star positions
  const generateStarPositions = () => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * (dimensions.width - 100) + 50, // Keep stars within bounds
      y: Math.random() * (dimensions.height - 100) + 50, // Keep stars within bounds
      delay: i * 0.2,
    }));
  };

  const [starPositions, setStarPositions] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    setMounted(true);
    setStarPositions(generateStarPositions());
  }, []);

  useEffect(() => {
    if (mounted) {
      setStarPositions(generateStarPositions());
    }
  }, [dimensions, direction, starKey, mounted]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 pt-28 pb-20 sm:pt-32 md:pt-28" 
      style={{ paddingTop: 'max(7rem, env(safe-area-inset-top, 7rem))' }}
      suppressHydrationWarning
    >
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starPositions.map((star) => (
          <motion.div
            key={`${starKey}-${star.id}`}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 1],
              scale: [0, 1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              delay: star.delay,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 3 + 2,
            }}
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
            }}
          >
            <Star 
              size={Math.random() * 3 + 1} 
              className="text-islamic-gold/60 fill-current" 
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Islamic Phrase - Above the card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
          suppressHydrationWarning
        >
          <p className="text-3xl md:text-4xl font-bold text-islamic-gold dark:text-islamic-gold leading-relaxed mb-2">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* Memorial Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-light-secondary/80 dark:bg-dark-secondary/80 backdrop-blur-lg rounded-2xl p-8 border-2 border-islamic-gold/30 glow"
          suppressHydrationWarning
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t("memorial.name")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {t("memorial.death")}
          </p>
          <p className="text-xl text-islamic-green dark:text-islamic-gold leading-relaxed mb-6">
            {t("hero.description")}
          </p>

          {/* Supplications Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <a
              href="/mehsari (دعاء).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-semibold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FileText className="w-5 h-5" />
              <span>{t("hero.supplications_button")}</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Site Subtitle - Below the card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <p className="text-2xl md:text-3xl font-bold text-islamic-gold !text-islamic-gold dark:text-islamic-gold leading-relaxed">
            {t("site.subtitle")}
          </p>
        </motion.div>

        {/* Scroll Down Icon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <div className="w-4 h-6 border border-islamic-gold dark:border-islamic-gold rounded-full flex items-center justify-center animate-bounce">
            <div className="w-0.5 h-3 bg-islamic-gold dark:bg-islamic-gold"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}