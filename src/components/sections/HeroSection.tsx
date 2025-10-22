"use client";

import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { t, direction } = useLanguage();
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [starKey, setStarKey] = useState(0);

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

  const [starPositions, setStarPositions] = useState(() => generateStarPositions());

  useEffect(() => {
    setStarPositions(generateStarPositions());
  }, [dimensions, direction, starKey]);

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
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1, 1.2, 0],
              x: direction === 'rtl' 
                ? [star.x, star.x - 100] 
                : [star.x, star.x + 100],
              y: [star.y, star.y + Math.random() * 30 - 15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          >
            <Star className="w-2 h-2 text-islamic-gold" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 mt-6">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-2"
        >
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-islamic-gold via-islamic-green to-islamic-blue mb-6">
            <Heart className="w-16 h-16 text-white m-2" fill="currentColor" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text pt-4">
            {t("hero.title")}
          </h1>

          <p className="text-2xl md:text-3xl text-islamic-gold font-semibold mb-6">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* Memorial Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-light-secondary/80 dark:bg-dark-secondary/80 backdrop-blur-lg rounded-2xl p-8 border-2 border-islamic-gold/30 glow"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t("memorial.name")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {t("memorial.death")}
          </p>
          <p className="text-xl text-islamic-green dark:text-islamic-gold leading-relaxed">
            {t("hero.description")}
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-3xl font-arabic leading-relaxed text-islamic-blue dark:text-islamic-gold"
        >
          <p className="italic">"{t("site.subtitle")}"</p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="pt-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-islamic-gold rounded-full mx-auto flex justify-center"
          >
            <div className="w-1 h-3 bg-islamic-gold rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
