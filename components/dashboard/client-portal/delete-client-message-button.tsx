'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

import { deleteClientMessages } from '@/actions/client-portal/delete-client-messages';
import { Button } from '@/components/ui/button';

export function DeleteClientMessageButton({
  threadId,
  subject
}: {
  threadId: string;
  subject: string;
}): React.JSX.Element {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  const handleClick = (e: React.MouseEvent): void => {
    // Stop the surrounding <Link> from navigating to the thread.
    e.preventDefault();
    e.stopPropagation();
    const confirmed = window.confirm(
      `Delete "${subject || 'this message'}"? This can't be undone.`
    );
    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteClientMessages({ ids: [threadId] });
      if (result?.serverError || result?.validationErrors) {
        toast.error(result?.serverError ?? "Couldn't delete message");
        return;
      }
      toast.success('Message deleted');
      router.refresh();
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      onClick={handleClick}
      disabled={pending}
      title="Delete"
      aria-label="Delete message"
    >
      <TrashIcon className="size-3.5" />
    </Button>
  );
}
