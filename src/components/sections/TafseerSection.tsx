"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Book, Search, ChevronDown, Globe, X, Loader2 } from "lucide-react";
import SectionTitleLink from "./SectionTitleLink";
import BidiText from "../BidiText";
import {
  defaultTafseerEdition,
  editionDisplayName,
  editionsForLocale,
  isRtlTafseerLanguage,
  tafseerApiUrl,
  type TafseerEdition,
} from "@/lib/tafseer-editions";

function tafseerMessage(
  locale: string,
  key: "unavailable" | "error" | "text_label" | "for_ayah" | "verses",
): string {
  const messages: Record<typeof key, Record<string, string>> = {
    unavailable: {
      ar: "التفسير غير متوفر لهذه الآية في هذا المصدر.",
      en: "Tafseer is not available for this ayah in this source.",
      fr: "Le tafsir n'est pas disponible pour ce verset dans cette source.",
      zh: "此来源暂无该节经文的注释。",
      tr: "Bu kaynakta bu ayet için tefsir bulunamadı.",
      id: "Tafsir tidak tersedia untuk ayat ini pada sumber ini.",
      ms: "Tafsir tidak tersedia untuk ayat ini pada sumber ini.",
      ur: "اس آیت کی تفسیر اس مصدر میں دستیاب نہیں۔",
      es: "El tafsir no está disponible para esta aleya en esta fuente.",
      hi: "इस स्रोत में इस आयत की तफ़्सीर उपलब्ध नहीं है।",
      bn: "এই উৎসে এই আয়াতের তাফসীর পাওয়া যায়নি।",
      ja: "この出典では、この節のタフシールは利用できません。",
      it: "Il tafsir non è disponibile per questo versetto in questa fonte.",
      pt: "O tafsir não está disponível para este versículo nesta fonte.",
      ko: "이 출처에는 해당 절의 타프시르가 없습니다.",
    },
    error: {
      ar: "التفسير غير متوفر حالياً. يرجى المحاولة لاحقاً.",
      en: "Tafseer is temporarily unavailable. Please try again later.",
      fr: "Le tafsir est temporairement indisponible. Réessayez plus tard.",
      zh: "注释暂时不可用，请稍后重试。",
      tr: "Tefsir şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
      id: "Tafsir sementara tidak tersedia. Silakan coba lagi nanti.",
      ms: "Tafsir sementara tidak tersedia. Sila cuba lagi kemudian.",
      ur: "تفسیر فی الحال دستیاب نہیں۔ بعد میں دوبارہ کوشش کریں۔",
      es: "El tafsir no está disponible temporalmente. Inténtalo más tarde.",
      hi: "तफ़्सीर अस्थायी रूप से उपलब्ध नहीं है। बाद में पुनः प्रयास करें।",
      bn: "তাফসীর সাময়িকভাবে অনুপলব্ধ। পরে আবার চেষ্টা করুন।",
      ja: "タフシールは一時的に利用できません。後でもう一度お試しください。",
      it: "Il tafsir non è temporaneamente disponibile. Riprova più tardi.",
      pt: "O tafsir está temporariamente indisponível. Tente novamente mais tarde.",
      ko: "타프시르를 일시적으로 사용할 수 없습니다. 나중에 다시 시도하세요.",
    },
    text_label: {
      ar: "نص التفسير:",
      en: "Tafseer text:",
      fr: "Texte du tafsir :",
      zh: "注释文本：",
      tr: "Tefsir metni:",
      id: "Teks tafsir:",
      ms: "Teks tafsir:",
      ur: "متن تفسیر:",
      es: "Texto del tafsir:",
      hi: "तफ़्सीर पाठ:",
      bn: "তাফসীর পাঠ:",
      ja: "タフシール本文：",
      it: "Testo del tafsir:",
      pt: "Texto do tafsir:",
      ko: "타프시르 본문:",
    },
    for_ayah: {
      ar: "التفسير للآية {ayah} من السورة {surah} — {author}",
      en: "Tafseer for ayah {ayah} of surah {surah} — {author}",
      fr: "Tafsir du verset {ayah} de la sourate {surah} — {author}",
      zh: "第 {surah} 章第 {ayah} 节注释 — {author}",
      tr: "{surah}. sure {ayah}. ayet tefsiri — {author}",
      id: "Tafsir ayat {ayah} dari surah {surah} — {author}",
      ms: "Tafsir ayat {ayah} dari surah {surah} — {author}",
      ur: "سورہ {surah} کی آیت {ayah} کی تفسیر — {author}",
      es: "Tafsir de la aleya {ayah} de la sura {surah} — {author}",
      hi: "सूरह {surah} की आयत {ayah} की तफ़्सीर — {author}",
      bn: "সূরা {surah} এর আয়াত {ayah} এর তাফসীর — {author}",
      ja: "第{surah}章 {ayah}節のタフシール — {author}",
      it: "Tafsir del versetto {ayah} della sura {surah} — {author}",
      pt: "Tafsir do versículo {ayah} da sura {surah} — {author}",
      ko: "{surah}장 {ayah}절 타프시르 — {author}",
    },
    verses: {
      ar: "آيات",
      en: "verses",
      fr: "versets",
      zh: "节",
      tr: "ayet",
      id: "ayat",
      ms: "ayat",
      ur: "آیات",
      es: "aleyas",
      hi: "आयतें",
      bn: "আয়াত",
      ja: "節",
      it: "versetti",
      pt: "versículos",
      ko: "절",
    },
  };
  return messages[key][locale] || messages[key].en;
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
  const { t, locale } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedAyah, setSelectedAyah] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEdition, setSelectedEdition] = useState(() => defaultTafseerEdition(locale));
  const tafseerDirection = isRtlTafseerLanguage(selectedEdition.language) ? "rtl" : "ltr";
  const [tafseer, setTafseer] = useState<TafseerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showEditions, setShowEditions] = useState(false);
  const [showSurahs, setShowSurahs] = useState(false);
  type VerseSearchHit =
    | { kind: "surah"; surah: Surah }
    | { kind: "ayah"; surahNumber: number; ayahNumber: number; text: string; surah?: Surah };

  const [searchResults, setSearchResults] = useState<VerseSearchHit[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [textSearchLoading, setTextSearchLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<"surah" | "verse">("surah");
  const [mounted, setMounted] = useState(false);
  const deepLinkHandled = useRef(false);
  const fetchSeq = useRef(0);
  const lastFetchKey = useRef("");
  const textSearchSeq = useRef(0);

  const editionsRef = useRef<HTMLDivElement>(null);
  const surahsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const availableEditions = editionsForLocale(locale);
  const editionLabel = editionDisplayName(selectedEdition, locale);

  const surahLabel = useCallback(
    (surah: Surah) => {
      if (locale === "ar") return `${surah.number}. ${surah.arabic}`;
      return `${surah.number}. ${surah.name} (${surah.arabic})`;
    },
    [locale],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Match tafseer source language to the UI locale when the language changes.
  useEffect(() => {
    if (!mounted) return;
    setSelectedEdition(defaultTafseerEdition(locale));
  }, [locale, mounted]);

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Verse-mode autocomplete: surah names + Quran text search
  useEffect(() => {
    if (searchMode !== "verse") return;
    const trimmed = searchQuery.trim();
    if (!trimmed || trimmed.includes(":")) {
      // Invalidate in-flight debounced text search so a late response cannot reopen suggestions.
      textSearchSeq.current += 1;
      setSearchResults([]);
      setShowSearchResults(false);
      setTextSearchLoading(false);
      return;
    }

    const surahHits: VerseSearchHit[] = SURAHS.filter(
      (surah) =>
        surah.arabic.includes(trimmed) ||
        surah.name.toLowerCase().includes(trimmed.toLowerCase()) ||
        surah.number.toString() === trimmed,
    )
      .slice(0, 8)
      .map((surah) => ({ kind: "surah" as const, surah }));

    setSearchResults(surahHits);
    setShowSearchResults(surahHits.length > 0);

    // Debounced full-text ayah search (Arabic or translation language).
    if (trimmed.length < 2) {
      textSearchSeq.current += 1;
      setTextSearchLoading(false);
      return;
    }

    const seq = ++textSearchSeq.current;
    setTextSearchLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const isArabicQuery = /[\u0600-\u06FF]/.test(trimmed);
        const searchLanguage = isArabicQuery ? "ar" : locale === "ar" ? "ar" : locale;
        const response = await fetch(
          `/api/quran/search/${encodeURIComponent(trimmed)}/all/${searchLanguage}`,
        );
        if (seq !== textSearchSeq.current) return;
        if (!response.ok) {
          setTextSearchLoading(false);
          return;
        }
        const data = await response.json();
        const matches = (data?.data?.matches || []) as Array<{
          text?: string;
          numberInSurah?: number;
          surah?: { number?: number; name?: string; englishName?: string };
        }>;
        const ayahHits: VerseSearchHit[] = matches.slice(0, 12).map((match) => {
          const surahNumber = match.surah?.number || 0;
          const surah = SURAHS.find((item) => item.number === surahNumber);
          return {
            kind: "ayah" as const,
            surahNumber,
            ayahNumber: match.numberInSurah || 1,
            text: match.text || "",
            surah,
          };
        }).filter((hit) => hit.surahNumber >= 1 && hit.surahNumber <= 114);

        if (seq !== textSearchSeq.current) return;
        const merged = [...surahHits, ...ayahHits];
        setSearchResults(merged);
        setShowSearchResults(merged.length > 0);
      } catch (error) {
        if (seq === textSearchSeq.current) {
          console.error("Tafseer text search failed:", error);
        }
      } finally {
        if (seq === textSearchSeq.current) setTextSearchLoading(false);
      }
    }, 350);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchQuery, searchMode, locale]);

  const fetchTafseer = useCallback(
    async (surahNumber: number, ayahNumber: number, edition: TafseerEdition) => {
      const key = `${edition.slug}:${surahNumber}:${ayahNumber}`;
      lastFetchKey.current = key;
      const seq = ++fetchSeq.current;
      setLoading(true);
      try {
        const response = await fetch(tafseerApiUrl(edition.slug, surahNumber, ayahNumber));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (seq !== fetchSeq.current) return;

        const displayName = editionDisplayName(edition, locale);
        if (data && typeof data.text === "string" && data.text.trim()) {
          setTafseer({
            ayah: ayahNumber,
            text: data.text,
            edition: displayName,
            author: edition.author,
          });
        } else {
          setTafseer({
            ayah: ayahNumber,
            text: tafseerMessage(locale, "unavailable"),
            edition: displayName,
            author: edition.author,
          });
        }
      } catch (error) {
        console.error("Tafseer fetch error:", error);
        if (seq !== fetchSeq.current) return;
        setTafseer({
          ayah: ayahNumber,
          text: tafseerMessage(locale, "error"),
          edition: editionDisplayName(edition, locale),
          author: edition.author,
        });
      } finally {
        if (seq === fetchSeq.current) setLoading(false);
      }
    },
    [locale],
  );

  // Deep link from Quran reader: /[lang]/sections/tafseer?surah=32&ayah=11
  useEffect(() => {
    if (!mounted || deepLinkHandled.current || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const surahNum = Number.parseInt(params.get("surah") || "", 10);
    const ayahNum = Number.parseInt(params.get("ayah") || "", 10);
    if (!Number.isFinite(surahNum) || surahNum < 1 || surahNum > 114) return;
    const surah = SURAHS.find((item) => item.number === surahNum);
    if (!surah) return;
    const ayah =
      Number.isFinite(ayahNum) && ayahNum >= 1 && ayahNum <= surah.verses ? ayahNum : 1;
    deepLinkHandled.current = true;
    setSelectedEdition(defaultTafseerEdition(locale));
    setSelectedSurah(surah);
    setSelectedAyah(ayah);
    setSearchMode("surah");
  }, [mounted, locale]);

  // Auto-fetch when surah / ayah / edition are ready (surah picker + ayah field).
  useEffect(() => {
    if (!mounted || !selectedSurah) return;
    const ayah = Math.min(Math.max(1, selectedAyah || 1), selectedSurah.verses);
    if (ayah !== selectedAyah) {
      setSelectedAyah(ayah);
      return;
    }
    const key = `${selectedEdition.slug}:${selectedSurah.number}:${ayah}`;
    if (lastFetchKey.current === key) return;
    const timer = window.setTimeout(() => {
      void fetchTafseer(selectedSurah.number, ayah, selectedEdition);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [mounted, selectedSurah, selectedAyah, selectedEdition, fetchTafseer]);

  const handleSurahSelect = (surah: Surah) => {
    const ayah = Math.min(selectedAyah || 1, surah.verses);
    setSelectedSurah(surah);
    setSelectedAyah(ayah);
    setShowSurahs(false);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleAyahChange = (value: number) => {
    if (!Number.isFinite(value)) {
      setSelectedAyah(1);
      return;
    }
    const max = selectedSurah?.verses || 286;
    setSelectedAyah(Math.min(Math.max(1, value), max));
  };

  const handleEditionSelect = (edition: TafseerEdition) => {
    setSelectedEdition(edition);
    setShowEditions(false);
  };

  const handleSearch = () => {
    if (!selectedSurah) return;
    const ayah = Math.min(Math.max(1, selectedAyah || 1), selectedSurah.verses);
    lastFetchKey.current = "";
    void fetchTafseer(selectedSurah.number, ayah, selectedEdition);
  };

  const selectAyahForTafseer = (surahNumber: number, ayahNumber: number) => {
    const surah = SURAHS.find((s) => s.number === surahNumber);
    if (!surah || ayahNumber < 1 || ayahNumber > surah.verses) return;
    setSelectedSurah(surah);
    setSelectedAyah(ayahNumber);
    setSearchMode("surah");
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleVerseSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    if (trimmed.includes(":")) {
      const [surahPart, ayahPart] = trimmed.split(":");
      const surahNum = Number.parseInt(surahPart.replace(/\D/g, ""), 10);
      const ayahNum = Number.parseInt(ayahPart.replace(/\D/g, ""), 10);
      if (!Number.isFinite(surahNum) || surahNum < 1 || surahNum > 114 || !Number.isFinite(ayahNum)) {
        return;
      }
      selectAyahForTafseer(surahNum, ayahNum);
      return;
    }

    const firstAyah = searchResults.find((hit) => hit.kind === "ayah");
    if (firstAyah && firstAyah.kind === "ayah") {
      selectAyahForTafseer(firstAyah.surahNumber, firstAyah.ayahNumber);
      return;
    }

    const firstSurah = searchResults.find((hit) => hit.kind === "surah");
    if (firstSurah && firstSurah.kind === "surah") {
      handleSurahSelect(firstSurah.surah);
      setSearchMode("surah");
    }
  };

  return (
    <section id="tafseer" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Book className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text leading-normal py-2" suppressHydrationWarning>
              <SectionTitleLink section="tafseer">
                {t("tafseer.title") !== "tafseer.title" ? t("tafseer.title") : "تفسير القرآن"}
              </SectionTitleLink>
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400" suppressHydrationWarning>
            {t("tafseer.subtitle") !== "tafseer.subtitle" ? t("tafseer.subtitle") : "فهم معاني كلام الله"}
          </p>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
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
              aria-label={t("quran.select_surah") !== "quran.select_surah" ? t("quran.select_surah") : "اختر السورة"}
              aria-pressed={searchMode === 'surah'}
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
              aria-label={t("tafseer.search_verse") !== "tafseer.search_verse" ? t("tafseer.search_verse") : "ابحث عن آية"}
              aria-pressed={searchMode === 'verse'}
            >
              {t("tafseer.search_verse") !== "tafseer.search_verse" ? t("tafseer.search_verse") : "ابحث عن آية"}
            </button>
          </div>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-light dark:bg-dark rounded-2xl p-6 md:p-8 border-2 border-islamic-gold/30 mb-8"
        >
          {searchMode === 'surah' ? (
            <div className="grid md:grid-cols-3 gap-4">
              {/* Surah Selection */}
              <div className="relative" ref={surahsRef}>
                <label htmlFor="tafseer-surah-trigger" className="block text-sm font-semibold mb-2" suppressHydrationWarning>
                  {t("quran.select_surah") !== "quran.select_surah" ? t("quran.select_surah") : "اختر السورة"}
                </label>
                <div className="relative">
                  <button
                    id="tafseer-surah-trigger"
                    type="button"
                    onClick={() => setShowSurahs(!showSurahs)}
                    className="w-full p-3 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none cursor-pointer text-left flex items-center justify-between"
                    aria-label={t("quran.select_surah") !== "quran.select_surah" ? t("quran.select_surah") : "اختر السورة"}
                    aria-expanded={showSurahs}
                    aria-haspopup="listbox"
                  >
                    <span className="truncate" suppressHydrationWarning>
                      {selectedSurah
                        ? surahLabel(selectedSurah)
                        : t("quran.select_surah") !== "quran.select_surah"
                          ? t("quran.select_surah")
                          : "اختر السورة"}
                    </span>
                    <ChevronDown className="w-5 h-5 text-islamic-gold" aria-hidden="true" />
                  </button>
                  
                  {showSurahs && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      {SURAHS.map((surah) => (
                        <button
                          key={surah.number}
                          type="button"
                          onClick={() => handleSurahSelect(surah)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          aria-label={`${surahLabel(surah)} - ${surah.verses} ${tafseerMessage(locale, "verses")}`}
                        >
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {surahLabel(surah)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {surah.verses} {tafseerMessage(locale, "verses")}
                          </div>
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
                  name="ayah-number"
                  type="number"
                  min="1"
                  max={selectedSurah?.verses || 1}
                  value={selectedAyah}
                  onChange={(e) => handleAyahChange(Number(e.target.value))}
                  className="w-full p-3 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none"
                  aria-label={t("tafseer.verse_number") !== "tafseer.verse_number" ? t("tafseer.verse_number") : "رقم الآية"}
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={!selectedSurah || loading}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow"
                  aria-label={t("search") !== "search" ? t("search") : "Search"}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Search className="w-5 h-5" aria-hidden="true" />}
                  <span suppressHydrationWarning>{t("search") !== "search" ? t("search") : "Search"}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {/* Verse Search Input */}
              <div className="md:col-span-2 relative" ref={searchRef}>
                <label htmlFor="verse-search-input" className="block text-sm font-semibold mb-2" suppressHydrationWarning>
                  {t("tafseer.search_example") !== "tafseer.search_example"
                    ? t("tafseer.search_example")
                    : "ابحث بالنص أو برقم الآية (مثال: 2:255 أو الحمد لله)"}
                </label>
                <div className="relative">
                  <input
                    id="verse-search-input"
                    name="verse-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleVerseSearch();
                      }
                    }}
                    placeholder={
                      t("tafseer.search_placeholder") !== "tafseer.search_placeholder"
                        ? t("tafseer.search_placeholder")
                        : "نص آية أو 2:255 أو البقرة"
                    }
                    className="w-full p-3 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none"
                    aria-label={t("tafseer.search_verse") !== "tafseer.search_verse" ? t("tafseer.search_verse") : "ابحث عن آية"}
                    autoComplete="off"
                  />
                  {(searchQuery || textSearchLoading) && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={t("clear") || "Clear search"}
                    >
                      {textSearchLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <X className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>
                
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-2xl z-50 max-h-72 overflow-y-auto">
                    {searchResults.map((hit) =>
                      hit.kind === "surah" ? (
                        <button
                          key={`surah-${hit.surah.number}`}
                          type="button"
                          onClick={() => {
                            handleSurahSelect(hit.surah);
                            setSearchMode("surah");
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-islamic-gold/10 transition-colors duration-300 border-b border-gray-100 dark:border-gray-700"
                          aria-label={`${surahLabel(hit.surah)} - ${hit.surah.verses} ${tafseerMessage(locale, "verses")}`}
                        >
                          <div className="font-semibold">{surahLabel(hit.surah)}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {hit.surah.verses} {tafseerMessage(locale, "verses")}
                          </div>
                        </button>
                      ) : (
                        <button
                          key={`ayah-${hit.surahNumber}-${hit.ayahNumber}-${hit.text.slice(0, 12)}`}
                          type="button"
                          onClick={() => selectAyahForTafseer(hit.surahNumber, hit.ayahNumber)}
                          className="w-full px-4 py-3 text-left hover:bg-islamic-gold/10 transition-colors duration-300 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          aria-label={`${hit.surahNumber}:${hit.ayahNumber}`}
                        >
                          <div className="font-semibold text-islamic-gold">
                            {hit.surah ? surahLabel(hit.surah) : hit.surahNumber}:{hit.ayahNumber}
                          </div>
                          <div
                            className="text-sm text-gray-700 dark:text-gray-300 font-arabic line-clamp-2"
                            dir="rtl"
                            lang="ar"
                          >
                            {hit.text}
                          </div>
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleVerseSearch}
                  disabled={!searchQuery || loading}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow"
                  aria-label={t("search") !== "search" ? t("search") : "Search"}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Search className="w-5 h-5" aria-hidden="true" />}
                  {t("search") !== "search" ? t("search") : "Search"}
                </button>
              </div>
            </div>
          )}

          {/* Edition Selection */}
          <div className="mt-4 relative" ref={editionsRef}>
            <label htmlFor="tafseer-edition-trigger" className="block text-sm font-semibold mb-2" suppressHydrationWarning>
              {t("tafseer.source") !== "tafseer.source" ? t("tafseer.source") : "مصدر التفسير"}
            </label>
            <div className="relative">
              <button
                id="tafseer-edition-trigger"
                type="button"
                onClick={() => setShowEditions(!showEditions)}
                className="w-full p-3 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none cursor-pointer text-left flex items-center justify-between"
                aria-label={
                  t("tafseer.source") !== "tafseer.source"
                    ? `${t("tafseer.source")}: ${editionLabel}`
                    : `مصدر التفسير: ${editionLabel}`
                }
                aria-expanded={showEditions}
                aria-haspopup="listbox"
              >
                <span className="truncate">{editionLabel}</span>
                <ChevronDown className="w-5 h-5 text-islamic-gold" aria-hidden="true" />
              </button>
              
              {showEditions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {availableEditions.map((edition) => {
                    const label = editionDisplayName(edition, locale);
                    return (
                      <button
                        key={edition.id}
                        type="button"
                        onClick={() => handleEditionSelect(edition)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                          selectedEdition.id === edition.id
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                        aria-label={`${label} by ${edition.author}`}
                        aria-selected={selectedEdition.id === edition.id}
                      >
                        <div
                          className={`font-semibold ${
                            edition.language === "arabic" || edition.language === "urdu"
                              ? "font-arabic"
                              : ""
                          }`}
                          dir={
                            edition.language === "arabic" || edition.language === "urdu"
                              ? "rtl"
                              : "ltr"
                          }
                        >
                          {label}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {edition.author}
                        </div>
                      </button>
                    );
                  })}
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
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-light dark:bg-dark rounded-2xl p-6 md:p-8 border-2 border-islamic-gold/30"
          >
            <div className="mb-6 p-4 bg-gradient-to-r from-islamic-gold/20 via-islamic-green/20 to-islamic-blue/20 rounded-full border border-islamic-gold/30">
              <div className="flex items-center gap-2 mb-2">
                <Book className="w-5 h-5 text-islamic-gold" />
                <h3 className="text-lg font-bold text-islamic-gold">{tafseer.edition}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tafseerMessage(locale, "for_ayah")
                  .replace("{ayah}", String(tafseer.ayah))
                  .replace("{surah}", selectedSurah ? surahLabel(selectedSurah) : "")
                  .replace("{author}", tafseer.author)}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-light-secondary dark:bg-dark-secondary rounded-xl">
                <h4 className="text-sm font-semibold text-islamic-gold mb-2">
                  {tafseerMessage(locale, "text_label")}
                </h4>
                <div
                  className={`text-lg leading-relaxed ${tafseerDirection === "rtl" ? "text-right font-arabic" : "text-left font-lexend"}`}
                  dir={tafseerDirection}
                  style={{
                    lineHeight: "2.5",
                    wordSpacing: "0.2em",
                    letterSpacing: "0.05em",
                  }}
                  data-tafseer-text
                >
                  <BidiText text={tafseer.text} direction={tafseerDirection} />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-islamic-gold/20 text-islamic-gold rounded-full text-sm">
                  {selectedSurah ? surahLabel(selectedSurah) : ""}
                </span>
                <span className="px-3 py-1 bg-islamic-green/20 text-islamic-green rounded-full text-sm">
                  {tafseer.ayah}
                </span>
                <span className="px-3 py-1 bg-islamic-blue/20 text-islamic-blue rounded-full text-sm">
                  {editionLabel}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            <Globe className="w-16 h-16 mx-auto mb-4 text-islamic-gold/50" />
            <p className="text-lg mb-2">{t("tafseer.select_instruction")}</p>
            <p className="text-sm">
              {t("tafseer.available_translations") !== "tafseer.available_translations"
                ? t("tafseer.available_translations")
                : t("tafseer.available_languages")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}