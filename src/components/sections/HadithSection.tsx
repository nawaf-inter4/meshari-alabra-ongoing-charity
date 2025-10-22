"use client";

import { useState } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { BookMarked, RefreshCw } from "lucide-react";

interface Hadith {
  arab: string;
  id: string;
  number: number;
}

export default function HadithSection() {
  const { t } = useLanguage();
  
  // Fallback function for translations
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [loading, setLoading] = useState(false);

  const hadiths = [
    {
      arab: "إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلاَّ مِنْ ثَلاَثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ",
      translation: "When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him",
      source: "Sahih Muslim 1631",
      id: "1"
    },
    {
      arab: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
      translation: "Whoever believes in Allah and the Last Day should speak good or remain silent",
      source: "Sahih al-Bukhari 6018",
      id: "2"
    },
    {
      arab: "الدِّينُ النَّصِيحَةُ، قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ",
      translation: "Religion is sincerity. We said: To whom? He said: To Allah, His Book, His Messenger, the leaders of the Muslims and their common folk",
      source: "Sahih Muslim 55",
      id: "3"
    },
    {
      arab: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا",
      translation: "The believer to another believer is like a building whose different parts enforce each other",
      source: "Sahih al-Bukhari 481",
      id: "4"
    },
    {
      arab: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
      translation: "The best among you are those who learn the Quran and teach it",
      source: "Sahih al-Bukhari 5027",
      id: "5"
    }
  ];

  const getRandomHadith = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * hadiths.length);
      setHadith({
        arab: hadiths[randomIndex].arab,
        id: hadiths[randomIndex].id,
        number: randomIndex + 1
      });
      setLoading(false);
    }, 500);
  };

  return (
    <section id="hadith" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <BookMarked className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t("hadith.title")}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("hadith.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <button
            onClick={getRandomHadith}
            className="inline-flex items-center gap-2 px-6 py-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            {getTranslation("hadith.random_button", "Random Hadith")}
          </button>
        </motion.div>

        {loading ? (
          <div className="shimmer w-full h-64 rounded-2xl" />
        ) : hadith ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-light-secondary dark:bg-dark-secondary rounded-2xl p-8 md:p-12 border-2 border-islamic-gold/30 glow"
          >
            <div className="mb-6 text-center">
              <div className="inline-block p-3 bg-islamic-gold/20 rounded-full">
                <BookMarked className="w-8 h-8 text-islamic-gold" />
              </div>
            </div>
            <p 
              className="text-2xl md:text-3xl font-arabic text-right leading-loose mb-6 text-islamic-green dark:text-islamic-gold"
              style={{
                direction: 'rtl',
                unicodeBidi: 'isolate',
                fontFamily: "'Tajawal', 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', sans-serif",
                fontFeatureSettings: '"liga", "clig", "calt"'
              }}
            >
              {hadith.arab}
            </p>
            {hadiths[hadith.number - 1] && (
              <>
                <p className="text-lg leading-relaxed mb-4">
                  {hadiths[hadith.number - 1].translation}
                </p>
                <p className="text-sm text-islamic-blue dark:text-islamic-gold font-semibold">
                  {t("hadith.source")}: {hadiths[hadith.number - 1].source}
                </p>
              </>
            )}
          </motion.div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            {getTranslation("hadith.click_button", "Click the button to get a random hadith")}
          </div>
        )}
      </div>
    </section>
  );
}
