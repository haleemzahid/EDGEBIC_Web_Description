'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { ContactStage } from '@prisma/client';
import { CheckIcon, MailPlusIcon } from 'lucide-react';

import { InviteMemberModal } from '@/components/dashboard/settings/organization/members/invite-member-modal';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ProfileDto } from '@/types/dtos/profile-dto';

export type ContactInviteUserButtonProps = {
  contact: ContactDto;
  profile: ProfileDto;
};

export function ContactInviteUserButton({
  contact,
  profile
}: ContactInviteUserButtonProps): React.JSX.Element | null {
  if (contact.stage !== ContactStage.WON || !contact.email) {
    return null;
  }

  const status = contact.inviteStatus ?? 'NONE';
  const alreadyInvited =
    status === 'PENDING' ||
    status === 'ACCEPTED' ||
    status === 'USER_EXISTS';

  const label =
    status === 'ACCEPTED' || status === 'USER_EXISTS'
      ? 'Joined'
      : status === 'PENDING'
        ? 'Invited'
        : 'Invite user';

  const tooltip =
    status === 'ACCEPTED' || status === 'USER_EXISTS'
      ? 'This contact has already joined your organization.'
      : status === 'PENDING'
        ? 'An invitation has already been sent. Manage it from Settings → Members.'
        : 'Send a client-portal invitation to this contact.';

  const handleClick = (): void => {
    if (alreadyInvited) {
      return;
    }
    NiceModal.show(InviteMemberModal, {
      profile,
      defaultEmail: contact.email,
      emailReadOnly: true
    });
  };

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={alreadyInvited ? 'outline' : 'default'}
          size="default"
          className="whitespace-nowrap"
          disabled={alreadyInvited}
          onClick={handleClick}
        >
          {alreadyInvited ? (
            <CheckIcon className="mr-2 size-4 shrink-0" />
          ) : (
            <MailPlusIcon className="mr-2 size-4 shrink-0" />
          )}
          {label}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
