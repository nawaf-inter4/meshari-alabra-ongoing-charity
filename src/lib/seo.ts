import { siteConfig, type SupportedLocale } from "@/config/site";
import type { SectionId } from "@/lib/routes";
import { translate } from "@/lib/translations";

export function memorialLegalName() {
  return siteConfig.content.memorialLegalName;
}

export function memorialAlternateName() {
  return siteConfig.content.memorialAlternateName;
}

/** Localized memorial display name (Arabic full name in `ar`, legal name elsewhere). */
export function memorialDisplayName(locale: SupportedLocale) {
  return translate(locale, "memorial.name", memorialLegalName());
}

/**
 * Brand block that leads every indexed title, e.g.
 * ar: صدقة جارية لمشاري بن أحمد بن سليمان العبره
 * en: Ongoing Charity for Meshari Ahmed Sulaiman Alabra
 */
export function memorialBrandTitle(locale: SupportedLocale) {
  const configured = translate(locale, "seo.brand");
  if (configured !== "seo.brand" && configured.trim()) {
    return configured.trim();
  }

  const name = memorialDisplayName(locale);
  const charity = translate(locale, "hero.title");

  switch (locale) {
    case "ar":
      // ل + مشاري… → لمشاري…
      return `صدقة جارية ل${name}`;
    case "ur":
      return `${charity} برائے ${name}`;
    case "zh":
      return `${name}的${charity}`;
    case "ja":
      return `${name}の${charity}`;
    case "ko":
      return `${name}의 ${charity}`;
    case "tr":
      return `${name} için ${charity}`;
    case "id":
    case "ms":
      return `${charity} untuk ${name}`;
    case "bn":
      return `${name}-এর ${charity}`;
    case "hi":
      return `${name} के लिए ${charity}`;
    case "fr":
      return `${charity} pour ${name}`;
    case "es":
    case "pt":
      return `${charity} para ${name}`;
    case "it":
      return `${charity} per ${name}`;
    case "en":
      return `${charity} for ${name}`;
    default: {
      const _exhaustive: never = locale;
      void _exhaustive;
      return `${charity} for ${name}`;
    }
  }
}

/**
 * Extract the keyword / section topic from a locale SEO string.
 * Supports "topic", "brand | topic", or legacy "topic | brand".
 */
export function seoTopic(raw: string, fallback: string, brand?: string) {
  const parts = raw.split("|").map((part) => part.trim()).filter(Boolean);
  if (parts.length === 0) return fallback;
  if (parts.length === 1) return parts[0];
  if (brand && parts[0] === brand) return parts.slice(1).join(" | ");
  // Prefer the right-hand phrase (keywords / section name).
  return parts.slice(1).join(" | ") || parts[0] || fallback;
}

/** @deprecated use seoTopic — kept for older call sites */
export function seoLead(raw: string, fallback: string) {
  return seoTopic(raw, fallback);
}

/**
 * Multilingual title pattern:
 * `{localized charity + full memorial name} | {localized page/section keywords}`
 */
export function formatMemorialTitle(locale: SupportedLocale, topic: string) {
  const brand = memorialBrandTitle(locale);
  let cleanTopic = topic?.trim() || "";

  if (cleanTopic.startsWith(`${brand} |`)) {
    cleanTopic = cleanTopic.slice(brand.length + 2).trim();
  } else if (cleanTopic.includes("|")) {
    cleanTopic = seoTopic(cleanTopic, cleanTopic, brand);
  }

  if (cleanTopic === brand || !cleanTopic) return brand;
  if (cleanTopic.includes(brand)) {
    cleanTopic = cleanTopic.replace(brand, "").replace(/^\s*\|\s*/, "").trim();
  }

  return cleanTopic ? `${brand} | ${cleanTopic}` : brand;
}

/** Homepage: brand | landing keywords (Quran, duas, orphan care, …). */
export function formatHomeTitle(locale: SupportedLocale) {
  const brand = memorialBrandTitle(locale);
  const raw =
    siteConfig.seo.title ||
    translate(
      locale,
      "seo.title",
      translate(locale, "site.subtitle", translate(locale, "hero.title")),
    );
  const charity = translate(locale, "hero.title");
  const parts = raw.split("|").map((part) => part.trim()).filter(Boolean);

  let topic: string;
  if (parts.length > 1) {
    topic = parts.slice(1).join(" | ");
  } else if (parts[0] && parts[0] !== brand && parts[0] !== charity) {
    topic = parts[0];
  } else {
    topic = translate(locale, "site.subtitle", charity);
  }

  return formatMemorialTitle(locale, topic);
}

