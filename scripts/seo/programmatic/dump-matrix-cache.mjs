#!/usr/bin/env node
/**
 * Dumps the approved matrix cells (industry × feature combinations) to a JSON
 * cache file that the keyword tracker can ingest without needing TypeScript.
 *
 * The keyword tracker is .mjs (Node ESM) and cannot directly import the
 * matrix data from data/programmatic/*.ts. Instead this script runs under
 * tsx (which can read TS), pulls the cells via the matrix library, and
 * writes them to content/seo/programmatic-matrix-cache.json.
 *
 * Run this script:
 *   - Whenever data/programmatic/industries.ts changes
 *   - Whenever data/programmatic/features.ts changes
 *   - Whenever lib/programmatic/matrix.ts changes
 *
 * Then re-run the keyword tracker:
 *   node scripts/seo/build-keyword-tracker.mjs
 *
 * Usage:
 *   npx tsx scripts/seo/programmatic/dump-matrix-cache.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  listApprovedMatrixCells,
  buildMatrixMetadata
} from '../../../lib/programmatic/matrix.ts';
import {
  buildExcelTemplateMetadata,
  listExcelTemplateSlugs
} from '../../../lib/programmatic/excel-templates.ts';
import {
  buildCompetitorMetadata,
  listCompetitorSlugs
} from '../../../lib/programmatic/competitors.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..', '..');
const MATRIX_OUTPUT = path.join(ROOT, 'content', 'seo', 'programmatic-matrix-cache.json');
const PROGRAMMATIC_OUTPUT = path.join(ROOT, 'content', 'seo', 'programmatic-pages-cache.json');

// Matrix cells (industry × feature).
const cells = listApprovedMatrixCells();
const matrixRecords = cells.map((cell) => {
  const { title, description, keywords } = buildMatrixMetadata(cell);
  return {
    url: cell.path,
    slug: cell.slug,
    industrySlug: cell.industry.slug,
    featureSlug: cell.feature.slug,
    relevance: cell.relevance,
    title,
    description,
    keywords
  };
});

fs.writeFileSync(
  MATRIX_OUTPUT,
  JSON.stringify(
    { generatedAt: new Date().toISOString().slice(0, 10), cellCount: matrixRecords.length, records: matrixRecords },
    null,
    2
  )
);
console.log(`Wrote ${matrixRecords.length} matrix cells to ${path.relative(ROOT, MATRIX_OUTPUT)}`);

// All-programmatic-pages cache — matrix + excel-templates + competitors (last
// is appended once Phase 4 ships). The keyword tracker reads this file to
// know about every programmatic URL on the site.
const allRecords = [...matrixRecords];

for (const slug of listExcelTemplateSlugs()) {
  const meta = buildExcelTemplateMetadata(slug);
  if (!meta) continue;
  allRecords.push({
    url: `/excel-templates/${slug}`,
    slug,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    type: 'excel-template'
  });
}

for (const slug of listCompetitorSlugs()) {
  const meta = buildCompetitorMetadata(slug);
  if (!meta) continue;
  allRecords.push({
    url: `/compare-products/${slug}`,
    slug,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    type: 'competitor-comparison'
  });
}

fs.writeFileSync(
  PROGRAMMATIC_OUTPUT,
  JSON.stringify(
    { generatedAt: new Date().toISOString().slice(0, 10), pageCount: allRecords.length, records: allRecords },
    null,
    2
  )
);
console.log(`Wrote ${allRecords.length} programmatic pages to ${path.relative(ROOT, PROGRAMMATIC_OUTPUT)}`);
