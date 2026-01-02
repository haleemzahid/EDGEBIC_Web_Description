import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductVideoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Product Videos
            </h1>
            <p className="mb-6 text-xl text-gray-700">
              Watch comprehensive video demonstrations of our manufacturing
              solutions
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-6 pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Resource Manager DB */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Resource Manager DB Intro/Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                  <p className="text-gray-500">
                    Video: Resource Manager DB Overview
                  </p>
                </div>
                <p className="mb-4 text-gray-700">
                  Discover how Resource Manager DB provides comprehensive
                  database-driven resource management for complex manufacturing
                  scheduling needs.
                </p>
                <Link href="/resource-manager-db-2">
                  <Button>Learn More About Resource Manager DB</Button>
                </Link>
              </CardContent>
            </Card>

            {/*   Overview */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                  <p className="text-gray-500">
                    Video:   Overview
                  </p>
                </div>
                <p className="mb-4 text-gray-700">
                  See how   simplifies production
                  scheduling with powerful Excel-based tools.
                </p>
                <Link href="/workcenter-schedulerxl">
                  <Button>Learn More About  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Overview 1 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">Overview 1</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                  <p className="text-gray-500">Video: Product Overview 1</p>
                </div>
                <p className="mb-4 text-gray-700">
                  General overview of our manufacturing scheduling solutions and
                  how they work together.
                </p>
              </CardContent>
            </Card>

            {/*   Intro */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Intro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                  <p className="text-gray-500">
                    Video:   Introduction
                  </p>
                </div>
                <p className="mb-4 text-gray-700">
                  Introduction to the key features and capabilities of
                  .
                </p>
                <Link href="/workcenter-schedulerxl">
                  <Button>Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Resource Manager For Excel Intro */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Resource Manager For Excel Intro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                  <p className="text-gray-500">
                    Video: Resource Manager For Excel Introduction
                  </p>
                </div>
                <p className="mb-4 text-gray-700">
                  Learn about Resource Manager For Excel and its powerful MRP
                  and scheduling capabilities.
                </p>
                <Link href="/resource-manager-for-excel-2">
                  <Button>Learn More</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Overview 2 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">Overview 2</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                  <p className="text-gray-500">Video: Product Overview 2</p>
                </div>
                <p className="mb-4 text-gray-700">
                  Additional overview of our product suite and integration
                  capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Demo Section */}
      <section className="bg-gray-50 pb-8 pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Schedule a Live Demo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-center text-lg text-gray-700">
                  Want to see our solutions in action with your actual data?
                  Schedule a personalized demo today!
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact-us">
                    <Button
                      size="lg"
                      className="text-lg"
                    >
                      Request Demo
                    </Button>
                  </Link>
                  <Link href="mailto:us@usersolutions.com">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg"
                    >
                      Email Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Resource Manager Videos Link */}
      <section className="pb-8 pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Resource Manager for Excel: Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-wrap gap-4">
                  <Link href="/resource-manager-for-excel-2">
                    <Button variant="outline">Summary</Button>
                  </Link>
                  <Link href="/resource-manager-for-excel-in-depth">
                    <Button variant="outline">In Depth</Button>
                  </Link>
                  <Link href="/pdf/RMXQuickStart.pdf">
                    <Button variant="outline">Quick Start</Button>
                  </Link>
                  <Link href="/contact-us">
                    <Button variant="outline">Live Demo</Button>
                  </Link>
                  <Link href="/videos">
                    <Button>Videos</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-gray-50 pb-6 pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-6 text-3xl font-bold">
              Celebrating 25 Years of Award Winning Software!
            </h2>
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <p className="mb-4 text-gray-600">
                Trusted by manufacturers worldwide for over 25 years
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 opacity-70">
                <div className="text-sm font-semibold text-gray-500">
                  Industry Awards
                </div>
                <div className="text-sm font-semibold text-gray-500">
                  Excellence Recognition
                </div>
                <div className="text-sm font-semibold text-gray-500">
                  Customer Choice
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
