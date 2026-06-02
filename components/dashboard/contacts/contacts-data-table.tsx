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
import {
  BellIcon,
  CalendarIcon,
  MailIcon,
  MailPlusIcon,
  MoreHorizontalIcon,
  TicketIcon
} from 'lucide-react';
import { useQueryStates } from 'nuqs';

import { ContactsBulkActions } from '@/components/dashboard/contacts/contacts-bulk-actions';
import { searchParams } from '@/components/dashboard/contacts/contacts-search-params';
import { DeleteContactModal } from '@/components/dashboard/contacts/delete-contact-modal';
import { ContactAvatar } from '@/components/dashboard/contacts/details/contact-avatar';
import { InviteMemberModal } from '@/components/dashboard/settings/organization/members/invite-member-modal';
import { Badge } from '@/components/ui/badge';
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
import { TagList } from '@/components/ui/tag-input';
import { contactStageColor, contactStageLabel } from '@/constants/labels';
import { Routes } from '@/constants/routes';
import { useTransitionContext } from '@/hooks/use-transition-context';
import { cn } from '@/lib/utils';
import { GetContactsSortBy } from '@/schemas/contacts/get-contacts-schema';
import type {
  ClientActivityItem,
  ClientActivityMap
} from '@/data/contacts/get-client-activity';
import { dismissContactNotifications } from '@/actions/notifications/dismiss-contact-notifications';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ProfileDto } from '@/types/dtos/profile-dto';
import { SortDirection } from '@/types/sort-direction';

export type ContactsDataTableProps = {
  data: ContactDto[];
  totalCount: number;
  /** Per-contact client-activity (ticket/message) the client created. */
  clientActivity?: ClientActivityMap;
  /** Current user — required by the invite modal opened from the Invite column. */
  profile: ProfileDto;
};

