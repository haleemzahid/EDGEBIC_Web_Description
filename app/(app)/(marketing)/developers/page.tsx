import * as React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Developer Resources & Public API | EDGEBIC by User Solutions',
  description:
    'User Solutions developer resources: the public EDGEBIC licensing REST API, OpenAPI 3.0 specification, llms.txt agent guide, markdown content negotiation, and integration documentation.',
  path: '/developers',
  keywords:
    'User Solutions API, EDGEBIC API, EDGEBI API, User Solutions developer resources, EDGEBIC OpenAPI, license activation API, manufacturing software API, EDGEBIC integration, llms.txt, User Solutions documentation'
});

const endpoints = [
  {
    method: 'POST',
    path: '/api/license/request',
    operation: 'requestLicense',
    desc: 'Submit a self-service license request for a device.'
  },
  {
    method: 'GET',
    path: '/api/license/request',
    operation: 'pollLicenseRequest',
    desc: 'Poll for approval and pick up the issued license key.'
  },
  {
    method: 'POST',
    path: '/api/license/activate',
    operation: 'activateLicense',
    desc: 'Activate a license on a device (consumes one seat; idempotent per machine).'
  },
  {
    method: 'POST',
    path: '/api/license/validate',
    operation: 'validateLicense',
    desc: 'Runtime check that a device still holds an active seat.'
  },
  {
    method: 'POST',
    path: '/api/license/deactivate',
    operation: 'deactivateLicense',
    desc: "Release a device's seat so another machine can use it."
  },
  {
    method: 'POST',
    path: '/api/software/latest',
    operation: 'checkSoftwareUpdates',
    desc: 'Seat-gated software update check for the calling customer.'
  },
  {
    method: 'GET',
    path: '/api/software/download',
    operation: 'downloadSoftware',
    desc: 'Download an installer with a short-lived, license-bound token.'
  },
  {
    method: 'GET',
    path: '/api/health',
    operation: 'healthCheck',
    desc: 'Service health and running version.'
  }
];

const machineResources = [
  {
    name: 'OpenAPI 3.0 specification',
    href: '/openapi.json',
    desc: 'The complete API surface with operation IDs, typed request/response schemas, and error envelopes. Compatible with code generators and LLM function calling.'
  },
  {
    name: 'API index (JSON)',
    href: '/api',
    desc: 'Machine-readable directory of every public endpoint, returned as JSON from the API root.'
  },
  {
    name: 'llms.txt',
    href: '/llms.txt',
    desc: 'The agent-oriented site guide: products, pricing, key pages, and the 2,400-article knowledge base index.'
  },
  {
    name: 'llms-full.txt',
    href: '/llms-full.txt',
    desc: 'Extended long-form reference for AI assistants.'
  },
  {
    name: 'sitemap.xml',
    href: '/sitemap.xml',
    desc: 'The complete, authoritative URL list for the whole site.'
  },
  {
    name: 'Documentation',
    href: '/docs',
    desc: 'Product and integration documentation.'
  }
];

export default function DevelopersPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-200">
              User Solutions · EDGEBIC · Machine-Readable Resources
            </p>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Developer Resources & Public API
            </h1>
            <p className="mb-8 text-xl text-blue-100">
              Everything an integrator or AI agent needs to work with EDGEBIC by
              User Solutions: the public licensing REST API, an OpenAPI 3.0
              specification, llms.txt, and markdown content negotiation.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <a href="/openapi.json">OpenAPI Specification</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="/llms.txt">llms.txt</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* API overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold">
              The EDGEBIC Licensing API
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-center text-muted-foreground">
              A public REST API at{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                https://usersolutions.com/api
              </code>{' '}
              covering self-service license requests, seat-based device
              activation, runtime validation, seat release, and seat-gated
              software updates for the EDGEBIC / EDGEBI desktop applications.
              The license key is the credential; every error is structured JSON
              with a message and resolution hints.
            </p>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Method</th>
                    <th className="px-4 py-3 font-semibold">Path</th>
                    <th className="px-4 py-3 font-semibold">Operation</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((e) => (
                    <tr
                      key={`${e.method} ${e.path}`}
                      className="border-b last:border-b-0"
                    >
                      <td className="px-4 py-3 font-mono text-xs font-semibold">
                        {e.method}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{e.path}</td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {e.operation}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {e.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Full request/response schemas, authentication, device-fingerprint
              headers, and rate limits are defined in the{' '}
              <a
                href="/openapi.json"
                className="font-medium text-blue-600 hover:underline"
              >
                OpenAPI specification
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-3xl font-bold">
              Example: validate a license
            </h2>
            <pre className="overflow-x-auto rounded-lg border bg-background p-4 text-sm">
              <code>{`curl -X POST https://usersolutions.com/api/license/validate \\
  -H 'Content-Type: application/json' \\
  -d '{
    "licenseKey": "NTCB-XXXX-XXXX-XXXX-XXXX-XXXX",
    "systemFingerprint": "9a1f...",
    "processorId": "BFEBFBFF000906EA"
  }'

# 200 → { "valid": true, "purchaseId": "...", "seats": 6 }
# 403 → { "valid": false, "error": "System validation failed" }`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Machine-readable resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Machine-Readable Resources
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {machineResources.map((r) => (
                <Card key={r.href}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <a
                        href={r.href}
                        className="text-blue-600 hover:underline"
                      >
                        {r.name}
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Markdown negotiation */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-3xl font-bold">
              Markdown Content Negotiation
            </h2>
            <p className="mb-6 text-center text-muted-foreground">
              Key pages answer{' '}
              <code className="rounded bg-background px-1.5 py-0.5 text-sm">
                Accept: text/markdown
              </code>{' '}
              with a markdown variant (served with{' '}
              <code className="rounded bg-background px-1.5 py-0.5 text-sm">
                Vary: Accept
              </code>
              ). Supported today: the homepage, this page, and every article
              under <span className="font-mono text-sm">/blog/</span>.
            </p>
            <pre className="overflow-x-auto rounded-lg border bg-background p-4 text-sm">
              <code>{`curl -H 'Accept: text/markdown' https://usersolutions.com/`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Building an integration?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            EDGEBIC integrates with virtually any ERP through Excel/CSV/database
            import-export. If you need something the public API does not cover,
            talk to us.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact-us">Contact User Solutions</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
