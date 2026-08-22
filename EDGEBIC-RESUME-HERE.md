# EDGEBIC PROMOTION - RESUME IN A FRESH CHAT

**Read this file first. It is the complete handoff.**
Last session ended: 2026-08-23 · Branch `feature/edgebic-promotion` · **working tree DIRTY, ~1,300 uncommitted files** · not merged to main.

---

## 0. START HERE - THE PROGRAM IS CONTENT-COMPLETE

**Stop writing posts. The corpus is closed at 1,884 EDGEBIC posts against a 2,120 target,
and that is the correct outcome, not a shortfall.**

The 2026-08-23 session ran a systematic closure proof rather than another writing flight:
all 612 UserGuide headings extracted, 302 boilerplate stripped, the remaining **310
teachable units** scored against all 2,404 files, and the **151 explicit "How to:"
procedures** each mapped to a distinguishing regex and swept corpus-wide. Twenty-nine
survived title-level screening; twenty-six resolved to real covering posts.

**Result: 246 nominal remaining slots reduced to 4 real ones.** All four were in
**UserGuide 36 (Integrations)**. That is the whole mechanism behind every residual gap:
**chapters 31-37 are dated Aug 3, the rest Jul 16.** They were added AFTER most of the
corpus was written, and earlier sweeps only covered UG01-30.

> ⚠️ **THE RULE THAT MATTERS FOR NEXT TIME:** when the UserGuide gains chapters, sweep
> ONLY those chapters. Do not re-sweep the whole book, and do not trust a nominal
> cluster-target gap as evidence that writable material exists.

Padding to 2,120 would require inventing product behavior. That is precisely what
produced the 82 defective posts this program spent multiple flights correcting.

---

## 1. WHERE THINGS STAND

| | |
|---|---|
| Repo | `D:\Usersolutons\EDGEBIC Description\EDGEBIC_Web_Description` |
| Branch | `feature/edgebic-promotion` - **1 unpushed commit (`f411eac`)**, not merged |
| Corpus | **2,418 posts total; 1,884 in `edgebic-*` clusters** |
| Source material | `D:\Usersolutons\ERP + FCP\FCP-Book` (UserGuide 01-37) |
| Canonical tracker | `EDGEBIC-PROMOTION-PROGRESS.md` |
| Rules | Section 3 and 5 of THIS file (still fully in force) |

**Verify counts from disk, never from a summary.** This file was itself a full flight
stale before the 2026-08-23 session corrected it.

```bash
cd "d:/Usersolutons/EDGEBIC Description/EDGEBIC_Web_Description/content/blog"
grep -h -oE "^cluster:\s*'?edgebic-[a-z-]+" *.mdx | sed "s|cluster:\s*'\?||" | sort | uniq -c | sort -rn
```

### Structural health (all verified 2026-08-23)

| Metric | Value |
|---|---|
| Orphaned posts (zero inbound links) | **0** (was 358) |
| Broken internal `/blog/` links | **0** (was 82) |
| Posts with no `pillarSlug` | **0** (was 537) |
| Em dashes corpus-wide | **0** (was 9,829) |
| Clusters without a hub post | **0** (was 3) |

Three hubs were created to close that last row: `edgebic-erp-integration-guide`,
`edgebic-migration-guide`, `edgebic-glossary-index`.

---

## 2. HOW MUCH IS ACTUALLY LEFT

**Zero. Every cluster is at or past target. Do not run another writing flight.**

| Cluster | Posts | Status |
|---|---|---|
| edgebic-how-to | 352 | CLOSED - proven by full 151-procedure sweep |
| edgebic-glossary | 351 | CLOSED - 292 book terms + ~40 APICS terms tested |
| edgebic-platform | 182 | Over target |
| edgebic-erp-integration | 151 | Target met |
| edgebic-troubleshooting | 123 | Over target |
| edgebic-industry | 116 | Over target |
| edgebic-scheduling-concepts | 106 | CLOSED - proven three times |
| edgebic-outcomes | 100 | Target met |
| edgebic-shop-floor | 64 | SATURATED - 245 UI atoms tested, zero writable |
| edgebic-planning | 62 | Over target |
| edgebic-optimization | 54 | CLOSED - UG16 exhausted |
| edgebic-walkthroughs | 50 | Target met |
| edgebic-visual-scheduling | 50 | Over target |
| edgebic-admin | 43 | Over target |
| edgebic-migration | 41 | Over target |
| edgebic-quoting | 39 | 1 slot declined: UG documents the `Delete All` button but not its behavior |

> ⚠️ **A PRIOR VERSION OF THIS TABLE WAS A TRAP.** It listed optimization at 49 with
> "~5 remaining" and named the five angles. All five had already been written in flight
> 15 (`6098fff`); an agent burned a full run rediscovering that. **The table above is
> derived from disk. Re-derive it yourself before believing any gap.**