export function enrichMemorialDescription(
  description: string,
  locale: SupportedLocale,
) {
  const legal = memorialLegalName();
  const alternate = memorialAlternateName();
  const display = memorialDisplayName(locale);
  if (!description?.trim()) {
    return locale === "ar"
      ? `صدقة جارية لذكرى ${alternate} (${legal}).`
      : `Memorial ongoing charity for ${legal}.`;
  }
  if (
    description.includes(legal) ||
    description.includes(display) ||
    description.includes("Meshari Ahmed")
  ) {
    return description;
  }
  if (locale === "ar") {
    return `${description} — ${legal} (${alternate}).`;
  }
  return `${description} Dedicated as ongoing charity (sadaqah jariyah) for ${legal}.`;
}

function baseMemorialKeywords(locale: SupportedLocale): string[] {
  return [
    memorialLegalName(),
    memorialAlternateName(),
    memorialDisplayName(locale),
    memorialBrandTitle(locale),
    translate(locale, "hero.title"),
    "Meshari Alabra",
    "مشاري العبره",
    "sadaqah jariyah",
    "صدقة جارية",
    "ongoing charity",
    siteConfig.identity.organizationName,
  ];
}

/** High-intent topic keywords per section and locale (for classic + AI search). */
const SECTION_TOPIC_KEYWORDS: Record<
  SectionId,
  Partial<Record<SupportedLocale, string[]>>
