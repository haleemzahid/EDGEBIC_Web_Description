# EDGEBIC PROMOTION STRATEGY — EXPERT PANEL REVIEW & DECISIONS

> **Date**: 2026-07-23 · **Branch**: `feature/edgebic-promotion`
> **Purpose**: Single source of truth for promoting EDGEBIC as the flagship product while
> protecting every existing ranking. Companion documents:
> [EDGEBIC-BLOG-TAXONOMY.md](EDGEBIC-BLOG-TAXONOMY.md) (2,000+ post plan) and
> [EDGEBIC-IMAGE-PLAN.md](EDGEBIC-IMAGE-PLAN.md) (real-screenshot infusion).

---

## 1. THE SITUATION

- 35 years of manufacturing scheduling experience (User Solutions, founded 1991).
- Three legacy products being backlogged: **RMX** (Excel), **RMDB** (database flagship),
  **EDGEBI** (graphical/BI companion).
- New flagship: **EDGEBIC** — inherits all RMDB + EDGEBI functionality on a modern stack
  (.NET 8, WPF, SQLite/SQL Server) with a stronger engine: TOC anchor scheduling,
  multi-shift allocation, sequence-dependent setup matrix, lot streaming, parallel and
  alternate work centers, work center groups, operator/skill constraints, a two-layer
  optimizer (multi-run + CP-SAT mathematical solver), kiosk shop-floor actuals, quoting
  with what-if scenarios, and a drag-and-drop graphical routing designer (run the factory
  as a flow chart).
- The website today: RMDB is the hero everywhere (homepage title, llms.txt, 534 blog
  posts, 15 comparison pages). EDGEBIC appears in exactly one component. This is the gap
  this branch closes — **without breaking what already ranks**.

## 2. THE PANEL (roles convened for this review)

| Expert | Mandate | Core verdict |
|---|---|---|
| **Website-migration expert** | Zero organic traffic loss | Add pages, never remove or rename. No URL, title, or meta changes on ranking pages. Legacy pages get *additive* successor callouts only. |
| **SEO expert** | Rankings + entity building | EDGEBIC has zero search volume today; the play is (a) hang the new brand off existing category rankings via internal links, (b) build the EDGEBIC entity for LLMs (llms.txt, definitional hub page, consistent facts), (c) grow a product-led semantic library (the 2,000-post plan). |
| **Strategy expert** | Portfolio transition | "Next generation," not "replacement." Legacy customers must read continuity, not abandonment. Run both product lines in public for 6–12 months before any sunset messaging. |
| **Manufacturing expert** | Domain credibility | Use real planner vocabulary from the FCP-Book (finite capacity, TOC drum, transfer batches, sequence-dependent changeover). Specificity is what practitioners — and LLMs — trust. |
| **New-product expert** | Launch narrative | Lead with the three demo-winning hooks: (1) run the whole factory as a drag-and-drop flow chart, (2) mathematically optimized schedules with a proven optimality gap, (3) days-not-months implementation. |
| **UX designer** | Cohesion | All new pages reuse the exact house patterns (section layout, cyan CTA, accordion FAQ). No new visual language on this branch; a redesign is a separate project. |
| **Marketing + psychology expert** | Trust & conversion | Anchor EDGEBIC to the heritage proof (GE, Cummins, BAE Systems, US Navy, 35 years). For legacy customers use continuity framing: "your RMDB investment carries forward." Concrete numbers beat adjectives everywhere. |

## 3. NON-NEGOTIABLE TRAFFIC-SAFETY RULES (migration expert — these override everything)

1. **No URL is changed, removed, or redirected** on this branch. All 534 blog posts, all
   RMDB/RMX/EDGEBI pages, all comparison/industry/geo pages stay exactly where they are.
2. **No title/description/H1 changes on any existing ranking page.** The homepage keeps
   its RMDB title. Repositioning the homepage metadata is a *later, measured* step (see
   Phase 3) — never in the same release as new-page launches, so effects stay attributable.
3. **Additive-only edits to existing pages**: successor callout blocks, nav/footer links,
   sitemap entries. Nothing existing is deleted.
4. **RMDB blog content stays forever.** It feeds topical authority for the category
   keywords EDGEBIC needs. New EDGEBIC posts must not duplicate existing slugs or target
   phrases (cannibalization guard in the taxonomy doc).
5. **Legacy product sunsets are messaging-only for now.** When a legacy page is truly
   retired (12+ months out, only if traffic has migrated), it 301s to its closest EDGEBIC
   equivalent — one page at a time, monitored in GSC for 4 weeks each.
