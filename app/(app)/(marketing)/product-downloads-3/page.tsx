import React from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductDownloads3Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Production Scheduling Products
            </h1>
          </div>
        </div>
      </section>

      {/* Download Note */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed">
                <strong>NOTE ON DOWNLOADS:</strong> Every Download Now (.zip)
                gives you two options – save or open. We recommend that you
                select open, then extract the setup file for WCXL or RMX to the
                directory of your choice (or just downloads). Then run the setup
                file for WCXL or RMX. Use desktop shortcut or simply run Excel
                to open the files, enabling macros if prompted. The Sample
                column provides working versions of the analysis techniques.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Product Tiers */}
      <section className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Starter Tier */}
              <Card className="relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/10/starter.png"
                    alt="Silver banner with $1000 text"
                    className="h-16"
                  />
                </div>
                <CardHeader className="pt-12">
                  <CardTitle className="text-center">
                    <p className="mb-2 text-sm text-gray-600">Starter</p>
                    <h3 className="text-2xl font-bold">EDGEBIC</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="mb-4 text-xl font-semibold">30-Day Trial</p>
                    <div className="space-y-3">
                      <Button
                        asChild
                        className="w-full"
                      >
                        <Link href="/job-scheduler-lite-download">
                          <Download className="mr-2 size-4" />
                          Download Now
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full"
                      >
                        <Link href="/contact-us">Request Live Demo</Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full"
                      >
                        <Link href="/jsl-job-scheduler-lite">Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Tier */}
              <Card className="relative border-2 border-blue-600">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/11/advanced-1.png"
                    alt="Blue banner indicating over $5000 savings or cost"
                    className="h-16"
                  />
                </div>
                <CardHeader className="pt-12">
                  <CardTitle className="text-center">
                    <p className="mb-2 text-sm text-gray-600">Advanced</p>
                    <h3 className="text-2xl font-bold">Resource Manager DB</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="mb-4 text-xl font-semibold">30-Day Trial</p>
                    <div className="space-y-3">
                      <Button
                        asChild
                        className="w-full"
                      >
                        <Link href="/contact-us">
                          <Download className="mr-2 size-4" />
                          Download Now
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full"
                      >
                        <Link href="/contact-us">Request Live Demo</Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full"
                      >
                        <Link href="/resource-manager-db-2">Learn More</Link>
                      </Button>
                    </div>
                    <p className="mt-4 text-lg font-semibold">
                      $5k+ Call us for Quote
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Tier */}
              <Card className="relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/11/Premium-1.png"
                    alt="Yellow price tag banner, $2500+ offer"
                    className="h-16"
                  />
                </div>
                <CardHeader className="pt-12">
                  <CardTitle className="text-center">
                    <p className="mb-2 text-sm text-gray-600">Premium</p>
                    <h3 className="text-2xl font-bold">
                      EDGEBIC (Bundled w/ RMDB)
                    </h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="mb-4 text-xl font-semibold">30-Day Trial</p>
                    <div className="space-y-3">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full"
                      >
                        <Link href="/contact-us">Request Live Demo</Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full"
                      >
                        <Link href="/edgebi">Learn More</Link>
                      </Button>
                    </div>
                    <p className="mt-4 text-lg font-semibold">
                      $5k+ Call us for Quote
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Other Products Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold">
              Other Products
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-4 text-left font-semibold">
                      Product
                    </th>
                    <th className="border p-4 text-center font-semibold">
                      30 Day Trials
                    </th>
                    <th className="border p-4 text-center font-semibold">
                      Sample
                    </th>
                    <th className="border p-4 text-center font-semibold">
                      Live Video
                    </th>
                    <th className="border p-4 text-center font-semibold">
                      Request Free Product
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Spreadsheet Scheduler */}
                  <tr className="hover:bg-gray-50">
                    <td className="border p-4">
                      <Link
                        href="/spreadsheet-scheduler"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Spreadsheet Scheduler
                      </Link>
                    </td>
                    <td className="border p-4 text-center">
                      <p className="font-semibold">Free</p>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-2"
                      >
                        <a href="#">Download</a>
                      </Button>
                    </td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">$39-$78</td>
                  </tr>

                  {/* Workcell Planner */}
                  <tr className="hover:bg-gray-50">
                    <td className="border p-4">
                      <Link
                        href="/workcell-planner"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Workcell Planner
                      </Link>
                    </td>
                    <td className="border p-4 text-center">
                      <p className="font-semibold">Free</p>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-2"
                      >
                        <a href="#">Download</a>
                      </Button>
                    </td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">$39-$78</td>
                  </tr>

                  {/* Operations Manager */}
                  <tr className="hover:bg-gray-50">
                    <td className="border p-4">
                      <Link
                        href="/operations-manager"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Operations Manager
                      </Link>
                    </td>
                    <td className="border p-4 text-center">
                      <p className="font-semibold">Free</p>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-2"
                      >
                        <Link href="/operations-manager">View Doc</Link>
                      </Button>
                    </td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">$5-$78</td>
                  </tr>

                  {/* Spreadsheet QC */}
                  <tr className="hover:bg-gray-50">
                    <td className="border p-4">
                      <Link
                        href="/spreadsheet-qc"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Spreadsheet QC
                      </Link>
                    </td>
                    <td className="border p-4 text-center">
                      <p className="font-semibold">Free</p>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-2"
                      >
                        <a href="#">Download</a>
                      </Button>
                    </td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">$39-$78</td>
                  </tr>

                  {/* Workcenter Scheduler XL */}
                  <tr className="hover:bg-gray-50">
                    <td className="border p-4">
                      <Link
                        href="/workcenter-schedulerxl"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Workcenter Scheduler XL
                      </Link>
                    </td>
                    <td className="border p-4 text-center">
                      <p>---------</p>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-2"
                      >
                        <a href="#">Download</a>
                      </Button>
                    </td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">$500</td>
                  </tr>

                  {/* Resource Manager for Excel */}
                  <tr className="hover:bg-gray-50">
                    <td className="border p-4">
                      <Link
                        href="/resource-manager-for-excel-2"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Resource Manager for Excel
                      </Link>
                    </td>
                    <td className="border p-4 text-center">
                      <p>---------</p>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-2"
                      >
                        <a href="#">Download</a>
                      </Button>
                    </td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">---------</td>
                    <td className="border p-4 text-center">$39-$78</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Banner */}
      <section className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-6 text-3xl font-bold">
              CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
            </h2>
            <img
              src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
              alt="Collection of industry and business awards logos"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
