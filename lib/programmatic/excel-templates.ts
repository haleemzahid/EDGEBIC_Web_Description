/**
 * Excel template resolver — converts a slug into the full
 * ExcelTemplatePageData shape needed by the shared component.
 *
 * The data file in data/programmatic/excel-templates.ts contains everything
 * except `relatedTemplates`. This module computes related templates per
 * category and concatenates with curated cross-links to existing static
 * templates.
 */

import {
  EXCEL_TEMPLATES,
  EXCEL_TEMPLATE_SLUGS,
  getExcelTemplateBySlug
} from '@/data/programmatic/excel-templates';
import type {
  ExcelTemplatePageData,
  RelatedTemplate
} from '@/components/marketing/templates/excel-template-page';

// Curated existing static templates to cross-link from new programmatic ones.
const EXISTING_TEMPLATES: RelatedTemplate[] = [
  {
    href: '/excel-templates/production-schedule',
    title: 'Production Schedule Template',
    description: 'Master shop floor production schedule with finite-capacity awareness.'
  },
  {
    href: '/excel-templates/master-production-schedule',
    title: 'Master Production Schedule (MPS)',
    description: 'Long-horizon planning template tying forecast to capacity.'
  },
  {
    href: '/excel-templates/capacity-planning',
    title: 'Capacity Planning Template',
    description: 'Plan capacity against demand by work center over 13 weeks.'
  },
  {
    href: '/excel-templates/work-order',
    title: 'Work Order Template',
    description: 'Standard work order template with routing and operation detail.'
  },
  {
    href: '/excel-templates/bill-of-materials',
    title: 'Bill of Materials Template',
    description: 'Multi-level BOM template with quantity and component breakdown.'
  },
  {
    href: '/excel-templates/mrp',
    title: 'MRP Template',
    description: 'Material requirements planning template for small manufacturers.'
  },
  {
    href: '/excel-templates/gantt-chart',
    title: 'Gantt Chart Template',
    description: 'Manufacturing Gantt template with dependencies and milestone tracking.'
  },
  {
    href: '/excel-templates/job-scheduling',
    title: 'Job Scheduling Template',
    description: 'Job-level scheduling with sequence-dependent setup time.'
  },
  {
    href: '/excel-templates/oee-calculation',
    title: 'OEE Calculation Template',
    description: 'Overall Equipment Effectiveness calculator with availability × performance × quality.'
  }
];

function buildRelatedTemplates(slug: string): RelatedTemplate[] {
  const cell = getExcelTemplateBySlug(slug);
  if (!cell) return EXISTING_TEMPLATES.slice(0, 3);

  // Pick up to 3 related programmatic templates from the same category.
  const sameCategory = EXCEL_TEMPLATES
    .filter((t) => t.category === cell.category && t.slug !== slug)
    .slice(0, 3)
    .map((t) => ({
      href: `/excel-templates/${t.slug}`,
      title: t.displayTitle,
      description: t.subtitle
    }));

  // Pad with curated existing templates for variety.
  const curated = EXISTING_TEMPLATES.slice(0, Math.max(0, 5 - sameCategory.length));
  return [...sameCategory, ...curated];
}

/**
 * Returns the full ExcelTemplatePageData for a given slug, computing
 * relatedTemplates server-side. Null if the slug is not in the data file.
 */
export function getExcelTemplatePageData(slug: string): ExcelTemplatePageData | null {
  const cell = getExcelTemplateBySlug(slug);
  if (!cell) return null;

  return {
    slug: cell.slug,
    h1: cell.h1,
    subtitle: cell.subtitle,
    tldr: cell.tldr,
    introParagraphs: cell.introParagraphs,
    whatsInside: cell.whatsInside,
    howToUseSteps: cell.howToUseSteps,
    whenToUpgrade: cell.whenToUpgrade,
    faqs: cell.faqs,
    relatedTemplates: buildRelatedTemplates(slug)
  };
}

export function buildExcelTemplateMetadata(slug: string) {
  const cell = getExcelTemplateBySlug(slug);
  if (!cell) return null;
  return {
    title: cell.metaTitle,
    description: cell.metaDescription,
    keywords: cell.metaKeywords
  };
}

export function listExcelTemplateSlugs(): string[] {
  return EXCEL_TEMPLATE_SLUGS;
}
