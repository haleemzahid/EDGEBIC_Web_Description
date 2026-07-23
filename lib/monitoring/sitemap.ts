/**
 * Sitemap fetching + parsing.
 *
 * Deliberately dependency-free. The sitemaps.org schema is small and rigid
 * (<urlset>/<sitemapindex> containing <url>/<sitemap> blocks with a <loc>), so
 * a scoped parser is more predictable here than pulling an XML library into the
 * typechecked app — and it lets us ignore namespaced siblings such as
 * <image:loc> and <video:loc>, which a generic parser would happily return.
 */

/** One URL discovered in a competitor sitemap. */
export interface SitemapEntry {
  url: string;
  lastmod: Date | null;
}

const FETCH_TIMEOUT_MS = 20_000;
const MAX_INDEX_DEPTH = 2;
const MAX_ENTRIES = 5_000;
const USER_AGENT =
  'EdgebicMonitoringAgent/1.0 (+https://www.usersolutions.com; sitemap monitor)';

/** Resolve the five XML predefined entities, numeric refs, and CDATA. */
function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_match, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_match, dec: string) =>
      String.fromCodePoint(parseInt(dec, 10))
    )
    // Ampersand last, so "&amp;lt;" does not collapse to "<".
    .replace(/&amp;/g, '&')
    .trim();
}

/**
 * Pull out each <tag>…</tag> block. The optional-attributes group requires
 * whitespace or an immediate '>', so <sitemap> never matches <sitemapindex>.
 */
function extractBlocks(xml: string, tag: 'url' | 'sitemap'): string[] {
  const pattern = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'gi');
  const blocks: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(xml)) !== null) {
    blocks.push(match[1]);
    if (blocks.length >= MAX_ENTRIES) break;
  }
  return blocks;
}

/** Read a child element's text. `<loc>` will not match `<image:loc>`. */
function readTag(block: string, tag: string): string | null {
  const match = block.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i')
  );
  if (!match) return null;
  const value = decodeXml(match[1]);
  return value.length ? value : null;
}

function parseDate(value: string | null): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

async function fetchXml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: { 'user-agent': USER_AGENT, accept: 'application/xml,text/xml,*/*' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    redirect: 'follow',
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Sitemap fetch failed (${response.status}) for ${url}`);
  }
  return response.text();
}

/**
 * Fetch a sitemap and return every page URL it exposes. Transparently follows
 * <sitemapindex> children (bounded by MAX_INDEX_DEPTH) so passing a root
 * sitemap.xml is enough — the caller does not need to know which kind it is.
 */
export async function fetchSitemapEntries(
  sitemapUrl: string,
  depth = 0
): Promise<SitemapEntry[]> {
  const xml = await fetchXml(sitemapUrl);

  // Sitemap index → recurse into each child sitemap.
  if (/<sitemapindex[\s>]/i.test(xml)) {
    if (depth >= MAX_INDEX_DEPTH) return [];

    const children = extractBlocks(xml, 'sitemap')
      .map((block) => readTag(block, 'loc'))
      .filter((loc): loc is string => Boolean(loc));

    const results = await Promise.allSettled(
      children.map((childUrl) => fetchSitemapEntries(childUrl, depth + 1))
    );

    return results
      .filter(
        (result): result is PromiseFulfilledResult<SitemapEntry[]> =>
          result.status === 'fulfilled'
      )
      .flatMap((result) => result.value)
      .slice(0, MAX_ENTRIES);
  }

  if (/<urlset[\s>]/i.test(xml)) {
    return extractBlocks(xml, 'url')
      .map((block) => {
        const loc = readTag(block, 'loc');
        if (!loc) return null;
        return { url: loc, lastmod: parseDate(readTag(block, 'lastmod')) };
      })
      .filter((entry): entry is SitemapEntry => entry !== null)
      .slice(0, MAX_ENTRIES);
  }

  throw new Error(
    `Unrecognized sitemap format at ${sitemapUrl} (no <urlset> or <sitemapindex>)`
  );
}

/**
 * Fetch every configured sitemap for an agent and return a de-duplicated list.
 * A failure on one sitemap does not sink the others — errors are returned
 * alongside the entries so the run can be marked PARTIAL.
 */
export async function fetchAllSitemapEntries(
  sitemapUrls: string[]
): Promise<{ entries: SitemapEntry[]; errors: string[] }> {
  const settled = await Promise.allSettled(
    sitemapUrls.map((url) => fetchSitemapEntries(url))
  );

  const byUrl = new Map<string, SitemapEntry>();
  const errors: string[] = [];

  settled.forEach((result, index) => {
    if (result.status === 'rejected') {
      const reason =
        result.reason instanceof Error ? result.reason.message : String(result.reason);
      errors.push(`${sitemapUrls[index]}: ${reason}`);
      return;
    }
    for (const entry of result.value) {
      // Keep the first occurrence; sitemaps can list the same URL twice.
      if (!byUrl.has(entry.url)) byUrl.set(entry.url, entry);
    }
  });

  return { entries: [...byUrl.values()], errors };
}
