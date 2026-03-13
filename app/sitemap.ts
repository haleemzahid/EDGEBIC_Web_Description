import fs from 'fs/promises';
import path from 'path';
import { MetadataRoute } from 'next';
import { allDocs, allPosts } from 'content-collections';
import { getBaseUrl } from '@/lib/urls/get-base-url';

// High-priority pages that should be crawled more frequently
const HIGH_PRIORITY_PAGES = new Set([
  'resource-manager-db-2',
  'production-planning-scheduling-solutions',
  'features',
  'pricing',
  'success-stories',
  'faq',
  'about'
]);

const MEDIUM_PRIORITY_PAGES = new Set([
  'contact-us',
  'consulting',
  'edgebi',
  'resource-manager-for-excel-2',
  'excel-applications',
  'jsl-job-scheduler-lite',
  'operations-manager',
  'videos',
  'company-history',
  'mission-statement',
  'partners',
  'scheduling-software-for-job-shops',
  'defense-aerospace-manufacturing-scheduling',
  'electronics-manufacturing-scheduling-software',
  'heavy-equipment-manufacturing-scheduling',
  'consumer-goods-production-planning-software'
]);

function getPagePriority(urlPath: string): number {
  const slug = urlPath.split('/').pop() || '';
  if (HIGH_PRIORITY_PAGES.has(slug)) return 0.9;
  if (MEDIUM_PRIORITY_PAGES.has(slug)) return 0.7;
  if (urlPath.includes('success_stories/') || urlPath.includes('success-stories/')) return 0.6;
  if (urlPath.includes('operations-manager-')) return 0.5;
  if (urlPath.includes('buy-now')) return 0.4;
  return 0.5;
}

function getChangeFreq(urlPath: string): 'weekly' | 'monthly' | 'yearly' {
  const slug = urlPath.split('/').pop() || '';
  if (HIGH_PRIORITY_PAGES.has(slug)) return 'weekly';
  if (MEDIUM_PRIORITY_PAGES.has(slug)) return 'monthly';
  return 'monthly';
}

async function getMarketingPages(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  const marketingPath = path.join(process.cwd(), 'app', '(app)', '(marketing)');
  const routes: MetadataRoute.Sitemap = [];

  // Directories to skip (handled separately or should not be indexed)
  const skipDirs = ['home', 'docs', 'author', 'category', 'press_release', 'products'];

  // Pages to exclude from sitemap for SEO best practices
  const excludePages = [
    // Test/demo pages - not for public indexing
    'test',
    'test-home',
    'navigation-demo',
    // Thank you/confirmation pages - thin content
    'thankyou',
    'thankyou-for-downloading-jsl',
    'thankyou-for-downloading-resource-manager-for-excel',
    'thankyou-for-downloading-resource-manager-for-excel-student',
    'thankyou-for-downloading-spreadsheet-qc',
    'thankyou-for-downloading-spreadsheet-scheduler',
    'thankyou-for-downloading-workcell-planner',
    'thankyou-for-downloading-workcenterschedulerxl',
    'thankyoudownload-leadtime',
    'thankyoudownload-operations-manager',
    'thankyoudownload-resource-manager',
    'thankyoudownload-spreadsheet-qc',
    'thankyoudownload-spreadsheet-scheduler',
    'thankyoudownload-trendsmooth',
    'thankyoudownload-workcell-planner',
    'thankyoudownload-workcenter-schedulerxl',
    // Cart/checkout - transactional pages
    'cart',
    'checkout',
    // Redundant - HTML sitemap shouldn't be in XML sitemap
    'sitemap',
    // Old/archived versions - prefer canonical versions
    'excel-applications-old',
    'production-scheduling-products_old',
    'privacy-policy3',
    'product-downloads-3',
    // Duplicate content pages - use canonical instead
    'aboutus', // use /about instead
    'success_stories', // use /success-stories instead
    'mission' // use /mission-statement instead
  ];

  async function scanDirectory(dirPath: string, urlPrefix: string): Promise<void> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries.filter((e) => e.isDirectory())) {
      // Skip special directories and dynamic route folders
      if (skipDirs.includes(entry.name) || entry.name.startsWith('[')) continue;

      const fullPath = path.join(dirPath, entry.name);
      const urlPath = urlPrefix ? `${urlPrefix}/${entry.name}` : entry.name;

      // Skip excluded pages
      if (excludePages.includes(entry.name)) {
        // Still scan subdirectories in case they have valid pages
        await scanDirectory(fullPath, urlPath);
        continue;
      }

      // Check for page.tsx in the directory
      try {
        const pageStats = await fs.stat(path.join(fullPath, 'page.tsx'));
        routes.push({
          url: `${baseUrl}/${urlPath}`,
          lastModified: pageStats.mtime,
          changeFrequency: getChangeFreq(urlPath),
          priority: getPagePriority(urlPath)
        });
      } catch {
        // No page.tsx found at this level
      }

      // Recursively scan subdirectories
      await scanDirectory(fullPath, urlPath);
    }
  }

  await scanDirectory(marketingPath, '');
  return routes;
}

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const marketingPages = await getMarketingPages(baseUrl);

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    ...marketingPages,
    ...allDocs.map((doc) => ({
      url: `${baseUrl}${doc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    })),
    ...allPosts.map((post) => ({
      url: `${baseUrl}${post.slug}`,
      lastModified: post.published,
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  ];

  // Sort alphabetically by URL
  return sitemap.sort((a, b) => a.url.localeCompare(b.url));
}
