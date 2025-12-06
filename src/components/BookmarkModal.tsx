"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookmarkCheck, Bookmark } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

interface BookmarkedVerse {
  surahNumber: number;
  ayahNumber: number;
  surahName?: string;
  arabicText?: string;
  translation?: string;
}

export default function BookmarkModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, locale } = useLanguage();
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
                    {locale === 'ar' ? 'الآيات المفضلة' : 'Bookmarked Verses'}
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
                      {locale === 'ar' ? 'لا توجد آيات مفضلة' : 'No bookmarked verses'}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                      {locale === 'ar' ? 'ابدأ بإضافة آيات إلى المفضلة' : 'Start bookmarking verses to see them here'}
                    </p>
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
                              {verse.surahName} - {locale === 'ar' ? 'آية' : 'Ayah'} {verse.ayahNumber}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {locale === 'ar' ? 'سورة' : 'Surah'} {verse.surahNumber}
                            </p>
                          </div>
                          <button
                            onClick={() => removeBookmark(verse.surahNumber, verse.ayahNumber)}
                            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                            title={locale === 'ar' ? 'إزالة من المفضلة' : 'Remove bookmark'}
                          >
                            <BookmarkCheck className="w-5 h-5 text-islamic-gold" fill="currentColor" />
                          </button>
                        </div>
                        
                        {verse.arabicText && (
                          <div className="mb-3">
                            <p 
                              className="text-2xl font-arabic text-right leading-relaxed text-islamic-green dark:text-islamic-gold"
                              style={{
                                direction: 'rtl',
                                fontFamily: "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', serif",
                                lineHeight: '2.5'
                              }}
                            >
                              {verse.arabicText}
                            </p>
                          </div>
                        )}
                        
                        {verse.translation && (
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {verse.translation}
                          </p>
                        )}
                        
                        <button
                          onClick={() => scrollToVerse(verse.surahNumber, verse.ayahNumber)}
                          className="text-sm text-islamic-gold hover:text-islamic-green transition-colors font-semibold"
                        >
                          {locale === 'ar' ? '→ الانتقال إلى الآية' : '→ Go to verse'}
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












