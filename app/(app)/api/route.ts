import { NextResponse } from 'next/server';

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
      name: 'User Solutions EDGEBIC Licensing API',
      description:
        'Public REST API for EDGEBIC / EDGEBI desktop license requests, seat-based activation, validation, and seat-gated software updates.',
      openapi: `${baseUrl}/openapi.json`,
      documentation: `${baseUrl}/developers`,
      llms: `${baseUrl}/llms.txt`,
      endpoints: [
        { method: 'POST', path: '/api/license/request', operationId: 'requestLicense' },
        { method: 'GET', path: '/api/license/request', operationId: 'pollLicenseRequest' },
        { method: 'POST', path: '/api/license/activate', operationId: 'activateLicense' },
        { method: 'POST', path: '/api/license/validate', operationId: 'validateLicense' },
        { method: 'POST', path: '/api/license/deactivate', operationId: 'deactivateLicense' },
        { method: 'POST', path: '/api/software/latest', operationId: 'checkSoftwareUpdates' },
        { method: 'GET', path: '/api/software/download', operationId: 'downloadSoftware' },
        { method: 'GET', path: '/api/health', operationId: 'healthCheck' }
      ]
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'X-Robots-Tag': 'noindex'
      }
    }
  );
}
