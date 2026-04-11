# SEO Execution Strategy (Post-Launch)

> **Context:** This is the execution playbook for the period AFTER the on-page SEO infrastructure is built. The site currently sits at **80% keyword coverage (162/203)**, **4 of 7 tiers at 100%**, and **0 cannibalizations**. The on-page work is largely done. From here, the ranking ceiling is **off-page authority** — which this document covers.
>
> **Companion docs:**
> - `SEO-CONTENT-STRATEGY.md` (project root) — the content pipeline for new blog posts
> - `docs/seo/GBP-POST-TEMPLATE.md` — reusable GBP posting template
> - `content/seo/gbp-calendar.md` — auto-generated 260-day GBP posting calendar
> - `MEMORY.md` (Claude memory) — operational facts and next moves

---

## The 90-day playbook

### Week 1 — Ship + submit (foundation)

**Goal:** get the 24 new pages indexed, open all the free submission channels, install baseline analytics.

| # | Task | Owner | Time | Status |
|---|---|---|---|---|
| 1 | Deploy commit `df9da57` to production | You | 10 min | ⬜ |
| 2 | Verify `/llms.txt` serves correctly (`curl -I https://usersolutions.com/llms.txt`) | You | 2 min | ⬜ |
| 3 | Verify 3 random new pages render correctly (machine-shop, excel-templates/mrp, compare-products/rmdb-vs-preactor) | You | 5 min | ⬜ |
| 4 | Submit sitemap to Google Search Console (`https://usersolutions.com/sitemap.xml`) | You | 5 min | ⬜ |
| 5 | In GSC, use **URL Inspection** → **Request Indexing** for top 10 new pages (see list below) | You | 20 min | ⬜ |
| 6 | Create Bing Webmaster Tools account, verify via existing meta tag (`NEXT_PUBLIC_BING_SITE_VERIFICATION` env var already wired in `app/layout.tsx:65`) | You | 10 min | ⬜ |
| 7 | Submit sitemap to Bing Webmaster Tools | You | 2 min | ⬜ |
| 8 | Install Microsoft Clarity heatmap tracking (free, 5 min install) | You + Claude | 10 min | ⬜ |
| 9 | Claim / verify Google Business Profile for Michigan HQ | You | 15 min submit + 7 days postcard | ⬜ |
| 10 | Create a spreadsheet called "SEO Ops Dashboard" — track rankings, backlinks, submissions, GBP posts | You | 20 min | ⬜ |

**Priority pages for manual indexing request (top 10):**
1. `/production-scheduling-software`
2. `/manufacturing-scheduling-software`
3. `/edgebi`
4. `/compare-products/rmdb-vs-mrpeasy` (uses the blog version — check which one is canonical)
5. `/machine-shop-scheduling-software`
6. `/metal-fabrication-scheduling-software`
7. `/food-manufacturing-scheduling-software`
8. `/excel-templates/production-schedule`
9. `/excel-templates/bill-of-materials`
10. `/compare-products/rmdb-vs-netsuite`

**Success metric (end of week 1):** all 10 priority pages indexed and showing in GSC coverage report.

---

### Week 2 — Directory submissions (open all the free channels)

**Goal:** get listed on every major B2B software directory. Review acquisition comes later; the listings themselves are the foundation.

| # | Task | Owner | Time |
|---|---|---|---|
| 11 | Capterra listing — submit company, verify email, fill in profile | You | 30 min |
| 12 | G2 listing — submit, verify, fill in product page | You | 30 min |
| 13 | SoftwareAdvice listing — submit via Gartner form | You | 20 min |
| 14 | GetApp listing — submit via same Gartner form | You | 5 min (bundled) |
| 15 | TrustRadius listing — submit, verify | You | 20 min |
| 16 | AlternativeTo — submit RMDB as an alternative to MRPeasy, Katana, Fishbowl | You | 20 min |
| 17 | SourceForge — submit (older but still feeds legacy traffic) | You | 15 min |
| 18 | Crozdesk — submit (EU/UK audience) | You | 15 min |
| 19 | HARO — sign up, subscribe to manufacturing + technology newsletters | You | 10 min |
| 20 | Qwoted — sign up, set B2B SaaS + manufacturing filters | You | 10 min |

**Success metric (end of week 2):** 8+ directory listings live. First HARO/Qwoted responses sent.

---

### Week 3 — First review push + start all channel rhythms

**Goal:** turn on the review acquisition machine + establish posting cadence across ALL Tier 1 channels (GBP, LinkedIn, Reddit, YouTube, Medium). This is the week the distribution flywheel starts.

| # | Task | Owner | Time |
|---|---|---|---|
| 21 | Email your 10 most enthusiastic customers asking for a review on Capterra or G2 | You | 30 min |
| 22 | **GBP:** start daily posting Mon-Fri from `content/seo/gbp-calendar.md` | You | 5 min/day |
| 23 | **LinkedIn:** create/optimize company page + founder personal profile | You | 45 min one-time |
| 24 | **LinkedIn:** join 10 manufacturing groups (see Channel Distribution section) | You | 20 min |
| 25 | **LinkedIn:** post 3 times this week (case study Mon, how-to Wed, industry Fri) from company + personal | You | 45 min total |
| 26 | **LinkedIn:** publish first long-form Article (republish a pillar blog post with `rel=canonical`) | You | 30 min |
| 27 | **YouTube:** create channel, add banner + about + 4 empty playlists | You | 30 min one-time |
| 28 | **Reddit:** participate in r/manufacturing (answer 2-3 questions with genuine helpful responses — NO link drops) | You | 30 min |
| 29 | **Twitter/X:** post profile + first 3 tweets | You | 20 min |
| 30 | **Medium:** create account, republish 1 blog post with canonical URL back to your site | You | 20 min |
| 31 | **Pinterest:** create business account, set up 8 boards (see Channel section) | You | 30 min one-time |
| 32 | **First HARO response** of the week (aim for 3/week) | You | 20 min |
| 33 | Install Microsoft Clarity if not done week 1 | You/Claude | 10 min |
| 34 | Set up UTM tagging convention for tracking cross-channel → site traffic | You/Claude | 30 min |

**Success metric (end of week 3):** 5 GBP posts live, 3 LinkedIn company posts, 3 LinkedIn personal posts, 1 LinkedIn Article, YouTube channel set up, Reddit profile building credibility, 1 Medium republish, Pinterest boards created, 3 first customer reviews submitted.

**Note:** Week 3 looks heavy but most of it is ONE-TIME channel setup. By week 4, the ongoing weekly load drops to ~2-4 hrs/week if executing Tier 1 only.

---

### Week 4 — Guest post + backlink pitching + expand Tier 2 channels

**Goal:** start the slow-burn of earning high-authority backlinks through editorial outreach + begin Tier 2 channels (Pinterest pins, Quora answers, industry forums).

| # | Task | Owner | Time |
|---|---|---|---|
| 35 | Use the trade publication list (see Channel Distribution section) — pick top 15 to target | You | 30 min |
| 36 | Send **5 guest post pitches this week** (use the template in Channel Distribution section) | You | 1 hour |
| 37 | Continue GBP daily posts (now 15 total) | You | 5 min/day |
| 38 | Continue LinkedIn 5x/week rhythm | You | 75 min/week |
| 39 | **Pinterest:** create + pin 10 pins this week (Excel templates first — high-velocity content) | You | 1 hour |
| 40 | **Quora:** write first 2 answers to manufacturing/ERP questions | You | 40 min |
| 41 | **Industry forum:** 1 genuine helpful reply on Practical Machinist or CNCZone | You | 20 min |
| 42 | **Facebook:** create Business Page, join 3 manufacturing Groups | You | 30 min one-time |
| 43 | **Product Hunt:** prepare upcoming launch for the 8 free Excel templates (pick launch date in week 5-6) | You | 1 hour prep |
| 44 | **Crunchbase + Wellfound + Clutch:** claim/create all 3 company profiles | You | 1 hour one-time |
| 45 | **Podcast pitch:** send 2 guest appearance pitches to manufacturing podcasts | You | 30 min |
| 46 | Continue HARO 3x/week | You | 20 min/week |
| 47 | Review GSC crawl stats — confirm new pages being indexed | You | 10 min |
| 48 | First round of GSC performance data — which new pages are impressing? | You | 30 min |

**Success metric (end of week 4):** 1+ guest post confirmed, 20 GBP posts live, 12+ HARO responses sent, 5+ Capterra/G2 reviews, 10+ Pinterest pins, 2 Quora answers live, Facebook page created, 3+ business directory profiles claimed, 2 podcast pitches sent.

---

### Month 2 — Scale and measure

**Goal:** keep the weekly rhythms going. By the end of month 2, you should see measurable ranking improvements on Tier 4 (industries) and Tier 1 (money keywords) because those were already at 100% on-page.

**Weekly rhythm (repeat every week):**
- **Daily Mon-Fri:** GBP post + LinkedIn post (company + personal) (~20 min/day)
- **Tue + Thu:** HARO responses (15 min each)
- **Wed:** Quora answer + 1 podcast or guest post pitch (30 min)
- **Thu:** YouTube Short recording + upload (20 min)
- **Fri:** GSC + Clarity review, SEO Ops Dashboard update, LinkedIn newsletter send (45 min)
- **Sunday:** Batch-schedule next week's LinkedIn via native scheduler + review GBP calendar (30 min)

**See the "Weekly cross-channel rhythm" section below for the complete daily breakdown across all channels.**

**Monthly rhythm:**
- **1st of month:** Re-run keyword tracker (`node scripts/seo/build-keyword-tracker.mjs`)
- **1st of month:** Pull Ahrefs / Semrush report on backlinks gained vs competitors
- **15th of month:** Customer review outreach — email 5 more customers
- **Last Friday of month:** Retrospective — what worked, what didn't, adjust for next month

---

### Month 3 — Content velocity resumes + measure results

**Goal:** start publishing new blog posts to fill remaining Tier 5 gaps + any discovered gaps from GSC "queries with impressions but no clicks."

- **1-2 new blog posts per week** using the existing hub/spoke pattern
- **1 new industry case study per quarter** (fresh E-E-A-T signal)
- **Continue GBP + HARO + guest posts rhythm**
- **Review ranking improvements** — by month 3, you should see Tier 4 industry pages starting to rank for their target keywords

**Success metric (end of month 3):** 10+ Capterra reviews, 10+ G2 reviews, 2-3 guest posts published, 5+ HARO press mentions, measurable ranking improvement on 20+ keywords (tracked in SEO Ops Dashboard).

---

## The ongoing monthly rhythm (month 4+)

Once the foundation is laid, SEO becomes a steady-state operation. Target monthly:

| Activity | Cadence |
|---|---|
| GBP posts | 20-22 per month (5/week) |
| LinkedIn posts (company + personal) | 40 per month (10/week across both) |
| LinkedIn Articles (long-form) | 4 per month (1/week) |
| LinkedIn Newsletter issues | 4 per month (1/week) |
| YouTube videos (main channel) | 4 per month (1/week) |
| YouTube Shorts | 12 per month (3/week) |
| Reddit genuine contributions | 20+ per month (5/week across subs) |
| Twitter/X posts | 10-15 per month (2-3/week) |
| Pinterest pins | 40-80 per month (10-20/week) |
| Quora answers | 8-12 per month (2-3/week) |
| Medium republishes | 4 per month (1/week) |
| HARO responses | 12 per month (3/week) |
| Guest post pitches sent | 20 per month (5/week) |
| Guest posts published | 1-2 per month |
| Customer review requests | 5-10 per month |
| Podcast pitches | 2-3 per month |
| New blog posts | 4-8 per month |
| Industry forum replies | 4-8 per month |
| Keyword tracker re-run | 1 per month |
| Pillar linking audit re-run | 1 per quarter |
| GBP calendar regeneration | 1 per month (after new blog posts) |
| Competitor backlink analysis (Ahrefs) | 1 per month |
| GSC + Clarity review | Weekly |

**See the "Channel Distribution Strategy" section below for per-channel templates, rules, and signup URLs.** The "Weekly cross-channel rhythm" subsection there shows what a fully-executed week looks like (~8-10 hrs total) OR the lighter Tier 1 rhythm (~2 hrs total).

---

## Google Business Profile (GBP) strategy — detailed

GBP is a specific leverage play because it's **free**, **immediate**, and **local SEO + branded search both improve** from consistent posting. For a manufacturing SaaS with a Michigan HQ, it also unlocks the 4 still-missing Local tier keywords.

### Core principles

1. **Consistency > perfection.** A daily posting cadence for 3 months beats a perfect post once a week.
2. **Post from existing blog content.** No new writing required. The generated calendar (`content/seo/gbp-calendar.md`) provides ready-to-paste copy for 260 days of posts from your existing 447 blog posts.
3. **Rotate post types across the week** to avoid monotony:
   - **Monday:** Case study (shows proof)
   - **Tuesday:** How-to guide (practical help)
   - **Wednesday:** Industry-specific content (vertical relevance)
   - **Thursday:** Comparison or buyer's guide (high-intent)
   - **Friday:** Glossary term or definition (SEO snippet-friendly)
4. **Every post has a Learn More CTA** linking to the blog post. This is how GBP posts drive site traffic.
5. **Every post has an image.** Use the blog post's `heroImage` where available. The generated calendar pulls these automatically.
6. **Include one local reference per week.** E.g., "Used by manufacturers in Michigan and across the Midwest." This reinforces Local tier signals.

### Posting cadence

| Day | Post type | Content source |
|---|---|---|
| **Monday** | Case study | `content/blog/case-study-*.mdx` (26 available) |
| **Tuesday** | How-to guide | Any blog post with "how to" in title or category: Buyer's Guide / Lean Manufacturing |
| **Wednesday** | Industry-specific | `industry-solutions` cluster blog posts (23 available) |
| **Thursday** | Comparison / Buyer's Guide | `competitor-comparisons` cluster (13) + `buyers-guide` cluster (11) |
| **Friday** | Glossary definition | `glossary-*` (178 available) |

At 5 posts/week × 52 weeks = **260 posts per year**. Starting with 447 blog posts, you have enough runway for nearly 2 years before repeating.

### Post structure (1500-char limit)

```
🏭 [HOOK LINE — 80 chars max, visible in preview]

[BODY — 300-500 chars, explains the value proposition]

[KEY INSIGHT — 1 sentence, practical takeaway]

Learn more: [CTA button links to blog post]

#keyword1 #keyword2 #manufacturing
```

**Character budget example:**
- Hook: 80 chars
- Body: 400 chars
- Key insight: 100 chars
- Closing line + link: 60 chars
- Hashtags: 60 chars
- **Total:** ~700 chars (well under the 1500 limit, leaves room for variation)

### Image sourcing

GBP requires an image per post (1200x900 recommended, 4:3 ratio).

**Priority order for image selection:**
1. **Blog post `heroImage`** — if set, use it directly. The generated calendar pulls this automatically.
2. **Shared category image** — `public/marketing/blog/shared/[category]/*.webp` if no hero exists.
3. **Product screenshot** — `public/images/rmdb/*.png` for generic posts.
4. **Stock image** — Shutterstock subscription (mentioned in MEMORY) for anything else.

**Critical:** the image URL must be publicly accessible (not localhost, not gated). When you post, GBP downloads the image to its CDN. If the URL 404s, the post fails silently.

### Measuring GBP success

Track these in your SEO Ops Dashboard spreadsheet:

- **Weekly:** posts published, image engagement rate, CTA clicks
- **Monthly:** GBP insights report (views, searches, actions, direction requests)
- **Quarterly:** Branded search volume growth (via GSC), Local pack ranking for "manufacturing software Michigan"

**Expected trajectory:**
- Month 1: learning curve, ~5-10 CTA clicks/week
- Month 2: established rhythm, ~15-25 CTA clicks/week
- Month 3+: compounding, ~30-50+ CTA clicks/week + measurable Local pack ranking improvement

---

## Channel Distribution Strategy — every free channel, ranked by leverage

Manufacturing SaaS buyers exist across many platforms. Being visible everywhere matters — but not all platforms deserve equal effort. This section covers **every free distribution channel** available, organized by priority tier so you can execute Tier 1 confidently and let lower tiers wait if bandwidth is limited.

### The channel matrix (summary)

| Tier | Effort | Channels |
|---|---|---|
| **🔥 Tier 1 — must-do** | daily/weekly, ~90 min/week | LinkedIn (company + personal), YouTube, Reddit, GBP, Medium |
| **⚡ Tier 2 — should-do** | weekly/monthly, ~60 min/week | Twitter/X, Pinterest, Quora, Industry forums, Facebook page |
| **💎 Tier 3 — set + forget** | one-time setup, ~10 min check/month | Product Hunt, Crunchbase, SlideShare, Scribd, Instagram, Podcast guesting |
| **🎯 Tier 4 — opportunistic** | as-available | Hacker News, Indie Hackers, Stack Exchange, TikTok |

**Total weekly time commitment at Tier 1+2:** ~2.5 hours of distribution work (not including HARO/content creation).

---

## 🔥 Tier 1 — Must-do channels

These are the channels every B2B manufacturing SaaS should use. Skip these at your own risk.

### 1. LinkedIn (THE B2B channel)

**Why:** 80% of B2B leads from social media come from LinkedIn. Manufacturing decision-makers (operations managers, plant managers, CFOs) are heavy LinkedIn users. This is the single highest-leverage social channel for a manufacturing SaaS.

**Multiple surfaces to use — all free:**

| Surface | What to post | Cadence |
|---|---|---|
| **Company Page** | Blog excerpts with link back, customer wins, product updates, milestones | 3-5 posts/week |
| **Personal profile (founder/leadership)** | Same content but more personal voice — engages 10x better than company posts | 3-5 posts/week |
| **LinkedIn Articles** (long-form) | Republish full blog posts with `rel=canonical` back to your site | 1/week |
| **LinkedIn Newsletter** | Weekly manufacturing insights digest — earns subscribers, shows up in inbox | 1/week |
| **LinkedIn Groups** | Genuine participation in manufacturing communities (answer questions, share insights) | 2-3/week |
| **LinkedIn Live / Video** | Product demos, customer interviews, webinars | 1-2/month |
| **Employee advocacy** | Encourage employees to share company posts from their personal profiles | ongoing |

**LinkedIn Groups to join (free):**
- Manufacturing Professionals Network (1.6M members)
- Production Scheduling & Planning
- APS (Advanced Planning & Scheduling) Professionals
- Lean Manufacturing
- Industry 4.0 & Smart Manufacturing
- Machine Shop Operators & Owners
- Aerospace Manufacturing
- Food & Beverage Manufacturing
- Continuous Improvement Network
- ERP for Manufacturing

**LinkedIn post template (daily use):**
```
[HOOK — 1 sentence, bold claim or question — 100 chars]

[CONTEXT — 2-3 sentences setting up the insight]

[KEY INSIGHT — the practical takeaway, often a list:
→ Point 1
→ Point 2
→ Point 3]

[SOFT CTA — "What's your experience with X? Drop a comment." — drives engagement]

[LINK TO FULL POST — "Full breakdown → [blog URL]" on its own line]

#Manufacturing #ProductionScheduling #[Specific hashtag]
```

**Weekly LinkedIn rhythm:**
- **Monday:** Case study win (company + personal)
- **Tuesday:** How-to tip (short form, image carousel)
- **Wednesday:** Industry insight (data/stat from blog)
- **Thursday:** Comparison / myth-busting post
- **Friday:** Glossary term or light reflection post

**Time:** 15 min per post × 5 posts = 75 min/week. Batch on Sunday evening to schedule the whole week via LinkedIn's native scheduler.

### 2. YouTube (#2 search engine in the world)

**Why:** YouTube is Google's second search engine. "Production scheduling software demo" and similar queries surface YouTube results directly in Google SERPs. Video content has 5-10x the dwell time of text.

**Content types (all free to produce):**

| Type | Example | Time | Cadence |
|---|---|---|---|
| **Product demo** | "RMDB Finite Capacity Scheduling Demo (2026)" | 1-2 hrs record + edit | 1/quarter |
| **Customer interview** | "How Cook Compression Reduced Scheduling Time 95%" | 1 hr + edit | 1/month |
| **Tutorial / how-to** | "How to Calculate OEE in 5 Minutes" | 30 min | 1/week |
| **Explainer** | "What is Finite Capacity Scheduling? (5 min)" | 30 min | 2/month |
| **Shorts (<60 sec)** | Quick tips from blog posts | 10 min | 3/week |
| **Community tab posts** | Text updates linking to new blog/page | 2 min | 2/week |

**YouTube optimization rules:**
- **Title:** include primary keyword AND current year for freshness
- **Description:** 200+ words, include full blog URL in first 2 lines
- **Tags:** 5-10 tags targeting your keywords
- **End screen:** always link to a relevant blog post and subscribe button
- **Thumbnail:** bold text + high-contrast image, 1280×720
- **Transcript:** upload the SRT file — Google indexes it for search

**YouTube channel setup (one-time, ~30 min):**
- Channel banner: 2560×1440, includes tagline + website
- About tab: description + links to site, LinkedIn, Twitter
- Playlists: "Case Studies," "How-To," "Product Demos," "Industry Solutions"
- Featured video: the main product demo

**Signup:** `https://www.youtube.com/create_channel` (use the Google account associated with your domain)

### 3. Reddit (authentic engagement = high ROI)

**Why:** Reddit is the #1 place manufacturing buyers ask real questions. A single helpful answer on r/manufacturing can drive 50-200 site visits over its lifetime. Reddit also ranks extremely well in Google — many "how to" searches surface Reddit threads on page 1.

**Subreddits to participate in (in priority order):**