## 3. ⚠️ THE MOST IMPORTANT THING IN THIS FILE

**The FCP-Book's R-series recipe appendices describe the ENGINE. The UserGuide
describes the SHIPPED UI. When they disagree, the UserGuide wins — always.**

Ignoring this produced **82 published posts that told planners to open tabs, set
fields and click buttons that do not exist.** All 82 have been corrected. Five
classes were found and closed:

| Class | The false claim | Reality (UserGuide) |
|---|---|---|
| Security | In-app audit-log screen; per-user permission overrides | §27: "no viewing screen"; "permissions come only from roles" |
| Maintenance | Work-center service-interval fields; kiosk PM banner | Zero hits for "preventive" anywhere; kiosk has ONE banner (routing-changed) |
| Downtime | Downtime-events tab; downtime type field; shift-scoped closures | §05: "the current release has no screen to configure them" |
| Entry mode | Per-work-center hours/pieces selector | Phrase absent entirely; kiosk always captures both |
| Utilization | Editable utilization % and efficiency factor; a fabricated 50% default | §06: runs at 100%, "the value is not editable on this screen" |

### 🛡️ GUARDS — real fields with confusingly similar names. Do NOT "correct" these:
- **Work center GROUP per-member `Factor (×)`** — REAL and editable (UserGuide 07, incl. "never applied to setup time").
- **Job-level `Schedule at Utilization`** — REAL.
- **Kiosk pause reason codes** — REAL (four categories, seeded list).
- **Job priority = plain positive number, lower first** — the blog is RIGHT; the UserGuide's own §30 quick-reference table is stale. Detailed sections beat summary tables.

### 📥 THE IMPORT MASKS COVER EXACTLY 8 ENTITY TYPES (verified flight 14, UserGuide 25)
**Product · Workcenter · Customer · SalesOrder · BOR · Actuals · PlantHoliday · Shift.**
⚠️ **Shift and PlantHoliday ARE two of the eight — do not repeat the common error of
calling them "configuration you re-create by hand."** UserGuide 25 line 15 lists them
explicitly. Hand-entry is a legitimate *choice* when you only have a few shift patterns;
it is not a requirement. This mistake reached both a published post and an agent brief
before being caught, so check it whenever migration or calendar setup comes up.

Never write that anything else can be imported. Confirmed hand-built, with sources:
departments (UG 03, export only) · work center groups and members (UG 07) · operators,
skills, certifications, rosters, time off (UG 08) · the sequence-dependent setup matrix
(UG 09 is explicit: Export CSV exists, "There is no import button on this dialog") ·
quotes and scenarios (UG 21/22). Also: **grid exports are snapshots and deliberately do
not round-trip**, **imports never schedule**, and a **BOR re-import replaces that product's
entire routing per run**, so all of one product's steps must be in one file.

### Also confirmed NOT to exist (never write a how-to for these):
Per-work-center holiday rows · date-range/monthly capacity override entry screen ·
recurring in-shift downtime · critical-path highlighting (disabled behind a
compile-time flag) · kiosk crash-recovery/open-punch restore · kiosk login
(free-text name; certification is enforced at PLAN time only) · offline queue.

---

## 4. HOW TO RUN A FLIGHT

Dispatch **up to 7 agents in parallel**, ~12 posts each. Partition tightly by
domain so they cannot collide. Every brief must include:

1. Read the standing briefs first:
   - `wave4-flight5-brief.md` (hard rules) and `wave1-brief.md` (post shapes),
     plus `wave3-glossary-brief.md` for glossary work.
   - ⚠️ These live in the **session scratchpad**, which a fresh chat will not have.
     Recreate them from §5 below, or tell the agent the rules inline.
2. **Copy conventions from a live sibling on disk** — never trust a brief's stated
   `category:` / `pillarSlug:`. Several briefs were wrong; disk is truth.
3. **Collision sweep across ALL ~2,200 files**, by slug *and* by distinguishing
   phrase. Cluster-only sweeps miss half the collisions.
4. The UserGuide-wins rule and the guard list from §3.
5. **"Report a shortfall rather than pad or invent."** This is the single most
   valuable instruction — one agent's honest zero-output report is what uncovered
   the entire contamination.

Then: QA sweep → update `EDGEBIC-PROMOTION-PROGRESS.md` (scoreboard + wave-log row)
→ commit → `git push origin feature/edgebic-promotion`.

