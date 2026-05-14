'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { useRouter } from 'next/navigation';
import { PaperclipIcon } from 'lucide-react';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { composeClientMessage } from '@/actions/client-portal/compose-client-message';
import {
  StagedAttachmentChip,
  type StagedAttachmentItem
} from '@/components/dashboard/ticket-attachment-ui';
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
import { Routes } from '@/constants/routes';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import {
  composeClientMessageSchema,
  type ComposeClientMessageSchema
} from '@/schemas/client-portal/compose-client-message-schema';

type UploadedAttachment = {
  storedName: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
};

type StagedAttachment = StagedAttachmentItem & {
  uploaded?: UploadedAttachment;
};

const MAX_ATTACHMENTS = 5;

export const ComposeMessageModal = NiceModal.create<NiceModalHocProps>(() => {
  const modal = useEnhancedModal();
  const router = useRouter();
  const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
  const methods = useZodForm({
    schema: composeClientMessageSchema,
    mode: 'onSubmit',
    defaultValues: { subject: '', body: '' }
  });
  const [staged, setStaged] = React.useState<StagedAttachment[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  // NiceModal.hide() doesn't unmount; reset RHF state on every reopen so
  // stale values from a prior submit don't persist.
  React.useEffect(() => {
    if (modal.visible) {
      methods.reset();
      setStaged([]);
    }
  }, [modal.visible, methods]);

  const uploadFiles = async (files: File[]): Promise<void> => {
    const room = MAX_ATTACHMENTS - staged.length;
    if (room <= 0) {
      toast.error(`Maximum ${MAX_ATTACHMENTS} files`);
      return;
    }
    const accepted = files.slice(0, room);
    if (accepted.length < files.length) {
      toast.error(`Only the first ${room} file(s) were attached`);
    }
    const items: StagedAttachment[] = accepted.map((file) => ({
      tempId: `compose-${Date.now()}-${Math.random()}`,
      file,
      state: 'uploading'
    }));
    setStaged((prev) => [...prev, ...items]);
    await Promise.all(
      items.map(async (item) => {
        const fd = new FormData();
        fd.append('files', item.file);
        try {
          const res = await fetch('/api/message-attachments', {
            method: 'POST',
            body: fd
          });
          if (!res.ok) {
            const data = await res
              .json()
              .catch(() => ({ error: 'Upload failed' }));
            throw new Error(data?.error ?? 'Upload failed');
          }
          const data = (await res.json()) as {
            attachments: UploadedAttachment[];
          };
          const uploaded = data.attachments[0];
          setStaged((prev) =>
            prev.map((s) =>
              s.tempId === item.tempId
                ? { ...s, state: 'uploaded', uploaded }
                : s
            )
          );
        } catch (error) {
          const msg = error instanceof Error ? error.message : 'Upload failed';
          setStaged((prev) =>
            prev.map((s) =>
              s.tempId === item.tempId
                ? { ...s, state: 'failed', error: msg }
                : s
            )
          );
          toast.error(`${item.file.name}: ${msg}`);
        }
      })
    );
  };

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) void uploadFiles(files);
    e.target.value = '';
  };

  const removeStaged = (tempId: string): void => {
    setStaged((prev) => prev.filter((s) => s.tempId !== tempId));
  };
  const title = 'New message';
  const description = 'Start a new conversation with your project team.';
  const canSubmit =
    !methods.formState.isSubmitting &&
    (!methods.formState.isSubmitted || methods.formState.isDirty);

  const onSubmit: SubmitHandler<ComposeClientMessageSchema> = async (
    values
  ) => {
    if (!canSubmit) return;
    if (staged.some((s) => s.state === 'uploading')) {
      toast.error('Please wait for uploads to finish');
      return;
    }
    const readyAttachments = staged
      .filter((s) => s.state === 'uploaded' && s.uploaded)
      .map((s) => s.uploaded as UploadedAttachment);
    const result = await composeClientMessage({
      ...values,
      attachments: readyAttachments
    });
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Message sent');
      methods.reset();
      setStaged([]);
      modal.handleClose();
      const threadId = result?.data?.threadId;
      if (threadId) {
        router.push(`${Routes.ClientMessages}/${threadId}`);
      } else {
        router.refresh();
      }
    } else {
      toast.error(result?.serverError ?? "Couldn't send message");
    }
  };

  const renderForm = (
    <form
      className={cn('space-y-4', !mdUp && 'p-4')}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <FormField
        control={methods.control}
        name="subject"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col space-y-1.5">
            <FormLabel required>Subject</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                maxLength={500}
                required
                placeholder="e.g. Question about my project timeline"
                disabled={methods.formState.isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="body"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col space-y-1.5">
            <FormLabel required>Message</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={8}
                maxLength={20000}
                required
                placeholder="Write your message…"
                disabled={methods.formState.isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {staged.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {staged.map((s) => (
            <StagedAttachmentChip
              key={s.tempId}
              item={s}
              onRemove={() => removeStaged(s.tempId)}
            />
          ))}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={onPickFiles}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={
          methods.formState.isSubmitting || staged.length >= MAX_ATTACHMENTS
        }
        className="inline-flex items-center gap-1 rounded px-1.5 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50"
        title="Attach files"
      >
        <PaperclipIcon className="size-3.5 shrink-0" />
        Attach files
      </button>
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
        onClick={methods.handleSubmit(onSubmit)}
      >
        Send message
      </Button>
    </>
  );

  return (
    <FormProvider {...methods}>
      {mdUp ? (
        <Dialog open={modal.visible}>
          <DialogContent
            className="max-h-[95vh] w-[95vw] max-w-lg overflow-y-auto"
            onClose={modal.handleClose}
            onAnimationEndCapture={modal.handleAnimationEndCapture}
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {renderForm}
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
            {renderForm}
            <DrawerFooter className="flex-col-reverse pt-4">
              {renderButtons}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </FormProvider>
  );
});
