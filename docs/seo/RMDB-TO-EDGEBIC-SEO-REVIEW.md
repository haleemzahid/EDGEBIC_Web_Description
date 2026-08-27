<!-- Generated 2026-08-24 by a three-agent review: RMDB expert pack + EDGEBIC expert pack + agentic-infrastructure review, consolidated by an SEO expert agent. Prime directive: complete the EDGEBIC conversion without losing RMDB organic traffic. Recommendations only; nothing here has been applied. -->

# SEO Review: RMDB → EDGEBIC conversion without traffic loss

> ## Implementation status (updated 2026-08-24)
>
> **Phase 1 APPLIED** (uncommitted): `$49` removed from all four emitters
> (`[matrixSlug]` schema + its cost FAQ, `/edgebi`, `/machine-monitoring-software`);
> dead `/docs` link removed from footer, 404 page, `/developers`, `llms.txt`,
> `agent-markdown.ts`, and the verify script; cost page added to
> `MEDIUM_PRIORITY_PAGES` and `Routes`.
>
> **Phase 2 APPLIED** (uncommitted): canonical `@id` graph introduced in
> `lib/seo/schema-nodes.ts`; `SoftwareApplicationJsonLd` extended with `id`,
> `alternateName`, `availability`, `sameAs`, `successorOf`, `predecessorOf`,
> `isBasedOn`, `isVariantOf`; `FeaturePageJsonLd` retargeted from RMDB/$4,000 to
> the canonical EDGEBIC node (fixes 18 pages with no caller edits); homepage and
> `/resource-manager-db-2` titles; RMDB page schema rebuilt with no offer;
> comparison template carries both products; 53 state-page FAQs corrected;
> breadcrumb brand casing; `/pricing` added to nav and footer; cost page
> de-orphaned.
>
> **NOT yet done:** C9 blog-vs-comparison canonical decisions (needs GSC data),
> C7 hub `ItemList` + expanding the hub grid to all 30 children, C11/C12 FAQ
> subject rewrites on `/production-scheduling-software`,
> `/finite-capacity-scheduling-software` and `/manufacturing-software`, D4 legacy
> RMX/WCXL offers, F2 markdown negotiation for product pages, F4 generated
> `llms.txt`, F5 CI wiring.
>
> Ship order and the per-change monitoring plan are unchanged: see section B and
> section G. Ship no more than one NEEDS CARE change per two-week window.

Scope: repo `d:\Usersolutons\EDGEBIC Description\EDGEBIC_Web_Description`, branch `feature/edgebic-promotion` (45 commits ahead of `origin/main`, 0 behind, verified via `git log --oneline origin/main..HEAD`). All line numbers below were read from disk, not inferred from the packs. Items I could not confirm are marked **unverified**.

---

## A. Executive verdict

The conversion is roughly 60 percent done and the finished 60 percent is the safe part: `/edgebic`, `/pricing`, `/production-scheduling-software-cost`, `/rmdb-to-edgebic`, `/edgebic-erp-integration`, 1,884 blog posts and the `EdgebicSuccessorCallout` on all three legacy product pages are additive, and they were built on new URLs without touching a single ranking RMDB URL. The unfinished 40 percent is where the traffic risk sits: 30 `/compare-products/rmdb-vs-*` pages, 10 `/blog/rmdb-vs-*` posts, 53 state pages, 18 `FeaturePageJsonLd` callers and ~186 `[matrixSlug]` pages still publish RMDB as an actively-sold product with a live `InStock` `Offer`, while `/pricing` publishes a `FAQPage` answer saying RMDB is not sold. That contradiction is now machine-readable in two directions on the same domain, which is the single worst thing here for AI answers and for Google's understanding of the entity.

**Top 3 traffic risks.** (1) The homepage title in this branch drops the tokens "Job Shop & Manufacturing Scheduling Software" that `origin/main` ranks on, replacing them with "EDGEBIC", a brand no one searches yet; that is a one-line change to `app/(app)/(marketing)/page.tsx:14-15` with sitewide consequences. (2) Structured-data contradiction: `price="49"` on ~186 matrix pages plus `/edgebi`, `$4,000 InStock` RMDB on 18 feature pages and on 53 state-page FAQ answers, `$5,000 InStock` on 30 comparison pages, against `/pricing` saying none of it is sold. Google will pick one and it may not be the one you want. (3) `/docs` is a hard 404 (`content/docs` does not exist, `allDocs` is empty, `docs/[[...slug]]/page.tsx` calls `notFound()`), yet this branch adds a sitewide footer link to it at `components/marketing/marketing-links.tsx:486`, and it is also linked from `app/(app)/not-found-content.tsx:73`, `developers/page.tsx:96` and `public/llms.txt:233`.

**Top 3 opportunities.** (1) 20 programmatic comparison pages (`rmdb-vs-plex`, `rmdb-vs-cetec-erp` and 18 others) have **zero** internal links from any rendered page; they appear only in `data/programmatic/competitors.ts`, `content/seo/programmatic-pages-cache.json` and the sitemap. Linking them from the hub is free equity on 20 URLs already ranking on nothing but sitemap discovery. (2) `/production-scheduling-software-cost` is the strongest commercial asset on the site (published price in a quote-only category) and it is completely orphaned, has priority 0.5, and carries no `Offer` in schema despite naming real prices at lines 96-101 and 188-196. (3) 1,884 posts link to `/edgebic` (1,830 verified by grep) and `/edgebic` links back to nothing but `/contact-us` and `/rmdb-to-edgebic`; turning that dead end into a hub is the highest-leverage internal-link change available.

---

## B. Migration-safety plan

### Before the merge: what to verify on the 45-commit branch

The branch touches 2,459 files, but only a handful change anything a ranking URL depends on. Verify these five, in this order.

**B0.1 Homepage metadata swap. NEEDS CARE.** `app/(app)/(marketing)/page.tsx:14-20`. Diff versus `origin/main`:

- was: `'RMDB — Job Shop & Manufacturing Scheduling Software | User Solutions'`
- becomes: `'EDGEBIC Production Scheduling Software | RMDB Successor | User Solutions'`

The description also drops "Excel-native", "No ERP replacement needed", "Works with SAP, QuickBooks, Epicor" and "Free trial". Before merging, pull the GSC Performance report for `https://usersolutions.com/` filtered to the last 6 months and list the top 20 queries by clicks. If "job shop scheduling software", "manufacturing scheduling software" or any Excel/ERP-modifier query is in that list, do not ship the title as written. See C1 for the replacement string.

**B0.2 `/pricing` swap from the $49 clipboard theme block to real pricing. SAFE, ship it.** Commit `04507857`. This replaces a `FAQPage` about PDF keyboard shortcuts with seven real pricing questions and two `SoftwareApplicationJsonLd` nodes at `$25,000` and `$35,000` (`pricing/page.tsx:68-91`). There is no downside; `/pricing` currently ranks on nothing because it described the wrong product.

**B0.3 Sitemap priority changes. SAFE.** `git diff origin/main..HEAD -- app/sitemap.ts` is exactly +3 lines: `'edgebic'` added to `HIGH_PRIORITY_PAGES` (`app/sitemap.ts:14`), `'rmdb-to-edgebic'` and `'edgebic-erp-integration'` added to `MEDIUM_PRIORITY_PAGES` (`:24-25`). Critically, `'resource-manager-db-2'` is **not** removed from `HIGH_PRIORITY_PAGES` (`:15`). Nothing is demoted. Ship as is, then add `'production-scheduling-software-cost'` to `MEDIUM_PRIORITY_PAGES` (see C4).

**B0.4 `/compare-products` hub body rewrite. SAFE for links, NEEDS CARE for metadata.** I diffed the outbound links before and after: both versions link the same 15 comparison URLs (9 `/blog/rmdb-vs-*` at `page.tsx:374-422`, 6 `/compare-products/rmdb-vs-*` at `:430-460`). No comparison page loses its hub link in this branch. The problem is pre-existing and untouched: `layout.tsx:4` still says "RMDB vs Alternatives" while the body now compares only EDGEBIC APS vs Complete. Fix per C7 before or immediately after merge.

**B0.5 `/faq` full content swap. NEEDS CARE.** `app/(app)/(marketing)/faq/page.tsx` replaces every RMDB question with an EDGEBIC equivalent, including deleting "What is Resource Manager DB (RMDB)?" and "What is the difference between RMDB and EDGEBI?" from the `FAQPage` schema. `/faq` is in `HIGH_PRIORITY_PAGES` (`app/sitemap.ts:19`). Before merge, check GSC for `/faq` on RMDB-branded queries. The mitigation in C15 keeps both.

### Ordered shipping sequence

**Phase 1, ship first (all SAFE, all pure fixes with no ranking-intent change):**

