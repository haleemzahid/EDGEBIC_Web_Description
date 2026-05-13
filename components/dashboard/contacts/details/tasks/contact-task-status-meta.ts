import { ContactTaskStatus } from '@prisma/client';

export type ContactTaskStatusMeta = {
  value: ContactTaskStatus;
  label: string;
  className: string;
};

export function getContactTaskStatusMeta(
  status: ContactTaskStatus
): ContactTaskStatusMeta {
  switch (status) {
    case ContactTaskStatus.OPEN:
      return {
        value: status,
        label: 'To do',
        className:
          'border-transparent bg-slate-100 text-slate-800 hover:bg-slate-100'
      };
    case ContactTaskStatus.IN_PROGRESS:
      return {
        value: status,
        label: 'In progress',
        className:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100'
      };
    case ContactTaskStatus.COMPLETED:
      return {
        value: status,
        label: 'Done',
        className:
          'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
      };
    case ContactTaskStatus.CANCELLED:
      return {
        value: status,
        label: 'Cancelled',
        className: 'border-transparent bg-muted text-muted-foreground'
      };
  }
}

export const ALL_TASK_STATUSES: ContactTaskStatus[] = [
  ContactTaskStatus.OPEN,
  ContactTaskStatus.IN_PROGRESS,
  ContactTaskStatus.COMPLETED,
  ContactTaskStatus.CANCELLED
];

export function isTaskInactive(status: ContactTaskStatus): boolean {
  return (
    status === ContactTaskStatus.COMPLETED ||
    status === ContactTaskStatus.CANCELLED
  );
}
