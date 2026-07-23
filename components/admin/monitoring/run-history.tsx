'use client';

import * as React from 'react';
import { HistoryIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import {
  formatDateTime,
  formatDuration,
  type AgentRun,
  type AgentRunStatus
} from './types';

function RunStatusBadge({ status }: { status: AgentRunStatus }): React.JSX.Element {
  const variant =
    status === 'SUCCESS'
      ? 'default'
      : status === 'FAILED'
        ? 'destructive'
        : 'secondary';
  return <Badge variant={variant}>{status.toLowerCase()}</Badge>;
}

export interface RunHistoryProps {
  /** Pass an agent id to scope the log, or omit for every agent. */
  agentId?: string;
  reloadToken: number;
}

export function RunHistory({
  agentId,
  reloadToken
}: RunHistoryProps): React.JSX.Element {
  const [runs, setRuns] = React.useState<AgentRun[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchRuns = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '50' });
      if (agentId) params.set('agentId', agentId);

      const response = await fetch(`/api/admin/monitoring/runs?${params}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? 'Failed to load run history');

      setRuns(data.runs ?? []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load runs');
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  React.useEffect(() => {
    fetchRuns();
  }, [fetchRuns, reloadToken]);

  if (loading) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Loading run history…
      </p>
    );
  }

  if (!runs.length) {
    return (
      <EmptyState
        icon={
          <div className="flex size-12 items-center justify-center rounded-md border">
            <HistoryIcon className="size-6 shrink-0 text-muted-foreground" />
          </div>
        }
        title="No runs recorded yet"
        description="Every manual and scheduled run is logged here with what it found."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Started</TableHead>
            <TableHead>Competitor</TableHead>
            <TableHead>Trigger</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">URLs</TableHead>
            <TableHead className="text-right">New</TableHead>
            <TableHead className="text-right">Researched</TableHead>
            <TableHead className="text-right">Failed</TableHead>
            <TableHead className="text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {runs.map((run) => (
            <React.Fragment key={run.id}>
              <TableRow>
                <TableCell className="whitespace-nowrap text-sm">
                  {formatDateTime(run.startedAt)}
                </TableCell>
                <TableCell className="text-sm">{run.agent?.name ?? '—'}</TableCell>
                <TableCell className="text-sm">
                  <Badge variant="secondary">{run.trigger}</Badge>
                </TableCell>
                <TableCell>
                  <RunStatusBadge status={run.status} />
                </TableCell>
                <TableCell className="text-right text-sm">{run.urlsFound}</TableCell>
                <TableCell className="text-right text-sm font-medium">
                  {run.newPages}
                </TableCell>
                <TableCell className="text-right text-sm">{run.researched}</TableCell>
                <TableCell className="text-right text-sm">
                  {run.failed > 0 ? (
                    <span className="text-destructive">{run.failed}</span>
                  ) : (
                    run.failed
                  )}
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {formatDuration(run.durationMs)}
                </TableCell>
              </TableRow>
              {run.errorMessage && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="pt-0"
                  >
                    <p className="rounded-md bg-destructive/10 p-2 text-xs text-destructive">
                      {run.errorMessage}
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
