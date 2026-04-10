// Pillar→cluster internal linking audit.
//
// Methodology:
//   1. Parse frontmatter of every content/blog/*.mdx file (slug, cluster, pillarSlug)
//   2. For each post body, extract every internal /blog/<slug> reference
//      (markdown links, JSX <Link href>, plain href="...") — these are the
//      "outbound internal links" from that post
//   3. Group posts by cluster
//   4. For each cluster, identify the pillar (post where pillarSlug === own slug)
//   5. Count, per pillar:
//        - inbound: how many cluster siblings link TO the pillar
//        - outbound: how many cluster siblings the pillar links to (hub→spoke)
//        - missing: cluster siblings that do NOT link to the pillar (the action list)
//
// Output:
//   content/seo/pillar-link-audit.json — machine-readable
//   content/seo/pillar-link-audit.md   — human-readable action list
//
// Run: node scripts/seo/audit-pillar-linking.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const OUTPUT_JSON = path.join(ROOT, 'content', 'seo', 'pillar-link-audit.json');
const OUTPUT_MD = path.join(ROOT, 'content', 'seo', 'pillar-link-audit.md');

// ---------------------------------------------------------------------------
// Frontmatter parser — narrow, only fields needed for this audit
// ---------------------------------------------------------------------------
function parseFrontmatter(raw) {
  // Strip UTF-8 BOM if present.
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return { fm: null, body: raw };
  const block = m[1];
  const body = raw.slice(m[0].length);
  const out = {};

  for (const field of ['title', 'category', 'cluster', 'pillarSlug']) {
    const re = new RegExp(`^${field}:\\s*(.+?)\\s*$`, 'm');
    const fm = block.match(re);
    if (fm) {
      let val = fm[1].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      out[field] = val;
    }
  }
  return { fm: out, body };
}

// ---------------------------------------------------------------------------
// Internal-link extractor — finds /blog/<slug> references in MDX body
// ---------------------------------------------------------------------------
const SLUG_REF_RE = /\/blog\/([a-z0-9][a-z0-9-]*[a-z0-9])(?![a-z0-9-])/g;

