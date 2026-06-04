/**
 * Competitor resolver — wraps data/programmatic/competitors.ts with
 * metadata generation helpers used by the dynamic route and the keyword
 * tracker cache.
 */

import {
  COMPETITORS,
  COMPETITOR_SLUGS,
  getCompetitorBySlug
} from '@/data/programmatic/competitors';
import type { ComparisonPageData } from '@/components/marketing/compare/comparison-page';

export function getCompetitorPageData(slug: string): ComparisonPageData | null {
  return getCompetitorBySlug(slug) ?? null;
}

export function buildCompetitorMetadata(slug: string) {
  const data = getCompetitorBySlug(slug);
  if (!data) return null;

  // Derive metadata from the comparison data shape so the tracker matches
  // the same keyword variants the page targets.
  const title = `RMDB vs ${data.competitor}: Honest Comparison for Manufacturers (2026)`;
  const description = data.tldr.length > 160 ? data.tldr.slice(0, 157) + '...' : data.tldr;
  const competitorLower = data.competitor.toLowerCase();
  const keywords = [
    `rmdb vs ${competitorLower}`,
    `${competitorLower} alternative`,
    `${competitorLower} alternatives`,
    `alternatives to ${competitorLower}`,
    `${competitorLower} vs rmdb`,
    `${competitorLower} comparison`,
    `${competitorLower} competitors`,
    `compare ${competitorLower}`,
    `${competitorLower} manufacturing scheduling`
  ].join(', ');

  return { title, description, keywords };
}

export function listCompetitorSlugs(): string[] {
  return COMPETITOR_SLUGS;
}

export { COMPETITORS };
