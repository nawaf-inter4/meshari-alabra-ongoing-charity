"use client";

import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Heart, Gift, Users, Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function DonationSection() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const benefits = [
    { icon: Star, text: mounted ? t("donation.benefit1") : "صدقة جارية" },
    { icon: Users, text: mounted ? t("donation.benefit2") : "مساعدة المحتاجين" },
    { icon: Gift, text: mounted ? t("donation.benefit3") : "نشر الخير" },
  ];

  return (
    <section id="donation" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-islamic-gold" fill="currentColor" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t("donation.title")}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {t("donation.subtitle")}
          </p>
          <p className="text-lg leading-loose max-w-3xl mx-auto py-4 px-6">
            {t("donation.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-islamic-gold/10 via-islamic-green/10 to-islamic-blue/10 rounded-2xl p-8 md:p-12 border-2 border-islamic-gold/30 glow mb-12"
        >
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 bg-light/50 dark:bg-dark/50 p-4 rounded-full"
              >
                <benefit.icon className="w-6 h-6 text-islamic-gold flex-shrink-0 mt-1" />
                <p className="text-sm leading-loose py-2">{benefit.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <a
              href="https://ehsan.sa/campaign/6FC11E15DA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-islamic-gold via-islamic-green to-islamic-blue text-white font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <Heart className="w-6 h-6" fill="currentColor" />
              {t("donation.button")}
            </a>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {t("donation.balance_text")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
