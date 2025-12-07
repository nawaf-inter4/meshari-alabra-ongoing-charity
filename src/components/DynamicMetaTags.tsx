"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DynamicMetaTags() {
  const pathname = usePathname();

  useEffect(() => {
    // Get current language from URL
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentLang = pathSegments[0] || 'ar';
    
    // Update document title based on language
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

    // Update document title
    document.title = titles[currentLang as keyof typeof titles] || titles.ar;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[currentLang as keyof typeof descriptions] || descriptions.ar);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', titles[currentLang as keyof typeof titles] || titles.ar);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', descriptions[currentLang as keyof typeof descriptions] || descriptions.ar);
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
    if (twitterTitle) {
      twitterTitle.setAttribute('content', titles[currentLang as keyof typeof titles] || titles.ar);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', descriptions[currentLang as keyof typeof descriptions] || descriptions.ar);
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
    // Only update if canonical doesn't already exist or is pointing to root (incorrect)
    const baseUrl = 'https://meshari.charity';
    let existingCanonical = document.querySelector('link[rel="canonical"]');
    const existingHref = existingCanonical?.getAttribute('href') || '';
    
    // Get the actual pathname (might have language prefix)
    const actualPath = pathname;
    const isHomePage = actualPath === '/' || actualPath.match(/^\/(ar|en|ur|tr|id|ms|bn|fr|zh|it|ja|ko)$/);
    const isSectionPage = actualPath.includes('/sections/');
    
    // Only update canonical if:
    // 1. It doesn't exist
    // 2. It's pointing to root (incorrect for section pages)
    // 3. It doesn't match the current pathname (incorrect)
    const shouldUpdate = !existingCanonical || 
                        (existingHref === baseUrl || existingHref === `${baseUrl}/`) ||
                        (!isHomePage && !existingHref.includes(actualPath));
    
    if (shouldUpdate) {
      let canonicalUrl = baseUrl;
      
      // For home pages, use language prefix
      if (isHomePage) {
        canonicalUrl = currentLang === 'ar' ? baseUrl : `${baseUrl}/${currentLang}`;
      } else if (isSectionPage) {
        // For section pages, use the actual pathname (sections are at /sections/... not /[lang]/sections/...)
        // But canonical should include language prefix for SEO
        const sectionPath = actualPath.startsWith('/') ? actualPath : `/${actualPath}`;
        if (currentLang === 'ar') {
          canonicalUrl = `${baseUrl}${sectionPath}`;
        } else {
          // Add language prefix for non-Arabic
          canonicalUrl = `${baseUrl}/${currentLang}${sectionPath}`;
        }
      } else {
        // Other pages
        canonicalUrl = currentLang === 'ar' ? `${baseUrl}${actualPath}` : `${baseUrl}/${currentLang}${actualPath}`;
      }
      
      if (existingCanonical) {
        existingCanonical.setAttribute('href', canonicalUrl);
      } else {
        // Create canonical tag if it doesn't exist
        const canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', canonicalUrl);
        document.head.appendChild(canonical);
      }
    }

  }, [pathname]);

  return null; // This component doesn't render anything
}
