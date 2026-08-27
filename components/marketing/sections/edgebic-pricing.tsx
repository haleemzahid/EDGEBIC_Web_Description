import * as React from 'react';
import Link from 'next/link';

import { AppInfo } from '@/constants/app-info';
import { Routes } from '@/constants/routes';

/**
 * The pricing page is the single strongest differentiator this company has:
 * almost every competitor in advanced planning and scheduling is quote-only,
 * so a published number is the thing a buyer (and an answer engine) cannot get
 * anywhere else.
 *
 * The opening paragraph is deliberately written as a complete, quotable answer
 * to "how much does EDGEBIC cost", because that is the sentence an assistant
 * will lift when someone asks. Everything else supports it.
 */

const EDITIONS = [
  {
    name: AppInfo.EDITIONS.APS.NAME,
    price: '$25,000',
    tagline: 'Finite capacity scheduling and optimization.',
    forWho:
      'The fit when capacity is what limits you: machines, shifts and people, not materials.',
    includes: [
      'Graphical drag-and-drop routing designer',
      'Forward and backward (just-in-time) scheduling',
      'Theory of Constraints anchoring around your bottleneck',
      'Parallel work centers, true alternates and machine pools',
      'Sequence-dependent setup matrix with setup families',
      'Lot streaming and transfer batches',
      'Operators, skills and certifications as a real constraint',
      'Mathematical optimizer with a proven optimality gap',
      'Shop-floor kiosk for operator punches and piece counts',
      'Quoting with what-if scenarios',
      'ERP integration via Excel, CSV and database import masks'
    ]
  },
  {
    name: AppInfo.EDITIONS.COMPLETE.NAME,
    price: '$35,000',
    tagline: 'Everything in EDGEBIC APS, plus material planning.',
    forWho:
      'The fit when material availability drives the schedule as much as capacity does.',
    inherits: 'Everything in EDGEBIC APS, plus:',
    includes: [
      'Material requirements planning (MRP)',
      'Inventory management',
      'Purchasing',
      'Material pegging, so shortages constrain the plan'
    ]
  }
];

const FACTS = [
  { label: 'License', value: 'One-time perpetual, not a subscription' },
  { label: 'Platform', value: 'Windows desktop application on .NET 8' },
  {
    label: 'Database',
    value: 'SQLite for single-user, SQL Server for multi-user'
  },
  { label: 'Vendor', value: 'User Solutions, Inc., manufacturing since 1991' }
];

export function EdgebicPricing(): React.JSX.Element {
  return (
    <section className="bg-white py-14">
      <div className="container mx-auto max-w-6xl px-4">
        {/* The quotable answer */}
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            EDGEBIC pricing
          </h1>
          <p className="mt-6 text-xl font-semibold leading-relaxed text-slate-900 md:text-2xl">
            EDGEBIC costs $25,000 for the APS edition and $35,000 for the
            Complete edition. Both are one-time perpetual licenses, not
            subscriptions.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-slate-700">
            Most advanced planning and scheduling vendors will not tell you the
            price until you have sat through a discovery call. We publish ours
            because you should be able to work out whether this is worth your
            time before you spend any of it.
          </p>
        </div>

        {/* Editions. One grid so both columns share every baseline, and the
            action is anchored to the bottom of each so a longer list on one
            side cannot push its button out of line with the other. */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {EDITIONS.map((edition) => (
            <div
              key={edition.name}
              className="flex flex-col rounded-xl bg-slate-50 p-7 ring-1 ring-slate-900/10 md:p-9"
            >
              <h2 className="text-xl font-bold text-[#003d5c] md:text-2xl">
                {edition.name}
              </h2>
              <p className="mt-1 text-base text-slate-700">{edition.tagline}</p>

              <p className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
                {edition.price}
              </p>
              <p className="mt-2 text-sm font-medium text-[#00688f]">
                One-time perpetual license
              </p>

              <p className="mt-6 text-base leading-relaxed text-slate-700">
                {edition.forWho}
              </p>

              {edition.inherits && (
                <p className="mt-7 text-sm font-semibold text-slate-900">
                  {edition.inherits}
                </p>
              )}

              <ul className={edition.inherits ? 'mt-3 space-y-2' : 'mt-7 space-y-2'}>
                {edition.includes.map((item) => (
                  <li
                    key={item}
                    className="text-base leading-relaxed text-slate-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-9">
                <Link
                  href={Routes.Contact}
                  className="inline-flex items-center rounded bg-[#2FB8DE] px-6 py-3 font-semibold text-[#00293d] transition-colors hover:bg-[#5bc8e6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FB8DE] focus-visible:ring-offset-2"
                >
                  Talk to us about {edition.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* The dividing line, stated once and plainly */}
        <div className="mt-10 max-w-3xl">
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
            How to choose between them
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            The dividing line is material planning, and nothing else. Both
            editions run the identical finite capacity scheduling engine, so
            neither one schedules better than the other. If your late jobs are
            caused by machine and labor capacity, EDGEBIC APS is the whole
            answer. If they are caused as often by a part that did not arrive,
            EDGEBIC Complete adds MRP, inventory, purchasing and pegging so
            material shortages constrain the plan too.
          </p>
        </div>

        {/* Facts table: short, scannable, and easy for an answer engine to read */}
        <div className="mt-10 max-w-3xl overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <tbody>
              {FACTS.map((fact) => (
                <tr
                  key={fact.label}
                  className="border-b border-slate-200"
                >
                  <th
                    scope="row"
                    className="py-3 pr-6 align-top text-sm font-semibold text-slate-900"
                  >
                    {fact.label}
                  </th>
                  <td className="py-3 text-base text-slate-700">{fact.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Honest boundary */}
        <div className="mt-12 rounded-xl bg-[#003d5c] px-6 py-9 md:px-10 md:py-11">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-white md:text-2xl">
              What the price does not tell you
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-200">
              A license number is the easy part. Whether EDGEBIC fits depends on
              your routings, your work centers and how your ERP exports data,
              and that is a conversation rather than a web page. Bring one week
              of real work and we will build it, schedule it, and show you the
              result against your own numbers instead of a demo dataset.
            </p>
            <div className="mt-8">
              <Link
                href={Routes.Contact}
                className="inline-flex items-center rounded bg-[#2FB8DE] px-6 py-3 font-semibold text-[#00293d] transition-colors hover:bg-[#5bc8e6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FB8DE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003d5c]"
              >
                Book a working session
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
