import { NextResponse } from 'next/server';

import { PUBLIC_ENDPOINTS } from '@/lib/api/public-endpoints';
import { getBaseUrl } from '@/lib/urls/get-base-url';

/**
 * GET /api — machine-readable API index.
 *
 * Agents and integrators probing the API root get a JSON directory of the
 * public surface instead of an HTML 404, plus pointers to the OpenAPI spec
 * and the human-readable developer docs.
 */
export async function GET(): Promise<Response> {
  const baseUrl = getBaseUrl();

  return NextResponse.json(
    {
      name: 'User Solutions EDGEBIC Public API',
      description:
        'Public REST API by User Solutions, Inc.: an open, read-only content API (EDGEBIC product catalog, knowledge-base search and article bodies) plus the EDGEBIC / EDGEBI desktop licensing API (license requests, seat-based activation, validation, seat-gated software updates).',
      openapi: `${baseUrl}/openapi.json`,
      documentation: `${baseUrl}/developers`,
      llms: `${baseUrl}/llms.txt`,
      errors:
        'Every error is JSON: { error, code, message, hint?, details?, links? }.',
      endpoints: PUBLIC_ENDPOINTS.map((e) => ({
        method: e.method,
        path: e.path,
        operationId: e.operationId,
        description: e.description,
        auth: e.auth
      }))
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Tag': 'noindex'
      }
    }
  );
}
