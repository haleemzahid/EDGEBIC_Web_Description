// Build content/seo/keywords.json by matching the 205 target keywords from
// scripts/seo/keyword-list.mjs against the actual corpus on disk:
//   - All MDX posts in content/blog/
//   - All marketing pages in app/(app)/(marketing)/ (one or two folder levels deep)
//
// Each keyword gets a status:
//   existing  — strong match found (title or targetPhrase)
//   refresh   — weak match found (keyword tokens appear in title/keywords array)
//   new       — no match, content needs to be created
//
// Run:  node scripts/seo/build-keyword-tracker.mjs
// Output:
//   content/seo/keywords.json     — full machine-readable tracker
//   content/seo/keyword-tracker.md — human-readable summary

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { KEYWORDS } from './keyword-list.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const MARKETING_DIR = path.join(ROOT, 'app', '(app)', '(marketing)');
const OUTPUT_JSON = path.join(ROOT, 'content', 'seo', 'keywords.json');
const OUTPUT_MD = path.join(ROOT, 'content', 'seo', 'keyword-tracker.md');

// ---------------------------------------------------------------------------
// Frontmatter parser — only the fields we need, permissive
// ---------------------------------------------------------------------------
function parseFrontmatter(raw) {
  // Strip UTF-8 BOM if present — 13 of our MDX files have one and would
  // otherwise silently fail the ^--- regex below.
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return null;
  const block = m[1];
  const out = {};

  // Single-line scalar fields
  const scalarFields = ['title', 'description', 'category', 'cluster', 'pillarSlug', 'targetPhrase'];
  for (const field of scalarFields) {
    const re = new RegExp(`^${field}:\\s*(.+?)\\s*$`, 'm');
    const fm = block.match(re);
    if (fm) {
      let val = fm[1].trim();
      // Strip surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      out[field] = val;
    }
  }

  // Keywords array — supports both inline ["a","b"] and block "- a\n  - b" form
  const inlineKw = block.match(/^keywords:\s*\[([^\]]*)\]/m);
  if (inlineKw) {
    out.keywords = inlineKw[1]
      .split(',')
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  } else {
    const blockKw = block.match(/^keywords:\s*\n((?:\s+-\s+.+\n?)+)/m);
    if (blockKw) {
      out.keywords = blockKw[1]
        .split('\n')
        .map((line) => line.replace(/^\s*-\s*/, '').trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      out.keywords = [];
    }
  }

  return out;
}

// ---------------------------------------------------------------------------
// Load all blog posts
// ---------------------------------------------------------------------------
async function loadBlogPosts() {
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  const posts = [];
  let malformed = 0;

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.mdx')) continue;
    const slug = entry.name.replace(/\.mdx$/, '');
    const raw = await fs.readFile(path.join(BLOG_DIR, entry.name), 'utf8');
    const fm = parseFrontmatter(raw);
    if (!fm || !fm.title) {
      malformed++;
      continue;
    }
    posts.push({
      slug,
      url: `/blog/${slug}`,
      title: fm.title,
      category: fm.category || '',
      cluster: fm.cluster || '',
      targetPhrase: fm.targetPhrase || '',
      keywords: fm.keywords || [],
      isPillar: fm.pillarSlug && fm.pillarSlug === slug
    });
  }
  return { posts, malformed };
}

