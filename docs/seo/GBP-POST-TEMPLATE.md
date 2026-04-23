# Google Business Profile (GBP) — Reusable Post Template

> **Purpose:** Fill-in-the-blanks templates for daily GBP posts. Five variants rotate through the week. Copy, paste, swap the placeholders, done in 3 minutes.
>
> **Companion files:**
> - `content/seo/gbp-calendar.md` — auto-generated 260-day calendar with each day's post pre-filled from the blog
> - `docs/seo/SEO-EXECUTION-STRATEGY.md` — the full strategy this template supports

---

## Universal rules (apply to every post)

1. **1500-character absolute max.** GBP silently truncates anything longer. Target 600-900 characters — GBP panel shows posts without truncation up to ~900 chars.
2. **Image required.** 1200×900 or square 1:1. Must be publicly accessible URL (use blog `heroImage` field — the calendar pulls this automatically).
3. **One CTA button per post.** GBP supports: `Book`, `Order online`, `Buy`, `Learn more`, `Sign up`, `Call now`. **Default to `Learn more`** unless the post is about a specific offer.
4. **Every CTA links to the canonical blog post.** This is how GBP drives traffic back to the site.
5. **1-3 emojis max per post.** Over-emoji feels spammy to buyers.
6. **Natural keyword use.** Include 1-2 target keywords in the body organically. Never force them.
7. **Mention "User Solutions" or "RMDB" once per post.** Brand reinforcement.
8. **One hashtag block at the end** — 3-5 hashtags max.
9. **No repeat content within 7 days.** The generated calendar handles this automatically.
10. **Post between 9 AM – 2 PM EST on weekdays** for maximum manufacturing-buyer visibility.

---

## The 5 post variants (one per weekday)

Each variant has a distinct structure, target audience, and content source to avoid visual monotony in the GBP feed.

---

### 🏆 Variant 1 — Case Study (Monday)

**Target audience:** Decision-makers looking for proof of results.
**Content source:** `content/blog/case-study-*.mdx` (26 available).
**Hook:** Specific customer result or metric.

```
🏆 [CUSTOMER NAME]: [SPECIFIC RESULT — e.g., "on-time delivery from 30% to 90%"]

[2-SENTENCE CONTEXT OF THE CUSTOMER — what they manufacture, scale, industry]

[1-SENTENCE CHALLENGE — what was broken before RMDB]

The outcome: [KEY METRIC OR TRANSFORMATION — use real numbers from the blog post]

See how [CUSTOMER NAME] transformed their production scheduling with RMDB by User Solutions.

#ManufacturingCaseStudy #ProductionScheduling #[IndustryHashtag]
```

**CTA button:** `Learn more` → `https://usersolutions.com/blog/[case-study-slug]`

**Example (filled):**
```
🏆 Cook Compression: Daily scheduling time reduced from 8 hours to 30 minutes

Cook Compression is a precision gas compression parts manufacturer running a high-mix job shop in Michigan.

Their scheduler was spending 40 hours per week manually updating spreadsheets whenever a customer expedite came in.

The outcome: 95% reduction in scheduling time, on-time delivery improved to 94%, and their planner now has time to focus on continuous improvement instead of firefighting.

See how Cook Compression transformed their production scheduling with RMDB by User Solutions.

#ManufacturingCaseStudy #JobShopScheduling #MachineShop
```

**Character count:** ~550 ✅

---

### 🛠 Variant 2 — How-To Guide (Tuesday)

**Target audience:** Practitioners looking to solve a specific problem.
**Content source:** Any blog post with "how to" in title OR categories `Buyer's Guide` / `Lean Manufacturing` / `Production Scheduling`.
**Hook:** The specific problem being solved.

```
🛠 How to [SPECIFIC OUTCOME — e.g., "calculate OEE for your manufacturing line"]

[1-SENTENCE PROBLEM STATEMENT — why this matters]

Key steps:
1️⃣ [FIRST STEP — 1 line]
2️⃣ [SECOND STEP — 1 line]
3️⃣ [THIRD STEP — 1 line]

[1-SENTENCE VALUE PROP — what happens when you do this right]

Our complete guide walks you through the full process with real manufacturing examples.

#[TopicHashtag] #ManufacturingBestPractices #UserSolutions
```

**CTA button:** `Learn more` → `https://usersolutions.com/blog/[how-to-slug]`

