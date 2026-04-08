/**
 * Submit all blog URLs to IndexNow + Google after deploy.
 *
 * Usage:
 *   npx tsx scripts/submit-all-urls.ts
 *
 * Or after deploy:
 *   curl -X POST https://usersolutions.com/api/indexnow \
 *     -H "Content-Type: application/json" \
 *     -d '{"urls": ["/blog/production-scheduling-software-guide", ...]}'
 */

const BASE_URL = 'https://usersolutions.com';

async function main() {
  // Dynamically import content-collections
  const { allPosts } = await import('../.content-collections/generated/index.js');

  const blogUrls = allPosts.map(
    (post: { slugAsParams: string }) => `/blog/${post.slugAsParams}`
  );

  // IndexNow allows up to 10,000 URLs per request
  const batchSize = 500;
  let totalSubmitted = 0;

  console.log(`Submitting ${blogUrls.length} blog URLs...`);

  for (let i = 0; i < blogUrls.length; i += batchSize) {
    const batch = blogUrls.slice(i, i + batchSize);

    try {
      const response = await fetch(`${BASE_URL}/api/indexnow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: batch })
      });

      const result = await response.json();
      totalSubmitted += batch.length;
      console.log(
        `Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} URLs — IndexNow: ${result.indexNow?.success ? 'OK' : 'FAILED'}, Google Ping: ${result.googlePing?.ok ? 'OK' : 'FAILED'}`
      );
    } catch (error) {
      console.error(`Batch ${Math.floor(i / batchSize) + 1} failed:`, error);
    }
  }

  console.log(`\nDone! ${totalSubmitted}/${blogUrls.length} URLs submitted.`);
  console.log('\nNext steps:');
  console.log('1. Go to Google Search Console → Sitemaps → Resubmit');
  console.log('2. Use GSC URL Inspection on pillar pages (max 10/day)');
  console.log('3. Share pillar pages on LinkedIn/X for social signals');
}

main().catch(console.error);
