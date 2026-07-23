/**
 * Minimal HTML metadata extraction for competitor pages. Deliberately
 * regex-based: we only need title / description / headings / a body excerpt to
 * feed the research model, and this repo has no HTML parser dependency.
 */

const FETCH_TIMEOUT_MS = 20_000;
const MAX_HTML_BYTES = 1_500_000;
const BODY_EXCERPT_CHARS = 4_000;
const MAX_HEADINGS = 12;
const USER_AGENT =
  'EdgebicMonitoringAgent/1.0 (+https://www.usersolutions.com; content monitor)';

export interface PageMeta {
  url: string;
  title: string | null;
  description: string | null;
  headings: string[];
  bodyExcerpt: string | null;
}

const HTML_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  '#39': "'",
  '#x27': "'",
  '#x2F': '/'
};

function decodeEntities(input: string): string {
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, code: string) => {
    const named = HTML_ENTITIES[code];
    if (named) return named;
    if (code.startsWith('#x') || code.startsWith('#X')) {
      const parsed = parseInt(code.slice(2), 16);
      return Number.isNaN(parsed) ? match : String.fromCodePoint(parsed);
    }
    if (code.startsWith('#')) {
      const parsed = parseInt(code.slice(1), 10);
      return Number.isNaN(parsed) ? match : String.fromCodePoint(parsed);
    }
    return match;
  });
}

function clean(input: string | null | undefined): string | null {
  if (!input) return null;
  const text = decodeEntities(input).replace(/\s+/g, ' ').trim();
  return text.length ? text : null;
}

/** Strip script/style/noscript blocks and all tags, leaving readable text. */
function stripToText(html: string): string {
  return html
    .replace(/<(script|style|noscript|svg|template)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');
}

function matchMetaContent(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern);
  return match ? clean(match[1]) : null;
}

/** Parse already-fetched HTML. Exported so it can be unit-tested without network. */
export function extractPageMeta(url: string, html: string): PageMeta {
  const title =
    clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]) ??
    matchMetaContent(
      html,
      /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i
    ) ??
    clean(stripToText(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? ''));

  const description =
    matchMetaContent(
      html,
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
    ) ??
    matchMetaContent(
      html,
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i
    );

  const headings: string[] = [];
  const headingPattern = /<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let heading: RegExpExecArray | null;
  while ((heading = headingPattern.exec(html)) !== null) {
    const text = clean(stripToText(heading[2]));
    if (text && !headings.includes(text)) headings.push(text);
    if (headings.length >= MAX_HEADINGS) break;
  }

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyExcerpt = clean(stripToText(bodyMatch?.[1] ?? html))?.slice(
    0,
    BODY_EXCERPT_CHARS
  ) ?? null;

  return { url, title, description, headings, bodyExcerpt };
}

/**
 * Fetch a competitor page and pull the metadata the research step needs.
 * Throws on network/HTTP failure so the caller can mark the page FAILED.
 */
export async function fetchPageMeta(url: string): Promise<PageMeta> {
  const response = await fetch(url, {
    headers: { 'user-agent': USER_AGENT, accept: 'text/html,*/*' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    redirect: 'follow',
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Page fetch failed (${response.status})`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType && !contentType.includes('html')) {
    // Not an article (PDF, image, feed…) — return the URL with no metadata
    // rather than feeding binary noise to the model.
    return { url, title: null, description: null, headings: [], bodyExcerpt: null };
  }

  const html = (await response.text()).slice(0, MAX_HTML_BYTES);
  return extractPageMeta(url, html);
}