### QA gate (must all pass before commit)
```powershell
$root="D:\Usersolutons\EDGEBIC Description\EDGEBIC_Web_Description"; Set-Location $root
[Environment]::CurrentDirectory=$root   # required: .NET IO uses process cwd, not PS location
$new = git status --porcelain content/blog | Where-Object { $_ -match '^\?\?' } |
       ForEach-Object { Join-Path $root (($_ -replace '^\?\?\s+','').Trim('"')) }
foreach($f in $new){ $t=[System.IO.File]::ReadAllText($f)
  if($t.Contains([char]0x2014)){ "EMDASH: $f" }
  if($t -cmatch '\bFCP\b'){ "FCP: $f" }
  if($t -match 'Capable[- ]to[- ]Promise|\bCTP\b'){ "CTP: $f" }
  if($t -match 'Control Tower'){ "CT: $f" } }
Select-String -Path $new -Pattern 'utilis|behaviour|catalogue|organis|colour|labour|prioritis|modelling|\bcancelled\b' -CaseSensitive
# link resolution: every ]( /blog/x ) must match a real content/blog/x.mdx

# MDX BRACE CHECK — a build breaker, added 2026-07-31 after it shipped once.
# MDX parses { } in the BODY as a JavaScript expression. Prose like
# SO-{year}-{four-digit sequence} fails acorn, and content-collections then drops
# that ONE document silently: the build logs "Build failed with 1 error", the dev
# server still serves the site, and only that post 404s. Wrap any braced literal in
# backticks (`SO-{year}-{four-digit sequence}`) — inline code is not parsed as JSX.
# Frontmatter is YAML and is never parsed by MDX, so leave braces there alone;
# adding backticks there would pollute the FAQ JSON-LD.
foreach($f in $new){
  $body = ([System.IO.File]::ReadAllText($f) -split '(?m)^---\s*$')[2]
  $body = $body -replace '(?s)```.*?```','' -replace '`[^`]*`','' -replace '\{/\*.*?\*/\}',''
  if($body -match '\{'){ "BRACE (will break the MDX build): $f" } }
