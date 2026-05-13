'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { CalendarPlusIcon } from 'lucide-react';

import { BookMeetingModal } from '@/components/dashboard/calendar/book-meeting-modal';
import { Button } from '@/components/ui/button';

export function ClientBookMeetingButton(): React.JSX.Element {
  return (
    <Button
      type="button"
      variant="default"
      size="sm"
      onClick={() => NiceModal.show(BookMeetingModal)}
      className="gap-2"
    >
      <CalendarPlusIcon className="size-4" />
      Book a meeting
    </Button>
  );
}
