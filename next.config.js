const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
        }
      }
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 1 week
        }
      }
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-js-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      urlPattern: /\.(?:css|less)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-style-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      urlPattern: /\/api\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      urlPattern: /.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    }
  ]
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'ar', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'de', 'es', 'pt', 'ru', 'zh', 'ja', 'ko', 'hi', 'fa', 'ps', 'so', 'ha', 'sw', 'ml', 'ta', 'te', 'kn', 'mr', 'gu', 'pa', 'ne', 'si', 'my', 'th', 'vi', 'tl', 'km', 'am', 'ti', 'om', 'rw', 'yo', 'ig', 'zu', 'xh', 'st', 'sn', 'ny', 'mg', 'eo', 'la', 'cy', 'ga', 'gd', 'eu', 'ca', 'gl', 'ast', 'it', 'ro', 'nl', 'da', 'sv', 'no', 'fi', 'is', 'et', 'lv', 'lt', 'pl', 'cs', 'sk', 'hu', 'hr', 'sr', 'bs', 'sq', 'mk', 'bg', 'uk', 'be', 'ka', 'hy', 'he', 'yi', 'az', 'uz', 'kk', 'ky', 'tg', 'tk', 'mn', 'bo'],
    defaultLocale: 'ar',
  },
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com'],
  },
};

module.exports = withPWA(nextConfig);
