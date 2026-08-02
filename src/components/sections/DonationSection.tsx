"use client";

import { useLanguage } from "../LanguageProvider";
import { siteConfig } from "@/config/site";
import { Heart, Gift, Users, Star } from "lucide-react";
import SectionTitleLink from "./SectionTitleLink";

export default function DonationSection() {
  const { t } = useLanguage();

  const benefits = [
    { icon: Star, text: t("donation.benefit1") },
    { icon: Users, text: t("donation.benefit2") },
    { icon: Gift, text: t("donation.benefit3") },
  ];

  return (
    <section id="donation" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-islamic-gold" fill="currentColor" aria-hidden="true" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text leading-tight py-1">
              <SectionTitleLink section="donation">{t("donation.title")}</SectionTitleLink>
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {t("donation.subtitle")}
          </p>
          <p className="text-lg leading-loose max-w-3xl mx-auto py-4 px-6">
            {t("donation.description")}
          </p>
        </div>

        <div className="bg-gradient-to-br from-islamic-gold/10 via-islamic-green/10 to-islamic-blue/10 rounded-2xl p-8 md:p-12 border-2 border-islamic-gold/30 glow mb-12">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-light/50 dark:bg-dark/50 p-4 rounded-full"
              >
                <benefit.icon className="w-6 h-6 text-islamic-gold flex-shrink-0 mt-1" aria-hidden="true" />
                <p className="text-sm leading-loose py-2">{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={siteConfig.content.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-bold text-lg rounded-full hover:from-islamic-green hover:to-islamic-blue transition-colors duration-300 glow"
            >
              <Heart className="w-6 h-6" fill="currentColor" aria-hidden="true" />
              {t("donation.button")}
            </a>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {t("donation.balance_text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
