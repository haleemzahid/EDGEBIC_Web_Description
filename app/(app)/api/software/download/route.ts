import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import { NextResponse, type NextRequest } from 'next/server';

import { prisma } from '@/lib/db/prisma';
import { rateLimit } from '@/lib/network/rate-limit';
import { verifyDownloadToken } from '@/lib/software-files/download-token';
import { SOFTWARE_FILE_PUBLIC_DIR } from '@/lib/software-files/storage';

// License-gated, repeatable installer download for the FCP desktop updater.
//
// The unauthenticated /api/uploads/[...path] route deliberately 404s anything
// under software/, and /api/download is a single-use purchase-token flow — both
// unusable for an auto-updater that re-downloads on every release. This route
// serves the same uploaded installers behind a short-lived token minted by
// /api/software/latest (which already authenticated the license + machine).
// The token carries the file + license; the elevated updater needs no creds.

const SOFTWARE_DIR = path.join(
  process.cwd(),
  'public',
  SOFTWARE_FILE_PUBLIC_DIR
);

const MIME_BY_EXT: Record<string, string> = {
  '.zip': 'application/zip',
  '.exe': 'application/vnd.microsoft.portable-executable',
  '.msi': 'application/x-msi',
  '.7z': 'application/x-7z-compressed',
  '.gz': 'application/gzip',
  '.tar': 'application/x-tar'
};

// Rate limit per license key: caps abuse if a token ever leaks (an attacker
// can't loop-download the installer to scrape it) and protects the file
// server from a misbehaving updater. 10 starts per minute is well above any
// real updater's needs (one download per release at most) but well below an
// attacker rate. memory-cache is per-instance on serverless; this is a soft
// limit on hot-instance abuse, not a global cap — pair with an upstream WAF
// for harder limits if needed.
const downloadLimiter = rateLimit({ intervalInMs: 60_000 });
const MAX_DOWNLOADS_PER_MINUTE = 10;

type DownloadStatus =
  | 'success'
  | 'invalid_token'
  | 'rate_limited'
  | 'license_inactive'
  | 'file_not_found'
  | 'invalid_filename'
  | 'missing_token';

/**
 * Structured audit log for every /api/software/download attempt. Goes to
 * stdout as one JSON line per event so log aggregators (Vercel, Datadog,
 * Logtail) can index it. We don't persist to DB — the LicenseActivation
 * pattern is for activations specifically, and adding a new table would
 * require another migration round-trip.
 *
 * Searchable in Vercel logs by message prefix `software-download:`.
 */
