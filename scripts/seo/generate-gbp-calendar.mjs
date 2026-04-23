// Google Business Profile (GBP) posting calendar generator.
//
// Reads all blog posts, categorizes them into the 5 weekday variants
// (case-study, how-to, industry, comparison, glossary), prioritizes
// by content value, and outputs a 260-day calendar with ready-to-paste
// GBP copy for each day.
//
// Variants are sequenced Mon-Fri to avoid visual monotony in the GBP feed:
//   Monday    — case-study
//   Tuesday   — how-to
//   Wednesday — industry
//   Thursday  — comparison
//   Friday    — glossary
//
// Each post is built from the blog post's title, description, category,
// heroImage, and slug. Character count is enforced (target 900, absolute max
// 1500). Images fall back through hero → category-shared → stock default.
//
// Outputs:
//   content/seo/gbp-calendar.md — human-readable day-by-day calendar with copy-paste blocks
//   content/seo/gbp-posts.csv   — spreadsheet format for bulk import tools
//
// Run: node scripts/seo/generate-gbp-calendar.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const OUTPUT_MD = path.join(ROOT, 'content', 'seo', 'gbp-calendar.md');
const OUTPUT_CSV = path.join(ROOT, 'content', 'seo', 'gbp-posts.csv');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const SITE_URL = 'https://usersolutions.com';
const POSTS_PER_WEEK = 5;
const TOTAL_WEEKS = 52;
const START_DATE = new Date('2026-04-14'); // next Monday after commit df9da57
const TARGET_CHARS = 900;
const MAX_CHARS = 1500;

// Weekday rotation (index 0 = Monday, 4 = Friday)
const WEEKLY_ROTATION = ['case-study', 'how-to', 'industry', 'comparison', 'glossary'];

