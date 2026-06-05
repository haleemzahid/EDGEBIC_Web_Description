'use server';

import { authActionClient } from '@/actions/safe-action';
import { isAdmin } from '@/lib/auth/permissions';
import { prisma } from '@/lib/db/prisma';
import {
  ForbiddenError,
  NotFoundError,
  PreConditionError
} from '@/lib/validation/exceptions';
import { releaseSeatSchema } from '@/schemas/licenses/seat-management-schemas';

// Free a consumed seat so another device can activate against the key. The seat
// row is kept (status = 'released') for history; re-activating the same machine
// reclaims it if capacity allows.
export const releaseSeat = authActionClient
  .metadata({ actionName: 'releaseSeat' })
  .schema(releaseSeatSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    if (!(await isAdmin(session.user.id))) {
      throw new ForbiddenError('Only admins can release seats.');
    }

    const seat = await prisma.licenseSeat.findUnique({
      where: { id: parsedInput.seatId },
      select: { id: true, status: true, purchaseId: true }
    });
    if (!seat) {
      throw new NotFoundError('Seat not found.');
    }
    if (seat.status !== 'active') {
      throw new PreConditionError('That seat is already released.');
    }

    await prisma.licenseSeat.update({
      where: { id: seat.id },
      data: { status: 'released', releasedAt: new Date() }
    });

    return { purchaseId: seat.purchaseId };
  });
