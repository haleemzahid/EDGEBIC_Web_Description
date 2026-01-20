'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstVideoId: string;
  secondVideoId: string;
  initialVideo?: 'first' | 'second';
}

export function VideoModal({
  isOpen,
  onClose,
  firstVideoId,
  secondVideoId,
  initialVideo = 'first'
}: VideoModalProps): React.JSX.Element {
  const [currentVideo, setCurrentVideo] = React.useState<'first' | 'second'>(
    initialVideo
  );
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentVideo(initialVideo);
      setIsPlaying(false); // Reset when modal opens
    }
  }, [isOpen, initialVideo]);

  const handleCloseClick = () => {
    setIsPlaying(false);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  if (!isOpen) return <></>;

  const currentVideoId =
    currentVideo === 'first' ? firstVideoId : secondVideoId;

  const thumbnailUrl = `https://i.ytimg.com/vi/${currentVideoId}/hqdefault.jpg`;

  const embedUrl = `https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseClick}
              className="absolute -top-12 right-0 z-10 flex size-10 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30"
              aria-label="Close modal"
            >
              <X className="size-6" />
            </button>
            {/* Video Container */}
            <div className="relative overflow-hidden rounded-lg bg-black">
              <div className="relative aspect-video w-full">
                {isPlaying ? (
                  <iframe
                    key={currentVideoId}
                    src={embedUrl}
                    title="YouTube video player"
                    className="absolute inset-0 size-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={handlePlayClick}
                    className="group relative size-full cursor-pointer border-0 bg-transparent p-0"
                    aria-label="Play video"
                  >
                    {/* YouTube Thumbnail */}
                    <Image
                      src={thumbnailUrl}
                      alt="Video thumbnail"
                      fill
                      className="object-cover"
                      unoptimized
                    />

                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />

                    {/* YouTube Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex size-20 items-center justify-center rounded-xl bg-red-600 shadow-lg transition-transform group-hover:scale-110 sm:size-24">
                        <svg
                          className="ml-1 size-10 text-white sm:size-12"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
