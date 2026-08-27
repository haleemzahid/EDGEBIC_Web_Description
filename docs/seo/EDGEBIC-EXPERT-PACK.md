# EDGEBIC KNOWLEDGE PACK — usersolutions.com repo audit

Repo: `d:\Usersolutons\EDGEBIC Description\EDGEBIC_Web_Description`
Branch: `feature/edgebic-promotion` · clean · **0 behind / 45 ahead of `origin/main`**. **The entire EDGEBIC promotion is unmerged to main.** If `main` deploys, none of the EDGEBIC product page, pricing rewrite, or cost page is live. (Deploy-branch identity unverified.)

## 1. PRODUCT KNOWLEDGE

### 1.1 Canonical definition — `constants/app-info.ts` (declared single source of truth, L67 comment)
- APP_NAME `EDGEBIC` (L6); category APS/finite capacity scheduling (L8); succeeds RMDB **and** EDGEBI; Windows desktop .NET 8; SQLite/SQL Server; User Solutions Inc. founded 1991.
- COMPANY_ALTERNATE_NAMES: ['User Solutions, Inc.','User Solutions Inc','EDGEBIC','Resource Manager DB','RMDB'] (L15-21).
- Support/contact email `support@edgebi.com` / `contact@edgebi.com` (L23-24 — legacy edgebi.com domain). Sales `us@usersolutions.com`.
- PROFILE_LINKS (sameAs): Capterra + G2 both still "Resource-Manager-DB" URLs (L44-45).

### 1.2 Editions & price (`app-info.ts:68-81`)
- **EDGEBIC APS — $25,000** (finite capacity scheduling + optimization)
- **EDGEBIC Complete — $35,000** (adds MRP, inventory, purchasing, material pegging)
- One-time perpetual, not subscription. Dividing line is material planning only; identical scheduling engine.
- Commit 04507857: pricing page had shown a $49 PDF-clipboard theme block ("NTClipboardPricing") since March; replaced by `components/marketing/sections/edgebic-pricing.tsx` (205 lines) + 2 SoftwareApplicationJsonLd with real Offers.
- Commit f411eaca: two-edition model replaced a three-product ladder.

### 1.3 Cost page — commit f786a6d2 created `/production-scheduling-software-cost` (235 lines)
Three bands: Cloud MRP (Katana/MRPeasy $150-300/user/mo, not true finite capacity) · Enterprise APS (Opcenter/Asprova/PlanetTogether ~$50k-500k quote-only) · Published-price APS (EDGEBIC $25k/$35k one-time). Honesty guardrails to preserve: competitor figures labelled third-party estimates; a "Where EDGEBIC is the wrong answer" section (L163-181); rejects false claim "competitors hide their pricing".

### 1.4 Setup matrix
v3.2.0.0 UI has Import/Export CSV/Save Matrix. Corrected in 3 posts (migrating-your-setup-matrix-to-edgebic.mdx, erpnext-to-edgebic-data-mapping-reference.mdx, what-edgebic-cannot-import-and-how-to-handle-it.mdx). ⚠️ `EDGEBIC-RESUME-HERE.md:128-129` still asserts "There is no import button on this dialog" — handoff doc NOT updated; future writers will reintroduce the defect.

### 1.5 Feature surface (`edgebic/page.tsx` ENGINE_FEATURES L59-92, PLATFORM_FEATURES L94-127)
Engine: forward/backward (JIT) finite capacity · TOC anchor scheduling with buffers · multi-shift/multi-instance · parallel + true-alternate work centers with per-alternate speed factors · work center groups · sequence-dependent setup matrix with families · lot streaming/transfer batches/start-to-start lags · operators, skills, certifications w/ expiry, rosters, time off.
Platform: graphical drag-drop routing designer · two-layer optimizer (multi-run "never worse than baseline" + OR-Tools CP-SAT w/ optimality gap) · interactive Gantt + Job View · shop-floor kiosk · reschedules preserving completed/in-progress work · quoting + what-if · earned value (SPI/CPI), OEE, utilization, anomaly checker · ERP integration via import masks (exactly 8 entity types: Product, Workcenter, Customer, SalesOrder, BOR, Actuals, PlantHoliday, Shift).
Heritage proof: GE Railcar 30%→90% on-time · USS Nimitz 26,000+ PM tasks · Cummins 33 locations · BAE replaced ERP scheduling module · Plastilite Fourth Shift in 5 days.

### 1.6 Legacy position
llms.txt: "None of these are sold as new licenses. EDGEBIC is the current generation of Resource Manager DB and the upgrade path for all of them." Mirrored pricing/page.tsx:54-57. `edgebic-successor-callout.tsx` variants rmdb/edgebi/rmx rendered on the three legacy pages.

