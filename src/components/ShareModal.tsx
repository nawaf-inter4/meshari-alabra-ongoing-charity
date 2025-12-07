"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Download, Share2, MessageCircle, Send, Facebook, Linkedin, Mail, Share } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useTheme } from "next-themes";
import { toPng, toJpeg } from "html-to-image";

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
  const [copied, setCopied] = useState(false);
  const [downloadingImage, setDownloadingImage] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const previewCardRef = useRef<HTMLDivElement>(null);

  // Determine if dark mode is active
  const isDarkMode = mounted && resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Preload fonts on mount
  useEffect(() => {
    if (!mounted || mode === 'website') return;
    
    const preloadFonts = async () => {
      const fontFamilies = ['Amiri', 'Scheherazade New'];
      
      try {
        // Load fonts from Google Fonts
        const fontPromises = fontFamilies.map(async (fontFamily) => {
          try {
            // Check if font is already loaded
            if (document.fonts && document.fonts.check(`16px "${fontFamily}"`)) {
              return true;
            }
            
            // Load font using FontFace API with Google Fonts URL
            // Use correct font URLs for proper diacritics support
            const fontUrl = fontFamily === 'Amiri' 
              ? 'https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrI.woff2'
              : 'https://fonts.gstatic.com/s/scheherazadenew/v8/4UaHrEghqB_RMo6uD_0A3dHBBs5nYQzBpBMRVJ9D.woff2';
            
            // Set font feature settings for proper Arabic diacritics
            const font = new FontFace(fontFamily, `url(${fontUrl})`, {
              display: 'swap',
              featureSettings: '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1'
            });
            await font.load();
            if (document.fonts) {
              document.fonts.add(font);
            }
            return true;
          } catch (e) {
            console.warn(`Font loading error for ${fontFamily}:`, e);
            return false;
          }
        });
        
        await Promise.all(fontPromises);
        
        // Wait for all fonts to be ready
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
        
        // Verify fonts are loaded
        let allLoaded = true;
        for (let i = 0; i < 5; i++) {
          await new Promise(resolve => setTimeout(resolve, 200));
          if (document.fonts && document.fonts.check('16px "Amiri"') && document.fonts.check('16px "Scheherazade New"')) {
            allLoaded = true;
            break;
          }
        }
        
        setFontsLoaded(allLoaded);
      } catch (error) {
        console.warn('Font preloading error:', error);
        setFontsLoaded(true); // Allow download even if fonts fail to load
      }
    };
    
    preloadFonts();
  }, [mounted, mode]);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = mode === 'website' 
    ? (typeof window !== 'undefined' ? window.location.href : siteUrl)
    : `${siteUrl}/quran?surah=${verse?.surahNumber}&ayah=${verse?.ayahNumber}`;
  const shareText = mode === 'website'
    ? (typeof window !== 'undefined' ? document.title : 'Meshari\'s Ongoing Charity')
    : `${verse?.surahName} - ${t("share.ayah")} ${verse?.ayahNumber}\n\n${verse?.arabicText}${verse?.translation ? `\n\n${verse.translation}` : ''}`;
  
  // Get OG image URL
  const ogImageUrl = mode === 'website' 
    ? `${siteUrl}/og-image.png`
    : undefined;

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
      ? (typeof window !== 'undefined' ? document.title : 'Meshari\'s Ongoing Charity')
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

  const downloadAsImage = async () => {
    if (mode === 'website') return; // No download for website mode
    const elementToCapture = previewCardRef.current;
    if (!elementToCapture || !verse) return;
    
    setDownloadingImage(true);
    
    // Clone the preview card to a temporary container for clean capture
    // This ensures we only capture the card, not the modal overlay
    let clonedElement: HTMLElement | null = null;
    let tempContainer: HTMLDivElement | null = null;
    
    try {
      // Create a temporary container off-screen with proper styling context
      tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = elementToCapture.offsetWidth + 'px';
      tempContainer.style.zIndex = '-1';
      tempContainer.style.visibility = 'visible';
      tempContainer.style.opacity = '1';
      // Ensure container has the same background to preserve colors
      tempContainer.style.backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
      document.body.appendChild(tempContainer);
      
      // Clone the element with all styles and classes preserved
      // Use deep clone to preserve all text nodes and special Unicode characters
      clonedElement = elementToCapture.cloneNode(true) as HTMLElement;
      
      // CRITICAL: Don't modify text content - cloneNode(true) already preserves it correctly
      // Modifying textContent can corrupt bidirectional text and reverse English text
      // The cloneNode operation preserves text nodes in their correct order
      
      // Preserve all CSS classes from the original
      clonedElement.className = elementToCapture.className;
      
      // Copy all inline styles from the original
      if (elementToCapture.getAttribute('style')) {
        clonedElement.setAttribute('style', elementToCapture.getAttribute('style') || '');
      }
      
      // Copy computed styles comprehensively
      const computedStyles = window.getComputedStyle(elementToCapture);
      const importantStyles = [
        'backgroundColor', 'color', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight',
        'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
        'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
        'border', 'borderWidth', 'borderColor', 'borderStyle', 'borderRadius',
        'boxShadow', 'width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight',
        'textAlign', 'direction', 'display', 'position', 'visibility', 'opacity',
        'transform', 'transformOrigin', 'zIndex', 'overflow', 'overflowX', 'overflowY'
      ];
      
      importantStyles.forEach(prop => {
        try {
          const value = (computedStyles as any)[prop];
          if (value && value !== 'none' && value !== 'normal' && value !== 'auto' && clonedElement) {
            (clonedElement.style as any)[prop] = value;
          }
        } catch (e) {
          // Ignore read-only properties
        }
      });
      
      // Ensure critical styles are set
      clonedElement.style.backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
      clonedElement.style.position = 'relative';
      clonedElement.style.display = 'block';
      clonedElement.style.visibility = 'visible';
      clonedElement.style.opacity = '1';
      clonedElement.style.width = elementToCapture.offsetWidth + 'px';
      
      // Recursively copy styles for all child elements to preserve styling
      const copyStylesRecursively = (original: Element, cloned: Element) => {
        const originalComputed = window.getComputedStyle(original);
        const clonedEl = cloned as HTMLElement;
        
        // Copy classes (critical for CSS rules)
        clonedEl.className = original.className;
        
        // Copy inline styles
        if (original.getAttribute('style')) {
          clonedEl.setAttribute('style', original.getAttribute('style') || '');
        }
        
        // For Arabic text elements, explicitly copy all font rendering properties
        if (original.classList.contains('arabic-quran-text') || original.classList.contains('font-arabic') || original.classList.contains('quran-text')) {
          // Critical Arabic font rendering properties
          clonedEl.style.fontFamily = originalComputed.fontFamily;
          clonedEl.style.textRendering = originalComputed.textRendering || 'optimizeLegibility';
          // CRITICAL: Set font feature settings for proper Arabic diacritics rendering
          const fontFeatures = '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1';
          clonedEl.style.fontFeatureSettings = originalComputed.fontFeatureSettings || fontFeatures;
          const originalComputedAny = originalComputed as any;
          clonedEl.style.setProperty('-webkit-font-feature-settings', originalComputedAny.webkitFontFeatureSettings || fontFeatures);
          clonedEl.style.setProperty('-moz-font-feature-settings', originalComputedAny.mozFontFeatureSettings || fontFeatures);
          clonedEl.style.setProperty('font-feature-settings', fontFeatures, 'important');
          clonedEl.style.fontVariantLigatures = originalComputed.fontVariantLigatures || 'common-ligatures contextual';
          clonedEl.style.fontKerning = originalComputed.fontKerning || 'normal';
          clonedEl.style.fontSynthesis = originalComputed.fontSynthesis || 'none';
          (clonedEl.style as any).webkitFontSmoothing = originalComputedAny.webkitFontSmoothing || 'antialiased';
          (clonedEl.style as any).mozOsxFontSmoothing = originalComputedAny.mozOsxFontSmoothing || 'grayscale';
          // CRITICAL: Only set direction for Arabic text elements, not all elements
          // Setting bidi-override on non-Arabic text can reverse English text
          if (original.classList.contains('arabic-quran-text') || original.classList.contains('quran-text')) {
            clonedEl.style.direction = originalComputed.direction || 'rtl';
            clonedEl.style.unicodeBidi = originalComputed.unicodeBidi || 'bidi-override';
          } else {
            // For non-Arabic text, use normal direction
            clonedEl.style.direction = originalComputed.direction || 'ltr';
            clonedEl.style.unicodeBidi = originalComputed.unicodeBidi || 'normal';
          }
          clonedEl.style.textTransform = originalComputed.textTransform || 'none';
          clonedEl.style.wordSpacing = originalComputed.wordSpacing || '0.1em';
          clonedEl.style.letterSpacing = originalComputed.letterSpacing || '0.02em';
          clonedEl.style.lineHeight = originalComputed.lineHeight || '2.5';
          clonedEl.style.fontSize = originalComputed.fontSize;
          clonedEl.style.fontWeight = originalComputed.fontWeight;
          clonedEl.style.color = originalComputed.color;
        }
        
        // Copy critical computed styles for all elements
        importantStyles.forEach(prop => {
          try {
            // Skip direction and unicodeBidi - we handle them separately above
            if (prop === 'direction' || prop === 'unicodeBidi') {
              return;
            }
            const value = (originalComputed as any)[prop];
            if (value && value !== 'none' && value !== 'normal' && value !== 'auto') {
              (clonedEl.style as any)[prop] = value;
            }
          } catch (e) {
            // Ignore read-only properties
          }
        });
        
        // For non-Arabic text elements, ensure correct direction
        // BUT preserve centering for watermark elements
        const isWatermarkElement = original.textContent?.includes('meshari.charity') || 
                                   original.textContent?.includes('صدقة جارية') ||
                                   original.textContent?.includes('Ongoing charity') ||
                                   original.parentElement?.textContent?.includes('meshari.charity');
        
        if (!original.classList.contains('arabic-quran-text') && 
            !original.classList.contains('quran-text') && 
            !original.classList.contains('font-arabic')) {
          // Check if element contains English or LTR text
          const textContent = original.textContent || '';
          // If text doesn't contain Arabic characters, use LTR
          const hasArabic = /[\u0600-\u06FF]/.test(textContent);
          if (!hasArabic) {
            clonedEl.style.direction = 'ltr';
            clonedEl.style.unicodeBidi = isWatermarkElement ? 'plaintext' : 'normal';
            clonedEl.style.textAlign = isWatermarkElement ? 'center' : 'left';
            // Use English font for English text
            if (!clonedEl.style.fontFamily.includes('Lexend')) {
              clonedEl.style.fontFamily = "'Lexend Deca', sans-serif";
            }
            // For watermark, ensure proper centering and keep on one line
            if (isWatermarkElement) {
              clonedEl.style.width = 'auto';
              clonedEl.style.margin = originalComputed.margin || '0 auto';
              clonedEl.style.display = 'block';
              clonedEl.style.whiteSpace = 'nowrap'; // Keep watermark text on one line
              clonedEl.style.overflow = 'visible'; // Allow text to be visible
            }
          } else {
            // Has Arabic text - use RTL with Arabic fonts and proper rendering
            clonedEl.style.direction = 'rtl';
            clonedEl.style.textAlign = isWatermarkElement ? 'center' : 'right';
            clonedEl.style.unicodeBidi = isWatermarkElement ? 'plaintext' : 'bidi-override';
            clonedEl.style.fontFamily = originalComputed.fontFamily || "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', serif";
            clonedEl.style.textRendering = 'optimizeLegibility';
            clonedEl.style.setProperty('-webkit-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
            clonedEl.style.setProperty('-moz-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
            clonedEl.style.setProperty('-webkit-font-smoothing', 'antialiased');
            clonedEl.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
            clonedEl.style.fontVariantLigatures = 'common-ligatures contextual';
            clonedEl.style.fontKerning = 'normal';
            // For watermark, ensure proper centering and keep on one line
            if (isWatermarkElement) {
              clonedEl.style.width = 'auto';
              clonedEl.style.margin = originalComputed.margin || '0 auto';
              clonedEl.style.display = 'block';
              clonedEl.style.whiteSpace = 'nowrap'; // Keep watermark text on one line
              clonedEl.style.overflow = 'visible'; // Allow text to be visible
            }
          }
        }
        
        // Recursively process children
        const originalChildren = Array.from(original.children);
        const clonedChildren = Array.from(cloned.children);
        originalChildren.forEach((origChild, index) => {
          if (clonedChildren[index]) {
            copyStylesRecursively(origChild, clonedChildren[index]);
          }
        });
      };
      
      copyStylesRecursively(elementToCapture, clonedElement);
      
      // CRITICAL: Ensure cloned element has no references to modal
      // Remove any data attributes or classes that might reference the modal
      clonedElement.removeAttribute('data-modal');
      clonedElement.removeAttribute('data-overlay');
      
      // Ensure cloned element is completely isolated
      clonedElement.style.position = 'relative';
      clonedElement.style.zIndex = '1';
      clonedElement.style.isolation = 'isolate';
      
      tempContainer.appendChild(clonedElement);
      
      // Wait for fonts and rendering - give more time for styles to apply
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Force a reflow to ensure all styles are computed
      void clonedElement.offsetHeight;
      void tempContainer.offsetHeight;
      
      // Use cloned element for font checking
      const elementForFontCheck = clonedElement || elementToCapture;
      
      // Force fonts to be loaded by checking computed styles and forcing a reflow
      const arabicTextElement = elementForFontCheck.querySelector('.arabic-quran-text') as HTMLElement || 
                                 elementForFontCheck.querySelector('.quran-text') as HTMLElement;
      if (arabicTextElement) {
        // Force a reflow to ensure fonts are applied
        void arabicTextElement.offsetHeight;
        
        const computedStyle = window.getComputedStyle(arabicTextElement);
        const fontFamily = computedStyle.fontFamily;
        
        // Wait for fonts to be actually rendered - check with actual text
        if (document.fonts && typeof document !== 'undefined' && document.body && document.body.parentNode) {
          let testEl: HTMLSpanElement | null = null;
          try {
            // Create a test element with the same styles
            testEl = document.createElement('span');
            testEl.style.position = 'absolute';
            testEl.style.visibility = 'hidden';
            testEl.style.fontFamily = fontFamily;
            testEl.style.fontSize = computedStyle.fontSize;
            testEl.textContent = verse?.arabicText?.substring(0, 20) || '';
            document.body.appendChild(testEl);
            
            // Force reflow
            void testEl.offsetHeight;
            
            // Check if fonts are loaded
            let attempts = 0;
            while (attempts < 15 && testEl && testEl.parentNode) {
              const amiriLoaded = document.fonts.check(`16px "Amiri"`);
              const scheherazadeLoaded = document.fonts.check(`16px "Scheherazade New"`);
              
              if (amiriLoaded && scheherazadeLoaded) {
                // Double check with the actual computed font
                const testComputed = window.getComputedStyle(testEl);
                if (testComputed.fontFamily.includes('Amiri') || testComputed.fontFamily.includes('Scheherazade')) {
                  break;
                }
              }
              await new Promise(resolve => setTimeout(resolve, 100));
              attempts++;
            }
          } catch (e) {
            // Silently fail if DOM manipulation fails
          } finally {
            // Safely remove test element if it still exists
            if (testEl && testEl.parentNode) {
              try {
                document.body.removeChild(testEl);
              } catch (e) {
                // Element may have already been removed
              }
            }
          }
          
          // Final wait to ensure rendering is complete
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Additional wait for fonts to be fully loaded in cloned element
          if (clonedElement) {
            // Ensure fonts are loaded by checking font status
            if (document.fonts && document.fonts.ready) {
              await document.fonts.ready;
            }
            
            // Wait additional time for Arabic fonts specifically - CRITICAL for diacritics
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Force fonts to load by creating test elements with Arabic text and diacritics
            const arabicEl = clonedElement.querySelector('.arabic-quran-text') as HTMLElement;
            if (arabicEl && verse?.arabicText) {
              // Create a test span with Arabic text including diacritics to force font loading
              const testSpan = document.createElement('span');
              testSpan.style.position = 'absolute';
              testSpan.style.visibility = 'hidden';
              testSpan.style.fontFamily = "'Amiri', 'Scheherazade New', serif";
              testSpan.style.fontSize = '24px';
              testSpan.style.fontFeatureSettings = '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1';
              testSpan.style.setProperty('-webkit-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
              testSpan.style.setProperty('-moz-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
              testSpan.textContent = verse.arabicText.substring(0, 50);
              document.body.appendChild(testSpan);
              
              // Wait for fonts to load with diacritics support
              let fontAttempts = 0;
              while (fontAttempts < 25) {
                const amiriLoaded = document.fonts.check('24px "Amiri"');
                const scheherazadeLoaded = document.fonts.check('24px "Scheherazade New"');
                if (amiriLoaded && scheherazadeLoaded) {
                  // Double check by measuring the test element
                  void testSpan.offsetHeight;
                  const computed = window.getComputedStyle(testSpan);
                  if (computed.fontFamily.includes('Amiri') || computed.fontFamily.includes('Scheherazade')) {
                    break;
                  }
                }
                await new Promise(resolve => setTimeout(resolve, 100));
                fontAttempts++;
              }
              
              // Clean up test element
              if (testSpan.parentNode) {
                try {
                  document.body.removeChild(testSpan);
                } catch (e) {
                  // Silently fail
                }
              }
              
              // Force multiple reflows to ensure all styles and fonts are applied
              void arabicEl.offsetHeight;
              void arabicEl.offsetWidth;
              void clonedElement.offsetHeight;
              void clonedElement.offsetWidth;
              
              // Additional wait for rendering with diacritics
              await new Promise(resolve => setTimeout(resolve, 300));
            } else {
              // Force reflows even if no Arabic text
              void clonedElement.offsetHeight;
              void clonedElement.offsetWidth;
            }
          }
        }
      }
      
      // Determine background color based on theme
      const bgColor = isDarkMode ? '#1f2937' : '#ffffff';
      
      // Get all @font-face rules from the document
      const fontFaceRules: string[] = [];
      const styleSheets = Array.from(document.styleSheets);
      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule instanceof CSSFontFaceRule) {
              fontFaceRules.push(rule.cssText);
            }
          }
        } catch (e) {
          // Cross-origin stylesheets may throw
        }
      }
      
      // Use html-to-image with explicit font embedding and CORS support
      // useCORS: true enables cross-origin resource loading (needed for Google Fonts in production)
      // allowTaint: false prevents tainted canvas (security)
      // Use cloned element for clean capture without modal interference
      // CRITICAL: Only capture the cloned element itself, nothing else
      const elementForCapture = clonedElement || elementToCapture;
      
      // Ensure we're only capturing the cloned element, not any parent containers
      // The cloned element should be the direct child of tempContainer
      const finalElement = clonedElement || elementToCapture;
      
      const dataUrl = await toPng(finalElement, {
        backgroundColor: bgColor,
        pixelRatio: 2,
        quality: 1,
        cacheBust: true,
        fontEmbedCSS: `
          @font-face {
            font-family: 'Amiri';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrI.woff2') format('woff2');
            font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
          }
          @font-face {
            font-family: 'Amiri';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrI.woff2') format('woff2');
            font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
          }
          @font-face {
            font-family: 'Scheherazade New';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/scheherazadenew/v8/4UaHrEghqB_RMo6uD_0A3dHBBs5nYQzBpBMRVJ9D.woff2') format('woff2');
            font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
          }
          @font-face {
            font-family: 'Scheherazade New';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/scheherazadenew/v8/4UaHrEghqB_RMo6uD_0A3dHBBs5nYQzBpBMRVJ9D.woff2') format('woff2');
            font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
          }
          .arabic-quran-text, .font-arabic, .quran-text {
            font-family: 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', 'Traditional Arabic', 'Arabic Typesetting', serif !important;
            font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1 !important;
            -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1 !important;
            -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1 !important;
            font-variant-ligatures: common-ligatures contextual !important;
            text-rendering: optimizeLegibility !important;
            direction: rtl !important;
            unicode-bidi: bidi-override !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
          }
        `,
        filter: (node) => {
          // CRITICAL: Only include the cloned element and its children
          // Exclude tempContainer, body, html, and any other parent elements
          if (clonedElement) {
            // Exclude document, body, html, and tempContainer
            if (node === (document as any) || node === document.body || node === document.documentElement || node === tempContainer) {
              return false;
            }
            // Exclude any parent of clonedElement that is not clonedElement itself
            if (node !== clonedElement && !clonedElement.contains(node)) {
              // Check if node is a parent of clonedElement
              let parent = clonedElement.parentNode;
              while (parent) {
                if (parent === node) {
                  return false; // This node is a parent, exclude it
                }
                parent = parent.parentNode;
              }
            }
            // Only include the cloned element and its children
            return node === clonedElement || clonedElement.contains(node);
          }
          // Fallback: if no cloned element, only include the preview card
          // But exclude modal overlay and backdrop
          if (node === elementToCapture || elementToCapture.contains(node)) {
            // Exclude modal backdrop and overlay
            const className = (node as Element)?.className || '';
            if (typeof className === 'string') {
              if (className.includes('fixed inset-0') && className.includes('z-50')) {
                return false;
              }
            }
            return true;
          }
          return false;
        }
      });
      
      // Download the image
      if (typeof document !== 'undefined' && document.body && document.body.parentNode) {
        let link: HTMLAnchorElement | null = null;
        try {
          link = document.createElement('a');
          link.download = `${verse?.surahName?.replace(/\s+/g, '_')}_Ayah_${verse?.ayahNumber}.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
        } catch (e) {
          // Silently fail if DOM manipulation fails
        } finally {
          // Safely remove link if it still exists
          if (link && link.parentNode) {
            try {
              document.body.removeChild(link);
            } catch (e) {
              // Element may have already been removed
            }
          }
        }
      }
    } catch (error) {
      console.error('Error downloading image:', error);
      // Log more details in production for debugging
      if (process.env.NODE_ENV === 'production') {
        console.error('Download error details:', {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          elementExists: !!previewCardRef.current,
          fontsLoaded,
          mounted
        });
      }
      alert(t("share.error_download_image") || "Failed to download image. Please try again.");
    } finally {
      // Clean up cloned element and temporary container
      if (tempContainer && tempContainer.parentNode) {
        try {
          document.body.removeChild(tempContainer);
        } catch (e) {
          // Silently fail if already removed
        }
      }
      setDownloadingImage(false);
    }
  };

  const downloadAsPDF = async () => {
    if (mode === 'website') return; // No download for website mode
    const elementToCapture = previewCardRef.current;
    if (!elementToCapture || !verse) return;
    
    setDownloadingPDF(true);
    
    // Clone the preview card to a temporary container for clean capture
    // This ensures we only capture the card, not the modal overlay
    let clonedElement: HTMLElement | null = null;
    let tempContainer: HTMLDivElement | null = null;
    
    try {
      // Create a temporary container off-screen with proper styling context
      tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = elementToCapture.offsetWidth + 'px';
      tempContainer.style.zIndex = '-1';
      tempContainer.style.visibility = 'visible';
      tempContainer.style.opacity = '1';
      // Ensure container has the same background to preserve colors
      tempContainer.style.backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
      document.body.appendChild(tempContainer);
      
      // Clone the element with all styles and classes preserved
      // Use deep clone to preserve all text nodes and special Unicode characters
      clonedElement = elementToCapture.cloneNode(true) as HTMLElement;
      
      // CRITICAL: Don't modify text content - cloneNode(true) already preserves it correctly
      // Modifying textContent can corrupt bidirectional text and reverse English text
      // The cloneNode operation preserves text nodes in their correct order
      
      // Preserve all CSS classes from the original
      clonedElement.className = elementToCapture.className;
      
      // Copy all inline styles from the original
      if (elementToCapture.getAttribute('style')) {
        clonedElement.setAttribute('style', elementToCapture.getAttribute('style') || '');
      }
      
      // Copy computed styles comprehensively
      const computedStyles = window.getComputedStyle(elementToCapture);
      const importantStyles = [
        'backgroundColor', 'color', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight',
        'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
        'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
        'border', 'borderWidth', 'borderColor', 'borderStyle', 'borderRadius',
        'boxShadow', 'width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight',
        'textAlign', 'direction', 'display', 'position', 'visibility', 'opacity',
        'transform', 'transformOrigin', 'zIndex', 'overflow', 'overflowX', 'overflowY'
      ];
      
      importantStyles.forEach(prop => {
        try {
          const value = (computedStyles as any)[prop];
          if (value && value !== 'none' && value !== 'normal' && value !== 'auto' && clonedElement) {
            (clonedElement.style as any)[prop] = value;
          }
        } catch (e) {
          // Ignore read-only properties
        }
      });
      
      // Ensure critical styles are set
      clonedElement.style.backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
      clonedElement.style.position = 'relative';
      clonedElement.style.display = 'block';
      clonedElement.style.visibility = 'visible';
      clonedElement.style.opacity = '1';
      clonedElement.style.width = elementToCapture.offsetWidth + 'px';
      
      // Recursively copy styles for all child elements to preserve styling
      const copyStylesRecursively = (original: Element, cloned: Element) => {
        const originalComputed = window.getComputedStyle(original);
        const clonedEl = cloned as HTMLElement;
        
        // Copy classes (critical for CSS rules)
        clonedEl.className = original.className;
        
        // Copy inline styles
        if (original.getAttribute('style')) {
          clonedEl.setAttribute('style', original.getAttribute('style') || '');
        }
        
        // For Arabic text elements, explicitly copy all font rendering properties
        if (original.classList.contains('arabic-quran-text') || original.classList.contains('font-arabic') || original.classList.contains('quran-text')) {
          // Critical Arabic font rendering properties
          clonedEl.style.fontFamily = originalComputed.fontFamily;
          clonedEl.style.textRendering = originalComputed.textRendering || 'optimizeLegibility';
          // CRITICAL: Set font feature settings for proper Arabic diacritics rendering
          const fontFeatures = '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1';
          clonedEl.style.fontFeatureSettings = originalComputed.fontFeatureSettings || fontFeatures;
          const originalComputedAny = originalComputed as any;
          clonedEl.style.setProperty('-webkit-font-feature-settings', originalComputedAny.webkitFontFeatureSettings || fontFeatures);
          clonedEl.style.setProperty('-moz-font-feature-settings', originalComputedAny.mozFontFeatureSettings || fontFeatures);
          clonedEl.style.setProperty('font-feature-settings', fontFeatures, 'important');
          clonedEl.style.fontVariantLigatures = originalComputed.fontVariantLigatures || 'common-ligatures contextual';
          clonedEl.style.fontKerning = originalComputed.fontKerning || 'normal';
          clonedEl.style.fontSynthesis = originalComputed.fontSynthesis || 'none';
          (clonedEl.style as any).webkitFontSmoothing = originalComputedAny.webkitFontSmoothing || 'antialiased';
          (clonedEl.style as any).mozOsxFontSmoothing = originalComputedAny.mozOsxFontSmoothing || 'grayscale';
          // CRITICAL: Only set direction for Arabic text elements, not all elements
          // Setting bidi-override on non-Arabic text can reverse English text
          if (original.classList.contains('arabic-quran-text') || original.classList.contains('quran-text')) {
            clonedEl.style.direction = originalComputed.direction || 'rtl';
            clonedEl.style.unicodeBidi = originalComputed.unicodeBidi || 'bidi-override';
          } else {
            // For non-Arabic text, use normal direction
            clonedEl.style.direction = originalComputed.direction || 'ltr';
            clonedEl.style.unicodeBidi = originalComputed.unicodeBidi || 'normal';
          }
          clonedEl.style.textTransform = originalComputed.textTransform || 'none';
          clonedEl.style.wordSpacing = originalComputed.wordSpacing || '0.1em';
          clonedEl.style.letterSpacing = originalComputed.letterSpacing || '0.02em';
          clonedEl.style.lineHeight = originalComputed.lineHeight || '2.5';
          clonedEl.style.fontSize = originalComputed.fontSize;
          clonedEl.style.fontWeight = originalComputed.fontWeight;
          clonedEl.style.color = originalComputed.color;
        }
        
        // Copy critical computed styles for all elements
        importantStyles.forEach(prop => {
          try {
            // Skip direction and unicodeBidi - we handle them separately above
            if (prop === 'direction' || prop === 'unicodeBidi') {
              return;
            }
            const value = (originalComputed as any)[prop];
            if (value && value !== 'none' && value !== 'normal' && value !== 'auto') {
              (clonedEl.style as any)[prop] = value;
            }
          } catch (e) {
            // Ignore read-only properties
          }
        });
        
        // For non-Arabic text elements, ensure correct direction
        // BUT preserve centering for watermark elements
        const isWatermarkElement = original.textContent?.includes('meshari.charity') || 
                                   original.textContent?.includes('صدقة جارية') ||
                                   original.textContent?.includes('Ongoing charity') ||
                                   original.parentElement?.textContent?.includes('meshari.charity');
        
        if (!original.classList.contains('arabic-quran-text') && 
            !original.classList.contains('quran-text') && 
            !original.classList.contains('font-arabic')) {
          // Check if element contains English or LTR text
          const textContent = original.textContent || '';
          // If text doesn't contain Arabic characters, use LTR
          const hasArabic = /[\u0600-\u06FF]/.test(textContent);
          if (!hasArabic) {
            clonedEl.style.direction = 'ltr';
            clonedEl.style.unicodeBidi = isWatermarkElement ? 'plaintext' : 'normal';
            clonedEl.style.textAlign = isWatermarkElement ? 'center' : 'left';
            // Use English font for English text
            if (!clonedEl.style.fontFamily.includes('Lexend')) {
              clonedEl.style.fontFamily = "'Lexend Deca', sans-serif";
            }
            // For watermark, ensure proper centering and keep on one line
            if (isWatermarkElement) {
              clonedEl.style.width = 'auto';
              clonedEl.style.margin = originalComputed.margin || '0 auto';
              clonedEl.style.display = 'block';
              clonedEl.style.whiteSpace = 'nowrap'; // Keep watermark text on one line
              clonedEl.style.overflow = 'visible'; // Allow text to be visible
            }
          } else {
            // Has Arabic text - use RTL with Arabic fonts and proper rendering
            clonedEl.style.direction = 'rtl';
            clonedEl.style.textAlign = isWatermarkElement ? 'center' : 'right';
            clonedEl.style.unicodeBidi = isWatermarkElement ? 'plaintext' : 'bidi-override';
            clonedEl.style.fontFamily = originalComputed.fontFamily || "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', serif";
            clonedEl.style.textRendering = 'optimizeLegibility';
            clonedEl.style.setProperty('-webkit-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
            clonedEl.style.setProperty('-moz-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
            clonedEl.style.setProperty('-webkit-font-smoothing', 'antialiased');
            clonedEl.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
            clonedEl.style.fontVariantLigatures = 'common-ligatures contextual';
            clonedEl.style.fontKerning = 'normal';
            // For watermark, ensure proper centering and keep on one line
            if (isWatermarkElement) {
              clonedEl.style.width = 'auto';
              clonedEl.style.margin = originalComputed.margin || '0 auto';
              clonedEl.style.display = 'block';
              clonedEl.style.whiteSpace = 'nowrap'; // Keep watermark text on one line
              clonedEl.style.overflow = 'visible'; // Allow text to be visible
            }
          }
        }
        
        // Recursively process children
        const originalChildren = Array.from(original.children);
        const clonedChildren = Array.from(cloned.children);
        originalChildren.forEach((origChild, index) => {
          if (clonedChildren[index]) {
            copyStylesRecursively(origChild, clonedChildren[index]);
          }
        });
      };
      
      copyStylesRecursively(elementToCapture, clonedElement);
      
      // CRITICAL: Ensure cloned element has no references to modal
      // Remove any data attributes or classes that might reference the modal
      clonedElement.removeAttribute('data-modal');
      clonedElement.removeAttribute('data-overlay');
      
      // Ensure cloned element is completely isolated
      clonedElement.style.position = 'relative';
      clonedElement.style.zIndex = '1';
      clonedElement.style.isolation = 'isolate';
      
      tempContainer.appendChild(clonedElement);
      
      // Wait for fonts and rendering - give more time for styles to apply
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Force a reflow to ensure all styles are computed
      void clonedElement.offsetHeight;
      void tempContainer.offsetHeight;
      
      // Use cloned element for font checking
      const elementForFontCheck = clonedElement || elementToCapture;
      
      // Force fonts to be loaded by checking computed styles and forcing a reflow
      const arabicTextElement = elementForFontCheck.querySelector('.arabic-quran-text') as HTMLElement || 
                                 elementForFontCheck.querySelector('.quran-text') as HTMLElement;
      if (arabicTextElement) {
        // Force a reflow to ensure fonts are applied
        void arabicTextElement.offsetHeight;
        
        const computedStyle = window.getComputedStyle(arabicTextElement);
        const fontFamily = computedStyle.fontFamily;
        
        // Wait for fonts to be actually rendered - check with actual text
        if (document.fonts && typeof document !== 'undefined' && document.body && document.body.parentNode) {
          let testEl: HTMLSpanElement | null = null;
          try {
            // Create a test element with the same styles
            testEl = document.createElement('span');
            testEl.style.position = 'absolute';
            testEl.style.visibility = 'hidden';
            testEl.style.fontFamily = fontFamily;
            testEl.style.fontSize = computedStyle.fontSize;
            testEl.textContent = verse?.arabicText?.substring(0, 20) || '';
            document.body.appendChild(testEl);
            
            // Force reflow
            void testEl.offsetHeight;
            
            // Check if fonts are loaded
            let attempts = 0;
            while (attempts < 15 && testEl && testEl.parentNode) {
              const amiriLoaded = document.fonts.check(`16px "Amiri"`);
              const scheherazadeLoaded = document.fonts.check(`16px "Scheherazade New"`);
              
              if (amiriLoaded && scheherazadeLoaded) {
                // Double check with the actual computed font
                const testComputed = window.getComputedStyle(testEl);
                if (testComputed.fontFamily.includes('Amiri') || testComputed.fontFamily.includes('Scheherazade')) {
                  break;
                }
              }
              await new Promise(resolve => setTimeout(resolve, 100));
              attempts++;
            }
          } catch (e) {
            // Silently fail if DOM manipulation fails
          } finally {
            // Safely remove test element if it still exists
            if (testEl && testEl.parentNode) {
              try {
                document.body.removeChild(testEl);
              } catch (e) {
                // Element may have already been removed
              }
            }
          }
          
          // Final wait to ensure rendering is complete
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Additional wait for fonts to be fully loaded in cloned element
          if (clonedElement) {
            // Ensure fonts are loaded by checking font status
            if (document.fonts && document.fonts.ready) {
              await document.fonts.ready;
            }
            
            // Wait additional time for Arabic fonts specifically - CRITICAL for diacritics
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Force fonts to load by creating test elements with Arabic text and diacritics
            const arabicEl = clonedElement.querySelector('.arabic-quran-text') as HTMLElement;
            if (arabicEl && verse?.arabicText) {
              // Create a test span with Arabic text including diacritics to force font loading
              const testSpan = document.createElement('span');
              testSpan.style.position = 'absolute';
              testSpan.style.visibility = 'hidden';
              testSpan.style.fontFamily = "'Amiri', 'Scheherazade New', serif";
              testSpan.style.fontSize = '24px';
              testSpan.style.fontFeatureSettings = '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1';
              testSpan.style.setProperty('-webkit-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
              testSpan.style.setProperty('-moz-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
              testSpan.textContent = verse.arabicText.substring(0, 50);
              document.body.appendChild(testSpan);
              
              // Wait for fonts to load with diacritics support
              let fontAttempts = 0;
              while (fontAttempts < 25) {
                const amiriLoaded = document.fonts.check('24px "Amiri"');
                const scheherazadeLoaded = document.fonts.check('24px "Scheherazade New"');
                if (amiriLoaded && scheherazadeLoaded) {
                  // Double check by measuring the test element
                  void testSpan.offsetHeight;
                  const computed = window.getComputedStyle(testSpan);
                  if (computed.fontFamily.includes('Amiri') || computed.fontFamily.includes('Scheherazade')) {
                    break;
                  }
                }
                await new Promise(resolve => setTimeout(resolve, 100));
                fontAttempts++;
              }
              
              // Clean up test element
              if (testSpan.parentNode) {
                try {
                  document.body.removeChild(testSpan);
                } catch (e) {
                  // Silently fail
                }
              }
              
              // Force multiple reflows to ensure all styles and fonts are applied
              void arabicEl.offsetHeight;
              void arabicEl.offsetWidth;
              void clonedElement.offsetHeight;
              void clonedElement.offsetWidth;
              
              // Additional wait for rendering with diacritics
              await new Promise(resolve => setTimeout(resolve, 300));
            } else {
              // Force reflows even if no Arabic text
              void clonedElement.offsetHeight;
              void clonedElement.offsetWidth;
            }
          }
        }
      }
      
      // Determine background color based on theme
      const bgColor = isDarkMode ? '#1f2937' : '#ffffff';
      
      // Use html-to-image with explicit font embedding and CORS support
      // useCORS: true enables cross-origin resource loading (needed for Google Fonts in production)
      // allowTaint: false prevents tainted canvas (security)
      // Use cloned element for clean capture without modal interference
      // CRITICAL: Only capture the cloned element itself, nothing else
      const elementForCapture = clonedElement || elementToCapture;
      
      // Ensure we're only capturing the cloned element, not any parent containers
      // The cloned element should be the direct child of tempContainer
      const finalElement = clonedElement || elementToCapture;
      
      const dataUrl = await toPng(finalElement, {
        backgroundColor: bgColor,
        pixelRatio: 2,
        quality: 1,
        cacheBust: true,
        fontEmbedCSS: `
          @font-face {
            font-family: 'Amiri';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrI.woff2') format('woff2');
            font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
          }
          @font-face {
            font-family: 'Amiri';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrI.woff2') format('woff2');
            font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
          }
          @font-face {
            font-family: 'Scheherazade New';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/scheherazadenew/v8/4UaHrEghqB_RMo6uD_0A3dHBBs5nYQzBpBMRVJ9D.woff2') format('woff2');
            font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
          }
          @font-face {
            font-family: 'Scheherazade New';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/scheherazadenew/v8/4UaHrEghqB_RMo6uD_0A3dHBBs5nYQzBpBMRVJ9D.woff2') format('woff2');
            font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
            -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1;
          }
          .arabic-quran-text, .font-arabic, .quran-text {
            font-family: 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', 'Traditional Arabic', 'Arabic Typesetting', serif !important;
            font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1 !important;
            -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1 !important;
            -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1 !important;
            font-variant-ligatures: common-ligatures contextual !important;
            text-rendering: optimizeLegibility !important;
            direction: rtl !important;
            unicode-bidi: bidi-override !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
          }
        `,
        filter: (node) => {
          // CRITICAL: Only include the cloned element and its children
          // Exclude tempContainer, body, html, and any other parent elements
          if (clonedElement) {
            // Exclude document, body, html, and tempContainer
            if (node === (document as any) || node === document.body || node === document.documentElement || node === tempContainer) {
              return false;
            }
            // Exclude any parent of clonedElement that is not clonedElement itself
            if (node !== clonedElement && !clonedElement.contains(node)) {
              // Check if node is a parent of clonedElement
              let parent = clonedElement.parentNode;
              while (parent) {
                if (parent === node) {
                  return false; // This node is a parent, exclude it
                }
                parent = parent.parentNode;
              }
            }
            // Only include the cloned element and its children
            return node === clonedElement || clonedElement.contains(node);
          }
          // Fallback: if no cloned element, only include the preview card
          // But exclude modal overlay and backdrop
          if (node === elementToCapture || elementToCapture.contains(node)) {
            // Exclude modal backdrop and overlay
            const className = (node as Element)?.className || '';
            if (typeof className === 'string') {
              if (className.includes('fixed inset-0') && className.includes('z-50')) {
                return false;
              }
            }
            return true;
          }
          return false;
        }
      });
      
      // Convert to PDF using jsPDF
      const jsPDF = (await import('jspdf')).default;
      
      // Validate image data
      if (!dataUrl || dataUrl === 'data:,') {
        throw new Error('Invalid image data');
      }
      
      // Create image element to get dimensions
      // Set crossOrigin for CORS support (even for data URLs, this ensures proper handling)
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Enable CORS for image loading
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = (error) => {
          console.error('Image load error:', error);
          reject(error);
        };
        img.src = dataUrl;
      });
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (img.height * imgWidth) / img.width;
      
      // Add image to PDF
      pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      
      pdf.save(`${verse?.surahName?.replace(/\s+/g, '_')}_Ayah_${verse?.ayahNumber}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      // Log more details in production for debugging
      if (process.env.NODE_ENV === 'production') {
        console.error('PDF download error details:', {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          elementExists: !!previewCardRef.current,
          fontsLoaded,
          mounted
        });
      }
      alert(t("share.error_download_pdf") || "Failed to download PDF. Please try again.");
    } finally {
      // Clean up cloned element and temporary container
      if (tempContainer && tempContainer.parentNode) {
        try {
          document.body.removeChild(tempContainer);
        } catch (e) {
          // Silently fail if already removed
        }
      }
      setDownloadingPDF(false);
    }
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
                      <img 
                        src={ogImageUrl || `${siteUrl}/og-image.png`}
                        alt={typeof window !== 'undefined' ? document.title : 'Meshari\'s Ongoing Charity'}
                        className="w-full h-auto"
                        onError={(e) => {
                          // Fallback if OG image doesn't load
                          const target = e.target as HTMLImageElement;
                          target.src = `${siteUrl}/og-image.png`;
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  /* Visible Preview - This is what gets downloaded */
                  <div 
                    ref={previewCardRef} 
                    className={`rounded-2xl p-8 shadow-lg border-2 border-islamic-gold/30 mb-6 ${
                      isDarkMode 
                        ? 'bg-gray-800 dark:bg-gray-800' 
                        : 'bg-white'
                    }`}
                    style={{
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
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
                              color: '#D4AF37',
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
                          // Badge is always on the right (absolute positioned), so always use paddingRight to leave space
                          paddingRight: '60px',
                          width: '100%',
                          boxSizing: 'border-box',
                          display: 'block',
                          textAlign: surahNameHasArabic ? 'right' : 'left',
                          // For Arabic: ensure text aligns to the right beside the badge
                          // For English: text aligns to the left
                          direction: 'ltr' // Container always LTR to position badge correctly
                        }}>
                          <div>
                            <h3 
                              className={`text-xl font-bold mb-0 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                              style={{
                                fontFamily: surahNameHasArabic
                                  ? "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', serif"
                                  : "'Lexend Deca', sans-serif",
                                direction: surahNameHasArabic ? 'rtl' : 'ltr',
                                textAlign: surahNameHasArabic ? 'right' : 'left',
                                unicodeBidi: surahNameHasArabic ? 'bidi-override' : 'normal',
                                // Explicitly override any font-arabic class styles - CRITICAL for English names like "Al-Faatiha"
                                textRendering: surahNameHasArabic ? 'optimizeLegibility' : 'auto',
                                fontFeatureSettings: surahNameHasArabic ? '"liga" 1, "clig" 1, "calt" 1, "kern" 1' : 'normal',
                                fontVariantLigatures: surahNameHasArabic ? 'common-ligatures' : 'normal',
                                wordSpacing: surahNameHasArabic ? '0.1em' : 'normal',
                                letterSpacing: surahNameHasArabic ? '0.02em' : 'normal',
                                lineHeight: surahNameHasArabic ? '2.5' : 'normal',
                                // Force override any inherited font-arabic styles
                                fontKerning: surahNameHasArabic ? 'normal' : 'auto',
                                fontSynthesis: surahNameHasArabic ? 'none' : 'auto',
                                // Ensure proper positioning for English names - positioned beside the badge
                                margin: '0',
                                padding: '0',
                                display: 'block',
                                width: '100%',
                                boxSizing: 'border-box'
                              } as React.CSSProperties}
                            >
                              {verse?.surahName || ''}
                            </h3>
                            {/* Ayah and Juz info - directly below surah name */}
                            <p 
                              className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                              style={{
                                fontFamily: ayahJuzHasArabic
                                  ? "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', serif"
                                  : "'Lexend Deca', sans-serif",
                                direction: ayahJuzHasArabic ? 'rtl' : 'ltr',
                                textAlign: ayahJuzHasArabic ? 'right' : 'left',
                                marginTop: '4px',
                                marginBottom: '0',
                                display: 'block'
                              }}
                            >
                              {ayahJuzText}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  
                  {/* Quranic Verse Text */}
                  <div 
                    className="mb-6 arabic-quran-text text-2xl md:text-3xl leading-relaxed text-right"
                    style={{
                      fontFamily: "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', 'Traditional Arabic', 'Arabic Typesetting', serif",
                      direction: 'rtl',
                      textAlign: 'right',
                      color: isDarkMode ? '#f3f4f6' : '#111827',
                      textRendering: 'optimizeLegibility',
                      fontFeatureSettings: '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1',
                      fontVariantLigatures: 'common-ligatures contextual',
                      fontKerning: 'normal',
                      fontSynthesis: 'none',
                      unicodeBidi: 'bidi-override'
                    } as React.CSSProperties}
                    ref={(el) => {
                      if (el) {
                        el.style.setProperty('-webkit-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
                        el.style.setProperty('-moz-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
                        el.style.setProperty('-webkit-font-smoothing', 'antialiased');
                        el.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
                      }
                    }}
                  >
                    {verse?.arabicText || ''}
                  </div>
                  
                  {/* Separator */}
                  <div 
                    className="mb-6"
                    style={{
                      height: '1px',
                      backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb',
                      width: '100%'
                    }}
                  />
                  
                  {/* Tafseer Section */}
                  {verse?.translation && (() => {
                    // Detect if translation contains Arabic text
                    const hasArabic = /[\u0600-\u06FF]/.test(verse.translation);
                    const isArabicTranslation = hasArabic || locale === 'ar';
                    
                    return (
                      <div className="mb-6" style={{ 
                        direction: isArabicTranslation ? 'rtl' : 'ltr', 
                        textAlign: isArabicTranslation ? 'right' : 'left' 
                      }}>
                        <p 
                          className={`text-sm mb-3 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          style={{
                            fontFamily: isArabicTranslation 
                              ? "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', serif"
                              : "'Lexend Deca', sans-serif",
                            direction: isArabicTranslation ? 'rtl' : 'ltr',
                            textAlign: isArabicTranslation ? 'right' : 'left'
                          }}
                        >
                          {t("share.translation")}
                        </p>
                        <p 
                          className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                          style={{
                            fontFamily: isArabicTranslation 
                              ? "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', serif"
                              : "'Lexend Deca', sans-serif",
                            direction: isArabicTranslation ? 'rtl' : 'ltr',
                            textAlign: isArabicTranslation ? 'right' : 'left',
                            whiteSpace: 'pre-wrap',
                            overflowWrap: 'normal',
                            wordBreak: 'keep-all',
                            lineHeight: '1.8',
                            textRendering: isArabicTranslation ? 'optimizeLegibility' : 'auto',
                            fontFeatureSettings: isArabicTranslation ? '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1' : 'normal',
                            fontVariantLigatures: isArabicTranslation ? 'common-ligatures contextual' : 'normal',
                            unicodeBidi: isArabicTranslation ? 'bidi-override' : 'normal'
                          } as React.CSSProperties}
                          ref={(el) => {
                            if (el && isArabicTranslation) {
                              el.style.setProperty('-webkit-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
                              el.style.setProperty('-moz-font-feature-settings', '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1, "ccmp" 1, "locl" 1');
                              el.style.setProperty('-webkit-font-smoothing', 'antialiased');
                              el.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
                            }
                          }}
                        >
                          {verse?.translation || ''}
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
                        fontFamily: locale === 'ar' ? "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', serif" : "'Lexend Deca', sans-serif",
                        direction: locale === 'ar' ? 'rtl' : 'ltr',
                        lineHeight: '1.5',
                        textAlign: 'center',
                        margin: '0 auto',
                        width: 'auto',
                        maxWidth: '100%',
                        display: 'block',
                        padding: '0',
                        alignSelf: 'center',
                        unicodeBidi: 'plaintext', // This helps center RTL text properly
                        whiteSpace: 'nowrap', // Keep Arabic watermark on one line
                        overflow: 'visible' // Allow text to be visible even if it extends
                      }}
                    >
                      {locale === 'ar' 
                        ? 'صدقة جارية لمشاري بن أحمد بن سليمان العبره (رحمه الله)'
                        : locale === 'en'
                        ? 'Ongoing charity for Meshari bin Ahmed bin Sulaiman Alabra (May Allah have mercy on him)'
                        : locale === 'ur'
                        ? 'مشاری بن احمد بن سلیمان العبرہ کے لیے صدقہ جاریہ (اللہ تعالیٰ ان پر رحم فرمائے)'
                        : locale === 'tr'
                        ? 'Meshari bin Ahmed bin Sulaiman Alabra için sürekli hayır (Allah ona rahmet etsin)'
                        : locale === 'id'
                        ? 'Sedekah jariyah untuk Meshari bin Ahmed bin Sulaiman Alabra (Semoga Allah merahmatinya)'
                        : locale === 'ms'
                        ? 'Sedekah jariah untuk Meshari bin Ahmed bin Sulaiman Alabra (Semoga Allah merahmatinya)'
                        : locale === 'bn'
                        ? 'মেশারি বিন আহমেদ বিন সুলাইমান আলাবরার জন্য চলমান দান (আল্লাহ তাকে রহম করুন)'
                        : locale === 'fr'
                        ? 'Aumône continue pour Meshari bin Ahmed bin Sulaiman Alabra (Qu\'Allah lui fasse miséricorde)'
                        : locale === 'zh'
                        ? '为Meshari bin Ahmed bin Sulaiman Alabra的持续慈善（愿真主怜悯他）'
                        : locale === 'it'
                        ? 'Elemosina continua per Meshari bin Ahmed bin Sulaiman Alabra (Che Allah abbia misericordia di lui)'
                        : locale === 'ja'
                        ? 'Meshari bin Ahmed bin Sulaiman Alabraの継続的な慈善（アッラーが彼に慈悲をかけてくださいますように）'
                        : locale === 'ko'
                        ? 'Meshari bin Ahmed bin Sulaiman Alabra를 위한 지속적인 자선 (알라께서 그에게 자비를 베푸시길)'
                        : 'Ongoing charity for Meshari bin Ahmed bin Sulaiman Alabra (May Allah have mercy on him)'
                      }
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
                      meshari.charity
                    </p>
                  </div>
                  </div>
                )}

                {/* Download Options - Only show for verse mode */}
                {mode === 'verse' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
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
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    {t("share.share_link")}
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
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
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
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

