import { NextResponse } from 'next/server';

import { productCatalog } from '@/lib/api/public-content';
import { getBaseUrl } from '@/lib/urls/get-base-url';

/**
 * GET /api/v1/products — operationId: listProducts
 *
 * Open, read-only catalog of the EDGEBIC editions currently sold. No
 * authentication. Values come from constants/app-info.ts, the same source the
 * pricing page and the structured data read, so they cannot drift.
 */
export async function GET(): Promise<Response> {
  return NextResponse.json(productCatalog(getBaseUrl()), {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'noindex'
    }
  });
}
