import { NextRequest, NextResponse } from 'next/server';
import { allPosts } from 'content-collections';

import { jsonError } from '@/lib/api/json-error';
import { findArticle, toArticleDetail } from '@/lib/api/public-content';
import { getBaseUrl } from '@/lib/urls/get-base-url';

/**
 * GET /api/v1/articles/{slug} — operationId: getArticle
 *
 * One article with its markdown body. Glossary terms are addressed the same
 * way as on the site: /api/v1/articles/glossary/{term}.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Response> {
  const { slug } = await params;
  const segments = slug ?? [];
  const baseUrl = getBaseUrl();
  const post = findArticle(allPosts, segments);

  if (!post) {
    return jsonError({
      status: 404,
      code: 'not_found',
      message: `No article exists at /api/v1/articles/${segments.join('/')}.`,
      hint: 'Search for it with GET /api/v1/articles?q=... ; the slug is the last segment of the article URL.',
      links: {
        search: `${baseUrl}/api/v1/articles`,
        documentation: `${baseUrl}/developers`
      },
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }

  return NextResponse.json(toArticleDetail(post, baseUrl), {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'noindex'
    }
  });
}
