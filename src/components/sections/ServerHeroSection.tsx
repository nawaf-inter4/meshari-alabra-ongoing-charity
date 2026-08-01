import { FileText } from "lucide-react";
import { localeDirection, siteConfig, type SupportedLocale } from "@/config/site";
import { translate } from "@/lib/translations";
import { heroVerse } from "@/lib/hero-verse";
import HeroStars from "./HeroStars";

export default function ServerHeroSection({ locale }: { locale: SupportedLocale }) {
  const direction = localeDirection(locale);
  const rtl = direction === "rtl";
  const memorialName =
    siteConfig.content.memorialName || translate(locale, "memorial.name");
  const memorialDate =
    siteConfig.content.memorialDate || translate(locale, "memorial.death");
  const description =
    siteConfig.content.heroDescription || translate(locale, "hero.description");
  const button = translate(locale, "hero.supplications_button");
  const bismillah = heroVerse(locale, "bismillah");
  const verse = heroVerse(locale, "verse");
  const sadaqallah = heroVerse(locale, "sadaqallah");

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 pb-20 sm:pt-32 md:pt-28"
      style={{ paddingTop: "calc(7rem + env(safe-area-inset-top, 0px))" }}
    >
      <HeroStars />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div
          className="bg-light-secondary dark:bg-dark-secondary md:bg-light-secondary/95 md:dark:bg-dark-secondary/95 md:backdrop-blur-sm rounded-2xl p-8 border-2 border-islamic-gold/30 glow"
          style={{ borderColor: "var(--color-brand-border)" }}
          data-memorial-card
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{memorialName}</h1>
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

        <div className="mt-8" data-hero-verse>
          <div className="space-y-6">
            <p
              className={`text-xl md:text-2xl ${rtl ? "font-tajwal" : ""} text-islamic-green leading-relaxed min-h-[2.5em]`}
              style={{ lineHeight: 1.75 }}
            >
              {bismillah}
            </p>
            <p
              className={`text-2xl md:text-3xl ${rtl ? "font-tajwal" : ""} text-islamic-gold max-w-4xl mx-auto min-h-[7.5em] md:min-h-[6.5em]`}
              style={{ lineHeight: 2.5 }}
              data-lcp-verse
            >
              {verse}
            </p>
            <p
              className={`text-lg md:text-xl ${rtl ? "font-tajwal" : ""} text-islamic-green leading-relaxed min-h-[1.75em]`}
              style={{ lineHeight: 1.75 }}
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
