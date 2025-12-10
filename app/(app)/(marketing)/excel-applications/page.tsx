import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExcelApplicationsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-6 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Badge
              variant="outline"
              className="mb-4 h-8 rounded-full border-green-600/30 px-3 text-sm font-medium text-green-700 shadow-sm dark:border-white/30 dark:bg-white/10 dark:text-white"
            >
              Excel-Based Solutions
            </Badge>
            <h1 className="mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Excel Applications
            </h1>
            <p className="mb-6 text-xl text-gray-700 dark:text-gray-300">
              Choose the product that best suits your company's needs by using
              our product matrix
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/product-downloads">
                <Button
                  size="lg"
                  className="text-lg"
                >
                  Free Trial & Samples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Matrix */}
      <section className="py-6">
        <div className="mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Spreadsheet QC */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl dark:text-white">
                      Spreadsheet QC
                    </CardTitle>
                    <span className="text-3xl">📈</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-2 text-sm font-semibold dark:text-gray-300">
                          Single User
                        </h3>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                          $39
                        </p>
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-semibold dark:text-gray-300">
                          Five Users
                        </h3>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                          $78
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/spreadsheet-qc"
                      className="block w-full"
                    >
                      <Button
                        size="lg"
                        className="w-full"
                      >
                        Info/Buy
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Workcell Planner */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl dark:text-white">
                      Workcell Planner
                    </CardTitle>
                    <span className="text-3xl">🏭</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-2 text-sm font-semibold dark:text-gray-300">
                          Single User
                        </h3>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                          $39
                        </p>
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-semibold dark:text-gray-300">
                          Five Users
                        </h3>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                          $78
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/workcell-planner"
                      className="block w-full"
                    >
                      <Button
                        size="lg"
                        className="w-full"
                      >
                        Info/Buy
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Operations Manager */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl dark:text-white">
                      Operations Manager
                    </CardTitle>
                    <span className="text-3xl">⚙️</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-2 text-sm font-semibold dark:text-gray-300">
                          Single User
                        </h3>
                        <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                          $5-$39
                        </p>
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-semibold dark:text-gray-300">
                          Five Users
                        </h3>
                        <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                          $10-$78
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/operations-manager"
                      className="block w-full"
                    >
                      <Button
                        size="lg"
                        className="w-full"
                      >
                        Info/Buy
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Workcenter for XL */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl dark:text-white">
                      Workcenter for XL
                    </CardTitle>
                    <span className="text-3xl">📅</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-2 text-sm font-semibold dark:text-gray-300">
                          Single User
                        </h3>
                        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                          $5-$39
                        </p>
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-semibold dark:text-gray-300">
                          Five Users
                        </h3>
                        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                          $10-$78
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/workcenter-schedulerxl"
                      className="block w-full"
                    >
                      <Button
                        size="lg"
                        className="w-full"
                      >
                        Info/Buy
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Resource Manager for Excel */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl dark:text-white">
                      Resource Manager for Excel
                    </CardTitle>
                    <span className="text-3xl">📊</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-2 text-sm font-semibold dark:text-gray-300">
                          Single User
                        </h3>
                        <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                          $5-$39
                        </p>
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-semibold dark:text-gray-300">
                          Five Users
                        </h3>
                        <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                          $10-$78
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/resource-manager-for-excel-2"
                      className="block w-full"
                    >
                      <Button
                        size="lg"
                        className="w-full"
                      >
                        Info/Buy
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 pb-8 pt-6 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    "Best choice for MRP and project management software"
                  </p>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    – Sleepmaster Ltd
                  </p>
                  <Link href="/sleepmaster-ltd">
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    "Manufacturing scheduling software with fantastic support"
                  </p>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    – Cook Compression
                  </p>
                  <Link href="/cook-compression">
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    "Easy ERP add-on for manufacturing resource planning"
                  </p>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
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
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Card>
              <CardContent className="pt-8">
                <h2 className="mb-4 text-3xl font-bold dark:text-white">
                  Want to get your production in the groove?
                </h2>
                <p className="mb-6 text-xl text-gray-700 dark:text-gray-300">
                  Watch this classic video and get your operations movin' and
                  groovin' today!
                </p>
                <Link href="/videos">
                  <Button
                    size="lg"
                    className="text-lg"
                  >
                    Watch Videos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h3>
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
                  className="mx-auto h-auto max-w-full"
                  unoptimized
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
