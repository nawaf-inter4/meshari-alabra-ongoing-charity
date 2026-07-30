import type { Page } from "@playwright/test";

export async function mockExternalApis(page: Page) {
  await page.route("https://api.aladhan.com/**", (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        code: 200,
        data: {
          hijri: {
            day: "15",
            year: "1448",
            month: { ar: "صفر", en: "Safar" },
          },
        },
      }),
    }),
  );

  await page.route("**/api/ip-location", (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ city: "Riyadh", country: "Saudi Arabia", country_code: "SA" }),
    }),
  );

  await page.route("**/api/quran/**", (route) => {
    const pathname = new URL(route.request().url()).pathname;
    let data: unknown = {};

    if (pathname.endsWith("/meta")) {
      data = {
        surahs: {
          references: [{
            number: 1,
            name: "سُورَةُ ٱلْفَاتِحَةِ",
            englishName: "Al-Faatiha",
            englishNameTranslation: "The Opening",
            numberOfAyahs: 7,
            revelationType: "Meccan",
          }],
        },
      };
    } else if (pathname.includes("/edition/format/audio")) {
      data = [{
        identifier: "ar.ahmedajamy",
        language: "ar",
        name: "أحمد بن علي العجمي",
        englishName: "Ahmed ibn Ali al-Ajamy",
        format: "audio",
        type: "versebyverse",
      }];
    } else if (pathname.includes("/ayah/")) {
      data = {
        number: 1,
        numberInSurah: 1,
        audio: "https://cdn.islamic.network/quran/audio/128/ar.ahmedajamy/1.mp3",
        edition: {
          identifier: "ar.ahmedajamy",
          format: "audio",
          type: "versebyverse",
        },
      };
    } else if (pathname.includes("/surah/")) {
      data = {
        number: 1,
        ayahs: [{
          number: 1,
          numberInSurah: 1,
          text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
          juz: 1,
          manzil: 1,
          page: 1,
          ruku: 1,
          hizbQuarter: 1,
          sajda: false,
        }],
      };
    }

    return route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ data }),
    });
  });
}
