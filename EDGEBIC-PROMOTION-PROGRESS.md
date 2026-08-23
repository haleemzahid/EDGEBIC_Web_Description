# EDGEBIC PROMOTION — LIVING PROGRESS TRACKER

> **This is the canonical status file for the whole EDGEBIC promotion program.**
> Update it in the same commit as the work it records (same rule as
> ALL-CONTENT-PROGRESS.md / PILLAR-PAGES-PROGRESS.md). Any person or AI session
> resuming this program starts by reading this file, then
> [EDGEBIC-PROMOTION-STRATEGY.md](EDGEBIC-PROMOTION-STRATEGY.md) (decisions),
> [EDGEBIC-BLOG-TAXONOMY.md](EDGEBIC-BLOG-TAXONOMY.md) (the 2,120-post plan + voice
> standards), and [EDGEBIC-IMAGE-PLAN.md](EDGEBIC-IMAGE-PLAN.md) (screenshots).

**Last updated**: 2026-08-23 · **Branch**: `feature/edgebic-promotion` (1 unpushed commit; ~1,300 uncommitted files; not merged to main)

> 🔴 **SOURCE-RELIABILITY RULE (established flight 12, after three defects traced to it).**
> The FCP-Book's **R-series recipe appendices contradict the UserGuide** in several places,
> and the UserGuide is the one that describes what actually ships. Confirmed conflicts:
> per-user permission overrides (R09 R9/R10 vs UserGuide §27 "permissions come only from
> roles"); an in-app security Audit Log screen (R09 R16 vs §27 "no viewing screen");
> min/max batch sizes on the work center editor (R01 R76 vs UserGuide 06); routing-level
> recalculation (R01 R87); setup-matrix paste (R01 R55 vs UserGuide 09); Gantt event colors
> (enum appendix vs config-knobs appendix). **When they disagree, the UserGuide wins.**
> Every agent brief now carries this. Worth reporting to whoever maintains the book: the
> recipes appear to document intended or partially-built behavior, not shipped behavior.
>
> ✅ **RESOLVED 2026-08-22 — yield / scrap inflation.** Ruled from the UserGuide, which is
> authoritative over the R-series. **Product-level yield inflation SHIPS, but only on the
> replenishment side.** UserGuide 31 §"set a product's inventory planning fields" gives the
> field: **Yield** sits in **Inventory Planning (MTS / MTO)** on the product, and "the build
> quantity is inflated so the shippable quantity is still met — at 90% yield, an order for
> 100 starts 112". The **Suggested** lens is defined as "the quantity to actually order or
> build, after lot-sizing and yield are applied" (UserGuide 31 lens reference), and the
> glossary entry agrees. So: replenishment/MRP suggestions are inflated; lot sizing runs
> first, yield second.
> **What does NOT ship:** there is no yield or scrap field on a routing step anywhere in the
> UserGuide (BOR chapters 10–12, scheduling 14, backward scheduling 15, manufacturing orders
> 13 and products 04 contain no occurrence of "yield" or "scrap"). The scheduler does not
> inflate a quantity as it flows down a routing; it loads each operation against the quantity
> the order carries. An order entered by hand is not inflated. The R-series
> `31-mrp-erp-roadmap.md` item A4 claims per-step `BOR.FirstPassYield` inflation "landed July
> 2026"; the UserGuide documents no such field, so **the UserGuide wins and that claim is not
> usable in copy.**
> **Reporting half stands:** kiosk good/scrap counters (scrap always carries a reason, and
> never counts toward produced quantity) feed the OEE **Quality %** = good / (good + scrap +
> rework) and the scrap Pareto. That is measurement, not inflation.
> **Writing rule going forward:** yield inflates a *suggested* build quantity on a stocked
> product. Never write that the schedule, the routing, or the engine inflates a quantity for
> scrap. For make-to-order work, sizing the order quantity for scrap is a planner decision.
> **Corpus aligned 2026-08-22** (6 posts edited): `how-a-schedule-accounts-for-scrap-and-yield-loss`,
> `edgebic-for-technical-ceramics-kiln-scheduling`, `edgebic-for-abrasives-manufacturing-scheduling`,
> `edgebic-for-sawmills-and-lumber-processing-scheduling`, `what-is-yield-in-manufacturing`,
> `a-product-yield-value-is-out-of-range-edgebic`. The planning-cluster posts
> (`how-to-set-a-product-yield-for-scrap-inflation-in-edgebic`,
> `how-lot-sizing-and-yield-inflation-shape-order-quantities-in-edgebic`,
> `what-is-a-replenishment-suggestion`, `edgebic-for-li-ion-battery-yield-and-scrap` and peers)
> were already correctly scoped and were left untouched.

---

## PHASE STATUS (from strategy §8)

| Phase | Scope | Status | Gate to advance |
|---|---|---|---|
| 1 | Launch release: 3 new pages, nav/footer, callouts, llms.txt, strategy docs | 🟡 **BUILT, NOT VERIFIED** — commits `fee1072` + `b8e91cd` on the branch | `pnpm exec tsc --noEmit` clean → visual QA → merge to main → deploy |
| 2 | Wave 1 blog (50 posts) + llms-full.txt EDGEBIC section + first 30 screenshots | ⬜ Not started | Phase 1 deployed; GSC page groups created |
| 3 | Homepage metadata repositioning test + edgebic-vs-* pages | ⬜ Not started | 8 weeks stable rankings after Phase 1/2 |
| 4 | Blog Waves 2–4 + geo-page EDGEBIC mentions | ⬜ Not started | Indexing gate green (see below) |
| 5 | Legacy consolidation evaluation | ⬜ Not started | 12 months + per-page GSC review |

## PHASE 1 CHECKLIST (current)

- [x] Branch `feature/edgebic-promotion` created from `main`
- [x] `/edgebic`, `/rmdb-to-edgebic`, `/edgebic-erp-integration` pages
- [x] Nav + footer + homepage announcement + 3 legacy-page callouts
- [x] sitemap priorities + llms.txt restructure
- [x] Strategy / taxonomy / image-plan docs
- [x] Editorial pass + voice standards codified
- [ ] `pnpm exec tsc --noEmit` clean (HUMAN: run and report)
- [ ] Visual QA: `/`, `/edgebic`, `/rmdb-to-edgebic`, `/edgebic-erp-integration`, RMDB/EDGEBI/RMX pages
- [ ] Merge to `main`, deploy
- [ ] GSC: create page groups "EDGEBIC pages", "Legacy products", "Blog" — record baseline clicks/impressions here
- [ ] Submit updated sitemap in GSC

## BLOG PRODUCTION SCOREBOARD - CLOSED 2026-08-23

> ⛔ **THE WRITING PROGRAM IS CLOSED.** The 2,120 target is retired. Do not open a new
> writing flight. See `EDGEBIC-RESUME-HERE.md` §0 for the closure proof.

| Cluster | Slug | Orig. target | Written | Published | Indexed | Status |
|---|---|---|---|---|---|---|
| 17 | edgebic-platform | 180 | 182 | 0 | 0 | over target |
| 18 | edgebic-scheduling-concepts | 200 | 106 | 0 | 0 | CLOSED, proven 3x |
| 19 | edgebic-how-to | 500 | 352 | 0 | 0 | CLOSED, 151-procedure sweep |
| 20 | edgebic-walkthroughs | 50 | 50 | 0 | 0 | met |
| 21 | edgebic-erp-integration | 150 | 151 | 0 | 0 | met |
| 22 | edgebic-industry | 110 | 116 | 0 | 0 | over target |
| 23 | edgebic-glossary | 350 | 351 | 0 | 0 | CLOSED |
| 24 | edgebic-troubleshooting | 120 | 123 | 0 | 0 | over target |
| 25 | edgebic-outcomes | 100 | 100 | 0 | 0 | met |
| 26 | edgebic-optimization | 60 | 54 | 0 | 0 | CLOSED, UG16 exhausted |
| 27 | edgebic-visual-scheduling | 40 | 50 | 0 | 0 | over target |
| 28 | edgebic-shop-floor | 60 | 64 | 0 | 0 | SATURATED, 245 atoms tested |
| 29 | edgebic-quoting | 40 | 39 | 0 | 0 | 1 slot declined (undocumented button) |
| 30 | edgebic-planning | 80 | 62 | 0 | 0 | CLOSED |
| 31 | edgebic-migration | 40 | 41 | 0 | 0 | over target |
| 32 | edgebic-admin | 40 | 43 | 0 | 0 | over target |
| | **TOTAL** | ~~2,120~~ | **1,884** | **0** | **0** | **CLOSED** |

**Nominal gap was 246; real gap was 4, all in UserGuide 36.** All four were written.
Chapters 31-37 postdate the corpus (Aug 3 vs Jul 16), which is why earlier sweeps of
UG01-30 missed them. **When the UserGuide gains chapters, sweep only those chapters.**

### Structural health (verified 2026-08-23, all from disk)

| Metric | Before | After |
|---|---|---|
| Orphaned posts (zero inbound links) | 358 | **0** |
| Broken internal `/blog/` links | 82 | **0** |
| Posts with no `pillarSlug` | 537 | **0** |
| Em dashes corpus-wide | 9,829 | **0** |
| Clusters without a hub post | 3 | **0** |
| Corpus total | 2,404 | **2,418** (1,884 EDGEBIC) |

Hubs created: `edgebic-erp-integration-guide`, `edgebic-migration-guide`,
`edgebic-glossary-index`. The industry pillar now links all 115 verticals (it linked 0).

**Counts are derivable from disk - never trust a number in this file without re-deriving:**
```bash
cd content/blog && grep -h -oE "^cluster:\s*'?edgebic-[a-z-]+" *.mdx \
  | sed "s|cluster:\s*'\?||" | sort | uniq -c | sort -rn
```

## WAVE LOG (append one row per completed batch)

| Date | Wave | Posts added | Clusters touched | Commit | Notes |
|---|---|---|---|---|---|
| 2026-08-23 | 18 / closure + structural | 14 | how-to (4), planning (2), glossary (1), erp-integration (1), scheduling-concepts (1), outcomes (1), quoting (1), migration (1), plus 3 new cluster HUBS | uncommitted | **THE CLOSURE FLIGHT. The writing programme is now formally closed; do not open another.** 15 agents ran a closure proof rather than a writing flight: all 612 UserGuide headings extracted, 302 boilerplate stripped, the remaining 310 teachable units scored against the corpus, and all 151 explicit "How to:" procedures mapped to distinguishing regexes and swept. 29 survived title screening; 26 resolved to real covering posts. **246 nominal slots reduced to 4 real ones, ALL in UserGuide 36.** ROOT CAUSE OF EVERY RESIDUAL GAP: chapters 31-37 are dated Aug 3, the rest Jul 16 - they postdate the corpus, and earlier sweeps only covered UG01-30. RULE FOR NEXT TIME: when the UserGuide gains chapters, sweep ONLY those chapters. Optimization, shop-floor and platform lanes returned honest zeros with fresh evidence. **STRUCTURAL WORK (the larger half): orphans 358 to 0, broken internal links 82 to 0, posts with no pillarSlug 537 to 0, em dashes 9,829 to 0, clusters without a hub 3 to 0.** Created `edgebic-erp-integration-guide`, `edgebic-migration-guide`, `edgebic-glossary-index`; wired pillarSlug into 540 files; the industry pillar now links all 115 verticals (it linked 0). **CONTENT DEFECTS CLOSED:** yield/scrap ruled from UserGuide 31 (inflation ships on replenishment SUGGESTIONS only, never a routing step or hand-entered order) and 6 posts corrected, 4 of them newly discovered; 9 RMDB-era posts carrying BAPI/RESTlet/SuiteTalk connector overclaims reframed (several were in FAQ answers feeding JSON-LD); the three flight-13 mid-check files verified, only 1 was actually wrong. **Q9 RESOLVED and the premise was mostly false:** UserGuide 36 documents a shipped Integration module (watched file OR read-only external SQL query, on an interval, through an existing mask, with run history), so the ODBC/direct-database thread is continuity, not a regression; only the API paths do not carry forward. **SEO/SCHEMA:** Organization JSON-LD gained a stable @id, legalName, address, contactPoint, knowsAbout, awards and G2/Capterra sameAs; SoftwareApplication `operatingSystem` corrected from 'Web' to Windows; both EDGEBIC editions now emit real prices; robots.ts names 21 AI crawler agents explicitly; llms.txt and llms-full.txt rewritten EDGEBIC-first with pricing, and 211 URLs normalised off the redirecting www host. **METHOD WARNINGS FOR FUTURE SESSIONS:** (1) a crashed `grep -rliF` loop returned FALSE ZEROS for every subsequent phrase, nearly shipping a duplicate - sanity-check any sweep against a phrase known to exist before trusting a zero; (2) bulk regex is the dominant defect source - a `catalogue`->`catalog` pass mangled `catalogued` into `catalogd`, and a bare em-dash pass created false compounds (`conflict-but`) inside `description:` and FAQ frontmatter; both were caught only by a dedicated read-only verification agent, which was worth more than any single writing agent; (3) a shared scratchpad caused two agents to overwrite each other's helper scripts - use per-agent filenames. QA: 0 em-dash, 0 FCP, 0 British spellings, 0 CTP/ControlTower, 0 body braces, 0 broken links, 1,884/1,884 with pillarSlug. |
| 2026-08-16 | 17 / flight 17 | 20 | glossary (20) | see git log | **Content programme closed.** Two agents on a fresh partition (enum/status vocabularies vs conceptual/process terms), 10 each, no shortfall — glossary 329 to 349 of 350. The enum lane ran dry mid-flight and the agent pivoted honestly to shipped FIELD-level terms with zero coverage: the import-mask option family (UpdateExistingRecords, AutoCreateMissingMasters, AutoGenerateNextInSeq, MarkCompleteOnImport, AutoCalcHours, ReplaceExisting, Alt_Type, Op_Flag) plus two Settings fields. Both agents report their lanes now closed. METHOD NOTE for any future session: slug-prefix sweeping DOES NOT WORK on this corpus — `cluster` is a frontmatter field, not a filename prefix, so `ls | grep '^edgebic-glossary'` returns 1 file. Use `grep -l '^cluster: edgebic-glossary'`. A naive sweep would badly underestimate coverage and write duplicates. NEW OWNER DECISION: **permission override** has now been independently rejected by THREE agents on the same grounds — UserGuide §30's admin table lists it, but §27 states permissions come only from roles. A genuine unresolved contradiction in the source. QA: 0 em-dash/FCP/British/CTP/ControlTower, 0 stray pillarSlug, 5 questions on every post, 117/117 links resolve. |
| 2026-08-15 | 16 / flight 16 | 38 + 1 correction | glossary (26), outcomes (4), erp-integration (3), quoting (2), how-to (1), migration (1), shop-floor (1) | see git log | **The flight that proved saturation.** 7 agents dispatched for ~95 posts; 38 written. Three lanes returned COMPLETE shortfalls with rigorous proof: scheduling-ops how-to 0/15 (extracted all 483 bold UI labels from 8 UserGuide chapters and tested each against the 27MB corpus), optimization 0/6 (decomposed UserGuide 16 into 58 teachable atoms, every one covered 3-6 times over; 80 optimizer slugs exist across 5 clusters), platform 0/3. How-to routing/BOR returned 1/15. Glossary was the surprise: both lanes delivered 13/13, so that seam was underestimated. TWO ACCURACY DEFECTS CAUGHT, both the engine-vs-UI pattern: (1) `stopping-the-optimizer-early-still-gives-a-valid-plan` claimed Cancel returns a usable incumbent plan, but UserGuide 16 L45 says Cancel gives `Stopped, nothing was changed` - it contradicted its own sibling post; retitled and rebuilt, and a second error found in it (overnight-budget advice when budgets are 10/30/60s). (2) `migrating-work-centers-and-shifts-to-edgebic` says shifts/holidays must be hand-recreated, but Shift and PlantHoliday are 2 of the 8 import masks - STILL UNFIXED, see open items. Also ran `tsc --noEmit`: 6 errors, ALL in application code this branch never touched (auth providers, Ably hook, example data, license script) - pre-existing on main, not a merge blocker from this work. QA: 0 em-dash/FCP/British/CTP/ControlTower, 289/289 links resolve. |
| 2026-08-14 | 15 / flight 15 | 68 + 5 corrections | glossary (24), outcomes (10), how-to (10), shop-floor (9), optimization (5), quoting (5), erp-integration (4), walkthroughs (1) | see git log | Found uncommitted on disk at session start and secured. Also closed the three files left mid-verification at the end of flight 13 (the undocumented 0.1-2.0 efficiency clamp, the parallel-group `minimum efficiency threshold` absent from UserGuide 12, and the alternate speed-factor claim) plus the shop-floor kiosk glossary and a transit-time post. Corpus verification after: audit-log-screen 0, per-user-override 0; the remaining entry-mode/PM/downtime matches are all CORRECTIVE framing (the rewritten posts lead with the correction, which also captures the search traffic for the misconception). QA: 0 em-dash/FCP/British/CTP/ControlTower across all 73 files, author 73/73. |
| 2026-08-13 | 14 / flight 14 | 8 | migration (8) | see git log | **Written directly by the main session, no agents dispatched.** Chose migration after checking the two clusters with the largest nominal gaps and finding optimization far thinner than the 11 estimated: its 49 posts already cover nearly all of UserGuide 16, leaving ~5 real angles (missing setup goal, CP-SAT component absent and falling back, nearest-challenger line, arrow-and-word change cells, first-run prerequisites). Migration had genuine runway because no migration-cluster post covered the features whose data is NOT importable. **Key verified finding driving 4 of the 8 posts: the import masks cover exactly 8 entity types** (Product, Workcenter, Customer, SalesOrder, BOR, Actuals, PlantHoliday, Shift) — so departments, work center groups and members, operators/skills/certifications/rosters/time off, the sequence-dependent setup matrix, and quotes/scenarios are all hand-built. UserGuide 09 is explicit that the setup-matrix editor has Export CSV but "no import button"; UserGuide 03 gives departments export only; UserGuide 21/22 have no quote import. Posts: setup-matrix migration (entry order across the 4 tabs, verification via the Job View Setup Reason column), work-center-group migration (import routings with alternates first, then consolidate; binding replaces per-step alternates; planner pin still wins), operators-and-skills migration (skills-before-people order, expiry dates as the load-bearing field, deactivate-not-delete), what-EDGEBIC-cannot-import (the definitive two-list split + exports do not round-trip + imports never schedule + the BOR one-file-per-product rule), migration-team roles, first-30-days, Microsoft Project migration (file-per-job collapses to one routing per product), quotes/quote-history (do not migrate; fix work-center rates and product unit costs first). Guards honored: group member Factor treated as real and editable, no editable utilization claim, costing kept to labor + material, optimizer described as never-worse-with-Accept only. QA: 0 em-dash/FCP/British/CTP/ControlTower, 8/8 author + 3 faq + 2 qa, 35/35 unique blog links resolve, both landing-page links exist, 0 existing content files modified. Also **reconstructed the missing flight-13 row and corrected the scoreboard, which was a full flight stale** (still showed 1,630 and flight-12 per-cluster counts). |
| 2026-07-30 | 13 / flight 13 | 56 + 82 corrections | how-to (12), glossary (24), erp-integration (14), walkthroughs (2), troubleshooting (3), admin (1) | b0ffc64 | *Row reconstructed in flight 14 from the commit message — flight 13 committed its content but never updated this tracker.* Three how-to lanes and the platform closer returned honest shortfalls proven by procedure census rather than guessed: the shop-floor how-to lane produced **zero**, with all 56 documented procedures in UserGuide 18/19/08 matched to posts already covering them. **THIRD AND LARGEST ACCURACY REMEDIATION**: 82 published posts carried claims about UI that does not exist, all traceable to the FCP-Book R-series recipe appendices, which describe the engine rather than the shipped product. Five defect classes closed: security (in-app audit-log screen, per-user permission overrides, one post with the permission model inverted), maintenance (work-center service-interval fields, kiosk PM banner), downtime (downtime-events tab, downtime type field, shift-scoped closures as configurable), entry mode (per-work-center hours-versus-pieces selector, propagating from the shop-floor kiosk glossary entry), utilization (editable utilization percentage and efficiency factor, including a fabricated 50 percent default). Corrections substituted the documented mechanism rather than deleting sections. Guards established and honored: group Factor columns, job-level Schedule at Utilization, and kiosk pause reason codes are genuine and were left untouched. No correction was manufactured. QA: 0 em-dash/FCP/British/CTP/ControlTower across all 138 files, every internal link resolves. |
| 2026-08-09 | 12 / flight 12 | 84 + 7 corrections | how-to (24, two partitioned agents), glossary (12), erp-integration (12), outcomes (12), admin (12), troubleshooting (12) | see git log | 7 agents, all completed with NO shortfall (first uninterrupted flight since 9). How-to split into two agents on partitioned domains (master-data setup vs running-the-plant) since how-to needs 211 more; zero overlap resulted. Glossary found a fresh seam in the anomaly-check families (K/G/L/H/M/I/F/T). **SECOND ACCURACY REMEDIATION**: an admin agent surfaced that R09 recipes describe per-user permission overrides and an in-app security Audit Log screen, both of which UserGuide 27 explicitly says do not exist. A dedicated remediation agent then rewrote 2 how-tos built entirely on those non-existent flows and surgically fixed 5 more posts; what-is-an-effective-permission had its CORE MECHANISM wrong (roles + grants - denies with ''explicit deny wins'') vs the real union-of-roles model. Substituted the real Users-grid Active/Locked/Last-login diagnostic path rather than deleting content. Corpus-wide verification after: 0 audit-screen claims, 0 per-user-override claims. Established the source-reliability rule at the top of this file. Fixed 3 British ''catalogue''. QA: 0 em-dash/FCP/British/CTP/ControlTower, 92/92 author, 693/693 links resolve. |
| 2026-08-08 | 11 / flight 11 | 83 | glossary (12), how-to (12), industry (12), platform (12), troubleshooting (12), walkthroughs (12), visual-scheduling (11) | see git log | 7 agents, then 6 continuation agents after the process stopped the flight at 45 of 84. Concepts + planning retired as mined out; rotated onto walkthroughs (35->47) and visual-scheduling (33->44). Only shortfall: visual-scheduling 1 (cluster saturated). **CORRECTED A COMMITTED OVERCLAIM**: `edgebic-gantt-view-explained.mdx` (flight 8) marketed "a highlighted critical path" as a Gantt feature; the source is explicit that critical-path classification is `BorFeatureFlags.EnableCriticalClassification`, a compile-time constant **currently disabled**. Verified against A4-appendix-enums + A5-appendix-config-knobs, then rewrote the description, keywords, lead, H2 section, 3 Q&A answers and 2 body paragraphs to claim only the dependency links that genuinely render. This is the ONLY intentional edit to committed content in the program so far. Agents rejected several of MY OWN candidate angles as inventions: a PM banner, a category-rename filter behavior, group-lane-vs-machine-lane, multi-select/bulk actions, a job-vs-resource axis toggle, and "quote status will not advance" (the source says there is no enforced status sequence, so the symptom cannot occur). Password/lockout policy tasks excluded because they are configured through application config files. Fixed 1 British "travelling", 1 borderline "unlock", 3 dangling links. QA: 0 em-dash/FCP/British/CTP/ControlTower, 83/83 author, 714/714 links resolve. |
| 2026-08-07 | 10 / flight 10 | 81 | erp-integration (14), industry (13), how-to (12), glossary (12), optimization (12), shop-floor (12), scheduling-concepts (6) | see git log | 7 agents. THIRD INTERRUPTION: process stopped the flight after only 4 posts landed; relaunched all 7 with adjusted targets, then a stream-stall wave hit 5 of them mid-write and all 5 were resumed in place from their transcripts (glossary had already written all 12, ERP was on its final four). Net 81. Scheduling-concepts hit an honest shortfall of 6 and is now CONFIRMED MINED OUT (100 posts; the surrounding corpus covers nearly every remaining engine mechanic) - stop weighting it. How-to opened a fresh seam in the R07-R10 recipe appendices (pre-flight checks, circular-dependency repair, setup families, report export/group/filter, permissions, security audit log). Agents rejected on honesty grounds: MaxParallelWorkCenters (stored but not documented as enforced), Hybrid BOR merge mode (code-only, no planner control), run-time skill certification (kiosk has no login - plan-time only), offline queue, thin ERP triads for 7 systems that would have required inventing product detail. Fixed 1 banned "unlocked". QA: 0 banned/em-dash/FCP/British/CTP/ControlTower, 81/81 author, 641/641 links resolve, 0 existing files touched. NOTES FOR NEXT FLIGHT: (a) glossary agents must sweep ALL ~1,920 blog files, not just the cluster - half a candidate list was lost to out-of-cluster collisions; (b) FCP-Book has NO 19-kiosk.md or 08-operators-and-skills.md (19 is queue/transit/flow, 08 is BOR) - cite 21-actuals-kiosk.md / 44-operators-skills.md; (c) owner check: the optimizer-permissions post is sourced from the CLAUDE.md registry, not the UserGuide - verify role-matrix wording. |
| 2026-08-06 | 9 / flight 9 | 84 | glossary (12), how-to (12), industry (12), troubleshooting (12), outcomes (12), quoting (12), migration (12) | see git log | 7 agents; skipped the saturated planning cluster + rested concepts, weighting the under-built quoting (19->31) and migration (18->30) plus productive glossary/how-to/industry/troubleshooting/outcomes. SECOND INTERRUPTION: the process stopped all 7 agents after 55 of 84 landed; relaunched 6 continuation agents (glossary+how-to merged) to fill the 29-post gap, seeded with the 2026-08-06 posts on disk. Full 84, NO shortfall this flight (every cluster reached 12; agents rejected roadmap-only/unverifiable angles cleanly - setup-family-quality as roadmap A1, quoting-with-operator-skill as not in the quote-sim path, export-mask as a non-feature). Fixed 1 CTP negation ("not a capable-to-promise system" -> "hard capacity-reservation system"; phrase banned even negated) + 1 dangling cross-link to a never-written sibling. Also PUSHED the branch to origin for the first time (all 1,298 prior posts now on GitHub) before this flight's recovery. QA: 0 banned/em-dash/FCP/British/CTP/ControlTower, 84/84 author, 571/571 links resolve, 0 existing files touched. |
| 2026-08-05 | 8 / flight 8 | 79 | glossary (12), how-to (12), platform (12), admin (12), walkthroughs (12), erp-integration (12), planning (7) | see git log | 7 agents, rotated onto the under-built admin (15->27) and walkthroughs (23->35) clusters + platform refresh (153->165) to rest the strained concepts seam. All 7 completed cleanly (no process interruption this flight). 6 clusters hit 12; planning hit an HONEST shortfall of 5 (cluster saturated at 44, only 7 uncovered mechanics remained) -> 79 net. How-to found a rich untapped seam (scenario step-overrides + config-export + Gantt display options, no shortfall). Every agent matched the live sibling category/pillar on disk. Fixed 1 British "catalogue"->"catalog". QA: 0 banned/em-dash/FCP/British/CTP/ControlTower, 79/79 author, 553/553 links resolve, 0 existing files touched. Product gaps logged: date-range/monthly capacity override has no UI entry point; shift-scoped downtime has no config screen; Is_Bottleneck/OnePerDay settable only via import; MPS behind a preview flag; schedule export is grid-snapshot only (not a round-trip module); security audit trail has no in-app browser. Planning now effectively mined out. |
| 2026-08-04 | 7 / flight 7 | 81 | glossary (12), how-to (12), troubleshooting (12), outcomes (12), shop-floor (12), optimization (12), scheduling-concepts (9) | see git log | 7 agents into the deepest remaining clusters. INTERRUPTION: the process stopped all 7 agents mid-flight after 42 of 84 posts had landed (glossary complete; the other 6 partial). Stopped agents cannot be resumed, so relaunched 6 FRESH continuation agents seeded with the 2026-08-04 posts already on disk, each filling only its exact gap (concepts 10, troubleshooting 10, outcomes 7, optimization 6, how-to 5, shop-floor 4) and matching the live sibling convention. Net 81, not 84: concepts hit an HONEST shortfall of 3 (cluster ~89 posts already; only 9 genuinely distinct non-roadmap angles remained — flagged, not padded). Fixed 8 dangling cross-links: pre-stop posts linked to sibling slugs the stopped agents never wrote, repointed each to the real equivalent on disk. QA: 0 banned/em-dash/FCP/British/CTP/ControlTower, 81/81 author, 524/524 links resolve, 0 existing files touched. Durability proven: on-disk files survived the process stop with zero loss. |
| 2026-08-03 | 6 / flight 6 | 84 | glossary (12), scheduling-concepts (12), quoting (12), migration (12), industry (12), erp-integration (12), visual-scheduling (12) | see git log | 7 agents; opened the 3 most under-built clusters (quoting 7->19, migration 6->18, visual-scheduling 21->33) plus deep glossary/concepts/ERP. INFRA EVENT: a mid-stream stall wave killed 5 of 7 agents after they finished research; resumed all 5 in place via SendMessage (research + locked slugs intact), each told to re-check disk and fill only gaps — clean recovery, migration's partial batch-1 not duplicated. Convention-fix worked: every agent matched the live sibling's exact category/pillar on disk instead of trusting the brief (ERP -> "ERP Integration (EDGEBIC)"/no pillar/`/edgebic-erp-integration`; migration -> "Upgrade & Comparison"; quoting -> "Quoting & Promising"; industry -> "Industry Applications (EDGEBIC)"; visual -> "Visual Scheduling"). Agents fixed 5 "unlock" verbs, rejected roadmap-only + unmodeled terms (kanban/takt/backflush not in product; critical-path viz build-flag-gated; no operator-lanes view). Fixed 3 British "cancelled"->"canceled". QA: 0 banned/em-dash/FCP/British/CTP/ControlTower, 84/84 author, 653/653 links resolve, 0 existing files touched. Product gaps logged: no operator/skill Gantt swimlane; critical-path viz gated behind build flag; move/teardown composition order + global order-sort key list under-specified in source (doc-consistency); CTP still appears in the source dictionary. |
| 2026-08-02 | 5 / flight 5 | 82 | glossary (22), scheduling-concepts (12), erp-integration (12), planning (12), optimization (12), shop-floor (12) | see git log | 7 agents; weighted to the deepest + most under-built clusters (opened optimization 13->25 and shop-floor 13->25). 84 written, 2 deleted at QA: both glossary agents independently wrote a Theory-of-Constraints + a Critical-Path definition, kept the canonical slugs and repointed 3 referrers. Fixed 12 ERP posts (brief error: dropped nonexistent pillarSlug edgebic-erp-integration-hub, repointed body link to the real /edgebic-erp-integration page, normalized category to "ERP Integration (EDGEBIC)"). Optimization + shop-floor + planning agents self-corrected pillar/category to live convention. All agents rejected roadmap-only items (drum-buffer-rope, CCPM, yield inflation, Balanced/JIT presets, bottleneck-util/flow-time goals) rather than overclaim. Corrected scoreboard drift to disk-authoritative counts (platform 161->153 etc.). QA: 0 banned/em-dash/FCP/British/CTP/ControlTower, 82/82 author, 565/565 links resolve, 0 existing files touched. Product gap logged: no overhead/standard-cost/contribution-margin in the costing engine. |
| 2026-07-23 | 1 | 50 | 15 of 16 (all but migration) | 917bdc3 | 7 parallel agents; 13 pillars + 10 walkthroughs + 8 visual + 6 ERP + 8 troubleshooting + 5 glossary; QA pass fixed 2 claims; ~110k words; no heroImage yet (screenshots pending) |
| 2026-07-23 | 1 fix | 0 | erp-integration | c721268 | Corrected "new-jobs-only mode" claim in 4 Wave 1 posts (no user-facing mode picker exists) |
| 2026-07-24 | 2 / flight 1 | 84 | platform (72), erp-integration (12) | 19e620c | 7 parallel agents, 4 angles x 18 chapters + 12 ERP; ~150k words; QA: 0 banned/em-dash/FCP hits, 0 dup slugs, 151/151 internal links resolve, 0 existing files touched |
| 2026-08-01 | 4 / flight 3 | 84 | planning (24), glossary (12), scheduling-concepts (12), how-to (12), troubleshooting (12), platform (6), industry (6) | see git log | 7 agents; opened the near-empty planning cluster (1->25) + continued glossary/concepts/troubleshooting. how-to agent dropped ~14 candidate tasks as duplicate/undocumented (seam thinning, confirmed) and found 12 real ones. Concepts agent flagged a claim to confirm: MRP-roadmap chapter says yield inflation (BOR.FirstPassYield) SHIPPED, but strategy honesty table treats it as roadmap - wrote the conservative workaround, upgradeable if confirmed shipped. QA: all scans clean, 187/187 links resolve, 0 collisions across all 888 |
| 2026-07-31 | 4 / flight 2 | 84 | optimization (12), visual-scheduling (12), shop-floor (12), quoting (6), migration (6), ERP (12), glossary (12), outcomes (12) | see git log | 7 agents; filled the under-built clusters that were pillar-only in Wave 1. 3 agents hit an infra stream-watchdog stall (not usage limit) with 0 files written, cleanly re-dispatched. Agents substituted 1 non-existent view (operator-lanes -> work-center-lanes) and flagged ERP market-positioning as context-only. QA: all scans clean, 202/202 links resolve, 0 collisions across all 804 |
| 2026-07-30 | 4 / flight 1 | 84 | glossary (48), scheduling-concepts (12), industry (24) | see git log | 7 parallel agents self-selecting uncovered terms; every glossary/concept agent reported NO shortfall (corpus still deep). Agents rejected internal-only terms (unit of work, repository) and roadmap items (drum-buffer-rope, CCPM, yield inflation) rather than overclaim. QA: all scans clean, 200/200 links resolve, 0 collisions across all 720. Open item logged: canonical glossary URL form (dash vs slash) needs app confirmation |
| 2026-07-29 | 3 / flight 4 | 84 | glossary (60), scheduling-concepts (24) | see git log | 7 parallel agents; pivoted off micro-tasks to the definitions dictionary: 60 glossary terms (engine/planning/execution/reporting/diagnostics) + 24 deeper concept posts; ~105k words; QA: all scans clean, 161/161 links resolve, 0 cross-commit collisions across all 636. Fixed 3 glossary links from hyphen to canonical slash form + retargeted 2 phrases to avoid cannibalizing generic glossary terms (ATP, FPY). **WAVE 3 COMPLETE (400+ how-to/troubleshooting/glossary/concept posts across 4 flights).** |
| 2026-07-28 | 3 / flight 3 | 84 | how-to (72), troubleshooting (12) | see git log | 7 parallel agents; work-center deep, routing internals, scheduling control, remaining reports, kiosk/operators, deployment/options, + 12 new troubleshooting symptoms; ~115k words; QA: all scans clean, 195/195 links resolve, 0 cross-commit slug collisions across all 552, 1 British UI label normalized. ~11 tasks substituted for undocumented features (the granular how-to seam is thinning; Flight 4 pivots to glossary/concepts). New product-finding note added on doc-vs-UI control gaps |
| 2026-07-27 | 3 / flight 2 | 84 | how-to (72), troubleshooting (12) | see git log | 7 parallel agents; inventory, MPS/sales orders, quoting/scenarios, admin/import, advanced-scheduling config, Gantt/options, + 12 new troubleshooting symptoms; ~110k words; QA: all scans clean, 183/183 links resolve. Genericized internal FCP filesystem paths + env flag out of 3 posts (see product-finding note); 2 more feature gaps surfaced (no filter-Gantt-by-WC, no optimizer job-freeze button); docs-vs-code disagreement on scenario step-overrides logged |
| 2026-07-26 | 3 / flight 1 | 84 | how-to (72), troubleshooting (12) | see git log | 7 parallel agents; task-level recipes (products, calendars/capacity, routing, orders/scheduling, actuals, reports) + 12 new troubleshooting symptoms; ~120k words; QA: all scans clean, 159/159 links resolve, 2 em dashes fixed. 3 feature gaps surfaced by "flag don't invent" (inert On Hold, no cross-product routing clone, bottleneck-flag activation) logged Q14/Q15 |
| 2026-07-25 | 2 / flight 3 | 82 | industry (36), outcomes (24), erp-integration (12), platform (10) | see git log | 7 parallel agents; machining/process/regulated industry sets, outcome mechanisms, ROI + buyer decision content, Infor/Dynamics/Global Shop, advanced feature interactions; ~150k words; QA: all scans clean, 221/221 links resolve, 13 files normalized from British to US spelling. **WAVE 2 COMPLETE (250 posts).** |
| 2026-07-24 | 2 / flight 2 | 84 | platform (72), erp-integration (12), admin (8) | 5cf3bc0 | 7 parallel agents; actuals/reschedule/snapshots, BOR authoring/diagnostics/import, inventory/ATP/forecast, MPS/quotes/scenarios, reports/dashboards/column glossary, security/deployment/config, SAP+NetSuite+Sage; ~155k words; QA: all scans clean, 176/176 links resolve, 1 cross-post numeric contradiction reconciled (anomaly-check count) |

## SCREENSHOT TRACKER

- Master manifest: `FCP-Book/UserGuide/images/SHOT-LIST.md` (145 shots) — tick the ✅
  column there per capture; that file is the source of truth for guide shots.
- Marketing M-shots (25): tracked here — captured: **0 / 25**.
- Sections captured (of 30): **0** · Feature-branch sections 07/08: ⬜ not scheduled.

## INDEXING GATE (checked before each wave advances)

Rule (taxonomy §3): pause publishing if GSC "Crawled, currently not indexed" exceeds
15% of the last 200 published posts. Log each check:

| Date | Posts checked | Not-indexed % | Verdict |
|---|---|---|---|
| — | — | — | — |

## TRAFFIC-SAFETY WATCH (weekly for 8 weeks post-merge, per strategy §3.6)

| Week | Legacy pages clicks WoW | Blog clicks WoW | Any page >20% drop? | Action |
|---|---|---|---|---|
| — | — | — | — | — |

## LLM CITATION SPOT-CHECKS (monthly)

Prompts: "What is EDGEBIC?" · "EDGEBIC vs RMDB" · "How does EDGEBIC integrate with
JobBOSS?" — log which of our URLs each major assistant cites.

| Date | Assistant | Cited our URL? | Which | Notes |
|---|---|---|---|---|
| — | — | — | — | — |

## HOUSE STYLE ADDENDUM (added after Wave 2 flight 3)

**US spelling is house style.** A flight-3 batch shipped British forms (utilisation,
optimisation, flavour, behaviours, programmes, organisations, recognises, minimises).
All were normalized before commit. This matters beyond taste: US buyers search
"capacity utilization" and "optimization", so the British forms lose the keyword match.
Add a US-spelling check to every future QA pass, and beware the false positives
(optimistic, optimism, analysis are correct US spellings).

**Glossary link + cannibalization rules (added Wave 3 flight 4).** The 185 live generic
glossary terms render at `/blog/glossary/<term>` (slash). Link that canonical slash form,
NOT the `/blog/glossary-<term>` hyphen form (which only 301-redirects; the .mdx file is
named with the hyphen so a naive file-existence check passes anyway). Where a new EDGEBIC
`what-is-X` post covers a term that also has a generic glossary entry, it must (a) take the
product-behavior angle, (b) link the generic entry, and (c) use a DISTINCT targetPhrase
(not the bare term) so the two do not cannibalize. Pre-existing corpus has ~210 hyphen-form
links that redirect fine; a scripted slash-normalization pass across ALL posts is a future
tidy-up, not urgent.

## OPEN ITEM: CANONICAL GLOSSARY URL FORM (needs running-app confirmation)

The 185 live generic glossary term files are named `glossary-<term>.mdx` (dash). The site
survey said they render canonically at `/blog/glossary/<term>` (slash) via sitemap logic +
redirects. Both forms resolve (dash serves the file or 301s to slash). We cannot determine
the CANONICAL form from the repo alone. Waves link a mix; not broken either way. When the app
is available, confirm the canonical form and run one scripted normalization pass across ALL
posts (this + the ~210 pre-existing dash-form links). Low priority, cosmetic.

## OPEN QUESTIONS FOR THE PRODUCT / BUSINESS OWNER

Raised by writing agents cross-checking sources. Each blocks or qualifies published
claims; answer and then correct the named posts.

| # | Question | Why it matters | Affected content |
|---|---|---|---|
| ~~Q1~~ | ~~Are Work Center Groups and Operators/Skills in the shipping build?~~ **RESOLVED 2026-07-24 by the owner: claim both as SHIPPED, present tense, no hedge.** Scope is those two features only; inventory / forecasting / replenishment / MPS keep the capability-without-release-promises guardrail. | — | No changes required; rule added to the Wave-2 agent brief |
| Q2 | **Does flagging a bottleneck alone activate anchor scheduling, or is a target start date also required?** Chapter 16 says both are required (with a worked example); recipe books R01/R10 imply the flag alone suffices. | Four posts teach "both are required" as the rule. | 4 Wave-2 TOC posts |
| Q3 | **Is work center utilization % editable in the shipping build?** Architecture chapter documents it as the operative knob (default 50); UserGuide says current versions run at 100% and the field is not editable. | Three posts tell readers to express headroom through calendars instead. | 3 Wave-2 capacity posts |
| Q4 | **Are Is Bottleneck / One Per Day settable only via import?** UserGuide says "not on the edit dialog in the current release". | Four posts point readers at import columns. | 4 Wave-2 work-center posts |
| Q5 | **Do the dashboard utilization color bands match** (red 90%, amber 75%; High/Medium/Low at 81/51)? | Used as planner-facing thresholds in one post. | 1 Wave-2 post |
| Q6 | **Does a partial CSV import truly leave omitted cells unchanged?** | Stated as safe in setup-matrix guidance. | 1 Wave-2 post |
| Q7 | **Do the shipped Setup Matrix tab labels match** (Families / Product Assignments / Family Matrix / Product Overrides; Setup Source + Setup Reason columns)? | Used verbatim in two posts. | 2 Wave-2 posts |
| **Q8** | **DOC BUG (not a content issue): Chapter 27 claims the two forecast-consumption rules produce different gross-requirement totals, but by the formulas the book itself states they are algebraically identical; Chapter 28 concedes as much.** Either the docs or the code is wrong. | We declined to repeat the claim; posts present both formulas and frame the choice as recording intent. Engineering should resolve the source. | `how-forecast-consumption-works-in-edgebic` (already written safely) |
| ~~Q9~~ | ~~Positioning: older RMDB posts describe SAP/NetSuite integration via BAPI, RESTlet and ODBC; EDGEBIC posts describe Excel/CSV/database import masks.~~ **RESOLVED 2026-08-22 by a consistency pass over 9 RMDB-era posts.** Fix had three moves: (1) a "Which generation this describes" callout on the 4 posts making present-tense product-level connector claims; (2) reframing so the API paths are described as what the *ERP vendor* publishes, with the file/database route named as the one User Solutions uses and why it is durable; (3) naming the ODBC/direct-database story as continuity, not regression, since EDGEBIC's Integration module runs a database query or watched file on a schedule through the same import mask. No RMDB history was deleted and no connector was claimed. | Closed. `/edgebic-erp-integration` needed no change; it already answered the native-connector objection correctly. | 9 blog posts (see below) |
| Q10 | **Is the routing comparison report planner-reachable, and do snapshot integrity findings surface in the UI or only in logs?** | Two posts tell planners to run/watch for these. | 2 Wave-2 posts |
| Q11 | **Is the auto-filled actuals badge (docs dated 2026-07-07) in the customer build?** Same shipping-build question Q1 answered for groups/operators. | Written as current UI throughout the actuals chapter. | 4 Wave-2 actuals posts |
| Q12 | **Confirm counts against the shipping build**: 18 vs 19 report panes; 21 vs 22 glossary providers (the Q1 decision may make it 22); Column Details coverage across reports. | Used as concrete numbers in several posts. | 4 Wave-2 reports/glossary posts |
| Q13 | **Is there an in-app viewer for the security audit trail, and is self-service password reset enabled?** UserGuide and architecture chapter disagree. | Three posts say the audit record is database-only and reset is installation-dependent. | 3 Wave-2 admin posts |
| Q14 | **Does the "On Hold" job status do anything?** The docs describe `OnHold` as inert: the scheduler treats a held job like a normal one. A status control that silently does nothing is a UX issue. | The how-to post was written around Clear Schedule (which genuinely releases capacity) instead. | `how-to-put-a-job-on-hold-in-edgebic` |
| Q15 | **Is there any way to copy a routing to a different product?** No documented one-click cross-product routing clone exists (clone stays within one product; product-clone skips the BOR). | Post written around building/importing the target routing, stating plainly no clone button exists. | `how-to-copy-a-routing-to-another-product-in-edgebic` |

## PRODUCT FINDING: ARCHITECTURE DOCS DESCRIBE CONTROLS THE SHIPPING UI DOES NOT EXPOSE

Recurring across Wave 3: the architecture chapters document editable fields/screens that
the UserGuide (user-facing truth) says are read-only or absent in the current build.
Agents followed the UserGuide and routed readers to the levers that ARE exposed, but
these are real UI/doc gaps for engineering:
- **Work center utilization %** — architecture says editable (default 50), UserGuide says
  runs at 100%, not editable. Express headroom via shift hours / downtime / overrides.
- **Is Bottleneck / One Per Day** — a recipe shows an edit-dialog checkbox; UserGuide says
  import-only in the current release.
- **Date-range capacity override ("Manage Capacity Overrides")** — no visible entry point
  in the current release; only the per-day override dialog's From/To is exposed.
- **Pieces capacity fields** — recipe puts them on the WC editor; UserGuide shows them as
  read-only columns with piece-rate set on the routing step.
- **TOC buffers** — architecture: default off, toggled via a DB context row, no UI;
  UserGuide: presented as automatic on anchoring. ALSO the buffer-sizing percentages
  disagree between sources: the owning chapter says constraint ~50% / shipping ~25% /
  feeding ~10% of upstream path, the A2 appendix says shipping ~15% / feeding ~20%.
  Surfaced in 3 separate flights; content uses the owning chapter's worked numbers.
- **Scenario step-overrides** — UserGuide presents Skip/Replace/ModifyTime as functional
  via Run Simulation; a recipe notes the base simulation does not yet apply them.
- **UI label spelling** — "Partial-Confirm Behaviour" and "Work Centre Performance" are
  British on screen while the code and the rest of the UI are US. Normalized in copy.

## PRODUCT FINDING: THE "FCP" NAME STILL LEAKS TO END USERS (not a content issue)

Wave 3 agents kept hitting the internal `FCP` name in places a customer actually sees,
even though the product is branded EDGEBIC. Each was genericized in the blog copy, but
the underlying leaks are in the SHIPPING PRODUCT and are worth an engineering rename pass:
- **Data folder + database file**: `%LOCALAPPDATA%\FCP\FCP.db` (backup/restore docs).
- **Import-log folder**: `%LocalAppData%\FCP\Logs\ImportLogs`.
- **Environment flag**: `FCP_MPS_ENABLED` gates the MPS tab.
- **Datasource config**: `%LOCALAPPDATA%\FCP\datasource_config.json`.
Blog copy now points readers at the app's own DataSource tab instead of hardcoding these,
which is both brand-safe and more robust. But an end user who opens their data folder or
an admin who sets the env flag still sees "FCP".

## DECISIONS & CHANGES LOG (append-only)

- 2026-07-23 — Program launched. Panel decisions locked in strategy doc. Phase 1 built
  on `feature/edgebic-promotion` (`fee1072`), editorial pass (`b8e91cd`).
