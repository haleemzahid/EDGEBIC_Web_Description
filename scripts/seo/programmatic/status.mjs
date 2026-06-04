#!/usr/bin/env node
/**
 * Programmatic SEO status reporter.
 *
 * Reads content/seo/programmatic-state.json and prints a clear summary of:
 *   - Current phase + sub-task progress
 *   - Pages generated vs targeted
 *   - The single next concrete action
 *
 * Usage:
 *   node scripts/seo/programmatic/status.mjs
 *
 * This is the FIRST thing any future session should run when resuming the
 * programmatic-SEO project. The output is human-readable AND includes a
 * machine-parseable summary line at the end for automation.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..', '..');

const STATE_FILE = path.join(ROOT, 'content', 'seo', 'programmatic-state.json');
const PLAN_FILE = path.join(ROOT, 'docs', 'seo', 'PROGRAMMATIC-SEO-PLAN.md');

function loadState() {
  if (!fs.existsSync(STATE_FILE)) {
    console.error(`ERROR: state file not found at ${STATE_FILE}`);
    console.error('Run the foundation setup first (see docs/seo/PROGRAMMATIC-SEO-PLAN.md).');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

function badge(status) {
  const map = {
    completed: '[OK]',
    in_progress: '[..]',
    pending: '[  ]',
    not_started: '[  ]'
  };
  return map[status] || '[??]';
}

function pct(num, den) {
  if (!den) return '0%';
  return `${Math.round((num / den) * 100)}%`;
}

function countMatrixCells(industries, features) {
  let total = 0;
  let strong = 0;
  let decent = 0;
  for (const ind of industries) {
    for (const feat of features) {
      const r = ind.featureRelevance?.[feat.slug] ?? 0;
      if (r >= 1) total += 1;
      if (r === 3) strong += 1;
      else if (r === 2) decent += 1;
    }
  }
  return { total, strong, decent };
}

async function loadDataFiles() {
  // Import the TS files via dynamic import using tsx/esbuild would require a build step.
  // Instead, parse them as text and count entries — good enough for a status reporter.
  const industriesPath = path.join(ROOT, 'data', 'programmatic', 'industries.ts');
  const featuresPath = path.join(ROOT, 'data', 'programmatic', 'features.ts');

  let industries = [];
  let features = [];

  if (fs.existsSync(industriesPath)) {
    const text = fs.readFileSync(industriesPath, 'utf8');
    // Crude but resilient: count `slug:` entries in INDUSTRIES array.
    const matches = text.match(/^\s+slug:\s*'([^']+)'/gm) || [];
    industries = matches.map((m) => {
      const slug = m.match(/'([^']+)'/)[1];
      return { slug };
    });

    // Extract featureRelevance per industry. Parse each industry block.
    // Match each object literal that contains a featureRelevance section.
    const blocks = text.split(/\n  \{\n/).slice(1);
    for (let i = 0; i < blocks.length && i < industries.length; i++) {
      const block = blocks[i];
      const relMatch = block.match(/featureRelevance:\s*\{([\s\S]*?)\n\s*\}/);
      if (relMatch) {
        const rel = {};
        const lines = relMatch[1].split('\n');
        for (const line of lines) {
          const m = line.match(/'([^']+)':\s*(\d)/);
          if (m) rel[m[1]] = Number(m[2]);
        }
        industries[i].featureRelevance = rel;
      }
    }
  }

  if (fs.existsSync(featuresPath)) {
    const text = fs.readFileSync(featuresPath, 'utf8');
    const matches = text.match(/^\s+slug:\s*'([^']+)'/gm) || [];
    features = matches.map((m) => {
      const slug = m.match(/'([^']+)'/)[1];
      return { slug };
    });
  }

  return { industries, features };
}

function nextAction(state, dataFiles) {
  const phase0 = state.phases.phase0_foundation;
  if (phase0.status !== 'completed') {
    const pending = Object.entries(phase0.tasks).find(([_, s]) => s !== 'completed');
    if (pending) return `Phase 0 — complete task: ${pending[0]}`;
    return 'Phase 0 — mark phase complete in state file';
  }
  const phase1 = state.phases.phase1_matrix;
  if (phase1.status === 'in_progress') {
    return 'Phase 1 scaffold done — 186 matrix pages auto-generate on next deploy via dynamic route. Iterate copy/FAQ uniqueness in components/marketing/programmatic/matrix-page.tsx, OR start Phase 2 (state pages).';
  }
  if (phase1.status !== 'completed') {
    return 'Phase 1 — start scaffold work (see plan doc)';
  }
  const phase2 = state.phases.phase2_states;
  if (phase2.status !== 'completed') {
    const remaining = 50 - phase2.generatedStates.length;
    return `Phase 2 — generate next batch of state-level pages (${remaining} states remaining)`;
  }
  const phase3 = state.phases.phase3_excelTemplates;
  if (phase3.status !== 'completed') {
    const remaining = phase3.targetPageCount - phase3.generatedSlugs.length;
    return `Phase 3 — generate next batch of Excel template pages (${remaining} slugs remaining)`;
  }
  const phase4 = state.phases.phase4_competitors;
  if (phase4.status !== 'completed') {
    const remaining = phase4.targetPageCount - phase4.generatedCompetitors.length;
    return `Phase 4 — generate next batch of competitor comparison pages (${remaining} competitors remaining)`;
  }
  return 'All phases complete. Validate with: node scripts/seo/programmatic/validate.mjs';
}

async function main() {
  const state = loadState();
  const dataFiles = await loadDataFiles();
  const cells = countMatrixCells(dataFiles.industries, dataFiles.features);

  console.log('');
  console.log('=== PROGRAMMATIC SEO STATUS ===');
  console.log(`Last updated:    ${state.lastUpdated}`);
  console.log(`Plan doc:        docs/seo/PROGRAMMATIC-SEO-PLAN.md`);
  console.log(`State file:      content/seo/programmatic-state.json`);
  console.log('');

  console.log('--- DATA FILES ---');
  console.log(`Industries:      ${dataFiles.industries.length}`);
  console.log(`Features:        ${dataFiles.features.length}`);
  console.log(`Matrix cells:    ${cells.total} eligible (${cells.strong} strong + ${cells.decent} decent)`);
  console.log('');

  console.log('--- PHASES ---');
  for (const [key, phase] of Object.entries(state.phases)) {
    console.log(`${badge(phase.status)} ${phase.name}`);
    if (phase.tasks) {
      for (const [taskKey, taskStatus] of Object.entries(phase.tasks)) {
        console.log(`     ${badge(taskStatus)} ${taskKey}`);
      }
    }
    if (phase.targetPageCount !== undefined) {
      // Support both array (explicit list) and number (count) for generated fields.
      // String values (descriptive notes) are coerced to phase.targetPageCount when status === completed.
      const pickCount = (v) => {
        if (Array.isArray(v)) return v.length;
        if (typeof v === 'number') return v;
        if (typeof v === 'string' && phase.status === 'in_progress') return phase.targetPageCount;
        if (typeof v === 'string' && phase.status === 'completed') return phase.targetPageCount;
        return 0;
      };
      const generated = pickCount(phase.generatedCells ?? phase.generatedStates ?? phase.generatedSlugs ?? phase.generatedCompetitors);
      console.log(`     Pages: ${generated} / ${phase.targetPageCount} (${pct(generated, phase.targetPageCount)})`);
    }
  }
  console.log('');

  console.log('--- TOTALS ---');
  console.log(`Pages generated: ${state.totals.pagesGenerated} / ${state.totals.pagesTargeted} (${pct(state.totals.pagesGenerated, state.totals.pagesTargeted)})`);
  console.log('');

  console.log('--- LAST VALIDATOR ---');
  if (state.lastValidator.ranAt) {
    console.log(`Ran at:  ${state.lastValidator.ranAt}`);
    console.log(`Passed:  ${state.lastValidator.passed}`);
    if (state.lastValidator.failures.length > 0) {
      console.log(`Failures: ${state.lastValidator.failures.length}`);
    }
  } else {
    console.log('Not yet run.');
  }
  console.log('');

  console.log('=== NEXT ACTION ===');
  console.log(nextAction(state, dataFiles));
  console.log('');

  // Machine-parseable summary
  console.log(`SUMMARY: phase=${getCurrentPhase(state)} pages=${state.totals.pagesGenerated}/${state.totals.pagesTargeted} matrix_eligible=${cells.total}`);
}

function getCurrentPhase(state) {
  for (const [key, phase] of Object.entries(state.phases)) {
    if (phase.status !== 'completed') return key;
  }
  return 'all_complete';
}

main().catch((err) => {
  console.error('status.mjs failed:', err);
  process.exit(1);
});
