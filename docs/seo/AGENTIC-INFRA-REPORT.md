# Agent-Readiness ("Is Agentic") Implementation Report

Repo: `d:\Usersolutons\EDGEBIC Description\EDGEBIC_Web_Description`

## 1. Agent-friendly 404s with recovery links
- `app/not-found.tsx` (20 lines) — root not-found, `robots: { index: false, follow: true }`, renders `<NotFoundContent />`.
- `app/(app)/not-found-content.tsx:51-99` — recovery nav listing `/blogs`, `/edgebic`, `/docs`, `/developers`, raw `<a>` to `/sitemap.xml` and `/llms.txt`, `/contact-us`. Hardcoded JSX.
- `app/md/[...slug]/route.ts:87` + `lib/markdown/agent-markdown.ts:107-125` — markdown 404 variant (`notFoundMarkdown()`), real 404 status, `Cache-Control: no-store`, same recovery links.
- `middleware.ts:96-117` — known WordPress probe paths return **410 Gone**; `middleware.ts:186-203` matcher entries for `/wp-content/:path*` etc.

## 2. Content without JavaScript
- Homepage `app/(app)/(marketing)/page.tsx` is a server component. 233 of 244 marketing page.tsx files are server components (11 use `'use client'`).
- Fragility: H1 in `components/marketing/sections/hero-content-client.tsx:83-96` sits inside `<motion.div initial={{opacity:0,x:-20}}>` — SSR'd with `style="opacity:0"` on the wrapper. Verify script's guard (`scripts/agentic/verify-agentic.mjs:60-63`) only checks opacity on the h1 element itself, so it passes by regex specificity, not by the property holding.

## 3. /openapi.json
- `public/openapi.json` (705 lines) — STATIC file, not generated. OpenAPI 3.0.3, 8 operations each with operationId + description: requestLicense, pollLicenseRequest, activateLicense, validateLicense, deactivateLicense, checkSoftwareUpdates, downloadSoftware, healthCheck. externalDocs → /developers.

## 4. JSON error responses + GET /api index
- `app/(app)/api/route.ts:12-41` — GET /api JSON directory: name, description, openapi, documentation, llms, endpoints[] (8 ops). `Cache-Control: public, max-age=3600`, `X-Robots-Tag: noindex`.
- `app/(app)/api/[...unmatched]/route.ts:13-60` — catch-all for all verbs → `jsonNotFound()`: `{error, code:'not_found', message, hint, links:{apiIndex, openapi, documentation}}` at 404.
- `app/(app)/api/license/validate/route.ts:28-82` — real endpoints return NextResponse.json for 400/403/404/500.
- `middleware.ts:160-175` — /api in NOINDEX_PREFIXES → `X-Robots-Tag: noindex, nofollow, noarchive`.

