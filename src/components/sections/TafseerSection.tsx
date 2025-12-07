"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Book, Search, ChevronDown, Globe, X, Loader2 } from "lucide-react";

interface TafseerEdition {
  id: number;
  name: string;
  slug: string;
  language: string;
  author: string;
}

interface TafseerResult {
  ayah: number;
  text: string;
  edition: string;
  author: string;
}

interface Surah {
  number: number;
  name: string;
  arabic: string;
  verses: number;
}

const TAFSEER_EDITIONS: TafseerEdition[] = [
  { id: 14, name: "تفسير ابن كثير", slug: "ar-tafsir-ibn-kathir", language: "arabic", author: "Hafiz Ibn Kathir" },
  { id: 15, name: "تفسير الطبري", slug: "ar-tafsir-al-tabari", language: "arabic", author: "Tabari" },
  { id: 16, name: "تفسير الميسر", slug: "ar-tafsir-muyassar", language: "arabic", author: "Al Muyassar" },
  { id: 91, name: "تفسير السعدي", slug: "ar-tafseer-al-saddi", language: "arabic", author: "Saddi" },
  { id: 90, name: "تفسير القرطبي", slug: "ar-tafseer-al-qurtubi", language: "arabic", author: "Qurtubi" },
  { id: 74, name: "الجلالين", slug: "en-al-jalalayn", language: "english", author: "Al-Jalalayn" },
  { id: 169, name: "Tafsir Ibn Kathir", slug: "en-tafisr-ibn-kathir", language: "english", author: "Hafiz Ibn Kathir" },
  { id: 108, name: "Al Qushairi Tafsir", slug: "en-al-qushairi-tafsir", language: "english", author: "Al Qushairi" },
  { id: 160, name: "تفسیر ابن کثیر", slug: "ur-tafseer-ibn-e-kaseer", language: "urdu", author: "Hafiz Ibn Kathir" },
  { id: 159, name: "بیان القرآن", slug: "ur-tafsir-bayan-ul-quran", language: "urdu", author: "Dr. Israr Ahmad" },
];

