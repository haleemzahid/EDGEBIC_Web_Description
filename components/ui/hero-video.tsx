'use client';

import Image from 'next/image';
import * as React from 'react';

interface HeroVideoProps {
  src: string;
  poster?: string;
  title: string;
  className?: string;
  priority?: boolean;
}

export function HeroVideo({
  src,
  poster,
  title,
  className = '',
  priority = false,
}: HeroVideoProps) {
  const [showVideo, setShowVideo] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Check if it's a YouTube URL
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
  };

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  return (
    <div className={`relative ${className}`}>
      {!showVideo && poster ? (
        <>
          {/* Priority image for LCP */}
          <Image
            src={poster}
            alt={title}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
            onLoad={() => setIsLoaded(true)}
          />
          {/* Play button overlay */}
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label={`Play ${title}`}
          >
            <div className={`flex size-16 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 ${isYouTube ? 'bg-red-600' : 'bg-white/90'}`}>
              <svg
                className={`ml-1 size-8 ${isYouTube ? 'text-white' : 'text-cyan-600'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </>
      ) : isYouTube ? (
        <iframe
          src={`https://www.youtube.com/embed/${getVideoId(src)}?autoplay=1`}
          title={title}
          className="size-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <video
          className="size-full object-cover"
          controls
          autoPlay
          playsInline
          poster={poster}
          title={title}
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
