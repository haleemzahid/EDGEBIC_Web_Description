#!/usr/bin/env node
/**
 * audit-internal-links.mjs
 *
 * Walks every `content/blog/*.mdx` file, extracts every internal link
 * (markdown `[text](/path)`, HTML `href="/path"`, absolute
 * `https://usersolutions.com/path`), and validates each target against:
 *
 *   1. All blog MDX slugs → /blog/{slug}
 *   2. Glossary MDX slugs → /blog/glossary/{slug-without-glossary-prefix}
 *   3. All marketing page routes under app/(app)/(marketing)/**\/page.tsx
 *      (static routes + dynamic [slug] patterns treated as prefix matches)
 *   4. All redirect sources from next.config.mjs
 *   5. A small hand-maintained whitelist of known-good non-route paths
 *      (API endpoints, public files, etc.)
 *
 * Broken, mismatched, and suspicious links are written to
 * `content/seo/internal-link-audit.md` (human-readable)
 * and `internal-link-audit.json` (machine-readable).
 *
 * Safe to re-run. Does not modify any source files.
 *
 * CRITICAL: Like every other scripts/seo/*.mjs file, this strips UTF-8
 * BOM from MDX frontmatter — 13 manufacturing-kpis posts have it and a
 * naive parser would silently skip them.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const MARKETING_DIR = path.join(ROOT, 'app', '(app)', '(marketing)');
const APP_DIR = path.join(ROOT, 'app');
const NEXT_CONFIG = path.join(ROOT, 'next.config.mjs');
const OUT_DIR = path.join(ROOT, 'content', 'seo');
const OUT_MD = path.join(OUT_DIR, 'internal-link-audit.md');
const OUT_JSON = path.join(OUT_DIR, 'internal-link-audit.json');

// --------------------------------------------------------------------------
// Whitelist — paths that are valid but not derivable from filesystem routes
// --------------------------------------------------------------------------
const WHITELIST_EXACT = new Set([
  '/',
  '/llms.txt',
  '/llms-full.txt',
  '/sitemap.xml',
  '/robots.txt',
  '/favicon.ico'
]);

const WHITELIST_PREFIX = [
  '/api/',
  '/_next/',
  '/images/',
  '/static/',
  '/marketing/',
  '/fonts/',
  '/assets/',
  '/dashboard/' // auth-gated app — we don't route-check these from blog links
];

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------
function stripBom(text) {
  if (text.charCodeAt(0) === 0xfeff) return text.slice(1);
  return text;
}

function readText(filePath) {
  return stripBom(fs.readFileSync(filePath, 'utf8'));
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function normalizeRoute(raw) {
  if (!raw) return raw;
  let r = raw.trim();
  // Strip hash and query
  const hashIdx = r.indexOf('#');
  if (hashIdx >= 0) r = r.slice(0, hashIdx);
  const qIdx = r.indexOf('?');
  if (qIdx >= 0) r = r.slice(0, qIdx);
  // Strip trailing slash (but preserve root)
  if (r.length > 1 && r.endsWith('/')) r = r.slice(0, -1);
  return r;
}

// --------------------------------------------------------------------------
// Build blog slug index
// --------------------------------------------------------------------------
function buildBlogIndex() {
  const blogSlugs = new Set();
  const glossarySlugs = new Set();
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'));
  for (const f of files) {
    const slug = f.replace(/\.mdx$/, '');
    blogSlugs.add(slug);
    if (slug.startsWith('glossary-')) {
      glossarySlugs.add(slug.slice('glossary-'.length));
    }
  }
  return { blogSlugs, glossarySlugs, totalPosts: files.length };
}

// --------------------------------------------------------------------------
// Build marketing route index
// --------------------------------------------------------------------------
// Walks app/ for every page.tsx, derives the URL path by stripping (group)
// segments and converting to a route. Dynamic [slug] and [[...slug]] are
// tracked as patterns with a fixed parent prefix that dynamic paths can
// match against.
function buildRouteIndex() {
  const staticRoutes = new Set();
  const dynamicPrefixes = []; // array of { prefix, catchAll }
  const pageFiles = walk(APP_DIR).filter((f) => f.endsWith('page.tsx') || f.endsWith('page.ts'));
  for (const file of pageFiles) {
    const rel = path.relative(APP_DIR, file).replace(/\\/g, '/');
    // Drop the trailing /page.tsx
    const segments = rel.split('/').slice(0, -1);
    // Skip (group) segments; route segments start with "("
    let isDynamic = false;
    let isCatchAll = false;
    const parts = [];
    for (const seg of segments) {
      if (!seg) continue;
      if (seg.startsWith('(') && seg.endsWith(')')) continue; // (app), (marketing), (group)
      if (seg.startsWith('[[') && seg.endsWith(']]')) {
        // optional catch-all: [[...slug]]
        isDynamic = true;
        isCatchAll = true;
        break;
      }
      if (seg.startsWith('[') && seg.endsWith(']')) {
        if (seg.startsWith('[...')) {
          isDynamic = true;
          isCatchAll = true;
          break;
        }
        isDynamic = true;
        break;
      }
      parts.push(seg);
    }
    const prefix = '/' + parts.join('/');
    if (isDynamic) {
      dynamicPrefixes.push({ prefix, catchAll: isCatchAll });
    } else {
      staticRoutes.add(prefix === '/' ? '/' : prefix.replace(/\/$/, ''));
    }
  }
  return { staticRoutes, dynamicPrefixes };
}

// --------------------------------------------------------------------------
// Parse redirects from next.config.mjs
// --------------------------------------------------------------------------
function buildRedirectIndex() {
  const redirects = new Set();
  if (!fs.existsSync(NEXT_CONFIG)) return redirects;
  const raw = readText(NEXT_CONFIG);
  // Simple regex — all redirects use `source: '/...'`
  const re = /source:\s*['"`]([^'"`]+)['"`]/g;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const src = m[1];
    // Ignore wildcard sources like '(.*)' for headers section (different key)
    // We only care about true redirect sources — but the regex above also
    // matches header sources. That's fine: headers sources never appear as
    // blog link targets, so them being in the valid-set is harmless.
    if (!src.startsWith('/')) continue;
    if (src.includes('(') || src.includes(':')) continue; // regex/pattern sources
    redirects.add(normalizeRoute(src));
  }
  return redirects;
}

// --------------------------------------------------------------------------
// Extract links from an MDX file
// --------------------------------------------------------------------------
// Returns: array of { raw, path, line, kind }
// kind ∈ { 'markdown', 'href', 'absolute' }
function extractLinks(filePath) {
  const body = readText(filePath);
  const lines = body.split(/\r?\n/);
  const links = [];
  // Markdown: [text](/path) or [text](/path "title")
  const mdRe = /\[[^\]]*\]\((\/[^)\s"']*)(?:\s+"[^"]*")?\)/g;
  // HTML attribute: href="/path" or href='/path'
  const hrefRe = /href=["'](\/[^"'#]*)["']/g;
  // Absolute self-links: https://usersolutions.com/path
  const absRe = /https?:\/\/(?:www\.)?usersolutions\.com(\/[^\s)"'<>]*)?/g;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m;
    while ((m = mdRe.exec(line)) !== null) {
      links.push({ raw: m[1], path: normalizeRoute(m[1]), line: i + 1, kind: 'markdown' });
    }
    while ((m = hrefRe.exec(line)) !== null) {
      links.push({ raw: m[1], path: normalizeRoute(m[1]), line: i + 1, kind: 'href' });
    }
    while ((m = absRe.exec(line)) !== null) {
      const p = m[1] || '/';
      links.push({ raw: m[0], path: normalizeRoute(p), line: i + 1, kind: 'absolute' });
    }
    mdRe.lastIndex = 0;
    hrefRe.lastIndex = 0;
    absRe.lastIndex = 0;
  }
  return links;
}

// --------------------------------------------------------------------------
// Validate a link
// --------------------------------------------------------------------------
function validate(target, indices) {
  const { blogSlugs, glossarySlugs, staticRoutes, dynamicPrefixes, redirects } = indices;

  if (!target || target === '') return { ok: false, reason: 'empty' };
  if (!target.startsWith('/')) return { ok: true, reason: 'external' };

  // Whitelist checks
  if (WHITELIST_EXACT.has(target)) return { ok: true };
  if (WHITELIST_PREFIX.some((p) => target.startsWith(p))) return { ok: true };

  // Redirect source
  if (redirects.has(target)) return { ok: true, reason: 'redirect-source' };

  // /blog/glossary/{slug} — glossary-specific route
  if (target.startsWith('/blog/glossary/')) {
    const slug = target.slice('/blog/glossary/'.length);
    if (!slug) return { ok: false, reason: 'missing-glossary-slug' };
    if (glossarySlugs.has(slug)) return { ok: true };
    return { ok: false, reason: `glossary-term-not-found: ${slug}` };
  }

  // /blog/{slug}
  if (target === '/blog') return { ok: true, reason: 'blog-root' };
  if (target.startsWith('/blog/')) {
    const slug = target.slice('/blog/'.length);
    if (!slug) return { ok: false, reason: 'missing-blog-slug' };
    if (blogSlugs.has(slug)) return { ok: true };
    return { ok: false, reason: `blog-post-not-found: ${slug}` };
  }

  // /blogs (listing) — OK if exactly /blogs
  if (target === '/blogs') return { ok: true };
  // /blogs/{slug} — only OK if there's a /blogs/{slug} static route, otherwise
  // it was probably meant to be /blog/{slug} (old convention).
  if (target.startsWith('/blogs/')) {
    if (staticRoutes.has(target)) return { ok: true };
    const suggested = '/blog/' + target.slice('/blogs/'.length);
    return {
      ok: false,
      reason: 'old-blogs-convention',
      suggestion: suggested
    };
  }

  // Static marketing routes
  if (staticRoutes.has(target)) return { ok: true };

  // Dynamic routes: match if target starts with a known dynamic prefix
  for (const { prefix, catchAll } of dynamicPrefixes) {
    if (prefix === '/') {
      if (catchAll) return { ok: true };
      // optional catch-all at root: [[...slug]] — matches anything
      continue;
    }
    if (target === prefix || target.startsWith(prefix + '/')) {
      return { ok: true };
    }
  }

  return { ok: false, reason: 'no-matching-route' };
}

// --------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------
function main() {
  console.log('Building indices…');
  const blog = buildBlogIndex();
  const { staticRoutes, dynamicPrefixes } = buildRouteIndex();
  const redirects = buildRedirectIndex();
  const indices = {
    blogSlugs: blog.blogSlugs,
    glossarySlugs: blog.glossarySlugs,
    staticRoutes,
    dynamicPrefixes,
    redirects
  };

  console.log(`  ${blog.totalPosts} blog posts (${blog.glossarySlugs.size} glossary)`);
  console.log(`  ${staticRoutes.size} static marketing routes`);
  console.log(`  ${dynamicPrefixes.length} dynamic route prefixes`);
  console.log(`  ${redirects.size} redirect sources`);

  console.log('Extracting and validating internal links…');
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  const broken = [];
  const brokenByTarget = new Map();
  const brokenByFile = new Map();
  let totalLinks = 0;
  let totalInternalLinks = 0;

  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const links = extractLinks(fullPath);
    totalLinks += links.length;
    for (const link of links) {
      if (!link.path.startsWith('/')) continue;
      totalInternalLinks++;
      const result = validate(link.path, indices);
      if (!result.ok) {
        const entry = {
          file,
          line: link.line,
          kind: link.kind,
          raw: link.raw,
          target: link.path,
          reason: result.reason,
          suggestion: result.suggestion
        };
        broken.push(entry);
        brokenByTarget.set(
          link.path,
          (brokenByTarget.get(link.path) || 0) + 1
        );
        brokenByFile.set(file, (brokenByFile.get(file) || 0) + 1);
      }
    }
  }

  // --------------------------------------------------------------------------
  // Write outputs
  // --------------------------------------------------------------------------
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const topTargets = [...brokenByTarget.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30);
  const topFiles = [...brokenByFile.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30);

  const json = {
    generatedAt: new Date().toISOString(),
    totalPosts: blog.totalPosts,
    totalLinks,
    totalInternalLinks,
    brokenCount: broken.length,
    uniqueBrokenTargets: brokenByTarget.size,
    filesWithBroken: brokenByFile.size,
    topBrokenTargets: topTargets.map(([t, c]) => ({ target: t, count: c })),
    topBrokenFiles: topFiles.map(([f, c]) => ({ file: f, count: c })),
    broken
  };
  fs.writeFileSync(OUT_JSON, JSON.stringify(json, null, 2));

  const md = [];
  md.push('# Internal Link Audit — Blog + Glossary');
  md.push('');
  md.push(`- **Generated**: ${new Date().toISOString()}`);
  md.push(`- **Blog MDX files scanned**: ${blog.totalPosts} (${blog.glossarySlugs.size} glossary)`);
  md.push(`- **Total links found**: ${totalLinks}`);
  md.push(`- **Internal links validated**: ${totalInternalLinks}`);
  md.push(`- **Broken links**: ${broken.length}`);
  md.push(`- **Unique broken targets**: ${brokenByTarget.size}`);
  md.push(`- **Files with broken links**: ${brokenByFile.size}`);
  md.push('');

  if (broken.length === 0) {
    md.push('## ✅ No broken internal links detected');
    md.push('');
  } else {
    md.push('## Top broken targets (most-referenced missing URLs)');
    md.push('');
    md.push('| Target | Count | Sample reason |');
    md.push('|---|---:|---|');
    for (const [target, count] of topTargets) {
      const sample = broken.find((b) => b.target === target);
      const reason = sample?.suggestion
        ? `${sample.reason} → try \`${sample.suggestion}\``
        : sample?.reason || '';
      md.push(`| \`${target}\` | ${count} | ${reason} |`);
    }
    md.push('');

    md.push('## Files with the most broken links');
    md.push('');
    md.push('| File | Count |');
    md.push('|---|---:|');
    for (const [file, count] of topFiles) {
      md.push(`| \`content/blog/${file}\` | ${count} |`);
    }
    md.push('');

    md.push('## All broken links (full list)');
    md.push('');
    // Group by file for readability
    const byFile = new Map();
    for (const entry of broken) {
      if (!byFile.has(entry.file)) byFile.set(entry.file, []);
      byFile.get(entry.file).push(entry);
    }
    const sortedFiles = [...byFile.keys()].sort();
    for (const file of sortedFiles) {
      md.push(`### \`content/blog/${file}\``);
      md.push('');
      const entries = byFile.get(file);
      for (const e of entries) {
        const suggestion = e.suggestion ? ` → suggest \`${e.suggestion}\`` : '';
        md.push(
          `- line ${e.line} (${e.kind}): \`${e.target}\` — _${e.reason}_${suggestion}`
        );
      }
      md.push('');
    }
  }

  fs.writeFileSync(OUT_MD, md.join('\n'));

  console.log('');
  console.log(`Scanned ${blog.totalPosts} MDX files, ${totalInternalLinks} internal links.`);
  if (broken.length === 0) {
    console.log('✅ No broken internal links detected.');
  } else {
    console.log(`❌ ${broken.length} broken links across ${brokenByFile.size} files.`);
    console.log(`   ${brokenByTarget.size} unique broken targets.`);
  }
  console.log('');
  console.log(`Wrote: ${path.relative(ROOT, OUT_MD)}`);
  console.log(`Wrote: ${path.relative(ROOT, OUT_JSON)}`);
}

main();
