import * as React from 'react';
import { TicketIcon } from 'lucide-react';

export function TicketsEmptyState(): React.JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <TicketIcon className="size-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">No tickets yet</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Tickets opened by customers or your team will appear here.
        </p>
      </div>
    </div>
  );
}
