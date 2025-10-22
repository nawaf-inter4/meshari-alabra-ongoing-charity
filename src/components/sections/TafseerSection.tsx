"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Book, Search } from "lucide-react";

interface TafseerAyah {
  ayah: number;
  text: string;
}

export default function TafseerSection() {
  const { t } = useLanguage();
  const [surahNumber, setSurahNumber] = useState(1);
  const [ayahNumber, setAyahNumber] = useState(1);
  const [tafseer, setTafseer] = useState<TafseerAyah | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTafseer = async () => {
    setLoading(true);
    try {
      // Using alternative Quran tafseer API
      const response = await fetch(
        `https://api.quran.com/api/v4/quran/tafsirs/169?verse_key=${surahNumber}:${ayahNumber}`
      );
      const data = await response.json();
      if (data.tafsirs && data.tafsirs.length > 0) {
        setTafseer({
          ayah: ayahNumber,
          text: data.tafsirs[0].text,
        });
      }
    } catch (error) {
      console.error("Error fetching tafseer:", error);
      // Fallback to basic info
      setTafseer({
        ayah: ayahNumber,
        text: "التفسير غير متوفر حالياً. يرجى المحاولة لاحقاً.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="tafseer" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Book className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t("tafseer.title")}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("tafseer.subtitle")}
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-light dark:bg-dark rounded-2xl p-6 md:p-8 border-2 border-islamic-gold/30 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                رقم السورة
              </label>
              <input
                type="number"
                min="1"
                max="114"
                value={surahNumber}
                onChange={(e) => setSurahNumber(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                رقم الآية
              </label>
              <input
                type="number"
                min="1"
                value={ayahNumber}
                onChange={(e) => setAyahNumber(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchTafseer}
                className="w-full flex items-center justify-center gap-2 p-3 bg-islamic-gold text-white font-bold rounded-xl hover:bg-islamic-green transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                {t("search")}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tafseer Result */}
        {loading ? (
          <div className="shimmer w-full h-64 rounded-2xl" />
        ) : tafseer ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-light dark:bg-dark rounded-2xl p-6 md:p-8 border-2 border-islamic-gold/30"
          >
            <div className="mb-4 p-4 bg-islamic-gold/10 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                التفسير للآية {tafseer.ayah} من السورة {surahNumber}
              </p>
            </div>
            <div
              className="text-lg leading-relaxed text-right"
              dangerouslySetInnerHTML={{ __html: tafseer.text }}
            />
          </motion.div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            اختر السورة والآية للحصول على التفسير
          </div>
        )}
      </div>
    </section>
  );
}
