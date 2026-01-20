import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ProductionSchedulingProductsVideosPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold">Product Videos</h1>
          <p className="text-lg text-muted-foreground">
            Production Scheduling Products | Excel Applications | Resource
            Manager for Excel (RMX) Videos
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Welcome */}
            <div className="mb-8 grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold">Welcome</h2>
                <p className="mb-4 text-muted-foreground">
                  Welcome to User Solutions product video gallery. Explore our
                  comprehensive manufacturing software solutions designed to
                  streamline your production scheduling and planning processes.
                </p>
                <p className="text-muted-foreground">
                  From Excel-based tools to enterprise-grade database solutions,
                  our videos demonstrate how each product can help you optimize
                  workflows, reduce scheduling conflicts, and improve overall
                  manufacturing efficiency.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg bg-slate-100">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/y-TMN1e-xlc"
                    title="Welcome Video"
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* Video Grid - 2 columns */}
            <div className="mb-8 grid gap-8 md:grid-cols-2">
              {/* Resource Manager DB */}
              <div>
                <h3 className="mb-3 text-xl font-bold">Resource Manager DB</h3>
                <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100">
                  <iframe
                    src="https://www.youtube.com/embed/kn92TIHhbm8"
                    title="Resource Manager DB Video"
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mb-3 text-sm text-muted-foreground">
                  Summary of Resource Manager DB database-driven production
                  scheduling solution
                </p>
                <Link href="/resource-manager-db-2">
                  <Button size="sm">Learn More</Button>
                </Link>
              </div>

              {/*   */}
              <div>
                <h3 className="mb-3 text-xl font-bold"> </h3>
                <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100">
                  <iframe
                    src="https://www.youtube.com/embed/L4wDboRFU6k"
                    title="  Video"
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mb-3 text-sm text-muted-foreground">
                  Complete overview of WorkCenter Scheduler XL for production
                  scheduling
                </p>
                <Link href="/workcenter-schedulerxl">
                  <Button size="sm">Learn More</Button>
                </Link>
              </div>

              {/* Resource Manager For Excel */}
              <div>
                <h3 className="mb-3 text-xl font-bold">
                  Resource Manager For Excel
                </h3>
                <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100">
                  <iframe
                    src="https://www.youtube.com/embed/DRWDNVq31l4"
                    title="Resource Manager For Excel Video"
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mb-3 text-sm text-muted-foreground">
                  Summary of Resource Manager for Excel integrated scheduling
                  solution
                </p>
                <Link href="/resource-manager-for-excel-2">
                  <Button size="sm">Learn More</Button>
                </Link>
              </div>

              {/* EDGEBIC */}
              <div>
                <h3 className="mb-3 text-xl font-bold">EDGEBI</h3>
                <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100">
                  <iframe
                    src="https://www.youtube.com/embed/snltXMHeojU"
                    title="EDGEBI Video"
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mb-3 text-sm text-muted-foreground">
                  Introduction to EDGEBI for simplified production scheduling
                </p>
                <Link href="/jsl-job-scheduler-lite">
                  <Button size="sm">Learn More</Button>
                </Link>
              </div>
            </div>

            {/* Training Videos Section */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">
                Resource Manager Training Videos (RMX)
              </h2>
              <p className="mb-6 text-muted-foreground">
                Complete training video series covering all aspects of Resource
                Manager for Excel
              </p>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    RMX Initialization — Building Bills of Resource
                  </h3>
                  <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100">
                    <iframe
                      src="https://www.youtube.com/embed/Br2b8h-drfY"
                      title="RMX Initialization Training"
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Learn how to build Bills of Resource in Resource Manager for
                    Excel
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    RMX Initialization — Production Operations List
                  </h3>
                  <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100">
                    <iframe
                      src="https://www.youtube.com/embed/Fg9WZcSCKoA"
                      title="RMX Production Operations Training"
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Setting up Production Operations List in Resource Manager
                    for Excel
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    RMX Scheduling — Forecast Calendar
                  </h3>
                  <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100">
                    <iframe
                      src="https://www.youtube.com/embed/bmCEFVJlkr4"
                      title="RMX Forecast Calendar Training"
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Using Forecast Calendar for production planning in Resource
                    Manager for Excel
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    RMX — Master Scheduling
                  </h3>
                  <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100">
                    <iframe
                      src="https://www.youtube.com/embed/Fc-zM31PrrQ"
                      title="RMX Master Scheduling Training"
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Master scheduling techniques and best practices with
                    Resource Manager for Excel
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    RMX — Summary Report
                  </h3>
                  <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100">
                    <iframe
                      src="https://www.youtube.com/embed/tOy099sVThQ"
                      title="RMX Reporting Training"
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Generating and analyzing Summary Reports in Resource Manager
                    for Excel
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    Resource Manager for Excel — Intro Part 1
                  </h3>
                  <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100">
                    <iframe
                      src="https://www.youtube.com/embed/74uO2H-eevc"
                      title="RMX Introduction Part 1"
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    First part introduction to Resource Manager for Excel
                    features and setup
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
