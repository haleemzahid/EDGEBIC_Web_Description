import { NextRequest, NextResponse } from 'next/server';
import { allPosts } from 'content-collections';

import { jsonError } from '@/lib/api/json-error';
import { parseArticleQuery, searchArticles } from '@/lib/api/public-content';
import { getBaseUrl } from '@/lib/urls/get-base-url';

/**
 * GET /api/v1/articles — operationId: searchArticles
 *
 * Open, read-only search over the knowledge base. No authentication.
 *
 * Query: q (keyword), category, cluster, limit (1-100, default 20), offset.
 * Sorted by relevance when q is given, else newest first.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const parsed = parseArticleQuery(request.nextUrl.searchParams);
  if (!parsed.query) {
    return jsonError({
      status: 400,
      code: 'bad_request',
      message: 'Invalid query parameters.',
      hint: 'limit must be 1-100, offset a non-negative integer, q at most 200 characters.',
      details: parsed.issues,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }

  const result = searchArticles(allPosts, parsed.query, getBaseUrl());
  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, max-age=600, stale-while-revalidate=3600',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'noindex'
    }
  });
}
