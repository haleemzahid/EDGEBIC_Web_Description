import type { AgentRunStatus } from '@prisma/client';

import { prisma } from '@/lib/db/prisma';

import { createAiClient, isProviderConfigured } from './ai';
import { fetchPageMeta } from './page-extract';
import { generateResearchPrompt } from './research';
import { DEFAULT_SYSTEM_PROMPT, getMonitoringSettings } from './settings';
import { fetchAllSitemapEntries } from './sitemap';

export interface RunAgentResult {
  runId: string;
  agentId: string;
  status: AgentRunStatus;
  urlsFound: number;
  newPages: number;
  researched: number;
  failed: number;
  errors: string[];
}

/** Next due timestamp from a cadence in hours. */
export function computeNextRunAt(frequencyHours: number, from = new Date()): Date {
  const hours = Number.isFinite(frequencyHours) && frequencyHours > 0 ? frequencyHours : 24;
  return new Date(from.getTime() + hours * 60 * 60 * 1000);
}

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

/**
 * Run one monitoring agent end to end:
 *   sitemaps → diff against known pages → fetch title/meta for new pages →
 *   generate the research prompt → persist → log the run.
 *
 * Never throws for per-page problems: those are recorded on the page and
 * summarised on the AgentRun so a single bad URL cannot sink the run.
 */
