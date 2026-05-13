'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { updateContactTags } from '@/actions/contacts/update-contact-tags';
import { TagInput } from '@/components/ui/tag-input';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { TagDto } from '@/types/dtos/tag-dto';

export type ContactTagsSectionProps =
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    contact: ContactDto;
  };

const DEBOUNCE_MS = 500;

function storageKeyFor(contactId: string): string {
  return `contact-tags-pending:${contactId}`;
}

function readPendingFromStorage(contactId: string): TagDto[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(storageKeyFor(contactId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(
      (t): t is TagDto =>
        t !== null &&
        typeof t === 'object' &&
        typeof t.id === 'string' &&
        typeof t.text === 'string'
    );
  } catch {
    return null;
  }
}

function writePendingToStorage(contactId: string, tags: TagDto[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      storageKeyFor(contactId),
      JSON.stringify(tags)
    );
  } catch {
    // storage full / disabled — fall back to in-memory state only
  }
}

function clearPendingFromStorage(contactId: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(storageKeyFor(contactId));
  } catch {
    // ignore
  }
}

function sameTags(a: TagDto[], b: TagDto[]): boolean {
  if (a.length !== b.length) return false;
  const aSet = new Set(a.map((t) => t.text));
  return b.every((t) => aSet.has(t.text));
}

export function ContactTagsSection({
  contact,
  ...other
}: ContactTagsSectionProps): React.JSX.Element {
  const [tags, setTags] = React.useState<TagDto[]>(contact.tags);

  // Refs used to coordinate the in-flight save, debounced timer, and queued
  // next-save (when changes arrive while a save is running).
  const inFlightRef = React.useRef(false);
  const queuedRef = React.useRef<TagDto[] | null>(null);
  const debounceTimerRef = React.useRef<number | null>(null);
  const latestTagsRef = React.useRef<TagDto[]>(contact.tags);

  // Keep the latest tags accessible to async callbacks without re-rendering.
  React.useEffect(() => {
    latestTagsRef.current = tags;
  }, [tags]);

  const syncToServer = React.useCallback(
    async (current: TagDto[]): Promise<void> => {
      if (inFlightRef.current) {
        // A save is already in flight; remember the latest values to send
        // after the current one finishes.
        queuedRef.current = current;
        return;
      }
      inFlightRef.current = true;
      try {
        const result = await updateContactTags({
          id: contact.id,
          tags: current
        });
        if (result?.serverError || result?.validationErrors) {
          // Keep localStorage so the user can retry on next mount/change.
          toast.error(
            typeof result?.serverError === 'string'
              ? result.serverError
              : "Couldn't save tags"
          );
          return;
        }
        // Successful sync. If no newer change is queued, clear the backup.
        if (queuedRef.current === null) {
          clearPendingFromStorage(contact.id);
        }
      } catch {
        toast.error("Couldn't save tags");
      } finally {
        inFlightRef.current = false;
        const next = queuedRef.current;
        queuedRef.current = null;
        if (next !== null && !sameTags(next, current)) {
          // Flush the queued change immediately (no debounce).
          void syncToServer(next);
        } else if (next !== null) {
          // Queued change is identical to what we just saved — just clear
          // localStorage if it's still there.
          clearPendingFromStorage(contact.id);
        }
      }
    },
    [contact.id]
  );

  const scheduleSync = React.useCallback(
    (next: TagDto[]) => {
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = window.setTimeout(() => {
        debounceTimerRef.current = null;
        void syncToServer(next);
      }, DEBOUNCE_MS);
    },
    [syncToServer]
  );

  // On mount, restore any pending tags persisted from a previous session.
  // If they differ from what the server returned, apply them locally and
  // sync immediately.
  React.useEffect(() => {
    const pending = readPendingFromStorage(contact.id);
    if (!pending) return;
    if (sameTags(pending, contact.tags)) {
      clearPendingFromStorage(contact.id);
      return;
    }
    setTags(pending);
    void syncToServer(pending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact.id]);

  // On unmount, flush any pending debounced save so the request fires even
  // if the user navigates away. localStorage backup is still in place in
  // case the request doesn't complete.
  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
        void syncToServer(latestTagsRef.current);
      }
    };
  }, [syncToServer]);

  const handleTagsChange = React.useCallback(
    (next: TagDto[]) => {
      setTags(next);
      writePendingToStorage(contact.id, next);
      scheduleSync(next);
    },
    [contact.id, scheduleSync]
  );

  return (
    <section {...other}>
      <div className="flex h-16 flex-row items-center p-6">
        <h3 className="text-sm font-semibold tracking-tight">Tags</h3>
      </div>
      <div className="p-6 pt-0">
        <TagInput
          allowDuplicates={false}
          inputFieldPosition="top"
          placeholder="Type your tag and press enter"
          tags={tags}
          onTagsChange={handleTagsChange}
          size="sm"
          variant="default"
          shape="rounded"
          borderStyle="default"
          textCase={null}
          textStyle="normal"
          animation="fadeIn"
          direction="row"
        />
      </div>
    </section>
  );
}
