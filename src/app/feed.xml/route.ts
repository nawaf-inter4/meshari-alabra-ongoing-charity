import { languageMetadata } from '@/lib/metadata';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity';
  const languages = ['ar', 'en', 'tr', 'ur', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
  
  const rssItems = languages.map(lang => {
    const meta = languageMetadata[lang];
    const url = lang === 'ar' ? siteUrl : `${siteUrl}/${lang}`;
    
    return `
      <item>
        <title>${meta.title}</title>
        <description>${meta.description}</description>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <language>${meta.locale}</language>
        <category>Islamic Charity</category>
        <category>Religion</category>
        <category>Charity</category>
      </item>
    `;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Meshari's Ongoing Charity - صدقة جارية لمشاري</title>
    <description>A tribute to Meshari Ahmed Sulaiman Alabra - Ongoing charity through Quran, supplications, and good deeds</description>
    <link>${siteUrl}</link>
    <language>ar-SA</language>
    <managingEditor>info@meshari.charity (Meshari's Ongoing Charity)</managingEditor>
    <webMaster>info@meshari.charity (Meshari's Ongoing Charity)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js</generator>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/og-image.png</url>
      <title>Meshari's Ongoing Charity</title>
      <link>${siteUrl}</link>
      <width>1200</width>
      <height>630</height>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
