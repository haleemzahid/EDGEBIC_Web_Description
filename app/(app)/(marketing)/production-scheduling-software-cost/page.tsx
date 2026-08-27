import * as React from 'react';
import Link from 'next/link';

import { FAQJsonLd, SoftwareApplicationJsonLd } from '@/components/seo';
import { AppInfo } from '@/constants/app-info';
import { Routes } from '@/constants/routes';
import { createPageMetadata } from '@/lib/seo/metadata';
import { schemaNodeIds } from '@/lib/seo/schema-nodes';

export const metadata = createPageMetadata({
  title: 'How Much Does Production Scheduling Software Cost? (2026 Prices)',
  description:
    'Production scheduling software falls into three price bands: cloud MRP at $150 to $300 per month, enterprise APS quoted at roughly $50,000 to $500,000, and published-price finite capacity scheduling like EDGEBIC at $25,000 to $35,000 one-time. Here is what separates them and why most APS vendors will not quote publicly.',
  path: '/production-scheduling-software-cost',
  keywords:
    'how much does production scheduling software cost, production scheduling software cost, APS software cost, advanced planning and scheduling pricing, finite capacity scheduling software price, manufacturing scheduling software cost, production planning software pricing, scheduling software price comparison, APS software price, cost of production scheduling software'
});

/**
 * The wedge page. Almost every true APS vendor is quote-only, so a buyer
 * asking what this category costs cannot get a straight answer from the
 * people selling it. Answering the question honestly, including where our own
 * price sits and where it does not fit, is the whole value of this page.
 *
 * Competitor figures here are third-party estimates and are labelled as such.
 * We do not state another vendor's price as fact, because we cannot verify it
 * and being caught overstating a rival's number would cost more than the page
 * earns.
 */

const BANDS = [
  {
    tier: 'Cloud MRP',
    examples: 'Katana, MRPeasy',
    price: '$150 to $300 per user, per month',
    model: 'Subscription, billed monthly or annually',
    capacity: 'Basic capacity planning, not true finite capacity',
    fit: 'Small shops that mainly need inventory and order tracking, where the schedule is a secondary concern.'
  },
  {
    tier: 'Enterprise APS',
    examples: 'Siemens Opcenter APS, Asprova, PlanetTogether',
    price: 'Roughly $50,000 to $500,000, quoted privately',
    model: 'Quote only, usually subscription plus implementation and annual maintenance',
    capacity: 'True finite capacity, deep constraint modeling',
    fit: 'Large manufacturers with dedicated project teams and a multi-month implementation budget.'
  },
  {
    tier: 'Published-price APS',
    examples: 'EDGEBIC by User Solutions',
    price: '$25,000 or $35,000, one-time',
    model: 'One-time perpetual license, no subscription',
    capacity: 'True finite capacity: machines, labor, tooling and materials',
    fit: 'Small to mid-size manufacturers who need real finite capacity scheduling without an enterprise procurement cycle.'
  }
];

const faqData = [
  {
    question: 'How much does production scheduling software cost?',
    answer:
      'It falls into three bands. Cloud MRP tools such as Katana and MRPeasy publish subscription pricing around $150 to $300 per user per month, but offer basic capacity planning rather than true finite capacity scheduling. Enterprise advanced planning and scheduling systems such as Siemens Opcenter APS, Asprova and PlanetTogether do not publish list pricing at all; third-party estimates put them between roughly $50,000 and $500,000 plus annual maintenance. EDGEBIC by User Solutions publishes its price: $25,000 for the APS edition and $35,000 for the Complete edition, as a one-time perpetual license.'
  },
  {
    question: 'Why do most APS vendors not publish their pricing?',
    answer:
      'Because the price depends on a configuration that has to be scoped first, and because quoting privately lets the number vary by buyer. The practical effect for a manufacturer is that comparing options requires sitting through several discovery calls before learning whether any of them are affordable. Published pricing removes that step.'
  },
  {
    question: 'Is scheduling software usually a subscription or a one-time purchase?',
    answer:
      'Most of the category is subscription now, both the cloud MRP tools and the enterprise APS systems, which typically add annual maintenance of roughly 18 to 22 percent of licence value. One-time perpetual licensing is the exception. EDGEBIC is sold that way: you buy it once and there is no recurring per-seat fee.'
  },
  {
    question: 'What makes finite capacity scheduling more expensive than basic MRP?',
    answer:
      'Basic MRP assumes infinite capacity: it tells you what to make and when it is due, but not whether the plant can actually do it in that window. Finite capacity scheduling books every operation against real machine hours, shift calendars, operator availability and changeover time, so the dates it produces are achievable. Modelling those constraints is the harder engineering problem, and it is what the price difference buys.'
  },
  {
    question: 'What else should I budget for beyond the licence?',
    answer:
      'Data preparation and implementation time, in every case. Your routings, work centers and shift calendars have to be accurate before any scheduler produces trustworthy dates, and that work belongs to you regardless of vendor. Enterprise APS deployments also commonly carry separate implementation and annual maintenance fees, which is why a quoted licence figure is rarely the total.'
  }
];

