'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

import { Routes } from '@/constants/routes';

/**
 * The two EDGEBIC editions.
 *
 * The export name is unchanged on purpose: seven pages render this section, and
 * keeping the name means they all pick up the new story without edits.
 */

type Edition = {
  name: string;
  price: string;
  priceNote: string;
  role: string;
  body: string;
  features: string[];
  inherits?: string;
  href: string;
  cta: string;
  isComplete?: boolean;
};

const editions: Edition[] = [
  {
    name: 'EDGEBIC APS',
    price: '$25,000',
    priceNote: 'Advanced planning and scheduling',
    role: 'A plan the shop can actually run',
    body: 'Finite capacity scheduling for a plant that already knows what it needs to build. Every date the plan gives you is one the machines, shifts and people can genuinely hit.',
    features: [
      'Finite capacity scheduling, forward and backward',
      'Schedule optimization, never worse than the plan you had',
      'Multi-shift capacity with holidays, downtime and overrides',
      'The Planner view: jobs and machines on one screen',
      'Drag and drop, staged until you save',
      'One live plan shared across every workstation',
      'Sequence-dependent setup, work center groups and alternates',
      'ERP integration by import and export'
    ],
    href: Routes.Edgebic,
    cta: 'Explore EDGEBIC APS'
  },
  {
    name: 'EDGEBIC Complete',
    price: '$35,000',
    priceNote: 'Planning, materials and inventory',
    role: 'The whole planning stack, one system',
    body: 'Everything in APS, plus the material side. Work out what to build and what to buy, and see the jobs that are waiting on a delivery instead of finding out on the floor.',
    inherits: 'Everything in EDGEBIC APS, plus:',
    features: [
      'Multi-level MRP with dependent demand',
      'Inventory: on-hand ledger, projected balance, available to promise',
      'Master production schedule',
      'Purchasing, suppliers and receiving',
      'Material pegging: a job waits for the order that covers it',
      'Sales orders and firm demand'
    ],
    href: Routes.Edgebic,
    cta: 'Explore EDGEBIC Complete',
    isComplete: true
  }
];

export function NTClipboardToolBox(): React.JSX.Element {
  return (
    <section className="w-full">
      <div className="px-4 pb-12 pt-0 sm:px-6">
        {/* <div className="w-full text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Two editions, one engine
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            EDGEBIC is the current generation of Resource Manager DB, carrying
            the finite capacity engine that has planned work for GE, Cummins,
            BAE Systems and the US Navy. Start with scheduling, or take the
            material side with it.
          </p>
        </div> */}

        {/*
          Row-aligned on purpose. The list is the grid and each edition is a
          subgrid spanning every row, so the names, prices, descriptions and
          buttons sit on the same baselines no matter how long the copy in one
          column runs.
        */}
        <ul className="mx-auto mt-4 grid max-w-5xl gap-x-12 gap-y-14 md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto_1fr_auto] md:gap-y-0">
          {editions.map((edition) => (
            <li
              key={edition.name}
              className={`grid gap-y-4 border-t-2 pt-6 md:row-span-6 md:grid-rows-subgrid md:gap-y-0 ${
                edition.isComplete ? 'border-cyan-600' : 'border-slate-300'
              }`}
            >
              <h3
                className={`text-2xl font-bold ${
                  edition.isComplete ? 'text-cyan-700' : 'text-slate-900'
                }`}
              >
                {edition.name}
              </h3>

              <div className="mt-3">
                <p className="text-3xl font-bold text-slate-900">
                  {edition.price}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {edition.priceNote}
                </p>
              </div>

              <p className="mt-4 text-base font-semibold text-slate-800">
                {edition.role}
              </p>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {edition.body}
              </p>

              <div className="mt-6">
                {edition.inherits && (
                  <p className="mb-3 text-sm font-semibold text-cyan-700">
                    {edition.inherits}
                  </p>
                )}
                <ul className="space-y-2.5">
                  {edition.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-green-600"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-snug text-slate-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href={edition.href}
                  className={`inline-flex w-full items-center justify-center rounded px-6 py-3 text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${
                    edition.isComplete
                      ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                      : 'border border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {edition.cta}
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-slate-600">
          Already running RMDB, EDGEBI or Resource Manager for Excel?{' '}
          <Link
            href={Routes.RmdbToEdgebic}
            className="font-semibold text-cyan-700 underline-offset-4 hover:underline"
          >
            See what changes when you move to EDGEBIC
          </Link>
          , or{' '}
          <Link
            href={Routes.Contact}
            className="font-semibold text-cyan-700 underline-offset-4 hover:underline"
          >
            talk to us about which edition fits
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
