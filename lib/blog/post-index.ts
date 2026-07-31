import { allPosts } from 'content-collections';

/**
 * A pre-sorted, lightweight index of every post, built ONCE per process.
 *
 * The listing pages previously ran `[...allPosts].sort(...)` inside the request
 * handler. Every request therefore copied and sorted ~2,400 post objects, and
 * each of those carries its entire compiled MDX body: the generated bundle is
 * around 87MB. That cost was paid again on every category click, every product
 * switch and every page of pagination.
 *
 * The cards only ever read the ten fields below, so the index drops the bodies
 * and keeps the rest. Because it is computed at module scope it is built on
 * first import and reused for the life of the process.
 *
 * Keep this in sync if a listing card starts rendering a new field. Reading a
 * field that is not projected here is a type error rather than a silent blank,
 * which is the intended behaviour.
 */
function toListItem(post: (typeof allPosts)[number]) {
  return {
    slugAsParams: post.slugAsParams,
    title: post.title,
    description: post.description,
    category: post.category,
    cluster: post.cluster,
    pillarSlug: post.pillarSlug,
    published: post.published,
    readingTime: post.readingTime,
    heroImage: post.heroImage,
    heroAlt: post.heroAlt
  };
}

export type BlogListItem = ReturnType<typeof toListItem>;

/** Newest first. Sorted once, at module load. */
export const SORTED_POSTS: readonly BlogListItem[] = allPosts
  .map(toListItem)
  .sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );
