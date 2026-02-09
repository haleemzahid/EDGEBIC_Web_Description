import * as React from 'react';
import Image from 'next/image';

import { SoftwareApplicationJsonLd } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getBaseUrl } from '@/lib/urls/get-base-url';

export const metadata = createPageMetadata({
  title: 'Job Scheduler Lite (JSL)',
  description:
    'Entry-level production scheduling solution designed for job shops and small manufacturers. Free download with powerful scheduling features.',
  path: '/jsl-job-scheduler-lite',
  keywords:
    'job scheduler, production scheduling, manufacturing software, job shop scheduling, free scheduling software'
});

export default function JobSchedulerLitePage(): React.JSX.Element {
  const baseUrl = getBaseUrl();
  return (
    <div className="min-h-screen">
      <SoftwareApplicationJsonLd
        name="Job Scheduler Lite (JSL)"
        description="Entry-level production scheduling solution designed for job shops and small manufacturers"
        url={`${baseUrl}/jsl-job-scheduler-lite`}
        price="0"
      />
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
              EDGEBI
            </h1>
            <p className="mb-6 text-xl text-muted-foreground md:text-2xl">
              Entry-level production scheduling solution designed for job shops
              and small manufacturers
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="cursor-pointer"
                asChild
              >
                <a
                  href="https://www.usersolutions.com/wp-content/uploads/2022/10/JSLsetup.zip"
                  download="JSLsetup.zip"
                >
                  Download Free Trial
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mx-auto max-w-7xl">
          {/* Overview */}
          <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Overview
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Welcome to EDGEBI. Designed as an entry level production
                scheduling offering that allows users to quickly create a series
                of routing steps then schedule according to capacity
                limitations, direction (Forward or Reverse), and Priorities. It
                also offers a quick method to load data either directly or
                importing from an Excel sheet.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/images/Edgebic/2022-10/insight-1.png"
                alt="EDGEBI production scheduling software interface"
                width={800}
                height={600}
                className="h-auto w-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              See JSL in Action
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-black shadow-lg">
                <YouTubeFacade
                  videoId="snltXMHeojU"
                  title="EDGEBI Demo Video"
                  className="aspect-video w-full"
                  hidePlayButton={true}
                />
              </div>
              <div>
                <h3 className="mb-3 text-xl font-semibold">
                  Complete JSL Walkthrough
                </h3>
                <p className="mb-3 text-muted-foreground">
                  Watch this comprehensive demonstration of Job Scheduler
                  Lite&apos;s key features:
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Interactive menu navigation</li>
                  <li>• Data import from Excel</li>
                  <li>• Forward/Reverse scheduling</li>
                  <li>• Capacity planning setup</li>
                  <li>• InSights and reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Key Features
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Simple, Familiar Interface
                </h3>
                <p className="text-muted-foreground">
                  One step menus, on-screen buttons, or sheet tabs make
                  navigation a snap.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Easy to Configure
                </h3>
                <p className="text-muted-foreground">
                  Quick, intuitive layout and prompts allow you to focus on your
                  business.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Finite Capacity Planning
                </h3>
                <p className="text-muted-foreground">
                  Forward/Reverse scheduling with global and detailed workcenter
                  configuration.
                </p>
              </div>
            </div>
          </div>

          {/* Core Modules */}
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Core Modules
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="mb-2 font-semibold">Import Data</h3>
                <Image
                  src="/images/Edgebic/2022-10/import.png"
                  alt="Data import"
                  width={400}
                  height={300}
                  className="mb-2 h-auto w-full rounded"
                  loading="lazy"
                />
                <p className="text-sm text-muted-foreground">
                  Load data directly or import from Excel.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Daily Hours</h3>
                <Image
                  src="/images/Edgebic/2022-10/dailyhours.png"
                  alt="Daily hours"
                  width={400}
                  height={300}
                  className="mb-2 h-auto w-full rounded"
                  loading="lazy"
                />
                <p className="text-sm text-muted-foreground">
                  Set normal operating hours.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Holidays</h3>
                <Image
                  src="/images/Edgebic/2022-10/holidays.png"
                  alt="Holidays"
                  width={400}
                  height={300}
                  className="mb-2 h-auto w-full rounded"
                  loading="lazy"
                />
                <p className="text-sm text-muted-foreground">
                  Manage shutdowns and holidays.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Resources</h3>
                <Image
                  src="/images/Edgebic/2022-10/resoursces.png"
                  alt="Resources"
                  width={400}
                  height={300}
                  className="mb-2 h-auto w-full rounded"
                  loading="lazy"
                />
                <p className="text-sm text-muted-foreground">
                  Add workcenters with capacity.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Orders</h3>
                <Image
                  src="/images/Edgebic/2022-10/orders-1024x459.png"
                  alt="Orders"
                  width={1024}
                  height={459}
                  className="mb-2 h-auto w-full rounded"
                  loading="lazy"
                />
                <p className="text-sm text-muted-foreground">
                  Enter orders with timing.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Finished Goods/Routing</h3>
                <Image
                  src="/images/Edgebic/2022-10/FG.png"
                  alt="Finished goods"
                  width={400}
                  height={300}
                  className="mb-2 h-auto w-full rounded"
                  loading="lazy"
                />
                <p className="text-sm text-muted-foreground">
                  Define scheduling with workcenters.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Schedule</h3>
                <Image
                  src="/images/Edgebic/2022-10/schdle.png"
                  alt="Schedule"
                  width={400}
                  height={300}
                  className="mb-2 h-auto w-full rounded"
                  loading="lazy"
                />
                <p className="text-sm text-muted-foreground">
                  Advanced scheduling engine.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">InSights</h3>
                <Image
                  src="/images/Edgebic/2022-10/insight.png"
                  alt="InSights"
                  width={400}
                  height={300}
                  className="mb-2 h-auto w-full rounded"
                  loading="lazy"
                />
                <p className="text-sm text-muted-foreground">
                  Gantt charts and calendar views.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
