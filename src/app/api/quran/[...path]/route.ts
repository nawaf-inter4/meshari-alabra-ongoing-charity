import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const pathString = path.join('/');
    const url = `https://api.alquran.cloud/v1/${pathString}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Meshari-Alabra-Charity/1.0',
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      // Log the error but return a proper error response
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`Quran API error (${response.status}):`, errorText);
      return NextResponse.json(
        { 
          error: 'Failed to fetch from Quran API',
          status: response.status,
          message: errorText 
        },
        { status: response.status }
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
