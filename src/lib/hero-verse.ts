import { localeDirection, siteConfig, type SupportedLocale } from "@/config/site";
import { lookupMessage, translations } from "@/lib/translations";

export type HeroVersePart = "bismillah" | "verse" | "sadaqallah";

const ARABIC_SCRIPT = /[\u0600-\u06FF]/;

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
    ko: "그리고 인내하는 자들에게 복음을 전하라. 그들이 재앙을 당했을 때 '우리는 알라에게 속하며 우리는 그에게로 돌아간다'고 말하는 자들이다. 그들은 주님으로부터 축복과 자비를 받는 자들이며, 그들이 바로 올바르게 인도받은 자들이다.",
    tr: "Sabırlılara müjde ver. Onlar başlarına bir musibet geldiğinde 'Biz Allah'a aidiz ve O'na döneceğiz' derler. İşte onlar Rablerinden bereket ve rahmete nail olanlardır ve onlar doğru yolda olanlardır.",
    ur: "اور صبر کرنے والوں کو خوشخبری دو جو جب ان پر کوئی مصیبت آتی ہے تو کہتے ہیں کہ ہم اللہ کے ہیں اور ہمیں اسی کی طرف لوٹنا ہے۔ یہی لوگ ہیں جن پر ان کے رب کی طرف سے برکات اور رحمت ہے اور یہی ہدایت یافتہ ہیں۔",
    id: "Dan berikanlah kabar gembira kepada orang-orang yang sabar, yang apabila ditimpa musibah, mereka mengucapkan: 'Innaa lillaahi wa innaa ilaihi raaji'uun' (sesungguhnya kami milik Allah dan kepada-Nyalah kami kembali). Mereka itulah yang mendapat keberkahan dan rahmat dari Tuhan mereka, dan mereka itulah orang-orang yang mendapat petunjuk.",
    ms: "Dan berikanlah khabar gembira kepada orang-orang yang sabar, yang apabila ditimpa musibah, mereka mengucapkan: 'Innaa lillaahi wa innaa ilaihi raaji'uun' (sesungguhnya kami milik Allah dan kepada-Nyalah kami kembali). Mereka itulah yang mendapat keberkahan dan rahmat dari Tuhan mereka, dan mereka itulah orang-orang yang mendapat petunjuk.",
    bn: "এবং ধৈর্যশীলদের সুসংবাদ দাও, যারা যখন তাদের উপর বিপদ আসে তখন বলে, 'নিশ্চয়ই আমরা আল্লাহর জন্য এবং নিশ্চয়ই আমরা তাঁর কাছে ফিরে যাব।' তারাই যাদের উপর তাদের রবের পক্ষ থেকে বরকত ও রহমত রয়েছে এবং তারাই হিদায়াতপ্রাপ্ত।",
    fr: "Et annonce la bonne nouvelle aux patients, qui, quand un malheur les atteint, disent : 'Nous appartenons à Allah et c'est vers Lui que nous retournerons.' Ce sont eux qui reçoivent les bénédictions et la miséricorde de leur Seigneur, et ce sont eux les bien guidés.",
    zh: "你当向坚忍的人报喜。他们遭难的时候，说：'我们确是真主所有的，我们必定只归依他。'这等人，是蒙主的慈恩和佑护的；这等人，确是遵循正道的。",
    it: "E da' la buona novella ai pazienti, che quando li colpisce una disgrazia dicono: 'In verità apparteniamo ad Allah e a Lui faremo ritorno.' Essi sono quelli su cui scendono benedizioni e misericordia dal loro Signore, e sono quelli che sono ben guidati.",
    ja: "そして忍耐する者たちに吉報を伝えよ。災難が彼らに降りかかった時、彼らは言う：'私たちはアッラーに属し、私たちは彼に帰る。'これらは主からの祝福と慈悲を受ける者たちであり、これらは正しく導かれた者たちである。",
    es: "Y anuncia la buena nueva a los pacientes, que cuando les alcanza una desgracia dicen: 'En verdad pertenecemos a Allah y a Él regresaremos.' Sobre ellos hay bendiciones y misericordia de su Señor, y ellos son los bien guiados.",
    pt: "E anuncie a boa nova aos pacientes, que quando uma desgraça os atinge dizem: 'Em verdade pertencemos a Allah e a Ele retornaremos.' Sobre eles há bênçãos e misericórdia de seu Senhor, e eles são os bem guiados.",
    hi: "और सब्र करने वालों को खुशख़बरी दो, जो जब उन पर कोई मुसीबत आए तो कहते हैं: 'निश्चय हम अल्लाह के हैं और उसी की ओर लौटने वाले हैं।' यही वे हैं जिन पर उनके रब की तरफ़ से बरकतें और रहमत है, और यही हिदायत पाए हुए हैं।",
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
    pt: "Allah, o Altísimo e o Grandioso, disse a verdade",
    hi: "अल्लाह तआला ने सच फ़रमाया",
    en: "Allah Almighty has spoken the truth",
  },
};

export function heroVerse(locale: SupportedLocale, part: HeroVersePart): string {
  const key = `quran_verse.${part}`;
  const configured =
    siteConfig.content.translations[locale]?.[key] ||
    siteConfig.content.translations["*"]?.[key];
  if (configured?.trim()) return configured;

  // Locale JSON only — do not fall back to Arabic via `translate()`, or ja/ko/etc.
  // would show Arabic/English instead of their nested `quran_verse.*` strings.
  const localized = lookupMessage(translations[locale], key);
  if (localized?.trim()) return localized;

  return FALLBACKS[part][locale] || FALLBACKS[part].en;
}

/** `lang` / `dir` / Quran font class for a rendered hero/footer verse line. */
export function heroVerseTextProps(text: string, locale: SupportedLocale) {
  const arabic = ARABIC_SCRIPT.test(text);
  return {
    lang: arabic ? "ar" : locale,
    dir: arabic ? ("rtl" as const) : localeDirection(locale),
    className: arabic ? "arabic-quran-text font-arabic" : undefined,
  };
}
