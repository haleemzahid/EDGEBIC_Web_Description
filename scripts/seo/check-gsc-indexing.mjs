/**
 * GSC URL Inspection API — bulk indexing status checker
 *
 * Usage:
 *   1. Create a Google Cloud project, enable "Google Search Console API"
 *   2. Create a Service Account, add it to your GSC property as Owner/Full User
 *   3. Download the service-account JSON key, save path in env:
 *        GSC_KEY_FILE=path/to/service-account.json
 *   4. Set your GSC property URL in env:
 *        GSC_SITE_URL=sc-domain:usersolutions.com   (or https://usersolutions.com/)
 *   5. Run:
 *        node scripts/seo/check-gsc-indexing.mjs [--sitemap path/to/sitemap.xml]
 *        node scripts/seo/check-gsc-indexing.mjs --url https://usersolutions.com/blog/foo
 *
 * Outputs:
 *   content/seo/gsc-indexing-report.json  — full machine-readable report
 *   content/seo/gsc-indexing-report.md    — human-readable summary
 *
 * Rate limit: GSC URL Inspection API allows 2,000 requests/day per property.
 * The script throttles to 10 req/s by default (adjustable via --rate flag).
 *
 * Requires: npm install googleapis xml2js
 */

import { google } from 'googleapis';
import { parseStringPromise } from 'xml2js';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const OUT_DIR = path.join(ROOT, 'content', 'seo');

// ─── Config (override via env / CLI args) ───────────────────────────────────
const SITE_URL = process.env.GSC_SITE_URL ?? 'sc-domain:usersolutions.com';
const KEY_FILE = process.env.GSC_KEY_FILE ?? null;
const SITEMAP_URL = 'https://usersolutions.com/sitemap.xml';
const REQUESTS_PER_SECOND = 10; // stay well under quota ceiling

// ─── CLI parsing ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const singleUrl = argValue(args, '--url');
const localSitemap = argValue(args, '--sitemap');
const rateOverride = argValue(args, '--rate');
const rps = rateOverride ? parseInt(rateOverride, 10) : REQUESTS_PER_SECOND;
const dryRun = args.includes('--dry-run');

function argValue(arr, flag) {
  const i = arr.indexOf(flag);
  return i !== -1 && i + 1 < arr.length ? arr[i + 1] : null;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
async function buildAuth() {
  if (!KEY_FILE) {
    console.error(
      '\n❌  GSC_KEY_FILE env var is not set.\n' +
      '    Point it at your service-account JSON key file.\n' +
      '    Example: GSC_KEY_FILE=~/secrets/gsc-sa.json node scripts/seo/check-gsc-indexing.mjs\n'
    );
    process.exit(1);
  }
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  return auth.getClient();
}

// ─── Fetch sitemap URLs ───────────────────────────────────────────────────────
async function fetchSitemapUrls(sitemapSource) {
  let xml;
  if (sitemapSource && fs.existsSync(sitemapSource)) {
    xml = fs.readFileSync(sitemapSource, 'utf8');
  } else {
    const url = sitemapSource ?? SITEMAP_URL;
    console.log(`  Fetching sitemap from ${url} …`);
    xml = await httpGet(url);
  }
  const parsed = await parseStringPromise(xml, { explicitArray: false });

  const urls = [];
  // Handle both <urlset> and <sitemapindex>
  if (parsed.urlset?.url) {
    const raw = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
    for (const u of raw) {
      const loc = typeof u === 'string' ? u : u.loc;
      if (loc) urls.push(loc.trim());
    }
  }
  if (parsed.sitemapindex?.sitemap) {
    const subs = Array.isArray(parsed.sitemapindex.sitemap)
      ? parsed.sitemapindex.sitemap
      : [parsed.sitemapindex.sitemap];
    for (const sub of subs) {
      const loc = typeof sub === 'string' ? sub : sub.loc;
      if (loc) {
        console.log(`  Fetching sub-sitemap: ${loc.trim()} …`);
        const subXml = await httpGet(loc.trim());
        const subParsed = await parseStringPromise(subXml, { explicitArray: false });
        if (subParsed.urlset?.url) {
          const raw2 = Array.isArray(subParsed.urlset.url)
            ? subParsed.urlset.url
            : [subParsed.urlset.url];
          for (const u of raw2) {
            const l = typeof u === 'string' ? u : u.loc;
            if (l) urls.push(l.trim());
          }
        }
      }
    }
  }
  return urls;
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// ─── GSC URL Inspection ───────────────────────────────────────────────────────
async function inspectUrl(authClient, inspectionUrl) {
  const sc = google.searchconsole({ version: 'v1', auth: authClient });
  const res = await sc.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl,
      siteUrl: SITE_URL,
    },
  });
  return res.data?.inspectionResult ?? null;
}

