"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { RotateCcw, Hand } from "lucide-react";

export default function DhikrCounter() {
  const { t } = useLanguage();
  
  // Fallback function for translations
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };
  const [count, setCount] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState("subhanallah");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mounted, setMounted] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedCount = localStorage.getItem('dhikr-count');
      const savedDhikr = localStorage.getItem('dhikr-selected');
      const savedCategory = localStorage.getItem('dhikr-category');
      
      if (savedCount) {
        setCount(parseInt(savedCount, 10));
      }
      if (savedDhikr) {
        setSelectedDhikr(savedDhikr);
      }
      if (savedCategory) {
        setSelectedCategory(savedCategory);
      }
    }
  }, []);

  // Save to localStorage whenever count, selectedDhikr, or selectedCategory changes
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('dhikr-count', count.toString());
      localStorage.setItem('dhikr-selected', selectedDhikr);
      localStorage.setItem('dhikr-category', selectedCategory);
    }
  }, [count, selectedDhikr, selectedCategory, mounted]);

  const dhikrs = [
    { id: "subhanallah", text: "سُبْحَانَ اللَّهِ", translation: getTranslation("dhikr.subhanallah", "Glory be to Allah"), category: "basic" },
    { id: "alhamdulillah", text: "الْحَمْدُ لِلَّهِ", translation: getTranslation("dhikr.alhamdulillah", "Praise be to Allah"), category: "basic" },
    { id: "allahuakbar", text: "اللَّهُ أَكْبَرُ", translation: getTranslation("dhikr.allahuakbar", "Allah is the Greatest"), category: "basic" },
    { id: "la_ilaha_illallah", text: "لَا إِلَهَ إِلَّا اللَّهُ", translation: getTranslation("dhikr.la_ilaha_illallah", "There is no god but Allah"), category: "basic" },
    { id: "astaghfirullah", text: "أَسْتَغْفِرُ اللَّه", translation: getTranslation("dhikr.astaghfirullah", "I seek forgiveness from Allah"), category: "repentance" },
    { id: "la_ilaha_illallah_wahdahu", text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", translation: getTranslation("dhikr.la_ilaha_illallah_wahdahu", "There is no god but Allah alone, He has no partner"), category: "tawhid" },
    { id: "subhanallah_walhamdulillah", text: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ", translation: getTranslation("dhikr.subhanallah_walhamdulillah", "Glory be to Allah and praise be to Allah"), category: "combined" },
    { id: "subhanallah_walhamdulillah_wallahu_akbar", text: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ", translation: getTranslation("dhikr.subhanallah_walhamdulillah_wallahu_akbar", "Glory be to Allah, praise be to Allah, there is no god but Allah, and Allah is the Greatest"), category: "combined" },
    { id: "la_hawla_wala_quwwata", text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", translation: getTranslation("dhikr.la_hawla_wala_quwwata", "There is no power and no strength except with Allah"), category: "reliance" },
    { id: "hasbunallah_wa_ni'mal_wakil", text: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", translation: getTranslation("dhikr.hasbunallah_wa_ni'mal_wakil", "Allah is sufficient for us and He is the best disposer of affairs"), category: "reliance" },
    { id: "bismillah", text: "بِسْمِ اللَّهِ", translation: getTranslation("dhikr.bismillah", "In the name of Allah"), category: "beginning" },
    { id: "inna_lillahi_wa_inna_ilaihi_rajiun", text: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ", translation: getTranslation("dhikr.inna_lillahi_wa_inna_ilaihi_rajiun", "Indeed we belong to Allah, and indeed to Him we will return"), category: "patience" },
  ];

  const categories = [
    { id: "all", name: getTranslation("dhikr.categories.all", "All") },
    { id: "basic", name: getTranslation("dhikr.categories.basic", "Basic") },
    { id: "repentance", name: getTranslation("dhikr.categories.repentance", "Repentance") },
    { id: "tawhid", name: getTranslation("dhikr.categories.tawhid", "Tawhid") },
    { id: "combined", name: getTranslation("dhikr.categories.combined", "Combined") },
    { id: "reliance", name: getTranslation("dhikr.categories.reliance", "Reliance") },
    { id: "beginning", name: getTranslation("dhikr.categories.beginning", "Beginning") },
    { id: "patience", name: getTranslation("dhikr.categories.patience", "Patience") },
  ];

  const filteredDhikrs = selectedCategory === "all" 
    ? dhikrs 
    : dhikrs.filter(dhikr => dhikr.category === selectedCategory);

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
    if (mounted && typeof window !== 'undefined') {
      localStorage.removeItem('dhikr-count');
    }
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
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">
              {t("dhikr.categories.title")}
            </h3>
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCount(0);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-islamic-gold text-white shadow-lg"
                      : "bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold/20 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dhikr Selector */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-6 text-center text-gray-700 dark:text-gray-300">
              {t("dhikr.select_dhikr")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDhikrs.map((dhikr) => (
                <button
                  key={dhikr.id}
                  onClick={() => {
                    setSelectedDhikr(dhikr.id);
                    setCount(0);
                  }}
                  className={`p-4 rounded-2xl font-semibold transition-all duration-300 text-left ${
                    selectedDhikr === dhikr.id
                      ? "bg-islamic-gold text-white shadow-lg scale-105"
                      : "bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold/20"
                  }`}
                  style={{
                    direction: 'rtl',
                    unicodeBidi: 'isolate',
                    fontFamily: "'Tajawal', 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', sans-serif",
                    fontFeatureSettings: '"liga", "clig", "calt"'
                  }}
                >
                  <div className="text-lg mb-1">{dhikr.text}</div>
                  <div className="text-sm opacity-80">{dhikr.translation}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Counter Display */}
          <motion.div
            key={count}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.2 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-8 bg-gradient-to-r from-islamic-gold/20 via-islamic-green/20 to-islamic-blue/20 rounded-full mb-6">
              <p className="text-7xl md:text-9xl font-bold gradient-text">
                {count}
              </p>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {t("dhikr.count")}
            </p>
            {mounted && (
              <p className="text-sm text-islamic-gold">
                {getTranslation("dhikr.auto_saved", "Auto-saved")} ✓
              </p>
            )}
          </motion.div>

          {/* Dhikr Text */}
          <div className="text-center mb-12">
            <p 
              className="text-5xl md:text-6xl font-arabic mb-6 text-islamic-green dark:text-islamic-gold"
              style={{
                direction: 'rtl',
                unicodeBidi: 'isolate',
                fontFamily: "'Tajawal', 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', sans-serif",
                fontFeatureSettings: '"liga", "clig", "calt"'
              }}
            >
              {currentDhikr.text}
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {currentDhikr.translation}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mb-16">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={increment}
              className="flex-1 max-w-xs px-8 py-6 bg-islamic-gold text-white font-bold text-xl rounded-full hover:bg-islamic-green transition-all duration-300 shadow-lg"
              aria-label={t("accessibility.increment_counter") || getTranslation("dhikr.tasbih", "Tasbih")}
            >
              {getTranslation("dhikr.tasbih", "Tasbih")}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="px-6 py-6 bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 hover:border-islamic-gold rounded-full transition-all duration-300"
              aria-label={t("dhikr.reset")}
            >
              <RotateCcw className="w-6 h-6 text-islamic-gold" />
            </motion.button>
          </div>

          {/* Progress Milestones */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 text-center">
            {[33, 99, 100, 200, 300, 500, 700, 1000].map((milestone) => (
              <div
                key={milestone}
                className={`aspect-square w-14 h-14 flex flex-col items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  count >= milestone
                    ? "bg-islamic-gold/20 border-islamic-gold"
                    : "bg-light-secondary/50 dark:bg-dark-secondary/50 border-transparent"
                }`}
              >
                <p className="text-sm font-bold">{milestone}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
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
