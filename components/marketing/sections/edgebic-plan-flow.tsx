'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

import { Routes } from '@/constants/routes';

/**
 * The six stages that take a manufacturer from a drawn routing to a plan they
 * can defend, told with the real product screens.
 *
 * The only interaction is click-to-enlarge, matching the screenshot slideshow.
 * The drag-and-drop belongs to the product: dressing this page up with controls
 * that cannot answer a click would be worse than showing the real screen and
 * saying plainly what it does.
 *
 * Every claim here is taken from the shipped v3.2 UI in the screenshots. The
 * optimizer in particular states its own limits on screen ("machines and
 * calendars only"), so the copy does not promise labour or tooling planning.
 */
type StageImage = { src: string; alt: string };

type Stage = {
  id: string;
  screen: string;
  title: string;
  body: string;
  proof: string;
  image: StageImage;
};

const STAGES: Stage[] = [
  {
    id: 'bill-of-resources',
    screen: 'Bill of Resources',
    title: 'Draw the routing as a flow chart, not a spreadsheet',
    body: 'Build every routing by dragging steps onto a canvas. Steps are nodes, dependencies are arrows, sub-assemblies branch where they really branch, and you can put a photo of the actual machine on each node. The plan ends up looking like the floor it runs on, so an operator recognizes it without training.',
    proof: 'Drag and drop routing designer with sub-assemblies and machine images',
    image: {
      src: '/images/Edgebic/screens/bill-of-resource.png',
      alt: 'EDGEBIC Bill of Resources flow chart editor showing a multi-step routing built as connected nodes with a sub-assembly branch'
    }
  },
  {
    id: 'job-gantt',
    screen: 'Job Gantt View',
    title: 'Give managers the whole schedule on one timeline',
    body: 'A job level Gantt chart that answers the only questions an owner or plant manager actually asks. What ships this week, which jobs are late, and which ones are safe. No operation detail to wade through, no training session required before the first useful glance.',
    proof: 'Job level Gantt chart built for top level managers',
    image: {
      src: '/images/Edgebic/screens/job-gantt-view.png',
      alt: 'EDGEBIC job Gantt view showing scheduled production jobs across a timeline with planned dates and status'
    }
  },
  {
    id: 'planning-board',
    screen: 'Planning Board',
    title: 'Move one operation and every downstream step re-plans',
    body: 'Every operation on every machine, on one board. Drag an operation to a different resource or a different hour and the schedule rebuilds instantly against finite capacity, so every downstream operation moves with it. You are planning, not chasing the consequences of planning.',
    proof: 'Drag and drop planning board with instant finite capacity rebalancing',
    image: {
      src: '/images/Edgebic/screens/planning-board.png',
      alt: 'EDGEBIC planning board showing operations laid out per machine with drag and drop rescheduling across work centers'
    }
  },
  {
    id: 'resource-calendar',
    screen: 'Resource Calendar',
    title: 'Know exactly where your capacity actually is',
    body: 'Utilization, assigned load, backlog and genuinely free capacity, broken out by shift, by work center, and across any date range you pick. This is the number you want in front of you before you promise a delivery date, quote overtime, or sign off on buying another machine.',
    proof: 'Utilization, backlog and free capacity by shift, work center and date range',
    image: {
      src: '/images/Edgebic/screens/resource-calendar.png',
      alt: 'EDGEBIC resource calendar showing machine utilization, assigned load and available capacity by day and shift'
    }
  },
  {
    id: 'optimizer',
    screen: 'Optimizer Workbench',
    title: 'Ask what it would take, before you promise it',
    body: 'Run the plant again in memory with the mathematical solver. Open the weekend on one machine, run the day longer, add or remove a machine, or send an operation out to a vendor, plant-wide or for one job, then compare the result against the plan you are running now. Experiments run in memory: nothing is saved until you press Accept, completed work is never touched, and the answer is never worse than your current plan.',
    proof: 'Mathematical solver and what-if variants, run in memory, plant-wide or per job',
    image: {
      src: '/images/Edgebic/screens/optimization.png',
      alt: 'EDGEBIC optimizer workbench building a what-if variant with options to work the weekend, run the day longer, add or remove machines, or send an operation outside'
    }
  },
  {
    id: 'setup-matrix',
    screen: 'Setup Matrix',
    title: 'Charge the real changeover, not a flat average',
    body: 'Setup time depends on what the machine just finished. In a paint booth, white to black is fast and black to white is slow. Configure the from-to changeover matrix once at family level, override the individual products that behave differently, and every schedule after that charges the true changeover instead of one averaged number that is wrong in both directions.',
    proof: 'Sequence dependent setup matrix with setup families and per-product overrides',
    image: {
      src: '/images/Edgebic/screens/setup-matrix.png',
      alt: 'EDGEBIC work center setup matrix showing from-family to-family changeover times in minutes with per-product overrides'
    }
  }
];

