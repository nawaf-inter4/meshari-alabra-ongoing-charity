"use client";

import { useEffect } from "react";

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        { href: '/icons/icon-192x192.png', as: 'image', type: 'image/png' },
        { href: '/icons/icon-512x512.png', as: 'image', type: 'image/png' },
        { href: '/og-image.png', as: 'image', type: 'image/png' }
      ];

      criticalResources.forEach(resource => {
        // Check if already preloaded
        const existing = document.querySelector(`link[href="${resource.href}"]`);
        if (!existing) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = resource.href;
          link.as = resource.as;
          link.type = resource.type;
          document.head.appendChild(link);
        }
      });
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
    const optimizeFonts = () => {
      // Preload critical fonts
      const fontPreloads = [
        {
          href: 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap',
          as: 'style'
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&display=swap',
          as: 'style'
        }
      ];

      fontPreloads.forEach(font => {
        // Check if already preloaded
        const existing = document.querySelector(`link[href="${font.href}"]`);
        if (!existing) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = font.href;
          link.as = font.as;
          document.head.appendChild(link);
        }
      });
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

    // Implement resource hints
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
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossOrigin) {
          link.crossOrigin = hint.crossOrigin;
        }
        document.head.appendChild(link);
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
    if ('performance' in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as any;
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            const clsEntry = entry as any;
            console.log('CLS:', clsEntry.value);
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }

  }, []);

  return null;
}
