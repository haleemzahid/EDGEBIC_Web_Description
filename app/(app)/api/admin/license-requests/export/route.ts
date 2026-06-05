import { NextRequest, NextResponse } from 'next/server';

import { requireAdminApi } from '@/lib/auth/require-admin-api';
import { prisma } from '@/lib/db/prisma';

// Download the requester roster for a batch of license requests so an admin can
// see exactly which users/devices a single shared key will cover. CSV by
// default (`?format=json` for JSON). Filter by `ids=a,b,c`, `groupKey`, or
// `status` (defaults to pending).
const CSV_COLUMNS = [
  'requestId',
  'status',
  'email',
  'customerName',
  'company',
  'groupKey',
  'product',
  'deviceName',
  'systemFingerprint',
  'processorId',
  'operatorEmails',
  'requestedSeats',
  'createdAt'
] as const;

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  const str = Array.isArray(value) ? value.join('; ') : String(value);
  // Escape per RFC 4180: wrap in quotes if it contains comma/quote/newline.
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv';
    const idsParam = searchParams.get('ids');
    const groupKey = searchParams.get('groupKey');
    const status = searchParams.get('status') || 'pending';

    const where: Record<string, unknown> = {};
    if (idsParam) {
      where.id = { in: idsParam.split(',').map((s) => s.trim()).filter(Boolean) };
    } else {
      if (status && status !== 'all') where.status = status;
      if (groupKey) where.groupKey = groupKey;
    }

    const requests = await prisma.licenseRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    if (format === 'json') {
      return NextResponse.json({ requests });
    }

    const header = CSV_COLUMNS.join(',');
    const rows = requests.map((r) =>
      CSV_COLUMNS.map((col) => csvCell((r as Record<string, unknown>)[col])).join(
        ','
      )
    );
    const csv = [header, ...rows].join('\r\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="license-requests-${status}.csv"`,
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Error exporting license requests:', error);
    return NextResponse.json(
      { error: 'Failed to export license requests' },
      { status: 500 }
    );
  }
}
