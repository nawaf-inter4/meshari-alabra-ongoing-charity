import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    // Read the manifest file from public directory
    const manifestPath = join(process.cwd(), 'public', 'manifest.json');
    const manifestContent = await readFile(manifestPath, 'utf-8');

    // Return with correct MIME type
    return new NextResponse(manifestContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/manifest+json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving manifest:', error);
    return new NextResponse('Manifest not found', { status: 404 });
  }
}

