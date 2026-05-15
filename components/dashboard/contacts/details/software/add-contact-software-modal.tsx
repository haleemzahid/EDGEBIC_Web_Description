'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { addContactSoftware } from '@/actions/contacts/add-contact-software';
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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import {
  addContactSoftwareSchema,
  type AddContactSoftwareSchema
} from '@/schemas/contacts/add-contact-software-schema';

export type AddContactSoftwareModalProps = NiceModalHocProps & {
  contactId: string;
};

export const AddContactSoftwareModal =
  NiceModal.create<AddContactSoftwareModalProps>(({ contactId }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: addContactSoftwareSchema,
      mode: 'onSubmit',
      defaultValues: {
        contactId,
        name: '',
        docsUrl: '',
        installedVersion: '',
        notes: ''
      }
    });
    // NiceModal keeps the component mounted across show/hide cycles. Reset
    // every time the modal becomes visible so reopening starts fresh.
    React.useEffect(() => {
      if (modal.visible) {
        methods.reset();
      }
    }, [modal.visible, methods]);

    const canSubmit =
      !methods.formState.isSubmitting &&
      (!methods.formState.isSubmitted || methods.formState.isDirty);
    const onSubmit: SubmitHandler<AddContactSoftwareSchema> = async (
      values
    ) => {
      if (!canSubmit) return;
      const result = await addContactSoftware(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Software added');
        methods.reset();
        modal.handleClose();
      } else {
        toast.error("Couldn't add software");
      }
    };
    const title = 'Add software';
    const description =
      'Track a product installed for this contact. Only Product name is required.';
    const renderForm = (
      <form
        className={cn('space-y-4', !mdUp && 'p-4')}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <input
          type="hidden"
          {...methods.register('contactId')}
        />

        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. EDGEBI"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="docsUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documentation URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://docs.example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="installedVersion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Version</FormLabel>
              <FormControl>
                <Input
                  placeholder="v1.0.0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any specifics about this installation…"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    );
    const renderButtons = (
      <>
        <Button
          type="button"
          variant="outline"
          onClick={modal.handleClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="default"
          disabled={!canSubmit}
          loading={methods.formState.isSubmitting}
          onClick={methods.handleSubmit(onSubmit)}
        >
          Add software
        </Button>
      </>
    );
    if (mdUp) {
      return (
        <FormProvider {...methods}>
          <Dialog
            open={modal.visible}
            onOpenChange={modal.handleOpenChange}
          >
            <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              {renderForm}
              <DialogFooter>{renderButtons}</DialogFooter>
            </DialogContent>
          </Dialog>
        </FormProvider>
      );
    }
    return (
      <FormProvider {...methods}>
        <Drawer
          open={modal.visible}
          onOpenChange={modal.handleOpenChange}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            {renderForm}
            <DrawerFooter>{renderButtons}</DrawerFooter>
          </DrawerContent>
        </Drawer>
      </FormProvider>
    );
  });