```
After a content flight, confirm the doc count did not silently drop: the
content-collections line must read `finished build of 3 collections and N
documents` with **no** `acorn` / `Build failed` line above it.
Also verify: `author: user-solutions`, 3 faqQuestions + 2 qaQuestions, and that
**0 existing files were modified** (unless doing an authorized correction pass).

---

## 5. NON-NEGOTIABLE CONTENT RULES

- **Never write "FCP"** in user-facing copy. The product is **EDGEBIC**, "EDGEBIC by
  User Solutions" on first mention.
- **No em dashes** (U+2014). **US spelling** ("canceled", "catalog", "utilization").
- **ERP integration = Excel/CSV/database import & export masks ONLY.** Never a
  native, certified, or API connector. Frame as: export to file → import via saved
  mask → schedule → export the plan back.
- **Optimizer:** multi-run = "best of N tried, guaranteed never worse than the
  baseline"; CP-SAT = "proven within X% of optimal". **Never "always optimal."**
  The planner always presses Accept; it never auto-applies.
- **No CTP / Capable-to-Promise.** No **Control Tower** (roadmap only).
- **Costing is labor + material only** — no overhead, standard cost or contribution margin.
- **Yield/scrap inflation:** a product's **Yield** field (Inventory Planning MTS/MTO) inflates
  the *suggested* build quantity only (lot sizing first, then `ceil(need / yield)`; at 90%
  yield a need for 100 suggests 112). **There is no yield on a routing step**, the scheduler
  never inflates a quantity through a routing, and a hand-entered order is not inflated.
  First-pass yield as a *reporting* figure is the OEE Quality % off kiosk good/scrap punches.
  (Ruled 2026-08-22 from UserGuide 31; R-series A4 per-step `BOR.FirstPassYield` is overruled.)
- Concurrency is **last-write-wins**. Schedule export is a **grid snapshot**, not a
  round-trip module.
- **Heritage proof** (GE Railcar 30→90%, USS Nimitz 26,000+ tasks, Cummins 33
  locations, Homestead 40h→2h, Technical Glass, Turner Bicycles) is attributed to
  the **User Solutions / RMDB lineage**. Never invent a customer or a metric.
- Frontmatter: `author: user-solutions`, 3 `faqQuestions` + 2 `qaQuestions`, FAQ
  answers mirrored into `<Accordion>` blocks. **Preserve non-standard FAQ counts
  where they already exist — never truncate published content to hit a number.**
- Post shapes: how-to = bold-lead answer, Before You Start, numbered steps, How to
  Check It Worked, Common Mistakes, Next Steps (~1,100–1,300 words). Glossary =
  bold standalone definition first, How it works, A concrete example reusing the
  book's own analogy, How EDGEBIC uses it (900–1,400). Walkthrough = end-to-end
  narrated scenario with real numbers (1,500–2,000).

---

## 6. OPEN ITEMS FOR THE OWNER (not blocking, but decide)

1. **Yield / scrap inflation — RESOLVED 2026-08-22.** Ruled from UserGuide 31: product-level
   **Yield** inflates the *replenishment suggestion* only (documented: 90% yield, order for
   100 starts 112); there is no per-step routing yield anywhere in the UserGuide, so the
   scheduler does not inflate through a routing and a hand-entered order is not inflated.
   Six posts were corrected to match (the two named here plus
   `edgebic-for-abrasives-manufacturing-scheduling`,
   `edgebic-for-sawmills-and-lumber-processing-scheduling`, `what-is-yield-in-manufacturing`,
   `a-product-yield-value-is-out-of-range-edgebic`). See §5 for the writing rule.
   **Residual for the owner:** R-series `31-mrp-erp-roadmap.md` A4 still claims per-step
   `BOR.FirstPassYield` inflation shipped in July 2026. If that is true, the UserGuide is
   missing the field and both need updating before any post may claim it.
2. **Fix the FCP-Book** — the R-series recipes teach flows the product lacks. This is
   a documentation defect beyond the website; any future writer given R-series access
   will repeat these mistakes.
3. **Three mid-check files — RESOLVED 2026-08-22.** All three were verified against the
   UserGuide. Only `how-to-set-work-center-efficiency-in-edgebic` was actually wrong: its
   FAQ still taught an editable throttle ("a work center at 80 percent on an 8-hour shift
   offers 6.4 hours"), which is the exact fabricated-editable-percentage class this program
   already closed 82 posts over. UserGuide 06 is explicit that work centers run at 100% and
   "the value is not editable on this screen." Corrected. The other two were already right
   and were left untouched. **Note the near-miss:** the nonexistent 0.1-2.0 clamp was
   plausible because the REAL work center GROUP `Factor (x)` description uses 0.5 and 2.0 as
   illustrative endpoints. That guard held.
4. **Tools & Fixtures may not ship.** UserGuide 37 opens by stating Tools & Fixtures are on
   a pre-release feature branch and "may not be present in your installed build", yet ~12
   posts document them as shipped. Structurally the same risk class as the 82 defects, not
   yet triggered. **Needs an owner ruling.**
5. **The 5-day implementation promise.** Legacy RMDB-era claims were shifted to past tense
   where sentences were already being edited, but not restated as current EDGEBIC
   commitments. Whether EDGEBIC carries that promise is commercial, not documentation.
6. **The UserGuide's summary tables are systematically stale.** The "detailed section beats
   summary table" precedent has now been needed three times: job priority (§30 table),
   alternate speed factors (UG 07 line 202 vs UG 12 line 331), and the `Is_Bottleneck` flag
   (UG 14 line 105 vs UG 06). Worth reporting to whoever maintains the book.
7. **Human-only, still outstanding:**
   - `pnpm exec tsc --noEmit` — baseline is **6 pre-existing errors** in `lib/auth/providers.ts`,
     `lib/db/example-data.ts`, `lib/ably/use-ticket-realtime.ts`, `scripts/get-real-license-key.ts`,
     all verified untouched by this branch. Anything outside those four is new.
   - **Commit the ~1,300-file working tree.** Keep the em dash sweep (514 legacy files) as its
     own commit so the release diff stays reviewable.
   - **Push `f411eac`** — it is local-only and it is the two-editions commit.
   - Visual QA of `/`, `/edgebic`, `/rmdb-to-edgebic`, `/edgebic-erp-integration`.
   - **Merge to main** — still a clean fast-forward; `main` has not moved since 2026-06-05.
   - Deploy, then GSC sitemap + page groups.
   - **Screenshots: 0 of 1,884 posts have a `heroImage`.** See `EDGEBIC-IMAGE-PLAN.md`; needs
     the running EDGEBIC application, so it cannot be done from the repo. Do NOT hold the
     merge for it.

---

## 7. FIRST PROMPT FOR THE NEW CHAT

> ⚠️ **Do not dispatch a writing flight.** The corpus is content-complete and proven
> saturated (see §0). The previous "dispatch 7 agents on the clusters with runway"
> instruction is retired; following it now produces padding, which is what caused the
> 82-post defect class.

> Read `EDGEBIC-RESUME-HERE.md` in
> `D:\Usersolutons\EDGEBIC Description\EDGEBIC_Web_Description`, then
> `EDGEBIC-PROMOTION-PROGRESS.md`. Confirm the on-disk post count per cluster from disk.
> The writing program is closed. The remaining work is SHIPPING: settle the open rulings
> in §6, run tsc, commit the working tree, push, merge to main, deploy, submit the
> sitemap. Only write a new post if a NEW UserGuide chapter has appeared since Aug 3
> 2026, and then sweep only that chapter.
