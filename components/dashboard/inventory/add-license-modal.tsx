'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { addLicense } from '@/actions/inventory/add-license';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import {
  addLicenseSchema,
  type AddLicenseSchema
} from '@/schemas/inventory/add-license-schema';

export type AddLicenseModalProps = NiceModalHocProps;

export const AddLicenseModal = NiceModal.create<AddLicenseModalProps>(() => {
  const modal = useEnhancedModal();
  const router = useRouter();
  const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
  const methods = useZodForm({
    schema: addLicenseSchema,
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      licenseKey: ''
    }
  });

  // NiceModal keeps the component mounted across show/hide cycles. Reset
  // every time the modal becomes visible so reopening starts fresh.
  React.useEffect(() => {
    if (modal.visible) {
      methods.reset();
    }
  }, [modal.visible, methods]);

  const canSubmit = !methods.formState.isSubmitting;
  const onSubmit: SubmitHandler<AddLicenseSchema> = async (values) => {
    if (!canSubmit) return;
    const result = await addLicense(values);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('License saved');
      methods.reset();
      modal.handleClose();
      router.refresh();
    } else {
      toast.error(result?.serverError ?? "Couldn't save license");
    }
  };

  const title = 'Add license';
  const description =
    "Enter the customer's email and license key. If the email already has a license it's updated; otherwise a new one is created.";
  const renderForm = (
    <form
      className={cn('space-y-4', !mdUp && 'p-4')}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <FormField
        control={methods.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email *</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="customer@example.com"
                autoComplete="off"
                {...field}
              />
            </FormControl>
            <FormDescription>
              If this email exists in CRM its contact name is used; if not,
              the license is added directly.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={methods.control}
        name="licenseKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>License key *</FormLabel>
            <FormControl>
              <Input
                placeholder="NTCB-XXXX-XXXX-XXXX-XXXX-XXXX"
                autoComplete="off"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Entered manually — not auto-generated.
            </FormDescription>
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
        Save license
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
