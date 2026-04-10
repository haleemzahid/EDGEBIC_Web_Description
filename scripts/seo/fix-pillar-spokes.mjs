// Auto-fix broken pillar→spoke OUTBOUND linking by appending a
// "Continue exploring this cluster" section to each pillar that lists every
// sibling spoke post in its cluster.
//
// This is the complement to fix-pillar-links.mjs:
//   fix-pillar-links.mjs   — adds INBOUND links (spokes → pillar)
//   fix-pillar-spokes.mjs  — adds OUTBOUND links (pillar → spokes)  ← this script
//
// Idempotency: marker comment {/* spoke-links-injected */}
// Reversibility: grep the marker and delete from there to end of file.
//
// Glossary pillar is SKIPPED — 177 siblings would be a wall of links and the
// glossary index page already exists for navigation.
//
// Run: node scripts/seo/fix-pillar-spokes.mjs
// Then re-run audit: node scripts/seo/audit-pillar-linking.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');

const MARKER = '{/* spoke-links-injected */}';
const SKIP_CLUSTERS = new Set(['glossary']); // 177 siblings — too many to list
const MAX_SIBLINGS = 50; // Safety cap; clusters above this are skipped with a warning

// Per-cluster topic phrase used in the section heading and intro sentence.
const CLUSTER_TOPIC_PHRASE = {
  'supply-chain': 'supply chain and inventory management',
  'industry-solutions': 'industry-specific manufacturing scheduling',
  'buyers-guide': 'manufacturing software selection',
  'finite-capacity-planning': 'finite capacity planning',
  'job-shop-scheduling': 'job shop scheduling',
  'production-scheduling': 'production scheduling',
  'lean-manufacturing': 'lean manufacturing',
  'mrp': 'material requirements planning',
  'erp-integration': 'ERP integration for manufacturing',
  'compliance-regulatory': 'manufacturing compliance and regulatory scheduling',
  'smart-manufacturing': 'smart manufacturing and Industry 4.0',
  'quality-control': 'quality control in manufacturing',
  'manufacturing-kpis': 'manufacturing KPIs and metrics',
  'competitor-comparisons': 'manufacturing software comparisons',
  'case-studies': 'manufacturing scheduling success stories'
};

// ---------------------------------------------------------------------------
// Frontmatter parser (narrow — same minimal approach as the audit script)
// ---------------------------------------------------------------------------
function parseFrontmatter(raw) {
  // Strip UTF-8 BOM if present.
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return { fm: null, body: raw };
  const block = m[1];
  const out = {};
  for (const field of ['title', 'cluster', 'pillarSlug']) {
    const re = new RegExp(`^${field}:\\s*(.+?)\\s*$`, 'm');
    const fm = block.match(re);
    if (fm) {
      let val = fm[1].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      out[field] = val;
    }
  }
  return { fm: out, body: raw };
}

