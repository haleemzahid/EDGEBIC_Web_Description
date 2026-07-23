'use client';

import * as React from 'react';
import { RadarIcon } from 'lucide-react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  formatFrequency,
  type AgentRunStatus,
  type MonitoringAgent
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

export interface AgentsTableProps {
  agents: MonitoringAgent[];
  runningAgentId: string | null;
  onRun: (agent: MonitoringAgent) => void;
  onEdit: (agent: MonitoringAgent) => void;
  onChanged: () => void;
  onViewPages: (agentId: string) => void;
}

export function AgentsTable({
  agents,
  runningAgentId,
  onRun,
  onEdit,
  onChanged,
  onViewPages
}: AgentsTableProps): React.JSX.Element {
  const [pendingDelete, setPendingDelete] = React.useState<MonitoringAgent | null>(
    null
  );
  const [deleting, setDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      const response = await fetch(
        `/api/admin/monitoring/agents/${pendingDelete.id}`,
        { method: 'DELETE' }
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? 'Delete failed');

      toast.success(`Removed ${pendingDelete.name}`);
      setPendingDelete(null);
      onChanged();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete agent');
    } finally {
      setDeleting(false);
    }
  };

  const toggleActive = async (agent: MonitoringAgent) => {
    try {
      const response = await fetch(`/api/admin/monitoring/agents/${agent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !agent.isActive })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? 'Update failed');

      toast.success(`${agent.name} ${agent.isActive ? 'paused' : 'resumed'}`);
      onChanged();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update agent');
    }
  };

  if (!agents.length) {
    return (
      <EmptyState
        icon={
          <div className="flex size-12 items-center justify-center rounded-md border">
            <RadarIcon className="size-6 shrink-0 text-muted-foreground" />
          </div>
        }
        title="No monitoring agents yet"
        description="Add a competitor and their sitemap to start tracking new content."
      />
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Competitor</TableHead>
              <TableHead>Sitemaps</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Last run</TableHead>
              <TableHead>Next run</TableHead>
              <TableHead className="text-right">Pages</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="text-sm">
                  <div className="flex items-center gap-2 font-medium">
                    {agent.name}
                    {!agent.isActive && <Badge variant="secondary">paused</Badge>}
                  </div>
                  {agent.competitorUrl && (
                    <a
                      href={agent.competitorUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                    >
                      {agent.competitorUrl}
                    </a>
                  )}
                </TableCell>

                <TableCell className="max-w-[260px] text-sm">
                  <span className="text-muted-foreground">
                    {agent.sitemapUrls.length} sitemap
                    {agent.sitemapUrls.length === 1 ? '' : 's'}
                  </span>
                  <div className="truncate text-xs text-muted-foreground">
                    {agent.sitemapUrls[0]}
                  </div>
                </TableCell>

                <TableCell className="text-sm">
                  {formatFrequency(agent.checkFrequencyHours)}
                </TableCell>

                <TableCell className="text-sm">
                  <div>{formatDateTime(agent.lastRunAt)}</div>
                  {agent.lastRun && (
                    <div className="mt-1 flex items-center gap-2">
                      <RunStatusBadge status={agent.lastRun.status} />
                      <span className="text-xs text-muted-foreground">
                        +{agent.lastRun.newPages} new
                      </span>
                    </div>
                  )}
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {agent.isActive ? formatDateTime(agent.nextRunAt) : 'paused'}
                </TableCell>

                <TableCell className="text-right text-sm">
                  <div className="font-medium">{agent.totalPages}</div>
                  {agent.pendingPages > 0 && (
                    <div className="text-xs text-amber-600">
                      {agent.pendingPages} pending
                    </div>
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onRun(agent)}
                      disabled={runningAgentId === agent.id}
                    >
                      {runningAgentId === agent.id ? 'Running…' : 'Run now'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewPages(agent.id)}
                    >
                      Pages
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(agent)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleActive(agent)}
                    >
                      {agent.isActive ? 'Pause' : 'Resume'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setPendingDelete(agent)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {pendingDelete?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the agent along with every discovered page,
              research prompt, and run record for it. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              disabled={deleting}
            >
              {deleting ? 'Deleting…' : 'Delete agent'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
