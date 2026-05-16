'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  type Row
} from '@tanstack/react-table';
import { ContactPriority, ContactTaskCategory } from '@prisma/client';
import { format } from 'date-fns';
import { MoreHorizontalIcon } from 'lucide-react';
import { useQueryStates } from 'nuqs';

import { getContactTaskStatusMeta } from '@/components/dashboard/contacts/details/tasks/contact-task-status-meta';
import { DeleteContactTaskModal } from '@/components/dashboard/contacts/details/tasks/delete-contact-task-modal';
import { EditContactTaskModal } from '@/components/dashboard/contacts/details/tasks/edit-contact-task-modal';
import {
  searchParams,
  TasksSortBy
} from '@/components/dashboard/contacts/details/tasks/tasks-search-params';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DataTable,
  DataTableColumnHeader,
  DataTableColumnOptionsHeader,
  DataTablePagination
} from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CenteredSpinner } from '@/components/ui/spinner';
import { useTransitionContext } from '@/hooks/use-transition-context';
import { cn } from '@/lib/utils';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactTaskDto } from '@/types/dtos/contact-task-dto';
import type { MemberDto } from '@/types/dtos/member-dto';
import { SortDirection } from '@/types/sort-direction';

export type ContactTasksDataTableProps = {
  data: ContactTaskDto[];
  members: MemberDto[];
  meetings: ContactMeetingDto[];
};

const categoryLabel: Record<ContactTaskCategory, string> = {
  [ContactTaskCategory.SALES]: 'Sales',
  [ContactTaskCategory.ONBOARDING]: 'Onboarding',
  [ContactTaskCategory.SUPPORT]: 'Support',
  [ContactTaskCategory.FOLLOW_UP]: 'Follow-up'
};

