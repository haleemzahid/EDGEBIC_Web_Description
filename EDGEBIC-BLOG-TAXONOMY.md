# EDGEBIC BLOG TAXONOMY — 2,100+ SEMANTIC POSTS FROM THE FCP-BOOK

> **Date**: 2026-07-23 · **Companion to**: [EDGEBIC-PROMOTION-STRATEGY.md](EDGEBIC-PROMOTION-STRATEGY.md)
> **Source corpus**: `D:\Usersolutons\ERP + FCP\FCP-Book` (74 book files + 32 UserGuide files:
> 45 chapters, 6 appendices, 10 dry-runs, 10 recipe books with ~876 recipes, a 116KB
> plain-language definitions dictionary, and a 30-section UserGuide).
> **Images**: every post pulls real EDGEBIC screenshots per [EDGEBIC-IMAGE-PLAN.md](EDGEBIC-IMAGE-PLAN.md).

---

## 1. HOW THIS EXTENDS THE EXISTING STRATEGY (read first)

The site already has **534 live posts** across clusters 1–16 of
[SEO-CONTENT-STRATEGY.md](SEO-CONTENT-STRATEGY.md) (generic category content: production
scheduling, job shops, MRP, lean, KPIs, glossary, etc.). **None of that changes.** This
taxonomy adds clusters **17–32**: a *product-led semantic library* where EDGEBIC itself is
the subject. The two libraries do different jobs:

| | Clusters 1–16 (live) | Clusters 17–32 (this plan) |
|---|---|---|
| Subject | The category ("what is finite capacity scheduling") | The product ("how EDGEBIC schedules finite capacity") |
| Wins | Category keywords, top-of-funnel | Brand + long-tail "how do I" queries, LLM citations, mid/bottom-funnel |
| Source | Industry knowledge | The FCP-Book (every claim is documented product behavior) |
| Count | 534 | **~2,120 planned** |

### Cannibalization guards (binding rules)

1. **Slug prefix discipline**: product-led posts use `edgebic-` prefixed slugs or clearly
   product-scoped slugs (`edgebic-setup-matrix-guide`, `how-to-overlap-operations-in-edgebic`).
   Never reuse or near-duplicate an existing slug.
2. **Target-phrase test**: before writing, grep `content/blog/` for the primary keyword.
   If an existing post targets the *generic* phrase, the new post targets the *product or
   task* phrase and links to the generic post as its "concept" reference.
3. **One glossary, two depths**: existing `/blog/glossary/[term]` entries stay canonical
   for generic terms. New definitional posts from `ZZ-definitions`/A2 are either (a) new
   terms not in the 185 live ones, or (b) product-behavior pages
   ("what X means in EDGEBIC") that link the generic glossary entry.
4. **Pillar hierarchy**: each new cluster gets a pillar; every post sets `pillarSlug` and
   links up. Pillars link to `/edgebic` (the product hub is the super-pillar).
5. **Honesty guardrails** from the strategy doc §5 bind every post (no turnkey-connector
   claims, no Control Tower marketing, optimizer phrasing rules).

### Frontmatter conventions (uses existing schema — no infra changes)

```yaml
category: 'EDGEBIC Platform'        # one of the new categories below
cluster: 'edgebic-platform'         # new cluster slugs, kebab-case
pillarSlug: 'edgebic-complete-guide'
keywords: [...]                     # primary + 4-8 secondary
faqQuestions: [...]                 # ≥3 per post (LLM citation food)
qaQuestions: [...]                  # ≥2 expert Q&A pairs
heroImage: '/marketing/blog/<slug>/hero.webp'   # real screenshot per image plan
```

---

## 2. CLUSTER REGISTRY (the 2,120)

