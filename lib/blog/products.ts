/**
 * Product grouping for the blog listing.
 *
 * The corpus carries a `cluster` in frontmatter, and every cluster written for
 * the current platform is prefixed `edgebic-`. That prefix is the only product
 * signal in the content, so it is what the grouping keys off rather than a
 * second field that would need maintaining by hand on ~2,400 files.
 *
 * Only products that actually have posts are listed. RMX and RMDB have no
 * dedicated blog content today, so they deliberately get no filter: an empty
 * tab reads as a broken filter rather than an honest gap.
 */

export const ALL_PRODUCTS = 'All' as const;
export const PRODUCT_EDGEBIC = 'EDGEBIC' as const;
export const PRODUCT_GENERAL = 'General Manufacturing' as const;

export type BlogProduct = typeof PRODUCT_EDGEBIC | typeof PRODUCT_GENERAL;

/** The product a post belongs to, derived from its cluster. */
export function getPostProduct(post: { cluster?: string | null }): BlogProduct {
  return post.cluster?.startsWith('edgebic-')
    ? PRODUCT_EDGEBIC
    : PRODUCT_GENERAL;
}

export const PRODUCT_FILTERS: readonly {
  value: string;
  label: string;
  blurb: string;
}[] = [
  {
    value: ALL_PRODUCTS,
    label: 'All posts',
    blurb: 'Everything we have published.'
  },
  {
    value: PRODUCT_EDGEBIC,
    label: PRODUCT_EDGEBIC,
    blurb:
      'How the platform actually works: scheduling, optimization, the shop floor and ERP data.'
  },
  {
    value: PRODUCT_GENERAL,
    label: PRODUCT_GENERAL,
    blurb:
      'Planning and scheduling practice that applies whichever system you run.'
  }
];

/** Count posts per product so the filter can show how much sits behind it. */
export function countByProduct(
  posts: readonly { cluster?: string | null }[]
): Record<string, number> {
  const counts: Record<string, number> = {
    [ALL_PRODUCTS]: posts.length,
    [PRODUCT_EDGEBIC]: 0,
    [PRODUCT_GENERAL]: 0
  };
  for (const post of posts) {
    counts[getPostProduct(post)] += 1;
  }
  return counts;
}
