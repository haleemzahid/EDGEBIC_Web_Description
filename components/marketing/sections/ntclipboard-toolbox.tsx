'use client';

import * as React from 'react';
import Link from 'next/link';
import { Play, Check } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { Button } from '@/components/ui/button';

// Video Player Component - Lite YouTube for better performance
function VideoPlayer({
  videoUrl,
  title,
  thumbnail,
  onPlayStateChange
}: {
  videoUrl: string;
  title: string;
  thumbnail: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isActivated, setIsActivated] = React.useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    onPlayStateChange?.(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    onPlayStateChange?.(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onPlayStateChange?.(false);
  };

  // Check if it's a YouTube URL
  const isYouTube =
    videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : '';
  };

  if (isYouTube) {
    const videoId = getVideoId(videoUrl);
    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    // Lite YouTube - show thumbnail until user clicks
    if (!isActivated) {
      return (
        <button
          type="button"
          onClick={() => {
            setIsActivated(true);
            onPlayStateChange?.(true);
          }}
          className="absolute inset-0 size-full cursor-pointer"
          aria-label={`Play ${title}`}
        >
          <img
            src={thumbnailUrl}
            alt={title}
            className="size-full rounded-lg object-cover"
            loading="lazy"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20 transition-colors hover:bg-black/30">
            <div className="flex size-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform hover:scale-110">
              <svg
                className="ml-1 size-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      );
    }

    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        className="absolute inset-0 size-full rounded-lg"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      title={title}
      className="absolute inset-0 size-full rounded-lg object-cover"
      controls
      playsInline
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
    >
      Your browser does not support the video tag.
    </video>
  );
}

export function NTClipboardToolBox(): React.JSX.Element {
  // State to control badge visibility for each card
  const [isVideoPlaying, setIsVideoPlaying] = React.useState({
    end: false,
    starter: false,
    advanced: false,
    premium: false
  });

  const handleVideoPlayState = (
    cardType: 'end' | 'starter' | 'advanced' | 'premium',
    isPlaying: boolean
  ) => {
    setIsVideoPlaying((prev) => ({
      ...prev,
      [cardType]: isPlaying
    }));
  };
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
            <div className="group relative overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-xl">
              {/* Price Badge */}
              <div
                className={`animate-gentle-glow absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-sm font-bold text-white shadow-lg ring-2 ring-white/20 transition-opacity duration-300 ${isVideoPlaying.end ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
              >
                START
              </div>

              <div className="">
                {/* Video Section */}
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <VideoPlayer
                      videoUrl="https://www.youtube.com/watch?v=G6sbrbp9AVc"
                      title="Operations Manager Excel Templates"
                      thumbnail="/images/Edgebic/2022-07/RMX.png"
                      onPlayStateChange={(isPlaying) =>
                        handleVideoPlayState('end', isPlaying)
                      }
                    />
                  </div>
                </div>
                <div className="p-6">

                  <div className="mb-6 space-y-3">
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

                  <div className="mb-4">
                    <Button
                      variant="outline"
                      className="w-full border-green-200 text-green-700 hover:bg-green-50"
                      asChild
                    >
                      <Link
                        href="/excel-templates"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Details
                      </Link>
                    </Button>
                  </div>

                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-green-700">
                      $1K+
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Resource Manager DB */}
            <div className="group relative overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-lg transition-all hover:shadow-xl">
              {/* Popular Badge - Enhanced */}
              <div
                className={`animate-gentle-glow absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-4 py-2 text-sm font-bold text-white shadow-lg ring-2 ring-white/20 transition-opacity duration-1000 ${isVideoPlaying.advanced ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
              >
                <span className="relative flex items-center gap-1">
                  ADVANCED
                </span>
              </div>{' '}
              <div className="">
                {/* Video Section */}
                <div className="relative  overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <VideoPlayer
                      videoUrl="https://www.youtube.com/watch?v=I8fOWJkTv-k"
                      title="Resource Manager DB"
                      thumbnail="/images/toolbox/advanced.png"
                      onPlayStateChange={(isPlaying) =>
                        handleVideoPlayState('advanced', isPlaying)
                      }
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    Resource Manager DB
                  </h3>

                  <div className="mb-6 space-y-3">
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

                  <div className="mb-4">
                    <Button
                      variant="outline"
                      className="w-full border-green-200 text-green-700 hover:bg-green-50"
                      asChild
                    >
                      <Link
                        href="/resource-manager-db-2"
                        target="_blank"
                      >
                        View Details
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 text-center">
                    <div className="mb-2 text-3xl font-bold text-green-700">
                      $3K+
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-xl">
              {/* Price Badge */}
              <div
                className={`animate-gentle-glow absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg ring-2 ring-white/20 transition-opacity duration-300 ${isVideoPlaying.starter ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
              >
                Premium
              </div>

              <div className="">
                {/* Video Section */}
                <div className="relative  overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <VideoPlayer
                      videoUrl="https://www.youtube.com/watch?v=-Rb6_Rop2JA"
                      title="EDGEBIC Demo"
                      thumbnail="/images/toolbox/insight.png"
                      onPlayStateChange={(isPlaying) =>
                        handleVideoPlayState('starter', isPlaying)
                      }
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    EDGEBI <span className="text-sm font-normal text-gray-500">(Bundled w/ RMDB)</span>
                  </h3>

                  <div className="mb-6 space-y-3">
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

                  <div className="mb-4">
                    <Button
                      variant="outline"
                      className="w-full border-green-200 text-green-700 hover:bg-green-50"
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
                  </div>

                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-green-700">
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