> = {
  quran: {
    ar: ["القرآن الكريم", "قراءة القرآن", "تلاوة القرآن", "مصحف أونلاين", "استماع القرآن"],
    en: ["Holy Quran", "Quran online", "read Quran", "Quran recitation", "Quran translation"],
    ur: ["قرآن مجید", "قرآن پڑھیں", "تلاوت قرآن"],
    tr: ["Kuran-ı Kerim", "online Kuran", "Kuran oku"],
    id: ["Al-Quran", "baca Quran", "tilawah"],
    ms: ["Al-Quran", "baca Al-Quran", "tilawah"],
    bn: ["পবিত্র কুরআন", "কুরআন পড়া", "তিলাওয়াত"],
    fr: ["Saint Coran", "lire le Coran", "récitation du Coran"],
    zh: ["古兰经", "在线阅读古兰经", "古兰经诵读", "古兰经译文"],
    it: ["Sacro Corano", "leggere il Corano", "recitazione del Corano"],
    ja: ["クルアーン", "コーランを読む", "クルアーン朗読"],
    ko: ["꾸란", "코란 읽기", "꾸란 낭송"],
    es: ["Sagrado Corán", "leer el Corán", "recitación del Corán"],
    pt: ["Sagrado Alcorão", "ler o Alcorão", "recitação do Alcorão"],
    hi: ["पवित्र कुरान", "कुरान पढ़ें", "तिलावत"],
  },
  tafseer: {
    ar: ["تفسير القرآن", "تفسير ميسر", "معاني الآيات"],
    en: ["Quran tafseer", "Quran tafsir", "Quran explanation"],
    ur: ["تفسیر قرآن", "معانی آیات"],
    tr: ["Kuran tefsiri", "ayet açıklaması"],
    id: ["tafsir Quran", "penjelasan ayat"],
    ms: ["tafsir Al-Quran", "penjelasan ayat"],
    bn: ["কুরআনের তাফসীর", "আয়াতের ব্যাখ্যা"],
    fr: ["tafsir Coran", "exégèse du Coran"],
    zh: ["古兰经经注", "经文解释", "经注"],
    it: ["tafsir Corano", "esegesi del Corano"],
    ja: ["クルアーン解釈", "タフスィール"],
    ko: ["꾸란 타프시르", "경전 해석"],
    es: ["tafsir del Corán", "exégesis coránica"],
    pt: ["tafsir do Alcorão", "exegese corânica"],
    hi: ["कुरान तफसीर", "आयत व्याख्या"],
  },
  dhikr: {
    ar: ["ذكر", "تسبيح", "عداد التسبيح", "استغفار"],
    en: ["dhikr counter", "tasbih", "zikr", "islamic remembrance"],
    ur: ["ذکر", "تسبیح کاؤنٹر"],
    tr: ["zikir sayacı", "tesbih"],
    id: ["penghitung dzikir", "tasbih"],
    ms: ["pengira dzikir", "tasbih"],
    bn: ["জিকির কাউন্টার", "তাসবিহ"],
    fr: ["compteur de dhikr", "tasbih"],
    zh: ["赞念计数器", "泰斯比哈", "记主"],
    it: ["contatore dhikr", "tasbih"],
    ja: ["ズィクルカウンター", "タスビーフ"],
    ko: ["디크르 카운터", "타스비"],
    es: ["contador de dhikr", "tasbih"],
    pt: ["contador de dhikr", "tasbih"],
    hi: ["ज़िक्र काउंटर", "तस्बीह"],
  },
  "prayer-times": {
    ar: ["مواقيت الصلاة", "أوقات الصلاة", "الأذان", "الصلاة القادمة"],
    en: ["prayer times", "salah times", "azan time", "next prayer"],
    ur: ["نماز کے اوقات", "اذان"],
    tr: ["namaz vakitleri", "ezan saati"],
    id: ["jadwal sholat", "waktu salat"],
    ms: ["waktu solat", "jadual solat"],
    bn: ["নামাজের সময়", "আজান"],
    fr: ["horaires de prière", "heure de salat"],
    zh: ["礼拜时间", "拜功时间", "宣礼"],
    it: ["orari di preghiera", "orari salah"],
    ja: ["礼拝時間", "サラートの時間"],
    ko: ["예배 시간", "살라트 시간"],
    es: ["horarios de oración", "horarios de salat"],
    pt: ["horários de oração", "horários de salat"],
    hi: ["नमाज़ का समय", "अज़ान"],
  },
  qibla: {
    ar: ["اتجاه القبلة", "القبلة", "الكعبة", "بوصلة القبلة"],
    en: ["qibla direction", "qibla finder", "Kaaba direction", "prayer direction"],
    ur: ["قبلہ کی سمت", "قبلہ نما"],
    tr: ["kıble yönü", "kıble pusulası"],
    id: ["arah kiblat", "kompas kiblat"],
    ms: ["arah kiblat", "kompas kiblat"],
    bn: ["কিবলার দিক", "কিবলা কম্পাস"],
    fr: ["direction de la qibla", "boussole qibla"],
    zh: ["朝向", "克尔白方向", "礼拜朝向"],
    it: ["direzione qibla", "bussola qibla"],
    ja: ["キブラの方向", "カアバの方角"],
    ko: ["키블라 방향", "예배 방향"],
    es: ["dirección de la qibla", "brújula qibla"],
    pt: ["direção da qibla", "bússola qibla"],
    hi: ["क़िबला दिशा", "क़िबला कम्पास"],
  },
  donation: {
    ar: ["كفالة يتيم", "التبرع", "صدقة", "رعاية الأيتام"],
    en: ["orphan sponsorship", "donate", "charity donation", "sadaqah"],
    ur: ["یتیم کی کفالت", "صدقہ"],
    tr: ["yetim sponsorluğu", "bağış"],
    id: ["sponsorship yatim", "donasi"],
    ms: ["bajukan anak yatim", "derma"],
    bn: ["এতিম স্পনসর", "দান"],
    fr: ["parrainage d'orphelins", "don caritatif"],
    zh: ["孤儿赞助", "慈善捐赠", "施舍"],
    it: ["adozione a distanza orfani", "donazione"],
    ja: ["孤児支援", "寄付"],
    ko: ["고아 후원", "기부"],
    es: ["apadrinamiento de huérfanos", "donación"],
    pt: ["apadrinhamento de órfãos", "doação"],
    hi: ["अनाथ प्रायोजन", "दान"],
  },
  supplications: {
    ar: ["أدعية", "أذكار", "دعاء للميت", "أذكار الصباح والمساء"],
    en: ["duas", "supplications", "adhkar", "prayers for the deceased"],
    ur: ["دعائیں", "اذکار", "میت کے لیے دعا"],
    tr: ["dualar", "zikirler", "ölü için dua"],
    id: ["doa", "dzikir", "doa untuk mayit"],
    ms: ["doa", "zikir", "doa untuk si mati"],
    bn: ["দোয়া", "জিকির", "মৃতের জন্য দোয়া"],
    fr: ["invocations", "douas", "prières pour les défunts"],
    zh: ["祷词", "杜阿", "记主词", "为亡者祈祷"],
    it: ["suppliche", "dua", "preghiere per i defunti"],
    ja: ["ドゥアー", "祈りの言葉", "故人のための祈願"],
    ko: ["두아", "기도문", "고인을 위한 기도"],
    es: ["súplicas", "duas", "oraciones por los difuntos"],
    pt: ["súplicas", "duas", "orações pelos falecidos"],
    hi: ["दुआएं", "अज़कार", "मृत के लिए दुआ"],
  },
  hadith: {
    ar: ["أحاديث نبوية", "الحديث الشريف", "سنة نبوية"],
    en: ["hadith", "prophetic sayings", "sunnah", "Sahih hadith"],
    ur: ["احادیث", "سنت نبوی"],
    tr: ["hadis", "peygamber sözleri"],
    id: ["hadits", "sabda Nabi"],
    ms: ["hadis", "sabda Nabi"],
    bn: ["হাদিস", "নববী বাণী"],
    fr: ["hadiths", "paroles du Prophète"],
    zh: ["圣训", "先知言行", "圣训集"],
    it: ["hadith", "detti del Profeta"],
    ja: ["ハディース", "預言者の言葉"],
    ko: ["하디스", "예언자의 말씀"],
    es: ["hadices", "dichos del Profeta"],
    pt: ["hádices", "ditos do Profeta"],
    hi: ["हदीस", "नबी वचन"],
  },
  youtube: {
    ar: ["تلاوات القرآن", "استماع القرآن", "قارئ القرآن"],
    en: ["Quran playlist", "Quran recitation audio", "listen to Quran"],
    ur: ["قرآن تلاوت", "قرآن سنیں"],
    tr: ["Kuran tilaveti", "Kuran dinle"],
    id: ["murottal Quran", "tilawah audio"],
    ms: ["bacaan Al-Quran", "tilawah audio"],
    bn: ["কুরআন তিলাওয়াত", "অডিও তিলাওয়াত"],
    fr: ["récitations du Coran", "écouter le Coran"],
    zh: ["古兰经诵读", "聆听古兰经", "诵经音频"],
    it: ["recitazioni del Corano", "ascoltare il Corano"],
    ja: ["クルアーン朗読", "コーランを聴く"],
    ko: ["꾸란 낭송", "꾸란 듣기"],
    es: ["recitaciones del Corán", "escuchar el Corán"],
    pt: ["recitações do Alcorão", "ouvir o Alcorão"],
    hi: ["कुरान तिलावत", "कुरान सुनें"],
  },
  "quran-stories": {
    ar: ["قصص القرآن", "قصص قرآنية", "تأملات قرآنية"],
    en: ["Quran stories", "Quranic stories", "surah reflections"],
    ur: ["قرآن کی قصص", "قرآنی کہانیاں"],
    tr: ["Kuran kıssaları", "Kuran hikayeleri"],
    id: ["kisah Quran", "kisah Al-Quran"],
    ms: ["kisah Al-Quran", "cerita Quran"],
    bn: ["কুরআনের কাহিনি", "কুরআনের গল্প"],
    fr: ["histoires du Coran", "récits coraniques"],
    zh: ["古兰经故事", "古兰经叙事", "经文章节沉思"],
    it: ["storie del Corano", "racconti coranici"],
    ja: ["クルアーンの物語", "コーランの話"],
    ko: ["꾸란 이야기", "꾸란 서사"],
    es: ["historias del Corán", "relatos coránicos"],
    pt: ["histórias do Alcorão", "narrativas corânicas"],
    hi: ["कुरान की कहानियाँ", "कुरानी क़िस्से"],
  },
};

