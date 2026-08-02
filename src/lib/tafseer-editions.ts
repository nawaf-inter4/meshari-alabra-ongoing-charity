export type TafseerLanguage =
  | "arabic"
  | "english"
  | "urdu"
  | "turkish"
  | "bengali"
  | "indonesian"
  | "french"
  | "chinese"
  | "italian"
  | "japanese"
  | "spanish"
  | "hindi"
  | "other";

export interface TafseerEdition {
  id: number;
  name: string;
  /** Display name localized for the UI when helpful */
  nameEn: string;
  slug: string;
  language: TafseerLanguage;
  author: string;
}

/**
 * spa5k/tafsir_api editions.
 * Prefer short Mokhtasar explanations where classical Ibn Kathir is unavailable.
 */
export const TAFSEER_EDITIONS: TafseerEdition[] = [
  { id: 14, name: "تفسير ابن كثير", nameEn: "Tafsir Ibn Kathir", slug: "ar-tafsir-ibn-kathir", language: "arabic", author: "Hafiz Ibn Kathir" },
  { id: 16, name: "تفسير الميسر", nameEn: "Tafsir Al-Muyassar", slug: "ar-tafsir-muyassar", language: "arabic", author: "Al Muyassar" },
  { id: 91, name: "تفسير السعدي", nameEn: "Tafsir As-Saadi", slug: "ar-tafseer-al-saddi", language: "arabic", author: "As-Saadi" },
  { id: 15, name: "تفسير الطبري", nameEn: "Tafsir At-Tabari", slug: "ar-tafsir-al-tabari", language: "arabic", author: "At-Tabari" },
  { id: 90, name: "تفسير القرطبي", nameEn: "Tafsir Al-Qurtubi", slug: "ar-tafseer-al-qurtubi", language: "arabic", author: "Al-Qurtubi" },

  { id: 169, name: "Tafsir Ibn Kathir", nameEn: "Tafsir Ibn Kathir", slug: "en-tafisr-ibn-kathir", language: "english", author: "Hafiz Ibn Kathir" },
  { id: 74, name: "Tafsir Al-Jalalayn", nameEn: "Tafsir Al-Jalalayn", slug: "en-al-jalalayn", language: "english", author: "Al-Jalalayn" },
  { id: 108, name: "Al Qushairi Tafsir", nameEn: "Al Qushairi Tafsir", slug: "en-al-qushairi-tafsir", language: "english", author: "Al Qushairi" },

  { id: 160, name: "تفسیر ابن کثیر", nameEn: "Tafsir Ibn Kathir (Urdu)", slug: "ur-tafseer-ibn-e-kaseer", language: "urdu", author: "Hafiz Ibn Kathir" },
  { id: 159, name: "بیان القرآن", nameEn: "Bayan ul Quran", slug: "ur-tafsir-bayan-ul-quran", language: "urdu", author: "Dr. Israr Ahmad" },

  { id: 201, name: "İbn Kesir Tefsiri", nameEn: "Tafsir Ibn Kathir (Turkish)", slug: "tr-tafsir-ibne-kathir", language: "turkish", author: "Hafiz Ibn Kathir" },
  { id: 202, name: "Muhtasar Tefsir", nameEn: "Turkish Mokhtasar", slug: "turkish-mokhtasar", language: "turkish", author: "Mokhtasar" },

  { id: 210, name: "তাফসীর ইবনে কাসীর", nameEn: "Tafsir Ibn Kathir (Bengali)", slug: "bn-tafseer-ibn-e-kaseer", language: "bengali", author: "Hafiz Ibn Kathir" },
  { id: 211, name: "মুখতাসার তাফসীর", nameEn: "Bengali Mokhtasar", slug: "bengali-mokhtasar", language: "bengali", author: "Mokhtasar" },

  { id: 220, name: "Tafsir Ringkas", nameEn: "Indonesian Mokhtasar", slug: "indonesian-mokhtasar", language: "indonesian", author: "Mokhtasar" },
  { id: 221, name: "Tafsir As-Saadi", nameEn: "Tafsir As-Saadi (Indonesian)", slug: "id-tafsir-as-saadi", language: "indonesian", author: "As-Saadi" },

  { id: 230, name: "Exégèse abrégée", nameEn: "French Mokhtasar", slug: "french-mokhtasar", language: "french", author: "Mokhtasar" },
  { id: 236, name: "Tafsir As-Saadi", nameEn: "Tafsir As-Saadi (French)", slug: "fr-tafsir-as-saadi", language: "french", author: "As-Saadi" },
  { id: 231, name: "经注简本", nameEn: "Chinese Mokhtasar", slug: "chinese-mokhtasar", language: "chinese", author: "Mokhtasar" },
  { id: 232, name: "Tafsir abbreviato", nameEn: "Italian Mokhtasar", slug: "italian-mokhtasar", language: "italian", author: "Mokhtasar" },
  { id: 233, name: "要約タフスィール", nameEn: "Japanese Mokhtasar", slug: "japanese-mokhtasar", language: "japanese", author: "Mokhtasar" },
  { id: 234, name: "Tafsir abreviado", nameEn: "Spanish Mokhtasar", slug: "spanish-mokhtasar", language: "spanish", author: "Mokhtasar" },
  { id: 235, name: "संक्षिप्त तफसीर", nameEn: "Hindi Mokhtasar", slug: "hindi-mokhtasar", language: "hindi", author: "Mokhtasar" },
];

