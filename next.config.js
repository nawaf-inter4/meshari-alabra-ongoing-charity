const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Next always injects polyfill-module (Chrome 61 / Safari 10.1 era). Our
// browserslist is Chrome/Edge/Firefox 111+ and Safari/iOS 16.4+, so stub it out.
const emptyNextPolyfillModule = path.join(
  __dirname,
  'src/lib/empty-next-polyfill-module.js'
);


/** @type {import('next').NextConfig} */
const nextConfig = {
  // Automated browser tests use a separate directory so their white-label
  // build cannot invalidate the developer's live `.next` session.
  distDir: process.env.NEXT_DIST_DIR || '.next',

  // Enable React strict mode for better development
  reactStrictMode: true,

  // Compiler options for optimization
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Output standalone for better optimization.
  // Disabled for Vercel deployment compatibility.
  // output: 'standalone',

  // Enable Cache Components and reusable route shells for instant navigation.
  cacheComponents: true,
  partialPrefetching: true,

  // Strong cache invalidation strategy
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Webpack configuration for better cache invalidation
  webpack: (config, { dev, isServer }) => {
    // Add cache busting for development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }

    // Add file-based cache invalidation
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: '.next/cache/webpack',
    };

    // Drop unused modern-bundle polyfills (see empty-next-polyfill-module.js).
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        [require.resolve('next/dist/build/polyfills/polyfill-module')]:
          emptyNextPolyfillModule,
      };
      try {
        config.resolve.alias[
          require.resolve('next/dist/esm/build/polyfills/polyfill-module')
        ] = emptyNextPolyfillModule;
      } catch {
        // ESM polyfill path may be absent depending on Next package layout.
      }
    }

    return config;
  },

  // External packages for server components
  // Note: react-pdf is only used in client components, so it doesn't need to be externalized
  // Removing it eliminates CSS import warnings
  serverExternalPackages: ['pdfjs-dist'],
  
  // Experimental features for better performance
  experimental: {
    // TypeScript 7 uses the CLI because it no longer exposes the compiler API.
    useTypeScriptCli: true,
    // Inline CSS into HTML in production to remove the render-blocking stylesheet
    // round-trip (PageSpeed "Eliminate render-blocking resources").
    inlineCss: true,
    // Optimize package imports (stable in Next.js 16)
    // Note: react-pdf is excluded here because it's in serverExternalPackages
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'next-themes',
      'react-i18next',
      'date-fns',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
    ],
    // Enable modern bundling optimizations
    webpackBuildWorker: true,
    // Enable modern bundling
    esmExternals: true,
    // Optimize server components
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // ppr removed - replaced by cacheComponents (enabled at root level)
  },

  // Turbopack configuration
  turbopack: {
    root: __dirname,
    resolveAlias: {
      'next/dist/build/polyfills/polyfill-module':
        './src/lib/empty-next-polyfill-module.js',
      'next/dist/esm/build/polyfills/polyfill-module':
        './src/lib/empty-next-polyfill-module.js',
    },
  },

  // Image optimization - Performance critical
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF and WebP for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    // Optimize images for better performance
    unoptimized: false,
    // Enable image optimization
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          }
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.webmanifest',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },

      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/audio/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
        ],
      },
      {
        source: '/flags/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Compress output (gzip/brotli)
  compress: true,

  // Generate ETags
  generateEtags: true,

  // Power user features
  poweredByHeader: false,

  // Production source maps (disable for smaller builds)
  productionBrowserSourceMaps: false,
};

module.exports = withBundleAnalyzer(nextConfig);

// Cloudflare OpenNext: enable Workers bindings during local `next dev`.
// Safe no-op path for Vercel/Netlify/Docker when the adapter is present.
try {
  const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare');
  initOpenNextCloudflareForDev();
} catch {
  // Adapter unavailable in stripped installs; ignore.
}
