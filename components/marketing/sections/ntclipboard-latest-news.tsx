'use client';

import * as React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';

const newsItems = [
  {
    id: 1,
    title:
      'EDGEBIC announces revolutionary method for Production Planning and Scheduling evaluations',
    link: '#'
  },
  {
    id: 2,
    title:
      'Forging Ahead: Leveraging ERP Data for Enhanced Planning and Scheduling',
    link: '#'
  },
  {
    id: 3,
    title:
      'EDGEBIC continues partnerships with multiple Universities for real-life experience on launching a Production Scheduling Offering',
    link: '#'
  },
  {
    id: 4,
    title:
      'EDGEBIC Unveils Revolutionary Manufacturing Software: Customized Solutions for Enhanced Scheduling and Planning',
    link: '#'
  },
  {
    id: 5,
    title: 'Resource Manager-DB Innovates Li-ion Battery Production Scheduling',
    link: '#'
  },
  {
    id: 6,
    title:
      'Scheduling System Narrows Skills Gap for Fire-Rated Glass Manufacturing',
    link: '#'
  }
];

export function LatestNewsSection(): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length
    );
  };

  React.useEffect(() => {
    // Start auto-scrolling after 1 second delay
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Auto-advance every 5 seconds

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <GridSection hideVerticalGridLines>
      <div className="container py-6">
        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            LATEST NEWS
          </h2>

          {/* Students Section Button */}
          <Link
            href="/students"
            target="_blank"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            <GraduationCap className="size-5" />
            <span className="font-semibold">STUDENTS SECTION</span>
          </Link>
        </div>

        {/* News Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-8">
            <div className="flex items-center justify-between">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="flex size-10 items-center justify-center rounded-full bg-white/80 text-blue-600 shadow-md transition-all hover:bg-white hover:shadow-lg"
                aria-label="Previous news item"
                title="Previous news item"
              >
                <ChevronLeft className="size-6" />
              </button>

              {/* News Content */}
              <div className="flex-1 px-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-center"
                  >
                    <div className="mb-4 text-sm font-semibold text-blue-600">
                      Slide Heading
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 md:text-xl">
                      {newsItems[currentIndex].title}
                    </h3>
                    <Link
                      href={newsItems[currentIndex].link}
                      className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Click Here
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={nextSlide}
                className="flex size-10 items-center justify-center rounded-full bg-white/80 text-blue-600 shadow-md transition-all hover:bg-white hover:shadow-lg"
                aria-label="Next news item"
                title="Next news item"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="mt-6 flex justify-center gap-2">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`size-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-blue-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  title={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </GridSection>
  );
}
