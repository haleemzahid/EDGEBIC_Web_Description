import fs from 'fs/promises';
import path from 'path';
import { MetadataRoute } from 'next';
import { allDocs, allPosts } from 'content-collections';
import { getBaseUrl } from '@/lib/urls/get-base-url';

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
          lastModified: pageStats.mtime
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
      lastModified: new Date()
    },
    ...marketingPages,
    ...allDocs.map((doc) => ({
      url: `${baseUrl}${doc.slug}`,
      lastModified: new Date()
    })),
    ...allPosts.map((post) => ({
      url: `${baseUrl}${post.slug}`,
      lastModified: post.published
    }))
  ];

  // Sort alphabetically by URL
  return sitemap.sort((a, b) => a.url.localeCompare(b.url));
}
