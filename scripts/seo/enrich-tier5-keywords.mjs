// Tier 5 keyword enrichment — one-shot script.
//
// For each Tier 5 "new" keyword that has a plausible existing blog post match,
// append the keyword to that post's frontmatter `keywords:` array. This lets
// the keyword tracker detect the match on its next run without writing any
// new content.
//
// Idempotent: if a post's keywords array already contains the target phrase
// (case-insensitive), it's skipped.
//
// Run once: node scripts/seo/enrich-tier5-keywords.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');

// Map: blog post slug → list of keywords to append
// Each entry represents an editorial decision: "this post is the best home
// for these Tier 5 queries, add them to its keyword signal set."
const ENRICHMENTS = {
  'production-scheduling-software-guide': [
    'how to create a production schedule',
    'production scheduling best practices',
    'how to schedule production in a factory',
    'how to improve production scheduling',
    'manufacturing scheduling challenges',
    'production scheduling problems'
  ],
  'mes-manufacturing-execution-system': [
    'what is MES',
    'MES vs SCADA',
    'manufacturing execution system explained'
  ],
  'oee-overall-equipment-effectiveness': [
    'how to calculate OEE',
    'OEE calculation formula',
    'OEE manufacturing metric'
  ],
  'aps-vs-erp-scheduling': [
    'MRP vs APS',
    'what is APS software',
    'APS software explained'
  ],
  'excel-to-aps-migration-guide': [
    'replacing excel for production planning',
    'problems with spreadsheet scheduling',
    'when to stop using excel for scheduling'
  ],
  'finite-vs-infinite-capacity-scheduling': [
    'what is infinite scheduling',
    'infinite capacity scheduling explained'
  ],
  'kanban-system-manufacturing': [
    'kanban vs scrum',
    'kanban vs scrum manufacturing'
  ],
  'manufacturing-lead-time-reduction': [
    'how to calculate lead time',
    'lead time calculation formula'
  ],
  'wip-management': [
    'how to reduce WIP',
    'reduce work in process inventory'
  ],
  'production-bottleneck-identification': [
    'how to reduce bottlenecks',
    'what is bottleneck in production',
    'bottleneck identification manufacturing'
  ],
  'job-shop-scheduling-algorithms': [
    'production scheduling algorithms',
    "johnson's rule scheduling",
    'johnsons rule scheduling'
  ],
  'priority-rules-job-shop': [
    'SPT scheduling',
    'EDD scheduling',
    'shortest processing time rule',
    'earliest due date rule'
  ],
  'on-time-delivery-kpi': [
    'perfect order rate',
    'perfect order rate KPI'
  ],
  'capacity-planning-formulas': [
    'how to plan production capacity',
    'production capacity planning'
  ],
  'best-aps-software': ['APS software features', 'what to look for in APS software'],
  'how-to-choose-production-scheduling-software': [
    'scheduling software buying guide',
    'what to look for in scheduling software'
  ],
  'mrp-vs-mrp2-vs-erp': [
    'what is ERP',
    'ERP vs MRP explained',
    'ERP definition manufacturing'
  ],
  'glossary-takt-time': [
    'how to calculate takt time',
    'takt time formula'
  ],
  'glossary-heijunka': [
    'level loading production',
    'production leveling'
  ],
  'glossary-pull-system': [
    'push vs pull production',
    'pull vs push manufacturing'
  ]
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function stripBom(raw) {
  return raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;
}

/**
 * Append keywords to a post's frontmatter keywords: block.
 * Handles the block-style YAML used in this codebase:
 *   keywords:
 *     - foo
 *     - bar
 * Returns the updated raw string, or null if no change was needed.
 */
function appendKeywordsToFrontmatter(raw, newKeywords) {
  const hasBom = raw.charCodeAt(0) === 0xfeff;
  const content = hasBom ? raw.slice(1) : raw;

  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;

  const fmBlock = fmMatch[1];
  // Find the keywords: block — either inline array or block form
  const blockRe = /^keywords:\s*\n((?:\s+-\s+.+\n?)+)/m;
  const inlineRe = /^keywords:\s*\[([^\]]*)\]/m;

  let updatedFmBlock = null;
  let existingKeywords = [];

  const blockMatch = fmBlock.match(blockRe);
  if (blockMatch) {
    // Block form — parse existing items
    existingKeywords = blockMatch[1]
      .split('\n')
      .map((line) => line.replace(/^\s*-\s*/, '').trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
    const existingLower = new Set(existingKeywords.map((k) => k.toLowerCase()));
    const toAdd = newKeywords.filter((k) => !existingLower.has(k.toLowerCase()));
    if (toAdd.length === 0) return null; // idempotent skip
    // Append new items to the block
    const indent = blockMatch[1].match(/^(\s+)-/)?.[1] || '  ';
    const addedLines = toAdd.map((k) => `${indent}- ${k}`).join('\n');
    const newBlock = blockMatch[0].trimEnd() + '\n' + addedLines + '\n';
    updatedFmBlock = fmBlock.replace(blockMatch[0], newBlock);
  } else {
    const inlineMatch = fmBlock.match(inlineRe);
    if (inlineMatch) {
      existingKeywords = inlineMatch[1]
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
      const existingLower = new Set(existingKeywords.map((k) => k.toLowerCase()));
      const toAdd = newKeywords.filter((k) => !existingLower.has(k.toLowerCase()));
      if (toAdd.length === 0) return null;
      const allKeywords = [...existingKeywords, ...toAdd];
      const newInline = `keywords: [${allKeywords.map((k) => `"${k}"`).join(', ')}]`;
      updatedFmBlock = fmBlock.replace(inlineMatch[0], newInline);
    } else {
      // No keywords field — we don't auto-add one to be safe
      return null;
    }
  }

  if (!updatedFmBlock) return null;

  const newContent = content.replace(fmBlock, updatedFmBlock);
  return (hasBom ? '\ufeff' : '') + newContent;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  let edited = 0;
  let skipped = 0;
  let notFound = 0;
  let totalKeywordsAdded = 0;

  for (const [slug, keywords] of Object.entries(ENRICHMENTS)) {
    const filePath = path.join(BLOG_DIR, slug + '.mdx');
    let raw;
    try {
      raw = await fs.readFile(filePath, 'utf8');
    } catch {
      console.log(`  ⚠️  NOT FOUND: ${slug}`);
      notFound++;
      continue;
    }

    const updated = appendKeywordsToFrontmatter(raw, keywords);
    if (!updated) {
      console.log(`  ⏭  skip (already has keywords OR no keywords block): ${slug}`);
      skipped++;
      continue;
    }

    await fs.writeFile(filePath, updated);
    const addedCount = (updated.length - raw.length) > 0 ? keywords.length : 0;
    // Recount actual added items: count newlines added
    const rawLines = stripBom(raw).split('\n').length;
    const newLines = stripBom(updated).split('\n').length;
    const linesAdded = newLines - rawLines;
    console.log(`  ✏️  ${slug} ← +${linesAdded} keyword entries`);
    totalKeywordsAdded += linesAdded;
    edited++;
  }

  console.log('');
  console.log('=== RESULTS ===');
  console.log(`  ✏️  Edited:             ${edited} posts`);
  console.log(`  ⏭  Already enriched:   ${skipped} posts`);
  console.log(`  ⚠️  Not found:          ${notFound} posts`);
  console.log(`  📊 Total keywords added: ${totalKeywordsAdded}`);
  console.log('');
  if (edited > 0) {
    console.log('Re-run the keyword tracker to see coverage improvements:');
    console.log('  node scripts/seo/build-keyword-tracker.mjs');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
