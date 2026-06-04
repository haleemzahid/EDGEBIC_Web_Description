import * as React from 'react';
import { notFound } from 'next/navigation';

import {
  SoftwareApplicationJsonLd,
  FAQJsonLd,
  BreadcrumbJsonLd
} from '@/components/seo';
import { MatrixPage, buildCellFaqs } from '@/components/marketing/programmatic/matrix-page';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getBaseUrl } from '@/lib/urls/get-base-url';
import {
  buildMatrixMetadata,
  getMatrixCellBySlug,
  listApprovedMatrixSlugs
} from '@/lib/programmatic/matrix';

/**
 * Programmatic SEO matrix route — generates one page per approved industry ×
 * feature cell. URL pattern: /[feature-slug]-for-[industry-slug].
 *
 * Build-time enumeration via generateStaticParams. Any slug NOT in the
 * approved list returns 404 (dynamicParams = false), so this route cannot
 * accidentally serve content for typo / drive-by URLs.
 *
 * Resume anchor: docs/seo/PROGRAMMATIC-SEO-PLAN.md
 */

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ matrixSlug: string }[]> {
  return listApprovedMatrixSlugs().map((slug) => ({ matrixSlug: slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ matrixSlug: string }>;
}) {
  const { matrixSlug } = await params;
  const cell = getMatrixCellBySlug(matrixSlug);
  if (!cell) return {};
  const { title, description, keywords } = buildMatrixMetadata(cell);
  return createPageMetadata({
    title,
    description,
    keywords,
    path: `/${matrixSlug}`
  });
}

export default async function MatrixSlugPage({
  params
}: {
  params: Promise<{ matrixSlug: string }>;
}): Promise<React.JSX.Element> {
  const { matrixSlug } = await params;
  const cell = getMatrixCellBySlug(matrixSlug);
  if (!cell) notFound();

  const baseUrl = getBaseUrl();
  const faqs = buildCellFaqs(cell);

  return (
    <>
      <SoftwareApplicationJsonLd
        name={`${cell.feature.name} for ${cell.industry.name}`}
        description={`${cell.feature.shortLabel} purpose-built for ${cell.industry.shortLabel}. Finite capacity scheduling, drag-and-drop Gantt, ERP integration.`}
        url={`${baseUrl}/${matrixSlug}`}
        price="49"
      />
      <FAQJsonLd
        questions={faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${baseUrl}/` },
          ...(cell.industry.canonicalPagePath
            ? [
                {
                  name: cell.industry.name,
                  url: `${baseUrl}${cell.industry.canonicalPagePath}`
                }
              ]
            : []),
          {
            name: `${cell.feature.name} for ${cell.industry.name}`,
            url: `${baseUrl}/${matrixSlug}`
          }
        ]}
      />

      <MatrixPage cell={cell} />
    </>
  );
}
