'use client';

import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { NTClipboardToolBox } from '@/components/marketing/sections/ntclipboard-toolbox';

import { Card, CardContent } from '@/components/ui/card';
import { Routes } from '@/constants/routes';
import { createTitle } from '@/lib/utils';

export default function ProductDownloadsPage(): React.JSX.Element {
  return (
    <>
      <Head>
        <title>{createTitle('Product Downloads')}</title>
        <meta
          name="description"
          content="Download User Solutions production scheduling software including EDGEBIC, Resource Manager DB, EDGEBIC, and Excel applications. Free trials and samples available."
        />
      </Head>
      <div className="container mx-auto px-4 pt-6">
        {/* Product Downloads Badge */}
        <div className="mx-auto mb-4 flex items-center justify-center">
        </div>

        {/* Header Section */}
        <div className="mb-6 text-center">
          <h1 className="mb-6 text-4xl font-bold">
            Production Scheduling Products
          </h1>
          <div className="mt-6">
            <Link
              href={Routes.ExcelTemplates}
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Excel Products →
            </Link>
          </div>
        </div>

        {/* Download Instructions */}
        <div className="mb-6 rounded-lg bg-yellow-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-yellow-800">
            NOTE ON DOWNLOADS:
          </h3>
          <p className="text-yellow-700">
            Every Download Now (.zip) gives you two options – save or open. We
            recommend that you select open, then extract the setup file for WCXL
            or RMX to the directory of your choice (or just downloads). Then run
            the setup file for WCXL or RMX. Use desktop shortcut or simply run
            Excel to open the files, enabling macros if prompted. The Sample
            column provides working versions of the analysis techniques.
          </p>
        </div>

        {/* Main Products Section */}
        <NTClipboardToolBox />

        {/* Excel Products Section */}
        <section className='mt-6'>
          <h2 className=" mb-6 text-center text-3xl font-semibold">
            Excel Products
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full rounded-lg border bg-white shadow-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Product
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Information
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-3">
                    <span className="font-medium text-gray-900">Spreadsheet Scheduler</span>
                    <span className="ml-2 font-bold text-green-600">Free</span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link href="/spreadsheet-scheduler" className="rounded bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700">Info</Link>
                      <Link href={Routes.Contact} className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">Request Free</Link>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3">
                    <span className="font-medium text-gray-900">Workcell Planner</span>
                    <span className="ml-2 font-bold text-green-600">Free</span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link href="/workcell-planner" className="rounded bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700">Info</Link>
                      <Link href={Routes.Contact} className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">Request Free</Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3">
                    <span className="font-medium text-gray-900">Operations Manager</span>
                    <span className="ml-2 font-bold text-green-600">Free</span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link href="/operations-manager" className="rounded bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700">Info</Link>
                      <Link href={Routes.Contact} className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">Request Free</Link>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3">
                    <span className="font-medium text-gray-900">Spreadsheet QC</span>
                    <span className="ml-2 font-bold text-green-600">Free</span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link href="/spreadsheet-qc" className="rounded bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700">Info</Link>
                      <Link href={Routes.Contact} className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">Request Free</Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3">
                    <span className="font-medium text-gray-900">Resource Manager for Excel</span>
                    <span className="ml-2 font-bold text-green-600">Free</span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link href="/resource-manager-for-excel-2" className="rounded bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700">Info</Link>
                      <Link href={Routes.Contact} className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700">Request Free</Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/security-guide"
              className="text-blue-600 hover:text-blue-800"
            >
              Note on Running Excel Downloads →
            </Link>
          </div>
        </section>

        {/* Awards Section */}
        <section className="pt-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-8 text-center">
                  <h3 className="mb-6 text-2xl font-bold text-slate-900">
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
    </>
  );
}
