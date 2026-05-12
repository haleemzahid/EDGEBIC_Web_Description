'use server';

import { revalidateTag } from 'next/cache';

import { authActionClient } from '@/actions/safe-action';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { updateContactTaskSchema } from '@/schemas/contacts/update-contact-task-schema';

export const updateContactTask = authActionClient
  .metadata({ actionName: 'updateContactTask' })
  .schema(updateContactTaskSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const task = await prisma.contactTask.update({
      where: {
        id: parsedInput.id,
        contact: {
          organizationId: session.user.organizationId
        }
      },
      data: {
        title: parsedInput.title,
        description: parsedInput.description,
        status: parsedInput.status,
        priority: parsedInput.priority,
        category:
          parsedInput.category === undefined
            ? undefined
            : (parsedInput.category ?? null),
        assigneeUserId:
          parsedInput.assigneeUserId === undefined
            ? undefined
            : parsedInput.assigneeUserId === '' ||
                parsedInput.assigneeUserId === null
              ? null
              : parsedInput.assigneeUserId,
        meetingId:
          parsedInput.meetingId === undefined
            ? undefined
            : parsedInput.meetingId === '' || parsedInput.meetingId === null
              ? null
              : parsedInput.meetingId,
        dueDate: parsedInput.dueDate ? parsedInput.dueDate : null
      },
      select: { contactId: true }
    });

    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTasks,
        session.user.organizationId,
        task.contactId
      )
    );
  });
