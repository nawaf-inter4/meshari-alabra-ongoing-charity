import { FileText } from "lucide-react";
import { siteConfig, type SupportedLocale } from "@/config/site";
import { translateWithConfig } from "@/lib/translations";
import { heroVerse } from "@/lib/hero-verse";
import HeroStars from "./HeroStars";

export default function ServerHeroSection({ locale }: { locale: SupportedLocale }) {
  const memorialName =
    siteConfig.content.memorialName || translateWithConfig(locale, "memorial.name");
  const memorialDate =
    siteConfig.content.memorialDate || translateWithConfig(locale, "memorial.death");
  const description =
    siteConfig.content.heroDescription || translateWithConfig(locale, "hero.description");
  const button = translateWithConfig(locale, "hero.supplications_button");
  const bismillah = heroVerse(locale, "bismillah");
  const verse = heroVerse(locale, "verse");
  const sadaqallah = heroVerse(locale, "sadaqallah");

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center px-4 pb-20 sm:pt-32 md:pt-28">
      <HeroStars />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div
          className="hero-memorial-card bg-light-secondary dark:bg-dark-secondary md:bg-light-secondary/95 md:dark:bg-dark-secondary/95 md:backdrop-blur-sm rounded-2xl p-8 border-2 border-islamic-gold/30 glow"
          data-memorial-card
        >
          <h1 className="hero-lcp-title text-3xl md:text-4xl font-bold mb-3" data-lcp>
            {memorialName}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{memorialDate}</p>
          <p className="text-xl text-islamic-gold leading-relaxed mb-6">{description}</p>
          <div className="flex justify-center">
            <a
              href={siteConfig.assets.supplicationsPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-semibold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-colors duration-300 hover:scale-105 glow"
            >
              <FileText className="w-5 h-5" aria-hidden="true" />
              <span>{button}</span>
            </a>
          </div>
        </div>

        <div className="mt-6 md:mt-8" data-hero-verse>
          <div className="space-y-2 md:space-y-3">
            <p
              className="hero-verse-bismillah text-center text-lg md:text-2xl arabic-quran-text text-islamic-green"
              dir="rtl"
              lang="ar"
            >
              {bismillah}
            </p>
            <p
              className="hero-verse-main text-center text-lg md:text-3xl arabic-quran-text text-islamic-gold max-w-4xl mx-auto"
              dir="rtl"
              lang="ar"
            >
              {verse}
            </p>
            <p
              className="hero-verse-sadaqallah text-center text-base md:text-xl arabic-quran-text text-islamic-green"
              dir="rtl"
              lang="ar"
            >
              {sadaqallah}
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center" aria-hidden="true">
          <div className="hero-scroll-indicator w-4 h-6 border border-islamic-gold dark:border-islamic-gold rounded-full flex items-center justify-center">
            <div className="w-0.5 h-3 bg-islamic-gold dark:bg-islamic-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
