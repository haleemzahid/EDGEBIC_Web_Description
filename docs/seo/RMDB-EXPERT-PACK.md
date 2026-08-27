# RMDB Knowledge Pack — usersolutions.com repo

Repo root: `d:\Usersolutons\EDGEBIC Description\EDGEBIC_Web_Description`
All paths below are relative to that root unless absolute. Read-only pass; no project code was executed.

---

## 1. PRODUCT KNOWLEDGE

### 1.1 What RMDB is (as the repo describes it)

RMDB = **Resource Manager DB** (also written "Resource Manager-DB"). Windows desktop, database-backed finite-capacity production planning, scheduling and tracking application. Canonical positioning copy lives in `app/(app)/(marketing)/resource-manager-db-2/page.tsx:315-323`:

> "Resource Manager-DB (RMDB) is a flexible and affordable production planning, scheduling, and tracking solution that is designed to adapt to your operations."

Core themes repeated across pages: adapts to your existing data; single simple menu/dashboard; minimal transactions; configure/reconfigure "in hours or days vs. weeks or months"; Excel round-trip (load → edit → reload); ERP-agnostic import/export; "cruise control" metaphor; "since 1991" / "35 years."

**Canonical feature list** — one shared array, used by every RMDB surface: `components/marketing/sections/rmdb-feature-list.tsx:3-19` (16 items: Finite Capacity Planning & Scheduling; MRP and Inventory Management; Easy "what-if" Analysis; Downtime Analysis and Reporting; Costing and Estimating; Stand Alone or Networked; Drag & Drop Adjustments; Optional LP Optimization Integration; APS; Routings and Priority Scheduling; Purchasing and Receiving; Simple Maintenance and Updating; Integrating with All Systems; Production Planning; Concurrent Resource Scheduling; Customized Reports). The same 16 strings are duplicated verbatim as `featureList` in the page's inline JSON-LD at `resource-manager-db-2/page.tsx:105-122`.

**Reporting suite** (only documented on the now-redirected in-depth page, `resource-manager-db-in-depth/page.tsx:526-688`): Gantt Report, Summary Report (top-level MRP), Item Report, Calendar Report ("wall calendar" format), Workcenter Report (loading, backlog, % utilization, bottlenecks, daily to-do), Routing & Tree Report, Production Report (traveler/work order, job costing & variance), Purchasing & Receiving (Kanban PO generation, auto-email RFQs/POs).

**Version signal:** `softwareVersion: '2023'` in JSON-LD (`resource-manager-db-2/page.tsx:124`). Press release covers "RMDB v6" dated June 9, 2016 (`press_release/rmdb-v6-innovates-production-scheduling/page.tsx:14-21`).

### 1.2 Positioning vs. sibling products — and the central contradiction

The repo contains **two mutually exclusive positions on whether RMDB is still sold.**

**Position A — RMDB is retired, EDGEBIC is the only product sold.** This is the newer, authoritative position:

- `constants/app-info.ts:5-7` — `APP_NAME: 'EDGEBIC'`; app description: *"It is the current generation of Resource Manager DB (RMDB)."* `EDITIONS` block (`app-info.ts:~68-82`) lists **only** EDGEBIC APS ($25,000) and EDGEBIC Complete ($35,000), with the comment: *"The only products currently sold. Kept here so the structured data, the llms.txt corpus and the marketing pages cannot drift apart again."*
- `app/(app)/(marketing)/pricing/page.tsx:54-56` — FAQ answer: *"No. RMDB, EDGEBI, RMX, Workcenter Scheduler XL and Job Scheduler Lite are no longer sold as new licenses. Existing installations remain supported… EDGEBIC is the current generation of Resource Manager DB and the upgrade path from all of them."* This ships as **FAQPage JSON-LD**.
- `public/llms.txt:48-61` — heading `## Legacy Products (still supported, no longer sold)`; *"**None of these are sold as new licenses.**"*
- `app/(app)/(marketing)/compare-products/page.tsx:36-39` (code comment): *"Legacy products (RMX, RMDB, EDGEBI) keep their pages for the customers running them, but they are no longer sold and so are not compared here."* The visible table on that page compares only EDGEBIC APS vs EDGEBIC Complete.

