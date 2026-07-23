import type { AiProvider } from '@prisma/client';

import { createAnthropicClient } from './anthropic';
import { createOpenAiClient } from './openai';
import type { AiTextClient } from './types';

export type { AiTextClient, ResearchPromptInput, ResearchPromptResult } from './types';

/**
 * Resolve the configured provider into a concrete client. This is the single
 * switch point — everything else in the pipeline talks to AiTextClient only.
 */
export function createAiClient(provider: AiProvider, model: string): AiTextClient {
  switch (provider) {
    case 'OPENAI':
      return createOpenAiClient(model);
    case 'ANTHROPIC':
      return createAnthropicClient(model);
    default: {
      const exhaustive: never = provider;
      throw new Error(`Unsupported AI provider: ${exhaustive as string}`);
    }
  }
}

/** True when the key for the selected provider is present in the environment. */
export function isProviderConfigured(provider: AiProvider): boolean {
  return provider === 'OPENAI'
    ? Boolean(process.env.OPENAI_API_KEY)
    : Boolean(process.env.ANTHROPIC_API_KEY);
}
