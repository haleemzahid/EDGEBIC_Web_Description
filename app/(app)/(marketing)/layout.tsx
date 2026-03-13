import * as React from 'react';
import dynamic from 'next/dynamic';

import { Footer } from '@/components/marketing/footer';
import { Navbar } from '@/components/marketing/navbar';
import { DynamicBreadcrumbJsonLd } from '@/components/seo';
// import { AnnouncementBar } from '@/components/ui/announcement-bar';
// import { BackToTop } from '@/components/ui/back-to-top';
import { FloatingCTA } from '@/components/ui/floating-cta';

const CookieBanner = dynamic(() =>
  import('@/components/marketing/fragments/cookie-banner').then(
    (mod) => mod.CookieBanner
  )
);

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
        <div className="page-enter">{props.children}</div>
      </main>
      <Footer />
      <CookieBanner />
      {/* <BackToTop /> */}
      <FloatingCTA />
    </div>
  );
}
