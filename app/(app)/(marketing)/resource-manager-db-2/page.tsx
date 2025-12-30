import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import { Suspense } from 'react';

import { RMDBFeatureList } from '@/components/marketing/sections/rmdb-feature-list';
import { RMDBTabsClient } from '@/components/marketing/sections/rmdb-tabs-client';
import { Card, CardContent } from '@/components/ui/card';
import { LazyVideo } from '@/components/ui/lazy-video';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://edgebic.com';

export const metadata: Metadata = {
  title: 'Resource Manager DB - Production Planning & Scheduling Software',
  description:
    'Resource Manager-DB (RMDB) is a flexible and affordable production planning, scheduling, and tracking solution designed to adapt to your operations. Features finite capacity planning, MRP, drag-and-drop scheduling, and Excel integration.',
  keywords: [
    'Resource Manager DB',
    'RMDB',
    'production planning software',
    'production scheduling',
    'manufacturing scheduling',
    'finite capacity planning',
    'MRP software',
    'inventory management',
    'drag and drop scheduling',
    'Excel integration',
    'manufacturing software',
  ],
  alternates: {
    canonical: `${BASE_URL}/resource-manager-db-2`,
  },
  openGraph: {
    title: 'Resource Manager DB - Production Planning & Scheduling Software',
    description:
      'Flexible and affordable production planning, scheduling, and tracking solution. Features finite capacity planning, MRP, and drag-and-drop scheduling.',
    url: `${BASE_URL}/resource-manager-db-2`,
    siteName: 'EDGEBIC',
    images: [
      {
        url: 'https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png',
        width: 1024,
        height: 483,
        alt: 'Resource Manager DB - EDGE Interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resource Manager DB - Production Planning & Scheduling Software',
    description:
      'Flexible and affordable production planning, scheduling, and tracking solution designed to adapt to your operations.',
    images: ['https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Resource Manager DB (RMDB)',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Windows',
  description:
    'Resource Manager-DB (RMDB) is a flexible and affordable production planning, scheduling, and tracking solution designed to adapt to your operations.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
  },
  featureList: [
    'Finite Capacity Planning & Scheduling',
    'Advanced Planning and Scheduling',
    'MRP and Inventory Management',
    'Drag and Drop Adjustments',
    'Excel Integration',
    'Production Planning',
    'Customized Reports',
  ],
  screenshot: 'https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png',
  softwareVersion: '2023',
  publisher: {
    '@type': 'Organization',
    name: 'User Solutions',
    url: 'https://www.usersolutions.com',
  },
};

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
              work, using your existing data. It can be easily configured, and/or
              reconfigured, on the fly to address your most pressing issues.
            </p>
            <p>
              We can focus and resolve your most pressing issues quickly — letting
              you reap immediate ROI. Then, delve deeper without having to spend
              more!
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
        <div className="flex items-center justify-center">
          <Image
            src="https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png"
            alt="Resource Manager-DB with EDGE (Enhanced Drag & drop Graphical Environment)"
            width={1024}
            height={483}
            className="h-auto max-w-full rounded-lg shadow-lg"
            loading="lazy"
            quality={80}
          />
        </div>
      </div>

      {/* Video and Image Section */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="flex justify-center">
          <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <LazyVideo
              src="https://www.usersolutions.com/wp-content/uploads/2022/10/EDGE BI User Solutions.mp4"
              poster="https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png"
              className="h-full w-full object-cover"
              title="EDGE BI User Solutions demonstration video"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="https://www.usersolutions.com/wp-content/uploads/2022/07/rmdb11.png"
            alt="Resource Manager DB Processing Menu"
            width={600}
            height={450}
            className="h-auto max-w-full rounded-lg shadow-lg"
            loading="lazy"
            quality={80}
          />
        </div>
      </div>
    </div>
  );
}

// Quick Start tab content - rendered server-side
function QuickStartContent() {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      <div>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Quick Start</h2>
        <div className="space-y-4 text-base leading-relaxed text-slate-600">
          <p>
            Get started with Resource Manager-DB quickly and easily. Our Quick
            Start guide provides step-by-step instructions to help you set up and
            configure RMDB for your specific needs.
          </p>
          <p>
            Download the comprehensive Quick Start PDF guide to begin your journey
            with RMDB.
          </p>
          <a
            href="https://www.usersolutions.com/wp-content/uploads/2022/10/rmdbquickstart23.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
          >
            Download Quick Start Guide (PDF)
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="https://www.usersolutions.com/wp-content/uploads/2022/10/RMDB-Data-Import.png"
          alt="RMDB Data Import"
          width={600}
          height={400}
          className="h-auto max-w-full rounded-lg shadow-lg"
          loading="lazy"
          quality={80}
        />
      </div>
    </div>
  );
}

// Live Demo tab content - rendered server-side with client interactivity
function LiveDemoContent() {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Live Demo</h2>
        <div className="space-y-4 text-base leading-relaxed text-slate-600">
          <p>
            See Resource Manager-DB in action! Schedule a live demo with our team
            to experience how RMDB can transform your production planning and
            scheduling processes.
          </p>
          <p>
            We can even use your data in its current form to show you exactly how
            RMDB will work for your specific operations – RISK FREE!
          </p>
          <a
            href="https://calendly.com/mudasirnadeem7979/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
          >
            Schedule a Live Demo
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png"
          alt="RMDB Live Demo"
          width={1024}
          height={483}
          className="h-auto max-w-full rounded-lg shadow-lg"
          loading="lazy"
          quality={80}
        />
      </div>
    </div>
  );
}

export default function ResourceManagerDBPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="json-ld-rmdb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-6" aria-labelledby="hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h1 id="hero-heading" className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Resource Manager DB
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                Resource Manager-DB (RMDB) is a flexible and affordable production
                planning, scheduling, and tracking solution that is designed to
                adapt to your operations. We can work with whatever data you have
                to achieve better production scheduling, just easier and quicker
                than you ever thought possible. Give US a chance to prove it by
                scheduling a Live Demo today!
              </p>
            </div>
            <div className="flex justify-center">
              <div className="aspect-video w-full max-w-[700px] overflow-hidden rounded-lg shadow-lg">
                <LazyVideo
                  src="https://www.usersolutions.com/wp-content/uploads/2022/12/RMDB updated thumbnail.mp4"
                  poster="https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png"
                  className="h-full w-full object-cover"
                  title="Resource Manager DB product overview video"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section - Client Component */}
      <Suspense
        fallback={
          <div className="min-h-[200px] animate-pulse bg-slate-100 rounded-lg mx-4" />
        }
      >
        <RMDBTabsClient
          summaryContent={<SummaryContent />}
          quickStartContent={<QuickStartContent />}
          liveDemoContent={<LiveDemoContent />}
        />
      </Suspense>

      {/* Features Section */}
      <RMDBFeatureList />

      {/* Awards Section */}
      <section aria-labelledby="awards-heading">
        <div className="container mx-auto">
          <Card className="mt-6 rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 text-card-foreground shadow">
            <CardContent className="p-8 text-center">
              <h2 id="awards-heading" className="mb-6 text-2xl font-bold text-slate-900">
                CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
              </h2>
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                alt="Collection of industry and business awards logos"
                width={1024}
                height={128}
                className="mx-auto h-auto max-w-full"
                loading="lazy"
                quality={80}
              />
            </CardContent>
          </Card>
        </div>
      </section>
      </main>
    </>
  );
}
