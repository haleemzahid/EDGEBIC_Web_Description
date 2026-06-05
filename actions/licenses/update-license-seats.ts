'use server';

import { authActionClient } from '@/actions/safe-action';
import { isAdmin } from '@/lib/auth/permissions';
import { prisma } from '@/lib/db/prisma';
import {
  ForbiddenError,
  NotFoundError,
  PreConditionError
} from '@/lib/validation/exceptions';
import { updateLicenseSeatsSchema } from '@/schemas/licenses/seat-management-schemas';

// Change a key's device cap. Raising it adds capacity immediately. Lowering it
// is only allowed down to the number of seats currently in use — release seats
// first to go lower.
export const updateLicenseSeats = authActionClient
  .metadata({ actionName: 'updateLicenseSeats' })
  .schema(updateLicenseSeatsSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    if (!(await isAdmin(session.user.id))) {
      throw new ForbiddenError('Only admins can change seat counts.');
    }

    const purchase = await prisma.purchase.findUnique({
      where: { id: parsedInput.purchaseId },
      select: { id: true }
    });
    if (!purchase) {
      throw new NotFoundError('License not found.');
    }

    const activeSeats = await prisma.licenseSeat.count({
      where: { purchaseId: parsedInput.purchaseId, status: 'active' }
    });
    if (parsedInput.seats < activeSeats) {
      throw new PreConditionError(
        `${activeSeats} seats are in use. Release seats before lowering the cap to ${parsedInput.seats}.`
      );
    }

    await prisma.purchase.update({
      where: { id: parsedInput.purchaseId },
      data: { seats: parsedInput.seats }
    });

    return { purchaseId: parsedInput.purchaseId, seats: parsedInput.seats };
  });
