import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function TestPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full px-3 text-sm font-medium shadow-sm"
            >
              TEST PAGE
            </Badge>
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
              Test Page
            </h1>
            <p className="text-xl text-muted-foreground">
              This is a test page for design and layout verification
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Used for testing new features, components, and styling before
              deployment
            </p>
          </div>
        </div>
      </section>

      {/* Awards Banner - AT THE END */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h3>
                <div className="flex justify-center">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    className="h-auto w-full max-w-full rounded-lg shadow-md"
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
