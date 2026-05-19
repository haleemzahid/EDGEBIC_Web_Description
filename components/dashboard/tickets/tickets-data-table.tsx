'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NiceModal from '@ebay/nice-modal-react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  type Row
} from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontalIcon } from 'lucide-react';
import { useQueryStates } from 'nuqs';

import {
  ContactTicketPriorityBadge,
  ContactTicketStatusBadge
} from '@/components/dashboard/contacts/details/tickets/contact-ticket-status-pills';
import { DeleteTicketsModal } from '@/components/dashboard/tickets/delete-tickets-modal';
import { searchParams } from '@/components/dashboard/tickets/tickets-search-params';
import { TicketsBulkActions } from '@/components/dashboard/tickets/tickets-bulk-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { cn, getInitials } from '@/lib/utils';
import { GetTicketsSortBy } from '@/schemas/tickets/get-tickets-schema';
import type { OrganizationTicketRowDto } from '@/types/dtos/contact-ticket-dto';
import { SortDirection } from '@/types/sort-direction';

export type TicketsDataTableProps = {
  data: OrganizationTicketRowDto[];
  totalCount: number;
};

export function TicketsDataTable({
  data,
  totalCount
}: TicketsDataTableProps): React.JSX.Element {
  const router = useRouter();
  const { isLoading, startTransition } = useTransitionContext();

  // Auto-refresh so new tickets and replies bubble in without a manual
  // reload. Only poll while the tab is visible to keep the load light.
  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        router.refresh();
      }
    }, 10_000);
    return () => window.clearInterval(id);
  }, [router]);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

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
      rowSelection,
      columnFilters,
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
    getRowId: (row, _relativeIndex, parent) => (parent ? parent.id : row.id),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updaterOrValue) => {
      const newSorting =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(table.getState().sorting)
          : updaterOrValue;

      if (newSorting.length > 0) {
        setSorting({
          sortBy: newSorting[0].id as GetTicketsSortBy,
          sortDirection: newSorting[0].desc
            ? SortDirection.Desc
            : SortDirection.Asc
        });
      } else {
        setSorting({
          sortBy: GetTicketsSortBy.CreatedAt,
          sortDirection: SortDirection.Desc
        });
      }
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,

    enableRowSelection: true,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true
  });

  const hasSelectedRows = table.getSelectedRowModel().rows.length > 0;

  const handleRowClicked = (row: Row<OrganizationTicketRowDto>): void => {
    router.push(
      `/dashboard/contacts/${row.original.contactId}/tickets/${row.original.id}`
    );
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
      {hasSelectedRows && <TicketsBulkActions table={table} />}
    </div>
  );
}

const columns: ColumnDef<OrganizationTicketRowDto>[] = [
  {
    id: 'select',
    size: 64,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mx-auto flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mx-auto flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    meta: {
      title: 'Ticket'
    },
    id: 'ticket',
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ticket"
      />
    ),
    cell: ({ row }) => (
      <div className="min-w-0 max-w-[320px]">
        <div className="truncate text-sm font-medium">
          #{row.original.number} · {row.original.title}
        </div>
        {row.original.description && (
          <div className="mt-0.5 truncate text-xs text-muted-foreground">
            {row.original.description}
          </div>
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    meta: {
      title: 'Contact'
    },
    id: 'contact',
    accessorKey: 'contactName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Contact"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-fit flex-row items-center gap-2">
        <Avatar className="size-8 shrink-0">
          <AvatarImage
            src={row.original.contactImage}
            alt={row.original.contactName}
          />
          <AvatarFallback className="text-[11px] font-semibold">
            {getInitials(row.original.contactName)}
          </AvatarFallback>
        </Avatar>
        <span className="whitespace-nowrap text-sm">
          {row.original.contactName}
        </span>
      </div>
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    meta: {
      title: 'Status'
    },
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
    enableSorting: false,
    enableHiding: true
  },
  {
    meta: {
      title: 'Priority'
    },
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
    enableSorting: false,
    enableHiding: true
  },
  {
    meta: {
      title: 'Assignee'
    },
    accessorKey: 'assigneeName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Assignee"
      />
    ),
    cell: ({ row }) => (
      <span
        className={cn(
          'whitespace-nowrap text-sm',
          !row.original.assigneeName && 'text-muted-foreground'
        )}
      >
        {row.original.assigneeName ?? 'Unassigned'}
      </span>
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    meta: {
      title: 'Created'
    },
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created"
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm text-muted-foreground">
        {formatDistanceToNow(row.original.createdAt, { addSuffix: true })}
      </span>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    meta: {
      title: 'Updated'
    },
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Updated"
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm text-muted-foreground">
        {formatDistanceToNow(row.original.updatedAt, { addSuffix: true })}
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
      const handleShowDeleteTicketModal = (): void => {
        NiceModal.show(DeleteTicketsModal, { ids: [row.original.id] });
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
                href={`/dashboard/contacts/${row.original.contactId}/tickets/${row.original.id}`}
              >
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="!text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleShowDeleteTicketModal();
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
