// Dynamic imports for all translations
export async function getTranslations(locale: string) {
  try {
    const translations = await import(`../locales/${locale}.json`);
    return translations.default;
  } catch (error) {
    // Fallback to Arabic if locale not found
    const arTranslations = await import('../locales/ar.json');
    return arTranslations.default;
  }
}
