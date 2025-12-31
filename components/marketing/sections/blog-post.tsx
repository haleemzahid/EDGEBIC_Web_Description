import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

import { LexicalRenderer } from '@/components/marketing/blog/lexical-renderer';
import { Mdx } from '@/components/marketing/blog/mdx-component';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getInitials } from '@/lib/utils';

type BlogPostProps = {
  post: {
    title: string;
    description: string;
    published: string;
    category: string;
    author:
    | {
      name?: string;
      avatar?: string;
    }
    | undefined;
    body?: {
      raw: string;
      code: string;
    };
    content?: any; // Lexical content from Payload CMS
    featuredImage?: string;
    layout?: any[]; // Layout blocks from Pages collection
    hero?: any; // Hero section from Pages collection
  };
};

export function BlogPost({ post }: BlogPostProps): React.JSX.Element {
  // Determine content type and extract text for reading time
  const isLexicalContent = post.content && !post.body;
  const contentText = isLexicalContent
    ? extractTextFromLexical(post.content)
    : post.body?.raw || '';

  const PAYLOAD_URL =
    process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';

  // Helper to get full media URL
  const getMediaUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${PAYLOAD_URL}${url}`;
  };

  return (
    <div className="border-b">
      <div className="container mx-auto flex max-w-3xl flex-col space-y-4 py-6">
        <div className="mx-auto w-full min-w-0">
          <Link
            href="/blog"
            className="group mb-6 flex items-center space-x-1 text-base leading-none text-foreground duration-200"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            <span>All posts</span>
          </Link>
          <div className="space-y-8">
            {post.featuredImage && (
              <div className="relative w-full aspect-video max-h-96 overflow-hidden rounded-lg">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex flex-row items-center justify-between gap-4 text-base text-muted-foreground">
              <span className="flex flex-row items-center gap-2">
                {post.category}
              </span>
              <span className="flex flex-row items-center gap-2">
                <time dateTime={post.published}>
                  {format(post.published, 'dd MMM yyyy')}
                </time>
              </span>
            </div>
            <h1 className="font-heading text-3xl font-semibold tracking-tighter xl:text-5xl">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground">{post.description}</p>
            <div className="flex flex-row items-center justify-between">
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
                <span>{post.author?.name ?? ''}</span>
              </div>
              <div>{estimateReadingTime(contentText)}</div>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="container mx-auto max-w-3xl py-6">
        <div className="space-y-8">
          {/* Main content */}
          {isLexicalContent ? (
            <LexicalRenderer content={post.content} />
          ) : post.body ? (
            <Mdx code={post.body.code} />
          ) : (
            <p className="text-muted-foreground">No content available.</p>
          )}

          {/* Hero links */}
          {post.hero?.links && post.hero.links.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {post.hero.links.map((linkItem: any, linkIndex: number) => {
                const link = linkItem.link;
                if (!link) return null;

                const isOutline = link.appearance === 'outline';
                return (
                  <a
                    key={linkIndex}
                    href={link.url || '#'}
                    target={link.newTab ? '_blank' : undefined}
                    rel={link.newTab ? 'noopener noreferrer' : undefined}
                    className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${isOutline
                      ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          )}

          {/* Layout blocks */}
          {post.layout && post.layout.length > 0 && (
            <div className="space-y-12 mt-12">
              {post.layout.map((block: any, index: number) => {
                if (block.blockType === 'mediaBlock') {
                  return (
                    <div
                      key={block.id || index}
                      className="space-y-4"
                    >
                      {block.blockName && (
                        <h3 className="text-xl font-semibold">
                          {block.blockName}
                        </h3>
                      )}
                      {block.media && (
                        <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                          <Image
                            src={getMediaUrl(block.media.url)}
                            alt={block.media.alt || block.blockName || 'Media'}
                            fill
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  );
                }

                if (block.blockType === 'cta') {
                  return (
                    <div
                      key={block.id || index}
                      className="space-y-4 p-6 bg-accent/50 rounded-lg"
                    >
                      {block.blockName && (
                        <h3 className="text-xl font-semibold">
                          {block.blockName}
                        </h3>
                      )}
                      {block.richText && (
                        <LexicalRenderer content={block.richText} />
                      )}
                      {block.links && block.links.length > 0 && (
                        <div className="flex gap-4">
                          {block.links.map(
                            (linkItem: any, linkIndex: number) => (
                              <a
                                key={linkIndex}
                                href={linkItem.link?.url || '#'}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                              >
                                {linkItem.link?.label || 'Learn More'}
                              </a>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function extractTextFromLexical(content: any): string {
  if (!content?.root?.children) return '';

  let text = '';
  const traverse = (node: any) => {
    if (node.text) {
      text += node.text + ' ';
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  traverse(content.root);
  return text.trim();
}

function estimateReadingTime(
  text: string,
  wordsPerMinute: number = 250
): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes === 1 ? '1 minute read' : `${minutes} minutes read`;
}