**Example (filled):**
```
🛠 How to calculate OEE (Overall Equipment Effectiveness) for your manufacturing line

OEE is the single most important KPI in manufacturing — and most shops calculate it wrong.

Key steps:
1️⃣ Measure availability (actual run time ÷ planned production time)
2️⃣ Measure performance (actual output ÷ theoretical max output)
3️⃣ Measure quality (good parts ÷ total parts)

World-class manufacturers target 85%+ OEE. Most shops hover around 60%.

Our complete guide walks you through the full process with real manufacturing examples.

#OEE #ManufacturingKPIs #UserSolutions
```

**Character count:** ~620 ✅

---

### 🏭 Variant 3 — Industry-Specific (Wednesday)

**Target audience:** Buyers from a specific vertical looking for industry-relevant solutions.
**Content source:** `industry-solutions` cluster blog posts (23 available) + the 15 industry marketing pages.
**Hook:** The specific industry pain point.

```
🏭 [INDUSTRY NAME] scheduling is different. Here's why.

[1-SENTENCE INDUSTRY-SPECIFIC PAIN POINT — what makes this vertical hard]

Common challenges:
• [CHALLENGE 1]
• [CHALLENGE 2]
• [CHALLENGE 3]

RMDB handles [SPECIFIC FEATURE] — the thing generic scheduling software misses.

Used by [CUSTOMER / INDUSTRY-EXAMPLE] and other [INDUSTRY] manufacturers.

#[Industry]Manufacturing #[IndustrySpecific] #ProductionScheduling
```

**CTA button:** `Learn more` → `https://usersolutions.com/[industry]-scheduling-software` (marketing page, not blog)

**Example (filled):**
```
🏭 Metal fabrication scheduling is different. Here's why.

Multi-stage routings (cut → form → weld → finish) cross different work centers with certification-constrained welders and outside processing that breaks flow.

Common challenges:
• Sequence-dependent setups on press brakes and laser tables
• Certification-limited welders limit who can run which jobs
• Outside processing (heat treat, plating) creates multi-week round trips

RMDB handles finite-capacity scheduling across every stage — including welder certifications and outside processing windows.

Used by precision metal fabricators across North America.

#MetalFabrication #SheetMetal #ProductionScheduling
```

**Character count:** ~700 ✅

---

### 📊 Variant 4 — Comparison or Buyer's Guide (Thursday)

**Target audience:** Active evaluators comparing options.
**Content source:** `competitor-comparisons` blog cluster (9 posts) + `buyers-guide` cluster (11 posts).
**Hook:** The specific comparison question or buying decision.

```
📊 [COMPARISON QUESTION — e.g., "MRPeasy vs RMDB: Which wins for mid-market manufacturers?"]

[2-SENTENCE TL;DR — balanced, not salesy]

Quick comparison:
✓ [POINT IN FAVOR OF RMDB 1]
✓ [POINT IN FAVOR OF RMDB 2]
✓ [POINT IN FAVOR OF COMPETITOR — be honest — builds trust]

Bottom line: [1-SENTENCE RECOMMENDATION]

Our honest comparison breaks down features, pricing, and implementation timelines.

#ManufacturingSoftware #[CompetitorHashtag] #SoftwareComparison
```

**CTA button:** `Learn more` → `https://usersolutions.com/blog/rmdb-vs-[competitor]` OR the marketing comparison page

**Example (filled):**
```
📊 MRPeasy vs RMDB: Which wins for mid-market manufacturers?

MRPeasy is a cloud MRP built for very small shops. RMDB is a finite-capacity scheduler built for real production floors with complex routings and daily expedites.

Quick comparison:
✓ RMDB: Real finite-capacity Gantt, one-time license, ERP-agnostic
✓ RMDB: 5-day implementation vs 1-4 weeks
✓ MRPeasy: Cheaper for 1-4 person shops, cleaner SaaS UX

Bottom line: If your bottleneck is the schedule itself, RMDB. If it's just basic inventory, MRPeasy.

Our honest comparison breaks down features, pricing, and implementation timelines.

#ManufacturingSoftware #MRPeasy #SoftwareComparison
```

**Character count:** ~720 ✅

---

### 📖 Variant 5 — Glossary / Definition (Friday)