1. **Remove the `$49` theme price from three emitters.** `app/(app)/(marketing)/[matrixSlug]/page.tsx:70`, `app/(app)/(marketing)/edgebi/layout.tsx:18`, `app/(app)/(marketing)/machine-monitoring-software/page.tsx:76`. Verified by `grep -rn 'price="49"' app/ components/`. This is ~188 URLs publishing a false `Offer` and it earns nothing. Highest volume, lowest risk.
2. **Fix or remove the `/docs` link.** `marketing-links.tsx:486` and `:528`, `not-found-content.tsx:73`, `developers/page.tsx:96`, `public/llms.txt:233`. Either publish `content/docs/*.mdx` or remove the four links. A sitewide footer link to a 404 wastes crawl budget on every page on the site.
3. **Add `production-scheduling-software-cost` to `MEDIUM_PRIORITY_PAGES`** (`app/sitemap.ts:23-65`) and add `ProductionSchedulingSoftwareCost = '/production-scheduling-software-cost'` to `constants/routes.ts`.

**Phase 2 (NEEDS CARE, ship one at a time with 2 weeks between):**

4. Homepage title per C1, and `/resource-manager-db-2` title per C5.
5. The canonical `@id` refactor of `components/seo/json-ld.tsx` plus the `FeaturePageJsonLd` product swap (Section D). Ship the component change and all 18 caller pages in one deploy so schema and visible copy never disagree mid-flight.
6. The comparison-template additive EDGEBIC block (C8). Template only, no data-file churn, no H1 changes, no slug changes.
7. State-page FAQ answer at `production-scheduling-software/[state]/page.tsx:62` (C13). This is 53 URLs at once, so hold it until 4-6 has settled.

**Phase 3 (internal links, SAFE, can run in parallel with Phase 2):**

8. Everything in Section E.

**DO NOT DO, at any phase:**

- **DO NOT 301 any `/compare-products/rmdb-vs-*` URL to an `/edgebic-vs-*` equivalent.** Thirty URLs carry the "rmdb vs X" and "X alternative" query set. A 301 to a page whose H1 does not contain "RMDB" bleeds relevance on the exact token that ranks.
- **DO NOT rename slugs.** `rmdb-vs-*` is the ranking string in the URL.
- **DO NOT noindex `/resource-manager-db-2`, the 10 `/blog/rmdb-vs-*` posts, or the 53 state pages.**
- **DO NOT remove "RMDB" from any H1.** `components/marketing/compare/comparison-page.tsx:163-165` renders `data.h1` which begins "RMDB vs ..." on all 30 pages. Leave it.
- **DO NOT demote `resource-manager-db-2` out of `HIGH_PRIORITY_PAGES`** to make room for EDGEBIC pages. Both can be 0.9.
- **DO NOT blanket rel=canonical the `/blog/rmdb-vs-*` posts to their `/compare-products/` twins** without checking GSC first. See C9.
- **DO NOT add `aggregateRating` scraped from Capterra or G2.** See D.

---

## C. Page-by-page changes

### C1. `/` homepage
**File:** `app/(app)/(marketing)/page.tsx:13-21`
**Problem:** the branch swaps a title that carries proven head tokens for one that leads with an unsearched brand. Also `NTClipboardHero` (line 8) is theme residue, and `EdgebicAnnouncement` is commented out at line 28 rather than placed.

**Title, exact string:**
```
EDGEBIC Job Shop & Manufacturing Scheduling Software | User Solutions
```
This keeps the four ranking tokens from `origin/main` ("Job Shop", "Manufacturing", "Scheduling", "Software") in the same order and swaps only the leading brand token. "RMDB Successor" moves to the description, where it costs nothing.

**Description, exact string:**
```
EDGEBIC is the current generation of Resource Manager DB (RMDB): finite capacity scheduling for job shops and manufacturers, trusted by GE, Cummins, BAE Systems and the US Navy for 35 years. Works with SAP, QuickBooks and Epicor. No ERP replacement needed.
```
This restores the "Excel/ERP/no replacement" modifiers the branch deleted and adds the RMDB entity link.

**Keywords:** keep the branch value; it already retains `RMDB, Resource Manager DB` in the tail.

**Copy adds:** uncomment `<EdgebicAnnouncement />` at line 28 and place it directly below the hero. An above-the-fold "RMDB is now EDGEBIC" band is exactly the human-readable signal that makes a brand migration legible to both users and crawlers.

**Internal links to add:** `/edgebic`, `/pricing`, `/production-scheduling-software-cost`, `/resource-manager-db-2`.

**Schema:** the homepage currently emits only `OrganizationJsonLd` and `WebSiteJsonLd` from `app/layout.tsx:121-122`. Add a reference-only `SoftwareApplicationJsonLd` pointing at the canonical EDGEBIC `@id` (Section D) so the homepage participates in the product graph.

---

### C2. `/edgebic`
**File:** `app/(app)/(marketing)/edgebic/page.tsx`
**Problem:** it is a link dead end. Outbound links are `Routes.Contact` (`:204`, `:454`) and `Routes.RmdbToEdgebic` (`:210`) only. Its own JSON-LD sets `offerUrl="/pricing"` (`:140`, `:163`) but the string "$25,000" never appears in the body, and there is no link to `/pricing`. `/edgebic-erp-integration` is described in plain prose at `:125` with no anchor.

**Title:** keep `'EDGEBIC - Next-Generation Finite Capacity Planning & Scheduling Software'` (`:18`). Do not change it; it is 4 months old and already accumulating brand impressions.

**H1:** keep `:190-193`.

**Copy adds:** add a short pricing paragraph after the fact table (`:257-302`) stating "$25,000 (EDGEBIC APS) or $35,000 (EDGEBIC Complete), one-time perpetual licence" with a link to `/pricing`. Add one row to the fact table: `['Price', '$25,000 APS / $35,000 Complete, one-time']`. Answer engines quote that table.

**Internal links to add (six):** `/pricing`, `/production-scheduling-software-cost`, `/compare-products`, `/edgebic-erp-integration`, `/resource-manager-db-2` (reciprocal to the legacy page), and `/blog/edgebic-complete-guide` (the `edgebic-platform` cluster pillar, 182 posts behind it).

**Schema:** replace the two hand-rolled nodes at `:134-173` with `@id`-bearing nodes per Section D, adding `successorOf` and `isBasedOn` pointing at the RMDB node.

---

### C3. `/pricing`
**File:** `app/(app)/(marketing)/pricing/page.tsx`
**Problem:** not reachable from the header or footer. `Routes.Pricing` (`constants/routes.ts:30`) is referenced by zero navigation components; a grep of `components/marketing/marketing-links.tsx` for "pricing" returns nothing. Second problem: `:75` and `:86` set `url="/pricing"` while `edgebic/page.tsx:137,160` set `url="/edgebic"` for nodes with the identical `name` and `price`. That is two `SoftwareApplication` entities called "EDGEBIC APS" at two URLs with no `@id` to unify them.

**Title:** keep `'EDGEBIC Pricing: $25,000 APS, $35,000 Complete, One-Time License'` (`:9`). It is excellent and it is the site's strongest differentiator.

**H1:** `EdgebicPricing` emits its own `<h1>EDGEBIC pricing</h1>` at `components/marketing/sections/edgebic-pricing.tsx:71-73`. Change to `EDGEBIC pricing: $25,000 APS, $35,000 Complete` so the H1 carries the number that the title promises.

**Copy adds:** one paragraph answering the RMDB question in visible copy, not just in the FAQ accordion, linking to `/rmdb-to-edgebic` and `/resource-manager-db-2`.

**Internal links to add:** `/production-scheduling-software-cost`, `/compare-products`, `/rmdb-to-edgebic`, `/edgebic`.

**Nav:** add `{ name: 'Pricing', href: Routes.Pricing }` to `MENU_LINKS` (`components/marketing/marketing-links.tsx:45` block) and to the Products column of `FOOTER_LINKS` (`:335`).

**Schema:** both nodes must carry the same `@id` as the `/edgebic` nodes (Section D). Add `featureList`; the packs correctly note these nodes have none.

---

### C4. `/production-scheduling-software-cost`
**File:** `app/(app)/(marketing)/production-scheduling-software-cost/page.tsx`
**Problem:** zero inbound internal links (verified: `grep -rl "production-scheduling-software-cost" content/blog/` returns 0). Sitemap priority 0.5 because the slug is in neither priority set in `app/sitemap.ts:12-65`. `FAQJsonLd` only (`:87`), with no `SoftwareApplication` and no `Offer` even though the body states real prices at `:96-101` and `:188-196`.

**Title:** keep `'How Much Does Production Scheduling Software Cost? (2026 Prices)'` (`:9`). Exact-match to the head query.

**H1:** keep `:91-93`.

**Copy adds:** none. The honesty guardrails at `:139-143` (third-party estimates labelled) and `:163-181` ("Where EDGEBIC is the wrong answer") are the reason this page will earn AI citations. Do not touch them.

**Internal links to add:** inbound from `/pricing`, `/edgebic`, `/compare-products`, `/manufacturing-software`, `/production-scheduling-software`, plus the footer Resources column. Outbound: add `/compare-products` and `/edgebic`.

