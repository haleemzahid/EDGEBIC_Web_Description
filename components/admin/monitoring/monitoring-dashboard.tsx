'use client';

import * as React from 'react';
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AgentFormDialog } from './agent-form-dialog';
import { AgentsTable } from './agents-table';
import { DiscoveredPages } from './discovered-pages';
import { MonitoringSettingsCard } from './monitoring-settings-card';
import { RunHistory } from './run-history';
import type {
  MonitoringAgent,
  MonitoringSettings,
  ProviderStatus
} from './types';

const ALL = 'ALL';

function StatCard({
  label,
  value,
  hint
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}): React.JSX.Element {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}

export function MonitoringDashboard(): React.JSX.Element {
  const [agents, setAgents] = React.useState<MonitoringAgent[]>([]);
  const [settings, setSettings] = React.useState<MonitoringSettings | null>(null);
  const [providerStatus, setProviderStatus] = React.useState<ProviderStatus>({
    OPENAI: false,
    ANTHROPIC: false
  });
  const [defaultSystemPrompt, setDefaultSystemPrompt] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [runningAgentId, setRunningAgentId] = React.useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingAgent, setEditingAgent] = React.useState<MonitoringAgent | null>(null);
  const [tab, setTab] = React.useState('agents');
  const [pageAgentFilter, setPageAgentFilter] = React.useState<string>(ALL);
  // Bumped after any run so the pages/history tabs refetch.
  const [reloadToken, setReloadToken] = React.useState(0);

  const fetchAgents = React.useCallback(async () => {
    const response = await fetch('/api/admin/monitoring/agents');
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error ?? 'Failed to load agents');
    setAgents(data.agents ?? []);
  }, []);

  const fetchSettings = React.useCallback(async () => {
    const response = await fetch('/api/admin/monitoring/settings');
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error ?? 'Failed to load settings');
    setSettings(data.settings);
    setProviderStatus(data.providerStatus);
    setDefaultSystemPrompt(data.defaultSystemPrompt ?? '');
  }, []);

  const refreshAll = React.useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([fetchAgents(), fetchSettings()]);
      setReloadToken((token) => token + 1);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to load monitoring data'
      );
    } finally {
      setLoading(false);
    }
  }, [fetchAgents, fetchSettings]);

  React.useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const handleRun = async (agent: MonitoringAgent) => {
    setRunningAgentId(agent.id);
    toast.info(`Checking ${agent.name}'s sitemap…`);
    try {
      const response = await fetch(
        `/api/admin/monitoring/agents/${agent.id}/run`,
        { method: 'POST' }
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? 'Run failed');

      const result = data.result;
      if (result.newPages > 0) {
        toast.success(
          `${agent.name}: ${result.newPages} new page${result.newPages === 1 ? '' : 's'} found, ${result.researched} researched`
        );
      } else {
        toast.success(`${agent.name}: no new pages since the last check`);
      }
      if (result.errors?.length) {
        toast.warning(`${result.errors.length} issue(s) — see run history`);
      }

      await fetchAgents();
      setReloadToken((token) => token + 1);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to run agent');
    } finally {
      setRunningAgentId(null);
    }
  };

  const openCreate = () => {
    setEditingAgent(null);
    setDialogOpen(true);
  };

  const openEdit = (agent: MonitoringAgent) => {
    setEditingAgent(agent);
    setDialogOpen(true);
  };

  const viewPagesFor = (agentId: string) => {
    setPageAgentFilter(agentId);
    setTab('pages');
  };

  const totals = React.useMemo(
    () => ({
      active: agents.filter((agent) => agent.isActive).length,
      pages: agents.reduce((sum, agent) => sum + agent.totalPages, 0),
      pending: agents.reduce((sum, agent) => sum + agent.pendingPages, 0)
    }),
    [agents]
  );

  if (loading && !agents.length && !settings) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Loading monitoring agents…
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Competitor monitoring</h1>
          <p className="mt-1 text-muted-foreground">
            Watch competitor sitemaps for new content, then auto-generate the
            research prompt that lets us outrank it.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={refreshAll}
            disabled={loading}
          >
            <RefreshCwIcon className="mr-2 size-4" />
            Refresh
          </Button>
          <Button onClick={openCreate}>
            <PlusIcon className="mr-2 size-4" />
            Add agent
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Agents"
          value={agents.length}
          hint={`${totals.active} active`}
        />
        <StatCard
          label="Pages tracked"
          value={totals.pages}
        />
        <StatCard
          label="Awaiting research"
          value={totals.pending}
          hint={totals.pending ? 'Picked up on the next run' : 'All caught up'}
        />
        <StatCard
          label="Research engine"
          value={
            settings ? (
              <span className="text-lg">
                {settings.provider === 'ANTHROPIC' ? 'Claude' : 'OpenAI'}
              </span>
            ) : (
              '—'
            )
          }
          hint={settings?.model}
        />
      </div>

      <Tabs
        value={tab}
        onValueChange={setTab}
      >
        <TabsList>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="pages">Discovered pages</TabsTrigger>
          <TabsTrigger value="history">Run history</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent
          value="agents"
          className="mt-4"
        >
          <AgentsTable
            agents={agents}
            runningAgentId={runningAgentId}
            onRun={handleRun}
            onEdit={openEdit}
            onChanged={refreshAll}
            onViewPages={viewPagesFor}
          />
        </TabsContent>

        <TabsContent
          value="pages"
          className="mt-4"
        >
          <DiscoveredPages
            agents={agents}
            agentFilter={pageAgentFilter}
            onAgentFilterChange={setPageAgentFilter}
            reloadToken={reloadToken}
          />
        </TabsContent>

        <TabsContent
          value="history"
          className="mt-4"
        >
          <RunHistory reloadToken={reloadToken} />
        </TabsContent>

        <TabsContent
          value="settings"
          className="mt-4"
        >
          {settings && (
            <MonitoringSettingsCard
              settings={settings}
              providerStatus={providerStatus}
              defaultSystemPrompt={defaultSystemPrompt}
              onSaved={refreshAll}
            />
          )}
        </TabsContent>
      </Tabs>

      <AgentFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        agent={editingAgent}
        defaultFrequencyHours={settings?.defaultCheckFrequencyHours ?? 24}
        onSaved={refreshAll}
      />
    </div>
  );
}