### 1.7 Blog corpus — 2,418 posts; 1,884 in 16 edgebic-* clusters (programme CLOSED, commit 49e94c81)
Clusters (posts / pillar): edgebic-how-to 352/edgebic-how-to-hub · edgebic-glossary 351/edgebic-glossary-index · edgebic-platform 182/**edgebic-complete-guide** · edgebic-erp-integration 151 · edgebic-troubleshooting 123 · edgebic-industry 116 · edgebic-scheduling-concepts 106 · edgebic-outcomes 100 · edgebic-shop-floor 64 · edgebic-planning 62 · edgebic-optimization 54 · edgebic-walkthroughs 50 · edgebic-visual-scheduling 50 · edgebic-admin 43 · edgebic-migration 41 · edgebic-quoting 39.
Frontmatter: category, cluster, pillarSlug, keywords[], targetPhrase, wordCount, faqQuestions[]≥3, qaQuestions[]≥2 → BlogPostSchema FAQ output. Corpus health per EDGEBIC-RESUME-HERE.md (its own assertion): 0 orphans, 0 broken links, 0 missing pillarSlug. History: 82 posts once described nonexistent UI, corrected across flights.

## 2. PAGE INVENTORY (EDGEBIC-primary)
All marketing pages inherit DynamicBreadcrumbJsonLd (`app/(app)/(marketing)/layout.tsx:22`) + OrganizationJsonLd/WebSiteJsonLd (`app/layout.tsx:121-122`).

**A. `/edgebic`** ⭐ — createProductMetadata (L17-24), title "EDGEBIC - Next-Generation Finite Capacity Planning & Scheduling Software". Keywords incl. RMDB successor, EDGEBI successor, APS software, TOC scheduling. JSON-LD: SoftwareApplicationJsonLd ×2 (APS 25000 + Complete 35000, offerUrl=/pricing, featureList populated) + FAQJsonLd 6Q. Outbound links ONLY: Contact ×2, RmdbToEdgebic ×1.

**B. `/pricing`** ⭐ — createPageMetadata, title "EDGEBIC Pricing: $25,000 APS, $35,000 Complete, One-Time License". FAQJsonLd 7Q + SoftwareApplicationJsonLd ×2 (prices from AppInfo). Note: EdgebicPricing emits its own `<h1>EDGEBIC pricing</h1>` (edgebic-pricing.tsx:71-73); no featureList on these SoftwareApplication nodes.

**C. `/production-scheduling-software-cost`** ⭐ new — createPageMetadata, title "How Much Does Production Scheduling Software Cost? (2026 Prices)". JSON-LD: FAQJsonLd 5Q ONLY — no SoftwareApplication, no Offer despite naming real prices in body (L96-101, L188-196). Outbound: /pricing, Contact.

**D. `/rmdb-to-edgebic`** — createPageMetadata, FAQJsonLd 5Q only. Outbound: Contact, Edgebic, EdgebicErpIntegration.

**E. `/edgebic-erp-integration`** — title "EDGEBIC ERP Integration — JobBOSS, Epicor, Fourth Shift & More" (contains em dash, forbidden by content rules). JSON-LD: FeaturePageJsonLd (hardcoded to RMDB @ $4,000 — see D1) + FAQJsonLd 5Q.

**F. `/faq`** — title "Frequently Asked Questions" (generic, no EDGEBIC token). FAQJsonLd only. No price anywhere despite an editions question.

**G. `/compare-products`** — body (client) compares EDGEBIC APS vs Complete across 18 features, both linking /edgebic. **layout.tsx metadata never updated**: title "…| RMDB vs Alternatives", description "RMDB vs alternatives", keywords "RMDB vs alternatives 2026". No page-level JSON-LD (client component).

**H. `/` homepage** — title "EDGEBIC Production Scheduling Software | RMDB Successor | User Solutions" (absoluteTitle). No page-level JSON-LD (only Organization+WebSite). Hero still named NTClipboardHero (theme residue). EdgebicAnnouncement, NTClipboardPricing/FAQ/Testimonials/Demo/CTA, AwardsSection all commented out (L4, 28, 32-37).

Legacy adjacent: /edgebi (client + layout), /resource-manager-db-2 (HIGH_PRIORITY sitemap), /resource-manager-for-excel-2 — all render EdgebicSuccessorCallout.

## 3. SCHEMA AUDIT

Per-page matrix: /edgebic ✅SA×2+FAQ · /pricing ✅SA×2+FAQ · cost page FAQ only · /rmdb-to-edgebic FAQ only · /edgebic-erp-integration ⚠️FeaturePage(RMDB $4k)+FAQ · /faq FAQ only · /compare-products none · / none. **No Product schema anywhere on the site** — only SoftwareApplication carries offers.

**D1 — FeaturePageJsonLd hardcodes RMDB @ $4,000, affects 18 pages** (`json-ld.tsx:387-445`, name at L412, offer L420-425). Callers: edgebic-erp-integration, warehouse-management-software, inventory-management-software, mrp-system, manufacturing-software, production-scheduling-software, mrp-software-small-manufacturers, finite-capacity-scheduling-software, what-if-analysis-manufacturing, on-time-delivery-manufacturing, multi-location-manufacturing-scheduling, master-production-schedule-software, manufacturing-scheduling-software, labor-scheduling-manufacturing, excel-to-scheduling-software, erp-scheduling-add-on, erp-integration-production-scheduling, bill-of-materials-bom-software. The /edgebic-erp-integration page's structured data says the product is RMDB costing $4,000.

**D2 — the $49 theme price survives in 3 schema emitters:**
- `edgebi/layout.tsx:19` — SoftwareApplicationJsonLd name="EDGEBI" price="49" InStock (contradicts "no longer sold").
- `machine-monitoring-software/page.tsx:76` — "EDGEBI Machine Monitoring" price="49".
- `[matrixSlug]/page.tsx:69` — **every programmatic industry×feature page (~186, all in sitemap) emits price="49"**.

**D3 — RMDB $4,000:** `resource-manager-db-2/page.tsx:101` inline SA offer 4000, softwareVersion '2023' (HIGH_PRIORITY page). `production-scheduling-software/[state]/page.tsx:62,276` — FAQ answer "RMDB offers a one-time license fee starting at $4,000" replicated on every US state page (machine-trusted FAQ).

**D4 — legacy Offers still InStock:** resource-manager-for-excel-2/layout.tsx:18 price 1200 · workcenter-schedulerxl/layout.tsx:24 price 495 · jsl-job-scheduler-lite/page.tsx:29 price 0.

**D5 — Breadcrumb naming:** breadcrumb-schema.tsx:6-11 title-cases segments → "Edgebic", "Rmdb To Edgebic" (brand mis-cased in every breadcrumb node).

**D6 — cost page has prices in body, no Offer in schema.**

**D7 — createProductMetadata default keyword tail includes RMDB** (`lib/seo/metadata.ts:95`).

**D8 — Organization identity leftovers:** @edgebi.com emails in Organization contactPoints; sameAs → RMDB-branded Capterra/G2.

Naming: "successor to RMDB and EDGEBI" (dominant) · "RMDB + EDGEBI" (nav marketing-links.tsx:51 only) · "current generation of Resource Manager DB" (app-info, pricing, llms.txt) · "EDGEBIC (New)" footer marketing-links.tsx:338 · about/page.tsx:9 "behind RMDB and EDGEBI" (no EDGEBIC).

## 4. POSITIONING GAPS

**G1 — /edgebic is a link dead-end.** Outbound: Contact ×2 + RmdbToEdgebic ×1. Does NOT link /pricing (its own JSON-LD sets offerUrl=/pricing; "$25,000" appears nowhere in body), cost page, /compare-products, /edgebic-erp-integration (mentioned as plain text L125), or any blog pillar.

**G2 — marketing→blog link flow = zero.** No app/ page links any edgebic pillar. Blog→marketing (verified): /edgebic 1,830 posts · /edgebic-erp-integration 208 · /rmdb-to-edgebic 118 · /pricing 63 · /compare-products 6 · cost page **0**.

**G3 — /pricing not in site navigation.** Routes.Pricing referenced by zero components; href="/pricing" only in 6 legacy buy-now pages, 2 blog CTA templates, cost page, state pages, HTML sitemap. Strongest differentiator unreachable from header/footer.

**G4 — cost page fully orphaned.** Zero internal links; sitemap priority 0.5 monthly (default), same weight as a thank-you stub.

**G5 — all 30 comparison pages are RMDB-vs; competitors.ts has 658 RMDB / 0 EDGEBIC.** No edgebic-vs-planettogether/opcenter/asprova despite llms.txt + cost page naming those as EDGEBIC's competitive set. Hub body EDGEBIC-only vs layout metadata RMDB-only.

**G6 — top category pages still sell RMDB (EDGEBIC/RMDB mentions):** /finite-capacity-scheduling-software 0/11 · /production-scheduling-software 0/15 (FAQ Q1: "What makes RMDB different…") · /manufacturing-software 0/7 (FAQ describes the retired three-product ladder).

**G7 — direct contradictions:** "no longer sold" (pricing FAQ) vs InStock offers at $49/$1200/$495/$4000 on legacy pages + state-page FAQ "$4,000 one-time" · rmdb-to-edgebic "Is RMDB being discontinued? No… fully supported" vs pricing "Do you still sell? No" (reconcilable but never stated in one voice) · setup-matrix handoff doc contradiction · Organization sameAs RMDB-branded · about page no EDGEBIC.

**G8 — promotion incomplete:** 45 commits unmerged to origin/main · homepage components commented out not replaced · theme residue (NTClipboardHero, $49 in D2) · repo-root junk files tracked (%TEMP%*_test.html, `nul`).

**G9 — sitemap weighting:** HIGH (0.9) contains edgebic, pricing, but also resource-manager-db-2; rmdb-to-edgebic + edgebic-erp-integration 0.7; cost page + programmatic competitor pages 0.5.

## Caveats
No code executed; JSON-LD read from source. Deploy branch unverified. [matrixSlug] page count inferred (~186 via relevance filter), price="49" confirmed on shared template. content/docs/ absence vs docs route untraced. Corpus-health figures are the handoff doc's own assertion. Cross-link counts in G2 verified from disk.
