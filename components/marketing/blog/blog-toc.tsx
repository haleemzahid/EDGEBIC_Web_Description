'use client';

import * as React from 'react';

import { useMounted } from '@/hooks/use-mounted';
import { type TableOfContents } from '@/lib/markdown/get-table-of-contents';
import { cn } from '@/lib/utils';

type BlogTocProps = {
  toc: TableOfContents;
};

export function BlogToc({ toc }: BlogTocProps): React.JSX.Element {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1] ?? '')
        : [],
    [toc]
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc?.items || !mounted) {
    return <></>;
  }

  return (
    <nav aria-label="Table of contents" className="space-y-3">
      <p className="text-sm font-semibold tracking-wide text-foreground">
        Table of Contents
      </p>
      <Tree tree={toc} activeItem={activeHeading} />
    </nav>
  );
}

function useActiveItem(itemIds: string[]): string | undefined {
  const [activeId, setActiveId] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    itemIds?.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

type TreeProps = {
  tree: TableOfContents;
  level?: number;
  activeItem?: string;
};

function Tree({ tree, level = 1, activeItem }: TreeProps): React.JSX.Element {
  if (!tree || !tree.items || !tree.items.length || level > 2) {
    return <></>;
  }

  return (
    <ul className={cn('m-0 list-none', level === 1 ? 'space-y-1' : 'mt-1 space-y-1 pl-4')}>
      {tree.items.map((item, index) => (
        <li key={index} className="mt-0">
          <a
            href={item.url}
            onClick={(e) => {
              e.preventDefault();
              const id = item.url.split('#')[1];
              const element = document.getElementById(id);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', item.url);
              }
            }}
            className={cn(
              'inline-block text-sm no-underline transition-colors hover:text-foreground',
              item.url === `#${activeItem}`
                ? 'font-semibold text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {item.title}
          </a>
          {item.items?.length ? (
            <Tree tree={item} level={level + 1} activeItem={activeItem} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
