import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {};

export default function AdminLayout({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return <>{children}</>;
}
