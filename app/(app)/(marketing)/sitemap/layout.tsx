import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap',
  description:
    'Browse all pages and resources on the User Solutions website.'
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
