import ar from "@/locales/ar.json";
import en from "@/locales/en.json";
import ur from "@/locales/ur.json";
import tr from "@/locales/tr.json";
import id from "@/locales/id.json";
import ms from "@/locales/ms.json";
import bn from "@/locales/bn.json";
import fr from "@/locales/fr.json";
import zh from "@/locales/zh.json";
import it from "@/locales/it.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";
import es from "@/locales/es.json";
import pt from "@/locales/pt.json";
import hi from "@/locales/hi.json";
import type { SupportedLocale } from "@/config/site";

export const translations: Record<SupportedLocale, Record<string, unknown>> = {
  ar,
  en,
  ur,
  tr,
  id,
  ms,
  bn,
  fr,
  zh,
  it,
  ja,
  ko,
  es,
  pt,
  hi,
};

export function translate(locale: SupportedLocale, key: string, fallback = key) {
  const localized = translations[locale][key];
  if (typeof localized === "string") return localized;
  const arabic = translations.ar[key];
  return typeof arabic === "string" ? arabic : fallback;
}
