import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { stat } from 'fs/promises';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const filePath = path.join('/');
    const fullPath = join(process.cwd(), 'public', 'audio', filePath);

    // Check if file exists
    let fileStat;
    try {
      fileStat = await stat(fullPath);
    } catch (error) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Read the file
    const fileBuffer = await readFile(fullPath);
    const fileSize = fileStat.size;

    // Get Range header
    const rangeHeader = request.headers.get('range');

    if (!rangeHeader) {
      // No range requested, return full file
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': getContentType(filePath),
          'Content-Length': fileSize.toString(),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // Parse Range header (e.g., "bytes=0-1023")
    const rangeMatch = rangeHeader.match(/bytes=(\d+)-(\d*)/);
    if (!rangeMatch) {
      return new NextResponse(null, { status: 416 });
    }

    const start = parseInt(rangeMatch[1], 10);
    const end = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : fileSize - 1;

    // Validate range
    if (start >= fileSize || end >= fileSize || start > end) {
      return new NextResponse(null, {
        status: 416,
        headers: {
          'Content-Range': `bytes */${fileSize}`,
        },
      });
    }

    // Extract the requested range
    const chunkSize = end - start + 1;
    const chunk = fileBuffer.slice(start, end + 1);

    // Return partial content
    return new NextResponse(chunk, {
      status: 206,
      headers: {
        'Content-Type': getContentType(filePath),
        'Content-Length': chunkSize.toString(),
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Audio file serving error:', error);
    return NextResponse.json(
      { error: 'Failed to serve audio file' },
      { status: 500 }
    );
  }
}

function getContentType(filePath: string): string {
  if (filePath.endsWith('.mp3')) return 'audio/mpeg';
  if (filePath.endsWith('.ogg')) return 'audio/ogg';
  if (filePath.endsWith('.wav')) return 'audio/wav';
  if (filePath.endsWith('.m4a')) return 'audio/mp4';
  return 'audio/mpeg';
}

