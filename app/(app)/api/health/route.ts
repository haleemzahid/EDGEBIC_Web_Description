import { NextResponse } from 'next/server';

import { AppInfo } from '@/constants/app-info';
import { healthFailureStatus } from '@/lib/api/health-status';
import { jsonError } from '@/lib/api/json-error';
import { prisma } from '@/lib/db/prisma';

/**
 * GET /api/health — operationId: healthCheck
 *
 * Failures are structured JSON like every other endpoint. The previous empty
 * 503 body contradicted the documented error contract.
 */
export async function GET(): Promise<Response> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json(
      { status: 'ok', version: AppInfo.VERSION },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    return jsonError({
      status: healthFailureStatus(err),
      code: 'service_unavailable',
      message: 'The service is unhealthy: the database is unreachable.',
      hint: 'Retry with exponential backoff. If this persists, contact support@edgebi.com.'
    });
  }
}
