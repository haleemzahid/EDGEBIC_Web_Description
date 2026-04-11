import * as React from 'react';
import type { Metadata } from 'next';

// Purchase callback URLs (success/cancelled) are transactional — never index.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false }
  }
};

export default function PurchaseLayout({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return <>{children}</>;
}