// ---------------------------------------------------------------------------
// TSX metadata extractor — reads createPageMetadata({...}) from page.tsx and
// layout.tsx files to surface keywords/title/description that the URL-slug-only
// matcher would otherwise miss. Uses regex (not TS AST) because the metadata
// pattern in this codebase is consistent and a full parser is overkill.
// ---------------------------------------------------------------------------
async function readTsxMetadata(filePath) {
  let raw;
  try {
    raw = await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
  }

  // Two metadata patterns are used in this codebase:
  //   (1) createPageMetadata({...}) / createProductMetadata({...}) / createArticleMetadata({...})
  //       — uses comma-separated string for `keywords:`
  //   (2) inline `export const metadata: Metadata = {...}`
  //       — uses array form for `keywords: [...]`
  // We try (1) first, then fall back to (2).
  let body;
  const helperMatch = raw.match(
    /(?:createPageMetadata|createProductMetadata|createArticleMetadata)\s*\(\s*\{([\s\S]*?)\}\s*\)/
  );
  if (helperMatch) {
    body = helperMatch[1];
  } else {
    const inlineMatch = raw.match(
      /export\s+const\s+metadata\s*(?::\s*Metadata)?\s*=\s*\{([\s\S]*?)^\};?$/m
    );
    if (inlineMatch) {
      body = inlineMatch[1];
    }
  }
  if (!body) return null;

  function extractStringField(field) {
    // Match: field: 'value' or field: "value" — handles both quote styles.
    const re = new RegExp(`${field}\\s*:\\s*(['"\`])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1`, 'm');
    const m = body.match(re);
    if (!m) return null;
    return m[2];
  }

  function extractStringOrArrayField(field) {
    // Try string first
    const str = extractStringField(field);
    if (str !== null) return str;
    // Try array form: field: ['a', 'b', 'c']
    const arrRe = new RegExp(`${field}\\s*:\\s*\\[([\\s\\S]*?)\\]`, 'm');
    const arrMatch = body.match(arrRe);
    if (!arrMatch) return null;
    // Extract quoted strings from inside the array (handles ', ", `, multiline)
    const items = [];
    const itemRe = /(['"`])((?:\\.|(?!\1)[\s\S])*?)\1/g;
    let m;
    while ((m = itemRe.exec(arrMatch[1])) !== null) {
      items.push(m[2]);
    }
    return items.join(', ');
  }

  const title = extractStringField('title') || extractStringField('name');
  const description = extractStringField('description');
  const keywordsRaw = extractStringOrArrayField('keywords');
  const keywords = keywordsRaw
    ? keywordsRaw
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean)
    : [];

  return { title, description, keywords };
}

// ---------------------------------------------------------------------------
// Walk marketing pages — top level + one level deep (matches comparison sub-routes)
// Each page is enriched with metadata parsed from its page.tsx (or layout.tsx).
// ---------------------------------------------------------------------------
async function loadMarketingPages() {
  const pages = [];

  async function loadPage(dir, url, slug) {
    // Try page.tsx first; fall back to layout.tsx in the same directory.
    let meta = await readTsxMetadata(path.join(dir, 'page.tsx'));
    if (!meta || (!meta.title && meta.keywords.length === 0)) {
      const layoutMeta = await readTsxMetadata(path.join(dir, 'layout.tsx'));
      if (layoutMeta) meta = layoutMeta;
    }
    pages.push({
      url,
      slug,
      title: meta?.title || '',
      description: meta?.description || '',
      keywords: meta?.keywords || []
    });
  }

  async function scan(dir, urlPrefix) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      // Skip dynamic, parallel, and grouped routes
      if (entry.name.startsWith('[') || entry.name.startsWith('(') || entry.name.startsWith('@')) continue;
      // Skip auth/dashboard noise
      if (['auth', 'dashboard', 'invitations', 'admin', 'cart', 'checkout', 'thankyou'].includes(entry.name)) continue;
      if (entry.name.startsWith('thankyou')) continue;
      if (entry.name.startsWith('buy-now')) continue;

      const subDir = path.join(dir, entry.name);
      const url = `${urlPrefix}/${entry.name}`;
      // Does this folder have a page.tsx?
      try {
        await fs.stat(path.join(subDir, 'page.tsx'));
        await loadPage(subDir, url, entry.name);
      } catch {
        // no page.tsx, skip
      }
      // One level deeper
      const innerEntries = await fs.readdir(subDir, { withFileTypes: true }).catch(() => []);
      for (const inner of innerEntries) {
        if (!inner.isDirectory()) continue;
        if (inner.name.startsWith('[') || inner.name.startsWith('(') || inner.name.startsWith('@')) continue;
        const innerDir = path.join(subDir, inner.name);
        try {
          await fs.stat(path.join(innerDir, 'page.tsx'));
          await loadPage(innerDir, `${url}/${inner.name}`, inner.name);
        } catch {
          /* skip */
        }
      }
    }
  }

  await scan(MARKETING_DIR, '');
  return pages;
}

