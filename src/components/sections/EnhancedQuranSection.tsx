"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { BookOpen, ChevronDown, Play, Pause, Volume2, Download, Share2, Bookmark, BookmarkCheck, Search, X } from "lucide-react";
import ShareModal from "../ShareModal";
import BidiText from "../BidiText";
import SectionTitleLink from "./SectionTitleLink";
import { localeDirection, siteConfig } from "@/config/site";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation?: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Reciter {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  isMeshariFavorite?: boolean;
}

interface Translation {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

// Helper function to create surah with default properties
const createSurah = (number: number, name: string, englishName: string, englishNameTranslation: string, revelationType: string, numberOfAyahs: number) => ({
  number,
  name,
  englishName,
  englishNameTranslation,
  revelationType,
  numberOfAyahs
});

// Static fallback data for all 114 surahs (simplified for fallback)
const STATIC_SURAHS = [
  createSurah(1, "الفاتحة", "Al-Faatiha", "The Opening", "Meccan", 7),
  createSurah(2, "البقرة", "Al-Baqarah", "The Cow", "Medinan", 286),
  createSurah(3, "آل عمران", "Aal-i-Imraan", "Family of Imran", "Medinan", 200),
  createSurah(4, "النساء", "An-Nisaa", "The Women", "Medinan", 176),
  createSurah(5, "المائدة", "Al-Maaida", "The Table Spread", "Medinan", 120),
  createSurah(6, "الأنعام", "Al-An'aam", "The Cattle", "Meccan", 165),
  createSurah(7, "الأعراف", "Al-A'raaf", "The Heights", "Meccan", 206),
  createSurah(8, "الأنفال", "Al-Anfaal", "The Spoils of War", "Medinan", 75),
  createSurah(9, "التوبة", "At-Tawba", "The Repentance", "Medinan", 129),
  createSurah(10, "يونس", "Yunus", "Jonah", "Meccan", 109),
  createSurah(11, "هود", "Hud", "Hud", "Meccan", 123),
  createSurah(12, "يوسف", "Yusuf", "Joseph", "Meccan", 111),
  { number: 13, name: "الرعد", englishName: "Ar-Ra'd", revelationType: "Medinan", numberOfAyahs: 43 },
  { number: 14, name: "إبراهيم", englishName: "Ibraaheem", revelationType: "Meccan", numberOfAyahs: 52 },
  { number: 15, name: "الحجر", englishName: "Al-Hijr", revelationType: "Meccan", numberOfAyahs: 99 },
  { number: 16, name: "النحل", englishName: "An-Nahl", revelationType: "Meccan", numberOfAyahs: 128 },
  { number: 17, name: "الإسراء", englishName: "Al-Israa", revelationType: "Meccan", numberOfAyahs: 111 },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", revelationType: "Meccan", numberOfAyahs: 110 },
  { number: 19, name: "مريم", englishName: "Maryam", revelationType: "Meccan", numberOfAyahs: 98 },
  { number: 20, name: "طه", englishName: "Taa-Haa", revelationType: "Meccan", numberOfAyahs: 135 },
  { number: 21, name: "الأنبياء", englishName: "Al-Anbiyaa", revelationType: "Meccan", numberOfAyahs: 112 },
  { number: 22, name: "الحج", englishName: "Al-Hajj", revelationType: "Medinan", numberOfAyahs: 78 },
  { number: 23, name: "المؤمنون", englishName: "Al-Mu'minoon", revelationType: "Meccan", numberOfAyahs: 118 },
  { number: 24, name: "النور", englishName: "An-Noor", revelationType: "Medinan", numberOfAyahs: 64 },
  { number: 25, name: "الفرقان", englishName: "Al-Furqaan", revelationType: "Meccan", numberOfAyahs: 77 },
  { number: 26, name: "الشعراء", englishName: "Ash-Shu'araa", revelationType: "Meccan", numberOfAyahs: 227 },
  { number: 27, name: "النمل", englishName: "An-Naml", revelationType: "Meccan", numberOfAyahs: 93 },
  { number: 28, name: "القصص", englishName: "Al-Qasas", revelationType: "Meccan", numberOfAyahs: 88 },
  { number: 29, name: "العنكبوت", englishName: "Al-Ankaboot", revelationType: "Meccan", numberOfAyahs: 69 },
  { number: 30, name: "الروم", englishName: "Ar-Room", revelationType: "Meccan", numberOfAyahs: 60 },
  { number: 31, name: "لقمان", englishName: "Luqman", revelationType: "Meccan", numberOfAyahs: 34 },
  { number: 32, name: "السجدة", englishName: "As-Sajda", revelationType: "Meccan", numberOfAyahs: 30 },
  { number: 33, name: "الأحزاب", englishName: "Al-Ahzaab", revelationType: "Medinan", numberOfAyahs: 73 },
  { number: 34, name: "سبأ", englishName: "Saba", revelationType: "Meccan", numberOfAyahs: 54 },
  { number: 35, name: "فاطر", englishName: "Faatir", revelationType: "Meccan", numberOfAyahs: 45 },
  { number: 36, name: "يس", englishName: "Yaseen", revelationType: "Meccan", numberOfAyahs: 83 },
  { number: 37, name: "الصافات", englishName: "As-Saaffaat", revelationType: "Meccan", numberOfAyahs: 182 },
  { number: 38, name: "ص", englishName: "Saad", revelationType: "Meccan", numberOfAyahs: 88 },
  { number: 39, name: "الزمر", englishName: "Az-Zumar", revelationType: "Meccan", numberOfAyahs: 75 },
  { number: 40, name: "غافر", englishName: "Ghaafir", revelationType: "Meccan", numberOfAyahs: 85 },
  { number: 41, name: "فصلت", englishName: "Fussilat", revelationType: "Meccan", numberOfAyahs: 54 },
  { number: 42, name: "الشورى", englishName: "Ash-Shuraa", revelationType: "Meccan", numberOfAyahs: 53 },
  { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", revelationType: "Meccan", numberOfAyahs: 89 },
  { number: 44, name: "الدخان", englishName: "Ad-Dukhaan", revelationType: "Meccan", numberOfAyahs: 59 },
  { number: 45, name: "الجاثية", englishName: "Al-Jaathiya", revelationType: "Meccan", numberOfAyahs: 37 },
  { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", revelationType: "Meccan", numberOfAyahs: 35 },
  { number: 47, name: "محمد", englishName: "Muhammad", revelationType: "Medinan", numberOfAyahs: 38 },
  { number: 48, name: "الفتح", englishName: "Al-Fath", revelationType: "Medinan", numberOfAyahs: 29 },
  { number: 49, name: "الحجرات", englishName: "Al-Hujuraat", revelationType: "Medinan", numberOfAyahs: 18 },
  { number: 50, name: "ق", englishName: "Qaaf", revelationType: "Meccan", numberOfAyahs: 45 },
  { number: 51, name: "الذاريات", englishName: "Adh-Dhaariyat", revelationType: "Meccan", numberOfAyahs: 60 },
  { number: 52, name: "الطور", englishName: "At-Tur", revelationType: "Meccan", numberOfAyahs: 49 },
  { number: 53, name: "النجم", englishName: "An-Najm", revelationType: "Meccan", numberOfAyahs: 62 },
  { number: 54, name: "القمر", englishName: "Al-Qamar", revelationType: "Meccan", numberOfAyahs: 55 },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahmaan", revelationType: "Medinan", numberOfAyahs: 78 },
  { number: 56, name: "الواقعة", englishName: "Al-Waaqia", revelationType: "Meccan", numberOfAyahs: 96 },
  { number: 57, name: "الحديد", englishName: "Al-Hadid", revelationType: "Medinan", numberOfAyahs: 29 },
  { number: 58, name: "المجادلة", englishName: "Al-Mujaadila", revelationType: "Medinan", numberOfAyahs: 22 },
  { number: 59, name: "الحشر", englishName: "Al-Hashr", revelationType: "Medinan", numberOfAyahs: 24 },
  { number: 60, name: "الممتحنة", englishName: "Al-Mumtahana", revelationType: "Medinan", numberOfAyahs: 13 },
  { number: 61, name: "الصف", englishName: "As-Saff", revelationType: "Medinan", numberOfAyahs: 14 },
  { number: 62, name: "الجمعة", englishName: "Al-Jumu'a", revelationType: "Medinan", numberOfAyahs: 11 },
  { number: 63, name: "المنافقون", englishName: "Al-Munaafiqoon", revelationType: "Medinan", numberOfAyahs: 11 },
  { number: 64, name: "التغابن", englishName: "At-Taghaabun", revelationType: "Medinan", numberOfAyahs: 18 },
  { number: 65, name: "الطلاق", englishName: "At-Talaaq", revelationType: "Medinan", numberOfAyahs: 12 },
  { number: 66, name: "التحريم", englishName: "At-Tahrim", revelationType: "Medinan", numberOfAyahs: 12 },
  { number: 67, name: "الملك", englishName: "Al-Mulk", revelationType: "Meccan", numberOfAyahs: 30 },
  { number: 68, name: "القلم", englishName: "Al-Qalam", revelationType: "Meccan", numberOfAyahs: 52 },
  { number: 69, name: "الحاقة", englishName: "Al-Haaqqa", revelationType: "Meccan", numberOfAyahs: 52 },
  { number: 70, name: "المعارج", englishName: "Al-Ma'aarij", revelationType: "Meccan", numberOfAyahs: 44 },
  { number: 71, name: "نوح", englishName: "Nooh", revelationType: "Meccan", numberOfAyahs: 28 },
  { number: 72, name: "الجن", englishName: "Al-Jinn", revelationType: "Meccan", numberOfAyahs: 28 },
  { number: 73, name: "المزمل", englishName: "Al-Muzzammil", revelationType: "Meccan", numberOfAyahs: 20 },
  { number: 74, name: "المدثر", englishName: "Al-Muddaththir", revelationType: "Meccan", numberOfAyahs: 56 },
  { number: 75, name: "القيامة", englishName: "Al-Qiyaama", revelationType: "Meccan", numberOfAyahs: 40 },
  { number: 76, name: "الإنسان", englishName: "Al-Insaan", revelationType: "Medinan", numberOfAyahs: 31 },
  { number: 77, name: "المرسلات", englishName: "Al-Mursalaat", revelationType: "Meccan", numberOfAyahs: 50 },
  { number: 78, name: "النبأ", englishName: "An-Naba", revelationType: "Meccan", numberOfAyahs: 40 },
  { number: 79, name: "النازعات", englishName: "An-Naazi'aat", revelationType: "Meccan", numberOfAyahs: 46 },
  { number: 80, name: "عبس", englishName: "Abasa", revelationType: "Meccan", numberOfAyahs: 42 },
  { number: 81, name: "التكوير", englishName: "At-Takwir", revelationType: "Meccan", numberOfAyahs: 29 },
  { number: 82, name: "الانفطار", englishName: "Al-Infitaar", revelationType: "Meccan", numberOfAyahs: 19 },
  { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", revelationType: "Meccan", numberOfAyahs: 36 },
  { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaaq", revelationType: "Meccan", numberOfAyahs: 25 },
  { number: 85, name: "البروج", englishName: "Al-Burooj", revelationType: "Meccan", numberOfAyahs: 22 },
  { number: 86, name: "الطارق", englishName: "At-Taariq", revelationType: "Meccan", numberOfAyahs: 17 },
  { number: 87, name: "الأعلى", englishName: "Al-A'laa", revelationType: "Meccan", numberOfAyahs: 19 },
  { number: 88, name: "الغاشية", englishName: "Al-Ghaashiya", revelationType: "Meccan", numberOfAyahs: 26 },
  { number: 89, name: "الفجر", englishName: "Al-Fajr", revelationType: "Meccan", numberOfAyahs: 30 },
  { number: 90, name: "البلد", englishName: "Al-Balad", revelationType: "Meccan", numberOfAyahs: 20 },
  { number: 91, name: "الشمس", englishName: "Ash-Shams", revelationType: "Meccan", numberOfAyahs: 15 },
  { number: 92, name: "الليل", englishName: "Al-Layl", revelationType: "Meccan", numberOfAyahs: 21 },
  { number: 93, name: "الضحى", englishName: "Ad-Dhuhaa", revelationType: "Meccan", numberOfAyahs: 11 },
  { number: 94, name: "الشرح", englishName: "Ash-Sharh", revelationType: "Meccan", numberOfAyahs: 8 },
  { number: 95, name: "التين", englishName: "At-Tin", revelationType: "Meccan", numberOfAyahs: 8 },
  { number: 96, name: "العلق", englishName: "Al-Alaq", revelationType: "Meccan", numberOfAyahs: 19 },
  { number: 97, name: "القدر", englishName: "Al-Qadr", revelationType: "Meccan", numberOfAyahs: 5 },
  { number: 98, name: "البينة", englishName: "Al-Bayyina", revelationType: "Medinan", numberOfAyahs: 8 },
  { number: 99, name: "الزلزلة", englishName: "Az-Zalzala", revelationType: "Medinan", numberOfAyahs: 8 },
  { number: 100, name: "العاديات", englishName: "Al-Aadiyaat", revelationType: "Meccan", numberOfAyahs: 11 },
  { number: 101, name: "القارعة", englishName: "Al-Qaari'a", revelationType: "Meccan", numberOfAyahs: 11 },
  { number: 102, name: "التكاثر", englishName: "At-Takaathur", revelationType: "Meccan", numberOfAyahs: 8 },
  { number: 103, name: "العصر", englishName: "Al-Asr", revelationType: "Meccan", numberOfAyahs: 3 },
  { number: 104, name: "الهمزة", englishName: "Al-Humaza", revelationType: "Meccan", numberOfAyahs: 9 },
  { number: 105, name: "الفيل", englishName: "Al-Fil", revelationType: "Meccan", numberOfAyahs: 5 },
  { number: 106, name: "قريش", englishName: "Quraysh", revelationType: "Meccan", numberOfAyahs: 4 },
  { number: 107, name: "الماعون", englishName: "Al-Maa'un", revelationType: "Meccan", numberOfAyahs: 7 },
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", revelationType: "Meccan", numberOfAyahs: 3 },
  { number: 109, name: "الكافرون", englishName: "Al-Kaafiroon", revelationType: "Meccan", numberOfAyahs: 6 },
  { number: 110, name: "النصر", englishName: "An-Nasr", revelationType: "Medinan", numberOfAyahs: 3 },
  { number: 111, name: "المسد", englishName: "Al-Masad", revelationType: "Meccan", numberOfAyahs: 5 },
  createSurah(112, "الإخلاص", "Al-Ikhlaas", "The Sincerity", "Meccan", 4),
  createSurah(113, "الفلق", "Al-Falaq", "The Daybreak", "Meccan", 5),
  createSurah(114, "الناس", "An-Naas", "Mankind", "Meccan", 6)
];

// Helper function to create ayah with default properties
const createAyah = (number: number, numberInSurah: number, juz: number, page: number, text: string) => ({
  number,
  numberInSurah,
  juz,
  page,
  text,
  manzil: Math.ceil(juz / 7),
  ruku: Math.ceil(numberInSurah / 10),
  hizbQuarter: Math.ceil(juz / 2),
  sajda: false
});

// Static fallback ayahs for common surahs (simplified for fallback)
const STATIC_AYAHS: { [key: number]: any[] } = {
  1: [ // Al-Faatiha
    createAyah(1, 1, 1, 1, "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"),
    createAyah(2, 2, 1, 1, "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"),
    createAyah(3, 3, 1, 1, "الرَّحْمَٰنِ الرَّحِيمِ"),
    createAyah(4, 4, 1, 1, "مَالِكِ يَوْمِ الدِّينِ"),
    createAyah(5, 5, 1, 1, "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ"),
    createAyah(6, 6, 1, 1, "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ"),
    createAyah(7, 7, 1, 1, "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ")
  ],
  2: [ // Al-Baqarah (first few ayahs)
    createAyah(8, 1, 1, 2, "الم"),
    createAyah(9, 2, 1, 2, "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ"),
    createAyah(10, 3, 1, 2, "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ")
  ],
  112: [ // Al-Ikhlaas
    createAyah(6224, 1, 30, 604, "قُلْ هُوَ اللَّهُ أَحَدٌ"),
    createAyah(6225, 2, 30, 604, "اللَّهُ الصَّمَدُ"),
    createAyah(6226, 3, 30, 604, "لَمْ يَلِدْ وَلَمْ يُولَدْ"),
    createAyah(6227, 4, 30, 604, "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ")
  ],
  113: [ // Al-Falaq
    createAyah(6228, 1, 30, 604, "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ"),
    createAyah(6229, 2, 30, 604, "مِن شَرِّ مَا خَلَقَ"),
    createAyah(6230, 3, 30, 604, "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ"),
    createAyah(6231, 4, 30, 604, "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ"),
    createAyah(6232, 5, 30, 604, "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ")
  ],
  114: [ // An-Naas
    createAyah(6233, 1, 30, 604, "قُلْ أَعُوذُ بِرَبِّ النَّاسِ"),
    createAyah(6234, 2, 30, 604, "مَلِكِ النَّاسِ"),
    createAyah(6235, 3, 30, 604, "إِلَٰهِ النَّاسِ"),
    createAyah(6236, 4, 30, 604, "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ"),
    createAyah(6237, 5, 30, 604, "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ"),
    createAyah(6238, 6, 30, 604, "مِنَ الْجِنَّةِ وَالنَّاسِ")
  ]
};

// Component for individual ayah translation
function AyahTranslation({ surahNumber, ayahNumber, translationId, locale }: { 
  surahNumber: number; 
  ayahNumber: number; 
  translationId: string; 
  locale: string; 
}) {
  const [translationText, setTranslationText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/quran/ayah/${surahNumber}:${ayahNumber}/${translationId}`);
        const data = await response.json();
        if (data.data && data.data.text) {
          setTranslationText(data.data.text);
        }
      } catch (error) {
        console.error("Error fetching translation:", error);
      } finally {
        setLoading(false);
      }
    };

    if (translationId) {
      fetchTranslation();
    }
  }, [surahNumber, ayahNumber, translationId]);

  if (loading) {
    return <div className="text-gray-500">Loading translation...</div>;
  }

  // RTL languages: Arabic, Urdu, Hebrew, Farsi, Yiddish, Pashto
  const rtlLanguages = ['ar', 'ur', 'he', 'fa', 'yi', 'ps'];
  const isRTL = rtlLanguages.includes(locale);
  const textDirection = isRTL ? "rtl" : "ltr";
  
  return (
    <div 
      className={isRTL ? "font-arabic text-right leading-relaxed" : "font-lexend text-left leading-relaxed"} 
      dir={textDirection}
      data-quran-translation
    >
      <BidiText text={translationText} direction={textDirection} />
    </div>
  );
}

export default function EnhancedQuranSection() {
  const { t, locale } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  
  // Read URL params early to set initial surah
  const getInitialSurah = () => {
    if (typeof window === 'undefined') return 1;
    const searchParams = new URLSearchParams(window.location.search);
    const surahParam = searchParams.get('surah');
    if (surahParam) {
      const surah = parseInt(surahParam, 10);
      if (!isNaN(surah) && surah >= 1 && surah <= 114) {
        return surah;
      }
    }
    return 1;
  };
  
  const [selectedSurah, setSelectedSurah] = useState<number>(getInitialSurah());
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<string>("ar.ahmedajamy");
  const [selectedTranslation, setSelectedTranslation] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyah, setCurrentAyah] = useState<number>(1);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isReciterDropdownOpen, setIsReciterDropdownOpen] = useState(false);
  const [usingStaticFallback, setUsingStaticFallback] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedVerseForShare, setSelectedVerseForShare] = useState<{
    surahNumber: number;
    surahName: string;
    ayahNumber: number;
    arabicText: string;
    translation?: string;
    juz?: number;
    page?: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [skipAnimations, setSkipAnimations] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reciterDropdownRef = useRef<HTMLDivElement>(null);
  const searchAbortControllerRef = useRef<AbortController | null>(null);
  const urlParamsProcessedRef = useRef(false);
  const targetSurahRef = useRef<number | null>(null);
  const targetAyahRef = useRef<number | null>(null);

  // Language-based translation mapping
  const getTranslationIdentifier = (locale: string): string => {
    const translationMap: { [key: string]: string } = {
      'ar': 'ar.muyassar',
      'en': 'en.sahih',
      'tr': 'tr.diyanet',
      'ur': 'ur.jalandhry',
      'id': 'id.indonesian',
      'ms': 'ms.basmeih',
      'bn': 'bn.bengali',
      'fr': 'fr.hamidullah',
      'zh': 'zh.jian',
      'it': 'it.piccardo',
      'ja': 'ja.japanese',
      'ko': 'ko.korean'
    };
    return translationMap[locale] || 'en.sahih';
  };

  useEffect(() => {
    setMounted(true);
    fetchSurahs();
    fetchReciters();
    // Load bookmarks from localStorage
    if (typeof window !== 'undefined') {
      const savedBookmarks = localStorage.getItem('quran-bookmarks');
      if (savedBookmarks) {
        try {
          setBookmarks(new Set(JSON.parse(savedBookmarks)));
        } catch (e) {
          console.error('Error loading bookmarks:', e);
        }
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('quran-bookmarks', JSON.stringify(Array.from(bookmarks)));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: { bookmarks: Array.from(bookmarks) } }));
    }
  }, [bookmarks, mounted]);

  const toggleBookmark = (surahNumber: number, ayahNumber: number) => {
    const bookmarkKey = `${surahNumber}-${ayahNumber}`;
    setBookmarks(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(bookmarkKey)) {
        newBookmarks.delete(bookmarkKey);
      } else {
        newBookmarks.add(bookmarkKey);
      }
      return newBookmarks;
    });
  };

  const isBookmarked = (surahNumber: number, ayahNumber: number): boolean => {
    return bookmarks.has(`${surahNumber}-${ayahNumber}`);
  };

  const handleShare = async (ayah: Ayah) => {
    const currentSurah = surahs.find((s) => s.number === selectedSurah);
    if (!currentSurah) return;

    // Fetch translation text
    let translationText = '';
    if (selectedTranslation) {
      try {
        const response = await fetch(`/api/quran/ayah/${selectedSurah}:${ayah.numberInSurah}/${selectedTranslation}`);
        const data = await response.json();
        if (data.data && data.data.text) {
          translationText = data.data.text;
        }
      } catch (error) {
        console.error('Error fetching translation for share:', error);
      }
    }

    setSelectedVerseForShare({
      surahNumber: selectedSurah,
      surahName: locale === 'ar' ? currentSurah.name : currentSurah.englishName,
      ayahNumber: ayah.numberInSurah,
      arabicText: ayah.text,
      translation: translationText,
      juz: ayah.juz,
      page: ayah.page
    });
    setIsShareModalOpen(true);
  };

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setIsPlaying(false);
      console.error("Audio playback error");
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      // Selected surah changed
      fetchAyahs(selectedSurah);
    }
  }, [selectedSurah]);

  useEffect(() => {
    if (mounted) {
      const translationId = getTranslationIdentifier(locale);
      setSelectedTranslation(translationId);
    }
  }, [locale, mounted]);

  // Search function - optimized for instant results with Arabic text
  const handleSearch = async (keyword: string, signal?: AbortSignal) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      setSearchLoading(false);
      return;
    }
    
    try {
      // Search using language code - this is more reliable than edition-specific search
      // For Arabic queries, search in Arabic. For others, search in user's language
      const isArabicQuery = /[\u0600-\u06FF]/.test(keyword);
      const searchLanguage = isArabicQuery ? 'ar' : (locale === 'ar' ? 'ar' : locale);
      
      // Use language code for search (more reliable than edition-specific)
      const searchUrl = `/api/quran/search/${encodeURIComponent(keyword)}/all/${searchLanguage}`;
      
      let response: Response;
      try {
        response = await fetch(searchUrl, {
          headers: {
            'Accept-Encoding': 'gzip, deflate, br',
          },
          signal, // Support request cancellation
        });
      } catch (fetchError: any) {
        // Handle network errors
        if (fetchError.name === 'AbortError' || signal?.aborted) {
          return;
        }
        console.error('Search network error:', fetchError);
        setSearchResults([]);
        setSearchLoading(false);
        return;
      }
      
      // Check if request was aborted
      if (signal?.aborted) {
        return;
      }
      
      // Handle 404 gracefully - just means no results found
      if (response.status === 404) {
        setSearchResults([]);
        setSearchLoading(false);
        return;
      }
      
      if (!response.ok) {
        // Try fallback search if first one fails (for Arabic queries)
        if (isArabicQuery) {
          // Try searching in quran-simple as fallback
          const fallbackUrl = `/api/quran/search/${encodeURIComponent(keyword)}/all/quran-simple`;
          try {
            const fallbackResponse = await fetch(fallbackUrl, {
              headers: {
                'Accept-Encoding': 'gzip, deflate, br',
              },
              signal,
            });
            
            if (signal?.aborted) return;
            
            if (fallbackResponse.ok) {
              response = fallbackResponse; // Use fallback response
            } else {
              setSearchResults([]);
              setSearchLoading(false);
              return;
            }
          } catch (fallbackError: any) {
            if (fallbackError.name !== 'AbortError' && !signal?.aborted) {
              console.error('Search fallback failed:', fallbackError);
            }
            setSearchResults([]);
            setSearchLoading(false);
            return;
          }
        } else {
          // Not Arabic query - handle error normally
          try {
            const errorData = await response.json();
            const errorMessage = errorData?.error || errorData?.message || errorData?.status;
            if (errorMessage && 
                !errorMessage.includes('Nothing matching') && 
                !errorMessage.includes('NOT FOUND') &&
                response.status !== 404) {
              console.error('Search API error:', errorMessage);
            }
          } catch (e) {
            if (response.status !== 404) {
              console.error('Search API error:', `HTTP ${response.status}`);
            }
          }
          setSearchResults([]);
          setSearchLoading(false);
          return;
        }
      }
      
      const data = await response.json();
      
      // Check for API error response
      if (data.error || (data.code && data.code !== 200)) {
        // Handle 404 or no results gracefully
        if (data.code === 404 || data.status === 'NOT FOUND' || data.data === 'Nothing matching your search was found..') {
          setSearchResults([]);
          setSearchLoading(false);
          return;
        }
        // Only log if there's actual error content
        const errorMessage = data.error || data.status || data.message;
        if (errorMessage) {
          console.error('Search API error:', errorMessage);
        }
        setSearchResults([]);
        setSearchLoading(false);
        return;
      }
      
      if (data.code === 200 && data.data) {
        let matches: any[] = [];
        
        // Handle different response structures
        if (data.data.matches && Array.isArray(data.data.matches)) {
          matches = data.data.matches;
        } else if (Array.isArray(data.data)) {
          matches = data.data;
        } else if (data.data.count !== undefined && data.data.count === 0) {
          // No results found
          setSearchResults([]);
          setSearchLoading(false);
          return;
        }
        
        if (matches.length === 0) {
          setSearchResults([]);
          setSearchLoading(false);
          return;
        }
        
        // CRITICAL: Always fetch the ACTUAL Quranic ayah text for each result
        // The search might return tafseer/translation, so we MUST fetch the real ayah
        // Show structure immediately, then fetch Arabic text
        const initialResults = matches.map((match) => {
          const surahNumber = match.surah?.number || match.surahNumber;
          const ayahNumber = match.numberInSurah || match.ayah || match.number;
          
          return {
            ...match,
            arabicText: '', // Will be fetched
            translation: match.text || '', // Temporary: might be translation or tafseer
            surahNumber,
            ayahNumber,
          };
        });
        
        // Set initial results immediately for instant display
        setSearchResults(initialResults);
        setSearchLoading(false);
        
        // Fetch ACTUAL Quranic ayah text for ALL results in parallel (non-blocking)
        Promise.all(
          initialResults.map(async (result, index) => {
            if (!result.surahNumber || !result.ayahNumber || signal?.aborted) return;
            
            try {
              // ALWAYS fetch the actual Quranic ayah text from quran-uthmani
              const arabicResponse = await fetch(`/api/quran/ayah/${result.surahNumber}:${result.ayahNumber}/quran-uthmani`, {
                headers: {
                  'Accept-Encoding': 'gzip, deflate, br',
                },
                signal,
              });
              
              if (arabicResponse.ok && !signal?.aborted) {
                const arabicData = await arabicResponse.json();
                if (arabicData.code === 200 && arabicData.data && arabicData.data.text) {
                  // Update with ACTUAL Quranic ayah text
                  setSearchResults(prev => {
                    const updated = [...prev];
                    if (updated[index] && !signal?.aborted) {
                      updated[index] = { 
                        ...updated[index], 
                        arabicText: arabicData.data.text // Real Quranic text
                      };
                    }
                    return updated;
                  });
                }
              }
            } catch (error: any) {
              // Silently fail
              if (error.name !== 'AbortError' && !signal?.aborted) {
                // Only log unexpected errors
              }
            }
          })
        ).catch(() => {
          // Ignore errors
        });
        
        const finalResults = initialResults;
        
        // Fetch translations in background (non-blocking) for non-Arabic users
        if (locale !== 'ar' && finalResults.length > 0 && !signal?.aborted) {
          const translationId = getTranslationIdentifier(locale);
          
          // Fetch translations in batches to avoid overwhelming the API
          const batchSize = 10;
          for (let i = 0; i < finalResults.length && !signal?.aborted; i += batchSize) {
            const batch = finalResults.slice(i, i + batchSize);
            
            Promise.all(
              batch.map(async (result, batchIndex) => {
                if (!result.surahNumber || !result.ayahNumber || signal?.aborted) return;
                
                try {
                  const translationResponse = await fetch(`/api/quran/ayah/${result.surahNumber}:${result.ayahNumber}/${translationId}`, {
                    headers: {
                      'Accept-Encoding': 'gzip, deflate, br',
                    },
                    signal, // Support cancellation
                  });
                  
                  if (translationResponse.ok && !signal?.aborted) {
                    const translationData = await translationResponse.json();
                    if (translationData.code === 200 && translationData.data && translationData.data.text) {
                      // Update the specific result with translation
                      const globalIndex = i + batchIndex;
                      setSearchResults(prev => {
                        const updated = [...prev];
                        if (updated[globalIndex] && !signal?.aborted) {
                          updated[globalIndex] = { ...updated[globalIndex], translation: translationData.data.text };
                        }
                        return updated;
                      });
                    }
                  }
                } catch (error: any) {
                  // Silently fail - translation is optional
                  // AbortError is expected when search is cancelled, don't log it
                  if (error.name !== 'AbortError' && !signal?.aborted) {
                    // Only log unexpected errors
                  }
                }
              })
            ).catch(() => {
              // Ignore errors in background translation fetching
            });
            
            // Small delay between batches to avoid rate limiting
            if (i + batchSize < finalResults.length && !signal?.aborted) {
              await new Promise(resolve => setTimeout(resolve, 50));
            }
          }
        }
      } else {
        setSearchResults([]);
        setSearchLoading(false);
      }
    } catch (error: any) {
      // Don't log AbortError - it's expected when user types quickly or query changes
      // AbortError is a normal part of request cancellation, not a real error
      if (error.name === 'AbortError' || signal?.aborted) {
        // Request was cancelled, which is expected - do nothing
        return;
      }
      
      // Only log and handle real errors
      console.error('Search error:', error);
      setSearchResults([]);
      setSearchLoading(false);
    }
  };

  // Instant search - no debounce for instant feedback
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      setSearchLoading(false);
      // Cancel any pending search
      if (searchAbortControllerRef.current) {
        searchAbortControllerRef.current.abort();
        searchAbortControllerRef.current = null;
      }
      return;
    }

    // Cancel previous search if still pending
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
    }

    // Create new abort controller for this search
    const abortController = new AbortController();
    searchAbortControllerRef.current = abortController;

    // Show loading immediately for instant feedback
    setSearchLoading(true);
    setShowSearchResults(true);

    // Search immediately - no debounce for instant results
    handleSearch(searchQuery, abortController.signal);

    return () => {
      // Cleanup: abort search if component unmounts or query changes
      // This is expected behavior when user types quickly
      try {
        if (!abortController.signal.aborted) {
          abortController.abort();
        }
      } catch (e) {
        // Ignore any errors from aborting - it's expected behavior
      }
    };
  }, [searchQuery]);

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (reciterDropdownRef.current && !reciterDropdownRef.current.contains(event.target as Node)) {
        setIsReciterDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper function to scroll to a specific ayah
  const scrollToAyahElement = (ayahNumber: number, retries = 30) => {
    const ayahElement = document.querySelector(`[data-ayah-number="${ayahNumber}"]`);
    if (ayahElement) {
      // Scroll to the ayah
      ayahElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Highlight the ayah
      ayahElement.classList.add('ring-4', 'ring-islamic-gold', 'ring-opacity-50', 'transition-all', 'duration-300');
      setTimeout(() => {
        ayahElement.classList.remove('ring-4', 'ring-islamic-gold', 'ring-opacity-50');
      }, 3000);
      return true;
    } else if (retries > 0) {
      // Retry if element not found yet (ayahs still loading)
      setTimeout(() => scrollToAyahElement(ayahNumber, retries - 1), 200);
      return false;
    }
    return false;
  };

  // Read URL parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined' || !mounted) return;
    
    const searchParams = new URLSearchParams(window.location.search);
    const surahParam = searchParams.get('surah');
    const ayahParam = searchParams.get('ayah');
    
    if (surahParam && ayahParam) {
      const surah = parseInt(surahParam, 10);
      const ayah = parseInt(ayahParam, 10);
      
      if (!isNaN(surah) && !isNaN(ayah) && surah >= 1 && surah <= 114 && ayah >= 1) {
        // Store target in refs
        targetSurahRef.current = surah;
        targetAyahRef.current = ayah;
      }
    }
  }, [mounted]);

  // Process URL params once surahs are loaded - set the target surah
  useEffect(() => {
    if (!mounted || surahs.length === 0) return;
    if (!targetSurahRef.current || !targetAyahRef.current) return;
    if (urlParamsProcessedRef.current) return;
    
    const targetSurah = targetSurahRef.current;
    
    // Verify the target surah exists in the surahs list
    const surahExists = surahs.some(s => s.number === targetSurah);
    if (!surahExists) {
      urlParamsProcessedRef.current = true;
      return;
    }
    
    // Only set if different from current selection
    if (selectedSurah !== targetSurah) {
      // Set the selected surah to trigger ayah loading
      urlParamsProcessedRef.current = true;
      setSelectedSurah(targetSurah);
    } else {
      urlParamsProcessedRef.current = true;
    }
  }, [mounted, surahs.length]);

  // Watch for ayahs to load and scroll to target ayah
  useEffect(() => {
    if (!mounted || !targetSurahRef.current || !targetAyahRef.current) return;
    
    // Check if we're on the target surah and ayahs are loaded
    if (selectedSurah === targetSurahRef.current && ayahs.length > 0) {
      const targetAyah = targetAyahRef.current;
      // Wait a bit for DOM to render
      setTimeout(() => {
        if (scrollToAyahElement(targetAyah)) {
          // Successfully scrolled, clear refs
          targetSurahRef.current = null;
          targetAyahRef.current = null;
        }
      }, 300);
    }
  }, [mounted, selectedSurah, ayahs.length]);

  // Function to navigate to a specific surah and ayah
  const navigateToAyah = (surah: number, ayah: number) => {
    if (!mounted || !surah || !ayah) return;
    
    // Validate surah and ayah numbers
    if (surah < 1 || surah > 114 || ayah < 1) return;
    
    // Set target refs for navigation
    targetSurahRef.current = surah;
    targetAyahRef.current = ayah;
    urlParamsProcessedRef.current = false; // Reset to allow navigation
    
    // If surah is different, set it to trigger ayah loading
    if (selectedSurah !== surah) {
      setSelectedSurah(surah);
    } else {
      // If same surah, just scroll to ayah
      setTimeout(() => {
        scrollToAyahElement(ayah);
      }, 100);
    }
  };

  // Listen for navigation to ayah events
  useEffect(() => {
    const handleNavigateToAyah = (event: CustomEvent) => {
      const { surah, ayah } = event.detail;
      navigateToAyah(surah, ayah);
    };

    window.addEventListener('navigate-to-ayah', handleNavigateToAyah as EventListener);
    return () => {
      window.removeEventListener('navigate-to-ayah', handleNavigateToAyah as EventListener);
    };
  }, [mounted, selectedSurah]);

  const fetchSurahs = async () => {
    try {
      const response = await fetch('/api/quran/meta');
      const data = await response.json();
      if (data.data && data.data.surahs && data.data.surahs.references) {
        setSurahs(data.data.surahs.references);
        // API surahs loaded successfully
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      console.error("Error fetching surahs from API, using static fallback:", error);
      // Use static fallback data
      setSurahs(STATIC_SURAHS);
      // Static surahs fallback loaded
    } finally {
      setLoading(false);
    }
  };

  const fetchAyahs = async (surahNumber: number) => {
    setLoading(true);
    setAyahs([]); // Clear previous ayahs
    try {
      // Fetching ayahs for surah
      
      // Use the main API endpoint
      const response = await fetch(`/api/quran/surah/${surahNumber}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      
      // Response status checked
      
      if (!response.ok) {
        // Handle rate limiting (429) with a user-friendly message
        if (response.status === 429) {
          console.warn('Rate limit reached. Please wait a moment before trying again.');
          // Try static fallback if available
          if (STATIC_AYAHS[surahNumber]) {
            setAyahs(STATIC_AYAHS[surahNumber]);
            setUsingStaticFallback(true);
            setLoading(false);
            return;
          }
          // If no static fallback, set empty and let the fallback logic handle it
          setAyahs([]);
          setUsingStaticFallback(false);
          setLoading(false);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // API Response received
      
      if (data.data && data.data.ayahs) {
        // Process ayahs to ensure proper Arabic text encoding
        const processedAyahs = data.data.ayahs.map((ayah: any) => ({
          ...ayah,
          // Preserve all Arabic text including diacritics and special characters
          text: ayah.text
        }));
        
        // Processed ayahs successfully
        setAyahs(processedAyahs);
        setUsingStaticFallback(false);
        
      } else {
        console.error('No ayahs data in response:', data);
        // Try static fallback
        if (STATIC_AYAHS[surahNumber]) {
          // Using static fallback for surah
          setAyahs(STATIC_AYAHS[surahNumber]);
          setUsingStaticFallback(true);
        } else {
          setAyahs([]);
          setUsingStaticFallback(false);
        }
      }
    } catch (error) {
      console.error("Error fetching ayahs:", error);
      // Fallback: try with a different API endpoint
      try {
        console.log("Trying fallback API...");
        const fallbackResponse = await fetch(`/api/quran/surah/${surahNumber}/editions/quran-simple`);
        const fallbackData = await fallbackResponse.json();
       
        if (fallbackData.data && fallbackData.data.length > 0 && fallbackData.data[0].ayahs) {
          setAyahs(fallbackData.data[0].ayahs);
        } else {
          // Fallback API data structure issue
          setAyahs([]);
        }
      } catch (fallbackError) {
        console.error("Fallback API also failed:", fallbackError);
        // Try static fallback as last resort
        if (STATIC_AYAHS[surahNumber]) {
          // All APIs failed, using static fallback for surah
          setAyahs(STATIC_AYAHS[surahNumber]);
          setUsingStaticFallback(true);
        } else {
          // No static fallback available for surah
          setAyahs([]);
          setUsingStaticFallback(false);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchReciters = async () => {
    try {
      const response = await fetch('/api/quran/edition/format/audio');
      const data = await response.json();
      
      // Process reciters and remove duplicates
      const reciters = data.data || [];
      
      // Remove duplicates based on identifier and name
      const uniqueReciters = reciters.filter((reciter: Reciter, index: number, self: Reciter[]) => {
        return index === self.findIndex((r: Reciter) => 
          r.identifier === reciter.identifier || 
          (r.englishName?.toLowerCase() === reciter.englishName?.toLowerCase() && 
           r.name?.toLowerCase() === reciter.name?.toLowerCase())
        );
      });
      
      // Find and mark Ahmed ibn Ali al-Ajamy as Meshari's favorite
      const ajmiIndex = uniqueReciters.findIndex((reciter: Reciter) => 
        reciter.identifier === 'ar.ajmi' || 
        reciter.englishName?.toLowerCase().includes('ajmi') ||
        reciter.englishName?.toLowerCase().includes('ahmed ibn ali') ||
        reciter.name?.toLowerCase().includes('أحمد') ||
        reciter.name?.toLowerCase().includes('العجمي')
      );
      
      if (ajmiIndex !== -1) {
        uniqueReciters[ajmiIndex] = { ...uniqueReciters[ajmiIndex], isMeshariFavorite: true };
        // Set this reciter as the default if it's found
        setSelectedReciter(uniqueReciters[ajmiIndex].identifier);
      } else {
        // If Ahmed ibn Ali al-Ajamy is not found, try to find any reciter with 'ajmi' in the name
        const fallbackAjmiIndex = uniqueReciters.findIndex((reciter: Reciter) => 
          reciter.englishName?.toLowerCase().includes('ajmi') ||
          reciter.name?.toLowerCase().includes('العجمي')
        );
        
        if (fallbackAjmiIndex !== -1) {
          uniqueReciters[fallbackAjmiIndex] = { ...uniqueReciters[fallbackAjmiIndex], isMeshariFavorite: true };
          setSelectedReciter(uniqueReciters[fallbackAjmiIndex].identifier);
        } else if (uniqueReciters.length > 0) {
          // If no Ajmi reciter is found, set the first reciter as default
          setSelectedReciter(uniqueReciters[0].identifier);
        }
      }
      
      setReciters(uniqueReciters);
    } catch (error) {
      console.error("Error fetching reciters:", error);
      // Set a fallback reciter if API fails
      setSelectedReciter("ar.ahmedajamy");
    }
  };



  const playAyah = async (surahNumber: number, ayahNumber: number) => {
    try {
      // Playing ayah with selected reciter
      
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      setCurrentAyah(ayahNumber);
      setAudioLoading(true);
      setIsPlaying(true);
      
      // First, fetch the ayah data to get the audio URL
      const response = await fetch(`/api/quran/ayah/${surahNumber}:${ayahNumber}/${selectedReciter}`);
      if (!response.ok) {
        throw new Error(`Quran audio request failed with status ${response.status}`);
      }
      const data = await response.json();
      
      if (data.data?.audio && (!data.data.edition || data.data.edition.format === "audio")) {
        // Found audio URL
        
        if (audioRef.current) {
          audioRef.current.src = data.data.audio;
          audioRef.current.load();
          
          try {
            await audioRef.current.play();
            // Audio playback started successfully
            setAudioLoading(false);
          } catch (playError) {
            console.error("Error playing audio:", playError);
            setIsPlaying(false);
            setAudioLoading(false);
            
            // Show user-friendly error message
            alert(locale === "ar"
              ? "تعذر تشغيل صوت هذه الآية. يرجى المحاولة مرة أخرى أو اختيار قارئ آخر."
              : "This verse audio could not be played. Please try again or choose another reciter.");
          }
        }
      } else {
        console.error("No valid audio edition URL found in response:", data);
        throw new Error("No valid audio edition URL found");
      }
    } catch (error) {
      console.error("Error in playAyah:", error);
      setIsPlaying(false);
      setAudioLoading(false);
      alert(locale === "ar"
        ? "تعذر تحميل صوت هذه الآية. يرجى المحاولة مرة أخرى أو اختيار قارئ آخر."
        : "This verse audio could not be loaded. Please try again or choose another reciter.");
    }
  };

  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        // Audio paused
      } else {
        if (audioRef.current.src) {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
            // Audio resumed
          } catch (error) {
            console.error("Error resuming audio:", error);
          }
        } else {
          // If no audio is loaded, play the current ayah
          // No audio loaded, playing current ayah
          await playAyah(selectedSurah, currentAyah);
        }
      }
    }
  };

  const currentSurah = surahs.find((s) => s.number === selectedSurah);
  const localized = (key: string, fallback: string) => {
    const value = t(key);
    return value === key ? fallback : value;
  };
  const versesLabel = localized("quran.verses", "verses");

  if (!mounted) {
    return (
      <section id="quran" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              <SectionTitleLink section="quran">
                {t("quran.title") !== "quran.title" ? t("quran.title") : "القرآن الكريم"}
              </SectionTitleLink>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t("quran.subtitle") !== "quran.subtitle" ? t("quran.subtitle") : "اقرأ وتدبر آيات الله العظيم"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-8" role="status" aria-label="Loading Quran">
            <div className="shimmer w-full h-16 rounded-2xl" />
            <div className="shimmer w-full h-16 rounded-2xl" />
          </div>
          <div className="shimmer w-full h-96 rounded-2xl" />
          <div className="mt-4 space-y-3">
            <div className="shimmer h-4 w-full rounded-full" />
            <div className="shimmer h-4 w-[92%] rounded-full" />
            <div className="shimmer h-4 w-[78%] rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quran" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              <SectionTitleLink section="quran">
                {mounted && t("quran.title") !== "quran.title" ? t("quran.title") : "القرآن الكريم"}
              </SectionTitleLink>
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {mounted && t("quran.subtitle") !== "quran.subtitle" ? t("quran.subtitle") : "اقرأ وتدبر آيات الله العظيم"}
          </p>
        </motion.div>

        {/* Controls */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="shimmer w-full h-16 rounded-2xl" />
            <div className="shimmer w-full h-16 rounded-2xl" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-4 mb-8"
          >
          {/* Surah Selection */}
          <div className="relative" ref={dropdownRef}>
            <label htmlFor="quran-surah-select-trigger" className="block text-sm font-semibold mb-2">
              {mounted && t("quran.select_surah") !== "quran.select_surah" ? t("quran.select_surah") : "اختر السورة"}
            </label>
            <div className="relative">
              <button
                id="quran-surah-select-trigger"
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-4 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none cursor-pointer text-lg flex items-center justify-between hover:shadow-lg transition-all duration-300"
                aria-label={currentSurah ? `${currentSurah.number}. ${locale === 'ar' ? currentSurah.name : currentSurah.englishName} - ${locale === 'ar' ? currentSurah.englishName : currentSurah.name} - ${currentSurah.numberOfAyahs} ${versesLabel}` : (t("quran.select_surah") || "Select Surah")}
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
                data-surah-select-trigger
              >
                <span className={`text-left flex items-center gap-2 ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex flex-col">
                    <div className="font-semibold" style={{ fontFamily: 'Amiri' }}>
                      {currentSurah ? (
                        <>
                          <bdi dir="ltr">{currentSurah.number}.</bdi>{" "}
                          <bdi dir={localeDirection(locale)}>{locale === 'ar' ? currentSurah.name : currentSurah.englishName}</bdi>
                        </>
                      ) : "Select Surah"}
                    </div>
                    {currentSurah && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <bdi dir={locale === 'ar' ? 'ltr' : 'rtl'}>{locale === 'ar' ? currentSurah.englishName : currentSurah.name}</bdi>{" • "}
                        <bdi dir={localeDirection(locale)}>{currentSurah.numberOfAyahs} {versesLabel}</bdi>
                      </div>
                    )}
                  </div>
                </span>
                <ChevronDown className={`w-5 h-5 text-islamic-gold transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {surahs.map((surah) => (
                    <button
                      key={surah.number}
                      onClick={() => {
                        // Surah selected
                        setSelectedSurah(surah.number);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                        selectedSurah === surah.number ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className={`flex items-center justify-between ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="font-semibold" style={{ fontFamily: 'Amiri' }}>{surah.number}. {locale === 'ar' ? surah.name : surah.englishName}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <bdi dir={locale === 'ar' ? 'ltr' : 'rtl'}>{locale === 'ar' ? surah.englishName : surah.name}</bdi>{" • "}
                          <bdi dir={localeDirection(locale)}>{surah.numberOfAyahs} {versesLabel}</bdi>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Reciter Selection */}
          <div className="relative" ref={reciterDropdownRef}>
            <label htmlFor="quran-reciter-select-trigger" className="block text-sm font-semibold mb-2">
              {mounted && t("quran.select_reciter") !== "quran.select_reciter" ? t("quran.select_reciter") : "اختر القارئ"}
            </label>
            <div className="relative">
              <button
                id="quran-reciter-select-trigger"
                type="button"
                onClick={() => setIsReciterDropdownOpen(!isReciterDropdownOpen)}
                className="w-full p-4 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none cursor-pointer text-lg flex items-center justify-between hover:shadow-lg transition-all duration-300"
                aria-label={mounted && t("quran.select_reciter") !== "quran.select_reciter" ? t("quran.select_reciter") : "اختر القارئ"}
                aria-expanded={isReciterDropdownOpen}
                aria-haspopup="listbox"
              >
                <span className={`flex items-center gap-2 ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex flex-col">
                    <div className="font-semibold" style={{ fontFamily: 'Amiri' }}>
                      {(() => {
                        const reciter = reciters.find(r => r.identifier === selectedReciter);
                        if (!reciter) {
                          // Fallback to Ahmed ibn Ali al-Ajamy if reciter not found
                          return locale === 'ar' ? 'أحمد بن علي العجمي' : 'Ahmed ibn Ali al-Ajamy';
                        }
                        return locale === 'ar' ? reciter.name : reciter.englishName;
                      })()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {(() => {
                        const reciter = reciters.find(r => r.identifier === selectedReciter);
                        if (!reciter) {
                          // Fallback to Ahmed ibn Ali al-Ajamy if reciter not found
                          return locale === 'ar' ? 'Ahmed ibn Ali al-Ajamy' : 'أحمد بن علي العجمي';
                        }
                        return locale === 'ar' ? reciter.englishName : reciter.name;
                      })()}
                    </div>
                  </div>
                  {reciters.find(r => r.identifier === selectedReciter)?.isMeshariFavorite && (
                    <span className="px-2 py-1 text-xs font-bold bg-islamic-gold text-white rounded-full self-start" data-meshari-favorite-badge>
                      {mounted && t("quran.meshari_favorite") !== "quran.meshari_favorite" ? t("quran.meshari_favorite") : `${siteConfig.content.memorialName || siteConfig.content.memorialLegalName}'s Favorite`}
                    </span>
                  )}
                </span>
                <ChevronDown className={`w-5 h-5 text-islamic-gold transition-transform duration-300 ${isReciterDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isReciterDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {reciters.map((reciter) => (
                    <button
                      key={reciter.identifier}
                      onClick={() => {
                        setSelectedReciter(reciter.identifier);
                        setIsReciterDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                        selectedReciter === reciter.identifier ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                  <div className={`flex items-center gap-2 ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="flex flex-col">
                      <div className="font-semibold" style={{ fontFamily: 'Amiri' }}>
                        {locale === 'ar' ? reciter.name : reciter.englishName}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {locale === 'ar' ? reciter.englishName : reciter.name}
                      </div>
                    </div>
                    {reciter.isMeshariFavorite && (
                      <span className="px-2 py-1 text-xs font-bold bg-islamic-gold text-white rounded-full self-start" data-meshari-favorite-badge>
                        {mounted && t("quran.meshari_favorite") !== "quran.meshari_favorite" ? t("quran.meshari_favorite") : `${siteConfig.content.memorialName || siteConfig.content.memorialLegalName}'s Favorite`}
                      </span>
                    )}
                  </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </motion.div>
        )}

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
          ref={searchRef}
        >
          <div className="relative">
            <label htmlFor="quran-text-search" className="sr-only">
              {mounted && t("quran.search") !== "quran.search" ? t("quran.search") : (locale === 'ar' ? 'ابحث في القرآن الكريم' : 'Search in the Quran')}
            </label>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="quran-text-search"
              name="quran-text-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={mounted && t("quran.search_placeholder") !== "quran.search_placeholder" ? t("quran.search_placeholder") : (locale === 'ar' ? 'ابحث في القرآن الكريم...' : 'Search in the Quran...')}
              className="w-full pl-12 pr-12 py-4 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none text-lg"
              aria-label={mounted && t("quran.search") !== "quran.search" ? t("quran.search") : (locale === 'ar' ? 'ابحث في القرآن الكريم' : 'Search in the Quran')}
              autoComplete="off"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setShowSearchResults(false);
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label={mounted && t("quran.clear_search") !== "quran.clear_search" ? t("quran.clear_search") : (locale === 'ar' ? 'مسح البحث' : 'Clear search')}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Results */}
          {showSearchResults && (searchLoading || searchResults.length > 0 || searchQuery) && (
            <div className="mt-4 bg-light-secondary dark:bg-dark-secondary rounded-2xl border-2 border-islamic-gold/30 p-4 max-h-96 overflow-y-auto">
              {searchLoading ? (
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                  {mounted && t("quran.searching") !== "quran.searching" ? t("quran.searching") : (locale === 'ar' ? 'جاري البحث...' : 'Searching...')}
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-islamic-gold mb-3">
                    {mounted && t("quran.search_results") !== "quran.search_results" ? `${t("quran.search_results")} (${searchResults.length})` : (locale === 'ar' ? `نتائج البحث (${searchResults.length})` : `Search Results (${searchResults.length})`)}
                  </div>
                  {searchResults.map((result, index) => {
                    const surahNumber = result.surah?.number || result.surahNumber || result.number;
                    const ayahNumber = result.numberInSurah || result.ayah || result.number;
                    const surah = surahs.find(s => s.number === surahNumber);
                    const surahName = surah ? (locale === 'ar' ? surah.name : surah.englishName) : (result.surah?.name || `Surah ${surahNumber}`);
                    
                    // Get Arabic text - prioritize arabicText field, then check if text is Arabic
                    const arabicText = result.arabicText || (result.text && /[\u0600-\u06FF]/.test(result.text) ? result.text : '');
                    // Get translation - use text if it's not Arabic, or use translation field
                    const translationText = result.translation || (result.text && !/[\u0600-\u06FF]/.test(result.text) ? result.text : '');
                    
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (surahNumber && ayahNumber) {
                            // Disable animations for instant display when navigating from search
                            setSkipAnimations(true);
                            setSelectedSurah(surahNumber);
                            setSearchQuery("");
                            setShowSearchResults(false);
                            
                            // Wait for surah to load, then scroll to specific ayah
                            // Use retry mechanism to ensure ayahs are loaded and rendered
                            const scrollToAyah = (retries = 20) => {
                              const ayahElement = document.querySelector(`[data-ayah-number="${ayahNumber}"]`);
                              if (ayahElement) {
                                // Scroll to the ayah immediately (no smooth scroll delay)
                                ayahElement.scrollIntoView({ behavior: 'auto', block: 'center' });
                                
                                // Small delay then smooth scroll for better UX
                                setTimeout(() => {
                                  ayahElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }, 50);
                                
                                // Highlight the ayah with animation
                                ayahElement.classList.add('ring-4', 'ring-islamic-gold', 'ring-opacity-50', 'transition-all', 'duration-300');
                                setTimeout(() => {
                                  ayahElement.classList.remove('ring-4', 'ring-islamic-gold', 'ring-opacity-50');
                                }, 3000);
                                
                                // Re-enable animations after a short delay
                                setTimeout(() => {
                                  setSkipAnimations(false);
                                }, 1000);
                              } else if (retries > 0) {
                                // Retry if element not found yet (ayahs still loading)
                                setTimeout(() => scrollToAyah(retries - 1), 100);
                              } else {
                                // If we couldn't find it, re-enable animations anyway
                                setSkipAnimations(false);
                              }
                            };
                            
                            // Start scrolling immediately - no delay needed since animations are disabled
                            setTimeout(() => scrollToAyah(), 100);
                          }
                        }}
                        className="p-4 rounded-xl bg-light dark:bg-dark border border-islamic-gold/20 hover:border-islamic-gold cursor-pointer transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-semibold text-islamic-gold">
                            {surahName} - {mounted && t("quran.verse") !== "quran.verse" ? t("quran.verse") : (locale === 'ar' ? 'آية' : 'Ayah')} {ayahNumber}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {mounted && t("quran.select_surah") !== "quran.select_surah" ? t("quran.select_surah").split(' ')[0] : (locale === 'ar' ? 'سورة' : 'Surah')} {surahNumber}
                          </div>
                        </div>
                        {/* Always show Arabic text if available - this is the actual Quranic ayah */}
                        {arabicText ? (
                          <div className="text-right font-arabic text-xl leading-relaxed mb-3 p-3 bg-light dark:bg-dark rounded-lg" dir="rtl" style={{ fontFamily: 'Amiri', lineHeight: '2.5' }}>
                            {arabicText}
                          </div>
                        ) : (
                          // If no Arabic text yet, show loading or fetch it
                          <div className="text-center py-2 text-gray-500 text-sm">
                            {mounted && t("quran.searching") !== "quran.searching" ? t("quran.searching") : (locale === 'ar' ? 'جاري تحميل النص العربي...' : 'Loading Arabic text...')}
                          </div>
                        )}
                        {/* Show translation below Arabic text if available */}
                        {translationText && translationText !== arabicText && (
                          <div className="text-gray-600 dark:text-gray-400 text-sm mt-2 p-2 bg-light-secondary dark:bg-dark-secondary rounded" dir={localeDirection(locale)}>
                            {translationText}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : searchQuery && !searchLoading ? (
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                  {mounted && t("quran.no_results") !== "quran.no_results" ? t("quran.no_results") : (locale === 'ar' ? 'لا توجد نتائج' : 'No results found')}
                </div>
              ) : null}
            </div>
          )}
        </motion.div>

        {/* Surah Header */}
        {currentSurah && (() => {
          const surahName = locale === 'ar' ? currentSurah.name : currentSurah.englishName;
          const hasArabic = /[\u0600-\u06FF]/.test(surahName);
          const revelationTypeTranslated = currentSurah.revelationType === 'Medinan' 
            ? t('quran.medinan') 
            : t('quran.meccan');
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-8 p-8 bg-gradient-to-r from-islamic-gold/20 via-islamic-green/20 to-islamic-blue/20 rounded-2xl border-2 border-islamic-gold/30"
            >
              <h3 
                className="text-3xl md:text-4xl font-bold text-islamic-gold mb-20" 
                style={{ 
                  textAlign: 'center !important' as any,
                  display: 'block',
                  width: '100%',
                  direction: hasArabic ? 'rtl' : 'ltr',
                  unicodeBidi: hasArabic ? 'plaintext' : 'normal',
                  margin: '0 auto',
                  fontFamily: 'Amiri',
                  paddingTop: '10px',
                  paddingBottom: '10px'
                }}
              >
                {surahName}
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {revelationTypeTranslated}
              </p>
            </motion.div>
          );
        })()}

        {/* Audio Player */}
        <audio 
          ref={audioRef} 
          onEnded={() => {
            setIsPlaying(false);
            setAudioLoading(false);
          }}
          onError={(e) => {
            console.error("Audio error:", e);
            setIsPlaying(false);
            setAudioLoading(false);
            // Don't show alert here as it might be called multiple times
          }}
          onLoadStart={() => {
            // Audio loading started
            setAudioLoading(true);
          }}
          onCanPlay={() => {
            // Audio can play
            setAudioLoading(false);
          }}
          preload="none"
        />

        {/* Ayahs */}
        {loading ? (
          <div className="text-center py-12">
            <div className="shimmer w-full h-96 rounded-2xl" />
          </div>
        ) : ayahs.length > 0 ? (
          <div className="space-y-6 max-h-[600px] overflow-y-auto p-4 bg-light-secondary/50 dark:bg-dark-secondary/50 rounded-2xl">
            <div className="text-center mb-4 text-sm text-gray-500">
              {localized("quran.found", "Found")} {ayahs.length} {versesLabel}
            </div>
            {/* Bismillah - only show for surahs other than Al-Fatihah */}
            {selectedSurah !== 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 text-lg text-islamic-gold motion-safe"
                style={{
                  willChange: 'opacity',
                  transform: 'translateZ(0)',
                }}
              >
                ﷽
              </motion.p>
            )}
            {usingStaticFallback && (
              <div className="text-center mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-600 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <span className="font-semibold">📖 Offline Mode:</span> Showing static Quran text. Some features may be limited.
                </p>
              </div>
            )}
            {ayahs.map((ayah, index) => (
              <motion.div
                key={ayah.number}
                data-ayah-number={ayah.numberInSurah}
                initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={skipAnimations ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={skipAnimations ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-islamic-gold/20 rounded-full flex items-center justify-center text-islamic-gold font-bold">
                      {ayah.numberInSurah}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400" data-verse-metadata>
                      {localized("quran.verse", "Ayah")} {ayah.numberInSurah} • {localized("quran.juz", "Juz")} {ayah.juz} • {localized("quran.page", "Page")} {ayah.page}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => playAyah(selectedSurah, ayah.numberInSurah)}
                      className="p-2 rounded-full bg-islamic-gold/20 hover:bg-islamic-gold/30 transition-colors duration-300"
                      disabled={audioLoading && currentAyah === ayah.numberInSurah}
                      aria-label={isPlaying && currentAyah === ayah.numberInSurah 
                        ? (locale === 'ar' ? 'إيقاف التشغيل' : 'Pause audio')
                        : (locale === 'ar' ? 'تشغيل الآية' : 'Play verse audio')
                      }
                    >
                      {audioLoading && currentAyah === ayah.numberInSurah ? (
                        <div className="w-5 h-5 border-2 border-islamic-gold border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      ) : isPlaying && currentAyah === ayah.numberInSurah ? (
                        <Pause className="w-5 h-5 text-islamic-gold" aria-hidden="true" />
                      ) : (
                        <Play className="w-5 h-5 text-islamic-gold" aria-hidden="true" />
                      )}
                    </button>
                    
                    <button 
                      onClick={() => toggleBookmark(selectedSurah, ayah.numberInSurah)}
                      className={`p-2 rounded-full transition-colors duration-300 ${
                        isBookmarked(selectedSurah, ayah.numberInSurah)
                          ? "bg-islamic-gold/20 hover:bg-islamic-gold/30"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                      aria-label={isBookmarked(selectedSurah, ayah.numberInSurah) 
                        ? (locale === 'ar' ? 'إزالة الإشارة المرجعية' : 'Remove bookmark')
                        : (locale === 'ar' ? 'إضافة إشارة مرجعية' : 'Bookmark this verse')
                      }
                    >
                      {isBookmarked(selectedSurah, ayah.numberInSurah) ? (
                        <BookmarkCheck className="w-5 h-5 text-islamic-gold" fill="currentColor" aria-hidden="true" />
                      ) : (
                        <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
                      )}
                    </button>
                    
                    <button 
                      onClick={() => handleShare(ayah)}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                      aria-label={locale === 'ar' ? 'مشاركة الآية' : 'Share verse'}
                    >
                      <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="arabic-quran-text text-2xl md:text-3xl leading-relaxed mb-4 text-right">
                  {(() => {
                    let text = ayah.text;
                    // Remove Bismillah from ayah 1 (except Al-Fatihah)
                    if (selectedSurah !== 1 && ayah.numberInSurah === 1) {
                      // Remove the exact Bismillah text
                      text = text.replace('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ', '').trim();
                      text = text.replace('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', '').trim();
                      text = text.replace('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', '').trim();
                      text = text.replace('بسم الله الرحمن الرحيم', '').trim();
                    }
                    return text;
                  })()}
                </div>

                {/* Translation */}
                {selectedTranslation && (
                  <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2" dir={localeDirection(locale)} data-translation-language>
                      {mounted && t("quran.translation") !== "quran.translation" ? t("quran.translation") : "التفسير"}{" "}
                      <bdi dir="ltr">({locale.toUpperCase()})</bdi>
                    </div>
                    <AyahTranslation 
                      surahNumber={selectedSurah} 
                      ayahNumber={ayah.numberInSurah} 
                      translationId={selectedTranslation}
                      locale={locale}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
            <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              {mounted && t("quran.select_surah") !== "quran.select_surah" ? t("quran.select_surah") : "اختر السورة"} to view verses
            </div>
          </div>
        )}
      </div>
      
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.error("Audio error:", e);
          setIsPlaying(false);
        }}
        onLoadStart={() => {/* Audio loading started */}}
        onCanPlay={() => {/* Audio can play */}}
        preload="none"
      />

      {/* Share Modal */}
      {selectedVerseForShare && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false);
            setSelectedVerseForShare(null);
          }}
          verse={selectedVerseForShare}
        />
      )}
    </section>
  );
}
