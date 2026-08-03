import * as React from 'react';
import Link from 'next/link';

import { Routes } from '@/constants/routes';

const capabilities = [
  {
    label: 'Schedule optimization',
    body: 'Evaluate dozens of complete schedules and keep the best one. The result is never worse than the plan you already had.'
  },
  {
    label: 'Multi-shift capacity',
    body: 'Day, night and weekend patterns per work center, with holidays, downtime and per-day overrides the engine actually respects.'
  },
  {
    label: 'Visual drag and drop',
    body: 'Build routings as a flow chart and move work on the Gantt. Every change is staged, so nothing commits until you save it.'
  },
  {
    label: 'The Planner view',
    body: 'Your jobs and your machines on one screen. Drag an operation from a job straight onto the machine that will run it.'
  },
  {
    label: 'Multiple workstations',
    body: 'Planners and supervisors share one live plan on SQL Server, and open screens pick up shop-floor changes on their own.'
  },
  {
    label: 'Live in days',
    body: 'Import products, routings and work centers from the spreadsheets you already keep, then schedule against real capacity.'
  }
];

export function EdgebicAnnouncement(): React.JSX.Element {
  return (
    <section
      className="border-y bg-slate-900 py-14 text-white"
      aria-labelledby="edgebic-announcement-heading"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold tracking-wide text-cyan-400">
            The current generation of Resource Manager DB
          </p>
          <h2
            id="edgebic-announcement-heading"
            className="mb-4 text-3xl font-bold leading-tight md:text-4xl"
          >
            EDGEBIC: 35 years of scheduling, rebuilt as one platform
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            EDGEBIC keeps the finite capacity engine that has planned work for
            GE, Cummins, BAE Systems and the US Navy, and puts a modern
            planning surface on top of it. Two editions: scheduling on its own,
            or scheduling with the material side.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <li key={capability.label}>
              <h3 className="mb-2 text-base font-semibold text-white">
                {capability.label}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {capability.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Link
            href={Routes.Edgebic}
            className="inline-flex items-center rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Discover EDGEBIC
          </Link>
          <Link
            href={Routes.CompareProducts}
            className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Compare the two editions
          </Link>
          <Link
            href={Routes.RmdbToEdgebic}
            className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            RMDB or EDGEBI user?
          </Link>
        </div>
      </div>
    </section>
  );
}
