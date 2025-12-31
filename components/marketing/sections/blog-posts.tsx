import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format, isBefore } from 'date-fns';
import { ArrowRightIcon } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FillRemainingSpace } from '@/components/ui/fill-remaining-space';
import {
  fetchAllPosts,
  transformPayloadPostToPost
} from '@/lib/api/payload-cms';
import { getInitials } from '@/lib/utils';

export async function BlogPosts(): Promise<React.JSX.Element> {
  // Fetch posts from Payload CMS
  const payloadPosts = await fetchAllPosts();
  const posts = payloadPosts.map(transformPayloadPostToPost);

  return (
    <GridSection>
      <div className="container space-y-20 pt-6">
        <SiteHeading
          title="Insights & News"
          description="Learn more from members of our team and industry-leading experts."
        />
        {posts.length === 0 ? (
          <div className="!pt-6 text-center">
            <p className="text-muted-foreground">
              No posts found. Add blog posts in Payload CMS at{' '}
              <a
                href="/admin"
                className="underline"
              >
                /admin
              </a>
            </p>
          </div>
        ) : (
          <div className="!mt-6 grid gap-x-12 gap-y-6 divide-y md:grid-cols-2 md:gap-x-6 md:divide-none xl:grid-cols-3">
            {posts
              .slice()
              .sort((a, b) => (isBefore(a.published, b.published) ? 1 : -1))
              .map((post, index) => (
                <Link
                  key={post.slug || `post-${index}`}
                  href={post.slug}
                  className="md:duration-2000 flex h-full flex-col overflow-hidden text-clip border-dashed md:rounded-2xl md:shadow md:transition-shadow md:hover:shadow-xl"
                >
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col space-y-4 p-6">
                    <div className="flex flex-row items-center justify-between text-muted-foreground">
                      <span className="text-sm">{post.category}</span>
                      <time
                        className="text-sm"
                        dateTime={post.published}
                      >
                        {format(post.published, 'dd MMM yyyy')}
                      </time>
                    </div>
                    <h2 className="text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
                      {post.title}
                    </h2>
                    <p className="line-clamp-3 text-muted-foreground md:mb-4 lg:mb-6">
                      {post.description}
                    </p>
                    <FillRemainingSpace />
                    <div className="flex flex-1 shrink flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <Avatar className="relative size-7 flex-none rounded-full">
                          <AvatarImage
                            src={post.author?.avatar}
                            alt="avatar"
                          />
                          <AvatarFallback className="size-7 text-[10px]">
                            {getInitials(post.author?.name ?? '')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{post.author?.name ?? ''}</span>
                      </div>
                      <div className="group flex items-center gap-2 text-sm duration-200  hover:underline">
                        Read more
                        <ArrowRightIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </GridSection>
  );
}