// ---------------------------------------------------------------------------
// Build the spoke-links section for one pillar
// ---------------------------------------------------------------------------
function buildSpokeSection(cluster, siblings) {
  const topic = CLUSTER_TOPIC_PHRASE[cluster] || cluster.replace(/-/g, ' ');
  const sortedSiblings = [...siblings].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  const lines = [
    '',
    '---',
    '',
    MARKER,
    '',
    '## Continue exploring this cluster',
    '',
    `Dive deeper into specific aspects of ${topic} with these related guides from our content library:`,
    ''
  ];
  for (const s of sortedSiblings) {
    lines.push(`- [${s.title}](/blog/${s.slug})`);
  }
  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('Loading blog posts...');
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  const posts = [];
  let malformed = 0;

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.mdx')) continue;
    const slug = entry.name.replace(/\.mdx$/, '');
    const raw = await fs.readFile(path.join(BLOG_DIR, entry.name), 'utf8');
    const { fm } = parseFrontmatter(raw);
    if (!fm || !fm.title) {
      malformed++;
      continue;
    }
    posts.push({
      slug,
      title: fm.title,
      cluster: fm.cluster || '',
      pillarSlug: fm.pillarSlug || '',
      isPillar: fm.pillarSlug === slug
    });
  }
  console.log(`  ${posts.length} valid posts (${malformed} skipped)`);

  // Group by cluster
  const clusterMap = new Map();
  for (const post of posts) {
    if (!post.cluster) continue;
    if (!clusterMap.has(post.cluster)) clusterMap.set(post.cluster, []);
    clusterMap.get(post.cluster).push(post);
  }

  // For each cluster, find pillar + siblings
  let edited = 0;
  let skipped = 0;
  let alreadyPresent = 0;
  let oversize = 0;

  for (const [cluster, clusterPosts] of clusterMap.entries()) {
    if (SKIP_CLUSTERS.has(cluster)) {
      console.log(`  ⏭  skip cluster "${cluster}" (in skip list)`);
      skipped++;
      continue;
    }

    const pillar = clusterPosts.find((p) => p.isPillar);
    if (!pillar) {
      console.log(`  ⚠️  cluster "${cluster}" has no pillar — skipping`);
      skipped++;
      continue;
    }

    const siblings = clusterPosts.filter((p) => p.slug !== pillar.slug);
    if (siblings.length === 0) {
      console.log(`  ⏭  pillar "${pillar.slug}" has no siblings — skipping`);
      skipped++;
      continue;
    }
    if (siblings.length > MAX_SIBLINGS) {
      console.log(
        `  ⚠️  pillar "${pillar.slug}" has ${siblings.length} siblings (> ${MAX_SIBLINGS}) — skipping to avoid wall-of-links`
      );
      oversize++;
      continue;
    }

    const filePath = path.join(BLOG_DIR, pillar.slug + '.mdx');
    let raw = await fs.readFile(filePath, 'utf8');

    // If the marker is present, the spoke section may be stale (new sibling
    // posts may have been added since last run). Strip the existing block and
    // rebuild from current cluster state. This keeps the script idempotent in
    // the spirit of "current state always wins."
    let regenerated = false;
    if (raw.includes(MARKER)) {
      // Find the start of the injected section. We look for the `---` line
      // immediately before the marker (added by buildSpokeSection) and strip
      // from there to end of file.
      const markerIdx = raw.indexOf(MARKER);
      // Walk backward from the marker to find the preceding "---" line
      let stripFrom = markerIdx;
      const before = raw.slice(0, markerIdx);
      const lastDashes = before.lastIndexOf('\n---\n');
      if (lastDashes !== -1) {
        stripFrom = lastDashes;
      }
      // Quick check: did the existing section already contain the same siblings?
      // If yes, skip; if no, regenerate.
      const existingSection = raw.slice(stripFrom);
      const existingSiblingCount = (existingSection.match(/\(\/blog\//g) || []).length;
      if (existingSiblingCount === siblings.length) {
        alreadyPresent++;
        continue;
      }
      raw = raw.slice(0, stripFrom);
      regenerated = true;
    }

    const section = buildSpokeSection(cluster, siblings);
    const newContent = raw.trimEnd() + '\n' + section + '\n';
    await fs.writeFile(filePath, newContent);
    console.log(
      `  ${regenerated ? '🔄' : '✏️'}  ${pillar.slug} ← ${siblings.length} spoke links${regenerated ? ' (regenerated)' : ''}`
    );
    edited++;
  }

  console.log('');
  console.log('=== RESULTS ===');
  console.log(`  ✏️  Edited:           ${edited} pillars`);
  console.log(`  ⏭  Already present:  ${alreadyPresent} pillars`);
  console.log(`  ⏭  Skipped:          ${skipped} pillars`);
  console.log(`  ⚠️  Oversize skipped: ${oversize} pillars`);
  console.log('');
  if (edited > 0) {
    console.log('Now re-run the audit to confirm outbound coverage:');
    console.log('  node scripts/seo/audit-pillar-linking.mjs');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
