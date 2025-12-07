"use client";

import { useEffect } from "react";

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources - removed to avoid preload warnings
    // Resources are already loaded via manifest and meta tags
    const preloadCriticalResources = () => {
      // Removed preloads to avoid "preloaded but not used" warnings
      // Icons are loaded via manifest.json and meta tags
    };

    // Optimize images
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Add loading="lazy" for non-critical images
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        
        // Add decoding="async" for better performance
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    };

    // Optimize fonts
    // Note: Fonts are already loaded via <link> tags in layout.tsx
    // This function is kept for potential future optimizations
    // Updated: Removed fontPreloads array to fix ReferenceError
    const optimizeFonts = () => {
      // Fonts are preloaded in the HTML head via layout.tsx
      // No additional client-side optimization needed
      // This function intentionally does nothing to avoid errors
    };

    // Optimize third-party resources
    const optimizeThirdPartyResources = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
          script.setAttribute('defer', '');
        }
      });
    };

    // Implement resource hints and prefetch section routes
    const addResourceHints = () => {
      const resourceHints = [
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
        { rel: 'dns-prefetch', href: 'https://api.aladhan.com' },
        { rel: 'dns-prefetch', href: 'https://api.alquran.cloud' },
        { rel: 'dns-prefetch', href: 'https://api.quran.com' },
        { rel: 'dns-prefetch', href: 'https://img.youtube.com' },
        { rel: 'dns-prefetch', href: 'https://i.ytimg.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
      ];

      resourceHints.forEach(hint => {
        // Check if link already exists to avoid duplicates
        const existing = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
        if (!existing) {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          if (hint.crossOrigin) {
            link.crossOrigin = hint.crossOrigin;
          }
          document.head.appendChild(link);
        }
      });

      // Prefetch critical section routes for instant navigation
      const criticalSections = [
        '/sections/quran',
        '/sections/tafseer',
        '/sections/dhikr',
        '/sections/prayer-times',
        '/sections/qibla',
      ];

      // Get current language from URL
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const currentLang = pathSegments[0] && ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'].includes(pathSegments[0])
        ? pathSegments[0]
        : 'ar';

      criticalSections.forEach(section => {
        const href = currentLang === 'ar' ? section : `/${currentLang}${section}`;
        const existing = document.querySelector(`link[rel="prefetch"][href="${href}"]`);
        if (!existing) {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = href;
          link.as = 'document';
          document.head.appendChild(link);
        }
      });
    };

    // Optimize Core Web Vitals
    const optimizeCoreWebVitals = () => {
      // Optimize LCP (Largest Contentful Paint)
      const optimizeLCP = () => {
        // Preload hero images
        const heroImages = document.querySelectorAll('[data-hero-image]');
        heroImages.forEach(img => {
          const htmlImg = img as HTMLImageElement;
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = htmlImg.src;
          link.as = 'image';
          document.head.appendChild(link);
        });
      };

      // Optimize FID (First Input Delay)
      const optimizeFID = () => {
        // Defer non-critical JavaScript
        const nonCriticalScripts = document.querySelectorAll('script[data-non-critical]');
        nonCriticalScripts.forEach(script => {
          script.setAttribute('defer', '');
        });
      };

      // Optimize CLS (Cumulative Layout Shift)
      const optimizeCLS = () => {
        // Add dimensions to images
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
          const htmlImg = img as HTMLImageElement;
          htmlImg.style.aspectRatio = '16/9';
          htmlImg.style.width = '100%';
          htmlImg.style.height = 'auto';
        });
      };

      optimizeLCP();
      optimizeFID();
      optimizeCLS();
    };

    // Run optimizations
    preloadCriticalResources();
    optimizeImages();
    optimizeFonts();
    optimizeThirdPartyResources();
    addResourceHints();
    optimizeCoreWebVitals();

    // Add performance monitoring
    if ('performance' in window && 'PerformanceObserver' in window) {
      try {
        // Monitor LCP (Largest Contentful Paint)
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const lcpEntry = entry as any;
              if (lcpEntry.startTime) {
                console.log('LCP:', lcpEntry.startTime);
              }
            }
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {
          // LCP observer not supported
        }

        // Monitor FID (First Input Delay)
        try {
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const fidEntry = entry as any;
              if (fidEntry.processingStart && fidEntry.startTime) {
                console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
              }
            }
          });
          fidObserver.observe({ type: 'first-input', buffered: true });
        } catch (e) {
          // FID observer not supported
        }

        // Monitor CLS (Cumulative Layout Shift)
        try {
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const clsEntry = entry as any;
              if (clsEntry.value !== undefined) {
                console.log('CLS:', clsEntry.value);
              }
            }
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
          // CLS observer not supported
        }
      } catch (error) {
        // Silently handle PerformanceObserver errors
        console.warn('PerformanceObserver not supported:', error);
      }
    }

  }, []);

  return null;
}
