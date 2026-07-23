import { NextRequest, NextResponse } from 'next/server';

import { runDueAgents } from '@/lib/monitoring/run-agent';

export const dynamic = 'force-dynamic';
// Sitemap crawl + research for every due agent.
export const maxDuration = 300;

/**
 * Cron entry point for competitor monitoring.
 *
 * Trigger it from any scheduler (Vercel Cron, GitHub Actions, an external
 * timer, cron-job.org…) with the shared secret:
 *
 *   curl -X POST https://<host>/api/cron/monitoring \
 *     -H "Authorization: Bearer $CRON_SECRET"
 *
 * Each agent decides for itself whether it is due, based on its own
 * checkFrequencyHours — so the cron can safely tick more often than any
 * individual agent's cadence (hourly is a good default).
 */
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const header =
    request.headers.get('authorization') ?? request.headers.get('x-cron-secret') ?? '';
  const provided = header.startsWith('Bearer ') ? header.slice(7) : header;

  return provided === secret;
}

async function handle(request: NextRequest) {
  if (!process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: 'CRON_SECRET is not configured on the server' },
      { status: 500 }
    );
  }
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const startedAt = Date.now();
    const results = await runDueAgents();

    return NextResponse.json({
      ok: true,
      agentsRun: results.length,
      durationMs: Date.now() - startedAt,
      totals: {
        urlsFound: results.reduce((sum, r) => sum + r.urlsFound, 0),
        newPages: results.reduce((sum, r) => sum + r.newPages, 0),
        researched: results.reduce((sum, r) => sum + r.researched, 0),
        failed: results.reduce((sum, r) => sum + r.failed, 0)
      },
      results
    });
  } catch (error) {
    console.error('Monitoring cron failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Cron run failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return handle(request);
}

// GET is supported so schedulers that only issue GETs (incl. Vercel Cron) work.
export async function GET(request: NextRequest) {
  return handle(request);
}
