#!/usr/bin/env node

/**
 * TEST VERSION: Add internal links to MDX files (5 files only)
 *
 * Run this first to verify the logic works before running on all files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

const CSV_PATH = 'C:\\Users\\-\\Downloads\\usersolutions_11-apr-2026_link-opportunities_2026-04-11_16-46-16.csv';

const MAX_FILES_TO_PROCESS = 10; // TEST LIMIT

const stats = {
  processed: 0,
  updated: 0,
  skipped: 0,
  errors: 0,
  linksAdded: 0
};

const changeLog = [];

function urlToFilePath(url) {
  const urlObj = new URL(url);
  let urlPath = urlObj.pathname;
  urlPath = urlPath.replace(/^\//, '').replace(/\/$/, '');

  if (urlPath.startsWith('blog/')) {
    const slug = urlPath.replace('blog/', '');
    return path.join(ROOT, 'content', 'blog', `${slug}.mdx`);
  }

  return null;
}

function addLink(content, keyword, targetUrl) {
  let updatedContent = content;
  let count = 0;

  if (keyword === 'resource manager db') {
    // Match both unlinked AND incorrectly linked instances

    // Pattern 1: Already linked but to wrong URL
    // [Resource Manager DB](/manufacturing-scheduling-software) -> [Resource Manager DB](/resource-manager-db-2)
    const linkedPattern = /\[Resource Manager DB(?: \(RMDB\))?\]\(\/manufacturing-scheduling-software\)/gi;
    const linkedMatches = [...updatedContent.matchAll(linkedPattern)];

    for (const match of linkedMatches) {
      const matchedText = match[0];
      const matchIndex = match.index;

      // Extract the display text
      const displayText = matchedText.match(/\[(.*?)\]/)[1];
      const newLink = `[${displayText}](${targetUrl})`;

      updatedContent =
        updatedContent.substring(0, matchIndex) +
        newLink +
        updatedContent.substring(matchIndex + matchedText.length);

      count++;
    }

    // Pattern 2: Unlinked instances
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
    // Similar logic for manufacturing KPIs

    // Pattern 1: Fix existing wrong links (if any)
    const linkedPattern = /\[manufacturing KPIs(?: guide)?\]\((?!\/top-10-manufacturing-kpis-in-2024\/)[^)]+\)/gi;
    const linkedMatches = [...updatedContent.matchAll(linkedPattern)];

    for (const match of linkedMatches) {
      const matchedText = match[0];
      const matchIndex = match.index;
      const displayText = matchedText.match(/\[(.*?)\]/)[1];
      const newLink = `[${displayText}](${targetUrl})`;

      updatedContent =
        updatedContent.substring(0, matchIndex) +
        newLink +
        updatedContent.substring(matchIndex + matchedText.length);

      count++;
    }

    // Pattern 2: Add links to unlinked instances
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

    // Show preview of changes
    if (content !== originalContent) {
      console.log(`  ✅ Would add ${totalLinks} link(s)`);

      // Show diff (first change only)
      const lines = content.split('\n');
      const origLines = originalContent.split('\n');

      for (let i = 0; i < Math.min(lines.length, origLines.length); i++) {
        if (lines[i] !== origLines[i]) {
          console.log(`\n  📝 Preview (line ${i + 1}):`);
          console.log(`     BEFORE: ${origLines[i].substring(0, 120)}...`);
          console.log(`     AFTER:  ${lines[i].substring(0, 120)}...`);
          break;
        }
      }

      // Actually write the file
      fs.writeFileSync(filePath, content, 'utf8');
      stats.updated++;
      stats.linksAdded += totalLinks;
      changeLog.push({
        file: path.relative(ROOT, filePath),
        linksAdded: totalLinks
      });

    } else {
      stats.skipped++;
      console.log(`  ⏭️  Already linked (no changes)`);
    }

    stats.processed++;

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    stats.errors++;
  }
}

async function main() {
  console.log('🧪 Internal Link Injector - TEST MODE (5 files max)\n');
  console.log(`Reading CSV: ${CSV_PATH}\n`);

  // Read as UTF-16 LE (the file is UTF-16 encoded)
  let csvContent = fs.readFileSync(CSV_PATH, 'utf16le');

  // Strip BOM if present
  if (csvContent.charCodeAt(0) === 0xFEFF) {
    csvContent = csvContent.slice(1);
  }

  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: '\t'
  });

  console.log(`Found ${records.length} link opportunities\n`);

  // Group by source file
  const fileGroups = new Map();

  for (const record of records) {
    const sourceUrl = record['Source page'];
    const keyword = record['Keyword'].toLowerCase();
    const targetPage = record['Target page'];
    const targetUrl = new URL(targetPage).pathname;

    const filePath = urlToFilePath(sourceUrl);
    if (!filePath) continue;

    if (!fileGroups.has(filePath)) {
      fileGroups.set(filePath, []);
    }

    fileGroups.get(filePath).push({ keyword, targetUrl });
  }

  console.log(`Processing ${Math.min(MAX_FILES_TO_PROCESS, fileGroups.size)} files (TEST)...\n`);

  let fileCount = 0;
  for (const [filePath, opportunities] of fileGroups) {
    if (fileCount >= MAX_FILES_TO_PROCESS) break;

    fileCount++;
    console.log(`\n[${fileCount}/${MAX_FILES_TO_PROCESS}] ${path.basename(filePath)}`);
    processMdxFile(filePath, opportunities);
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST Summary');
  console.log('='.repeat(60));
  console.log(`Files processed: ${stats.processed}`);
  console.log(`Files updated: ${stats.updated}`);
  console.log(`Files skipped: ${stats.skipped}`);
  console.log(`Errors: ${stats.errors}`);
  console.log(`Total links added: ${stats.linksAdded}`);

  if (changeLog.length > 0) {
    console.log('\n📝 Changed files:');
    changeLog.forEach(log => {
      console.log(`  ✓ ${log.file} (+${log.linksAdded} links)`);
    });
  }

  console.log('\n💡 Next steps:');
  console.log('  1. Review the changed files above');
  console.log('  2. Check a few manually to verify links look correct');
  console.log('  3. If all looks good, run: node scripts/seo/add-internal-links.mjs');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
