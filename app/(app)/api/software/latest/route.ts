import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/db/prisma';
import { LicenseKeyGenerator } from '@/lib/license/license-key-generator';
import { SystemFingerprintGenerator } from '@/lib/license/system-fingerprint';
import { rateLimit } from '@/lib/network/rate-limit';
import { signDownloadToken } from '@/lib/software-files/download-token';
import { getBaseUrl } from '@/lib/urls/get-base-url';

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
  // The license key now travels in the `Authorization: Bearer <key>` header
  // (fallback `X-License-Key`). It stays optional in the body purely for
  // backward compat with already-installed apps that still send it here —
  // see `resolveLicenseKey`. New callers should use the header.
  licenseKey: z.string().min(1).optional(),
  // Optional. Required only if the license is machine-bound (activated).
  processorId: z.string().min(1).optional(),
  // Optional: narrow the response to a single product by name. Also the
  // product to record when `version` is supplied.
  product: z.string().min(1).max(255).optional(),
  // Optional: the version the client currently has installed. Two uses:
  //   1. When sent with `product`, the customer's ContactSoftware row is
  //      added/updated to it (write-back).
  //   2. When sent with `releaseDate`, becomes the filter floor — the
  //      response returns this exact version plus every release that is
  //      newer by version OR by date.
  version: z.string().min(1).max(64).optional(),
  // Optional: the release date of the version the client currently has,
  // in `D/M/YYYY` format (e.g. "3/6/2026" = 3 June 2026). Used together
  // with `version` as the filter floor. Without both, the endpoint
  // returns only the single latest release.
  releaseDate: z
    .string()
    .regex(/^\d{1,2}\/\d{1,2}\/\d{4}$/, 'Use D/M/YYYY format')
    .optional(),
  // Optional: download URL to store for this product on the customer's
  // ContactSoftware row (set together with `product`).
  downloadUrl: z.string().url().max(2048).optional()
});

// Credentials belong in a header, not the body. Prefer the standard
// `Authorization: Bearer <key>`, also accept `X-License-Key`, and finally
// fall back to a `licenseKey` in the body so apps shipped before this
// change keep working until they're updated.
function resolveLicenseKey(
  request: NextRequest,
  bodyLicenseKey: string | undefined
): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const match = /^Bearer\s+(.+)$/i.exec(authHeader.trim());
    if (match && match[1].trim()) {
      return match[1].trim();
    }
  }

  const headerKey = request.headers.get('x-license-key');
  if (headerKey && headerKey.trim()) {
    return headerKey.trim();
  }

  if (bodyLicenseKey && bodyLicenseKey.trim()) {
    return bodyLicenseKey.trim();
  }

  return null;
}

// Releases use date-only values in `D/M/YYYY` format. Stored as Postgres
// DATE — using UTC midnight in JS avoids timezone shifts that would
// otherwise drift the day across `getDate()` / `toISOString()`.
function parseDmy(value: string): Date | null {
  const [d, m, y] = value.split('/').map((n) => parseInt(n, 10));
  if (!d || !m || !y) return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  if (
    date.getUTCDate() !== d ||
    date.getUTCMonth() !== m - 1 ||
    date.getUTCFullYear() !== y
  ) {
    return null;
  }
  return date;
}

function formatDmy(date: Date): string {
  return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
}

