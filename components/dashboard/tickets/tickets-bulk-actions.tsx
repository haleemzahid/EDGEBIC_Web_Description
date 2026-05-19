'use client';

import { useRouter } from 'next/navigation';
import NiceModal from '@ebay/nice-modal-react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { DeleteTicketsModal } from '@/components/dashboard/tickets/delete-tickets-modal';
import { Button } from '@/components/ui/button';
import { DataTableBulkActions } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { OrganizationTicketRowDto } from '@/types/dtos/contact-ticket-dto';

export type TicketsBulkActionsProps = {
  table: Table<OrganizationTicketRowDto>;
};

export function TicketsBulkActions({
  table
}: TicketsBulkActionsProps): React.JSX.Element {
  const router = useRouter();

  const handleShowDeleteTicketsModal = (): void => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (selectedRows.length === 0) {
      return;
    }

    NiceModal.show(DeleteTicketsModal, {
      ids: selectedRows.map((row) => row.original.id),
      onDeleted: () => {
        table.resetRowSelection();
        router.refresh();
      }
    });
  };

  return (
    <DataTableBulkActions table={table}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="default"
            className="text-sm"
          >
            Bulk actions
            <CaretSortIcon className="ml-1 size-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            className="!text-destructive"
            onClick={handleShowDeleteTicketsModal}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </DataTableBulkActions>
  );
}
