'use client';

import * as React from 'react';
import Link from 'next/link';
import { Play, Check } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { Button } from '@/components/ui/button';

// Video Player Component
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
    // Use specific embed URL with si parameter for the Excel template video
    const embedUrl = '';

    return (
      <iframe
        src="https://www.youtube.com/embed/IduVVYgeXZg?si=HV7y45YVfX1Jk_sK"
        title="YouTube video player"
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
      <div className="mx-auto max-w-7xl">
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
                      videoUrl="https://www.usersolutions.com/wp-content/uploads/2022/07/Resource-Manager-for-Excel.mp4"
                      title="Operations Manager Excel Templates"
                      thumbnail="https://www.usersolutions.com/wp-content/uploads/2022/07/Resource-Manager-for-Excel.mp4"
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
                      FREE
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Excel-based solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-xl">
              {/* Price Badge */}
              <div
                className={`animate-gentle-glow absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg ring-2 ring-white/20 transition-opacity duration-300 ${isVideoPlaying.starter ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
              >
                START
              </div>

              <div className="">
                {/* Video Section */}
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <VideoPlayer
                      videoUrl="https://www.usersolutions.com/wp-content/uploads/2022/10/Welcome-to-Job-Scheduler-Lite-JSL.mp4"
                      title="EDGEBIC Demo"
                      thumbnail="https://www.usersolutions.com/wp-content/uploads/2022/10/insight-1.png"
                      onPlayStateChange={(isPlaying) =>
                        handleVideoPlayState('starter', isPlaying)
                      }
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="mb-4 flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-blue-700">
                        EDGEBIC
                      </h3>
                    </div>
                    <p className="mb-4 text-blue-600">
                      Perfect for Job Shops & Small Manufacturers
                    </p>
                  </div>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-blue-500" />
                      <span className="text-sm">
                        Shop Scheduling Made Easy
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-blue-500" />
                      <span className="text-sm">Forward Scheduling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-blue-500" />
                      <span className="text-sm">Finite Capacity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-blue-500" />
                      <span className="text-sm">Free Trials Available</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
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
                    <div className="mb-2 text-3xl font-bold text-blue-700">
                      $1,000+
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Starting investment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional & Enterprise - Combined */}
            <div className="group relative overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-lg transition-all hover:shadow-xl">
              {/* Popular Badge - Enhanced */}
              <div
                className={`animate-gentle-glow absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-4 py-2 text-sm font-bold text-white shadow-lg ring-2 ring-white/20 transition-opacity duration-1000 ${isVideoPlaying.advanced ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
              >
                <span className="relative flex items-center gap-1">
                  POPULAR
                </span>
              </div>{' '}
              <div className="">
                {/* Video Section */}
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <div className="relative aspect-video bg-slate-100">
                    <VideoPlayer
                      videoUrl="https://www.usersolutions.com/wp-content/uploads/2022/12/RMDB%20updated%20thumbnail.mp4"
                      title="Resource Manager DB & EDGE Suite"
                      thumbnail="https://www.usersolutions.com/wp-content/uploads/2022/11/advanced-1.png"
                      onPlayStateChange={(isPlaying) =>
                        handleVideoPlayState('advanced', isPlaying)
                      }
                    />
                  </div>
                </div>
                <div className="px-6 pb-3">
                  <div className="mb-6">
                    <div className="mb-4 flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-orange-700">
                        Resource Manager DB & EDGE Suite
                      </h3>
                    </div>
                    <p className="mb-4 text-orange-600">
                      Professional to Enterprise-Grade Solutions
                    </p>
                  </div>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-orange-500" />
                      <span className="text-sm">
                        Production Scheduling Your Way!
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-orange-500" />
                      <span className="text-sm">Flexible & Adaptable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-orange-500" />
                      <span className="text-sm">
                        Easy APS & MRP Implementation
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-orange-500" />
                      <span className="text-sm">
                        Heat Map Reports & Analytics
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-orange-500" />
                      <span className="text-sm">Live Embedded Excel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-orange-500" />
                      <span className="text-sm">Advanced Drag & Drop</span>
                    </div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
                      asChild
                    >
                      <Link
                        href="/resource-manager-db-2"
                        target="_blank"
                      >
                        View RMDB Details
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                      asChild
                    >
                      <Link
                        href="/edgebi"
                        target="_blank"
                      >
                        View EDGE Details
                      </Link>
                    </Button>
                  </div>

                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-orange-700">
                      $5,000 - $25,000+
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Professional to Enterprise solutions
                    </p>
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
