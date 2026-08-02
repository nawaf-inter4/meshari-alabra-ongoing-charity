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
import { siteConfig, type SupportedLocale } from "@/config/site";

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

/** Resolve flat keys (`seo.title`) or nested objects (`quran_verse.bismillah`). */
export function lookupMessage(
  messages: Record<string, unknown>,
  key: string,
): string | undefined {
  const direct = messages[key];
  if (typeof direct === "string") return direct;

  if (!key.includes(".")) return undefined;

  let current: unknown = messages;
  for (const part of key.split(".")) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export function translate(locale: SupportedLocale, key: string, fallback = key) {
  const localized = lookupMessage(translations[locale], key);
  if (localized !== undefined) return localized;
  const arabic = lookupMessage(translations.ar, key);
  return arabic !== undefined ? arabic : fallback;
}

/** White-label `siteConfig.content.translations` overrides first, then locale JSON (same as `t()`). */
export function translateWithConfig(locale: SupportedLocale, key: string, fallback = key) {
  const configured =
    siteConfig.content.translations[locale]?.[key] ||
    siteConfig.content.translations["*"]?.[key];
  if (configured?.trim()) return configured;
  return translate(locale, key, fallback);
}
