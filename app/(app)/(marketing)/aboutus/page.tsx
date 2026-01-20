import Link from 'next/link';
import type { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about User Solutions, Inc. - providers of production planning and scheduling software solutions since 1991.'
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              About User Solutions, Inc.
            </h1>
            <p className="mb-6 text-xl text-gray-700">
              Manufacturing software made easy
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="mailto:us@usersolutions.com">
                <Button
                  size="lg"
                  className="text-lg"
                >
                  Contact Us: us@usersolutions.com
                </Button>
              </Link>
              <Link href="tel:248.486.6365">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg"
                >
                  Call: 248.486.6365
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-lg leading-relaxed text-gray-700">
                  At User Solutions, Inc., we specialize in creating powerful,
                  user-friendly manufacturing software that simplifies complex
                  production planning and scheduling challenges. Since 1991,
                  we've been dedicated to making manufacturing software easy to
                  use and implement.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Email</h3>
                    <Link
                      href="mailto:us@usersolutions.com"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      us@usersolutions.com
                    </Link>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Phone</h3>
                    <Link
                      href="tel:248.486.6365"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      248.486.6365
                    </Link>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Location</h3>
                    <p className="text-gray-700">South Lyon, Michigan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Our Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Link
                      href="/jsl-job-scheduler-lite"
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                    >
                      EDGEBIC
                    </Link>
                    <p className="mt-2 text-gray-700">
                      Comprehensive job scheduling solution for manufacturing
                      operations
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/resource-manager-db-2"
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Resource Manager DB
                    </Link>
                    <p className="mt-2 text-gray-700">
                      Database-driven resource management for complex scheduling
                      needs
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/edgebi"
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                    >
                      EDGEBIC
                    </Link>
                    <p className="mt-2 text-gray-700">
                      Business intelligence and analytics for manufacturing
                      operations
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/excel-applications"
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Excel Applications
                    </Link>
                    <p className="mt-2 text-gray-700">
                      Powerful Excel-based tools for production planning and
                      quality control
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Choose User Solutions?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span className="text-gray-700">
                      Over 30 years of experience in manufacturing software
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span className="text-gray-700">
                      Award-winning solutions trusted by manufacturers worldwide
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span className="text-gray-700">
                      User-friendly interfaces that require minimal training
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span className="text-gray-700">
                      Dedicated customer support and implementation assistance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span className="text-gray-700">
                      Affordable solutions for businesses of all sizes
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-6 text-3xl font-bold">
              Celebrating 25 Years of Award Winning Software!
            </h2>
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <p className="mb-4 text-gray-600">
                Recognized by industry leaders for excellence in manufacturing
                software
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
