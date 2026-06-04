import * as React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { ExcelTemplatePage } from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';
import {
  buildExcelTemplateMetadata,
  getExcelTemplatePageData,
  listExcelTemplateSlugs
} from '@/lib/programmatic/excel-templates';

/**
 * Programmatic Excel-template route for the 30 new templates added via the
 * data file at data/programmatic/excel-templates.ts. The 14 existing static
 * template folders (production-schedule, capacity-planning, etc.) are
 * preserved as-is — Next.js routes static paths before dynamic ones, so the
 * existing pages keep winning their URLs.
 *
 * Resume anchor: docs/seo/PROGRAMMATIC-SEO-PLAN.md (Phase 3)
 */

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ templateSlug: string }[]> {
  return listExcelTemplateSlugs().map((slug) => ({ templateSlug: slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ templateSlug: string }>;
}): Promise<Metadata> {
  const { templateSlug } = await params;
  const meta = buildExcelTemplateMetadata(templateSlug);
  if (!meta) return {};
  return createPageMetadata({
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/excel-templates/${templateSlug}`
  });
}

export default async function ProgrammaticExcelTemplatePage({
  params
}: {
  params: Promise<{ templateSlug: string }>;
}): Promise<React.JSX.Element> {
  const { templateSlug } = await params;
  const data = getExcelTemplatePageData(templateSlug);
  if (!data) notFound();
  return <ExcelTemplatePage data={data} />;
}