**Position B — RMDB is an actively sold product at "From $5,000."** This is what all 30 comparison pages and 10 comparison blog posts assert, in copy *and* in structured data.

**Sibling product map (per `public/llms.txt:48-56` and nav):**

| Product | Route | Role |
|---|---|---|
| EDGEBIC | `/edgebic`, `/pricing` | Current flagship; two editions; $25k / $35k one-time |
| RMDB | `/resource-manager-db-2` | Legacy database FCS engine; EDGEBIC's direct ancestor |
| EDGEBI | `/edgebi` | RMDB's graphical drag-and-drop Gantt extension (separate install sharing a DB) |
| RMX (Resource Manager for Excel) | `/resource-manager-for-excel-2` | Excel entry-level; schema price `1200` |
| WorkCenter SchedulerXL | `/workcenter-schedulerxl` | Excel entry-level |
| JSL (Job Scheduler Lite) | `/jsl-job-scheduler-lite` | Excel entry-level |

The RMDB→EDGEBIC relationship is stated cleanly at `rmdb-to-edgebic/page.tsx:126-132` and `components/marketing/sections/edgebic-successor-callout.tsx:11-12`: *"EDGEBIC carries the full RMDB scheduling engine forward into one modern application."* `rmdb-to-edgebic/page.tsx:60-84` enumerates what EDGEBIC adds over RMDB+EDGEBI: one app instead of two, graphical routing designer, TOC anchor scheduling / backward scheduling / work center groups / parallel & alternate work centers / lot streaming / sequence-dependent setup matrices, operators+skills+certifications, two-layer optimizer (multi-run + CP-SAT with proven optimality gap), shop-floor kiosk actuals.

### 1.3 RMDB pricing claims found in the repo (all conflicting)

| Value | Location | Form |
|---|---|---|
| `price: '4000'` USD, `InStock` | `app/(app)/(marketing)/resource-manager-db-2/page.tsx:99-104` | JSON-LD Offer on the RMDB product page |
| `price: '4000'` USD, `InStock` | `components/seo/json-ld.tsx:420-425` (`FeaturePageJsonLd`, **hardcoded**) | JSON-LD Offer on ~20 feature pages |
| `price="5000"` USD, `InStock` | `components/marketing/compare/comparison-page.tsx:119-125` | JSON-LD Offer on all 30 comparison pages |
| "From $5,000" one-time, no per-user fees | all 10 static `rmdb-vs-*/page.tsx` (`rmdbPrice`) + 21 occurrences in `data/programmatic/competitors.ts` | visible pricing table copy |
| "$5,000–$15,000 one-time perpetual license" | `content/blog/rmdb-vs-asprova.mdx` FAQ, `rmdb-vs-delmia-ortems.mdx` FAQ, `rmdb-vs-infor-aps.mdx` FAQ | FAQPage JSON-LD answers |
| "no longer sold as new licenses" | `pricing/page.tsx:54-56` | FAQPage JSON-LD answer |

There is **no single source of truth** for an RMDB price; `AppInfo.EDITIONS` deliberately excludes RMDB.

### 1.4 Named customers / proof points attached to RMDB

GE, Cummins, BAE Systems, "over 1,000 manufacturers", US Navy Nimitz (`compare-products/rmdb-vs-sap/page.tsx:31,216`; `public/llms.txt:91`). Success stories tagged `productKey="rmdb"` via `RelatedSuccessStories` (`resource-manager-db-2/page.tsx:356`). Dedicated RMDB story: `/success-stories/resource-manager-db-innovates-li-ion-battery-production-scheduling-for-enevate` (Enevate, Li-ion). Awards in `AppInfo.AWARDS`: Capterra Shortlist, G2 Best Meets Requirements, CIO Applications Top ERP Solution. Third-party profiles in `AppInfo.PROFILE_LINKS` are **RMDB-branded**: `capterra.com/p/9402/Resource-Manager-DB/` and `g2.com/products/resource-manager-db-rmdb`.

---

## 2. PAGE INVENTORY

### 2.1 RMDB-primary pages

