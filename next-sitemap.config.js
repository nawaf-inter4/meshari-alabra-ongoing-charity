/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity',
  generateRobotsTxt: false, // We maintain our own robots.txt
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/admin/*'],
  alternateRefs: [
    {
      href: 'https://meshari.charity',
      hreflang: 'x-default',
    },
    {
      href: 'https://meshari.charity/ar',
      hreflang: 'ar',
    },
    {
      href: 'https://meshari.charity/en',
      hreflang: 'en',
    },
    {
      href: 'https://meshari.charity/tr',
      hreflang: 'tr',
    },
    {
      href: 'https://meshari.charity/ur',
      hreflang: 'ur',
    },
    {
      href: 'https://meshari.charity/id',
      hreflang: 'id',
    },
    {
      href: 'https://meshari.charity/ms',
      hreflang: 'ms',
    },
    {
      href: 'https://meshari.charity/bn',
      hreflang: 'bn',
    },
    {
      href: 'https://meshari.charity/fr',
      hreflang: 'fr',
    },
    {
      href: 'https://meshari.charity/zh',
      hreflang: 'zh',
    },
    {
      href: 'https://meshari.charity/it',
      hreflang: 'it',
    },
    {
      href: 'https://meshari.charity/ja',
      hreflang: 'ja',
    },
    {
      href: 'https://meshari.charity/ko',
      hreflang: 'ko',
    },
  ],
  transform: async (config, path) => {
    // Custom priority for specific pages
    const priorities = {
      '/': 1.0,
      '/ar': 0.9,
      '/en': 0.9,
      '/tr': 0.8,
      '/ur': 0.8,
      '/id': 0.8,
      '/ms': 0.8,
      '/bn': 0.8,
      '/fr': 0.8,
      '/zh': 0.8,
      '/it': 0.8,
      '/ja': 0.8,
      '/ko': 0.8,
    };

    // Custom change frequencies
    const changefreqs = {
      '/': 'daily',
      '/ar': 'daily',
      '/en': 'daily',
      '/tr': 'weekly',
      '/ur': 'weekly',
      '/id': 'weekly',
      '/ms': 'weekly',
      '/bn': 'weekly',
      '/fr': 'weekly',
      '/zh': 'weekly',
      '/it': 'weekly',
      '/ja': 'weekly',
      '/ko': 'weekly',
    };

    // Generate all language alternates for each path
    const allLanguages = ['ar', 'en', 'tr', 'ur', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
    const alternateRefs = allLanguages.map(lang => ({
      href: `${config.siteUrl}/${lang}`,
      hreflang: lang,
    }));

    // Add x-default
    alternateRefs.unshift({
      href: config.siteUrl,
      hreflang: 'x-default',
    });

    return {
      loc: path,
      changefreq: changefreqs[path] || config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: alternateRefs,
    };
  },
  additionalPaths: async (config) => {
    const result = [];
    const languages = ['ar', 'en', 'tr', 'ur', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];

    // Add dynamic paths
    result.push({
      loc: '/llm.txt',
      changefreq: 'monthly',
      priority: 0.5,
    });

    // Add all language pages
    for (const lang of languages) {
      result.push({
        loc: `/${lang}`,
        changefreq: 'daily',
        priority: lang === 'ar' || lang === 'en' ? 0.9 : 0.8,
        lastmod: new Date().toISOString(),
      });
    }

    return result;
  },
};