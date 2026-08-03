import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { isSupportedLocale, localeDirection, siteConfig } from "@/config/site";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || siteConfig.seo.title || siteConfig.identity.name;
    const description =
      searchParams.get("description") ||
      siteConfig.seo.description ||
      siteConfig.content.heroDescription ||
      "Ongoing charity through Quran, supplications, prayer, and good deeds.";
    const requestedLang = searchParams.get("lang") || siteConfig.identity.defaultLocale;
    const lang = isSupportedLocale(requestedLang) ? requestedLang : siteConfig.identity.defaultLocale;
    const direction = localeDirection(lang);
    const siteHost = new URL(siteConfig.identity.siteUrl).host;

    // Avoid emoji/glyphs that Satori cannot render reliably (caused production 500s).
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: siteConfig.colors.backgroundDark,
            backgroundImage: `linear-gradient(135deg, ${siteConfig.colors.backgroundDark} 0%, ${siteConfig.colors.backgroundDarkSecondary} 50%, ${siteConfig.colors.backgroundDarkAccent} 100%)`,
            fontFamily: "system-ui, sans-serif",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              right: 24,
              bottom: 24,
              border: `6px solid ${siteConfig.colors.brand}`,
              borderRadius: 16,
              display: "flex",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px",
              textAlign: "center",
              maxWidth: "1000px",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 999,
                backgroundColor: siteConfig.colors.brand,
                marginBottom: 28,
                display: "flex",
              }}
            />

            <div
              style={{
                fontSize: lang === "ar" ? 44 : 40,
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: 20,
                lineHeight: 1.25,
                textAlign: "center",
                direction,
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: 22,
                color: "#E2E8F0",
                marginBottom: 28,
                lineHeight: 1.4,
                textAlign: "center",
                maxWidth: 820,
                direction,
              }}
            >
              {description}
            </div>

            <div
              style={{
                fontSize: 20,
                color: siteConfig.colors.brand,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              {siteHost}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          // Social crawlers and previews must be able to load this cross-origin.
          "Cross-Origin-Resource-Policy": "cross-origin",
          "Cache-Control": "public, max-age=3600, must-revalidate",
        },
      },
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("og-image generation failed:", message);
    return new Response(`Failed to generate the image: ${message}`, {
      status: 500,
    });
  }
}