6. **Watch metrics**: GSC impressions/clicks by page group (create `EDGEBIC`, `Legacy
   products`, `Blog` groups), weekly, for 8 weeks after merge. Any ranking page that loses
   >20% clicks WoW gets its diff reviewed and reverted if the change touched it.

## 4. POSITIONING DECISIONS (strategy + marketing + psychology)

- **One sentence**: *EDGEBIC is the next-generation finite capacity planning and
  scheduling platform from User Solutions — 35 years of RMDB and EDGEBI scheduling
  experience, rebuilt as one modern application.*
- **Brand naming**: always "EDGEBIC by User Solutions" on first mention per page.
  ("FCP" is the internal engine name; it never appears in marketing copy.)
- **Relationship framing**: EDGEBIC = RMDB (engine depth) + EDGEBI (graphical
  experience) + a new engine generation. Never call legacy products "old" or
  "deprecated" in public copy; say "proven classic" / "previous generation."
- **The three hooks** (in order, per new-product expert):
  1. **Visual factory**: build routings and run scheduling from a drag-and-drop
     flow-chart designer (the Graphical BOR Designer).
  2. **Provable schedules**: the optimizer's CP-SAT layer returns schedules with a
     mathematical optimality certificate, and the multi-run layer is guaranteed
     never worse than the baseline.
  3. **Fast to live**: the same rapid-implementation methodology behind the
     documented 5-day Fourth Shift ERP integration (Plastilite).
- **Loss-aversion for legacy customers**: every legacy touchpoint says what *carries
  forward* (data, routings via import masks, scheduling concepts, support), never what
  they lose.

## 5. HONESTY GUARDRAILS (manufacturing expert — claims we may and may not make)

The FCP-Book was audited for claim support. These rules bind all pages and all 2,000 posts:

| Claim | Status | How to phrase |
|---|---|---|
| Drag-and-drop graphical routing / flow-chart factory | ✅ Documented (Graphical BOR Designer) | Claim freely, show screenshots |
| Finite capacity, forward + backward (JIT), TOC anchor, multi-shift, parallel/alternate WCs, WC groups, lot streaming, setup matrix, operators/skills | ✅ Documented chapters | Claim freely |
| Optimizer with proven optimality (CP-SAT) + never-worse multi-run | ✅ Documented (ch 42) | "Mathematical optimization with a proven optimality gap" — never "always optimal" |
| Kiosk shop-floor actuals, actuals-preserving reschedule, dashboards, reports | ✅ Documented | Claim freely |
| Quoting, what-if scenarios, quote→order conversion | ✅ Documented | Claim freely |
| Inventory / forecasting / MPS | 🟡 Documented but on feature branches | Describe capability without release-version promises |
| Control Tower | 🔴 Vision only (not built) | Do NOT market. Roadmap-only language if ever mentioned |
| **ERP integration (JobBOSS, Epicor, Fourth Shift, etc.)** | 🟡 Nuanced | EDGEBIC integrates through **flexible Excel/CSV/database import-export masks** (products, work centers, BOR routings, sales orders, actuals in; schedules and dates out). The *heritage* proof (vendor-recommended Fourth Shift integration, Macola, AS400/Cummins, SAP, Epicor) belongs to the User Solutions line. Never claim a "turnkey certified connector" for a named ERP. |
| "Capable to Promise (CTP)" | 🔴 Not built (B8) | Say "quote simulation / what-if promise dates," not CTP |
| 5-day implementation | ✅ For the documented RMDB/Fourth Shift case | Attribute to the methodology/case, not as a blanket EDGEBIC guarantee |

## 6. WHAT THIS BRANCH SHIPS (implementation scope)

### New pages (new URLs — zero risk to existing rankings)
| URL | Purpose | Target queries |
|---|---|---|
| `/edgebic` | Flagship product hub. Definition-first (LLM-citable), full feature map from the FCP-Book, FAQ + JSON-LD | "EDGEBIC", "EDGEBIC software", "EDGEBIC User Solutions" |
| `/rmdb-to-edgebic` | Upgrade path for RMDB + EDGEBI customers. Continuity framing, capability comparison, migration steps via import masks | "RMDB upgrade", "RMDB successor", "EDGEBI next version" |
| `/edgebic-erp-integration` | Honest ERP story: import-mask architecture + heritage integrations, with JobBOSS / Epicor / Fourth Shift sections | "EDGEBIC ERP integration", "scheduling software for JobBOSS", "Fourth Shift scheduling" |

