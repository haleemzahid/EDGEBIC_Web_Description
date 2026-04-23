#!/usr/bin/env node
/**
 * crawl-site-audit.mjs — Full-site internal link crawler & auditor
 *
 * Crawls every page on the local dev/production server, extracts <a href> links
 * from rendered HTML, and reports:
 *   1. Broken links (4xx / 5xx)
 *   2. Redirect chains (links pointing to URLs that 30x)
 *   3. Noindex pages receiving inbound internal links
 *   4. Orphan pages (in sitemap but zero inbound links)
 *   5. Non-sitemap pages (discovered by crawling but not in sitemap)
 *
 * Usage:
 *   node scripts/seo/crawl-site-audit.mjs [--base http://localhost:3000]
 *
 * Outputs:
 *   content/seo/site-crawl-audit.json   (machine-readable)
 *   content/seo/site-crawl-audit.md     (human-readable)
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as htmlparser2 from 'htmlparser2';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');
const OUT_DIR = resolve(ROOT, 'content/seo');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const baseFlag = process.argv.find(a => a.startsWith('--base='));
const baseIdx = process.argv.indexOf('--base');
const BASE = baseFlag
  ? baseFlag.split('=')[1]
  : (baseIdx !== -1 && baseIdx + 1 < process.argv.length)
    ? process.argv[baseIdx + 1]
    : 'http://localhost:3000';

const CONCURRENCY = 5;
const FETCH_TIMEOUT = 30_000; // 30s per request
const MAX_RETRIES = 2;

// Paths to skip when discovering / crawling
const SKIP_PREFIXES = [
  '/_next/', '/api/', '/favicon', '/manifest', '/robots.txt',
  '/sitemap.xml', '/llms.txt', '/llms-full.txt', '/opengraph-image',
  '/sw.js', '/workbox-',
];
const SKIP_EXTENSIONS = [
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico',
  '.css', '.js', '.mjs', '.map', '.woff', '.woff2', '.ttf', '.eot',
  '.pdf', '.zip', '.xml', '.json', '.txt', '.mp4', '.webm', '.mp3',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Normalise a URL to a path string (no trailing slash except root) */
function normalisePath(href, currentPath = '/') {
  if (!href) return null;

  // Skip non-http links
  if (/^(mailto:|tel:|javascript:|data:|#|blob:)/i.test(href)) return null;

  let url;
  try {
    if (href.startsWith('http://') || href.startsWith('https://')) {
      url = new URL(href);
      // Only follow links to same origin
      const base = new URL(BASE);
      if (url.hostname !== base.hostname && url.hostname !== 'localhost' &&
          url.hostname !== 'usersolutions.com' && url.hostname !== 'www.usersolutions.com') {
        return null; // external
      }
    } else if (href.startsWith('/')) {
      url = new URL(href, BASE);
    } else {
      // Relative URL
      url = new URL(href, `${BASE}${currentPath}`);
    }
  } catch {
    return null;
  }

  let path = url.pathname;
  // Strip trailing slash (keep root /)
  if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
  // Skip assets / api / internal
  if (SKIP_PREFIXES.some(p => path.startsWith(p))) return null;
  const lower = path.toLowerCase();
  if (SKIP_EXTENSIONS.some(ext => lower.endsWith(ext))) return null;

  return path;
}

/** Extract all <a href="..."> and detect <meta name="robots" content="noindex"> */
function parseHtml(html, currentPath) {
  const links = [];       // { path, anchorText }
  const canonicals = [];  // canonical link hrefs
  let isNoindex = false;
  let currentAnchorText = '';
  let insideAnchor = false;
  let currentHref = null;

  const parser = new htmlparser2.Parser({
    onopentag(name, attribs) {
      if (name === 'a' && attribs.href) {
        const path = normalisePath(attribs.href, currentPath);
        if (path) {
          insideAnchor = true;
          currentHref = path;
          currentAnchorText = '';
        }
      }
      if (name === 'meta') {
        const nameAttr = (attribs.name || '').toLowerCase();
        const content = (attribs.content || '').toLowerCase();
        if (nameAttr === 'robots' && content.includes('noindex')) {
          isNoindex = true;
        }
      }
      if (name === 'link' && (attribs.rel || '').toLowerCase() === 'canonical') {
        canonicals.push(attribs.href || '');
      }
    },
    ontext(text) {
      if (insideAnchor) {
        currentAnchorText += text;
      }
    },
    onclosetag(name) {
      if (name === 'a' && insideAnchor) {
        links.push({ path: currentHref, anchorText: currentAnchorText.trim().slice(0, 120) });
        insideAnchor = false;
        currentHref = null;
        currentAnchorText = '';
      }
    },
  }, { decodeEntities: true });

  parser.write(html);
  parser.end();

  return { links, isNoindex, canonicals };
}

/** Fetch with timeout, manual redirect control, and retry */
async function fetchPage(url, followRedirects = false, retries = MAX_RETRIES) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    try {
      const resp = await fetch(url, {
        signal: controller.signal,
        redirect: followRedirects ? 'follow' : 'manual',
        headers: { 'User-Agent': 'SiteCrawlAudit/1.0' },
      });
      clearTimeout(timer);
      return resp;
    } catch (err) {
      clearTimeout(timer);
      if (attempt < retries) {
        // Wait briefly before retrying
        await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
        continue;
      }
      return { ok: false, status: 0, statusText: err.message, text: async () => '', headers: { get: () => null } };
    }
  }
}

