"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageProvider";
import { Search, X, BookOpen, Clock, Compass, Heart, FileText, Bookmark, Youtube, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { localizedSectionHref } from "@/lib/routes";

interface SearchResult {
  type: 'quran' | 'section' | 'content';
  title: string;
  subtitle?: string;
  url: string;
  surahNumber?: number;
  ayahNumber?: number;
}

export default function GlobalSearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, locale } = useLanguage();
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'quran' | 'sections'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sections available for search
  const sections = [
    { id: 'quran', name: t("quran.title") || "القرآن الكريم", url: '/sections/quran', icon: BookOpen },
    { id: 'prayer-times', name: t("prayer.title") || "مواقيت الصلاة", url: '/sections/prayer-times', icon: Clock },
    { id: 'qibla', name: t("qibla.title") || "اتجاه القبلة", url: '/sections/qibla', icon: Compass },
    { id: 'supplications', name: t("supplications.title") || "أدعية وأذكار", url: '/sections/supplications', icon: Heart },
    { id: 'tafseer', name: t("tafseer.title") || "تفسير القرآن", url: '/sections/tafseer', icon: FileText },
    { id: 'dhikr', name: t("dhikr.title") || "عداد التسبيح", url: '/sections/dhikr', icon: MessageSquare },
    { id: 'hadith', name: t("hadith.title") || "الأحاديث النبوية", url: '/sections/hadith', icon: BookOpen },
    { id: 'donation', name: t("donation.title") || "كفالة يتيم", url: '/sections/donation', icon: Heart },
    { id: 'youtube', name: t("youtube.title") || "مقاطع القرآن الكريم", url: '/sections/youtube', icon: Youtube },
  ];

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Perform search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    const query = searchQuery.toLowerCase().trim();

    // Search sections
    const sectionResults: SearchResult[] = sections
      .filter(section => {
        const sectionName = section.name.toLowerCase();
        return sectionName.includes(query);
      })
      .map(section => ({
        type: 'section' as const,
        title: section.name,
        url: localizedSectionHref(locale, section.url.replace('/sections/', '')),
      }));

    // Search Quran using the API
    const searchQuran = async () => {
      try {
        const isArabicQuery = /[\u0600-\u06FF]/.test(searchQuery);
        const searchLanguage = isArabicQuery ? 'ar' : (locale === 'ar' ? 'ar' : locale);
        const searchUrl = `/api/quran/search/${encodeURIComponent(searchQuery)}/all/${searchLanguage}`;
        
        const response = await fetch(searchUrl, {
          headers: {
            'Accept-Encoding': 'gzip, deflate, br',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.code === 200 && data.data) {
            let matches: any[] = [];
            if (data.data.matches && Array.isArray(data.data.matches)) {
              matches = data.data.matches;
            } else if (Array.isArray(data.data)) {
              matches = data.data;
            }
            
            // Limit to top 5 Quran results for global search
            const quranResults: SearchResult[] = matches.slice(0, 5).map((match: any) => {
              const surahNumber = match.surah?.number || match.surahNumber;
              const ayahNumber = match.numberInSurah || match.ayah || match.number;
              const surahName = match.surah?.name || `Surah ${surahNumber}`;
              
              return {
                type: 'quran' as const,
                title: `${surahName} - ${locale === 'ar' ? 'آية' : 'Ayah'} ${ayahNumber}`,
                subtitle: match.text?.substring(0, 100) || '',
                url: localizedSectionHref(locale, 'quran'),
                surahNumber,
                ayahNumber,
              };
            });
            
            // Combine results: sections first, then Quran
            setSearchResults([...sectionResults, ...quranResults]);
            setSearchLoading(false);
            return;
          }
        }
      } catch (error) {
        // Silently fail - just show section results
      }
      
      // If Quran search fails, just show section results
      setSearchResults(sectionResults);
      setSearchLoading(false);
    };

    searchQuran();
  }, [searchQuery, locale]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'quran' && result.surahNumber && result.ayahNumber) {
      // Navigate to Quran section and scroll to ayah
      const quranUrl = localizedSectionHref(locale, 'quran');
      router.push(quranUrl);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('navigate-to-ayah', {
          detail: { surah: result.surahNumber, ayah: result.ayahNumber }
        }));
      }, 300);
    } else {
      router.push(result.url);
    }
    onClose();
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4" style={{ zIndex: 9999 }}>
        {/* Backdrop — solid dim; blur thrash on iOS Safari. */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.08 : 0.12 }}
          className="fixed inset-0 bg-black/50"
          style={{ zIndex: 9998 }}
          onClick={onClose}
        />
        
        {/* Modal — transform-only (opacity fades jank on WebKit). */}
        <motion.div
          ref={modalRef}
          initial={reduceMotion ? false : { y: -10 }}
          animate={{ y: 0 }}
          exit={reduceMotion ? undefined : { y: -10 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.16, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-2xl bg-light dark:bg-dark rounded-2xl shadow-2xl border-2 border-islamic-gold/30 overflow-hidden"
          style={{ zIndex: 9999, position: 'relative' }}
        >
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <label htmlFor="global-site-search" className="sr-only">
                {locale === 'ar' ? 'ابحث في الموقع' : 'Search the website'}
              </label>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <input
                ref={inputRef}
                id="global-site-search"
                name="global-site-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'ar' ? 'ابحث في الموقع...' : 'Search the website...'}
                aria-label={locale === 'ar' ? 'ابحث في الموقع' : 'Search the website'}
                autoComplete="off"
                className="w-full py-3 rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-islamic-gold/30 focus:border-islamic-gold outline-none text-lg"
                style={{
                  paddingLeft: '3rem',
                  paddingRight: searchQuery ? '3.5rem' : '3rem' // Extra padding when X button is visible
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 z-10 p-1"
                  aria-label={locale === 'ar' ? 'مسح البحث' : 'Clear search'}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-islamic-gold text-white'
                    : 'bg-light-secondary dark:bg-dark-secondary text-gray-600 dark:text-gray-400'
                }`}
              >
                {locale === 'ar' ? 'الكل' : 'All'}
              </button>
              <button
                onClick={() => setActiveTab('quran')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'quran'
                    ? 'bg-islamic-gold text-white'
                    : 'bg-light-secondary dark:bg-dark-secondary text-gray-600 dark:text-gray-400'
                }`}
              >
                {t("quran.title") || "القرآن الكريم"}
              </button>
              <button
                onClick={() => setActiveTab('sections')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'sections'
                    ? 'bg-islamic-gold text-white'
                    : 'bg-light-secondary dark:bg-dark-secondary text-gray-600 dark:text-gray-400'
                }`}
              >
                {locale === 'ar' ? 'الأقسام' : 'Sections'}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto p-4">
            {searchLoading ? (
              <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                {locale === 'ar' ? 'جاري البحث...' : 'Searching...'}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults
                  .filter(result => {
                    if (activeTab === 'all') return true;
                    if (activeTab === 'quran') return result.type === 'quran';
                    if (activeTab === 'sections') return result.type === 'section';
                    return true;
                  })
                  .map((result, index) => {
                    const Icon = result.type === 'quran' ? BookOpen :
                                result.type === 'section' ? sections.find(s => s.url === result.url)?.icon || FileText :
                                FileText;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result)}
                        className="w-full p-4 rounded-xl bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold/20 border border-islamic-gold/20 hover:border-islamic-gold transition-all text-left flex items-center gap-3 group"
                      >
                        <div className="p-2 rounded-lg bg-islamic-gold/20 group-hover:bg-islamic-gold transition-colors">
                          <Icon className="w-5 h-5 text-islamic-gold group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white group-hover:text-islamic-gold transition-colors">
                            {result.title}
                          </div>
                          {result.subtitle && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {result.subtitle}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                {locale === 'ar' ? 'لا توجد نتائج' : 'No results found'}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {locale === 'ar' ? 'ابدأ بالكتابة للبحث...' : 'Start typing to search...'}
              </div>
            )}

            {/* Quran Search Results Placeholder */}
            {searchQuery && activeTab !== 'sections' && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm font-semibold text-islamic-gold mb-2">
                  {t("quran.title") || "القرآن الكريم"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {locale === 'ar' 
                    ? 'سيتم عرض نتائج البحث من القرآن هنا...' 
                    : 'Quran search results will appear here...'}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
