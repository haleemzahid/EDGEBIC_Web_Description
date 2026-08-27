/**
 * Pure helpers behind the open, read-only content API (/api/v1/*).
 *
 * Nothing here touches content-collections or the request object directly, so
 * the ranking, filtering, and validation rules are unit-testable with plain
 * fixtures (tests/agentic-contracts.test.ts). The route handlers pass in
 * `allPosts` and the URL search params.
 */

import { AppInfo } from '@/constants/app-info';

/** The subset of a content-collections post the API reads. */
export interface ArticleSource {
  slugAsParams: string;
  title: string;
  description: string;
  category: string;
  cluster: string;
  pillarSlug?: string;
  published: string;
  modified?: string;
  keywords: string[];
  targetPhrase?: string;
  wordCount?: number;
  readingTime?: number;
  faqQuestions: { question: string; answer: string }[];
  body: { raw: string };
}

export interface ArticleSummary {
  slug: string;
  url: string;
  markdownUrl: string;
  title: string;
  description: string;
  category: string;
  cluster: string;
  pillarSlug: string | null;
  published: string;
  modified: string | null;
  keywords: string[];
  wordCount: number | null;
  readingTime: number | null;
}

export interface ArticleDetail extends ArticleSummary {
  faq: { question: string; answer: string }[];
  /** The article body as markdown (MDX source). */
  body: string;
}

/**
 * Public URL path for a post. Glossary posts live at
 * content/blog/glossary-{term}.mdx but are served at /blog/glossary/{term};
 * the same remap the glossary page, the sitemap, and the markdown route use.
 */
export function articlePath(slugAsParams: string): string {
  const glossary = /^glossary-(.+)$/.exec(slugAsParams);
  return glossary ? `/blog/glossary/${glossary[1]}` : `/blog/${slugAsParams}`;
}

/** Inverse of articlePath: the slugAsParams for a /blog/... segment list. */
export function slugAsParamsFromSegments(segments: readonly string[]): string {
  if (segments[0] === 'glossary' && segments.length === 2) {
    return `glossary-${segments[1]}`;
  }
  return segments.join('/');
}

export function toArticleSummary(
  post: ArticleSource,
  baseUrl: string
): ArticleSummary {
  const path = articlePath(post.slugAsParams);
  return {
    slug: post.slugAsParams,
    url: `${baseUrl}${path}`,
    markdownUrl: `${baseUrl}/md${path}`,
    title: post.title,
    description: post.description,
    category: post.category,
    cluster: post.cluster,
    pillarSlug: post.pillarSlug ?? null,
    published: post.published,
    modified: post.modified ?? null,
    keywords: post.keywords,
    wordCount: post.wordCount ?? null,
    readingTime: post.readingTime ?? null
  };
}

export function toArticleDetail(
  post: ArticleSource,
  baseUrl: string
): ArticleDetail {
  return {
    ...toArticleSummary(post, baseUrl),
    faq: post.faqQuestions,
    body: post.body.raw
  };
}

export interface ArticleQuery {
  q: string | null;
  category: string | null;
  cluster: string | null;
  limit: number;
  offset: number;
}

export const ARTICLE_LIMIT_DEFAULT = 20;
export const ARTICLE_LIMIT_MAX = 100;

export interface QueryIssue {
  param: string;
  message: string;
}

export type ParsedArticleQuery =
  | { query: ArticleQuery; issues: [] }
  | { query: null; issues: QueryIssue[] };

/**
 * Parse and validate the list query. Returns either the query or a list of
 * field-level issues the route turns into a 400.
 */
