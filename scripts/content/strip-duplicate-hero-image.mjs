#!/usr/bin/env node
// Strips the duplicate hero <Image .../> block from the top of MDX blog posts.
// The blog and glossary detail pages already render the hero from frontmatter,
// so the in-body copy is redundant and causes a visual misalignment (the body
// image renders inside the 70% column while the page hero spans the full width).
//
// Idempotent: re-running on a cleaned file is a no-op. Only removes the FIRST
// self-closing <Image> block immediately after the frontmatter when its `src`
// matches the frontmatter `heroImage` value.
//
// Usage:
//   node scripts/content/strip-duplicate-hero-image.mjs           # dry run
//   node scripts/content/strip-duplicate-hero-image.mjs --apply   # write changes
//   node scripts/content/strip-duplicate-hero-image.mjs --verbose # show per-file status

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, '..', '..', 'content', 'blog');
const APPLY = process.argv.includes('--apply');
const VERBOSE = process.argv.includes('--verbose');

function stripBom(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

function extractHeroImage(frontmatter) {
  const m = frontmatter.match(/^heroImage:\s*["']?([^"'\n]+?)["']?\s*$/m);
  return m ? m[1].trim() : null;
}

// Match a self-closing <Image ... /> block at the very top of body whose src
// ends with a known image extension. Since the detail page already renders a
// hero from frontmatter, any leading <Image> at the top of body is a duplicate
// (whether it points at the unique per-slug hero, a shared category hero, or
// a shared glossary terms image).
function buildHeroImageRegex() {
  return new RegExp(
    `^\\s*<Image\\b[\\s\\S]*?src=(?:"[^"]*?\\.(?:webp|png|jpe?g|gif|avif)"|\\{["'\`][^"'\`]*?\\.(?:webp|png|jpe?g|gif|avif)["'\`]\\})[\\s\\S]*?/>\\s*\\n?`
  );
}

async function processFile(file) {
  const path = join(BLOG_DIR, file);
  const original = await readFile(path, 'utf8');
  const hadBom = original.charCodeAt(0) === 0xfeff;
  const raw = stripBom(original);

  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!fmMatch) return { file, status: 'no-frontmatter' };

  const frontmatter = fmMatch[1];
  const heroSrc = extractHeroImage(frontmatter);
  if (!heroSrc) return { file, status: 'no-hero' };

  const fmEnd = fmMatch[0].length;
  const head = raw.slice(0, fmEnd);
  const body = raw.slice(fmEnd);

  // Look at the first non-empty content of the body. If it's an <Image> with the
  // hero src, strip it. Trim any leading blank lines first so we can match cleanly.
  const leadingWhitespace = body.match(/^\s*/)[0];
  const bodyAfterWhitespace = body.slice(leadingWhitespace.length);

  const heroRegex = buildHeroImageRegex();
  const heroMatch = bodyAfterWhitespace.match(heroRegex);
  if (!heroMatch || heroMatch.index !== 0) {
    return { file, status: 'no-duplicate' };
  }

  const newBody =
    leadingWhitespace +
    bodyAfterWhitespace.slice(heroMatch[0].length).replace(/^\s*\n/, '\n');

  const newRaw = head + newBody;
  const out = hadBom ? '\uFEFF' + newRaw : newRaw;

  if (APPLY) {
    await writeFile(path, out, 'utf8');
  }
  return { file, status: 'stripped' };
}

async function main() {
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith('.mdx'));
  const results = await Promise.all(files.map(processFile));

  const counts = results.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  console.log(`Processed ${files.length} MDX files (${APPLY ? 'APPLIED' : 'DRY RUN'})`);
  for (const [status, n] of Object.entries(counts)) {
    console.log(`  ${status}: ${n}`);
  }

  if (VERBOSE) {
    console.log('\nNo-frontmatter files:');
    for (const r of results.filter((r) => r.status === 'no-frontmatter')) {
      console.log(`  ${r.file}`);
    }
  }

  if (!APPLY) {
    console.log('\nRun with --apply to write changes.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
