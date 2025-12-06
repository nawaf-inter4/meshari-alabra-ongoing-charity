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
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const hadiths = [
    {
      arab: "إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلاَّ مِنْ ثَلاَثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ",
      translation: "When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him",
      source: "Sahih Muslim 1631",
      id: "1",
      category: "charity"
    },
    {
      arab: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
      translation: "Whoever believes in Allah and the Last Day should speak good or remain silent",
      source: "Sahih al-Bukhari 6018",
      id: "2",
      category: "speech"
    },
    {
      arab: "الدِّينُ النَّصِيحَةُ، قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ",
      translation: "Religion is sincerity. We said: To whom? He said: To Allah, His Book, His Messenger, the leaders of the Muslims and their common folk",
      source: "Sahih Muslim 55",
      id: "3",
      category: "religion"
    },
    {
      arab: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا",
      translation: "The believer to another believer is like a building whose different parts enforce each other",
      source: "Sahih al-Bukhari 481",
      id: "4",
      category: "brotherhood"
    },
    {
      arab: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
      translation: "The best among you are those who learn the Quran and teach it",
      source: "Sahih al-Bukhari 5027",
      id: "5",
      category: "knowledge"
    },
    {
      arab: "مَنْ لَمْ يَرْحَمِ النَّاسَ لَمْ يَرْحَمْهُ اللَّهُ",
      translation: "Whoever does not show mercy to people, Allah will not show mercy to him",
      source: "Sahih al-Bukhari 6013",
      id: "6",
      category: "mercy"
    },
    {
      arab: "الْإِيمَانُ بِضْعٌ وَسِتُّونَ شُعْبَةً، وَالْحَيَاءُ شُعْبَةٌ مِنَ الْإِيمَانِ",
      translation: "Faith has over sixty branches, and modesty is a branch of faith",
      source: "Sahih Muslim 35",
      id: "7",
      category: "faith"
    },
    {
      arab: "مَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ",
      translation: "Whoever helps his brother in his need, Allah will help him in his need",
      source: "Sahih al-Bukhari 2442",
      id: "8",
      category: "help"
    },
    {
      arab: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      translation: "None of you truly believes until he loves for his brother what he loves for himself",
      source: "Sahih al-Bukhari 13",
      id: "9",
      category: "love"
    },
    {
      arab: "مَنْ صَمَتَ نَجَا",
      translation: "Whoever remains silent is saved",
      source: "Tirmidhi 2501",
      id: "10",
      category: "speech"
    },
    {
      arab: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
      translation: "A good word is charity",
      source: "Sahih al-Bukhari 2989",
      id: "11",
      category: "charity"
    },
    {
      arab: "مَنْ لَا يَرْحَمُ النَّاسَ لَا يَرْحَمُهُ اللَّهُ",
      translation: "Whoever does not show mercy to people, Allah will not show mercy to him",
      source: "Sahih Muslim 2319",
      id: "12",
      category: "mercy"
    },
    {
      arab: "إِنَّ اللَّهَ طَيِّبٌ لَا يَقْبَلُ إِلَّا طَيِّبًا",
      translation: "Allah is good and only accepts what is good",
      source: "Sahih Muslim 1015",
      id: "13",
      category: "purity"
    },
    {
      arab: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ",
      translation: "Whoever believes in Allah and the Last Day should honor his guest",
      source: "Sahih al-Bukhari 6018",
      id: "14",
      category: "hospitality"
    },
    {
      arab: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
      translation: "A Muslim is one from whose tongue and hand the Muslims are safe",
      source: "Sahih al-Bukhari 10",
      id: "15",
      category: "safety"
    }
  ];

  const categories = [
    { id: "all", name: t("hadith.categories.all") || "All" },
    { id: "charity", name: t("hadith.categories.charity") || "Charity" },
    { id: "speech", name: t("hadith.categories.speech") || "Speech" },
    { id: "religion", name: t("hadith.categories.religion") || "Religion" },
    { id: "brotherhood", name: t("hadith.categories.brotherhood") || "Brotherhood" },
    { id: "knowledge", name: t("hadith.categories.knowledge") || "Knowledge" },
    { id: "mercy", name: t("hadith.categories.mercy") || "Mercy" },
    { id: "faith", name: t("hadith.categories.faith") || "Faith" },
    { id: "help", name: t("hadith.categories.help") || "Help" },
    { id: "love", name: t("hadith.categories.love") || "Love" },
    { id: "purity", name: t("hadith.categories.purity") || "Purity" },
    { id: "hospitality", name: t("hadith.categories.hospitality") || "Hospitality" },
    { id: "safety", name: t("hadith.categories.safety") || "Safety" },
  ];

  const filteredHadiths = selectedCategory === "all" 
    ? hadiths 
    : hadiths.filter(hadith => hadith.category === selectedCategory);

  const getRandomHadith = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filteredHadiths.length);
      const selectedHadith = filteredHadiths[randomIndex];
      setHadith({
        arab: selectedHadith.arab,
        id: selectedHadith.id,
        number: hadiths.findIndex(h => h.id === selectedHadith.id) + 1
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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">
            {t("hadith.categories.title")}
          </h3>
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
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
          <div className="text-center">
            <button
              onClick={getRandomHadith}
              className="inline-flex items-center gap-2 px-6 py-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              {t("hadith.random_button")}
            </button>
          </div>
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
            {t("hadith.click_button")}
          </div>
        )}
      </div>
    </section>
  );
}
