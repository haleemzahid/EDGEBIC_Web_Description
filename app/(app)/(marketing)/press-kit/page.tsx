import * as React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { AppInfo } from '@/constants/app-info';
import { Routes } from '@/constants/routes';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Press Kit and Company Facts | User Solutions',
  description:
    'Canonical company facts, boilerplate descriptions, product facts and logo downloads for User Solutions, Inc. and EDGEBIC. For directories, press and analysts.',
  path: '/press-kit',
  keywords:
    'User Solutions press kit, EDGEBIC company facts, User Solutions Inc Michigan, EDGEBIC boilerplate',
  modifiedTime: '2026-08-28'
});

const REGIONS_SERVED =
  'North America, United Kingdom, Ireland, Germany, Netherlands, France and the rest of Europe';

const companyFacts: Array<{ label: string; value: React.ReactNode }> = [
  { label: 'Legal name', value: AppInfo.COMPANY_LEGAL_NAME },
  { label: 'Founded', value: AppInfo.FOUNDING_YEAR },
  {
    label: 'Headquarters',
    value: `${AppInfo.ADDRESS.LOCALITY}, Michigan, USA`
  },
  { label: 'Regions served', value: REGIONS_SERVED },
  {
    label: 'Products',
    value:
      'EDGEBIC (current product, sold as EDGEBIC APS and EDGEBIC Complete); EDGEBI; Resource Manager DB (RMDB, legacy name); RMX (Resource Manager for Excel)'
  },
  {
    label: 'Category',
    value:
      'Finite capacity scheduling / advanced planning and scheduling (APS) / production planning software'
  },
  {
    label: 'Deployment',
    value:
      'Installed Windows application built on .NET 8; SQLite for single-user installs or SQL Server for multi-user deployments; data stays on customer systems, nothing is hosted for you'
  },
  {
    label: 'Pricing',
    value: (
      <>
        One-time perpetual licence: EDGEBIC APS $25,000; EDGEBIC Complete
        $35,000. No subscription, no per-seat fee. See{' '}
        <Link
          href={Routes.Pricing}
          className="underline"
        >
          usersolutions.com/pricing
        </Link>
        .
      </>
    )
  },
  {
    label: 'Notable customers',
    value: 'GE, Cummins, BAE Systems, US Navy'
  },
  {
    label: 'ERP integrations',
    value:
      'SAP, QuickBooks, Epicor, JobBOSS, Fourth Shift, Oracle, Sage, Macola, and any ERP that exchanges data through Excel, CSV or a database connection'
  },
  { label: 'Phone', value: AppInfo.PHONE },
  { label: 'Sales email', value: AppInfo.SALES_EMAIL },
  {
    label: 'Website',
    value: (
      <Link
        href={Routes.Root}
        className="underline"
      >
        usersolutions.com
      </Link>
    )
  }
];

const boilerplates: Array<{ words: number; text: string }> = [
  {
    words: 25,
    text: 'User Solutions, Inc. (founded 1991, Michigan) makes EDGEBIC, finite capacity production scheduling software for manufacturers across North America, the United Kingdom, Ireland and wider Europe.'
  },
  {
    words: 50,
    text: 'User Solutions, Inc. is a Michigan software company founded in 1991. Its product EDGEBIC, successor to Resource Manager DB, gives manufacturers finite capacity scheduling, MRP and ERP integration in a Windows application with a one-time licence. Customers span North America, the United Kingdom, Ireland, Germany, the Netherlands, France and Europe.'
  },
  {
    words: 100,
    text: 'User Solutions, Inc. has built production planning and scheduling software for manufacturers since 1991 from Michigan. Its product, EDGEBIC, is the successor to Resource Manager DB and EDGEBI. EDGEBIC schedules machines, labor and materials against real capacity with a graphical routing designer, bottleneck scheduling and schedule optimization. It is sold as EDGEBIC APS and EDGEBIC Complete, which adds MRP and inventory. EDGEBIC installs on Windows with SQLite or SQL Server, integrates with SAP, QuickBooks, Epicor and others, and is sold on a one-time licence to manufacturers in North America, the United Kingdom, Ireland, Germany, the Netherlands, France and wider Europe.'
  }
];

