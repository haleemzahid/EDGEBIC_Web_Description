import * as React from 'react';

import { TermsOfUse } from '@/components/marketing/sections/terms-of-use';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Terms of Use',
  description: 'Terms of use for User Solutions website and RMDB production planning software services.',
  path: '/terms-of-use'
});

export default function TermsOfUsePage(): React.JSX.Element {
  return <TermsOfUse />;
}