function logDownloadAttempt(
  status: DownloadStatus,
  errorMessage: string | null,
  data: {
    licenseKeyHash?: string;
    storedName?: string;
    clientIP: string;
    userAgent: string;
    fileBytes?: number;
  }
) {
  const entry = {
    event: 'software-download',
    status,
    errorMessage,
    // Truncate licenseKeyHash so logs don't carry the full hash even though
    // it's already a one-way derivative. First 12 chars is enough to group
    // attempts by license without giving up the full identifier.
    licenseRef: data.licenseKeyHash
      ? `${data.licenseKeyHash.slice(0, 12)}...`
      : undefined,
    storedName: data.storedName,
    clientIP: data.clientIP,
    userAgent: data.userAgent,
    fileBytes: data.fileBytes,
    timestamp: new Date().toISOString()
  };
  // One JSON line — Vercel/Datadog log parsers handle this natively.
  // Use console.warn for non-success so they're easier to filter on noise floor.
  if (status === 'success') {
    console.log(`software-download: ${JSON.stringify(entry)}`);
  } else {
    console.warn(`software-download: ${JSON.stringify(entry)}`);
  }
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function GET(request: NextRequest): Promise<Response> {
  const clientIP = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || '';

  const token = new URL(request.url).searchParams.get('token');
  if (!token) {
    logDownloadAttempt('missing_token', 'No token query param', {
      clientIP,
      userAgent
    });
    return NextResponse.json(
      { error: 'Download token is required' },
      { status: 400 }
    );
  }

  const verified = verifyDownloadToken(token);
  if (!verified) {
    // Bad signature, malformed, expired, or secret unconfigured. We don't
    // distinguish to the caller (no oracle) but log the broad category so
    // operators can spot if "expired token" rate jumps (token TTL too short)
    // vs "bad signature" rate jumps (secret rotation or attempted forgery).
    logDownloadAttempt(
      'invalid_token',
      'Token failed verification (bad sig, expired, or secret unset)',
      { clientIP, userAgent }
    );
    return NextResponse.json(
      { error: 'Invalid or expired download token' },
      { status: 410 }
    );
  }

  // Per-license rate limit. Use licenseKeyHash so the limit follows the
  // license, not the IP — an updater behind a corporate NAT shares an IP
  // with the rest of the office.
  const limit = downloadLimiter.check(
    MAX_DOWNLOADS_PER_MINUTE,
    `software-download:${verified.licenseKeyHash}`
  );
  if (limit.isRateLimited) {
    logDownloadAttempt('rate_limited', 'Exceeded per-license rate limit', {
      licenseKeyHash: verified.licenseKeyHash,
      storedName: verified.storedName,
      clientIP,
      userAgent
    });
    return NextResponse.json(
      { error: 'Too many download attempts. Try again in a minute.' },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': String(MAX_DOWNLOADS_PER_MINUTE),
          'X-RateLimit-Remaining': '0'
        }
      }
    );
  }

  // Defense-in-depth: a token minted for a license that has since been
  // revoked/deactivated must stop working before it expires.
  const purchase = await prisma.purchase.findUnique({
    where: { licenseKeyHash: verified.licenseKeyHash },
    select: { licenseStatus: true }
  });
  if (!purchase || purchase.licenseStatus !== 'active') {
    logDownloadAttempt(
      'license_inactive',
      purchase ? `Status: ${purchase.licenseStatus}` : 'License not found',
      {
        licenseKeyHash: verified.licenseKeyHash,
        storedName: verified.storedName,
        clientIP,
        userAgent
      }
    );
    return NextResponse.json(
      { error: 'License is not active' },
      { status: 403 }
    );
  }

  // The token is signed by us, but never trust a name into a path — allow only
  // a bare filename, then confirm the resolved path stays inside SOFTWARE_DIR.
  const storedName = verified.storedName;
  if (!/^[A-Za-z0-9._-]+$/.test(storedName) || storedName.includes('..')) {
    logDownloadAttempt('invalid_filename', 'Filename failed charset check', {
      licenseKeyHash: verified.licenseKeyHash,
      storedName,
      clientIP,
      userAgent
    });
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
  }
  const absolute = path.join(SOFTWARE_DIR, storedName);
  const rootWithSep = SOFTWARE_DIR.endsWith(path.sep)
    ? SOFTWARE_DIR
    : SOFTWARE_DIR + path.sep;
  if (!absolute.startsWith(rootWithSep)) {
    logDownloadAttempt(
      'invalid_filename',
      'Resolved path escaped SOFTWARE_DIR',
      {
        licenseKeyHash: verified.licenseKeyHash,
        storedName,
        clientIP,
        userAgent
      }
    );
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
  }

  let info;
  try {
    info = await stat(absolute);
  } catch {
    logDownloadAttempt('file_not_found', 'stat() failed', {
      licenseKeyHash: verified.licenseKeyHash,
      storedName,
      clientIP,
      userAgent
    });
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
  if (!info.isFile()) {
    logDownloadAttempt('file_not_found', 'Resolved path is not a file', {
      licenseKeyHash: verified.licenseKeyHash,
      storedName,
      clientIP,
      userAgent
    });
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const ext = path.extname(absolute).toLowerCase();
  const contentType = MIME_BY_EXT[ext] ?? 'application/octet-stream';

  // Log the successful start. We don't know whether the download will
  // actually complete (the stream could be aborted mid-flight), but the
  // start event is what matters for "did the gate let them through" audit
  // questions. Add a final "completed" log later if needed.
  logDownloadAttempt('success', null, {
    licenseKeyHash: verified.licenseKeyHash,
    storedName,
    clientIP,
    userAgent,
    fileBytes: info.size
  });

  // Stream instead of buffering — installers can be up to 1 GB
  // (see SOFTWARE_FILE_MAX_BYTES). Content-Length drives the updater's
  // download progress bar (PackageDownloader reads it).
  const nodeStream = createReadStream(absolute);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

  return new Response(webStream, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Length': info.size.toString(),
      'Content-Disposition': `attachment; filename="${encodeURIComponent(storedName)}"`,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}
