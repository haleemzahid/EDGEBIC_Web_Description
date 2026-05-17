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
import { ContactPriority } from '@prisma/client';
import { format } from 'date-fns';
import { MoreHorizontalIcon, PinIcon } from 'lucide-react';
import { useQueryStates } from 'nuqs';

import { DeleteContactNoteModal } from '@/components/dashboard/contacts/details/notes/delete-contact-note-modal';
import { EditContactNoteModal } from '@/components/dashboard/contacts/details/notes/edit-contact-note-modal';
import {
  NotesSortBy,
  searchParams
} from '@/components/dashboard/contacts/details/notes/notes-search-params';
import { ViewContactNoteModal } from '@/components/dashboard/contacts/details/notes/view-contact-note-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { cn, getInitials } from '@/lib/utils';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';
import type { ContactNoteDto } from '@/types/dtos/contact-note-dto';
import { SortDirection } from '@/types/sort-direction';

export type ContactNotesDataTableProps = {
  data: ContactNoteDto[];
  meetings: ContactMeetingDto[];
};

// One-line plain-text projection of the (markdown) note body for the table
// cell — strips markdown/HTML so the column stays readable.
function notePreview(text?: string): string {
  if (!text) return '';
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function priorityBadgeProps(priority: ContactPriority): {
  label: string;
  className: string;
} {
  switch (priority) {
    case ContactPriority.HIGH:
      return {
        label: 'Important',
        className:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100'
      };
    case ContactPriority.MEDIUM:
      return {
        label: 'Normal',
        className: 'border-transparent bg-muted text-foreground hover:bg-muted'
      };
    case ContactPriority.LOW:
      return {
        label: 'Low',
        className:
          'border-transparent bg-muted text-muted-foreground hover:bg-muted'
      };
  }
}

export function ContactNotesDataTable({
  data,
  meetings
}: ContactNotesDataTableProps): React.JSX.Element {
  const { isLoading, startTransition } = useTransitionContext();

  // NOTE: no 10s router.refresh() polling here (mirrors the Tasks tab).
  // The tab is an async server component; add/edit/delete modals already
  // call router.refresh().

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // The tab is handed the full note list, so sorting/pagination run
  // client-side; these params only persist table state in the URL.
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

  const columns = React.useMemo(() => getColumns({ meetings }), [meetings]);

  // Pinned notes always float to the top, regardless of the column the user
  // sorts by — pin is the primary sort key, the chosen column is secondary.
  const sortState = React.useMemo(() => {
    const chosen = {
      id: sorting.sortBy,
      desc: sorting.sortDirection === SortDirection.Desc
    };
    if (sorting.sortBy === NotesSortBy.Pinned) {
      return [{ id: NotesSortBy.Pinned, desc: true }];
    }
    return [{ id: NotesSortBy.Pinned, desc: true }, chosen];
  }, [sorting.sortBy, sorting.sortDirection]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortState,
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
          sortBy: next[0].id as NotesSortBy,
          sortDirection: next[0].desc ? SortDirection.Desc : SortDirection.Asc
        });
      } else {
        setSorting({
          sortBy: NotesSortBy.CreatedAt,
          sortDirection: SortDirection.Desc
        });
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination
  });

  // Notes have no detail page; clicking a row opens the read-only view
  // panel. Editing is one click away from there or via the row menu.
  const handleRowClicked = (row: Row<ContactNoteDto>): void => {
    NiceModal.show(ViewContactNoteModal, { note: row.original, meetings });
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
  meetings
}: {
  meetings: ContactMeetingDto[];
}): ColumnDef<ContactNoteDto>[] {
  return [
    {
      id: NotesSortBy.Note,
      meta: { title: 'Note' },
      accessorFn: (row) => notePreview(row.text),
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Note"
        />
      ),
      cell: ({ row }) => {
        const preview = notePreview(row.original.text);
        return (
          <div
            className="block max-w-[280px] truncate text-sm"
            title={preview || undefined}
          >
            {preview || <span className="text-muted-foreground">Empty</span>}
          </div>
        );
      },
      enableSorting: true,
      enableHiding: false
    },
    {
      id: NotesSortBy.Author,
      meta: { title: 'Author' },
      accessorFn: (row) => row.sender.name,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Author"
        />
      ),
      cell: ({ row }) => (
        <span className="flex items-center gap-2 whitespace-nowrap text-sm">
          <Avatar className="size-6 shrink-0 rounded-full">
            <AvatarImage
              src={row.original.sender.image}
              alt={row.original.sender.name}
            />
            <AvatarFallback className="text-[10px] font-semibold">
              {getInitials(row.original.sender.name)}
            </AvatarFallback>
          </Avatar>
          {row.original.sender.name}
        </span>
      ),
      enableSorting: true,
      enableHiding: true
    },
    {
      id: NotesSortBy.Priority,
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
      id: NotesSortBy.Pinned,
      meta: { title: 'Pinned' },
      accessorKey: 'pinned',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Pinned"
        />
      ),
      cell: ({ row }) =>
        row.original.pinned ? (
          <Badge
            variant="secondary"
            className="border-transparent bg-amber-200 text-[11px] text-amber-900 hover:bg-amber-200"
          >
            <PinIcon className="mr-1 size-3 shrink-0" />
            Pinned
          </Badge>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
      enableSorting: true,
      enableHiding: true
    },
    {
      id: NotesSortBy.Meeting,
      meta: { title: 'Meeting' },
      accessorFn: (row) => row.meetingTitle ?? '',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Meeting"
        />
      ),
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-sm">
          {row.original.meetingTitle ? (
            <>
              {row.original.meetingStartsAt
                ? `${format(new Date(row.original.meetingStartsAt), 'MMM d')} · `
                : ''}
              {row.original.meetingTitle}
            </>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </span>
      ),
      enableSorting: true,
      enableHiding: true
    },
    {
      id: NotesSortBy.CreatedAt,
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
          {row.original.edited && ' · edited'}
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
        const note = row.original;
        const handleView = (): void => {
          NiceModal.show(ViewContactNoteModal, { note, meetings });
        };
        const handleEdit = (): void => {
          NiceModal.show(EditContactNoteModal, { note, meetings });
        };
        const handleDelete = (): void => {
          NiceModal.show(DeleteContactNoteModal, { note });
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
