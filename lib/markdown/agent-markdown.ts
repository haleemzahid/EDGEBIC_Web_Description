/**
 * Markdown variants of key pages, served to AI agents via Accept: text/markdown
 * content negotiation (see middleware.ts and app/md/[[...slug]]/route.ts).
 *
 * Keep these in sync with the pages they mirror:
 * - HOME_MARKDOWN            → app/(app)/(marketing)/page.tsx
 * - DEVELOPERS_MARKDOWN      → app/(app)/(marketing)/developers/page.tsx
 * The canonical long-form agent reference remains public/llms.txt.
 */

import { PUBLIC_ENDPOINTS } from '@/lib/api/public-endpoints';

export const HOME_MARKDOWN = `# EDGEBIC Production Scheduling Software | User Solutions

Your partner for solving production planning and scheduling challenges — your way.

User Solutions, Inc. (founded 1991, South Lyon, Michigan) makes finite capacity
scheduling and production planning software for small to mid-size manufacturers.
The current product is **EDGEBIC**, the next-generation successor to Resource
Manager DB (RMDB) and EDGEBI. Trusted for 35+ years by the US Navy, GE, BAE
Systems, and Cummins Engine.

## Core capabilities

- Finite capacity scheduling: forward and backward (just-in-time), multi-shift
- Graphical drag-and-drop routing designer (steps as nodes, dependencies as arrows)
- Theory of Constraints (TOC) anchor scheduling with protective buffers
- Sequence-dependent setup matrix, lot streaming, parallel work centers
- Two-layer schedule optimizer (multi-run best-of-N plus Google OR-Tools CP-SAT)
- Shop-floor kiosk for operator punches and piece counts
- ERP integration via Excel/CSV/database import-export (SAP, Oracle, Epicor,
  JobBOSS, Fourth Shift, Sage, and virtually any system that exports data)

## Editions and pricing (one-time perpetual license)

| Edition | Price | Scope |
|---|---|---|
| EDGEBIC APS | $25,000 USD | Finite capacity scheduling and optimization |
| EDGEBIC Complete | $35,000 USD | APS plus MRP, inventory, purchasing, material pegging |

Platform: Windows desktop application on .NET 8 (SQLite single-user, SQL Server enterprise).

## Key links

- Product overview: https://usersolutions.com/edgebic
- Pricing: https://usersolutions.com/pricing
- Upgrading from RMDB/EDGEBI: https://usersolutions.com/rmdb-to-edgebic
- Success stories: https://usersolutions.com/success-stories
- Blog and knowledge base (2,400+ articles): https://usersolutions.com/blogs
- Contact / demo: https://usersolutions.com/contact-us
- Developer resources and API: https://usersolutions.com/developers
- Full agent reference: https://usersolutions.com/llms.txt
- Sitemap: https://usersolutions.com/sitemap.xml
`;

function endpointRows(): string {
  return PUBLIC_ENDPOINTS.map(
    (e) => `| ${e.method} | ${e.path} | ${e.operationId} — ${e.description} |`
  ).join('\n');
}

export const DEVELOPERS_MARKDOWN = `# User Solutions Developer Resources

Machine-readable resources and the public API for EDGEBIC by User Solutions, Inc.

## API

Base URL: \`https://usersolutions.com\`

Two groups of endpoints:

1. **Open content API (\`/api/v1/*\`)** — no authentication. The product
   catalog with list prices, and keyword search plus full markdown bodies for
   the 2,400-article knowledge base. CORS-enabled (\`Access-Control-Allow-Origin: *\`).
2. **Licensing API (\`/api/license/*\`, \`/api/software/*\`)** — self-service
   license requests, seat-based device activation, runtime validation, seat
   release, and seat-gated software update checks for the EDGEBIC / EDGEBI
   desktop applications. The license key (\`NTCB-XXXX-XXXX-XXXX-XXXX-XXXX\`)
   is the credential.

Every error is structured JSON:
\`{ "error", "code", "message", "hint"?, "details"?, "links"? }\`.

| Method | Path | Operation |
|---|---|---|
${endpointRows()}

Examples:

\`\`\`bash
curl https://usersolutions.com/api/v1/products
curl 'https://usersolutions.com/api/v1/articles?q=finite+capacity+scheduling&limit=5'
curl https://usersolutions.com/api/v1/articles/edgebic-complete-guide
\`\`\`

## Machine-readable resources

- OpenAPI 3.0 specification: https://usersolutions.com/openapi.json
- API index (JSON): https://usersolutions.com/api
- llms.txt (agent site guide): https://usersolutions.com/llms.txt
- llms-full.txt (extended reference): https://usersolutions.com/llms-full.txt
- Sitemap: https://usersolutions.com/sitemap.xml

## Markdown content negotiation

Every page on this site answers \`Accept: text/markdown\` and sends
\`Vary: Accept\`. The homepage, this page, and every article under /blog/
return a native markdown variant (\`Content-Type: text/markdown\`); other
pages return their HTML; unknown paths return a markdown 404 with recovery
links (real 404 status).

Example:

\`\`\`bash
curl -H 'Accept: text/markdown' https://usersolutions.com/
\`\`\`

## Contact

- Sales: us@usersolutions.com · +1 248-486-6365
- Support: support@edgebi.com
- Contact page: https://usersolutions.com/contact-us
`;

export function unavailableMarkdown(pathname: string): string {
  return `# 502 — Markdown variant unavailable

The markdown negotiation for \`${pathname}\` could not reach the page's HTML
twin. Retry, or read the HTML directly:

- Canonical page: https://usersolutions.com${pathname}
- Site guide for agents (llms.txt): https://usersolutions.com/llms.txt
- Full sitemap (all URLs): https://usersolutions.com/sitemap.xml
`;
}

export function notFoundMarkdown(pathname: string): string {
  return `# 404 — Page not found

Nothing exists at \`${pathname}\` on usersolutions.com.

## Where to look instead

- Homepage: https://usersolutions.com/
- Site guide for agents (llms.txt): https://usersolutions.com/llms.txt
- Full sitemap (all URLs): https://usersolutions.com/sitemap.xml
- Blog and knowledge base index: https://usersolutions.com/blogs
- Product overview (EDGEBIC): https://usersolutions.com/edgebic
- Developer resources and API: https://usersolutions.com/developers
- Search the knowledge base by API: https://usersolutions.com/api/v1/articles?q={term}

Blog articles live at \`/blog/{slug}\`; glossary terms at \`/blog/glossary/{term}\`.
All valid URLs are enumerated in the sitemap.
`;
}
