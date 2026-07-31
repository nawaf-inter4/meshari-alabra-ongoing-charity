import type { Metadata } from "next";
import {
  SUPPORTED_LOCALES,
  isSupportedLocale,
  siteAssetUrl,
  siteConfig,
  type SupportedLocale,
} from "@/config/site";
import { translate } from "@/lib/translations";
import { SECTION_IDS, isSectionId, type SectionId } from "@/lib/routes";

export { SECTION_IDS, isSectionId };
export type { SectionId };

const sectionKeys: Record<SectionId, { title: string; subtitle: string }> = {
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

export function getSectionCopy(sectionId: SectionId, locale: SupportedLocale) {
  const keys = sectionKeys[sectionId];
  const configuredTranslations = siteConfig.content.translations[locale] || {};
  const globalTranslations = siteConfig.content.translations["*"] || {};


  return {
    title:
      configuredTranslations[keys.title] ||
      globalTranslations[keys.title] ||
      translate(locale, keys.title),
    description:
      configuredTranslations[keys.subtitle] ||
      globalTranslations[keys.subtitle] ||
      translate(locale, keys.subtitle),
  };
}

const localeMap: Record<string, string> = {
  ar: 'ar_SA',
  en: 'en_US',
  ur: 'ur_PK',
  tr: 'tr_TR',
  id: 'id_ID',
  ms: 'ms_MY',
  bn: 'bn_BD',
  fr: 'fr_FR',
  zh: 'zh_CN',
  it: 'it_IT',
  ja: 'ja_JP',
  ko: 'ko_KR',
};

export function generateSectionMetadata(
  sectionId: SectionId,
  lang: string = 'ar'
): Metadata {
  const currentLang: SupportedLocale = isSupportedLocale(lang)
    ? lang
    : siteConfig.identity.defaultLocale;
  const { title, description } = getSectionCopy(sectionId, currentLang);
  const siteName = siteConfig.identity.shortName;
  
  const siteUrl = siteConfig.identity.siteUrl;
  const canonicalUrl = `${siteUrl}/${currentLang}/sections/${sectionId}`;
  
  // Generate alternate language URLs with proper hreflang
  const alternates = Object.fromEntries([
    ...SUPPORTED_LOCALES.map((locale) => [
      locale,
      `${siteUrl}/${locale}/sections/${sectionId}`,
    ]),
    [
      "x-default",
      `${siteUrl}/${siteConfig.identity.defaultLocale}/sections/${sectionId}`,
    ],
  ]);

  // Get comprehensive keywords for this section and language
  const sectionSpecificKeywords = siteConfig.seo.keywords || [];
  const baseKeywords = [
    title,
    description,
    siteName,
    siteConfig.content.memorialLegalName,
    currentLang === 'ar' ? 'صدقة جارية' : 'Ongoing Charity',
    siteConfig.identity.name,
  ];
  const allKeywords = [...baseKeywords, ...sectionSpecificKeywords].filter(Boolean);

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: allKeywords.join(', '),
    category: sectionId,
    authors: [{ name: siteConfig.identity.organizationName }],
    creator: siteConfig.identity.organizationName,
    publisher: siteConfig.identity.organizationName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: siteAssetUrl(siteConfig.assets.openGraphImage),
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
      ],
      locale: localeMap[currentLang] || 'ar_SA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      images: [siteAssetUrl(siteConfig.assets.openGraphImage)],
      site: siteConfig.seo.socialHandle,
      creator: siteConfig.seo.socialHandle,
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
    other: {
      'language': currentLang,
    },
  };
}

export function generateSectionSchema(
  sectionId: SectionId,
  lang: string = 'ar'
): object {
  const currentLang: SupportedLocale = isSupportedLocale(lang)
    ? lang
    : siteConfig.identity.defaultLocale;
  const { title, description } = getSectionCopy(sectionId, currentLang);
  const siteName = siteConfig.identity.shortName;
  
  const siteUrl = siteConfig.identity.siteUrl;
  const url = `${siteUrl}/${currentLang}/sections/${sectionId}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#section`,
    name: `${title} | ${siteName}`,
    description,
    url,
    inLanguage: currentLang,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: currentLang === 'ar' ? 'الرئيسية' : 'Home',
          item: `${siteUrl}/${currentLang}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: url,
        },
      ],
    },
    about: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: siteConfig.content.memorialLegalName,
    },
  };
}