| Route | File | Metadata source | JSON-LD rendered |
|---|---|---|---|
| `/resource-manager-db-2` | `app/(app)/(marketing)/resource-manager-db-2/page.tsx` | hand-written `Metadata` object, lines 28-88 | **inline** `SoftwareApplication` only, via `next/script` `strategy="beforeInteractive"` (lines 91-130, 293-298). Does **not** use `components/seo`. |
| `/resource-manager-db-in-depth` | `.../resource-manager-db-in-depth/page.tsx` + `layout.tsx` | `layout.tsx:3-7`, bare `Metadata` — title + description only | **none** (page is `'use client'`) |
| `/rmdb-to-edgebic` | `.../rmdb-to-edgebic/page.tsx` | `createPageMetadata`, lines 14-21 | `FAQJsonLd` only (line 112) |
| `/compare-products` (hub) | `.../compare-products/page.tsx` + `layout.tsx` | `createPageMetadata` in `layout.tsx:3-10` | **none** (page is `'use client'`) |
| `/buy-now-resource-manager` | `.../buy-now-resource-manager/page.tsx` | `createPageMetadata`, lines 8-14 | **none** |
| `/press_release/rmdb-v6-innovates-production-scheduling` | `.../press_release/rmdb-v6-.../page.tsx` | **no `metadata` export at all** | **none** |
| `/success-stories/resource-manager-db-innovates-li-ion-battery-production-scheduling-for-enevate` | that dir's `page.tsx` | `createArticleMetadata`, lines 8-15 | **none** (no `ArticleJsonLd` despite article metadata) |

**Redirect note:** `/resource-manager-db-in-depth` is a **permanent 301 → `/resource-manager-db-2`** (`next.config.mjs:237-241`, `middleware.ts:27`) and is excluded from the sitemap (`app/sitemap.ts:135`). The 793-line source still exists and is the *only* place the reporting suite, Quick Start and EDGEBI tab content live. `/press_release/rmdb-v6-...` also 301s to `/press_release` (`middleware.ts:45`).

**Sitemap priority:** `resource-manager-db-2` is in `HIGH_PRIORITY_PAGES` (`app/sitemap.ts:14`); `rmdb-to-edgebic` in `MEDIUM_PRIORITY_PAGES` (`app/sitemap.ts:24`).

**Metadata detail for `/resource-manager-db-2`** (`page.tsx:28-88`):
- title: `RMDB | Resource Manager for Excel — Production Scheduling Software` ← **the title says "Resource Manager for Excel," which is RMX, a different product.**
- description: finite capacity planning, MRP, drag-and-drop, Excel integration
- keywords (array, 14): `RMDB`, `resource manager for excel`, `RMDB scheduling software`, `Resource Manager DB`, `production scheduling`, `manufacturing scheduling`, `finite capacity planning`, `MRP software`, `inventory management`, `drag and drop scheduling`, `Excel integration`, `manufacturing software`, `mid-sized manufacturer software`, `mid sized manufacturer scheduling software`
- canonical `/resource-manager-db-2`; OG title `Resource Manager DB - User Solutions`; Twitter title `Resource Manager DB - Production Planning & Scheduling Software`

**Metadata for `/rmdb-to-edgebic`**: title `Upgrading from RMDB or EDGEBI to EDGEBIC`; keywords `RMDB upgrade, RMDB successor, RMDB to EDGEBIC, EDGEBI upgrade, EDGEBI successor, Resource Manager DB next version, User Solutions new product, EDGEBIC migration`. 5 FAQs (lines 23-49) → `FAQPage`.

**Metadata for `/compare-products`** (`layout.tsx`): title `Production Scheduling Software Comparison 2026 | RMDB vs Alternatives`; keywords `production scheduling software comparison 2026, manufacturing software comparison, RMDB vs alternatives 2026, compare scheduling software, production planning comparison`.

### 2.2 The 10 static `rmdb-vs-*` comparison sub-routes

All follow an identical shape: `createPageMetadata` at lines 9-16, then a `ComparisonPageData` object, then `<ComparisonPage data={data} />`. **All three schema components come from `ComparisonPage`, not from the page files.**

Schema rendered by every one (`components/marketing/compare/comparison-page.tsx:112-125`):
1. `BreadcrumbJsonLd` — Home → Compare Products → `RMDB vs {competitor}`
2. `FAQJsonLd` — from `data.faqs`
3. `SoftwareApplicationJsonLd` — `name="RMDB - Resource Manager DB"`, `url={baseUrl}/resource-manager-db-2`, `price="5000"`, `priceCurrency="USD"`

