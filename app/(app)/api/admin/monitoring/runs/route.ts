import { NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';

import { requireAdminApi } from '@/lib/auth/require-admin-api';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

// GET /api/admin/monitoring/runs — run history. Query: agentId, page, limit
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

    const where: Prisma.AgentRunWhereInput = agentId ? { agentId } : {};

    const [runs, total] = await Promise.all([
      prisma.agentRun.findMany({
        where,
        orderBy: { startedAt: 'desc' },
        skip: (pageNumber - 1) * limit,
        take: limit,
        include: { agent: { select: { id: true, name: true } } }
      }),
      prisma.agentRun.count({ where })
    ]);

    return NextResponse.json({
      runs,
      pagination: {
        page: pageNumber,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error listing monitoring runs:', error);
    return NextResponse.json({ error: 'Failed to list runs' }, { status: 500 });
  }
}
