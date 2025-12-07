/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Generate single sitemap instead of multiple
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/admin/*', '/_next/*', '/sw.js', '/workbox-*.js'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        allow: '/_next/static/',
        allow: '/_next/image/',
        allow: '/audio/',
        allow: '/icons/',
        allow: '/stories/',
        allow: '/og-image.png',
        disallow: ['/api/', '/admin/', '/sw.js', '/workbox-*.js'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        allow: '/_next/static/',
        allow: '/_next/image/',
        allow: '/audio/',
        allow: '/icons/',
        allow: '/stories/',
        allow: '/og-image.png',
        disallow: ['/api/', '/admin/', '/sw.js', '/workbox-*.js'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        allow: '/_next/static/',
        allow: '/icons/',
        allow: '/og-image.png',
        allow: '/stories/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        allow: '/_next/static/',
        allow: '/audio/',
        allow: '/icons/',
        allow: '/stories/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        allow: '/_next/static/',
        allow: '/_next/image/',
        allow: '/audio/',
        allow: '/icons/',
        allow: '/stories/',
        allow: '/og-image.png',
        disallow: ['/api/', '/admin/', '/sw.js', '/workbox-*.js'],
        crawlDelay: 2,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        allow: '/_next/static/',
        allow: '/audio/',
        allow: '/icons/',
        allow: '/stories/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        allow: '/_next/static/',
        allow: '/audio/',
        allow: '/icons/',
        allow: '/stories/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        allow: '/_next/static/',
        allow: '/audio/',
        allow: '/icons/',
        allow: '/stories/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        allow: '/_next/static/',
        allow: '/audio/',
        allow: '/icons/',
        allow: '/stories/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        allow: '/_next/static/',
        allow: '/audio/',
        allow: '/icons/',
        allow: '/stories/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        allow: '/_next/static/',
        allow: '/audio/',
        allow: '/icons/',
        allow: '/stories/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'YouBot',
        allow: '/',
        allow: '/_next/static/',
        allow: '/audio/',
        allow: '/icons/',
        allow: '/stories/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
    ],
    additionalSitemaps: [
      'https://meshari.charity/sitemap.xml',
    ],
    host: 'https://meshari.charity',
  },
  transform: async (config, path) => {
    const allLanguages = ['ar', 'en', 'tr', 'ur', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
    const sections = ['quran', 'tafseer', 'dhikr', 'prayer-times', 'qibla', 'donation', 'supplications', 'hadith', 'youtube'];
    
    // Language-specific priorities and change frequencies
    const languageConfig = {
      'ar': { priority: 1.0, changefreq: 'daily' },
      'en': { priority: 0.9, changefreq: 'daily' },
      'tr': { priority: 0.8, changefreq: 'weekly' },
      'ur': { priority: 0.8, changefreq: 'weekly' },
      'id': { priority: 0.8, changefreq: 'weekly' },
      'ms': { priority: 0.8, changefreq: 'weekly' },
      'bn': { priority: 0.8, changefreq: 'weekly' },
      'fr': { priority: 0.8, changefreq: 'weekly' },
      'zh': { priority: 0.8, changefreq: 'weekly' },
      'it': { priority: 0.8, changefreq: 'weekly' },
      'ja': { priority: 0.8, changefreq: 'weekly' },
      'ko': { priority: 0.8, changefreq: 'weekly' },
    };

    // Check if this is a section path
    const isSectionPath = sections.some(section => path.includes(`/sections/${section}`));
    
    // Extract language from path
    const pathSegments = path.split('/').filter(Boolean);
    const pathLang = pathSegments[0];
    const isLanguagePath = languageConfig[pathLang];
    
    let alternateRefs = [];
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      // Root path - generate alternates for all language home pages
      priority = 1.0;
      changefreq = 'daily';
      alternateRefs = allLanguages.map(lang => ({
        href: lang === 'ar' ? config.siteUrl : `${config.siteUrl}/${lang}`,
        hreflang: lang,
      }));
      alternateRefs.unshift({
        href: config.siteUrl,
        hreflang: 'x-default',
      });
    } else if (isSectionPath) {
      // Section path - generate alternates for all language versions of this section
      const sectionName = pathSegments.find(seg => sections.includes(seg)) || pathSegments[pathSegments.length - 1];
      priority = 0.7;
      changefreq = 'weekly';
      
      alternateRefs = allLanguages.map(lang => ({
        href: lang === 'ar' 
          ? `${config.siteUrl}/sections/${sectionName}` 
          : `${config.siteUrl}/${lang}/sections/${sectionName}`,
        hreflang: lang,
      }));
      alternateRefs.unshift({
        href: `${config.siteUrl}/sections/${sectionName}`,
        hreflang: 'x-default',
      });
    } else if (isLanguagePath) {
      // Language home page - generate alternates for all language home pages
      priority = isLanguagePath.priority;
      changefreq = isLanguagePath.changefreq;
      alternateRefs = allLanguages.map(lang => ({
        href: lang === 'ar' ? config.siteUrl : `${config.siteUrl}/${lang}`,
        hreflang: lang,
      }));
      alternateRefs.unshift({
        href: config.siteUrl,
        hreflang: 'x-default',
      });
    } else {
      // Other paths - no alternates needed
      alternateRefs = [];
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: alternateRefs.length > 0 ? alternateRefs : undefined,
    };
  },
  additionalPaths: async (config) => {
    const result = [];
    const languages = ['ar', 'en', 'tr', 'ur', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
    const sections = ['quran', 'tafseer', 'dhikr', 'prayer-times', 'qibla', 'donation', 'supplications', 'hadith', 'youtube'];

    // Add static resources (no alternates needed)
    result.push({
      loc: '/llms.txt',
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    });

    result.push({
      loc: '/manifest.json',
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date().toISOString(),
    });

    // Add all language home pages with proper alternates
    for (const lang of languages) {
      const alternateRefs = languages.map(l => ({
        href: l === 'ar' ? config.siteUrl : `${config.siteUrl}/${l}`,
        hreflang: l,
      }));

      alternateRefs.unshift({
        href: config.siteUrl,
        hreflang: 'x-default',
      });

      result.push({
        loc: lang === 'ar' ? '/' : `/${lang}`,
        changefreq: lang === 'ar' || lang === 'en' ? 'daily' : 'weekly',
        priority: lang === 'ar' ? 1.0 : lang === 'en' ? 0.9 : 0.8,
        lastmod: new Date().toISOString(),
        alternateRefs,
      });

      // Add section pages for each language with proper multilingual alternates
      for (const section of sections) {
        // Generate alternate language URLs for this section
        const sectionAlternateRefs = languages.map(l => ({
          href: l === 'ar' 
            ? `${config.siteUrl}/sections/${section}` 
            : `${config.siteUrl}/${l}/sections/${section}`,
          hreflang: l,
        }));

        // Add x-default pointing to Arabic version
        sectionAlternateRefs.unshift({
          href: `${config.siteUrl}/sections/${section}`,
          hreflang: 'x-default',
        });

        // Add the section URL for current language (unique canonical)
        result.push({
          loc: lang === 'ar' ? `/sections/${section}` : `/${lang}/sections/${section}`,
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
          alternateRefs: sectionAlternateRefs,
        });
      }
    }

    return result;
  },
};
