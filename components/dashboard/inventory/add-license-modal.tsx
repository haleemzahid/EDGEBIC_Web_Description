'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { addLicense } from '@/actions/inventory/add-license';
import { Button } from '@/components/ui/button';
import { Combobox, type ComboboxOption } from '@/components/ui/combobox';
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
import type { ContactOption } from '@/data/contacts/get-contact-options';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import {
  addLicenseSchema,
  type AddLicenseSchema
} from '@/schemas/inventory/add-license-schema';

export type AddLicenseModalProps = NiceModalHocProps & {
  contactOptions: ContactOption[];
};

export const AddLicenseModal = NiceModal.create<AddLicenseModalProps>(
  ({ contactOptions }) => {
    const modal = useEnhancedModal();
    const router = useRouter();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: addLicenseSchema,
      mode: 'onSubmit',
      defaultValues: {
        customerName: '',
        email: '',
        licenseKey: ''
      }
    });

    // Email is unique per contact, so it's the option value. Label shows
    // the name + email so the dropdown is easy to scan/search.
    const options = React.useMemo<ComboboxOption[]>(
      () =>
        contactOptions.map((c) => ({
          value: c.email,
          label: c.name ? `${c.name} — ${c.email}` : c.email
        })),
      [contactOptions]
    );

    // NiceModal keeps the component mounted across show/hide cycles. Reset
    // every time the modal becomes visible so reopening starts fresh.
    React.useEffect(() => {
      if (modal.visible) {
        methods.reset();
      }
    }, [modal.visible, methods]);

    const handleSelectContact = (email: string): void => {
      const picked = contactOptions.find((c) => c.email === email);
      methods.setValue('email', picked?.email ?? '', { shouldDirty: true });
      methods.setValue('customerName', picked?.name ?? '', {
        shouldDirty: true
      });
      methods.clearErrors(['customerName', 'email']);
    };

    const canSubmit = !methods.formState.isSubmitting;
    const onSubmit: SubmitHandler<AddLicenseSchema> = async (values) => {
      if (!canSubmit) return;
      const result = await addLicense(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('License added');
        methods.reset();
        modal.handleClose();
        router.refresh();
      } else {
        toast.error(result?.serverError ?? "Couldn't add license");
      }
    };

    const title = 'Add license';
    const description =
      'Issue a license key to a CRM contact. Pick the contact, then enter the key.';
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
              <FormLabel>CRM contact *</FormLabel>
              <FormControl>
                <Combobox
                  options={options}
                  value={field.value}
                  onChange={handleSelectContact}
                  placeholder="Select a contact…"
                  searchPlaceholder="Search CRM by name or email…"
                  emptyText="No contacts found."
                  disabled={methods.formState.isSubmitting}
                  className="h-9"
                />
              </FormControl>
              <FormDescription>
                The license is issued to this contact&apos;s name and email.
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
          Add license
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
  }
);
