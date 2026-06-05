import { NextRequest, NextResponse } from 'next/server';

import { requireAdminApi } from '@/lib/auth/require-admin-api';
import { prisma } from '@/lib/db/prisma';

// Admin inbox of desktop-app license requests. Defaults to pending; supports
// filtering by status/group and returns both a flat list (paginated) and a
// grouping by groupKey so the UI can offer "approve this whole batch as one key".
export async function GET(request: NextRequest) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(200, parseInt(searchParams.get('limit') || '100'));
    const status = searchParams.get('status') || 'pending';
    const groupKey = searchParams.get('groupKey');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};
    if (status && status !== 'all') where.status = status;
    if (groupKey) where.groupKey = groupKey;
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [requests, total, statusCounts] = await Promise.all([
      prisma.licenseRequest.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.licenseRequest.count({ where }),
      prisma.licenseRequest.groupBy({
        by: ['status'],
        _count: { id: true }
      })
    ]);

    // Group the current page by groupKey for batch approval in the UI.
    const groupsMap = new Map<string, typeof requests>();
    for (const req of requests) {
      const key = req.groupKey || 'ungrouped';
      const bucket = groupsMap.get(key) ?? [];
      bucket.push(req);
      groupsMap.set(key, bucket);
    }
    const groups = Array.from(groupsMap.entries()).map(([key, items]) => ({
      groupKey: key,
      count: items.length,
      requestIds: items.map((i) => i.id),
      requests: items
    }));

    const stats = statusCounts.reduce(
      (acc, item) => {
        acc[item.status] = item._count.id;
        acc.total += item._count.id;
        return acc;
      },
      { total: 0 } as Record<string, number>
    );

    return NextResponse.json({
      requests,
      groups,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      stats
    });
  } catch (error) {
    console.error('Error fetching license requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch license requests' },
      { status: 500 }
    );
  }
}
