import type { SupportedLocale } from "@/config/site";
import { translate } from "@/lib/translations";

export type HeroVersePart = "bismillah" | "verse" | "sadaqallah";

const FALLBACKS: Record<HeroVersePart, Partial<Record<SupportedLocale, string>> & { en: string }> = {
  bismillah: {
    ar: "بسم الله الرحمن الرحيم",
    ko: "자비로우시고 자애로우신 알라의 이름으로",
    tr: "Rahman ve Rahim olan Allah'ın adıyla",
    ur: "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا",
    id: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang",
    ms: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang",
    bn: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে",
    fr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux",
    zh: "奉至仁至慈的真主之名",
    it: "Nel nome di Allah, il Compassionevole, il Misericordioso",
    ja: "慈悲深く慈愛あまねきアッラーの御名において",
    es: "En el nombre de Allah, el Compasivo, el Misericordioso",
    pt: "Em nome de Allah, o Clemente, o Misericordioso",
    hi: "अल्लाह के नाम से जो बड़ा मेहरबान निहायत रहम वाला है",
    en: "In the name of Allah, the Most Gracious, the Most Merciful",
  },
  verse: {
    ar: "وَبَشِّرِ الصَّابِرِينَ الَّذِينَ إِذَا أَصَابَتْهُمْ مُصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ أُوْلَئِكَ عَلَيْهِمْ صَلَوَاتٌ مِنْ رَبِّهِمْ وَرَحْمَةٌ وَأُوْلَئِكَ هُمُ الْمُهْتَدُونَ",
    en: "And give good tidings to the patient, who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.' Those are the ones upon whom are blessings from their Lord and mercy. And it is those who are the [rightly] guided.",
  },
  sadaqallah: {
    ar: "صدق الله العلي العظيم",
    ko: "알라 지고하고 위대하신 분이 진실을 말씀하셨다",
    tr: "Allah yüce ve büyük olan doğru söyledi",
    ur: "اللہ تعالیٰ نے سچ فرمایا",
    id: "Allah Yang Maha Tinggi dan Maha Agung telah berfirman dengan benar",
    ms: "Allah Yang Maha Tinggi dan Maha Agung telah berfirman dengan benar",
    bn: "আল্লাহ সর্বোচ্চ এবং মহান সত্য বলেছেন",
    fr: "Allah le Très-Haut et le Très-Grand a dit la vérité",
    zh: "至高至大的真主说了实话",
    it: "Allah l'Altissimo e il Grandissimo ha detto la verità",
    ja: "アッラー、至高にして偉大なる方が真実を語られた",
    es: "Allah, el Altísimo y el Grandísimo, ha dicho la verdad",
    pt: "Allah, o Altíssimo e o Grandioso, disse a verdade",
    hi: "अल्लाह तआला ने सच फ़रमाया",
    en: "Allah Almighty has spoken the truth",
  },
};

export function heroVerse(locale: SupportedLocale, part: HeroVersePart): string {
  const key = `quran_verse.${part}`;
  const translated = translate(locale, key);
  if (translated !== key) return translated;
  return FALLBACKS[part][locale] || FALLBACKS[part].en;
}
