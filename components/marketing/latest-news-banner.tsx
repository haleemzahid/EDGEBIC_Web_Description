'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const newsItems = [
  'EDGEBI announces revolutionary method for Production Planning and Scheduling evaluations',
  'Forging Ahead: Leveraging ERP Data for Enhanced Planning and Scheduling',
  'EDGEBI continues partnerships with multiple Universities for real-life experience',
  'EDGEBI Unveils Revolutionary Manufacturing Software: Customized Solutions for Enhanced Scheduling',
  'Resource Manager-DB Innovates Li-ion Battery Production Scheduling',
  'Scheduling System Narrows Skills Gap for Fire-Rated Glass Manufacturing'
];

export function LatestNewsBanner(): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);

  React.useEffect(() => {
    // Start animation after 1 second
    const startDelay = setTimeout(() => {
      setHasStarted(true);
    }, 1000);

    return () => clearTimeout(startDelay);
  }, []);

  React.useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 4000); // Change headline every 4 seconds

    return () => clearInterval(interval);
  }, [hasStarted]);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-white">
      <div className="container flex items-center justify-between">
        {/* Latest News Section */}
        <div className="flex flex-1 items-center gap-4">
          <div className="shrink-0">
            <span className="rounded bg-white/20 px-3 py-1 text-sm font-semibold uppercase tracking-wide">
              Latest News
            </span>
          </div>

          {/* Scrolling Headlines */}
          <div className="min-w-0 flex-1 overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                duration: 0.8,
                delay: hasStarted && currentIndex === 0 ? 0 : 0,
                ease: 'easeOut'
              }}
              className="truncate text-sm font-medium md:text-base"
            >
              {newsItems[currentIndex]}
            </motion.div>
          </div>
        </div>

        {/* Students Section Button */}
        <div className="ml-4 shrink-0">
          <Link
            href="/students"
            target="_blank"
            className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold transition-all hover:bg-white/30 hover:shadow-lg"
          >
            <GraduationCap className="size-4" />
            <span className="hidden sm:inline">Students Section</span>
            <span className="sm:hidden">Students</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
