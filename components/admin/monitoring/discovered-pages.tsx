'use client';

import * as React from 'react';
import { CheckIcon, CopyIcon, ExternalLinkIcon, FileSearchIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  formatDateTime,
  type MonitoredPage,
  type MonitoredPageStatus,
  type MonitoringAgent
} from './types';

const ALL = 'ALL';

function StatusBadge({ status }: { status: MonitoredPageStatus }): React.JSX.Element {
  const variant =
    status === 'RESEARCHED'
      ? 'default'
      : status === 'FAILED'
        ? 'destructive'
        : 'secondary';
  return <Badge variant={variant}>{status.toLowerCase()}</Badge>;
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied`);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Clipboard unavailable in this browser');
    }
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={handleCopy}
    >
      {copied ? (
        <CheckIcon className="mr-1 size-3.5" />
      ) : (
        <CopyIcon className="mr-1 size-3.5" />
      )}
      Copy
    </Button>
  );
}

export interface DiscoveredPagesProps {
  agents: MonitoringAgent[];
  agentFilter: string;
  onAgentFilterChange: (value: string) => void;
  reloadToken: number;
}

export function DiscoveredPages({
  agents,
  agentFilter,
  onAgentFilterChange,
  reloadToken
}: DiscoveredPagesProps): React.JSX.Element {
  const [pages, setPages] = React.useState<MonitoredPage[]>([]);
  const [status, setStatus] = React.useState<string>(ALL);
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  const fetchPages = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (agentFilter !== ALL) params.set('agentId', agentFilter);
      if (status !== ALL) params.set('status', status);
      if (debouncedSearch) params.set('search', debouncedSearch);

      const response = await fetch(`/api/admin/monitoring/pages?${params}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? 'Failed to load pages');

      setPages(data.pages ?? []);
      setTotal(data.pagination?.total ?? 0);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load pages');
    } finally {
      setLoading(false);
    }
  }, [agentFilter, status, debouncedSearch]);

  React.useEffect(() => {
    fetchPages();
  }, [fetchPages, reloadToken]);

  const updateStatus = async (id: string, next: MonitoredPageStatus) => {
    try {
      const response = await fetch('/api/admin/monitoring/pages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: next })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? 'Update failed');

      toast.success(
        next === 'NEW' ? 'Re-queued for the next run' : `Marked ${next.toLowerCase()}`
      );
      fetchPages();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update page');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search title, URL, or research prompt…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:max-w-sm"
        />
        <Select
          value={agentFilter}
          onValueChange={onAgentFilterChange}
        >
          <SelectTrigger className="sm:w-56">
            <SelectValue placeholder="All competitors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All competitors</SelectItem>
            {agents.map((agent) => (
              <SelectItem
                key={agent.id}
                value={agent.id}
              >
                {agent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={status}
          onValueChange={setStatus}
        >
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            <SelectItem value="RESEARCHED">Researched</SelectItem>
            <SelectItem value="NEW">New / queued</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
            <SelectItem value="IGNORED">Ignored</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Loading discovered pages…
        </p>
      ) : !pages.length ? (
        <EmptyState
          icon={
            <div className="flex size-12 items-center justify-center rounded-md border">
              <FileSearchIcon className="size-6 shrink-0 text-muted-foreground" />
            </div>
          }
          title="Nothing discovered yet"
          description="Run an agent to pull titles and research prompts from a competitor sitemap."
        />
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {total} page{total === 1 ? '' : 's'} discovered
          </p>

          <div className="space-y-3">
            {pages.map((page) => {
              const expanded = expandedId === page.id;
              return (
                <div
                  key={page.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={page.status} />
                        {page.agent && (
                          <span className="text-xs text-muted-foreground">
                            {page.agent.name}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          found {formatDateTime(page.firstSeenAt)}
                        </span>
                      </div>

                      <h3 className="mt-2 text-sm font-medium">
                        {page.title ?? (
                          <span className="italic text-muted-foreground">
                            No title extracted
                          </span>
                        )}
                      </h3>

                      <a
                        href={page.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-1 inline-flex items-center gap-1 break-all text-xs text-muted-foreground underline-offset-4 hover:underline"
                      >
                        {page.url}
                        <ExternalLinkIcon className="size-3 shrink-0" />
                      </a>
                    </div>

                    <div className="flex shrink-0 gap-1">
                      {(page.researchPrompt ||
                        page.description ||
                        page.suggestedTitle) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setExpandedId(expanded ? null : page.id)}
                        >
                          {expanded ? 'Hide' : 'View research'}
                        </Button>
                      )}
                      {page.status === 'FAILED' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateStatus(page.id, 'NEW')}
                        >
                          Retry
                        </Button>
                      )}
                      {page.status !== 'IGNORED' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateStatus(page.id, 'IGNORED')}
                        >
                          Ignore
                        </Button>
                      )}
                    </div>
                  </div>

                  {page.errorMessage && (
                    <p className="mt-3 rounded-md bg-destructive/10 p-2 text-xs text-destructive">
                      {page.errorMessage}
                    </p>
                  )}

                  {expanded && (
                    <div className="mt-4 space-y-4 border-t pt-4">
                      {page.description && (
                        <div>
                          <p className="text-xs font-semibold uppercase text-muted-foreground">
                            Their meta description
                          </p>
                          <p className="mt-1 text-sm">{page.description}</p>
                        </div>
                      )}

                      {page.suggestedTitle && (
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase text-muted-foreground">
                              Our suggested title
                            </p>
                            <CopyButton
                              value={page.suggestedTitle}
                              label="Suggested title"
                            />
                          </div>
                          <p className="mt-1 text-sm font-medium">
                            {page.suggestedTitle}
                          </p>
                        </div>
                      )}

                      {page.rankingAngle && (
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase text-muted-foreground">
                              Our ranking angle
                            </p>
                            <CopyButton
                              value={page.rankingAngle}
                              label="Ranking angle"
                            />
                          </div>
                          <p className="mt-1 whitespace-pre-wrap text-sm">
                            {page.rankingAngle}
                          </p>
                        </div>
                      )}

                      {page.researchPrompt && (
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase text-muted-foreground">
                              Research prompt
                            </p>
                            <CopyButton
                              value={page.researchPrompt}
                              label="Research prompt"
                            />
                          </div>
                          <pre className="mt-1 whitespace-pre-wrap rounded-md bg-muted p-3 text-xs">
                            {page.researchPrompt}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
