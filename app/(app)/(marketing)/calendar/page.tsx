'use client';

import React from 'react';
import { InlineWidget } from 'react-calendly';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CalendarPage() {
  return (
    <div className="min-h-screen">
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Schedule a Meeting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Book a time that works best for you. We're excited to discuss
                  how we can help streamline your production planning and
                  scheduling processes.
                </p>

                {/* Calendly Inline Widget */}
                <div className="min-h-[700px]">
                  <InlineWidget
                    url="https://calendly.com/mudasirnadeem7979/30min"
                    styles={{
                      height: '700px',
                      width: '100%'
                    }}
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
