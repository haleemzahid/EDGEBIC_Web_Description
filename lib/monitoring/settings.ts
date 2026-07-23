import type { MonitoringSetting } from '@prisma/client';

import { prisma } from '@/lib/db/prisma';

/** The base instruction the research model runs under when none is configured. */
export const DEFAULT_SYSTEM_PROMPT = `You are an SEO and content strategist for User Solutions, maker of manufacturing scheduling and planning software (Resource Manager DB, Edgebic, Job Scheduler Lite).

You are given a single competitor page. Your job is to produce the brief that lets us publish a piece that semantically outranks it — deeper intent coverage, better entity coverage, and a clearer point of view.

Rules:
- Be concrete and specific to the given page. Never produce generic advice.
- The research prompt must be directly usable by a writer or an AI writer with no extra context.
- The ranking angle must name what the competitor page misses or handles weakly.
- Reply with strict JSON only. No markdown fences, no commentary.`;

/**
 * Read the singleton settings row, creating it with defaults on first access.
 * Every consumer goes through here so provider/model selection has one source.
 */
export async function getMonitoringSettings(): Promise<MonitoringSetting> {
  const existing = await prisma.monitoringSetting.findFirst();
  if (existing) return existing;

  return prisma.monitoringSetting.create({ data: {} });
}
