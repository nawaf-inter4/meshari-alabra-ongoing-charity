export type TafseerLanguage = "arabic" | "english" | "urdu";

export interface TafseerEdition {
  id: number;
  name: string;
  slug: string;
  language: TafseerLanguage;
  author: string;
}

/** spa5k/tafsir_api editions used by the Tafseer section. */
export const TAFSEER_EDITIONS: TafseerEdition[] = [
  { id: 14, name: "تفسير ابن كثير", slug: "ar-tafsir-ibn-kathir", language: "arabic", author: "Hafiz Ibn Kathir" },
  { id: 15, name: "تفسير الطبري", slug: "ar-tafsir-al-tabari", language: "arabic", author: "Tabari" },
  { id: 16, name: "تفسير الميسر", slug: "ar-tafsir-muyassar", language: "arabic", author: "Al Muyassar" },
  { id: 91, name: "تفسير السعدي", slug: "ar-tafseer-al-saddi", language: "arabic", author: "Saddi" },
  { id: 90, name: "تفسير القرطبي", slug: "ar-tafseer-al-qurtubi", language: "arabic", author: "Qurtubi" },
  { id: 74, name: "Tafsir Al-Jalalayn", slug: "en-al-jalalayn", language: "english", author: "Al-Jalalayn" },
  { id: 169, name: "Tafsir Ibn Kathir", slug: "en-tafisr-ibn-kathir", language: "english", author: "Hafiz Ibn Kathir" },
  { id: 108, name: "Al Qushairi Tafsir", slug: "en-al-qushairi-tafsir", language: "english", author: "Al Qushairi" },
  { id: 160, name: "تفسیر ابن کثیر", slug: "ur-tafseer-ibn-e-kaseer", language: "urdu", author: "Hafiz Ibn Kathir" },
  { id: 159, name: "بیان القرآن", slug: "ur-tafsir-bayan-ul-quran", language: "urdu", author: "Dr. Israr Ahmad" },
];

export function tafseerLanguageForLocale(locale: string): TafseerLanguage {
  if (locale === "ar") return "arabic";
  if (locale === "ur") return "urdu";
  return "english";
}

/** Prefer a tafseer written in the UI language; fall back to English, then Arabic. */
export function defaultTafseerEdition(locale: string): TafseerEdition {
  const lang = tafseerLanguageForLocale(locale);
  const preferredSlug =
    lang === "arabic"
      ? "ar-tafsir-ibn-kathir"
      : lang === "urdu"
        ? "ur-tafseer-ibn-e-kaseer"
        : "en-tafisr-ibn-kathir";

  return (
    TAFSEER_EDITIONS.find((edition) => edition.slug === preferredSlug) ||
    TAFSEER_EDITIONS.find((edition) => edition.language === lang) ||
    TAFSEER_EDITIONS.find((edition) => edition.language === "english") ||
    TAFSEER_EDITIONS[0]
  );
}

export function editionsForLocale(locale: string): TafseerEdition[] {
  const lang = tafseerLanguageForLocale(locale);
  const matching = TAFSEER_EDITIONS.filter((edition) => edition.language === lang);
  const rest = TAFSEER_EDITIONS.filter((edition) => edition.language !== lang);
  return [...matching, ...rest];
}

export function tafseerAyahHref(locale: string, surah: number, ayah: number) {
  return `/${locale}/sections/tafseer?surah=${surah}&ayah=${ayah}`;
}
