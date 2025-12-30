'use client';

import * as React from 'react';

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  title?: string;
}

export function LazyVideo({ src, poster, className = '', title = 'Video content' }: LazyVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = React.useState(false);

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

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
