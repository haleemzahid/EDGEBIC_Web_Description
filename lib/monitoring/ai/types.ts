/**
 * Shared types for the competitor-monitoring AI layer. The provider is chosen
 * at runtime from MonitoringSetting, so everything downstream depends only on
 * the AiTextClient interface — never on a concrete SDK.
 */

import type { AiProvider } from '@prisma/client';

export interface AiCompletionRequest {
  system: string;
  user: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AiTextClient {
  readonly provider: AiProvider;
  readonly model: string;
  complete(req: AiCompletionRequest): Promise<string>;
}

/** What the pipeline hands the model about a single competitor page. */
export interface ResearchPromptInput {
  competitorName: string;
  url: string;
  title: string | null;
  description: string | null;
  headings: string[];
  bodyExcerpt: string | null;
}

/** What we persist back onto MonitoredPage after the model responds. */
export interface ResearchPromptResult {
  /** A ready-to-use research prompt for our content team / AI writer. */
  researchPrompt: string;
  /** The angle that would let us semantically outrank the competitor page. */
  rankingAngle: string;
  /** An optional stronger title suggestion for our competing piece. */
  suggestedTitle?: string;
}
