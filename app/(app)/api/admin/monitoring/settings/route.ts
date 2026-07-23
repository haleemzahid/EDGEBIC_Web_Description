import { NextRequest, NextResponse } from 'next/server';
import { type AiProvider, Prisma } from '@prisma/client';

import { requireAdminApi } from '@/lib/auth/require-admin-api';
import { prisma } from '@/lib/db/prisma';
import { isProviderConfigured } from '@/lib/monitoring/ai';
import { DEFAULT_SYSTEM_PROMPT, getMonitoringSettings } from '@/lib/monitoring/settings';

export const dynamic = 'force-dynamic';

const VALID_PROVIDERS: AiProvider[] = ['OPENAI', 'ANTHROPIC'];

// GET /api/admin/monitoring/settings — global provider/model/cadence config.
export async function GET() {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const settings = await getMonitoringSettings();
    return NextResponse.json({
      settings,
      defaultSystemPrompt: DEFAULT_SYSTEM_PROMPT,
      // Never expose keys — only whether each provider is usable.
      providerStatus: {
        OPENAI: isProviderConfigured('OPENAI'),
        ANTHROPIC: isProviderConfigured('ANTHROPIC')
      }
    });
  } catch (error) {
    console.error('Error fetching monitoring settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// PATCH /api/admin/monitoring/settings — update provider, model, prompt, cadence.
export async function PATCH(request: NextRequest) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  try {
    const body = await request.json();
    const current = await getMonitoringSettings();
    const data: Prisma.MonitoringSettingUpdateInput = {};

    if (body?.provider !== undefined) {
      const provider = String(body.provider).toUpperCase() as AiProvider;
      if (!VALID_PROVIDERS.includes(provider)) {
        return NextResponse.json(
          { error: `provider must be one of ${VALID_PROVIDERS.join(', ')}` },
          { status: 400 }
        );
      }
      data.provider = provider;
    }

    if (body?.model !== undefined) {
      const model = String(body.model).trim();
      if (!model) {
        return NextResponse.json({ error: 'model cannot be empty' }, { status: 400 });
      }
      data.model = model;
    }

    if (body?.systemPrompt !== undefined) {
      data.systemPrompt = String(body.systemPrompt).trim() || null;
    }

    if (body?.defaultCheckFrequencyHours !== undefined) {
      const hours = Number(body.defaultCheckFrequencyHours);
      if (!Number.isFinite(hours) || hours < 1) {
        return NextResponse.json(
          { error: 'defaultCheckFrequencyHours must be at least 1' },
          { status: 400 }
        );
      }
      data.defaultCheckFrequencyHours = Math.round(hours);
    }

    if (body?.maxPagesPerRun !== undefined) {
      const max = Number(body.maxPagesPerRun);
      if (!Number.isFinite(max) || max < 1 || max > 200) {
        return NextResponse.json(
          { error: 'maxPagesPerRun must be between 1 and 200' },
          { status: 400 }
        );
      }
      data.maxPagesPerRun = Math.round(max);
    }

    const settings = await prisma.monitoringSetting.update({
      where: { id: current.id },
      data
    });

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error updating monitoring settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
