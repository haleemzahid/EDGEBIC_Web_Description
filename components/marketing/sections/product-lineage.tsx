import * as React from 'react';
import Link from 'next/link';

import { Routes } from '@/constants/routes';

type LineageStep = {
  marker: string;
  name: string;
  role: string;
  body: string;
  price: string;
  href: string;
  linkLabel: string;
  isCurrent?: boolean;
};

const steps: LineageStep[] = [
  {
    marker: 'First',
    name: 'Resource Manager for Excel',
    role: 'Scheduling inside the spreadsheet you already run',
    body: 'Finite capacity scheduling in Excel, with your own formatting and reports left intact. It suits a shop that wants a real plan without asking anyone to leave the tool they already know.',
    price: '$1,200 single user. $2,400 multi-user.',
    href: Routes.ResourceManagerForExcel,
    linkLabel: 'About RMX'
  },
  {
    marker: 'Then',
    name: 'Resource Manager DB with EDGEBI',
    role: 'A SQL database, multiple users, and business intelligence',
    body: 'RMDB moves the plan into SQL Server with multi-user access, security, MRP and BOM, and ERP integration. The EDGEBI Suite adds heat map reports, live embedded Excel, and advanced analytics on top of it.',
    price: 'RMDB from $4,000. EDGEBI Suite from $5,000.',
    href: Routes.ResourceManagerDb,
    linkLabel: 'About RMDB and EDGEBI'
  },
  {
    marker: 'Now',
    name: 'EDGEBIC',
    role: 'Advanced planning and scheduling, rebuilt as one platform',
    body: 'The same finite capacity engine, with schedule optimization, multi-shift capacity, the Planner view, and one live plan shared across every workstation. This is where the line is going.',
    price: 'APS $25,000. With optimization, MES, inventory and material pegging, $35,000.',
    href: Routes.Edgebic,
    linkLabel: 'Discover EDGEBIC',
    isCurrent: true
  }
];

export function ProductLineage(): React.JSX.Element {
  return (
    <section
      className="border-t bg-white py-16"
      aria-labelledby="product-lineage-heading"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <h2
            id="product-lineage-heading"
            className="mb-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl"
          >
            From a spreadsheet to a scheduling platform
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            Three products, one engine lineage, thirty-five years of it. Most
            customers start where they already are and move up when the
            constraint changes, carrying their routings with them.
          </p>
        </div>

        {/*
          Row-aligned on purpose. The list is the grid and each step is a
          subgrid spanning all six rows, so the names, the descriptions, the
          prices and the links sit on the same baselines across all three
          columns however long the copy in any one of them runs.
        */}
        <ol className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-3 sm:grid-rows-[auto_auto_auto_1fr_auto_auto] sm:gap-y-0">
          {steps.map((step) => (
            <li
              key={step.name}
              className={`grid gap-y-3 border-t-2 pt-6 sm:row-span-6 sm:grid-rows-subgrid sm:gap-y-0 ${
                step.isCurrent ? 'border-cyan-600' : 'border-slate-200'
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  step.isCurrent ? 'text-cyan-700' : 'text-slate-400'
                }`}
              >
                {step.marker}
              </p>
              <h3
                className={`mt-3 text-xl font-bold leading-snug ${
                  step.isCurrent ? 'text-cyan-700' : 'text-slate-900'
                }`}
              >
                {step.name}
              </h3>
              <p className="mt-2 text-base font-medium leading-snug text-slate-700">
                {step.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {step.body}
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                {step.price}
              </p>
              <p className="mt-3">
                <Link
                  href={step.href}
                  className="text-sm font-semibold text-cyan-700 underline-offset-4 transition-colors hover:text-cyan-800 hover:underline"
                >
                  {step.linkLabel}
                </Link>
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-sm leading-relaxed text-slate-600">
          Already running RMDB or EDGEBI?{' '}
          <Link
            href={Routes.RmdbToEdgebic}
            className="font-semibold text-cyan-700 underline-offset-4 hover:underline"
          >
            Read what changes when you move to EDGEBIC
          </Link>
          , or{' '}
          <Link
            href={Routes.CompareProducts}
            className="font-semibold text-cyan-700 underline-offset-4 hover:underline"
          >
            compare the three side by side
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
