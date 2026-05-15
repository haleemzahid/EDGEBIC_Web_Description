'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import {
  ExternalLinkIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from 'lucide-react';

import { AddContactSoftwareModal } from '@/components/dashboard/contacts/details/software/add-contact-software-modal';
import { DeleteContactSoftwareModal } from '@/components/dashboard/contacts/details/software/delete-contact-software-modal';
import { EditContactSoftwareModal } from '@/components/dashboard/contacts/details/software/edit-contact-software-modal';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import type { ContactSoftwareDto } from '@/types/dtos/contact-software-dto';

export type ContactSoftwareSectionProps = {
  contactId: string;
  software: ContactSoftwareDto[];
};

export function ContactSoftwareSection({
  contactId,
  software
}: ContactSoftwareSectionProps): React.JSX.Element {
  const handleAdd = () => {
    NiceModal.show(AddContactSoftwareModal, { contactId });
  };
  const handleEdit = (item: ContactSoftwareDto) => {
    NiceModal.show(EditContactSoftwareModal, { software: item });
  };
  const handleDelete = (item: ContactSoftwareDto) => {
    NiceModal.show(DeleteContactSoftwareModal, { software: item });
  };

  return (
    <section className="px-6 pb-6">
      <div className="flex items-center justify-between py-4">
        <h3 className="text-sm font-semibold tracking-tight">Software</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
        >
          <PlusIcon className="mr-1.5 size-3.5" />
          Add software
        </Button>
      </div>

      {software.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          No software tracked yet — click &ldquo;Add software&rdquo; to get
          started.
        </p>
      ) : (
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {software.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {item.name}
                        {item.githubUrl && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a
                                href={item.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`GitHub repository for ${item.name}`}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <ExternalLinkIcon className="size-3" />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>GitHub repository</TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs font-semibold text-blue-600">
                        {item.installedVersion ?? '—'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {item.installDate
                          ? new Date(item.installDate).toLocaleDateString()
                          : '—'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-7"
                              onClick={() => handleEdit(item)}
                            >
                              <PencilIcon className="size-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-7 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(item)}
                            >
                              <TrashIcon className="size-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Remove</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