| # | Cluster slug | Category | Posts | Primary source files |
|---|---|---|---|---|
| 17 | `edgebic-platform` | EDGEBIC Platform | 180 | Chapters 01–45 |
| 18 | `edgebic-scheduling-concepts` | Scheduling Concepts | 200 | Ch 12–19, 42–45, ZZ-definitions |
| 19 | `edgebic-how-to` | EDGEBIC How-To | 500 | R01–R10 (~876 recipes, curated) |
| 20 | `edgebic-walkthroughs` | Worked Examples | 50 | D01–D10, Z-capstone, UserGuide 28–29 |
| 21 | `edgebic-erp-integration` | ERP Integration (EDGEBIC) | 150 | Ch 39, R09, heritage cases |
| 22 | `edgebic-industry` | Industry Applications (EDGEBIC) | 110 | Feature chapters × industries |
| 23 | `edgebic-glossary` | Glossary (EDGEBIC) | 350 | ZZ-definitions, A2, A4 |
| 24 | `edgebic-troubleshooting` | Troubleshooting | 120 | A3 anomaly reference, R08 |
| 25 | `edgebic-outcomes` | Outcomes & ROI | 100 | Feature chapters × KPI outcomes |
| 26 | `edgebic-optimization` | Schedule Optimization | 60 | Ch 42, A6 OPT rules |
| 27 | `edgebic-visual-scheduling` | Visual Scheduling | 40 | Ch 08, 25, UserGuide 11, 17 |
| 28 | `edgebic-shop-floor` | Shop Floor Execution | 60 | Ch 21–24, R03, UserGuide 18–20 |
| 29 | `edgebic-quoting` | Quoting & Promising | 40 | Ch 32–33, R06, UserGuide 21–22 |
| 30 | `edgebic-planning` | Inventory & Planning | 80 | Ch 26–31, R04–R05 (honesty: no release-date promises) |
| 31 | `edgebic-migration` | Upgrade & Comparison | 40 | Legacy docs + strategy §4 |
| 32 | `edgebic-admin` | Admin & Deployment | 40 | Ch 38, 40–41, R09, UserGuide 25–27 |
| | | **TOTAL** | **2,120** | |

Each cluster below lists: pillar, the topic formula (how the count is generated), and
seed examples. Writers expand seeds mechanically from the named source files.

---

### CLUSTER 17 — EDGEBIC PLATFORM (180 posts)

