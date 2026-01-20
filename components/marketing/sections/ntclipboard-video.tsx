'use client';

import * as React from 'react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { Button } from '@/components/ui/button';
import { YouTubeFacade } from '@/components/ui/youtube-facade';

interface NTClipboardVideoProps {
  videoUrl?: string | null;
}

export function NTClipboardVideo({
  videoUrl: _videoUrl
}: NTClipboardVideoProps): React.JSX.Element {
  // User Solutions product videos from https://www.usersolutions.com/videos/
  // Complete list of all 20 videos with full YouTube URLs
  const productVideos = [
    {
      url: 'https://www.youtube.com/watch?v=IR8NhOlV_zM',
      title: 'Company Overview',
      description:
        'Comprehensive overview of User Solutions manufacturing software company and solutions',
      category: 'Overview'
    },
    {
      url: 'https://www.youtube.com/watch?v=y-TMN1e-xlc',
      title: 'Welcome',
      description:
        'Welcome video introducing User Solutions manufacturing software solutions',
      category: 'Overview'
    },
    {
      url: 'https://www.youtube.com/watch?v=nZChakmMIOI',
      title: 'User Solutions, Inc Intro Video',
      description:
        'Introduction video showcasing User Solutions company and software capabilities',
      category: 'Overview'
    },
    {
      url: 'https://www.youtube.com/watch?v=IduVVYgeXZg',
      title: 'Manufacturing Software made easy!',
      description:
        'Channel overview clip highlighting manufacturing software solutions made easy',
      category: 'Overview'
    },
    // {
    //   url: 'https://www.youtube.com/watch?v=L4wDboRFU6k',
    //   title: 'WorkCenter Scheduler XL Overview',
    //   description:
    //     'Complete overview of WorkCenter Scheduler XL for production scheduling',
    //   category: 'Product Demo'
    // },
    {
      url: 'https://www.youtube.com/watch?v=fvvMj__YHbw',
      title: '  — Summary',
      description: 'Summary of   features and capabilities',
      category: 'Product Demo'
    },
    {
      url: 'https://www.youtube.com/watch?v=snltXMHeojU',
      title: 'Welcome to EDGEBI  ',
      description:
        'Introduction to EDGEBI for simplified production scheduling',
      category: 'Product Demo'
    },
    {
      url: 'https://www.youtube.com/watch?v=kn92TIHhbm8',
      title: 'Resource Manager DB — Summary',
      description:
        'Summary of Resource Manager DB database-driven production scheduling solution',
      category: 'Product Demo'
    },
    {
      url: 'https://www.youtube.com/watch?v=DRWDNVq31l4',
      title: 'Resource Manager for Excel — Summary',
      description:
        'Summary of Resource Manager for Excel integrated scheduling solution',
      category: 'Product Demo'
    },
    {
      url: 'https://www.youtube.com/watch?v=74uO2H-eevc',
      title: 'Resource Manager for Excel — Intro Part 1',
      description:
        'First part introduction to Resource Manager for Excel features and setup',
      category: 'Product Demo'
    },
    {
      url: 'https://www.youtube.com/watch?v=Br2b8h-drfY',
      title: 'RMX Initialization — Building Bills of Resource',
      description:
        'Learn how to build Bills of Resource in Resource Manager for Excel',
      category: 'Training'
    },
    {
      url: 'https://www.youtube.com/watch?v=q4oJlqjcxAE',
      title: 'RMX Initialization — Building Bills of Resource 2',
      description:
        'Advanced Bills of Resource building techniques in Resource Manager for Excel',
      category: 'Training'
    },
    {
      url: 'https://www.youtube.com/watch?v=Fg9WZcSCKoA',
      title: 'RMX Initialization — Production Operations List',
      description:
        'Setting up Production Operations List in Resource Manager for Excel',
      category: 'Training'
    },
    {
      url: 'https://www.youtube.com/watch?v=p61yG7b2nTY',
      title: 'RMX Initialization — Navigation Options',
      description:
        'Understanding navigation options in Resource Manager for Excel interface',
      category: 'Training'
    },
    {
      url: 'https://www.youtube.com/watch?v=gekRRmlOWYE',
      title: 'RMX Initialization — Holiday & Day Chart',
      description:
        'Configuring Holiday & Day Chart settings in Resource Manager for Excel',
      category: 'Training'
    },
    {
      url: 'https://www.youtube.com/watch?v=bmCEFVJlkr4',
      title: 'RMX Scheduling — Forecast Calendar',
      description:
        'Using Forecast Calendar for production planning in Resource Manager for Excel',
      category: 'Training'
    },
    {
      url: 'https://www.youtube.com/watch?v=WX9VO3IPN40',
      title: 'RMX Scheduling — Inventory Table',
      description:
        'Managing Inventory Table for accurate scheduling in Resource Manager for Excel',
      category: 'Training'
    },
    {
      url: 'https://www.youtube.com/watch?v=RmSmILCGGx8',
      title: 'RMX Scheduling — Master Adjusted Schedule',
      description:
        'Creating and managing Master Adjusted Schedule in Resource Manager for Excel',
      category: 'Training'
    },
    {
      url: 'https://www.youtube.com/watch?v=Fc-zM31PrrQ',
      title: 'RMX — Master Scheduling',
      description:
        'Master scheduling techniques and best practices with Resource Manager for Excel',
      category: 'Training'
    },
    {
      url: 'https://www.youtube.com/watch?v=tOy099sVThQ',
      title: 'RMX — Summary Report',
      description:
        'Generating and analyzing Summary Reports in Resource Manager for Excel',
      category: 'Training'
    }
  ];

  const [activeVideo, setActiveVideo] = React.useState(0);

  // Drag functionality state
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, scrollLeft: 0 });

  // Show all videos without filtering
  const filteredVideos = productVideos;

  const currentVideo = filteredVideos[activeVideo] || productVideos[0];

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    if (url === 'VIDEO_URL_NEEDED') return 'dQw4w9WgXcQ'; // Fallback for placeholder
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : 'dQw4w9WgXcQ';
  };

  const videoId = getVideoId(currentVideo.url);

  return (
    <GridSection hideVerticalGridLines>
      <div>
        <div className="pt-6">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Product Video Library
            </h2>
            <p className="mb-6 text-[18px] text-muted-foreground">
              Demo/Training videos for our manufacturing software solutions
            </p>

            <div className="mx-auto max-w-4xl">
              {/* Video Selection - Now above the video */}
              <div className="relative mb-6">
                <div className="flex items-center">
                  {/* Left Arrow */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const container = document.getElementById(
                        'video-buttons-container'
                      );
                      if (container) {
                        container.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                    className="mr-3 aspect-square px-2"
                    title="Previous videos"
                  >
                    <svg
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </Button>

                  <div
                    id="video-buttons-container"
                    className="flex-1 cursor-grab overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
                    onMouseDown={(e) => {
                      const container = e.currentTarget;
                      setIsDragging(true);
                      setDragStart({
                        x: e.pageX - container.offsetLeft,
                        scrollLeft: container.scrollLeft
                      });
                      container.style.cursor = 'grabbing';
                    }}
                    onMouseMove={(e) => {
                      if (!isDragging) return;
                      e.preventDefault();
                      const container = e.currentTarget;
                      const x = e.pageX - container.offsetLeft;
                      const walk = (x - dragStart.x) * 2; // Multiply by 2 for faster scrolling
                      container.scrollLeft = dragStart.scrollLeft - walk;
                    }}
                    onMouseUp={() => {
                      setIsDragging(false);
                      const container = document.getElementById(
                        'video-buttons-container'
                      );
                      if (container) {
                        container.style.cursor = 'grab';
                      }
                    }}
                    onMouseLeave={() => {
                      setIsDragging(false);
                      const container = document.getElementById(
                        'video-buttons-container'
                      );
                      if (container) {
                        container.style.cursor = 'grab';
                      }
                    }}
                  >
                    <div className="flex gap-3 pb-1">
                      {filteredVideos.map((video, index) => (
                        <Button
                          key={index}
                          variant={
                            index === activeVideo ? 'default' : 'outline'
                          }
                          size="sm"
                          className="shrink-0 whitespace-nowrap"
                          onClick={() => {
                            setActiveVideo(index);
                          }}
                        >
                          {video.title}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const container = document.getElementById(
                        'video-buttons-container'
                      );
                      if (container) {
                        container.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                    className="ml-3 aspect-square px-2"
                    title="Next videos"
                  >
                    <svg
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl">
                <YouTubeFacade
                  key={videoId}
                  videoId={videoId}
                  title={currentVideo.title}
                  className="aspect-video w-full"
                  hidePlayButton={true}
                />
              </div>

              <div className="mt-4 text-center">
                <p className="text-[18px] text-muted-foreground">
                  {currentVideo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GridSection>
  );
}
