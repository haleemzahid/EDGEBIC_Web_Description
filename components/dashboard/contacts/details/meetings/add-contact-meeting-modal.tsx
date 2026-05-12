'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

export type AddContactMeetingModalProps = NiceModalHocProps & {
  contactId: string;
  contactName?: string;
};

const CALENDLY_EMBED_URL =
  'https://calendly.com/jc-123/new-meeting?embed_domain=localhost&embed_type=Inline&hide_gdpr_banner=1';

export const AddContactMeetingModal =
  NiceModal.create<AddContactMeetingModalProps>(({ contactName }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const title = contactName
      ? `Book a meeting with ${contactName}`
      : 'Book a meeting';
    const description =
      'Pick a date and time below. The booking syncs to your CRM automatically.';
    const renderBody = (
      <div className={cn(!mdUp && 'p-4')}>
        <div className="overflow-hidden rounded-md border bg-background">
          <iframe
            src={CALENDLY_EMBED_URL}
            title="Calendly · Book a meeting"
            className="block h-[640px] w-full border-0"
          />
        </div>
      </div>
    );
    const renderButtons = (
      <Button
        type="button"
        variant="outline"
        onClick={modal.handleClose}
      >
        Close
      </Button>
    );
    return (
      <>
        {mdUp ? (
          <Dialog open={modal.visible}>
            <DialogContent
              className="max-h-[95vh] w-[95vw] max-w-3xl overflow-y-auto"
              onClose={modal.handleClose}
              onAnimationEndCapture={modal.handleAnimationEndCapture}
            >
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              {renderBody}
              <DialogFooter>{renderButtons}</DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer
            open={modal.visible}
            onOpenChange={modal.handleOpenChange}
          >
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
              </DrawerHeader>
              {renderBody}
              <DrawerFooter className="flex-col-reverse pt-4">
                {renderButtons}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </>
    );
  });
