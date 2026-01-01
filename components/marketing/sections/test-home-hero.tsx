'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { VideoModal } from '@/components/marketing/video-modal';

const newsItems = [
  'EDGEBIC announces revolutionary method for Production Planning and Scheduling evaluations',
  'Forging Ahead: Leveraging ERP Data for Enhanced Planning and Scheduling',
  'EDGEBIC continues partnerships with multiple Universities for real-life experience',
  'EDGEBIC Unveils Revolutionary Manufacturing Software: Customized Solutions for Enhanced Scheduling',
  'Resource Manager-DB Innovates Li-ion Battery Production Scheduling',
  'Scheduling System Narrows Skills Gap for Fire-Rated Glass Manufacturing'
];

export function TestHomeHero(): React.JSX.Element {
  const [currentNewsIndex, setCurrentNewsIndex] = React.useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  const [initialVideo, setInitialVideo] = React.useState<'first' | 'second'>(
    'first'
  );

  const nextSlide = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentNewsIndex((prev) =>
      prev === 0 ? newsItems.length - 1 : prev - 1
    );
  };

  const handleFirstVideoButtonClick = () => {
    setInitialVideo('first');
    setIsVideoModalOpen(true);
  };

  const handleSecondVideoButtonClick = () => {
    setInitialVideo('second');
    setIsVideoModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsVideoModalOpen(false);
  };

  // Auto-scroll enabled with 1 second delay
  React.useEffect(() => {
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="relative w-full">
      {/* Main Hero Content - Two Column Layout: 40% text, 60% image */}
      <div className="relative z-10 mx-auto max-w-7xl pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 items-stretch">
          {/* Left Side - Text Content (40%) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            {/* Main Title - Smaller font */}
            <h1 className="text-xl leading-tight text-black md:text-2xl lg:text-3xl">
              Production Planning and Scheduling Software
            </h1>
            {/* Description - Smaller font */}
            <div className="text-sm leading-relaxed text-black">
              <p>
                What makes <span className="font-semibold italic">US</span>{' '}
                (User Solution) unique: we work{' '}
                <span className="font-semibold italic">with you</span> to solve
                production scheduling challenges{' '}
                <span className="font-semibold italic">your way</span>. Benefit
                from an adaptable and affordable solution that will fit you like
                a glove.
              </p>
            </div>

            {/* Solution Approach - Smaller font */}
            <p className="text-sm font-semibold tracking-wide text-black">
              LESS TRAINING | QUICKER IMPLEMENTATION | FASTER RETURN
            </p>

            {/* Action Buttons - Smaller */}
            <div className="flex flex-row items-center gap-2 !mt-2 flex-wrap">
              <button
                onClick={handleFirstVideoButtonClick}
                className="inline-flex h-9 w-[160px] items-center justify-center gap-2 rounded-[10px] border-2 border-[#1e3a5f] bg-transparent px-3 py-1.5 text-xs font-semibold text-[#1e3a5f] transition-colors hover:bg-[#1e3a5f]/10"
              >
                <Image
                  src="/images/footprint.png"
                  alt="Step one indicator"
                  width={16}
                  height={16}
                  className="size-4"
                  style={{ objectFit: 'contain' }}
                />
                Intro <span className="italic">US</span>
              </button>
              <button
                onClick={handleSecondVideoButtonClick}
                className="inline-flex h-9 items-center justify-center px-3 py-1.5 text-xs font-semibold text-[#1e3a5f] transition-colors hover:text-[#2d4a6f]"
              >
                <Image
                  src="/images/footprint.png"
                  alt="Step one indicator"
                  width={24}
                  height={24}
                  className="size-6"
                  style={{ objectFit: 'contain' }}
                />
                <Image
                  src="/images/footprint.png"
                  alt="Step two indicator"
                  width={28}
                  height={28}
                  className="size-6 mr-1"
                  style={{ objectFit: 'contain' }}
                />
                See How It Works
              </button>
              <button
                type="button"
                onClick={() => {
                  window.open('https://calendly.com/mudasirnadeem7979/30min', '_blank');
                }}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] bg-[#1e3a5f] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#2d4a6f]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Fix My Schedule!
              </button>
            </div>
          </motion.div>

          {/* Right Side - Hero Image (60%) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[250px] md:h-[320px] lg:h-full min-h-[300px] rounded-lg overflow-hidden"
          >
            <Image
              src="/images/Edgebic/2022-12/heroImage.jpg"
              alt="Manufacturing production planning background"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center rounded-lg"
              quality={75}
            />
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseModal}
        firstVideoId="nZChakmMIOI"
        secondVideoId="IR8NhOlV_zM"
        initialVideo={initialVideo}
      />
    </div>
  );
}