export function parseArticleQuery(params: URLSearchParams): ParsedArticleQuery {
  const issues: QueryIssue[] = [];

  const q = params.get('q')?.trim() || null;
  if (q && q.length > 200) {
    issues.push({ param: 'q', message: 'Must be 200 characters or fewer.' });
  }

  const parseInteger = (
    name: string,
    fallback: number,
    min: number,
    max: number
  ): number => {
    const raw = params.get(name);
    if (raw === null || raw === '') return fallback;
    const value = Number(raw);
    if (!Number.isInteger(value) || value < min || value > max) {
      issues.push({
        param: name,
        message: `Must be an integer between ${min} and ${max}.`
      });
      return fallback;
    }
    return value;
  };

  const limit = parseInteger('limit', ARTICLE_LIMIT_DEFAULT, 1, ARTICLE_LIMIT_MAX);
  const offset = parseInteger('offset', 0, 0, 1_000_000);

  if (issues.length > 0) return { query: null, issues };

  return {
    query: {
      q,
      category: params.get('category')?.trim() || null,
      cluster: params.get('cluster')?.trim() || null,
      limit,
      offset
    },
    issues: []
  };
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Relevance score for a search term. Title hits outrank the target phrase and
 * keywords, which outrank a description hit. Zero means no match.
 */
export function scoreArticle(post: ArticleSource, term: string): number {
  const needle = normalize(term);
  if (!needle) return 0;
  const words = needle.split(' ');
  const title = normalize(post.title);
  const target = normalize(post.targetPhrase ?? '');
  const keywords = post.keywords.map(normalize);
  const description = normalize(post.description);

  let score = 0;
  if (title.includes(needle)) score += 6;
  else if (words.every((w) => title.includes(w))) score += 3;
  if (target && target.includes(needle)) score += 4;
  if (keywords.some((k) => k.includes(needle))) score += 3;
  if (description.includes(needle)) score += 2;
  else if (words.every((w) => description.includes(w))) score += 1;
  return score;
}

export interface ArticleSearchResult {
  total: number;
  limit: number;
  offset: number;
  items: ArticleSummary[];
}

export function searchArticles(
  posts: readonly ArticleSource[],
  query: ArticleQuery,
  baseUrl: string
): ArticleSearchResult {
  let candidates = posts
    .filter((p) =>
      query.category ? normalize(p.category) === normalize(query.category) : true
    )
    .filter((p) =>
      query.cluster ? normalize(p.cluster) === normalize(query.cluster) : true
    )
    .map((post) => ({ post, score: query.q ? scoreArticle(post, query.q) : 0 }));

  if (query.q) {
    candidates = candidates.filter((c) => c.score > 0);
  }

  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (
      new Date(b.post.published).getTime() - new Date(a.post.published).getTime()
    );
  });

  return {
    total: candidates.length,
    limit: query.limit,
    offset: query.offset,
    items: candidates
      .slice(query.offset, query.offset + query.limit)
      .map((c) => toArticleSummary(c.post, baseUrl))
  };
}

export function findArticle(
  posts: readonly ArticleSource[],
  segments: readonly string[]
): ArticleSource | undefined {
  const slug = slugAsParamsFromSegments(segments);
  return posts.find((p) => p.slugAsParams === slug);
}

// ---------------------------------------------------------------------------
// Product catalog
// ---------------------------------------------------------------------------

export interface ProductRecord {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: 'USD';
    model: string;
  };
  platform: string;
  url: string;
  pricingUrl: string;
  contactUrl: string;
}

export interface ProductCatalog {
  vendor: {
    name: string;
    legalName: string;
    url: string;
    foundingYear: string;
    salesEmail: string;
    phone: string;
  };
  products: ProductRecord[];
}

const LICENSE_MODEL = 'one-time perpetual license';
const PLATFORM = 'Windows desktop application (.NET 8)';

export function productCatalog(baseUrl: string): ProductCatalog {
  const editions = [
    { id: 'edgebic-aps', edition: AppInfo.EDITIONS.APS },
    { id: 'edgebic-complete', edition: AppInfo.EDITIONS.COMPLETE }
  ];
  return {
    vendor: {
      name: AppInfo.COMPANY_NAME,
      legalName: AppInfo.COMPANY_LEGAL_NAME,
      url: baseUrl,
      foundingYear: AppInfo.FOUNDING_YEAR,
      salesEmail: AppInfo.SALES_EMAIL,
      phone: AppInfo.PHONE
    },
    products: editions.map(({ id, edition }) => ({
      id,
      name: edition.NAME,
      description: edition.DESCRIPTION,
      price: {
        amount: Number(edition.PRICE),
        currency: 'USD',
        model: LICENSE_MODEL
      },
      platform: PLATFORM,
      url: `${baseUrl}/edgebic`,
      pricingUrl: `${baseUrl}/pricing`,
      contactUrl: `${baseUrl}/contact-us`
    }))
  };
}
