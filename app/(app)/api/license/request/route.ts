import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/db/prisma';
import { SystemFingerprintGenerator } from '@/lib/license/system-fingerprint';
import { rateLimit } from '@/lib/network/rate-limit';

// Public endpoint (no session) — the desktop app self-registers a license
// request for the machine it runs on, auto-including every operator email it
// knows about. Requests queue with status 'pending' until an admin approves a
// batch, which mints one key for N devices. The app then polls GET to pick up
// its key. The license KEY is the shared secret; these requests carry no secret
// until approval, so we only need basic abuse protection (rate limit + idempotency).

const requestSchema = z.object({
  email: z.string().email().max(255),
  customerName: z.string().max(255).optional(),
  company: z.string().max(255).optional(),
  product: z.string().max(255).optional(),
  deviceName: z.string().max(255).optional(),
  processorId: z.string().min(1).max(255),
  // Accepted for parity with /api/license/activate; the fingerprint is derived
  // from request headers, not this field.
  systemInfo: z.string().max(2048).optional(),
  operatorEmails: z.array(z.string().email().max(255)).max(200).optional()
});

const limiter = rateLimit({ intervalInMs: 60_000 });

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function deriveGroupKey(email: string): string | null {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain || null;
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const { isRateLimited } = limiter.check(30, `license-request:${clientIp}`);
    if (isRateLimited) {
      return NextResponse.json(
        { error: 'Too many requests. Try again shortly.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const input = requestSchema.parse(body);
    const email = input.email.trim().toLowerCase();
    const userAgent = request.headers.get('user-agent') || '';

    const { fingerprint: systemFingerprint } =
      SystemFingerprintGenerator.generateFingerprint(request);

    // Normalise + de-dupe the operator roster (always include the requester).
    const operatorEmails = Array.from(
      new Set(
        [email, ...(input.operatorEmails ?? [])].map((e) =>
          e.trim().toLowerCase()
        )
      )
    );

    // If this exact machine already has an approved request, hand back the key
    // so a re-request is harmless (idempotent pickup).
    const approved = await prisma.licenseRequest.findFirst({
      where: { email, systemFingerprint, status: 'approved' },
      orderBy: { updatedAt: 'desc' },
      include: { purchase: { select: { licenseKey: true, seats: true } } }
    });
    if (approved) {
      return NextResponse.json({
        requestId: approved.id,
        status: 'approved',
        licenseKey: approved.purchase?.licenseKey ?? null,
        seats: approved.purchase?.seats ?? null
      });
    }

    // Re-POST from the same machine while pending → update in place, no dupes.
    const existingPending = await prisma.licenseRequest.findFirst({
      where: { email, systemFingerprint, status: 'pending' },
      orderBy: { createdAt: 'desc' }
    });

    if (existingPending) {
      await prisma.licenseRequest.update({
        where: { id: existingPending.id },
        data: {
          customerName: input.customerName,
          company: input.company,
          product: input.product,
          deviceName: input.deviceName,
          processorId: input.processorId,
          operatorEmails,
          requestedSeats: operatorEmails.length,
          ipAddress: clientIp,
          userAgent
        }
      });
      return NextResponse.json({ requestId: existingPending.id, status: 'pending' });
    }

    const created = await prisma.licenseRequest.create({
      data: {
        email,
        customerName: input.customerName,
        company: input.company,
        groupKey: deriveGroupKey(email),
        systemFingerprint,
        processorId: input.processorId,
        deviceName: input.deviceName,
        operatorEmails,
        product: input.product,
        requestedSeats: operatorEmails.length,
        status: 'pending',
        ipAddress: clientIp,
        userAgent
      }
    });

    return NextResponse.json({ requestId: created.id, status: 'pending' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('License request error:', error);
    return NextResponse.json(
      { error: 'Failed to submit license request' },
      { status: 500 }
    );
  }
}

// Poll for approval. The key is only returned to the matching requester
// (same email AND same device fingerprint that submitted the request).
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')?.trim().toLowerCase();
    if (!email) {
      return NextResponse.json(
        { error: 'email query parameter is required' },
        { status: 400 }
      );
    }

    const { fingerprint: systemFingerprint } =
      SystemFingerprintGenerator.generateFingerprint(request);

    const req = await prisma.licenseRequest.findFirst({
      where: { email, systemFingerprint },
      orderBy: { updatedAt: 'desc' },
      include: { purchase: { select: { licenseKey: true, seats: true } } }
    });

    if (!req) {
      return NextResponse.json({ status: 'not_found' }, { status: 404 });
    }

    return NextResponse.json({
      requestId: req.id,
      status: req.status,
      licenseKey: req.status === 'approved' ? req.purchase?.licenseKey ?? null : null,
      seats: req.status === 'approved' ? req.purchase?.seats ?? null : null,
      note: req.note ?? null
    });
  } catch (error) {
    console.error('License request lookup error:', error);
    return NextResponse.json(
      { error: 'Failed to look up license request' },
      { status: 500 }
    );
  }
}
