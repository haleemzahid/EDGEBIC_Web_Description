/**
 * Matrix cell resolver — converts an industry × feature pair into the data
 * needed to render a programmatic SEO page.
 *
 * URL convention: /[feature-slug]-for-[industry-slug]
 * Example:        /finite-capacity-scheduling-for-machine-shops
 *
 * The slug format INTENTIONALLY contains the literal "-for-" segment, which
 * prevents collisions with curated root-level pages (which don't use that
 * pattern). The dynamic route uses dynamicParams = false, so only the
 * approved slugs returned by listApprovedMatrixSlugs() exist as URLs.
 */

import { INDUSTRIES, getIndustryBySlug, type IndustryProfile } from '@/data/programmatic/industries';
import { FEATURES, getFeatureBySlug, type FeatureProfile } from '@/data/programmatic/features';

export interface MatrixCell {
  /** Full URL path, e.g. "/finite-capacity-scheduling-for-machine-shops". */
  path: string;
  /** Just the slug segment without the leading slash. */
  slug: string;
  /** Resolved industry profile. */
  industry: IndustryProfile;
  /** Resolved feature profile. */
  feature: FeatureProfile;
  /** Relevance grade (1-3). 0 means skip — not included in approved list. */
  relevance: 1 | 2 | 3;
}

/** Minimum relevance to include in the approved-slug list. */
const MIN_RELEVANCE = 2;

export function buildMatrixSlug(featureSlug: string, industrySlug: string): string {
  return `${featureSlug}-for-${industrySlug}`;
}

/**
 * Returns the cell for a given slug, or null if the slug is invalid OR the
 * industry × feature combination is below MIN_RELEVANCE.
 */
export function getMatrixCellBySlug(slug: string): MatrixCell | null {
  // The slug pattern is "[feature]-for-[industry]". The "-for-" separator is
  // guaranteed not to appear in any single feature or industry slug because
  // none of those slugs contain "for" as a word.
  const idx = slug.indexOf('-for-');
  if (idx === -1) return null;

  const featureSlug = slug.slice(0, idx);
  const industrySlug = slug.slice(idx + '-for-'.length);

  const feature = getFeatureBySlug(featureSlug);
  const industry = getIndustryBySlug(industrySlug);
  if (!feature || !industry) return null;

  const relevance = industry.featureRelevance[featureSlug] ?? 0;
  if (relevance < MIN_RELEVANCE) return null;

  return {
    path: `/${slug}`,
    slug,
    industry,
    feature,
    relevance: relevance as 1 | 2 | 3
  };
}

/**
 * Returns every approved (industry × feature) cell as a MatrixCell. Cells
 * below MIN_RELEVANCE are excluded. Used by:
 *   - generateStaticParams in the dynamic route (build-time enumeration)
 *   - the keyword tracker (so matrix pages are visible to the matcher)
 *   - the validator script (uniqueness checks across the corpus)
 */
export function listApprovedMatrixCells(): MatrixCell[] {
  const cells: MatrixCell[] = [];
  for (const industry of INDUSTRIES) {
    for (const feature of FEATURES) {
      const relevance = industry.featureRelevance[feature.slug] ?? 0;
      if (relevance < MIN_RELEVANCE) continue;
      cells.push({
        path: `/${buildMatrixSlug(feature.slug, industry.slug)}`,
        slug: buildMatrixSlug(feature.slug, industry.slug),
        industry,
        feature,
        relevance: relevance as 1 | 2 | 3
      });
    }
  }
  return cells;
}

export function listApprovedMatrixSlugs(): string[] {
  return listApprovedMatrixCells().map((c) => c.slug);
}

/**
 * Generates the metadata triple for a matrix cell. Single source of truth so
 * the dynamic route, the keyword tracker, and the validator all agree on
 * what each page targets.
 */
export function buildMatrixMetadata(cell: MatrixCell) {
  const title = `${cell.feature.name} for ${cell.industry.name} (2026) — Built by Manufacturers`;
  const description = `${cell.feature.shortLabel.charAt(0).toUpperCase()}${cell.feature.shortLabel.slice(1)} purpose-built for ${cell.industry.shortLabel}. Real ${cell.industry.terminology[0] ?? 'shop floor'} constraints, real ${cell.industry.terminology[1] ?? 'production'} reality. Used by manufacturers since 1991.`;

  // IMPORTANT: only emit long-tail combinations. We deliberately do NOT include
  // bare cell.feature.keywordSeeds or cell.industry.keywordSeeds — those head
  // terms belong to the canonical product/industry pages. Including them here
  // creates cannibalization (multi-URL match) flagged by the keyword tracker.
  const keywords = [
    `${cell.feature.shortLabel} ${cell.industry.shortLabel}`,
    `${cell.feature.shortLabel} for ${cell.industry.plural}`,
    `${cell.industry.shortLabel} ${cell.feature.shortLabel}`,
    `${cell.feature.name.toLowerCase()} ${cell.industry.shortLabel}`,
    `${cell.feature.name.toLowerCase()} for ${cell.industry.plural}`
  ].join(', ');

  return { title, description, keywords };
}
