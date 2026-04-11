import * as React from 'react';
import type { Metadata } from 'next';

// Admin routes are internal — block all indexing.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false }
  }
};

export default function AdminLayout({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return <>{children}</>;
}
