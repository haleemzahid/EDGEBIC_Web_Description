'use server';

import { authActionClient } from '@/actions/safe-action';
import { isAdmin } from '@/lib/auth/permissions';
import { prisma } from '@/lib/db/prisma';
import { ForbiddenError, PreConditionError } from '@/lib/validation/exceptions';
import { rejectLicenseRequestsSchema } from '@/schemas/licenses/reject-license-requests-schema';

// Reject a batch of pending license requests with an optional note (surfaced to
// the desktop app via GET /api/license/request polling).
export const rejectLicenseRequests = authActionClient
  .metadata({ actionName: 'rejectLicenseRequests' })
  .schema(rejectLicenseRequestsSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    if (!(await isAdmin(session.user.id))) {
      throw new ForbiddenError('Only admins can reject license requests.');
    }

    const { count } = await prisma.licenseRequest.updateMany({
      where: { id: { in: parsedInput.requestIds }, status: 'pending' },
      data: {
        status: 'rejected',
        note: parsedInput.note,
        reviewedByUserId: session.user.id,
        reviewedAt: new Date()
      }
    });

    if (count === 0) {
      throw new PreConditionError(
        'None of the selected requests are still pending.'
      );
    }

    return { rejectedCount: count };
  });
