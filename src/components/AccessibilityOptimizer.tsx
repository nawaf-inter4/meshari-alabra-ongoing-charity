"use client";

import { useEffect } from "react";

export default function AccessibilityOptimizer() {
  useEffect(() => {
    // Add ARIA labels and roles
    const addAriaLabels = () => {
      // Add skip navigation
      if (document.body) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
        skipLink.setAttribute('aria-label', 'Skip to main content');
        document.body.insertBefore(skipLink, document.body.firstChild);
      }

      // Add main content landmark
      const mainContent = document.querySelector('main');
      if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
        mainContent.setAttribute('aria-label', 'Main content');
      }

      // Add navigation landmarks
      const navElements = document.querySelectorAll('nav');
      navElements.forEach((nav, index) => {
        if (!nav.getAttribute('aria-label')) {
          nav.setAttribute('aria-label', `Navigation ${index + 1}`);
        }
      });

      // Add section landmarks
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        if (!section.getAttribute('aria-labelledby')) {
          const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
          if (heading) {
            const headingId = `heading-${index}`;
            heading.id = headingId;
            section.setAttribute('aria-labelledby', headingId);
          }
        }
      });
    };

    // Optimize focus management
    const optimizeFocusManagement = () => {
      // Add focus indicators
      const style = document.createElement('style');
      style.textContent = `
        *:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .focus\\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: 0.5rem 1rem;
          margin: 0;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
      `;
      document.head.appendChild(style);

      // Add keyboard navigation support
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
      });

      document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
      });
    };

    // Optimize color contrast and text
    const optimizeColorContrast = () => {
      // Add high contrast mode support
      const mediaQuery = window.matchMedia('(prefers-contrast: high)');
      const handleContrastChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          document.documentElement.classList.add('high-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
        }
      };

      mediaQuery.addEventListener('change', handleContrastChange);
      handleContrastChange({ matches: mediaQuery.matches } as MediaQueryListEvent);

      // Add reduced motion support
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleMotionChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          document.documentElement.classList.add('reduce-motion');
        } else {
          document.documentElement.classList.remove('reduce-motion');
        }
      };

      motionQuery.addEventListener('change', handleMotionChange);
      handleMotionChange({ matches: motionQuery.matches } as MediaQueryListEvent);
    };

    // Add semantic HTML improvements
    const addSemanticHTML = () => {
      // Add language attributes
      const html = document.documentElement;
      if (!html.getAttribute('lang')) {
        html.setAttribute('lang', 'ar');
      }

      // Add dir attribute for RTL support
      if (!html.getAttribute('dir')) {
        html.setAttribute('dir', 'rtl');
      }

      // Add viewport meta tag if missing
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover');
        document.head.appendChild(viewport);
      }
    };

    // Add screen reader support
    const addScreenReaderSupport = () => {
      // Add live regions for dynamic content
      if (document.body) {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);

        // Add status messages
        const statusRegion = document.createElement('div');
        statusRegion.setAttribute('aria-live', 'assertive');
        statusRegion.setAttribute('aria-atomic', 'true');
        statusRegion.className = 'sr-only';
        statusRegion.id = 'status-region';
        document.body.appendChild(statusRegion);
      }
    };

    // Add form accessibility
    const addFormAccessibility = () => {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        // Add form labels
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
            const label = form.querySelector(`label[for="${input.id}"]`);
            if (label) {
              input.setAttribute('aria-labelledby', label.id || `label-${input.id}`);
            } else {
              const htmlInput = input as HTMLInputElement;
              input.setAttribute('aria-label', htmlInput.placeholder || 'Input field');
            }
          }
        });

        // Add error handling
        const errorContainer = document.createElement('div');
        errorContainer.setAttribute('role', 'alert');
        errorContainer.setAttribute('aria-live', 'assertive');
        errorContainer.className = 'sr-only';
        errorContainer.id = `error-${form.id || 'form'}`;
        form.appendChild(errorContainer);
      });
    };

    // Add image accessibility
    const addImageAccessibility = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Add alt text if missing
        if (!img.getAttribute('alt')) {
          img.setAttribute('alt', 'Image');
        }

        // Add loading attribute
        if (!img.getAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }

        // Add decoding attribute
        if (!img.getAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    };

    // Add button accessibility
    const addButtonAccessibility = () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        // Add aria-label if no text content
        if (!button.textContent?.trim() && !button.getAttribute('aria-label')) {
          const icon = button.querySelector('svg, img');
          if (icon) {
            button.setAttribute('aria-label', 'Button');
          }
        }

        // Add role if missing
        if (!button.getAttribute('role')) {
          button.setAttribute('role', 'button');
        }
      });
    };

    // Run all accessibility optimizations
    addAriaLabels();
    optimizeFocusManagement();
    optimizeColorContrast();
    addSemanticHTML();
    addScreenReaderSupport();
    addFormAccessibility();
    addImageAccessibility();
    addButtonAccessibility();

  }, []);

  return null;
}
