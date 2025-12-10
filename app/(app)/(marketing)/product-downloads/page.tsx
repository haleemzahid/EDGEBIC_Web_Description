'use client';

import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { NTClipboardToolBox } from '@/components/marketing/sections/ntclipboard-toolbox';
import { Badge } from '@/components/ui/badge';
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
          <Badge
            variant="outline"
            className="h-8 rounded-full px-3 text-sm font-medium shadow-sm dark:border-white/30 dark:bg-white/10 dark:text-white"
          >
            Product Downloads
          </Badge>
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
        <div className="mb-6 rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20">
          <h3 className="mb-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
            NOTE ON DOWNLOADS:
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300">
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
            <table className="w-full rounded-lg border bg-white shadow-lg dark:bg-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Product
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Information
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <tr>
                  <td className="px-6 py-4">
                    <details className="group">
                      <summary className="flex cursor-pointer items-center gap-2 font-medium text-gray-900 hover:text-blue-600 dark:text-white">
                        <span className="text-sm transition-transform group-open:rotate-90">
                          ▶
                        </span>
                        <div className="flex-1">
                          <div className="font-medium">
                            Spreadsheet Scheduler
                          </div>
                          <div className="text-2xl font-bold text-green-600">
                            Free
                          </div>
                        </div>
                      </summary>
                      <div className="mt-2 pl-6 text-sm text-gray-600 dark:text-gray-400">
                        The Spreadsheet Scheduler contains ready-to-use,
                        practical models for Project Management, Scheduling
                        Customer Jobs and Employees, Generating Calendars and
                        Gantt Charts.
                      </div>
                    </details>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/spreadsheet-scheduler"
                        className="rounded bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
                      >
                        Information
                      </Link>
                      <Link
                        href={Routes.Contact}
                        className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                      >
                        Request Free Product
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <td className="px-6 py-4">
                    <details className="group">
                      <summary className="flex cursor-pointer items-center gap-2 font-medium text-gray-900 hover:text-blue-600 dark:text-white">
                        <span className="text-sm transition-transform group-open:rotate-90">
                          ▶
                        </span>
                        <div className="flex-1">
                          <div className="font-medium">Workcell Planner</div>
                          <div className="text-2xl font-bold text-green-600">
                            Free
                          </div>
                        </div>
                      </summary>
                      <div className="mt-2 pl-6 text-sm text-gray-600 dark:text-gray-400">
                        Single cell capacity planning for machine shops and
                        fabricators. Allows easy what if analysis of the
                        interaction of setup time, lot size, efficiency,
                        operation yield, and work practices. Allows analysis of
                        flow with multiple setups per part vs. batch and the
                        payoff on throughput of set up reduction results.
                      </div>
                    </details>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/workcell-planner"
                        className="rounded bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
                      >
                        Information
                      </Link>
                      <Link
                        href={Routes.Contact}
                        className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                      >
                        Request Free Product
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <details className="group">
                      <summary className="flex cursor-pointer items-center gap-2 font-medium text-gray-900 hover:text-blue-600 dark:text-white">
                        <span className="text-sm transition-transform group-open:rotate-90">
                          ▶
                        </span>
                        <div className="flex-1">
                          <div className="font-medium">Operations Manager</div>
                          <div className="text-2xl font-bold text-green-600">
                            Free
                          </div>
                        </div>
                      </summary>
                      <div className="mt-2 pl-6 text-sm text-gray-600 dark:text-gray-400">
                        Dozens of templates for Forecasting, Inventory
                        Management, MRP, Production Planning, Quality Control
                        and many more.
                      </div>
                    </details>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/operations-manager"
                        className="rounded bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
                      >
                        Information
                      </Link>
                      <Link
                        href={Routes.Contact}
                        className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                      >
                        Request Free Product
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <td className="px-6 py-4">
                    <details className="group">
                      <summary className="flex cursor-pointer items-center gap-2 font-medium text-gray-900 hover:text-blue-600 dark:text-white">
                        <span className="text-sm transition-transform group-open:rotate-90">
                          ▶
                        </span>
                        <div className="flex-1">
                          <div className="font-medium">Spreadsheet QC</div>
                          <div className="text-2xl font-bold text-green-600">
                            Free
                          </div>
                        </div>
                      </summary>
                      <div className="mt-2 pl-6 text-sm text-gray-600 dark:text-gray-400">
                        Spreadsheet QC makes statistical process and quality
                        control more accessible by automating the main
                        techniques in a familiar form, the spreadsheet.
                      </div>
                    </details>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/spreadsheet-qc"
                        className="rounded bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
                      >
                        Information
                      </Link>
                      <Link
                        href={Routes.Contact}
                        className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                      >
                        Request Free Product
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <details className="group">
                      <summary className="flex cursor-pointer items-center gap-2 font-medium text-gray-900 hover:text-blue-600 dark:text-white">
                        <span className="text-sm transition-transform group-open:rotate-90">
                          ▶
                        </span>
                        <div className="flex-1">
                          <div className="font-medium">
                            Resource Manager for Excel
                          </div>
                          <div className="text-2xl font-bold text-green-600">
                            Free
                          </div>
                        </div>
                      </summary>
                      <div className="mt-2 pl-6 text-sm text-gray-600 dark:text-gray-400">
                        Comprehensive resource management solution built for
                        Excel, providing advanced planning and tracking
                        capabilities for manufacturing operations.
                      </div>
                    </details>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/resource-manager-for-excel-2"
                        className="rounded bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
                      >
                        Information
                      </Link>
                      <Link
                        href={Routes.Contact}
                        className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                      >
                        Request Free Product
                      </Link>
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
    </>
  );
}
