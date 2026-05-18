'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { updateContactSoftware } from '@/actions/contacts/update-contact-software';
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
import { Textarea } from '@/components/ui/textarea';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import {
  updateContactSoftwareSchema,
  type UpdateContactSoftwareSchema
} from '@/schemas/contacts/update-contact-software-schema';
import type { ContactSoftwareDto } from '@/types/dtos/contact-software-dto';

export type EditContactSoftwareModalProps = NiceModalHocProps & {
  software: ContactSoftwareDto;
};

export const EditContactSoftwareModal =
  NiceModal.create<EditContactSoftwareModalProps>(({ software }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: updateContactSoftwareSchema,
      mode: 'onSubmit',
      defaultValues: {
        id: software.id,
        name: software.name,
        installedVersion: software.installedVersion ?? '',
        latestVersion: software.latestVersion ?? '',
        installDate: software.installDate ?? null,
        status: software.status,
        githubUrl: software.githubUrl ?? '',
        docsUrl: software.docsUrl ?? '',
        downloadUrl: software.downloadUrl ?? '',
        licenseKey: software.licenseKey ?? '',
        licenseType: software.licenseType ?? '',
        seats: software.seats ?? null,
        os: software.os ?? '',
        database: software.database ?? '',
        installPath: software.installPath ?? '',
        notes: software.notes ?? ''
      }
    });
    const [uploading, setUploading] = React.useState(false);
    const [uploadedFileName, setUploadedFileName] = React.useState<
      string | null
    >(null);

    // NiceModal keeps the component mounted across show/hide cycles, so
    // without this the form would keep the FIRST software row's values
    // (including its id) and Edit would save onto the wrong software.
    // Re-sync to the currently-opened software every time it opens.
    React.useEffect(() => {
      if (modal.visible) {
        methods.reset({
          id: software.id,
          name: software.name,
          installedVersion: software.installedVersion ?? '',
          latestVersion: software.latestVersion ?? '',
          installDate: software.installDate ?? null,
          status: software.status,
          githubUrl: software.githubUrl ?? '',
          docsUrl: software.docsUrl ?? '',
          downloadUrl: software.downloadUrl ?? '',
          licenseKey: software.licenseKey ?? '',
          licenseType: software.licenseType ?? '',
          seats: software.seats ?? null,
          os: software.os ?? '',
          database: software.database ?? '',
          installPath: software.installPath ?? '',
          notes: software.notes ?? ''
        });
        setUploading(false);
        setUploadedFileName(null);
      }
    }, [modal.visible, methods, software]);

    const handleFileChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const body = new FormData();
        body.append('file', file);
        const res = await fetch('/api/software-files', {
          method: 'POST',
          body
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json?.error || 'Upload failed');
        }
        methods.setValue('downloadUrl', json.downloadUrl, {
          shouldDirty: true
        });
        setUploadedFileName(json.fileName ?? file.name);
        toast.success('Installer uploaded');
      } catch (error) {
        e.target.value = '';
        setUploadedFileName(null);
        toast.error(
          error instanceof Error ? error.message : "Couldn't upload file"
        );
      } finally {
        setUploading(false);
      }
    };

    const canSubmit =
      !uploading &&
      !methods.formState.isSubmitting &&
      (!methods.formState.isSubmitted || methods.formState.isDirty);
    const onSubmit: SubmitHandler<UpdateContactSoftwareSchema> = async (
      values
    ) => {
      if (!canSubmit) return;
      const result = await updateContactSoftware(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Software updated');
        modal.handleClose();
      } else {
        toast.error("Couldn't update software");
      }
    };
    const title = 'Edit software';
    const description = `Update details for ${software.name}.`;
    const renderForm = (
      <form
        className={cn('space-y-4', !mdUp && 'p-4')}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <input
          type="hidden"
          {...methods.register('id')}
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

        <FormField
          control={methods.control}
          name="downloadUrl"
          render={() => (
            <FormItem>
              <FormLabel>Installer file</FormLabel>
              {software.downloadUrl && !uploadedFileName ? (
                <Button
                  type="button"
                  variant="link"
                  asChild
                  className="h-auto justify-start p-0 text-sm"
                >
                  <a
                    href={software.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Current file — download
                  </a>
                </Button>
              ) : null}
              <FormControl>
                <Input
                  type="file"
                  accept=".exe,.msi,.zip,.dmg,.pkg,.appimage,.deb,.rpm,.gz,.tar,.7z,.bin,.apk,.jar,.run"
                  disabled={uploading}
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormDescription>
                {uploading
                  ? 'Uploading…'
                  : uploadedFileName
                    ? `Uploaded: ${uploadedFileName}`
                    : software.downloadUrl
                      ? 'A file is already attached. Choose a file only to replace it.'
                      : 'Optional. Upload an installer (.exe, .msi, .zip, …). Max 1 GB.'}
              </FormDescription>
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
          Save changes
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