**Schema:** add the two canonical EDGEBIC `SoftwareApplication` reference nodes with `offers` at `25000` and `35000`, `offerUrl: /pricing`. The body already makes the claim; the schema is only catching up. Also add `Routes.ProductionSchedulingSoftwareCost` to `constants/routes.ts` and the slug to `MEDIUM_PRIORITY_PAGES`.

---

### C5. `/resource-manager-db-2`
**File:** `app/(app)/(marketing)/resource-manager-db-2/page.tsx`
**Problem, four of them:**
1. `:29` title is `'RMDB | Resource Manager for Excel — Production Scheduling Software'`. It names RMX, a different product with its own page at `/resource-manager-for-excel-2` (schema price `1200` at that page's `layout.tsx:18`). Direct self-cannibalization. It also contains an em dash, against the site content rule.
2. `:34` keyword `'resource manager for excel'` reinforces the cannibalization.
3. `:91-130` hand-rolls the JSON-LD and injects it via `next/script` rather than using `components/seo/json-ld.tsx`. Its `publisher` at `:125-129` is an inline `Organization` object, not `{'@id': ...}`, so it creates a second unlinked company node. `offers.price` is `'4000'` with `availability: InStock` (`:99-104`) against `/pricing` saying it is not sold. `softwareVersion: '2023'` (`:124`).
4. Only two outbound links in the whole page: `/pdf/rmdbquickstart23.pdf` (`:221`) and `/contact-us` (`:265`). Plus the callout and `RelatedSuccessStories` components at `:355-356`. Zero links to `/compare-products`, to any of the 30 comparison pages, or to any of the 18 RMDB blog posts.

**Title, exact string:**
```
Resource Manager DB (RMDB): Production Planning & Scheduling Software
```
Keeps both "RMDB" and "Resource Manager DB", drops the RMX collision, removes the em dash.

**Keywords:** delete `'resource manager for excel'` from `:34`. Keep the other 13.

**H1:** `:313` is `Resource Manager DB`. Change to `Resource Manager DB (RMDB)`. That adds the acronym, which is the higher-volume token, without disturbing the phrase.

**Copy adds:** one paragraph near the top, before the feature list, in this shape: "RMDB remains fully supported for existing installations. New licences are sold as EDGEBIC, the current generation of RMDB, which carries the full RMDB scheduling engine forward." That single sentence resolves the site's central contradiction on the page that owns the RMDB entity.

**Internal links to add (five):** `/compare-products`, at least three high-value comparison children (`/compare-products/rmdb-vs-sap`, `/compare-products/rmdb-vs-epicor`, `/compare-products/rmdb-vs-netsuite`), and a "RMDB comparisons and guides" block linking the 18 RMDB blog posts. This is the biggest single equity-distribution opportunity on the site: a `HIGH_PRIORITY` page currently passing PageRank to nothing.

**Schema:** delete `:91-130` and `:293-298` entirely. Replace with `<SoftwareApplicationJsonLd>` from `components/seo`, using the canonical RMDB node from Section D: `@id`, `alternateName`, `publisher` by `@id`, `sameAs` to the RMDB Capterra and G2 profiles, `predecessorOf` the EDGEBIC node, **no `offers` block at all**, and `softwareVersion` removed or updated. Add `BreadcrumbJsonLd` and an `FAQJsonLd` (the page has none; the 5 questions from `/rmdb-to-edgebic` reworded for RMDB would do).

---

### C6. `/rmdb-to-edgebic`
**File:** `app/(app)/(marketing)/rmdb-to-edgebic/page.tsx`
**Problem:** none serious. This is the cleanest page in the migration: honest framing at `:25-28` ("Is RMDB being discontinued? No."), correct metadata `:14-21`, real `FAQJsonLd` at `:112-117`, and it links `/edgebic` and `/edgebic-erp-integration` at `:229` and `:236`.

**Title:** keep `'Upgrading from RMDB or EDGEBI to EDGEBIC'` (`:15`).

**Copy add:** one sentence reconciling this page's "RMDB is fully supported" with `/pricing`'s "we do not sell RMDB". They are both true and never stated together. Add to the FAQ answer at `:27`: "New licences are sold as EDGEBIC; existing RMDB installations remain fully supported."

**Internal links to add:** `/pricing`, `/production-scheduling-software-cost`, `/resource-manager-db-2` (currently absent, which is odd for a page about upgrading from RMDB), `/compare-products`.

**Schema:** add `BreadcrumbJsonLd` and a two-node block referencing the canonical RMDB and EDGEBIC `@id`s with `predecessorOf`/`successorOf`. This page is the natural home for the successor relationship because its whole topic is the relationship. Promote it to `HIGH_PRIORITY_PAGES` once C5 links to it.

---

### C7. `/compare-products` hub and layout
**Files:** `app/(app)/(marketing)/compare-products/page.tsx` (`'use client'`, line 1), `app/(app)/(marketing)/compare-products/layout.tsx`
**Problem:** `layout.tsx:4` title says "RMDB vs Alternatives"; `page.tsx:36-39` comment says RMDB "is no longer sold and so is not compared here"; the table at `:40-97` compares only EDGEBIC APS vs Complete. A visitor arriving from an "RMDB vs X" SERP lands on EDGEBIC pricing. Second problem: the hub links only 15 of its 40 comparison assets (`:374-460`), so 4 static and all 20 programmatic children get no hub link. Third: no page-level JSON-LD, because the page is a client component.

**Title, exact string (in `layout.tsx:4`):**
```
Production Scheduling Software Comparison 2026 | EDGEBIC and RMDB
```
**Description, exact string (`layout.tsx:5-6`, removing the em dash):**
```
Compare production scheduling software in 2026. EDGEBIC APS vs EDGEBIC Complete side by side, plus 30 RMDB vs alternatives comparisons covering finite capacity, MRP, ERP integration, pricing and implementation time.
```
Keep the keyword string at `:9` exactly as is; "RMDB vs alternatives 2026" is a ranking phrase.

**Copy adds:** a second section titled "RMDB vs alternatives" above the existing comparison-link grid, with one line explaining that RMDB comparisons remain published for customers evaluating against an existing RMDB install, and that EDGEBIC is the current generation.

**Internal links to add:** expand the grid at `:428-460` from 6 to all 30 `/compare-products/rmdb-vs-*` children. This is the single highest-value link change in the review: 20 of those URLs currently have no inbound internal link from any rendered page anywhere on the site (verified: `rmdb-vs-plex` and `rmdb-vs-cetec-erp` appear only in `data/programmatic/competitors.ts` and `content/seo/programmatic-pages-cache.json`). Generate the grid from `listCompetitorSlugs()` (`lib/programmatic/competitors.ts`) so it cannot drift.

**Schema:** add to `layout.tsx` (a server component, so no refactor is needed) a `BreadcrumbJsonLd` and an `ItemList` whose `itemListElement` is the 30 comparison URLs, built from `listCompetitorSlugs()` plus the 10 static folder names. Emitting from the layout is the clean workaround for `page.tsx` being `'use client'`.

---

### C8. The `rmdb-vs-*` template
**Files:** `components/marketing/compare/comparison-page.tsx`, `data/programmatic/competitors.ts`, and the 10 static `app/(app)/(marketing)/compare-products/rmdb-vs-*/page.tsx`
**Problem:** `:119-125` emits `SoftwareApplicationJsonLd name="RMDB - Resource Manager DB" price="5000"` which the helper renders with `availability: 'https://schema.org/InStock'` (hardcoded at `json-ld.tsx:293`). Thirty URLs assert a live $5,000 offer for a product `/pricing` says is not sold. The template mentions EDGEBIC zero times (verified: `grep -in edgebic components/marketing/compare/comparison-page.tsx` returns nothing). The CTAs at `:192` and `:449` send buyers to `/product-downloads` for an RMDB trial.

**Do not change:** `data.h1` rendering at `:163-165`, the slugs, the breadcrumb label "RMDB vs {competitor}" at `:106`, the feature-table "RMDB" column header at `:227`, or the `rmdbWinsAt` / `rmdbBestFor` sections. Those are the ranking surface.

**Schema change (`:119-125`):** drop `price="5000"` and `priceCurrency="USD"`. Point the node at the canonical RMDB `@id`. Immediately below it, add a second `SoftwareApplicationJsonLd` for the canonical EDGEBIC node with `price={AppInfo.EDITIONS.APS.PRICE}` and `offerUrl="/pricing"`, carrying `successorOf: {'@id': <RMDB @id>}`. Result: the page still declares RMDB is what the comparison is about, and additionally declares what you actually sell, at the right price.

**Copy add, inside the existing pricing section (`:266-297`):** relabel the RMDB card heading at `:276-278` from `RMDB` to `RMDB (legacy licence)`, and add a footnote under `:282`: "Historic list price. RMDB is no longer sold as a new licence; existing installations remain fully supported." Then add a third card, driven by `AppInfo.EDITIONS` so no data file changes are needed:
```
EDGEBIC (current generation)  ·  $25,000 APS / $35,000 Complete  ·  One-time perpetual licence
```
This preserves the section's "pricing comparison" intent (the reason the page ranks) while removing the false claim.

**Copy add, after the TL;DR block (`:170-175`):** one sentence, template-level so it lands on all 30 at once: "RMDB is the product this comparison is written about. EDGEBIC is its current generation and carries the same scheduling engine forward; see the upgrade path."

**Internal links to add in the template:** `/edgebic`, `/rmdb-to-edgebic`, `/pricing` and `/production-scheduling-software-cost`. Add them alongside the existing CTAs at `:177-194` and `:435-451`, do not replace `/contact-us` or `/product-downloads`.

**Follow-up data pass (Phase 3, optional):** `data/programmatic/competitors.ts` has 21 occurrences of "$5,000" in `rmdbPrice` and 658 RMDB / 0 EDGEBIC mentions overall. Once the template change is live and stable for 4 weeks, the `pricing.summary` strings can be reworded. Not urgent, because the template footnote already corrects the framing.

---

### C9. `/blog/rmdb-vs-*` (10 posts) versus their `/compare-products/` twins

Four collisions exist. My prescription for each, and none of them is a blind canonical.

| Collision | Verdict |
|---|---|
| `/blog/rmdb-vs-made2manage` and `/compare-products/rmdb-vs-made2manage` | Same slug, two URLs, same intent. **True duplicate.** Pull GSC clicks/impressions for both over 6 months. The winner keeps the query. The loser gets `rel=canonical` to the winner **only if** its 6-month clicks are under ~5; otherwise differentiate: the blog becomes a narrative migration story ("moving off Made2Manage"), the comparison page keeps the spec table, and each links the other. |
| `/blog/rmdb-vs-jobboss` (titled "RMDB vs JobBOSS2") and `/compare-products/rmdb-vs-jobboss2` | Same rule as above. |
| `/blog/rmdb-vs-epicor-aps` and `/compare-products/rmdb-vs-epicor` | **Keep both, no canonical.** These are genuinely different queries: "Epicor Kinetic ERP alternative" versus "Epicor Advanced Planning module alternative". Add one line to each naming the distinction and linking the other. |
| `/blog/rmdb-vs-siemens-opcenter` and `/compare-products/rmdb-vs-preactor` | **Keep both, no canonical.** Preactor and Opcenter APS are the same product under two brand names, which is two distinct query sets with real volume on both. Add "Preactor is now sold as Siemens Opcenter APS" to both pages and cross-link. |

All 10 blog posts also need the same additive EDGEBIC sentence as C8, because `grep -ci edgebic` returns 0 for all of them and they are dated 2026-05-01, after the repositioning began.

---

### C10. `/edgebic-erp-integration`
**File:** `app/(app)/(marketing)/edgebic-erp-integration/page.tsx`
**Problem:** the worst single instance of the `FeaturePageJsonLd` defect. This is an EDGEBIC page whose structured data at `:85-99` declares it is `about` `"RMDB - Resource Manager DB"` at `price: '4000'`, `availability: InStock`. Every visible word on the page says EDGEBIC. Secondary: the title at `:16` contains an em dash, against the site content rule.

**Title, exact string:**
```
EDGEBIC ERP Integration: JobBOSS, Epicor, Fourth Shift and More
```

**H1:** unverified (I read only `:1-60`); check that it matches the new title pattern.

**Copy adds:** none needed; the FAQ set at `:26-52` is strong.

**Internal links to add:** `/pricing`, `/edgebic`, `/compare-products`, and the `edgebic-erp-integration` blog pillar (151 posts in that cluster, 208 of which already link here per the EDGEBIC pack).

**Schema:** the `FeaturePageJsonLd` `about` must become the canonical EDGEBIC node. See D1.

---

### C11. `/production-scheduling-software`
**File:** `app/(app)/(marketing)/production-scheduling-software/page.tsx`
**Problem:** `MEDIUM_PRIORITY` head-term page; FAQ Q1 at `:27-29` is "What makes RMDB different from other production scheduling software?" and every one of the four answers names RMDB. `FeaturePageJsonLd` at `:50-56` publishes RMDB at $4,000 InStock. Zero EDGEBIC mentions.

**Title:** keep `'Production Scheduling Software'` (`:19`). It is the exact head term and it should not be touched.

**Copy change, FAQ Q1, exact replacement:**
```
Q: What makes EDGEBIC different from other production scheduling software?
A: EDGEBIC, the current generation of Resource Manager DB (RMDB), combines finite capacity scheduling across machines, labor, materials and tooling simultaneously, which most production schedulers cannot do. It works standalone or as an add-on to your existing ERP, reading your current data formats with no migration required. Trusted across the User Solutions product line from the USS Nimitz to Cummins Engine across 33 locations.
```
This keeps "RMDB" as a token in the answer (preserving the entity match) while making EDGEBIC the subject, so the visible copy and the corrected schema agree. Apply the same pattern to Q2, Q3 and Q4 at `:31-43`: swap the subject, keep the RMDB mention and every proof point.

**Internal links to add:** `/edgebic`, `/pricing`, `/production-scheduling-software-cost`, `/resource-manager-db-2`.

**Schema:** `FeaturePageJsonLd` `about` becomes the canonical EDGEBIC node, no `$4,000` offer. See D1.

---

### C12. `/finite-capacity-scheduling-software` and `/manufacturing-software`
**Files:** `app/(app)/(marketing)/finite-capacity-scheduling-software/page.tsx`, `app/(app)/(marketing)/manufacturing-software/page.tsx`

**`/finite-capacity-scheduling-software`:** title `'Best Finite Capacity Scheduling Software 2026 for Manufacturers'` (`:19`) is good, keep it. FAQ answers at `:31-45` name RMDB 11 times. Apply the C11 rewrite pattern. Note the answer at `:39` says "RMDB leverages Excel calculation speed" which is factually an RMX claim, not an RMDB one, and is a candidate for correction while you are in there. The `FeaturePageJsonLd` call at `:53-59` gets the D1 fix.

**`/manufacturing-software`:** title `'Manufacturing Software for Scheduling, MRP, Inventory & Analytics'` (`:19`), keep it. The FAQ at `:31` describes the retired three-product ladder verbatim: "RMDB for scheduling and MRP, EDGEBI for analytics, and Resource Manager for Excel for spreadsheet-based teams." That directly contradicts `/pricing:54-56` and `public/llms.txt:48-61`, and it is the answer most likely to be quoted by an AI asked "what does User Solutions sell". Replace with the two-edition model, keeping the RMDB and EDGEBI names as heritage: "User Solutions provides this as EDGEBIC, sold in two editions: EDGEBIC APS for scheduling and optimization, and EDGEBIC Complete which adds MRP, inventory and purchasing. EDGEBIC is the current generation of Resource Manager DB (RMDB) and EDGEBI." Apply the same to `:35`, `:39` and `:43`.

Both pages: add links to `/edgebic`, `/pricing`, `/production-scheduling-software-cost`.

---

### C13. The 53 `[state]` pages
**File:** `app/(app)/(marketing)/production-scheduling-software/[state]/page.tsx`
**Problem:** `buildFaqs()` at `:46-69` produces five RMDB-named questions per state, replicated across 53 URLs and emitted as `FAQPage` schema at `:92`. Line 62 is the worst: "RMDB offers a one-time license fee starting at $4,000 — not a monthly subscription." That is 53 machine-readable false price claims, plus an em dash.

**Titles and H1s:** do not touch. `createPageMetadata` at `:35-40` produces `Production Scheduling Software in {state}` and `stateData.heroHeading` drives the H1. Both are geo-query surfaces with no brand token to lose.

**Copy change, the price answer at `:61-63`, exact replacement:**
```
question: `What is the cost of production scheduling software for ${s.name} manufacturers?`
answer: `EDGEBIC, the current generation of Resource Manager DB (RMDB), is a one-time perpetual licence: $25,000 for EDGEBIC APS and $35,000 for EDGEBIC Complete, with no monthly subscription. That makes it a fixed, known cost for small to mid-size ${s.name} manufacturers compared with SaaS alternatives billed per user indefinitely.`
```
Note the removed em dash and the removed "$500-2,000 per month" competitor claim, which is unsourced and is exactly the kind of figure the cost page deliberately avoids asserting.

For the other four answers (`:49-58`, `:65-67`), swap the subject to EDGEBIC and keep "(RMDB)" in the first mention only. Preserves the entity, fixes the tense.

**Internal links to add:** each state page should link `/production-scheduling-software` (its parent head term), `/pricing` and `/edgebic`. Verify current outbound links; unverified, I read only `:1-120`.

**Schema:** `IndustryPageJsonLd` at `:85-91` is fine; it has no offer. The `FAQJsonLd` at `:92` is fixed by the copy change above. Consider adding the canonical EDGEBIC `SoftwareApplication` reference node.

---

### C14. The `[matrixSlug]` template
**File:** `app/(app)/(marketing)/[matrixSlug]/page.tsx:66-71`
**Problem:** every approved matrix page emits `SoftwareApplicationJsonLd` with `name={`${cell.feature.name} for ${cell.industry.name}`}` and `price="49"`. That is ~186 URLs (count per `listApprovedMatrixSlugs()`, **unverified** as I did not execute code) each declaring a distinct software product that does not exist, priced at a leftover theme value. Every one of them is in the sitemap at priority 0.6 (`app/sitemap.ts:234-239`).

**Titles, H1s, FAQs, breadcrumbs:** do not touch. `buildMatrixMetadata` drives them and they are the entire point of the programmatic family.

**Schema change, exact:** replace lines 66-71 with a node whose `name` is `EDGEBIC` referencing the canonical `@id`, `price={AppInfo.EDITIONS.APS.PRICE}`, `offerUrl="/pricing"`, `applicationSubCategory="Production Scheduling Software"`, and keep the page-specific `description` derived from `cell`. Rationale: the page is a *use case* for one real product, not 186 products. Wrapping the real product with page-specific description keeps every ounce of topical relevance while removing 186 phantom entities and 186 false offers. This is the largest-volume schema defect on the site and the cheapest to fix.

**Also flagged, same class:** `components/marketing/templates/excel-template-page.tsx:71` emits `price="0"` and `jsl-job-scheduler-lite/page.tsx:29` emits `price="0"`. `price="0"` with `InStock` is at least honest for a free download, but it should carry `availability` semantics appropriate to a free asset. Low priority.

---

### C15. `/faq`
**File:** `app/(app)/(marketing)/faq/page.tsx`
**Problem:** the branch replaces every RMDB question with an EDGEBIC one. `/faq` is `HIGH_PRIORITY` (`app/sitemap.ts:19`). The two deleted questions, "What is Resource Manager DB (RMDB)?" and "What is the difference between RMDB and EDGEBI?", are precisely the queries a 35-year-old indexed brand attracts.

**Title:** currently `'Frequently Asked Questions'` (`:15`), which carries no brand token at all. Change to:
```
EDGEBIC and RMDB FAQ: Scheduling Software Questions Answered
```

**Copy adds, and this is the important part:** do not delete the two RMDB questions, **restore them** as a fourth section titled "RMDB and EDGEBI (legacy products)", with answers rewritten to the successor framing:
```
Q: What is Resource Manager DB (RMDB)?
A: Resource Manager DB (RMDB) is the finite capacity production planning, scheduling and tracking software that built the User Solutions track record over 35 years. It remains fully supported for existing installations. New licences are sold as EDGEBIC, which carries the full RMDB scheduling engine forward into one modern application.
```
The branch already retains "RMDB FAQ" in the keyword string at `:20` and already added an upgrade-path question in `IMPLEMENTATION_FAQS`. Adding these two back makes the `FAQPage` schema answer both entity questions from a single URL, which is the ideal outcome for a brand migration.

**Internal links:** the branch changes the bottom CTA from `/resource-manager-db-2` to `/edgebic`. Keep both links rather than swapping.

---

### C16. `/edgebi`
**Files:** `app/(app)/(marketing)/edgebi/layout.tsx`, `app/(app)/(marketing)/edgebi/page.tsx` (`'use client'`)
**Problem:** `layout.tsx:18` emits `SoftwareApplicationJsonLd name="EDGEBI" price="49"`, rendered `InStock`, for a product `llms.txt:48-61` says is not sold. Also emits a `VideoObjectJsonLd` at `:20-26` with `uploadDate="2022-12-01"`.

**Title:** keep `'EDGEBI - Graphical Extension for RMDB'` (`:5`). It is the ranking string and both tokens matter.

**Schema fix:** delete `price="49"` from `:18`. Add `@id: ${baseUrl}/edgebi#edgebi`, `alternateName: ['EDGEBI', 'Edge BI']`, `predecessorOf: {'@id': <EDGEBIC @id>}`. No offer.

**Copy:** `EdgebicSuccessorCallout variant="edgebi"` is already wired in (`page.tsx:9`). Good. Add a visible "no longer sold as a new licence, fully supported" line so the page's copy matches the corrected schema.

---

### C17. `/about`
**File:** `app/(app)/(marketing)/about/page.tsx:6-13`
**Problem:** the description at `:9` says "the company behind RMDB and EDGEBI" and the keyword string at `:12` names `RMDB developer` and `EDGEBI`. EDGEBIC appears nowhere. `/about` is `HIGH_PRIORITY` (`app/sitemap.ts:20`) and is a primary entity-confirmation page for AI answers about the vendor.

**Title:** `'About Us - Manufacturing Software'` (`:7`) is weak. Change to:
```
About User Solutions: 35 Years of Manufacturing Scheduling Software
```
**Description, exact string:**
```
User Solutions, Inc. has built production planning and scheduling software since 1991: EDGEBIC today, and Resource Manager DB (RMDB) and EDGEBI before it. Award-winning finite capacity scheduling trusted by manufacturers worldwide for over 35 years.
```
**Keywords:** prepend `EDGEBIC, EDGEBIC developer,` to `:12`, keep the RMDB and EDGEBI terms.

**Internal links to add:** `/edgebic`, `/resource-manager-db-2`, `/company-history`.

**Schema:** add a page-level reference to `{'@id': '${baseUrl}/#organization'}` as `WebPage.about`, so the About page is explicitly the entity page for the Organization node.

---

## D. Schema plan

### D0. The canonical nodes (decide these first; everything else references them)

Nothing on this site will be consistent until `SoftwareApplicationJsonLd` in `components/seo/json-ld.tsx:244-306` accepts an `@id`. It currently does not, which is why `/edgebic:137` and `/pricing:75` create two different entities both called "EDGEBIC APS". Add these optional props to the component signature: `id`, `alternateName`, `availability`, `sameAs`, `successorOf`, `predecessorOf`, `isBasedOn`, `additionalType`, and change `availability` at `:293` from the hardcoded `'https://schema.org/InStock'` to a prop with `InStock` as the default.

**The single canonical RMDB node** (declared once at `/resource-manager-db-2`, referenced by `@id` everywhere else):

| Property | Value |
|---|---|
| `@type` | `["SoftwareApplication", "ProductModel"]` |
| `@id` | `https://usersolutions.com/resource-manager-db-2#rmdb` |
| `name` | `Resource Manager DB (RMDB)` |
| `alternateName` | `["RMDB", "Resource Manager DB", "Resource Manager-DB", "RMDB - Resource Manager DB"]` |
| `url` | `https://usersolutions.com/resource-manager-db-2` |
| `applicationCategory` | `BusinessApplication` |
| `applicationSubCategory` | `Production Scheduling Software` |
| `operatingSystem` | `Windows` |
| `publisher` | `{"@id": "https://usersolutions.com/#organization"}` |
| `sameAs` | the two `AppInfo.PROFILE_LINKS` values (Capterra `p/9402/Resource-Manager-DB/`, G2 `resource-manager-db-rmdb`) |
| `predecessorOf` | `{"@id": "https://usersolutions.com/edgebic#edgebic"}` |
| `offers` | **omitted entirely** |

**The `offers` decision, and why "omitted" is right.** Schema.org offers three candidate availability values for a supported-but-not-sold product and all three are wrong. `InStock` is a false claim. `Discontinued` (`https://schema.org/Discontinued`) is closer but signals "this product is dead", which contradicts "existing installations remain supported" and is worse than silence for a page you want to keep ranking on "RMDB". `SoldOut` implies temporary. The correct move in the vocabulary is to describe the product and not describe a transaction: `SoftwareApplication` without `offers` is completely valid schema. The multi-typing as `ProductModel` is what makes `predecessorOf` legal vocabulary (it is defined on `ProductModel`, not on `SoftwareApplication`). If you prefer to stay strictly single-typed, use the `CreativeWork` property `isBasedOn` on the EDGEBIC node instead; that is valid on `SoftwareApplication` without any multi-typing. My recommendation is to emit both: `isBasedOn` for guaranteed validity, `successorOf`/`predecessorOf` for the explicit succession signal that answer engines read.

Rich-result cost of dropping the offer: effectively zero. Google's Software App rich result is not served in general web search for business software (**this is my read of current behaviour, treat as unverified**), so the `$4,000`/`$5,000` offers are not earning a SERP feature today. They are only feeding entity understanding and AI answers, where "RMDB, InStock, $4,000" is an active factual error that undermines the $25,000 EDGEBIC price you *do* want quoted.

**The canonical EDGEBIC nodes** (declared once at `/edgebic`, referenced by `@id` from `/pricing`, the cost page, the 18 feature pages, the 186 matrix pages, and the 30 comparison pages):

| `@id` | `name` | Key properties |
|---|---|---|
| `https://usersolutions.com/edgebic#edgebic` | `EDGEBIC` | `@type: ["SoftwareApplication","ProductModel"]`, `successorOf: {"@id": ".../resource-manager-db-2#rmdb"}`, `isBasedOn: {"@id": ".../resource-manager-db-2#rmdb"}`, `alternateName: ["EDGEBIC","EDGE BIC"]`, `publisher: {"@id": ".../#organization"}`, `offers: AggregateOffer` with `lowPrice "25000"`, `highPrice "35000"`, `priceCurrency "USD"`, `offerCount 2`, `url "https://usersolutions.com/pricing"`, `availability InStock` |
| `https://usersolutions.com/edgebic#edgebic-aps` | `EDGEBIC APS` | `isVariantOf: {"@id": ".../edgebic#edgebic"}`, `offers.price "25000"`, `offers.url "/pricing"`, `featureList` from `edgebic/page.tsx:143-155` |
| `https://usersolutions.com/edgebic#edgebic-complete` | `EDGEBIC Complete` | `isVariantOf: {"@id": ".../edgebic#edgebic"}`, `offers.price "35000"`, `offers.url "/pricing"`, `featureList` from `edgebic/page.tsx:166-172` |

Also declare a canonical EDGEBI node `https://usersolutions.com/edgebi#edgebi` with `predecessorOf` the EDGEBIC family node and no offer, so the "successor to RMDB **and** EDGEBI" story is complete in the graph.

### D1 to D8 and A to G: the defect table

| ID | Defect | File and line | Exact fix | Traffic / rich-result rationale |
|---|---|---|---|---|
| **D1 / B** | `FeaturePageJsonLd` hardcodes `about` as `"RMDB - Resource Manager DB"` with `offers.price '4000'`, `availability InStock`, on 18 pages | `components/seo/json-ld.tsx:410-430` (name `:412`, offer `:420-425`) | Delete the hardcoded `about` object. Add required props `productName`, `productId`, `productPrice`, `productOfferUrl`. Default `about` to `{"@id": ".../edgebic#edgebic", "@type": "SoftwareApplication", "name": "EDGEBIC", "offers": {"price": "25000", "url": "/pricing"}}`. Ship together with the C11/C12 copy rewrites so schema and body agree. | 18 head-term pages are the site's main non-brand SEO targets. Right now their machine-readable subject is a discontinued product at a wrong price, which is the exact input an AI answer engine uses to say "User Solutions sells RMDB for $4,000". |
| **D2** | `price="49"` theme residue on `/edgebi`, `/machine-monitoring-software`, and every `[matrixSlug]` page | `edgebi/layout.tsx:18`, `machine-monitoring-software/page.tsx:76`, `[matrixSlug]/page.tsx:70` (verified by grep) | `/edgebi`: delete `price`, add `@id`, `predecessorOf`. `/machine-monitoring-software`: delete `price`, retarget the node to the EDGEBIC `@id`. `[matrixSlug]`: per C14, retarget to the EDGEBIC `@id` at `$25,000`. | Largest-volume defect: ~188 URLs. `$49` on a page selling a $25,000 product is the single most damaging number in the graph, because it is plausible enough to be believed and cheap enough to destroy the value framing. |
| **D3a / A** | `/resource-manager-db-2` hand-rolled JSON-LD: `price '4000'` `InStock`, inline `publisher` Organization (not `@id`), `softwareVersion '2023'`, injected via `next/script beforeInteractive`, no `BreadcrumbList`, no `FAQPage` | `resource-manager-db-2/page.tsx:91-130` and `:293-298` | Delete both blocks. Emit the canonical RMDB node from `components/seo`, no offer, `publisher` by `@id`, plus `BreadcrumbJsonLd` and `FAQJsonLd`. | This is a `HIGH_PRIORITY` page (`sitemap.ts:15`) with the weakest schema on the site, and it is the URL every other RMDB page points at as the product's canonical home. The duplicate unlinked Organization node also fragments the entity graph on the one page where it matters most. |
| **D3b** | State-page FAQ answer: "RMDB offers a one-time license fee starting at $4,000" replicated on 53 URLs as `FAQPage` schema | `production-scheduling-software/[state]/page.tsx:62`, emitted at `:92` | Replace per C13 with the EDGEBIC two-edition answer, keeping "(RMDB)" as a heritage token. | 53 machine-trusted `FAQPage` answers publishing a wrong price for a product not sold. FAQ answers are quoted verbatim by AI assistants far more often than any other schema type on this site. |
| **D4** | Legacy `InStock` offers still live: RMX `1200`, WorkCenter SchedulerXL `495`, JSL `0`, Excel templates `0` | `resource-manager-for-excel-2/layout.tsx:18`, `workcenter-schedulerxl/layout.tsx:24`, `jsl-job-scheduler-lite/page.tsx:29`, `components/marketing/templates/excel-template-page.tsx:71` (all grep-verified) | Drop `price` on RMX and WorkCenter SchedulerXL, add `@id` and `predecessorOf` the EDGEBIC family node. Leave the two `price="0"` cases (free downloads are honestly `InStock` at zero) but add explicit `availability`. | Same false-claim class as D3. Lower volume, so Phase 2. |
| **D5** | Breadcrumb title-casing renders "Edgebic" and "Rmdb To Edgebic" in every breadcrumb node | `components/seo/breadcrumb-schema.tsx:6-11` | Add a brand-override map: `{edgebic: 'EDGEBIC', edgebi: 'EDGEBI', rmdb: 'RMDB', 'rmdb-to-edgebic': 'RMDB to EDGEBIC', 'resource-manager-db-2': 'Resource Manager DB (RMDB)', faq: 'FAQ', erp: 'ERP', mrp: 'MRP', bom: 'BOM'}` applied before title-casing. | Breadcrumbs render in the SERP. "Rmdb To Edgebic" mis-cases the brand on every page of the migration path, in the one piece of schema Google reliably displays. |
| **D6** | Cost page names real prices in the body but emits no `Offer` | `production-scheduling-software-cost/page.tsx:87` (FAQ only), prices at `:96-101`, `:188-196` | Add the two canonical EDGEBIC reference nodes with offers, `offerUrl: /pricing`. | The page exists to answer "how much does production scheduling software cost". Not making its own answer machine-readable is the one thing it fails to do. |
| **D7** | `createProductMetadata` default keyword tail appends `RMDB` to any product page that omits keywords | `lib/seo/metadata.ts:98-101` | Change the default tail to `..., manufacturing, EDGEBIC`. Note: both current callers (`edgebic/page.tsx:22`, `edgebi/layout.tsx:8`) pass explicit keywords, so today this is latent, not active. | Low urgency, but it is a trap: the next product page created without explicit keywords silently inherits RMDB. |
| **D8** | Organization identity leftovers: `SUPPORT_EMAIL`/`CONTACT_EMAIL` on `@edgebi.com`, `sameAs` pointing at RMDB-branded Capterra and G2 | `constants/app-info.ts:23-24`, `:43-46`, emitted at `json-ld.tsx:170-171`, `:198-215`, `:218` | **Do not remove the Capterra and G2 links.** They are the only third-party proof the vendor exists, and both are RMDB-branded because that is the real product history. Move them *additionally* onto the canonical RMDB node's `sameAs` (D0) so the RMDB entity and the review profiles are explicitly the same thing, and keep them on Organization. Separately, ask the owner whether the Capterra and G2 listings can be renamed to "EDGEBIC (formerly Resource Manager DB)"; that is a vendor-portal action, not a code change. The `@edgebi.com` emails are a real-world contact question, not an SEO one, but they weaken the `usersolutions.com` entity and should move to `@usersolutions.com` if the mailboxes exist. | `sameAs` is the strongest entity-disambiguation signal available. Removing it would cost more than the naming mismatch does. |
| **C (RMDB pack)** | Four spellings of the product name, no `alternateName` anywhere | `resource-manager-db-2/page.tsx:94`, `comparison-page.tsx:120`, `json-ld.tsx:412`, body copy sitewide | Solved by the D0 `alternateName` array on the single canonical node. All four spellings become aliases of one entity. | Four spellings with no reconciliation means four candidate entities. One node with four `alternateName` values means one entity with four names. |
| **E (RMDB pack)** | `/compare-products` hub emits no schema at all; page is `'use client'` | `compare-products/page.tsx:1` | Emit `BreadcrumbJsonLd` and `ItemList` from `compare-products/layout.tsx`, which is already a server component with a `metadata` export. No refactor needed. | An `ItemList` of 30 children is how you tell a crawler that this is the index for a 30-page comparison family. Combined with the C7 link expansion, this is what gets the 20 orphaned programmatic pages crawled properly. |
| **F (RMDB pack)** | `/resource-manager-db-in-depth` 301s to `/resource-manager-db-2` (`next.config.mjs:237-241`, `middleware.ts:27`, excluded from sitemap at `app/sitemap.ts:135`) but is the only home for the 8-report reporting suite; it also serves `RMXQuickStart.pdf` at `:725` while `/resource-manager-db-2:221` correctly serves `rmdbquickstart23.pdf` | `resource-manager-db-in-depth/page.tsx` (793 lines) | **Keep the 301.** Merge the reporting-suite content (`:526-688`) into `/resource-manager-db-2` as a new section. This is the "transfer, do not discard" move the prime directive asks for: the redirect keeps the link equity, the content merge keeps the topical depth. | The redirect target currently receives the equity but not the content that justified it, which is the classic way a consolidation loses rankings 3 to 6 months later. |
| **G (RMDB pack)** | `SoftwareApplicationJsonLd` availability unconditionally `InStock` | `components/seo/json-ld.tsx:293` | Make `availability` a prop defaulting to `InStock`. Then the 30 comparison pages simply omit `price`, which already conditionally omits the whole `offers` block (`:288`). | One-line component change that unblocks D3, D4 and the comparison-template fix. |

### Product schema, aggregateRating, ItemList

**Product schema: no, do not add it.** `SoftwareApplication` is the correct type for installed software and it already carries `offers`. Adding a parallel `Product` node for the same thing creates duplicate entities. The one exception is the `ProductModel` multi-typing in D0, which is not a separate node but an additional `@type` on the same `@id`, added solely to make `successorOf`/`predecessorOf` legal vocabulary.

**`aggregateRating`: no, not from Capterra or G2.** Confirmed by grep across `app/`, `components/` and `lib/`: `aggregateRating` and `Review` appear nowhere today. Google's structured-data policy prohibits marking up ratings about your own business or product that were collected on a third-party site and are not displayed on your page. Scraping a Capterra star average into `aggregateRating` on `/edgebic` is a manual-action risk that would cost far more than the star rating earns, and the Software App rich result that would display it is not served in general search anyway. The legitimate routes are: (a) put the real Capterra and G2 numbers in **visible copy** with links, and keep the profile URLs in `sameAs` (which you already do at `json-ld.tsx:170-171`); or (b) collect first-party reviews, display them on the page, and mark up `Review` items with an `aggregateRating` derived from them. Route (a) is available today at zero risk. Route (b) is a product decision.

**`ItemList` on the comparison hub: yes.** Emit from `compare-products/layout.tsx`, built from `listCompetitorSlugs()` plus the 10 static folder names, so it cannot drift from `generateStaticParams`. This is the highest-value new schema on the site because it is the only thing that will tell a crawler the 20 orphaned programmatic comparisons belong to a set.

---

## E. Internal linking plan

The link graph is one-directional in a way that wastes almost all of the blog corpus's equity. Verified counts from disk: 1,830 posts link `/edgebic`, 63 link `/pricing`, 0 link `/production-scheduling-software-cost`. In the other direction, `/edgebic` links to exactly two internal destinations.

**E1. The 20 orphaned comparison pages. Highest priority.**
Verified: `grep -rl "compare-products/rmdb-vs-plex" app/ components/ content/ data/ lib/ public/` returns only `data/programmatic/competitors.ts` and `content/seo/programmatic-pages-cache.json`. Same for `rmdb-vs-cetec-erp`. No rendered page links them. They are discoverable only via `app/sitemap.ts:253-258`.
**Fix:** expand the comparison grid in `app/(app)/(marketing)/compare-products/page.tsx:428-462` from 6 hardcoded entries to all 30, generated from `listCompetitorSlugs()` (`lib/programmatic/competitors.ts`) plus the 10 static folder names. Group them into "ERP systems", "Cloud MRP" and "APS platforms" so the grid reads as an index and not a link farm.

**E2. `/edgebic` becomes a hub, not a dead end.**
File: `app/(app)/(marketing)/edgebic/page.tsx`. Add to the body: `/pricing`, `/production-scheduling-software-cost`, `/compare-products`, `/edgebic-erp-integration` (currently plain text at `:125`), `/resource-manager-db-2`, and a "Learn more" block linking the six largest cluster pillars: `edgebic-complete-guide` (182 posts), `edgebic-how-to-hub` (352), `edgebic-glossary-index` (351), `edgebic-erp-integration` cluster pillar (151), `edgebic-troubleshooting` pillar (123), `edgebic-migration-guide` (41). Right now no `app/` page links any blog pillar, so 1,884 posts push equity into a page that returns none of it.

**E3. `/pricing` into navigation.**
File: `components/marketing/marketing-links.tsx`. Add a `Pricing` entry to `MENU_LINKS` (the `Software` group begins at `:45`; a top-level item is better) and to the `Products` column of `FOOTER_LINKS` (`:335`). `Routes.Pricing` exists at `constants/routes.ts:30` and is referenced by zero components. A page whose title is "$25,000 APS, $35,000 Complete" being unreachable from the chrome is the clearest structural signal that the migration is unfinished.

**E4. Cost page de-orphaning.**
File: `components/marketing/marketing-links.tsx`, `Resources` column at `:483`. Add `{ name: 'What Scheduling Software Costs', href: '/production-scheduling-software-cost' }`. Also inbound from `/pricing`, `/edgebic`, `/compare-products`, `/manufacturing-software`, `/production-scheduling-software`. And add it to the blog CTA templates so future posts can reach it; today 0 of 2,418 posts do.

**E5. `/resource-manager-db-2` outbound.**
File: `app/(app)/(marketing)/resource-manager-db-2/page.tsx`. It has two `href` values in 400 lines of body (`:221` PDF, `:265` contact). Add a "RMDB comparisons" block linking `/compare-products` and 6 to 8 comparison children, and a "RMDB guides" block linking the 18 RMDB blog posts (10 `rmdb-vs-*` plus the 8 `edgebic-migration` cluster posts). A `HIGH_PRIORITY` page passing PageRank only to a PDF and a contact form is the largest single waste of internal equity on the site.

**E6. Reciprocal legacy links.**
`EdgebicSuccessorCallout` (`components/marketing/sections/edgebic-successor-callout.tsx:52-66`) pushes from the three legacy pages to `/edgebic` and `/rmdb-to-edgebic`. Nothing pushes back. Add a "Running RMDB today?" line on `/edgebic` linking `/resource-manager-db-2`, and on `/pricing` linking `/rmdb-to-edgebic`. Reciprocal links between a predecessor and successor page are how you signal succession to a crawler without a redirect.

**E7. Remove or fix the sitewide `/docs` link.**
`components/marketing/marketing-links.tsx:486` and `:528`, `app/(app)/not-found-content.tsx:73`, `app/(app)/(marketing)/developers/page.tsx:96`, `public/llms.txt:233`. `content/docs` does not exist, `allDocs` is empty (`content-collections.ts:111-114`, `include: '**/docs/*.mdx'`), and `app/(app)/(marketing)/docs/[[...slug]]/page.tsx` calls `notFound()` when no doc matches. Every page on the site currently footer-links a 404.

---

## F. Agentic / AI-search layer, ranked

Ranked by impact on AI-search visibility of the RMDB → EDGEBIC conversion specifically.

**F1. Fix the schema contradictions before touching anything agentic.** Nothing in this section matters while `/pricing` says "not sold" and 188 URLs say `InStock $49`. An AI assistant reading this domain today gets four different prices for the product line. Section D is the prerequisite. This is the single highest-ranked item in F.

**F2. Extend markdown negotiation to the money pages.** `middleware.ts:74-80`, `hasMarkdownVariant()`, currently returns true for exactly `/`, `/developers` and `/blog/*`. Add, in this order of value: `/edgebic`, `/pricing`, `/rmdb-to-edgebic`, `/resource-manager-db-2`, `/production-scheduling-software-cost`, `/edgebic-erp-integration`, `/compare-products`. These are the pages an agent wants when asked "what does EDGEBIC do", "what does it cost" and "is RMDB still sold", and they are exactly the pages the conversion depends on. Do **not** add `/docs` yet: it 404s (E7). Two files must change together (`middleware.ts:74-80` and `app/md/[...slug]/route.ts:66-85`); factor the path list into a single shared module so they cannot drift. Also tighten `startsWith('/blog/')` at `:78` to a real `allPosts` lookup, since a future `/blog/category/x` would 404 for markdown clients while returning 200 for HTML.

**F3. Make `llms.txt`'s legacy disambiguation match the fixed schema.** `public/llms.txt:48-61` already says the right thing ("None of these are sold as new licences. EDGEBIC is the current generation of Resource Manager DB"), and `:392-404` "Notes for AI Assistants" corrects stale model beliefs. That is currently the *only* place on the domain where the RMDB position is stated correctly and unambiguously, and it is contradicted by ~190 pages of structured data. Once D is shipped, the two agree and the disambiguation becomes credible instead of isolated. Also: `llms.txt:140` lists `/resource-manager-db-2` and `:208-217` lists 10 comparison URLs, so the file already points agents at RMDB pages that currently claim RMDB is for sale. Fixing D fixes this by construction.

**F4. Generate `llms.txt` from route data.** Replace the static `public/llms.txt` with `app/llms.txt/route.ts` built from the same sources `app/sitemap.ts` already uses: `listApprovedMatrixSlugs()`, `listCompetitorSlugs()`, `listExcelTemplateSlugs()`, `states`, `allPosts`. Today the static file omits all ~186 matrix pages, all 53 state pages, all 20 programmatic comparison pages and all 31 programmatic Excel templates: roughly 230 to 290 indexed URLs invisible to the file that exists specifically to make the site legible to models. `llms-full.txt:515` also hardcodes "14 pages" of templates when 45 exist. Prices should come from `AppInfo.EDITIONS` rather than being typed in, since pricing drift on a hand-maintained mirror has already happened once (commit `04507857`).

**F5. Wire `verify-agentic` into `package.json`.** Confirmed absent: the `scripts` block contains `dev, dev:turbo, dev:email, build, build:content, start, analyze, lint, lint:fix, prettier:fix, eslint:fix, format:write, format:check, typecheck, postinstall, stripe:listen, setup:license, test:license, sync:hubspot, test:hubspot` and no agentic entry. Add `"verify:agentic": "node scripts/agentic/verify-agentic.mjs"`. Also fix the H1-opacity check at `scripts/agentic/verify-agentic.mjs:60-63`, which passes by regex specificity rather than by the property actually holding: the H1 in `components/marketing/sections/hero-content-client.tsx:83-96` sits inside a `<motion.div initial={{opacity:0,x:-20}}>` that server-renders with `style="opacity:0"` on the wrapper. A crawler that does not run JS sees a transparent H1 on the homepage. That is worth verifying independently of the script.

**F6. `HOME_MARKDOWN` carries hardcoded prices.** `lib/markdown/agent-markdown.ts:11-52` is a hand-written mirror of the homepage including `$25,000`/`$35,000`, with a header comment at `:5-8` admitting it must be kept in sync. Read the prices from `AppInfo.EDITIONS` instead. Same class of risk as F4, lower volume.

**F7. Lower priority, worth logging.** `app/(app)/api/health/route.ts:11-18` returns an empty body on failure, contradicting the "all errors are structured JSON" claim in `openapi.json` and `agent-markdown.ts:65-66`. `/md/*` relies solely on a per-response `X-Robots-Tag` for noindex and is in neither `robots.ts` `DISALLOWED_PATHS` nor `middleware.ts` `NOINDEX_PREFIXES`, a single point of failure. `robots.ts` disallows `/api/` while `llms.txt:231` advertises `GET /api`; it works today because the exact path `/api` is not matched by the `/api/` prefix, but the intent is contradictory.

---

## G. Verification checklist for the owner

Commands only. I have not run any of these; per the project rule I did not execute project code, a dev server, or any npm script.

**Before each phase ships (local, on the feature branch):**
```
node scripts/seo/build-keyword-tracker.mjs
node scripts/seo/audit-pillar-linking.mjs
node scripts/seo/audit-internal-links.mjs
node scripts/agentic/verify-agentic.mjs
npm run typecheck
npm run build
```
`audit-internal-links.mjs` is the one that should catch the `/docs` 404 and the 20 orphaned comparison pages; if it does not flag them, that is itself a finding about the script.

**After `npm run build`, confirm the sitemap and llms files:**
```
node -e "require('http').get('http://localhost:3000/sitemap.xml',r=>r.pipe(process.stdout))"
curl -s http://localhost:3000/sitemap.xml | grep -c "compare-products/rmdb-vs"
curl -s http://localhost:3000/sitemap.xml | grep -c "production-scheduling-software/"
curl -s http://localhost:3000/llms.txt | grep -c "rmdb-vs"
```
Expect 30 comparison URLs and 53 state URLs. Confirm `resource-manager-db-2` still appears with `<priority>0.9</priority>`.

**Markdown negotiation, after F2:**
```
curl -s -D - -H "Accept: text/markdown" http://localhost:3000/edgebic -o /dev/null
curl -s -D - -H "Accept: text/markdown" http://localhost:3000/pricing -o /dev/null
curl -s -D - -H "Accept: text/markdown" http://localhost:3000/resource-manager-db-2 -o /dev/null
```
Expect `Content-Type: text/markdown`, `Vary: Accept`, `X-Robots-Tag: noindex`, and a canonical line in the body. Then confirm the HTML path is untouched:
```
curl -s -D - http://localhost:3000/edgebic -o /dev/null
```

**Rich Results Test, after each schema change (run each URL, confirm zero errors and that the expected types appear):**
- `https://search.google.com/test/rich-results?url=https%3A%2F%2Fusersolutions.com%2Fedgebic`
- `https://search.google.com/test/rich-results?url=https%3A%2F%2Fusersolutions.com%2Fpricing`
- `https://search.google.com/test/rich-results?url=https%3A%2F%2Fusersolutions.com%2Fresource-manager-db-2`
- `https://search.google.com/test/rich-results?url=https%3A%2F%2Fusersolutions.com%2Fcompare-products`
- `https://search.google.com/test/rich-results?url=https%3A%2F%2Fusersolutions.com%2Fcompare-products%2Frmdb-vs-sap`
- `https://search.google.com/test/rich-results?url=https%3A%2F%2Fusersolutions.com%2Fproduction-scheduling-software-cost`
- `https://search.google.com/test/rich-results?url=https%3A%2F%2Fusersolutions.com%2Fproduction-scheduling-software%2Fmichigan`
- one `[matrixSlug]` page, one `/blog/rmdb-vs-*` post

Cross-check the entity graph with the Schema Markup Validator, which unlike the Rich Results Test shows every node including ones Google ignores. This is where you confirm there is exactly one `#organization`, one RMDB `@id` and three EDGEBIC `@id`s, and no stray `Offer`:
- `https://validator.schema.org/#url=https%3A%2F%2Fusersolutions.com%2Fresource-manager-db-2`
- `https://validator.schema.org/#url=https%3A%2F%2Fusersolutions.com%2Fedgebic`

**Google Search Console, per phase:**
1. Before shipping, export Performance > Search results for the last 6 months, filtered to each changed page, and save it. Do this for `/`, `/faq`, `/resource-manager-db-2`, `/compare-products` and a representative `rmdb-vs-*` page. You cannot detect a loss you have no baseline for.
2. Add an annotation in your analytics tool on the deploy date for each phase, so the before/after boundary is unambiguous in the Performance report later.
3. After deploy, run URL Inspection > Test Live URL on every changed page. Confirm indexability, the rendered canonical, and that the "Enhancements" section shows the expected structured-data types with zero errors. Request Indexing for the pages whose title or H1 changed: `/`, `/resource-manager-db-2`, `/compare-products`, `/faq`, `/about`, `/edgebic-erp-integration`.
4. Check Indexing > Pages for a rise in "Crawled, currently not indexed" or "Duplicate without user-selected canonical" over the following 3 weeks. A rise in the second bucket after the C9 canonical decisions means you chose the wrong winner.
5. Check Enhancements > FAQ and Enhancements > Breadcrumbs for new errors after the D5 and D3b changes.

**What to monitor for 4 to 8 weeks after each move:**

| After | Watch these queries | Watch these pages | Fail signal |
|---|---|---|---|
| Homepage title (C1) | `job shop scheduling software`, `manufacturing scheduling software`, `production scheduling software`, `rmdb`, `user solutions` | `/` | Impressions flat but clicks down means the new title is losing the click, not the ranking. Roll back the title, keep the description. |
| RMDB page title (C5) | `rmdb`, `resource manager db`, `resource manager-db`, `rmdb scheduling software` | `/resource-manager-db-2`, `/resource-manager-for-excel-2` | Watch RMX too: removing the RMX keyword from the RMDB page should make RMX go **up**. If both go down, the change was wrong. |
| Schema fixes (D) | `rmdb price`, `resource manager db cost`, `edgebic price`, `how much does production scheduling software cost` | `/pricing`, `/production-scheduling-software-cost`, `/resource-manager-db-2` | These should improve. Also spot-check ChatGPT, Perplexity and Google AI Overviews weekly with "how much does EDGEBIC cost" and "does User Solutions still sell RMDB"; that is where D pays off and it will not show in GSC. |
| Comparison template (C8) | every `rmdb vs {competitor}` and `{competitor} alternative` term across the 30 pages | all 30 `/compare-products/rmdb-vs-*` | Any page dropping more than 20 percent in impressions over 4 weeks means the additive EDGEBIC block diluted the page. Revert that block only, keep the schema fix. |
| Hub link expansion (E1) | n/a, this is a crawl metric | the 20 programmatic comparison URLs | In GSC Indexing > Pages, these should move from "Discovered, currently not indexed" to "Indexed" within 4 to 6 weeks. If they do not, the pages are thin, not under-linked, which is a content problem. |
| State FAQ change (C13) | `production scheduling software {state}` across all 53 | `/production-scheduling-software/{state}` | Watch as a group, not individually; per-state volume is too low to read one at a time. |
| `/faq` swap (C15) | `rmdb faq`, `what is resource manager db`, `edgebic faq` | `/faq` | If the RMDB questions were earning clicks on main and C15 is not applied, this page will drop. |
| Markdown negotiation (F2) | n/a | server logs | Count requests with `Accept: text/markdown` by path, before and after. This is the only direct measure of AI-agent traffic you have. |

One overall guardrail: ship no more than one NEEDS CARE change per two-week window. With 30 comparison pages, 53 state pages and ~186 matrix pages moving through templates, a bad template change lands on hundreds of URLs at once, and if two changes ship together you will not know which one caused the drop.