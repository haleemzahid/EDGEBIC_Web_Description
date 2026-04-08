import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl } from '@/lib/urls/get-base-url';

/**
 * IndexNow API endpoint for instant Bing/Yandex notification.
 *
 * Usage:
 *   POST /api/indexnow
 *   Body: { "urls": ["/blog/my-post-slug", "/blog/another-post"] }
 *
 *   GET /api/indexnow?url=/blog/my-post-slug
 *
 * Also pings Google's sitemap endpoint automatically.
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'usersolutions-indexnow-key';
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow'
];
const GOOGLE_PING_URL = 'https://www.google.com/ping';

async function submitToIndexNow(urls: string[]): Promise<{
  success: boolean;
  results: { engine: string; status: number; ok: boolean }[];
}> {
  const baseUrl = getBaseUrl();
  const absoluteUrls = urls.map((u) =>
    u.startsWith('http') ? u : `${baseUrl}${u}`
  );

  const results: { engine: string; status: number; ok: boolean }[] = [];

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const body =
        absoluteUrls.length === 1
          ? {
              host: new URL(baseUrl).host,
              key: INDEXNOW_KEY,
              keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
              url: absoluteUrls[0]
            }
          : {
              host: new URL(baseUrl).host,
              key: INDEXNOW_KEY,
              keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
              urlList: absoluteUrls
            };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      results.push({
        engine: endpoint,
        status: response.status,
        ok: response.status >= 200 && response.status < 300
      });
    } catch (error) {
      results.push({
        engine: endpoint,
        status: 500,
        ok: false
      });
    }
  }

  return {
    success: results.some((r) => r.ok),
    results
  };
}

async function pingGoogle(): Promise<{ status: number; ok: boolean }> {
  const baseUrl = getBaseUrl();
  const sitemapUrl = `${baseUrl}/sitemap.xml`;

  try {
    const response = await fetch(
      `${GOOGLE_PING_URL}?sitemap=${encodeURIComponent(sitemapUrl)}`
    );
    return { status: response.status, ok: response.ok };
  } catch {
    return { status: 500, ok: false };
  }
}

// POST /api/indexnow — submit multiple URLs
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const urls: string[] = body.urls || [];

    if (urls.length === 0) {
      return NextResponse.json(
        { error: 'No URLs provided. Send { "urls": ["/blog/slug"] }' },
        { status: 400 }
      );
    }

    if (urls.length > 10000) {
      return NextResponse.json(
        { error: 'Maximum 10,000 URLs per request' },
        { status: 400 }
      );
    }

    const [indexNowResult, googleResult] = await Promise.all([
      submitToIndexNow(urls),
      pingGoogle()
    ]);

    return NextResponse.json({
      submitted: urls.length,
      indexNow: indexNowResult,
      googlePing: googleResult
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// GET /api/indexnow?url=/blog/slug — submit single URL
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      {
        error: 'Missing url parameter',
        usage: 'GET /api/indexnow?url=/blog/my-post-slug',
        postUsage: 'POST /api/indexnow with body { "urls": ["/blog/slug1", "/blog/slug2"] }'
      },
      { status: 400 }
    );
  }

  const [indexNowResult, googleResult] = await Promise.all([
    submitToIndexNow([url]),
    pingGoogle()
  ]);

  return NextResponse.json({
    submitted: 1,
    url,
    indexNow: indexNowResult,
    googlePing: googleResult
  });
}
