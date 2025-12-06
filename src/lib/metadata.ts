import type { Metadata } from "next";

export interface LanguageMetadata {
  title: string;
  description: string;
  keywords: string[];
  locale: string;
  country: string;
  direction: 'ltr' | 'rtl';
  openGraph: {
    title: string;
    description: string;
    locale: string;
  };
  twitter: {
    title: string;
    description: string;
  };
  schema: {
    name: string;
    description: string;
    url: string;
    logo: string;
    sameAs: string[];
  };
}

export const languageMetadata: Record<string, LanguageMetadata> = {
  ar: {
    title: "صدقة جارية لمشاري - مشاري بن أحمد بن سليمان العبره",
    description: "صفحة مخصصة لأخي مشاري، توفي إثر مرض سرطان الدماغ. اللهم اغفر له وارحمه واجعل القرآن والصدقة الجارية شفيعاً له",
    keywords: [
      "مشاري العبره", "مشاري بن أحمد بن سليمان العبره", "صدقة جارية", "صدقة جارية لمشاري",
      "القرآن الكريم", "قراءة القرآن", "تلاوة القرآن", "تفسير القرآن",
      "الأدعية", "أدعية للميت", "أذكار", "ذكر الله",
      "مواقيت الصلاة", "أوقات الصلاة", "صلاة الفجر", "صلاة الظهر",
      "كفالة اليتيم", "كفالة أيتام", "تبرع", "خير", "إحسان",
      "الخير المستمر", "أحاديث نبوية", "السنة النبوية",
      "اتجاه القبلة", "القبلة", "مكة المكرمة",
      "إسلامي", "ديني", "خيرية", "صدقة", "زكاة"
    ],
    locale: "ar_SA",
    country: "SA",
    direction: "rtl",
    openGraph: {
      title: "صدقة جارية لمشاري - مشاري بن أحمد بن سليمان العبره",
      description: "صفحة مخصصة لأخي مشاري، توفي إثر مرض سرطان الدماغ. اللهم اغفر له وارحمه واجعل القرآن والصدقة الجارية شفيعاً له",
      locale: "ar_SA",
    },
    twitter: {
      title: "صدقة جارية لمشاري - مشاري بن أحمد بن سليمان العبره",
      description: "صفحة مخصصة لأخي مشاري، توفي إثر مرض سرطان الدماغ. اللهم اغفر له وارحمه واجعل القرآن والصدقة الجارية شفيعاً له",
    },
    schema: {
      name: "صدقة جارية لمشاري",
      description: "صفحة مخصصة لأخي مشاري، توفي إثر مرض سرطان الدماغ. اللهم اغفر له وارحمه واجعل القرآن والصدقة الجارية شفيعاً له",
      url: "https://meshari.charity/ar",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
  en: {
    title: "Meshari's Ongoing Charity - Meshari Ahmed Sulaiman Alabra",
    description: "A tribute to Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره) - Ongoing charity through Quran, supplications, and good deeds. May Allah have mercy on him.",
    keywords: [
      "Meshari Alabra", "Meshari Ahmed Sulaiman Alabra", "ongoing charity", "sadaqah jariyah",
      "Islamic charity", "charity website", "Muslim charity", "Islamic donation",
      "Quran", "Holy Quran", "Quran recitation", "Quran reading", "Quran verses",
      "Quran tafseer", "Quran exegesis", "Ibn Kathir", "Tabari",
      "supplications", "dua", "prayers", "dhikr", "remembrance of Allah",
      "prayer times", "salah times", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha",
      "orphan sponsorship", "orphan care", "donation", "charity", "sadaqah", "zakat",
      "Qibla direction", "Qibla compass", "Mecca", "Kaaba",
      "Hadith", "Prophetic traditions", "Sunnah", "Islamic hadith",
      "Islamic", "Muslim", "religious", "spiritual", "charity work"
    ],
    locale: "en_US",
    country: "US",
    direction: "ltr",
    openGraph: {
      title: "Meshari's Ongoing Charity - Meshari Ahmed Sulaiman Alabra",
      description: "A tribute to Meshari Ahmed Sulaiman Alabra - Ongoing charity through Quran, supplications, and good deeds",
      locale: "en_US",
    },
    twitter: {
      title: "Meshari's Ongoing Charity - Meshari Ahmed Sulaiman Alabra",
      description: "A tribute to Meshari Ahmed Sulaiman Alabra - Ongoing charity through Quran, supplications, and good deeds",
    },
    schema: {
      name: "Meshari's Ongoing Charity",
      description: "A tribute to Meshari Ahmed Sulaiman Alabra - Ongoing charity through Quran, supplications, and good deeds",
      url: "https://meshari.charity/en",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
  tr: {
    title: "Meshari'nin Sürekli Hayır İşi - Meshari Ahmed Sulaiman Alabra",
    description: "Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره) anısına - Kuran, dualar ve iyiliklerle sürekli hayır işi. Allah ona rahmet etsin.",
    keywords: ["Meshari Alabra", "sürekli hayır", "sadaka-i cariye", "İslami hayır", "Kuran", "dualar", "namaz vakitleri", "yetim sponsorluğu"],
    locale: "tr_TR",
    country: "TR",
    direction: "ltr",
    openGraph: {
      title: "Meshari'nin Sürekli Hayır İşi - Meshari Ahmed Sulaiman Alabra",
      description: "Meshari Ahmed Sulaiman Alabra anısına - Kuran, dualar ve iyiliklerle sürekli hayır işi",
      locale: "tr_TR",
    },
    twitter: {
      title: "Meshari'nin Sürekli Hayır İşi - Meshari Ahmed Sulaiman Alabra",
      description: "Meshari Ahmed Sulaiman Alabra anısına - Kuran, dualar ve iyiliklerle sürekli hayır işi",
    },
    schema: {
      name: "Meshari'nin Sürekli Hayır İşi",
      description: "Meshari Ahmed Sulaiman Alabra anısına - Kuran, dualar ve iyiliklerle sürekli hayır işi",
      url: "https://meshari.charity/tr",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
  ur: {
    title: "مشاری کی جاری صدقہ - مشاری احمد سلیمان العبرہ",
    description: "مشاری احمد سلیمان العبرہ (مشاري بن أحمد بن سليمان العبره) کی یاد میں - قرآن، دعاؤں اور نیکیوں کے ذریعے جاری صدقہ۔ اللہ ان پر رحم فرمائے۔",
    keywords: ["مشاری العبرہ", "جاری صدقہ", "صدقہ جاریہ", "اسلامی خیرات", "قرآن", "دعائیں", "نماز کے اوقات", "یتیم کی کفالت"],
    locale: "ur_PK",
    country: "PK",
    direction: "rtl",
    openGraph: {
      title: "مشاری کی جاری صدقہ - مشاری احمد سلیمان العبرہ",
      description: "مشاری احمد سلیمان العبرہ کی یاد میں - قرآن، دعاؤں اور نیکیوں کے ذریعے جاری صدقہ",
      locale: "ur_PK",
    },
    twitter: {
      title: "مشاری کی جاری صدقہ - مشاری احمد سلیمان العبرہ",
      description: "مشاری احمد سلیمان العبرہ کی یاد میں - قرآن، دعاؤں اور نیکیوں کے ذریعے جاری صدقہ",
    },
    schema: {
      name: "مشاری کی جاری صدقہ",
      description: "مشاری احمد سلیمان العبرہ کی یاد میں - قرآن، دعاؤں اور نیکیوں کے ذریعے جاری صدقہ",
      url: "https://meshari.charity/ur",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
  id: {
    title: "Sedekah Jariyah Meshari - Meshari Ahmed Sulaiman Alabra",
    description: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره) - Sedekah jariyah melalui Al-Quran, doa, dan amal baik. Semoga Allah merahmatinya.",
    keywords: ["Meshari Alabra", "sedekah jariyah", "sedekah berkelanjutan", "amal Islam", "Al-Quran", "doa", "waktu sholat", "sponsor anak yatim"],
    locale: "id_ID",
    country: "ID",
    direction: "ltr",
    openGraph: {
      title: "Sedekah Jariyah Meshari - Meshari Ahmed Sulaiman Alabra",
      description: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Sedekah jariyah melalui Al-Quran, doa, dan amal baik",
      locale: "id_ID",
    },
    twitter: {
      title: "Sedekah Jariyah Meshari - Meshari Ahmed Sulaiman Alabra",
      description: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Sedekah jariyah melalui Al-Quran, doa, dan amal baik",
    },
    schema: {
      name: "Sedekah Jariyah Meshari",
      description: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Sedekah jariyah melalui Al-Quran, doa, dan amal baik",
      url: "https://meshari.charity/id",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
  ms: {
    title: "Sedekah Jariyah Meshari - Meshari Ahmed Sulaiman Alabra",
    description: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره) - Sedekah jariyah melalui Al-Quran, doa, dan amal baik. Semoga Allah merahmatinya.",
    keywords: ["Meshari Alabra", "sedekah jariyah", "sedekah berterusan", "amal Islam", "Al-Quran", "doa", "waktu solat", "sponsor anak yatim"],
    locale: "ms_MY",
    country: "MY",
    direction: "ltr",
    openGraph: {
      title: "Sedekah Jariyah Meshari - Meshari Ahmed Sulaiman Alabra",
      description: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Sedekah jariyah melalui Al-Quran, doa, dan amal baik",
      locale: "ms_MY",
    },
    twitter: {
      title: "Sedekah Jariyah Meshari - Meshari Ahmed Sulaiman Alabra",
      description: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Sedekah jariyah melalui Al-Quran, doa, dan amal baik",
    },
    schema: {
      name: "Sedekah Jariyah Meshari",
      description: "Penghormatan untuk Meshari Ahmed Sulaiman Alabra - Sedekah jariyah melalui Al-Quran, doa, dan amal baik",
      url: "https://meshari.charity/ms",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
  bn: {
    title: "মেশারির চলমান সদকা - মেশারি আহমেদ সুলাইমান আল-আবরা",
    description: "মেশারি আহমেদ সুলাইমান আল-আবরা (مشاري بن أحمد بن سليمان العبره) এর প্রতি শ্রদ্ধা - কুরআন, দোয়া ও সৎকর্মের মাধ্যমে চলমান সদকা। আল্লাহ তাকে রহম করুন।",
    keywords: ["মেশারি আল-আবরা", "চলমান সদকা", "সদকায়ে জারিয়া", "ইসলামি দান", "কুরআন", "দোয়া", "নামাজের সময়", "এতিম স্পনসর"],
    locale: "bn_BD",
    country: "BD",
    direction: "ltr",
    openGraph: {
      title: "মেশারির চলমান সদকা - মেশারি আহমেদ সুলাইমান আল-আবরা",
      description: "মেশারি আহমেদ সুলাইমান আল-আবরা এর প্রতি শ্রদ্ধা - কুরআন, দোয়া ও সৎকর্মের মাধ্যমে চলমান সদকা",
      locale: "bn_BD",
    },
    twitter: {
      title: "মেশারির চলমান সদকা - মেশারি আহমেদ সুলাইমান আল-আবরা",
      description: "মেশারি আহমেদ সুলাইমান আল-আবরা এর প্রতি শ্রদ্ধা - কুরআন, দোয়া ও সৎকর্মের মাধ্যমে চলমান সদকা",
    },
    schema: {
      name: "মেশারির চলমান সদকা",
      description: "মেশারি আহমেদ সুলাইমান আল-আবরা এর প্রতি শ্রদ্ধা - কুরআন, দোয়া ও সৎকর্মের মাধ্যমে চলমান সদকা",
      url: "https://meshari.charity/bn",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
  fr: {
    title: "Aumône Continue de Meshari - Meshari Ahmed Sulaiman Alabra",
    description: "Hommage à Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره) - Aumône continue par le Coran, les supplications et les bonnes œuvres. Qu'Allah lui fasse miséricorde.",
    keywords: ["Meshari Alabra", "aumône continue", "sadaqa jariya", "charité islamique", "Coran", "supplications", "heures de prière", "parrainage d'orphelins"],
    locale: "fr_FR",
    country: "FR",
    direction: "ltr",
    openGraph: {
      title: "Aumône Continue de Meshari - Meshari Ahmed Sulaiman Alabra",
      description: "Hommage à Meshari Ahmed Sulaiman Alabra - Aumône continue par le Coran, les supplications et les bonnes œuvres",
      locale: "fr_FR",
    },
    twitter: {
      title: "Aumône Continue de Meshari - Meshari Ahmed Sulaiman Alabra",
      description: "Hommage à Meshari Ahmed Sulaiman Alabra - Aumône continue par le Coran, les supplications et les bonnes œuvres",
    },
    schema: {
      name: "Aumône Continue de Meshari",
      description: "Hommage à Meshari Ahmed Sulaiman Alabra - Aumône continue par le Coran, les supplications et les bonnes œuvres",
      url: "https://meshari.charity/fr",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
  zh: {
    title: "Meshari的持续慈善 - Meshari Ahmed Sulaiman Alabra",
    description: "纪念Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره) - 通过古兰经、祈祷和善行进行持续慈善。愿真主怜悯他。",
    keywords: ["Meshari Alabra", "持续慈善", "施舍", "伊斯兰慈善", "古兰经", "祈祷", "祈祷时间", "孤儿赞助"],
    locale: "zh_CN",
    country: "CN",
    direction: "ltr",
    openGraph: {
      title: "Meshari的持续慈善 - Meshari Ahmed Sulaiman Alabra",
      description: "纪念Meshari Ahmed Sulaiman Alabra - 通过古兰经、祈祷和善行进行持续慈善",
      locale: "zh_CN",
    },
    twitter: {
      title: "Meshari的持续慈善 - Meshari Ahmed Sulaiman Alabra",
      description: "纪念Meshari Ahmed Sulaiman Alabra - 通过古兰经、祈祷和善行进行持续慈善",
    },
    schema: {
      name: "Meshari的持续慈善",
      description: "纪念Meshari Ahmed Sulaiman Alabra - 通过古兰经、祈祷和善行进行持续慈善",
      url: "https://meshari.charity/zh",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
  it: {
    title: "Carità Continua di Meshari - Meshari Ahmed Sulaiman Alabra",
    description: "Omaggio a Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره) - Carità continua attraverso il Corano, le suppliche e le buone azioni. Che Allah abbia misericordia di lui.",
    keywords: ["Meshari Alabra", "carità continua", "sadaqa jariya", "carità islamica", "Corano", "suppliche", "orari di preghiera", "sponsorizzazione orfani"],
    locale: "it_IT",
    country: "IT",
    direction: "ltr",
    openGraph: {
      title: "Carità Continua di Meshari - Meshari Ahmed Sulaiman Alabra",
      description: "Omaggio a Meshari Ahmed Sulaiman Alabra - Carità continua attraverso il Corano, le suppliche e le buone azioni",
      locale: "it_IT",
    },
    twitter: {
      title: "Carità Continua di Meshari - Meshari Ahmed Sulaiman Alabra",
      description: "Omaggio a Meshari Ahmed Sulaiman Alabra - Carità continua attraverso il Corano, le suppliche e le buone azioni",
    },
    schema: {
      name: "Carità Continua di Meshari",
      description: "Omaggio a Meshari Ahmed Sulaiman Alabra - Carità continua attraverso il Corano, le suppliche e le buone azioni",
      url: "https://meshari.charity/it",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
  ja: {
    title: "Meshariの継続的慈善 - Meshari Ahmed Sulaiman Alabra",
    description: "Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره) への追悼 - コーラン、祈り、善行による継続的慈善。アッラーが彼に慈悲をかけられますように。",
    keywords: ["Meshari Alabra", "継続的慈善", "サダカ・ジャリヤ", "イスラム慈善", "コーラン", "祈り", "礼拝時間", "孤児支援"],
    locale: "ja_JP",
    country: "JP",
    direction: "ltr",
    openGraph: {
      title: "Meshariの継続的慈善 - Meshari Ahmed Sulaiman Alabra",
      description: "Meshari Ahmed Sulaiman Alabra への追悼 - コーラン、祈り、善行による継続的慈善",
      locale: "ja_JP",
    },
    twitter: {
      title: "Meshariの継続的慈善 - Meshari Ahmed Sulaiman Alabra",
      description: "Meshari Ahmed Sulaiman Alabra への追悼 - コーラン、祈り、善行による継続的慈善",
    },
    schema: {
      name: "Meshariの継続的慈善",
      description: "Meshari Ahmed Sulaiman Alabra への追悼 - コーラン、祈り、善行による継続的慈善",
      url: "https://meshari.charity/ja",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
  ko: {
    title: "Meshari의 지속적인 자선 - Meshari Ahmed Sulaiman Alabra",
    description: "Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره) 에 대한 추모 - 꾸란, 기도, 선행을 통한 지속적인 자선. 알라께서 그에게 자비를 베푸시길.",
    keywords: ["Meshari Alabra", "지속적인 자선", "사다카 자리야", "이슬람 자선", "꾸란", "기도", "예배 시간", "고아 후원"],
    locale: "ko_KR",
    country: "KR",
    direction: "ltr",
    openGraph: {
      title: "Meshari의 지속적인 자선 - Meshari Ahmed Sulaiman Alabra",
      description: "Meshari Ahmed Sulaiman Alabra 에 대한 추모 - 꾸란, 기도, 선행을 통한 지속적인 자선",
      locale: "ko_KR",
    },
    twitter: {
      title: "Meshari의 지속적인 자선 - Meshari Ahmed Sulaiman Alabra",
      description: "Meshari Ahmed Sulaiman Alabra 에 대한 추모 - 꾸란, 기도, 선행을 통한 지속적인 자선",
    },
    schema: {
      name: "Meshari의 지속적인 자선",
      description: "Meshari Ahmed Sulaiman Alabra 에 대한 추모 - 꾸란, 기도, 선행을 통한 지속적인 자선",
      url: "https://meshari.charity/ko",
      logo: "https://meshari.charity/icons/icon-512x512.png",
      sameAs: ["https://x.com/alabrameshari"],
    },
  },
};

export function generateMetadata(language: string = 'ar'): Metadata {
  const meta = languageMetadata[language] || languageMetadata.ar;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity';
  const canonicalUrl = language === 'ar' ? siteUrl : `${siteUrl}/${language}`;
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.join(', '),
    authors: [{ name: "In memory of Meshari Ahmed Sulaiman Alabra" }],
    creator: "Family of Meshari Alabra",
    publisher: "Meshari's Ongoing Charity",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
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
        'ko': '/ko'
      },
    },
    openGraph: {
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      url: language === 'ar' ? siteUrl : `${siteUrl}/${language}`,
      siteName: "Meshari's Ongoing Charity",
      images: [
        {
          url: `${siteUrl}/og-image?title=${encodeURIComponent(meta.title)}&description=${encodeURIComponent(meta.description)}&lang=${language}`,
          width: 1200,
          height: 630,
          alt: meta.title,
          type: "image/png",
        },
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
          type: "image/png",
        },
      ],
      locale: meta.openGraph.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.twitter.title,
      description: meta.twitter.description,
      images: [`${siteUrl}/og-image.png`],
      site: "@alabrameshari",
      creator: "@alabrameshari",
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
    // Additional SEO meta tags
    other: {
      'article:author': "Family of Meshari Alabra",
      'article:section': 'Islamic Charity',
      'article:tag': meta.keywords.slice(0, 10).join(', '),
      'geo.region': meta.country,
      'geo.placename': language === 'ar' ? 'الرياض' : 'Riyadh',
      'geo.position': '24.7136;46.6753',
      'ICBM': '24.7136, 46.6753',
      'language': language,
      'revisit-after': '7 days',
      'rating': 'general',
      'distribution': 'global',
      'audience': 'all',
      'copyright': `© ${new Date().getFullYear()} Meshari's Ongoing Charity`,
      'reply-to': 'info@meshari.charity',
      'author': 'Family of Meshari Alabra',
      'coverage': 'Worldwide',
      'target': 'all',
      'HandheldFriendly': 'true',
      'MobileOptimized': 'width',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icons/icon.svg", type: "image/svg+xml" },
        { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
        { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
        { url: "/icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
        { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
        { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
        { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Meshari's Charity",
    },
    formatDetection: {
      telephone: false,
    },
  };
}
