'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import {
  MODEL_SUGGESTIONS,
  type AiProvider,
  type MonitoringSettings,
  type ProviderStatus
} from './types';

export interface MonitoringSettingsCardProps {
  settings: MonitoringSettings;
  providerStatus: ProviderStatus;
  defaultSystemPrompt: string;
  onSaved: () => void;
}

export function MonitoringSettingsCard({
  settings,
  providerStatus,
  defaultSystemPrompt,
  onSaved
}: MonitoringSettingsCardProps): React.JSX.Element {
  const [provider, setProvider] = React.useState<AiProvider>(settings.provider);
  const [model, setModel] = React.useState(settings.model);
  const [systemPrompt, setSystemPrompt] = React.useState(settings.systemPrompt ?? '');
  const [defaultFrequency, setDefaultFrequency] = React.useState(
    String(settings.defaultCheckFrequencyHours)
  );
  const [maxPages, setMaxPages] = React.useState(String(settings.maxPagesPerRun));
  const [saving, setSaving] = React.useState(false);

  const keyMissing = !providerStatus[provider];

  const handleProviderChange = (next: string) => {
    const nextProvider = next as AiProvider;
    setProvider(nextProvider);
    // Move the model to that provider's default unless the user already typed
    // one that belongs to the new provider.
    if (!MODEL_SUGGESTIONS[nextProvider].includes(model)) {
      setModel(MODEL_SUGGESTIONS[nextProvider][0]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/monitoring/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          model: model.trim(),
          systemPrompt,
          defaultCheckFrequencyHours: Number(defaultFrequency),
          maxPagesPerRun: Number(maxPages)
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? 'Update failed');

      toast.success('Monitoring settings saved');
      onSaved();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Research engine</CardTitle>
        <CardDescription>
          Which model writes the research prompts, and how much each run does.
          API keys stay in the server environment — never in the database.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="provider">AI provider</Label>
            <Select
              value={provider}
              onValueChange={handleProviderChange}
            >
              <SelectTrigger id="provider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ANTHROPIC">Anthropic (Claude)</SelectItem>
                <SelectItem value="OPENAI">OpenAI</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant={keyMissing ? 'destructive' : 'default'}>
                {keyMissing ? 'key missing' : 'key detected'}
              </Badge>
              <span className="text-muted-foreground">
                {provider === 'ANTHROPIC' ? 'ANTHROPIC_API_KEY' : 'OPENAI_API_KEY'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              list="model-suggestions"
              autoComplete="off"
            />
            <datalist id="model-suggestions">
              {MODEL_SUGGESTIONS[provider].map((suggestion) => (
                <option
                  key={suggestion}
                  value={suggestion}
                />
              ))}
            </datalist>
            <p className="text-xs text-muted-foreground">
              Suggestions: {MODEL_SUGGESTIONS[provider].join(', ')}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="default-frequency">Default check frequency (hours)</Label>
            <Input
              id="default-frequency"
              type="number"
              min={1}
              value={defaultFrequency}
              onChange={(event) => setDefaultFrequency(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Pre-fills new agents. Each agent can override it.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-pages">Max pages researched per run</Label>
            <Input
              id="max-pages"
              type="number"
              min={1}
              max={200}
              value={maxPages}
              onChange={(event) => setMaxPages(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Caps AI spend per run. Leftovers stay queued for the next run.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="system-prompt">Research system prompt</Label>
          <Textarea
            id="system-prompt"
            value={systemPrompt}
            onChange={(event) => setSystemPrompt(event.target.value)}
            rows={8}
            placeholder={defaultSystemPrompt}
            className="font-mono text-xs"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Leave empty to use the built-in prompt.
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSystemPrompt(defaultSystemPrompt)}
            >
              Load default
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save settings'}
        </Button>
      </CardFooter>
    </Card>
  );
}
