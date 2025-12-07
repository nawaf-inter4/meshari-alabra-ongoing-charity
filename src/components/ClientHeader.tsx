"use client";

import { useEffect, useState } from "react";
import { requestNotificationPermission } from "@/lib/utils";
import { Heart, Bookmark, Home, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BookmarkModal from "@/components/BookmarkModal";

export default function ClientHeader() {
  const { t, locale, direction } = useLanguage();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  
  // Check if we're in a section page (handles both /sections/ and /[lang]/sections/)
  const isSectionPage = pathname?.includes('/sections/');
  
  // Get home URL based on language - always use the current locale
  const getHomeUrl = () => {
    if (locale === 'ar') {
      return '/';
    } else {
      return `/${locale}`;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    // Register service worker for PWA
    if ("serviceWorker" in navigator && typeof window !== 'undefined') {
      // Register immediately, don't wait for load event
      navigator.serviceWorker
        .register("/sw.js", { 
          scope: '/',
          updateViaCache: 'none' // Always check for updates
        })
        .then((registration) => {
          console.log('[SW] Service Worker registered:', registration.scope);
          
          // Force activation
          if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  console.log('[SW] New service worker available');
                  // Auto-activate
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
        })
        .catch((error) => {
          console.error('[SW] Service Worker registration failed:', error);
        });
    }

    // Note: Notification permission should only be requested on user interaction
    // Removed automatic request to avoid console violations

    // Load bookmark count
    const updateBookmarkCount = () => {
      if (typeof window !== 'undefined') {
        const savedBookmarks = localStorage.getItem('quran-bookmarks');
        if (savedBookmarks) {
          try {
            const bookmarks = JSON.parse(savedBookmarks);
            setBookmarkCount(bookmarks.length);
          } catch (e) {
            console.error('Error loading bookmark count:', e);
          }
        }
      }
    };

    updateBookmarkCount();

    // Listen for bookmark updates
    const handleBookmarksUpdate = (event: CustomEvent) => {
      if (event.detail?.bookmarks) {
        setBookmarkCount(event.detail.bookmarks.length);
      }
    };

    window.addEventListener('bookmarks-updated', handleBookmarksUpdate as EventListener);
    return () => {
      window.removeEventListener('bookmarks-updated', handleBookmarksUpdate as EventListener);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-0 right-0 z-50 p-4 flex gap-4">
        <a
          href="#donation"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-bold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
          aria-label={t("donation.header_button") || "Donate"}
        >
          <Heart className="w-4 h-4" fill="currentColor" />
          <span className="hidden sm:inline">تبرع</span>
        </a>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-0 right-0 z-50 p-4 flex gap-4 items-center">
        {isSectionPage && (
          <>
            <a
              href={getHomeUrl()}
              className="flex items-center gap-2 px-4 py-2 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              title={t("navigation.back_to_home")}
              aria-label={t("navigation.back_to_home")}
            >
              <ArrowLeft 
                className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} 
              />
              <span className="whitespace-nowrap">{t("navigation.back_to_home")}</span>
            </a>
            <a
              href="#donation"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-bold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              aria-label={t("donation.header_button") || "Donate"}
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              <span className="hidden sm:inline">{t("donation.header_button")}</span>
            </a>
          </>
        )}
        {!isSectionPage && (
          <a
            href="#donation"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-bold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
          >
            <Heart className="w-4 h-4" fill="currentColor" />
            <span className="hidden sm:inline">{t("donation.header_button")}</span>
          </a>
        )}
        <button
          onClick={() => setIsBookmarkModalOpen(true)}
          className="relative flex items-center justify-center w-10 h-10 bg-light-secondary dark:bg-dark-secondary rounded-full hover:bg-islamic-gold/20 transition-all duration-300 border border-gray-200 dark:border-gray-700"
          title={t("bookmarks.title") || "Bookmarks"}
          aria-label={t("bookmarks.title") || "Bookmarks"}
        >
          <Bookmark className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          {bookmarkCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-islamic-gold text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
              {bookmarkCount > 9 ? '9+' : bookmarkCount}
            </span>
          )}
        </button>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
      <BookmarkModal isOpen={isBookmarkModalOpen} onClose={() => setIsBookmarkModalOpen(false)} />
    </>
  );
}
