import * as React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, Clock, Tag } from 'lucide-react';
import { allPosts } from 'content-collections';

import { BlogPostSchema } from '@/components/seo/blog-post-schema';
import { BlogBreadcrumbs } from '@/components/marketing/blog/blog-breadcrumbs';
import { BlogToc } from '@/components/marketing/blog/blog-toc';
import { Mdx } from '@/components/marketing/blog/mdx-component';
import { FaqSection } from '@/components/marketing/blog/faq-section';
import { QaSection } from '@/components/marketing/blog/qa-section';
import { ShareButtons } from '@/components/marketing/blog/share-buttons';
import { RelatedPosts } from '@/components/marketing/blog/related-posts';
import { AuthorBio } from '@/components/marketing/blog/author-bio';
import { SidebarCta } from '@/components/marketing/blog/sidebar-cta';
import { createArticleMetadata } from '@/lib/seo/metadata';
import { getTableOfContents } from '@/lib/markdown/get-table-of-contents';
import { calculateReadingTime } from '@/lib/blog/reading-time';
import { getBaseUrl } from '@/lib/urls/get-base-url';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.slugAsParams === slug);
}

function getRelatedPosts(currentSlug: string, category: string, cluster?: string) {
  return allPosts
    .filter((post) => {
      if (post.slugAsParams === currentSlug) return false;
      if (cluster && post.cluster === cluster) return true;
      return post.category === category;
    })
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, 3)
    .map((post) => ({
      title: post.title,
      description: post.description,
      slug: post.slugAsParams,
      category: post.category,
      published: post.published,
      heroImage: post.heroImage
    }));
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateString));
}

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams
  }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return createArticleMetadata({
    title: post.title,
    description: post.description,
    path: `/blogs/${slug}`,
    keywords: post.keywords?.join(', '),
    publishedTime: post.published,
    modifiedTime: post.modified
  });
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = await getTableOfContents(post.body.raw);
  const readingTime = post.readingTime || calculateReadingTime(post.body.raw);
  const relatedPosts = getRelatedPosts(slug, post.category, post.cluster);
  const baseUrl = getBaseUrl();
  const postUrl = `${baseUrl}/blogs/${slug}`;

  return (
    <>
      {/* JSON-LD Schema */}
      <BlogPostSchema
        title={post.title}
        description={post.description}
        url={`/blogs/${slug}`}
        datePublished={post.published}
        dateModified={post.modified}
        heroImage={post.heroImage}
        category={post.category}
        keywords={post.keywords}
        wordCount={post.wordCount}
        authorName={post.author?.name}
        faqQuestions={post.faqQuestions}
      />

      <article className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-7xl px-4 pt-6">
          <BlogBreadcrumbs category={post.category} postTitle={post.title} />
        </div>

        {/* Post Header */}
        <header className="container mx-auto max-w-7xl px-4 py-6">
          <div className="mx-auto max-w-4xl">
            {/* Category Badge */}
            <Link
              href={`/blogs?category=${encodeURIComponent(post.category)}`}
              className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700 transition-colors hover:bg-cyan-100"
            >
              <Tag className="size-3.5" />
              {post.category}
            </Link>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[42px] lg:leading-tight">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              {/* Author */}
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  )}
                  <span className="font-medium text-slate-700">
                    {post.author.name}
                  </span>
                </div>
              )}

              <span className="text-slate-300">|</span>

              {/* Date */}
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                <time dateTime={post.published}>{formatDate(post.published)}</time>
              </div>

              {/* Reading time */}
              <div className="flex items-center gap-1.5">
                <Clock className="size-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          {post.heroImage && (
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg">
              <Image
                src={post.heroImage}
                alt={post.heroAlt || post.title}
                width={1200}
                height={630}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Main Content: 70/30 Layout */}
        <div className="container mx-auto max-w-7xl px-4 pb-12">
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* Article Body (70%) */}
            <div className="min-w-0 lg:w-[70%]">
              {/* MDX Content */}
              <div className="prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
                <Mdx code={post.body.code} />
              </div>

              {/* Q&A Deep Dive (from frontmatter) */}
              {post.qaQuestions && post.qaQuestions.length > 0 && (
                <div className="mt-12 border-t pt-8">
                  <QaSection questions={post.qaQuestions} />
                </div>
              )}

              {/* FAQ Accordion (from frontmatter) */}
              {post.faqQuestions && post.faqQuestions.length > 0 && (
                <div className="mt-12 border-t pt-8">
                  <FaqSection questions={post.faqQuestions} />
                </div>
              )}

              {/* End-of-Article CTA */}
              <div className="mt-12 rounded-lg bg-gradient-to-r from-cyan-50 to-slate-50 p-8 text-center">
                <h2 className="mb-3 text-2xl font-bold text-slate-900">
                  Ready to Transform Your Production Scheduling?
                </h2>
                <p className="mb-6 text-slate-600">
                  User Solutions has been helping manufacturers optimize their production
                  schedules for over 35 years. One-time license, 5-day implementation.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
                  >
                    Schedule a Free Demo
                  </Link>
                  <Link
                    href="/product-downloads"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    Download Free Trial
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>

              {/* Author Bio */}
              {post.author && (
                <AuthorBio
                  name={post.author.name}
                  avatar={post.author.avatar}
                  role={post.author.role}
                  bio={post.author.bio}
                  linkedin={post.author.linkedin}
                />
              )}
            </div>

            {/* Sticky Sidebar (30%) */}
            <aside className="hidden lg:block lg:w-[30%]">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                <BlogToc toc={toc} />

                {/* Sidebar CTA */}
                <SidebarCta />

                {/* Share Buttons */}
                <div className="rounded-lg border p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-900">
                    Share this article
                  </p>
                  <ShareButtons url={postUrl} title={post.title} />
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Mobile Share Bar (visible on small screens) */}
        <div className="border-t py-6 lg:hidden">
          <div className="container mx-auto max-w-4xl px-4">
            <p className="mb-3 text-sm font-semibold text-slate-900">
              Share this article
            </p>
            <ShareButtons url={postUrl} title={post.title} />
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t bg-slate-50 py-12">
            <div className="container mx-auto max-w-7xl px-4">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </section>
        )}
      </article>
    </>
  );
}
