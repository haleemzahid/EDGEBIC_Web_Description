'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  type Row
} from '@tanstack/react-table';
import NiceModal from '@ebay/nice-modal-react';
import { format } from 'date-fns';
import { MoreHorizontalIcon } from 'lucide-react';
import { useQueryStates } from 'nuqs';

import { searchParams } from '@/components/dashboard/client-portal/client-tickets-search-params';
import {
  ContactTicketPriorityBadge,
  ContactTicketStatusBadge
} from '@/components/dashboard/contacts/details/tickets/contact-ticket-status-pills';
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
import { Button } from '@/components/ui/button';
import { DeleteClientTicketModal } from '@/components/dashboard/client-portal/delete-client-ticket-modal';
import { EditClientTicketModal } from '@/components/dashboard/client-portal/edit-ticket-modal';
import { ViewClientTicketModal } from '@/components/dashboard/client-portal/view-ticket-modal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CenteredSpinner } from '@/components/ui/spinner';
import { Routes } from '@/constants/routes';
import { useTransitionContext } from '@/hooks/use-transition-context';
import type { ClientTicketListItemDto } from '@/data/client-portal/get-client-tickets';
import { ClientTicketsSortBy } from '@/schemas/client-portal/get-client-tickets-schema';
import { SortDirection } from '@/types/sort-direction';

export type ClientTicketsDataTableProps = {
  data: ClientTicketListItemDto[];
  totalCount: number;
};

export function ClientTicketsDataTable({
  data,
  totalCount
}: ClientTicketsDataTableProps): React.JSX.Element {
  const router = useRouter();
  const { isLoading, startTransition } = useTransitionContext();

  // Auto-refresh so team replies and status changes appear without a manual
  // reload. Only poll while the tab is visible to keep the load light.
  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        router.refresh();
      }
    }, 10_000);
    return () => window.clearInterval(id);
  }, [router]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [sorting, setSorting] = useQueryStates(
    {
      sortBy: searchParams.sortBy,
      sortDirection: searchParams.sortDirection
    },
    {
      history: 'push',
      startTransition,
      shallow: false
    }
  );

  const [pagination, setPagination] = useQueryStates(
    {
      pageIndex: searchParams.pageIndex,
      pageSize: searchParams.pageSize
    },
    {
      history: 'push',
      startTransition,
      shallow: false
    }
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
    pageCount: Math.max(
      1,
      Math.ceil(totalCount / Math.max(1, pagination.pageSize))
    ),
    defaultColumn: {
      minSize: 0,
      size: 0
    },
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: (updaterOrValue) => {
      const newSorting =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(table.getState().sorting)
          : updaterOrValue;

      if (newSorting.length > 0) {
        setSorting({
          sortBy: newSorting[0].id as ClientTicketsSortBy,
          sortDirection: newSorting[0].desc
            ? SortDirection.Desc
            : SortDirection.Asc
        });
      } else {
        setSorting({
          sortBy: ClientTicketsSortBy.UpdatedAt,
          sortDirection: SortDirection.Desc
        });
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,

    manualPagination: true,
    manualSorting: true
  });

  const handleRowClicked = (row: Row<ClientTicketListItemDto>): void => {
    router.push(`${Routes.ClientSupport}/${row.original.id}`);
  };

  return (
    <div className="relative flex flex-col overflow-hidden">
      <ScrollArea
        verticalScrollBar
        horizontalScrollBar
        className="h-full"
      >
        {/* 64px (primary bar)
              + 48px (secondary bar)
              + 64px (pagination)
              = 177px
            */}
        <DataTable
          fixedHeader
          table={table}
          wrapperClassName="h-[calc(100svh-177px)] overflow-visible"
          onRowClicked={handleRowClicked}
        />
      </ScrollArea>

      <DataTablePagination table={table} />
      {isLoading && <CenteredSpinner />}
    </div>
  );
}

const columns: ColumnDef<ClientTicketListItemDto>[] = [
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
    meta: { title: 'Updated' },
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Updated"
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm text-muted-foreground">
        {format(new Date(row.original.updatedAt), 'MMM d, yyyy')}
      </span>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'actions',
    size: 64,
    header: ({ table }) => <DataTableColumnOptionsHeader table={table} />,
    cell: ({ row }) => <TicketRowActions ticket={row.original} />
  }
];

function TicketRowActions({
  ticket
}: {
  ticket: ClientTicketListItemDto;
}): React.JSX.Element {
  const router = useRouter();
  const handleView = (): void => {
    NiceModal.show(ViewClientTicketModal, { ticket });
  };
  const handleConversation = (): void => {
    router.push(`${Routes.ClientSupport}/${ticket.id}`);
  };
  const handleEdit = (): void => {
    NiceModal.show(EditClientTicketModal, {
      ticketId: ticket.id,
      title: ticket.title,
      description: ticket.description
    });
  };
  const handleDelete = (): void => {
    NiceModal.show(DeleteClientTicketModal, {
      ticketId: ticket.id,
      title: ticket.title
    });
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
            handleView();
          }}
        >
          View
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleConversation();
          }}
        >
          Conversation
        </DropdownMenuItem>
        {ticket.createdByClient && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