const SURAHS: Surah[] = [
  { number: 1, name: "Al-Faatiha", arabic: "الفاتحة", verses: 7 },
  { number: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286 },
  { number: 3, name: "Aal-e-Imran", arabic: "آل عمران", verses: 200 },
  { number: 4, name: "An-Nisa", arabic: "النساء", verses: 176 },
  { number: 5, name: "Al-Maidah", arabic: "المائدة", verses: 120 },
  { number: 6, name: "Al-Anam", arabic: "الأنعام", verses: 165 },
  { number: 7, name: "Al-Araf", arabic: "الأعراف", verses: 206 },
  { number: 8, name: "Al-Anfal", arabic: "الأنفال", verses: 75 },
  { number: 9, name: "At-Taubah", arabic: "التوبة", verses: 129 },
  { number: 10, name: "Yunus", arabic: "يونس", verses: 109 },
  { number: 11, name: "Hud", arabic: "هود", verses: 123 },
  { number: 12, name: "Yusuf", arabic: "يوسف", verses: 111 },
  { number: 13, name: "Ar-Rad", arabic: "الرعد", verses: 43 },
  { number: 14, name: "Ibrahim", arabic: "إبراهيم", verses: 52 },
  { number: 15, name: "Al-Hijr", arabic: "الحجر", verses: 99 },
  { number: 16, name: "An-Nahl", arabic: "النحل", verses: 128 },
  { number: 17, name: "Al-Isra", arabic: "الإسراء", verses: 111 },
  { number: 18, name: "Al-Kahf", arabic: "الكهف", verses: 110 },
  { number: 19, name: "Maryam", arabic: "مريم", verses: 98 },
  { number: 20, name: "Taha", arabic: "طه", verses: 135 },
  { number: 21, name: "Al-Anbiya", arabic: "الأنبياء", verses: 112 },
  { number: 22, name: "Al-Hajj", arabic: "الحج", verses: 78 },
  { number: 23, name: "Al-Muminun", arabic: "المؤمنون", verses: 118 },
  { number: 24, name: "An-Nur", arabic: "النور", verses: 64 },
  { number: 25, name: "Al-Furqan", arabic: "الفرقان", verses: 77 },
  { number: 26, name: "Ash-Shuara", arabic: "الشعراء", verses: 227 },
  { number: 27, name: "An-Naml", arabic: "النمل", verses: 93 },
  { number: 28, name: "Al-Qasas", arabic: "القصص", verses: 88 },
  { number: 29, name: "Al-Ankabut", arabic: "العنكبوت", verses: 69 },
  { number: 30, name: "Ar-Rum", arabic: "الروم", verses: 60 },
  { number: 31, name: "Luqman", arabic: "لقمان", verses: 34 },
  { number: 32, name: "As-Sajdah", arabic: "السجدة", verses: 30 },
  { number: 33, name: "Al-Ahzab", arabic: "الأحزاب", verses: 73 },
  { number: 34, name: "Saba", arabic: "سبأ", verses: 54 },
  { number: 35, name: "Fatir", arabic: "فاطر", verses: 45 },
  { number: 36, name: "Ya-Sin", arabic: "يس", verses: 83 },
  { number: 37, name: "As-Saffat", arabic: "الصافات", verses: 182 },
  { number: 38, name: "Sad", arabic: "ص", verses: 88 },
  { number: 39, name: "Az-Zumar", arabic: "الزمر", verses: 75 },
  { number: 40, name: "Ghafir", arabic: "غافر", verses: 85 },
  { number: 41, name: "Fussilat", arabic: "فصلت", verses: 54 },
  { number: 42, name: "Ash-Shura", arabic: "الشورى", verses: 53 },
  { number: 43, name: "Az-Zukhruf", arabic: "الزخرف", verses: 89 },
  { number: 44, name: "Ad-Dukhan", arabic: "الدخان", verses: 59 },
  { number: 45, name: "Al-Jathiyah", arabic: "الجاثية", verses: 37 },
  { number: 46, name: "Al-Ahqaf", arabic: "الأحقاف", verses: 35 },
  { number: 47, name: "Muhammad", arabic: "محمد", verses: 38 },
  { number: 48, name: "Al-Fath", arabic: "الفتح", verses: 29 },
  { number: 49, name: "Al-Hujurat", arabic: "الحجرات", verses: 18 },
  { number: 50, name: "Qaf", arabic: "ق", verses: 45 },
  { number: 51, name: "Adh-Dhariyat", arabic: "الذاريات", verses: 60 },
  { number: 52, name: "At-Tur", arabic: "الطور", verses: 49 },
  { number: 53, name: "An-Najm", arabic: "النجم", verses: 62 },
  { number: 54, name: "Al-Qamar", arabic: "القمر", verses: 55 },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", verses: 78 },
  { number: 56, name: "Al-Waqiah", arabic: "الواقعة", verses: 96 },
  { number: 57, name: "Al-Hadid", arabic: "الحديد", verses: 29 },
  { number: 58, name: "Al-Mujadila", arabic: "المجادلة", verses: 22 },
  { number: 59, name: "Al-Hashr", arabic: "الحشر", verses: 24 },
  { number: 60, name: "Al-Mumtahanah", arabic: "الممتحنة", verses: 13 },
  { number: 61, name: "As-Saff", arabic: "الصف", verses: 14 },
  { number: 62, name: "Al-Jumuah", arabic: "الجمعة", verses: 11 },
  { number: 63, name: "Al-Munafiqun", arabic: "المنافقون", verses: 11 },
  { number: 64, name: "At-Taghabun", arabic: "التغابن", verses: 18 },
  { number: 65, name: "At-Talaq", arabic: "الطلاق", verses: 12 },
  { number: 66, name: "At-Tahrim", arabic: "التحريم", verses: 12 },
  { number: 67, name: "Al-Mulk", arabic: "الملك", verses: 30 },
  { number: 68, name: "Al-Qalam", arabic: "القلم", verses: 52 },
  { number: 69, name: "Al-Haqqah", arabic: "الحاقة", verses: 52 },
  { number: 70, name: "Al-Maarij", arabic: "المعارج", verses: 44 },
  { number: 71, name: "Nuh", arabic: "نوح", verses: 28 },
  { number: 72, name: "Al-Jinn", arabic: "الجن", verses: 28 },
  { number: 73, name: "Al-Muzzammil", arabic: "المزمل", verses: 20 },
  { number: 74, name: "Al-Muddaththir", arabic: "المدثر", verses: 56 },
  { number: 75, name: "Al-Qiyamah", arabic: "القيامة", verses: 40 },
  { number: 76, name: "Al-Insan", arabic: "الإنسان", verses: 31 },
  { number: 77, name: "Al-Mursalat", arabic: "المرسلات", verses: 50 },
  { number: 78, name: "An-Naba", arabic: "النبأ", verses: 40 },
  { number: 79, name: "An-Naziat", arabic: "النازعات", verses: 46 },
  { number: 80, name: "Abasa", arabic: "عبس", verses: 42 },
  { number: 81, name: "At-Takwir", arabic: "التكوير", verses: 29 },
  { number: 82, name: "Al-Infitar", arabic: "الانفطار", verses: 19 },
  { number: 83, name: "Al-Mutaffifin", arabic: "المطففين", verses: 36 },
  { number: 84, name: "Al-Inshiqaq", arabic: "الانشقاق", verses: 25 },
  { number: 85, name: "Al-Buruj", arabic: "البروج", verses: 22 },
  { number: 86, name: "At-Tariq", arabic: "الطارق", verses: 17 },
  { number: 87, name: "Al-Ala", arabic: "الأعلى", verses: 19 },
  { number: 88, name: "Al-Ghashiyah", arabic: "الغاشية", verses: 26 },
  { number: 89, name: "Al-Fajr", arabic: "الفجر", verses: 30 },
  { number: 90, name: "Al-Balad", arabic: "البلد", verses: 20 },
  { number: 91, name: "Ash-Shams", arabic: "الشمس", verses: 15 },
  { number: 92, name: "Al-Layl", arabic: "الليل", verses: 21 },
  { number: 93, name: "Ad-Duha", arabic: "الضحى", verses: 11 },
  { number: 94, name: "Ash-Sharh", arabic: "الشرح", verses: 8 },
  { number: 95, name: "At-Tin", arabic: "التين", verses: 8 },
  { number: 96, name: "Al-Alaq", arabic: "العلق", verses: 19 },
  { number: 97, name: "Al-Qadr", arabic: "القدر", verses: 5 },
  { number: 98, name: "Al-Bayyinah", arabic: "البينة", verses: 8 },
  { number: 99, name: "Az-Zalzalah", arabic: "الزلزلة", verses: 8 },
  { number: 100, name: "Al-Adiyat", arabic: "العاديات", verses: 11 },
  { number: 101, name: "Al-Qariah", arabic: "القارعة", verses: 11 },
  { number: 102, name: "At-Takathur", arabic: "التكاثر", verses: 8 },
  { number: 103, name: "Al-Asr", arabic: "العصر", verses: 3 },
  { number: 104, name: "Al-Humazah", arabic: "الهمزة", verses: 9 },
  { number: 105, name: "Al-Fil", arabic: "الفيل", verses: 5 },
  { number: 106, name: "Quraysh", arabic: "قريش", verses: 4 },
  { number: 107, name: "Al-Maun", arabic: "الماعون", verses: 7 },
  { number: 108, name: "Al-Kawthar", arabic: "الكوثر", verses: 3 },
  { number: 109, name: "Al-Kafirun", arabic: "الكافرون", verses: 6 },
  { number: 110, name: "An-Nasr", arabic: "النصر", verses: 3 },
  { number: 111, name: "Al-Masad", arabic: "المسد", verses: 5 },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4 },
  { number: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5 },
  { number: 114, name: "An-Nas", arabic: "الناس", verses: 6 },
];

