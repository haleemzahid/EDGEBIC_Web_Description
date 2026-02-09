import * as React from 'react';

import { Footer } from '@/components/marketing/footer';
import { CookieBanner } from '@/components/marketing/fragments/cookie-banner';
import { Navbar } from '@/components/marketing/navbar';
import { DynamicBreadcrumbJsonLd } from '@/components/seo';
// import { AnnouncementBar } from '@/components/ui/announcement-bar';
// import { BackToTop } from '@/components/ui/back-to-top';
import { FloatingCTA } from '@/components/ui/floating-cta';
import { PageTransition } from '@/components/ui/page-transition';

export default function MarketingLayout(
  props: React.PropsWithChildren
): React.JSX.Element {
  return (
    <div>
      <DynamicBreadcrumbJsonLd />
      {/* Uncomment to enable announcement bar */}
      {/* <AnnouncementBar /> */}
      <Navbar />
      <main id="main-content">
        <PageTransition>{props.children}</PageTransition>
      </main>
      <Footer />
      <CookieBanner />
      {/* <BackToTop /> */}
      <FloatingCTA />
    </div>
  );
}