| Route | Title | Keywords (head terms) |
|---|---|---|
| `/compare-products/rmdb-vs-e2-shop-system` | RMDB vs E2 Shop System: Finite-Capacity Scheduling for Serious Job Shops | rmdb vs e2 shop system, e2 shop system alternative, alternatives to e2 shoptech, e2 shoptech alternative, e2 manufacturing software alternative, shoptech e2 competitors, job shop software alternative to e2 |
| `/compare-products/rmdb-vs-epicor` | RMDB vs Epicor: Finite-Capacity Scheduling Without the ERP Price Tag | rmdb vs epicor, epicor alternative small business, epicor alternative manufacturing, alternatives to epicor erp, epicor kinetic alternative, epicor advanced planning alternative, smaller alternative to epicor |
| `/compare-products/rmdb-vs-fishbowl` | RMDB vs Fishbowl: Which Manufacturing Software Schedules Better? | rmdb vs fishbowl, fishbowl alternative, alternatives to fishbowl, fishbowl manufacturing comparison, fishbowl competitors, fishbowl inventory alternative, fishbowl inventory software alternative |
| `/compare-products/rmdb-vs-global-shop-solutions` | RMDB vs Global Shop Solutions: Which Schedules Better for Job Shops? | rmdb vs global shop solutions, global shop solutions alternative, …competitors, global shop erp alternative, manufacturing erp alternative global shop, job shop alternative to global shop solutions |
| `/compare-products/rmdb-vs-netsuite` | RMDB vs NetSuite Manufacturing: Which Is Right for SMB Manufacturers? | rmdb vs netsuite, netsuite manufacturing alternative, alternatives to netsuite manufacturing, netsuite scheduling alternative, netsuite manufacturing comparison, netsuite competitors, netsuite manufacturing scheduling |
| `/compare-products/rmdb-vs-odoo` | RMDB vs Odoo Manufacturing: Open-Source ERP vs Finite-Capacity APS | rmdb vs odoo, odoo manufacturing alternative, alternatives to odoo manufacturing, odoo MRP alternative, odoo manufacturing comparison, odoo competitors, open source manufacturing scheduling alternative |
| `/compare-products/rmdb-vs-preactor` | RMDB vs Preactor: APS Comparison for Manufacturers (2026) | rmdb vs preactor, preactor alternative(s), alternatives to preactor, preactor competitors, preactor APS comparison, advanced planning and scheduling preactor, siemens opcenter APS alternative |
| `/compare-products/rmdb-vs-proshop` | RMDB vs ProShop ERP: Which Is Better for Job Shops? | rmdb vs proshop, proshop alternative(s), alternatives to proshop, proshop ERP alternative, proshop comparison, proshop competitors, machine shop ERP comparison |
| `/compare-products/rmdb-vs-quickbooks` | RMDB vs QuickBooks for Manufacturing: When You Outgrow Accounting | rmdb vs quickbooks, quickbooks manufacturing alternative, alternatives to quickbooks manufacturing, quickbooks manufacturing scheduling, quickbooks production planning, quickbooks scheduling software, quickbooks competitors manufacturing |
| `/compare-products/rmdb-vs-sap` | RMDB vs SAP: Enterprise-Level Scheduling Without Enterprise Cost | rmdb vs sap, sap alternative small manufacturer, sap alternative small business manufacturing, cheaper alternative to sap, sap s4hana alternative small manufacturer, sap manufacturing alternative, sap pp alternative, sap apo alternative |

### 2.3 20 additional programmatic `rmdb-vs-*` routes

