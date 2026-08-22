# EDGEBIC PROMOTION — RESUME IN A FRESH CHAT

**Read this file first. It is the complete handoff.**
Last session ended: 2026-08-15 (flight 16) · Branch `feature/edgebic-promotion`, pushed to origin, working tree clean.

---

## 0. START HERE — ONE UNFINISHED ITEM AND THE HEADLINE FINDING

**No open fixes.** The shifts-importable defect flagged at the end of flight 16 has been
corrected across all four affected posts and the class is verified closed corpus-wide.
Shift and PlantHoliday are two of the eight import masks; hand-entry is a legitimate
*choice* when you have few patterns, never a requirement.

**THE HEADLINE FINDING — flight 16 proved the corpus is saturated.**
Seven agents were dispatched for ~95 posts; only 38 existed. Three lanes returned
complete shortfalls with hard proof, not guesses:
- **scheduling-ops how-to 0/15** — extracted all 483 bold UI labels from 8 UserGuide
  chapters, tested each against the 27 MB corpus, found every real one already covered.
- **optimization 0/6** — decomposed UserGuide 16 into 58 teachable atoms; all covered
  3-6 times over. 80 optimizer-specific slugs exist across 5 clusters.
- **platform 0/3** — every one of the 30 UserGuide sections already covered at overview
  altitude.
- **how-to routing/BOR 1/15**, and that one gap was real (product was the only
  master-data entity without a delete how-to).
Glossary was the exception: both lanes delivered 13/13, so **glossary is the one seam
still worth mining**.

**Treat these as CLOSED, not short:** how-to (four lanes swept across two flights,
13 posts from ~66 slots), optimization (54), platform (177), scheduling-concepts (100),
planning (50), industry (116), visual-scheduling (44), troubleshooting (120),
admin (40), walkthroughs (50).

**`tsc --noEmit` was run: 6 errors, NONE from this work.** All in `lib/auth/providers.ts`,
`lib/db/example-data.ts`, `lib/ably/use-ticket-realtime.ts` and
`scripts/get-real-license-key.ts` — files this branch has never touched, verified against
`origin/main`. **Pre-existing on main; not a merge blocker from the blog work.**

**My recommendation:** the remaining volume is not worth chasing. Ship what exists.
The launch blockers in section 6 are where the value now sits — 1,800 accurate posts
are sitting unmerged, unpublished, and with zero screenshots.

---

## 1. WHERE THINGS STAND

**1,800 EDGEBIC blog posts written, committed and pushed.** Target was 2,120.

> Flight 14 (8 migration posts) was written **directly by the main session with no agents**,
> which is viable at roughly 8 posts per flight if agent dispatch is unavailable or unwanted.
> It also **reconstructed the missing flight-13 wave-log row and fixed the scoreboard**, which
> was a full flight stale (it still read 1,630). Verify counts from disk, never from a summary.

| | |
|---|---|
| Repo | `D:\Usersolutons\EDGEBIC Description\EDGEBIC_Web_Description` |
| Branch | `feature/edgebic-promotion` (pushed; **not merged to main**) |
| Remote | github.com/haleemzahid/EDGEBIC_Web_Description |
| Posts | `content/blog/*.mdx` |
| Source material | `D:\Usersolutons\ERP + FCP\FCP-Book` |
| Canonical tracker | `EDGEBIC-PROMOTION-PROGRESS.md` (scoreboard + wave log + open items) |
| Strategy / rules | `EDGEBIC-PROMOTION-STRATEGY.md`, `EDGEBIC-BLOG-TAXONOMY.md` |

Verify the count yourself (never trust a remembered number):
```powershell
cd "D:\Usersolutons\EDGEBIC Description\EDGEBIC_Web_Description"
Select-String -Path content/blog/*.mdx -Pattern "cluster:\s*'?(edgebic-[a-z-]+)'?\s*$" |
  ForEach-Object { $_.Matches[0].Groups[1].Value } | Group-Object | Sort-Object Name |
  ForEach-Object { "{0,-30} {1}" -f $_.Name, $_.Count }
```

