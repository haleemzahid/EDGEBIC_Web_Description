import * as React from 'react';
import { ContactMeetingStatus } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type ContactMeetingStatusBadgeProps = {
  status: ContactMeetingStatus;
  className?: string;
};

export function statusBadgeMeta(status: ContactMeetingStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case ContactMeetingStatus.CONFIRMED:
      return {
        label: 'Confirmed',
        className:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100'
      };
    case ContactMeetingStatus.PENDING:
      return {
        label: 'Pending',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case ContactMeetingStatus.COMPLETED:
      return {
        label: 'Completed',
        className:
          'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
      };
    case ContactMeetingStatus.CANCELLED:
      return {
        label: 'Cancelled',
        className: 'border-transparent bg-muted text-muted-foreground'
      };
  }
}

export function ContactMeetingStatusBadge({
  status,
  className
}: ContactMeetingStatusBadgeProps): React.JSX.Element {
  const meta = statusBadgeMeta(status);
  return (
    <Badge
      variant="secondary"
      className={cn('text-[11px]', meta.className, className)}
    >
      {meta.label}
    </Badge>
  );
}
