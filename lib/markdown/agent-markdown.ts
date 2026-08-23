/**
 * Markdown variants of key pages, served to AI agents via Accept: text/markdown
 * content negotiation (see middleware.ts and app/md/[[...slug]]/route.ts).
 *
 * Keep these in sync with the pages they mirror:
 * - HOME_MARKDOWN            → app/(app)/(marketing)/page.tsx
 * - DEVELOPERS_MARKDOWN      → app/(app)/(marketing)/developers/page.tsx
 * The canonical long-form agent reference remains public/llms.txt.
 */

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

export const DEVELOPERS_MARKDOWN = `# User Solutions Developer Resources

Machine-readable resources and the public API for EDGEBIC by User Solutions, Inc.

## API

Base URL: \`https://usersolutions.com\`

The public REST API covers self-service license requests, seat-based device
activation, runtime validation, seat release, and seat-gated software update
checks for the EDGEBIC / EDGEBI desktop applications. The license key
(\`NTCB-XXXX-XXXX-XXXX-XXXX-XXXX\`) is the credential. All errors are structured
JSON (\`{ "error": "…" }\`).

| Method | Path | Operation |
|---|---|---|
| POST | /api/license/request | requestLicense — submit a device license request |
| GET | /api/license/request | pollLicenseRequest — poll for approval, pick up the key |
| POST | /api/license/activate | activateLicense — consume a seat for this device |
| POST | /api/license/validate | validateLicense — check the device still holds a seat |
| POST | /api/license/deactivate | deactivateLicense — release this device's seat |
| POST | /api/software/latest | checkSoftwareUpdates — seat-gated update check |
| GET | /api/software/download | downloadSoftware — token-gated installer download |
| GET | /api/health | healthCheck — service health |

## Machine-readable resources

- OpenAPI 3.0 specification: https://usersolutions.com/openapi.json
- API index (JSON): https://usersolutions.com/api
- llms.txt (agent site guide): https://usersolutions.com/llms.txt
- llms-full.txt (extended reference): https://usersolutions.com/llms-full.txt
- Sitemap: https://usersolutions.com/sitemap.xml
- Documentation: https://usersolutions.com/docs

## Markdown content negotiation

Key pages of this site answer \`Accept: text/markdown\` with a markdown variant
(\`Content-Type: text/markdown\`, \`Vary: Accept\`). Supported: the homepage,
this page, and every blog article under /blog/.

Example:

\`\`\`bash
curl -H 'Accept: text/markdown' https://usersolutions.com/
\`\`\`

## Contact

- Sales: us@usersolutions.com · +1 248-486-6365
- Support: support@edgebi.com
- Contact page: https://usersolutions.com/contact-us
`;

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
- Documentation: https://usersolutions.com/docs

Blog articles live at \`/blog/{slug}\`; glossary terms at \`/blog/glossary/{term}\`.
All valid URLs are enumerated in the sitemap.
`;
}
