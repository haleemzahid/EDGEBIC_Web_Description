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
| 17 | edgebic-platform | 180 | 0 | 0 | 0 |
| 18 | edgebic-scheduling-concepts | 200 | 0 | 0 | 0 |
| 19 | edgebic-how-to | 500 | 0 | 0 | 0 |
| 20 | edgebic-walkthroughs | 50 | 0 | 0 | 0 |
| 21 | edgebic-erp-integration | 150 | 0 | 0 | 0 |
| 22 | edgebic-industry | 110 | 0 | 0 | 0 |
| 23 | edgebic-glossary | 350 | 0 | 0 | 0 |
| 24 | edgebic-troubleshooting | 120 | 0 | 0 | 0 |
| 25 | edgebic-outcomes | 100 | 0 | 0 | 0 |
| 26 | edgebic-optimization | 60 | 0 | 0 | 0 |
| 27 | edgebic-visual-scheduling | 40 | 0 | 0 | 0 |
| 28 | edgebic-shop-floor | 60 | 0 | 0 | 0 |
| 29 | edgebic-quoting | 40 | 0 | 0 | 0 |
| 30 | edgebic-planning | 80 | 0 | 0 | 0 |
| 31 | edgebic-migration | 40 | 0 | 0 | 0 |
| 32 | edgebic-admin | 40 | 0 | 0 | 0 |
| | **TOTAL** | **2,120** | **0** | **0** | **0** |

**"Written" count is derivable from disk** (don't trust memory, count files):
PowerShell: `Select-String -Path content/blog/*.mdx -Pattern "cluster: 'edgebic-" | Group-Object { ($_.Line -split "'")[1] } | Sort-Object Name | Format-Table Name, Count`

## WAVE LOG (append one row per completed batch)

| Date | Wave | Posts added | Clusters touched | Commit | Notes |
|---|---|---|---|---|---|
| — | — | — | — | — | — |

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

## DECISIONS & CHANGES LOG (append-only)

- 2026-07-23 — Program launched. Panel decisions locked in strategy doc. Phase 1 built
  on `feature/edgebic-promotion` (`fee1072`), editorial pass (`b8e91cd`).