export default function ProductionSchedulingSoftwareCostPage(): React.JSX.Element {
  const nodes = schemaNodeIds();

  return (
    <>
      <FAQJsonLd questions={faqData} />
      {/* This page exists to answer what the category costs, and it states two
          real prices in the body. Without an Offer, the one page most likely
          to be cited for a price left its own answer unreadable to machines. */}
      <SoftwareApplicationJsonLd
        id={nodes.edgebicAps}
        name={AppInfo.EDITIONS.APS.NAME}
        description={AppInfo.EDITIONS.APS.DESCRIPTION}
        url="/edgebic"
        price={AppInfo.EDITIONS.APS.PRICE}
        operatingSystem="Windows"
        applicationSubCategory="Production Scheduling Software"
        offerUrl="/pricing"
        isVariantOf={nodes.edgebic}
      />
      <SoftwareApplicationJsonLd
        id={nodes.edgebicComplete}
        name={AppInfo.EDITIONS.COMPLETE.NAME}
        description={AppInfo.EDITIONS.COMPLETE.DESCRIPTION}
        url="/edgebic"
        price={AppInfo.EDITIONS.COMPLETE.PRICE}
        operatingSystem="Windows"
        applicationSubCategory="Production Scheduling Software"
        offerUrl="/pricing"
        isVariantOf={nodes.edgebic}
      />

      <section className="bg-white py-14">
        <div className="container mx-auto max-w-5xl px-4">
          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            How much does production scheduling software cost?
          </h1>

          <p className="mt-6 text-xl font-semibold leading-relaxed text-slate-900 md:text-2xl">
            Production scheduling software falls into three price bands: cloud
            MRP at roughly $150 to $300 per user per month, enterprise APS
            quoted privately at roughly $50,000 to $500,000, and published-price
            finite capacity scheduling such as EDGEBIC at $25,000 or $35,000 as
            a one-time licence.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-slate-700">
            The difficulty is that the middle band will not tell you its number.
            Most true advanced planning and scheduling vendors quote only after
            a discovery call, so a manufacturer comparing options often spends
            several hours before finding out whether any of them are in range.
            This page gives the straight answer, including where our own price
            sits and where it does not fit.
          </p>

          {/* The three bands */}
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="py-3 pr-6 text-sm font-bold text-slate-900">Tier</th>
                  <th className="py-3 pr-6 text-sm font-bold text-slate-900">Typical price</th>
                  <th className="py-3 pr-6 text-sm font-bold text-slate-900">Model</th>
                  <th className="py-3 text-sm font-bold text-slate-900">Scheduling depth</th>
                </tr>
              </thead>
              <tbody>
                {BANDS.map((b) => (
                  <tr key={b.tier} className="border-b border-slate-200 align-top">
                    <td className="py-4 pr-6">
                      <span className="block font-bold text-[#003d5c]">{b.tier}</span>
                      <span className="block text-sm text-slate-600">{b.examples}</span>
                    </td>
                    <td className="py-4 pr-6 text-base text-slate-800">{b.price}</td>
                    <td className="py-4 pr-6 text-base text-slate-700">{b.model}</td>
                    <td className="py-4 text-base text-slate-700">{b.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-slate-600">
            Enterprise APS figures are third-party estimates from software
            directories rather than vendor list prices, because those vendors do
            not publish one. Treat them as a range, not a quote.
          </p>

          {/* Which band fits */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Which band actually fits your plant
            </h2>
            <div className="mt-6 space-y-6">
              {BANDS.map((b) => (
                <div key={b.tier}>
                  <h3 className="text-lg font-bold text-[#003d5c]">{b.tier}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-700">
                    {b.fit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The honest boundary */}
          <div className="mt-12 rounded-xl bg-slate-50 p-7 ring-1 ring-slate-900/10 md:p-9">
            <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
              Where EDGEBIC is the wrong answer
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              If you mainly need inventory counts, purchase orders and order
              tracking, and the schedule is a whiteboard you are comfortable
              with, a $200 per month cloud MRP tool is a better use of your
              money than a $25,000 scheduler. Finite capacity scheduling earns
              its price when capacity is the thing costing you delivery dates:
              when jobs are late because two of them need the same machine, when
              changeover order matters, or when quoting a date is guesswork.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Equally, if you need deep enterprise constraint modelling across
              many plants with a dedicated project team, the enterprise APS band
              exists for a reason.
            </p>
          </div>

          {/* Our numbers */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              What EDGEBIC costs
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              EDGEBIC APS is $25,000 and covers finite capacity scheduling and
              optimization. EDGEBIC Complete is $35,000 and adds MRP, inventory,
              purchasing and material pegging. Both are one-time perpetual
              licences running the identical scheduling engine, so the only
              difference is material planning. It is a Windows application, your
              data stays on your own machines, and it integrates with any ERP
              that can export to Excel, CSV or a database.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center rounded bg-[#2FB8DE] px-6 py-3 font-semibold text-[#00293d] transition-colors hover:bg-[#5bc8e6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FB8DE] focus-visible:ring-offset-2"
              >
                See full pricing
              </Link>
              <Link
                href={Routes.Contact}
                className="inline-flex items-center px-2 py-3 font-semibold text-[#00688f] underline-offset-4 transition-colors hover:text-[#003d5c]"
              >
                Ask whether it fits your plant
              </Link>
            </div>
          </div>

          {/* FAQ, visible as well as in schema */}
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Common questions about scheduling software cost
            </h2>
            <div className="mt-6 space-y-8">
              {faqData.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg font-bold text-slate-900">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
