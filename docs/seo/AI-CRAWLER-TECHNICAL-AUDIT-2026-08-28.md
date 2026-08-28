# AI Crawler and Answer-Engine Technical Audit - 2026-08-28

Site: https://usersolutions.com (Next.js 15, self-hosted). Scope: can GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-SearchBot, Google-Extended, Googlebot, Bingbot/Copilot, Applebot-Extended, CCBot, Amazonbot, Meta-ExternalAgent, DuckAssistBot, YouBot, cohere-ai and Bytespider fetch and cite the site from the US, UK and Europe, and are the entity signals complete.

Method: curl against the live site (robots, llms files, sitemap, JSON-LD, headers, per-UA fetches, a four-node UK/DE/NL/US HTTP check via check-host.net) plus read-only inspection of the repo. No project code was run.

Severity scale: High = blocks or materially weakens AI fetch/citation. Medium = weakens a signal. Low = hygiene.

## Findings table

| # | Check | Result | Evidence | Severity | Fix |
|---|---|---|---|---|---|
| 1 | robots.txt: AI bots allowed | Pass, with one gap. Wildcard allows all; a named record explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot, Applebot-Extended, meta-externalagent, FacebookBot, CCBot, Amazonbot, DuckAssistBot, YouBot, MistralAI-User, cohere-ai, Bytespider. Googlebot and Bingbot were only covered by the wildcard. | `curl https://usersolutions.com/robots.txt`; source `app/robots.ts` | Low | Applied: Googlebot, Bingbot, Meta-ExternalAgent and Meta-ExternalFetcher added to the named record in `app/robots.ts`. |
| 2 | robots.txt: sitemap reference | Pass | `Sitemap: https://usersolutions.com/sitemap.xml` present | - | - |
| 3 | robots.txt: disallow hits public content | Fail for the content API. `Disallow: /api/` applies to every bot, including the AI record, while llms.txt (lines 231-234) and openapi.json invite agents to call `/api`, `/api/v1/products`, `/api/v1/articles`. Robots-compliant assistants will refuse the endpoints we document. Marketing pages, /blog, /blogs, /llms.txt, /llms-full.txt and /md/* are not hit by any disallow. | robots.txt live; `public/llms.txt` lines 231-234 | High | Applied: `Allow: /openapi.json`, `Allow: /api$`, `Allow: /api/v1/` added in `app/robots.ts` (longest match beats `/api/`). Deploy to take effect. |
| 4 | /llms.txt live | Pass. 200, `text/plain; charset=utf-8`, 25,816 bytes, `Cache-Control: public, max-age=86400`, no X-Robots-Tag. | curl -I | - | Note: the working tree has an uncommitted rewrite of `public/llms.txt` (another agent). Not touched here. |
| 5 | /llms-full.txt live | Pass. 200, text/plain, 39,268 bytes. | curl -I | - | - |
| 6 | llms.txt link resolution (10 spot HEADs) | Pass. 10/10 returned 200: /, /edgebic, /blog/edgebic-shop-floor-guide, /blog/rmdb-vs-planettogether, /blogs?product=EDGEBIC&category=..., /compare-products/rmdb-vs-fishbowl, /excel-templates/mrp, /jsl-job-scheduler-lite, /packaging-manufacturing-software, /textile-garment-manufacturing-software | curl -I per URL | - | - |
| 7 | Sitemap: reachable, URL count | Pass. Single urlset, 570 KB, 2,893 `<loc>` entries, 2,893 `<lastmod>` (100%). Under the 50k URL / 50 MB limit. | `curl /sitemap.xml` | - | - |
| 8 | Sitemap: lastmod quality | Weak signal. Every lastmod is stamped 2026-08-27T21:27-21:31Z (the build time), so lastmod says "rebuilt", not "content changed". Google discounts lastmod values that do not track real changes. | sitemap.xml lines 1-20 | Medium | In `app/sitemap.ts` use frontmatter `updatedAt`/`date` for blog posts and a per-page constant or git date for marketing pages instead of the build timestamp. |
| 9 | Sitemap: 15 URL spot-check (200 + self-canonical) | Pass. 15/15 returned 200 and 14/15 self-canonical. The one mismatch is cosmetic: sitemap lists `https://usersolutions.com/` and the page canonical is `https://usersolutions.com` (trailing slash only). | list below | Low | Emit the homepage loc without the trailing slash in `app/sitemap.ts`, or leave (Google normalises the root). |
| 10 | Organization JSON-LD | Pass. `@id` `/#organization`, name, legalName, alternateName, url, logo (`/logos/edgebic-logo.png`), description, email, telephone `+1-248-486-6365`, foundingDate `1991`, address (South Lyon, MI, 48178, US), two contactPoints (sales, technical support), knowsAbout, award, sameAs (LinkedIn, Facebook, X, YouTube, Capterra, G2). Emitted on every page from `app/layout.tsx`. | JSON-LD on /, /edgebic, /finite-capacity-scheduling-software, /compare-products | - | No edit to `lib/seo/schema-nodes.ts` needed; foundingDate, address and contactPoint are already live. |
| 11 | Organization JSON-LD: missing items | Partial. No `streetAddress` (no street address exists anywhere in the repo, so none was added). No Crunchbase, Wikipedia or Wikidata sameAs (no such profiles found in the repo; do not fabricate). `areaServed` absent on the LIVE node; the working tree already adds `SERVED_AREAS` (another agent) so it ships on next deploy. contactPoint says `areaServed: Worldwide`, which a UK or Germany query cannot match. | live JSON-LD vs `git diff lib/seo/schema-nodes.ts` | Medium | If a street or PO Box address is publishable, add `STREET` to `constants/app-info.ts` ADDRESS and `streetAddress` in `components/seo/json-ld.tsx`. Create a Crunchbase organization profile and a Wikidata item (both free) and add them to `PROFILE_LINKS`. |
| 12 | SoftwareApplication JSON-LD (/edgebic) | Pass. Three nodes: EDGEBIC (`SoftwareApplication, ProductModel`), EDGEBIC APS, EDGEBIC Complete. Each has applicationCategory `BusinessApplication`, applicationSubCategory, operatingSystem `Windows`, softwareRequirements, publisher, featureList, offers with price 25000 / 35000 USD, InStock, url /pricing. No aggregateRating (correct: none is faked). | JSON-LD on /edgebic | - | - |
| 13 | SoftwareApplication JSON-LD: missing items | `areaServed` missing on offers on the live site (pending in working tree). No `dateModified`/`datePublished` on the product nodes. `/finite-capacity-scheduling-software` and `/compare-products` carry no SoftwareApplication reference at all (only Organization, WebSite, Breadcrumb, WebPage/FAQ); they could reference the EDGEBIC node by `@id` (`about` / `mentions`) so the engine links those pages to the product entity. | JSON-LD extraction | Medium | Add `about: { '@id': schemaNodeIds().edgebic }` to the WebPage node on solution and comparison pages. |
| 14 | Hosting / CDN | Origin is a single Hetzner server: IP 204.168.128.241, rDNS `static.241.128.168.204.clients.your-server.de`, AS24940 Hetzner Online, geolocated Helsinki, Finland. No Vercel or Cloudflare headers, no `Server` header, no CDN. Next.js ISR cache (`X-Nextjs-Cache: HIT`, `s-maxage=31536000`). | curl -I, ipinfo.io | Medium | Nothing blocks crawlers, but US visitors and US-based crawlers (GPTBot, ClaudeBot, Bingbot all crawl from the US) see about 4x the latency of EU nodes. Put Cloudflare (free tier, with "Verified bots" and AI crawlers left allowed) or Vercel edge in front, or at minimum keep the ISR cache hot. |
| 15 | Geo reachability UK / EU / US | Pass. check-host.net GET /llms.txt: London 200 in 0.16 s, Nuremberg 200 in 0.12 s, Amsterdam 200 in 0.12 s, Los Angeles 200 in 0.53 s. No geo-blocking. | https://check-host.net/check-report/491f8a60k92b | - | - |
| 16 | Bot challenge / UA blocking | Pass. `curl -A` with GPTBot, PerplexityBot, ClaudeBot, curl/8.0 and Bingbot all returned 200 on / in about 1.0 s. No Cloudflare challenge, no 403, no JS gate. | curl -A tests | - | - |
| 17 | X-Robots-Tag on content | Pass for HTML, llms files, sitemap, /md/*: no X-Robots-Tag. Note: `/api/v1/*` responds `X-Robots-Tag: noindex, nofollow, noarchive` with `Access-Control-Allow-Origin: *`. noindex on JSON is fine; `nofollow` is pointless on JSON. | curl -I /api/v1/products | Low | Optional: drop `nofollow` from the API header so link-following agents are not told to ignore the `url`/`markdownUrl` fields. |
| 18 | Freshness: blog posts | Pass. Blog posts expose `article:published_time`, `article:modified_time` and `dateModified` in JSON-LD (checked /blog/what-is-safety-stock-in-manufacturing: 2026-07-29). | curl page, grep meta | - | - |
| 19 | Freshness: marketing pages | Fail. /, /edgebic, /finite-capacity-scheduling-software, /compare-products expose no `article:modified_time`, no `og:updated_time`, and the WebPage node has no `dateModified`/`datePublished`. Answer engines cannot tell how current the product and pricing pages are. | JSON-LD extraction; grep for `article:modified_time` returned nothing | Medium | Add `dateModified` (and `datePublished`) to the WebPage / SoftwareApplication nodes from a per-page constant, and emit `og:updated_time` via `createPageMetadata`. |
| 20 | Blog listing pagination crawlability | Partial. /blogs renders links to `/blogs?page=2` ... `/blogs?page=199` in HTML (crawlable without JS) and `?page=N` returns 200. But every paginated page canonicalises to `/blogs` and there is no `rel="next"`/`rel="prev"`. Crawlers treat page 2+ as duplicates of page 1, so listing pages contribute no discovery beyond page 1 (posts are still discovered via the sitemap). `/blogs/page/2` is 404 (not used). `/blog` duplicates `/blogs` with canonical to `/blogs`. | curl /blogs, /blogs?page=2 | Low | Make paginated pages self-canonical (`/blogs?page=2`) and add `rel=next/prev` links; 301 `/blog` to `/blogs` in `next.config.mjs`. |
| 21 | Content API live | Pass. `GET /api` 200 JSON index (2,485 B). `GET /api/v1/products` 200 JSON. `GET /api/v1/articles?q=safety%20stock&limit=1` returns `{total, limit, offset, items[]}` with `url` and `markdownUrl`. `GET /api/v1/articles/what-is-safety-stock-in-manufacturing` 200 JSON 7,215 B with full markdown body. `GET /md/blog/<slug>` 200 `text/markdown` (5,120 B). `GET /openapi.json` 200 (44.5 KB). Unknown page with `Accept: text/markdown` returns a 404 as `text/markdown`. | curl | - | Documented in llms.txt lines 231-237 (JSON index, v1 endpoints, OpenAPI, error contract). |
| 22 | Content API: robots conflict | Fail (see #3). The documented API was unreachable to any robots-compliant agent. | robots.txt `Disallow: /api/` | High | Applied in `app/robots.ts`. |
| 23 | Content API: markdown route not in llms.txt | Gap. `/md/blog/<slug>` (text/markdown) is the cheapest fetch for an agent but llms.txt does not mention the `/md/` prefix; it is only discoverable through the API's `markdownUrl` field. | live llms.txt grep `/md/` returned nothing | Low | Add one line to llms.txt: "Any blog post is available as plain Markdown at /md/blog/{slug}". Not edited here (llms.txt is owned by another in-flight change). |
| 24 | Bing: BingSiteAuth.xml | Absent (404). Only `google-site-verification` meta is present in the homepage head; no `msvalidate.01` meta. Bing Webmaster Tools may already be verified via DNS or GSC import; confirm. | curl /BingSiteAuth.xml; grep homepage head | Medium | Verify the site in Bing Webmaster Tools (Import from GSC is one click) and submit the sitemap. Copilot, DuckDuckGo, ChatGPT search (which uses Bing) and Perplexity all lean on the Bing index. |
| 25 | IndexNow key | Present already: `public/usersolutions-indexnow-key.txt` containing `usersolutions-indexnow-key` (a valid key by the spec: 8-128 chars, a-z A-Z 0-9 and dash), live 200 text/plain. No evidence in the repo that it was ever submitted (no script references it). | curl /usersolutions-indexnow-key.txt | Low | Applied: a second, hex key file `public/3e1845c37e779c0a8e2a339ddcc8169d.txt` added as requested. Either key works; use one and submit (commands below). |
| 26 | Trailing-slash and redirect hygiene | Pass. `/edgebic/` 308 to `/edgebic`. | curl | - | - |
| 27 | Security headers vs. crawlers | Pass. CSP, HSTS, X-Frame-Options deny do not affect crawler fetches. `frame-ancestors 'none'` only blocks embedding. | curl -I | - | - |

## Sitemap spot-check detail (15 URLs)

All 200. Self-canonical unless noted.

- https://usersolutions.com/ (canonical https://usersolutions.com, trailing-slash only)
- /blog/configuration-mistakes-edgebic
- /blog/edgebic-gantt-view-explained
- /blog/glossary/finished-goods
- /blog/how-an-adherence-number-becomes-an-investigation-list
- /blog/how-to-choose-the-optimizer-engine-in-edgebic
- /blog/how-to-schedule-a-single-job-in-edgebic
- /blog/made2manage-to-edgebic-data-mapping-reference
- /blog/raw-material-management
- /blog/the-operator-attend-fraction-explained
- /blog/what-is-a-reorder-method-in-inventory-planning
- /blog/what-is-safety-stock-in-manufacturing
- /compare-products/rmdb-vs-preactor
- /mrp-software-for-job-shops
- /what-if-analysis-for-medical-device-manufacturing

## Per-bot status

| Bot | Operator | robots.txt (after this change) | Live fetch test |
|---|---|---|---|
| GPTBot | OpenAI | allowed (named) | 200 |
| OAI-SearchBot | OpenAI | allowed (named) | not tested (same path) |
| ChatGPT-User | OpenAI | allowed (named) | not tested |
| PerplexityBot | Perplexity | allowed (named) | 200 |
| Perplexity-User | Perplexity | allowed (named) | not tested |
| ClaudeBot | Anthropic | allowed (named) | 200 |
| Claude-SearchBot | Anthropic | allowed (named) | not tested |
| Google-Extended | Google | allowed (named) | n/a (control token, not a fetcher) |
| Googlebot | Google | allowed (named; wildcard only before) | not tested |
| Bingbot | Microsoft / Copilot | allowed (named; wildcard only before) | 200 |
| Applebot-Extended | Apple | allowed (named) | n/a (control token) |
| CCBot | Common Crawl | allowed (named) | not tested |
| Amazonbot | Amazon | allowed (named) | not tested |
| Meta-ExternalAgent | Meta | allowed (named; both casings after this change) | not tested |
| DuckAssistBot | DuckDuckGo | allowed (named) | not tested |
| YouBot | You.com | allowed (named) | not tested |
| cohere-ai | Cohere | allowed (named) | not tested |
| Bytespider | ByteDance | allowed (named) | not tested |

No bot in scope is blocked. No per-UA server-side filtering was found (all tested UAs got identical 200 responses in about 1.0 s).

## IndexNow submission

Two key files now exist in `public/`; both are valid. Pick one (the hex one is recommended) and use it consistently.

Key: `3e1845c37e779c0a8e2a339ddcc8169d`
Key location: `https://usersolutions.com/3e1845c37e779c0a8e2a339ddcc8169d.txt` (goes live on next deploy; verify with `curl -i https://usersolutions.com/3e1845c37e779c0a8e2a339ddcc8169d.txt`, expect 200 and a body equal to the key).

Single URL:

```
curl -i "https://api.indexnow.org/indexnow?url=https://usersolutions.com/edgebic&key=3e1845c37e779c0a8e2a339ddcc8169d"
```

Batch (up to 10,000 URLs per call):

```
curl -i -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "usersolutions.com",
    "key": "3e1845c37e779c0a8e2a339ddcc8169d",
    "keyLocation": "https://usersolutions.com/3e1845c37e779c0a8e2a339ddcc8169d.txt",
    "urlList": [
      "https://usersolutions.com/",
      "https://usersolutions.com/edgebic",
      "https://usersolutions.com/pricing",
      "https://usersolutions.com/finite-capacity-scheduling-software",
      "https://usersolutions.com/compare-products",
      "https://usersolutions.com/llms.txt"
    ]
  }'
```

Expected: `200 OK` or `202 Accepted`. `403` means the key file is not yet live or does not match; `422` means a URL is on a different host. One submission to api.indexnow.org fans out to Bing, Yandex, Naver, Seznam and Yep. Google does not consume IndexNow; use the Search Console sitemap and URL Inspection for Google.

Full-sitemap submission (run after deploy; reads the live sitemap):

```
curl -s https://usersolutions.com/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' | head -10000 \
  | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.stringify({host:"usersolutions.com",key:"3e1845c37e779c0a8e2a339ddcc8169d",keyLocation:"https://usersolutions.com/3e1845c37e779c0a8e2a339ddcc8169d.txt",urlList:s.trim().split("\n")})))' \
  | curl -i -X POST "https://api.indexnow.org/indexnow" -H "Content-Type: application/json; charset=utf-8" --data-binary @-
```

## Recommended next actions (not applied; need an owner decision or touch files outside this audit's remit)

1. Deploy, then confirm `curl https://usersolutions.com/robots.txt | grep "Allow: /api"` shows the new allows and that the hex key file returns 200.
2. Verify usersolutions.com in Bing Webmaster Tools (Import from GSC), submit `/sitemap.xml`, then run the IndexNow batch above.
3. Fix sitemap `lastmod` to reflect real content dates (`app/sitemap.ts`), and add `dateModified` to marketing WebPage / SoftwareApplication nodes plus `og:updated_time`.
4. Reference the EDGEBIC `@id` from solution and comparison pages (`about` on the WebPage node) so those pages attach to the product entity.
5. Put a CDN with edge caching in front of the Hetzner origin (Cloudflare free with AI crawlers allowed, or Vercel) to cut US TTFB from about 0.5 s to about 0.1 s; the US is where most AI crawlers and buyers are.
6. Create Crunchbase and Wikidata entries and add them to `PROFILE_LINKS` / Organization `sameAs`. Consider publishing a street or PO Box address for a full PostalAddress.
7. Add a `/md/blog/{slug}` line to llms.txt once the in-flight llms.txt change lands; make blog pagination self-canonical with rel next/prev.

## Files changed by this audit

- `app/robots.ts`: named Googlebot, Bingbot, Meta-ExternalAgent, Meta-ExternalFetcher in the AI record; added `Allow: /openapi.json`, `/api$`, `/api/v1/`. All existing disallows unchanged.
- `public/3e1845c37e779c0a8e2a339ddcc8169d.txt`: new IndexNow key file.
- `docs/seo/AI-CRAWLER-TECHNICAL-AUDIT-2026-08-28.md`: this document.

Not changed: `lib/seo/schema-nodes.ts` (Organization already carries foundingDate, address and contactPoint; areaServed is being added by another agent), any marketing page, `public/llms.txt`, `app/sitemap.ts`.
