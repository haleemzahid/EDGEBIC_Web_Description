/**
 * Example Contact Page
 *
 * This is an example of how to use the HubSpot contact form
 * in your Next.js pages.
 *
 * Usage:
 * 1. Copy this file to app/(marketing)/contact/page.tsx
 * 2. Customize the text and styling
 * 3. Deploy!
 */

import { HubSpotContactForm } from '@/components/marketing/hubspot-contact-form';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto max-w-4xl">
        {/* Hero Section */}
        <div className="mb-6 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            Have a question or want to learn more? Fill out the form below and
            our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <HubSpotContactForm />
          </div>

          {/* Contact Info (Optional) */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">
                Other Ways to Reach Us
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <svg
                      className="size-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">
                      hello@yourcompany.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <svg
                      className="size-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <svg
                      className="size-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-muted-foreground">
                      123 Business St.
                      <br />
                      Suite 100
                      <br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/50 p-6">
              <h3 className="mb-2 font-semibold">Business Hours</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="rounded-lg border bg-primary/5 p-6">
              <h3 className="mb-2 font-semibold">Looking for Support?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                For technical support and account issues, please visit our help
                center.
              </p>
              <a
                href="/support"
                className="text-sm font-medium text-primary hover:underline"
              >
                Go to Help Center →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
