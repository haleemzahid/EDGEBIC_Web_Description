import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';

// Secure software-update endpoint. Installed software POSTs its license key
// (machine-to-machine — no browser session) and gets back only safe,
// non-sensitive fields so it can decide whether to self-update.
//
// Auth + linkage reuse existing infrastructure:
//   licenseKey --hash--> Purchase (licenseKeyHash) --email--> Contact
//   --> ContactSoftware rows.
//
// NOTE: ContactSoftware has no `releaseDate` column yet, so `releaseDate`
// is sourced from `updatedAt` (when the latest-version row was last
// changed) as a stopgap. A dedicated column requires a Prisma migration.

const requestSchema = z.object({
  licenseKey: z.string().min(1),
  // Optional: narrow the response to a single product by name.
  product: z.string().min(1).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { licenseKey, product } = requestSchema.parse(body);

    const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(licenseKey);

    const purchase = await prisma.purchase.findUnique({
      where: { licenseKeyHash },
      select: { email: true, licenseStatus: true }
    });

    if (!purchase) {
      return NextResponse.json(
        { error: 'License not found' },
        { status: 404 }
      );
    }

    if (purchase.licenseStatus !== 'active') {
      return NextResponse.json(
        { error: 'License is not active' },
        { status: 403 }
      );
    }

    // Purchase links to the CRM contact by email (same convention the rest
    // of the system uses to dedupe public submissions).
    const contact = await prisma.contact.findFirst({
      where: {
        email: { equals: purchase.email, mode: 'insensitive' }
      },
      select: { id: true }
    });

    if (!contact) {
      return NextResponse.json({ software: [] });
    }

    const rows = await prisma.contactSoftware.findMany({
      where: {
        contactId: contact.id,
        ...(product
          ? { name: { equals: product, mode: 'insensitive' } }
          : {})
      },
      orderBy: { updatedAt: 'desc' },
      // Only safe fields — never licenseKey, installPath, notes, etc.
      select: {
        name: true,
        latestVersion: true,
        downloadUrl: true,
        updatedAt: true
      }
    });

    const software = rows.map((r) => ({
      productName: r.name,
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
