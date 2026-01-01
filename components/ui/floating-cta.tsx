'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Routes } from '@/constants/routes';

export function FloatingCTA(): React.JSX.Element {
  return (
    <Link
      href={Routes.Contact}
      className="fixed bottom-0 right-0 z-50 transition-all duration-300 hover:scale-105"
    >
      <Image
        src="/images/next-steps-boot-button.png"
        alt="Let's Analyze Your Challenges Together"
        width={280}
        height={60}
        className="drop-shadow-lg"
        style={{ objectFit: 'contain' }}
      />
    </Link>
  );
}
