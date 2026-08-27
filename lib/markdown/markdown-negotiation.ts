/**
 * Markdown content negotiation rules (acceptmarkdown.com), shared by
 * middleware.ts (edge runtime — keep this file free of Node imports) and
 * app/md/[...slug]/route.ts.
 *
 * Contract:
 * - A GET whose Accept header lists text/markdown is rewritten to /md/<path>.
 * - Paths with a native markdown variant answer with text/markdown.
 * - Paths without one fall back to the HTML page (still 200, Vary: Accept).
 * - Unknown paths answer with a markdown 404 that carries recovery links.
 * - Every page response carries Vary: Accept, because any page may negotiate.
 */

/** Request header set by the /md route when it fetches the HTML fallback. */
export const MARKDOWN_FALLBACK_HEADER = 'x-markdown-fallback';

/** Does the Accept header ask for markdown at all? */
export function acceptsMarkdown(accept: string | null | undefined): boolean {
  return !!accept && /\btext\/markdown\b/i.test(accept);
}

/**
 * Paths that must never be rewritten to the markdown handler: the handler
 * itself, the JSON API, Next internals, and anything that looks like a file
 * (sitemap.xml, openapi.json, images) — those already have one representation.
 */
export function isMarkdownNegotiable(pathname: string): boolean {
  if (pathname.startsWith('/md/') || pathname === '/md') return false;
  if (pathname === '/api' || pathname.startsWith('/api/')) return false;
  if (pathname.startsWith('/_next/')) return false;
  if (/\.[a-z0-9]{1,8}$/i.test(pathname)) return false;
  return true;
}

/**
 * Decide whether middleware should rewrite this request to /md/<path>.
 * The fallback header short-circuits the loop where the markdown handler
 * fetches its own HTML twin.
 */
export function shouldRewriteToMarkdown(input: {
  method: string;
  pathname: string;
  accept: string | null | undefined;
  fallbackHeader?: string | null;
}): boolean {
  if (input.method !== 'GET') return false;
  if (input.fallbackHeader) return false;
  if (!acceptsMarkdown(input.accept)) return false;
  return isMarkdownNegotiable(input.pathname);
}

/** The /md/* pathname for a page pathname (the homepage maps to /md/index). */
export function markdownPathFor(pathname: string): string {
  return pathname === '/' ? '/md/index' : `/md${pathname}`;
}

/** Paths with a native (non-fallback) markdown variant. */
export function hasNativeMarkdownVariant(pathname: string): boolean {
  return (
    pathname === '/' ||
    pathname === '/developers' ||
    /^\/blog\/[^/]+(\/[^/]+)?$/.test(pathname)
  );
}
