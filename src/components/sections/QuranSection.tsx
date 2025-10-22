"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
}

export default function QuranSection() {
  const { t } = useLanguage();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      fetchAyahs(selectedSurah);
    }
  }, [selectedSurah]);

  const fetchSurahs = async () => {
    try {
      const response = await fetch("https://api.alquran.cloud/v1/surah");
      const data = await response.json();
      if (data.code === 200) {
        setSurahs(data.data);
      }
    } catch (error) {
      console.error("Error fetching surahs:", error);
    }
  };

  const fetchAyahs = async (surahNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}`
      );
      const data = await response.json();
      if (data.code === 200) {
        setAyahs(data.data.ayahs);
      }
    } catch (error) {
      console.error("Error fetching ayahs:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentSurah = surahs.find((s) => s.number === selectedSurah);

  return (
    <section id="quran" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t("quran.title")}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("quran.subtitle")}
          </p>
        </motion.div>

        {/* Surah Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <label className="block text-lg font-semibold mb-3">
            {t("quran.select_surah")}
          </label>
          <div className="relative">
            <select
              value={selectedSurah}
              onChange={(e) => setSelectedSurah(Number(e.target.value))}
              className="w-full p-4 rounded-xl bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none appearance-none cursor-pointer text-lg"
            >
              {surahs.map((surah) => (
                <option key={surah.number} value={surah.number}>
                  {surah.number}. {surah.name} - {surah.englishName} ({surah.numberOfAyahs} {t("quran.verse")}s)
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
          </div>
        </motion.div>

        {/* Surah Header */}
        {currentSurah && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-8 p-8 bg-gradient-to-r from-islamic-gold/20 via-islamic-green/20 to-islamic-blue/20 rounded-2xl border-2 border-islamic-gold/30"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-islamic-gold mb-2">
              {currentSurah.name}
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {currentSurah.englishName} - {currentSurah.revelationType}
            </p>
            <div className="text-5xl my-6">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          </motion.div>
        )}

        {/* Ayahs */}
        {loading ? (
          <div className="text-center py-12">
            <div className="shimmer w-full h-96 rounded-2xl" />
          </div>
        ) : (
          <div className="space-y-6 max-h-[600px] overflow-y-auto p-4 bg-light-secondary/50 dark:bg-dark-secondary/50 rounded-2xl">
            {ayahs.map((ayah, index) => (
              <motion.div
                key={ayah.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-light dark:bg-dark rounded-xl p-6 border-2 border-transparent hover:border-islamic-gold transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-islamic-gold flex items-center justify-center text-white font-bold">
                    {ayah.numberInSurah}
                  </div>
                  <p className="flex-1 text-2xl md:text-3xl font-arabic text-right leading-loose text-islamic-green dark:text-islamic-gold">
                    {ayah.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
