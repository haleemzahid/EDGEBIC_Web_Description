'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Play } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { Button } from '@/components/ui/button';

// YouTube Video Player Component - Shows thumbnail until clicked
function YouTubePlayer({
  videoId,
  title,
  thumbnailUrl
}: {
  videoId: string;
  title: string;
  thumbnailUrl?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Use custom thumbnail or YouTube's maxresdefault thumbnail
  const thumbnail = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (isPlaying) {
    return (
      <iframe
        className="absolute inset-0 size-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      className="absolute inset-0 size-full cursor-pointer group"
      aria-label={`Play ${title}`}
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover"
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
        <div className="flex size-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg group-hover:bg-red-700 transition-colors">
          <Play className="size-8 fill-white" />
        </div>
      </div>
    </button>
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

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {/* Excel Templates - Operations Manager */}
            <div className="flex flex-col">
              {/* Option Label above card */}
              <div className="mb-4 text-center">
                <span className="border-b-2 border-[#003d5c] pb-1 text-2xl font-bold text-[#003d5c]">
                  Starter
                </span>
              </div>
              <div className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-xl">

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
            </div>

            {/* Resource Manager DB */}
            <div className="flex flex-col">
              {/* Option Label above card */}
              <div className="mb-4 text-center">
                <span className="border-b-2 border-[#003d5c] pb-1 text-2xl font-bold text-[#003d5c]">
                  Advanced
                </span>
              </div>
              <div className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-lg transition-all hover:shadow-xl">

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
            </div>

            {/* Premium - EDGEBI */}
            <div className="flex flex-col">
              {/* Option Label above card */}
              <div className="mb-4 text-center">
                <span className="border-b-2 border-[#003d5c] pb-1 text-2xl font-bold text-[#003d5c]">
                  Premium
                </span>
              </div>
              <div className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-xl">
                {/* Video Section */}
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <YouTubePlayer
                      videoId="-Rb6_Rop2JA"
                      title="EDGEBI Demo"
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
                        href="/edgebi"
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
