'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';

import { NewClientTicketModal } from '@/components/dashboard/client-portal/new-ticket-modal';

export type OpenTicketActionProps = {
  className?: string;
  children: React.ReactNode;
};

export function OpenTicketAction({
  className,
  children
}: OpenTicketActionProps): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={() => NiceModal.show(NewClientTicketModal)}
      className={className}
    >
      {children}
    </button>
  );
}
