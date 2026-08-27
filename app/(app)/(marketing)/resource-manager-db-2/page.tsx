import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from '@/components/seo';
import { AppInfo } from '@/constants/app-info';
import { RMDB_ALTERNATE_NAMES, schemaNodeIds } from '@/lib/seo/schema-nodes';
import { EdgebicSuccessorCallout } from '@/components/marketing/sections/edgebic-successor-callout';
import { RMDBFeatureList } from '@/components/marketing/sections/rmdb-feature-list';
import { RMDBTabsClient } from '@/components/marketing/sections/rmdb-tabs-client';
import { Card, CardContent } from '@/components/ui/card';
import { YouTubeFacade } from '@/components/ui/youtube-facade';

import { RelatedSuccessStories } from '@/components/marketing/sections/related-success-stories';
import { getBaseUrl } from '@/lib/urls/get-base-url';

const BASE_URL = getBaseUrl();

// Local image paths for faster loading
const IMAGES = {
  heroImage: '/images/rmdb/rmdb-edge-hero.png',
  menuImage: '/images/rmdb/rmdb-menu.png',
  dataImportImage: '/images/rmdb/rmdb-data-import.png',
  awardsBanner: '/images/rmdb/awards-banner.jpg',
  // Local video paths
  heroVideo: 'https://www.youtube.com/watch?v=kn92TIHhbm8',
  summaryVideo: 'https://www.youtube.com/watch?v=6B4A-acolGk'
};

