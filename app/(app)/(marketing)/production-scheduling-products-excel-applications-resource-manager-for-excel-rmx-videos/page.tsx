import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductionSchedulingProductsVideosPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold">Product Videos</h1>
          <p className="text-lg text-muted-foreground">
            Production Scheduling Products | Excel Applications | Resource Manager for Excel (RMX) Videos
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Welcome */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                  <iframe
                    src="https://www.youtube.com/embed/y-TMN1e-xlc"
                    title="Welcome Video"
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-muted-foreground">
                  Welcome to User Solutions product video gallery. Explore our
                  comprehensive manufacturing software solutions.
                </p>
              </CardContent>
            </Card>

            {/* Video Grid - 2 columns */}
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              {/* Resource Manager DB */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Resource Manager DB</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <iframe
                      src="https://www.youtube.com/embed/kn92TIHhbm8"
                      title="Resource Manager DB Video"
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Summary of Resource Manager DB database-driven production
                    scheduling solution
                  </p>
                  <Link href="/resource-manager-db-2">
                    <Button
                      size="sm"
                      className="w-full"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Workcenter Scheduler XL */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Workcenter Scheduler XL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <iframe
                      src="https://www.youtube.com/embed/L4wDboRFU6k"
                      title="Workcenter Scheduler XL Video"
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Complete overview of WorkCenter Scheduler XL for production
                    scheduling
                  </p>
                  <Link href="/workcenter-schedulerxl">
                    <Button
                      size="sm"
                      className="w-full"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Resource Manager For Excel */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Resource Manager For Excel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <iframe
                      src="https://www.youtube.com/embed/DRWDNVq31l4"
                      title="Resource Manager For Excel Video"
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Summary of Resource Manager for Excel integrated scheduling
                    solution
                  </p>
                  <Link href="/resource-manager-for-excel-2">
                    <Button
                      size="sm"
                      className="w-full"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* EDGEBIC */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">EDGEBIC</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <iframe
                      src="https://www.youtube.com/embed/snltXMHeojU"
                      title="EDGEBIC Video"
                      className="size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Introduction to EDGEBIC for simplified production scheduling
                  </p>
                  <Link href="/jsl-job-scheduler-lite">
                    <Button
                      size="sm"
                      className="w-full"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Training Videos Section */}
            <Card className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Resource Manager Training Videos (RMX)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-muted-foreground">
                  Complete training video series covering all aspects of
                  Resource Manager for Excel
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                      RMX Initialization — Building Bills of Resource
                    </h3>
                    <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                      <iframe
                        src="https://www.youtube.com/embed/Br2b8h-drfY"
                        title="RMX Initialization Training"
                        className="size-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learn how to build Bills of Resource in Resource Manager
                      for Excel
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                      RMX Initialization — Production Operations List
                    </h3>
                    <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
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
                    <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                      RMX Scheduling — Forecast Calendar
                    </h3>
                    <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                      <iframe
                        src="https://www.youtube.com/embed/bmCEFVJlkr4"
                        title="RMX Forecast Calendar Training"
                        className="size-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Using Forecast Calendar for production planning in
                      Resource Manager for Excel
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                      RMX — Master Scheduling
                    </h3>
                    <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
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
                    <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                      RMX — Summary Report
                    </h3>
                    <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                      <iframe
                        src="https://www.youtube.com/embed/tOy099sVThQ"
                        title="RMX Reporting Training"
                        className="size-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Generating and analyzing Summary Reports in Resource
                      Manager for Excel
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                      Resource Manager for Excel — Intro Part 1
                    </h3>
                    <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
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
        </div>
      </section>
    </div>
  );
}
