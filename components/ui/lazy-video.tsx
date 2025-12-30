'use client';

import * as React from 'react';

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  title?: string;
}

export function LazyVideo({ src, poster, className = '', title = 'Video content' }: LazyVideoProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Check if it's a YouTube URL
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    const element = isYouTube ? containerRef.current : videoRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [isYouTube]);

  if (isYouTube) {
    const videoId = getVideoId(src);
    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return (
      <div ref={containerRef} className={`${className} relative cursor-pointer`}>
        {!isPlaying ? (
          // Lite YouTube - just thumbnail + play button (very fast)
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="relative size-full"
            aria-label={`Play ${title}`}
          >
            {isInView && (
              <img
                src={thumbnailUrl}
                alt={title}
                className="size-full object-cover"
                loading="lazy"
              />
            )}
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30">
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
        ) : (
          // Full YouTube iframe (only loads when user clicks play)
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            className="size-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      controls
      playsInline
      preload="none"
      poster={poster}
      title={title}
      aria-label={title}
    >
      {isInView && <source src={src} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
}
