'use client';

import * as React from 'react';
import Link from 'next/link';

import { Routes } from '@/constants/routes';

export function FloatingCTA(): React.JSX.Element {
  return (
    <Link
      href={Routes.Contact}
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#FAE74D] px-6 py-3 text-sm font-semibold text-[#1E3A5F] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#f5e03d]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
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
      Let&apos;s Analyze Your Challenges Together
    </Link>
  );
}
