import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allPosts } from 'content-collections';
import { CalendarDays, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Blog',
  description:
    'Read the latest insights on manufacturing software, production scheduling, lean manufacturing, and industry best practices from User Solutions.',
  path: '/blogs',
  keywords:
    'manufacturing blog, production scheduling insights, lean manufacturing, industry news, manufacturing software tips'
});

const POSTS_PER_PAGE = 12;

/** Convert a slugAsParams value to the correct blog URL path. */
function getBlogHref(slugAsParams: string): string {
  if (slugAsParams.startsWith('glossary-')) {
    return `/blog/glossary/${slugAsParams.slice('glossary-'.length)}`;
  }
  return `/blog/${slugAsParams}`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/** Deterministic gradient based on category name */
function categoryGradient(category: string): string {
  const gradients = [
    'from-cyan-600 to-blue-700',
    'from-emerald-600 to-teal-700',
    'from-violet-600 to-indigo-700',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-sky-500 to-cyan-600',
    'from-fuchsia-500 to-purple-600',
    'from-lime-500 to-green-600'
  ];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export default async function BlogsPage(props: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const activeCategory = searchParams.category || 'All';
  const currentPage = Math.max(1, parseInt(searchParams.page || '1', 10) || 1);

  // Sort all posts by published date, most recent first
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );

  // Extract unique categories
  const categories = [
    'All',
    ...Array.from(new Set(sortedPosts.map((p) => p.category))).sort()
  ];

  // Filter by category
  const filteredPosts =
    activeCategory === 'All'
      ? sortedPosts
      : sortedPosts.filter((p) => p.category === activeCategory);

  // Identify pillar posts (posts whose slugAsParams matches their own pillarSlug)
  const pillarPosts = filteredPosts.filter(
    (p) => p.cluster && p.pillarSlug && p.slugAsParams === p.pillarSlug
  );
  const pillarSlugs = new Set(pillarPosts.map((p) => p.slugAsParams));

  // Regular posts exclude pillars
  const regularPosts = filteredPosts.filter(
    (p) => !pillarSlugs.has(p.slugAsParams)
  );

  // Pagination (applied to regular posts only; pillars always shown)
  const totalPages = Math.max(1, Math.ceil(regularPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = regularPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  // Helper to build URL with search params
  function buildUrl(params: { category?: string; page?: string }): string {
    const sp = new URLSearchParams();
    const cat = params.category ?? (activeCategory !== 'All' ? activeCategory : undefined);
    if (cat && cat !== 'All') sp.set('category', cat);
    if (params.page && params.page !== '1') sp.set('page', params.page);
    const qs = sp.toString();
    return `/blogs${qs ? `?${qs}` : ''}`;
  }

  // Page numbers to display (max 7 with ellipsis)
  function getPageNumbers(): (number | '...')[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1];
    if (safePage > 3) pages.push('...');
    for (
      let i = Math.max(2, safePage - 1);
      i <= Math.min(totalPages - 1, safePage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (safePage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-300">
            Insights on production scheduling, lean manufacturing, and manufacturing
            software from 35+ years of industry experience.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={buildUrl({ category: cat, page: '1' })}
              className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Featured Pillar Posts */}
        {pillarPosts.length > 0 && safePage === 1 && (
          <section className="mb-12">
            <h2 className="mb-6 text-xl font-semibold text-slate-800">
              Featured Guides
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {pillarPosts.map((post) => (
                <Link
                  key={post.slugAsParams}
                  href={getBlogHref(post.slugAsParams)}
                  className="group flex overflow-hidden rounded-xl border-2 border-cyan-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Image or gradient */}
                  <div className="relative hidden w-48 shrink-0 sm:block">
                    {post.heroImage ? (
                      <Image
                        src={post.heroImage}
                        alt={post.heroAlt || post.title}
                        fill
                        className="object-cover"
                        sizes="192px"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${categoryGradient(post.category)}`}
                      >
                        <span className="px-2 text-center text-sm font-semibold text-white/90">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-5">
                    <span className="mb-1 inline-block w-fit rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-medium text-cyan-700">
                      {post.category}
                    </span>
                    <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 group-hover:text-cyan-700">
                      {post.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {post.description}
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="size-3.5" />
                        {formatDate(post.published)}
                      </span>
                      {post.readingTime && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {post.readingTime} min read
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="rounded-xl bg-slate-50 p-16 text-center">
            <h2 className="mb-3 text-2xl font-semibold text-slate-800">
              No posts found
            </h2>
            <p className="mb-6 text-slate-500">
              There are no posts in the
              <span className="font-medium"> {activeCategory} </span>
              category yet. Try selecting a different category or check back soon.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
            >
              View all posts
            </Link>
          </div>
        )}

        {/* Post Grid */}
        {paginatedPosts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <Link
                key={post.slugAsParams}
                href={getBlogHref(post.slugAsParams)}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Card Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  {post.heroImage ? (
                    <Image
                      src={post.heroImage}
                      alt={post.heroAlt || post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${categoryGradient(post.category)}`}
                    >
                      <span className="text-lg font-semibold text-white/80">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 inline-block w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {post.category}
                  </span>
                  <h3 className="line-clamp-2 text-base font-semibold text-slate-900 group-hover:text-cyan-700">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
                    {post.description}
                  </p>
                  <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3.5" />
                      {formatDate(post.published)}
                    </span>
                    {post.readingTime && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {post.readingTime} min read
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Blog pagination"
            className="mt-12 flex items-center justify-center gap-1"
          >
            {/* Previous */}
            {safePage > 1 ? (
              <Link
                href={buildUrl({ page: String(safePage - 1) })}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                <ChevronLeft className="size-4" />
                Prev
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-300">
                <ChevronLeft className="size-4" />
                Prev
              </span>
            )}

            {/* Page Numbers */}
            {getPageNumbers().map((pg, idx) =>
              pg === '...' ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-sm text-slate-400"
                >
                  ...
                </span>
              ) : (
                <Link
                  key={pg}
                  href={buildUrl({ page: String(pg) })}
                  className={`inline-flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    pg === safePage
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {pg}
                </Link>
              )
            )}

            {/* Next */}
            {safePage < totalPages ? (
              <Link
                href={buildUrl({ page: String(safePage + 1) })}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Next
                <ChevronRight className="size-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-300">
                Next
                <ChevronRight className="size-4" />
              </span>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
