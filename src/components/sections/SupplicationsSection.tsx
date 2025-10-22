"use client";

import { useState } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { BookOpen, Sunrise, Sunset, Heart } from "lucide-react";

interface Supplication {
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}

export default function SupplicationsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("deceased");

  const supplications = {
    deceased: [
      {
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ",
        transliteration: "Allāhumma-ghfir lahu warhamhu wa ʿāfihi waʿfu ʿanhu, wa akrim nuzulahu, wa wassiʿ mudkhalahu, waghsilhu bil-māʾi wath-thalji wal-barad, wa naqqihi minal-khaṭāyā kamā naqqayta-th-thawb al-abyaḍ min ad-danas",
        translation: "O Allah, forgive him and have mercy upon him and give him strength and pardon him. Be generous to him and cause his entrance to be wide and wash him with water and snow and hail. Cleanse him of his transgressions as white cloth is cleansed of stains",
        reference: "Sahih Muslim 963"
      },
      {
        arabic: "اللَّهُمَّ اجْعَلْ قَبْرَهُ رَوْضَةً مِنْ رِيَاضِ الْجَنَّةِ، وَلَا تَجْعَلْهُ حُفْرَةً مِنْ حُفَرِ النَّارِ",
        transliteration: "Allāhumma-jʿal qabrahu rawḍatan min riyāḍ al-jannah, wa lā tajʿalhu ḥufratan min ḥufar an-nār",
        translation: "O Allah, make his grave a garden from the gardens of Paradise, and do not make it a pit from the pits of Hell",
        reference: "At-Tirmidhi"
      },
      {
        arabic: "اللَّهُمَّ أَبْدِلْهُ دَاراً خَيْراً مِنْ دَارِهِ، وَأَهْلاً خَيْراً مِنْ أَهْلِهِ، وَأَدْخِلْهُ الْجَنَّةَ وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ النَّارِ",
        transliteration: "Allāhumma abdilhu dāran khayran min dārihi, wa ahlan khayran min ahlihi, wa adkhilhu-l-jannah wa aʿidhhu min ʿadhāb al-qabr wa min ʿadhāb an-nār",
        translation: "O Allah, give him a home better than his home, and a family better than his family, and admit him into Paradise and protect him from the punishment of the grave and the punishment of Hell",
        reference: "Sahih Muslim 963"
      }
    ],
    morning: [
      {
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Aṣbaḥnā wa aṣbaḥa-l-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illā-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamdu wa huwa ʿalā kulli shay'in qadīr",
        translation: "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah. There is no deity except Allah, alone, without a partner. To Him belongs the dominion and to Him belongs all praise, and He has power over everything",
        reference: "Abu Dawud 5071"
      }
    ],
    evening: [
      {
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Amsaynā wa amsā-l-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illā-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamdu wa huwa ʿalā kulli shay'in qadīr",
        translation: "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah. There is no deity except Allah, alone, without a partner. To Him belongs the dominion and to Him belongs all praise, and He has power over everything",
        reference: "Abu Dawud 5071"
      }
    ]
  };

  const tabs = [
    { id: "deceased", label: t("supplications.deceased"), icon: Heart },
    { id: "morning", label: t("supplications.morning"), icon: Sunrise },
    { id: "evening", label: t("supplications.evening"), icon: Sunset },
  ];

  return (
    <section id="supplications" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
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
              {t("supplications.title")}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("supplications.subtitle")}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-islamic-gold text-white shadow-lg scale-105"
                  : "bg-light dark:bg-dark hover:bg-islamic-gold/20"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Supplications */}
        <div className="space-y-6">
          {supplications[activeTab as keyof typeof supplications].map((dua, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-light dark:bg-dark rounded-2xl p-6 md:p-8 border-2 border-islamic-gold/30 hover:border-islamic-gold transition-all duration-300"
            >
              <p className="text-2xl md:text-3xl font-arabic text-right leading-loose mb-4 text-islamic-green dark:text-islamic-gold">
                {dua.arabic}
              </p>
              <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-3">
                {dua.transliteration}
              </p>
              <p className="text-base leading-relaxed mb-3">
                {dua.translation}
              </p>
              <p className="text-sm text-islamic-blue dark:text-islamic-gold font-semibold">
                {dua.reference}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