// Default fallback images per variant when heroImage is missing
const FALLBACK_IMAGES = {
  'case-study': '/marketing/blog/shared/case-studies/default.webp',
  'how-to': '/marketing/blog/shared/guides/default.webp',
  'industry': '/marketing/blog/shared/industries/default.webp',
  'comparison': '/marketing/blog/shared/comparisons/default.webp',
  'glossary': '/marketing/blog/shared/glossary/default.webp'
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function stripBom(raw) {
  return raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;
}

function parseFrontmatter(raw) {
  raw = stripBom(raw);
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return null;
  const block = m[1];
  const out = {};

  for (const field of ['title', 'description', 'category', 'cluster', 'heroImage', 'heroAlt']) {
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
  return out;
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDayOfWeek(date) {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
    date.getDay()
  ];
}

function getNextWeekday(date, targetDay) {
  // targetDay: 1=Mon, 5=Fri
  const result = new Date(date);
  const current = result.getDay();
  let diff = targetDay - current;
  if (diff < 0) diff += 7;
  result.setDate(result.getDate() + diff);
  return result;
}

function truncateToSentence(text, maxLen) {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastPeriod = cut.lastIndexOf('.');
  const lastSpace = cut.lastIndexOf(' ');
  if (lastPeriod > maxLen * 0.7) return cut.slice(0, lastPeriod + 1);
  if (lastSpace > maxLen * 0.7) return cut.slice(0, lastSpace) + '…';
  return cut + '…';
}

/**
 * Classify a blog post into one of the 5 GBP variant buckets.
 * Returns null if the post should be excluded from GBP calendar.
 */
function classifyPost(post) {
  const slug = post.slug;
  const title = (post.title || '').toLowerCase();
  const category = (post.category || '').toLowerCase();
  const cluster = (post.cluster || '').toLowerCase();

  // Glossary posts — Friday variant
  if (slug.startsWith('glossary-') || category === 'glossary' || cluster === 'glossary') {
    return 'glossary';
  }

  // Case studies — Monday variant
  if (
    slug.startsWith('case-study-') ||
    category === 'case studies' ||
    cluster === 'case-studies'
  ) {
    return 'case-study';
  }

  // Competitor comparisons / buyer's guide — Thursday variant
  if (
    slug.startsWith('rmdb-vs-') ||
    category === 'software comparison' ||
    cluster === 'competitor-comparisons' ||
    cluster === 'buyers-guide' ||
    title.includes(' vs ') ||
    title.includes('compare') ||
    title.includes('buyer') ||
    title.includes('how to choose')
  ) {
    return 'comparison';
  }

  // Industry solutions — Wednesday variant
  if (
    cluster === 'industry-solutions' ||
    category === 'industry solutions' ||
    /^(aerospace|automotive|chemical|cnc|consumer|contract|electronics|food|furniture|heavy|li-ion|machine|medical|metal|packaging|pharmaceutical|plastics|sheet-metal|textile|3d-printing)/i.test(
      slug
    )
  ) {
    return 'industry';
  }

  // How-to / practical guides — Tuesday variant
  if (
    title.startsWith('how to') ||
    title.includes('step-by-step') ||
    title.includes('guide') ||
    cluster === 'lean-manufacturing' ||
    cluster === 'production-scheduling' ||
    cluster === 'mrp' ||
    cluster === 'finite-capacity-planning' ||
    cluster === 'manufacturing-kpis' ||
    cluster === 'smart-manufacturing' ||
    cluster === 'quality-control' ||
    cluster === 'erp-integration' ||
    cluster === 'supply-chain' ||
    cluster === 'job-shop-scheduling' ||
    cluster === 'compliance-regulatory'
  ) {
    return 'how-to';
  }

  // Uncategorized — default to how-to bucket
  return 'how-to';
}

/**
 * Priority score for ordering — higher score posts go first.
 * Case studies and pillars get boosted; glossary gets lower priority
 * since there are 178 of them (we need to spread them across the year).
 */
function scorePost(post) {
  let score = 50;
  const slug = post.slug;
  const cluster = post.cluster || '';
  if (slug.startsWith('case-study-')) score += 30;
  if (slug.startsWith('rmdb-vs-')) score += 25;
  if (cluster === 'competitor-comparisons') score += 20;
  if (cluster === 'industry-solutions') score += 15;
  if (cluster === 'buyers-guide') score += 15;
  if (cluster === 'manufacturing-kpis') score += 10;
  if (slug.includes('-guide')) score += 10;
  if (slug.startsWith('how-to-')) score += 8;
  if (slug.startsWith('glossary-')) score -= 20; // abundant, spread out
  return score;
}

// ---------------------------------------------------------------------------
// GBP post builders — one function per variant
// ---------------------------------------------------------------------------

function hashtagsFor(post) {
  const tags = ['#UserSolutions'];
  const cluster = post.cluster || '';
  const category = (post.category || '').toLowerCase();
  const slug = post.slug;

  if (cluster === 'case-studies' || slug.startsWith('case-study-')) {
    tags.unshift('#ManufacturingCaseStudy');
  }
  if (cluster === 'industry-solutions') tags.unshift('#Manufacturing');
  if (cluster === 'production-scheduling') tags.unshift('#ProductionScheduling');
  if (cluster === 'finite-capacity-planning') tags.unshift('#FiniteCapacityScheduling');
  if (cluster === 'mrp') tags.unshift('#MRP');
  if (cluster === 'lean-manufacturing') tags.unshift('#LeanManufacturing');
  if (cluster === 'quality-control') tags.unshift('#QualityControl');
  if (cluster === 'erp-integration') tags.unshift('#ERPIntegration');
  if (cluster === 'supply-chain') tags.unshift('#SupplyChain');
  if (cluster === 'job-shop-scheduling') tags.unshift('#JobShop');
  if (cluster === 'manufacturing-kpis') tags.unshift('#ManufacturingKPIs');
  if (cluster === 'smart-manufacturing') tags.unshift('#Industry40');
  if (cluster === 'competitor-comparisons') tags.unshift('#SoftwareComparison');
  if (cluster === 'buyers-guide') tags.unshift('#BuyersGuide');
  if (cluster === 'glossary') tags.unshift('#ManufacturingTerms');

  if (/machine-shop|cnc/i.test(slug)) tags.push('#MachineShop');
  if (/metal-fab|sheet-metal/i.test(slug)) tags.push('#MetalFabrication');
  if (/aerospace|defense/i.test(slug)) tags.push('#Aerospace');
  if (/medical-device/i.test(slug)) tags.push('#MedicalDevice');
  if (/food|beverage/i.test(slug)) tags.push('#FoodManufacturing');
  if (/plastic|injection/i.test(slug)) tags.push('#Plastics');
  if (/furniture|woodworking/i.test(slug)) tags.push('#Furniture');
  if (/textile|garment/i.test(slug)) tags.push('#Textile');
  if (/packaging/i.test(slug)) tags.push('#Packaging');

  return tags.slice(0, 5).join(' ');
}

function buildCaseStudyPost(post) {
  const desc = truncateToSentence(post.description || '', 400);
  const body = [
    `🏆 ${post.title}`,
    '',
    desc,
    '',
    `See how manufacturers transform their production scheduling with RMDB by User Solutions.`,
    '',
    `Read the full story → ${SITE_URL}/blog/${post.slug}`,
    '',
    hashtagsFor(post)
  ].join('\n');
  return body;
}

function buildHowToPost(post) {
  const desc = truncateToSentence(post.description || '', 400);
  const body = [
    `🛠 ${post.title}`,
    '',
    desc,
    '',
    `Our full guide walks through the process with real manufacturing examples.`,
    '',
    `Read the guide → ${SITE_URL}/blog/${post.slug}`,
    '',
    hashtagsFor(post)
  ].join('\n');
  return body;
}

function buildIndustryPost(post) {
  const desc = truncateToSentence(post.description || '', 400);
  const body = [
    `🏭 ${post.title}`,
    '',
    desc,
    '',
    `RMDB handles finite-capacity scheduling built for the reality of this industry — used by manufacturers since 1991.`,
    '',
    `Learn more → ${SITE_URL}/blog/${post.slug}`,
    '',
    hashtagsFor(post)
  ].join('\n');
  return body;
}

function buildComparisonPost(post) {
  const desc = truncateToSentence(post.description || '', 450);
  const body = [
    `📊 ${post.title}`,
    '',
    desc,
    '',
    `Our honest comparison breaks down features, pricing, and implementation.`,
    '',
    `Read the comparison → ${SITE_URL}/blog/${post.slug}`,
    '',
    hashtagsFor(post)
  ].join('\n');
  return body;
}

function buildGlossaryPost(post) {
  const desc = truncateToSentence(post.description || '', 400);
  // Strip "glossary-" prefix for cleaner term display
  const term = post.title.replace(/\s*—\s*Manufacturing Glossary\s*$/i, '').trim();
  const body = [
    `📖 ${term}`,
    '',
    desc,
    '',
    `See how this fits into modern production scheduling with real examples from our manufacturing glossary.`,
    '',
    `Read the definition → ${SITE_URL}/blog/${post.slug}`,
    '',
    hashtagsFor(post)
  ].join('\n');
  return body;
}

const VARIANT_BUILDERS = {
  'case-study': buildCaseStudyPost,
  'how-to': buildHowToPost,
  industry: buildIndustryPost,
  comparison: buildComparisonPost,
  glossary: buildGlossaryPost
};

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
    const fm = parseFrontmatter(raw);
    if (!fm || !fm.title) {
      malformed++;
      continue;
    }
    posts.push({
      slug,
      title: fm.title,
      description: fm.description || '',
      category: fm.category || '',
      cluster: fm.cluster || '',
      heroImage: fm.heroImage || '',
      heroAlt: fm.heroAlt || ''
    });
  }
  console.log(`  ${posts.length} valid posts (${malformed} skipped as malformed)`);

  // Bucket by variant
  const buckets = {
    'case-study': [],
    'how-to': [],
    industry: [],
    comparison: [],
    glossary: []
  };

  for (const post of posts) {
    const variant = classifyPost(post);
    if (!variant) continue;
    post.variant = variant;
    post.score = scorePost(post);
    buckets[variant].push(post);
  }

  // Sort each bucket by score descending (highest-priority first)
  for (const variant of Object.keys(buckets)) {
    buckets[variant].sort((a, b) => b.score - a.score);
  }

  console.log('');
  console.log('Bucket sizes:');
  for (const [variant, list] of Object.entries(buckets)) {
    console.log(`  ${variant.padEnd(12)} ${list.length} posts`);
  }

  // Build the calendar
  const calendar = [];
  const usedBySlug = new Set();
  let currentDate = getNextWeekday(START_DATE, 1); // first Monday

  for (let week = 0; week < TOTAL_WEEKS; week++) {
    for (let dow = 0; dow < POSTS_PER_WEEK; dow++) {
      const variant = WEEKLY_ROTATION[dow % WEEKLY_ROTATION.length];
      const bucket = buckets[variant];

      // Pick the next unused post from this bucket
      let post = null;
      for (const candidate of bucket) {
        if (!usedBySlug.has(candidate.slug)) {
          post = candidate;
          usedBySlug.add(candidate.slug);
          break;
        }
      }

      if (!post) {
        // Bucket exhausted — fall back to any unused post
        const fallback = posts.find((p) => !usedBySlug.has(p.slug));
        if (fallback) {
          post = { ...fallback, variant };
          usedBySlug.add(fallback.slug);
        }
      }

      if (!post) {
        console.log(
          `  ⚠️  No posts left to schedule after ${calendar.length} days — stopping`
        );
        break;
      }

      const builder = VARIANT_BUILDERS[variant];
      const body = builder(post);

      calendar.push({
        date: formatDate(currentDate),
        dayOfWeek: formatDayOfWeek(currentDate),
        week: week + 1,
        variant,
        slug: post.slug,
        title: post.title,
        category: post.category,
        cluster: post.cluster,
        body,
        charCount: body.length,
        heroImage: post.heroImage || FALLBACK_IMAGES[variant],
        heroAlt: post.heroAlt || post.title,
        ctaLabel: 'Learn more',
        ctaUrl: `${SITE_URL}/blog/${post.slug}`
      });

      // Advance to next weekday
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // Skip weekend (advance to next Monday)
    while (currentDate.getDay() !== 1) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  // ── Write markdown calendar ──
  const md = [];
  md.push('# Google Business Profile (GBP) Posting Calendar');
  md.push('');
  md.push(`> **Auto-generated** by \`scripts/seo/generate-gbp-calendar.mjs\`. Do not edit by hand. Re-run the script when new blog posts are added.`);
  md.push('');
  md.push(`**Generated:** ${formatDate(new Date())}`);
  md.push(`**Duration:** ${TOTAL_WEEKS} weeks (${calendar.length} posts)`);
  md.push(`**Cadence:** ${POSTS_PER_WEEK} posts/week, Monday–Friday`);
  md.push(`**Start date:** ${formatDate(START_DATE)}`);
  md.push(`**End date:** ${calendar.length > 0 ? calendar[calendar.length - 1].date : 'N/A'}`);
  md.push('');
  md.push('## How to use this calendar');
  md.push('');
  md.push('1. Open this file each weekday morning (or batch-schedule weekly on Sunday)');
  md.push('2. Find the next unposted entry by date');
  md.push('3. Copy the "Post body" block verbatim into GBP → Add update');
  md.push('4. Upload the image from `heroImage` path (or use fallback)');
  md.push('5. Set CTA button to "Learn more" and paste the CTA URL');
  md.push('6. Mark the entry as posted: add `✅ POSTED` on the date line, or delete the entry');
  md.push('');
  md.push('**Regenerate:** `node scripts/seo/generate-gbp-calendar.mjs`');
  md.push('');

  md.push('## Variant distribution');
  md.push('');
  md.push('| Variant | Day | Count | % |');
  md.push('|---|---|---:|---:|');
  for (const v of WEEKLY_ROTATION) {
    const count = calendar.filter((c) => c.variant === v).length;
    const pct = calendar.length > 0 ? Math.round((count / calendar.length) * 100) : 0;
    const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][WEEKLY_ROTATION.indexOf(v)];
    md.push(`| ${v} | ${day} | ${count} | ${pct}% |`);
  }
  md.push('');

  md.push('---');
  md.push('');
  md.push('## Daily calendar');
  md.push('');

  let currentWeek = -1;
  for (const entry of calendar) {
    if (entry.week !== currentWeek) {
      currentWeek = entry.week;
      md.push(`### Week ${currentWeek}`);
      md.push('');
    }
    md.push(
      `#### ${entry.date} (${entry.dayOfWeek}) — ${entry.variant}`
    );
    md.push('');
    md.push(`**Slug:** \`${entry.slug}\``);
    md.push(`**Category:** ${entry.category || '(uncategorized)'}`);
    md.push(`**Character count:** ${entry.charCount} / ${MAX_CHARS}`);
    md.push(`**Image URL:** \`${SITE_URL}${entry.heroImage}\``);
    md.push(`**CTA button:** \`${entry.ctaLabel}\` → \`${entry.ctaUrl}\``);
    md.push('');
    md.push('**Post body (copy-paste):**');
    md.push('');
    md.push('```');
    md.push(entry.body);
    md.push('```');
    md.push('');
    md.push('---');
    md.push('');
  }

  await fs.mkdir(path.dirname(OUTPUT_MD), { recursive: true });
  await fs.writeFile(OUTPUT_MD, md.join('\n'));
  console.log(`Wrote ${OUTPUT_MD}`);

  // ── Write CSV for bulk import ──
  const csvHeader = [
    'date',
    'day_of_week',
    'week',
    'variant',
    'slug',
    'title',
    'category',
    'char_count',
    'image_url',
    'cta_label',
    'cta_url',
    'body'
  ];

  function csvEscape(val) {
    if (val == null) return '';
    const s = String(val);
    if (s.includes('"') || s.includes(',') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  const csvRows = [csvHeader.join(',')];
  for (const entry of calendar) {
    csvRows.push(
      [
        entry.date,
        entry.dayOfWeek,
        entry.week,
        entry.variant,
        entry.slug,
        entry.title,
        entry.category,
        entry.charCount,
        `${SITE_URL}${entry.heroImage}`,
        entry.ctaLabel,
        entry.ctaUrl,
        entry.body
      ]
        .map(csvEscape)
        .join(',')
    );
  }
  await fs.writeFile(OUTPUT_CSV, csvRows.join('\n'));
  console.log(`Wrote ${OUTPUT_CSV}`);

  // ── Console summary ──
  console.log('');
  console.log('=== CALENDAR GENERATED ===');
  console.log(`Total posts scheduled: ${calendar.length}`);
  console.log(`Date range: ${calendar[0]?.date} → ${calendar[calendar.length - 1]?.date}`);
  console.log('Avg char count:', Math.round(
    calendar.reduce((s, c) => s + c.charCount, 0) / calendar.length
  ));
  const overLimit = calendar.filter((c) => c.charCount > MAX_CHARS).length;
  if (overLimit > 0) {
    console.log(`⚠️  ${overLimit} posts exceed ${MAX_CHARS} char limit`);
  } else {
    console.log(`✅ All posts within ${MAX_CHARS} char limit`);
  }
  const overTarget = calendar.filter((c) => c.charCount > TARGET_CHARS).length;
  console.log(`Posts exceeding target (${TARGET_CHARS}): ${overTarget}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
