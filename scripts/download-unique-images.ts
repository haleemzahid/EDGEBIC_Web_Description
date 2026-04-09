/**
 * Download unique hero images for ALL blog posts from Pexels.
 *
 * Usage:
 *   PEXELS_API_KEY=your-key npx tsx scripts/download-unique-images.ts
 *
 * Options:
 *   --dry-run     Preview what would be downloaded
 *   --skip=100    Skip first N posts (resume from where you left off)
 *   --limit=50    Only download N images (for testing)
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = process.env.PEXELS_API_KEY || '';
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'marketing', 'blog');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

if (!API_KEY) {
  console.error('Error: Set PEXELS_API_KEY environment variable.');
  console.error('Example: PEXELS_API_KEY=xxx npx tsx scripts/download-unique-images.ts');
  process.exit(1);
}

// Parse args
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const SKIP = parseInt(args.find(a => a.startsWith('--skip='))?.split('=')[1] || '0');
const LIMIT = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '99999');

// Track API calls for rate limiting
let apiCalls = 0;
let startTime = Date.now();

// ---------------------------------------------------------------------------
// Search queries per cluster (fallback context for better image results)
// ---------------------------------------------------------------------------
const CLUSTER_CONTEXT: Record<string, string[]> = {
  'production-scheduling': ['production scheduling', 'manufacturing planning', 'factory floor', 'gantt chart'],
  'job-shop-scheduling': ['machine shop', 'CNC machining', 'job shop', 'custom manufacturing'],
  'mrp': ['inventory warehouse', 'materials planning', 'bill of materials', 'supply planning'],
  'erp-integration': ['ERP software', 'system integration', 'data connection', 'manufacturing IT'],
  'finite-capacity-planning': ['factory capacity', 'resource management', 'machine utilization', 'manufacturing'],
  'lean-manufacturing': ['lean manufacturing', 'kanban board', '5S workplace', 'kaizen'],
  'industry-solutions': ['manufacturing industry', 'factory production', 'industrial equipment'],
  'manufacturing-kpis': ['manufacturing dashboard', 'KPI metrics', 'factory analytics', 'data screen'],
  'competitor-comparisons': ['software comparison', 'business decision', 'laptop analysis'],
  'supply-chain': ['supply chain', 'warehouse logistics', 'inventory management', 'shipping'],
  'smart-manufacturing': ['smart factory', 'robot automation', 'IoT sensors', 'digital manufacturing'],
  'quality-control': ['quality inspection', 'SPC chart', 'measurement', 'laboratory testing'],
  'glossary': ['manufacturing concept', 'industrial process', 'factory equipment'],
  'case-studies': ['manufacturing success', 'business team', 'factory improvement'],
  'buyers-guide': ['business meeting', 'software demo', 'team decision', 'ROI analysis'],
  'compliance-regulatory': ['regulatory compliance', 'audit documentation', 'quality certification']
};

// ---------------------------------------------------------------------------
// Pexels API
// ---------------------------------------------------------------------------
async function searchPexels(query: string, page = 1): Promise<string | null> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&page=${page}&orientation=landscape&size=large`;

  apiCalls++;

  try {
    const res = await fetch(url, {
      headers: { Authorization: API_KEY }
    });

    if (res.status === 429) {
      const elapsed = (Date.now() - startTime) / 1000;
      console.log(`  ⏳ Rate limited after ${apiCalls} calls in ${Math.round(elapsed)}s — waiting 65s...`);
      await sleep(65000);
      apiCalls = 0;
      startTime = Date.now();
      return searchPexels(query, page);
    }

    if (!res.ok) {
      console.error(`  API error: ${res.status}`);
      return null;
    }

    const data = await res.json() as { photos: { src: { landscape: string; large2x: string } }[] };
    if (data.photos && data.photos.length > 0) {
      // landscape = 1200x627, large2x = higher res
      return data.photos[0].src.landscape;
    }
    return null;
  } catch (e: any) {
    console.error(`  Fetch error: ${e.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Download image
// ---------------------------------------------------------------------------
function downloadImage(imageUrl: string, outputPath: string): Promise<boolean> {
  if (DRY_RUN) {
    console.log(`  [DRY RUN] → ${outputPath}`);
    return Promise.resolve(true);
  }

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve) => {
    const followRedirect = (url: string, depth = 0) => {
      if (depth > 5) { resolve(false); return; }

      const protocol = url.startsWith('https') ? https : require('http');
      protocol.get(url, (response: any) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirect = response.headers.location;
          if (redirect) { followRedirect(redirect, depth + 1); return; }
        }

        const file = fs.createWriteStream(outputPath);
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
        file.on('error', () => resolve(false));
      }).on('error', () => resolve(false));
    };

    followRedirect(imageUrl);
  });
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Build smart search query from post data
// ---------------------------------------------------------------------------
function buildQuery(title: string, cluster: string, slug: string): string {
  // Clean title — remove years, special chars, common filler words
  const cleanTitle = title
    .replace(/\(\d{4}\)/g, '')
    .replace(/[^a-zA-Z\s]/g, ' ')
    .replace(/\b(the|a|an|and|or|for|in|of|to|is|how|what|why|your|our|with|vs|from)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Take top 3-4 meaningful words from title
  const titleWords = cleanTitle.split(' ').filter(w => w.length > 3).slice(0, 4).join(' ');

  // Get cluster context — rotate through options to get variety
  const contexts = CLUSTER_CONTEXT[cluster] || CLUSTER_CONTEXT['glossary'];
  const contextIndex = slug.length % contexts.length; // Deterministic variety
  const context = contexts[contextIndex];

  return `${titleWords} ${context}`;
}

// ---------------------------------------------------------------------------
// Update MDX frontmatter
// ---------------------------------------------------------------------------
function updateMdxHeroImage(filePath: string, newHeroImage: string): void {
  if (DRY_RUN) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('heroImage:')) {
    const updated = content.replace(/heroImage:.*$/m, `heroImage: "${newHeroImage}"`);
    fs.writeFileSync(filePath, updated);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  Unique Blog Image Downloader (Pexels)    ║');
  console.log('╚════════════════════════════════════════════╝\n');

  // Get all MDX files
  const allFiles = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.mdx'))
    .sort();

  console.log(`Total MDX files: ${allFiles.length}`);
  console.log(`Skip: ${SKIP}, Limit: ${LIMIT}, Dry run: ${DRY_RUN}\n`);

  // Filter to process range
  const files = allFiles.slice(SKIP, SKIP + LIMIT);

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const slug = file.replace('.mdx', '');
    const heroDir = path.join(PUBLIC_DIR, slug);
    const heroPath = path.join(heroDir, 'hero.webp');
    const globalIndex = SKIP + i + 1;

    // Skip if unique image already exists
    if (fs.existsSync(heroPath)) {
      skipped++;
      continue;
    }

    // Read frontmatter
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    const clusterMatch = content.match(/cluster:\s*"?([^"\n]+)"?/);
    const title = titleMatch?.[1] || slug.replace(/-/g, ' ');
    const cluster = clusterMatch?.[1]?.trim() || 'glossary';

    const query = buildQuery(title, cluster, slug);

    // Progress bar
    const pct = Math.round((i / files.length) * 100);
    console.log(`[${globalIndex}/${allFiles.length}] (${pct}%) ${slug}`);
    console.log(`  Query: "${query}"`);

    // Search Pexels
    const imageUrl = await searchPexels(query);

    if (imageUrl) {
      const ok = await downloadImage(imageUrl, heroPath);
      if (ok) {
        // Update MDX frontmatter to point to unique image
        updateMdxHeroImage(
          path.join(CONTENT_DIR, file),
          `/marketing/blog/${slug}/hero.webp`
        );
        console.log(`  ✓ Downloaded`);
        downloaded++;
      } else {
        console.log(`  ✗ Download failed`);
        failed++;
      }
    } else {
      // Try simpler query as fallback
      const fallbackQuery = CLUSTER_CONTEXT[cluster]?.[0] || 'manufacturing factory';
      console.log(`  No results — trying fallback: "${fallbackQuery}"`);
      const fallbackUrl = await searchPexels(fallbackQuery, Math.floor(Math.random() * 10) + 1);

      if (fallbackUrl) {
        const ok = await downloadImage(fallbackUrl, heroPath);
        if (ok) {
          updateMdxHeroImage(
            path.join(CONTENT_DIR, file),
            `/marketing/blog/${slug}/hero.webp`
          );
          console.log(`  ✓ Downloaded (fallback)`);
          downloaded++;
        } else {
          console.log(`  ✗ Fallback download failed`);
          failed++;
        }
      } else {
        console.log(`  ✗ No images found at all`);
        failed++;
      }
    }

    // Smart rate limiting — stay under 200/hour
    // Pexels uses 2 calls per image (search + possible fallback)
    if (apiCalls >= 170) {
      const elapsed = (Date.now() - startTime) / 1000;
      const waitTime = Math.max(0, 3600 - elapsed) + 5;
      console.log(`\n  ⏳ Approaching rate limit (${apiCalls} calls). Waiting ${Math.round(waitTime)}s...\n`);
      await sleep(waitTime * 1000);
      apiCalls = 0;
      startTime = Date.now();
    } else {
      // Small delay between requests
      await sleep(300);
    }

    // Progress summary every 50 images
    if ((i + 1) % 50 === 0) {
      console.log(`\n  --- Progress: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed ---\n`);
    }
  }

  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  COMPLETE                                  ║');
  console.log('╚════════════════════════════════════════════╝\n');
  console.log(`  Downloaded:  ${downloaded}`);
  console.log(`  Skipped:     ${skipped} (already existed)`);
  console.log(`  Failed:      ${failed}`);
  console.log(`  Total:       ${downloaded + skipped + failed}/${files.length}\n`);

  if (failed > 0) {
    console.log(`To retry failed images, run again — it skips already-downloaded ones.\n`);
  }

  if (!DRY_RUN) {
    console.log('Next: git add . && git commit -m "Add unique blog hero images" && git push');
  }
}

main().catch(console.error);
