import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import {
  getProductsForStory,
  getRelatedStories,
  type Product,
  type SuccessStory
} from '@/constants/internal-links';
import { Routes } from '@/constants/routes';

type RelatedProductsProps = {
  storySlug: string;
  limit?: number;
};

export function RelatedProducts({ storySlug, limit = 3 }: RelatedProductsProps) {
  const products = getProductsForStory(storySlug);
  const relatedStories = getRelatedStories(storySlug, limit);

  if (products.length === 0 && relatedStories.length === 0) return null;

  return (
    <section className="border-t bg-slate-50 py-12">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Products Used */}
        {products.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 md:text-3xl">
              Products Featured in This Story
            </h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {products.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                />
              ))}
            </div>
          </div>
        )}

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <div>
            <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
              Related Success Stories
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedStories.map((story) => (
                <RelatedStoryCard
                  key={story.slug}
                  story={story}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href={Routes.SuccessStories}
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700"
              >
                View all success stories
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={product.slug}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="p-6">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">
              {product.name}
            </h3>
            <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-xs font-medium capitalize text-cyan-700">
              {product.tier}
            </span>
          </div>
          <p className="mb-3 text-sm text-slate-600">
            {product.shortDescription}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600">
            Learn more
            <ArrowRightIcon className="size-3" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

function RelatedStoryCard({ story }: { story: SuccessStory }) {
  return (
    <Link href={story.slug}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="p-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-cyan-600">
            {story.industry}
          </p>
          <h3 className="mb-2 text-base font-semibold text-slate-900">
            {story.title}
          </h3>
          <p className="text-sm text-slate-500">{story.company}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-cyan-600">
            Read story
            <ArrowRightIcon className="size-3" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

/** Standalone upgrade path CTA for product pages */
export function ProductUpgradeCTA({
  currentProductKey,
  upgradeProductKey
}: {
  currentProductKey: string;
  upgradeProductKey: string;
}) {
  const { PRODUCTS } = require('@/constants/internal-links');
  const upgrade = PRODUCTS[upgradeProductKey];
  if (!upgrade) return null;

  return (
    <section className="bg-gradient-to-r from-cyan-50 to-slate-50 py-10">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">
          Ready for More Power?
        </h2>
        <p className="mb-6 text-slate-600">{upgrade.shortDescription}</p>
        <Link
          href={upgrade.slug}
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
        >
          Explore {upgrade.name}
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </section>
  );
}
