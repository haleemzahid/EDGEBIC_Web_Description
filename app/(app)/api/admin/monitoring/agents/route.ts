import { NextRequest, NextResponse } from 'next/server';

import { requireAdminApi } from '@/lib/auth/require-admin-api';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

function normalizeSitemapUrls(input: unknown): string[] {
  const raw = Array.isArray(input)
    ? input
    : typeof input === 'string'
      ? input.split(/[\n,]/)
      : [];

  return [
    ...new Set(
      raw
        .map((value) => String(value).trim())
        .filter((value) => value.length > 0 && /^https?:\/\//i.test(value))
    )
  ];
}

// GET /api/admin/monitoring/agents — list every agent with rollup counts.
export async function GET() {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const agents = await prisma.monitoringAgent.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { pages: true, runs: true } },
        runs: {
          orderBy: { startedAt: 'desc' },
          take: 1,
          select: {
            id: true,
            status: true,
            startedAt: true,
            finishedAt: true,
            newPages: true,
            researched: true,
            failed: true,
            errorMessage: true
          }
        }
      }
    });

    const newCounts = await prisma.monitoredPage.groupBy({
      by: ['agentId'],
      where: { status: 'NEW' },
      _count: { id: true }
    });
    const newByAgent = new Map(newCounts.map((row) => [row.agentId, row._count.id]));

    return NextResponse.json({
      agents: agents.map(({ _count, runs, ...agent }) => ({
        ...agent,
        totalPages: _count.pages,
        totalRuns: _count.runs,
        pendingPages: newByAgent.get(agent.id) ?? 0,
        lastRun: runs[0] ?? null
      }))
    });
  } catch (error) {
    console.error('Error listing monitoring agents:', error);
    return NextResponse.json({ error: 'Failed to list agents' }, { status: 500 });
  }
}

// POST /api/admin/monitoring/agents — create a competitor monitoring agent.
export async function POST(request: NextRequest) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const body = await request.json();
    const name = String(body?.name ?? '').trim();
    const sitemapUrls = normalizeSitemapUrls(body?.sitemapUrls);
    const competitorUrl = String(body?.competitorUrl ?? '').trim() || null;
    const checkFrequencyHours = Number(body?.checkFrequencyHours ?? 24);

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!sitemapUrls.length) {
      return NextResponse.json(
        { error: 'At least one valid sitemap URL (http/https) is required' },
        { status: 400 }
      );
    }
    if (!Number.isFinite(checkFrequencyHours) || checkFrequencyHours < 1) {
      return NextResponse.json(
        { error: 'checkFrequencyHours must be at least 1' },
        { status: 400 }
      );
    }

    const agent = await prisma.monitoringAgent.create({
      data: {
        name,
        competitorUrl,
        sitemapUrls,
        checkFrequencyHours: Math.round(checkFrequencyHours),
        isActive: body?.isActive === undefined ? true : Boolean(body.isActive),
        // Due immediately so the first cron tick picks it up.
        nextRunAt: new Date()
      }
    });

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    console.error('Error creating monitoring agent:', error);
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}
