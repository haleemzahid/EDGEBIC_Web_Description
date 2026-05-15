import * as React from 'react';
import { MailIcon } from 'lucide-react';

import { NewMessageButton } from '@/components/dashboard/client-portal/new-message-button';

export function ClientMessagesEmptyState(): React.JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <MailIcon className="size-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">No messages yet</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Start a conversation and replies from your project team will appear
          here.
        </p>
      </div>
      <NewMessageButton />
    </div>
  );
}
