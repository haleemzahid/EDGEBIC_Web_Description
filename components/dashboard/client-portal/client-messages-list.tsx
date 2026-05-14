'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EmailSenderType } from '@prisma/client';
import { format, isThisYear, isToday } from 'date-fns';
import { TrashIcon } from 'lucide-react';

import { DeleteClientMessagesModal } from '@/components/dashboard/client-portal/delete-client-messages-modal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Routes } from '@/constants/routes';
import { cn, getInitials } from '@/lib/utils';

export type ClientMessagesListThread = {
  id: string;
  subject: string;
  preview: string;
  unread: boolean;
  updatedAt: Date;
  lastSenderType: EmailSenderType | null;
  lastSenderName: string | null;
};

export type ClientMessagesListProps = {
  threads: ClientMessagesListThread[];
  activeTab: 'inbox' | 'sent';
};

function formatThreadTime(date: Date): string {
  if (isToday(date)) return format(date, 'h:mm a');
  if (isThisYear(date)) return format(date, 'MMM d');
  return format(date, 'M/d/yy');
}

function senderLabelFor(
  thread: ClientMessagesListThread,
  activeTab: 'inbox' | 'sent'
): string {
  if (thread.lastSenderType === EmailSenderType.CONTACT) {
    return activeTab === 'sent' ? 'Me' : thread.lastSenderName ?? 'Me';
  }
  if (thread.lastSenderType === EmailSenderType.USER) {
    return thread.lastSenderName ?? 'Your team';
  }
  return activeTab === 'sent' ? 'Me' : 'Your team';
}

export function ClientMessagesList({
  threads,
  activeTab
}: ClientMessagesListProps): React.JSX.Element {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(
    () => new Set()
  );

  // Reset selection when the visible thread set changes (e.g., tab switch).
  React.useEffect(() => {
    setSelectedIds(new Set());
  }, [activeTab, threads.length]);

  const visibleSelectedIds = threads
    .map((t) => t.id)
    .filter((id) => selectedIds.has(id));
  const allSelected =
    threads.length > 0 && visibleSelectedIds.length === threads.length;
  const selectionCount = visibleSelectedIds.length;

  const handleToggleOne = (id: string): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleToggleAll = (): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        for (const t of threads) next.delete(t.id);
      } else {
        for (const t of threads) next.add(t.id);
      }
      return next;
    });
  };
  const handleClear = (): void => setSelectedIds(new Set());

  const handleDeleteOne = (threadId: string, subject: string): void => {
    NiceModal.show(DeleteClientMessagesModal, {
      ids: [threadId],
      subject,
      onDeleted: () => router.refresh()
    });
  };
  const handleBulkDelete = (): void => {
    if (visibleSelectedIds.length === 0) return;
    const ids = [...visibleSelectedIds];
    NiceModal.show(DeleteClientMessagesModal, {
      ids,
      onDeleted: () => {
        setSelectedIds(new Set());
        router.refresh();
      }
    });
  };

  if (threads.length === 0) {
    return (
      <section className="overflow-hidden rounded-lg border bg-card">
        <p className="px-4 py-8 text-center text-sm text-muted-foreground">
          {activeTab === 'inbox'
            ? "Your inbox is empty. When your project team emails you, it'll appear here."
            : "You haven't sent any messages yet."}
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-2 border-b bg-background px-3.5 py-2">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
          <Checkbox
            checked={allSelected}
            onCheckedChange={handleToggleAll}
            aria-label="Select all messages"
          />
          {selectionCount > 0 ? (
            <span className="font-medium text-foreground">
              {selectionCount} selected
            </span>
          ) : (
            <span>Select all</span>
          )}
        </label>
        {selectionCount > 0 && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={handleClear}
              >
              Clear
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 border-destructive/30 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleBulkDelete}
              >
              <TrashIcon className="mr-1 size-3.5 shrink-0" />
              Delete {selectionCount}
            </Button>
          </div>
        )}
      </div>
      <ul className="divide-y">
        {threads.map((t) => {
          const isUnreadRow = t.unread && activeTab === 'inbox';
          const isChecked = selectedIds.has(t.id);
          const senderLabel = senderLabelFor(t, activeTab);
          return (
            <li
              key={t.id}
              className={cn(
                'group flex items-center gap-2 px-3.5 py-2 transition-colors hover:bg-accent/40 hover:shadow-sm',
                isChecked && 'bg-accent/50',
                isUnreadRow && 'bg-background'
              )}
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => handleToggleOne(t.id)}
                aria-label={`Select message: ${t.subject}`}
                  />
              <Link
                href={`${Routes.ClientMessages}/${t.id}`}
                className="flex min-w-0 flex-1 items-center gap-2.5"
              >
                {isUnreadRow ? (
                  <span
                    className="size-2 shrink-0 rounded-full bg-sky-500"
                    aria-label="Unread"
                  />
                ) : (
                  <span className="size-2 shrink-0" aria-hidden />
                )}
                <Avatar className="size-6 shrink-0 rounded-full">
                  <AvatarFallback className="text-[10px] font-semibold">
                    {getInitials(senderLabel) || 'M'}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    'w-40 shrink-0 truncate text-xs',
                    isUnreadRow
                      ? 'font-bold text-foreground'
                      : 'text-foreground'
                  )}
                >
                  {senderLabel}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs">
                  <span
                    className={cn(
                      isUnreadRow
                        ? 'font-bold text-foreground'
                        : 'text-foreground'
                    )}
                  >
                    {t.subject}
                  </span>
                  {t.preview && (
                    <span className="text-muted-foreground">
                      {' — '}
                      {t.preview}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    'shrink-0 text-[11px]',
                    isUnreadRow
                      ? 'font-semibold text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {formatThreadTime(t.updatedAt)}
                </span>
              </Link>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteOne(t.id, t.subject);
                }}
                    aria-label="Delete message"
                title="Delete"
              >
                <TrashIcon className="size-3.5" />
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
