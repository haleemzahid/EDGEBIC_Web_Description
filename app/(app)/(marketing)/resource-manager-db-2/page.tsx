'use client';

import * as React from 'react';
import Image from 'next/image';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { RMDBFeatureList } from '@/components/marketing/sections/rmdb-feature-list';

export default function ResourceManagerDBPage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <GridSection hideVerticalGridLines>
        <div className="container pt-6">
          <div className="mx-auto max-w-7xl">
            {/* Hero Header */}
            <div className="mb-6 text-center">
              <SiteHeading
                title="Resource Manager DB"
                description="Resource Manager-DB (RMDB) is a flexible and affordable production planning, scheduling, and tracking solution that is designed to adapt to your operations. We can work with whatever data you have to achieve better production scheduling, just easier and quicker than you ever thought possible. Give US a chance to prove it by scheduling a Live Demo today!"
              />
            </div>

            {/* Video Section - Single Video */}
            <div className="mb-6">
              <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg border shadow-lg">
                <div className="relative aspect-video">
                  <video
                    src="https://www.usersolutions.com/wp-content/uploads/2022/12/RMDB%20updated%20thumbnail.mp4"
                    title="Resource Manager DB Demo"
                    className="size-full"
                    controls
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GridSection>

      {/* Summary Section */}
      <section id="summary" className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              RESOURCE MANAGER DB: SUMMARY
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                If you have tried to use your ERP for creating a viable
                Production Schedule, and still end up with a tangle of custom
                Excel Reports, messy whiteboard or worse yet, late shipments, we
                can help. If you don't even have an ERP system, and are
                struggling with production scheduling, we can help.
              </p>
              <p className="text-lg leading-relaxed">
                Alternate workcenters, complex routings & processes, discrete
                and/or batch, multiple constraints (labor, machines, materials,
                etc.), advanced drag and drop graphical calendar screens,
                downtime management, sub-assemblies, optimization, and much
                more.
              </p>
            </div>
            <div>
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png"
                alt="Screenshot of production scheduling software interface"
                width={1024}
                height={483}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <RMDBFeatureList />

      {/* Secondary Screenshot */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex justify-center">
            <Image
              src="https://www.usersolutions.com/wp-content/uploads/2022/07/rmdb11.png"
              alt="Color-coded production job schedule spreadsheet"
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-6">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h3 className="mb-6 text-2xl font-bold text-slate-900">
            CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
          </h3>
          <Image
            src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
            alt="Collection of industry and business awards logos"
            width={1024}
            height={128}
            className="mx-auto"
          />
        </div>
      </section>
    </div>
  );
}
