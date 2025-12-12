import React from 'react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BuyNowWXLPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
              <Badge
                variant="outline"
                className="h-8 rounded-full border-white/20 bg-white/10 px-3 text-sm font-medium text-white shadow-sm"
              >
                BUY NOW
              </Badge>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              - Request Free Product
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
              <p className="text-lg leading-relaxed text-muted-foreground">
                (WCXL) is an Excel based simple
                scheduler for getting visibility on workcenter loading to ship
                on time. Check out the videos for a quick overview, then
                download the fully functional trial or — better yet, simply
                schedule a live demo, customized with your sample data, and let
                us review your application needs.
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
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
      <section className="pb-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-blue-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <div className="w-full max-w-4xl">
                  <Image
                    alt="Collection of industry and business awards logos"
                    className="h-auto w-full"
                    height={128}
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    width={1024}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
