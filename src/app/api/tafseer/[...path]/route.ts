import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy spa5k/tafsir_api so the browser always hits same-origin
 * (avoids flaky CDN/CORS issues) and we can cache responses.
 * Path: /api/tafseer/{slug}/{surah}/{ayah}
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    if (path.length < 3) {
      return NextResponse.json(
        { error: "Expected /api/tafseer/{slug}/{surah}/{ayah}" },
        { status: 400 },
      );
    }

    const [slug, surah, ayah] = path;
    if (!/^[a-z0-9-]+$/i.test(slug)) {
      return NextResponse.json({ error: "Invalid edition slug" }, { status: 400 });
    }
    const surahNum = Number.parseInt(surah, 10);
    const ayahNum = Number.parseInt(ayah, 10);
    if (
      !Number.isFinite(surahNum) ||
      !Number.isFinite(ayahNum) ||
      surahNum < 1 ||
      surahNum > 114 ||
      ayahNum < 1 ||
      ayahNum > 286
    ) {
      return NextResponse.json({ error: "Invalid surah/ayah" }, { status: 400 });
    }

    const url = `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${slug}/${surahNum}/${ayahNum}.json`;
    let response: Response | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      response = await fetch(url, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(12000),
        next: { revalidate: 86400 },
      });
      if (response.status !== 429) break;
      await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)));
    }

    if (!response || !response.ok) {
      return NextResponse.json(
        {
          error: "Tafseer not found",
          status: response?.status ?? 502,
        },
        { status: response?.status === 404 ? 404 : 502 },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Tafseer proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch tafseer" }, { status: 500 });
  }
}
