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
import {
  enrichMemorialDescription,
  formatMemorialTitle,
  getSectionKeywords,
  memorialLegalName,
  seoLead,
} from "@/lib/seo";

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
  'quran-stories': { title: 'quran_stories.title', subtitle: 'quran_stories.description' },
};

/** SEO locale keys when the section id uses hyphens but JSON keys use underscores. */
const sectionSeoKeys: Partial<Record<SectionId, { title: string; description: string }>> = {
  'quran-stories': {
    title: 'seo.quran_stories.title',
    description: 'seo.quran_stories.description',
  },
};

const sectionSchemaType: Record<SectionId, string> = {
  quran: "WebApplication",
  tafseer: "WebPage",
  dhikr: "WebApplication",
  "prayer-times": "WebApplication",
  qibla: "WebApplication",
  donation: "WebPage",
  supplications: "WebPage",
  hadith: "WebPage",
  youtube: "CollectionPage",
  "quran-stories": "CollectionPage",
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

function getSectionSeo(sectionId: SectionId, locale: SupportedLocale) {
  const { title: uiTitle, description: uiDescription } = getSectionCopy(sectionId, locale);
  const seoKeys = sectionSeoKeys[sectionId];
  const seoTitleKey = seoKeys?.title ?? `seo.${sectionId}.title`;
  const seoDescriptionKey = seoKeys?.description ?? `seo.${sectionId}.description`;
  const seoTitle = translate(locale, seoTitleKey);
  const seoDescription = translate(locale, seoDescriptionKey);

  // Brand (localized charity + full name) | localized section topic/keywords.
  const localizedLead =
    seoTitle !== seoTitleKey ? seoLead(seoTitle, uiTitle) : uiTitle;
  const title = formatMemorialTitle(locale, localizedLead);
  const rawDescription =
    seoDescription !== seoDescriptionKey ? seoDescription : uiDescription;

  return {
    title,
    description: enrichMemorialDescription(rawDescription, locale),
    localizedLead,
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
  es: 'es_ES',
  pt: 'pt_PT',
  hi: 'hi_IN',
};

export function generateSectionMetadata(
  sectionId: SectionId,
  lang: string = 'ar'
): Metadata {
  const currentLang: SupportedLocale = isSupportedLocale(lang)
    ? lang
    : siteConfig.identity.defaultLocale;
  const { title, description, localizedLead } = getSectionSeo(sectionId, currentLang);
  const brandName = memorialLegalName();
  
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

  const allKeywords = getSectionKeywords(sectionId, currentLang, [
    title,
    localizedLead,
    siteConfig.identity.name,
  ]);

  return {
    title,
    description,
    keywords: allKeywords,
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
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.identity.name,
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
      title,
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
      'og:site_name': brandName,
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
  const { title, description, localizedLead } = getSectionSeo(sectionId, currentLang);
  const { title: sectionTitle } = getSectionCopy(sectionId, currentLang);
  const keywords = getSectionKeywords(sectionId, currentLang, [localizedLead, sectionTitle]);
  
  const siteUrl = siteConfig.identity.siteUrl;
  const url = `${siteUrl}/${currentLang}/sections/${sectionId}`;
  const schemaType = sectionSchemaType[sectionId];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': schemaType,
        '@id': `${url}#section`,
        name: title,
        headline: localizedLead,
        description,
        keywords: keywords.join(', '),
        url,
        inLanguage: currentLang,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#person` },
        mainEntityOfPage: url,
        image: siteAssetUrl(siteConfig.assets.openGraphImage),
        ...(schemaType === 'WebApplication'
          ? {
              applicationCategory: 'LifestyleApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
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
            name: sectionTitle,
            item: url,
          },
        ],
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: memorialLegalName(),
        alternateName: siteConfig.content.memorialAlternateName,
        deathDate: siteConfig.content.memorialDeathDate,
      },
    ],
  };
}

