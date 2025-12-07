"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookmarkCheck, Bookmark, ChevronRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

interface BookmarkedVerse {
  surahNumber: number;
  ayahNumber: number;
  surahName?: string;
  arabicText?: string;
  translation?: string;
}

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
  
  return (
    <div 
      className={isRTL ? "font-arabic text-right leading-relaxed" : "font-lexend text-left leading-relaxed"} 
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {translationText}
    </div>
  );
}

export default function BookmarkModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, locale, direction } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const isRTL = direction === "rtl";

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
      'ko': 'ko.korean'
    };
    return translationMap[locale] || 'en.sahih';
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<BookmarkedVerse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadBookmarks();
    }
  }, [isOpen]);

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
        
        // Fetch surah name
        let surahName = '';
        try {
          const surahResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`);
          const surahData = await surahResponse.json();
          if (surahData.code === 200) {
            surahName = surahData.data.englishName || surahData.data.name;
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
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
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-gold mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      {locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                    </p>
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
                            const baseUrl = locale === 'ar' ? '/' : `/${locale}`;
                            window.location.href = `${baseUrl}#quran`;
                          }
                        }, 300);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-islamic-gold text-white font-semibold rounded-full hover:bg-islamic-green transition-all duration-300"
                    >
                      {t("bookmarks.go_to_quran")}
                      <motion.div
                        animate={{ x: isRTL ? [-4, 0, -4] : [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {isRTL ? (
                          <ChevronLeft className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </motion.div>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookmarkedVerses.map((verse, index) => (
                      <motion.div
                        key={`${verse.surahNumber}-${verse.ayahNumber}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-islamic-gold transition-all duration-300"
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
                          <button
                            onClick={() => removeBookmark(verse.surahNumber, verse.ayahNumber)}
                            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                            title={t("bookmarks.remove_bookmark")}
                          >
                            <BookmarkCheck className="w-5 h-5 text-islamic-gold" fill="currentColor" />
                          </button>
                        </div>
                        
                        {verse.arabicText && (
                          <div className="mb-4">
                            <div className="arabic-quran-text text-2xl md:text-3xl leading-relaxed text-right text-islamic-green dark:text-islamic-gold">
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
        </>
      )}
    </AnimatePresence>
  );
}












