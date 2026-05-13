import * as React from 'react';
import { Role } from '@prisma/client';

import { ClientCrmRecordCard } from '@/components/dashboard/client-portal/client-crm-record-card';
import { PersonalDetailsCard } from '@/components/dashboard/settings/account/profile/personal-details-card';
import { getPersonalDetails } from '@/data/account/get-personal-details';
import { dedupedAuth } from '@/lib/auth';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';

export default async function PersonalDetailsPage(): Promise<React.JSX.Element> {
  const details = await getPersonalDetails();

  const session = await dedupedAuth();
  let clientRecord: {
    company?: string;
    jobTitle?: string;
    address?: string;
    leadSource?: string;
  } | null = null;

  if (checkSession(session)) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });
    if (user?.role === Role.CLIENT) {
      const link = await getClientContactLink(session.user.id);
      if (link) {
        const contact = await prisma.contact.findUnique({
          where: { id: link.contactId },
          select: {
            company: true,
            jobTitle: true,
            address: true,
            leadSource: true
          }
        });
        if (contact) {
          clientRecord = {
            company: contact.company ?? undefined,
            jobTitle: contact.jobTitle ?? undefined,
            address: contact.address ?? undefined,
            leadSource: contact.leadSource ?? undefined
          };
        }
      }
    }
  }

  return (
    <>
      <PersonalDetailsCard
        details={details}
        isClient={clientRecord !== null}
      />
      {clientRecord && <ClientCrmRecordCard record={clientRecord} />}
    </>
  );
}
