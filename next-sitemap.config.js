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
        disallow: ['/api/', '/admin/', '/_next/', '/sw.js', '/workbox-*.js'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/sw.js', '/workbox-*.js'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/sw.js', '/workbox-*.js'],
        crawlDelay: 2,
      },
    ],
    additionalSitemaps: [
      'https://meshari.charity/sitemap.xml',
    ],
    host: 'https://meshari.charity',
  },
  transform: async (config, path) => {
    // Language-specific priorities and change frequencies
    const languageConfig = {
      'ar': { priority: 1.0, changefreq: 'daily', locale: 'ar_SA' },
      'en': { priority: 0.9, changefreq: 'daily', locale: 'en_US' },
      'tr': { priority: 0.8, changefreq: 'weekly', locale: 'tr_TR' },
      'ur': { priority: 0.8, changefreq: 'weekly', locale: 'ur_PK' },
      'id': { priority: 0.8, changefreq: 'weekly', locale: 'id_ID' },
      'ms': { priority: 0.8, changefreq: 'weekly', locale: 'ms_MY' },
      'bn': { priority: 0.8, changefreq: 'weekly', locale: 'bn_BD' },
      'fr': { priority: 0.8, changefreq: 'weekly', locale: 'fr_FR' },
      'zh': { priority: 0.8, changefreq: 'weekly', locale: 'zh_CN' },
      'it': { priority: 0.8, changefreq: 'weekly', locale: 'it_IT' },
      'ja': { priority: 0.8, changefreq: 'weekly', locale: 'ja_JP' },
      'ko': { priority: 0.8, changefreq: 'weekly', locale: 'ko_KR' },
    };

    // Extract language from path
    const pathLang = path.replace('/', '').split('/')[0];
    const isLanguagePath = languageConfig[pathLang];
    
    // Generate all language alternates with correct URLs
    const allLanguages = ['ar', 'en', 'tr', 'ur', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
    const alternateRefs = allLanguages.map(lang => ({
      href: lang === 'ar' ? config.siteUrl : `${config.siteUrl}/${lang}`,
      hreflang: lang,
    }));

    // Add x-default
    alternateRefs.unshift({
      href: config.siteUrl,
      hreflang: 'x-default',
    });

    // Determine priority and changefreq
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (isLanguagePath) {
      priority = isLanguagePath.priority;
      changefreq = isLanguagePath.changefreq;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs,
    };
  },
  additionalPaths: async (config) => {
    const result = [];
    const languages = ['ar', 'en', 'tr', 'ur', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
    const sections = ['quran', 'tafseer', 'dhikr', 'prayer-times', 'qibla', 'donation', 'supplications', 'hadith', 'youtube'];

    // Add static resources
    result.push({
      loc: '/llm.txt',
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

    // Add all language pages with proper alternates
    for (const lang of languages) {
      const allLanguages = ['ar', 'en', 'tr', 'ur', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
      const alternateRefs = allLanguages.map(l => ({
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
        const sectionAlternateRefs = allLanguages.map(l => ({
          href: l === 'ar' ? `${config.siteUrl}/sections/${section}` : `${config.siteUrl}/${l}/sections/${section}`,
          hreflang: l,
        }));

        // Add x-default pointing to Arabic version
        sectionAlternateRefs.unshift({
          href: `${config.siteUrl}/sections/${section}`,
          hreflang: 'x-default',
        });

        // Add the section URL for current language
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