export type AiProvider = 'OPENAI' | 'ANTHROPIC';
export type MonitoredPageStatus = 'NEW' | 'RESEARCHED' | 'FAILED' | 'IGNORED';
export type AgentRunStatus = 'RUNNING' | 'SUCCESS' | 'PARTIAL' | 'FAILED';

export interface AgentRun {
  id: string;
  agentId: string;
  status: AgentRunStatus;
  trigger: string;
  urlsFound: number;
  newPages: number;
  researched: number;
  failed: number;
  startedAt: string;
  finishedAt: string | null;
  durationMs: number | null;
  errorMessage: string | null;
  agent?: { id: string; name: string };
}

export interface MonitoringAgent {
  id: string;
  name: string;
  competitorUrl: string | null;
  sitemapUrls: string[];
  isActive: boolean;
  checkFrequencyHours: number;
  lastRunAt: string | null;
  nextRunAt: string | null;
  createdAt: string;
  updatedAt: string;
  totalPages: number;
  totalRuns: number;
  pendingPages: number;
  lastRun: AgentRun | null;
}

export interface MonitoredPage {
  id: string;
  agentId: string;
  url: string;
  title: string | null;
  description: string | null;
  researchPrompt: string | null;
  rankingAngle: string | null;
  suggestedTitle: string | null;
  status: MonitoredPageStatus;
  sitemapLastmod: string | null;
  firstSeenAt: string;
  researchedAt: string | null;
  errorMessage: string | null;
  agent?: { id: string; name: string };
}

export interface MonitoringSettings {
  id: string;
  provider: AiProvider;
  model: string;
  systemPrompt: string | null;
  defaultCheckFrequencyHours: number;
  maxPagesPerRun: number;
  updatedAt: string;
}

export interface ProviderStatus {
  OPENAI: boolean;
  ANTHROPIC: boolean;
}

/** Suggested models per provider — free-text entry is still allowed. */
export const MODEL_SUGGESTIONS: Record<AiProvider, string[]> = {
  ANTHROPIC: ['claude-sonnet-4-5', 'claude-opus-4-1', 'claude-haiku-4-5'],
  OPENAI: ['gpt-4o', 'gpt-4o-mini', 'gpt-4.1']
};

export function formatDateTime(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatDuration(ms: number | null): string {
  if (ms === null || ms === undefined) return '—';
  if (ms < 1000) return `${ms} ms`;
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${Math.round(seconds % 60)}s`;
}

export function formatFrequency(hours: number): string {
  if (hours < 24) return `Every ${hours}h`;
  const days = hours / 24;
  if (Number.isInteger(days)) return days === 1 ? 'Daily' : `Every ${days} days`;
  return `Every ${hours}h`;
}
