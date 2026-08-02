import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const pathString = path.join('/');
    const url = `https://api.alquran.cloud/v1/${pathString}`;
    const headers = {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": `OngoingCharityApp/1.0 (${siteConfig.identity.siteUrl})`,
    };

    // Upstream rate-limits bursty per-ayah traffic (429). Retry a couple times.
    let response: Response | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      response = await fetch(url, {
        method: "GET",
        headers,
        signal: AbortSignal.timeout(10000),
      });
      if (response.status !== 429) break;
      await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
    }

    if (!response || !response.ok) {
      const status = response?.status ?? 502;
      const errorText = response
        ? await response.text().catch(() => "Unknown error")
        : "No response from Quran API";

      // Only log non-404 errors
      if (status !== 404) {
        console.error(`Quran API error (${status}):`, errorText.substring(0, 200));
      }

      if (status === 404) {
        return NextResponse.json(
          {
            code: 404,
            status: "NOT FOUND",
            data: "Nothing matching your search was found..",
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          error: "Failed to fetch from Quran API",
          status,
          message: errorText.substring(0, 200),
        },
        { status },
      );
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Quran API returned non-JSON response:', text.substring(0, 200));
      return NextResponse.json(
        { error: 'Invalid response from Quran API' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: any) {
    // Handle timeout and network errors
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      console.error('Quran API timeout:', error);
      return NextResponse.json(
        { error: 'Request timeout - please try again' },
        { status: 504 }
      );
    }
    
    console.error('Quran API proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch from Quran API',
        message: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
