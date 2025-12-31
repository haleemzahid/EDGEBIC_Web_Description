import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function JobSchedulerLiteDownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              EDGEBIC Download
            </h1>
            <p className="text-xl">60 day fully functional trial</p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-6 py-4">
            <Link
              href="/jsl-job-scheduler-lite"
              className="font-medium text-gray-600 hover:text-blue-600"
            >
              Summary
            </Link>
            <Link
              href="/jsl-job-scheduler-lite-in-depth"
              className="font-medium text-gray-600 hover:text-blue-600"
            >
              In Depth
            </Link>
            <span className="border-b-2 border-blue-600 font-medium text-blue-600">
              Download Now
            </span>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">
                <a
                  href="https://www.usersolutions.com/wp-content/uploads/2022/10/JSLsetup.zip"
                  className="text-blue-600 hover:underline"
                >
                  EDGEBIC Download
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="mb-4 text-lg">
                  <strong>System Requirements:</strong> Excel installed (used as
                  report writer).
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mb-6"
                >
                  <a
                    href="https://www.usersolutions.com/wp-content/uploads/2022/10/JSLsetup.zip"
                    download
                  >
                    <Download className="mr-2 size-5" />
                    Download JSL Setup
                  </a>
                </Button>
              </div>

              {/* Form Section */}
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="mb-4 text-center font-medium">
                  Please fill the form to go to download link page.
                </p>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstname"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastname"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="companyname"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyname"
                      name="companyname"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Send
                  </button>
                </form>
              </div>

              {/* Installation Instructions */}
              <div className="mt-8 space-y-4 text-lg">
                <h3 className="text-2xl font-bold">
                  Installation Instructions:
                </h3>

                <p>
                  Then, download and install JSLsetup.exe this installs to
                  C:\ProgramFiles In this part of installation, it checks to see
                  your current .Net framework and stops until you upgrade to
                  more current .Net framework (this is automatically installed
                  with windows 10 so you are probably fine.
                </p>

                <p>
                  At the end of installing JSL the system will automatically run
                  and add shortcut to desktop. There will be sample data in JSL
                  preloaded but you will be able to edit, add, delete directly
                  and/or use data import to configure JSL. That is what the
                  ImportsBack.xlsx is for, showing you the format for creating
                  and importing content quickly.
                </p>

                <Image
                  src="/images/Edgebic/2022-10/blck.png"
                  alt="Screenshot of EDGEBIC folder with files"
                  width={800}
                  height={600}
                  className="my-6 h-auto w-full rounded-lg shadow-md"
                  loading="lazy"
                />

                <p>The database will default to C:\ProgramData\EDGEBIC</p>

                <p>
                  The third file is an Excel file for quickly loading data. That
                  can be saved anywhere you choose. Also, you can save the
                  database (or you might have more than one anywhere you have
                  read write access to).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Awards Banner */}
      <section className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-6 text-3xl font-bold">
              CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
            </h2>
            <Image
              src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
              alt="Collection of industry and business awards logos"
              width={1024}
              height={128}
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
