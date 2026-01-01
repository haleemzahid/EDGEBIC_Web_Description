'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { Button } from '@/components/ui/button';

// YouTube Video Player Component - Embeds YouTube iframe directly
function YouTubePlayer({
  videoId,
  title,
  hidePoster = false
}: {
  videoId: string;
  title: string;
  hidePoster?: boolean;
}) {
  const params = hidePoster
    ? `?rel=0&modestbranding=1&iv_load_policy=3`
    : `?rel=0`;

  return (
    <iframe
      className="absolute inset-0 size-full"
      src={`https://www.youtube.com/embed/${videoId}${params}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

export function NTClipboardToolBox(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines>
      <div>
        {/* Solutions for Every Business Size */}
        <div className="">
          {/* <div className="mb-6 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                From Job Shops to SMBs to Multi-Nationals
              </h2>
              <p className="text-xl text-muted-foreground">
                Solutions to fit any production scheduling application and
                budget
              </p>
            </div> */}

          <div className="grid gap-8 md:grid-cols-3">
            {/* Excel Templates - Operations Manager */}
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-xl">
              {/* Price Badge */}
              <div className="animate-gentle-glow absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-sm font-bold text-white shadow-lg ring-2 ring-white/20">
                START
              </div>

              {/* Video Section */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative aspect-video bg-slate-100">
                  <YouTubePlayer
                    videoId="DRWDNVq31l4"
                    title="Operations Manager Excel Templates"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Resource Manager For XL
                </h3>

                <div className="mb-6 flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">Shop Scheduling Made easy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">Forward Scheduling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">Finite Capacity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">No Risk Trials</span>
                  </div>
                  <div className="ml-6 text-sm text-gray-500">
                    Implementation support included!
                  </div>
                </div>

                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="mb-4 w-full border-green-200 text-green-700 hover:bg-green-50"
                    asChild
                  >
                    <Link href="/resource-manager-for-excel-2">
                      View Details
                    </Link>
                  </Button>
                  <div className="text-center text-3xl font-bold text-green-700">
                    $1K+
                  </div>
                </div>
              </div>
            </div>
            {/* Resource Manager DB */}
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-lg transition-all hover:shadow-xl">
              {/* Popular Badge - Enhanced */}
              <div className="animate-gentle-glow absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-4 py-2 text-sm font-bold text-white shadow-lg ring-2 ring-white/20">
                <span className="relative flex items-center gap-1">
                  ADVANCED
                </span>
              </div>

              {/* Video Section */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative aspect-video bg-slate-100">
                  <YouTubePlayer
                    videoId="kn92TIHhbm8"
                    title="Resource Manager DB"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Resource Manager DB
                </h3>

                <div className="mb-6 flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">Product Scheduling your Way!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">Flexible and Adaptable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">Easy to implement APS & MRP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">No Risk Trials</span>
                  </div>
                  <div className="ml-6 text-sm text-gray-500">
                    Implementation support included!
                  </div>
                </div>

                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="mb-4 w-full border-green-200 text-green-700 hover:bg-green-50"
                    asChild
                  >
                    <Link
                      href="/resource-manager-db-2"
                      target="_blank"
                    >
                      View Details
                    </Link>
                  </Button>
                  <div className="text-center text-3xl font-bold text-green-700">
                    $3K+
                  </div>
                </div>
              </div>
            </div>

            {/* Premium - EDGEBI */}
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-xl">
              {/* Price Badge */}
              <div className="animate-gentle-glow absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg ring-2 ring-white/20">
                Premium
              </div>

              {/* Video Section */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative aspect-video bg-slate-100">
                  <YouTubePlayer
                    videoId="snltXMHeojU"
                    title="EDGEBIC Demo"
                    hidePoster={true}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  EDGEBI <span className="text-sm font-normal text-gray-500">(Bundled w/ RMDB)</span>
                </h3>

                <div className="mb-6 flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">Heat Map Report</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">Schedule Key Dates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">Live Embedded Excel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">Advanced Drag and Drop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    <span className="text-sm">No Risk Trials</span>
                  </div>
                  <div className="ml-6 text-sm text-gray-500">
                    Implementation support included!
                  </div>
                </div>

                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="mb-4 w-full border-green-200 text-green-700 hover:bg-green-50"
                    asChild
                  >
                    <Link
                      href="/jsl-job-scheduler-lite"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Details
                    </Link>
                  </Button>
                  <div className="text-center text-3xl font-bold text-green-700">
                    $10K+
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Call to Action */}
          {/* <div className="mt-6 text-center">
                            <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-8">
                                <h3 className="mb-4 text-2xl font-bold">
                                    Start Growing with User Solutions
                                </h3>
                                <p className="mb-6 text-lg text-muted-foreground">
                                    Production Planning and Scheduling Solutions for every
                                    business size and budget
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {/* <Button>
                                        <Link href="/product-2">See Feature List</Link>
                                    </Button> */}
          {/* <Button variant="outline">
                                        <Link href="/contact-us">Schedule Demo</Link>
                                    </Button> */}
          {/* </div>
                </div>
            </div> */}
        </div>
      </div>
    </GridSection>
  );
}