**Pillar**: `edgebic-complete-guide` — "EDGEBIC: The Complete Guide to Next-Generation
Finite Capacity Scheduling" (5,000+ words, links every sub-pillar).
**Formula**: 45 book chapters × 4 post angles = 180.
For each chapter: (1) *capability overview* ("Work Center Groups in EDGEBIC: Machine
Pools Explained"), (2) *setup guide* ("How to Set Up Work Center Groups in EDGEBIC"),
(3) *deep dive* ("How EDGEBIC Picks the Best Machine in a Pool: Selection Strategies"),
(4) *mistakes & gotchas* ("7 Work Center Group Mistakes That Distort Your Schedule").
**Seed examples** (chapter → 4 slugs):
- Ch 11 setup matrix → `edgebic-setup-matrix-explained`, `how-to-build-a-setup-matrix-in-edgebic`, `edgebic-setup-family-resolver-deep-dive`, `sequence-dependent-setup-mistakes-edgebic`
- Ch 16 TOC anchor → `edgebic-toc-anchor-scheduling`, `how-to-flag-a-bottleneck-in-edgebic`, `edgebic-toc-buffers-deep-dive`, `bottleneck-scheduling-mistakes-edgebic`
- Ch 44 operators → `edgebic-operator-skill-scheduling`, `how-to-set-up-operator-skills-in-edgebic`, `edgebic-attend-fraction-lights-out-machining`, `operator-roster-mistakes-edgebic`

### CLUSTER 18 — SCHEDULING CONCEPTS, PRODUCT-GROUNDED (200 posts)

**Pillar**: `edgebic-scheduling-engine-guide` — "Inside a Modern Finite Capacity
Scheduling Engine".
**Formula**: 50 engine concepts × 4 question forms (What is / How does EDGEBIC handle /
X vs Y / When to use) = 200.
**The 50 concepts** (from ch 12–19, 42–45): scheduling modes, forward scheduling,
backward/JIT scheduling, direction precedence, dependency graphs, topological sort,
multi-shift allocation, shift priority scoring, instance allocation, load balancing,
one-per-day rules, fractional instances, TOC anchor, constraint buffers, drum-buffer-rope,
independent parallel, dependent (synchronized) parallel, true alternates, work center
groups, selection strategies, lot streaming, transfer batches, FlowStep overlap, queue
time, transit days, flow composition, setup families, setup matrix resolution, operator
gating, attend fraction, skill certification expiry, rosters, time off, optimizer layers,
never-worse contract, CP-SAT, optimality gap, objective presets, schedule stability,
actuals preservation, reschedule modes, frozen work, capacity overrides, partial
holidays, overnight shifts, utilization %, bottleneck detection, pieces-vs-hours
capacity, end-item lead time, due-date invariants.
**Cannibalization note**: cluster 1/5 already covers generic "forward vs backward
scheduling" etc. These posts are *engine-mechanics* depth ("How EDGEBIC decides
scheduling direction: the precedence chain") and always link the generic post.

### CLUSTER 19 — HOW-TO RECIPES (500 posts)

**Pillar**: `edgebic-how-to-hub` — "The EDGEBIC How-To Library".
**Formula**: R01–R10 contain ~876 documented recipes (Goal → Steps → Verify → Gotchas).
Curate the ~500 with real search intent; merge trivial siblings; keep the recipe format
(it is already the ideal how-to post shape). Distribution mirrors the recipe books:
R01 master data (~70), R02 scheduling (~75), R03 actuals/reschedule (~50), R04 inventory
(~55), R05 MPS/planning (~50), R06 quoting (~45), R07 reports/dashboards (~55),
R08 troubleshooting recipes not in cluster 24 (~30), R09 admin (~30), R10 advanced (~40).
**Slug pattern**: `how-to-<task>-in-edgebic`.
**Seeds**: `how-to-create-a-bill-of-routing-in-edgebic`, `how-to-import-routings-from-excel-edgebic`, `how-to-set-a-per-day-capacity-override-edgebic`, `how-to-log-actual-hours-from-the-kiosk-edgebic`, `how-to-run-the-optimizer-and-read-the-comparison-edgebic`, `how-to-reschedule-without-moving-completed-work-edgebic`.

### CLUSTER 20 — WORKED EXAMPLES & SCENARIO STORIES (50 posts)

**Pillar**: `edgebic-worked-examples` — "From Empty Database to Shipped Order".
**Formula**: 10 dry-runs × 3 angles (narrative walkthrough / what-it-proves / variations)
+ capstone 14-stage story as a 10-part series + UserGuide 28–29 example-BOR series (8) +
2 hub posts.
**Seeds**: `edgebic-greenfield-setup-walkthrough` (D01), `quote-to-ship-in-edgebic` (D02),
`machine-breakdown-reschedule-walkthrough-edgebic` (D04), `synchronized-multi-spindle-scheduling-example` (D05), `paint-shop-changeover-sequencing-example` (D07).
These are the highest-trust posts in the plan: real scenarios, heavy screenshots.

### CLUSTER 21 — ERP INTEGRATION × EDGEBIC (150 posts)

**Pillar**: the `/edgebic-erp-integration` page (site page, not blog).
**Formula**: 25 ERPs × 6 post types = 150. ERPs: JobBOSS, Epicor Kinetic, Fourth Shift,
SAP B1, SAP ECC/S4, Oracle NetSuite, Oracle EBS, Sage 100, Sage X3, Macola, Infor
CloudSuite, Infor Visual, Microsoft Dynamics BC, Dynamics F&O, QuickBooks, Global Shop,
E2/JobBOSS2, ProShop, MIE Trak, Plex, IQMS/DELMIAworks, SyteLine, M1, Odoo, Fishbowl.
Post types per ERP: (1) integration guide ("Connecting EDGEBIC to JobBOSS: the import
mask walkthrough"), (2) scheduling-gap analysis, (3) data-mapping reference (which
fields map to items/WCs/routings/orders), (4) workflow post (daily export-schedule-return
cycle), (5) FAQ post, (6) use-case vignette.
**Honesty rule (binding)**: every post describes the Excel/CSV/database import-mask
architecture; never a native connector. Heritage cases (Fourth Shift 5-day, Macola,
AS400/Cummins) may be cited as User Solutions lineage.

### CLUSTER 22 — INDUSTRY APPLICATIONS × EDGEBIC (110 posts)

**Pillar**: `edgebic-by-industry` hub post.
**Formula**: 22 industries (the site's existing industry set) × 5 feature angles = 110.
Angles chosen per industry from the feature map, e.g. paint/coatings → setup matrix;
machine shops → work center groups + lot streaming; aerospace → TOC + operators/skills
certifications; food → sequence-dependent changeover + shifts.
**Slug pattern**: `edgebic-for-<industry>-<feature>`, e.g.
`edgebic-for-machine-shops-machine-pools`, `edgebic-for-aerospace-operator-certifications`.
**Cannibalization note**: cluster 7 owns generic "<industry> scheduling". These are
product-application posts linking the industry page + generic post.

### CLUSTER 23 — GLOSSARY EXPANSION (350 posts)

**Pillar**: existing `/blog/glossary` hub (extend, don't fork).
**Formula**: `ZZ-definitions` (116KB, every term with a plain-language real-world
example) + A2 glossary + A4 enum catalogue yield ~350 terms not among the 185 live
glossary entries. Categories: engine concepts (~90), planning/inventory/MPS terms (~70),
execution/actuals terms (~40), quoting terms (~25), reporting metrics (~45), diagnostics
terms (~40), admin/data terms (~40).
**Seeds**: transfer batch, attend fraction, anchor step, constraint buffer, dependent
parallel, true alternative, setup family, work center group, selection strategy, actuals
preservation, projected available balance, available-to-promise, forecast consumption,
time fence, firm demand, optimality gap, warm start, schedule nervousness, frozen window,
import mask, two-pass routing import, partial holiday, capacity override, instance,
one-per-day flag, piece-count capacity, end-item lead time.
**Format**: existing glossary term template (short definition + example + FAQ), with the
book's cake/recipe-style analogies retained — that plain-language example is exactly what
LLMs quote.

### CLUSTER 24 — TROUBLESHOOTING LIBRARY (120 posts)

**Pillar**: `edgebic-troubleshooting-guide` — "Why Does My Schedule Look Wrong?".
**Formula**: A3 anomaly families (U over-utilization, X instance collisions, W idle gaps,
D dependency violations, K off-calendar, P plan inversion, G config gaps, F flow/buffer,
C continuous-process, T transit, I inventory integrity, M setup-matrix, H consistency
drift, L lost hours) → one post per check ID (~70) + R08 symptom-triage posts (~50:
"job jumped 2 days after reschedule", "work center shows 300% load", "step scheduled on
a holiday", "optimizer returned the same schedule").
**Why it matters**: troubleshooting queries are the highest-intent, lowest-competition
long tail, and the #1 format LLMs cite for "why is X happening" questions.

### CLUSTER 25 — OUTCOMES & ROI (100 posts)

**Pillar**: `edgebic-results-guide`.
**Formula**: 25 capabilities × 4 outcomes (on-time delivery, lead time, changeover/setup
hours, utilization/WIP) = 100. Pattern: "Cutting changeover hours with EDGEBIC's setup
matrix: the paint-booth math" (uses the book's worked numbers, e.g. the EDD-vs-optimized
sequence comparison).
**Cannibalization note**: cluster 8 owns generic KPI definitions; these are
mechanism-to-outcome posts that link them.

### CLUSTER 26 — SCHEDULE OPTIMIZATION (60 posts)

**Pillar**: `edgebic-optimizer-guide` — "Mathematical Schedule Optimization Without a
PhD".
**Topics** (ch 42): what the optimizer does, the two layers, never-worse guarantee,
proven optimality gap explained, objective presets (OnTimeFirst / MinMakespan / MinSetup
/ MostStable), reading the comparison screen, accept/discard workflow, why some jobs are
locked, seeds and determinism, time budgets, CP-SAT for planners, optimizer vs dispatch
rules, optimizer vs genetic algorithms, schedule stability/nervousness, sequencing to cut
setups, benchmark stories, "AI scheduling" honesty posts (what is real vs hype, grounded
in an actual solver).

### CLUSTER 27 — VISUAL SCHEDULING (40 posts)

**Pillar**: `edgebic-visual-scheduling-guide` — "Run Your Factory Like a Flow Chart".
**Topics** (ch 08, 25; UserGuide 11, 17): graphical routing designer basics, nodes and
connectors, sub-assemblies on the canvas, annotations, editing a live job's routing,
Gantt reading skills, planned-vs-actual overlays, drag modes, safety prompts, labels and
color rules, layout persistence, dispatch views. This cluster carries the signature
brand hook and the heaviest screenshot density.

### CLUSTER 28 — SHOP FLOOR EXECUTION (60 posts)

**Pillar**: `edgebic-shop-floor-guide`.
**Topics** (ch 21–24, R03; UserGuide 18–20): kiosk workflows (start/count/pause/complete),
manual actuals entry, piece counting, pause reasons, handoffs, actuals-preserving
reschedule mechanics, partial completion, prior-step backfill, change-log audit,
"why actuals are immutable", daily execution routines, supervisor patterns.

### CLUSTER 29 — QUOTING & PROMISING (40 posts)

**Pillar**: `edgebic-quoting-guide`.
**Topics** (ch 32–33, R06; UserGuide 21–22): quote simulation against finite capacity,
realistic promise dates, cost and margin, markup, scenarios (extra shift, skip step,
capacity boost), side-by-side comparison, quote-to-order conversion, quote statuses,
what-if for sales. **Honesty**: say "simulated promise dates", never "CTP module".

### CLUSTER 30 — INVENTORY & PLANNING (80 posts)

**Pillar**: `edgebic-planning-guide`.
**Topics** (ch 26–31, R04–R05): inventory ledger concepts, MTS vs MTO, consume-from-
stock netting, build-to-inventory, projected available balance, ATP, forecast
consumption, replenishment suggestions, firming, MPS grid, time fences, sales orders as
firm demand, MRP roadmap thought-leadership ("what sits between MRP and the shop floor").
**Honesty**: describe capabilities without release-version promises (strategy §5).

### CLUSTER 31 — UPGRADE & COMPARISON (40 posts)

**Pillar**: the `/rmdb-to-edgebic` page.
**Topics**: RMDB-to-EDGEBIC deep dives per module (10), EDGEBI-to-EDGEBIC visual
continuity (5), RMX/Excel-to-EDGEBIC growth path (5), side-by-side capability posts (10),
Phase-3 `edgebic-vs-<competitor>` posts (10, gated on strategy §9 timing).

### CLUSTER 32 — ADMIN & DEPLOYMENT (40 posts)

**Pillar**: `edgebic-admin-guide`.
**Topics** (ch 38, 40–41, R09; UserGuide 25–27): users/roles/permissions, login lockout,
audit logs, SQLite vs SQL Server choice, first-time setup wizard, database migration,
DPAPI-protected connection config, import mask administration, housekeeping/data clear,
backup patterns, options/configuration reference tabs.

---

## 3. PRODUCTION WAVES (sequencing 2,120 posts)

| Wave | Posts | Content | Why first |
|---|---|---|---|
| 1 | 50 | Cluster pillars (16) + top walkthroughs (C20) + visual scheduling core (C27) | Establishes the hub-and-spoke skeleton and the brand hook, maximum screenshot value |
| 2 | 250 | C17 platform posts + C21 top-8 ERPs (JobBOSS, Epicor, Fourth Shift first) | Product entity + the user's named ERP priorities |
| 3 | 400 | C19 how-to (top recipes) + C24 troubleshooting | Long-tail intent capture |
| 4 | 500 | C23 glossary + C18 concepts | Definitional/LLM-citation layer |
| 5 | 500 | C19 remainder + C22 industry + C25 outcomes | Breadth |
| 6 | 420 | C26–C32 remainder + refresh pass on waves 1–2 | Completion + freshness |

**Velocity guidance**: publish 15–25/week max with quality gates (below); at that rate
the full plan is a 20–26 month program. Indexing gate: pause a wave if GSC "Crawled,
not indexed" exceeds 15% of the last 200 published posts, and improve internal linking
before resuming.

## 4. PER-POST QUALITY GATES (every post, no exceptions)

- Grounded in a named FCP-Book file (cite internally in the PR description).
- ≥1 real EDGEBIC screenshot (per image plan); no stock-only posts in clusters 17–32.
- ≥3 `faqQuestions`, ≥2 `qaQuestions` in frontmatter.
- Links: its pillar, `/edgebic`, one sibling post, and (where a generic concept exists)
  the cluster 1–16 generic post. No orphans.
- Fact-consistency contract from strategy §7 (1991, 35+ years, customer names, category).
- Honesty guardrails from strategy §5.
- Passes the existing pre-publish checklist in SEO-CONTENT-STRATEGY.md §8.

## 5. MEASUREMENT

- GSC page group "EDGEBIC blog" tracked weekly; KPI = indexed %, impressions, avg
  position for `edgebic` + product-task queries.
- LLM citation spot-checks monthly: ask major assistants "What is EDGEBIC?" /
  "EDGEBIC vs RMDB" / "How does EDGEBIC integrate with JobBOSS?" and log which URLs get
  cited; adjust definitional pages accordingly.
- Cannibalization audit quarterly: any query where two of our URLs alternate rankings →
  consolidate per SEO-CONTENT-STRATEGY §12 rules.
