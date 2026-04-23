import * as React from 'react';

import { PrivacyPolicy } from '@/components/marketing/sections/privacy-policy';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for User Solutions and RMDB production planning software. How we collect, use, and protect your data.',
  path: '/privacy-policy'
});

export default function PrivacyPolicyPage(): React.JSX.Element {
  return <PrivacyPolicy />;
}
