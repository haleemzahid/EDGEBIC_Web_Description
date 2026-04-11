import * as React from 'react';
import type { Metadata } from 'next';

// Onboarding is behind auth — block all indexing.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false }
  }
};

export default function OnboardingLayout({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return <>{children}</>;
}
