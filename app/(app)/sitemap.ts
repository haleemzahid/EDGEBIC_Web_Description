import fs from 'fs/promises';
import path from 'path';
import { MetadataRoute } from 'next';
import { allDocs, allPosts } from 'content-collections';
import { getBaseUrl } from '@/lib/urls/get-base-url';

async function getMarketingPages(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  const marketingPath = path.join(process.cwd(), 'app', '(app)', '(marketing)');
  const entries = await fs.readdir(marketingPath, { withFileTypes: true });
  const routes: MetadataRoute.Sitemap = [];

  for (const entry of entries.filter((e) => e.isDirectory())) {
    // Skip 'home' directory as it's handled separately as the root URL
    if (entry.name === 'home') continue;

    // Check for page.tsx in the directory
    try {
      const fullPath = path.join(marketingPath, entry.name);
      const pageStats = await fs.stat(path.join(fullPath, 'page.tsx'));

      routes.push({
        url: `${baseUrl}/${entry.name}`,
        lastModified: pageStats.mtime
      });
    } catch {
      // No page.tsx found, skip this directory
      continue;
    }
  }

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
