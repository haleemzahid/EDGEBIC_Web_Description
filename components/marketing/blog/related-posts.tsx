import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type RelatedPost = {
  title: string;
  description: string;
  slug: string;
  category: string;
  published: string;
  heroImage?: string;
};

/** Convert a raw slugAsParams into the correct blog URL path. */
function blogPostHref(slug: string): string {
  if (slug.startsWith('glossary-')) {
    return `/blog/glossary/${slug.replace(/^glossary-/, '')}`;
  }
  return `/blog/${slug}`;
}

type RelatedPostsProps = {
  posts: RelatedPost[];
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-2xl font-bold tracking-tight">
        Related Articles
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={blogPostHref(post.slug)}
            className={cn(
              "group overflow-hidden rounded-lg border border-slate-200",
              "transition-shadow duration-200 hover:shadow-lg"
            )}
          >
            {post.heroImage ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-cyan-100 to-slate-200">
                <span className="text-sm font-medium text-slate-500">
                  {post.category}
                </span>
              </div>
            )}
            <div className="p-4">
              <span className="inline-block rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-medium text-cyan-700">
                {post.category}
              </span>
              <h3 className="mt-2 line-clamp-2 font-semibold leading-snug">
                {post.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                {post.description}
              </p>
              <time
                dateTime={post.published}
                className="mt-3 block text-xs text-slate-400"
              >
                {formatDate(post.published)}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
