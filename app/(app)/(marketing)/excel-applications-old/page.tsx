import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExcelApplicationsOldPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6 rounded-lg border-2 border-yellow-400 bg-yellow-100 p-4">
              <p className="font-semibold text-yellow-800">
                📢 This is an archived version. View the{' '}
                <Link
                  href="/excel-applications"
                  className="text-yellow-900 underline"
                >
                  latest Excel Applications page
                </Link>
              </p>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Excel Applications
            </h1>
            <p className="mb-6 text-xl text-muted-foreground">
              Choose the product that best suits your company's needs by using
              our product matrix
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/product-downloads">
                <Button
                  size="lg"
                  className="text-lg"
                >
                  Free Trial & Sample
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Matrix */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* All products in simple card format */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="bg-blue-50">
                  <CardTitle>Spreadsheet Scheduler</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Single User: $39 | Five Users: $78
                  </p>
                  <Link href="/spreadsheet-scheduler">
                    <Button className="w-full">Info/Buy</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-purple-50">
                  <CardTitle>Spreadsheet QC</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Single User: $39 | Five Users: $78
                  </p>
                  <Link href="/spreadsheet-qc">
                    <Button className="w-full">Info/Buy</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-green-50">
                  <CardTitle>Workcell Planner</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Single User: $39 | Five Users: $78
                  </p>
                  <Link href="/workcell-planner">
                    <Button className="w-full">Info/Buy</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-orange-50">
                  <CardTitle>Operations Manager</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Single User: $5-$39 | Five Users: $10-$78
                  </p>
                  <Link href="/operations-manager">
                    <Button className="w-full">Info/Buy</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-indigo-50">
                  <CardTitle>Workcenter for XL</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Single User: $5-$39 | Five Users: $10-$78
                  </p>
                  <Link href="/workcenter-schedulerxl">
                    <Button className="w-full">Info/Buy</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-teal-50">
                  <CardTitle>Resource Manager for Excel</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Single User: $5-$39 | Five Users: $10-$78
                  </p>
                  <Link href="/resource-manager-for-excel-2">
                    <Button className="w-full">Info/Buy</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50  py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-2 font-semibold text-slate-900">
                    "Best choice for MRP and project management software"
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    – Sleepmaster Ltd
                  </p>
                  <Link href="/sleepmaster-ltd">
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="mb-2 font-semibold text-slate-900">
                    "Manufacturing scheduling software with fantastic support"
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    – Cook Compression
                  </p>
                  <Link href="/cook-compression">
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="mb-2 font-semibold text-slate-900">
                    "Easy ERP add-on for manufacturing resource planning"
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    – Incon Incorporated
                  </p>
                  <Link href="/incon-incorporate">
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Card>
              <CardContent className="pt-8">
                <h2 className="mb-4 text-2xl font-bold">
                  Want to get your production in the groove?
                </h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  Watch this classic video and get your operations movin' and
                  groovin' today!
                </p>
                <Link href="/videos">
                  <Button size="lg">Watch Videos</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
