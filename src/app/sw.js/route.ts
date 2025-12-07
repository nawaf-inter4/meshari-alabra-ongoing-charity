import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    // Read the service worker file from public directory (check backup first, then original)
    let swPath = join(process.cwd(), 'public', 'sw.js.backup');
    let swContent: string;
    
    try {
      swContent = await readFile(swPath, 'utf-8');
    } catch {
      // Fallback to original location if backup doesn't exist
      swPath = join(process.cwd(), 'public', 'sw.js');
      swContent = await readFile(swPath, 'utf-8');
    }

    // Return with correct MIME type
    return new NextResponse(swContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Service-Worker-Allowed': '/',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error serving service worker:', error);
    return new NextResponse('Service worker not found', { status: 404 });
  }
}