`app/(app)/(marketing)/compare-products/[competitorSlug]/page.tsx` (`dynamicParams = false`, `generateStaticParams` from `lib/programmatic/competitors.ts`). Data: `data/programmatic/competitors.ts`. Slugs (with source line): `rmdb-vs-plex` (25), `rmdb-vs-made2manage` (92), `rmdb-vs-jobboss2` (159), `rmdb-vs-jobpack` (226), `rmdb-vs-m1-erp` (293), `rmdb-vs-realtrac` (360), `rmdb-vs-statii` (427), `rmdb-vs-optipro` (494), `rmdb-vs-cetec-erp` (561), `rmdb-vs-infor-syteline` (628), `rmdb-vs-ifs-cloud` (694), `rmdb-vs-sage-x3` (761), `rmdb-vs-acumatica` (827), `rmdb-vs-dynamics-365-business-central` (893), `rmdb-vs-rootstock` (959), `rmdb-vs-fulcrum-erp` (1025), `rmdb-vs-xtuple` (1092), `rmdb-vs-genius-erp` (1158), `rmdb-vs-visual-mrp` (1225), `rmdb-vs-aptean-industrial-mfg` (1290). These render the same three schemas via `ComparisonPage`.

### 2.4 RMDB blog cluster — 18 MDX files in `content/blog/`

All render `BlogPostSchema` (`app/(app)/(marketing)/blog/[slug]/page.tsx:9,123`) → `@graph` of `BlogPosting` + `BreadcrumbList` + `FAQPage` (`components/seo/blog-post-schema.tsx:37-123`), with `createArticleMetadata` (line 94).

**Cluster `competitor-comparisons`, pillar `production-scheduling-software-comparison`, category `Software Comparison`** (10):
`rmdb-vs-asprova`, `rmdb-vs-delmia-ortems`, `rmdb-vs-epicor-aps`, `rmdb-vs-infor-aps`, `rmdb-vs-jobboss`, `rmdb-vs-katana`, `rmdb-vs-made2manage`, `rmdb-vs-mrpeasy`, `rmdb-vs-planettogether`, `rmdb-vs-siemens-opcenter`. Published mostly 2026-05-01 (made2manage 2026-04-25), wordCount 2200–2800.

**Cluster `edgebic-migration`, pillar `edgebic-migration-guide`, category `Upgrade & Comparison`** (8):
`what-carries-forward-from-rmdb-to-edgebic` (2026-07-31), `moving-rmdb-routings-into-edgebic` (2026-07-31), `running-rmdb-and-edgebic-side-by-side` (2026-07-31), `exporting-rmdb-data-to-excel-for-edgebic` (2026-08-03), `validating-a-migrated-schedule-against-rmdb` (2026-08-03), `rmdb-to-edgebic-feature-parity-map` (2026-08-06, modified 2026-08-15), `mapping-rmdb-terms-to-edgebic-terms` (2026-08-06), `training-your-rmdb-team-on-edgebic` (2026-08-06). wordCount 1480–1600.

BOM note: sampled RMDB posts have **no BOM**. The BOM'd files are all `edgebic-for-*` / `continuous-process-work-centers-edgebic` industry posts (high-confidence, not exhaustively verified).

---

## 3. SCHEMA AUDIT INPUT

### 3.1 Schema type coverage on RMDB-primary pages

| Page | SoftwareApplication | Product | Offer/price | FAQPage | BreadcrumbList | Article | Organization link |
|---|---|---|---|---|---|---|---|
| `/resource-manager-db-2` | ✅ inline, hand-rolled | ❌ | ✅ `4000` | ❌ | ❌ | ❌ | ❌ inline `publisher` object, **not** `@id` ref |
| `/resource-manager-db-in-depth` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `/rmdb-to-edgebic` | ❌ | ❌ | ❌ | ✅ 5 Q | ❌ | ❌ | n/a |
| `/compare-products` hub | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 30 × `rmdb-vs-*` | ✅ shared | ❌ | ✅ `5000` | ✅ | ✅ | ❌ | ✅ `@id` ref |
| `/buy-now-resource-manager` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Enevate success story | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ (uses `createArticleMetadata` but no `ArticleJsonLd`) | ❌ |
| RMDB blog posts (18) | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ `BlogPosting` | ✅ named, not `@id` |

**`aggregateRating` / `Review` appear nowhere in the codebase** — verified by grep across `app`, `components`, `lib`. This is notable given `AppInfo.PROFILE_LINKS` points at live Capterra and G2 listings for Resource Manager DB and `AppInfo.AWARDS` names G2/Capterra recognition.

### 3.2 Concrete schema defects

