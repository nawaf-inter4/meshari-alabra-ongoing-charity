import { connection, NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

// MIGRATED: Removed export const dynamic - API routes are dynamic by default with Cache Components
// This route fetches external data, so it remains dynamic (default behavior)

export async function GET() {
  // Resolve this per request so a build-time IP lookup is never cached for visitors.
  await connection();

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
    const fallback = siteConfig.fallbackLocation;
    // Return the configured default location on error.
    return NextResponse.json(
      {
        latitude: fallback.latitude,
        longitude: fallback.longitude,
        city: fallback.city,
        country: fallback.country,
        country_code: fallback.countryCode,
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

