/**
 * The single source of truth for the public API surface.
 *
 * Every surface that lists endpoints reads from here:
 * - GET /api                                  (app/(app)/api/route.ts)
 * - /developers                               (app/(app)/(marketing)/developers/page.tsx)
 * - the markdown mirror of /developers        (lib/markdown/agent-markdown.ts)
 *
 * public/openapi.json stays a hand-maintained OpenAPI document (it carries the
 * full schemas), but tests/agentic-contracts.test.ts asserts that its set of
 * operations matches this list exactly, so the two cannot drift apart silently.
 */

export type PublicEndpointAuth =
  /** Anyone may call it. */
  | 'none'
  /** The NTCB license key in the request body is the credential. */
  | 'license-key'
  /** A short-lived token issued by another endpoint. */
  | 'token';

export interface PublicEndpoint {
  method: 'GET' | 'POST';
  path: string;
  operationId: string;
  description: string;
  auth: PublicEndpointAuth;
  /** OpenAPI tag, used to group the endpoints on the docs page. */
  tag: 'content' | 'license' | 'software' | 'system';
}

export const PUBLIC_ENDPOINTS: readonly PublicEndpoint[] = [
  // Open, read-only content API -------------------------------------------
  {
    method: 'GET',
    path: '/api/v1/products',
    operationId: 'listProducts',
    description:
      'The EDGEBIC editions currently sold, with list prices, licensing model, and links.',
    auth: 'none',
    tag: 'content'
  },
  {
    method: 'GET',
    path: '/api/v1/articles',
    operationId: 'searchArticles',
    description:
      'Search the 2,400-article knowledge base by keyword, category, or cluster. Paginated.',
    auth: 'none',
    tag: 'content'
  },
  {
    method: 'GET',
    path: '/api/v1/articles/{slug}',
    operationId: 'getArticle',
    description:
      'One knowledge-base article with its full markdown body and FAQ.',
    auth: 'none',
    tag: 'content'
  },
  // Licensing ---------------------------------------------------------------
  {
    method: 'POST',
    path: '/api/license/request',
    operationId: 'requestLicense',
    description: 'Submit a self-service license request for a device.',
    auth: 'none',
    tag: 'license'
  },
  {
    method: 'GET',
    path: '/api/license/request',
    operationId: 'pollLicenseRequest',
    description: 'Poll for approval and pick up the issued license key.',
    auth: 'none',
    tag: 'license'
  },
  {
    method: 'POST',
    path: '/api/license/activate',
    operationId: 'activateLicense',
    description:
      'Activate a license on a device (consumes one seat; idempotent per machine).',
    auth: 'license-key',
    tag: 'license'
  },
  {
    method: 'POST',
    path: '/api/license/validate',
    operationId: 'validateLicense',
    description: 'Runtime check that a device still holds an active seat.',
    auth: 'license-key',
    tag: 'license'
  },
  {
    method: 'POST',
    path: '/api/license/deactivate',
    operationId: 'deactivateLicense',
    description: "Release a device's seat so another machine can use it.",
    auth: 'license-key',
    tag: 'license'
  },
  // Software ----------------------------------------------------------------
  {
    method: 'POST',
    path: '/api/software/latest',
    operationId: 'checkSoftwareUpdates',
    description: 'Seat-gated software update check for the calling customer.',
    auth: 'license-key',
    tag: 'software'
  },
  {
    method: 'GET',
    path: '/api/software/download',
    operationId: 'downloadSoftware',
    description: 'Download an installer with a short-lived, license-bound token.',
    auth: 'token',
    tag: 'software'
  },
  // System ------------------------------------------------------------------
  {
    method: 'GET',
    path: '/api/health',
    operationId: 'healthCheck',
    description: 'Service health and running version.',
    auth: 'none',
    tag: 'system'
  }
];
