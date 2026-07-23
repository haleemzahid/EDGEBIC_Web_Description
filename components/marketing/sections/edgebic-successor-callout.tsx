import * as React from 'react';
import Link from 'next/link';

import { Routes } from '@/constants/routes';

const VARIANT_COPY: Record<
  'rmdb' | 'edgebi' | 'rmx',
  { heading: string; body: string }
> = {
  rmdb: {
    heading: 'RMDB customers: meet EDGEBIC, the next generation',
    body: 'EDGEBIC carries the full RMDB scheduling engine forward into one modern application: the same finite capacity depth, plus a drag-and-drop graphical routing designer, a mathematical schedule optimizer, shop-floor kiosk tracking, and more. RMDB remains fully supported, and your data, routings, and scheduling know-how carry forward.'
  },
  edgebi: {
    heading: 'EDGEBI users: the graphical experience grew into EDGEBIC',
    body: 'Everything you value in EDGEBI, interactive Gantt charts, drag-and-drop adjustments, and visual scheduling, is now built directly into EDGEBIC alongside the full scheduling engine. One application, one database, no separate install. EDGEBI remains fully supported while you evaluate the upgrade.'
  },
  rmx: {
    heading: 'Outgrowing Excel? EDGEBIC is the next step',
    body: 'Resource Manager for Excel remains a great entry point. When you need finite capacity scheduling across shifts, work centers, and operators, EDGEBIC picks up where Excel leaves off, and it imports your existing spreadsheet data through flexible Excel/CSV import masks.'
  }
};

export function EdgebicSuccessorCallout({
  variant
}: {
  variant: 'rmdb' | 'edgebi' | 'rmx';
}): React.JSX.Element {
  const copy = VARIANT_COPY[variant];
  return (
    <section
      className="border-y bg-slate-50 py-10"
      aria-labelledby="edgebic-successor-heading"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <h2
              id="edgebic-successor-heading"
              className="mb-3 text-2xl font-bold text-slate-900"
            >
              {copy.heading}
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-slate-700">
              {copy.body}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href={Routes.Edgebic}
              className="inline-flex items-center gap-2 rounded bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
            >
              Explore EDGEBIC
            </Link>
            <Link
              href={Routes.RmdbToEdgebic}
              className="font-semibold text-cyan-700 transition-colors hover:text-cyan-800"
            >
              See the upgrade path
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
