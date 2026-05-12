import * as React from 'react';
import { ReceiptIcon } from 'lucide-react';

export function ContactBillingTab(): React.JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <ReceiptIcon className="size-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">Billing history coming soon</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Payment and subscription events for this contact will appear here.
        </p>
      </div>
    </div>
  );
}
