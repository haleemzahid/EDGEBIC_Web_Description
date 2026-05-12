import * as React from 'react';
import { ContactPriority, ContactTicketStatus } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function statusBadgeMeta(status: ContactTicketStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case ContactTicketStatus.OPEN:
      return {
        label: 'Open',
        className:
          'border-transparent bg-rose-100 text-rose-800 hover:bg-rose-100'
      };
    case ContactTicketStatus.PENDING:
      return {
        label: 'Pending',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case ContactTicketStatus.RESOLVED:
      return {
        label: 'Resolved',
        className:
          'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
      };
    case ContactTicketStatus.CLOSED:
      return {
        label: 'Closed',
        className: 'border-transparent bg-muted text-muted-foreground'
      };
  }
}

function priorityBadgeMeta(priority: ContactPriority): {
  label: string;
  className: string;
} {
  switch (priority) {
    case ContactPriority.HIGH:
      return {
        label: 'High',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case ContactPriority.MEDIUM:
      return {
        label: 'Medium',
        className:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      };
    case ContactPriority.LOW:
      return {
        label: 'Low',
        className: 'border-transparent bg-muted text-foreground hover:bg-muted'
      };
  }
}

export function ContactTicketStatusBadge({
  status,
  className
}: {
  status: ContactTicketStatus;
  className?: string;
}): React.JSX.Element {
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

export function ContactTicketPriorityBadge({
  priority,
  className
}: {
  priority: ContactPriority;
  className?: string;
}): React.JSX.Element {
  const meta = priorityBadgeMeta(priority);
  return (
    <Badge
      variant="secondary"
      className={cn('text-[11px]', meta.className, className)}
    >
      {meta.label}
    </Badge>
  );
}