**A. `/resource-manager-db-2` is the flagship RMDB page and has the weakest schema.**
- `page.tsx:91-130` bypasses `components/seo/json-ld.tsx` entirely. It hand-writes the object and injects it via `next/script strategy="beforeInteractive"`, so it is not the same code path any other product page uses.
- Its `publisher` (lines 125-129) is an inline `Organization` with `name`/`url`, **not** `{'@id': `${baseUrl}/#organization`}`. The `SoftwareApplicationJsonLd` helper deliberately uses `@id` (`json-ld.tsx:283-285`) — the RMDB page opted out, creating a duplicate, unlinked Organization node.
- No `BreadcrumbList`, no `FAQPage`, no `aggregateRating` — despite the page being HIGH priority in the sitemap.
- Price `4000` here vs `5000` in the 30 comparison pages that link *to* this URL as the product's canonical page. Two different `Offer` prices for the same `SoftwareApplication` `url`.
- Missing `applicationSubCategory` and `softwareRequirements`, both supported by the shared helper.

**B. `FeaturePageJsonLd` hardcodes RMDB as the subject of ~20 feature pages, at $4,000.**
`components/seo/json-ld.tsx:410-430`: `about: { '@type': 'SoftwareApplication', name: 'RMDB - Resource Manager DB', ... offers: { price: '4000', InStock } }`.
Callers (all emit this): `bill-of-materials-bom-software`, `edgebic-erp-integration`, `erp-integration-production-scheduling`, `erp-scheduling-add-on`, `excel-to-scheduling-software`, `finite-capacity-scheduling-software`, `inventory-management-software`, `labor-scheduling-manufacturing`, `manufacturing-scheduling-software`, `manufacturing-software`, `master-production-schedule-software`, `mrp-software-small-manufacturers`, `mrp-system`, `multi-location-manufacturing-scheduling`, `on-time-delivery-manufacturing`, `production-scheduling-software`, `warehouse-management-software`, `what-if-analysis-manufacturing`.

Worst instance: `app/(app)/(marketing)/edgebic-erp-integration/page.tsx:85-99` — an **EDGEBIC** page whose structured data declares it is `about` "RMDB - Resource Manager DB" at $4,000 InStock. Same defect on all the head-term feature pages that are the site's main non-brand SEO targets.

**C. Product naming is inconsistent across four spellings.**
- `Resource Manager DB (RMDB)` — `resource-manager-db-2/page.tsx:94` (schema `name`)
- `RMDB - Resource Manager DB` — `comparison-page.tsx:120`; `json-ld.tsx:412`
- `Resource Manager DB` — `app-info.ts` alternate names; OG title line 52; `resource-manager-db-in-depth/layout.tsx:4`
- `Resource Manager-DB` (hyphenated) — body copy throughout both RMDB pages; press release
- `RMDB` alone — H1s of all 30 comparison pages
Nothing reconciles these; no `sameAs`/`alternateName` on any RMDB `SoftwareApplication` node.

**D. `/resource-manager-db-2` metadata title names the wrong product.**
`page.tsx:29`: `'RMDB | Resource Manager for Excel — Production Scheduling Software'`. RMX is a separate product with its own page (`/resource-manager-for-excel-2`, schema price `1200`). The keyword array reinforces it (`'resource manager for excel'`, line 34). Direct cannibalization between two of the site's own product URLs.

**E. The `/compare-products` hub emits no schema at all** — no `BreadcrumbList`, no `ItemList` of the 30 children. It is `'use client'` (`page.tsx:1`), so it cannot use the server schema components without refactor. Same structural problem as `resource-manager-db-in-depth`.

**F. Redirected pages still carry live source.** `/resource-manager-db-in-depth` 301s away but is the only home for the RMDB reporting suite content; `/press_release/rmdb-v6-...` 301s to the index and has no `metadata` export.

**G. `SoftwareApplicationJsonLd` availability is unconditionally `InStock`** (`json-ld.tsx:293`). For a product the pricing page says is not sold, every one of the 30 comparison pages publishes an InStock Offer at $5,000.

---

## 4. MESSAGING GAPS

**4.1 Stale/contradictory: the comparison estate has not been touched by the EDGEBIC repositioning.**
`grep -c EDGEBIC` returns **0** across all 10 static `rmdb-vs-*/page.tsx` files and **0** across `data/programmatic/competitors.ts` (20 more). `grep -ci edgebic` returns **0** for all 10 `content/blog/rmdb-vs-*.mdx` files. So 40 URLs sell RMDB as a current product with active pricing, implementation timelines ("5 days"), and buy CTAs (`comparison-page.tsx:192,449` → `/product-downloads`; `:182,441` → `/contact-us`), while `/pricing` tells crawlers RMDB is discontinued. The flagship product is never named on any comparison page.

