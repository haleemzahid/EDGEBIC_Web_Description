import { NextRequest } from 'next/server';
import { allPosts } from 'content-collections';

import {
  DEVELOPERS_MARKDOWN,
  HOME_MARKDOWN,
  notFoundMarkdown
} from '@/lib/markdown/agent-markdown';

/**
 * Markdown variants for Accept: text/markdown content negotiation.
 *
 * middleware.ts rewrites GET requests that ask for text/markdown to
 * /md/<original-path> (the homepage maps to /md/index), which lands here.
 * Direct hits on /md/* work too but are noindexed — the HTML page stays the
 * canonical variant.
 *
 * Supported paths:
 * - /md/index              → static markdown mirror of the homepage
 * - /md/developers         → static markdown mirror of the developers page
 * - /md/blog/{slug}        → raw MDX source of the blog post
 * - /md/blog/glossary/{t}  → raw MDX source of the glossary post
 * Anything else            → markdown 404 with recovery links (real 404 status)
 */

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

function postMarkdown(post: (typeof allPosts)[number]): string {
  const header = [
    `# ${post.title}`,
    '',
    post.description,
    '',
    `> Published: ${post.published.slice(0, 10)}${post.modified ? ` · Updated: ${post.modified.slice(0, 10)}` : ''} · Category: ${post.category}`,
    `> Canonical: https://usersolutions.com${post.slug}`,
    ''
  ].join('\n');
  return `${header}\n${post.body.raw}`;
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
    // Glossary posts live at content/blog/glossary-{term}.mdx but are served
    // at /blog/glossary/{term} — same mapping as the glossary page route.
    const postSlug =
      segments[1] === 'glossary' && segments.length === 3
        ? `glossary-${segments[2]}`
        : segments.slice(1).join('/');
    const post = allPosts.find((p) => p.slugAsParams === postSlug);
    if (post) {
      return markdownResponse(postMarkdown(post));
    }
  }

  return markdownResponse(notFoundMarkdown(pathname), 404, 'no-store');
}
