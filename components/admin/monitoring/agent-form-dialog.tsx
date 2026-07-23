'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import type { MonitoringAgent } from './types';

export interface AgentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Present when editing; omit to create. */
  agent?: MonitoringAgent | null;
  defaultFrequencyHours: number;
  onSaved: () => void;
}

export function AgentFormDialog({
  open,
  onOpenChange,
  agent,
  defaultFrequencyHours,
  onSaved
}: AgentFormDialogProps): React.JSX.Element {
  const isEdit = Boolean(agent);

  const [name, setName] = React.useState('');
  const [competitorUrl, setCompetitorUrl] = React.useState('');
  const [sitemapText, setSitemapText] = React.useState('');
  const [frequency, setFrequency] = React.useState(String(defaultFrequencyHours));
  const [isActive, setIsActive] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  // Reset the form whenever the dialog opens for a different target.
  React.useEffect(() => {
    if (!open) return;
    setName(agent?.name ?? '');
    setCompetitorUrl(agent?.competitorUrl ?? '');
    setSitemapText((agent?.sitemapUrls ?? []).join('\n'));
    setFrequency(String(agent?.checkFrequencyHours ?? defaultFrequencyHours));
    setIsActive(agent?.isActive ?? true);
  }, [open, agent, defaultFrequencyHours]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const sitemapUrls = sitemapText
      .split(/[\n,]/)
      .map((value) => value.trim())
      .filter(Boolean);

    if (!name.trim()) {
      toast.error('Competitor name is required');
      return;
    }
    if (!sitemapUrls.length) {
      toast.error('Add at least one sitemap URL');
      return;
    }
    const invalid = sitemapUrls.find((url) => !/^https?:\/\//i.test(url));
    if (invalid) {
      toast.error(`Sitemap URL must start with http:// or https:// — got "${invalid}"`);
      return;
    }
    const hours = Number(frequency);
    if (!Number.isFinite(hours) || hours < 1) {
      toast.error('Check frequency must be at least 1 hour');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(
        agent ? `/api/admin/monitoring/agents/${agent.id}` : '/api/admin/monitoring/agents',
        {
          method: agent ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            competitorUrl: competitorUrl.trim(),
            sitemapUrls,
            checkFrequencyHours: Math.round(hours),
            isActive
          })
        }
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error ?? 'Request failed');
      }

      toast.success(isEdit ? 'Agent updated' : 'Monitoring agent created');
      onOpenChange(false);
      onSaved();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save agent');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? 'Edit monitoring agent' : 'Add monitoring agent'}
            </DialogTitle>
            <DialogDescription>
              Point the agent at a competitor&apos;s sitemap. Every run diffs the
              sitemap and pulls a title plus a research prompt for anything new.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Competitor name</Label>
              <Input
                id="agent-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Acme Scheduling"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-site">Website (optional)</Label>
              <Input
                id="agent-site"
                value={competitorUrl}
                onChange={(event) => setCompetitorUrl(event.target.value)}
                placeholder="https://www.acme.com"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-sitemaps">Sitemap URLs</Label>
              <Textarea
                id="agent-sitemaps"
                value={sitemapText}
                onChange={(event) => setSitemapText(event.target.value)}
                placeholder={
                  'https://www.acme.com/sitemap.xml\nhttps://www.acme.com/blog-sitemap.xml'
                }
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                One per line. A sitemap index is followed automatically, so the
                root sitemap.xml is usually enough.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-frequency">Check frequency (hours)</Label>
              <Input
                id="agent-frequency"
                type="number"
                min={1}
                value={frequency}
                onChange={(event) => setFrequency(event.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                How often this competitor&apos;s sitemap is re-checked for new
                blogs. The cron decides due agents by this value.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="agent-active">Active</Label>
                <p className="text-xs text-muted-foreground">
                  Inactive agents are skipped by the scheduled run.
                </p>
              </div>
              <Switch
                id="agent-active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
            >
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create agent'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
