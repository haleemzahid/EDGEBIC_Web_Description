import * as React from 'react';
import type { Metadata } from 'next';

import { NotFoundContent } from './(app)/not-found-content';

export const metadata: Metadata = {
  // Use absolute so the parent template doesn't append "| RMDB by User Solutions"
  // — we want one clean consistent 404 title for analytics and GSC.
  title: { absolute: '404 – Page Not Found | RMDB by User Solutions' },
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true }
  }
};

export default function NotFound(): React.JSX.Element {
  return <NotFoundContent />;
}
