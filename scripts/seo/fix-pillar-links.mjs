// Auto-fix broken pillar→cluster internal linking by appending an idempotent
// pillar-link callout to each cluster sibling that does not yet link to its
// pillar. Reads the audit JSON, only acts on pillars below COVERAGE_THRESHOLD.
//
// Idempotency: each injected block carries an MDX comment marker
//   {/* pillar-link-injected: <pillar-slug> */}
// The script detects this marker and skips the file on re-runs.
//
// Reversibility: to revert, grep for the marker and delete the block. The
// marker prefix is unique enough to script a clean removal.
//
// Run: node scripts/seo/fix-pillar-links.mjs
// Then re-run the audit:  node scripts/seo/audit-pillar-linking.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const AUDIT_JSON = path.join(ROOT, 'content', 'seo', 'pillar-link-audit.json');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');

const COVERAGE_THRESHOLD = 70; // Only fix pillars below this %
const MARKER_PREFIX = '{/* pillar-link-injected:';

// Cluster slug → human-readable topic phrase used in the callout sentence.
// Falls back to a generic phrase if a cluster isn't listed here.
const CLUSTER_TOPIC_PHRASE = {
  'supply-chain': 'supply chain and inventory management',
  'industry-solutions': 'industry-specific manufacturing scheduling',
  'buyers-guide': 'manufacturing software selection and buying',
  'finite-capacity-planning': 'finite capacity planning and scheduling',
  'job-shop-scheduling': 'job shop scheduling',
  'production-scheduling': 'production scheduling',
  'lean-manufacturing': 'lean manufacturing',
  'mrp': 'material requirements planning (MRP)',
  'erp-integration': 'ERP integration for manufacturing',
  'compliance-regulatory': 'manufacturing compliance and regulatory scheduling',
  'smart-manufacturing': 'smart manufacturing and Industry 4.0',
  'quality-control': 'quality control in manufacturing',
  'manufacturing-kpis': 'manufacturing KPIs and metrics',
  'competitor-comparisons': 'manufacturing software comparisons',
  'case-studies': 'manufacturing scheduling success stories'
};

function buildCalloutBlock(pillar) {
  const topic = CLUSTER_TOPIC_PHRASE[pillar.cluster] || pillar.cluster.replace(/-/g, ' ');
  return [
    '',
    '---',
    '',
    `${MARKER_PREFIX} ${pillar.pillarSlug} */}`,
    '',
    `> **📚 Continue learning:** This article is part of our [${pillar.pillarTitle}](/blog/${pillar.pillarSlug}) pillar guide — the comprehensive resource for ${topic}.`,
    ''
  ].join('\n');
}

async function main() {
  console.log('Reading audit...');
  const audit = JSON.parse(await fs.readFile(AUDIT_JSON, 'utf8'));

  const brokenPillars = audit.pillars.filter(
    (p) => p.inboundCoveragePct < COVERAGE_THRESHOLD
  );

  if (brokenPillars.length === 0) {
    console.log('No pillars below threshold. Nothing to do.');
    return;
  }

  console.log(`Fixing ${brokenPillars.length} broken pillars (coverage < ${COVERAGE_THRESHOLD}%):`);
  for (const p of brokenPillars) {
    console.log(`  ❌ ${p.cluster} → ${p.pillarSlug} (${p.inboundCoveragePct}% coverage, ${p.missingInboundFrom.length} missing)`);
  }

  let edited = 0;
  let alreadyLinked = 0;
  let notFound = 0;
  const editedFiles = [];

  for (const pillar of brokenPillars) {
    const callout = buildCalloutBlock(pillar);
    const marker = `${MARKER_PREFIX} ${pillar.pillarSlug} */}`;
    const slugRef = `/blog/${pillar.pillarSlug}`;

    for (const missing of pillar.missingInboundFrom) {
      const filePath = path.join(BLOG_DIR, missing.slug + '.mdx');
      let raw;
      try {
        raw = await fs.readFile(filePath, 'utf8');
      } catch {
        notFound++;
        continue;
      }

      // Idempotent guard #1: marker already present
      if (raw.includes(marker)) {
        alreadyLinked++;
        continue;
      }
      // Idempotent guard #2: post already links to the pillar by some other means
      if (raw.includes(slugRef)) {
        alreadyLinked++;
        continue;
      }

      // Append at end of file (after trimming trailing whitespace, then add newline)
      const newContent = raw.trimEnd() + '\n' + callout + '\n';
      await fs.writeFile(filePath, newContent);
      edited++;
      editedFiles.push({ pillar: pillar.pillarSlug, sibling: missing.slug });
    }
  }

  console.log('');
  console.log('=== RESULTS ===');
  console.log(`  ✏️  Edited:           ${edited} files`);
  console.log(`  ⏭  Already linked:   ${alreadyLinked} files`);
  console.log(`  ⚠️  Not found:        ${notFound} files`);
  console.log('');
  if (edited > 0) {
    console.log('Now re-run the audit to confirm coverage:');
    console.log('  node scripts/seo/audit-pillar-linking.mjs');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