const oneLiner =
  'EDGEBIC by User Solutions: finite capacity scheduling and production planning software for manufacturers in North America, the UK and Europe. One-time licence.';

const productFacts: string[] = [
  'EDGEBIC is the current generation of Resource Manager DB (RMDB) and EDGEBI, developed continuously since 1991.',
  'Two editions: EDGEBIC APS ($25,000) for finite capacity scheduling and optimization; EDGEBIC Complete ($35,000) adds MRP, inventory, purchasing and material pegging.',
  'Both editions are one-time perpetual licences with no subscription or per-seat fee.',
  'Installed Windows application built on .NET 8; SQLite for single-user installs, SQL Server for multi-user deployments.',
  'Schedules machines, labor and materials against real constraints: shifts, holidays, downtime, machine instances, operator skills and sequence-dependent setup times.',
  'Drag-and-drop graphical routing designer, Theory of Constraints bottleneck scheduling, multi-shift allocation and a two-layer schedule optimizer.',
  'ERP integration through Excel, CSV and database import-export masks: SAP, QuickBooks, Epicor, JobBOSS, Fourth Shift and others.',
  'Third-party profiles: Capterra and G2 listings under the Resource Manager DB name; CIO Applications named User Solutions a Top ERP Solution in 2016.'
];

const logoDownloads: Array<{ name: string; href: string; note: string }> = [
  {
    name: 'EDGEBIC logo (PNG)',
    href: '/logos/edgebic-logo.png',
    note: 'Primary product mark'
  }
];

const citeUrls: Array<{ label: string; href: string }> = [
  { label: 'EDGEBIC product page', href: Routes.Edgebic },
  { label: 'Pricing', href: Routes.Pricing },
  { label: 'Product comparison', href: Routes.CompareProducts },
  {
    label: 'Production scheduling software UK',
    href: Routes.ProductionSchedulingSoftwareUk
  },
  {
    label: 'Production scheduling software Europe',
    href: Routes.ProductionSchedulingSoftwareEurope
  }
];

export default function PressKitPage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pb-16 pt-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">
            Press Kit and Company Facts
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-center text-lg text-muted-foreground md:text-xl">
            Canonical facts about User Solutions, Inc. and EDGEBIC for software
            directories, journalists, analysts and AI answer engines. Everything
            on this page may be copied verbatim. Last updated 28 August 2026.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Company facts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48">Fact</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companyFacts.map((fact) => (
                    <TableRow key={fact.label}>
                      <TableCell className="align-top font-medium">
                        {fact.label}
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        {fact.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">
                One-line description for directories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{oneLiner}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {oneLiner.length} characters.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Boilerplate descriptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {boilerplates.map((item) => (
                <div key={item.words}>
                  <p className="mb-2 font-semibold">{item.words} words</p>
                  <p className="leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Key product facts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                {productFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Logo downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Use the mark as supplied. Do not recolor, stretch or place it on
                a busy background.
              </p>
              <ul className="space-y-3">
                {logoDownloads.map((logo) => (
                  <li
                    key={logo.href}
                    className="flex flex-wrap items-center gap-3"
                  >
                    <Button
                      variant="outline"
                      asChild
                    >
                      <a
                        href={logo.href}
                        download
                      >
                        {logo.name}
                      </a>
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {logo.note}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">How to cite us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Cite the company as &quot;User Solutions, Inc.&quot; and the
                product as &quot;EDGEBIC&quot;. Link to these canonical URLs
                rather than to blog posts or older product pages:
              </p>
              <ul className="space-y-2">
                {citeUrls.map((item) => (
                  <li key={item.href}>
                    <span className="font-medium">{item.label}: </span>
                    <Link
                      href={item.href}
                      className="underline"
                    >
                      https://usersolutions.com{item.href}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Press and analyst contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                For interviews, quotes, screenshots or fact checks, use the
                contact form or call {AppInfo.PHONE}. Published press releases
                are listed on the press release page and media coverage on the
                news page.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={Routes.Contact}>Contact User Solutions</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                >
                  <Link href={Routes.PressRelease}>Press releases</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                >
                  <Link href={Routes.News}>News and media coverage</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
