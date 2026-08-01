import type { Metadata } from "next";
import {
  SUPPORTED_LOCALES,
  isSupportedLocale,
  siteAssetUrl,
  siteConfig,
  type SupportedLocale,
} from "@/config/site";
import {
  getStoryBySlug,
  getStoryDescription,
  getStoryPdfPath,
  getStoryTitle,
  isStoryPdfFallback,
  localizedStoryHref,
  type QuranStoryDefinition,
  type StorySlug,
} from "@/content/stories";
import { translate } from "@/lib/translations";

const localeMap: Record<SupportedLocale, string> = {
  ar: "ar_SA",
  en: "en_US",
  ur: "ur_PK",
  tr: "tr_TR",
  id: "id_ID",
  ms: "ms_MY",
  bn: "bn_BD",
  fr: "fr_FR",
  zh: "zh_CN",
  it: "it_IT",
  ja: "ja_JP",
  ko: "ko_KR",
  es: "es_ES",
  pt: "pt_PT",
  hi: "hi_IN",
};

function storyAlternates(slug: string) {
  return Object.fromEntries([
    ...SUPPORTED_LOCALES.map((locale) => [
      locale,
      `${siteConfig.identity.siteUrl}${localizedStoryHref(locale, slug)}`,
    ]),
    [
      "x-default",
      `${siteConfig.identity.siteUrl}${localizedStoryHref(siteConfig.identity.defaultLocale, slug)}`,
    ],
  ]);
}

function getStorySeo(slug: StorySlug, locale: SupportedLocale) {
  const story = getStoryBySlug(slug);
  const uiTitle = story ? getStoryTitle(story, locale) : slug;
  const uiDescription = story ? getStoryDescription(story, locale) : "";
  const siteName = siteConfig.identity.shortName;
  const seoTitleKey = `seo.quran_stories.${slug}.title`;
  const seoDescriptionKey = `seo.quran_stories.${slug}.description`;
  const seoTitle = translate(locale, seoTitleKey);
  const seoDescription = translate(locale, seoDescriptionKey);

  const title =
    seoTitle !== seoTitleKey
      ? `${seoTitle.split("|")[0].trim()} | ${siteName}`
      : `${uiTitle} | ${siteName}`;

  return {
    title,
    description: seoDescription !== seoDescriptionKey ? seoDescription : uiDescription,
    uiTitle,
  };
}

export function generateStoryMetadata(slug: string, lang: string): Metadata {
  const story = getStoryBySlug(slug);
  if (!story) return {};

  const locale: SupportedLocale = isSupportedLocale(lang)
    ? lang
    : siteConfig.identity.defaultLocale;
  const { title, description, uiTitle } = getStorySeo(story.slug, locale);
  const canonicalUrl = `${siteConfig.identity.siteUrl}${localizedStoryHref(locale, slug)}`;
  const pdfUrl = `${siteConfig.identity.siteUrl}${getStoryPdfPath(story, locale)}`;

  return {
    title,
    description,
    keywords: [
      uiTitle,
      description,
      siteConfig.identity.shortName,
      siteConfig.content.memorialLegalName,
      story.surahName?.en,
      story.surahName?.ar,
      locale === "ar" ? "قصص القرآن" : "Quran stories",
    ].filter(Boolean) as string[],
    alternates: {
      canonical: canonicalUrl,
      languages: storyAlternates(slug),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.identity.name,
      locale: localeMap[locale],
      type: "article",
      images: [
        {
          url: siteAssetUrl(siteConfig.assets.openGraphImage),
          width: 1200,
          height: 630,
          alt: uiTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteAssetUrl(siteConfig.assets.openGraphImage)],
    },
    other: {
      citation_pdf_url: pdfUrl,
    },
  };
}

export function generateStorySchema(story: QuranStoryDefinition, locale: SupportedLocale) {
  const title = getStoryTitle(story, locale);
  const description = getStoryDescription(story, locale);
  const url = `${siteConfig.identity.siteUrl}${localizedStoryHref(locale, story.slug)}`;
  const pdfUrl = `${siteConfig.identity.siteUrl}${getStoryPdfPath(story, locale)}`;
  const siteUrl = siteConfig.identity.siteUrl;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description,
        inLanguage: locale,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntityOfPage: url,
        url,
        author: {
          "@type": "Organization",
          name: siteConfig.identity.organizationName,
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.identity.organizationName,
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: siteAssetUrl(siteConfig.assets.logo),
          },
        },
        about: story.surahName
          ? {
              "@type": "Thing",
              name: story.surahName[locale === "ar" ? "ar" : "en"] || story.surahName.en,
            }
          : undefined,
      },
      {
        "@type": ["Book", "DigitalDocument"],
        "@id": `${url}#document`,
        name: title,
        description,
        inLanguage: isStoryPdfFallback(story.slug, locale) ? "ar" : locale,
        url: pdfUrl,
        encodingFormat: "application/pdf",
        isPartOf: { "@id": `${url}#article` },
        author: {
          "@type": "Organization",
          name: siteConfig.identity.organizationName,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteConfig.identity.shortName,
            item: `${siteUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: translate(locale, "quran_stories.title"),
            item: `${siteUrl}/${locale}/stories`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: url,
          },
        ],
      },
    ],
  };
}

export function generateStoriesIndexMetadata(lang: string): Metadata {
  const locale: SupportedLocale = isSupportedLocale(lang)
    ? lang
    : siteConfig.identity.defaultLocale;
  const siteName = siteConfig.identity.shortName;
  const seoTitleKey = "seo.quran_stories.title";
  const seoDescriptionKey = "seo.quran_stories.description";
  const seoTitle = translate(locale, seoTitleKey);
  const seoDescription = translate(locale, seoDescriptionKey);
  const uiTitle = translate(locale, "quran_stories.title");
  const uiDescription = translate(locale, "quran_stories.description");

  const title =
    seoTitle !== seoTitleKey
      ? `${seoTitle.split("|")[0].trim()} | ${siteName}`
      : `${uiTitle} | ${siteName}`;
  const description =
    seoDescription !== seoDescriptionKey ? seoDescription : uiDescription;
  const canonicalUrl = `${siteConfig.identity.siteUrl}/${locale}/stories`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries([
        ...SUPPORTED_LOCALES.map((item) => [
          item,
          `${siteConfig.identity.siteUrl}/${item}/stories`,
        ]),
        [
          "x-default",
          `${siteConfig.identity.siteUrl}/${siteConfig.identity.defaultLocale}/stories`,
        ],
      ]),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.identity.name,
      locale: localeMap[locale],
      type: "website",
    },
  };
}
