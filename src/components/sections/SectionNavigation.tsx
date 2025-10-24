"use client";

import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { BookOpen, Book, Heart, Clock, DollarSign, Compass, Users, Calendar, Star, Globe, Shield, Gift, Grid3X3 } from "lucide-react";
import Link from "next/link";

export default function SectionNavigation() {
  const { t, locale } = useLanguage();

  const sections = [
    {
      id: "quran",
      title: t("quran.title"),
      description: t("quran.subtitle"),
      icon: BookOpen,
      href: "/sections/quran",
      color: "from-islamic-blue to-islamic-green"
    },
    {
      id: "tafseer",
      title: t("tafseer.title"),
      description: t("tafseer.subtitle"),
      icon: Book,
      href: "/sections/tafseer",
      color: "from-islamic-green to-islamic-gold"
    },
    {
      id: "dhikr",
      title: t("dhikr.title"),
      description: t("dhikr.subtitle"),
      icon: Heart,
      href: "/sections/dhikr",
      color: "from-islamic-gold to-yellow-500"
    },
    {
      id: "prayer-times",
      title: t("prayer.title"),
      description: t("prayer.subtitle"),
      icon: Clock,
      href: "/sections/prayer-times",
      color: "from-purple-500 to-islamic-blue"
    },
    {
      id: "qibla",
      title: t("qibla.title"),
      description: t("qibla.subtitle"),
      icon: Compass,
      href: "/sections/qibla",
      color: "from-islamic-green to-teal-500"
    },
    {
      id: "donation",
      title: t("donation.title"),
      description: t("donation.subtitle"),
      icon: DollarSign,
      href: "/sections/donation",
      color: "from-red-500 to-pink-500"
    },
    {
      id: "supplications",
      title: t("supplications.title"),
      description: t("supplications.subtitle"),
      icon: Star,
      href: "/sections/supplications",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: "hadith",
      title: t("hadith.title"),
      description: t("hadith.subtitle"),
      icon: Shield,
      href: "/sections/hadith",
      color: "from-islamic-blue to-blue-600"
    },
    {
      id: "youtube",
      title: t("youtube.title"),
      description: t("youtube.description"),
      icon: Globe,
      href: "/sections/youtube",
      color: "from-red-600 to-red-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Grid3X3 className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text leading-tight py-2">
              {t("navigation.sections_title")}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t("navigation.sections_description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={section.href}>
                <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-islamic-gold h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-islamic-gold transition-colors duration-300">
                    {section.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                    {section.description}
                  </p>
                  
                  <div className={`flex items-center text-islamic-gold font-semibold group-hover:${locale === 'ar' ? '-translate-x-2' : 'translate-x-2'} transition-transform duration-300 mt-auto`}>
                    {locale === 'ar' ? (
                      <>
                        <span>{t("navigation.visit_section") !== "navigation.visit_section" ? t("navigation.visit_section") : "زيارة القسم"}</span>
                        <svg 
                          className="w-4 h-4 mr-2 transform rotate-180" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>{t("navigation.visit_section") !== "navigation.visit_section" ? t("navigation.visit_section") : "Visit Section"}</span>
                        <svg 
                          className="w-4 h-4 ml-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
