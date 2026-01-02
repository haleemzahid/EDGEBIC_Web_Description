import * as React from 'react';
import Image from 'next/image';
import { QuoteIcon, StarIcon } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'John Manufacturing Co.',
    role: 'Production Manager',
    company: 'Automotive Parts Manufacturing',
    quote:
      'User Solutions transformed our production scheduling chaos into a smooth, predictable process. The RMDB system adapted perfectly to our existing workflows without forcing us to change everything.',
    rating: 5
  },
  {
    name: 'Sarah Chen',
    role: 'Operations Director',
    company: 'Electronics Assembly',
    quote:
      'After struggling with our ERP for years, EDGEBIC gave us the production planning tools we actually needed. The drag-and-drop scheduling saves us hours every week.',
    rating: 5
  },
  {
    name: 'Mike Rodriguez',
    role: 'Plant Manager',
    company: 'Custom Fabrication',
    quote:
      'What impressed us most was how quickly we saw results. Within weeks of implementation, our lead times improved and we eliminated most of our scheduling conflicts.',
    rating: 5
  }
];

const logos = [
  { name: 'Manufacturing Excellence Award', image: '/logos/award1.svg' },
  { name: 'Industry Leader 2024', image: '/logos/award2.svg' },
  { name: 'Best Production Software', image: '/logos/award3.svg' },
  { name: 'Customer Choice Award', image: '/logos/award4.svg' }
];

export function NTClipboardTestimonials(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines>
      <div className="container pt-6">
        <SiteHeading
          title="Trusted by Manufacturers Worldwide"
          description="See why production managers choose User Solutions for their scheduling challenges"
        />

        {/* Testimonials Grid */}
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                {/* Quote Icon */}
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                  <QuoteIcon className="size-6" />
                </div>

                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="size-4 fill-orange-400 text-orange-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mb-6 text-slate-700">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="border-t pt-4">
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm font-medium text-orange-600">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-6 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white md:p-12">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 text-4xl font-bold md:text-5xl">30+</div>
              <div className="text-orange-100">Years of Experience</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold md:text-5xl">500+</div>
              <div className="text-orange-100">Satisfied Customers</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold md:text-5xl">95%</div>
              <div className="text-orange-100">Customer Retention</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold md:text-5xl">24/7</div>
              <div className="text-orange-100">Support Available</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="mt-6 text-center">
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-4 text-2xl font-bold">
              Join Our Satisfied Customers
            </h3>
            <p className="mb-6 text-muted-foreground">
              Ready to transform your production scheduling? Let's discuss how
              EDGEBIC can solve your specific challenges.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="tel:248.486.6365"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 text-lg font-semibold text-white transition-all hover:from-orange-600 hover:to-red-600"
              >
                Schedule a Demo - 248.486.6365
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </GridSection>
  );
}
