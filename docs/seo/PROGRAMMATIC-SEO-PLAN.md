# Programmatic SEO Plan — Resume Anchor

**Single source of truth for the at-scale page generation project.**
Any future Claude session should read this file first, then `content/seo/programmatic-state.json` for machine-readable progress.

---

## TL;DR — Where We Are

Run this to see current state:

```bash
node scripts/seo/programmatic/status.mjs
```

That command prints:
- Phase progress (1 of 4 phases active)
- Pages generated vs pages remaining per pattern
- Next concrete action

The state file `content/seo/programmatic-state.json` is the machine-readable companion. Both this doc AND the state file are kept in sync by the generator scripts.

---

## Goal

Close the 7,000-keyword gap with MRPeasy by generating ~295 high-quality pages at scale, expected to capture 1,500–3,000 new long-tail keyword rankings over 6 months.

Realistic 18-month target: **2,000–3,000 ranking keywords** (vs. MRPeasy's ~7,000; vs. our current 14).

---

## The 4 Patterns

| # | Pattern | Route | Target count | Status |
|---|---|---|---|---|
| 1 | Industry × Feature matrix | `/[feature]-for-[industry]` | ~130 (curated from 15 × 13) | scaffold in progress |
| 2 | State-level local SEO | `/manufacturing-scheduling-software-[state]` | 50 | not started |
| 3 | Excel template expansion | `/excel-templates/[slug]` | +30 | not started |
| 4 | Competitor comparison expansion | `/compare-products/rmdb-vs-[slug]` | +20 | not started |

**Total: ~230 new pages.** Lower than the 295 estimate because the matrix gets curated down — not every industry × feature combo has real search demand. The state file tracks which combos are approved/skipped.

---

## Phases (Run In Order — Don't Skip)

### Phase 0 — Foundation (this session)
**Goal:** Build resumable infrastructure so any future session can pick up cleanly.

- [x] Master plan doc (this file)
- [ ] State file (`content/seo/programmatic-state.json`)
- [ ] `data/programmatic/industries.ts` (15 industries with full profiles)
- [ ] `data/programmatic/features.ts` (13 features with full profiles)
- [ ] `scripts/seo/programmatic/status.mjs` (reads state, prints next action)
- [ ] One working dynamic route as proof-of-concept
- [ ] Sample pages (3) to validate the build
- [ ] Keyword tracker updated to enumerate dynamic routes

### Phase 1 — Industry × Feature matrix (~130 pages)
**Why first:** Biggest yield per page (5–15 long-tail keywords each), reuses existing data.
**Approach:**
1. Read `industries.ts` × `features.ts`
2. For each cell, generate a unique page via `MatrixPage` component
3. Each page MUST clear the quality bar (see below)
4. Update state file as pages ship

**Quality bar (non-negotiable — Google penalizes thin programmatic):**
- ≥600 words of intersection-specific copy (not Mad Libs)
- Unique FAQs per cell (3–5 questions)
- ≥3 outbound internal links to substantive content
- Unique title, description, H1, canonical
- Unique structured data (FAQ + SoftwareApp JSON-LD)

### Phase 2 — State local SEO (50 pages)
**Why second:** Easy template, you already have `data/states.ts`.
**Approach:** `/manufacturing-scheduling-software-[state]` with state-specific stats (manufacturing GDP, top industries, manufacturer count), plus shared product positioning.

### Phase 3 — Excel template expansion (+30 pages)
**Why third:** Already proven component (`excel-template-page.tsx`). Just add variants.
**New slugs (sample):**
- `production-schedule-machine-shop`, `production-schedule-food-manufacturer`
- `shift-planner`, `bottleneck-analysis`, `wip-tracker`, `setup-time-tracker`

### Phase 4 — Competitor comparison expansion (+20 pages)
**Why last:** Each requires real research about the competitor — slowest per page.
**Targets:** Visual MRP, OptiPro, JobTrac, Made2Manage, IFS, Infor, Plex, IQMS, JobPack, etc.

---

## How To Resume Next Session

1. **Read this file** (you're doing it now).
2. **Run** `node scripts/seo/programmatic/status.mjs` — see current state.
3. **Look at the "Next action" line** in the output — that's where to start.
4. **For pages:** check `content/seo/programmatic-state.json` for the list of approved-but-not-yet-generated cells. Generate the next batch (typically 5–10 pages per session).
5. **After each batch:** the generator script updates the state file automatically. Don't hand-edit it.
6. **Before committing:** run `node scripts/seo/programmatic/validate.mjs` to verify no duplicate titles/descriptions/canonicals across the corpus.

---

## Quality Bar — Don't Skip

Cheap programmatic = sandboxed by Google. The state file has a `qualityChecks` flag per page that the validator script enforces:

| Check | Threshold | Why |
|---|---|---|
| `wordCount` | ≥600 | Thin content gets demoted |
| `uniqueTitleAcrossCorpus` | true | Duplicate titles = cannibalization |
| `uniqueDescriptionAcrossCorpus` | true | Same — Google sees duplicate snippets |
| `outboundInternalLinks` | ≥3 | Topical authority signal |
| `uniqueFaqs` | ≥3 | Differentiation per cell |
| `hasStructuredData` | true | SoftwareApp + FAQ JSON-LD |

Validator output is in `content/seo/programmatic-validation.md` after each run.

---

## File Layout

```
data/programmatic/
  industries.ts                # 15 industry profiles (challenges, customers, results, faqs)
  features.ts                  # 13 feature profiles (capabilities, benefits, faqs)
  competitors.ts               # competitor profiles for /compare-products expansion
  state-list.ts                # 50 US states with manufacturing stats

content/seo/
  programmatic-state.json      # machine-readable progress tracker
  programmatic-validation.md   # last validator run output

scripts/seo/programmatic/
  status.mjs                   # prints current state + next action
  generate-matrix.mjs          # Phase 1 generator
  generate-state-pages.mjs     # Phase 2 generator
  generate-excel-templates.mjs # Phase 3 generator
  generate-competitors.mjs     # Phase 4 generator
  validate.mjs                 # quality bar enforcement

app/(app)/(marketing)/
  [feature]-for-[industry]/    # dynamic route, Phase 1
    page.tsx
  manufacturing-scheduling-software-[state]/  # dynamic route, Phase 2
    page.tsx
  (existing programmatic routes — competitor + excel-templates already use [slug])

components/marketing/programmatic/
  matrix-page.tsx              # shared component for Phase 1
  state-page.tsx               # shared component for Phase 2
```

---

## Anti-Patterns (Avoid These)

1. **Don't hand-write 195 page.tsx files.** Dynamic routes + `generateStaticParams` is the whole point.
2. **Don't reuse the same FAQ list across pages.** Validator will flag.
3. **Don't ship before validator passes.** Each batch must validate clean.
4. **Don't skip phases.** Phase 1 (matrix) yields biggest signal — that's why it's first.
5. **Don't add to root-level URL space.** Programmatic routes use `/[feature]-for-[industry]` and `/manufacturing-scheduling-software-[state]` patterns specifically so they don't collide with existing curated pages.
6. **Don't generate combos with zero search intent.** The state file's `approved: true/false` flag is reviewed before generation — skip combos like "BOM software for print shops" where there's no real demand.

---

## Last Updated

This doc updates automatically via `scripts/seo/programmatic/status.mjs` when you re-run it. Manual edits are fine but the bot-managed sections (state-file references) get refreshed.
