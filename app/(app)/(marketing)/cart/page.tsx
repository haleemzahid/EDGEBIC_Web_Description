import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 py-6 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-4xl font-bold">Shopping Cart</h1>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-7xl">
          {/* Empty Cart State */}
          <div className="rounded-lg bg-gray-50 p-12 text-center">
            <div className="mb-6">
              <svg
                className="mx-auto size-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9M7 13h10m0 0v9a2 2 0 01-2 2H9a2 2 0 01-2-2v-9m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4"
                />
              </svg>
            </div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Your cart is empty
            </h2>
            <p className="mb-6 text-gray-600">
              Browse our products and add items to your cart to get started.
            </p>
            <div className="space-y-4">
              <Link
                href="/shop"
                className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-white transition-colors hover:bg-blue-700"
              >
                Continue Shopping
              </Link>
              <div className="text-sm text-gray-500">
                <Link
                  href="/product-downloads"
                  className="text-blue-600 hover:underline"
                >
                  Download Free Trials & Samples
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Products */}
          <div className="mt-6">
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
              Featured Products
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/09/excelicon.png"
                  alt="Excel icon"
                  width={48}
                  height={48}
                  className="mx-auto mb-4"
                />
                <h4 className="mb-2 text-center text-lg font-semibold">
                  Spreadsheet Scheduler
                </h4>
                <p className="mb-4 text-center text-sm text-gray-600">
                  Simple scheduling solution for small teams
                </p>
                <div className="text-center">
                  <p className="mb-4 text-2xl font-bold text-blue-600">$39</p>
                  <Link
                    href="/spreadsheet-scheduler"
                    className="block rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/09/excelicon.png"
                  alt="Excel icon"
                  width={48}
                  height={48}
                  className="mx-auto mb-4"
                />
                <h4 className="mb-2 text-center text-lg font-semibold">
                  Resource Manager
                </h4>
                <p className="mb-4 text-center text-sm text-gray-600">
                  Advanced resource planning and management
                </p>
                <div className="text-center">
                  <p className="mb-4 text-2xl font-bold text-blue-600">
                    $5-$39
                  </p>
                  <Link
                    href="/resource-manager-for-excel-2"
                    className="block rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/09/excelicon.png"
                  alt="Excel icon"
                  width={48}
                  height={48}
                  className="mx-auto mb-4"
                />
                <h4 className="mb-2 text-center text-lg font-semibold">
                  Operations Manager
                </h4>
                <p className="mb-4 text-center text-sm text-gray-600">
                  Comprehensive operations management tools
                </p>
                <div className="text-center">
                  <p className="mb-4 text-2xl font-bold text-blue-600">
                    $5-$39
                  </p>
                  <Link
                    href="/operations-manager"
                    className="block rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
                  className="mx-auto h-auto max-w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
