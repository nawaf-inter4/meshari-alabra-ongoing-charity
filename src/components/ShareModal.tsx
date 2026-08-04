"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Copy, Check, Download, Share2, MessageCircle, Send, Facebook, Linkedin, Mail, Share } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";
import { captureShareCardPng } from "@/lib/capture-share-card";
import { localeDirection, siteAssetUrl, siteConfig } from "@/config/site";
import { localizedSectionHref } from "@/lib/routes";
import BidiText from "./BidiText";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse?: {
    surahNumber: number;
    surahName: string;
    ayahNumber: number;
    arabicText: string;
    translation?: string;
    juz?: number;
    page?: number;
  };
  mode?: 'verse' | 'website';
}

export default function ShareModal({ isOpen, onClose, verse, mode = 'verse' }: ShareModalProps) {
  const { locale, t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [downloadingImage, setDownloadingImage] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [mounted, setMounted] = useState(false);
  const previewCardRef = useRef<HTMLDivElement>(null);
  const isRtl = localeDirection(locale) === "rtl";

  // Determine if dark mode is active
  const isDarkMode = mounted && resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Warm Amiri so the preview (and capture clone) paint with the same face.
  useEffect(() => {
    if (!mounted || mode === "website") return;
    void Promise.all([
      document.fonts.load('16px "Amiri"'),
      document.fonts.load('700 16px "Amiri"'),
      document.fonts.ready,
    ]).catch(() => undefined);
  }, [mounted, mode]);

  const siteUrl = siteConfig.identity.siteUrl;
  const siteHost = new URL(siteUrl).host;
  const websiteTitle = typeof window !== 'undefined' ? document.title : siteConfig.identity.name;
  const translatedShareCaption = t("footer.charity");
  const memorialShareCaption = siteConfig.content.footerCharity ||
    (translatedShareCaption === "footer.charity"
      ? `${siteConfig.identity.shortName} — ${siteConfig.content.memorialLegalName}`
      : translatedShareCaption);
  const shareUrl = mode === 'website' 
    ? (typeof window !== 'undefined' ? window.location.href : siteUrl)
    : `${siteUrl}${localizedSectionHref(locale, 'quran')}?surah=${verse?.surahNumber}&ayah=${verse?.ayahNumber}`;
  const shareText = mode === 'website'
    ? websiteTitle
    : `${verse?.surahName} - ${t("share.ayah")} ${verse?.ayahNumber}\n\n${verse?.arabicText}${verse?.translation ? `\n\n${verse.translation}` : ''}`;
  
  // Prefer absolute site URL so SSR/PWA/share preview never depends on relative
  // resolution, and avoid the dynamic /og-image route as the primary source
  // (static PNG is the Open Graph contract).
  const ogImageUrl =
    mode === "website" ? siteAssetUrl(siteConfig.assets.openGraphImage) : undefined;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToSocial = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    const shareTitle = mode === 'website' 
      ? websiteTitle
      : `${verse?.surahName} - ${t("share.ayah")} ${verse?.ayahNumber}`;
    
    const urls: { [key: string]: string } = {
      twitter: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodedText}%20${encodedUrl}`,
      instagram: `https://www.instagram.com/`
    };

    if (platform === 'native') {
      // Use native Web Share API if available
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        }).catch((err) => {
          console.error('Error sharing:', err);
        });
      } else {
        // Fallback to copy if native share not available
        copyToClipboard();
      }
    } else if (urls[platform]) {
      // For Instagram, copy link to clipboard since it doesn't support direct URL sharing
      if (platform === 'instagram') {
        copyToClipboard();
        alert(t("share.link_copied"));
      } else {
        window.open(urls[platform], '_blank', 'width=600,height=400');
      }
    }
  };

  const captureBackground = () =>
    isDarkMode ? siteConfig.colors.backgroundDarkSecondary : siteConfig.colors.backgroundLight;

  const dataUrlToBlob = (dataUrl: string) => {
    const [header, data = ""] = dataUrl.split(",", 2);
    const isBase64 = /;base64/i.test(header);
    const mime = header.match(/data:([^;]+)/)?.[1] || "application/octet-stream";
    const binary = isBase64 ? atob(data) : decodeURIComponent(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  };

  /** Desktop: `<a download>`. Mobile/PWA: Web Share files when available, else blob/save. */
  const persistBlob = async (blob: Blob, filename: string) => {
    const file = new File([blob], filename, { type: blob.type || "application/octet-stream" });
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    const ua = nav?.userAgent ?? "";
    const isAppleTouch =
      /iPad|iPhone|iPod/.test(ua) ||
      (typeof navigator !== "undefined" &&
        navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints > 1);
    const standaloneNav = nav as (Navigator & { standalone?: boolean }) | undefined;
    const isStandalone =
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        Boolean(standaloneNav?.standalone));
    const isCoarsePointer =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    // Prefer Web Share only on phone/tablet / installed PWA — desktop Chromium
    // often supports canShare({files}) and would open a share sheet instead of downloading.
    const preferShare =
      isAppleTouch ||
      isStandalone ||
      (/Android/i.test(ua) && isCoarsePointer);

    const canShareFiles =
      preferShare &&
      !!nav &&
      typeof nav.canShare === "function" &&
      typeof nav.share === "function" &&
      nav.canShare({ files: [file] });

    if (canShareFiles) {
      try {
        await nav.share({
          files: [file],
          title: filename,
        });
        return;
      } catch (error) {
        // User dismissed the share sheet — not a failure.
        if (error instanceof Error && error.name === "AbortError") return;
        // Fall through to download / open fallback.
      }
    }

    const objectUrl = URL.createObjectURL(blob);
    try {
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();

      // iOS Safari / iOS PWAs often ignore `download` on blob URLs — open the
      // file so the user can save/share from the system sheet.
      if (isAppleTouch) {
        const opened = window.open(objectUrl, "_blank", "noopener,noreferrer");
        if (!opened) {
          window.location.assign(objectUrl);
        }
      }
    } finally {
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    }
  };

  const downloadAsImage = async () => {
    if (mode === "website") return;
    const elementToCapture = previewCardRef.current;
    if (!elementToCapture || !verse) return;

    setDownloadingImage(true);
    try {
      const dataUrl = await captureShareCardPng(elementToCapture, {
        backgroundColor: captureBackground(),
      });
      const filename = `${verse.surahName?.replace(/\s+/g, "_")}_Ayah_${verse.ayahNumber}.png`;
      await persistBlob(dataUrlToBlob(dataUrl), filename);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert(t("share.error_download_image") || "Failed to download image. Please try again.");
    } finally {
      setDownloadingImage(false);
    }
  };

  const downloadAsPDF = async () => {
    if (mode === "website") return;
    const elementToCapture = previewCardRef.current;
    if (!elementToCapture || !verse) return;

    setDownloadingPDF(true);
    try {
      const dataUrl = await captureShareCardPng(elementToCapture, {
        backgroundColor: captureBackground(),
      });
      if (!dataUrl || dataUrl === "data:,") {
        throw new Error("Invalid image data");
      }

      const jsPDF = (await import("jspdf")).default;
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = dataUrl;
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const imgWidth = 210;
      const imgHeight = (img.height * imgWidth) / img.width;
      pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");
      const filename = `${verse.surahName?.replace(/\s+/g, "_")}_Ayah_${verse.ayahNumber}.pdf`;
      const pdfBlob = pdf.output("blob");
      await persistBlob(pdfBlob, filename);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert(t("share.error_download_pdf") || "Failed to download PDF. Please try again.");
    } finally {
      setDownloadingPDF(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — opacity only. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Modal — y + opacity; avoid scale on WebKit. */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-light dark:bg-dark rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Share2 className="w-6 h-6 text-islamic-gold" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mode === 'website' 
                      ? t("share.website_title")
                      : t("share.verse_title")
                    }
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={t("accessibility.close_modal") || t("close") || "Close"}
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* OG Image Preview for Website Mode */}
                {mode === 'website' ? (
                  <div className="mb-6">
                    <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-islamic-gold/30">
                      {/* Absolute OG URL + multi-step onError src swap; next/Image isn't a fit here. */}
                      {/* eslint-disable-next-line @next/next/no-img-element -- OG preview needs imperative onError fallback chain */}
                      <img 
                        src={ogImageUrl}
                        alt={websiteTitle}
                        className="w-full h-auto"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.dataset.ogFallback === "1") return;
                          target.dataset.ogFallback = "1";
                          // Same-origin relative path, then dynamic generator as last resort.
                          target.src = siteConfig.assets.openGraphImage.startsWith("/")
                            ? siteConfig.assets.openGraphImage
                            : `/${siteConfig.assets.openGraphImage}`;
                          target.onerror = () => {
                            target.src = "/og-image";
                          };
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  /* Visible Preview - This is what gets downloaded */
                  <div 
                    ref={previewCardRef} 
                    data-share-verse-preview
                    className={`rounded-2xl p-8 shadow-lg border-2 border-islamic-gold/30 mb-6 ${
                      isDarkMode 
                        ? 'bg-gray-800 dark:bg-gray-800' 
                        : 'bg-white'
                    }`}
                    style={{
                      backgroundColor: isDarkMode ? siteConfig.colors.backgroundDarkSecondary : siteConfig.colors.backgroundLight,
                      position: 'relative',
                      // Ensure no font-arabic is inherited
                      fontFamily: 'inherit',
                      direction: 'inherit'
                    }}
                  >
                  {/* Header with Verse Number Badge in Top Right */}
                  {(() => {
                    const surahNameHasArabic = /[\u0600-\u06FF]/.test(verse?.surahName || '');
                    const ayahJuzText = `${t("share.ayah")} ${verse?.ayahNumber || ''} ${verse?.juz ? `• ${t("share.juz")} ${verse.juz}` : ''}`;
                    const ayahJuzHasArabic = /[\u0600-\u06FF]/.test(ayahJuzText);
                    
                    return (
                      <div className="relative mb-6" style={{ 
                        direction: 'ltr' // Always LTR for container
                      }}>
                        {/* Verse Number Badge - Top Right (always positioned right) */}
                        <div 
                          className="w-10 h-10 bg-islamic-gold/20 rounded-full flex items-center justify-center text-islamic-gold font-bold"
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 0,
                            padding: 0,
                            backgroundColor: 'rgba(212, 175, 55, 0.2)',
                            borderRadius: '50%',
                            zIndex: 1
                          }}
                        >
                          <span 
                            style={{
                              color: 'var(--color-brand)',
                              fontSize: '16px',
                              fontWeight: 'bold',
                              lineHeight: '1',
                              margin: 0,
                              padding: 0,
                              textAlign: 'center',
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {verse?.ayahNumber || ''}
                          </span>
                        </div>
                        
                        {/* Surah Name and Details - Positioned beside the badge */}
                        <div style={{ 
                          // Container for positioning - no padding, h3 will position itself at the right
                          width: '100%',
                          boxSizing: 'border-box',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-start',
                          paddingRight: '48px', // Space for badge (40px) + small gap (8px)
                          direction: 'ltr' // Container always LTR to position badge correctly
                        }}>
                          <div>
                            <h3 
                              className={`share-verse-surah text-xl font-bold mb-0 ${isDarkMode ? 'text-white' : 'text-gray-900'} ${
                                surahNameHasArabic ? "surah-name-title" : "font-lexend"
                              }`}
                              lang={surahNameHasArabic ? "ar" : undefined}
                              style={{
                                fontFamily: surahNameHasArabic
                                  ? "'Amiri', 'Noto Naskh Arabic', serif"
                                  : "'Lexend Deca', sans-serif",
                                direction: surahNameHasArabic ? 'rtl' : 'ltr',
                                textAlign: surahNameHasArabic ? 'right' : 'left',
                                unicodeBidi: surahNameHasArabic ? 'isolate' : 'normal',
                                textRendering: surahNameHasArabic ? 'optimizeLegibility' : 'auto',
                                fontFeatureSettings: surahNameHasArabic ? '"liga" 1, "clig" 1, "calt" 1, "kern" 1' : 'normal',
                                // Title metrics — not Quran body 2.5, which blew the header apart in captures
                                lineHeight: surahNameHasArabic ? '1.55' : 'normal',
                                margin: '0',
                                padding: '0',
                                display: 'block',
                                width: 'auto',
                                boxSizing: 'border-box',
                                whiteSpace: 'normal',
                              } as React.CSSProperties}
                            >
                              {verse?.surahName || ''}
                            </h3>
                            {/* Ayah and Juz info - directly below surah name */}
                            <p 
                              className={`share-verse-meta text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                              lang={ayahJuzHasArabic ? "ar" : undefined}
                              style={{
                                fontFamily: ayahJuzHasArabic
                                  ? "'Amiri', 'Noto Naskh Arabic', serif"
                                  : "'Lexend Deca', sans-serif",
                                direction: ayahJuzHasArabic ? 'rtl' : 'ltr',
                                textAlign: ayahJuzHasArabic ? 'right' : 'left',
                                marginTop: '4px',
                                marginBottom: '0',
                                display: 'block',
                                lineHeight: '1.45',
                              }}
                            >
                              {ayahJuzText}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  
                  {/* Quranic Verse Text — dedicated share class (avoid global .arabic-quran-text line-height:2.5 bleed) */}
                  <div 
                    className="share-verse-ayah mb-6 text-2xl md:text-3xl text-right"
                    lang="ar"
                    style={{
                      fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
                      direction: 'rtl',
                      textAlign: 'right',
                      color: isDarkMode ? '#f3f4f6' : '#111827',
                      textRendering: 'optimizeLegibility',
                      fontFeatureSettings: '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1',
                      fontVariantLigatures: 'common-ligatures contextual',
                      fontKerning: 'normal',
                      fontSynthesis: 'none',
                      unicodeBidi: 'isolate',
                      lineHeight: '2.15',
                      paddingBottom: '0.75rem',
                      marginBottom: '1.5rem',
                      overflow: 'visible',
                      wordWrap: 'break-word',
                      whiteSpace: 'normal',
                    } as React.CSSProperties}
                  >
                    {verse?.arabicText || ''}
                  </div>
                  
                  {/* Separator */}
                  <div 
                    className="mb-6"
                    style={{
                      height: '1px',
                      backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb',
                      width: '100%',
                      flexShrink: 0,
                    }}
                  />
                  
                  {/* Tafseer Section */}
                  {verse?.translation && (() => {
                    // Detect if translation contains Arabic text
                    const hasArabic = /[\u0600-\u06FF]/.test(verse.translation);
                    const isArabicTranslation = hasArabic || isRtl;
                    
                    return (
                      <div className="mb-6" style={{ 
                        direction: isArabicTranslation ? 'rtl' : 'ltr', 
                        textAlign: isArabicTranslation ? 'right' : 'left' 
                      }}>
                        <p 
                          className={`share-verse-tafsir-label text-sm mb-3 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          lang={isArabicTranslation ? "ar" : undefined}
                          style={{
                            fontFamily: isArabicTranslation 
                              ? "'Amiri', 'Noto Naskh Arabic', serif"
                              : "'Lexend Deca', sans-serif",
                            direction: isArabicTranslation ? 'rtl' : 'ltr',
                            textAlign: isArabicTranslation ? 'right' : 'left',
                            lineHeight: '1.45',
                          }}
                        >
                          {t("share.translation")}
                        </p>
                        <p 
                          className={`share-verse-tafsir-body text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                          lang={isArabicTranslation ? "ar" : undefined}
                          style={{
                            fontFamily: isArabicTranslation 
                              ? "'Amiri', 'Noto Naskh Arabic', serif"
                              : "'Lexend Deca', sans-serif",
                            direction: isArabicTranslation ? 'rtl' : 'ltr',
                            textAlign: isArabicTranslation ? 'right' : 'left',
                            whiteSpace: 'pre-wrap',
                            overflowWrap: 'break-word',
                            wordBreak: 'normal',
                            lineHeight: '1.9',
                            textRendering: isArabicTranslation ? 'optimizeLegibility' : 'auto',
                            fontFeatureSettings: isArabicTranslation ? '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1' : 'normal',
                            fontVariantLigatures: isArabicTranslation ? 'common-ligatures contextual' : 'normal',
                            unicodeBidi: isArabicTranslation ? 'isolate' : 'normal'
                          } as React.CSSProperties}
                        >
                          <BidiText
                            text={verse?.translation || ''}
                            direction={isArabicTranslation ? "rtl" : "ltr"}
                          />
                        </p>
                      </div>
                    );
                  })()}
                  
                  {/* Separator */}
                  <div 
                    className="mb-4"
                    style={{
                      height: '1px',
                      backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb',
                      width: '100%'
                    }}
                  />
                  
                  {/* Watermark - Centered */}
                  <div 
                    style={{
                      width: '100%',
                      marginTop: '16px',
                      paddingTop: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      boxSizing: 'border-box'
                    }}
                  >
                    <p 
                      className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
                      style={{
                        fontFamily: isRtl ? "'Amiri', 'Scheherazade New', serif" : "'Lexend Deca', sans-serif",
                        direction: isRtl ? 'rtl' : 'ltr',
                        lineHeight: '1.5',
                        textAlign: 'center',
                        margin: '0 auto',
                        width: 'auto',
                        maxWidth: '100%',
                        display: 'block',
                        padding: '0',
                        alignSelf: 'center',
                        unicodeBidi: 'isolate',
                        whiteSpace: 'nowrap', // Keep Arabic watermark on one line
                        overflow: 'visible' // Allow text to be visible even if it extends
                      }}
                    >
                      <BidiText text={memorialShareCaption} direction={isRtl ? "rtl" : "ltr"} />
                    </p>
                    <p 
                      className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
                      style={{
                        fontFamily: "'Lexend Deca', sans-serif",
                        direction: 'ltr',
                        lineHeight: '1.5',
                        textAlign: 'center',
                        margin: '4px auto 0',
                        width: 'auto',
                        maxWidth: '100%',
                        display: 'block',
                        padding: '0',
                        alignSelf: 'center'
                      }}
                    >
                      {siteHost}
                    </p>
                  </div>
                  </div>
                )}

                {/* Download Options - Only show for verse mode */}
                {mode === 'verse' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white font-tajawal" style={{ 
                    direction: isRtl ? 'rtl' : 'ltr',
                    textAlign: isRtl ? 'right' : 'left'
                  }}>
                    {t("share.download_as_card")}
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={downloadAsImage}
                      disabled={downloadingImage || downloadingPDF}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-islamic-gold to-islamic-green text-white rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={t("share.download_png") || "Download as PNG"}
                    >
                      {downloadingImage ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          <span>{t("share.download_png")}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadAsPDF}
                      disabled={downloadingImage || downloadingPDF}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-islamic-blue to-islamic-green text-white rounded-full hover:from-islamic-green hover:to-islamic-gold transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={t("share.download_pdf") || "Download as PDF"}
                    >
                      {downloadingPDF ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          <span>{t("share.download_pdf")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                )}

                {/* Link Share */}
                <div className="mb-6">
                  <h3 id="share-link-heading" className="text-lg font-semibold mb-3 text-gray-900 dark:text-white font-tajawal" style={{ 
                    direction: isRtl ? 'rtl' : 'ltr',
                    textAlign: isRtl ? 'right' : 'left'
                  }}>
                    {t("share.share_link")}
                  </h3>
                  <div className="flex gap-2">
                    <label htmlFor="share-url-field" className="sr-only">
                      {t("share.share_link") || "Share link"}
                    </label>
                    <input
                      id="share-url-field"
                      name="share-url"
                      type="url"
                      value={shareUrl}
                      readOnly
                      aria-labelledby="share-link-heading"
                      className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-islamic-gold"
                    />
                    <button
                      onClick={copyToClipboard}
                      className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                        copied
                          ? 'bg-green-500 text-white'
                          : 'bg-islamic-gold text-white hover:bg-islamic-green'
                      }`}
                      aria-label={copied ? (t("share.copied") || "Copied") : (t("share.copy") || "Copy link")}
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5" />
                          {t("share.copied")}
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          {t("share.copy")}
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Social Share */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white font-tajawal" style={{ 
                    direction: isRtl ? 'rtl' : 'ltr',
                    textAlign: isRtl ? 'right' : 'left'
                  }}>
                    {t("share.share_social")}
                  </h3>
                  <div className="flex justify-center gap-3 flex-wrap">
                    <button
                      onClick={() => shareToSocial('twitter')}
                      className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                      title="X (Twitter)"
                      aria-label="Share on X (Twitter)"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => shareToSocial('whatsapp')}
                      className="w-12 h-12 flex items-center justify-center bg-[#25D366] text-white rounded-full hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110"
                      title="WhatsApp"
                      aria-label="Share on WhatsApp"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.982-3.656-.23-.389a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => shareToSocial('telegram')}
                      className="w-12 h-12 flex items-center justify-center bg-[#0088cc] text-white rounded-full hover:bg-[#0077b5] transition-all duration-300 hover:scale-110"
                      title="Telegram"
                      aria-label="Share on Telegram"
                    >
                      <Send className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => shareToSocial('facebook')}
                      className="w-12 h-12 flex items-center justify-center bg-[#1877F2] text-white rounded-full hover:bg-[#166fe5] transition-all duration-300 hover:scale-110"
                      title="Facebook"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => shareToSocial('linkedin')}
                      className="w-12 h-12 flex items-center justify-center bg-[#0077b5] text-white rounded-full hover:bg-[#006399] transition-all duration-300 hover:scale-110"
                      title="LinkedIn"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => shareToSocial('instagram')}
                      className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white rounded-full hover:opacity-90 transition-all duration-300 hover:scale-110"
                      title="Instagram"
                      aria-label="Share on Instagram"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => shareToSocial('email')}
                      className="w-12 h-12 flex items-center justify-center bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                      title={t("share.email")}
                      aria-label={t("share.email") || "Share via email"}
                    >
                      <Mail className="w-6 h-6" />
                    </button>
                    {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                      <button
                        onClick={() => shareToSocial('native')}
                        className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-islamic-gold to-islamic-green text-white rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 hover:scale-110"
                        title={t("share")}
                        aria-label={t("share") || "Share"}
                      >
                        <Share className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

