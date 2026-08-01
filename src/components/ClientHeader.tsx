"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { requestNotificationPermission } from "@/lib/utils";
import { Heart, Bookmark, ArrowLeft, Search } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const BookmarkModal = dynamic(() => import("@/components/BookmarkModal"), {
  ssr: false,
});
const GlobalSearchModal = dynamic(() => import("@/components/GlobalSearchModal"), {
  ssr: false,
});

export default function ClientHeader() {
  const { t, locale, direction } = useLanguage();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Check if we're in a section page (handles both /sections/ and /[lang]/sections/)
  const isSectionPage = pathname?.includes('/sections/');
  
  // Get home URL based on language - always use the current locale
  const getHomeUrl = () => {
    return `/${locale}`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
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

  // Same visible label + href as DonationSection title / section route (Lighthouse link audit).
  const donationLabel = t("donation.header_button") || t("donation.title") || "Donate for orphans";
  const donationHref = `/${locale}/sections/donation`;
  const searchLabel =
    t("quran.search") !== "quran.search"
      ? t("quran.search")
      : locale === "ar"
        ? "بحث"
        : "Search";

  // Stable SSR chrome: reserve search/bookmark slots so font/icon swap does not shift CTA.
  if (!mounted) {
    return (
      <div className="safe-fixed-top fixed top-0 right-0 z-50 flex gap-4 items-center pb-4">
        <a
          href={donationHref}
          className="flex items-center justify-center gap-2 p-3 sm:px-4 sm:py-2 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-bold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-colors duration-300 text-sm glow min-h-[44px] min-w-[44px]"
          aria-label={donationLabel}
        >
          <Heart className="w-5 h-5" fill="currentColor" aria-hidden="true" />
          <span className="hidden sm:inline">{donationLabel}</span>
        </a>
        <div className="w-11 h-11 rounded-full bg-light-secondary dark:bg-dark-secondary" aria-hidden="true" />
        <div className="w-11 h-11 rounded-full bg-light-secondary dark:bg-dark-secondary" aria-hidden="true" />
        <div className="w-11 h-11 rounded-full bg-light-secondary dark:bg-dark-secondary" aria-hidden="true" />
        <div className="w-11 h-11 rounded-full bg-light-secondary dark:bg-dark-secondary" aria-hidden="true" />
      </div>
    );
  }

  return (
    <>
      <div className="safe-fixed-top fixed top-0 right-0 z-50 flex gap-4 items-center pb-4">
        {isSectionPage && (
          <>
            <a
              href={getHomeUrl()}
              className="flex items-center justify-center gap-2 p-3 sm:px-4 sm:py-2 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-transform duration-300 shadow-lg hover:shadow-xl text-sm glow min-h-[44px]"
              title={t("navigation.back_to_home")}
              aria-label={t("navigation.back_to_home")}
            >
              <ArrowLeft 
                className={`w-5 h-5 ${direction === 'rtl' ? 'rotate-180' : ''}`} 
              />
              <span className="hidden sm:inline whitespace-nowrap">{t("navigation.back_to_home")}</span>
            </a>
            <a
              href={donationHref}
              className="flex items-center justify-center gap-2 p-3 sm:px-4 sm:py-2 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-bold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-colors duration-300 text-sm glow min-h-[44px]"
              aria-label={donationLabel}
            >
              <Heart className="w-5 h-5" fill="currentColor" aria-hidden="true" />
              <span className="hidden sm:inline">{donationLabel}</span>
            </a>
          </>
        )}
        {!isSectionPage && (
          <a
            href={donationHref}
            className="flex items-center justify-center gap-2 p-3 sm:px-4 sm:py-2 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-bold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-colors duration-300 text-sm glow min-h-[44px]"
            aria-label={donationLabel}
          >
            <Heart className="w-5 h-5" fill="currentColor" aria-hidden="true" />
            <span className="hidden sm:inline">{donationLabel}</span>
          </a>
        )}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="group flex items-center justify-center p-3 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold dark:hover:bg-islamic-gold transition-opacity duration-300 glow min-h-[44px] min-w-[44px]"
          title={searchLabel}
          aria-label={searchLabel}
        >
          <Search className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setIsBookmarkModalOpen(true)}
          className="group relative flex items-center justify-center p-3 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold dark:hover:bg-islamic-gold transition-opacity duration-300 glow min-h-[44px] min-w-[44px]"
          title={t("bookmarks.title") || "Bookmarks"}
          aria-label={t("bookmarks.title") || "Bookmarks"}
        >
          <Bookmark className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white" aria-hidden="true" />
          {bookmarkCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-islamic-gold text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
              {bookmarkCount > 9 ? '9+' : bookmarkCount}
            </span>
          )}
        </button>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
      {isBookmarkModalOpen ? (
        <BookmarkModal isOpen onClose={() => setIsBookmarkModalOpen(false)} />
      ) : null}
      {isSearchOpen ? (
        <GlobalSearchModal isOpen onClose={() => setIsSearchOpen(false)} />
      ) : null}
    </>
  );
}
