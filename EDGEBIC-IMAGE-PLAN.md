# EDGEBIC IMAGE PLAN — REAL SCREENSHOTS INTO SITE + 2,100 BLOG POSTS

> **Date**: 2026-07-23 · **Companion to**: [EDGEBIC-PROMOTION-STRATEGY.md](EDGEBIC-PROMOTION-STRATEGY.md), [EDGEBIC-BLOG-TAXONOMY.md](EDGEBIC-BLOG-TAXONOMY.md)
> **Prime directive**: EDGEBIC content uses **real product screenshots**. No fake app
> mockups, no stock imagery standing in for the product. Stock/diagram imagery remains
> allowed only for non-product concepts (as in the existing clusters 1–16 strategy).

---

## 1. THE MASTER CAPTURE MANIFEST ALREADY EXISTS — USE IT

`D:\Usersolutons\ERP + FCP\FCP-Book\UserGuide\images\SHOT-LIST.md` specifies **145
screenshots**, each with the exact screen, state, and owning guide section (📷 CAPTURE
SPEC blocks contain state + annotations + size). **Do not invent a parallel list.**
This plan (a) governs how those captures are produced, (b) adds ~25 marketing-grade
hero shots the guide list doesn't need, and (c) defines the pipeline into this website.

**Capture constraints (from the shot list itself):**
- Sections 07 (Work Center Groups) and 08 (Operators & Skills) must be captured on the
  **feature-branch build**; everything else on master.
- The sample world is the guide's "Acme Industries" dataset (Widget-A / Bracket-B /
  Frame-S; Saw-1, CNC-Mill-1&2, Weld-1, Paint-Booth-1, Assembly-1; Day/Night shifts;
  JOB-2026-xxxx). Seed it once, snapshot the database, and reuse the snapshot so every
  screenshot shows the same coherent world. Never capture real customer data.

**⚠️ Human step required**: screenshots must be captured from the running EDGEBIC
application. This is the one part of the promotion program that cannot be produced from
the repo alone. The checklist in §6 makes it a half-day-per-batch job.

## 2. ADDITIONAL MARKETING-GRADE SHOTS (~25, beyond the 145)

The guide shots are instructional (dialogs, grids, steps). Marketing pages and blog
heroes need a smaller set of *showcase* captures, staged for visual impact:

| ID | Shot | Used by |
|---|---|---|
| M-01 | Graphical BOR Designer: complete multi-step flow chart with a sub-assembly branch, annotations visible, zoomed to fill frame | `/edgebic` hero, C27 pillar, homepage |
| M-02 | Job View Gantt: 8–10 jobs, planned-vs-actual overlay on, color rules visible | `/edgebic`, C17/C18 heroes |
| M-03 | Optimizer comparison screen: verdict + KPI deltas + move list, an improvement visible | `/edgebic`, C26 pillar |
| M-04 | Schedule View by Operator (feature branch): operator lanes with assignments | C17 ch44 posts, C28 |
| M-05 | Setup Matrix family grid filled with the paint-booth example | C17 ch11 posts, D07 walkthrough |
| M-06 | Kiosk: job running screen with piece count | C28 pillar, `/edgebic` |
| M-07 | Dashboard cockpit: planner tab with heatmap | C17 ch36, reports posts |
| M-08 | Resource Calendar / capacity backlog view with a red overloaded day | C24 troubleshooting posts |
| M-09 | Import mask mapping screen with an Excel routing file loaded | `/edgebic-erp-integration`, C21 posts |
| M-10 | Quote scenario side-by-side comparison | C29 pillar |
| M-11..M-25 | One per remaining flagship capability (backward scheduling tail, WC groups member grid, parallel mirror Gantt, lot-streaming overlap, TOC anchor Gantt, anomaly report, reschedule prompt, first-time wizard, reports gallery, etc.) | Cluster pillars |

Staging rules for M-shots: maximized window, realistic-density data (never 2 rows,
never 500), no empty panels in frame, capture the moment something *interesting* is
true (an overlap, a red day, an improvement).

## 3. TECHNICAL STANDARDS

- **Capture**: 100% OS scaling, 1920×1200 window (or full screen), PNG lossless.
  Light theme. English locale. Consistent window title ("EDGEBIC").
