import * as React from 'react';
import Link from 'next/link';

import { Routes } from '@/constants/routes';

export function EdgebicAnnouncement(): React.JSX.Element {
  return (
    <section
      className="border-y bg-slate-900 py-10 text-white"
      aria-labelledby="edgebic-announcement-heading"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-2 text-sm font-semibold text-cyan-400">
              Introducing our next generation
            </p>
            <h2
              id="edgebic-announcement-heading"
              className="mb-3 text-2xl font-bold md:text-3xl"
            >
              EDGEBIC: 35 years of scheduling experience, one modern platform
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-slate-300">
              The successor to RMDB and EDGEBI unifies our proven finite
              capacity engine with a drag-and-drop graphical routing designer,
              a mathematical schedule optimizer, and shop-floor kiosk
              tracking. Run your whole factory the way you would sketch it:
              as a flow chart.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href={Routes.Edgebic}
              className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Discover EDGEBIC
            </Link>
            <Link
              href={Routes.RmdbToEdgebic}
              className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
            >
              RMDB or EDGEBI user?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
