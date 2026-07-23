import { NextRequest, NextResponse } from 'next/server';
import { Prisma, type MonitoredPageStatus } from '@prisma/client';

import { requireAdminApi } from '@/lib/auth/require-admin-api';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

const VALID_STATUSES: MonitoredPageStatus[] = [
  'NEW',
  'RESEARCHED',
  'FAILED',
  'IGNORED'
];

// GET /api/admin/monitoring/pages — discovered titles + research prompts.
// Query: agentId, status, search, page, limit
export async function GET(request: NextRequest) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const { searchParams } = new URL(request.url);
    const pageNumber = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(
      200,
      Math.max(1, parseInt(searchParams.get('limit') || '50', 10))
    );
    const agentId = searchParams.get('agentId');
    const status = searchParams.get('status') as MonitoredPageStatus | null;
    const search = searchParams.get('search');

    const where: Prisma.MonitoredPageWhereInput = {};
    if (agentId) where.agentId = agentId;
    if (status && VALID_STATUSES.includes(status)) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { url: { contains: search, mode: 'insensitive' } },
        { researchPrompt: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [pages, total] = await Promise.all([
      prisma.monitoredPage.findMany({
        where,
        orderBy: { firstSeenAt: 'desc' },
        skip: (pageNumber - 1) * limit,
        take: limit,
        include: { agent: { select: { id: true, name: true } } }
      }),
      prisma.monitoredPage.count({ where })
    ]);

    return NextResponse.json({
      pages,
      pagination: {
        page: pageNumber,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error listing monitored pages:', error);
    return NextResponse.json({ error: 'Failed to list pages' }, { status: 500 });
  }
}

// PATCH /api/admin/monitoring/pages — set status (e.g. mark IGNORED / re-queue NEW).
export async function PATCH(request: NextRequest) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const body = await request.json();
    const id = String(body?.id ?? '').trim();
    const status = body?.status as MonitoredPageStatus | undefined;

    if (!id) {
      return NextResponse.json({ error: 'Page id is required' }, { status: 400 });
    }
    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `status must be one of ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    const page = await prisma.monitoredPage.update({
      where: { id },
      data: {
        status,
        // Re-queuing clears the previous failure so the next run retries clean.
        errorMessage: status === 'NEW' ? null : undefined
      }
    });

    return NextResponse.json({ page });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    console.error('Error updating monitored page:', error);
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}
