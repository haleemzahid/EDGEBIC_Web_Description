import * as React from 'react';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Routes } from '@/constants/routes';

export default function NavigationDemoPage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs className="mb-4 text-white/80" />
          <h1 className="mb-4 text-4xl font-bold">Navigation Demo Page</h1>
          <p className="text-xl">
            Scroll down to see all the navigation features in action!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>✨ Navigation Features Implemented</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">📊 Scroll Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Look at the blue bar at the top of the page - it shows your
                    reading progress!
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">⬆️ Back to Top</h3>
                  <p className="text-sm text-muted-foreground">
                    Scroll down 300px and you'll see a button appear in the
                    bottom-right corner.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">📞 Floating CTA</h3>
                  <p className="text-sm text-muted-foreground">
                    On desktop, scroll down 500px to see phone and contact
                    buttons appear.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">🍞 Breadcrumbs</h3>
                  <p className="text-sm text-muted-foreground">
                    See the breadcrumb navigation at the top showing your
                    current location.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">🔗 Smooth Links</h3>
                  <p className="text-sm text-muted-foreground">
                    All navigation links have smooth page transitions with
                    fade-in/out effects.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">📱 Responsive</h3>
                  <p className="text-sm text-muted-foreground">
                    Everything works beautifully on mobile, tablet, and desktop
                    devices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔗 Test Navigation Links</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Click these links to experience smooth page transitions:
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={Routes.Root}>
                  <Button variant="default">Home</Button>
                </Link>
                <Link href={Routes.About}>
                  <Button variant="outline">About Us</Button>
                </Link>
                <Link href={Routes.Features}>
                  <Button variant="outline">Features</Button>
                </Link>
                <Link href={Routes.Contact}>
                  <Button variant="outline">Contact</Button>
                </Link>
                <Link href={Routes.JobSchedulerLite}>
                  <Button variant="outline">Products</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Spacer content to enable scrolling */}
          <div className="space-y-8 py-6">
            <h2 className="text-2xl font-bold">
              Scroll Down to See More Features
            </h2>
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Section {i}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This is demo content to enable scrolling. Keep scrolling to
                    see the Back to Top button and Floating CTA buttons appear!
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    Notice the blue progress bar at the top growing as you
                    scroll down. This gives users a visual indication of how far
                    they've scrolled through the page.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    All these features combine to create a smooth, professional
                    navigation experience similar to usersolutions.com and other
                    modern web applications.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-blue-600 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-900">
                🎉 Congratulations!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">
                Your EDGEBIC project now has a complete, smooth navigation
                system! Check the NAVIGATION_GUIDE.md file for detailed usage
                instructions and customization options.
              </p>
              <div className="mt-4">
                <Link href={Routes.Root}>
                  <Button
                    variant="default"
                    size="lg"
                  >
                    Return to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
