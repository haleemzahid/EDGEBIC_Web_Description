import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import { Routes } from '@/constants/routes';

export const metadata: Metadata = {
  title: 'Mission Statement - User Solutions',
  description:
    'Empower manufacturers to become more competitive and profitable through efficient resource management tools that are affordable, adaptable, and easily implemented.',
};

export default function MissionPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Make Manufacturing Great Again!
            </h1>
            <p className="text-lg text-gray-700">
              Empowering manufacturers since 1991 with solutions that fit like
              a glove
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Two Column Layout */}
            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
              {/* Left Column - Text Content */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Mission Statement
                </h2>

                <blockquote className="text-xl font-bold leading-relaxed text-slate-900">
                  &quot;Empower manufacturers to become more competitive and
                  profitable through efficient resource management tools that are
                  affordable, adaptable, and easily implemented.&quot;
                </blockquote>

                <p className="text-lg leading-relaxed text-slate-700">
                  Since 1991, what makes <em>US</em> unique is we work with you to solve
                  production planning, scheduling, and tracking challenges{' '}
                  <em>your way</em>.
                </p>

                <p className="text-lg leading-relaxed text-slate-700">
                  <strong>User Solutions: LISTEN and DELIVER. LISTEN</strong> to the customer,
                  understand <em>their</em> needs, and <strong>DELIVER</strong> a
                  solution.
                </p>

                <p className="text-lg leading-relaxed text-slate-700">
                  We look forward to hearing from you and learning of your
                  challenges and the opportunity to deliver an affordable
                  solution that <strong>fits you like a glove!</strong>
                </p>

                <p className="text-lg leading-relaxed text-slate-700">
                  From adding a Finite Capacity Scheduling capability to any ERP
                  system, or providing Material Requirements Planning for smaller
                  operations who only have a simple accounting solution, or
                  delivering simple Job Shop Scheduling Solutions, or even
                  providing educational templates for Production and Operations
                  Management, we are grateful for the opportunity to work with
                  you to Make Manufacturing Great Again!
                </p>

                <p className="text-lg leading-relaxed text-slate-700">
                  Contact <strong>US</strong> Today!
                </p>

                <div className="space-y-2 text-lg text-slate-700">
                  <p>
                    <Link href={Routes.Contact} className="text-blue-600 hover:underline">
                      Contact
                    </Link>
                  </p>
                  <p>
                    <Link href={Routes.Team} className="text-blue-600 hover:underline">
                      Our Team
                    </Link>
                  </p>
                  <p>
                    <Link href={Routes.History} className="text-blue-600 hover:underline">
                      view User Solution History
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="flex items-start justify-center md:justify-end">
                <Image
                  src="/images/make-manufacturing-great-again.jpg"
                  alt="Make Manufacturing Great Again - Vintage car and factory"
                  width={300}
                  height={210}
                  className="rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
