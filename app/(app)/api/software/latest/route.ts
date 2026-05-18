import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import { SystemFingerprintGenerator } from '@/lib/license/system-fingerprint';
import { rateLimit } from '@/lib/network/rate-limit';

// Secure software-update endpoint. Installed software POSTs its license key
// (machine-to-machine — no browser session) and gets back only safe,
// non-sensitive fields so it can decide whether to self-update.
//
// Auth + linkage reuse existing infrastructure:
//   licenseKey --hash--> Purchase (licenseKeyHash) --email--> Contact
//   --> ContactSoftware rows.
//
// Hardening (all reuse existing infra):
//   - IP rate limiting (lib/network/rate-limit)
//   - Machine binding: if the license was activated & bound to a machine,
//     the caller must prove it's the same machine (system-fingerprint)
//   - Failed/blocked attempts logged to LicenseActivation
//
// NOTE: ContactSoftware has no `releaseDate` column yet, so `releaseDate`
// is sourced from `updatedAt` as a stopgap. A real column needs a migration.
//
// Write-back: when the caller also sends `product` + `version`, after the
// license validates we record that software against the customer's CRM
// contact (create the ContactSoftware row if missing, otherwise bump its
// installed version to the reported one). This keeps the customer's CRM
// software list in sync with what they actually have installed.

const requestSchema = z.object({
  licenseKey: z.string().min(1),
  // Optional. Required only if the license is machine-bound (activated).
  processorId: z.string().min(1).optional(),
  // Optional: narrow the response to a single product by name. Also the
  // product to record when `version` is supplied.
  product: z.string().min(1).optional(),
  // Optional: the version the client currently has installed. When sent
  // together with `product`, the customer's software is added/updated to it.
  version: z.string().min(1).max(64).optional(),
  // Optional: download URL to store for this product on the customer's
  // ContactSoftware row (set together with `product`).
  downloadUrl: z.string().url().max(2048).optional()
});

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

// Mirrors the activate route's logger. Only called when we have a real
// purchaseId (LicenseActivation.purchaseId is an FK to Purchase).
async function logAttempt(
  purchaseId: string,
  status: 'success' | 'failed' | 'blocked',
  errorMessage: string | null,
  ctx: {
    email: string;
    systemFingerprint: string;
    processorId: string;
    ipAddress: string;
    userAgent: string;
  }
): Promise<void> {
  try {
    await prisma.licenseActivation.create({
      data: {
        purchaseId,
        email: ctx.email,
        systemFingerprint: ctx.systemFingerprint,
        processorId: ctx.processorId,
        ipAddress: ctx.ipAddress,
        userAgent: ctx.userAgent,
        status,
        errorMessage
      }
    });
  } catch (error) {
    console.error('Failed to log software-latest attempt:', error);
  }
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || '';

  try {
    // 1. Rate limit by IP (reuses the in-memory limiter used by auth).
    const limiter = rateLimit({ intervalInMs: 60 * 1000 });
    const rl = limiter.check(20, `software-latest:${clientIp}`);
    if (rl.isRateLimited) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { licenseKey, processorId, product, version, downloadUrl } =
      requestSchema.parse(body);

    const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(licenseKey);

    const purchase = await prisma.purchase.findUnique({
      where: { licenseKeyHash },
      select: {
        id: true,
        email: true,
        licenseStatus: true,
        systemFingerprint: true,
        processorId: true
      }
    });

    const { fingerprint } =
      SystemFingerprintGenerator.generateFingerprint(request);

    if (!purchase) {
      // No real purchaseId → cannot write a LicenseActivation row (FK).
      console.warn(
        `software-latest: unknown license key from ip=${clientIp}`
      );
      return NextResponse.json(
        { error: 'License not found' },
        { status: 404 }
      );
    }

    const logCtx = {
      email: purchase.email,
      systemFingerprint: fingerprint,
      processorId: processorId ?? '',
      ipAddress: clientIp,
      userAgent
    };

    if (purchase.licenseStatus !== 'active') {
      await logAttempt(
        purchase.id,
        'blocked',
        'License is not active',
        logCtx
      );
      return NextResponse.json(
        { error: 'License is not active' },
        { status: 403 }
      );
    }

    // 2. Machine binding — enforced only for licenses that were activated
    // and bound to a machine (dummy/unbound licenses skip this, so test
    // data still works).
    if (purchase.systemFingerprint || purchase.processorId) {
      const fingerprintOk =
        !purchase.systemFingerprint ||
        purchase.systemFingerprint === fingerprint;
      const processorOk =
        !purchase.processorId || purchase.processorId === processorId;

      if (!fingerprintOk || !processorOk) {
        await logAttempt(
          purchase.id,
          'blocked',
          'System validation failed',
          logCtx
        );
        return NextResponse.json(
          { error: 'System validation failed' },
          { status: 403 }
        );
      }
    }

    // Purchase links to the CRM contact by email. Pick the original
    // (oldest) match deterministically so repeated calls always resolve to
    // the same contact and never spill software onto a later duplicate.
    const contact = await prisma.contact.findFirst({
      where: {
        email: { equals: purchase.email, mode: 'insensitive' }
      },
      orderBy: { createdAt: 'asc' },
      select: { id: true }
    });

    if (!contact) {
      await logAttempt(purchase.id, 'success', null, logCtx);
      return NextResponse.json({ software: [] });
    }

    // Write-back: record the reported software/version against the
    // customer. Best-effort — a failure here must not break the client's
    // self-update lookup, so it's isolated and logged.
    if (product && version) {
      try {
        const existingSoftware = await prisma.contactSoftware.findFirst({
          where: {
            contactId: contact.id,
            name: { equals: product, mode: 'insensitive' }
          },
          select: { id: true, latestVersion: true }
        });

        if (existingSoftware) {
          await prisma.contactSoftware.update({
            where: { id: existingSoftware.id },
            data: {
              installedVersion: version,
              // Keep latestVersion meaningful: seed it on first sight, but
              // never let a client downgrade the known-latest value.
              latestVersion: existingSoftware.latestVersion || version,
              // Only overwrite the stored URL when one is supplied.
              ...(downloadUrl ? { downloadUrl } : {})
            }
          });
        } else {
          await prisma.contactSoftware.create({
            data: {
              contactId: contact.id,
              name: product,
              installedVersion: version,
              latestVersion: version,
              downloadUrl: downloadUrl ?? null
            }
          });
        }
      } catch (writeError) {
        console.error(
          'software-latest: failed to record customer software',
          writeError
        );
      }
    }

    const rows = await prisma.contactSoftware.findMany({
      where: {
        contactId: contact.id,
        ...(product
          ? { name: { equals: product, mode: 'insensitive' } }
          : {})
      },
      orderBy: { updatedAt: 'desc' },
      // Only safe fields — never licenseKey, installPath, etc.
      // `notes` is intentionally exposed as the product "description".
      select: {
        name: true,
        latestVersion: true,
        downloadUrl: true,
        notes: true,
        updatedAt: true
      }
    });

    await logAttempt(purchase.id, 'success', null, logCtx);

    const software = rows.map((r) => ({
      productName: r.name,
      description: r.notes,
      latestVersion: r.latestVersion,
      version: r.latestVersion,
      downloadUrl: r.downloadUrl,
      releaseDate: r.updatedAt
    }));

    return NextResponse.json({ software });
  } catch (error) {
    console.error('Software latest-version lookup error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to look up software' },
      { status: 500 }
    );
  }
}
