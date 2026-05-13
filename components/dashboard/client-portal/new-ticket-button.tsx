'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { PlusIcon } from 'lucide-react';

import { NewClientTicketModal } from '@/components/dashboard/client-portal/new-ticket-modal';
import { Button } from '@/components/ui/button';

export function NewClientTicketButton(): React.JSX.Element {
  return (
    <Button
      type="button"
      variant="default"
      size="sm"
      onClick={() => NiceModal.show(NewClientTicketModal)}
      className="gap-2"
    >
      <PlusIcon className="size-4" />
      Open ticket
    </Button>
  );
}
