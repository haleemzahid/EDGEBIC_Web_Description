'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { format } from 'date-fns';
import { MoreHorizontalIcon } from 'lucide-react';
import { useQueryStates } from 'nuqs';

import { DeleteContactTicketModal } from '@/components/dashboard/contacts/details/tickets/delete-contact-ticket-modal';
import { EditContactTicketModal } from '@/components/dashboard/contacts/details/tickets/edit-contact-ticket-modal';
import {
  ContactTicketPriorityBadge,
  ContactTicketStatusBadge
} from '@/components/dashboard/contacts/details/tickets/contact-ticket-status-pills';
import {
  searchParams,
  TicketsSortBy
} from '@/components/dashboard/contacts/details/tickets/tickets-search-params';
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
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactTicketDto } from '@/types/dtos/contact-ticket-dto';
import type { MemberDto } from '@/types/dtos/member-dto';
import { SortDirection } from '@/types/sort-direction';

export type ContactTicketsDataTableProps = {
  contactId: string;
  data: ContactTicketDto[];
  members: MemberDto[];
  meetings: ContactMeetingDto[];
};

export function ContactTicketsDataTable({
  contactId,
  data,
  members,
  meetings
}: ContactTicketsDataTableProps): React.JSX.Element {
  const router = useRouter();
  const { isLoading, startTransition } = useTransitionContext();

  // NOTE: no 10s router.refresh() polling here (unlike the Contacts list).
  // This tab is an async server component; polling re-ran 3 DB queries every
  // 10s and kept the transition/Suspense pending — the spinner never
  // cleared. Ticket add/edit/delete modals already call router.refresh().

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // The tab is handed the full ticket list, so sorting/pagination run
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
    () => getColumns({ contactId, members, meetings }),
    [contactId, members, meetings]
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
          sortBy: next[0].id as TicketsSortBy,
          sortDirection: next[0].desc ? SortDirection.Desc : SortDirection.Asc
        });
      } else {
        setSorting({
          sortBy: TicketsSortBy.CreatedAt,
          sortDirection: SortDirection.Desc
        });
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination
  });

  const handleRowClicked = (row: Row<ContactTicketDto>): void => {
    router.push(`/dashboard/contacts/${contactId}/tickets/${row.original.id}`);
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
  contactId,
  members,
  meetings
}: {
  contactId: string;
  members: MemberDto[];
  meetings: ContactMeetingDto[];
}): ColumnDef<ContactTicketDto>[] {
  return [
    {
      meta: { title: 'Ticket' },
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Ticket"
        />
      ),
      cell: ({ row }) => (
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">
            #{row.original.number} · {row.original.title}
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
      cell: ({ row }) => (
        <ContactTicketStatusBadge status={row.original.status} />
      ),
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
      cell: ({ row }) => (
        <ContactTicketPriorityBadge priority={row.original.priority} />
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
        const ticket = row.original;
        const handleEdit = (): void => {
          // The list row is a ContactTicketDto; the edit modal types a
          // ContactTicketWithDetailsDto but only uses the base fields, so
          // adapt with empty message/activity arrays.
          NiceModal.show(EditContactTicketModal, {
            ticket: { ...ticket, messages: [], activities: [] },
            members,
            meetings
          });
        };
        const handleDelete = (): void => {
          NiceModal.show(DeleteContactTicketModal, { ticket });
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
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/contacts/${contactId}/tickets/${ticket.id}`}
                >
                  View
                </Link>
              </DropdownMenuItem>
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
