"use client";

import { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { languageMetadata } from "@/lib/metadata";

interface MetaOptimizerProps {
  language?: string;
  pageTitle?: string;
  pageDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export default function MetaOptimizer({ 
  language, 
  pageTitle, 
  pageDescription, 
  canonicalUrl,
  ogImage 
}: MetaOptimizerProps) {
  const { locale } = useLanguage();
  const lang = language || locale;
  const meta = languageMetadata[lang] || languageMetadata.ar;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity';
  const currentUrl = canonicalUrl || (lang === 'ar' ? siteUrl : `${siteUrl}/${lang}`);
  const title = pageTitle || meta.title;
  const description = pageDescription || meta.description;
  const image = ogImage || '/og-image.png';

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', meta.keywords.join(', '));
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      metaKeywords.setAttribute('content', meta.keywords.join(', '));
      document.head.appendChild(metaKeywords);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', currentUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', currentUrl);
      document.head.appendChild(canonical);
    }

    // Update Open Graph tags
    const updateOpenGraph = () => {
      const ogTags = [
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: currentUrl },
        { property: 'og:image', content: `${siteUrl}${image}` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: title },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: "Meshari's Ongoing Charity" },
        { property: 'og:locale', content: meta.locale },
        { property: 'og:locale:alternate', content: 'ar_SA' },
        { property: 'og:locale:alternate', content: 'en_US' },
        { property: 'og:locale:alternate', content: 'tr_TR' },
        { property: 'og:locale:alternate', content: 'ur_PK' },
        { property: 'og:locale:alternate', content: 'id_ID' },
        { property: 'og:locale:alternate', content: 'ms_MY' },
        { property: 'og:locale:alternate', content: 'bn_BD' },
        { property: 'og:locale:alternate', content: 'fr_FR' },
        { property: 'og:locale:alternate', content: 'zh_CN' },
        { property: 'og:locale:alternate', content: 'it_IT' },
        { property: 'og:locale:alternate', content: 'ja_JP' },
        { property: 'og:locale:alternate', content: 'ko_KR' }
      ];

      ogTags.forEach(tag => {
        let element = document.querySelector(`meta[property="${tag.property}"]`);
        if (element) {
          element.setAttribute('content', tag.content);
        } else {
          element = document.createElement('meta');
          element.setAttribute('property', tag.property);
          element.setAttribute('content', tag.content);
          document.head.appendChild(element);
        }
      });
    };

    // Update Twitter Card tags
    const updateTwitterCard = () => {
      const twitterTags = [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: `${siteUrl}${image}` },
        { name: 'twitter:image:alt', content: title },
        { name: 'twitter:site', content: '@alabrameshari' },
        { name: 'twitter:creator', content: '@alabrameshari' }
      ];

      twitterTags.forEach(tag => {
        let element = document.querySelector(`meta[name="${tag.name}"]`);
        if (element) {
          element.setAttribute('content', tag.content);
        } else {
          element = document.createElement('meta');
          element.setAttribute('name', tag.name);
          element.setAttribute('content', tag.content);
          document.head.appendChild(element);
        }
      });
    };

    // Update language alternates
    const updateLanguageAlternates = () => {
      const languages = ['ar', 'en', 'tr', 'ur', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
      
      // Remove existing hreflang tags
      const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingHreflang.forEach(link => link.remove());

      // Add x-default
      let xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      xDefault.setAttribute('href', siteUrl);
      document.head.appendChild(xDefault);

      // Add language alternates
      languages.forEach(lang => {
        let alternate = document.createElement('link');
        alternate.setAttribute('rel', 'alternate');
        alternate.setAttribute('hreflang', lang);
        alternate.setAttribute('href', lang === 'ar' ? siteUrl : `${siteUrl}/${lang}`);
        document.head.appendChild(alternate);
      });
    };

    // Update robots meta
    const updateRobotsMeta = () => {
      let robots = document.querySelector('meta[name="robots"]');
      if (robots) {
        robots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      } else {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        robots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        document.head.appendChild(robots);
      }
    };

    // Update theme color
    const updateThemeColor = () => {
      let themeColor = document.querySelector('meta[name="theme-color"]');
      if (themeColor) {
        themeColor.setAttribute('content', '#D4AF37');
      } else {
        themeColor = document.createElement('meta');
        themeColor.setAttribute('name', 'theme-color');
        themeColor.setAttribute('content', '#D4AF37');
        document.head.appendChild(themeColor);
      }
    };

    // Update viewport meta
    const updateViewport = () => {
      let viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover');
      } else {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover');
        document.head.appendChild(viewport);
      }
    };

    // Update language and direction
    const updateLanguageAndDirection = () => {
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', meta.direction);
    };

    // Update all meta tags
    updateOpenGraph();
    updateTwitterCard();
    updateLanguageAlternates();
    updateRobotsMeta();
    updateThemeColor();
    updateViewport();
    updateLanguageAndDirection();

  }, [lang, title, description, currentUrl, image, meta]);

  return null;
}
