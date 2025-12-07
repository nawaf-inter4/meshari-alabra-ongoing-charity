import type { Metadata } from "next";
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

const translations: Record<string, any> = {
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
};

export type SectionId = 
  | 'quran' 
  | 'tafseer' 
  | 'dhikr' 
  | 'prayer-times' 
  | 'qibla' 
  | 'donation' 
  | 'supplications' 
  | 'hadith' 
  | 'youtube';

const sectionKeys: Record<SectionId, { title: string; subtitle: string }> = {
  'quran': { title: 'quran.title', subtitle: 'quran.subtitle' },
  'tafseer': { title: 'tafseer.title', subtitle: 'tafseer.subtitle' },
  'dhikr': { title: 'dhikr.title', subtitle: 'dhikr.subtitle' },
  'prayer-times': { title: 'prayer.title', subtitle: 'prayer.subtitle' },
  'qibla': { title: 'qibla.title', subtitle: 'qibla.subtitle' },
  'donation': { title: 'donation.title', subtitle: 'donation.subtitle' },
  'supplications': { title: 'supplications.title', subtitle: 'supplications.subtitle' },
  'hadith': { title: 'hadith.title', subtitle: 'hadith.subtitle' },
  'youtube': { title: 'youtube.title', subtitle: 'youtube.description' },
};