export default function TafseerSection() {
  const { t } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedAyah, setSelectedAyah] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEdition, setSelectedEdition] = useState(TAFSEER_EDITIONS[0]);
  const [tafseer, setTafseer] = useState<TafseerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showEditions, setShowEditions] = useState(false);
  const [showSurahs, setShowSurahs] = useState(false);
  const [searchResults, setSearchResults] = useState<Surah[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchMode, setSearchMode] = useState<'surah' | 'verse'>('surah');
  const [mounted, setMounted] = useState(false);
  
  const editionsRef = useRef<HTMLDivElement>(null);
  const surahsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editionsRef.current && !editionsRef.current.contains(event.target as Node)) {
        setShowEditions(false);
      }
      if (surahsRef.current && !surahsRef.current.contains(event.target as Node)) {
        setShowSurahs(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = SURAHS.filter(surah => 
        surah.arabic.includes(searchQuery) || 
        surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.number.toString().includes(searchQuery)
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const fetchTafseer = async (surahNumber: number, ayahNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${selectedEdition.slug}/${surahNumber}/${ayahNumber}.json`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // Tafseer API Response received
      
      if (data && data.text) {
        setTafseer({
          ayah: ayahNumber,
          text: data.text,
          edition: selectedEdition.name,
          author: selectedEdition.author,
        });
      } else {
        setTafseer({
          ayah: ayahNumber,
          text: "التفسير غير متوفر لهذه الآية في هذا المصدر.",
          edition: selectedEdition.name,
          author: selectedEdition.author,
        });
      }
    } catch (error) {
      console.error('Tafseer fetch error:', error);
      setTafseer({
        ayah: ayahNumber,
        text: "التفسير غير متوفر حالياً. يرجى المحاولة لاحقاً.",
        edition: selectedEdition.name,
        author: selectedEdition.author,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSurahSelect = (surah: Surah) => {
    setSelectedSurah(surah);
    setShowSurahs(false);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleSearch = () => {
    if (selectedSurah) {
      fetchTafseer(selectedSurah.number, selectedAyah);
    }
  };

  const handleVerseSearch = () => {
    if (searchQuery.includes(':')) {
      const [surahNum, ayahNum] = searchQuery.split(':').map(Number);
      if (surahNum >= 1 && surahNum <= 114 && ayahNum >= 1) {
        const surah = SURAHS.find(s => s.number === surahNum);
        if (surah && ayahNum <= surah.verses) {
          setSelectedSurah(surah);
          setSelectedAyah(ayahNum);
          fetchTafseer(surahNum, ayahNum);
        }
      }
    }
  };

  return (
    <section id="tafseer" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Book className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text" suppressHydrationWarning>
              {t("tafseer.title") !== "tafseer.title" ? t("tafseer.title") : "تفسير القرآن"}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400" suppressHydrationWarning>
            {t("tafseer.subtitle") !== "tafseer.subtitle" ? t("tafseer.subtitle") : "فهم معاني كلام الله"}
          </p>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-light dark:bg-dark rounded-full p-1 border-2 border-islamic-gold/30">
            <button
              onClick={() => setSearchMode('surah')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                searchMode === 'surah'
                  ? 'bg-islamic-gold text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-islamic-gold'
              }`}
              suppressHydrationWarning
            >
              {t("quran.select_surah") !== "quran.select_surah" ? t("quran.select_surah") : "اختر السورة"}
            </button>
            <button
              onClick={() => setSearchMode('verse')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                searchMode === 'verse'
                  ? 'bg-islamic-gold text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-islamic-gold'
              }`}
              suppressHydrationWarning
            >
              {t("tafseer.search_verse") !== "tafseer.search_verse" ? t("tafseer.search_verse") : "ابحث عن آية"}
            </button>
          </div>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-light dark:bg-dark rounded-2xl p-6 md:p-8 border-2 border-islamic-gold/30 mb-8"
        >
          {searchMode === 'surah' ? (
            <div className="grid md:grid-cols-3 gap-4">
              {/* Surah Selection */}
              <div className="relative" ref={surahsRef}>
                <label className="block text-sm font-semibold mb-2" suppressHydrationWarning>
                  {t("quran.select_surah") !== "quran.select_surah" ? t("quran.select_surah") : "اختر السورة"}
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowSurahs(!showSurahs)}
                    className="w-full p-3 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none cursor-pointer text-left flex items-center justify-between"
                    aria-label={t("quran.select_surah") !== "quran.select_surah" ? t("quran.select_surah") : "اختر السورة"}
                    aria-expanded={showSurahs}
                    aria-haspopup="listbox"
                  >
                    <span className="truncate" suppressHydrationWarning>
                      {selectedSurah ? `${selectedSurah.number}. ${selectedSurah.arabic}` : (t("quran.select_surah") !== "quran.select_surah" ? t("quran.select_surah") : "اختر السورة")}
                    </span>
                    <ChevronDown className="w-5 h-5 text-islamic-gold" aria-hidden="true" />
                  </button>
                  
                  {showSurahs && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      {SURAHS.map((surah) => (
                        <button
                          key={surah.number}
                          onClick={() => handleSurahSelect(surah)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          aria-label={`${surah.number}. ${surah.arabic} - ${surah.name} - ${surah.verses} verses`}
                        >
                          <div className="font-semibold text-gray-900 dark:text-white">{surah.number}. {surah.arabic}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{surah.name} - {surah.verses} آيات</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Ayah Selection */}
              <div>
                <label htmlFor="ayah-number-input" className="block text-sm font-semibold mb-2" suppressHydrationWarning>
                  {t("tafseer.verse_number") !== "tafseer.verse_number" ? t("tafseer.verse_number") : "رقم الآية"}
                </label>
                <input
                  id="ayah-number-input"
                  type="number"
                  min="1"
                  max={selectedSurah?.verses || 1}
                  value={selectedAyah}
                  onChange={(e) => setSelectedAyah(Number(e.target.value))}
                  className="w-full p-3 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none"
                  aria-label={t("tafseer.verse_number") !== "tafseer.verse_number" ? t("tafseer.verse_number") : "رقم الآية"}
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={!selectedSurah || loading}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t("tafseer.search") !== "tafseer.search" ? t("tafseer.search") : "بحث"}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Search className="w-5 h-5" aria-hidden="true" />}
                  <span suppressHydrationWarning>{t("search")}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {/* Verse Search Input */}
              <div className="md:col-span-2 relative" ref={searchRef}>
                <label htmlFor="verse-search-input" className="block text-sm font-semibold mb-2" suppressHydrationWarning>
                  {t("tafseer.search_verse") !== "tafseer.search_verse" ? t("tafseer.search_verse") : "ابحث عن آية"} (مثال: 2:255 أو البقرة:255)
                </label>
                <div className="relative">
                  <input
                    id="verse-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="مثال: 2:255 أو البقرة:255"
                    className="w-full p-3 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none"
                    aria-label={t("tafseer.search_verse") !== "tafseer.search_verse" ? t("tafseer.search_verse") : "ابحث عن آية"}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={t("clear") || "Clear search"}
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
                
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border-2 border-islamic-gold/30 rounded-full shadow-2xl z-50 max-h-60 overflow-y-auto">
                    {searchResults.map((surah) => (
                      <button
                        key={surah.number}
                        onClick={() => handleSurahSelect(surah)}
                        className="w-full px-4 py-3 text-left hover:bg-islamic-gold/10 transition-colors duration-300"
                        aria-label={`${surah.number}. ${surah.arabic} - ${surah.name} - ${surah.verses} verses`}
                      >
                        <div className="font-semibold">{surah.number}. {surah.arabic}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{surah.name} - {surah.verses} آيات</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleVerseSearch}
                  disabled={!searchQuery || loading}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t("search") || "Search"}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Search className="w-5 h-5" aria-hidden="true" />}
                  {t("search")}
                </button>
              </div>
            </div>
          )}

          {/* Edition Selection */}
          <div className="mt-4 relative" ref={editionsRef}>
            <label className="block text-sm font-semibold mb-2" suppressHydrationWarning>
              {t("tafseer.source") !== "tafseer.source" ? t("tafseer.source") : "مصدر التفسير"}
            </label>
            <div className="relative">
              <button
                onClick={() => setShowEditions(!showEditions)}
                className="w-full p-3 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none cursor-pointer text-left flex items-center justify-between"
                aria-label={t("tafseer.source") !== "tafseer.source" ? `${t("tafseer.source")}: ${selectedEdition.name}` : `مصدر التفسير: ${selectedEdition.name}`}
                aria-expanded={showEditions}
                aria-haspopup="listbox"
              >
                <span className="truncate">{selectedEdition.name}</span>
                <ChevronDown className="w-5 h-5 text-islamic-gold" aria-hidden="true" />
              </button>
              
              {showEditions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {TAFSEER_EDITIONS.map((edition) => (
                    <button
                      key={edition.id}
                      onClick={() => {
                        setSelectedEdition(edition);
                        setShowEditions(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                        selectedEdition.id === edition.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                      }`}
                      aria-label={`${edition.name} by ${edition.author}`}
                      aria-selected={selectedEdition.id === edition.id}
                    >
                      <div className="font-semibold">{edition.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{edition.author}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tafseer Result */}
        {loading ? (
          <div className="shimmer w-full h-64 rounded-2xl" />
        ) : tafseer ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-light dark:bg-dark rounded-2xl p-6 md:p-8 border-2 border-islamic-gold/30"
          >
            <div className="mb-6 p-4 bg-gradient-to-r from-islamic-gold/20 via-islamic-green/20 to-islamic-blue/20 rounded-full border border-islamic-gold/30">
              <div className="flex items-center gap-2 mb-2">
                <Book className="w-5 h-5 text-islamic-gold" />
                <h3 className="text-lg font-bold text-islamic-gold">{tafseer.edition}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                التفسير للآية {tafseer.ayah} من السورة {selectedSurah?.number} - {tafseer.author}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-light-secondary dark:bg-dark-secondary rounded-xl">
                <h4 className="text-sm font-semibold text-islamic-gold mb-2">نص التفسير:</h4>
                <div
                  className="text-lg leading-relaxed text-right font-arabic"
                  style={{
                    lineHeight: '2.5',
                    wordSpacing: '0.2em',
                    letterSpacing: '0.05em'
                  }}
                  dangerouslySetInnerHTML={{ __html: tafseer.text }}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-islamic-gold/20 text-islamic-gold rounded-full text-sm">
                  السورة {selectedSurah?.number}
                </span>
                <span className="px-3 py-1 bg-islamic-green/20 text-islamic-green rounded-full text-sm">
                  الآية {tafseer.ayah}
                </span>
                <span className="px-3 py-1 bg-islamic-blue/20 text-islamic-blue rounded-full text-sm">
                  {selectedEdition.language === 'arabic' ? 'عربي' : 
                   selectedEdition.language === 'english' ? 'English' : 
                   selectedEdition.language === 'urdu' ? 'اردو' : selectedEdition.language}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            <Globe className="w-16 h-16 mx-auto mb-4 text-islamic-gold/50" />
            <p className="text-lg mb-2">{t("tafseer.select_instruction")}</p>
            <p className="text-sm">{t("tafseer.available_translations")}</p>
          </div>
        )}
      </div>
    </section>
  );
}