"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, BookmarkCheck, Bookmark, ChevronRight, ChevronLeft, Play, Pause, Share2 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useRouter } from "next/navigation";
import BidiText from "./BidiText";
import ShareModal from "./ShareModal";

interface BookmarkedVerse {
  surahNumber: number;
  ayahNumber: number;
  surahName?: string;
  arabicText?: string;
  translation?: string;
}

const DEFAULT_RECITER = "ar.ahmedajamy";

// Component for individual ayah translation (same as in EnhancedQuranSection)
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
    return <div className="text-gray-500 text-sm">Loading translation...</div>;
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

export default function BookmarkModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, locale, direction } = useLanguage();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const isRTL = direction === "rtl";
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequestIdRef = useRef(0);

  // Language-based translation mapping (same as in EnhancedQuranSection)
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
      'ko': 'ko.korean',
      'es': 'es.asad',
      'pt': 'pt.elhayek',
      'hi': 'hi.hindi',
    };
    return translationMap[locale] || 'en.sahih';
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<BookmarkedVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingKey, setCurrentPlayingKey] = useState<string | null>(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedVerseForShare, setSelectedVerseForShare] = useState<{
    surahNumber: number;
    surahName: string;
    ayahNumber: number;
    arabicText: string;
    translation?: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadBookmarks();
    } else {
      // Stop audio when modal closes and invalidate in-flight play requests
      playRequestIdRef.current += 1;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentPlayingKey(null);
      setAudioLoading(false);
    }
  }, [isOpen, locale]);

  useEffect(() => {
    const handleBookmarksUpdate = (event: CustomEvent) => {
      if (event.detail?.bookmarks) {
        setBookmarks(event.detail.bookmarks);
        loadVerseDetails(event.detail.bookmarks);
      }
    };

    window.addEventListener('bookmarks-updated', handleBookmarksUpdate as EventListener);
    return () => {
      window.removeEventListener('bookmarks-updated', handleBookmarksUpdate as EventListener);
    };
  }, [locale]);

  // Mirror EnhancedQuranSection audio event wiring
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentPlayingKey(null);
    };
    const handleError = () => {
      setIsPlaying(false);
      setAudioLoading(false);
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

  const loadBookmarks = () => {
    if (typeof window !== 'undefined') {
      const savedBookmarks = localStorage.getItem('quran-bookmarks');
      if (savedBookmarks) {
        try {
          const bookmarkArray = JSON.parse(savedBookmarks);
          setBookmarks(bookmarkArray);
          loadVerseDetails(bookmarkArray);
        } catch (e) {
          console.error('Error loading bookmarks:', e);
        }
      }
    }
  };

  const loadVerseDetails = async (bookmarkKeys: string[]) => {
    setLoading(true);
    try {
      const verses: BookmarkedVerse[] = [];
      
      for (const key of bookmarkKeys) {
        const [surahNum, ayahNum] = key.split('-').map(Number);
        
        // Match Quran section: Arabic name for ar, englishName for other locales
        let surahName = '';
        try {
          const surahResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`);
          const surahData = await surahResponse.json();
          if (surahData.code === 200) {
            surahName =
              locale === 'ar'
                ? (surahData.data.name || surahData.data.englishName)
                : (surahData.data.englishName || surahData.data.name);
          }
        } catch (e) {
          console.error('Error fetching surah:', e);
        }

        // Fetch ayah details
        try {
          const ayahResponse = await fetch(`https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}`);
          const ayahData = await ayahResponse.json();
          if (ayahData.code === 200) {
            verses.push({
              surahNumber: surahNum,
              ayahNumber: ayahNum,
              surahName: surahName || `Surah ${surahNum}`,
              arabicText: ayahData.data.text,
              translation: ayahData.data.edition?.text || ''
            });
          }
        } catch (e) {
          // If API fails, still add the verse with basic info
          verses.push({
            surahNumber: surahNum,
            ayahNumber: ayahNum,
            surahName: surahName || `Surah ${surahNum}`
          });
        }
      }
      
      setBookmarkedVerses(verses);
    } catch (e) {
      console.error('Error loading verse details:', e);
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = (surahNumber: number, ayahNumber: number) => {
    const bookmarkKey = `${surahNumber}-${ayahNumber}`;
    const newBookmarks = bookmarks.filter(b => b !== bookmarkKey);
    setBookmarks(newBookmarks);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('quran-bookmarks', JSON.stringify(newBookmarks));
      window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: { bookmarks: newBookmarks } }));
    }
    
    setBookmarkedVerses(prev => prev.filter(v => !(v.surahNumber === surahNumber && v.ayahNumber === ayahNumber)));
  };

  const scrollToVerse = (surahNumber: number, ayahNumber: number) => {
    onClose();
    // Scroll to quran section and trigger navigation
    setTimeout(() => {
      const quranSection = document.getElementById('quran');
      if (quranSection) {
        quranSection.scrollIntoView({ behavior: 'smooth' });
        // Dispatch event to change surah
        window.dispatchEvent(new CustomEvent('navigate-to-ayah', { 
          detail: { surah: surahNumber, ayah: ayahNumber } 
        }));
      }
    }, 300);
  };

  const pauseAyah = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  // Same audio API path as EnhancedQuranSection.playAyah
  const playAyah = async (surahNumber: number, ayahNumber: number) => {
    const verseKey = `${surahNumber}-${ayahNumber}`;
    const requestId = ++playRequestIdRef.current;
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      setCurrentPlayingKey(verseKey);
      setAudioLoading(true);
      setIsPlaying(true);

      const response = await fetch(`/api/quran/ayah/${surahNumber}:${ayahNumber}/${DEFAULT_RECITER}`);
      if (requestId !== playRequestIdRef.current) {
        return;
      }
      if (!response.ok) {
        throw new Error(`Quran audio request failed with status ${response.status}`);
      }
      const data = await response.json();
      if (requestId !== playRequestIdRef.current) {
        return;
      }

      if (data.data?.audio && (!data.data.edition || data.data.edition.format === "audio")) {
        if (audioRef.current) {
          audioRef.current.src = data.data.audio;
          audioRef.current.load();
          try {
            await audioRef.current.play();
            if (requestId !== playRequestIdRef.current) {
              audioRef.current.pause();
              return;
            }
            setAudioLoading(false);
          } catch (playError) {
            if (requestId !== playRequestIdRef.current) {
              return;
            }
            console.error("Error playing audio:", playError);
            setIsPlaying(false);
            setAudioLoading(false);
            setCurrentPlayingKey(null);
            alert(locale === "ar"
              ? "تعذر تشغيل صوت هذه الآية. يرجى المحاولة مرة أخرى."
              : "This verse audio could not be played. Please try again.");
          }
        }
      } else {
        throw new Error("No valid audio edition URL found");
      }
    } catch (error) {
      if (requestId !== playRequestIdRef.current) {
        return;
      }
      console.error("Error in playAyah:", error);
      setIsPlaying(false);
      setAudioLoading(false);
      setCurrentPlayingKey(null);
      alert(locale === "ar"
        ? "تعذر تحميل صوت هذه الآية. يرجى المحاولة مرة أخرى."
        : "This verse audio could not be loaded. Please try again.");
    }
  };

  const togglePlayPause = (surahNumber: number, ayahNumber: number) => {
    const verseKey = `${surahNumber}-${ayahNumber}`;
    if (isPlaying && currentPlayingKey === verseKey) {
      pauseAyah();
      return;
    }
    void playAyah(surahNumber, ayahNumber);
  };

  const handleShare = async (verse: BookmarkedVerse) => {
    let translationText = verse.translation || '';
    if (!translationText) {
      try {
        const response = await fetch(
          `/api/quran/ayah/${verse.surahNumber}:${verse.ayahNumber}/${getTranslationIdentifier(locale)}`
        );
        const data = await response.json();
        if (data.data?.text) {
          translationText = data.data.text;
        }
      } catch (error) {
        console.error('Error fetching translation for share:', error);
      }
    }

    setSelectedVerseForShare({
      surahNumber: verse.surahNumber,
      surahName: verse.surahName || `Surah ${verse.surahNumber}`,
      ayahNumber: verse.ayahNumber,
      arabicText: verse.arabicText || '',
      translation: translationText,
    });
    setIsShareModalOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — opacity only (no blur thrash on WebKit). */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Modal — y + opacity; avoid scale (blinks on Safari). */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-light dark:bg-dark rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <BookmarkCheck className="w-6 h-6 text-islamic-gold" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t("bookmarks.bookmarked_verses")}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="space-y-4 py-2" role="status" aria-busy="true" aria-label={locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}>
                    <span className="sr-only">{locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}</span>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="rounded-2xl border border-islamic-gold/10 p-4 space-y-3">
                        <div className="shimmer h-4 w-1/3 rounded-full" />
                        <div className="shimmer h-16 w-full rounded-xl" />
                        <div className="shimmer h-3 w-2/3 rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : bookmarkedVerses.length === 0 ? (
                  <div className="text-center py-12">
                    <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {t("bookmarks.no_bookmarks")}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 mb-6">
                      {t("bookmarks.start_bookmarking")}
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        setTimeout(() => {
                          const quranSection = document.getElementById('quran');
                          if (quranSection) {
                            quranSection.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            // If on a different page, navigate to main page with quran section
                            router.push(`/${locale}#quran`);
                          }
                        }, 300);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-islamic-gold text-white font-semibold rounded-full hover:bg-islamic-green transition-all duration-300 glow"
                    >
                      {t("bookmarks.go_to_quran")}
                      <span className={reduceMotion ? undefined : "bookmark-cta-nudge"} aria-hidden="true">
                        {isRTL ? (
                          <ChevronLeft className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookmarkedVerses.map((verse, index) => (
                      <motion.div
                        key={`${verse.surahNumber}-${verse.ayahNumber}`}
                        initial={reduceMotion ? false : { y: 10 }}
                        animate={{ y: 0 }}
                        transition={{ delay: Math.min(index * 0.03, 0.12), duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-islamic-gold transition-colors duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-islamic-gold mb-1">
                              {verse.surahName} - {t("quran.verse")} {verse.ayahNumber}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {locale === 'ar' ? 'سورة' : locale === 'ur' ? 'سورہ' : 'Surah'} {verse.surahNumber}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => togglePlayPause(verse.surahNumber, verse.ayahNumber)}
                              className="p-2 rounded-full bg-islamic-gold/20 hover:bg-islamic-gold/30 transition-colors duration-300"
                              disabled={audioLoading && currentPlayingKey === `${verse.surahNumber}-${verse.ayahNumber}`}
                              aria-label={isPlaying && currentPlayingKey === `${verse.surahNumber}-${verse.ayahNumber}`
                                ? (locale === 'ar' ? 'إيقاف التشغيل' : 'Pause audio')
                                : (locale === 'ar' ? 'تشغيل الآية' : 'Play verse audio')
                              }
                            >
                              {audioLoading && currentPlayingKey === `${verse.surahNumber}-${verse.ayahNumber}` ? (
                                <div className="w-5 h-5 border-2 border-islamic-gold border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                              ) : isPlaying && currentPlayingKey === `${verse.surahNumber}-${verse.ayahNumber}` ? (
                                <Pause className="w-5 h-5 text-islamic-gold" aria-hidden="true" />
                              ) : (
                                <Play className="w-5 h-5 text-islamic-gold" aria-hidden="true" />
                              )}
                            </button>

                            <button
                              onClick={() => removeBookmark(verse.surahNumber, verse.ayahNumber)}
                              className="p-2 rounded-full bg-islamic-gold/20 hover:bg-islamic-gold/30 transition-colors duration-300"
                              title={t("bookmarks.remove_bookmark")}
                              aria-label={t("bookmarks.remove_bookmark")}
                            >
                              <BookmarkCheck className="w-5 h-5 text-islamic-gold" fill="currentColor" aria-hidden="true" />
                            </button>

                            <button
                              onClick={() => handleShare(verse)}
                              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                              aria-label={locale === 'ar' ? 'مشاركة الآية' : 'Share verse'}
                            >
                              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        
                        {verse.arabicText && (
                          <div className="mb-4">
                            <div className="arabic-quran-text text-2xl md:text-3xl leading-relaxed text-right text-islamic-gold">
                              {verse.arabicText}
                            </div>
                          </div>
                        )}
                        
                        {/* Translation */}
                        {mounted && (
                          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {t("quran.translation") !== "quran.translation" ? t("quran.translation") : "Translation"} ({locale.toUpperCase()})
                            </div>
                            <AyahTranslation 
                              surahNumber={verse.surahNumber} 
                              ayahNumber={verse.ayahNumber} 
                              translationId={getTranslationIdentifier(locale)}
                              locale={locale}
                            />
                          </div>
                        )}
                        
                        <button
                          onClick={() => scrollToVerse(verse.surahNumber, verse.ayahNumber)}
                          className="text-sm text-islamic-gold hover:text-islamic-green transition-colors font-semibold"
                        >
                          → {t("bookmarks.go_to_verse")}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Hidden Audio Element — same pattern as EnhancedQuranSection */}
          <audio
            ref={audioRef}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentPlayingKey(null);
            }}
            onError={(e) => {
              console.error("Audio error:", e);
              setIsPlaying(false);
              setAudioLoading(false);
            }}
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
        </>
      )}
    </AnimatePresence>
  );
}












