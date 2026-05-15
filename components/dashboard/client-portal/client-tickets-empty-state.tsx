import * as React from 'react';
import { TicketIcon } from 'lucide-react';

import { NewClientTicketButton } from '@/components/dashboard/client-portal/new-ticket-button';

export function ClientTicketsEmptyState(): React.JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <TicketIcon className="size-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">No tickets yet</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Open a ticket and our team will get back to you here.
        </p>
      </div>
      <NewClientTicketButton />
    </div>
  );
}
