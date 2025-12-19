'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { RMDBFeatureList } from '@/components/marketing/sections/rmdb-feature-list';
import { Card, CardContent } from '@/components/ui/card';

export default function ResourceManagerDBPage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Title centered */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="mb-4 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Resource Manager DB
          </h1>
          <p className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-slate-600">
            Resource Manager-DB (RMDB) is a flexible and affordable production planning, scheduling, and tracking solution that is designed to adapt to your operations. We can work with whatever data you have to achieve better production scheduling, just easier and quicker than you ever thought possible. Give US a chance to prove it by scheduling a Live Demo today!
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-center gap-6 text-[18px]">
            <Link href="#summary" className="text-slate-700 hover:text-cyan-500">
              Summary
            </Link>
            <Link href="/resource-manager-db-in-depth" className="text-slate-700 hover:text-cyan-500">
              In Depth
            </Link>
            <Link
              href="https://www.usersolutions.com/wp-content/uploads/2022/10/rmdbquickstart23.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-cyan-500"
            >
              Quick Start
            </Link>
            <Link href="/edgebi" className="text-slate-700 hover:text-cyan-500">
              EDGEBI
            </Link>
            <Link href="/contact-us" className="text-slate-700 hover:text-cyan-500">
              Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section - Text and Image in Row */}
      <section id="summary" className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            {/* Left - Text Content */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Overview
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                  Resource Manager-DB (RMDB) is an affordable, flexible and quick-to-implement approach to resolve your production planning, scheduling and tracking challenges. Designed by customers just like you, Resource Manager-DB features a single, simple menu (dashboard) requiring minimal transactions to keep the system accurate.
                </p>
                <p>
                  RMDB's unique, customer driven architecture allows you to start very simply, focusing on one area at a time, enabling you to provide minimal information in order to recognize immediate benefits.
                </p>
              </div>
            </div>

            {/* Right - Image */}
            <div className="flex items-center justify-center">
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/07/rmdb11.png"
                alt="Resource Manager DB Processing Menu"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <RMDBFeatureList />

      {/* Video and Screenshot Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Video on Left */}
            <div className="overflow-hidden rounded-lg border shadow-lg">
              <div className="aspect-video">
                <video
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/EDGE%20BI%20User%20Solutions.mp4"
                  title="EDGE BI User Solutions"
                  className="size-full"
                  controls
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            {/* Screenshot on Right */}
            <div>
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/07/rmdb11.png"
                alt="Color-coded production job schedule spreadsheet"
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
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
