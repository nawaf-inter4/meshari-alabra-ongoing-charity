import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  try {
    // Read the service worker file from public directory
    const swPath = join(process.cwd(), 'public', 'sw.js');
    
    // Check if file exists
    if (!existsSync(swPath)) {
      console.error('Service worker file not found at:', swPath);
      return new NextResponse('Service worker not found', { 
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
    
    const swContent = await readFile(swPath, 'utf-8');

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
    return new NextResponse(`Service worker error: ${error instanceof Error ? error.message : 'Unknown error'}`, { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

