"use client";

import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";

export default function HeroSection() {
  const { t, direction } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Star className="w-2 h-2 text-islamic-gold" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-islamic-gold via-islamic-green to-islamic-blue mb-6">
            <Heart className="w-16 h-16 text-white m-2" fill="currentColor" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
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