---

## 2. HOW MUCH IS ACTUALLY LEFT

Nominal gap is 434. **Realistically it is 100–150.** Six clusters are done or proven
exhausted — not "hard to extend," but demonstrated by matching every documented
procedure to the post already covering it.

| Cluster | Now | Target | Real remaining |
|---|---|---|---|
| how-to | 325 | 500 | **~30.** Three lanes were partitioned and swept: shop-floor returned **0 of 12** (all 56 UserGuide procedures matched to existing posts), reports 6 of 12, capacity 6 of 12. |
| glossary | 279 | 350 | **~25.** Thinning; agents now lose half a candidate list to collisions. |
| scheduling-concepts | 100 | 200 | **0 — MINED OUT.** Proven twice. |
| planning | 50 | 80 | **0 — MINED OUT.** Proven. |
| industry | 116 | 110 | **0 — over target.** |
| visual-scheduling | 44 | 40 | **0 — over target.** |
| troubleshooting | 120 | 120 | **0 — complete.** |
| admin | 40 | 40 | **0 — complete.** |
| platform | 177 | 180 | ~0. Closer agent found no writable candidate. |
| walkthroughs | 49 | 50 | ~1 |
| erp-integration | 142 | 150 | ~8, and the last agent said closing them needs either invented product detail or thinner angles than it would write. |
| outcomes | 85 | 100 | ~10 |
| optimization | 49 | 60 | **~5, not 11.** Flight 14 checked this against UserGuide 16: the 49 posts already cover nearly all of it. The genuinely uncovered angles are the missing **Least setup time** goal (hidden until setup data exists), the CP-SAT component being absent so the badge silently falls back to multi-run, the "Nearest challenger" line, the arrow-and-word Change cells, and first-run prerequisites. |
| shop-floor | 49 | 60 | ~11 |
| quoting | 31 | 40 | ~9 |
| migration | 38 | 40 | **~2.** Flight 14 took 8. The seam was migrating the features whose data is NOT importable; that seam is now worked. |

**Do not pad to hit 2,120.** The documented source material does not contain
2,120 non-duplicative posts. Padding is what produced the defects described next.

---

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
3. **Three files were left mid-check** when the last session ended (a small agent was
   stopped): `how-to-set-work-center-efficiency-in-edgebic` (an undocumented 0.1–2.0
   clamp on a pieces efficiency factor), `how-a-parallel-group-screens-out-a-slow-machine`
   (a "minimum efficiency threshold, default 0.80" absent from UserGuide 12), and
   `how-efficiency-scales-run-time-but-not-setup` (says alternates carry a speed factor;
   UserGuide 12 ~line 331 says a factor on a *true alternative* does nothing). Verify
   and correct — mind the group-Factor guard.
4. **Human-only, still outstanding:** `pnpm exec tsc --noEmit`; visual QA of `/`,
   `/edgebic`, `/rmdb-to-edgebic`, `/edgebic-erp-integration`; **merge to main**;
   deploy; GSC page groups + sitemap; the screenshot capture session
   (`EDGEBIC-IMAGE-PLAN.md` — no post has a `heroImage` yet).

---

## 7. FIRST PROMPT FOR THE NEW CHAT

> Read `EDGEBIC-RESUME-HERE.md` in
> `D:\Usersolutons\EDGEBIC Description\EDGEBIC_Web_Description`, then
> `EDGEBIC-PROMOTION-PROGRESS.md`. Confirm the on-disk post count per cluster.
> Then continue the EDGEBIC blog program: dispatch up to 7 parallel agents on the
> clusters that still have real runway (see §2), following every rule in §3 and §5.
> Agents must report honest shortfalls rather than pad or invent. QA, commit and
> push each flight.
