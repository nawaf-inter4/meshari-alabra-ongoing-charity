import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// export const runtime = 'edge'; // Removed due to cacheComponents compatibility

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'صدقة جارية لمشاري';
    const description = searchParams.get('description') || 'صفحة مخصصة لأخي مشاري، توفي إثر مرض سرطان الدماغ';
    const lang = searchParams.get('lang') || 'ar';

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
            backgroundColor: '#0F172A',
            backgroundImage: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
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
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
              border: '8px solid #D4AF37',
              borderImage: 'linear-gradient(45deg, #D4AF37, #10B981, #3B82F6) 1',
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
                color: '#D4AF37',
                marginBottom: '20px',
                textShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
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
                direction: lang === 'ar' ? 'rtl' : 'ltr',
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
                direction: lang === 'ar' ? 'rtl' : 'ltr',
              }}
            >
              {description}
            </div>

            {/* Website URL */}
            <div
              style={{
                fontSize: '20px',
                color: '#D4AF37',
                fontWeight: '600',
                letterSpacing: '1px',
              }}
            >
              meshari.charity
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
              color: '#D4AF37',
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
