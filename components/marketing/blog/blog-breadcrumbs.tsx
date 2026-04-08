import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BlogBreadcrumbsProps = {
  category: string;
  postTitle: string;
};

function truncate(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '\u2026';
}

export function BlogBreadcrumbs({
  category,
  postTitle
}: BlogBreadcrumbsProps): React.JSX.Element {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blogs' },
    {
      label: category,
      href: `/blogs?category=${encodeURIComponent(category)}`
    }
  ];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-1">
            <Link
              href={item.href}
              className="text-slate-500 transition-colors hover:text-cyan-600"
            >
              {item.label}
            </Link>
            <ChevronRight className="size-3.5 shrink-0 text-slate-400" />
          </li>
        ))}
        <li>
          <span className="text-slate-900" title={postTitle}>
            {truncate(postTitle)}
          </span>
        </li>
      </ol>
    </nav>
  );
}
