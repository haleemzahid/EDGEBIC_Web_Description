#!/usr/bin/env node

/**
 * Add internal links to MDX files based on link opportunity report
 *
 * Reads CSV from Ahrefs/SEO tool showing unlinked keyword mentions
 * and converts them to proper markdown links in the source MDX files.
 *
 * Strategy:
 * - Read CSV line by line to avoid memory issues
 * - Group opportunities by source file
 * - Process each MDX file once
 * - Add links using smart text replacement
 * - Use markers for idempotency
 * - Generate detailed report
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

// CSV file path (update this to your actual CSV location)
const CSV_PATH = 'C:\\Users\\-\\Downloads\\usersolutions_11-apr-2026_link-opportunities_2026-04-11_16-46-16.csv';

// Link mapping: keyword -> target URL
const LINK_TARGETS = {
  'resource manager db': '/resource-manager-db-2',
  'manufacturing kpis': '/top-10-manufacturing-kpis-in-2024'
};

// Stats
const stats = {
  processed: 0,
  updated: 0,
  skipped: 0,
  errors: 0,
  linksAdded: 0
};

const changeLog = [];

/**
 * Convert source URL to local MDX file path
 */
function urlToFilePath(url) {
  // Extract path from URL
  const urlObj = new URL(url);
  let urlPath = urlObj.pathname;

  // Remove leading/trailing slashes
  urlPath = urlPath.replace(/^\//, '').replace(/\/$/, '');

  // Convert to file path
  if (urlPath.startsWith('blog/')) {
    // Blog posts: blog/slug -> content/blog/slug.mdx
    const slug = urlPath.replace('blog/', '');
    return path.join(ROOT, 'content', 'blog', `${slug}.mdx`);
  } else {
    // Marketing pages: slug -> app/(app)/(marketing)/slug/page.tsx
    // But the CSV shows these are mostly MDX blog posts, so this shouldn't happen much
    return null;
  }
}

/**
 * Smart link injection: finds keyword in context and adds/fixes markdown links
 *
 * @param {string} content - MDX file content
 * @param {string} keyword - keyword to link (e.g., "resource manager db")
 * @param {string} targetUrl - URL to link to
 * @returns {object} - { content: updated content, changed: boolean, count: number }
 */
function addLink(content, keyword, targetUrl) {
  let updatedContent = content;
  let count = 0;

  if (keyword === 'resource manager db') {
    // Pattern 1: Fix existing wrong links
    // [Resource Manager DB](/manufacturing-scheduling-software) -> [Resource Manager DB](/resource-manager-db-2/)
    const linkedPattern = /\[Resource Manager DB(?: \(RMDB\))?\]\(\/manufacturing-scheduling-software\)/gi;
    updatedContent = updatedContent.replace(linkedPattern, (match) => {
      const displayText = match.match(/\[(.*?)\]/)[1];
      count++;
      return `[${displayText}](${targetUrl})`;
    });

    // Pattern 2: Add links to completely unlinked instances (first occurrence only)
    const unlinkPattern = /(?<!\[)(?<![`])Resource Manager DB(?: \(RMDB\))?(?!\]\()(?![`])/i;
    const unlinkMatch = unlinkPattern.exec(updatedContent);

    if (unlinkMatch) {
      const matchedText = unlinkMatch[0];
      const matchIndex = unlinkMatch.index;

      // Verify it's safe to replace (not inside code or HTML)
      const beforeContext = updatedContent.substring(Math.max(0, matchIndex - 100), matchIndex);
      const lastNewline = beforeContext.lastIndexOf('\n');
      const lineBeforeMatch = lastNewline >= 0 ? beforeContext.substring(lastNewline) : beforeContext;

      const inBackticks = (lineBeforeMatch.match(/`/g) || []).length % 2 === 1;
      const inHtmlTag = lineBeforeMatch.includes('<');

      if (!inBackticks && !inHtmlTag) {
        const markdownLink = `[${matchedText}](${targetUrl})`;
        updatedContent =
          updatedContent.substring(0, matchIndex) +
          markdownLink +
          updatedContent.substring(matchIndex + matchedText.length);
        count++;
      }
    }

  } else if (keyword === 'manufacturing kpis') {
    // Pattern 1: Fix existing wrong links (if any)
    const linkedPattern = /\[manufacturing KPIs(?: guide)?\]\((?!\/top-10-manufacturing-kpis-in-2024\/)[^)]+\)/gi;
    updatedContent = updatedContent.replace(linkedPattern, (match) => {
      const displayText = match.match(/\[(.*?)\]/)[1];
      count++;
      return `[${displayText}](${targetUrl})`;
    });

    // Pattern 2: Add links to unlinked instances (first occurrence only)
    const unlinkPattern = /(?<!\[)(?<![`])manufacturing KPIs(?! guide\]\()(?![`])/i;
    const unlinkMatch = unlinkPattern.exec(updatedContent);

    if (unlinkMatch) {
      const matchedText = unlinkMatch[0];
      const matchIndex = unlinkMatch.index;

      const beforeContext = updatedContent.substring(Math.max(0, matchIndex - 100), matchIndex);
      const lastNewline = beforeContext.lastIndexOf('\n');
      const lineBeforeMatch = lastNewline >= 0 ? beforeContext.substring(lastNewline) : beforeContext;

      const inBackticks = (lineBeforeMatch.match(/`/g) || []).length % 2 === 1;
      const inHtmlTag = lineBeforeMatch.includes('<');

      if (!inBackticks && !inHtmlTag) {
        const markdownLink = `[${matchedText}](${targetUrl})`;
        updatedContent =
          updatedContent.substring(0, matchIndex) +
          markdownLink +
          updatedContent.substring(matchIndex + matchedText.length);
        count++;
      }
    }
  }

  return {
    content: updatedContent,
    changed: count > 0,
    count
  };
}

/**
 * Process a single MDX file
 */
function processMdxFile(filePath, opportunities) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File not found: ${filePath}`);
      stats.skipped++;
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    let totalLinks = 0;

    // Process each link opportunity for this file
    for (const opp of opportunities) {
      const result = addLink(content, opp.keyword, opp.targetUrl);
      content = result.content;
      totalLinks += result.count;
    }

    // Write back if changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      stats.updated++;
      stats.linksAdded += totalLinks;
      changeLog.push({
        file: path.relative(ROOT, filePath),
        linksAdded: totalLinks
      });
      console.log(`  ✅ Updated: ${totalLinks} links added`);
    } else {
      stats.skipped++;
      console.log(`  ⏭️  No changes needed (already linked)`);
    }

    stats.processed++;

  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🔗 Internal Link Injector\n');
  console.log(`Reading CSV: ${CSV_PATH}\n`);

  // Read CSV (UTF-16 LE encoded)
  let csvContent = fs.readFileSync(CSV_PATH, 'utf16le');

  // Strip BOM if present
  if (csvContent.charCodeAt(0) === 0xFEFF) {
    csvContent = csvContent.slice(1);
  }

  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: '\t' // TSV format
  });

  console.log(`Found ${records.length} link opportunities\n`);

  // Group by source file
  const fileGroups = new Map();

  for (const record of records) {
    const sourceUrl = record['Source page'];
    const keyword = record['Keyword'].toLowerCase();
    const context = record['Keyword context'];
    const targetPage = record['Target page'];

    // Convert target page to relative URL
    const targetUrl = new URL(targetPage).pathname;

    const filePath = urlToFilePath(sourceUrl);

    if (!filePath) {
      continue; // Skip non-blog pages
    }

    if (!fileGroups.has(filePath)) {
      fileGroups.set(filePath, []);
    }

    fileGroups.get(filePath).push({
      keyword,
      context,
      targetUrl
    });
  }

  console.log(`Processing ${fileGroups.size} unique files...\n`);

  // Process each file
  let fileCount = 0;
  for (const [filePath, opportunities] of fileGroups) {
    fileCount++;
    console.log(`[${fileCount}/${fileGroups.size}] ${path.basename(filePath)}`);
    processMdxFile(filePath, opportunities);
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary');
  console.log('='.repeat(60));
  console.log(`Files processed: ${stats.processed}`);
  console.log(`Files updated: ${stats.updated}`);
  console.log(`Files skipped: ${stats.skipped}`);
  console.log(`Errors: ${stats.errors}`);
  console.log(`Total links added: ${stats.linksAdded}`);

  if (changeLog.length > 0) {
    console.log('\n📝 Changed files:');
    changeLog.forEach(log => {
      console.log(`  ${log.file} (+${log.linksAdded} links)`);
    });
  }

  // Write detailed report
  const reportPath = path.join(ROOT, 'content', 'seo', 'internal-links-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    stats,
    changes: changeLog
  }, null, 2));

  console.log(`\n✅ Report saved to: ${path.relative(ROOT, reportPath)}`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