function priorityBadgeProps(priority: ContactPriority): {
  label: string;
  className: string;
} {
  switch (priority) {
    case ContactPriority.HIGH:
      return {
        label: 'High',
        className:
          'border-transparent bg-rose-100 text-rose-800 hover:bg-rose-100'
      };
    case ContactPriority.MEDIUM:
      return {
        label: 'Medium',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case ContactPriority.LOW:
      return {
        label: 'Low',
        className: 'border-transparent bg-muted text-foreground hover:bg-muted'
      };
  }
}

export function ContactTasksDataTable({
  data,
  members,
  meetings
}: ContactTasksDataTableProps): React.JSX.Element {
  const { isLoading, startTransition } = useTransitionContext();

  // NOTE: no 10s router.refresh() polling here (unlike the Contacts list).
  // This tab is an async server component; polling re-ran the DB queries
  // every 10s and kept the transition/Suspense pending. Task add/edit/delete
  // modals already call router.refresh().

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // The tab is handed the full task list, so sorting/pagination run
  // client-side; these params only persist table state in the URL (hence
  // shallow updates — no server round-trip, unlike the server-paginated
  // Contacts list).
  const [sorting, setSorting] = useQueryStates(
    {
      sortBy: searchParams.sortBy,
      sortDirection: searchParams.sortDirection
    },
    { history: 'push', startTransition, shallow: true }
  );

  const [pagination, setPagination] = useQueryStates(
    {
      pageIndex: searchParams.pageIndex,
      pageSize: searchParams.pageSize
    },
    { history: 'push', startTransition, shallow: true }
  );

  const columns = React.useMemo(
    () => getColumns({ members, meetings }),
    [members, meetings]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: [
        {
          id: sorting.sortBy,
          desc: sorting.sortDirection === SortDirection.Desc
        }
      ],
      columnVisibility,
      pagination
    },
    defaultColumn: { minSize: 0, size: 0 },
    getRowId: (row) => row.id,
    // Don't snap back to page 1 on every data identity change.
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: (updaterOrValue) => {
      const next =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(table.getState().sorting)
          : updaterOrValue;
      if (next.length > 0) {
        setSorting({
          sortBy: next[0].id as TasksSortBy,
          sortDirection: next[0].desc ? SortDirection.Desc : SortDirection.Asc
        });
      } else {
        setSorting({
          sortBy: TasksSortBy.CreatedAt,
          sortDirection: SortDirection.Desc
        });
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination
  });

  // Tasks have no detail page (unlike tickets); clicking a row opens the
  // existing edit modal — same affordance the list view used.
  const handleRowClicked = (row: Row<ContactTaskDto>): void => {
    NiceModal.show(EditContactTaskModal, {
      task: row.original,
      members,
      meetings
    });
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <ScrollArea
        verticalScrollBar
        horizontalScrollBar
        className="min-h-0 flex-1"
      >
        {/* Fill the remaining tab height instead of a fixed calc, so there's
            no dead space below the pagination bar. */}
        <DataTable
          fixedHeader
          table={table}
          wrapperClassName="h-full overflow-visible"
          onRowClicked={handleRowClicked}
        />
      </ScrollArea>

      <DataTablePagination table={table} />
      {isLoading && <CenteredSpinner />}
    </div>
  );
}

function getColumns({
  members,
  meetings
}: {
  members: MemberDto[];
  meetings: ContactMeetingDto[];
}): ColumnDef<ContactTaskDto>[] {
  return [
    {
      meta: { title: 'Task' },
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Task"
        />
      ),
      cell: ({ row }) => (
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">
            {row.original.title}
          </div>
          {row.original.description && (
            <div className="mt-0.5 max-w-[320px] truncate text-xs text-foreground/70">
              {row.original.description}
            </div>
          )}
        </div>
      ),
      enableSorting: true,
      enableHiding: false
    },
    {
      meta: { title: 'Status' },
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Status"
        />
      ),
      cell: ({ row }) => {
        const meta = getContactTaskStatusMeta(row.original.status);
        return (
          <Badge
            variant="secondary"
            className={cn('text-[11px]', meta.className)}
          >
            {meta.label}
          </Badge>
        );
      },
      enableSorting: true,
      enableHiding: true
    },
    {
      meta: { title: 'Priority' },
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Priority"
        />
      ),
      cell: ({ row }) => {
        const meta = priorityBadgeProps(row.original.priority);
        return (
          <Badge
            variant="secondary"
            className={cn('text-[11px]', meta.className)}
          >
            {meta.label}
          </Badge>
        );
      },
      enableSorting: true,
      enableHiding: true
    },
    {
      meta: { title: 'Category' },
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Category"
        />
      ),
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-sm">
          {row.original.category ? (
            categoryLabel[row.original.category]
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </span>
      ),
      enableSorting: true,
      enableHiding: true
    },
    {
      meta: { title: 'Assignee' },
      accessorKey: 'assigneeName',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Assignee"
        />
      ),
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-sm">
          {row.original.assigneeName ?? (
            <span className="text-muted-foreground">Unassigned</span>
          )}
        </span>
      ),
      enableSorting: true,
      enableHiding: true
    },
    {
      meta: { title: 'Due date' },
      accessorKey: 'dueDate',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Due date"
        />
      ),
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          {row.original.dueDate ? (
            format(new Date(row.original.dueDate), 'MMM d, yyyy')
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </span>
      ),
      enableSorting: true,
      enableHiding: true
    },
    {
      meta: { title: 'Created' },
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Created"
        />
      ),
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          {format(new Date(row.original.createdAt), 'MMM d, yyyy')}
        </span>
      ),
      enableSorting: true,
      enableHiding: true
    },
    {
      id: 'actions',
      size: 64,
      header: ({ table }) => <DataTableColumnOptionsHeader table={table} />,
      cell: ({ row }) => {
        const task = row.original;
        const handleEdit = (): void => {
          NiceModal.show(EditContactTaskModal, { task, members, meetings });
        };
        const handleDelete = (): void => {
          NiceModal.show(DeleteContactTaskModal, { task });
        };
        return (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="ml-auto mr-4 flex size-8 data-[state=open]:bg-muted"
                onClick={(e) => e.stopPropagation()}
                title="Open menu"
              >
                <MoreHorizontalIcon className="size-4 shrink-0" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="!text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];
}
