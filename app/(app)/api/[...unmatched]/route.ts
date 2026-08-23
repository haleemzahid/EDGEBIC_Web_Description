import { NextRequest, NextResponse } from 'next/server';

import { getBaseUrl } from '@/lib/urls/get-base-url';

/**
 * Catch-all for unmatched /api/* paths.
 *
 * Every defined API route wins over this dynamic segment, so this only fires
 * for paths that genuinely do not exist. Instead of Next.js' HTML 404 shell
 * (which agents and API clients cannot parse), it returns a structured JSON
 * error with recovery hints — the OpenAPI spec, the API index, and the docs.
 */
function jsonNotFound(request: NextRequest): Response {
  const baseUrl = getBaseUrl();

  return NextResponse.json(
    {
      error: 'Not found',
      code: 'not_found',
      message: `No API endpoint exists at ${request.nextUrl.pathname}.`,
      hint: 'List the available endpoints at GET /api, or read the OpenAPI specification for schemas and examples.',
      links: {
        apiIndex: `${baseUrl}/api`,
        openapi: `${baseUrl}/openapi.json`,
        documentation: `${baseUrl}/developers`
      }
    },
    {
      status: 404,
      headers: {
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex'
      }
    }
  );
}

export async function GET(request: NextRequest): Promise<Response> {
  return jsonNotFound(request);
}

export async function POST(request: NextRequest): Promise<Response> {
  return jsonNotFound(request);
}

export async function PUT(request: NextRequest): Promise<Response> {
  return jsonNotFound(request);
}

export async function PATCH(request: NextRequest): Promise<Response> {
  return jsonNotFound(request);
}

export async function DELETE(request: NextRequest): Promise<Response> {
  return jsonNotFound(request);
}

export async function HEAD(request: NextRequest): Promise<Response> {
  return jsonNotFound(request);
}
