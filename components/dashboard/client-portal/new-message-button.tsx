'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { PenLineIcon } from 'lucide-react';

import { ComposeMessageModal } from '@/components/dashboard/client-portal/compose-message-modal';
import { Button } from '@/components/ui/button';

export function NewMessageButton(): React.JSX.Element {
  return (
    <Button
      type="button"
      variant="default"
      size="sm"
      onClick={() => NiceModal.show(ComposeMessageModal)}
      className="gap-2"
    >
      <PenLineIcon className="size-4" />
      New message
    </Button>
  );
}