const RTL_TAFSEER_LANGUAGES = new Set<TafseerLanguage>(["arabic", "urdu"]);

export function isRtlTafseerLanguage(language: TafseerLanguage): boolean {
  return RTL_TAFSEER_LANGUAGES.has(language);
}

const LOCALE_TO_LANGUAGE: Record<string, TafseerLanguage> = {
  ar: "arabic",
  en: "english",
  ur: "urdu",
  tr: "turkish",
  bn: "bengali",
  id: "indonesian",
  ms: "indonesian", // closest available set
  fr: "french",
  zh: "chinese",
  it: "italian",
  ja: "japanese",
  es: "spanish",
  hi: "hindi",
  // ko/pt/etc. → english fallback via tafseerLanguageForLocale
};

const LOCALE_DEFAULT_SLUG: Record<string, string> = {
  ar: "ar-tafsir-ibn-kathir",
  en: "en-tafisr-ibn-kathir",
  ur: "ur-tafseer-ibn-e-kaseer",
  tr: "tr-tafsir-ibne-kathir",
  bn: "bn-tafseer-ibn-e-kaseer",
  id: "indonesian-mokhtasar",
  ms: "indonesian-mokhtasar",
  fr: "french-mokhtasar",
  zh: "chinese-mokhtasar",
  it: "italian-mokhtasar",
  ja: "japanese-mokhtasar",
  es: "spanish-mokhtasar",
  hi: "hindi-mokhtasar",
  ko: "en-tafisr-ibn-kathir",
  pt: "en-tafisr-ibn-kathir",
};

export function tafseerLanguageForLocale(locale: string): TafseerLanguage {
  return LOCALE_TO_LANGUAGE[locale] || "english";
}

const LANGUAGE_LABEL: Record<TafseerLanguage, { ar: string; en: string }> = {
  arabic: { ar: "عربي", en: "Arabic" },
  english: { ar: "إنجليزي", en: "English" },
  urdu: { ar: "أردو", en: "Urdu" },
  turkish: { ar: "تركي", en: "Turkish" },
  bengali: { ar: "بنغالي", en: "Bengali" },
  indonesian: { ar: "إندونيسي", en: "Indonesian" },
  french: { ar: "فرنسي", en: "French" },
  chinese: { ar: "صيني", en: "Chinese" },
  italian: { ar: "إيطالي", en: "Italian" },
  japanese: { ar: "ياباني", en: "Japanese" },
  spanish: { ar: "إسباني", en: "Spanish" },
  hindi: { ar: "هندي", en: "Hindi" },
  other: { ar: "أخرى", en: "Other" },
};

/** Disambiguate lookalike titles (Arabic vs Urdu Ibn Kathir, etc.). */
export function editionDisplayName(edition: TafseerEdition, locale: string): string {
  const uiLang = tafseerLanguageForLocale(locale);
  const preferNative = locale === "ar" || locale === "ur";
  const base =
    preferNative && edition.language === uiLang
      ? edition.name
      : edition.nameEn || edition.name;

  if (edition.language === uiLang) return base;

  const langLabel =
    locale === "ar" || locale === "ur"
      ? LANGUAGE_LABEL[edition.language].ar
      : LANGUAGE_LABEL[edition.language].en;
  return `${edition.nameEn || edition.name} (${langLabel})`;
}

/** Prefer a tafseer written for the UI language; fall back to English Ibn Kathir. */
export function defaultTafseerEdition(locale: string): TafseerEdition {
  const preferredSlug = LOCALE_DEFAULT_SLUG[locale] || "en-tafisr-ibn-kathir";
  const lang = tafseerLanguageForLocale(locale);

  return (
    TAFSEER_EDITIONS.find((edition) => edition.slug === preferredSlug) ||
    TAFSEER_EDITIONS.find((edition) => edition.language === lang) ||
    TAFSEER_EDITIONS.find((edition) => edition.slug === "en-tafisr-ibn-kathir") ||
    TAFSEER_EDITIONS[0]
  );
}

export function editionsForLocale(locale: string): TafseerEdition[] {
  const lang = tafseerLanguageForLocale(locale);
  const matching = TAFSEER_EDITIONS.filter((edition) => edition.language === lang);
  const english = TAFSEER_EDITIONS.filter(
    (edition) => edition.language === "english" && edition.language !== lang,
  );
  const rest = TAFSEER_EDITIONS.filter(
    (edition) => edition.language !== lang && edition.language !== "english",
  );
  return [...matching, ...english, ...rest];
}

export function tafseerAyahHref(locale: string, surah: number, ayah: number) {
  return `/${locale}/sections/tafseer?surah=${surah}&ayah=${ayah}`;
}

export function tafseerApiUrl(slug: string, surah: number, ayah: number) {
  return `/api/tafseer/${slug}/${surah}/${ayah}`;
}