// Comprehensive keywords for each section in all languages
const sectionKeywords: Record<SectionId, Record<string, string[]>> = {
  'quran': {
    ar: ['القرآن الكريم', 'قراءة القرآن', 'تلاوة القرآن', 'آيات القرآن', 'سور القرآن', 'القرآن كامل', 'مشاري العبره', 'صدقة جارية', 'قرآن كريم', 'تفسير القرآن'],
    en: ['Quran', 'Holy Quran', 'Quran recitation', 'Quran verses', 'Quran surahs', 'Complete Quran', 'Meshari Alabra', 'Ongoing Charity', 'Islamic charity', 'Quran reading'],
    ur: ['قرآن کریم', 'قرآن پڑھنا', 'قرآن کی تلاوت', 'قرآن کی آیات', 'مشاری العبرہ', 'جاری صدقہ'],
    tr: ['Kuran', 'Kuran okuma', 'Kuran tilaveti', 'Kuran ayetleri', 'Meshari Alabra', 'Sürekli hayır'],
    id: ['Al-Quran', 'Bacaan Al-Quran', 'Tilawah Al-Quran', 'Ayat Al-Quran', 'Meshari Alabra', 'Sedekah jariyah'],
    ms: ['Al-Quran', 'Bacaan Al-Quran', 'Tilawah Al-Quran', 'Ayat Al-Quran', 'Meshari Alabra', 'Sedekah jariyah'],
    bn: ['কুরআন', 'কুরআন পাঠ', 'কুরআন তিলাওয়াত', 'কুরআনের আয়াত', 'মেশারি আল-আবরা', 'চলমান সদকা'],
    fr: ['Coran', 'Récitation du Coran', 'Versets du Coran', 'Meshari Alabra', 'Aumône continue'],
    zh: ['古兰经', '古兰经诵读', '古兰经经文', 'Meshari Alabra', '持续慈善'],
    it: ['Corano', 'Recitazione del Corano', 'Versetti del Corano', 'Meshari Alabra', 'Carità continua'],
    ja: ['コーラン', 'コーラン朗読', 'コーラン節', 'Meshari Alabra', '継続的慈善'],
    ko: ['꾸란', '꾸란 낭독', '꾸란 구절', 'Meshari Alabra', '지속적인 자선'],
  },
  'tafseer': {
    ar: ['تفسير القرآن', 'تفسير ابن كثير', 'تفسير الطبري', 'تفسير الميسر', 'شرح القرآن', 'معاني القرآن', 'مشاري العبره', 'صدقة جارية'],
    en: ['Quran tafseer', 'Quran exegesis', 'Ibn Kathir', 'Tabari', 'Quran commentary', 'Quran meaning', 'Meshari Alabra', 'Ongoing Charity'],
    ur: ['تفسیر قرآن', 'قرآن کی تفسیر', 'ابن کثیر', 'طبری', 'مشاری العبرہ', 'جاری صدقہ'],
    tr: ['Kuran tefsiri', 'Kuran yorumu', 'İbn Kesir', 'Taberi', 'Meshari Alabra', 'Sürekli hayır'],
    id: ['Tafsir Al-Quran', 'Tafsir Ibn Katsir', 'Tafsir Tabari', 'Penjelasan Al-Quran', 'Meshari Alabra', 'Sedekah jariyah'],
    ms: ['Tafsir Al-Quran', 'Tafsir Ibn Katsir', 'Tafsir Tabari', 'Penjelasan Al-Quran', 'Meshari Alabra', 'Sedekah jariyah'],
    bn: ['কুরআন তাফসির', 'ইবনে কাসির', 'তাবারি', 'কুরআনের ব্যাখ্যা', 'মেশারি আল-আবরা', 'চলমান সদকা'],
    fr: ['Tafsir du Coran', 'Exégèse du Coran', 'Ibn Kathir', 'Tabari', 'Meshari Alabra', 'Aumône continue'],
    zh: ['古兰经注释', '古兰经解释', '伊本·卡西尔', '塔巴里', 'Meshari Alabra', '持续慈善'],
    it: ['Tafsir del Corano', 'Esegesi del Corano', 'Ibn Kathir', 'Tabari', 'Meshari Alabra', 'Carità continua'],
    ja: ['コーラン解釈', 'コーラン注解', 'イブン・カシール', 'タバリー', 'Meshari Alabra', '継続的慈善'],
    ko: ['꾸란 주석', '꾸란 해석', '이븐 카시르', '타바리', 'Meshari Alabra', '지속적인 자선'],
  },
  'dhikr': {
    ar: ['أذكار', 'ذكر الله', 'تسبيح', 'تهليل', 'تكبير', 'أذكار يومية', 'مشاري العبره', 'صدقة جارية'],
    en: ['Dhikr', 'Remembrance of Allah', 'Tasbih', 'Tahlil', 'Takbir', 'Daily dhikr', 'Meshari Alabra', 'Ongoing Charity'],
    ur: ['ذکر', 'اللہ کا ذکر', 'تسبیح', 'تہلیل', 'تکبیر', 'مشاری العبرہ', 'جاری صدقہ'],
    tr: ['Zikir', 'Allah zikri', 'Tesbih', 'Tehlil', 'Tekbir', 'Günlük zikir', 'Meshari Alabra', 'Sürekli hayır'],
    id: ['Dzikir', 'Dzikir Allah', 'Tasbih', 'Tahlil', 'Takbir', 'Dzikir harian', 'Meshari Alabra', 'Sedekah jariyah'],
    ms: ['Zikir', 'Zikir Allah', 'Tasbih', 'Tahlil', 'Takbir', 'Zikir harian', 'Meshari Alabra', 'Sedekah jariyah'],
    bn: ['জিকির', 'আল্লাহর জিকির', 'তাসবীহ', 'তাহলীল', 'তাকবীর', 'মেশারি আল-আবরা', 'চলমান সদকা'],
    fr: ['Dhikr', 'Rappel d\'Allah', 'Tasbih', 'Tahlil', 'Takbir', 'Meshari Alabra', 'Aumône continue'],
    zh: ['记主', '记念真主', '赞主', 'Meshari Alabra', '持续慈善'],
    it: ['Dhikr', 'Ricordo di Allah', 'Tasbih', 'Tahlil', 'Takbir', 'Meshari Alabra', 'Carità continua'],
    ja: ['ズィクル', 'アッラーの想起', 'タスビーフ', 'Meshari Alabra', '継続的慈善'],
    ko: ['지크르', '알라 기억', '타스비흐', 'Meshari Alabra', '지속적인 자선'],
  },
  'prayer-times': {
    ar: ['مواقيت الصلاة', 'أوقات الصلاة', 'صلاة الفجر', 'صلاة الظهر', 'صلاة العصر', 'صلاة المغرب', 'صلاة العشاء', 'مشاري العبره', 'صدقة جارية'],
    en: ['Prayer times', 'Salah times', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Meshari Alabra', 'Ongoing Charity'],
    ur: ['نماز کے اوقات', 'فجر', 'ظہر', 'عصر', 'مغرب', 'عشاء', 'مشاری العبرہ', 'جاری صدقہ'],
    tr: ['Namaz vakitleri', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Meshari Alabra', 'Sürekli hayır'],
    id: ['Waktu sholat', 'Sholat Fajr', 'Sholat Dhuhr', 'Sholat Asr', 'Sholat Maghrib', 'Sholat Isha', 'Meshari Alabra', 'Sedekah jariyah'],
    ms: ['Waktu solat', 'Solat Fajr', 'Solat Dhuhr', 'Solat Asr', 'Solat Maghrib', 'Solat Isha', 'Meshari Alabra', 'Sedekah jariyah'],
    bn: ['নামাজের সময়', 'ফজর', 'জোহর', 'আসর', 'মাগরিব', 'ইশা', 'মেশারি আল-আবরা', 'চলমান সদকা'],
    fr: ['Heures de prière', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Meshari Alabra', 'Aumône continue'],
    zh: ['祈祷时间', '晨礼', '晌礼', '晡礼', '昏礼', '宵礼', 'Meshari Alabra', '持续慈善'],
    it: ['Orari di preghiera', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Meshari Alabra', 'Carità continua'],
    ja: ['礼拝時間', 'ファジュル', 'ズフル', 'アスル', 'マグリブ', 'イシャー', 'Meshari Alabra', '継続的慈善'],
    ko: ['예배 시간', '파즈르', '두흐르', '아스르', '마그리브', '이샤', 'Meshari Alabra', '지속적인 자선'],
  },
  'qibla': {
    ar: ['اتجاه القبلة', 'القبلة', 'مكة المكرمة', 'الكعبة', 'بوصلة القبلة', 'مشاري العبره', 'صدقة جارية'],
    en: ['Qibla direction', 'Qibla compass', 'Mecca', 'Kaaba', 'Qibla finder', 'Meshari Alabra', 'Ongoing Charity'],
    ur: ['قبلہ کی سمت', 'قبلہ', 'مکہ مکرمہ', 'کعبہ', 'مشاری العبرہ', 'جاری صدقہ'],
    tr: ['Kıble yönü', 'Kıble', 'Mekke', 'Kabe', 'Kıble pusulası', 'Meshari Alabra', 'Sürekli hayır'],
    id: ['Arah kiblat', 'Kiblat', 'Mekah', 'Ka\'bah', 'Kompas kiblat', 'Meshari Alabra', 'Sedekah jariyah'],
    ms: ['Arah kiblat', 'Kiblat', 'Mekah', 'Ka\'bah', 'Kompas kiblat', 'Meshari Alabra', 'Sedekah jariyah'],
    bn: ['কিবলা দিক', 'কিবলা', 'মক্কা', 'কাবা', 'কিবলা কম্পাস', 'মেশারি আল-আবরা', 'চলমান সদকা'],
    fr: ['Direction de la Qibla', 'Qibla', 'La Mecque', 'Kaaba', 'Boussole Qibla', 'Meshari Alabra', 'Aumône continue'],
    zh: ['朝拜方向', '朝拜', '麦加', '天房', '朝拜指南针', 'Meshari Alabra', '持续慈善'],
    it: ['Direzione Qibla', 'Qibla', 'La Mecca', 'Kaaba', 'Bussola Qibla', 'Meshari Alabra', 'Carità continua'],
    ja: ['キブラ方向', 'キブラ', 'メッカ', 'カーバ', 'キブラコンパス', 'Meshari Alabra', '継続的慈善'],
    ko: ['키블라 방향', '키블라', '메카', '카바', '키블라 나침반', 'Meshari Alabra', '지속적인 자선'],
  },
  'donation': {
    ar: ['كفالة يتيم', 'صدقة جارية', 'تبرع', 'خير', 'إحسان', 'زكاة', 'مشاري العبره', 'كفالة أيتام'],
    en: ['Orphan sponsorship', 'Ongoing charity', 'Donation', 'Charity', 'Sadaqah', 'Zakat', 'Meshari Alabra', 'Orphan care'],
    ur: ['یتیم کی کفالت', 'جاری صدقہ', 'عطیہ', 'خیرات', 'صدقہ', 'زکوٰۃ', 'مشاری العبرہ'],
    tr: ['Yetim sponsorluğu', 'Sürekli hayır', 'Bağış', 'Hayır', 'Sadaka', 'Zekat', 'Meshari Alabra'],
    id: ['Sponsor anak yatim', 'Sedekah jariyah', 'Donasi', 'Amal', 'Sedekah', 'Zakat', 'Meshari Alabra'],
    ms: ['Sponsor anak yatim', 'Sedekah jariyah', 'Derma', 'Amal', 'Sedekah', 'Zakat', 'Meshari Alabra'],
    bn: ['এতিম স্পনসর', 'চলমান সদকা', 'দান', 'খয়রাত', 'সদকা', 'যাকাত', 'মেশারি আল-আবরা'],
    fr: ['Parrainage d\'orphelins', 'Aumône continue', 'Don', 'Charité', 'Sadaqa', 'Zakat', 'Meshari Alabra'],
    zh: ['孤儿赞助', '持续慈善', '捐赠', '慈善', '施舍', '天课', 'Meshari Alabra'],
    it: ['Sponsorizzazione orfani', 'Carità continua', 'Donazione', 'Carità', 'Sadaqa', 'Zakat', 'Meshari Alabra'],
    ja: ['孤児支援', '継続的慈善', '寄付', '慈善', 'サダカ', 'ザカート', 'Meshari Alabra'],
    ko: ['고아 후원', '지속적인 자선', '기부', '자선', '사다카', '자카트', 'Meshari Alabra'],
  },
  'supplications': {
    ar: ['أدعية', 'دعاء', 'أدعية للميت', 'أدعية يومية', 'أذكار', 'مشاري العبره', 'صدقة جارية'],
    en: ['Supplications', 'Dua', 'Prayers for deceased', 'Daily supplications', 'Dhikr', 'Meshari Alabra', 'Ongoing Charity'],
    ur: ['دعائیں', 'دعا', 'میت کے لیے دعا', 'روزانہ دعائیں', 'مشاری العبرہ', 'جاری صدقہ'],
    tr: ['Dualar', 'Dua', 'Ölü için dua', 'Günlük dualar', 'Meshari Alabra', 'Sürekli hayır'],
    id: ['Doa', 'Doa untuk yang meninggal', 'Doa harian', 'Dzikir', 'Meshari Alabra', 'Sedekah jariyah'],
    ms: ['Doa', 'Doa untuk yang meninggal', 'Doa harian', 'Zikir', 'Meshari Alabra', 'Sedekah jariyah'],
    bn: ['দোয়া', 'মৃতের জন্য দোয়া', 'দৈনিক দোয়া', 'জিকির', 'মেশারি আল-আবরা', 'চলমান সদকা'],
    fr: ['Supplications', 'Prière pour les défunts', 'Supplications quotidiennes', 'Meshari Alabra', 'Aumône continue'],
    zh: ['祈祷', '为逝者祈祷', '每日祈祷', 'Meshari Alabra', '持续慈善'],
    it: ['Suppliche', 'Preghiera per i defunti', 'Suppliche quotidiane', 'Meshari Alabra', 'Carità continua'],
    ja: ['祈り', '故人のための祈り', '日々の祈り', 'Meshari Alabra', '継続的慈善'],
    ko: ['기도', '고인을 위한 기도', '일일 기도', 'Meshari Alabra', '지속적인 자선'],
  },
  'hadith': {
    ar: ['أحاديث', 'أحاديث نبوية', 'حديث شريف', 'السنة النبوية', 'مشاري العبره', 'صدقة جارية'],
    en: ['Hadith', 'Prophetic traditions', 'Sunnah', 'Islamic hadith', 'Meshari Alabra', 'Ongoing Charity'],
    ur: ['احادیث', 'احادیث نبوی', 'حدیث شریف', 'مشاری العبرہ', 'جاری صدقہ'],
    tr: ['Hadis', 'Peygamber hadisleri', 'Sünnet', 'Meshari Alabra', 'Sürekli hayır'],
    id: ['Hadits', 'Hadits Nabi', 'Sunnah', 'Meshari Alabra', 'Sedekah jariyah'],
    ms: ['Hadis', 'Hadis Nabi', 'Sunnah', 'Meshari Alabra', 'Sedekah jariyah'],
    bn: ['হাদিস', 'নবী হাদিস', 'সুন্নাহ', 'মেশারি আল-আবরা', 'চলমান সদকা'],
    fr: ['Hadith', 'Traditions prophétiques', 'Sounna', 'Meshari Alabra', 'Aumône continue'],
    zh: ['圣训', '先知传统', '逊奈', 'Meshari Alabra', '持续慈善'],
    it: ['Hadith', 'Tradizioni profetiche', 'Sunna', 'Meshari Alabra', 'Carità continua'],
    ja: ['ハディース', '預言者の伝統', 'スンナ', 'Meshari Alabra', '継続的慈善'],
    ko: ['하디스', '예언자 전통', '순나', 'Meshari Alabra', '지속적인 자선'],
  },
  'youtube': {
    ar: ['مقاطع قرآن', 'تلاوات قرآنية', 'قناة يوتيوب', 'فيديوهات إسلامية', 'مشاري العبره', 'صدقة جارية'],
    en: ['Quran videos', 'Quran recitations', 'YouTube channel', 'Islamic videos', 'Meshari Alabra', 'Ongoing Charity'],
    ur: ['قرآن ویڈیوز', 'قرآن کی تلاوتیں', 'یوٹیوب چینل', 'مشاری العبرہ', 'جاری صدقہ'],
    tr: ['Kuran videoları', 'Kuran tilavetleri', 'YouTube kanalı', 'Meshari Alabra', 'Sürekli hayır'],
    id: ['Video Al-Quran', 'Tilawah Al-Quran', 'Channel YouTube', 'Meshari Alabra', 'Sedekah jariyah'],
    ms: ['Video Al-Quran', 'Tilawah Al-Quran', 'Saluran YouTube', 'Meshari Alabra', 'Sedekah jariyah'],
    bn: ['কুরআন ভিডিও', 'কুরআন তিলাওয়াত', 'ইউটিউব চ্যানেল', 'মেশারি আল-আবরা', 'চলমান সদকা'],
    fr: ['Vidéos Coran', 'Récitations du Coran', 'Chaîne YouTube', 'Meshari Alabra', 'Aumône continue'],
    zh: ['古兰经视频', '古兰经诵读', 'YouTube频道', 'Meshari Alabra', '持续慈善'],
    it: ['Video Corano', 'Recitazioni del Corano', 'Canale YouTube', 'Meshari Alabra', 'Carità continua'],
    ja: ['コーラン動画', 'コーラン朗読', 'YouTubeチャンネル', 'Meshari Alabra', '継続的慈善'],
    ko: ['꾸란 비디오', '꾸란 낭독', 'YouTube 채널', 'Meshari Alabra', '지속적인 자선'],
  },
};

const localeMap: Record<string, string> = {
  ar: 'ar_SA',
  en: 'en_US',
  ur: 'ur_PK',
  tr: 'tr_TR',
  id: 'id_ID',
  ms: 'ms_MY',
  bn: 'bn_BD',
  fr: 'fr_FR',
  zh: 'zh_CN',
  it: 'it_IT',
  ja: 'ja_JP',
  ko: 'ko_KR',
};

export function generateSectionMetadata(
  sectionId: SectionId,
  lang: string = 'ar'
): Metadata {
  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
  const currentLang = supportedLanguages.includes(lang) ? lang : 'ar';
  const t = translations[currentLang] || translations.ar;
  
  const keys = sectionKeys[sectionId];
  const title = t[keys.title] || keys.title;
  const description = t[keys.subtitle] || keys.subtitle;
  const siteName = currentLang === 'ar' 
    ? 'صدقة جارية لمشاري' 
    : "Meshari's Ongoing Charity";
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity';
  const basePath = currentLang === 'ar' ? '' : `/${currentLang}`;
  const canonicalUrl = `${siteUrl}${basePath}/sections/${sectionId}`;
  
  // Generate alternate language URLs
  const alternates: Record<string, string> = {};
  supportedLanguages.forEach(l => {
    if (l === 'ar') {
      alternates[l] = `${siteUrl}/sections/${sectionId}`;
    } else {
      alternates[l] = `${siteUrl}/${l}/sections/${sectionId}`;
    }
  });

  // Get comprehensive keywords for this section and language
  const sectionSpecificKeywords = sectionKeywords[sectionId]?.[currentLang] || [];
  const baseKeywords = [
    title,
    description,
    siteName,
    currentLang === 'ar' ? 'مشاري العبره' : 'Meshari Alabra',
    currentLang === 'ar' ? 'صدقة جارية' : 'Ongoing Charity',
    currentLang === 'ar' ? 'صدقة جارية لمشاري' : 'Meshari Ongoing Charity',
  ];
  const allKeywords = [...baseKeywords, ...sectionSpecificKeywords].filter(Boolean);

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: allKeywords.join(', '),
    category: sectionId,
    authors: [{ name: currentLang === 'ar' ? 'عائلة مشاري العبره' : 'Family of Meshari Alabra' }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
      ],
      locale: localeMap[currentLang] || 'ar_SA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      images: [`${siteUrl}/og-image.png`],
      site: '@alabrameshari',
      creator: '@alabrameshari',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Additional SEO meta tags
    other: {
      'article:author': siteName,
      'article:section': sectionId,
      'article:tag': allKeywords.slice(0, 5).join(', '),
      'geo.region': localeMap[currentLang]?.split('_')[1] || 'SA',
      'geo.placename': currentLang === 'ar' ? 'الرياض' : 'Riyadh',
      'language': currentLang,
      'revisit-after': '7 days',
      'rating': 'general',
      'distribution': 'global',
      'audience': 'all',
    },
  };
}

export function generateSectionSchema(
  sectionId: SectionId,
  lang: string = 'ar'
): object {
  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
  const currentLang = supportedLanguages.includes(lang) ? lang : 'ar';
  const t = translations[currentLang] || translations.ar;
  
  const keys = sectionKeys[sectionId];
  const title = t[keys.title] || keys.title;
  const description = t[keys.subtitle] || keys.subtitle;
  const siteName = currentLang === 'ar' 
    ? 'صدقة جارية لمشاري' 
    : "Meshari's Ongoing Charity";
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity';
  const basePath = currentLang === 'ar' ? '' : `/${currentLang}`;
  const url = `${siteUrl}${basePath}/sections/${sectionId}`;
  
  // Generate alternate language URLs for hreflang
  const alternateUrls: Array<{ '@type': string; '@id': string; inLanguage: string }> = [];
  supportedLanguages.forEach(l => {
    const langUrl = l === 'ar' 
      ? `${siteUrl}/sections/${sectionId}`
      : `${siteUrl}/${l}/sections/${sectionId}`;
    alternateUrls.push({
      '@type': 'WebPage',
      '@id': langUrl,
      inLanguage: l,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${title} | ${siteName}`,
    description,
    url,
    inLanguage: currentLang,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: currentLang === 'ar' ? 'الرئيسية' : 'Home',
          item: currentLang === 'ar' ? siteUrl : `${siteUrl}/${currentLang}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: url,
        },
      ],
    },
    mainEntity: {
      '@type': 'Article',
      headline: title,
      description,
      author: {
        '@type': 'Organization',
        name: siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/icons/icon-512x512.png`,
        },
      },
    },
    // Add multilingual alternate pages
    hasPart: alternateUrls,
  };
}

