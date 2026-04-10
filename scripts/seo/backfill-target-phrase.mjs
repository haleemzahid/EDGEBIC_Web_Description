// Backfill missing `targetPhrase` frontmatter on blog MDX posts.
//
// Strategy (in order):
//   1. If post already has a non-empty `targetPhrase`, skip.
//   2. If post has a `keywords` array, use keywords[0] (the human-curated
//      canonical term — best signal we have).
//   3. Otherwise derive from slug:
//        - strip "glossary-" prefix
//        - strip common suffixes ("-guide", "-explained", etc.)
//        - replace hyphens with spaces
//
// Idempotent: re-running after backfill will skip every post that now has
// targetPhrase set. Safe to run on every push.
//
// Run: node scripts/seo/backfill-target-phrase.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');

// ---------------------------------------------------------------------------
// Frontmatter helpers
// ---------------------------------------------------------------------------
function parseFrontmatter(raw) {
  // Strip UTF-8 BOM if present — affects ~13 MDX files.
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return null;
  return { fmRaw: m[1], fmBlock: m[0], rest: raw.slice(m[0].length) };
}

function extractScalar(fmRaw, field) {
  const re = new RegExp(`^${field}:\\s*(.+?)\\s*$`, 'm');
  const m = fmRaw.match(re);
  if (!m) return null;
  let val = m[1].trim();
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }
  return val;
}

function extractKeywordsArray(fmRaw) {
  // Inline form: keywords: ["a", "b"]
  const inline = fmRaw.match(/^keywords:\s*\[([^\]]*)\]/m);
  if (inline) {
    return inline[1]
      .split(',')
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  // Block form:
  //   keywords:
  //     - foo
  //     - bar
  const block = fmRaw.match(/^keywords:\s*\n((?:\s+-\s+.+\n?)+)/m);
  if (block) {
    return block[1]
      .split('\n')
      .map((line) => line.replace(/^\s*-\s*/, '').trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  return [];
}

// Slug-based fallback
function deriveFromSlug(slug) {
  return slug
    .replace(/^glossary-/, '')
    .replace(/-guide$/, '')
    .replace(/-explained$/, '')
    .replace(/-/g, ' ');
}

// YAML quoting — only quote if needed (contains : # or starts with special)
function yamlQuoteIfNeeded(s) {
  if (/[:#'"\[\]{}|>&*!%@`,]/.test(s) || /^\s|\s$/.test(s)) {
    // Use double quotes, escape internal double quotes
    return `"${s.replace(/"/g, '\\"')}"`;
  }
  return s;
}

/**
 * Insert `targetPhrase: <value>` into a frontmatter block immediately before
 * the closing `---`. YAML field order is irrelevant for content-collections,
 * and end-of-block placement avoids stomping on any existing field's adjacent
 * formatting.
 */
function injectTargetPhrase(fmBlock, value) {
  const newLine = `targetPhrase: ${yamlQuoteIfNeeded(value)}`;
  // fmBlock looks like: ---\n<body>\n---
  // Insert newLine just before the trailing ---
  const lines = fmBlock.split('\n');
  // Find the LAST line that is exactly "---" — that's the closer
  let closeIdx = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '---') {
      closeIdx = i;
      break;
    }
  }
  if (closeIdx === -1) return null; // malformed, give up
  lines.splice(closeIdx, 0, newLine);
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('Loading blog posts...');
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });

  let total = 0;
  let alreadySet = 0;
  let backfilledFromKeywords = 0;
  let backfilledFromSlug = 0;
  let malformed = 0;
  let unfixable = 0;

  const log = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.mdx')) continue;
    total++;
    const slug = entry.name.replace(/\.mdx$/, '');
    const filePath = path.join(BLOG_DIR, entry.name);
    const raw = await fs.readFile(filePath, 'utf8');

    const parsed = parseFrontmatter(raw);
    if (!parsed) {
      malformed++;
      continue;
    }

    const existing = extractScalar(parsed.fmRaw, 'targetPhrase');
    if (existing && existing.trim().length > 0) {
      alreadySet++;
      continue;
    }

    // Need to derive
    let derived = null;
    let source = '';
    const keywords = extractKeywordsArray(parsed.fmRaw);
    if (keywords.length > 0 && keywords[0].trim().length > 0) {
      derived = keywords[0].trim();
      source = 'keywords[0]';
    } else {
      const slugDerived = deriveFromSlug(slug);
      if (slugDerived && slugDerived.length > 0) {
        derived = slugDerived;
        source = 'slug';
      }
    }

    if (!derived) {
      unfixable++;
      log.push(`  ⚠️  ${slug} — could not derive (no keywords, no usable slug)`);
      continue;
    }

    const newFmBlock = injectTargetPhrase(parsed.fmBlock, derived);
    if (!newFmBlock) {
      unfixable++;
      log.push(`  ⚠️  ${slug} — frontmatter malformed, could not inject`);
      continue;
    }

    const newContent = newFmBlock + parsed.rest;
    await fs.writeFile(filePath, newContent);

    if (source === 'keywords[0]') backfilledFromKeywords++;
    else backfilledFromSlug++;

    log.push(`  ✏️  ${slug} → "${derived}" (from ${source})`);
  }

  // Print log (truncated if too long)
  console.log('');
  if (log.length > 0) {
    console.log('Backfill log:');
    for (const line of log.slice(0, 100)) console.log(line);
    if (log.length > 100) console.log(`  … and ${log.length - 100} more`);
  }

  console.log('');
  console.log('=== RESULTS ===');
  console.log(`  Total .mdx files:               ${total}`);
  console.log(`  Already had targetPhrase:       ${alreadySet}`);
  console.log(`  ✏️  Backfilled from keywords[0]: ${backfilledFromKeywords}`);
  console.log(`  ✏️  Backfilled from slug:        ${backfilledFromSlug}`);
  console.log(`  ⚠️  Malformed frontmatter:       ${malformed}`);
  console.log(`  ⚠️  Unfixable:                   ${unfixable}`);
  console.log('');
  if (backfilledFromKeywords + backfilledFromSlug > 0) {
    console.log('Re-run the keyword tracker to see improved coverage:');
    console.log('  node scripts/seo/build-keyword-tracker.mjs');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
