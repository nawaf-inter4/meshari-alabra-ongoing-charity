"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Hand, ChevronDown, ChevronUp } from "lucide-react";

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
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDhikrSelectorOpen, setIsDhikrSelectorOpen] = useState(false);

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
    { id: "subhanallah", text: "سُبْحَانَ اللَّهِ", translation: "Glory be to Allah", category: "basic" },
    { id: "alhamdulillah", text: "الْحَمْدُ لِلَّهِ", translation: "Praise be to Allah", category: "basic" },
    { id: "allahuakbar", text: "اللَّهُ أَكْبَرُ", translation: "Allah is the Greatest", category: "basic" },
    { id: "la_ilaha_illallah", text: "لَا إِلَهَ إِلَّا اللَّهُ", translation: "There is no god but Allah", category: "basic" },
    { id: "astaghfirullah", text: "أَسْتَغْفِرُ اللَّه", translation: "I seek forgiveness from Allah", category: "repentance" },
    { id: "la_ilaha_illallah_wahdahu", text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", translation: "There is no god but Allah alone, He has no partner", category: "tawhid" },
    { id: "subhanallah_walhamdulillah", text: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ", translation: "Glory be to Allah and praise be to Allah", category: "combined" },
    { id: "subhanallah_walhamdulillah_wallahu_akbar", text: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ", translation: "Glory be to Allah, praise be to Allah, there is no god but Allah, and Allah is the Greatest", category: "combined" },
    { id: "la_hawla_wala_quwwata", text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", translation: "There is no power and no strength except with Allah", category: "reliance" },
    { id: "hasbunallah_wa_ni'mal_wakil", text: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", translation: "Allah is sufficient for us and He is the best disposer of affairs", category: "reliance" },
    { id: "bismillah", text: "بِسْمِ اللَّهِ", translation: "In the name of Allah", category: "beginning" },
    { id: "inna_lillahi_wa_inna_ilaihi_rajiun", text: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ", translation: "Indeed we belong to Allah, and indeed to Him we will return", category: "patience" },
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
          className="bg-light dark:bg-dark rounded-2xl p-4 md:p-12 border-2 border-islamic-gold/30 glow"
        >
          {/* Category Filter - Collapsible on Both Mobile and Desktop */}
          <div className="mb-4 md:mb-6">
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="w-full flex items-center justify-between p-3 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold/20 transition-all duration-300 mb-3"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">
                {t("dhikr.categories.title")}
              </h3>
              {isCategoriesOpen ? (
                <ChevronUp className="w-5 h-5 text-islamic-gold" />
              ) : (
                <ChevronDown className="w-5 h-5 text-islamic-gold" />
              )}
            </button>
            <AnimatePresence>
              {isCategoriesOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-center gap-2 flex-wrap">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setCount(0);
                          setIsCategoriesOpen(false);
                        }}
                        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "bg-islamic-gold text-white shadow-lg glow"
                            : "bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold/20 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dhikr Selector - Collapsible on Both Mobile and Desktop */}
          <div className="mb-6 md:mb-12">
            <button
              onClick={() => setIsDhikrSelectorOpen(!isDhikrSelectorOpen)}
              className="w-full flex items-center justify-between p-3 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold/20 transition-all duration-300 mb-3"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">
                {t("dhikr.select_dhikr")}
              </h3>
              {isDhikrSelectorOpen ? (
                <ChevronUp className="w-5 h-5 text-islamic-gold" />
              ) : (
                <ChevronDown className="w-5 h-5 text-islamic-gold" />
              )}
            </button>
            <AnimatePresence>
              {isDhikrSelectorOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[60vh] overflow-y-auto overflow-x-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pr-2 md:pr-0">
                    {filteredDhikrs.length > 0 ? filteredDhikrs.map((dhikr) => (
                      <button
                        key={dhikr.id}
                        onClick={() => {
                          setSelectedDhikr(dhikr.id);
                          setCount(0);
                          setIsDhikrSelectorOpen(false);
                        }}
                        className={`p-3 md:p-4 rounded-2xl font-semibold transition-all duration-300 ${
                          selectedDhikr === dhikr.id
                            ? "bg-islamic-gold text-white shadow-lg ring-2 ring-islamic-gold/50 glow"
                            : "bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold/20"
                        }`}
                      >
                        <div 
                          className="text-base md:text-lg mb-1"
                          style={{
                            direction: 'rtl',
                            unicodeBidi: 'isolate',
                            fontFamily: "'Tajawal', 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', sans-serif",
                            fontFeatureSettings: '"liga", "clig", "calt"'
                          }}
                        >
                          {dhikr.text}
                        </div>
                        <div 
                          className="text-xs md:text-sm opacity-80"
                          style={{
                            direction: 'ltr',
                            textAlign: 'left'
                          }}
                        >
                          {dhikr.translation}
                        </div>
                      </button>
                    )) : (
                      <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-4">
                        No dhikrs found in this category
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dhikr Text - Moved up for better mobile UX */}
          <div className="text-center mb-4 md:mb-12">
            <p 
              className="text-3xl md:text-5xl lg:text-6xl font-arabic mb-3 md:mb-6 text-islamic-green dark:text-islamic-gold"
              style={{
                direction: 'rtl',
                unicodeBidi: 'isolate',
                fontFamily: "'Tajawal', 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', sans-serif",
                fontFeatureSettings: '"liga", "clig", "calt"'
              }}
            >
              {currentDhikr.text}
            </p>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400">
              {currentDhikr.translation}
            </p>
          </div>

          {/* Counter Display */}
          <motion.div
            key={count}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.2 }}
            className="text-center mb-6 md:mb-12"
          >
            <div className="inline-block p-6 md:p-8 bg-gradient-to-r from-islamic-gold/20 via-islamic-green/20 to-islamic-blue/20 rounded-full mb-4 md:mb-6">
              <p className="text-6xl md:text-7xl lg:text-9xl font-bold gradient-text">
                {count}
              </p>
            </div>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 mb-2 md:mb-4">
              {t("dhikr.count")}
            </p>
            {mounted && (
              <p className="text-xs md:text-sm text-islamic-gold">
                {getTranslation("dhikr.auto_saved", "Auto-saved")} ✓
              </p>
            )}
          </motion.div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 md:gap-4 mb-8 md:mb-16">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={increment}
              className="flex-1 max-w-xs px-6 md:px-8 py-5 md:py-6 bg-islamic-gold text-white font-bold text-lg md:text-xl rounded-full hover:bg-islamic-green transition-all duration-300 glow"
              aria-label={t("accessibility.increment_counter") || getTranslation("dhikr.tasbih", "Tasbih")}
            >
              {getTranslation("dhikr.tasbih", "Tasbih")}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="px-5 md:px-6 py-5 md:py-6 bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 hover:border-islamic-gold rounded-full transition-all duration-300"
              aria-label={t("dhikr.reset")}
            >
              <RotateCcw className="w-5 h-5 md:w-6 md:h-6 text-islamic-gold" />
            </motion.button>
          </div>

          {/* Progress Milestones */}
          <div className="flex justify-center">
            <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-3 text-center">
            {[33, 99, 100, 200, 300, 500, 700, 1000].map((milestone) => (
              <div
                key={milestone}
                className={`aspect-square w-12 h-12 md:w-14 md:h-14 flex flex-col items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  count >= milestone
                    ? "bg-islamic-gold/20 border-islamic-gold"
                    : "bg-light-secondary/50 dark:bg-dark-secondary/50 border-transparent"
                }`}
              >
                <p className="text-xs md:text-sm font-bold">{milestone}</p>
                <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
                  {count >= milestone ? "✓" : ""}
                </p>
              </div>
            ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
