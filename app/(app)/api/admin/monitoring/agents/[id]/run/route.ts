import { NextRequest, NextResponse } from 'next/server';

import { requireAdminApi } from '@/lib/auth/require-admin-api';
import { runMonitoringAgent } from '@/lib/monitoring/run-agent';

export const dynamic = 'force-dynamic';
// Sitemap fetch + per-page research can take a while on a first run.
export const maxDuration = 300;

// POST /api/admin/monitoring/agents/:id/run — trigger one agent immediately.
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const { id } = await params;
    const result = await runMonitoringAgent(id, 'manual');
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error running monitoring agent:', error);
    const message = error instanceof Error ? error.message : 'Failed to run agent';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