export async function runMonitoringAgent(
  agentId: string,
  trigger: 'manual' | 'cron' = 'manual'
): Promise<RunAgentResult> {
  const startedAt = new Date();

  const agent = await prisma.monitoringAgent.findUnique({ where: { id: agentId } });
  if (!agent) {
    throw new Error(`Monitoring agent ${agentId} not found`);
  }

  const settings = await getMonitoringSettings();
  const run = await prisma.agentRun.create({
    data: { agentId: agent.id, status: 'RUNNING', trigger, startedAt }
  });

  const errors: string[] = [];
  let urlsFound = 0;
  let newPages = 0;
  let researched = 0;
  let failed = 0;

  try {
    // 1. Pull every configured sitemap.
    const { entries, errors: sitemapErrors } = await fetchAllSitemapEntries(
      agent.sitemapUrls
    );
    errors.push(...sitemapErrors);
    urlsFound = entries.length;

    // 2. Diff against what we already know for this agent.
    const known = await prisma.monitoredPage.findMany({
      where: { agentId: agent.id },
      select: { url: true }
    });
    const knownUrls = new Set(known.map((page) => page.url));
    const freshEntries = entries.filter((entry) => !knownUrls.has(entry.url));

    if (freshEntries.length) {
      const created = await prisma.monitoredPage.createMany({
        data: freshEntries.map((entry) => ({
          agentId: agent.id,
          url: truncate(entry.url, 2048),
          sitemapLastmod: entry.lastmod,
          status: 'NEW' as const
        })),
        skipDuplicates: true
      });
      newPages = created.count;
    }

    // 3. Research the backlog of NEW pages, oldest first, bounded per run.
    const pending = await prisma.monitoredPage.findMany({
      where: { agentId: agent.id, status: 'NEW' },
      orderBy: { firstSeenAt: 'asc' },
      take: Math.max(1, settings.maxPagesPerRun)
    });

    const providerReady = isProviderConfigured(settings.provider);
    if (pending.length && !providerReady) {
      errors.push(
        `${settings.provider} API key is not set — new pages were recorded but no research prompts were generated.`
      );
    }

    const client = providerReady
      ? createAiClient(settings.provider, settings.model)
      : null;
    const systemPrompt = settings.systemPrompt?.trim() || DEFAULT_SYSTEM_PROMPT;

    for (const page of pending) {
      try {
        // Title/description are useful on their own — persist them even if the
        // research call later fails.
        const meta = await fetchPageMeta(page.url);
        await prisma.monitoredPage.update({
          where: { id: page.id },
          data: {
            title: meta.title ? truncate(meta.title, 1024) : null,
            description: meta.description ? truncate(meta.description, 4000) : null
          }
        });

        if (!client) continue;

        const result = await generateResearchPrompt(client, systemPrompt, {
          competitorName: agent.name,
          url: page.url,
          title: meta.title,
          description: meta.description,
          headings: meta.headings,
          bodyExcerpt: meta.bodyExcerpt
        });

        await prisma.monitoredPage.update({
          where: { id: page.id },
          data: {
            researchPrompt: truncate(result.researchPrompt, 8000),
            rankingAngle: truncate(result.rankingAngle, 4000),
            // `title` stays the competitor's title; this is the title we'd use.
            suggestedTitle: result.suggestedTitle
              ? truncate(result.suggestedTitle, 1024)
              : null,
            status: 'RESEARCHED',
            researchedAt: new Date(),
            errorMessage: null
          }
        });
        researched += 1;
      } catch (error) {
        failed += 1;
        const message = error instanceof Error ? error.message : String(error);
        errors.push(`${page.url}: ${message}`);
        await prisma.monitoredPage.update({
          where: { id: page.id },
          data: { status: 'FAILED', errorMessage: truncate(message, 2000) }
        });
      }
    }

    // 4. Close out the run.
    const finishedAt = new Date();
    const status: AgentRunStatus =
      errors.length === 0 ? 'SUCCESS' : researched > 0 || newPages > 0 ? 'PARTIAL' : 'FAILED';

    await prisma.$transaction([
      prisma.agentRun.update({
        where: { id: run.id },
        data: {
          status,
          urlsFound,
          newPages,
          researched,
          failed,
          finishedAt,
          durationMs: finishedAt.getTime() - startedAt.getTime(),
          errorMessage: errors.length ? truncate(errors.join(' | '), 2000) : null
        }
      }),
      prisma.monitoringAgent.update({
        where: { id: agent.id },
        data: {
          lastRunAt: finishedAt,
          nextRunAt: computeNextRunAt(agent.checkFrequencyHours, finishedAt)
        }
      })
    ]);

    return {
      runId: run.id,
      agentId: agent.id,
      status,
      urlsFound,
      newPages,
      researched,
      failed,
      errors
    };
  } catch (error) {
    // Whole-run failure (e.g. every sitemap unreachable).
    const finishedAt = new Date();
    const message = error instanceof Error ? error.message : String(error);

    await prisma.$transaction([
      prisma.agentRun.update({
        where: { id: run.id },
        data: {
          status: 'FAILED',
          urlsFound,
          newPages,
          researched,
          failed,
          finishedAt,
          durationMs: finishedAt.getTime() - startedAt.getTime(),
          errorMessage: truncate(message, 2000)
        }
      }),
      prisma.monitoringAgent.update({
        where: { id: agent.id },
        data: {
          lastRunAt: finishedAt,
          nextRunAt: computeNextRunAt(agent.checkFrequencyHours, finishedAt)
        }
      })
    ]);

    throw error;
  }
}

/**
 * Run every active agent whose nextRunAt is due (or has never run). Used by the
 * cron endpoint. Agents run sequentially so one slow competitor cannot starve
 * the request of API rate limit.
 */
export async function runDueAgents(now = new Date()): Promise<RunAgentResult[]> {
  const due = await prisma.monitoringAgent.findMany({
    where: {
      isActive: true,
      OR: [{ nextRunAt: null }, { nextRunAt: { lte: now } }]
    },
    orderBy: { nextRunAt: { sort: 'asc', nulls: 'first' } },
    select: { id: true }
  });

  const results: RunAgentResult[] = [];
  for (const agent of due) {
    try {
      results.push(await runMonitoringAgent(agent.id, 'cron'));
    } catch {
      // runMonitoringAgent already recorded the failure on the AgentRun row.
    }
  }
  return results;
}
