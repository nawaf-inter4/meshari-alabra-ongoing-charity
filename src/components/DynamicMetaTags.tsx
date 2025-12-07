"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";
import ur from "@/locales/ur.json";
import tr from "@/locales/tr.json";
import id from "@/locales/id.json";
import ms from "@/locales/ms.json";
import bn from "@/locales/bn.json";
import fr from "@/locales/fr.json";
import zh from "@/locales/zh.json";
import it from "@/locales/it.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";

const translations: Record<string, any> = {
  ar, en, ur, tr, id, ms, bn, fr, zh, it, ja, ko,
};

const sectionKeys: Record<string, { title: string; subtitle: string }> = {
  'quran': { title: 'quran.title', subtitle: 'quran.subtitle' },
  'tafseer': { title: 'tafseer.title', subtitle: 'tafseer.subtitle' },
  'dhikr': { title: 'dhikr.title', subtitle: 'dhikr.subtitle' },
  'prayer-times': { title: 'prayer.title', subtitle: 'prayer.subtitle' },
  'qibla': { title: 'qibla.title', subtitle: 'qibla.subtitle' },
  'donation': { title: 'donation.title', subtitle: 'donation.subtitle' },
  'supplications': { title: 'supplications.title', subtitle: 'supplications.subtitle' },
  'hadith': { title: 'hadith.title', subtitle: 'hadith.subtitle' },
  'youtube': { title: 'youtube.title', subtitle: 'youtube.description' },
};

function getSectionMetadata(sectionId: string, lang: string) {
  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
  const currentLang = supportedLanguages.includes(lang) ? lang : 'ar';
  const t = translations[currentLang] || translations.ar;
  
  const keys = sectionKeys[sectionId as keyof typeof sectionKeys];
  if (!keys) return null;
  
  const title = t[keys.title] || keys.title;
  const description = t[keys.subtitle] || keys.subtitle;
  const siteName = currentLang === 'ar' 
    ? 'صدقة جارية لمشاري' 
    : "Meshari's Ongoing Charity";
  
  return {
    title: `${title} | ${siteName}`,
    description,
  };
}

