# EDGEBIC PROMOTION — LIVING PROGRESS TRACKER

> **This is the canonical status file for the whole EDGEBIC promotion program.**
> Update it in the same commit as the work it records (same rule as
> ALL-CONTENT-PROGRESS.md / PILLAR-PAGES-PROGRESS.md). Any person or AI session
> resuming this program starts by reading this file, then
> [EDGEBIC-PROMOTION-STRATEGY.md](EDGEBIC-PROMOTION-STRATEGY.md) (decisions),
> [EDGEBIC-BLOG-TAXONOMY.md](EDGEBIC-BLOG-TAXONOMY.md) (the 2,120-post plan + voice
> standards), and [EDGEBIC-IMAGE-PLAN.md](EDGEBIC-IMAGE-PLAN.md) (screenshots).

**Last updated**: 2026-07-23 · **Branch**: `feature/edgebic-promotion` (not merged)

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
| 17 | edgebic-platform | 180 | 155 | 0 | 0 |
| 18 | edgebic-scheduling-concepts | 200 | 1 | 0 | 0 |
| 19 | edgebic-how-to | 500 | 1 | 0 | 0 |
| 20 | edgebic-walkthroughs | 50 | 11 | 0 | 0 |
| 21 | edgebic-erp-integration | 150 | 42 | 0 | 0 |
| 22 | edgebic-industry | 110 | 37 | 0 | 0 |
| 23 | edgebic-glossary | 350 | 5 | 0 | 0 |
| 24 | edgebic-troubleshooting | 120 | 9 | 0 | 0 |
| 25 | edgebic-outcomes | 100 | 25 | 0 | 0 |
| 26 | edgebic-optimization | 60 | 1 | 0 | 0 |
| 27 | edgebic-visual-scheduling | 40 | 9 | 0 | 0 |
| 28 | edgebic-shop-floor | 60 | 1 | 0 | 0 |
| 29 | edgebic-quoting | 40 | 1 | 0 | 0 |
| 30 | edgebic-planning | 80 | 1 | 0 | 0 |
| 31 | edgebic-migration | 40 | 0 | 0 | 0 |
| 32 | edgebic-admin | 40 | 9 | 0 | 0 |
| | **TOTAL** | **2,120** | **300** | **0** | **0** |

**"Written" count is derivable from disk** (don't trust memory, count files):
PowerShell: `Select-String -Path content/blog/*.mdx -Pattern "cluster: 'edgebic-" | Group-Object { ($_.Line -split "'")[1] } | Sort-Object Name | Format-Table Name, Count`

## WAVE LOG (append one row per completed batch)

| Date | Wave | Posts added | Clusters touched | Commit | Notes |
|---|---|---|---|---|---|
| 2026-07-23 | 1 | 50 | 15 of 16 (all but migration) | 917bdc3 | 7 parallel agents; 13 pillars + 10 walkthroughs + 8 visual + 6 ERP + 8 troubleshooting + 5 glossary; QA pass fixed 2 claims; ~110k words; no heroImage yet (screenshots pending) |
| 2026-07-23 | 1 fix | 0 | erp-integration | c721268 | Corrected "new-jobs-only mode" claim in 4 Wave 1 posts (no user-facing mode picker exists) |
| 2026-07-24 | 2 / flight 1 | 84 | platform (72), erp-integration (12) | 19e620c | 7 parallel agents, 4 angles x 18 chapters + 12 ERP; ~150k words; QA: 0 banned/em-dash/FCP hits, 0 dup slugs, 151/151 internal links resolve, 0 existing files touched |
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

## DECISIONS & CHANGES LOG (append-only)

- 2026-07-23 — Program launched. Panel decisions locked in strategy doc. Phase 1 built
  on `feature/edgebic-promotion` (`fee1072`), editorial pass (`b8e91cd`).
