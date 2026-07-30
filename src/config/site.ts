import type { CSSProperties } from "react";

const defaultSiteUrl = "https://meshari.charity";

export const SUPPORTED_LOCALES = [
  "ar",
  "en",
  "ur",
  "tr",
  "id",
  "ms",
  "bn",
  "fr",
  "zh",
  "it",
  "ja",
  "ko",
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const RTL_LOCALES = new Set<SupportedLocale>(["ar", "ur"]);

export function isSupportedLocale(value: string): value is SupportedLocale {
  return SUPPORTED_LOCALES.includes(value as SupportedLocale);
}

export function localeDirection(locale: SupportedLocale): "ltr" | "rtl" {
  return RTL_LOCALES.has(locale) ? "rtl" : "ltr";
}

function normalizedUrl(value: string) {
  return value.replace(/\/$/, "");
}

function optional(value: string | undefined) {
  return value?.trim() || undefined;
}

function colorWithOpacity(value: string, opacity: number) {
  const hex = value.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  if (!hex) return `color-mix(in srgb, ${value} ${opacity * 100}%, transparent)`;
  return `rgba(${parseInt(hex[1], 16)}, ${parseInt(hex[2], 16)}, ${parseInt(hex[3], 16)}, ${opacity})`;
}

function colorChannels(value: string) {
  const hex = value.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  if (!hex) return "0 0 0";
  return `${parseInt(hex[1], 16)} ${parseInt(hex[2], 16)} ${parseInt(hex[3], 16)}`;
}

type TranslationOverrides = Partial<Record<string, Record<string, string>>>;

// Override any key from src/locales/*.json here without editing components.
// Example: { en: { "hero.description": "Your custom message" } }
const translationOverrides: TranslationOverrides = {};

/**
 * Central white-label configuration.
 *
 * Fork owners can edit the defaults here or set the matching NEXT_PUBLIC_*
 * variables from .env.example without touching application components.
 */
export const siteConfig = {
  identity: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || "Meshari's Ongoing Charity - صدقة جارية لمشاري",
    shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME || "Meshari's Charity",
    organizationName: process.env.NEXT_PUBLIC_ORGANIZATION_NAME || "Meshari's Ongoing Charity",
    siteUrl: normalizedUrl(process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl),
    defaultLocale: isSupportedLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "")
      ? process.env.NEXT_PUBLIC_DEFAULT_LOCALE as SupportedLocale
      : "ar",
    direction: (process.env.NEXT_PUBLIC_DEFAULT_DIRECTION || "rtl") as "ltr" | "rtl",
  },
  assets: {
    logo: process.env.NEXT_PUBLIC_LOGO_PATH || "/icons/icon-512x512.png",
    favicon: process.env.NEXT_PUBLIC_FAVICON_PATH || "/favicon.svg",
    appleTouchIcon: process.env.NEXT_PUBLIC_APPLE_TOUCH_ICON_PATH || "/icons/apple-icon-180.png",
    pwaIcon192: process.env.NEXT_PUBLIC_PWA_ICON_192_PATH || "/icons/icon-192x192.png",
    pwaIcon512: process.env.NEXT_PUBLIC_PWA_ICON_512_PATH || "/icons/icon-512x512.png",
    pwaMaskableIcon: process.env.NEXT_PUBLIC_PWA_MASKABLE_ICON_PATH || "/icons/icon-maskable-512x512.png",
    openGraphImage: process.env.NEXT_PUBLIC_OG_IMAGE_PATH || "/og-image.png",
    supplicationsPdf: process.env.NEXT_PUBLIC_SUPPLICATIONS_PDF_PATH || "/mehsari (دعاء).pdf",
  },
  seo: {
    // Leave title/description unset to retain the built-in localized metadata.
    title: optional(process.env.NEXT_PUBLIC_SEO_TITLE),
    description: optional(process.env.NEXT_PUBLIC_SEO_DESCRIPTION),
    keywords: optional(process.env.NEXT_PUBLIC_SEO_KEYWORDS)?.split(",").map((keyword) => keyword.trim()),
    socialHandle: process.env.NEXT_PUBLIC_SOCIAL_HANDLE || "@alabrameshari",
  },
  pwa: {
    id: process.env.NEXT_PUBLIC_PWA_ID || "/",
    display: "standalone" as const,
    startUrl: process.env.NEXT_PUBLIC_PWA_START_URL || "/",
  },
  content: {
    // Optional global overrides. Empty values continue using localized translations.
    memorialLegalName: process.env.NEXT_PUBLIC_MEMORIAL_LEGAL_NAME || "Meshari Ahmed Sulaiman Alabra",
    memorialName: optional(process.env.NEXT_PUBLIC_MEMORIAL_NAME),
    memorialAlternateName: process.env.NEXT_PUBLIC_MEMORIAL_ALTERNATE_NAME || "مشاري بن أحمد بن سليمان العبره",
    memorialDeathDate: process.env.NEXT_PUBLIC_MEMORIAL_DEATH_DATE || "2023-03-29",
    memorialDate: optional(process.env.NEXT_PUBLIC_MEMORIAL_DATE_TEXT),
    heroDescription: optional(process.env.NEXT_PUBLIC_HERO_DESCRIPTION),
    footerCharity: optional(process.env.NEXT_PUBLIC_FOOTER_CHARITY_TEXT),
    donationUrl: process.env.NEXT_PUBLIC_DONATION_URL || "https://ehsan.sa/campaign/6FC11E15DA",
    quranPlaylistId: process.env.NEXT_PUBLIC_QURAN_PLAYLIST_ID || "PLozaqJ9egxJegXbK52PNLLlvWf4K5g-Cb",
    quranPlaylistStartVideoId: process.env.NEXT_PUBLIC_QURAN_PLAYLIST_START_VIDEO_ID || "VXb36Nzybps",
    favoriteReciterPlaylistId: process.env.NEXT_PUBLIC_FAVORITE_RECITER_PLAYLIST_ID || "PLA3B14EC1634EA167",
    favoriteReciterStartVideoId: process.env.NEXT_PUBLIC_FAVORITE_RECITER_START_VIDEO_ID || "VzsvG9K1qqQ",
    islamicChantVideoId: process.env.NEXT_PUBLIC_ISLAMIC_CHANT_VIDEO_ID || "1yP3UPr-L20",
    translations: translationOverrides,
  },
  fallbackLocation: {
    latitude: Number(process.env.NEXT_PUBLIC_FALLBACK_LATITUDE) || 24.7136,
    longitude: Number(process.env.NEXT_PUBLIC_FALLBACK_LONGITUDE) || 46.6753,
    city: process.env.NEXT_PUBLIC_FALLBACK_CITY || "Riyadh",
    country: process.env.NEXT_PUBLIC_FALLBACK_COUNTRY || "Saudi Arabia",
    countryCode: process.env.NEXT_PUBLIC_FALLBACK_COUNTRY_CODE || "SA",
    prayerTimes: {
      Fajr: process.env.NEXT_PUBLIC_FALLBACK_FAJR || "5:15 AM",
      Sunrise: process.env.NEXT_PUBLIC_FALLBACK_SUNRISE || "6:30 AM",
      Dhuhr: process.env.NEXT_PUBLIC_FALLBACK_DHUHR || "12:00 PM",
      Asr: process.env.NEXT_PUBLIC_FALLBACK_ASR || "3:30 PM",
      Maghrib: process.env.NEXT_PUBLIC_FALLBACK_MAGHRIB || "6:00 PM",
      Isha: process.env.NEXT_PUBLIC_FALLBACK_ISHA || "7:30 PM",
    },
  },
  social: {
    links: (process.env.NEXT_PUBLIC_SOCIAL_LINKS || "https://x.com/alabrameshari,https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity")
      .split(",")
      .map((link) => link.trim())
      .filter(Boolean),
  },
  analytics: {
    // Enable explicitly on Vercel; self-hosted builds otherwise request missing /_vercel scripts.
    vercelEnabled: process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === "true",
  },
  colors: {
    brand: process.env.NEXT_PUBLIC_COLOR_BRAND || "#D4AF37",
    accent: process.env.NEXT_PUBLIC_COLOR_ACCENT || "#006B3F",
    link: process.env.NEXT_PUBLIC_COLOR_LINK || "#0066B2",
    backgroundDark: process.env.NEXT_PUBLIC_COLOR_BACKGROUND_DARK || "#0F172A",
    backgroundDarkSecondary: process.env.NEXT_PUBLIC_COLOR_BACKGROUND_DARK_SECONDARY || "#1E293B",
    backgroundDarkAccent: process.env.NEXT_PUBLIC_COLOR_BACKGROUND_DARK_ACCENT || "#334155",
    backgroundLight: process.env.NEXT_PUBLIC_COLOR_BACKGROUND_LIGHT || "#FAF8F3",
    backgroundLightSecondary: process.env.NEXT_PUBLIC_COLOR_BACKGROUND_LIGHT_SECONDARY || "#F5F3EE",
    backgroundLightAccent: process.env.NEXT_PUBLIC_COLOR_BACKGROUND_LIGHT_ACCENT || "#E8E5DD",
  },
} as const;

