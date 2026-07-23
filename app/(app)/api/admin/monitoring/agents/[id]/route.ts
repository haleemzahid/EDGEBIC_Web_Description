import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

import { requireAdminApi } from '@/lib/auth/require-admin-api';
import { prisma } from '@/lib/db/prisma';
import { computeNextRunAt } from '@/lib/monitoring/run-agent';

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

// GET /api/admin/monitoring/agents/:id — agent detail with recent runs + pages.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;

    const agent = await prisma.monitoringAgent.findUnique({
      where: { id },
      include: {
        runs: { orderBy: { startedAt: 'desc' }, take: 20 },
        _count: { select: { pages: true, runs: true } }
      }
    });

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    const pages = await prisma.monitoredPage.findMany({
      where: { agentId: id },
      orderBy: { firstSeenAt: 'desc' },
      take: 100
    });

    const statusCounts = await prisma.monitoredPage.groupBy({
      by: ['status'],
      where: { agentId: id },
      _count: { id: true }
    });

    const { _count, ...rest } = agent;
    return NextResponse.json({
      agent: { ...rest, totalPages: _count.pages, totalRuns: _count.runs },
      pages,
      statusBreakdown: statusCounts.reduce<Record<string, number>>((acc, row) => {
        acc[row.status] = row._count.id;
        return acc;
      }, {})
    });
  } catch (error) {
    console.error('Error fetching monitoring agent:', error);
    return NextResponse.json({ error: 'Failed to fetch agent' }, { status: 500 });
  }
}

// PATCH /api/admin/monitoring/agents/:id — update settings for one agent.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    const body = await request.json();
    const data: Prisma.MonitoringAgentUpdateInput = {};

    if (body?.name !== undefined) {
      const name = String(body.name).trim();
      if (!name) {
        return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 });
      }
      data.name = name;
    }

    if (body?.competitorUrl !== undefined) {
      data.competitorUrl = String(body.competitorUrl).trim() || null;
    }

    if (body?.sitemapUrls !== undefined) {
      const sitemapUrls = normalizeSitemapUrls(body.sitemapUrls);
      if (!sitemapUrls.length) {
        return NextResponse.json(
          { error: 'At least one valid sitemap URL (http/https) is required' },
          { status: 400 }
        );
      }
      data.sitemapUrls = sitemapUrls;
    }

    if (body?.isActive !== undefined) {
      data.isActive = Boolean(body.isActive);
    }

    if (body?.checkFrequencyHours !== undefined) {
      const hours = Number(body.checkFrequencyHours);
      if (!Number.isFinite(hours) || hours < 1) {
        return NextResponse.json(
          { error: 'checkFrequencyHours must be at least 1' },
          { status: 400 }
        );
      }
      data.checkFrequencyHours = Math.round(hours);
      // Re-base the schedule off the last run so a cadence change takes effect
      // immediately rather than at the previously-computed nextRunAt.
      const existing = await prisma.monitoringAgent.findUnique({
        where: { id },
        select: { lastRunAt: true }
      });
      data.nextRunAt = computeNextRunAt(
        Math.round(hours),
        existing?.lastRunAt ?? new Date()
      );
    }

    const agent = await prisma.monitoringAgent.update({ where: { id }, data });
    return NextResponse.json({ agent });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }
    console.error('Error updating monitoring agent:', error);
    return NextResponse.json({ error: 'Failed to update agent' }, { status: 500 });
  }
}

// DELETE /api/admin/monitoring/agents/:id — removes the agent, its pages and runs.
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    await prisma.monitoringAgent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }
    console.error('Error deleting monitoring agent:', error);
    return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 });
  }
}
