"use client";

import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { BookOpen, Book, Heart, Clock, DollarSign, Compass, Users, Calendar, Star, Globe, Shield, Gift, Grid3X3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

export default function SectionNavigation() {
  const { t, locale, direction } = useLanguage();
  const router = useRouter();

  // Prefetch all section links on mount for blazing fast navigation
  useEffect(() => {
    const sections = [
      { path: "/sections/quran" },
      { path: "/sections/tafseer" },
      { path: "/sections/dhikr" },
      { path: "/sections/prayer-times" },
      { path: "/sections/qibla" },
      { path: "/sections/donation" },
      { path: "/sections/supplications" },
      { path: "/sections/hadith" },
      { path: "/sections/youtube" },
    ];

    // Prefetch all sections with language prefix
    sections.forEach((section) => {
      const href = locale === 'ar' 
        ? section.path 
        : `/${locale}${section.path}`;
      
      // Prefetch the route for instant navigation
      router.prefetch(href);
    });
  }, [locale, router]);

  // Handle section navigation with prefetching
  const handleSectionClick = useCallback((e: React.MouseEvent, href: string) => {
    // Prefetch on hover for even faster navigation
    router.prefetch(href);
  }, [router]);

  // Helper function to get section href with language prefix
  const getSectionHref = (sectionPath: string) => {
    if (locale === 'ar') {
      return sectionPath; // Arabic: /sections/quran
    } else {
      return `/${locale}${sectionPath}`; // Other languages: /en/sections/quran
    }
  };

  const sections = [
    {
      id: "quran",
      title: t("quran.title"),
      description: t("quran.subtitle"),
      icon: BookOpen,
      href: getSectionHref("/sections/quran"),
      color: "from-islamic-blue to-islamic-green"
    },
    {
      id: "tafseer",
      title: t("tafseer.title"),
      description: t("tafseer.subtitle"),
      icon: Book,
      href: getSectionHref("/sections/tafseer"),
      color: "from-islamic-green to-islamic-gold"
    },
    {
      id: "dhikr",
      title: t("dhikr.title"),
      description: t("dhikr.subtitle"),
      icon: Heart,
      href: getSectionHref("/sections/dhikr"),
      color: "from-islamic-gold to-yellow-500"
    },
    {
      id: "prayer-times",
      title: t("prayer.title"),
      description: t("prayer.subtitle"),
      icon: Clock,
      href: getSectionHref("/sections/prayer-times"),
      color: "from-purple-500 to-islamic-blue"
    },
    {
      id: "qibla",
      title: t("qibla.title"),
      description: t("qibla.subtitle"),
      icon: Compass,
      href: getSectionHref("/sections/qibla"),
      color: "from-islamic-green to-teal-500"
    },
    {
      id: "donation",
      title: t("donation.title"),
      description: t("donation.subtitle"),
      icon: DollarSign,
      href: getSectionHref("/sections/donation"),
      color: "from-red-500 to-pink-500"
    },
    {
      id: "supplications",
      title: t("supplications.title"),
      description: t("supplications.subtitle"),
      icon: Star,
      href: getSectionHref("/sections/supplications"),
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: "hadith",
      title: t("hadith.title"),
      description: t("hadith.subtitle"),
      icon: Shield,
      href: getSectionHref("/sections/hadith"),
      color: "from-islamic-blue to-blue-600"
    },
    {
      id: "youtube",
      title: t("youtube.title"),
      description: t("youtube.description"),
      icon: Globe,
      href: getSectionHref("/sections/youtube"),
      color: "from-red-600 to-red-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="text-center mb-16 motion-safe"
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
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
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="motion-safe"
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
            >
              <Link
                href={section.href}
                onClick={(e) => handleSectionClick(e, section.href)}
                onMouseEnter={() => router.prefetch(section.href)}
                prefetch={true}
                className="block"
              >
                <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-islamic-gold h-full flex flex-col cursor-pointer">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-islamic-gold transition-colors duration-300">
                    {section.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                    {section.description}
                  </p>
                  
                  <div className={`flex items-center text-islamic-gold font-semibold group-hover:${direction === 'rtl' ? '-translate-x-2' : 'translate-x-2'} transition-transform duration-300 mt-auto`}>
                    <span>{t("navigation.visit_section")}</span>
                    <svg 
                      className={`w-4 h-4 ${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
