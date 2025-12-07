import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      headers: {
        'Accept': 'application/json',
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`IP API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Return with CORS headers
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('IP location API error:', error);
    // Return default location (Riyadh) on error
    return NextResponse.json(
      {
        latitude: 24.7136,
        longitude: 46.6753,
        city: 'Riyadh',
        country: 'Saudi Arabia',
        country_code: 'SA',
        error: 'Failed to fetch location',
      },
      {
        status: 200, // Return 200 so client can use default location
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

