'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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
  VisibilityState
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { DownloadIcon } from 'lucide-react';
import { useQueryStates } from 'nuqs';

import { searchParams } from '@/components/dashboard/client-portal/client-software-search-params';
import { Button } from '@/components/ui/button';
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination
} from '@/components/ui/data-table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CenteredSpinner } from '@/components/ui/spinner';
import { useTransitionContext } from '@/hooks/use-transition-context';
import {
  GetClientSoftwareSortBy
} from '@/schemas/client-portal/get-client-software-schema';
import { SortDirection } from '@/types/sort-direction';
import type { ClientSoftwareDto } from '@/data/client-portal/get-client-software';

export type ClientSoftwareListProps = {
  software: ClientSoftwareDto[];
  totalCount: number;
};

export function ClientSoftwareList({
  software,
  totalCount
}: ClientSoftwareListProps): React.JSX.Element {
  const router = useRouter();
  const { isLoading, startTransition } = useTransitionContext();

  // Auto-refresh so team-side updates (new entries, version bumps, status
  // changes) appear without a manual reload. Only poll while the tab is
  // visible to keep the load light.
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
    data: software,
    columns,
    state: {
      sorting: [
        {
          id: sorting.sortBy,
          desc: sorting.sortDirection === SortDirection.Desc
        }
      ],
      columnVisibility,
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
    getRowId: (row, _i, parent) => (parent ? parent.id : row.id),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: (updaterOrValue) => {
      const newSorting =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(table.getState().sorting)
          : updaterOrValue;

      if (newSorting.length > 0) {
        setSorting({
          sortBy: newSorting[0].id as GetClientSoftwareSortBy,
          sortDirection: newSorting[0].desc
            ? SortDirection.Desc
            : SortDirection.Asc
        });
      } else {
        setSorting({
          sortBy: GetClientSoftwareSortBy.CreatedAt,
          sortDirection: SortDirection.Desc
        });
      }
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,

    manualPagination: true,
    manualFiltering: true,
    manualSorting: true
  });

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
        />
      </ScrollArea>

      <DataTablePagination table={table} />
      {isLoading && <CenteredSpinner />}
    </div>
  );
}

const columns: ColumnDef<ClientSoftwareDto>[] = [
  {
    meta: {
      title: 'Product name'
    },
    id: GetClientSoftwareSortBy.Name,
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Product name"
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-medium">
        {row.original.name}
      </span>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    meta: {
      title: 'Latest version'
    },
    id: GetClientSoftwareSortBy.InstalledVersion,
    accessorKey: 'installedVersion',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Latest version"
      />
    ),
    cell: ({ row }) => {
      // The admin "Latest version" field saves to `latestVersion`; the
      // modal has no installed-version input, so prefer latestVersion and
      // only fall back to installedVersion (mirrors /api/software/latest).
      const version =
        row.original.latestVersion ?? row.original.installedVersion;
      return (
        <span className="whitespace-nowrap text-sm">
          {version ?? <span className="text-muted-foreground">—</span>}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    meta: {
      title: 'Date'
    },
    id: GetClientSoftwareSortBy.CreatedAt,
    accessorFn: (row) => row.installDate ?? row.createdAt,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm">
        {format(
          row.original.installDate ?? row.original.createdAt,
          'MMM d, yyyy'
        )}
      </span>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'download',
    meta: {
      title: 'Download'
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Download"
      />
    ),
    cell: ({ row }) =>
      row.original.downloadUrl ? (
        <Button
          asChild
          variant="default"
          size="sm"
        >
          <a
            href={row.original.downloadUrl}
            download
          >
            <DownloadIcon className="mr-1.5 size-3.5" />
            Download
          </a>
        </Button>
      ) : (
        <Button
          type="button"
          variant="default"
          size="sm"
          disabled
          title="No download available"
        >
          <DownloadIcon className="mr-1.5 size-3.5" />
          Download
        </Button>
      ),
    enableSorting: false,
    enableHiding: true
  }
];