/** Rounded-cap chevron marking the hand-off between two stages. */
function StageConnector(): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="flex justify-center py-6"
    >
      <svg
        width="26"
        height="34"
        viewBox="0 0 26 34"
        fill="none"
        className="text-[#2FB8DE]"
      >
        <path
          d="M13 2 V20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M4 21 L13 30 L22 21"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function EdgebicPlanFlow(): React.JSX.Element {
  const [enlarged, setEnlarged] = useState<StageImage | null>(null);

  // Close on Escape and stop the page behind the overlay from scrolling.
  React.useEffect(() => {
    if (!enlarged) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEnlarged(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [enlarged]);

  return (
    <section className="bg-white py-14">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold leading-tight text-slate-900 md:text-4xl">
            From a routing you drew to a plan you can defend
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            Six real screens from EDGEBIC by User Solutions, in the order you
            would actually use them. This is what planning a week looks like
            when the schedule respects finite capacity. Click any screen to see
            it full size.
          </p>
        </div>

        <div className="mt-12">
          {STAGES.map((stage, index) => {
            const flipped = index % 2 === 1;

            return (
              <React.Fragment key={stage.id}>
                {index > 0 && <StageConnector />}
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={flipped ? 'lg:order-2' : undefined}>
                    <h3 className="text-xl font-bold leading-snug text-slate-900 md:text-2xl">
                      {stage.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-slate-700">
                      {stage.body}
                    </p>
                    <p className="mt-5 text-sm font-medium text-[#00688f]">
                      {stage.proof}
                    </p>
                  </div>

                  <figure
                    className={`m-0 rounded-xl bg-slate-50 p-2 ring-1 ring-slate-900/10 ${
                      flipped ? 'lg:order-1' : ''
                    }`}
                  >
                    <button
                      type="button"
                      title="View full size image"
                      aria-label={`View the ${stage.screen} screen full size`}
                      onClick={() => setEnlarged(stage.image)}
                      className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-lg border-0 bg-white p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FB8DE] focus-visible:ring-offset-2"
                    >
                      <Image
                        src={stage.image.src}
                        alt={stage.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 560px"
                        className="object-contain"
                        priority={index === 0}
                      />
                    </button>
                    <figcaption className="px-1 pb-1 pt-3 text-sm font-semibold text-[#003d5c]">
                      {stage.screen}
                    </figcaption>
                  </figure>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-14 rounded-xl bg-[#003d5c] px-6 py-10 md:px-12 md:py-12">
          <div className="max-w-3xl">
            <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">
              See these six screens run on your own jobs
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-200">
              Bring one week of real work: your products, your machines, your
              shifts. We will build the routings, run the schedule, and show you
              the answer against your own numbers rather than a demo dataset.
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

      {/* Full size viewer, matching the screenshot slideshow */}
      <AnimatePresence>
        {enlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={enlarged.alt}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setEnlarged(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative mx-4 inline-block max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close full size image"
                onClick={() => setEnlarged(null)}
                className="absolute -right-3 -top-3 z-10 flex size-8 items-center justify-center rounded-full bg-white text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FB8DE]"
              >
                ✕
              </button>
              <Image
                src={enlarged.src}
                alt={enlarged.alt}
                width={2551}
                height={1519}
                className="block h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
