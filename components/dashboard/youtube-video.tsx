'use client';

import * as React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { YouTubeFacadeWithIntersection } from '@/components/ui/youtube-facade';

interface YouTubeVideoProps {
  videoUrl?: string | null;
  title?: string;
  className?: string;
}

// Function to extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtu\.be\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function YouTubeVideo({
  videoUrl,
  title = 'Featured Video',
  className = ''
}: YouTubeVideoProps): React.JSX.Element | null {
  if (!videoUrl) {
    return null;
  }

  const videoId = getYouTubeVideoId(videoUrl);

  if (!videoId) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Invalid YouTube URL. Please check the video link in settings.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-video w-full overflow-hidden rounded-b-lg">
          <YouTubeFacadeWithIntersection
            videoId={videoId}
            title={title}
            className="size-full"
            rootMargin="100px"
          />
        </div>
      </CardContent>
    </Card>
  );
}
