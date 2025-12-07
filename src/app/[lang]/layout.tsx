import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import SEOScripts from "@/components/SEOScripts";
import LocalSchemaMarkup from "@/components/LocalSchemaMarkup";
import AdvancedSEO from "@/components/AdvancedSEO";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import AccessibilityOptimizer from "@/components/AccessibilityOptimizer";
import MetaOptimizer from "@/components/MetaOptimizer";
import ErrorBoundary from "@/components/ErrorBoundary";
import AudioPlayer from "@/components/AudioPlayer";
import DynamicMetaTags from "@/components/DynamicMetaTags";
import AnalyticsWrapper from "@/components/AnalyticsWrapper";

// Language-specific metadata
const languageMetadata = {
  ar: {
    title: "صدقة جارية | مشاري بن أحمد بن سليمان العبره",
    description: "صفحة مخصصة لأخي مشاري، توفي إثر مرض سرطان الدماغ. اللهم اغفر له وارحمه واجعل القرآن والصدقة الجارية شفيعاً له",
    locale: "ar_SA",
    ogTitle: "صدقة جارية | مشاري بن أحمد بن سليمان العبره",
    ogDescription: "صفحة مخصصة لأخي مشاري، توفي إثر مرض سرطان الدماغ. اللهم اغفر له وارحمه واجعل القرآن والصدقة الجارية شفيعاً له",
    twitterTitle: "صدقة جارية لمشاري | مشاري بن أحمد بن سليمان العبره",
    twitterDescription: "صفحة مخصصة لأخي مشاري، توفي إثر مرض سرطان الدماغ. اللهم اغفر له وارحمه واجعل القرآن والصدقة الجارية شفيعاً له"
  },
  en: {
    title: "Ongoing Charity | Meshari Ahmed Sulaiman Alabra",
    description: "A tribute to Meshari Ahmed Sulaiman Alabra - Ongoing charity through Quran, supplications, and good deeds. May Allah have mercy on him.",
    locale: "en_US",
    ogTitle: "Ongoing Charity | Meshari Ahmed Sulaiman Alabra",
    ogDescription: "A tribute to Meshari Ahmed Sulaiman Alabra - Ongoing charity through Quran, supplications, and good deeds. May Allah have mercy on him.",
    twitterTitle: "Ongoing Charity | Meshari Ahmed Sulaiman Alabra",
    twitterDescription: "A tribute to Meshari Ahmed Sulaiman Alabra - Ongoing charity through Quran, supplications, and good deeds. May Allah have mercy on him."
  },
  ur: {
    title: "کی جاری صدقہ | مشاری احمد سلیمان العبرہ",
    description: "مشاری احمد سلیمان العبرہ کے لیے خراج عقیدت - قرآن، دعاؤں اور نیک اعمال کے ذریعے جاری صدقہ۔ اللہ ان پر رحم فرمائے۔",
    locale: "ur_PK",
    ogTitle: "کی جاری صدقہ | مشاری احمد سلیمان العبرہ",
    ogDescription: "مشاری احمد سلیمان العبرہ کے لیے خراج عقیدت - قرآن، دعاؤں اور نیک اعمال کے ذریعے جاری صدقہ۔ اللہ ان پر رحم فرمائے۔",
    twitterTitle: "کی جاری صدقہ | مشاری احمد سلیمان العبرہ",
    twitterDescription: "مشاری احمد سلیمان العبرہ کے لیے خراج عقیدت - قرآن، دعاؤں اور نیک اعمال کے ذریعے جاری صدقہ۔ اللہ ان پر رحم فرمائے۔"
  },
  tr: {
    title: "nin Sürekli Hayır İşi | Meshari Ahmed Sulaiman Alabra",
    description: "Meshari Ahmed Sulaiman Alabra'ya saygı - Kuran, dualar ve iyilikler yoluyla sürekli hayır işi. Allah ona merhamet etsin.",
    locale: "tr_TR",
    ogTitle: "nin Sürekli Hayır İşi | Meshari Ahmed Sulaiman Alabra",
    ogDescription: "Meshari Ahmed Sulaiman Alabra'ya saygı - Kuran, dualar ve iyilikler yoluyla sürekli hayır işi. Allah ona merhamet etsin.",
    twitterTitle: "Meshari'nin Sürekli Hayır İşi | Meshari Ahmed Sulaiman Alabra",
    twitterDescription: "Meshari Ahmed Sulaiman Alabra'ya saygı - Kuran, dualar ve iyilikler yoluyla sürekli hayır işi. Allah ona merhamet etsin."
  },
  id: {
    title: "Amal Jariyah | Meshari Ahmed Sulaiman Alabra",
    description: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Amal jariyah melalui Al-Quran, doa, dan perbuatan baik. Semoga Allah merahmatinya.",
    locale: "id_ID",
    ogTitle: "Amal Jariyah | Meshari Ahmed Sulaiman Alabra",
    ogDescription: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Amal jariyah melalui Al-Quran, doa, dan perbuatan baik. Semoga Allah merahmatinya.",
    twitterTitle: "Amal Jariyah | Meshari Ahmed Sulaiman Alabra",
    twitterDescription: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Amal jariyah melalui Al-Quran, doa, dan perbuatan baik. Semoga Allah merahmatinya."
  },
  ms: {
    title: "Amal Jariyah | Meshari Ahmed Sulaiman Alabra",
    description: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Amal jariyah melalui Al-Quran, doa, dan perbuatan baik. Semoga Allah merahmatinya.",
    locale: "ms_MY",
    ogTitle: "Amal Jariyah | Meshari Ahmed Sulaiman Alabra",
    ogDescription: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Amal jariyah melalui Al-Quran, doa, dan perbuatan baik. Semoga Allah merahmatinya.",
    twitterTitle: "Amal Jariyah | Meshari Ahmed Sulaiman Alabra",
    twitterDescription: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Amal jariyah melalui Al-Quran, doa, dan perbuatan baik. Semoga Allah merahmatinya."
  },
  bn: {
    title: "মেশারির চলমান দান | মেশারি আহমেদ সুলাইমান আল-আবরা",
    description: "মেশারি আহমেদ সুলাইমান আল-আবরাকে শ্রদ্ধা - কুরআন, দোয়া ও সৎকর্মের মাধ্যমে চলমান দান। আল্লাহ তাকে রহম করুন।",
    locale: "bn_BD",
    ogTitle: "মেশারির চলমান দান | মেশারি আহমেদ সুলাইমান আল-আবরা",
    ogDescription: "মেশারি আহমেদ সুলাইমান আল-আবরাকে শ্রদ্ধা - কুরআন, দোয়া ও সৎকর্মের মাধ্যমে চলমান দান। আল্লাহ তাকে রহম করুন।",
    twitterTitle: "মেশারির চলমান দান | মেশারি আহমেদ সুলাইমান আল-আবরা",
    twitterDescription: "মেশারি আহমেদ সুলাইমান আল-আবরাকে শ্রদ্ধা - কুরআন, দোয়া ও সৎকর্মের মাধ্যমে চলমান দান। আল্লাহ তাকে রহম করুন।"
  },
  fr: {
    title: "Charité Continue | Meshari Ahmed Sulaiman Alabra",
    description: "Hommage à Meshari Ahmed Sulaiman Alabra - Charité continue par le Coran, les supplications et les bonnes œuvres. Qu'Allah ait pitié de lui.",
    locale: "fr_FR",
    ogTitle: "Charité Continue | Meshari Ahmed Sulaiman Alabra",
    ogDescription: "Hommage à Meshari Ahmed Sulaiman Alabra - Charité continue par le Coran, les supplications et les bonnes œuvres. Qu'Allah ait pitié de lui.",
    twitterTitle: "Charité Continue | Meshari Ahmed Sulaiman Alabra",
    twitterDescription: "Hommage à Meshari Ahmed Sulaiman Alabra - Charité continue par le Coran, les supplications et les bonnes œuvres. Qu'Allah ait pitié de lui."
  },
  zh: {
    title: "的持续慈善 | Meshari Ahmed Sulaiman Alabra",
    description: "向Meshari Ahmed Sulaiman Alabra致敬 - 通过古兰经、祈祷和善行进行持续慈善。愿真主怜悯他。",
    locale: "zh_CN",
    ogTitle: "的持续慈善 | Meshari Ahmed Sulaiman Alabra",
    ogDescription: "向Meshari Ahmed Sulaiman Alabra致敬 - 通过古兰经、祈祷和善行进行持续慈善。愿真主怜悯他。",
    twitterTitle: "的持续慈善 | Meshari Ahmed Sulaiman Alabra",
    twitterDescription: "向Meshari Ahmed Sulaiman Alabra致敬 - 通过古兰经、祈祷和善行进行持续慈善。愿真主怜悯他。"
  },
  it: {
    title: "Carità Continua | Meshari Ahmed Sulaiman Alabra",
    description: "Omaggio a Meshari Ahmed Sulaiman Alabra - Carità continua attraverso il Corano, le suppliche e le buone azioni. Che Allah abbia pietà di lui.",
    locale: "it_IT",
    ogTitle: "Carità Continua | Meshari Ahmed Sulaiman Alabra",
    ogDescription: "Omaggio a Meshari Ahmed Sulaiman Alabra - Carità continua attraverso il Corano, le suppliche e le buone azioni. Che Allah abbia pietà di lui.",
    twitterTitle: "Carità Continua | Meshari Ahmed Sulaiman Alabra",
    twitterDescription: "Omaggio a Meshari Ahmed Sulaiman Alabra - Carità continua attraverso il Corano, le suppliche e le buone azioni. Che Allah abbia pietà di lui."
  },
  ja: {
    title: "の継続的慈善 | Meshari Ahmed Sulaiman Alabra",
    description: "Meshari Ahmed Sulaiman Alabraへの敬意 - コーラン、祈り、善行による継続的な慈善。アッラーが彼を憐れんでくださいますように。",
    locale: "ja_JP",
    ogTitle: "の継続的慈善 | Meshari Ahmed Sulaiman Alabra",
    ogDescription: "Meshari Ahmed Sulaiman Alabraへの敬意 - コーラン、祈り、善行による継続的な慈善。アッラーが彼を憐れんでくださいますように。",
    twitterTitle: "の継続的慈善 | Meshari Ahmed Sulaiman Alabra",
    twitterDescription: "Meshari Ahmed Sulaiman Alabraへの敬意 - コーラン、祈り、善行による継続的な慈善。アッラーが彼を憐れんでくださいますように。"
  },
  ko: {
    title: "의 지속적인 자선 | Meshari Ahmed Sulaiman Alabra",
    description: "Meshari Ahmed Sulaiman Alabra에게 경의를 표합니다 - 꾸란, 기도, 선행을 통한 지속적인 자선. 알라가 그를 자비롭게 여기시기를.",
    locale: "ko_KR",
    ogTitle: "의 지속적인 자선 | Meshari Ahmed Sulaiman Alabra",
    ogDescription: "Meshari Ahmed Sulaiman Alabra에게 경의를 표합니다 - 꾸란, 기도, 선행을 통한 지속적인 자선. 알라가 그를 자비롭게 여기시기를.",
    twitterTitle: "의 지속적인 자선 | Meshari Ahmed Sulaiman Alabra",
    twitterDescription: "Meshari Ahmed Sulaiman Alabra에게 경의를 표합니다 - 꾸란, 기도, 선행을 통한 지속적인 자선. 알라가 그를 자비롭게 여기시기를."
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const meta = languageMetadata[lang as keyof typeof languageMetadata] || languageMetadata.ar;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity';
  const currentUrl = lang === 'ar' ? siteUrl : `${siteUrl}/${lang}`;

  // Import keywords from metadata.ts
  const { generateMetadata: generateMainMetadata } = await import('@/lib/metadata');
  const fullMetadata = generateMainMetadata(lang);

  return {
    title: meta.title,
    description: meta.description,
    keywords: fullMetadata.keywords,
    authors: fullMetadata.authors,
    creator: fullMetadata.creator,
    publisher: fullMetadata.publisher,
    metadataBase: fullMetadata.metadataBase,
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: currentUrl,
      siteName: "Meshari's Ongoing Charity",
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.ogTitle,
          type: 'image/png',
        },
      ],
      locale: meta.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.twitterTitle,
      description: meta.twitterDescription,
      images: [`${siteUrl}/og-image.png`],
      site: '@alabrameshari',
      creator: '@alabrameshari',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'ar': '/',
        'en': '/en',
        'tr': '/tr',
        'ur': '/ur',
        'id': '/id',
        'ms': '/ms',
        'bn': '/bn',
        'fr': '/fr',
        'zh': '/zh',
        'it': '/it',
        'ja': '/ja',
        'ko': '/ko',
        'x-default': '/',
      },
    },
  };
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
  const initialLanguage = supportedLanguages.includes(lang) ? lang : 'ar';
  const isRTL = ['ar', 'he', 'fa', 'ur', 'yi', 'ps'].includes(initialLanguage);

  return (
    <html lang={initialLanguage} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icons/icon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://api.aladhan.com" />
        <link rel="dns-prefetch" href="https://api.alquran.cloud" />
        <link rel="dns-prefetch" href="https://api.quran.com" />
        <link rel="dns-prefetch" href="https://ipapi.co" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        
        {/* Don't prefetch sections in head - let client-side handle it to avoid blocking */}

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4AF37" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Meshari's Charity" />
        <meta name="application-name" content="Meshari's Charity" />
        <meta name="msapplication-TileColor" content="#D4AF37" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Load critical fonts with display=swap for performance */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
          media="print"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
          media="screen"
        />
        
        {/* Load Arabic fonts for Quran text with display=swap - defer non-critical */}
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Scheherazade+New:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          media="print"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Scheherazade+New:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          media="screen"
        />

        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* Theme Meta Tags for Cross-Browser Compatibility */}
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#D4AF37" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0F172A" media="(prefers-color-scheme: dark)" />
        <meta name="msapplication-navbutton-color" content="#D4AF37" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Hreflang for Global SEO */}
        <link rel="alternate" hrefLang="ar" href="https://meshari.charity/" />
        <link rel="alternate" hrefLang="en" href="https://meshari.charity/en" />
        <link rel="alternate" hrefLang="tr" href="https://meshari.charity/tr" />
        <link rel="alternate" hrefLang="ur" href="https://meshari.charity/ur" />
        <link rel="alternate" hrefLang="id" href="https://meshari.charity/id" />
        <link rel="alternate" hrefLang="ms" href="https://meshari.charity/ms" />
        <link rel="alternate" hrefLang="bn" href="https://meshari.charity/bn" />
        <link rel="alternate" hrefLang="fr" href="https://meshari.charity/fr" />
        <link rel="alternate" hrefLang="zh" href="https://meshari.charity/zh" />
        <link rel="alternate" hrefLang="it" href="https://meshari.charity/it" />
        <link rel="alternate" hrefLang="ja" href="https://meshari.charity/ja" />
        <link rel="alternate" hrefLang="ko" href="https://meshari.charity/ko" />
        <link rel="alternate" hrefLang="x-default" href="https://meshari.charity/" />
        
        {/* Theme and Language Script for Instant Application */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Set theme
                  const theme = localStorage.getItem('theme') || 'dark';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const finalTheme = theme === 'system' ? systemTheme : theme;
                  
                  if (finalTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                  
                  // Set language from URL
                  const pathSegments = window.location.pathname.split('/').filter(Boolean);
                  const urlLang = pathSegments[0];
                  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
                  
                  if (urlLang && supportedLanguages.includes(urlLang)) {
                    document.documentElement.lang = urlLang;
                    document.documentElement.dir = ['ar', 'he', 'fa', 'ur', 'yi', 'ps'].includes(urlLang) ? 'rtl' : 'ltr';
                  } else {
                    document.documentElement.lang = 'ar';
                    document.documentElement.dir = 'rtl';
                  }
                  
                } catch (e) {
                  // Fallback to dark theme and Arabic
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                  document.documentElement.lang = 'ar';
                  document.documentElement.dir = 'rtl';
                }
              })();
              
            `,
          }}
        />
        
        <SEOScripts />
        
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <LanguageProvider initialLocale={initialLanguage}>
              <DynamicMetaTags />
              {children}
              <AudioPlayer />
              <LocalSchemaMarkup />
              <AdvancedSEO />
              {/* Temporarily disabled to fix navigation removeChild errors */}
              {/* <PerformanceOptimizer /> */}
              {/* <AccessibilityOptimizer /> */}
              <MetaOptimizer />
              <AnalyticsWrapper />
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