| Subreddit | Members | Relevance |
|---|---|---|
| r/manufacturing | 131k | Core audience — production managers, plant ops |
| r/MachineShops | 24k | Job shop owners, CNC operators |
| r/smallbusiness | 1.7M | SMB manufacturers |
| r/metalworking | 520k | Metal fab shops |
| r/CNC | 230k | CNC operators and shop owners |
| r/lean | 65k | Lean manufacturing enthusiasts |
| r/supplychain | 180k | Supply chain managers |
| r/SaaS | 220k | For brand + founder visibility |
| r/Entrepreneur | 3.8M | Manufacturing founders |
| r/sweatystartup | 200k | Real-business owners (vs VC-backed tech) |
| r/ERP | 15k | Small but highly relevant |
| r/Machinists | 200k | Machine shop operators |
| r/FoodManufacturing | 8k | Vertical-specific |
| r/3Dprinting | 1.8M | Additive manufacturing |

**Golden rules of Reddit marketing (break these = ban):**
1. **Never post blog links as your primary contribution.** Reddit auto-flags + shadow-bans.
2. **Answer questions with 200-500 word genuinely helpful responses.** Include the blog link ONLY if directly relevant and asked for.
3. **Follow the 9:1 rule** — 9 helpful comments/posts for every 1 that mentions your product.
4. **Use your real profile**, not a throwaway. Reddit ranks comment history for credibility.
5. **Never reply to your own post from another account.** Shadow ban guaranteed.
6. **Include a site link in your Reddit profile**, not in every comment. Subtle but effective.

**Daily Reddit workflow (15 min/day):**
1. Check r/manufacturing, r/MachineShops, r/smallbusiness, r/supplychain
2. Sort by "New" (last 4 hours)
3. Find 1-2 questions you can answer expertly
4. Write a genuine 200-500 word answer
5. Include blog link ONLY if directly relevant to the specific question

**Expected results:**
- Month 1: 0-5 helpful comments → learning the community tone
- Month 3: 50+ comments → building profile credibility
- Month 6: 1-2 of your comments start ranking in Google (since Reddit ranks well for informational queries)

### 4. Medium (content republishing + secondary discovery)

**Why:** Medium's native audience includes many B2B decision-makers. Republishing blog posts with `rel=canonical` back to your site captures Medium's referral traffic without hurting your SEO. Medium-hosted stories also sometimes rank in Google for their topic.

**How to republish safely:**
1. Publish original on your site first (usersolutions.com/blog/...)
2. Wait 2-3 weeks for Google to index the original
3. Copy the full post to Medium
4. In the story settings, click "Import story" or manually add `rel=canonical` via Medium's advanced settings pointing to the original URL
5. At the end of the Medium post, add: "Originally published at [your blog URL]"

