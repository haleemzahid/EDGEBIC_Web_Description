'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { RMDBFeatureList } from '@/components/marketing/sections/rmdb-feature-list';
import { Card, CardContent } from '@/components/ui/card';

export default function ResourceManagerDBPage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <GridSection hideVerticalGridLines>
        <div className="container pt-6">
          <div className="mx-auto max-w-7xl">
            {/* Text and Video Section */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Text on Left */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-cyan-500">Resource Manager DB</h2>
                <p className="text-lg leading-relaxed">
                  Resource Manager-DB (RMDB) is a flexible and affordable production
                  planning, scheduling, and tracking solution that is designed to
                  adapt to your operations. We can work with whatever data you have
                  in to achieve better production scheduling, just easier and
                  quicker than you ever thought possible. Give{' '}
                  <em className="font-semibold">US</em> a chance to prove it by
                  scheduling a Live Demo today!
                </p>
              </div>
              {/* Video on Right */}
              <div className="overflow-hidden rounded-lg border shadow-lg">
                <div className="aspect-video">
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

      {/* Screenshot Section */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex justify-center">
            <Image
              src="https://www.usersolutions.com/wp-content/uploads/2022/07/RMDB-EDGE2-1024x483.png"
              alt="Screenshot of production scheduling software interface"
              width={1024}
              height={483}
              className="rounded-lg shadow-lg"
            />
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
      <section>
        <div className="container mx-auto">
          <Card className="mt-6 rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 text-card-foreground shadow">
            <CardContent className="p-8 text-center">
              <h3 className="mb-6 text-2xl font-bold text-slate-900">
                CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
              </h3>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                alt="Collection of industry and business awards logos"
                className="mx-auto h-auto max-w-full"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
