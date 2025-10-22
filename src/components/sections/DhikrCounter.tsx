"use client";

import { useState } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { RotateCcw, Hand } from "lucide-react";

export default function DhikrCounter() {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState("subhanallah");

  const dhikrs = [
    { id: "subhanallah", text: "سُبْحَانَ اللَّهِ", translation: t("dhikr.subhanallah") },
    { id: "alhamdulillah", text: "الْحَمْدُ لِلَّهِ", translation: t("dhikr.alhamdulillah") },
    { id: "allahuakbar", text: "اللَّهُ أَكْبَرُ", translation: t("dhikr.allahuakbar") },
  ];

  const currentDhikr = dhikrs.find((d) => d.id === selectedDhikr) || dhikrs[0];

  const increment = () => {
    setCount((prev) => prev + 1);
    // Haptic feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <section id="dhikr" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Hand className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t("dhikr.title")}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("dhikr.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-light dark:bg-dark rounded-2xl p-8 md:p-12 border-2 border-islamic-gold/30 glow"
        >
          {/* Dhikr Selector */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {dhikrs.map((dhikr) => (
              <button
                key={dhikr.id}
                onClick={() => {
                  setSelectedDhikr(dhikr.id);
                  setCount(0);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedDhikr === dhikr.id
                    ? "bg-islamic-gold text-white shadow-lg scale-105"
                    : "bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold/20"
                }`}
              >
                {dhikr.text}
              </button>
            ))}
          </div>

          {/* Counter Display */}
          <motion.div
            key={count}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-block p-8 bg-gradient-to-r from-islamic-gold/20 via-islamic-green/20 to-islamic-blue/20 rounded-full mb-4">
              <p className="text-7xl md:text-9xl font-bold gradient-text">
                {count}
              </p>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t("dhikr.count")}
            </p>
          </motion.div>

          {/* Dhikr Text */}
          <div className="text-center mb-8">
            <p className="text-5xl md:text-6xl font-arabic mb-4 text-islamic-green dark:text-islamic-gold">
              {currentDhikr.text}
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {currentDhikr.translation}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={increment}
              className="flex-1 max-w-xs px-8 py-6 bg-islamic-gold text-white font-bold text-xl rounded-2xl hover:bg-islamic-green transition-all duration-300 shadow-lg"
            >
              تسبيح
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="px-6 py-6 bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 hover:border-islamic-gold rounded-2xl transition-all duration-300"
              aria-label={t("dhikr.reset")}
            >
              <RotateCcw className="w-6 h-6 text-islamic-gold" />
            </motion.button>
          </div>

          {/* Progress Milestones */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[33, 99, 100].map((milestone) => (
              <div
                key={milestone}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  count >= milestone
                    ? "bg-islamic-gold/20 border-islamic-gold"
                    : "bg-light-secondary/50 dark:bg-dark-secondary/50 border-transparent"
                }`}
              >
                <p className="text-2xl font-bold">{milestone}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {count >= milestone ? "✓" : ""}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
