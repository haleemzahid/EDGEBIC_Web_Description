import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { NTClipboardToolBox } from '@/components/marketing/sections/ntclipboard-toolbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ProductDownloads3Page() {
  const products = [
    {
      name: 'Spreadsheet Scheduler',
      href: '/spreadsheet-scheduler',
      trial: 'Free',
      downloadHref: '#'
    },
    {
      name: 'Workcell Planner',
      href: '/workcell-planner',
      trial: 'Free',
      downloadHref: '#'
    },
    {
      name: 'Operations Manager',
      href: '/operations-manager',
      trial: 'Free',
      downloadHref: '/operations-manager',
      downloadLabel: 'View Doc'
    },
    {
      name: 'Spreadsheet QC',
      href: '/spreadsheet-qc',
      trial: 'Free',
      downloadHref: '#'
    },
    {
      name: 'Resource Manager for Excel',
      href: '/resource-manager-for-excel-2',
      trial: 'Free',
      downloadHref: '#'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold">Production Scheduling Products</h1>
          <p className="text-lg text-muted-foreground">
            Free trials and samples for all our production planning and scheduling solutions
          </p>
        </div>
      </section>

      {/* Download Note */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <p className="text-muted-foreground">
            <strong>NOTE ON DOWNLOADS:</strong> Every Download Now (.zip) gives
            you two options – save or open. We recommend that you select open,
            then extract the setup file to the directory of your choice. Use
            desktop shortcut or simply run Excel to open the files, enabling
            macros if prompted.
          </p>
        </div>
      </section>

      {/* Product Cards */}
      <NTClipboardToolBox />

      {/* Other Products Section */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-center text-3xl font-bold">Other Products</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left font-semibold">Product</th>
                  <th className="border p-3 text-center font-semibold">Trial</th>
                  <th className="border p-3 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.name}
                    className="hover:bg-gray-50"
                  >
                    <td className="border p-3">
                      <Link
                        href={product.href}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td className="border p-3 text-center font-semibold">
                      {product.trial}
                    </td>
                    <td className="border p-3 text-center">
                      <div className="flex flex-wrap justify-center gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={product.downloadHref}>
                            {product.downloadLabel || 'Download'}
                          </Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href="/contact-us">Request Free</Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Awards Banner */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
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
                unoptimized
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
