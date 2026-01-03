'use client';

import * as React from 'react';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  start?: number;
  className?: string;
  thumbnailQuality?: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault';
}

/**
 * YouTubeFacade - A performance-optimized YouTube embed component
 *
 * This component follows the "facade" pattern:
 * - Initially renders just a thumbnail image + play button (very fast, ~20KB)
 * - Only loads the full YouTube iframe when user clicks play (~1-3MB)
 *
 * This dramatically improves:
 * - Largest Contentful Paint (LCP)
 * - Total Blocking Time (TBT)
 * - First Contentful Paint (FCP)
 */
export function YouTubeFacade({
  videoId,
  title,
  start = 0,
  className = '',
  thumbnailQuality = 'hqdefault'
}: YouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/${thumbnailQuality}.jpg`;

  const embedUrl = React.useMemo(() => {
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
    });
    if (start > 0) {
      params.set('start', start.toString());
    }
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }, [videoId, start]);

  const handlePlay = React.useCallback(() => {
    setIsPlaying(true);
  }, []);

  if (isPlaying) {
    return (
      <div className={`relative ${className}`}>
        <iframe
          className="absolute inset-0 size-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={handlePlay}
        className="group relative size-full cursor-pointer border-0 bg-transparent p-0"
        aria-label={`Play video: ${title}`}
      >
        {/* Thumbnail image */}
        <img
          src={thumbnailUrl}
          alt={title}
          className={`size-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Placeholder while image loads */}
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-200" />
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />

        {/* YouTube Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-16 items-center justify-center rounded-xl bg-red-600 shadow-lg transition-transform group-hover:scale-110 sm:size-[68px]">
            <svg
              className="ml-1 size-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

/**
 * YouTubeFacadeWithIntersection - Same as YouTubeFacade but with IntersectionObserver
 *
 * This variant:
 * - Doesn't even load the thumbnail until the element is near the viewport
 * - Best for videos that are below the fold
 */
export function YouTubeFacadeWithIntersection({
  videoId,
  title,
  start = 0,
  className = '',
  thumbnailQuality = 'hqdefault',
  rootMargin = '200px'
}: YouTubeFacadeProps & { rootMargin?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/${thumbnailQuality}.jpg`;

  const embedUrl = React.useMemo(() => {
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
    });
    if (start > 0) {
      params.set('start', start.toString());
    }
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }, [videoId, start]);

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  const handlePlay = React.useCallback(() => {
    setIsPlaying(true);
  }, []);

  if (isPlaying) {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <iframe
          className="absolute inset-0 size-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={handlePlay}
        className="group relative size-full cursor-pointer border-0 bg-transparent p-0"
        aria-label={`Play video: ${title}`}
      >
        {/* Thumbnail image - only loads when in view */}
        {isInView && (
          <img
            src={thumbnailUrl}
            alt={title}
            className={`size-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
          />
        )}

        {/* Placeholder */}
        {(!isInView || !isImageLoaded) && (
          <div className="absolute inset-0 animate-pulse bg-slate-200" />
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />

        {/* YouTube Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-16 items-center justify-center rounded-xl bg-red-600 shadow-lg transition-transform group-hover:scale-110 sm:size-[68px]">
            <svg
              className="ml-1 size-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}