## 5. Markdown content negotiation (middleware rewrite → route handler)
- `middleware.ts:74-80` — `hasMarkdownVariant(pathname)`: HARDCODED — `pathname === '/' || pathname === '/developers' || pathname.startsWith('/blog/')`.
- `middleware.ts:134-148` — if Accept contains text/markdown, GET, not /md/*, and hasMarkdownVariant → REWRITE to `/md/index` or `/md${pathname}` (URL stays canonical).
- `middleware.ts:179-181` — HTML responses for those paths get `Vary: Accept` appended.
- `app/md/[...slug]/route.ts` — rewrite target. `:26-43` sets `Content-Type: text/markdown`, `Vary: Accept`, `X-Robots-Tag: noindex`. `:66-72` /index → HOME_MARKDOWN; /developers → DEVELOPERS_MARKDOWN. `:74-85` blog: allPosts lookup by slugAsParams with glossary remap. `:45-56` postMarkdown() prepends `# title`, description, dates/category blockquote, `> Canonical: https://usersolutions.com{slug}`, then emits `post.body.raw` (actual MDX source, never stale).
- `lib/markdown/agent-markdown.ts:11-52` HOME_MARKDOWN and `:54-105` DEVELOPERS_MARKDOWN — HAND-WRITTEN markdown mirrors (will go stale; header comment `:5-8` admits "Keep these in sync").

## 6. /developers page
- `app/(app)/(marketing)/developers/page.tsx` (301 lines, server component). `:17-66` hardcoded endpoints[] table (a third copy of the endpoint list). `:68-99` machine-resource cards → /openapi.json, /api, /llms.txt, /llms-full.txt, /sitemap.xml, /docs. `:204-225` curl example. `:257-281` documents markdown negotiation contract in prose.
- Footer discoverability: `components/marketing/marketing-links.tsx:486-487` puts /docs and /developers in footer Resources column site-wide.

## 7. /llms.txt and /llms-full.txt
- `public/llms.txt` (406 lines) — STATIC, hand-written. Product summary → EDGEBIC capabilities → pricing table with real prices → legacy-product disambiguation → competitive positioning → key page index → "Developer & Agent Resources" (`:229-236`) → cluster-level blog index of 2,404 articles (`:238-375`) → "Notes for AI Assistants" (`:392-404`) correcting stale model beliefs (RMDB is legacy, pricing published not quote-only, Windows desktop not SaaS). `_Last updated: 2026-08-23._`
- `public/llms-full.txt` (698 lines) — long-form: competitor head-to-heads, capabilities, results, pricing, specs, FAQ.
- `next.config.mjs:97-122` — headers() pins text/plain charset + `Cache-Control: public, max-age=86400`.

## 8. Organization JSON-LD
- `app/layout.tsx:121-122` — `<OrganizationJsonLd />` + `<WebSiteJsonLd />` in root layout head (every page, not just /).
- `components/seo/json-ld.tsx:156-222` — OrganizationJsonLd: `@id: ${baseUrl}/#organization` (stable node), legalName, alternateName[], logo, foundingDate, PostalAddress with postalCode, TWO ContactPoints (sales + technical support), knowsAbout[], award[], sameAs incl. Capterra + G2 profile URLs.
- `:224-242` WebSiteJsonLd with `publisher: {'@id': '.../#organization'}`.
- Values from `constants/app-info.ts:22-27+`.

---

# Gaps and fragility

## A. Markdown negotiation covers exactly 3 things
/, /developers, /blog/* (incl. glossary). NOT covered: /edgebic, /edgebi, /resource-manager-db-2, /rmdb-to-edgebic, /edgebic-erp-integration, /pricing, /docs (already MDX — nearly free win), /blogs, /compare-products, /excel-templates, /faq, /success-stories, ~230 programmatic pages, 53 state pages. Biggest gap: the product pages an agent wants when asked "what does EDGEBIC do".
Sharp edge: `startsWith('/blog/')` broader than real posts — a future /blog/category/x would 404 for markdown clients while HTML returns 200.

## B. llms.txt coverage vs actual routes
Static hand-maintained vs generated sitemap. Missing: all ~186 programmatic industry×feature matrix pages (`lib/programmatic/matrix.ts:74-94` from `data/programmatic/industries.ts` × `features.ts`, relevance>=2); all 53 state pages (`data/states.ts` → /production-scheduling-software/{state}); all 20 programmatic competitor pages (`data/programmatic/competitors.ts`); all 31 programmatic Excel template slugs (`data/programmatic/excel-templates.ts`). llms-full.txt:515 hardcodes "14 pages" of templates when 45 exist. Net: ~230-290 real indexed URLs invisible to llms.txt. `app/sitemap.ts` does it correctly (`:84-176` walks filesystem; `:224-262` enumerates programmatic families). Sitemap generated; llms.txt not — core fragility.

## C. Hardcoded lists that will go stale (ranked)
1. public/llms.txt + llms-full.txt — should be `app/llms.txt/route.ts` generated from listApprovedMatrixSlugs()/listCompetitorSlugs()/listExcelTemplateSlugs()/allPosts (same sources as sitemap).
2. public/openapi.json — static, no generator, no test against route handlers.
3. Endpoint list in FOUR places: openapi.json, api/route.ts:23-32, developers/page.tsx:17-66, agent-markdown.ts:68-77. Nothing cross-checks.
4. HOME_MARKDOWN — hand-written mirror carrying prices ($25,000/$35,000); pricing drift has precedent (commit 04507857).
5. middleware.ts:74-80 hasMarkdownVariant — new variants require editing 2 files, no shared source of truth.
6. not-found-content.tsx:60-98 — hardcoded links; "2,400+ articles" count baked in.
7. sitemap.ts:12-63 — hardcoded priority slug sets.

## D. Verification not enforced
verify-agentic.mjs not in package.json scripts; no .github/workflows/. Manual-only. Script weaknesses: H1-opacity check misses the motion-wrapper pattern; openapi allDescribed check skips operations lacking operationId.

## E. Smaller inconsistencies
- `app/(app)/api/health/route.ts:11-18` returns EMPTY body on failure — contradicts "all errors are structured JSON" claim in openapi.json + agent-markdown.ts:65-66. Also destructures statusCode from untyped unknown.
- robots.ts disallows `/api/` while llms.txt:231 and api/route.ts advertise GET /api (exact /api not matched by /api/ prefix — works today, contradictory intent).
- /md/* relies solely on per-response X-Robots-Tag noindex; not in robots DISALLOWED_PATHS nor middleware NOINDEX_PREFIXES (single point of failure).

# Additional affordances beyond the verify script
1. `app/robots.ts:47-90` — explicit Allow records for 19-20 named AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot(-Extended), meta-externalagent, FacebookBot, CCBot, Amazonbot, DuckAssistBot, YouBot, MistralAI-User, cohere-ai, Bytespider). llms files in ALLOWED_PATHS (`:46`).
2. /llms-full.txt second tier.
3. Structured data well beyond Organization: SoftwareApplicationJsonLd (Offer/price/OS/featureList), BreadcrumbJsonLd, ArticleJsonLd, FAQJsonLd, FeaturePageJsonLd, IndustryPageJsonLd, VideoObjectJsonLd; blog-post-schema.tsx BlogPosting+BreadcrumbList+FAQPage per post; every ~186 matrix page emits SoftwareApplication + FAQPage + BreadcrumbList (`app/(app)/(marketing)/[matrixSlug]/page.tsx:66-78`). All bound to #organization via @id.
4. Disambiguation content aimed at models (llms.txt "Notes for AI Assistants"; llms-full.txt "Read This First").
5. Canonical pointers embedded in markdown payloads (`route.ts:52`).
6. 410 Gone for dead legacy paths.
7. Sitemap correctness (capDate, redirect/thin-page exclusion, glossary canonical remap).
8. Vary: Accept on the HTML side too (middleware.ts:179-181).
No Accept-based JSON negotiation on marketing pages; no .well-known agent manifest, MCP server, or agents.json.


---

# Update 2026-08-28: second Is Agentic pass (score was 56/100)

The scan ran against a deploy that predated most of section 1-8 above; production now serves /openapi.json, JSON API 404s, `Vary: Accept` on `/`, and the complete Organization schema. This pass closes what was still genuinely open.

## What changed

1. **Public, credential-free API** (`/api/v1/*`, audit items 3, 4, 7, 8, 9)
   - `app/(app)/api/v1/products/route.ts` — `listProducts`: EDGEBIC editions + prices from `constants/app-info.ts`.
   - `app/(app)/api/v1/articles/route.ts` — `searchArticles`: ranked keyword search over `allPosts` (q, category, cluster, limit 1-100, offset). 400 with field-level `details` on bad input.
   - `app/(app)/api/v1/articles/[...slug]/route.ts` — `getArticle`: one article with markdown `body` + `faq`; glossary as `glossary/{term}`.
   - All three: JSON, `Access-Control-Allow-Origin: *`, public cache headers, `X-Robots-Tag: noindex`.
   - Pure logic in `lib/api/public-content.ts` (unit-tested).
2. **One endpoint registry** — `lib/api/public-endpoints.ts` now feeds `GET /api`, `/developers`, and `DEVELOPERS_MARKDOWN`. `tests/agentic-contracts.test.ts` asserts `public/openapi.json` documents exactly that set (method+path and operationId), so the four-copies drift in gap C.3 is closed.
3. **JSON error envelope** — `lib/api/json-error.ts`: `{ error, code, message, hint?, details?, links? }`. `/api/health` failure now returns it instead of an empty 503 body (gap E). `openapi.json` `Error` schema carries the `code` enum + `hint` + `links`; `NotFound` and `ServiceUnavailable` responses added.
4. **Markdown negotiation for every page** (audit items 1, 5)
   - Rules live in `lib/markdown/markdown-negotiation.ts` (edge-safe), shared by middleware and the /md route.
   - Middleware rewrites every page GET with `Accept: text/markdown` to `/md/<path>` (never /api, /md, /_next, or file-like paths) and appends `Vary: Accept` to every page response.
   - `/md/[...slug]`: native variants for `/`, `/developers`, `/blog/*`; everything else fetches its HTML twin with `Accept: text/html` + `x-markdown-fallback: 1` (loop guard): 404 → **markdown 404 with recovery links**, otherwise the HTML passes through (acceptmarkdown.com fallback). 502 markdown if the twin is unreachable.
   - Blog markdown canonical now uses `articlePath()`, so glossary posts point at `/blog/glossary/{term}` (was `/blog/glossary-{term}`).
5. **Discoverability** (audit items 6, 11) — `/developers` title/H2 carry "User Solutions" + "EDGEBIC" + "Public API", two endpoint tables (content vs licensing) with an Auth column, content-API curl examples; `llms.txt` developer section lists the v1 endpoints and the error envelope; `GET /api` description + `auth` per endpoint.
6. **Tests + verification wiring** — `npm run test:agentic` (36 pure unit tests, node:test via tsx) and `npm run verify:agentic [baseUrl]` (live checks, now also: markdown 404, HTML fallback + Vary, `/api/v1/*` happy/400/404 paths, health JSON).

## Not changed, and why

- **Organization schema (item 12)** — already complete in production (`contactPoint[]` + `PostalAddress`). No `streetAddress` because `AppInfo.ADDRESS` does not carry one; add it there if a street address should be public.
- **Homepage without JS (item 2)** — production already SSRs H1 → H2 → H3 with 3,240 chars; nothing to fix. The motion wrapper around the hero H1 remains a fragility (see section 2 above).
- **Brand-name search (item 10)** — off-site; needs consistent NAP listings, press links to the apex domain, and GBP. See MEMORY Phase B.
- **`/docs`** — no `content/docs` collection exists in this tree, so nothing links to it.

## How to verify

```bash
npm run test:agentic                       # pure unit contracts
npm run dev                                # then, in another shell:
npm run verify:agentic -- http://localhost:3000
curl -s -o /dev/null -w "%{http_code}
" http://localhost:3000/nope        # 404
curl -s -H "Accept: text/markdown" http://localhost:3000/nope | head -3   # "# 404 ..."
curl -s -D - -o /dev/null -H "Accept: text/markdown" http://localhost:3000/pricing | grep -i "^vary\|^content-type"
curl -s http://localhost:3000/api/v1/products | head -c 400
curl -s "http://localhost:3000/api/v1/articles?q=finite+capacity&limit=2"
```
After deploy: `npm run verify:agentic` (defaults to https://usersolutions.com).
