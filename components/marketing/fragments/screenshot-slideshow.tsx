'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SCREENSHOTS = [
  {
    src: '/images/Edgebic/screens/planning-board.png',
    alt: 'EDGEBIC Planning Board with jobs scheduled across work centers',
    label: 'Planning Board'
  },
  {
    src: '/images/Edgebic/screens/bill-of-resource.png',
    alt: 'EDGEBIC Bill of Resources flow chart editor',
    label: 'Bill of Resources'
  },
  {
    src: '/images/Edgebic/screens/resource-calendar.png',
    alt: 'EDGEBIC Resource Calendar with per-day capacity overrides',
    label: 'Resource Calendar'
  },
  {
    src: '/images/Edgebic/screens/job-gantt-view.png',
    alt: 'EDGEBIC Job Gantt view of the production schedule',
    label: 'Job Gantt View'
  }
];

/**
 * Rotating product-screenshot slideshow with manual controls and a
 * click-to-enlarge modal. Self-contained so any page (server components
 * included) can drop it in.
 */
export function ScreenshotSlideshow({
  heightClassName = 'h-[230px]',
  priority = false
}: {
  heightClassName?: string;
  priority?: boolean;
}): React.JSX.Element {
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [enlarged, setEnlarged] = useState(false);

  React.useEffect(() => {
    if (paused || enlarged) return;
    const id = window.setInterval(
      () => setSlideIndex((i) => (i + 1) % SCREENSHOTS.length),
      6000
    );
    return () => window.clearInterval(id);
  }, [paused, enlarged]);

  const activeShot = SCREENSHOTS[slideIndex];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`relative w-full overflow-hidden rounded-lg border border-gray-200 bg-white ${heightClassName}`}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <button
              type="button"
              title="View full size image"
              onClick={() => setEnlarged(true)}
              className="relative block size-full cursor-pointer border-0 bg-transparent p-0"
            >
              <Image
                src={activeShot.src}
                alt={activeShot.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority={priority}
              />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next */}
        <button
          type="button"
          aria-label="Previous screenshot"
          onClick={() =>
            setSlideIndex(
              (slideIndex - 1 + SCREENSHOTS.length) % SCREENSHOTS.length
            )
          }
          className="absolute left-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#003d5c] shadow-sm transition-colors hover:bg-white"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next screenshot"
          onClick={() => setSlideIndex((slideIndex + 1) % SCREENSHOTS.length)}
          className="absolute right-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#003d5c] shadow-sm transition-colors hover:bg-white"
        >
          <ChevronRight className="size-4" />
        </button>

        {/* Caption + dots */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-3 pb-2">
          <span className="rounded bg-[#003d5c]/85 px-2 py-0.5 text-xs font-medium text-white">
            {activeShot.label}
          </span>
          <div className="flex items-center gap-1.5">
            {SCREENSHOTS.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                aria-label={`Show ${shot.label}`}
                onClick={() => setSlideIndex(i)}
                className={`size-2 rounded-full transition-colors ${
                  i === slideIndex
                    ? 'bg-[#2FB8DE]'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enlarge modal */}
      <AnimatePresence>
        {enlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setEnlarged(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative mx-4 inline-block max-h-[85vh] max-w-[90vw] overflow-visible"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setEnlarged(false)}
                className="absolute -right-3 -top-3 z-10 flex size-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-colors hover:bg-gray-100"
              >
                ✕
              </button>
              <Image
                src={activeShot.src}
                alt={activeShot.alt}
                width={1600}
                height={950}
                className="block h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