// ─── Throttle helper ─────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('GSC Indexing Checker\n');
  console.log(`  Site:      ${SITE_URL}`);
  console.log(`  Rate:      ${rps} req/s`);
  console.log(`  Dry run:   ${dryRun}`);

  // Build URL list
  let urls;
  if (singleUrl) {
    urls = [singleUrl];
    console.log(`  Mode:      single URL`);
  } else {
    console.log(`  Mode:      sitemap (${localSitemap ?? SITEMAP_URL})`);
    urls = await fetchSitemapUrls(localSitemap);
    console.log(`  Found:     ${urls.length} URLs in sitemap\n`);
  }

  if (dryRun) {
    console.log('[dry-run] URLs that would be inspected:');
    urls.forEach((u) => console.log('  ', u));
    return;
  }

  // Auth
  const authClient = await buildAuth();

  // Inspect each URL
  const delayMs = Math.ceil(1000 / rps);
  const results = [];
  const CHUNK = 50; // progress logging interval

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    if (i > 0 && i % CHUNK === 0) {
      const pct = ((i / urls.length) * 100).toFixed(0);
      console.log(`  … ${i}/${urls.length} (${pct}%)`);
    }
    try {
      const result = await inspectUrl(authClient, url);
      const verdict = result?.indexStatusResult?.verdict ?? 'UNKNOWN';
      const coverageState = result?.indexStatusResult?.coverageState ?? '';
      const robotsTxtState = result?.indexStatusResult?.robotsTxtState ?? '';
      const indexingState = result?.indexStatusResult?.indexingState ?? '';
      const lastCrawlTime = result?.indexStatusResult?.lastCrawlTime ?? '';
      const canonicalUrl = result?.indexStatusResult?.googleCanonical ?? '';
      const sitemap = result?.indexStatusResult?.sitemap ?? [];

      results.push({
        url,
        verdict,          // PASS | FAIL | NEUTRAL | VERDICT_UNSPECIFIED
        coverageState,    // "Submitted and indexed", "Crawled - currently not indexed", etc.
        indexingState,    // INDEXING_ALLOWED | BLOCKED_BY_META_TAG | BLOCKED_BY_HTTP_HEADER | etc.
        robotsTxtState,   // ALLOWED | DISALLOWED
        lastCrawlTime,
        canonicalUrl,
        sitemapPresent: sitemap.length > 0,
      });
    } catch (err) {
      results.push({ url, verdict: 'ERROR', error: err.message });
    }
    await sleep(delayMs);
  }

  // ─── Categorise ───────────────────────────────────────────────────────────
  const indexed = results.filter((r) => r.verdict === 'PASS');
  const notIndexed = results.filter((r) => r.verdict !== 'PASS' && r.verdict !== 'ERROR');
  const errors = results.filter((r) => r.verdict === 'ERROR');

  // Group non-indexed by coverageState
  const byState = {};
  for (const r of notIndexed) {
    const key = r.coverageState || r.verdict;
    byState[key] = byState[key] ?? [];
    byState[key].push(r.url);
  }

  // ─── Write JSON ───────────────────────────────────────────────────────────
  const jsonOut = path.join(OUT_DIR, 'gsc-indexing-report.json');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(jsonOut, JSON.stringify({ generatedAt: new Date().toISOString(), siteUrl: SITE_URL, total: results.length, indexed: indexed.length, notIndexed: notIndexed.length, errors: errors.length, byState, results }, null, 2));
  console.log(`\n  JSON written → ${jsonOut}`);

  // ─── Write Markdown ───────────────────────────────────────────────────────
  const lines = [
    `# GSC Indexing Report`,
    ``,
    `Generated: ${new Date().toISOString()}  `,
    `Site: \`${SITE_URL}\`  `,
    `Total URLs checked: **${results.length}**`,
    ``,
    `| Status | Count |`,
    `|--------|-------|`,
    `| ✅ Indexed | ${indexed.length} |`,
    `| ❌ Not indexed | ${notIndexed.length} |`,
    `| ⚠️ API error | ${errors.length} |`,
    ``,
  ];

  if (Object.keys(byState).length > 0) {
    lines.push(`## Not-indexed breakdown by coverage state`);
    lines.push(``);
    for (const [state, stateUrls] of Object.entries(byState).sort((a, b) => b[1].length - a[1].length)) {
      lines.push(`### ${state} (${stateUrls.length})`);
      lines.push(``);
      for (const u of stateUrls) lines.push(`- ${u}`);
      lines.push(``);
    }
  }

  if (errors.length > 0) {
    lines.push(`## API errors`);
    lines.push(``);
    for (const r of errors) lines.push(`- ${r.url} — \`${r.error}\``);
    lines.push(``);
  }

  if (indexed.length > 0) {
    lines.push(`## Indexed pages (${indexed.length})`);
    lines.push(``);
    for (const r of indexed) {
      lines.push(`- ${r.url}${r.lastCrawlTime ? ` _(last crawled ${r.lastCrawlTime.slice(0, 10)})_` : ''}`);
    }
  }

  const mdOut = path.join(OUT_DIR, 'gsc-indexing-report.md');
  fs.writeFileSync(mdOut, lines.join('\n'));
  console.log(`  MD  written → ${mdOut}`);

  // ─── Console summary ──────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  ✅ Indexed:      ${indexed.length}`);
  console.log(`  ❌ Not indexed:  ${notIndexed.length}`);
  if (errors.length) console.log(`  ⚠️  API errors:   ${errors.length}`);
  console.log(`${'─'.repeat(60)}\n`);

  if (notIndexed.length > 0) {
    console.log('Not-indexed breakdown:');
    for (const [state, stateUrls] of Object.entries(byState).sort((a, b) => b[1].length - a[1].length)) {
      console.log(`  ${stateUrls.length.toString().padStart(4)}  ${state}`);
    }
    console.log('');
  }
}

main().catch((err) => {
  console.error('\nFatal:', err.message);
  process.exit(1);
});
