// Export all translation files
export { default as ar } from './locales/ar.json';
export { default as en } from './locales/en.json';
export { default as ur } from './locales/ur.json';
export { default as tr } from './locales/tr.json';
export { default as id } from './locales/id.json';
export { default as ms } from './locales/ms.json';
export { default as bn } from './locales/bn.json';
export { default as fr } from './locales/fr.json';
export { default as zh } from './locales/zh.json';
export { default as it } from './locales/it.json';
export { default as ja } from './locales/ja.json';
export { default as ko } from './locales/ko.json';

// Helper function to get translations
export async function getTranslations(locale: string) {
  const translations: Record<string, any> = {
    ar: (await import('./locales/ar.json')).default,
    en: (await import('./locales/en.json')).default,
    ur: (await import('./locales/ur.json')).default,
    tr: (await import('./locales/tr.json')).default,
    id: (await import('./locales/id.json')).default,
    ms: (await import('./locales/ms.json')).default,
    bn: (await import('./locales/bn.json')).default,
    fr: (await import('./locales/fr.json')).default,
    zh: (await import('./locales/zh.json')).default,
    it: (await import('./locales/it.json')).default,
    ja: (await import('./locales/ja.json')).default,
    ko: (await import('./locales/ko.json')).default,
  };

  return translations[locale] || translations.ar;
}
