/**
 * Unit contracts for the agent-readiness surface.
 *
 * Run: npm run test:agentic   (npx tsx --test tests/agentic-contracts.test.ts)
 *
 * Everything here is pure: no network, no database, no content-collections
 * build. The live-endpoint checks live in scripts/agentic/verify-agentic.mjs.
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';

import { AppInfo } from '@/constants/app-info';
import { healthFailureStatus } from '@/lib/api/health-status';
import { jsonErrorBody } from '@/lib/api/json-error';
import {
  ARTICLE_LIMIT_DEFAULT,
  ARTICLE_LIMIT_MAX,
  articlePath,
  findArticle,
  parseArticleQuery,
  productCatalog,
  searchArticles,
  slugAsParamsFromSegments,
  toArticleDetail,
  type ArticleSource
} from '@/lib/api/public-content';
import { PUBLIC_ENDPOINTS } from '@/lib/api/public-endpoints';
import {
  DEVELOPERS_MARKDOWN,
  HOME_MARKDOWN,
  notFoundMarkdown,
  unavailableMarkdown
} from '@/lib/markdown/agent-markdown';
import {
  acceptsMarkdown,
  hasNativeMarkdownVariant,
  isMarkdownNegotiable,
  markdownPathFor,
  shouldRewriteToMarkdown
} from '@/lib/markdown/markdown-negotiation';

const BASE = 'https://usersolutions.com';

// ---------------------------------------------------------------------------
// OpenAPI spec <-> endpoint registry
// ---------------------------------------------------------------------------

interface Operation {
  operationId?: string;
  summary?: string;
  description?: string;
  responses?: Record<string, unknown>;
  parameters?: { name: string; in: string; schema?: unknown }[];
}

const spec = JSON.parse(
  readFileSync(join(process.cwd(), 'public', 'openapi.json'), 'utf8')
) as {
  openapi: string;
  paths: Record<string, Record<string, Operation>>;
  components: { schemas: Record<string, unknown>; responses: Record<string, unknown> };
};

function specOperations(): { method: string; path: string; op: Operation }[] {
  const out: { method: string; path: string; op: Operation }[] = [];
  for (const [path, item] of Object.entries(spec.paths)) {
    for (const [method, op] of Object.entries(item)) {
      if (['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
        out.push({ method: method.toUpperCase(), path, op });
      }
    }
  }
  return out;
}

describe('openapi.json', () => {
  it('is OpenAPI 3.x', () => {
    assert.match(spec.openapi, /^3\./);
  });

  it('documents exactly the operations in the endpoint registry', () => {
    const inSpec = specOperations()
      .map((o) => `${o.method} ${o.path}`)
      .sort();
    const inRegistry = PUBLIC_ENDPOINTS.map((e) => `${e.method} ${e.path}`).sort();
    assert.deepEqual(inSpec, inRegistry);
  });

  it('uses the same operationIds as the registry', () => {
    for (const e of PUBLIC_ENDPOINTS) {
      const op = spec.paths[e.path]?.[e.method.toLowerCase()];
      assert.ok(op, `missing ${e.method} ${e.path}`);
      assert.equal(op.operationId, e.operationId);
    }
  });

  it('gives every operation a unique operationId, summary, description, and a 200 schema', () => {
    const ids = new Set<string>();
    for (const { method, path, op } of specOperations()) {
      const label = `${method} ${path}`;
      assert.ok(op.operationId, `${label}: operationId`);
      assert.ok(!ids.has(op.operationId), `${label}: duplicate operationId`);
      ids.add(op.operationId);
      assert.ok(op.summary, `${label}: summary`);
      assert.ok(op.description && op.description.length > 40, `${label}: description`);
      const ok = op.responses?.['200'] as
        | { content?: Record<string, { schema?: unknown }> }
        | undefined;
      assert.ok(ok, `${label}: 200 response`);
      const hasSchema = Object.values(ok.content ?? {}).some((c) => !!c.schema);
      assert.ok(hasSchema, `${label}: 200 response schema`);
    }
  });

  it('types every parameter', () => {
    for (const { method, path, op } of specOperations()) {
      for (const p of op.parameters ?? []) {
        const resolved =
          '$ref' in (p as object)
            ? (spec.components as unknown as { parameters: Record<string, { schema?: unknown }> })
                .parameters[(p as unknown as { $ref: string }).$ref.split('/').pop()!]
            : p;
        assert.ok(resolved?.schema, `${method} ${path}: parameter ${p.name ?? '$ref'} schema`);
      }
    }
  });

  it('describes the JSON error envelope with a machine-readable code', () => {
    const err = spec.components.schemas.Error as {
      properties: Record<string, { enum?: string[] }>;
    };
    assert.ok(err.properties.code?.enum?.includes('not_found'));
    assert.ok(err.properties.hint);
    assert.ok(err.properties.links);
  });

  it('never advertises an empty error body', () => {
    const health = spec.paths['/api/health'].get;
    assert.ok(health.responses?.['503']);
    assert.doesNotMatch(health.description ?? '', /empty body/i);
  });
});

// ---------------------------------------------------------------------------
// Endpoint registry
// ---------------------------------------------------------------------------

describe('PUBLIC_ENDPOINTS', () => {
  it('has unique operationIds and method+path pairs', () => {
    const ids = PUBLIC_ENDPOINTS.map((e) => e.operationId);
    assert.equal(new Set(ids).size, ids.length);
    const keys = PUBLIC_ENDPOINTS.map((e) => `${e.method} ${e.path}`);
    assert.equal(new Set(keys).size, keys.length);
  });

  it('exposes at least three endpoints that need no credential', () => {
    const open = PUBLIC_ENDPOINTS.filter((e) => e.auth === 'none' && e.tag === 'content');
    assert.ok(open.length >= 3);
  });

  it('is the list the markdown developer page renders', () => {
    for (const e of PUBLIC_ENDPOINTS) {
      assert.ok(DEVELOPERS_MARKDOWN.includes(e.operationId), e.operationId);
      assert.ok(DEVELOPERS_MARKDOWN.includes(e.path), e.path);
    }
  });
});

// ---------------------------------------------------------------------------
// JSON errors
// ---------------------------------------------------------------------------

describe('jsonErrorBody', () => {
  it('always carries error, code, and message', () => {
    const body = jsonErrorBody({ status: 404, code: 'not_found', message: 'Nope.' });
    assert.deepEqual(body, { error: 'Nope.', code: 'not_found', message: 'Nope.' });
  });

  it('keeps hint, details, and links when given', () => {
    const body = jsonErrorBody({
      status: 400,
      code: 'bad_request',
      message: 'Bad.',
      hint: 'Fix it.',
      details: [{ param: 'limit' }],
      links: { docs: `${BASE}/developers` }
    });
    assert.equal(body.hint, 'Fix it.');
    assert.equal(body.details?.length, 1);
    assert.equal(body.links?.docs, `${BASE}/developers`);
  });
});

describe('healthFailureStatus', () => {
  it('uses the thrown statusCode when it is a number', () => {
    assert.equal(healthFailureStatus({ statusCode: 500 }), 500);
  });
  it('defaults to 503 otherwise', () => {
    assert.equal(healthFailureStatus(new Error('down')), 503);
    assert.equal(healthFailureStatus(null), 503);
    assert.equal(healthFailureStatus({ statusCode: '500' }), 503);
  });
});

// ---------------------------------------------------------------------------
// Content API helpers
// ---------------------------------------------------------------------------

function post(overrides: Partial<ArticleSource> & { slugAsParams: string }): ArticleSource {
  return {
    title: overrides.slugAsParams,
    description: '',
    category: 'Production Scheduling',
    cluster: 'production-scheduling',
    published: '2026-01-01T00:00:00.000Z',
    keywords: [],
    faqQuestions: [],
    body: { raw: `# ${overrides.slugAsParams}` },
    ...overrides
  };
}

const POSTS: ArticleSource[] = [
  post({
    slugAsParams: 'finite-capacity-scheduling-guide',
    title: 'Finite Capacity Scheduling: The Complete Guide',
    description: 'How finite capacity scheduling works.',
    targetPhrase: 'finite capacity scheduling',
    keywords: ['finite capacity scheduling', 'APS'],
    published: '2026-03-01T00:00:00.000Z'
  }),
  post({
    slugAsParams: 'mrp-basics',
    title: 'MRP Basics',
    description: 'Material requirements planning explained, with a note on capacity.',
    category: 'MRP',
    cluster: 'mrp',
    published: '2026-02-01T00:00:00.000Z'
  }),
  post({
    slugAsParams: 'glossary-finite-capacity',
    title: 'Finite Capacity',
    description: 'Glossary term.',
    category: 'Glossary',
    cluster: 'glossary',
    published: '2026-01-15T00:00:00.000Z'
  }),
  post({
    slugAsParams: 'newest-unrelated',
    title: 'Shop Floor Kiosk',
    description: 'Operator punches.',
    published: '2026-04-01T00:00:00.000Z'
  })
];

describe('articlePath / slugAsParamsFromSegments', () => {
  it('maps glossary posts to /blog/glossary/{term} and back', () => {
    assert.equal(articlePath('glossary-finite-capacity'), '/blog/glossary/finite-capacity');
    assert.equal(slugAsParamsFromSegments(['glossary', 'finite-capacity']), 'glossary-finite-capacity');
  });
  it('maps ordinary posts to /blog/{slug} and back', () => {
    assert.equal(articlePath('mrp-basics'), '/blog/mrp-basics');
    assert.equal(slugAsParamsFromSegments(['mrp-basics']), 'mrp-basics');
  });
});

describe('parseArticleQuery', () => {
  it('applies defaults', () => {
    const r = parseArticleQuery(new URLSearchParams(''));
    assert.ok(r.query);
    assert.equal(r.query.limit, ARTICLE_LIMIT_DEFAULT);
    assert.equal(r.query.offset, 0);
    assert.equal(r.query.q, null);
  });
  it('rejects out-of-range or non-integer paging with field-level issues', () => {
    const r = parseArticleQuery(new URLSearchParams(`limit=${ARTICLE_LIMIT_MAX + 1}&offset=-1`));
    assert.equal(r.query, null);
    assert.deepEqual(
      r.issues.map((i) => i.param).sort(),
      ['limit', 'offset']
    );
    assert.equal(parseArticleQuery(new URLSearchParams('limit=abc')).query, null);
    assert.equal(parseArticleQuery(new URLSearchParams('limit=2.5')).query, null);
  });
  it('rejects an over-long q', () => {
    const r = parseArticleQuery(new URLSearchParams({ q: 'x'.repeat(201) }));
    assert.equal(r.query, null);
    assert.equal(r.issues[0].param, 'q');
  });
});

describe('searchArticles', () => {
  it('ranks title matches above description matches and drops non-matches', () => {
    const r = searchArticles(
      POSTS,
      { q: 'capacity', category: null, cluster: null, limit: 20, offset: 0 },
      BASE
    );
    assert.deepEqual(
      r.items.map((i) => i.slug),
      ['finite-capacity-scheduling-guide', 'glossary-finite-capacity', 'mrp-basics']
    );
    assert.equal(r.total, 3);
  });
  it('is newest-first without q', () => {
    const r = searchArticles(
      POSTS,
      { q: null, category: null, cluster: null, limit: 20, offset: 0 },
      BASE
    );
    assert.equal(r.items[0].slug, 'newest-unrelated');
    assert.equal(r.total, POSTS.length);
  });
  it('filters by category and cluster case-insensitively', () => {
    const byCategory = searchArticles(
      POSTS,
      { q: null, category: 'glossary', cluster: null, limit: 20, offset: 0 },
      BASE
    );
    assert.deepEqual(byCategory.items.map((i) => i.slug), ['glossary-finite-capacity']);
    const byCluster = searchArticles(
      POSTS,
      { q: null, category: null, cluster: 'MRP', limit: 20, offset: 0 },
      BASE
    );
    assert.deepEqual(byCluster.items.map((i) => i.slug), ['mrp-basics']);
  });
  it('paginates and reports the unpaginated total', () => {
    const r = searchArticles(
      POSTS,
      { q: null, category: null, cluster: null, limit: 2, offset: 2 },
      BASE
    );
    assert.equal(r.items.length, 2);
    assert.equal(r.total, 4);
    assert.equal(r.offset, 2);
  });
  it('emits absolute canonical and markdown URLs', () => {
    const r = searchArticles(
      POSTS,
      { q: null, category: 'Glossary', cluster: null, limit: 1, offset: 0 },
      BASE
    );
    assert.equal(r.items[0].url, `${BASE}/blog/glossary/finite-capacity`);
    assert.equal(r.items[0].markdownUrl, `${BASE}/md/blog/glossary/finite-capacity`);
  });
});

describe('findArticle / toArticleDetail', () => {
  it('resolves glossary segments and returns the markdown body', () => {
    const found = findArticle(POSTS, ['glossary', 'finite-capacity']);
    assert.ok(found);
    const detail = toArticleDetail(found, BASE);
    assert.equal(detail.body, '# glossary-finite-capacity');
    assert.deepEqual(detail.faq, []);
  });
  it('returns undefined for unknown slugs', () => {
    assert.equal(findArticle(POSTS, ['nope']), undefined);
  });
});

describe('productCatalog', () => {
  it('reflects the editions and prices in AppInfo', () => {
    const c = productCatalog(BASE);
    assert.equal(c.products.length, 2);
    assert.equal(c.products[0].name, AppInfo.EDITIONS.APS.NAME);
    assert.equal(c.products[0].price.amount, Number(AppInfo.EDITIONS.APS.PRICE));
    assert.equal(c.products[1].price.amount, Number(AppInfo.EDITIONS.COMPLETE.PRICE));
    assert.equal(c.products[0].price.currency, 'USD');
    assert.equal(c.vendor.legalName, AppInfo.COMPANY_LEGAL_NAME);
    assert.equal(c.products[0].pricingUrl, `${BASE}/pricing`);
  });
  it('quotes the same prices the markdown homepage does', () => {
    const c = productCatalog(BASE);
    for (const p of c.products) {
      assert.ok(HOME_MARKDOWN.includes(`$${p.price.amount.toLocaleString('en-US')}`), p.name);
    }
  });
});

// ---------------------------------------------------------------------------
// Markdown negotiation
// ---------------------------------------------------------------------------

describe('markdown negotiation rules', () => {
  it('detects text/markdown anywhere in Accept', () => {
    assert.ok(acceptsMarkdown('text/markdown'));
    assert.ok(acceptsMarkdown('text/html;q=0.8, text/markdown;q=1'));
    assert.ok(!acceptsMarkdown('text/html,*/*'));
    assert.ok(!acceptsMarkdown(null));
  });

  it('rewrites page GETs with Accept: text/markdown, and nothing else', () => {
    const base = { method: 'GET', pathname: '/pricing', accept: 'text/markdown' };
    assert.ok(shouldRewriteToMarkdown(base));
    assert.ok(!shouldRewriteToMarkdown({ ...base, method: 'POST' }));
    assert.ok(!shouldRewriteToMarkdown({ ...base, accept: 'text/html' }));
    assert.ok(!shouldRewriteToMarkdown({ ...base, fallbackHeader: '1' }));
  });

  it('never rewrites the API, the md handler, Next internals, or files', () => {
    for (const p of ['/api', '/api/v1/products', '/md/index', '/_next/data/x', '/openapi.json', '/sitemap.xml', '/llms.txt']) {
      assert.ok(!isMarkdownNegotiable(p), p);
    }
    for (const p of ['/', '/pricing', '/blog/x', '/production-scheduling-software/michigan']) {
      assert.ok(isMarkdownNegotiable(p), p);
    }
  });

  it('maps the homepage to /md/index and others to /md/<path>', () => {
    assert.equal(markdownPathFor('/'), '/md/index');
    assert.equal(markdownPathFor('/blog/x'), '/md/blog/x');
  });

  it('knows which paths have a native markdown variant', () => {
    assert.ok(hasNativeMarkdownVariant('/'));
    assert.ok(hasNativeMarkdownVariant('/developers'));
    assert.ok(hasNativeMarkdownVariant('/blog/some-post'));
    assert.ok(hasNativeMarkdownVariant('/blog/glossary/term'));
    assert.ok(!hasNativeMarkdownVariant('/pricing'));
    assert.ok(!hasNativeMarkdownVariant('/blog/a/b/c'));
  });
});

describe('markdown bodies', () => {
  it('404 carries the sitemap, llms.txt, and the path that failed', () => {
    const md = notFoundMarkdown('/nope');
    assert.match(md, /^# 404/);
    assert.ok(md.includes('/sitemap.xml'));
    assert.ok(md.includes('/llms.txt'));
    assert.ok(md.includes('`/nope`'));
    assert.ok(md.includes('/api/v1/articles'));
  });
  it('502 points back at the canonical HTML page', () => {
    const md = unavailableMarkdown('/pricing');
    assert.match(md, /^# 502/);
    assert.ok(md.includes(`${BASE}/pricing`));
  });
  it('home and developers mirrors start with an H1', () => {
    assert.match(HOME_MARKDOWN.trimStart(), /^# /);
    assert.match(DEVELOPERS_MARKDOWN.trimStart(), /^# /);
  });
});