// ---------------------------------------------------------------------------
// Matching logic
// ---------------------------------------------------------------------------

// Domain synonym pairs — applied bidirectionally to both keywords and corpus.
// Each pair causes one term to be normalized into the other so the matcher
// catches "finite capacity planning" when searching for "finite capacity scheduling".
const SYNONYM_GROUPS = [
  ['scheduling', 'planning'], // domain-specific: in this market they are commonly interchangeable
  ['calculation', 'formula', 'calculate', 'how to calculate'],
  ['software', 'tool', 'system', 'app', 'application'],
  ['software', 'platform'],
  // Plural / singular handling for terms that commonly appear both ways
  ['template', 'templates'],
  ['industry', 'industries'],
  ['shop', 'shops'],
  ['manufacturer', 'manufacturers'],
  ['comparison', 'comparisons'],
  ['solution', 'solutions'],
  ['alternative', 'alternatives'],
  ['competitor', 'competitors']
];

// Acronym expansions — left side is the acronym, right side a phrase. Both are
// added to the searchable token bag so "MRP" matches a post titled "Material Requirements Planning"
// and "what is MRP" matches "what is material requirements planning".
const ACRONYM_EXPANSIONS = {
  mrp: 'material requirements planning',
  erp: 'enterprise resource planning',
  mes: 'manufacturing execution system',
  aps: 'advanced planning and scheduling',
  oee: 'overall equipment effectiveness',
  mps: 'master production schedule',
  bom: 'bill of materials',
  wip: 'work in process',
  spc: 'statistical process control',
  rmdb: 'resource manager db',
  rmx: 'resource manager for excel',
  jsl: 'job scheduler lite',
  edgebi: 'edgebi',
  wcxl: 'workcenter scheduler xl'
};

// Brand alias hard-pins — for the handful of brand keywords where matching by
// tokens fails, pin directly to the canonical product/page URL.
// Keys MUST be in normalized form (lowercase, no punctuation, single spaces)
// because they're looked up via normalize(kw.keyword) — see normalize().
const BRAND_ALIASES = {
  'user solutions rmdb': '/resource-manager-db-2',
  'resource manager db': '/resource-manager-db-2',
  'edgebi software': '/edgebi',
  'resource manager for excel': '/resource-manager-for-excel-2',
  'jsl job scheduler': '/jsl-job-scheduler-lite',
  'user solutions inc': '/about',
  'usersolutions com': '/' // normalize() strips the "." in usersolutions.com
};

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Expand a normalized string by appending acronym expansions.
 * "what is mrp" → "what is mrp material requirements planning"
 */
function expandAcronyms(s) {
  let result = s;
  for (const [acronym, expansion] of Object.entries(ACRONYM_EXPANSIONS)) {
    // Match acronym as a whole word
    const re = new RegExp(`\\b${acronym}\\b`, 'g');
    if (re.test(result)) {
      result = result + ' ' + expansion;
    }
  }
  return result;
}

function tokens(s) {
  return expandAcronyms(normalize(s)).split(' ').filter(Boolean);
}

function slugifyKeyword(s) {
  return normalize(s).replace(/\s+/g, '-');
}

/**
 * Returns true if `target` token bag covers all `query` tokens, with synonym
 * substitution: if a query token has a synonym present in target, it counts.
 */