### Additive edits to existing files
- **Nav**: EDGEBIC entry added at the top of the Software dropdown; footer Products list
  gains EDGEBIC (first position). Nothing removed.
- **Homepage**: one new announcement section inserted below the hero (component
  `EdgebicAnnouncement`). Homepage metadata untouched.
- **Legacy product pages** (`/resource-manager-db-2`, `/edgebi`,
  `/resource-manager-for-excel-2`): shared `EdgebicSuccessorCallout` block appended.
  Metadata untouched.
- **`app/sitemap.ts`**: `edgebic` added to HIGH_PRIORITY; the two supporting pages to
  MEDIUM_PRIORITY.
- **`public/llms.txt`**: restructured to present the product line with EDGEBIC as
  flagship and RMDB as the proven classic. All RMDB facts retained (LLMs need the
  heritage to ground EDGEBIC).

### Documents
- This file, plus [EDGEBIC-BLOG-TAXONOMY.md](EDGEBIC-BLOG-TAXONOMY.md) and
  [EDGEBIC-IMAGE-PLAN.md](EDGEBIC-IMAGE-PLAN.md).

## 7. LLM / AI-CITATION STRATEGY (SEO expert)

LLMs cite pages that give them (a) a clean one-paragraph definition, (b) stable facts
repeated consistently across pages, (c) tables, (d) Q&A. Therefore:

1. `/edgebic` opens with a quotable definition paragraph and a facts table (company,
   founded 1991, product category APS/FCS, stack, database options, heritage customers).
2. `public/llms.txt` presents the whole product line with EDGEBIC first; `llms-full.txt`
   gets an EDGEBIC section in a later pass (Phase 2).
3. **Fact consistency contract** (use these exact values everywhere): founded **1991**;
   **35+ years**; customers **US Navy, GE, BAE Systems, Cummins**; category **Advanced
   Planning & Scheduling (APS) / Finite Capacity Scheduling**; EDGEBIC =
   **successor to RMDB + EDGEBI**; integration = **Excel/CSV/database import-export**.
4. Every future EDGEBIC blog post carries FAQ + Q&A blocks (existing frontmatter already
   supports `faqQuestions`/`qaQuestions`) and links back to `/edgebic`.
5. The FCP-Book's `ZZ-definitions` plain-language dictionary becomes the glossary
   expansion engine (see taxonomy doc) — definitional content is the highest-citation
   format.

## 8. PHASED ROLLOUT

| Phase | When | What | Gate |
|---|---|---|---|
| **1 (this branch)** | Now | New pages, nav/footer, callouts, llms.txt, strategy docs | Build passes; visual QA; merge |
| **2** | +2 weeks | First 50 EDGEBIC blog posts (Wave 1 of taxonomy), llms-full.txt EDGEBIC section, capture first 30 screenshots per image plan | GSC page groups stable |
| **3** | +6–8 weeks | Homepage metadata repositioning test ("EDGEBIC & RMDB — …" title), EDGEBIC comparison pages (edgebic-vs-*) | 8 weeks of stable rankings after Phase 1/2 |
| **4** | +3–6 months | Waves 2–4 of blog plan, geo-page EDGEBIC mentions, video strategy | Blog indexing healthy (see taxonomy §7) |
| **5** | +12 months | Evaluate legacy page consolidation (only if EDGEBIC pages outrank legacy equivalents) | Per-page GSC review |

## 9. THINGS WE EXPLICITLY DECIDED NOT TO DO (and why)

- **Not renaming the homepage to EDGEBIC now** — the homepage title ranks for RMDB-era
  queries; changing it in the launch release would make any traffic movement
  unattributable. Phase 3, alone, measured.
- **Not creating `/edgebic-vs-competitor` pages yet** — EDGEBIC has no review-site
  presence; comparison pages would be thin. The existing RMDB-vs-X pages keep ranking and
  now link to `/edgebic`. Phase 3+.
- **Not building per-ERP "connector" pages claiming certified integrations** — not
  supported by the product docs (honesty guardrail). One honest integration hub instead.
- **Not touching the 534 existing posts** — a mass "RMDB→EDGEBIC" find-replace across
  ranking content is the classic self-inflicted traffic drop. Existing posts get EDGEBIC
  links only when they are next refreshed under the normal content-refresh cycle.
- **Not launching a separate EDGEBIC domain/subdomain** — splits authority; the 35-year
  domain is the moat.
