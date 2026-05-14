'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { SoftwareStatus } from '@prisma/client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
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

const statusOptions: { value: SoftwareStatus; label: string }[] = [
  { value: SoftwareStatus.UP_TO_DATE, label: 'Up to date' },
  { value: SoftwareStatus.UPDATE_AVAILABLE, label: 'Update available' },
  { value: SoftwareStatus.NEEDS_ATTENTION, label: 'Needs attention' },
  { value: SoftwareStatus.TRIAL, label: 'Trial' },
  { value: SoftwareStatus.NOT_INSTALLED, label: 'Not installed' }
];

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
        installedVersion: '',
        latestVersion: '',
        status: SoftwareStatus.UP_TO_DATE,
        githubUrl: '',
        docsUrl: '',
        downloadUrl: '',
        licenseKey: '',
        licenseType: '',
        os: '',
        database: '',
        installPath: '',
        notes: ''
      }
    });
    // NiceModal keeps the component mounted across show/hide cycles (only
    // `remove` unmounts it). React Hook Form holds field state on that mounted
    // instance, so submitting + closing + reopening would show the previous
    // values. Reset every time the modal becomes visible.
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

        {/* Basics */}
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
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={methods.control}
            name="installedVersion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Installed version</FormLabel>
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
            name="latestVersion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latest version</FormLabel>
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
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={methods.control}
            name="installDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Install date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((o) => (
                        <SelectItem
                          key={o.value}
                          value={o.value}
                        >
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Links */}
        <FormField
          control={methods.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub repository URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://github.com/org/repo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-3">
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
            name="downloadUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Download URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://download.example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* License */}
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={methods.control}
            name="licenseKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="USR-XXXX-XXXX"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="licenseType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Annual subscription"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={methods.control}
          name="seats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seats</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="5"
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Environment */}
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={methods.control}
            name="os"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OS</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Windows Server 2022"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="database"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Database</FormLabel>
                <FormControl>
                  <Input
                    placeholder="SQL Server 2019"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={methods.control}
          name="installPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Install path</FormLabel>
              <FormControl>
                <Input
                  placeholder="C:\Program Files\…"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
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
