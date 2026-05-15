import * as React from 'react';
import { BoxIcon } from 'lucide-react';

export function ClientSoftwareEmptyState(): React.JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <BoxIcon className="size-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">No software yet</p>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground">
          Your team hasn&apos;t provisioned any software for your account yet.
          Once they do, you&apos;ll see version, status, install date, and
          download links here.
        </p>
      </div>
    </div>
  );
}
