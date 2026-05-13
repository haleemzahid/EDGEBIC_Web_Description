'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

import { confirmClientTicketResolved } from '@/actions/client-portal/confirm-client-ticket-resolved';
import { Button } from '@/components/ui/button';

export type ConfirmResolvedButtonProps = {
  ticketId: string;
};

export function ConfirmResolvedButton({
  ticketId
}: ConfirmResolvedButtonProps): React.JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const handleClick = (): void => {
    startTransition(async () => {
      const result = await confirmClientTicketResolved({ ticketId });
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Ticket closed. Thanks for confirming.');
        router.refresh();
      } else {
        toast.error(result?.serverError ?? "Couldn't close the ticket.");
      }
    });
  };

  return (
    <Button
      type="button"
      variant="default"
      size="sm"
      disabled={isPending}
      onClick={handleClick}
      className="gap-1.5"
    >
      <CheckIcon className="size-3.5" />
      {isPending ? 'Closing…' : 'Confirm resolved'}
    </Button>
  );
}
