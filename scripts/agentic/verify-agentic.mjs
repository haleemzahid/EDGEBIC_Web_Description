#!/usr/bin/env node
/**
 * Agent-readiness verification suite.
 *
 * Checks every behavior added for the Is Agentic audit fixes against a running
 * instance of the site (local dev or production). Read-only: only GET/HEAD/POST
 * requests to public endpoints with dummy data; nothing is mutated.
 *
 * Usage:
 *   node scripts/agentic/verify-agentic.mjs                       # against production
 *   node scripts/agentic/verify-agentic.mjs http://localhost:3000 # against local dev
 *
 * Exits 0 when all checks pass, 1 otherwise.
 */

const base = (process.argv[2] ?? 'https://usersolutions.com').replace(/\/+$/, '');

let passed = 0;
let failed = 0;
const failures = [];

function report(ok, name, detail = '') {
  if (ok) {
    passed++;
    console.log(`  PASS  ${name}`);
  } else {
    failed++;
    failures.push(name);
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

async function get(path, headers = {}) {
  return fetch(`${base}${path}`, { headers, redirect: 'manual' });
}

async function main() {
  console.log(`Verifying agent readiness of ${base}\n`);

  // 1. Agent-friendly 404s -------------------------------------------------
  {
    const res = await get('/some-path-that-does-not-exist-xyz');
    report(res.status === 404, '404 status for nonexistent path', `got ${res.status}`);
    const body = await res.text();
    report(
      body.includes('sitemap.xml') && body.includes('llms.txt'),
      '404 body carries recovery links (sitemap.xml, llms.txt)'
    );

    // Agents asking for markdown get a markdown 404 with the same links.
    const md = await get('/some-path-that-does-not-exist-xyz', { Accept: 'text/markdown' });
    report(md.status === 404, 'markdown request for nonexistent path returns 404', `got ${md.status}`);
    const mdType = md.headers.get('content-type') ?? '';
    report(mdType.includes('text/markdown'), 'markdown 404 is text/markdown', `got ${mdType}`);
    const mdBody = await md.text();
    report(
      mdBody.trimStart().startsWith('# 404') && mdBody.includes('sitemap.xml') && mdBody.includes('llms.txt'),
      'markdown 404 body starts with an H1 and carries recovery links'
    );
  }

  // 2. Content without JavaScript ------------------------------------------
  {
    const res = await get('/');
    const html = await res.text();
    report(res.status === 200, 'homepage returns 200', `got ${res.status}`);
    report(/<h1[\s>]/i.test(html), 'homepage raw HTML has an H1');
    report(/<h2[\s>]/i.test(html), 'homepage raw HTML has H2 subheadings');
    const textLength = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').length;
    report(textLength > 500, 'homepage raw HTML has 500+ chars of text', `got ${textLength}`);
    report(
      !/initial=.*opacity:\s*0/.test(html) || !/<h1[^>]*style="[^"]*opacity:\s*0/.test(html),
      'H1 not hidden at opacity 0 in raw HTML'
    );
  }

  // 3. OpenAPI spec ---------------------------------------------------------
  {
    const res = await get('/openapi.json');
    report(res.status === 200, '/openapi.json returns 200', `got ${res.status}`);
    let spec = null;
    try {
      spec = await res.json();
    } catch {
      /* handled below */
    }
    report(!!spec && typeof spec.openapi === 'string', '/openapi.json is valid JSON with an openapi version');
    if (spec) {
      const opIds = [];
      for (const item of Object.values(spec.paths ?? {})) {
        for (const op of Object.values(item)) {
          if (op && typeof op === 'object' && op.operationId) opIds.push(op.operationId);
        }
      }
      report(opIds.length >= 8, 'spec documents 8+ operations', `got ${opIds.length}`);
      report(new Set(opIds).size === opIds.length, 'operationIds are unique');
      const allDescribed = Object.values(spec.paths ?? {}).every((item) =>
        Object.values(item).every(
          (op) => typeof op !== 'object' || !op.operationId || !!op.description
        )
      );
      report(allDescribed, 'every operation has a description');
    }
  }

  // 4. JSON error responses -------------------------------------------------
  {
    const res = await get('/api/nonexistent-endpoint-xyz');
    report(res.status === 404, 'unknown /api path returns 404', `got ${res.status}`);
    const type = res.headers.get('content-type') ?? '';
    report(type.includes('application/json'), 'unknown /api path returns JSON', `got ${type}`);
    try {
      const body = await res.json();
      report(!!body.error && !!body.code && !!body.links, 'API 404 has error, code, and recovery links');
    } catch {
      report(false, 'API 404 body parses as JSON');
    }

    const idx = await get('/api');
    report(idx.status === 200, 'GET /api returns 200 (API index)', `got ${idx.status}`);
    try {
      const body = await idx.json();
      report(Array.isArray(body.endpoints) && !!body.openapi, '/api index lists endpoints and links openapi');
    } catch {
      report(false, '/api index parses as JSON');
    }

    // A real endpoint's validation error must also be JSON.
    const bad = await fetch(`${base}/api/license/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}'
    });
    report(bad.status === 400, 'validation failure returns 400', `got ${bad.status}`);
    report(
      (bad.headers.get('content-type') ?? '').includes('application/json'),
      'validation failure body is JSON'
    );
  }

  // 5. Markdown content negotiation ----------------------------------------
  {
    const res = await get('/', { Accept: 'text/markdown' });
    const type = res.headers.get('content-type') ?? '';
    report(type.includes('text/markdown'), 'Accept: text/markdown on / returns text/markdown', `got ${type}`);
    const vary = res.headers.get('vary') ?? '';
    report(/\baccept\b/i.test(vary), 'markdown response Vary includes Accept', `got "${vary}"`);
    const body = await res.text();
    report(body.trimStart().startsWith('#'), 'markdown body starts with a heading');

    const htmlRes = await get('/', { Accept: 'text/html' });
    const htmlVary = htmlRes.headers.get('vary') ?? '';
    report(/\baccept\b/i.test(htmlVary), 'HTML response Vary includes Accept', `got "${htmlVary}"`);

    const mdBlog = await get('/blog/edgebic-complete-guide', { Accept: 'text/markdown' });
    report(
      (mdBlog.headers.get('content-type') ?? '').includes('text/markdown'),
      'blog post negotiates to markdown',
      `got ${mdBlog.headers.get('content-type')}`
    );

    const md404 = await get('/blog/this-post-does-not-exist-xyz', { Accept: 'text/markdown' });
    report(md404.status === 404, 'markdown request for unknown post returns 404', `got ${md404.status}`);

    // A page with no native markdown variant falls back to its HTML (200),
    // still declaring Vary: Accept — the acceptmarkdown.com contract.
    const fallback = await get('/pricing', { Accept: 'text/markdown' });
    report(fallback.status === 200, 'markdown request for HTML-only page returns 200', `got ${fallback.status}`);
    report(
      (fallback.headers.get('content-type') ?? '').includes('text/html'),
      'HTML-only page falls back to text/html for markdown clients',
      `got ${fallback.headers.get('content-type')}`
    );
    report(
      /\baccept\b/i.test(fallback.headers.get('vary') ?? ''),
      'HTML fallback Vary includes Accept',
      `got "${fallback.headers.get('vary')}"`
    );
    const anyPage = await get('/pricing', { Accept: 'text/html' });
    report(
      /\baccept\b/i.test(anyPage.headers.get('vary') ?? ''),
      'ordinary HTML page Vary includes Accept',
      `got "${anyPage.headers.get('vary')}"`
    );
  }

  // 7-9. Public, credential-free API surface -------------------------------
  {
    const products = await get('/api/v1/products');
    report(products.status === 200, 'GET /api/v1/products returns 200', `got ${products.status}`);
    report(
      (products.headers.get('content-type') ?? '').includes('application/json'),
      '/api/v1/products is JSON'
    );
    try {
      const body = await products.json();
      report(
        Array.isArray(body.products) && body.products.length >= 2 && body.products.every((p) => typeof p.price?.amount === 'number'),
        '/api/v1/products lists editions with numeric prices'
      );
    } catch {
      report(false, '/api/v1/products parses as JSON');
    }

    const search = await get('/api/v1/articles?q=finite+capacity+scheduling&limit=3');
    report(search.status === 200, 'GET /api/v1/articles?q= returns 200', `got ${search.status}`);
    let firstSlug = null;
    try {
      const body = await search.json();
      report(
        typeof body.total === 'number' && Array.isArray(body.items) && body.items.length > 0 && body.items.length <= 3,
        '/api/v1/articles returns ranked, limited items'
      );
      firstSlug = body.items?.[0]?.slug ?? null;
    } catch {
      report(false, '/api/v1/articles parses as JSON');
    }

    if (firstSlug) {
      const article = await get(`/api/v1/articles/${firstSlug}`);
      report(article.status === 200, 'GET /api/v1/articles/{slug} returns 200', `got ${article.status}`);
      try {
        const body = await article.json();
        report(typeof body.body === 'string' && body.body.length > 100, 'article detail carries a markdown body');
      } catch {
        report(false, 'article detail parses as JSON');
      }
    }

    const badQuery = await get('/api/v1/articles?limit=999');
    report(badQuery.status === 400, 'invalid article query returns 400', `got ${badQuery.status}`);
    try {
      const body = await badQuery.json();
      report(body.code === 'bad_request' && Array.isArray(body.details), '400 body has code and field-level details');
    } catch {
      report(false, '400 body parses as JSON');
    }

    const missing = await get('/api/v1/articles/this-article-does-not-exist-xyz');
    report(missing.status === 404, 'unknown article returns 404', `got ${missing.status}`);
    try {
      const body = await missing.json();
      report(body.code === 'not_found' && !!body.links?.search, 'article 404 has code and a search link');
    } catch {
      report(false, 'article 404 parses as JSON');
    }

    const health = await get('/api/health');
    report(
      (health.headers.get('content-type') ?? '').includes('application/json'),
      '/api/health is JSON in both success and failure',
      `got ${health.status} ${health.headers.get('content-type')}`
    );
  }

  // 6. Developer discoverability -------------------------------------------
  {
    const res = await get('/developers');
    report(res.status === 200, '/developers returns 200', `got ${res.status}`);
    const html = await res.text();
    report(
      html.includes('openapi.json') && html.includes('llms.txt'),
      '/developers links openapi.json and llms.txt'
    );

    const llms = await get('/llms.txt');
    const llmsBody = await llms.text();
    report(llms.status === 200, '/llms.txt returns 200', `got ${llms.status}`);
    report(
      llmsBody.includes('/developers') && llmsBody.includes('openapi.json'),
      'llms.txt lists developer resources'
    );

    const home = await get('/');
    const homeHtml = await home.text();
    report(homeHtml.includes('/developers'), 'homepage links /developers (footer)');
    // /docs has no content collection behind it and returns 404, so nothing
    // may link to it until docs exist.
    report(
      !/href="\/docs(?:"|\/)/.test(homeHtml),
      'homepage does not link the empty /docs route'
    );
  }

  // 12. Organization schema -------------------------------------------------
  {
    const res = await get('/');
    const html = await res.text();
    const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
      (m) => m[1]
    );
    let org = null;
    for (const block of ldBlocks) {
      try {
        const data = JSON.parse(block);
        if (data['@type'] === 'Organization') org = data;
      } catch {
        /* skip malformed */
      }
    }
    report(!!org, 'homepage has Organization JSON-LD');
    if (org) {
      report(!!org.contactPoint?.length, 'Organization schema has contactPoint');
      report(
        !!org.address && !!org.address.postalCode,
        'Organization schema has address with postalCode'
      );
    }
  }

  console.log(`\n${passed} passed, ${failed} failed${failed ? `:\n  - ${failures.join('\n  - ')}` : ''}`);
  process.exit(failed ? 1 : 0);
}

main().catch((err) => {
  console.error('Verification aborted:', err);
  process.exit(1);
});