/** Run tasks with concurrency limit */
async function pool(tasks, concurrency) {
  const results = [];
  let idx = 0;
  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker()));
  return results;
}

// ---------------------------------------------------------------------------
// Sitemap parsing
// ---------------------------------------------------------------------------
async function fetchSitemap() {
  const paths = new Set();

  async function parseSitemapUrl(url) {
    const resp = await fetchPage(url, true);
    if (resp.status !== 200) {
      console.warn(`  ⚠ Could not fetch sitemap: ${url} (${resp.status})`);
      return;
    }
    const xml = await resp.text();

    // Check if this is a sitemap index
    const sitemapLocs = [];
    const urlLocs = [];
    let inSitemapLoc = false;
    let inUrlLoc = false;
    let currentText = '';

    const parser = new htmlparser2.Parser({
      onopentag(name) {
        if (name === 'loc') {
          // Determine parent context from accumulated state
          currentText = '';
          // We'll figure out which type after text
        }
      },
      ontext(text) { currentText += text; },
      onclosetag(name) {
        if (name === 'loc' && currentText.trim()) {
          const loc = currentText.trim();
          if (loc.endsWith('.xml') || loc.includes('sitemap')) {
            sitemapLocs.push(loc);
          } else {
            urlLocs.push(loc);
          }
        }
      },
    }, { xmlMode: true, decodeEntities: true });
    parser.write(xml);
    parser.end();

    // If it's a sitemap index, recurse into child sitemaps
    if (sitemapLocs.length > 0 && urlLocs.length === 0) {
      for (const loc of sitemapLocs) {
        await parseSitemapUrl(loc);
      }
      return;
    }

    // Otherwise, extract URL paths
    for (const loc of urlLocs) {
      const path = normalisePath(loc);
      if (path) paths.add(path);
    }
    // Also handle mixed (both sitemap refs and url refs)
    for (const loc of sitemapLocs) {
      await parseSitemapUrl(loc);
    }
  }

  await parseSitemapUrl(`${BASE}/sitemap.xml`);
  return paths;
}

