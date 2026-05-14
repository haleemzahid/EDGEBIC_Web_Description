import * as React from 'react';
import Link from 'next/link';

import {
  Page,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';

export function ClientUnlinkedNotice({
  title
}: {
  title: string;
}): React.JSX.Element {
  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>{title}</PageTitle>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-6">
          <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Your client profile isn&apos;t linked to a contact in the CRM yet.
            Please contact your project owner to complete the link.
          </p>
          <Link
            href={Routes.Welcome}
            className="text-sm text-primary underline"
          >
            Back to Home
          </Link>
        </div>
      </PageBody>
    </Page>
  );
}