export const metadata: Metadata = {
  // The title used to read "Resource Manager for Excel", which is RMX: a
  // different product with its own page. Two of our own URLs were competing
  // for the same phrase. Both RMDB spellings are kept because both rank.
  title: 'Resource Manager DB (RMDB): Production Planning & Scheduling Software',
  description:
    'Resource Manager-DB (RMDB) is a flexible and affordable production planning, scheduling, and tracking solution designed to adapt to your operations. Features finite capacity planning, MRP, drag-and-drop scheduling, and Excel integration. RMDB remains fully supported; new licenses are sold as EDGEBIC.',
  keywords: [
    'RMDB',
    'RMDB scheduling software',
    'Resource Manager DB',
    'production scheduling',
    'manufacturing scheduling',
    'finite capacity planning',
    'MRP software',
    'inventory management',
    'drag and drop scheduling',
    'Excel integration',
    'manufacturing software',
    'mid-sized manufacturer software',
    'mid sized manufacturer scheduling software'
  ],
  alternates: {
    canonical: `${BASE_URL}/resource-manager-db-2`
  },
  openGraph: {
    title: 'Resource Manager DB - User Solutions',
    description:
      'Flexible and affordable production planning, scheduling, and tracking solution. Features finite capacity planning, MRP, and drag-and-drop scheduling.',
    url: `${BASE_URL}/resource-manager-db-2`,
    siteName: 'User Solutions',
    images: [
      {
        url: `${BASE_URL}/images/rmdb/rmdb-edge-hero.png`,
        width: 1024,
        height: 483,
        alt: 'Resource Manager DB - EDGE Interface'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@UserSolutionsUS',
    creator: '@UserSolutionsUS',
    title: 'Resource Manager DB - Production Planning & Scheduling Software',
    description:
      'Flexible and affordable production planning, scheduling, and tracking solution designed to adapt to your operations.',
    images: [`${BASE_URL}/images/rmdb/rmdb-edge-hero.png`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

// The canonical RMDB feature list, shared with the visible feature section.
const RMDB_FEATURE_LIST = [
  'Finite Capacity Planning & Scheduling',
  'MRP and Inventory Management',
  'Easy "what-if" Analysis',
  'Downtime Analysis and Reporting',
  'Costing and Estimating',
  'Running Stand Alone or Networked',
  'Dragging and Dropping Adjustments',
  'Optional LP Optimization Integration',
  'Advanced Planning and Scheduling',
  'Routings and Priority Scheduling',
  'Purchasing and Receiving',
  'Simple Maintenance and Updating',
  'Integrating with All Systems',
  'Production Planning',
  'Concurrent Resource Scheduling',
  'Customized Reports'
];

const RMDB_COMPARISONS = [
  { href: '/compare-products/rmdb-vs-sap', label: 'RMDB vs SAP' },
  { href: '/compare-products/rmdb-vs-epicor', label: 'RMDB vs Epicor' },
  { href: '/compare-products/rmdb-vs-netsuite', label: 'RMDB vs NetSuite' },
  { href: '/compare-products/rmdb-vs-preactor', label: 'RMDB vs Preactor' },
  {
    href: '/compare-products/rmdb-vs-e2-shop-system',
    label: 'RMDB vs E2 Shop System'
  },
  { href: '/compare-products/rmdb-vs-quickbooks', label: 'RMDB vs QuickBooks' }
];

const RMDB_MIGRATION_GUIDES = [
  {
    href: '/blog/what-carries-forward-from-rmdb-to-edgebic',
    label: 'What carries forward from RMDB to EDGEBIC'
  },
  {
    href: '/blog/rmdb-to-edgebic-feature-parity-map',
    label: 'RMDB to EDGEBIC feature parity map'
  },
  {
    href: '/blog/moving-rmdb-routings-into-edgebic',
    label: 'Moving RMDB routings into EDGEBIC'
  },
  {
    href: '/blog/running-rmdb-and-edgebic-side-by-side',
    label: 'Running RMDB and EDGEBIC side by side'
  },
  {
    href: '/blog/mapping-rmdb-terms-to-edgebic-terms',
    label: 'Mapping RMDB terms to EDGEBIC terms'
  },
  {
    href: '/blog/training-your-rmdb-team-on-edgebic',
    label: 'Training your RMDB team on EDGEBIC'
  }
];

// Summary tab content - rendered server-side
function SummaryContent() {
  return (
    <div className="space-y-6">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div>
          <div className="space-y-4 text-base leading-relaxed text-slate-700">
            <p>
              If you have tried to use your ERP for creating a viable Production
              Schedule, and still end up with a tangle of custom Excel Reports,
              messy whiteboard or worse yet, late shipments, we can help.
            </p>
            <p>
              RMDB was specifically architected to easily adapt to the way you
              work, using your existing data. It can be easily configured,
              and/or reconfigured, on the fly to address your most pressing
              issues.
            </p>
            <p>
              We can focus and resolve your most pressing issues quickly —
              letting you reap immediate ROI. Then, delve deeper without having
              to spend more!
            </p>
            <p>
              Schedule a live demo, even using your data in its current form –
              RISK FREE!!
            </p>
            <p>
              RMDB contains deep functionality to address a multitude of
              challenges for production planning and scheduling: alternate
              workcenters, complex routings & processes, discrete and/or batch,
              multiple constraints (labor, machines, materials, etc.), advanced
              drag and drop graphical calendar screens, downtime management,
              sub-assemblies, optimization, and much more.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="aspect-video w-full max-w-[600px] overflow-hidden rounded-lg">
              <Image
                src="/images/Edgebic/Picture1.png"
                alt="EDGEBI Overview"
                width={800}
                height={500}
                className="h-auto max-w-full rounded-lg"
                loading="lazy"
                quality={85}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/images/Edgebic/2022-10/f2.png"
              alt="EDGEBI Schedule Management Interface"
              width={600}
              height={400}
              className="rounded-lg"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>
      </div>
      <RMDBFeatureList />
    </div>
  );
}

// Quick Start tab content - rendered server-side
function QuickStartContent() {
  return (
    <div>
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Quick Start
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              Get started with Resource Manager-DB quickly and easily. Our Quick
              Start guide provides step-by-step instructions to help you set up
              and configure RMDB for your specific needs.
            </p>
            <p>
              Download the comprehensive Quick Start PDF guide to begin your
              journey with RMDB.
            </p>
            <a
              href="/pdf/rmdbquickstart23.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
            >
              Download Quick Start Guide (PDF)
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={IMAGES.dataImportImage}
            alt="RMDB Data Import dialog showing Excel integration"
            width={600}
            height={400}
            className="h-auto max-w-full rounded-lg shadow-lg"
            loading="lazy"
            quality={85}
          />
        </div>
      </div>
      <RMDBFeatureList />
    </div>
  );
}

// Live Demo tab content - rendered server-side with client interactivity
function LiveDemoContent() {
  return (
    <div>
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Live Demo</h2>
          <div className="space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              See Resource Manager-DB in action! Schedule a live demo with our
              team to experience how RMDB can transform your production planning
              and scheduling processes.
            </p>
            <p>
              We can even use your data in its current form to show you exactly
              how RMDB will work for your specific operations – RISK FREE!
            </p>
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
            >
              Schedule a Live Demo
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={IMAGES.heroImage}
            alt="Resource Manager DB EDGE interface preview for live demo"
            width={1024}
            height={483}
            className="h-auto max-w-full rounded-lg shadow-lg"
            loading="lazy"
            quality={85}
          />
        </div>
      </div>
      <RMDBFeatureList />
    </div>
  );
}

export default function ResourceManagerDBPage() {
  const nodes = schemaNodeIds();

  return (
    <>
      {/* The canonical RMDB node. Every rmdb-vs-* comparison page points at
          this @id. No offers block: RMDB is fully supported but no longer sold
          as a new license, and publishing an InStock price for it contradicted
          /pricing on the same domain. */}
      <SoftwareApplicationJsonLd
        id={nodes.rmdb}
        name="Resource Manager DB (RMDB)"
        alternateName={RMDB_ALTERNATE_NAMES}
        description="Resource Manager-DB (RMDB) is a flexible and affordable production planning, scheduling, and tracking solution designed to adapt to your operations."
        url="/resource-manager-db-2"
        applicationSubCategory="Production Scheduling Software"
        operatingSystem="Windows"
        featureList={RMDB_FEATURE_LIST}
        sameAs={[AppInfo.PROFILE_LINKS.CAPTERRA, AppInfo.PROFILE_LINKS.G2]}
        predecessorOf={nodes.edgebic}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/` },
          {
            name: 'Resource Manager DB (RMDB)',
            url: `${BASE_URL}/resource-manager-db-2`
          }
        ]}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section
          className="pt-6"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <h1
                  id="hero-heading"
                  className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl"
                >
                  Resource Manager DB (RMDB)
                </h1>
                <p className="text-lg leading-relaxed text-slate-600">
                  Resource Manager-DB (RMDB) is a flexible and affordable
                  production planning, scheduling, and tracking solution that is
                  designed to adapt to your operations. We can work with
                  whatever data you have to achieve better production
                  scheduling, just easier and quicker than you ever thought
                  possible. Give US a chance to prove it by scheduling a Live
                  Demo today!
                </p>
                {/* The site said "RMDB is not discontinued" on one page and
                    "we no longer sell RMDB" on another. Both are true. Saying
                    them together, here, is what resolves it. */}
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  RMDB remains fully supported for existing installations. New
                  licenses are sold as{' '}
                  <Link
                    href="/edgebic"
                    className="font-medium text-cyan-700 underline underline-offset-4"
                  >
                    EDGEBIC
                  </Link>
                  , the current generation of Resource Manager DB, which carries
                  the full RMDB scheduling engine forward into one modern
                  application. See the{' '}
                  <Link
                    href="/rmdb-to-edgebic"
                    className="font-medium text-cyan-700 underline underline-offset-4"
                  >
                    RMDB to EDGEBIC upgrade path
                  </Link>
                  .
                </p>
              </div>
              <div className="flex justify-center">
                <div className="aspect-video w-full max-w-[700px] overflow-hidden rounded-lg shadow-lg">
                  <YouTubeFacade
                    videoId="kn92TIHhbm8"
                    title="Resource Manager DB product overview video"
                    className="size-full"
                    useBluePlayButton
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section - Client Component */}
        <Suspense
          fallback={
            <div
              className="min-h-[200px] animate-pulse bg-slate-100 rounded-lg mx-4"
              aria-busy="true"
              aria-label="Loading tabs"
            />
          }
        >
          <RMDBTabsClient
            summaryContent={<SummaryContent />}
            quickStartContent={<QuickStartContent />}
            liveDemoContent={<LiveDemoContent />}
          />
        </Suspense>
        {/* This page was HIGH priority in the sitemap and linked out to a PDF
            and a contact form. Everything below already links in to it; none
            of it was reachable from here. */}
        <section
          className="border-t border-slate-200 py-12"
          aria-labelledby="rmdb-resources-heading"
        >
          <div className="container mx-auto max-w-7xl px-4">
            <h2
              id="rmdb-resources-heading"
              className="mb-8 text-2xl font-bold text-slate-900"
            >
              RMDB comparisons and guides
            </h2>
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  How RMDB compares
                </h3>
                <ul className="space-y-2 text-slate-600">
                  {RMDB_COMPARISONS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="hover:text-cyan-700 hover:underline underline-offset-4"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">
                  <Link
                    href="/compare-products"
                    className="font-medium text-cyan-700 underline underline-offset-4"
                  >
                    See all comparisons
                  </Link>
                </p>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  Moving from RMDB to EDGEBIC
                </h3>
                <ul className="space-y-2 text-slate-600">
                  {RMDB_MIGRATION_GUIDES.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="hover:text-cyan-700 hover:underline underline-offset-4"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">
                  <Link
                    href="/rmdb-to-edgebic"
                    className="font-medium text-cyan-700 underline underline-offset-4"
                  >
                    Read the full upgrade path
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        <EdgebicSuccessorCallout variant="rmdb" />
        <RelatedSuccessStories productKey="rmdb" />
      </main>
    </>
  );
}
