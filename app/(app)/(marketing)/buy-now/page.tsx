import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BuyNowPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Request Free Product
            </h1>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Gantt Charting and Project Management Customizable Templates for
                all versions of Excel (including the expansive 2007+ and tablet
                supporting Office 365). Low cost and easy-to-use spreadsheet
                templates for Project Management, Simple Production Planning and
                Scheduling, Critical Path Method (CPM), Critical Path Analysis,
                Customer Job Scheduling, Generating Calendars and Gantt Charts
                with hourly, daily or weekly time buckets. Excel 2007+ expanded
                rows and columns enable the user to manage larger projects for
                any duration as well as Cloud based Office 365 for easy sharing.
              </p>

              {/* Contact Form Section */}
              <div className="mt-8 rounded-lg bg-gray-50 p-6">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
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

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
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
            </CardContent>
          </Card>
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
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  className="mx-auto h-auto max-w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