// ---------------------------------------------------------------------------
// Main crawler
// ---------------------------------------------------------------------------
async function main() {
  console.log(`\n🕷  Site Crawl Audit`);
  console.log(`   Base: ${BASE}`);
  console.log(`   Concurrency: ${CONCURRENCY}\n`);

  // 1. Preflight
  console.log('1/5  Checking server...');
  const preflight = await fetchPage(BASE, true);
  if (!preflight.ok && preflight.status !== 200) {
    console.error(`   ✗ Server not reachable at ${BASE} (status: ${preflight.status})`);
    console.error('   Start the dev server first: npm run dev');
    process.exit(1);
  }
  console.log('   ✓ Server is running\n');

  // 2. Fetch sitemap
  console.log('2/5  Fetching sitemap...');
  const sitemapPaths = await fetchSitemap();
  console.log(`   ✓ ${sitemapPaths.size} URLs in sitemap\n`);

  // 3. Crawl
  console.log('3/5  Crawling pages...');
  const crawled = new Map();    // path → { status, isNoindex, links[], canonical }
  const toCrawl = new Set([...sitemapPaths, '/']);
  const discovered = new Set(); // paths found by crawling but not in original seed
  let crawlCount = 0;

  async function crawlPath(path) {
    if (crawled.has(path)) return;
    crawled.set(path, null); // mark as in-progress

    const resp = await fetchPage(`${BASE}${path}`, false);
    const status = resp.status;
    let redirectTarget = null;

    if (status >= 300 && status < 400) {
      const location = resp.headers.get('location');
      if (location) {
        redirectTarget = normalisePath(location, path);
      }
    }

    let links = [];
    let isNoindex = false;
    let canonical = null;

    if (status === 200) {
      const html = await resp.text();
      const parsed = parseHtml(html, path);
      links = parsed.links;
      isNoindex = parsed.isNoindex;
      canonical = parsed.canonicals[0] || null;

      // Discover new paths
      for (const link of parsed.links) {
        if (!crawled.has(link.path) && !toCrawl.has(link.path)) {
          toCrawl.add(link.path);
          discovered.add(link.path);
        }
      }
    }

    crawled.set(path, { status, isNoindex, links, canonical, redirectTarget });
    crawlCount++;
    if (crawlCount % 50 === 0) {
      process.stdout.write(`   ... crawled ${crawlCount} pages (queue: ${[...toCrawl].filter(p => !crawled.has(p)).length} remaining)\n`);
    }
  }

  // Iterative crawl: process queue in batches
  while (true) {
    const pending = [...toCrawl].filter(p => !crawled.has(p));
    if (pending.length === 0) break;

    const batch = pending.slice(0, CONCURRENCY * 5);
    const tasks = batch.map(p => () => crawlPath(p));
    await pool(tasks, CONCURRENCY);
  }
  console.log(`   ✓ Crawled ${crawled.size} pages (${discovered.size} discovered beyond sitemap)\n`);

  // 4. HEAD-check any discovered but uncrawled paths
  console.log('4/5  Validating discovered URLs...');
  const unchecked = [...discovered].filter(p => !crawled.has(p));
  if (unchecked.length > 0) {
    const tasks = unchecked.map(p => async () => {
      const resp = await fetchPage(`${BASE}${p}`, false);
      crawled.set(p, {
        status: resp.status,
        isNoindex: false,
        links: [],
        canonical: null,
        redirectTarget: resp.status >= 300 && resp.status < 400
          ? normalisePath(resp.headers.get('location') || '', p)
          : null,
      });
    });
    await pool(tasks, CONCURRENCY);
  }
  console.log(`   ✓ All URLs validated\n`);

  // 5. Analyse
  console.log('5/5  Analysing...');

  // Build inbound link map: target → [{source, anchorText}]
  const inboundMap = new Map(); // path → [{source, anchorText}]
  let totalInternalLinks = 0;
  let totalExternalSkipped = 0;

  for (const [sourcePath, data] of crawled) {
    if (!data || !data.links) continue;
    for (const link of data.links) {
      totalInternalLinks++;
      if (!inboundMap.has(link.path)) inboundMap.set(link.path, []);
      inboundMap.get(link.path).push({ source: sourcePath, anchorText: link.anchorText });
    }
  }

  // --- Broken links (4xx/5xx) ---
  // Status 0 = fetch timeout (not a real broken link — page may render fine in browser)
  const brokenLinks = [];
  const timeoutLinks = [];
  for (const [sourcePath, data] of crawled) {
    if (!data || !data.links) continue;
    for (const link of data.links) {
      const targetData = crawled.get(link.path);
      if (!targetData) continue;
      if (targetData.status >= 400) {
        brokenLinks.push({
          source: sourcePath,
          target: link.path,
          status: targetData.status,
          anchorText: link.anchorText,
        });
      } else if (targetData.status === 0) {
        timeoutLinks.push({
          source: sourcePath,
          target: link.path,
          status: 0,
          anchorText: link.anchorText,
        });
      }
    }
  }
  // Deduplicate broken links (same source→target pair)
  const brokenDeduped = [];
  const brokenSeen = new Set();
  for (const b of brokenLinks) {
    const key = `${b.source}→${b.target}`;
    if (!brokenSeen.has(key)) {
      brokenSeen.add(key);
      brokenDeduped.push(b);
    }
  }

  // Deduplicate timeout targets (just unique targets + count)
  const timeoutTargets = new Map(); // target → count
  for (const t of timeoutLinks) {
    timeoutTargets.set(t.target, (timeoutTargets.get(t.target) || 0) + 1);
  }

  // --- Redirect chains ---
  const redirectTargets = new Map(); // path → { finalDest, status, inboundCount }
  for (const [path, data] of crawled) {
    if (!data) continue;
    if (data.status >= 300 && data.status < 400 && data.redirectTarget) {
      const inbound = inboundMap.get(path) || [];
      redirectTargets.set(path, {
        finalDest: data.redirectTarget,
        status: data.status,
        inboundCount: inbound.length,
        sources: inbound.slice(0, 5).map(s => s.source),
      });
    }
  }

  // --- Noindex pages with inbound links ---
  const noindexWithLinks = [];
  for (const [path, data] of crawled) {
    if (!data || !data.isNoindex) continue;
    const inbound = inboundMap.get(path) || [];
    if (inbound.length > 0) {
      noindexWithLinks.push({
        target: path,
        inboundCount: inbound.length,
        sources: inbound.slice(0, 10).map(s => s.source),
      });
    }
  }

  // --- Orphan pages (in sitemap, zero inbound) ---
  const orphanPages = [];
  for (const path of sitemapPaths) {
    const inbound = inboundMap.get(path) || [];
    if (inbound.length === 0 && path !== '/') {
      const data = crawled.get(path);
      orphanPages.push({
        path,
        status: data?.status || 'unknown',
        inSitemap: true,
      });
    }
  }

  // --- Non-sitemap pages (discovered but not in sitemap, status 200) ---
  const nonSitemapPages = [];
  for (const path of discovered) {
    if (!sitemapPaths.has(path)) {
      const data = crawled.get(path);
      if (data && data.status === 200 && !data.isNoindex) {
        const inbound = inboundMap.get(path) || [];
        nonSitemapPages.push({
          path,
          inboundCount: inbound.length,
          sources: inbound.slice(0, 5).map(s => s.source),
        });
      }
    }
  }

  // --- Summary stats ---
  const summary = {
    sitemapUrls: sitemapPaths.size,
    pagesCrawled: crawled.size,
    totalInternalLinks,
    brokenLinks: brokenDeduped.length,
    timeoutPages: timeoutTargets.size,
    redirectChains: redirectTargets.size,
    noindexWithInbound: noindexWithLinks.length,
    orphanPages: orphanPages.length,
    nonSitemapPages: nonSitemapPages.length,
  };

  console.log(`   ✓ Analysis complete\n`);
  console.log(`   Summary:`);
  console.log(`     Sitemap URLs:          ${summary.sitemapUrls}`);
  console.log(`     Pages crawled:         ${summary.pagesCrawled}`);
  console.log(`     Internal links:        ${summary.totalInternalLinks}`);
  console.log(`     Broken links (4xx+):   ${summary.brokenLinks}`);
  console.log(`     Timeout pages:         ${summary.timeoutPages}`);
  console.log(`     Redirect chains:       ${summary.redirectChains}`);
  console.log(`     Noindex w/ inbound:    ${summary.noindexWithInbound}`);
  console.log(`     Orphan pages:          ${summary.orphanPages}`);
  console.log(`     Non-sitemap pages:     ${summary.nonSitemapPages}`);

  // --- Write outputs ---
  mkdirSync(OUT_DIR, { recursive: true });

  // JSON output
  const jsonData = {
    generated: new Date().toISOString(),
    base: BASE,
    summary,
    brokenLinks: brokenDeduped.sort((a, b) => a.target.localeCompare(b.target)),
    timeoutPages: [...timeoutTargets.entries()]
      .map(([path, count]) => ({ path, inboundLinkCount: count }))
      .sort((a, b) => b.inboundLinkCount - a.inboundLinkCount),
    redirectChains: [...redirectTargets.entries()]
      .map(([path, d]) => ({ target: path, ...d }))
      .sort((a, b) => b.inboundCount - a.inboundCount),
    noindexWithInbound: noindexWithLinks.sort((a, b) => b.inboundCount - a.inboundCount),
    orphanPages: orphanPages.sort((a, b) => a.path.localeCompare(b.path)),
    nonSitemapPages: nonSitemapPages.sort((a, b) => b.inboundCount - a.inboundCount),
  };
  writeFileSync(resolve(OUT_DIR, 'site-crawl-audit.json'), JSON.stringify(jsonData, null, 2));

  // Markdown output
  const md = [];
  md.push(`# Site Crawl Audit — usersolutions.com`);
  md.push(`Generated: ${new Date().toISOString().slice(0, 10)} | Base: ${BASE}\n`);

  md.push(`## Summary`);
  md.push(`| Metric | Count |`);
  md.push(`|--------|------:|`);
  md.push(`| Sitemap URLs | ${summary.sitemapUrls} |`);
  md.push(`| Pages crawled | ${summary.pagesCrawled} |`);
  md.push(`| Internal links | ${summary.totalInternalLinks} |`);
  md.push(`| Broken links (4xx/5xx) | ${summary.brokenLinks} |`);
  md.push(`| Timeout pages (status 0) | ${summary.timeoutPages} |`);
  md.push(`| Redirect chains | ${summary.redirectChains} |`);
  md.push(`| Noindex with inbound | ${summary.noindexWithInbound} |`);
  md.push(`| Orphan pages | ${summary.orphanPages} |`);
  md.push(`| Non-sitemap pages | ${summary.nonSitemapPages} |`);
  md.push('');

  // Broken links
  if (brokenDeduped.length > 0) {
    md.push(`## Broken Links (${brokenDeduped.length})`);
    md.push(`| Source | Target | Status | Anchor Text |`);
    md.push(`|--------|--------|-------:|-------------|`);
    for (const b of brokenDeduped) {
      md.push(`| \`${b.source}\` | \`${b.target}\` | ${b.status} | ${b.anchorText || '—'} |`);
    }
    md.push('');
  } else {
    md.push(`## Broken Links\n✅ None found.\n`);
  }

  // Timeout pages
  if (timeoutTargets.size > 0) {
    md.push(`## Timeout Pages (${timeoutTargets.size})`);
    md.push(`Pages that timed out during crawl (status 0). Usually caused by slow SSR in dev mode — likely fine in production. Re-run with \`--base https://usersolutions.com\` to verify.\n`);
    md.push(`| Target | Links Pointing Here |`);
    md.push(`|--------|-------------------:|`);
    for (const [path, count] of [...timeoutTargets.entries()].sort((a, b) => b[1] - a[1])) {
      md.push(`| \`${path}\` | ${count} |`);
    }
    md.push('');
  } else {
    md.push(`## Timeout Pages\n✅ None.\n`);
  }

  // Redirect chains
  if (redirectTargets.size > 0) {
    md.push(`## Redirect Chains (${redirectTargets.size})`);
    md.push(`Links pointing to URLs that redirect — wastes crawl budget.\n`);
    md.push(`| Target | Final Destination | Status | Inbound Count | Sample Sources |`);
    md.push(`|--------|-------------------|-------:|--------------:|----------------|`);
    for (const [path, d] of [...redirectTargets.entries()].sort((a, b) => b[1].inboundCount - a[1].inboundCount)) {
      md.push(`| \`${path}\` | \`${d.finalDest}\` | ${d.status} | ${d.inboundCount} | ${d.sources.map(s => `\`${s}\``).join(', ') || '—'} |`);
    }
    md.push('');
  } else {
    md.push(`## Redirect Chains\n✅ None found.\n`);
  }

  // Noindex with inbound
  if (noindexWithLinks.length > 0) {
    md.push(`## Noindex Pages Receiving Links (${noindexWithLinks.length})`);
    md.push(`These pages are noindex but have internal links pointing to them — wasted link equity.\n`);
    md.push(`| Target | Inbound Links | Sources |`);
    md.push(`|--------|-------------:|---------|`);
    for (const n of noindexWithLinks) {
      md.push(`| \`${n.target}\` | ${n.inboundCount} | ${n.sources.map(s => `\`${s}\``).join(', ')} |`);
    }
    md.push('');
  } else {
    md.push(`## Noindex Pages Receiving Links\n✅ None found.\n`);
  }

  // Orphan pages
  if (orphanPages.length > 0) {
    md.push(`## Orphan Pages (${orphanPages.length})`);
    md.push(`In sitemap but zero inbound internal links — search engines may not discover these.\n`);
    md.push(`| Path | Status |`);
    md.push(`|------|-------:|`);
    for (const o of orphanPages) {
      md.push(`| \`${o.path}\` | ${o.status} |`);
    }
    md.push('');
  } else {
    md.push(`## Orphan Pages\n✅ None found.\n`);
  }

  // Non-sitemap pages
  if (nonSitemapPages.length > 0) {
    md.push(`## Non-Sitemap Pages (${nonSitemapPages.length})`);
    md.push(`Indexable pages discovered by crawling but missing from sitemap.xml.\n`);
    md.push(`| Path | Inbound Count | Sample Sources |`);
    md.push(`|------|-------------:|----------------|`);
    for (const n of nonSitemapPages) {
      md.push(`| \`${n.path}\` | ${n.inboundCount} | ${n.sources.map(s => `\`${s}\``).join(', ') || '—'} |`);
    }
    md.push('');
  } else {
    md.push(`## Non-Sitemap Pages\n✅ None found.\n`);
  }

  writeFileSync(resolve(OUT_DIR, 'site-crawl-audit.md'), md.join('\n'));

  console.log(`\n📄 Reports written:`);
  console.log(`   content/seo/site-crawl-audit.json`);
  console.log(`   content/seo/site-crawl-audit.md\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
