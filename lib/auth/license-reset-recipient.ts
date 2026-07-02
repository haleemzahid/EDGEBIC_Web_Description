import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';

export interface LicenseResetRecipient {
  name: string;
  /** Linked dashboard User id, if the email also has a web account (audit only). */
  userId: string | null;
}

/**
 * Resolves the recipient for a LICENSE-SCOPED password reset: the email must be
 * registered under the license identified by `licenseKey`. This is the gate that
 * makes "license key + email" required to reset a password — a code is issued /
 * accepted only when the pair matches. Returns null when the license key is
 * unknown OR the email is not associated with that license.
 *
 * An email counts as associated with the license when it is:
 *   1. the license owner (`Purchase.email`), OR
 *   2. on the operator roster (`LicenseUser` for that purchase), OR
 *   3. holding a seat (`LicenseSeat.email` for that purchase).
 *
 * Lookups go through the SHA-256 key hash (the plaintext key is never queried),
 * exactly like activate/validate.
 */
export async function resolveLicenseScopedRecipient(
  normalizedEmail: string,
  licenseKey: string
): Promise<LicenseResetRecipient | null> {
  const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(licenseKey.trim());

  const purchase = await prisma.purchase.findUnique({
    where: { licenseKeyHash },
    select: { id: true, email: true, customerName: true }
  });
  if (!purchase) return null;

  let associated = purchase.email.toLowerCase() === normalizedEmail;
  let name: string | null = associated ? purchase.customerName : null;

  if (!associated) {
    const rosterUser = await prisma.licenseUser.findFirst({
      where: {
        purchaseId: purchase.id,
        email: { equals: normalizedEmail, mode: 'insensitive' }
      },
      select: { name: true }
    });
    if (rosterUser) {
      associated = true;
      name = rosterUser.name;
    }
  }

  if (!associated) {
    const seat = await prisma.licenseSeat.findFirst({
      where: {
        purchaseId: purchase.id,
        email: { equals: normalizedEmail, mode: 'insensitive' }
      },
      select: { id: true }
    });
    if (seat) associated = true;
  }

  if (!associated) return null;

  // Best-effort link to a dashboard User for the audit snapshot (never required).
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, name: true }
  });

  return {
    name: name || user?.name || 'there',
    userId: user?.id ?? null
  };
}