**What to republish:**
- Pillar posts (highest value first)
- Case studies (strong audience appeal)
- Comparison posts (rank well on Medium's own search)
- "What is X" explainers (broad appeal)

**Cadence:** 1 post per week, republished 2-3 weeks after original publication.

**Medium Publications to submit to (free):**
- **The Startup** (700k followers) — manufacturing-adjacent
- **Better Marketing** — if post has marketing angle
- **Entrepreneur's Handbook** — founder/business angle
- **Data Driven Investor** — industry-data angle

**Signup:** `https://medium.com/m/signin`

### 5. Google Business Profile (covered in detail above)

Already documented in the GBP section. Continues daily Mon-Fri cadence from the auto-generated calendar.

---

## ⚡ Tier 2 — Should-do channels

These channels deserve weekly or monthly attention. Lower leverage than Tier 1 but still valuable.

### 6. Twitter / X

**Why:** Lower B2B conversion than LinkedIn but still useful for thought leadership, industry conversations, and ranking in Google (X posts now appear in Google SERPs for some queries).

**What to post (2-3x/week):**
- Short industry observations (1 sentence + link)
- Quote tweets of manufacturing news with commentary
- Threads (the new X long-form format)
- Replies to high-engagement manufacturing accounts

**Top manufacturing accounts to follow and engage with:**
- @IndustryWeek
- @MfgTomorrow
- @ModernMachShop
- @NAM_News (National Association of Manufacturers)
- @TheAMFG (American Manufacturing)

**Threads template:**
```
[Hook tweet — bold claim or counterintuitive observation — include 🧵 emoji]

1/ [First point with specifics]

2/ [Second point with data/example]

3/ [Third point with actionable insight]

4/ [Closing + link to full blog post]

If this resonates, follow for more manufacturing insights.
```

**Time:** 20 min/week for 2-3 tweets + 1 thread.

### 7. Pinterest (underrated for B2B templates)

**Why:** Pinterest users search for "excel templates" and "manufacturing checklists" heavily. A single pin for a free Excel template can drive 500-2000 visits over its lifetime. The 8 Excel template pages you already have are perfect Pinterest content.

**What to pin:**
- Visual preview of each Excel template (screenshot as a pin)
- Infographics from blog posts (pillar guides work well)
- Before/after case studies with transformation imagery
- Industry-specific checklists

**Pinterest boards to create:**
1. Free Manufacturing Excel Templates
2. Production Scheduling Tips
3. Manufacturing KPIs & Metrics
4. Lean Manufacturing Resources
5. Job Shop Management
6. Supply Chain & Inventory
7. Manufacturing Case Studies
8. Factory Floor Best Practices

**Pin specs:**
- **Vertical pins:** 1000×1500 (2:3 ratio) — best performance
- **Rich pins:** enable article-type rich pins (pulls title/description from your site automatically)
- **Title:** 100 chars max, keyword-rich
- **Description:** 500 chars, includes keywords naturally
- **Link:** direct to the specific blog post or template page

**Cadence:** 2-5 pins/day (batch-create weekly). Pinterest rewards consistent posting heavily — 20+ pins/week is the sweet spot.

**Tool recommendation:** Canva has pre-made Pinterest templates that make this ~5 min per pin.

**Signup:** `https://business.pinterest.com/` (convert to a business account to enable analytics)

### 8. Quora (Q&A ranks in Google)

**Why:** Quora answers rank EXTREMELY well in Google for informational queries. A well-written Quora answer on "What is finite capacity scheduling?" can outrank your own blog post if you're not careful. Better to own both.

**What to answer:**
- Questions tagged: Manufacturing, ERP, Production Planning, Supply Chain, Small Business Software
- Questions with 100+ views that are 1-3 months old (sweet spot for ranking)
- Questions explicitly comparing vendors (e.g., "What are alternatives to MRPeasy?")

**Answer template:**
```
[1-sentence direct answer to the question]

[Context paragraph — 2-3 sentences setting up the full answer]

[Main body — 3-5 paragraphs with specifics, examples, data]

[Short conclusion]

[Disclosure + link: "Disclosure: I'm with User Solutions, makers of RMDB production scheduling software (usersolutions.com). More details at [specific blog URL]."]
```

**Critical rules:**
- Always disclose affiliation at the end
- Write 400-800 word answers (short answers get ignored)
- Include at least one specific example or data point
- Only include 1 link per answer
- Never upvote your own answers from other accounts

**Cadence:** 2-3 answers/week. Batch on Wednesday afternoon.

**Signup:** `https://www.quora.com/`

### 9. Industry-specific forums (high-intent audience)

**Why:** The buyers hanging out on Practical Machinist forum at 11pm on a Tuesday are the most qualified leads you can find. Forum participation builds real expertise reputation over time.

**Priority forums:**

| Forum | Audience | Activity |
|---|---|---|
| **Practical Machinist** (`practicalmachinist.com`) | Machine shop owners/operators | Very active, gold for manufacturing |
| **CNCZone** (`cnczone.com`) | CNC operators | Active, specific to CNC |
| **Eng-Tips** (`eng-tips.com`) | Engineers (mechanical, manufacturing) | Active, technical |
| **Manufacturing.net forums** | Mixed mfg professionals | Medium activity |
| **The Fabricator Forum** (`thefabricator.com/community`) | Metal fab shops | Vertical-specific |
| **Reliable Plant forum** (`reliableplant.com`) | Reliability engineers | Technical |

**Rules of forum marketing (same as Reddit but stricter):**
1. Participate for 2-3 weeks before mentioning your product
2. Set a clear signature with site link (forum culture permits this)
3. Answer questions directly — don't hide the answer behind a link
4. Never DM members to pitch

**Time:** 30 min/week, focused on 1-2 forums.

### 10. Facebook (B2B page + groups)

**Why:** Lower B2B conversion than LinkedIn but still essential for brand consistency + GBP integration + Facebook Groups (where a surprising amount of real manufacturing discussion happens).

**What to set up:**
1. **Facebook Business Page** — mirror your website branding, link to all social profiles
2. **Join 5-10 manufacturing Facebook Groups** — e.g., "Machine Shop Nation," "Metalworking Professionals," "Manufacturing Leaders"
3. **Share 1-2 posts/week to the Business Page** — same content as LinkedIn, reformatted

**Facebook Groups for manufacturing:**
- Machine Shop Nation
- Metal Fabrication
- CNC Machining & Programming
- Small Manufacturers of America
- Lean Six Sigma Professionals
- ERP for Small Business
- Continuous Improvement / Kaizen
- Women in Manufacturing
- Additive Manufacturing / 3D Printing

**Time:** 15 min/week for page posts + 15 min/week for group engagement.

---

## 💎 Tier 3 — Set-and-forget channels

Spend 1-2 hours initial setup, then ~10 min/month checking them.

### 11. Product Hunt (one-time launch for Excel templates)

**Why:** Product Hunt is best for launches of specific products or features, not general SaaS. Your 8 free Excel templates are PERFECT for a Product Hunt launch — "8 Free Manufacturing Excel Templates" is exactly the kind of list product that gets upvoted.

**Launch strategy:**
1. Pick a Tuesday or Wednesday (highest-traffic days)
2. Launch at 12:01 AM PST (resets the vote counter for the day)
3. Prepare 5-10 "hunters" (people you know who will upvote early)
4. Post with a great hook image (Canva template works)
5. Respond to every comment within 2 hours during launch day
6. Target: top 10 of the day

**Expected results:** 200-1000 visits in the first 48 hours, plus permanent listing page that ranks in Google.

**Signup:** `https://www.producthunt.com/`

### 12. Crunchbase (business database)

**Why:** Crunchbase profiles rank in Google for "[company name]" searches and show up in investor/B2B research tools. Essential for brand presence even if you're bootstrapped.

**Setup (30 min one-time):**
1. Claim the User Solutions profile at `https://www.crunchbase.com/add-new`
2. Fill in: founded year (1991), HQ (Michigan), founders, description, website, social links
3. Upload logo + hero image
4. Add 3-5 customers as "customers" (if they agree to be listed)
5. Keep updated quarterly

### 13. SlideShare (LinkedIn-owned, document distribution)

**Why:** SlideShare is now part of Scribd and still ranks surprisingly well for "manufacturing PDF" and "production scheduling presentation" queries. Free document hosting with Google visibility.

**What to upload:**
- Export your best blog posts to PDF, upload to SlideShare
- Case studies as slide decks
- The Excel template guides as slide decks
- Any internal presentations that are customer-facing

**Cadence:** 1-2 uploads/month (batch), then forget.

**Signup:** `https://www.slideshare.net/`

### 14. Scribd (document hosting + discovery)

**Why:** Similar to SlideShare but broader. Scribd documents sometimes appear in Google for niche queries.

**What to upload:**
- Same content as SlideShare
- PDF versions of your pillar blog posts
- Case study PDFs

**Cadence:** Same as SlideShare — batch monthly.

**Signup:** `https://www.scribd.com/`

### 15. Instagram (optional for B2B)

**Why:** Low B2B conversion but important for brand consistency. Many manufacturing employees check Instagram; company presence signals legitimacy.

**What to post (once per week):**
- Behind-the-scenes team photos
- Customer shoutouts (with permission)
- Infographics (repurpose from Pinterest)
- Reels: 30-second product demos

**Time:** 15 min/week.

### 16. Podcast guest appearances

**Why:** Podcast guest spots earn dofollow backlinks from show notes + give you ~30 minutes of authority positioning with a pre-qualified audience.

**Manufacturing/B2B podcasts to pitch (all free to submit):**
- **Manufacturing Happy Hour** — popular manufacturing podcast
- **The American Innovator** — manufacturing innovation focus
- **WAM Podcast** (Women in Manufacturing)
- **Manufacturing Leadership Podcast**
- **MakingChips** — machine shop focus
- **Smart Industry Podcast**
- **The Manufacturing Report**
- **Industrial Talk**
- **The Buzz of Delmia** — APS/planning focus
- **Supply Chain Now**
- **Lean Blog Audio**

**Pitch template:**
```
Subject: Guest pitch — [specific topic relevant to their show]

Hi [host name],

Longtime listener of [show name] — loved the recent episode with [specific guest/topic]. 

I'm [your name] from User Solutions, and we've helped 1,000+ manufacturers (including GE, Cummins, BAE Systems) solve production scheduling since 1991. I'd love to come on the show to share [specific story / data / insight relevant to their audience].

Three topics I could cover:
1. [Topic 1 — specific and data-backed]
2. [Topic 2 — unusual angle]
3. [Topic 3 — controversial / counterintuitive]

Happy to send a pre-interview brief if any of these resonate.

Best,
[Name]
[Title] at User Solutions
[Link to site]
```

**Cadence:** 2-3 pitches/month. Expect 20% acceptance rate → 1 podcast/month.

---

## 🎯 Tier 4 — Opportunistic channels

Low effort, only pursue when you have a genuinely interesting story.

### 17. Hacker News (Show HN for new launches)

**Why:** HN audience is technical (engineers, CTOs) — some overlap with manufacturing IT buyers. Most posts die in /new with zero votes; occasionally a post takes off and drives 10k+ visits in a day.

**What to post:**
- "Show HN: Free manufacturing Excel templates we built after 35 years of scheduling software" (the 8-template launch)
- "Show HN: A keyword tracker that reads TSX metadata for custom SEO tooling" (the tracker script)

**Post between 7-9 AM PST weekdays for best visibility.**

**Signup:** `https://news.ycombinator.com/`

### 18. Indie Hackers (founder community)

**Why:** Indie Hackers is a supportive community of bootstrapped founders. Manufacturing SaaS rarely makes the front page but can drive meaningful traffic from community members who become advocates.

**What to post:**
- Milestone announcements
- Product launches
- Revenue numbers (if willing to share)
- Behind-the-scenes build stories

**Signup:** `https://www.indiehackers.com/`

### 19. Stack Exchange sites

**Why:** The Engineering, Project Management, and Workplace Stack Exchange sites sometimes have manufacturing-related questions. Answering authoritatively earns backlinks from `stackexchange.com` (DR 90+).

**Signup:** `https://stackexchange.com/`

### 20. TikTok (only if founder enjoys video)

**Why:** Low B2B fit but growing — some "day in the life of a machine shop" creators have built huge audiences. Skip unless the founder/team enjoys video content.

---

## Free guest post targets — manufacturing trade publications

Guest posting on authoritative trade publications is the single highest-quality backlink source for a manufacturing SaaS. Most of these accept unsolicited pitches for free.

### Tier 1 — High DR, actively accept guest posts

| Publication | DR | Focus | Submission URL |
|---|---:|---|---|
| **IndustryWeek** | 78 | General manufacturing | `industryweek.com/about-industryweek/contact-us` |
| **Modern Machine Shop** | 74 | Machining, CNC, metalworking | `mmsonline.com/about-us/contact-us` |
| **Manufacturing Tomorrow** | 65 | Emerging manufacturing tech | `manufacturingtomorrow.com/contribute` |
| **ThomasNet Insights** | 86 | Industrial suppliers | `thomasnet.com/contribute-to-insights` |
| **Production Machining** | 68 | Precision machining | `productionmachining.com/contact` |
| **Assembly Magazine** | 65 | Assembly operations | `assemblymag.com/contact-assembly-magazine` |
| **Metal Center News** | 58 | Metal service centers | `metalcenternews.com/contact` |
| **Control Engineering** | 72 | Control systems, automation | `controleng.com/contact-us` |
| **Automation World** | 70 | Industrial automation | `automationworld.com/contact-us` |
| **Plant Engineering** | 68 | Plant operations | `plantengineering.com/contact-us` |
| **Food Manufacturing** | 62 | Food production | `foodmanufacturing.com/contact-us` |
| **American Machinist** | 60 | Machine shops | `americanmachinist.com/contact-us` |
| **Fabricating & Metalworking** | 55 | Metal fabrication | `fabricatingandmetalworking.com/contact` |
| **MFG.com Insights** | 62 | Contract manufacturing | `mfg.com/contact-us` |
| **Manufacturing.net** | 64 | General manufacturing | `manufacturing.net/contact-us` |

### Tier 2 — Vertical-specific publications

| Publication | Vertical |
|---|---|
| **Medical Design & Outsourcing** | Medical devices |
| **Aerospace Manufacturing and Design** | Aerospace |
| **Automotive Manufacturing Solutions** | Automotive |
| **Plastics Today** | Plastics/injection molding |
| **Woodworking Network** | Furniture/cabinetry |
| **Packaging Digest** | Packaging converters |
| **Pharmaceutical Manufacturing** | Pharma |
| **Beverage Industry** | Beverage producers |
| **Textile World** | Textiles |
| **Print+Promo** | Commercial print |

### Guest post pitch template

```
Subject: Guest post pitch — [specific article title]

Hi [editor name],

I've been reading [publication] for years (loved the recent piece on [specific article title]) and I'd like to pitch a guest post for your readers.

My proposed title: "[Specific, data-driven title — e.g., 'Why 70% of Finite Capacity Scheduling Implementations Fail (And How to Avoid It)']"

**The core thesis:** [1-2 sentences]

**What readers will learn:**
- [Specific takeaway 1]
- [Specific takeaway 2]
- [Specific takeaway 3]

**Why I'm qualified to write this:** I'm [title] at User Solutions, where we've spent 35+ years helping manufacturers (including GE, Cummins, BAE Systems, the US Navy) implement production scheduling systems. I've seen what works and what doesn't across 1,000+ manufacturing deployments.

I can deliver a 1,500-2,000 word draft within 7 days of your confirmation. Happy to adjust the angle to fit [publication]'s editorial voice.

Best,
[Name]
[Title], User Solutions
[Site URL]
```

**Cadence:** 5 pitches/week, expect ~20% acceptance = 1 guest post/month. Start with Tier 1 publications and work down.

---

## Additional free directories and listings

Beyond the B2B software directories covered in the Week 2 directory submission list, add these **company/brand directories** (one-time setup, free):

| Directory | Purpose | URL |
|---|---|---|
| **Crunchbase** | Business database, covered above | `crunchbase.com` |
| **Wellfound** (AngelList) | Startup profile | `wellfound.com` |
| **Clutch** | B2B service reviews | `clutch.co` |
| **GoodFirms** | B2B software reviews | `goodfirms.co` |
| **DesignRush** | Agency/vendor directory | `designrush.com` |
| **TechBehemoths** | IT services directory | `techbehemoths.com` |
| **DigitalAgencyNetwork** | Agency directory | `digitalagencynetwork.com` |
| **B2BMap** | B2B vendor directory | `b2bmap.com` |
| **Glassdoor** | Company profile + reviews | `glassdoor.com` |
| **Indeed Company Pages** | Hiring + brand | `indeed.com/cmp/create-company` |
| **Zoominfo** | B2B contact database — claim your profile to control info | `zoominfo.com` |
| **RocketReach** | Similar to Zoominfo | `rocketreach.co` |
| **Apollo.io** | B2B contact database | `apollo.io` |
| **ClearBit** | Logo/metadata — claim your profile | `logo.clearbit.com` |
| **BuiltWith** | Tech stack directory | `builtwith.com` |

**Cadence:** One-time setup. Spend one afternoon claiming all 15, then check quarterly.

---

## Weekly cross-channel rhythm (all channels combined)

Here's what a fully-executed week looks like once all channels are set up:

### Monday (~45 min total)
- [ ] **GBP:** post from auto-calendar (5 min)
- [ ] **LinkedIn Company + Personal:** case study post (15 min)
- [ ] **Reddit:** check r/manufacturing for questions (15 min)
- [ ] **X/Twitter:** tweet or thread from the week's best insight (10 min)

### Tuesday (~50 min total)
- [ ] **GBP:** post from auto-calendar (5 min)
- [ ] **LinkedIn:** how-to tip post with carousel (15 min)
- [ ] **YouTube:** record + upload 1 Short (15 min)
- [ ] **HARO:** review digest, write 1 response (15 min)

### Wednesday (~55 min total)
- [ ] **GBP:** post from auto-calendar (5 min)
- [ ] **LinkedIn:** industry insight post (15 min)
- [ ] **Quora:** write 1 answer (20 min)
- [ ] **Pinterest:** create + pin 5 new pins (15 min)

### Thursday (~55 min total)
- [ ] **GBP:** post from auto-calendar (5 min)
- [ ] **LinkedIn:** comparison / myth-busting post (15 min)
- [ ] **Industry forum:** 1 thoughtful reply on Practical Machinist or CNCZone (15 min)
- [ ] **HARO:** second response of the week (15 min)
- [ ] **Guest post pitch:** send 1 pitch to a trade pub (5 min, template-based)

### Friday (~45 min total)
- [ ] **GBP:** post from auto-calendar (5 min)
- [ ] **LinkedIn:** glossary/definition post + week wrap (15 min)
- [ ] **Medium:** republish 1 blog post with canonical (10 min once comfortable)
- [ ] **LinkedIn Newsletter:** send weekly issue (pre-scheduled, 15 min)

### Weekend (~30 min total, Sunday evening)
- [ ] Batch-schedule next week's LinkedIn posts using native scheduler (20 min)
- [ ] Review GBP calendar, prep any custom images for upcoming posts (5 min)
- [ ] SEO Ops Dashboard update: post counts, engagement metrics, notable wins (5 min)

**Weekly total:** ~4 hours of cross-channel distribution work + 4-6 hours of content creation (blog posts, HARO responses, podcast prep) = **~8-10 hours/week for full execution**.

**Lighter cadence (if solo or time-constrained):** Execute only the ✅ Tier 1 items above (GBP, LinkedIn, Reddit, Medium). That cuts weekly time to ~2 hours.

---

## Channel ROI expectations by month

Setting realistic expectations — most of these channels take 3-6 months to show ROI.

| Channel | Month 1 | Month 3 | Month 6 | Month 12 |
|---|---|---|---|---|
| GBP | 5-10 clicks/wk | 20-40/wk | 50-100/wk | 100-200/wk |
| LinkedIn Company | 100-300 impressions/post | 500-1500 | 1000-3000 | 2000-5000 |
| LinkedIn Personal | 500-2000/post | 1500-5000 | 3000-10000 | 5000-20000 |
| YouTube (subs) | 10-50 | 100-500 | 500-2000 | 2000-5000 |
| YouTube (views/video) | 20-100 | 100-500 | 500-2000 | 1000-5000 |
| Reddit (karma earned) | 50-200 | 500-2000 | 2000-10000 | 10000+ |
| Medium (reads/post) | 50-200 | 200-1000 | 500-3000 | 1000-5000 |
| Pinterest (monthly views) | 100-500 | 1000-5000 | 5000-20000 | 20000+ |
| Twitter/X (impressions) | 500-2000/wk | 2000-8000/wk | 5000-20000/wk | 20000+/wk |
| Quora (answer views) | 100-500/answer | 500-2000 | 2000-10000 | 10000+ |
| Guest posts | 0-1 published | 2-3 | 6-10 | 15-25 |
| Podcast guest spots | 0 | 1-2 | 3-6 | 10-15 |

**Compound effect:** by month 12, a fully-executed cross-channel strategy typically drives **30-50% of all organic traffic** to a B2B SaaS site (the other 50-70% coming from Google organic search). Skip the cross-channel work and you're leaving half your possible traffic on the table.

---

## Directory submission — detailed

### Priority tier 1 (submit week 2)

**Capterra** — `https://www.capterra.com/vendors/sign-up`
- Listing: free
- Cost per lead (if you upgrade): $2-$50 depending on category
- Manufacturing software buyers heavily trust Capterra
- **Must have:** company description (150 words), feature list, pricing, 3+ screenshots

**G2** — `https://www.g2.com/products/new`
- Listing: free
- Reviews are gated — need actual customers to leave verified reviews
- **Highest authority** of all B2B directories
- Reviews rank for "[competitor] alternative" and "[competitor] vs" queries organically

**SoftwareAdvice + GetApp** — `https://www.softwareadvice.com/vendors/`
- Both owned by Gartner (same parent as Capterra)
- Single submission often covers both
- Feeds Gartner Peer Insights long-term

**TrustRadius** — `https://www.trustradius.com/vendor/signup`
- Reviews require LinkedIn verification — higher quality signal
- Enterprise-focused buyers

### Priority tier 2 (submit month 2)

- **AlternativeTo** — submit as alternative to MRPeasy, Katana, Fishbowl, Preactor
- **Crozdesk** — EU/UK heavier
- **SourceForge** — older audience, still relevant for traditional manufacturing buyers
- **Product Hunt** — for the RMX templates hub specifically (1-time launch opportunity)
- **BetaList** — if you have any beta features to showcase

### Priority tier 3 (submit month 3+)

- **Financesonline** — paid features, free listing
- **Software Suggest** — secondary directory
- **DiscoverCloud** — emerging
- **SaaSHub** — community-driven

---

## HARO / Qwoted strategy

HARO (Help A Reporter Out) connects journalists with expert sources. You respond to queries matching your expertise, and if the journalist uses your response, you get a backlink from a (typically high-authority) publication.

### Sign-up
- **HARO** (now part of Connectively): `https://www.connectively.us/`
- **Qwoted**: `https://qwoted.com/`
- **Terkel**: `https://terkel.io/`

### Daily workflow (20 min/day, 3x/week)

1. Open HARO/Qwoted digest (arrives 3x/day)
2. Filter queries by **Business**, **Technology**, **Manufacturing** categories
3. Identify queries about: production scheduling, manufacturing software, ERP, MRP, lean manufacturing, supply chain, job shops
4. Write a **250-400 word response** with:
   - Direct answer to the question
   - 1-2 specific examples (case studies, numbers, real data)
   - Bio line: "[Your name], [Title] at User Solutions ([URL])"
5. Submit within 12 hours of the query (journalists move fast)

### Success metrics

- **Response rate:** ~20% of well-written responses get used (industry average)
- **Expected volume:** 3 responses/week × 20% = 0.6 placements/week = ~2 per month
- **Backlink authority:** most HARO-earned links are from DR 40-70 sites (journalists work for real publications)
- **Time to first placement:** typically 4-8 weeks

---

## Backlink Building Playbook — 15 tactics ranked by ROI

**Context:** The on-page SEO infrastructure is done (80% coverage, 4 tiers at 100%). The next ranking ceiling is backlink authority — specifically, referring domains from DR 40+ sites. MRPeasy has ~2,000 referring domains; PlanetTogether ~800; usersolutions.com currently has far fewer (check in Ahrefs). **Every tactic in this section is about closing that gap.**

**How to evaluate a backlink tactic:**
- **DR (Domain Rating)** of the linking site — higher is better (40+ is good, 60+ is great)
- **Topical relevance** — a DR 50 manufacturing site is worth more than a DR 70 general site
- **Link type** — dofollow passes authority, nofollow still useful for traffic/diversity
- **Placement** — in-content links are 10x more valuable than footer/sidebar links
- **Effort vs reward** — some tactics earn 1 link per 20 hours, others earn 10 links per 2 hours

### Tactic 1 — Competitor backlink theft (highest ROI)
**What:** Find every site linking to MRPeasy, PlanetTogether, Preactor, Katana, etc. and systematically pitch those same sites to link to you instead (or in addition).

**Why it works:** If a site has already linked to a manufacturing scheduling tool, they are pre-qualified to link to another. 15-25% conversion rate is normal.

**Workflow:**
1. In Ahrefs (or Semrush), enter a competitor's domain → Backlinks report
2. Filter: `dofollow`, `referring domain DR 30+`, language `English`
3. Export the top 200 referring domains to a spreadsheet
4. For each, identify the URL that links to the competitor
5. Read the page — understand WHY they linked (list article? review? resource page?)
6. Craft a personalized pitch (see Outreach Playbook below)
7. Pitch 5 sites/day = 25/week. Expect 4-6 new backlinks/month.

**Time:** 1 hr research + 30 min/day outreach = ~5 hrs/week
**Expected result:** 4-10 new referring domains per month
**Tools:** Ahrefs ($99/mo minimum for backlink explorer) or Semrush

### Tactic 2 — Broken link building
**What:** Find broken outbound links on manufacturing sites, pitch your content as a replacement.

**Why it works:** Site owners HATE broken links (they hurt UX and SEO). You're doing them a favor. Conversion rate 15-30%.

**Workflow:**
1. Use Ahrefs Site Explorer → Outgoing Links → Broken (404 destination)
2. Or use the Check My Links Chrome extension on manufacturing resource pages
3. Find a broken link on a topic you cover (e.g., "production scheduling best practices")
4. Email the site owner: "I noticed [specific broken link] on your [specific page]. Here's a more recent resource that covers the same topic: [your URL]."
5. Pitch 10-20 per week. Expect 2-4 conversions/month.

**Time:** 2 hrs/week
**Expected result:** 2-5 new backlinks/month
**Tools:** Ahrefs + Check My Links extension (free)

### Tactic 3 — Resource page link building
**What:** Find pages titled "Manufacturing Resources," "Best Production Software," "Helpful Tools for Machine Shops" — pitch yourself for inclusion.

**Why it works:** These pages exist specifically to list resources. Editors WANT suggestions. High acceptance rate.

**Google dorks to find resource pages:**
```
"manufacturing resources" inurl:resources
"production scheduling" inurl:tools
"manufacturing software" "list" OR "best" inurl:resources
intitle:"resources" "manufacturing" OR "scheduling" OR "APS"
"useful tools for" site:.edu manufacturing
"manufacturing links" OR "manufacturing resources"
"best of" OR "top 10" "production scheduling software"
```

**Workflow:**
1. Run the Google dorks above, collect 30-50 resource pages
2. For each, read the page to confirm topical fit
3. Email the editor with the pitch template (see Outreach Playbook)
4. Expect 20-30% conversion rate

**Time:** 3 hrs/week
**Expected result:** 3-8 new backlinks/month from highly relevant sites
**Tools:** Google search (free)

### Tactic 4 — Unlinked brand mentions
**What:** Find places where "User Solutions" or "RMDB" is mentioned WITHOUT a link, ask for one to be added.

**Why it works:** The writer already knows you. Just a small ask. 40-60% conversion rate.

**Workflow:**
1. Set up Google Alerts for: `"User Solutions"`, `"Resource Manager DB"`, `"RMDB scheduling"`, `"EDGEBI"`
2. Also use Ahrefs Content Explorer → search same terms → filter "without links to your domain"
3. Email the author: "Thanks for mentioning us in [article]. Small favor: would you mind linking the name to our site? It helps readers find more info: [URL]"
4. Check monthly

**Time:** 30 min/month
**Expected result:** 1-3 links/month
**Tools:** Google Alerts (free), Ahrefs Content Explorer (paid)

### Tactic 5 — Skyscraper technique (for high-authority sites)
**What:** Find the best-performing content on a competitive topic, create something measurably better, pitch it to sites linking to the original.

**Why it works:** Editors upgrade old links to better resources. Takes more effort but earns DR 60+ backlinks.

**Workflow:**
1. Use Ahrefs → find top-linked content for "production scheduling guide" type queries
2. Identify a piece with 30+ referring domains that is old/outdated
3. Write a measurably better version (longer, more data, updated stats, better examples, unique research)
4. Export the list of domains linking to the original
5. Email each: "I noticed you linked to [old article]. We just published [your better article] with [specific improvement — 2024 data / 50 more examples / original research]. Would you consider linking to it as well?"
6. Expect 5-10% conversion

**Time:** 10-20 hrs for the content + 3-5 hrs/week outreach
**Expected result:** 5-15 backlinks per campaign (runs 2-3 months)
**Tools:** Ahrefs, your existing blog infrastructure

### Tactic 6 — Original research / data study (the best backlink magnet)
**What:** Run an original survey, study, or data analysis on a manufacturing topic. Publish the results. Journalists WILL cite you.

**Why it works:** Data is scarce and linkable. One good data study = 50-200 backlinks over its lifetime.

**Ideas for research you can actually do:**
- **"State of Production Scheduling 2026 Report"** — survey 100+ manufacturers on current tools, pain points, budget
- **"How Long Do Manufacturing ERP Implementations Really Take?"** — analyze public case study data
- **"Manufacturing Software ROI: Analysis of 1,000+ Deployments"** — use your 35-year customer base (anonymized)
- **"Excel vs APS: When Does the Spreadsheet Break?"** — survey on breaking points
- **"The Hidden Cost of Subscription MRP vs One-Time Licensing"** — financial analysis

**Workflow:**
1. Pick 1 research question per year
2. Collect data (survey via email, SurveyMonkey/Typeform free tier, or public data)
3. Analyze and visualize (Canva infographics, simple charts)
4. Publish as a pillar blog post + downloadable PDF report
5. Press outreach: email 50 journalists with the headline finding
6. HARO: respond to any manufacturing/survey queries with the data
7. Social: post key findings to LinkedIn, Twitter, Reddit

**Time:** 30-50 hrs one-time investment
**Expected result:** 30-100 backlinks over 12-24 months from a single report
**Tools:** SurveyMonkey/Typeform free, Canva free, your blog

### Tactic 7 — Testimonial swaps
**What:** Write testimonials for tools you use (Excel, accounting software, design tools). They publish on their "Customers" page with a link back to you.

**Why it works:** Vendors crave customer testimonials. Free backlink for you. 80% acceptance rate.

**Workflow:**
1. List the 10-15 tools your company uses (Microsoft 365, QuickBooks, Zoom, Canva, etc.)
2. For each, find their "Customer Stories" / "Testimonials" page
3. Email their marketing team: "I'd like to share how [tool] helps us at User Solutions. Happy to provide a quote + headshot."
4. Provide a quality 2-3 sentence testimonial + your name, title, company, headshot
5. They publish with a link

**Time:** 15 min per testimonial × 10 tools = 2.5 hrs total
**Expected result:** 5-10 easy backlinks from mid-high DR SaaS sites
**Tools:** Nothing

### Tactic 8 — Industry association listings
**What:** Join manufacturing industry associations — most offer member directory listings with backlinks.

**Why it works:** Association sites are DR 50+ and topically perfect. Dues are tax-deductible.

**Manufacturing associations to join:**

| Association | URL | Approx cost |
|---|---|---|
| **National Association of Manufacturers (NAM)** | `nam.org` | Free basic / paid premium |
| **Association for Manufacturing Technology (AMT)** | `amtonline.org` | $500-$2k/yr |
| **Society of Manufacturing Engineers (SME)** | `sme.org` | $150/yr individual |
| **Precision Machined Products Association (PMPA)** | `pmpa.org` | $500-$2k/yr |
| **National Tooling & Machining Association (NTMA)** | `ntma.org` | $1k-$3k/yr |
| **Manufacturers Association for Plastics Processors (MAPP)** | `mappinc.com` | $500-$1.5k/yr |
| **American Association of Woodturners** | `woodturner.org` | $80/yr |
| **Aerospace Industries Association (AIA)** | `aia-aerospace.org` | Corporate |
| **MSCI (Metals Service Center Institute)** | `msci.org` | $1k-$2k/yr |
| **PMA (Precision Metalforming Association)** | `pma.org` | $1k-$2k/yr |
| **Food Processing Suppliers Association** | `fpsa.org` | $500-$2k/yr |
| **Institute for Supply Management (ISM)** | `ismworld.org` | $189/yr individual |
| **APICS / ASCM** | `ascm.org` | $200/yr individual |
| **Reshoring Initiative** | `reshorenow.org` | Free |
| **Local Michigan Manufacturers Association (MMA)** | `mimfg.org` | $500-$1k/yr |

**Workflow:**
1. Join 3-5 most relevant associations
2. Complete member directory profile (logo, description, website)
3. Post to association forums / newsletters if available
4. Attend 1-2 virtual events per year for networking

**Time:** 2 hours one-time + 2 hrs/month participation
**Expected result:** 3-8 high-DR backlinks from association sites
**Investment:** $1,000-$3,000/year in dues (tax-deductible)

### Tactic 9 — Wikipedia citations
**What:** Add User Solutions / RMDB as a cited source on manufacturing scheduling Wikipedia articles.

**Why it works:** Wikipedia is DR 99. Even a single citation passes meaningful authority + directs expert traffic.

**Articles to target:**
- `Advanced planning and scheduling`
- `Manufacturing execution system`
- `Material requirements planning`
- `Capacity planning`
- `Production planning`
- `Finite capacity scheduling`
- `Theory of constraints`
- `Lean manufacturing`
- `List of production planning software`

**Workflow:**
1. Create a Wikipedia account and establish credibility (edit 10+ non-promotional articles first — required to avoid COI flags)
2. Find a relevant article with a statement that needs a citation (marked `[citation needed]`)
3. If your blog has a rigorous source for that statement, add it as a reference
4. NEVER cite self-promotional content — only factual data
5. Edits must follow Wikipedia's neutral point of view policy

**Time:** 5-10 hours one-time account building + 1 hr/month editing
**Expected result:** 2-5 Wikipedia citations over 12 months (hard to get, high impact)
**Tools:** Wikipedia account (free)

### Tactic 10 — Niche edits (paid but effective)
**What:** Pay niche-relevant sites to add your link to existing articles. Less risky than typical paid links since it's contextual.

**Why it works:** Many small-mid blog owners monetize via niche edits. $50-$200 per placement is normal.

**Workflow:**
1. Use Ahrefs to identify DR 30-50 manufacturing blogs with organic traffic
2. Find articles on your topics that don't yet mention a scheduling solution
3. Email owner: "I'd like to sponsor a niche edit on [specific article] to add a link to [your URL] in [specific section]. What's your rate?"
4. Negotiate $50-$150 per placement
5. **Disclosure:** paid links should technically be nofollow per Google guidelines. Many sites don't. Your call on risk tolerance.

**Time:** 2 hrs/week researching + negotiating
**Expected result:** 3-6 placements/month at $50-$150 each
**Cost:** $150-$900/month
**Risk:** Google penalty if detected as pattern — use sparingly, mix with organic tactics

### Tactic 11 — Link reclamation (easy wins)
**What:** Find broken links pointing to OLD versions of your content (from URL changes or deleted pages), fix them or redirect.

**Why it works:** These backlinks already exist — just point to a dead URL. Fixing restores authority. 100% conversion on your own redirects; 30-50% when asking external sites to update.

**Workflow:**
1. In GSC → Coverage → Errors — look for 404s with external referrers
2. Or in Ahrefs → Backlinks → Filter by Status: 404
3. Two actions:
   - **Self-fix:** add a 301 redirect in `next.config.mjs` from the old URL to a relevant new URL
   - **Ask update:** if the old URL was a specific topic, email the linking site: "You linked to [old URL] which now 404s. Here's our updated article on the same topic: [new URL]."
4. Check monthly

**Time:** 1 hr/month
**Expected result:** 5-20 reclaimed links per audit
**Tools:** GSC (free), Ahrefs (paid)

### Tactic 12 — Scholarship link building (.edu backlinks)
**What:** Offer a small scholarship to manufacturing/engineering students. Universities list it on their scholarship pages, which are .edu domain links (DR 70-95).

**Why it works:** .edu links are rare and extremely valuable. Universities have pre-existing scholarship listing processes.

**Workflow:**
1. Create a $500-$2,000 scholarship for manufacturing engineering / industrial engineering students
2. Simple criteria (e.g., 500-word essay on "The future of production scheduling")
3. Create a dedicated landing page on your site explaining the scholarship
4. Email 50 university financial aid offices / engineering departments asking to list the scholarship
5. Expect 10-30% conversion

**Time:** 10 hrs setup + 5 hrs outreach
**Expected result:** 15-40 .edu backlinks (highest-authority link type available)
**Cost:** $500-$2,000 actual scholarship award (tax-deductible as charitable)

### Tactic 13 — Reverse image search for unlinked image usage
**What:** Find sites using your images (blog heroes, product screenshots, diagrams) without attribution. Ask for a link.

**Why it works:** Image use without attribution is technically a copyright violation. Sites happily add a link to avoid issues.

**Workflow:**
1. Go to Google Images → Reverse image search for your hero images
2. Or use TinEye (free) for systematic searches
3. For each unattributed use, email: "Thanks for using our image in [article]. Small favor: would you add attribution with a link back to the original source? [URL]"
4. 70%+ conversion rate

**Time:** 1 hr/month
**Expected result:** 2-5 links/month once images are widely distributed
**Tools:** Google Images, TinEye

### Tactic 14 — Podcast guest appearances (covered in Channel section)
Already detailed in the Channel Distribution section. Every guest spot earns a dofollow backlink from the show notes page + audio distribution across Apple/Spotify/Google Podcasts.

**Cadence:** 1-3 podcast appearances/month via pitches.
**Expected:** 12-20 podcast backlinks/year at DR 30-60.

### Tactic 15 — HARO (covered earlier)
Already detailed. Expect 1-2 press backlinks/month from DR 50+ publications.

### Backlink building summary — monthly target

If you execute all 15 tactics (some daily, some monthly, some quarterly):

| Tactic | Monthly links |
|---|---:|
| Competitor backlink theft | 4-10 |
| Broken link building | 2-5 |
| Resource page outreach | 3-8 |
| Unlinked brand mentions | 1-3 |
| Skyscraper campaigns (rotating) | 5-15 |
| Data study (amortized) | 3-8 |
| Testimonial swaps (one-time burst) | 5-10 total |
| Industry associations | 3-8 total |
| Wikipedia citations | 0-1 |
| Link reclamation | 5-20 (front-loaded) |
| Reverse image search | 2-5 |
| Podcast backlinks | 1-3 |
| HARO | 1-2 |
| **Sustainable monthly rate** | **~15-25 new referring domains** |

At 15-25 new referring domains/month, you'll close the gap to PlanetTogether in ~3-4 years and make meaningful progress toward MRPeasy in ~5-8 years. **This is a marathon, not a sprint.**

---

## Cold Outreach Playbook — email templates that actually work

Every backlink/guest post/podcast tactic above requires outreach. Most outreach fails because the email is too generic, too long, or too pitchy. Here are battle-tested templates organized by purpose.

### Rules of good outreach (apply to every email)

1. **Personalization in the first sentence.** Mention something specific about their site/article/work. No "Dear Sir/Madam."
2. **State the ask within 3 sentences.** No mystery, no fluff.
3. **Explain why it benefits them** (not just you).
4. **Keep under 150 words.** Editors skim. Shorter wins.
5. **Signature with credibility signal.** Title + company + "35+ years in production scheduling" type positioning.
6. **No attachments.** Links only. Attachments trigger spam filters.
7. **Follow up ONCE after 5-7 days.** Never more than twice.
8. **Track everything.** Use a simple spreadsheet: target, date, template used, response.

### Template 1 — Competitor backlink theft pitch

**Use for:** Sites linking to MRPeasy/Katana/PlanetTogether (Tactic 1).

```
Subject: Quick suggestion for your [specific article title]

Hi [First name],

I came across your [article title] on [site name] — loved the [specific point you
appreciated, must be genuine].

I noticed you linked to [competitor] as an example of [whatever they were
discussing]. Just wanted to share a data point: we've been doing production
scheduling for 35 years at User Solutions (usersolutions.com), and we've written
a [more detailed / updated / comparison] piece on the same topic:

[Your URL]

It's got [specific differentiator — "real pricing data," "2026 comparison,"
"35 years of customer examples"]. Might be a useful addition if you're updating
the article.

Either way, thanks for writing such a useful piece.

Best,
[Your name]
[Title], User Solutions
[Site URL]
```

**Expected response rate:** 15-25%

### Template 2 — Broken link building pitch

**Use for:** Broken outbound links on manufacturing/scheduling pages (Tactic 2).

```
Subject: Broken link on [specific page title]

Hi [First name],

I was reading your [specific page] today and noticed that one of your links is
broken — the link to [old URL] returns a 404.

I run production scheduling content at User Solutions (35+ years in the
industry), and we have an updated resource covering the same topic:

[Your URL]

Happy for you to use it as a replacement, or not — just wanted to give you a
heads up either way.

Best,
[Your name]
[Title], User Solutions
```

**Expected response rate:** 25-35%

### Template 3 — Resource page pitch

**Use for:** "Manufacturing Resources" / "Best Tools" list pages (Tactic 3).

```
Subject: Resource suggestion for [page title]

Hi [First name],

Found your [page title] while researching production scheduling resources for
our manufacturing clients — it's one of the most comprehensive lists I've seen
on [topic].

A small suggestion: would you consider adding our guide on [specific topic
directly relevant to their page]?

[Your URL]

It covers [specific angle their existing resources don't], and it's used by
1,000+ manufacturers including GE, Cummins, and BAE Systems.

Completely understand if it's not the right fit — just wanted to offer.

Best,
[Your name]
[Title], User Solutions
```

**Expected response rate:** 20-30%

### Template 4 — Unlinked brand mention follow-up

**Use for:** Articles that mention your name without a link (Tactic 4).

```
Subject: Thanks for the mention — small request

Hi [First name],

Thanks for including User Solutions in your recent article on [topic] — really
appreciated the thoughtful coverage.

Small favor: would you consider linking our name to our site?

[Your URL]

It helps readers who want to learn more about what we do, and makes the
reference more useful for anyone doing research.

Either way, thanks again for the mention.

Best,
[Your name]
[Title], User Solutions
```

**Expected response rate:** 50-70%

### Template 5 — Guest post pitch (detailed version)

**Use for:** Trade publications (IndustryWeek, Modern Machine Shop, etc.).

```
Subject: Guest post pitch — [specific article title]

Hi [Editor name],

Longtime reader of [publication]. Your recent piece on [specific recent article]
was one of the best takes I've seen on [topic] — I especially appreciated [one
specific insight].

I'd like to pitch a guest post for your readers. Here's my proposed angle:

**Title:** "[Specific, data-driven title — e.g., 'Why 70% of Finite Capacity
Scheduling Implementations Fail (And How to Avoid It)']"

**Core thesis:** [1-2 sentences — what the article argues]

**What readers will learn:**
- [Specific takeaway 1]
- [Specific takeaway 2]
- [Specific takeaway 3]

**Why I'm qualified:** I'm [title] at User Solutions, where we've helped 1,000+
manufacturers (including GE, Cummins, BAE Systems, the US Navy) implement
production scheduling systems since 1991. I've seen what works and what doesn't
across three decades of deployments.

I can deliver a 1,500-2,000 word draft within 7 days of your confirmation, with
original examples and data from real customer deployments. Happy to match
[publication]'s editorial voice.

Best,
[Name]
[Title], User Solutions
[Site URL]
```

**Expected response rate:** 15-25% (higher with trade pubs where editors actively want content)

### Template 6 — Podcast guest pitch

**Use for:** Manufacturing podcasts (Tactic from Channel Distribution).

```
Subject: Guest pitch — [specific topic relevant to their show]

Hi [Host name],

Longtime listener — loved the recent episode with [specific guest or topic].
Your take on [specific insight] really resonated.

I'm [your name], [title] at User Solutions. We've helped 1,000+ manufacturers
solve production scheduling problems since 1991, including the US Navy, GE,
Cummins, and BAE Systems.

Three topics I could cover, each with data from real customer deployments:

1. **[Specific topic]** — [1-line angle]
2. **[Specific topic]** — [1-line angle, make one controversial or counterintuitive]
3. **[Specific topic]** — [1-line angle, tie to a recent industry trend]

Happy to send a pre-interview brief if any of these resonate with your audience.

Best,
[Name]
[Title], User Solutions
[Site URL]
```

**Expected response rate:** 20-30%

### Template 7 — Testimonial swap

**Use for:** Tools your company uses (Tactic 7).

```
Subject: Would love to be featured on your customer stories page

Hi [First name],

[Your company name] has been using [tool name] for [specific use case] for
[duration]. It's been a core part of how we [specific value achieved].

I'd love to share our experience on your customer stories / testimonials page.
Happy to provide:

- A 2-3 sentence quote about how [tool] helps us
- Professional headshot
- Company logo
- Link back to our site

Just let me know if you're open to it and what format works best.

Best,
[Name]
[Title], User Solutions
[Site URL]
```

**Expected response rate:** 60-80%

### Template 8 — Association / partnership pitch

**Use for:** Industry associations, complementary vendors (Tactic 8, partnerships).

```
Subject: Partnership opportunity with User Solutions

Hi [First name],

[Your name] from User Solutions here — we've been in the manufacturing scheduling
software space for 35 years, serving 1,000+ SMB and mid-market manufacturers.

I'm reaching out because I think there's a natural fit between [their
organization / product] and what we do. Specifically: [1-2 sentences on the
shared audience or complementary value].

A few ways we could work together:
- **Member benefit:** discounted RMDB license for [association] members
- **Content collaboration:** we contribute a quarterly manufacturing insights
  piece to your newsletter
- **Co-marketed webinar:** we co-host a production scheduling webinar for your
  members
- **Cross-link:** add us to your member directory or resources page

Open to other ideas too. 15-minute call next week to explore?

Best,
[Name]
[Title], User Solutions
[Site URL]
```

**Expected response rate:** 10-25%

### Template 9 — HARO response

**Use for:** HARO / Qwoted / Terkel queries.

```
Subject: HARO — [exact subject line from the query]

Hi [Reporter name],

Responding to your query on [specific topic]. I'm [your name], [title] at User
Solutions — we've been helping manufacturers with production scheduling since
1991 (35+ years of data to draw from).

**My answer:**

[300-400 word response with specific examples, data points, and direct answers
to the journalist's question. NO marketing language. Must be genuinely useful.]

**Key data point:** [One specific stat or example that makes the quote
memorable]

If you need any clarification or additional angles, I'm happy to provide. Also
happy to do a quick call if that helps for the piece.

Best,
[Name]
[Title], User Solutions
[Site URL]
[Phone if willing]
```

**Expected response rate (of being quoted):** 20-30%

### Template 10 — Follow-up (use ONCE after 5-7 days)

**Use for:** Any template above that didn't get a response.

```
Subject: Re: [original subject]

Hi [First name],

Just bumping this to the top of your inbox in case it got buried. No pressure
either way.

[One-sentence re-state of the ask]

Best,
[Name]
```

**Never send more than one follow-up.** Editors/hosts who ignore two emails are a lost cause — move on to the next prospect.

### Outreach tracking spreadsheet — what columns to use

Track every outreach attempt in a simple Google Sheet with these columns:

| Column | Example |
|---|---|
| Date sent | 2026-04-15 |
| Target URL | industryweek.com/manufacturing-trends |
| Target name | Sarah Jones, Senior Editor |
| Target email | sjones@industryweek.com |
| Template used | Template 5 (Guest post pitch) |
| Subject line | Guest post pitch — Why 70% of APS implementations fail |
| Status | sent / followed-up / responded / published / declined / no-response |
| Result (link) | `industryweek.com/guest-post-url` |
| DR of target | 78 |
| Notes | Follow-up on 4/22 |

Weekly review: what's converting, what's not, adjust templates.

---

## Quality Lead Generation from Organic Search

Rankings and backlinks are means to an end: **qualified leads that turn into customers**. This section covers how to systematically convert organic search traffic into sales conversations.

### The lead quality funnel

Not all organic traffic is equal. Here's how to think about intent:

| Search intent | Example query | Lead quality |
|---|---|---|
| **Transactional (buying now)** | "buy production scheduling software", "rmdb pricing", "production scheduling demo" | 🔥🔥🔥 Hottest |
| **Commercial (comparing)** | "rmdb vs mrpeasy", "best production scheduling software", "mrpeasy alternative" | 🔥🔥 Hot |
| **Problem-aware (solution shopping)** | "why is our schedule always wrong", "replace excel scheduling" | 🔥 Warm |
| **Informational (learning)** | "what is finite capacity scheduling", "how to calculate OEE" | Cold |
| **Navigational (brand search)** | "user solutions" | N/A (already know you) |

**Rule:** spend 80% of lead-gen effort on transactional + commercial queries. These are the people who WILL buy in the next 3-6 months.

### Tactic 1 — Capture comparison shoppers (the hottest organic leads)

**Who:** People landing on `/blog/rmdb-vs-*` or `/compare-products/rmdb-vs-*` pages.

**Why hottest:** They typed a competitor name + "alternative" or "vs" — they are ACTIVELY evaluating 2-3 options and will buy from ONE of them within 90 days.

**Capture tactics (implement in order of impact):**

1. **Prominent CTA above the fold on every comparison page**
   - Current: your pages have CTAs but they're below the comparison matrix
   - Add: a "See RMDB in action" sticky sidebar CTA or top banner
   - Copy: "Get a 30-min demo with your own data — no slide deck"

2. **Exit-intent popup on comparison pages only**
   - Trigger: mouse moves toward browser back button
   - Offer: "Before you go — download our free MRPeasy migration guide"
   - Gate: email only (low friction)
   - Tool: `@chargebee/exit-intent-popup` or similar, or build custom

3. **Scroll-depth tracking + timed popup**
   - Trigger: user scrolls 70% of page content (shows high interest)
   - Offer: "Schedule a 20-min call with an implementation specialist"
   - Gate: calendar link (no form friction)
   - Tool: GA4 custom event + LinkedIn/Clarity tracking

4. **Retargeting pixel**
   - Install: LinkedIn Insight Tag + Facebook Pixel on comparison pages
   - Retarget: users who visited but didn't convert — show them ads for 30 days
   - Budget: $200-$500/month for meaningful reach
   - Tool: LinkedIn Campaign Manager, Meta Ads Manager

5. **Live chat on comparison pages specifically**
   - Tool: Intercom, Crisp (free tier), or Drift
   - Trigger: user on comparison page for 45+ seconds
   - Prompt: "Comparing RMDB to MRPeasy? Happy to answer specific questions."
   - Response time: within 2 minutes = 10x higher conversion

### Tactic 2 — Content upgrades (lead magnets tied to specific posts)

**What:** Gated content upgrades offered inside blog posts as "bonus resources."

**Why it works:** Someone reading a 2000-word article is deeply engaged. Offer them a related PDF/checklist/template to capture their email.

**High-value content upgrades to create:**

| Blog post topic | Content upgrade offer |
|---|---|
| "How to Calculate OEE" | Free OEE calculation Excel template (you already have this!) |
| "Production Scheduling Software Comparison Guide" | Free APS vendor scorecard PDF |
| "Implementation Checklist" | Printable 5-day implementation framework |
| "How to Choose Scheduling Software" | RFP template for manufacturing software |
| "Finite vs Infinite Capacity Planning" | Capacity calculator Excel file |
| Case study posts | Industry-specific ROI calculator |

**Implementation:**
1. Build a simple email-gated form component
2. Add it to the top 20 blog posts (highest-traffic first per GSC)
3. Send the content upgrade via automated email (eventually — for now, manual send from an inbox)
4. Track conversion rate per post → optimize high-performers

**Note:** The user said "no CRM for now" — until a CRM is adopted, use a simple mailto-based flow or a Typeform/Tally.so free form that forwards to your inbox. You manually send the content upgrade.

### Tactic 3 — "Impressions but no clicks" prospecting (hidden gold in GSC)

**What:** GSC shows queries where you rank but nobody clicks. These are often high-intent buyers who chose a competitor. Find out which, and pitch them directly.

**Workflow:**
1. GSC → Performance → Queries
2. Filter: position 1-10, clicks = 0, impressions 50+
3. For each high-intent query with no clicks, check SERP manually — who IS getting clicks?
4. Reverse engineer: what does the winner have that you don't? Fix it on your page.
5. Bonus: if you can identify specific companies searching, cold-outreach them directly via LinkedIn

**Example:**
- Query: "aerospace production scheduling software"
- Your ranking: #7
- Clicks: 0/month
- Impressions: 180/month
- Winner: SAP's aerospace page (ranking #1)
- Fix: your page needs more specific aerospace language, ITAR compliance mention, AS9100 references, and a customer logo from aerospace

### Tactic 4 — LinkedIn Sales Navigator intent mining

**What:** Identify companies whose employees are engaging with your content on LinkedIn.

**Why it works:** When a manufacturing operations manager "likes" your production scheduling post on LinkedIn, that's an intent signal. Their company might be in the buying cycle.

**Workflow:**
1. LinkedIn Sales Navigator (paid: $99/mo — worth it for B2B SaaS)
2. Create a "Prospects" list based on title filters: Operations Manager, Plant Manager, VP Operations, Production Manager, CFO of manufacturing companies
3. Geographic filter: US (or your target regions)
4. Company size: 10-500 employees
5. See who's engaging with your posts → add them to a warm outreach list
6. Personal connection request with context: "Saw you engaged with my post on [topic]. I'd love to compare notes on production scheduling."

**Expected:** 5-15 qualified conversations per month after 6 months of LinkedIn content rhythm.

### Tactic 5 — Google Ads for branded competitor keywords (paid but essential)

**What:** Bid on "mrpeasy alternative", "katana alternative", "[competitor] pricing" queries.

**Why:** These are the hottest possible buying signals. Paid ads let you capture them INSTANTLY instead of waiting for organic rankings. Cost: $2-$8/click for manufacturing SaaS, typically.

**Campaign setup:**
- Branded: `"rmdb"`, `"user solutions"`, `"resource manager db"` — ~$0.50-$1.50/click, essential for brand defense
- Competitor alternative: `"mrpeasy alternative"`, `"katana alternative"`, etc. — $3-$8/click
- Budget: $500-$1,500/month for mid-market manufacturing SaaS

**Landing pages:** already have them! `/compare-products/rmdb-vs-*` and `/blog/rmdb-vs-*`. Drive paid traffic there.

**Tool:** Google Ads, Microsoft Ads (Bing — cheaper CPC, smaller audience)

### Tactic 6 — Intent data providers (advanced)

**What:** Third-party tools that show which companies are researching specific topics across the web.

**Tools:**
- **Bombora** — $1,000+/mo, shows "surge accounts" researching your topics
- **6sense** — enterprise-tier, predictive intent scoring
- **Zoominfo Intent** — $15k+/year, integrated with their B2B database

**Why:** If 6sense tells you that `AcmeManufacturing.com` has been researching "production scheduling software" for 3 weeks, you can cold-outreach them with near-certainty they're in-market.

**Priority:** Only valuable at $500k+ ARR. Skip for now.

### Tactic 7 — Convert organic traffic with smart conversion tracking

**Set up GA4 conversion events for:**
1. **Demo request form submit** (hot lead)
2. **Free trial download** (medium-hot)
3. **Content upgrade download** (warm lead)
4. **Time on comparison page > 2 min** (warm lead — high intent signal)
5. **3+ pages visited in session** (engaged researcher)
6. **Return visit within 7 days** (active evaluator)
7. **LinkedIn profile visit from site** (if ever exposed)

**Then:** report weekly on conversion events per source (organic vs direct vs referral), per landing page, per campaign. Double down on what converts; kill what doesn't.

### Lead scoring (even without a CRM)

Use a simple spreadsheet to score each inbound lead:

| Signal | Points |
|---|---|
| Came from `/compare-products/rmdb-vs-*` | +20 |
| Came from `/excel-templates/*` | +10 |
| Came from glossary/informational post | +2 |
| Visited pricing page | +30 |
| Watched demo video >50% | +25 |
| Filled demo request form | +50 |
| Company size 20-500 employees | +10 |
| Manufacturing industry match | +10 |
| Job title: Operations Manager, Plant Manager, VP Ops | +15 |
| Visit frequency: 3+ visits in 30 days | +15 |

**Threshold for sales follow-up:** 50+ points.

### Organic lead gen dashboard — what to track

Add these columns to your SEO Ops Dashboard spreadsheet:

| Metric | Source | Review cadence |
|---|---|---|
| Organic sessions (monthly) | GA4 | Weekly |
| Top 10 converting landing pages | GA4 | Weekly |
| Demo requests from organic | GA4 conversions | Weekly |
| Free trial downloads from organic | GA4 conversions | Weekly |
| Comparison page dwell time | GA4 | Monthly |
| Branded search volume growth | GSC | Monthly |
| Hottest leads (50+ score) | Manual spreadsheet | Weekly |

---

## Success metrics — how to measure this whole thing

Track these in your SEO Ops Dashboard (Google Sheet is fine).

### Lagging indicators (the actual results)

| Metric | Month 1 | Month 3 | Month 6 | Month 12 |
|---|---|---|---|---|
| Organic sessions (GA4) | +0% | +20-40% | +60-100% | +150-250% |
| Indexed pages (GSC) | 80% of submitted | 95% | 98% | 99% |
| Keywords in top 10 (Ahrefs/Semrush) | baseline | +30 | +100 | +250 |
| Referring domains (Ahrefs) | baseline | +10 | +30 | +75 |
| GBP CTA clicks | 0 | 30/week | 50/week | 100/week |
| Capterra views | 0 | 100/month | 300/month | 800/month |
| Demo requests (from organic) | baseline | +25% | +75% | +200% |

### Leading indicators (what you control)

| Activity | Weekly target |
|---|---|
| GBP posts | 5 |
| HARO responses | 3 |
| Guest post pitches | 1-2 |
| Customer review requests | 2-3 |
| New blog posts | 1-2 |
| Directory submissions (month 1 only) | 8 total |

If the leading indicators hit target consistently, the lagging indicators will follow. If the leading indicators drop off, the lagging indicators will stall.

---

## Budget expectations

This strategy is designed to be **mostly free**. Here's the optional paid tier:

| Tool | Price | Why |
|---|---|---|
| **Ahrefs or Semrush** | $99-$399/mo | Professional keyword research, backlink analysis, rank tracking. Pick one. Essential for month 3+. |
| **Shutterstock** (already have) | ~$30/mo | Hero images for blog + GBP posts |
| **HARO Pro** (optional) | $19/mo | Bigger query volume, priority notifications. Start with free. |
| **Capterra paid features** (optional) | ~$200/mo | Pay-per-click leads. Only if organic reviews aren't landing demos. Start with free listing. |
| **LinkedIn Premium Business** | $60/mo | Better outreach for guest post pitches. Optional. |

**Recommended starting budget: $100-130/month** (Ahrefs or Semrush + Shutterstock + HARO free tier). Scale up only when the first month's results justify it.

---

## What to do if results stall

If after 90 days you're not seeing ranking improvements:

1. **Check indexing** — GSC Coverage report. Are your new pages indexed? If not, the issue is technical, not content.
2. **Check for manual actions** — GSC Security & Manual Actions. If Google has penalized the site, fix that first.
3. **Check Core Web Vitals** — GSC Core Web Vitals report. Poor mobile performance kills rankings.
4. **Check backlink profile** — Ahrefs / Semrush. If you have 0-5 referring domains, no amount of on-page work will rank you against MRPeasy (they have 2,000+).
5. **Re-run the keyword tracker** — have cluster/keyword relationships changed? Are new gaps appearing?
6. **Check query intent** — GSC Performance tab, filter by query. Are you ranking for the RIGHT queries (commercial), not just informational ones that don't convert?

---

## Handoff to Claude for next session

When I (Claude) come back to help with this:

1. **Read `MEMORY.md` first** — it has the current state, lessons learned, and Next Moves
2. **Read `content/seo/keywords.json`** — know current coverage before recommending new pages
3. **If you need to update the GBP calendar** — run `node scripts/seo/generate-gbp-calendar.mjs`
4. **If new blog posts are added** — re-run the keyword tracker AND the GBP calendar generator
5. **If the user asks for help with a specific directory submission** — the profiles/descriptions for Capterra/G2/etc. should match the `App Description` in `constants/app-info.ts` and the long-form content in `public/llms-full.txt`

---

## Quick reference — tools mentioned

| Tool | URL |
|---|---|
| Google Search Console | `https://search.google.com/search-console` |
| Bing Webmaster Tools | `https://www.bing.com/webmasters` |
| Microsoft Clarity | `https://clarity.microsoft.com/` |
| Google Business Profile | `https://business.google.com/` |
| Capterra | `https://www.capterra.com/vendors/sign-up` |
| G2 | `https://www.g2.com/products/new` |
| SoftwareAdvice | `https://www.softwareadvice.com/vendors/` |
| GetApp | `https://www.getapp.com/pages/vendors/` |
| TrustRadius | `https://www.trustradius.com/vendor/signup` |
| AlternativeTo | `https://alternativeto.net/` |
| HARO / Connectively | `https://www.connectively.us/` |
| Qwoted | `https://qwoted.com/` |
| Ahrefs | `https://ahrefs.com/` |
| Semrush | `https://www.semrush.com/` |