**4.2 The hub contradicts its own children.** `compare-products/page.tsx:36-39` says RMDB "is no longer sold and so is not compared here," and its table compares only the two EDGEBIC editions — yet its own `layout.tsx` title is *"…| RMDB vs Alternatives"* and it is the parent of 30 RMDB-vs pages. A user landing on the hub from an "RMDB vs X" SERP sees EDGEBIC pricing; a user landing on a child sees RMDB at $5,000.

**4.3 `/resource-manager-db-2` does not link to its own comparison or blog cluster.** Outbound links are `/contact-us` (line 265), the Quick Start PDF (line 221), plus `EdgebicSuccessorCallout` (line 355 → `/edgebic`, `/rmdb-to-edgebic`) and `RelatedSuccessStories` (line 356). **Zero links to `/compare-products`, to any `rmdb-vs-*` page, or to any of the 18 RMDB blog posts.** One-directional link flow.

**4.4 `/resource-manager-db-in-depth` is orphaned by redirect but is the only place substantial RMDB content lives.** 793 lines covering 8 report types, purchasing/receiving/Kanban, "Works The Way You Do," Special Services & Partners, plus an EDGEBI tab (`page.tsx:748`) — all 301'd away, never merged into `/resource-manager-db-2`. It also serves the wrong PDF: `RMXQuickStart.pdf` (line 725) — the **RMX** quick start — whereas `/resource-manager-db-2` correctly serves `rmdbquickstart23.pdf` (line 221).

**4.5 Cannibalizing duplicate comparison targets between `/blog/` and `/compare-products/`.**
- `/blog/rmdb-vs-epicor-aps` vs `/compare-products/rmdb-vs-epicor`
- `/blog/rmdb-vs-jobboss` (titled "RMDB vs JobBOSS2") vs `/compare-products/rmdb-vs-jobboss2` (programmatic)
- `/blog/rmdb-vs-made2manage` vs `/compare-products/rmdb-vs-made2manage` (programmatic) — **same slug string on two different URLs**
- `/blog/rmdb-vs-siemens-opcenter` vs `/compare-products/rmdb-vs-preactor` (the blog itself states Preactor *is* Opcenter APS)
- `/blog/rmdb-vs-planettogether` and `/blog/rmdb-vs-asprova` compete with `/pricing`'s claim that PlanetTogether and Asprova are *EDGEBIC's* competitors (`pricing/page.tsx` FAQ; `llms.txt:65-70`).
Both surfaces emit `FAQPage` schema on the same competitor question set.

**4.6 Stale dates and version numbers.** `softwareVersion: '2023'` against a site publishing 2026-dated content. Press release is 2016 "v6". RMDB comparison blogs dated 2026-05-01 (after EDGEBIC framing began) never mention EDGEBIC.

**4.7 Third-party entity anchors still point at RMDB.** `AppInfo.PROFILE_LINKS` (Capterra `p/9402/Resource-Manager-DB/`, G2 `resource-manager-db-rmdb`) emitted in `Organization.sameAs` on every page (`json-ld.tsx:170-171, 218`). Organization `logo` is `edgebic-logo.png`, description EDGEBIC-first, but external identity proof is RMDB-branded. Should be a deliberate decision.

**4.8 Not problems.** `/rmdb-to-edgebic` is the cleanest RMDB-adjacent page (correct metadata, real FAQ schema, honest "RMDB remains fully supported" framing, links to `/edgebic` and `/edgebic-erp-integration` lines 226-242). `EdgebicSuccessorCallout` correctly wired on all three legacy product pages. The 8-post `edgebic-migration` cluster is consistent throughout.

**4.9 Unverified.** Did not open all 20 programmatic competitor entries individually (confirmed slugs, the 21 `$5,000` occurrences, 0 EDGEBIC mentions by count). Did not read `public/llms-full.txt` in full. Did not audit every `FeaturePageJsonLd` caller page's visible copy — only their schema call sites.
