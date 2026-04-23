import * as React from 'react';

import { CookiePolicy } from '@/components/marketing/sections/cookie-policy';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Cookie Policy',
  description: 'Cookie policy for User Solutions and RMDB production planning software website.',
  path: '/cookie-policy',
  noIndex: true
});

export default function CookiePolicyPage(): React.JSX.Element {
  return <CookiePolicy />;
}
