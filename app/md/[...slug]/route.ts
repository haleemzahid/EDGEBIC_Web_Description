import { NextRequest } from 'next/server';
import { allPosts } from 'content-collections';

import {
  articlePath,
  findArticle,
  type ArticleSource
} from '@/lib/api/public-content';
import {
  DEVELOPERS_MARKDOWN,
  HOME_MARKDOWN,
  notFoundMarkdown,
  unavailableMarkdown
} from '@/lib/markdown/agent-markdown';
import {
  MARKDOWN_FALLBACK_HEADER,
  hasNativeMarkdownVariant
} from '@/lib/markdown/markdown-negotiation';
import { getBaseUrl } from '@/lib/urls/get-base-url';

/**
 * Markdown variants for Accept: text/markdown content negotiation.
 *
 * middleware.ts rewrites every page GET that asks for text/markdown to
 * /md/<original-path> (the homepage maps to /md/index), which lands here.
 * Direct hits on /md/* work too but are noindexed — the HTML page stays the
 * canonical variant.
 *
 * Resolution order:
 * 1. /md/index, /md/developers → static markdown mirrors
 * 2. /md/blog/{slug}, /md/blog/glossary/{term} → the article's MDX source
 * 3. Anything else → fetch the HTML twin of the same path:
 *    - 404 → markdown 404 with recovery links (real 404 status)
 *    - otherwise → pass the HTML through unchanged (still Vary: Accept), which
 *      is what acceptmarkdown.com asks for when no markdown variant exists.
 */

export const dynamic = 'force-dynamic';

function markdownResponse(
  body: string,
  status: number = 200,
  cacheControl: string = 'public, max-age=3600'
): Response {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // The HTML/markdown pair is negotiated on Accept — without Vary a CDN
      // could serve the cached HTML variant to an agent asking for markdown.
      Vary: 'Accept',
      'Cache-Control': cacheControl,
      // The markdown variant must never compete with the canonical HTML page.
      'X-Robots-Tag': 'noindex'
    }
  });
}

function postMarkdown(post: ArticleSource): string {
  const header = [
    `# ${post.title}`,
    '',
    post.description,
    '',
    `> Published: ${post.published.slice(0, 10)}${post.modified ? ` · Updated: ${post.modified.slice(0, 10)}` : ''} · Category: ${post.category}`,
    // articlePath, not post.slug: glossary posts are served at
    // /blog/glossary/{term}, and the canonical must match the HTML page.
    `> Canonical: https://usersolutions.com${articlePath(post.slugAsParams)}`,
    ''
  ].join('\n');
  return `${header}\n${post.body.raw}`;
}

/** Response headers worth carrying across from the HTML twin. */
const PASSTHROUGH_HEADERS = [
  'content-type',
  'cache-control',
  'location',
  'x-robots-tag'
];

async function htmlFallback(
  request: NextRequest,
  pathname: string
): Promise<Response> {
  const target = `${getBaseUrl()}${pathname}${request.nextUrl.search}`;
  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: 'GET',
      headers: {
        Accept: 'text/html',
        'User-Agent': request.headers.get('user-agent') ?? 'markdown-negotiation',
        // Tells middleware not to rewrite this request back to /md/* again.
        [MARKDOWN_FALLBACK_HEADER]: '1'
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(10_000)
    });
  } catch {
    return markdownResponse(unavailableMarkdown(pathname), 502, 'no-store');
  }

  if (upstream.status === 404) {
    return markdownResponse(notFoundMarkdown(pathname), 404, 'no-store');
  }

  const headers = new Headers();
  for (const name of PASSTHROUGH_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  headers.append('Vary', 'Accept');
  return new Response(upstream.body, { status: upstream.status, headers });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Response> {
  const { slug } = await params;
  const segments = slug ?? [];
  const pathname = `/${segments.join('/')}`;

  if (pathname === '/index') {
    return markdownResponse(HOME_MARKDOWN);
  }

  if (pathname === '/developers') {
    return markdownResponse(DEVELOPERS_MARKDOWN);
  }

  if (segments[0] === 'blog' && segments.length >= 2) {
    const post = findArticle(allPosts, segments.slice(1));
    if (post) {
      return markdownResponse(postMarkdown(post));
    }
    // A /blog/... path with no post behind it is a 404 on the HTML side too;
    // skip the round trip.
    if (hasNativeMarkdownVariant(pathname)) {
      return markdownResponse(notFoundMarkdown(pathname), 404, 'no-store');
    }
  }

  return htmlFallback(request, pathname === '/index' ? '/' : pathname);
}
