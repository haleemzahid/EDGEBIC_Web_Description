import * as React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { ComparisonPage } from '@/components/marketing/compare/comparison-page';
import { createPageMetadata } from '@/lib/seo/metadata';
import {
  buildCompetitorMetadata,
  getCompetitorPageData,
  listCompetitorSlugs
} from '@/lib/programmatic/competitors';

/**
 * Programmatic competitor comparison route for the 20 new comparisons added
 * via data/programmatic/competitors.ts. The 10 existing static comparison
 * folders (rmdb-vs-fishbowl, rmdb-vs-sap, etc.) are preserved unchanged —
 * Next.js routes static paths before dynamic ones, so existing pages keep
 * winning their URLs.
 *
 * Resume anchor: docs/seo/PROGRAMMATIC-SEO-PLAN.md (Phase 4)
 */

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ competitorSlug: string }[]> {
  return listCompetitorSlugs().map((slug) => ({ competitorSlug: slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ competitorSlug: string }>;
}): Promise<Metadata> {
  const { competitorSlug } = await params;
  const meta = buildCompetitorMetadata(competitorSlug);
  if (!meta) return {};
  return createPageMetadata({
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/compare-products/${competitorSlug}`
  });
}

export default async function ProgrammaticCompetitorPage({
  params
}: {
  params: Promise<{ competitorSlug: string }>;
}): Promise<React.JSX.Element> {
  const { competitorSlug } = await params;
  const data = getCompetitorPageData(competitorSlug);
  if (!data) notFound();
  return <ComparisonPage data={data} />;
}