**Target audience:** Informational searchers, students, new industry entrants.
**Content source:** `glossary-*` blog posts (178 available).
**Hook:** The term being defined, phrased as a question.

```
📖 What is [TERM]?

[1-2 SENTENCE PLAIN-ENGLISH DEFINITION]

Why it matters: [1-2 SENTENCE PRACTICAL RELEVANCE FOR MANUFACTURERS]

Common misconception: [1 SENTENCE — what people get wrong about this]

See how [TERM] fits into modern production scheduling with real examples from our manufacturing glossary.

#ManufacturingTerms #[TermHashtag] #ProductionManagement
```

**CTA button:** `Learn more` → `https://usersolutions.com/blog/glossary-[term-slug]`

**Example (filled):**
```
📖 What is Takt Time?

Takt time is the pace at which you must finish a unit of production to meet customer demand, calculated as: available production time ÷ customer demand.

Why it matters: Takt time tells you whether your shop can actually meet committed delivery dates. If cycle time > takt time, you're shipping late.

Common misconception: Takt time is NOT the same as cycle time. Takt is demand-driven; cycle is process-driven.

See how takt time fits into modern production scheduling with real examples from our manufacturing glossary.

#LeanManufacturing #TaktTime #ProductionManagement
```

**Character count:** ~660 ✅

---

## How to use the auto-generated calendar

The file `content/seo/gbp-calendar.md` (generated by `scripts/seo/generate-gbp-calendar.mjs`) contains **260 days** of pre-filled GBP posts — one for each weekday for a full year, pulled from your existing 447 blog posts.

### Daily workflow (5 minutes)

1. Open `content/seo/gbp-calendar.md`
2. Find today's date entry (or the next unposted entry)
3. Copy the ready-to-paste content block
4. Open Google Business Profile
5. Click **Add update** → paste content, upload image, set CTA link
6. Mark the entry as posted in the calendar (checkbox, or delete the line)

### Regenerating the calendar

Whenever you add new blog posts (or the existing ones change), regenerate:

```bash
node scripts/seo/generate-gbp-calendar.mjs
```

This produces fresh `gbp-calendar.md` + `gbp-posts.csv` files with the newest content prioritized.

### Customization

To change the rotation cadence or priority order, edit the top of `scripts/seo/generate-gbp-calendar.mjs`:

```js
const POSTS_PER_WEEK = 5;          // change to 3 for lighter cadence
const TOTAL_WEEKS = 52;            // change to 26 for 6-month calendar
const WEEKLY_ROTATION = [          // change order or swap variants
  'case-study',                    // Monday
  'how-to',                        // Tuesday
  'industry',                      // Wednesday
  'comparison',                    // Thursday
  'glossary'                       // Friday
];
```

---

## Common mistakes to avoid

1. ❌ **Copy-pasting the same post to multiple days** — GBP de-duplicates and flags as spam.
2. ❌ **Using images that 404** — GBP silently fails to upload the post.
3. ❌ **Sending CTAs to the homepage** — lowers click-through vs deep-linking to the specific blog post.
4. ❌ **Writing posts over 1000 chars** — GBP truncates in the feed, hiding your CTA.
5. ❌ **Posting at 3 AM EST** — posts get visibility from the moment they're posted; timing matters for first-hour engagement.
6. ❌ **Posting daily for a week then going silent** — GBP algorithmically punishes inconsistency. Steady 3x/week beats burst-then-silent.
7. ❌ **Using generic stock images** — the hero image from the actual blog post is ALWAYS more engaging than a generic factory photo.
8. ❌ **Pitching too hard in the body** — GBP posts that sound like ads underperform posts that sound like useful content. Value first, brand second.

---

## Success metrics for GBP posts

Track in your SEO Ops Dashboard:

| Metric | Where to find it | Weekly target (month 3+) |
|---|---|---|
| Post impressions | GBP Insights → Posts | 500+/week |
| Post CTA clicks | GBP Insights → Posts → Clicks | 30+/week |
| Profile views | GBP Insights → Overview | 200+/week |
| Direction requests | GBP Insights → Actions | 2-5/week |
| Phone calls | GBP Insights → Actions | 1-3/week |
| Reviews earned | GBP → Reviews | 1-2/month |

**Month 1:** building baseline, expect low numbers.
**Month 3:** rhythm established, metrics should be at ~60% of targets above.
**Month 6:** compounding, should exceed targets above.