export const siteCssVariables = {
  "--color-brand": siteConfig.colors.brand,
  "--color-brand-rgb": colorChannels(siteConfig.colors.brand),
  "--color-brand-border": colorWithOpacity(siteConfig.colors.brand, 0.3),
  "--color-accent": siteConfig.colors.accent,
  "--color-accent-rgb": colorChannels(siteConfig.colors.accent),
  "--color-link": siteConfig.colors.link,
  "--color-link-rgb": colorChannels(siteConfig.colors.link),
  "--color-background-dark": siteConfig.colors.backgroundDark,
  "--color-background-dark-rgb": colorChannels(siteConfig.colors.backgroundDark),
  "--color-background-dark-secondary": siteConfig.colors.backgroundDarkSecondary,
  "--color-background-dark-secondary-rgb": colorChannels(siteConfig.colors.backgroundDarkSecondary),
  "--color-background-dark-accent": siteConfig.colors.backgroundDarkAccent,
  "--color-background-dark-accent-rgb": colorChannels(siteConfig.colors.backgroundDarkAccent),
  "--color-background-light": siteConfig.colors.backgroundLight,
  "--color-background-light-rgb": colorChannels(siteConfig.colors.backgroundLight),
  "--color-background-light-secondary": siteConfig.colors.backgroundLightSecondary,
  "--color-background-light-secondary-rgb": colorChannels(siteConfig.colors.backgroundLightSecondary),
  "--color-background-light-accent": siteConfig.colors.backgroundLightAccent,
  "--color-background-light-accent-rgb": colorChannels(siteConfig.colors.backgroundLightAccent),
} as CSSProperties;

export function siteAssetUrl(path: string) {
  return path.startsWith("http") ? path : `${siteConfig.identity.siteUrl}${path}`;
}