export function ContactsDataTable({
  data,
  totalCount,
  clientActivity = {},
  profile
}: ContactsDataTableProps): React.JSX.Element {
  const router = useRouter();
  const { isLoading, startTransition } = useTransitionContext();

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
    meta: { clientActivity, profile },
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
          sortBy: newSorting[0].id as GetContactsSortBy,
          sortDirection: newSorting[0].desc
            ? SortDirection.Desc
            : SortDirection.Asc
        });
      } else {
        setSorting({
          sortBy: GetContactsSortBy.Name,
          sortDirection: SortDirection.Asc
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

  const handleRowClicked = (row: Row<ContactDto>): void => {
    router.push(`${Routes.Contacts}/${row.original.id}`);
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
      {hasSelectedRows && <ContactsBulkActions table={table} />}
    </div>
  );
}

// Type → label/icon/colour. New activity types (e.g. MEETING) only need an
// entry here to get their own badge; unknown types fall back generically.
const ACTIVITY_META: Record<
  string,
  { label: string; icon: typeof TicketIcon; className: string }
> = {
  TICKET: {
    label: 'New ticket',
    icon: TicketIcon,
    className: 'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200'
  },
  MESSAGE: {
    label: 'New message',
    icon: MailIcon,
    className: 'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200'
  },
  MEETING: {
    label: 'New meeting',
    icon: CalendarIcon,
    className:
      'border-transparent bg-violet-100 text-violet-800 hover:bg-violet-200'
  }
};

// One badge per activity type. Clicking it clears just that type's
// notifications for the contact and opens the latest item of that type.
function ClientActivityBadge({
  contactId,
  item
}: {
  contactId: string;
  item: ClientActivityItem;
}): React.JSX.Element {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const meta = ACTIVITY_META[item.type] ?? {
    label: 'New activity',
    icon: BellIcon,
    className: 'border-transparent bg-muted text-foreground hover:bg-accent'
  };
  const Icon = meta.icon;

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    startTransition(async () => {
      await dismissContactNotifications({ contactId, type: item.type });
      // Single unread → open the deep link (specific thread/ticket).
      // Multiple unread → drop the per-item key so the section opens in
      // list view with all unread items visible.
      //   • email: /dashboard/contacts/{id}?tab=inbox&threadId=… → strip threadId
      //   • ticket: /dashboard/contacts/{id}/tickets/{tid}      → /…?tab=tickets
      let target = item.link;
      if (item.count > 1) {
        try {
          const url = new URL(target, window.location.origin);
          url.searchParams.delete('threadId');
          const ticketMatch = url.pathname.match(
            /^(\/dashboard\/contacts\/[^/]+)\/tickets\/[^/]+$/
          );
          if (ticketMatch) {
            url.pathname = ticketMatch[1];
            url.searchParams.set('tab', 'tickets');
          }
          target = `${url.pathname}${url.search}${url.hash}`;
        } catch {
          // Fall back to the original link if parsing fails.
        }
      }
      router.push(target);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      title={`${meta.label} — open and clear`}
      className="inline-flex w-fit items-center"
    >
      <Badge
        variant="secondary"
        className={cn(
          'gap-1 whitespace-nowrap text-[11px]',
          meta.className
        )}
      >
        <Icon className="size-3 shrink-0" />
        {meta.label}
        {item.count > 1 && (
          <span className="font-semibold">·{item.count}</span>
        )}
      </Badge>
    </button>
  );
}

const columns: ColumnDef<ContactDto>[] = [
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
      title: 'Name'
    },
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-fit flex-row items-center gap-2">
        <ContactAvatar
          record={row.original.record}
          src={row.original.image}
        />
        <div
          className={cn(
            'whitespace-nowrap text-sm',
            row.original.isRead ? 'font-medium' : 'font-bold'
          )}
        >
          {row.original.name}
        </div>
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'clientActivity',
    meta: {
      title: 'Activity'
    },
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Activity"
      />
    ),
    cell: ({ row, table }) => {
      const map = (
        table.options.meta as { clientActivity?: ClientActivityMap } | undefined
      )?.clientActivity;
      const items = map?.[row.original.id];
      if (!items || items.length === 0) {
        return null;
      }
      // One separate badge per activity type.
      return (
        <div className="flex flex-wrap items-center gap-1.5">
          {items.map((item) => (
            <ClientActivityBadge
              key={item.type}
              contactId={row.original.id}
              item={item}
            />
          ))}
        </div>
      );
    }
  },
  {
    meta: {
      title: 'Email'
    },
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
      />
    ),
    cell: ({ row }) => (
      <span
        className={cn(
          'whitespace-nowrap text-sm',
          !row.original.isRead && 'font-semibold'
        )}
      >
        {row.original.email}
      </span>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    meta: {
      title: 'Phone'
    },
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm">{row.original.phone}</span>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    meta: {
      title: 'Stage'
    },
    accessorKey: 'stage',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Stage"
      />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2 whitespace-nowrap">
        <div
          className={cn(
            'size-2.5 rounded-full border-2 bg-background',
            contactStageColor[row.original.stage]
          )}
        />
        {contactStageLabel[row.original.stage]}
      </div>
    )
  },
  {
    meta: {
      title: 'Description'
    },
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Description"
      />
    ),
    cell: ({ row }) => (
      <span
        className="block max-w-[200px] truncate text-sm text-muted-foreground"
        title={row.original.description}
      >
        {row.original.description || '-'}
      </span>
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    meta: {
      title: 'Product Interest'
    },
    accessorKey: 'productInterest',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Product Interest"
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm">
        {row.original.productInterest || '-'}
      </span>
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    meta: {
      title: 'Hear About Us'
    },
    accessorKey: 'hearAboutUs',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Hear About Us"
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm">
        {row.original.hearAboutUs || '-'}
      </span>
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    meta: {
      title: 'Tags'
    },
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tags"
      />
    ),
    cell: ({ row }) => (
      <TagList
        tags={row.original.tags}
        className="flex-nowrap text-clip"
        size="sm"
        variant="default"
        shape="rounded"
        borderStyle="default"
        textCase={null}
        interaction="nonClickable"
        textStyle="normal"
        animation="fadeIn"
        direction="row"
      />
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    meta: {
      title: 'Invite'
    },
    id: 'inviteStatus',
    accessorFn: (row) => row.inviteStatus ?? 'NONE',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Invite"
      />
    ),
    cell: ({ row, table }) => {
      const status = row.original.inviteStatus ?? 'NONE';
      if (status === 'USER_EXISTS' || status === 'ACCEPTED') {
        return (
          <Badge
            variant="default"
            className="whitespace-nowrap bg-green-600 hover:bg-green-600/80"
          >
            Joined
          </Badge>
        );
      }
      if (status === 'PENDING') {
        return (
          <Badge
            variant="secondary"
            className="whitespace-nowrap"
          >
            Invited
          </Badge>
        );
      }
      const email = row.original.email;
      if (!email) {
        return (
          <Badge
            variant="outline"
            className="whitespace-nowrap text-muted-foreground"
          >
            No email
          </Badge>
        );
      }
      // Direct invite: open the same InviteMemberModal the contact-detail
      // page uses, with the email pre-filled and locked.
      const profile = (
        table.options.meta as { profile?: ProfileDto } | undefined
      )?.profile;
      return (
        <Button
          type="button"
          variant="default"
          size="sm"
          className="h-7 whitespace-nowrap"
          title="Send a client-portal invitation to this contact"
          onClick={(e) => {
            e.stopPropagation();
            if (!profile) return;
            NiceModal.show(InviteMemberModal, {
              profile,
              defaultEmail: email,
              emailReadOnly: true
            });
          }}
        >
          <MailPlusIcon className="mr-1.5 size-3.5 shrink-0" />
          Invite
        </Button>
      );
    },
    enableSorting: false,
    enableHiding: true
  },
  {
    id: 'actions',
    size: 64,
    header: ({ table }) => <DataTableColumnOptionsHeader table={table} />,
    cell: ({ row }) => {
      const handleShowDeleteContactModal = (): void => {
        NiceModal.show(DeleteContactModal, { contact: row.original });
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
              <Link href={`${Routes.Contacts}/${row.original.id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="!text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleShowDeleteContactModal();
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
