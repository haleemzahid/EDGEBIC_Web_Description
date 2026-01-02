import React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function TestPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
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
    </div>
  );
}