function hasAllTokensWithSynonyms(queryTokens, targetTokens) {
  const targetSet = new Set(targetTokens);
  return queryTokens.every((qt) => {
    if (targetSet.has(qt)) return true;
    // Check synonym groups
    for (const group of SYNONYM_GROUPS) {
      if (group.includes(qt)) {
        if (group.some((g) => targetSet.has(g))) return true;
      }
    }
    return false;
  });
}

/**
 * Match a keyword against the corpus.
 * Returns { status, primaryUrl, existingSlug?, score, evidence }.
 */
/**
 * Find ALL URLs (across both blog posts and marketing pages) that strongly
 * target the same keyword. Used to detect keyword cannibalization where
 * multiple pages on the site compete for the same search query.
 */
function findAllMatches(kw, posts, marketingPages) {
  const kwNorm = normalize(kw.keyword);
  const kwTokens = normalize(kw.keyword).split(' ').filter(Boolean);
  const kwSlug = slugifyKeyword(kw.keyword);
  const matches = [];
  const matchedUrls = new Set();

  function addMatch(url, type) {
    if (matchedUrls.has(url)) return;
    matchedUrls.add(url);
    matches.push({ url, type });
  }

  // Marketing pages — exact slug match, TSX metadata exact, or all-tokens-with-synonyms
  for (const page of marketingPages) {
    // Use the FULL URL path (not just leaf slug) so sub-routes like
    // /excel-templates/production-schedule match keywords like
    // "production schedule excel template" — the parent directory carries
    // important keyword tokens too.
    const pageSlugTokens = tokens(page.url.replace(/^\//, '').replace(/[/-]/g, ' '));

    // (a) Exact slug match — strongest canonical signal
    if (page.slug === kwSlug) {
      addMatch(page.url, 'marketing-exact-slug');
      continue;
    }

    // (b) TSX metadata keywords[] exact match — author-declared canonical signal
    // (treated equivalently to exact-slug for cannibalization detection)
    if (page.keywords && page.keywords.length > 0) {
      const metadataExact = page.keywords.some((k) => normalize(k) === kwNorm);
      if (metadataExact) {
        addMatch(page.url, 'marketing-metadata-exact');
        continue;
      }
    }

    // (c) Strong-token match — slug contains all keyword tokens AND keyword
    // tokens make up >= 50% of slug tokens (avoids over-matching long slugs)
    if (kwTokens.length >= 2 && hasAllTokensWithSynonyms(kwTokens, pageSlugTokens)) {
      if (kwTokens.length / pageSlugTokens.length >= 0.5) {
        addMatch(page.url, 'marketing-strong-token');
      }
    }
  }

  // Blog posts — targetPhrase exact match or strong title match.
  // Glossary entries (`glossary-*` slug prefix) are excluded from
  // cannibalization detection: they are dictionary-style supporting content
  // for the main cluster posts, not competing articles. Flagging them as
  // cannibals produces noise for every term that has both a main post and a
  // glossary entry (a correct hub-and-spoke pattern).
  for (const post of posts) {
    if (post.slug.startsWith('glossary-')) continue;
    if (post.targetPhrase) {
      const tpNorm = normalize(post.targetPhrase);
      if (tpNorm === kwNorm) {
        addMatch(post.url, 'blog-targetphrase-exact');
        continue;
      }
    }
    // Strong title match: kw is substring of slug (handles rmdb-vs-mrpeasy → /blog/rmdb-vs-mrpeasy)
    const slugFlat = post.slug.replace(/-/g, ' ');
    if (kwNorm.length >= 6 && slugFlat.includes(kwNorm)) {
      addMatch(post.url, 'blog-slug-substring');
    }
  }

  return matches;
}

function matchKeyword(kw, posts, marketingPages) {
  const kwNorm = normalize(kw.keyword);
  const kwTokens = tokens(kw.keyword); // includes acronym expansions
  const kwTokensRaw = normalize(kw.keyword).split(' ').filter(Boolean);
  const kwSlug = slugifyKeyword(kw.keyword);

  let best = { score: 0, post: null, page: null, evidence: '' };

  // ── Pass 0: brand alias hard-pin ──
  if (BRAND_ALIASES[kwNorm]) {
    const url = BRAND_ALIASES[kwNorm];
    return {
      status: 'existing',
      primaryUrl: url,
      score: 100,
      evidence: `brand alias hard-pin → ${url}`
    };
  }

  // ── Pass 1: marketing page slug + TSX metadata ──
  for (const page of marketingPages) {
    // Use the FULL URL path (not just leaf slug) so sub-routes like
    // /excel-templates/production-schedule match keywords like
    // "production schedule excel template" — the parent directory carries
    // important keyword tokens too.
    const pageSlugTokens = tokens(page.url.replace(/^\//, '').replace(/[/-]/g, ' '));
    if (page.slug === kwSlug) {
      return {
        status: 'existing',
        primaryUrl: page.url,
        score: 100,
        evidence: `marketing page slug exact match: ${page.url}`
      };
    }
    if (kwTokensRaw.length >= 2 && hasAllTokensWithSynonyms(kwTokensRaw, pageSlugTokens)) {
      const score = 85;
      if (score > best.score) {
        best = {
          score,
          page,
          post: null,
          evidence: `marketing page slug contains all tokens (with synonyms): ${page.url}`
        };
      }
    }
    // Pass 1b: TSX metadata keywords[] exact or substring match
    // This catches secondary keywords explicitly listed in createPageMetadata
    // that are not in the URL slug — e.g. /machine-shop-scheduling-software
    // also targets "machine shop management software" via its keywords field.
    if (page.keywords && page.keywords.length > 0) {
      for (const k of page.keywords) {
        const kNorm = normalize(k);
        if (kNorm === kwNorm) {
          const score = 95;
          if (score > best.score) {
            best = {
              score,
              page,
              post: null,
              evidence: `marketing page TSX metadata keywords[] exact match: ${page.url}`
            };
          }
        }
      }
    }
    // Pass 1c: TSX metadata title contains all keyword tokens (with synonyms)
    if (page.title && kwTokensRaw.length >= 2) {
      const titleTokens = tokens(page.title);
      if (hasAllTokensWithSynonyms(kwTokensRaw, titleTokens)) {
        const score = 80;
        if (score > best.score) {
          best = {
            score,
            page,
            post: null,
            evidence: `marketing page TSX metadata title match: ${page.url}`
          };
        }
      }
    }
  }

  // ── Pass 2: blog targetPhrase exact / very close ──
  for (const post of posts) {
    if (!post.targetPhrase) continue;
    const tpNorm = normalize(post.targetPhrase);
    if (tpNorm === kwNorm) {
      return {
        status: 'existing',
        primaryUrl: post.url,
        existingSlug: post.slug,
        score: 100,
        evidence: `blog targetPhrase exact match: ${post.slug}`
      };
    }
    if (tpNorm.includes(kwNorm) || kwNorm.includes(tpNorm)) {
      const score = 90;
      if (score > best.score) {
        best = {
          score,
          post,
          page: null,
          evidence: `blog targetPhrase substring match: ${post.slug} (targetPhrase="${post.targetPhrase}")`
        };
      }
    }
    // Synonym-aware match between targetPhrase tokens and keyword tokens
    const tpTokens = tokens(post.targetPhrase);
    if (
      kwTokensRaw.length >= 2 &&
      hasAllTokensWithSynonyms(kwTokensRaw, tpTokens) &&
      hasAllTokensWithSynonyms(
        normalize(post.targetPhrase).split(' ').filter(Boolean),
        kwTokens
      )
    ) {
      const score = 85;
      if (score > best.score) {
        best = {
          score,
          post,
          page: null,
          evidence: `blog targetPhrase token+synonym match: ${post.slug}`
        };
      }
    }
  }

  // ── Pass 3: blog title contains all keyword tokens (synonym-aware) ──
  for (const post of posts) {
    const titleTokens = tokens(post.title);
    if (kwTokensRaw.length >= 2 && hasAllTokensWithSynonyms(kwTokensRaw, titleTokens)) {
      const score = 72 + (post.isPillar ? 10 : 0);
      if (score > best.score) {
        best = {
          score,
          post,
          page: null,
          evidence: `blog title contains all keyword tokens (with synonyms): ${post.slug} ("${post.title}")`
        };
      }
    }
  }

  // ── Pass 4: blog keywords[] contains keyword ──
  // An exact match in a post's keywords[] frontmatter is an author-declared
  // targeting signal — nearly as strong as targetPhrase itself — so it
  // qualifies the post as "existing" coverage (score 88 > 80 threshold).
  for (const post of posts) {
    if (!post.keywords || post.keywords.length === 0) continue;
    for (const k of post.keywords) {
      const kNorm = normalize(k);
      if (kNorm === kwNorm) {
        const score = 88;
        if (score > best.score) {
          best = {
            score,
            post,
            page: null,
            evidence: `blog keywords[] exact match: ${post.slug}`
          };
        }
      } else {
        const kTokens = tokens(k);
        if (kwTokensRaw.length >= 2 && hasAllTokensWithSynonyms(kwTokensRaw, kTokens)) {
          const score = 62;
          if (score > best.score) {
            best = {
              score,
              post,
              page: null,
              evidence: `blog keywords[] contains all tokens (with synonyms): ${post.slug}`
            };
          }
        }
      }
    }
  }

  // ── Pass 5: blog slug contains all tokens (weakest, synonym-aware) ──
  for (const post of posts) {
    const slugTokens = tokens(post.slug.replace(/-/g, ' '));
    if (kwTokensRaw.length >= 2 && hasAllTokensWithSynonyms(kwTokensRaw, slugTokens)) {
      const score = 52;
      if (score > best.score) {
        best = {
          score,
          post,
          page: null,
          evidence: `blog slug contains all tokens (with synonyms): ${post.slug}`
        };
      }
    }
  }

  // ── Pass 6: single-token keyword with strong post-title presence ──
  // Handles "OEE", "MRP", "ERP" etc. — match any post whose title or slug
  // contains the single token AND is in a manufacturing-related cluster.
  if (kwTokensRaw.length === 1 || (kwTokensRaw.length === 2 && kwTokensRaw[0] === 'what')) {
    const focal = kwTokensRaw[kwTokensRaw.length - 1];
    for (const post of posts) {
      const titleTokens = tokens(post.title);
      const slugTokens = tokens(post.slug.replace(/-/g, ' '));
      if (titleTokens.includes(focal) || slugTokens.includes(focal)) {
        // Prefer non-glossary, prefer pillar
        const score = 55 + (post.isPillar ? 15 : 0) + (post.cluster !== 'glossary' ? 5 : 0);
        if (score > best.score) {
          best = {
            score,
            post,
            page: null,
            evidence: `single-token focal match: ${post.slug} (focal="${focal}")`
          };
        }
      }
    }
  }

  // Resolve best match into a status
  if (best.score >= 80) {
    return {
      status: 'existing',
      primaryUrl: best.page ? best.page.url : best.post.url,
      existingSlug: best.post ? best.post.slug : undefined,
      score: best.score,
      evidence: best.evidence
    };
  }
  if (best.score >= 50) {
    return {
      status: 'refresh',
      primaryUrl: best.page ? best.page.url : best.post.url,
      existingSlug: best.post ? best.post.slug : undefined,
      score: best.score,
      evidence: best.evidence
    };
  }

  return {
    status: 'new',
    primaryUrl: kw.suggestedUrl,
    score: 0,
    evidence: 'no match found in existing content'
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('Loading blog posts...');
  const { posts, malformed } = await loadBlogPosts();
  console.log(`  ${posts.length} valid posts (${malformed} skipped as malformed)`);

  console.log('Loading marketing pages...');
  const marketingPages = await loadMarketingPages();
  console.log(`  ${marketingPages.length} marketing pages`);

  console.log(`Matching ${KEYWORDS.length} keywords...`);
  const tracker = KEYWORDS.map((kw) => {
    const match = matchKeyword(kw, posts, marketingPages);
    // Find ALL matching URLs (for cannibalization detection)
    const allMatches = findAllMatches(kw, posts, marketingPages);

    // ── Cannibalization false-positive suppression ──
    // A healthy hub-and-spoke pattern looks like: 1 marketing-exact-slug
    // (the canonical money page) + N supporting matches (blog cluster posts,
    // industry sub-targeting pages, etc.). This is correct SEO architecture,
    // not cannibalization. We only flag a real cannibal risk if:
    //   (a) there are multiple marketing-exact-slug matches (true URL collision)
    //   (b) there is no exact-slug canonical AND multiple competing matches exist
    //   (c) AND no BRAND_ALIASES hard-pin already declares the canonical
    //
    // When a clean exact-slug canonical exists, treat all "strong-token" matches
    // as supporting content — industry sub-pages and cluster blog posts both
    // serve the canonical, they don't compete with it.
    let cannibalRisk = false;
    const hasBrandAlias = Boolean(BRAND_ALIASES[normalize(kw.keyword)]);
    if (allMatches.length > 1 && !hasBrandAlias) {
      // Both exact-slug AND TSX metadata-exact matches count as "canonical"
      // for cannibalization purposes — they each represent an explicit
      // declaration that the page targets this exact keyword.
      const canonicalMatches = allMatches.filter(
        (m) => m.type === 'marketing-exact-slug' || m.type === 'marketing-metadata-exact'
      );
      if (canonicalMatches.length > 1) {
        // Two or more pages declare themselves as canonical — real collision.
        cannibalRisk = true;
      } else if (canonicalMatches.length === 1) {
        // Healthy hub: a canonical exists, everything else is supporting content.
        cannibalRisk = false;
      } else {
        // No canonical declared anywhere — multiple competing matches without
        // a clear hub. Editorial decision needed: pick a canonical, redirect
        // or link the rest, OR add the keyword to one page's metadata.
        cannibalRisk = true;
      }
    }

    return {
      id: kw.id,
      keyword: kw.keyword,
      tier: kw.tier,
      priority: kw.priority,
      intent: kw.intent,
      vol: kw.vol,
      kd: kw.kd,
      status: match.status,
      primaryUrl: match.primaryUrl,
      existingSlug: match.existingSlug,
      suggestedUrl: kw.suggestedUrl,
      score: match.score,
      evidence: match.evidence,
      allMatches: cannibalRisk ? allMatches : undefined,
      cannibalRisk
    };
  });

  // Cannibalization summary
  const cannibals = tracker.filter((t) => t.cannibalRisk);

  // Stats
  const stats = {
    total: tracker.length,
    existing: tracker.filter((t) => t.status === 'existing').length,
    refresh: tracker.filter((t) => t.status === 'refresh').length,
    new: tracker.filter((t) => t.status === 'new').length
  };
  const byTier = {};
  for (const t of tracker) {
    const tier = String(t.tier);
    byTier[tier] = byTier[tier] || { existing: 0, refresh: 0, new: 0, total: 0 };
    byTier[tier][t.status]++;
    byTier[tier].total++;
  }

  // ── Write JSON ──
  await fs.mkdir(path.dirname(OUTPUT_JSON), { recursive: true });
  const json = {
    generatedAt: new Date().toISOString().slice(0, 10),
    corpus: {
      blogPosts: posts.length,
      blogPostsMalformed: malformed,
      marketingPages: marketingPages.length
    },
    stats: { ...stats, cannibalRisk: cannibals.length },
    byTier,
    cannibalization: cannibals.map((c) => ({
      id: c.id,
      keyword: c.keyword,
      tier: c.tier,
      vol: c.vol,
      urls: c.allMatches.map((m) => m.url)
    })),
    keywords: tracker
  };
  await fs.writeFile(OUTPUT_JSON, JSON.stringify(json, null, 2) + '\n');
  console.log(`Wrote ${OUTPUT_JSON}`);

  // ── Write Markdown summary ──
  const lines = [];
  lines.push('# SEO Keyword Tracker — usersolutions.com');
  lines.push('');
  lines.push(
    '> Auto-generated by `scripts/seo/build-keyword-tracker.mjs`. Do not edit by hand — update `scripts/seo/keyword-list.mjs` and re-run.'
  );
  lines.push('');
  lines.push(`**Generated:** ${json.generatedAt}`);
  lines.push(`**Corpus:** ${posts.length} blog posts · ${marketingPages.length} marketing pages`);
  lines.push('');
  lines.push('## Coverage summary');
  lines.push('');
  lines.push(`- ✅ **Existing** (strong match, no new content needed): **${stats.existing}** (${pct(stats.existing, stats.total)})`);
  lines.push(`- 🔄 **Refresh** (weak match, expand or update existing post): **${stats.refresh}** (${pct(stats.refresh, stats.total)})`);
  lines.push(`- 🆕 **New** (gap, write new content): **${stats.new}** (${pct(stats.new, stats.total)})`);
  lines.push('');
  lines.push('## By tier');
  lines.push('');
  lines.push('| Tier | Existing | Refresh | New | Total |');
  lines.push('|------|----------|---------|-----|-------|');
  const tierOrder = ['1', '2', '3', '4', '5', 'local', 'brand'];
  for (const tier of tierOrder) {
    const t = byTier[tier];
    if (!t) continue;
    lines.push(`| ${tier} | ${t.existing} | ${t.refresh} | ${t.new} | ${t.total} |`);
  }
  lines.push('');
  lines.push('## All keywords');
  lines.push('');
  lines.push('| ID | Tier | Status | Keyword | Vol | KD | Primary URL | Evidence |');
  lines.push('|----|------|--------|---------|----:|---:|-------------|----------|');
  for (const t of tracker) {
    const icon = t.status === 'existing' ? '✅' : t.status === 'refresh' ? '🔄' : '🆕';
    lines.push(
      `| ${t.id} | ${t.tier} | ${icon} ${t.status} | ${t.keyword} | ${t.vol} | ${t.kd} | \`${t.primaryUrl}\` | ${t.evidence} |`
    );
  }
  lines.push('');
  await fs.writeFile(OUTPUT_MD, lines.join('\n'));
  console.log(`Wrote ${OUTPUT_MD}`);

  // ── Print summary to console ──
  console.log('');
  console.log('=== SUMMARY ===');
  console.log(`Total keywords: ${stats.total}`);
  console.log(`  ✅ existing: ${stats.existing} (${pct(stats.existing, stats.total)})`);
  console.log(`  🔄 refresh:  ${stats.refresh} (${pct(stats.refresh, stats.total)})`);
  console.log(`  🆕 new:      ${stats.new} (${pct(stats.new, stats.total)})`);
  console.log(`  ⚠️  cannibal: ${cannibals.length} (multiple URLs target same keyword)`);
  console.log('');
  console.log('By tier:');
  for (const tier of tierOrder) {
    const t = byTier[tier];
    if (!t) continue;
    console.log(`  Tier ${tier}: ${t.existing} existing / ${t.refresh} refresh / ${t.new} new (of ${t.total})`);
  }
  if (cannibals.length > 0) {
    console.log('');
    console.log('=== CANNIBALIZATION RISK ===');
    for (const c of cannibals) {
      console.log(`  #${c.id} "${c.keyword}" (Tier ${c.tier}, vol ${c.vol})`);
      for (const m of c.allMatches) {
        console.log(`     - ${m.url} [${m.type}]`);
      }
    }
  }
}

function pct(n, total) {
  if (total === 0) return '0%';
  return `${Math.round((n / total) * 100)}%`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