// Admins type versions inconsistently ("v10.2", "10.2", " V10.2 "). Strip a
// leading "v"/"V" and trim so equality and natural-sort both work regardless
// of how the version was entered. Storage stays as typed for display; only
// the comparison is normalized.
function normalizeVersion(v: string): string {
  return v.trim().replace(/^[vV]/, '');
}

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
    const {
      licenseKey: bodyLicenseKey,
      processorId,
      product,
      version,
      releaseDate: bodyReleaseDate,
      downloadUrl
    } = requestSchema.parse(body);

    let filterReleaseDate: Date | null = null;
    if (bodyReleaseDate) {
      filterReleaseDate = parseDmy(bodyReleaseDate);
      if (!filterReleaseDate) {
        return NextResponse.json(
          { error: 'Invalid releaseDate — use D/M/YYYY format' },
          { status: 400 }
        );
      }
    }

    const licenseKey = resolveLicenseKey(request, bodyLicenseKey);
    if (!licenseKey) {
      return NextResponse.json(
        { error: 'Missing license key' },
        { status: 401 }
      );
    }

    const licenseKeyHash = LicenseKeyGenerator.hashLicenseKey(licenseKey);

    const purchase = await prisma.purchase.findUnique({
      where: { licenseKeyHash },
      select: {
        id: true,
        email: true,
        licenseStatus: true,
        licenseType: true,
        licenseExpiresAt: true,
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

    // Expired (trial) licenses don't get updates — same gate as validate.
    if (
      purchase.licenseExpiresAt &&
      purchase.licenseExpiresAt.getTime() < Date.now()
    ) {
      await logAttempt(purchase.id, 'blocked', 'License has expired', logCtx);
      return NextResponse.json(
        { error: 'License has expired' },
        { status: 403 }
      );
    }

    // 2. Machine binding — seat-aware. If the license has any occupied seats
    // (i.e. it has been activated), the caller must hold one of them (matched
    // by fingerprint OR processor id). Licenses with no seats yet (dummy/unbound
    // test data) skip this so test data still works. This replaces the old
    // single-machine check so EVERY seated device on a multi-seat key can fetch
    // updates, not just the most recently activated one.
    const activeSeatCount = await prisma.licenseSeat.count({
      where: { purchaseId: purchase.id, status: 'active' }
    });
    if (activeSeatCount > 0) {
      const seat = await prisma.licenseSeat.findFirst({
        where: {
          purchaseId: purchase.id,
          status: 'active',
          OR: [
            { systemFingerprint: fingerprint },
            ...(processorId ? [{ processorId }] : [])
          ]
        },
        select: { id: true }
      });
      if (!seat) {
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

    // Write-back: record the reported software/version against the CRM
    // contact. Best-effort — a failure here must not break the release
    // lookup, so it's isolated and logged. Skipped entirely when the
    // license has no matching contact (release lookup is global, so we
    // can still serve it).
    if (contact && product && version) {
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

    // Source of truth: the customer's own ContactSoftware rows (what shows
    // on their CRM page). The API only ever returns software belonging to
    // the calling customer — never the entire catalog.
    //   - With `version` + `releaseDate`: return rows whose version equals
    //     the filter version OR is greater (anchor + greater).
    //     `releaseDate` is required as the trigger but isn't used inside
    //     the comparison — the filter is purely version-based.
    //   - Otherwise: return only the single most-recent row.
    // `product` (optional) scopes the search to one product the customer owns.
    if (!contact) {
      await logAttempt(purchase.id, 'success', null, logCtx);
      return NextResponse.json({ software: [] });
    }

    const customerSoftware = await prisma.contactSoftware.findMany({
      where: {
        contactId: contact.id,
        ...(product
          ? { name: { equals: product, mode: 'insensitive' as const } }
          : {})
      },
      orderBy: { updatedAt: 'desc' },
      select: {
        name: true,
        installedVersion: true,
        latestVersion: true,
        downloadUrl: true,
        notes: true,
        updatedAt: true
      }
    });

    // Pick the version each row represents: latestVersion when set,
    // otherwise installedVersion (the admin "Version" field).
    const versioned = customerSoftware
      .map((s) => ({
        ...s,
        version: s.latestVersion || s.installedVersion || null
      }))
      .filter((s) => s.version !== null) as Array<
      (typeof customerSoftware)[number] & { version: string }
    >;

    let resultRows: typeof versioned;

    if (version && filterReleaseDate) {
      const filterVersionNorm = normalizeVersion(version);
      resultRows = versioned.filter((s) => {
        const sNorm = normalizeVersion(s.version);
        // Anchor: the exact requested version is always included.
        if (sNorm === filterVersionNorm) return true;
        // Greater by version — natural compare so "10" > "9", "1.2.10" > "1.2.9".
        return (
          sNorm.localeCompare(filterVersionNorm, undefined, {
            numeric: true,
            sensitivity: 'base'
          }) > 0
        );
      });
    } else {
      resultRows = versioned.length > 0 ? [versioned[0]] : [];
    }

    await logAttempt(purchase.id, 'success', null, logCtx);

    // Installed Windows apps (machine-to-machine) need an absolute URL —
    // they're not running in a browser, so a relative /api/uploads/... path
    // is useless to them.
    //
    // Uploaded installers live under /api/uploads/software/<file>, which the
    // public uploads route deliberately 404s. For those, mint a short-lived,
    // license-bound token and point the caller at the gated /api/software/
    // download route instead (the elevated updater downloads it with no creds).
    // Any other (external) URL is just absolutized as before.
    const baseUrl = getBaseUrl();
    const UPLOADS_SOFTWARE_PREFIX = '/api/uploads/software/';
    const resolveDownloadUrl = (url: string | null): string | null => {
      if (!url) return url;
      if (url.startsWith(UPLOADS_SOFTWARE_PREFIX)) {
        const storedName = url.slice(UPLOADS_SOFTWARE_PREFIX.length);
        const token = signDownloadToken(storedName, licenseKeyHash);
        if (token) {
          return `${baseUrl}/api/software/download?token=${encodeURIComponent(token)}`;
        }
        // Secret unconfigured — emit nothing rather than a URL that 404s.
        return null;
      }
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return url;
    };

    const software = resultRows.map((s) => ({
      productName: s.name,
      description: s.notes,
      latestVersion: s.version,
      downloadUrl: resolveDownloadUrl(s.downloadUrl),
      releaseDate: formatDmy(s.updatedAt)
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
