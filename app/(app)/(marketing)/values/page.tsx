import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function ValuesPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              What Drives <strong className='italic'> Us</strong> Forward
            </h1>
            <p className="text-gray-700">
              The principles that have guided product development for over three decades
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Left Column - Core Values */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  Our Core Values
                </h2>
                <ul className="space-y-4">
                  <li>
                    <strong className="text-slate-900">Customer-Centric:</strong>{' '}
                    <span className="text-gray-700">
                      Your success is our priority. We listen, understand, and
                      deliver solutions that truly fit your needs.
                    </span>
                  </li>
                  <li>
                    <strong className="text-slate-900">
                      Partnership Approach:
                    </strong>{' '}
                    <span className="text-gray-700">
                      We work alongside you as partners, not just vendors. Your
                      challenges become our challenges to solve together.
                    </span>
                  </li>
                  <li>
                    <strong className="text-slate-900">
                      Innovation & Adaptability:
                    </strong>{' '}
                    <span className="text-gray-700">
                      We embrace new technologies while respecting proven methods,
                      creating solutions that evolve with your business.
                    </span>
                  </li>
                  <li>
                    <strong className="text-slate-900">
                      Reliability & Trust:
                    </strong>{' '}
                    <span className="text-gray-700">
                      Over 30 years of consistent delivery. When we commit, we
                      deliver. Your trust is our most valuable asset.
                    </span>
                  </li>
                  <li>
                    <strong className="text-slate-900">
                      Quality Excellence:
                    </strong>{' '}
                    <span className="text-gray-700">
                      We don&apos;t just meet standards, we set them. Every
                      solution reflects our commitment to manufacturing
                      excellence.
                    </span>
                  </li>
                  <li>
                    <strong className="text-slate-900">
                      Integrity & Transparency:
                    </strong>{' '}
                    <span className="text-gray-700">
                      Honest communication, fair pricing, and transparent
                      processes. We build relationships based on mutual respect.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right Column - Success Stories Image */}
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-lg lg:h-full lg:min-h-[500px]">
                <Image
                  src="/value.jpeg"
                  alt="Success Stories - Our Values in Action"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="text-center">
              <blockquote className="text-xl font-semibold text-slate-900">
                &quot;Our values aren&apos;t just words on a wall – they&apos;re
                the foundation of every solution we create and every
                relationship we build.&quot;
              </blockquote>
              <p className="mt-4 text-lg text-orange-600">The Product Development Team</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
