import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { isSupportedLocale, localeDirection, siteConfig } from '@/config/site';

// export const runtime = 'edge'; // Removed due to cacheComponents compatibility

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || siteConfig.seo.title || siteConfig.identity.name;
    const description = searchParams.get('description') || siteConfig.seo.description || siteConfig.content.heroDescription || 'Ongoing charity through Quran, supplications, prayer, and good deeds.';
    const requestedLang = searchParams.get('lang') || siteConfig.identity.defaultLocale;
    const lang = isSupportedLocale(requestedLang) ? requestedLang : siteConfig.identity.defaultLocale;
    const direction = localeDirection(lang);
    const siteHost = new URL(siteConfig.identity.siteUrl).host;
    const brandPatternColor = `%23${siteConfig.colors.brand.replace('#', '')}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: siteConfig.colors.backgroundDark,
            backgroundImage: `linear-gradient(135deg, ${siteConfig.colors.backgroundDark} 0%, ${siteConfig.colors.backgroundDarkSecondary} 50%, ${siteConfig.colors.backgroundDarkAccent} 100%)`,
            fontFamily: 'system-ui, sans-serif',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${brandPatternColor}' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.3,
            }}
          />
          
          {/* Islamic Pattern Border */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: `8px solid ${siteConfig.colors.brand}`,
              borderImage: `linear-gradient(45deg, ${siteConfig.colors.brand}, ${siteConfig.colors.accent}, ${siteConfig.colors.link}) 1`,
            }}
          />

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              textAlign: 'center',
              maxWidth: '1000px',
              zIndex: 1,
            }}
          >
            {/* Islamic Symbol */}
            <div
              style={{
                fontSize: '80px',
                color: siteConfig.colors.brand,
                marginBottom: '20px',
                textShadow: `0 0 20px ${siteConfig.colors.brand}80`,
              }}
            >
              ☪️
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: lang === 'ar' ? '48px' : '42px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                marginBottom: '20px',
                lineHeight: 1.2,
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                direction,
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '24px',
                color: '#E2E8F0',
                marginBottom: '30px',
                lineHeight: 1.4,
                textAlign: 'center',
                maxWidth: '800px',
                direction,
              }}
            >
              {description}
            </div>

            {/* Website URL */}
            <div
              style={{
                fontSize: '20px',
                color: siteConfig.colors.brand,
                fontWeight: '600',
                letterSpacing: '1px',
              }}
            >
              {siteHost}
            </div>
          </div>

          {/* Bottom Islamic Pattern */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '24px',
              color: siteConfig.colors.brand,
              opacity: 0.7,
            }}
          >
            🌙 ✨ 🌙 ✨ 🌙
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
