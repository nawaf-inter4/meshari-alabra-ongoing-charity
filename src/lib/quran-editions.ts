/** AlQuranCloud edition ids used for inline translation / short tafsir. */

export function getTranslationIdentifier(locale: string): string {
  const translationMap: Record<string, string> = {
    ar: "ar.muyassar",
    en: "en.sahih",
    tr: "tr.diyanet",
    ur: "ur.jalandhry",
    id: "id.indonesian",
    ms: "ms.basmeih",
    bn: "bn.bengali",
    fr: "fr.hamidullah",
    zh: "zh.jian",
    it: "it.piccardo",
    ja: "ja.japanese",
    ko: "ko.korean",
    es: "es.asad",
    pt: "pt.elhayek",
    hi: "hi.hindi",
  };
  return translationMap[locale] || "en.sahih";
}

/**
 * Human-readable source label (never bare "AR").
 * Arabic labels use standard Arabic yeh (ي U+064A), not Farsi yeh (ی U+06CC),
 * so UI fonts do not mis-shape الميسر.
 */
export function getTranslationSourceLabel(editionId: string, uiLocale: string): string {
  const sources: Record<string, { ar: string; en: string }> = {
    "ar.muyassar": { ar: "تفسير الميسر", en: "Tafsir Al-Muyassar" },
    "en.sahih": { ar: "صحيح إنترناشونال", en: "Sahih International" },
    "tr.diyanet": { ar: "ديانت التركية", en: "Diyanet İşleri" },
    "ur.jalandhry": { ar: "جالندھری", en: "Fateh Muhammad Jalandhry" },
    "id.indonesian": { ar: "الترجمة الإندونيسية", en: "Indonesian Ministry of Religious Affairs" },
    "ms.basmeih": { ar: "بسميق", en: "Abdullah Muhammad Basmeih" },
    "bn.bengali": { ar: "الترجمة البنغالية", en: "Muhiuddin Khan" },
    "fr.hamidullah": { ar: "حميد الله", en: "Muhammad Hamidullah" },
    "zh.jian": { ar: "الترجمة الصينية المبسطة", en: "Ma Jian" },
    "it.piccardo": { ar: "بيكاردو", en: "Hamza Roberto Piccardo" },
    "ja.japanese": { ar: "الترجمة اليابانية", en: "Japanese" },
    "ko.korean": { ar: "الترجمة الكورية", en: "Korean" },
    "es.asad": { ar: "أسد", en: "Muhammad Asad" },
    "pt.elhayek": { ar: "الحيك", en: "Samir El-Hayek" },
    "hi.hindi": { ar: "الترجمة الهندية", en: "Suhel Farooq Khan" },
  };
  const entry = sources[editionId];
  if (!entry) return editionId;
  return uiLocale === "ar" || uiLocale === "ur" ? entry.ar : entry.en;
}

export function translationKindLabel(
  editionId: string,
  uiLocale: string,
  t: (key: string) => string,
): string {
  const isArabicTafsir = editionId === "ar.muyassar" || editionId.startsWith("ar.");
  if (isArabicTafsir) {
    return t("quran.translation") !== "quran.translation" ? t("quran.translation") : "التفسير";
  }
  if (t("quran.translation_label") !== "quran.translation_label") {
    return t("quran.translation_label");
  }
  if (t("quran.translation") !== "quran.translation") {
    return t("quran.translation");
  }
  return uiLocale === "ar" ? "الترجمة" : "Translation";
}
