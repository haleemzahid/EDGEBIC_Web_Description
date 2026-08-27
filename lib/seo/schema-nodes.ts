import { getBaseUrl } from '@/lib/urls/get-base-url';

/**
 * Canonical JSON-LD node ids for the product graph.
 *
 * Every page that describes a product must reference one of these ids instead
 * of hand-rolling a node. Two pages describing "EDGEBIC APS" without a shared
 * @id are two different entities to a crawler, which is how this site ended up
 * publishing four prices for one product line.
 *
 * Declared on:
 *   organization     -> app/layout.tsx (OrganizationJsonLd, every page)
 *   edgebic + variants -> /edgebic
 *   rmdb             -> /resource-manager-db-2
 *   edgebi           -> /edgebi
 *
 * RMDB and EDGEBI are supported but no longer sold, so their nodes carry no
 * offers. See docs/seo/RMDB-TO-EDGEBIC-SEO-REVIEW.md section D.
 */
export function schemaNodeIds() {
  const baseUrl = getBaseUrl();

  return {
    organization: `${baseUrl}/#organization`,
    edgebic: `${baseUrl}/edgebic#edgebic`,
    edgebicAps: `${baseUrl}/edgebic#edgebic-aps`,
    edgebicComplete: `${baseUrl}/edgebic#edgebic-complete`,
    rmdb: `${baseUrl}/resource-manager-db-2#rmdb`,
    edgebi: `${baseUrl}/edgebi#edgebi`
  } as const;
}

/** Every spelling of RMDB that appears on this site or in the wild. */
export const RMDB_ALTERNATE_NAMES = [
  'RMDB',
  'Resource Manager DB',
  'Resource Manager-DB',
  'RMDB - Resource Manager DB'
];

export const EDGEBIC_ALTERNATE_NAMES = ['EDGEBIC', 'EDGE BIC'];
