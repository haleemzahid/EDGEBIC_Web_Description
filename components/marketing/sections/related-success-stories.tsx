import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import {
  getStoriesForProduct,
  type SuccessStory
} from '@/constants/internal-links';
import { Routes } from '@/constants/routes';

type RelatedSuccessStoriesProps = {
  productKey: string;
  title?: string;
  limit?: number;
};

export function RelatedSuccessStories({
  productKey,
  title = 'Customer Success Stories',
  limit = 3
}: RelatedSuccessStoriesProps) {
  const stories = getStoriesForProduct(productKey, limit);
  if (stories.length === 0) return null;

  return (
    <section className="border-t bg-slate-50 py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
            {title}
          </h2>
          <p className="text-slate-600">
            See how manufacturers use our software to solve real production
            challenges.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <SuccessStoryCard
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
    </section>
  );
}

function SuccessStoryCard({ story }: { story: SuccessStory }) {
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