export default function DynamicMetaTags() {
  const pathname = usePathname();
  const { locale } = useLanguage();

  useEffect(() => {
    // Use locale from LanguageProvider instead of URL parsing
    const currentLang = locale || 'ar';
    
    // Check if we're on a section page
    const isSectionPage = pathname?.includes('/sections/');
    let sectionId: string | null = null;
    
    if (isSectionPage) {
      const sectionMatch = pathname.match(/\/sections\/([^\/]+)/);
      sectionId = sectionMatch ? sectionMatch[1] : null;
    }
    
    // Get metadata - either section-specific or homepage
    let title = '';
    let description = '';
    
    if (isSectionPage && sectionId) {
      // Get section metadata using client-side function
      try {
        const sectionMetadata = getSectionMetadata(sectionId, currentLang);
        if (sectionMetadata) {
          title = sectionMetadata.title;
          description = sectionMetadata.description;
        }
      } catch (e) {
        console.error('Error generating section metadata:', e);
      }
    }
    
    // Fallback to homepage metadata if section metadata failed or not on section page
    if (!title || !description) {
      const titles = {
        ar: "صدقة جارية - مشاري بن أحمد بن سليمان العبره",
        en: "Ongoing Charity - Meshari Ahmed Sulaiman Alabra",
        ur: " کی جاری صدقہ - مشاری احمد سلیمان العبرہ",
        tr: "nin Sürekli Hayır İşi - Meshari Ahmed Sulaiman Alabra",
        id: "Amal Jariyah - Meshari Ahmed Sulaiman Alabra",
        ms: "Amal Jariyah - Meshari Ahmed Sulaiman Alabra",
        bn: "মেশারির চলমান দান - মেশারি আহমেদ সুলাইমান আল-আবরা",
        fr: "Charité Continue - Meshari Ahmed Sulaiman Alabra",
        zh: "的持续慈善 - Meshari Ahmed Sulaiman Alabra",
        it: "Carità Continua - Meshari Ahmed Sulaiman Alabra",
        ja: "の継続的慈善 - Meshari Ahmed Sulaiman Alabra",
        ko: "의 지속적인 자선 - Meshari Ahmed Sulaiman Alabra"
      };

      const descriptions = {
        ar: "صفحة مخصصة لأخي مشاري، توفي إثر مرض سرطان الدماغ. اللهم اغفر له وارحمه واجعل القرآن والصدقة الجارية شفيعاً له",
        en: "A tribute to Meshari Ahmed Sulaiman Alabra - Ongoing charity through Quran, supplications, and good deeds. May Allah have mercy on him.",
        ur: "مشاری احمد سلیمان العبرہ کے لیے خراج عقیدت - قرآن، دعاؤں اور نیک اعمال کے ذریعے جاری صدقہ۔ اللہ ان پر رحم فرمائے۔",
        tr: "Meshari Ahmed Sulaiman Alabra'ya saygı - Kuran, dualar ve iyilikler yoluyla sürekli hayır işi. Allah ona merhamet etsin.",
        id: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Amal jariyah melalui Al-Quran, doa, dan perbuatan baik. Semoga Allah merahmatinya.",
        ms: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Amal jariyah melalui Al-Quran, doa, dan perbuatan baik. Semoga Allah merahmatinya.",
        bn: "মেশারি আহমেদ সুলাইমান আল-আবরাকে শ্রদ্ধা - কুরআন, দোয়া ও সৎকর্মের মাধ্যমে চলমান দান। আল্লাহ তাকে রহম করুন।",
        fr: "Hommage à Meshari Ahmed Sulaiman Alabra - Charité continue par le Coran, les supplications et les bonnes œuvres. Qu'Allah ait pitié de lui.",
        zh: "向Meshari Ahmed Sulaiman Alabra致敬 - 通过古兰经、祈祷和善行进行持续慈善。愿真主怜悯他。",
        it: "Omaggio a Meshari Ahmed Sulaiman Alabra - Carità continua attraverso il Corano, le suppliche e le buone azioni. Che Allah abbia pietà di lui.",
        ja: "Meshari Ahmed Sulaiman Alabraへの敬意 - コーラン、祈り、善行による継続的な慈善。アッラーが彼を憐れんでくださいますように。",
        ko: "Meshari Ahmed Sulaiman Alabra에게 경의를 표합니다 - 꾸란, 기도, 선행을 통한 지속적인 자선. 알라가 그를 자비롭게 여기시기를."
      };
      
      title = titles[currentLang as keyof typeof titles] || titles.ar;
      description = descriptions[currentLang as keyof typeof descriptions] || descriptions.ar;
    }

    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    } else if (description && typeof document !== 'undefined' && document.head && document.head.parentNode) {
      try {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        meta.setAttribute('content', description);
        document.head.appendChild(meta);
      } catch (e) {
        // Silently fail
      }
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) {
      ogTitle.setAttribute('content', title);
    } else if (title && typeof document !== 'undefined' && document.head && document.head.parentNode) {
      try {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.setAttribute('content', title);
        document.head.appendChild(meta);
      } catch (e) {
        // Silently fail
      }
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && description) {
      ogDescription.setAttribute('content', description);
    } else if (description && typeof document !== 'undefined' && document.head && document.head.parentNode) {
      try {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.setAttribute('content', description);
        document.head.appendChild(meta);
      } catch (e) {
        // Silently fail
      }
    }

    // Update OG Image tag
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', 'https://meshari.charity/og-image.png');
    } else {
      // Create OG image tag if it doesn't exist
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image');
      meta.setAttribute('content', 'https://meshari.charity/og-image.png');
      document.head.appendChild(meta);
    }

    // Update OG Image Width and Height
    const ogImageWidth = document.querySelector('meta[property="og:image:width"]');
    if (ogImageWidth) {
      ogImageWidth.setAttribute('content', '1200');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image:width');
      meta.setAttribute('content', '1200');
      document.head.appendChild(meta);
    }

    const ogImageHeight = document.querySelector('meta[property="og:image:height"]');
    if (ogImageHeight) {
      ogImageHeight.setAttribute('content', '630');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image:height');
      meta.setAttribute('content', '630');
      document.head.appendChild(meta);
    }

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && title) {
      twitterTitle.setAttribute('content', title);
    } else if (title && typeof document !== 'undefined' && document.head && document.head.parentNode) {
      try {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'twitter:title');
        meta.setAttribute('content', title);
        document.head.appendChild(meta);
      } catch (e) {
        // Silently fail
      }
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription && description) {
      twitterDescription.setAttribute('content', description);
    } else if (description && typeof document !== 'undefined' && document.head && document.head.parentNode) {
      try {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'twitter:description');
        meta.setAttribute('content', description);
        document.head.appendChild(meta);
      } catch (e) {
        // Silently fail
      }
    }

    // Update Twitter Image tag
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', 'https://meshari.charity/og-image.png');
    } else {
      // Create Twitter image tag if it doesn't exist
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'twitter:image');
      meta.setAttribute('content', 'https://meshari.charity/og-image.png');
      document.head.appendChild(meta);
    }

    // Update canonical URL - must point to the actual page, not homepage
    // Always ensure canonical points to the correct page URL
    const baseUrl = 'https://meshari.charity';
    let existingCanonical = document.querySelector('link[rel="canonical"]');
    const existingHref = existingCanonical?.getAttribute('href') || '';
    
    // Get the actual pathname (might have language prefix)
    const actualPath = pathname || '';
    const isHomePage = actualPath === '/' || actualPath.match(/^\/(ar|en|ur|tr|id|ms|bn|fr|zh|it|ja|ko)$/);
    // isSectionPage is already defined earlier in this useEffect
    
    // Always calculate the correct canonical URL
    let canonicalUrl = baseUrl;
    
    // For home pages, use language prefix
    if (isHomePage) {
      canonicalUrl = currentLang === 'ar' ? baseUrl : `${baseUrl}/${currentLang}`;
    } else if (isSectionPage) {
      // For section pages, use the actual pathname (sections are at /sections/... not /[lang]/sections/...)
      // But canonical should include language prefix for SEO
      const sectionPath = actualPath.startsWith('/') ? actualPath : `/${actualPath}`;
      // Remove any existing language prefix from path if present
      const cleanPath = sectionPath.replace(/^\/(ar|en|ur|tr|id|ms|bn|fr|zh|it|ja|ko)\//, '/');
      if (currentLang === 'ar') {
        canonicalUrl = `${baseUrl}${cleanPath}`;
      } else {
        // Add language prefix for non-Arabic
        canonicalUrl = `${baseUrl}/${currentLang}${cleanPath}`;
      }
    } else {
      // Other pages - remove language prefix if present and add correct one
      const cleanPath = actualPath.replace(/^\/(ar|en|ur|tr|id|ms|bn|fr|zh|it|ja|ko)/, '') || '/';
      if (cleanPath === '/') {
        canonicalUrl = currentLang === 'ar' ? baseUrl : `${baseUrl}/${currentLang}`;
      } else {
        canonicalUrl = currentLang === 'ar' ? `${baseUrl}${cleanPath}` : `${baseUrl}/${currentLang}${cleanPath}`;
      }
    }
    
    // Always update canonical to ensure it's correct (not pointing to root for non-home pages)
    const shouldUpdate = !existingCanonical || 
                        existingHref !== canonicalUrl ||
                        (existingHref === baseUrl && !isHomePage) ||
                        (existingHref === `${baseUrl}/` && !isHomePage);
    
    if (shouldUpdate) {
      if (existingCanonical && existingCanonical.parentNode) {
        existingCanonical.setAttribute('href', canonicalUrl);
      } else if (typeof document !== 'undefined' && document.head && document.head.parentNode) {
        try {
          // Create canonical tag if it doesn't exist
          const canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          canonical.setAttribute('href', canonicalUrl);
          document.head.appendChild(canonical);
        } catch (e) {
          // Silently fail if DOM manipulation fails
        }
      }
    }

  }, [pathname, locale]);

  return null; // This component doesn't render anything
}
