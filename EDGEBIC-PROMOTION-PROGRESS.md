# EDGEBIC PROMOTION — LIVING PROGRESS TRACKER

> **This is the canonical status file for the whole EDGEBIC promotion program.**
> Update it in the same commit as the work it records (same rule as
> ALL-CONTENT-PROGRESS.md / PILLAR-PAGES-PROGRESS.md). Any person or AI session
> resuming this program starts by reading this file, then
> [EDGEBIC-PROMOTION-STRATEGY.md](EDGEBIC-PROMOTION-STRATEGY.md) (decisions),
> [EDGEBIC-BLOG-TAXONOMY.md](EDGEBIC-BLOG-TAXONOMY.md) (the 2,120-post plan + voice
> standards), and [EDGEBIC-IMAGE-PLAN.md](EDGEBIC-IMAGE-PLAN.md) (screenshots).

**Last updated**: 2026-08-02 · **Branch**: `feature/edgebic-promotion` (not merged)

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

## BLOG PRODUCTION SCOREBOARD (target 2,120 — update counts per publishing batch)

| Cluster | Slug | Target | Written | Published | Indexed |
|---|---|---|---|---|---|
| 17 | edgebic-platform | 180 | 153 | 0 | 0 |
| 18 | edgebic-scheduling-concepts | 200 | 73 | 0 | 0 |
| 19 | edgebic-how-to | 500 | 229 | 0 | 0 |
| 20 | edgebic-walkthroughs | 50 | 23 | 0 | 0 |
| 21 | edgebic-erp-integration | 150 | 78 | 0 | 0 |
| 22 | edgebic-industry | 110 | 67 | 0 | 0 |
| 23 | edgebic-glossary | 350 | 171 | 0 | 0 |
| 24 | edgebic-troubleshooting | 120 | 69 | 0 | 0 |
| 25 | edgebic-outcomes | 100 | 49 | 0 | 0 |
| 26 | edgebic-optimization | 60 | 25 | 0 | 0 |
| 27 | edgebic-visual-scheduling | 40 | 21 | 0 | 0 |
| 28 | edgebic-shop-floor | 60 | 25 | 0 | 0 |
| 29 | edgebic-quoting | 40 | 7 | 0 | 0 |
| 30 | edgebic-planning | 80 | 43 | 0 | 0 |
| 31 | edgebic-migration | 40 | 6 | 0 | 0 |
| 32 | edgebic-admin | 40 | 15 | 0 | 0 |
| | **TOTAL** | **2,120** | **1,054** | **0** | **0** |

**"Written" count is derivable from disk** (don't trust memory, count files):
PowerShell: `Select-String -Path content/blog/*.mdx -Pattern "cluster: 'edgebic-" | Group-Object { ($_.Line -split "'")[1] } | Sort-Object Name | Format-Table Name, Count`

## WAVE LOG (append one row per completed batch)

| Date | Wave | Posts added | Clusters touched | Commit | Notes |
|---|---|---|---|---|---|
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
| Q9 | **Positioning: older RMDB posts describe SAP/NetSuite integration via BAPI, RESTlet and ODBC; EDGEBIC posts describe Excel/CSV/database import masks.** No factual conflict, but a prospect reading both may ask whether the new flagship integrates less deeply. | Cross-content narrative gap on the highest-intent ERP queries. | ERP cluster + `/edgebic-erp-integration` page |
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
