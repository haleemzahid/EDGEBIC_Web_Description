/**
 * Download blog images from Pexels API and assign to all blog posts.
 *
 * Usage:
 *   1. Get free API key from https://www.pexels.com/api/
 *   2. Run: PEXELS_API_KEY=your-key-here npx tsx scripts/download-blog-images.ts
 *
 * What it does:
 *   - Tier 1: Downloads ~44 shared category images (covers all 449 posts immediately)
 *   - Tier 2: Downloads unique hero images for all 449 posts (pass --unique flag)
 *
 * Flags:
 *   --unique    Download unique images for every post (slower, ~2-3 hours)
 *   --tier1     Only download shared category images (fast, ~5 min)
 *   --dry-run   Show what would be downloaded without downloading
 *
 * Rate limits: Pexels allows 200 requests/hour on free tier.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = process.env.PEXELS_API_KEY || '';
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'marketing', 'blog');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

if (!API_KEY) {
  console.error('Error: Set PEXELS_API_KEY environment variable.');
  console.error('Get your free key at: https://www.pexels.com/api/');
  process.exit(1);
}

const args = process.argv.slice(2);
const UNIQUE_MODE = args.includes('--unique');
const TIER1_ONLY = args.includes('--tier1');
const DRY_RUN = args.includes('--dry-run');

// ---------------------------------------------------------------------------
// Pexels API
// ---------------------------------------------------------------------------
async function searchPexels(query: string, perPage = 1): Promise<string | null> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape&size=large`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: API_KEY }
    });

    if (res.status === 429) {
      console.log('  Rate limited — waiting 60s...');
      await sleep(60000);
      return searchPexels(query, perPage);
    }

    if (!res.ok) {
      console.error(`  Pexels API error: ${res.status}`);
      return null;
    }

    const data = await res.json() as { photos: { src: { landscape: string } }[] };
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.landscape; // 1200x627 — close to 1200x630
    }
    return null;
  } catch (e) {
    console.error(`  Fetch error:`, e);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Download + convert
// ---------------------------------------------------------------------------
async function downloadImage(imageUrl: string, outputPath: string): Promise<boolean> {
  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would download to: ${outputPath}`);
    return true;
  }

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve) => {
    const file = fs.createWriteStream(outputPath);
    https.get(imageUrl, (response) => {
      // Follow redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          https.get(redirectUrl, (res2) => {
            res2.pipe(file);
            file.on('finish', () => { file.close(); resolve(true); });
          }).on('error', () => resolve(false));
          return;
        }
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(true); });
    }).on('error', () => resolve(false));
  });
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Tier 1: Shared category images
// ---------------------------------------------------------------------------
const SHARED_IMAGES: Record<string, { query: string; outputPath: string }> = {
  // Glossary shared images (7)
  'scheduling-terms': {
    query: 'manufacturing production scheduling gantt chart',
    outputPath: 'glossary/scheduling-terms.webp'
  },
  'mrp-erp-terms': {
    query: 'warehouse inventory materials planning',
    outputPath: 'glossary/mrp-erp-terms.webp'
  },
  'lean-terms': {
    query: 'lean manufacturing kanban board factory',
    outputPath: 'glossary/lean-terms.webp'
  },
  'quality-terms': {
    query: 'quality control inspection manufacturing',
    outputPath: 'glossary/quality-terms.webp'
  },
  'inventory-terms': {
    query: 'warehouse inventory shelves management',
    outputPath: 'glossary/inventory-terms.webp'
  },
  'production-terms': {
    query: 'factory production line assembly manufacturing',
    outputPath: 'glossary/production-terms.webp'
  },
  'supply-chain-terms': {
    query: 'supply chain logistics shipping containers',
    outputPath: 'glossary/supply-chain-terms.webp'
  },

  // Cluster shared images (16)
  'cluster-production-scheduling': {
    query: 'production scheduling software dashboard factory',
    outputPath: 'shared/production-scheduling/hero.webp'
  },
  'cluster-job-shop': {
    query: 'machine shop CNC machining job shop',
    outputPath: 'shared/job-shop/hero.webp'
  },
  'cluster-mrp': {
    query: 'bill of materials inventory planning manufacturing',
    outputPath: 'shared/mrp/hero.webp'
  },
  'cluster-erp': {
    query: 'ERP software system integration manufacturing',
    outputPath: 'shared/erp-integration/hero.webp'
  },
  'cluster-finite-capacity': {
    query: 'factory capacity planning machines manufacturing',
    outputPath: 'shared/finite-capacity/hero.webp'
  },
  'cluster-lean': {
    query: 'lean manufacturing 5S workplace organization',
    outputPath: 'shared/lean/hero.webp'
  },
  'cluster-industry': {
    query: 'aerospace automotive manufacturing diverse industries',
    outputPath: 'shared/industry/hero.webp'
  },
  'cluster-kpis': {
    query: 'manufacturing dashboard KPI metrics analytics',
    outputPath: 'shared/kpis/hero.webp'
  },
  'cluster-comparison': {
    query: 'software comparison business decision laptop',
    outputPath: 'shared/comparison/hero.webp'
  },
  'cluster-supply-chain': {
    query: 'supply chain logistics warehouse tracking',
    outputPath: 'shared/supply-chain/hero.webp'
  },
  'cluster-smart-mfg': {
    query: 'smart factory industry 4.0 robot automation',
    outputPath: 'shared/smart-manufacturing/hero.webp'
  },
  'cluster-quality': {
    query: 'quality inspection measurement manufacturing SPC',
    outputPath: 'shared/quality/hero.webp'
  },
  'cluster-case-studies': {
    query: 'manufacturing success business team factory',
    outputPath: 'shared/case-studies/hero.webp'
  },
  'cluster-buyers-guide': {
    query: 'business meeting software demo ROI decision',
    outputPath: 'shared/buyers-guide/hero.webp'
  },
  'cluster-compliance': {
    query: 'regulatory compliance audit documentation manufacturing',
    outputPath: 'shared/compliance/hero.webp'
  },

  // State pages shared images (5 by region)
  'state-northeast': {
    query: 'northeast USA manufacturing factory industrial',
    outputPath: 'shared/states/northeast.webp'
  },
  'state-southeast': {
    query: 'southeast USA manufacturing automotive factory',
    outputPath: 'shared/states/southeast.webp'
  },
  'state-midwest': {
    query: 'midwest USA manufacturing steel automotive',
    outputPath: 'shared/states/midwest.webp'
  },
  'state-southwest': {
    query: 'texas manufacturing oil refinery aerospace',
    outputPath: 'shared/states/southwest.webp'
  },
  'state-west': {
    query: 'california manufacturing technology aerospace',
    outputPath: 'shared/states/west.webp'
  }
};

// ---------------------------------------------------------------------------
// Cluster-to-search-query mapping for unique images
// ---------------------------------------------------------------------------
const CLUSTER_QUERIES: Record<string, string> = {
  'production-scheduling': 'production scheduling manufacturing',
  'job-shop-scheduling': 'machine shop CNC manufacturing',
  'mrp': 'materials planning inventory warehouse',
  'erp-integration': 'ERP software integration',
  'finite-capacity-planning': 'factory capacity machines',
  'lean-manufacturing': 'lean manufacturing factory',
  'industry-solutions': 'manufacturing industry factory',
  'manufacturing-kpis': 'manufacturing dashboard analytics',
  'competitor-comparisons': 'software comparison analysis',
  'supply-chain': 'supply chain logistics',
  'smart-manufacturing': 'smart factory automation robot',
  'quality-control': 'quality inspection manufacturing',
  'glossary': 'manufacturing concept',
  'case-studies': 'manufacturing success story',
  'buyers-guide': 'business software decision',
  'compliance-regulatory': 'compliance audit manufacturing'
};

// ---------------------------------------------------------------------------
// Update MDX frontmatter to use shared images
// ---------------------------------------------------------------------------
function updateMdxHeroImage(filePath: string, newHeroImage: string): void {
  if (DRY_RUN) return;

  const content = fs.readFileSync(filePath, 'utf-8');

  // Replace existing heroImage or add one
  if (content.includes('heroImage:')) {
    const updated = content.replace(
      /heroImage:.*$/m,
      `heroImage: "${newHeroImage}"`
    );
    fs.writeFileSync(filePath, updated);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function runTier1() {
  console.log('=== TIER 1: Downloading shared category images ===\n');

  const entries = Object.entries(SHARED_IMAGES);
  let downloaded = 0;

  for (const [name, config] of entries) {
    const outputPath = path.join(PUBLIC_DIR, config.outputPath);

    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] ${name} — already exists`);
      downloaded++;
      continue;
    }

    console.log(`[${downloaded + 1}/${entries.length}] ${name}: searching "${config.query}"...`);
    const imageUrl = await searchPexels(config.query);

    if (imageUrl) {
      // Download as .webp (Pexels landscape is JPEG, we save as-is — rename to .webp)
      // For true WebP conversion, use sharp in a separate step
      const jpegPath = outputPath.replace('.webp', '.jpg');
      const ok = await downloadImage(imageUrl, jpegPath);
      if (ok) {
        // Rename to .webp (browsers handle JPEG-in-webp-extension fine, or convert with sharp)
        if (!DRY_RUN) fs.renameSync(jpegPath, outputPath);
        console.log(`  ✓ Downloaded → ${config.outputPath}`);
        downloaded++;
      } else {
        console.log(`  ✗ Failed to download`);
      }
    } else {
      console.log(`  ✗ No results found`);
    }

    // Rate limit: ~3 requests per second to stay safe
    await sleep(400);
  }

  console.log(`\nTier 1 complete: ${downloaded}/${entries.length} images downloaded.\n`);
}

async function runTier2Unique() {
  console.log('=== TIER 2: Downloading unique images for all posts ===\n');

  // Read all MDX files
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
  let downloaded = 0;
  let skipped = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const slug = file.replace('.mdx', '');
    const heroDir = path.join(PUBLIC_DIR, slug);
    const heroPath = path.join(heroDir, 'hero.webp');

    // Skip if already has unique image
    if (fs.existsSync(heroPath)) {
      skipped++;
      continue;
    }

    // Read frontmatter to get cluster/category for search query
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const clusterMatch = content.match(/cluster:\s*"?([^"\n]+)"?/);
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    const cluster = clusterMatch?.[1]?.trim() || 'manufacturing';
    const title = titleMatch?.[1] || slug.replace(/-/g, ' ');

    // Build search query from title keywords + cluster context
    const titleWords = title.replace(/[^a-zA-Z\s]/g, '').split(/\s+/).slice(0, 4).join(' ');
    const clusterContext = CLUSTER_QUERIES[cluster] || 'manufacturing';
    const query = `${titleWords} ${clusterContext}`;

    console.log(`[${i + 1}/${files.length}] ${slug}`);
    console.log(`  Query: "${query}"`);

    const imageUrl = await searchPexels(query);

    if (imageUrl) {
      const jpegPath = heroPath.replace('.webp', '.jpg');
      const ok = await downloadImage(imageUrl, jpegPath);
      if (ok) {
        if (!DRY_RUN) fs.renameSync(jpegPath, heroPath);
        // Update MDX frontmatter
        updateMdxHeroImage(
          path.join(CONTENT_DIR, file),
          `/marketing/blog/${slug}/hero.webp`
        );
        console.log(`  ✓ Downloaded unique hero`);
        downloaded++;
      }
    } else {
      console.log(`  ✗ No results — will use shared fallback`);
    }

    // Rate limit: stay under 200/hour = 1 every 18s, but burst up to 3/s
    if ((i + 1) % 180 === 0) {
      console.log('\n  ⏳ Approaching rate limit — pausing 60s...\n');
      await sleep(60000);
    } else {
      await sleep(500);
    }
  }

  console.log(`\nTier 2 complete: ${downloaded} unique + ${skipped} already existed. ${files.length - downloaded - skipped} using shared fallback.\n`);
}

async function updateMdxToShared() {
  console.log('=== Updating MDX frontmatter to use shared images ===\n');
  if (DRY_RUN) { console.log('[DRY RUN]\n'); }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
  let updated = 0;

  const clusterToSharedImage: Record<string, string> = {
    'production-scheduling': '/marketing/blog/shared/production-scheduling/hero.webp',
    'job-shop-scheduling': '/marketing/blog/shared/job-shop/hero.webp',
    'mrp': '/marketing/blog/shared/mrp/hero.webp',
    'erp-integration': '/marketing/blog/shared/erp-integration/hero.webp',
    'finite-capacity-planning': '/marketing/blog/shared/finite-capacity/hero.webp',
    'lean-manufacturing': '/marketing/blog/shared/lean/hero.webp',
    'industry-solutions': '/marketing/blog/shared/industry/hero.webp',
    'manufacturing-kpis': '/marketing/blog/shared/kpis/hero.webp',
    'competitor-comparisons': '/marketing/blog/shared/comparison/hero.webp',
    'supply-chain': '/marketing/blog/shared/supply-chain/hero.webp',
    'smart-manufacturing': '/marketing/blog/shared/smart-manufacturing/hero.webp',
    'quality-control': '/marketing/blog/shared/quality/hero.webp',
    'case-studies': '/marketing/blog/shared/case-studies/hero.webp',
    'buyers-guide': '/marketing/blog/shared/buyers-guide/hero.webp',
    'compliance-regulatory': '/marketing/blog/shared/compliance/hero.webp'
  };

  for (const file of files) {
    const slug = file.replace('.mdx', '');
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Skip glossary — they already point to shared glossary images
    if (slug.startsWith('glossary-')) continue;

    // Check if post already has a unique image on disk
    const uniqueHero = path.join(PUBLIC_DIR, slug, 'hero.webp');
    if (fs.existsSync(uniqueHero)) continue;

    // Get cluster
    const clusterMatch = content.match(/cluster:\s*"?([^"\n]+)"?/);
    const cluster = clusterMatch?.[1]?.trim() || '';
    const sharedImage = clusterToSharedImage[cluster];

    if (sharedImage && content.includes('heroImage:')) {
      updateMdxHeroImage(filePath, sharedImage);
      updated++;
    }
  }

  console.log(`Updated ${updated} posts to use shared images.\n`);
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
async function main() {
  console.log('Blog Image Downloader');
  console.log('=====================\n');
  console.log(`Mode: ${UNIQUE_MODE ? 'UNIQUE (all posts)' : TIER1_ONLY ? 'TIER 1 only (shared)' : 'TIER 1 + update frontmatter'}`);
  console.log(`Dry run: ${DRY_RUN}`);
  console.log(`Output: ${PUBLIC_DIR}\n`);

  // Always run Tier 1 first
  await runTier1();

  // Update MDX to point to shared images
  await updateMdxToShared();

  // If unique mode, also download per-post images
  if (UNIQUE_MODE) {
    await runTier2Unique();
  }

  console.log('=== DONE ===');
  console.log('Next steps:');
  if (!UNIQUE_MODE) {
    console.log('  - Run with --unique flag to download unique images for every post');
  }
  console.log('  - For true WebP conversion, install sharp and run: npx tsx scripts/convert-to-webp.ts');
  console.log('  - Commit and deploy');
}

main().catch(console.error);