export function getSectionKeywords(
  sectionId: SectionId,
  locale: SupportedLocale,
  extras: string[] = [],
): string[] {
  const topic =
    SECTION_TOPIC_KEYWORDS[sectionId][locale] ||
    SECTION_TOPIC_KEYWORDS[sectionId].en ||
    [];
  const configured = siteConfig.seo.keywords || [];
  const keywordsKey =
    sectionId === "quran-stories"
      ? "seo.quran_stories.keywords"
      : `seo.${sectionId}.keywords`;
  const fromLocale = translate(locale, keywordsKey);
  const localeKeywords =
    fromLocale !== keywordsKey
      ? fromLocale.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

  return uniqueKeywords([
    ...baseMemorialKeywords(locale),
    ...topic,
    ...localeKeywords,
    ...configured,
    ...extras,
  ]);
}

export function getHomeKeywords(locale: SupportedLocale): string[] {
  const configured = siteConfig.seo.keywords || [];
  return uniqueKeywords([
    ...baseMemorialKeywords(locale),
    translate(locale, "quran.title"),
    translate(locale, "supplications.title"),
    translate(locale, "donation.title"),
    translate(locale, "prayer.title"),
    translate(locale, "qibla.title"),
    ...(SECTION_TOPIC_KEYWORDS.quran[locale] || []),
    ...(SECTION_TOPIC_KEYWORDS.donation[locale] || []),
    ...configured,
  ]);
}

function uniqueKeywords(values: Array<string | undefined | null>) {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    const trimmed = value?.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(trimmed);
  }
  return result;
}
