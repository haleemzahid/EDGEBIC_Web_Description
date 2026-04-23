import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import {
  getStoriesForIndustry,
  type SuccessStory
} from '@/constants/internal-links';
import { Routes } from '@/constants/routes';

type IndustrySuccessStoriesProps = {
  industryTags: string[];
  title?: string;
  subtitle?: string;
  limit?: number;
};

export function IndustrySuccessStories({
  industryTags,
  title = 'Customer Success Stories',
  subtitle = 'See how manufacturers in your industry use our software to solve real production challenges.',
  limit = 3
}: IndustrySuccessStoriesProps) {
  const stories = getStoriesForIndustry(industryTags, limit);
  if (stories.length === 0) return null;

  return (
    <section className="border-t bg-slate-50 py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
            {title}
          </h2>
          <p className="text-slate-600">{subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <IndustryStoryCard
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

function IndustryStoryCard({ story }: { story: SuccessStory }) {
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