- **Web derivatives** (Sharp is already installed in this repo; add a script under
  `scripts/` when Phase 2 starts):
  - Blog hero: 1200×630 `hero.webp` (crop, don't squash), quality 82.
  - Inline: max 1600px wide webp, quality 80, target <150KB.
  - Keep the original PNG in the FCP-Book `UserGuide/images/` tree (source of truth);
    the website stores only derivatives.
- **Website locations** (follows existing conventions):
  - Product/site pages: `public/images/edgebic/<area>/<name>.webp`
    (e.g. `public/images/edgebic/designer/bor-flowchart.webp`). New `edgebic/` folder;
    the legacy `public/images/Edgebic/` WordPress-upload folder is left untouched.
  - Blog: `public/marketing/blog/<slug>/hero.webp` + `public/marketing/blog/<slug>/<n>-<name>.webp`
    (existing pattern).
- **Naming**: kebab-case, content-descriptive (`setup-matrix-family-grid.webp`), never
  `screenshot1.png`, never date-bucketed.
- **Annotations**: when a callout is needed, use the single house annotation style:
  2px rounded-corner rectangle + numbered marker in the site's cyan; no arrows raining
  everywhere, no red scribbles. Annotate a *copy*, keep the clean original.

## 4. ALT-TEXT RULES (SEO + accessibility + LLM grounding)

- Describe what the screen shows and the state, not "screenshot of EDGEBIC":
  ✅ `EDGEBIC graphical routing designer showing a five-step bracket routing with a welded sub-assembly branch`
  ❌ `EDGEBIC screenshot`
- Include the feature name once; include the product name once; no keyword stuffing.
- If numbers are visible and meaningful, say the meaningful one ("optimizer comparison
  showing 14 fewer late hours").

## 5. IMAGE → CONTENT MAP

| Content | Image source |
|---|---|
| `/edgebic` product hub | M-01, M-02, M-03, M-06 (add in Phase 2 pass; page shipped text-first deliberately) |
| `/edgebic-erp-integration` | M-09 + import-mask guide shots (SHOT-LIST §25) |
| `/rmdb-to-edgebic` | M-01 + one RMDB legacy image side-by-side (existing `public/images/rmdb/`) |
| C17 platform posts | The owning chapter's guide-section shots |
| C19 how-to posts | The recipe's guide-section step shots (1:1 with 📷 specs) |
| C20 walkthroughs | Sequential step shots from the matching dry-run/guide example |
| C21 ERP posts | M-09 + mask mapping shots; ERP-side screens only if licensed/permitted (else describe textually) |
| C23 glossary | Cropped detail shots (a single field, a single dialog) at 800px |
| C24 troubleshooting | M-08 + anomaly report shots; before/after pairs |
| C26 optimizer | M-03 + Explain dialog + comparison states |
| C27 visual scheduling | M-01, M-02 + designer step shots (heaviest density) |
| C28 shop floor | M-06 + kiosk flow shots (SHOT-LIST §19) |

## 6. CAPTURE WORKFLOW (repeatable batch process)

1. Restore the Acme sample database snapshot (or seed per UserGuide 28 phases 1–3).
2. Open the owning guide section; each 📷 CAPTURE SPEC states screen, state, size.
3. Capture PNG → save to the SHOT-LIST path under `FCP-Book/UserGuide/images/`.
4. Tick the shot off in SHOT-LIST.md (add a ✅ column).
5. Batch-convert marketing/web derivatives into this repo per §3.
6. Commit both repos (FCP-Book owns originals; website owns derivatives).

**Batching**: SHOT-LIST is ordered by section; one section ≈ 3–8 shots ≈ 30–60 min
including staging. Suggested order: 11 (designer), 17 (Gantt), 16 (optimizer),
19 (kiosk), 09 (setup matrix) first — these unlock the M-shots and Wave-1 blog posts —
then the rest in list order. Feature-branch sections 07/08 as one dedicated session.

## 7. GOVERNANCE

- **No screenshot, no publish** for clusters 17–32 (taxonomy quality gate). If a post
  is ready before its shot, it waits.
- Screenshots are re-captured when the UI they show changes materially (tie to release
  notes); stale-shot audit every 6 months.
- Never composite or edit product pixels beyond crop/annotate; honesty extends to
  imagery.
