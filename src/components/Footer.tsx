"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "./LanguageProvider";
import { Share2, Github } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { heroVerse, heroVerseTextProps } from "@/lib/hero-verse";

const ShareModal = dynamic(() => import("./ShareModal"), { ssr: false });

function FooterThemeLogo({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  // Absolute white-label URLs: skip next/image host allowlist failures.
  if (/^https?:\/\//i.test(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- remote white-label logo URL
      <img src={src} alt="" width={48} height={48} className={className} aria-hidden="true" />
    );
  }
  return (
    <Image src={src} alt="" width={48} height={48} className={className} aria-hidden="true" />
  );
}

export default function Footer() {
  const { t, locale, direction } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  // Safety check for direction
  const safeDirection = direction || 'ltr';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize translations to prevent unnecessary re-renders
  // CRITICAL: Use consistent values to prevent hydration mismatch
  const memoizedTranslations = useMemo(() => {
    // Always use the translation function, but ensure it returns consistent values
    const getTrans = (key: string, fallback: string) => {
      const trans = t(key);
      // If translation returns the key itself, use fallback
      return trans === key ? fallback : trans;
    };
    
    return {
      memorialName: siteConfig.content.memorialName || getTrans("memorial.name", siteConfig.content.memorialLegalName),
      memorialDeath: getTrans("memorial.death", locale === 'ar' ? "(رحمه الله)" : "(May Allah have mercy on him)"),
      footerDescription: getTrans("footer.description", locale === 'ar' ? "هذا الموقع صدقة جارية" : "This website is an ongoing charity"),
      share: getTrans("share", locale === 'ar' ? "مشاركة" : "Share"),
      socialXAccount: getTrans("social.x_account", locale === 'ar' ? "حساب مشاري على إكس" : "Meshari's X Account"),
      socialGithub: getTrans("social.github", locale === 'ar' ? "على GitHub" : "On GitHub"),
      // CRITICAL: Use full text to match translation file - this prevents hydration mismatch
      footerCharity: siteConfig.content.footerCharity || getTrans("footer.charity", siteConfig.content.memorialLegalName),
      footerAllRights: getTrans("footer.all_rights", locale === 'ar' ? "جميع الحقوق محفوظة © {{year}}" : "All rights reserved © {{year}}"),
      footerTechnology: getTrans("footer.technology", locale === 'ar' ? "مبني بـ Next.js و React" : "Built with Next.js and React"),
      footerSitemap: getTrans("footer.sitemap", locale === 'ar' ? "خريطة الموقع" : "Sitemap"),
      footerLlmTxt: getTrans("footer.llm_txt", "llms.txt")
    };
  }, [t, locale]);
  
  // Get current year - dynamically get the current year
  const currentYear = mounted ? new Date().getFullYear().toString() : "2026";
  const charityParenthetical = safeDirection === "rtl"
    ? memoizedTranslations.footerCharity.match(/^(.*?)(\([^()]+\))(.*)$/u)
    : null;
  
  const bismillah = heroVerse(locale, "bismillah");
  const verse = heroVerse(locale, "verse");
  const sadaqallah = heroVerse(locale, "sadaqallah");
  const bismillahProps = heroVerseTextProps(bismillah, locale);
  const verseProps = heroVerseTextProps(verse, locale);
  const sadaqallahProps = heroVerseTextProps(sadaqallah, locale);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <footer className="py-12 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Soft edge above footer (same treatment as social divider below) */}
        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-islamic-gold to-transparent" aria-hidden="true" />

        {/* Memorial */}
        <div className="text-center mb-8">
          {/* Theme logos: light mode → logo-light, dark mode → logo-dark (html.dark class) */}
          <FooterThemeLogo
            src={siteConfig.assets.logoLight}
            className="w-12 h-12 mx-auto mb-4 rounded-full dark:hidden"
          />
          <FooterThemeLogo
            src={siteConfig.assets.logoDark}
            className="hidden w-12 h-12 mx-auto mb-4 rounded-full dark:block"
          />
          <h3 className={`text-2xl md:text-3xl font-bold mb-2 gradient-text text-center leading-tight py-1 ${safeDirection === 'rtl' ? 'font-arabic' : ''}`}>
            {memoizedTranslations.memorialName}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {memoizedTranslations.memorialDeath}
          </p>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto text-islamic-gold">
            {memoizedTranslations.footerDescription}
          </p>
        </div>

        {/* Separator */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-islamic-gold to-transparent" />

        {/* Share Button and Social Links */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 hover:scale-105 glow"
              aria-label={memoizedTranslations.share || "Share"}
            >
              <Share2 className="w-5 h-5" />
              {memoizedTranslations.share}
            </button>
            
            {isShareModalOpen ? (
              <ShareModal
                isOpen
                onClose={() => setIsShareModalOpen(false)}
                mode="website"
              />
            ) : null}
            
            {siteConfig.social.links.map((link) => {
              const isX = link.includes('x.com/') || link.includes('twitter.com/');
              const isGitHub = link.includes('github.com/');
              const label = isX
                ? (memoizedTranslations.socialXAccount || "Meshari's X Account")
                : isGitHub
                  ? (memoizedTranslations.socialGithub || "View on GitHub")
                  : link;

              return (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                  aria-label={label}
                >
                  {isX ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ) : isGitHub ? (
                    <Github className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Share2 className="w-5 h-5" aria-hidden="true" />
                  )}
                  {label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Quranic Verse — Amiri stack (same as hero / surah body), never UI Tajawal. */}
        <div className="text-center mb-8">
          <div className="space-y-3">
            <p
              className={`hero-verse-bismillah text-center text-xl md:text-2xl text-islamic-green ${bismillahProps.className ?? ""}`}
              dir={bismillahProps.dir}
              lang={bismillahProps.lang}
            >
              {bismillah}
            </p>
            <p
              className={`hero-verse-main text-center text-2xl md:text-3xl text-islamic-gold max-w-4xl mx-auto ${verseProps.className ?? ""}`}
              dir={verseProps.dir}
              lang={verseProps.lang}
            >
              {verse}
            </p>
            <p
              className={`hero-verse-sadaqallah text-center text-lg md:text-xl text-islamic-green ${sadaqallahProps.className ?? ""}`}
              dir={sadaqallahProps.dir}
              lang={sadaqallahProps.lang}
            >
              {sadaqallah}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p
            className="mb-2 leading-loose py-1"
            dir={safeDirection}
            suppressHydrationWarning
            data-footer-charity
          >
            {charityParenthetical ? (
              <>
                {charityParenthetical[1]}
                <span dir="ltr" className="inline-block [unicode-bidi:isolate]">
                  (<bdi dir="rtl">{charityParenthetical[2].slice(1, -1)}</bdi>)
                </span>
                {charityParenthetical[3]}
              </>
            ) : memoizedTranslations.footerCharity}
          </p>
          <p suppressHydrationWarning>{memoizedTranslations.footerAllRights.replace(/\{\{year\}\}/g, currentYear)}</p>
          <p className="mt-4 text-xs">
            {memoizedTranslations.footerTechnology}
          </p>
          <div className="mt-2 text-xs flex justify-center gap-4">
            <a href="/sitemap.xml" className="text-islamic-gold hover:text-islamic-green transition-colors" aria-label={memoizedTranslations.footerSitemap || "Sitemap"}>
              {memoizedTranslations.footerSitemap}
            </a>
            <a href="/llms.txt" className="text-islamic-gold hover:text-islamic-green transition-colors" aria-label="llms.txt">
              llms.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
