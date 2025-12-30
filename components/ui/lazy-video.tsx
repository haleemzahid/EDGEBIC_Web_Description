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
  const [isInView, setIsInView] = React.useState(false);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (isYouTube) {
    const videoId = getVideoId(src);
    return (
      <div ref={containerRef} className={className}>
        {isInView && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
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
      ref={containerRef as React.RefObject<HTMLVideoElement>}
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