function extractInternalBlogLinks(body, ownSlug) {
  const found = new Set();
  let match;
  SLUG_REF_RE.lastIndex = 0;
  while ((match = SLUG_REF_RE.exec(body)) !== null) {
    const slug = match[1];
    if (slug !== ownSlug) found.add(slug);
  }
  return Array.from(found);
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
    const { fm, body } = parseFrontmatter(raw);
    if (!fm || !fm.title) {
      malformed++;
      continue;
    }
    const linksOut = extractInternalBlogLinks(body, slug);
    posts.push({
      slug,
      title: fm.title,
      cluster: fm.cluster || '',
      pillarSlug: fm.pillarSlug || '',
      isPillar: fm.pillarSlug === slug,
      linksOut
    });
  }
  console.log(`  ${posts.length} valid posts (${malformed} skipped)`);

  // Build inbound link map: who links TO each slug
  const inboundMap = new Map(); // slug → Set<sourceSlug>
  for (const post of posts) {
    for (const target of post.linksOut) {
      if (!inboundMap.has(target)) inboundMap.set(target, new Set());
      inboundMap.get(target).add(post.slug);
    }
  }

  // Group posts by cluster
  const clusterMap = new Map(); // cluster → posts[]
  for (const post of posts) {
    if (!post.cluster) continue;
    if (!clusterMap.has(post.cluster)) clusterMap.set(post.cluster, []);
    clusterMap.get(post.cluster).push(post);
  }

  // Build pillar audit
  const pillarAudits = [];
  for (const [cluster, clusterPosts] of clusterMap.entries()) {
    const pillar = clusterPosts.find((p) => p.isPillar);
    if (!pillar) continue;

    const siblings = clusterPosts.filter((p) => p.slug !== pillar.slug);
    const siblingsLinkingToPillar = siblings.filter((s) =>
      s.linksOut.includes(pillar.slug)
    );
    const siblingsNotLinkingToPillar = siblings.filter(
      (s) => !s.linksOut.includes(pillar.slug)
    );

    // Outbound: how many siblings does the pillar link to?
    const pillarOutboundToSiblings = pillar.linksOut.filter((target) =>
      clusterPosts.some((p) => p.slug === target)
    );

    pillarAudits.push({
      cluster,
      pillarSlug: pillar.slug,
      pillarTitle: pillar.title,
      siblingCount: siblings.length,
      inboundFromSiblings: siblingsLinkingToPillar.length,
      inboundCoveragePct: siblings.length === 0 ? 0 : Math.round((siblingsLinkingToPillar.length / siblings.length) * 100),
      outboundToSiblings: pillarOutboundToSiblings.length,
      outboundCoveragePct: siblings.length === 0 ? 0 : Math.round((pillarOutboundToSiblings.length / siblings.length) * 100),
      missingInboundFrom: siblingsNotLinkingToPillar.map((s) => ({ slug: s.slug, title: s.title })),
      missingOutboundTo: siblings
        .filter((s) => !pillarOutboundToSiblings.includes(s.slug))
        .map((s) => ({ slug: s.slug, title: s.title }))
    });
  }

  // Sort pillars by worst-coverage first (most actionable)
  pillarAudits.sort((a, b) => a.inboundCoveragePct - b.inboundCoveragePct);

  // Posts with NO cluster — these are fragmented from the topic graph
  const orphans = posts.filter((p) => !p.cluster).map((p) => p.slug);

  // Top inbound-link recipients across the whole site (which posts are most linked-to?)
  const topInbound = Array.from(inboundMap.entries())
    .map(([slug, sources]) => ({ slug, count: sources.size }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 30);

  // Posts with zero inbound internal links — orphan content
  const linkOrphans = posts
    .filter((p) => !inboundMap.has(p.slug) && p.cluster !== 'glossary')
    .map((p) => ({ slug: p.slug, title: p.title, cluster: p.cluster }));

  // ── Write JSON ──
  await fs.mkdir(path.dirname(OUTPUT_JSON), { recursive: true });
  const json = {
    generatedAt: new Date().toISOString().slice(0, 10),
    corpus: { totalPosts: posts.length, malformed, clusters: clusterMap.size, pillars: pillarAudits.length },
    summary: {
      avgInboundCoveragePct: Math.round(
        pillarAudits.reduce((sum, p) => sum + p.inboundCoveragePct, 0) / pillarAudits.length
      ),
      avgOutboundCoveragePct: Math.round(
        pillarAudits.reduce((sum, p) => sum + p.outboundCoveragePct, 0) / pillarAudits.length
      ),
      totalInternalLinks: posts.reduce((sum, p) => sum + p.linksOut.length, 0),
      linkOrphanCount: linkOrphans.length,
      noClusterCount: orphans.length
    },
    pillars: pillarAudits,
    topInboundRecipients: topInbound,
    linkOrphans: linkOrphans.slice(0, 50),
    orphansNoCluster: orphans
  };
  await fs.writeFile(OUTPUT_JSON, JSON.stringify(json, null, 2) + '\n');
  console.log(`Wrote ${OUTPUT_JSON}`);

  // ── Write Markdown ──
  const lines = [];
  lines.push('# Pillar→Cluster Internal Linking Audit');
  lines.push('');
  lines.push(`> Auto-generated by \`scripts/seo/audit-pillar-linking.mjs\`. Re-run after content changes.`);
  lines.push('');
  lines.push(`**Generated:** ${json.generatedAt}`);
  lines.push(`**Corpus:** ${posts.length} blog posts · ${clusterMap.size} clusters · ${pillarAudits.length} pillars`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Average **inbound** coverage (cluster siblings linking back to their pillar): **${json.summary.avgInboundCoveragePct}%**`);
  lines.push(`- Average **outbound** coverage (pillars linking out to their cluster siblings): **${json.summary.avgOutboundCoveragePct}%**`);
  lines.push(`- Total internal blog→blog links across all posts: **${json.summary.totalInternalLinks}**`);
  lines.push(`- Posts with zero inbound internal links (excluding glossary): **${json.summary.linkOrphanCount}**`);
  lines.push(`- Posts with no \`cluster\` frontmatter (topic-graph orphans): **${json.summary.noClusterCount}**`);
  lines.push('');
  lines.push('> A healthy pillar has **70%+ inbound coverage** (most cluster siblings link back to it). Below 30% is broken.');
  lines.push('');
  lines.push('## Pillars — sorted by worst inbound coverage first');
  lines.push('');
  lines.push('| Cluster | Pillar | Siblings | Inbound | Outbound |');
  lines.push('|---------|--------|---------:|--------:|---------:|');
  for (const p of pillarAudits) {
    const inIcon = p.inboundCoveragePct >= 70 ? '✅' : p.inboundCoveragePct >= 30 ? '⚠️' : '❌';
    const outIcon = p.outboundCoveragePct >= 70 ? '✅' : p.outboundCoveragePct >= 30 ? '⚠️' : '❌';
    lines.push(
      `| ${p.cluster} | [${p.pillarTitle}](/blog/${p.pillarSlug}) | ${p.siblingCount} | ${inIcon} ${p.inboundFromSiblings}/${p.siblingCount} (${p.inboundCoveragePct}%) | ${outIcon} ${p.outboundToSiblings}/${p.siblingCount} (${p.outboundCoveragePct}%) |`
    );
  }
  lines.push('');

  lines.push('## Action list — siblings that should add a link to their pillar');
  lines.push('');
  for (const p of pillarAudits) {
    if (p.missingInboundFrom.length === 0) continue;
    lines.push(`### ${p.cluster} — pillar: \`${p.pillarSlug}\` (${p.inboundCoveragePct}% coverage)`);
    lines.push('');
    lines.push(`Add an internal link to \`/blog/${p.pillarSlug}\` from each of these ${p.missingInboundFrom.length} cluster posts:`);
    lines.push('');
    for (const m of p.missingInboundFrom) {
      lines.push(`- \`${m.slug}\` — ${m.title}`);
    }
    lines.push('');
  }

  lines.push('## Top 30 most-linked-to posts (inbound link recipients)');
  lines.push('');
  lines.push('| Slug | Inbound link count |');
  lines.push('|------|-------------------:|');
  for (const t of topInbound) {
    lines.push(`| \`${t.slug}\` | ${t.count} |`);
  }
  lines.push('');

  if (linkOrphans.length > 0) {
    lines.push('## Link orphans — posts with ZERO inbound internal links (excluding glossary)');
    lines.push('');
    lines.push('These posts exist but no other post on the site links to them. They are invisible to internal-link equity flow.');
    lines.push('');
    for (const o of linkOrphans.slice(0, 50)) {
      lines.push(`- \`${o.slug}\` — ${o.title} _(cluster: ${o.cluster || 'NONE'})_`);
    }
    if (linkOrphans.length > 50) {
      lines.push(`- … and ${linkOrphans.length - 50} more (see pillar-link-audit.json)`);
    }
    lines.push('');
  }

  await fs.writeFile(OUTPUT_MD, lines.join('\n'));
  console.log(`Wrote ${OUTPUT_MD}`);

  // Console summary
  console.log('');
  console.log('=== PILLAR LINKING AUDIT SUMMARY ===');
  console.log(`Pillars analyzed: ${pillarAudits.length}`);
  console.log(`Average inbound coverage: ${json.summary.avgInboundCoveragePct}%`);
  console.log(`Average outbound coverage: ${json.summary.avgOutboundCoveragePct}%`);
  console.log(`Total blog→blog internal links: ${json.summary.totalInternalLinks}`);
  console.log(`Link orphans (zero inbound, excluding glossary): ${json.summary.linkOrphanCount}`);
  console.log(`Posts with no cluster: ${json.summary.noClusterCount}`);
  console.log('');
  console.log('Worst-covered pillars (most actionable first):');
  for (const p of pillarAudits.slice(0, 10)) {
    const icon = p.inboundCoveragePct >= 70 ? '✅' : p.inboundCoveragePct >= 30 ? '⚠️' : '❌';
    console.log(`  ${icon} [${p.cluster}] ${p.pillarSlug} — ${p.inboundFromSiblings}/${p.siblingCount} siblings linking in (${p.inboundCoveragePct}%)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
