import type {
  AiTextClient,
  ResearchPromptInput,
  ResearchPromptResult
} from './ai';

/** Build the user turn describing one competitor page. */
function buildUserPrompt(input: ResearchPromptInput): string {
  const parts = [
    `Competitor: ${input.competitorName}`,
    `URL: ${input.url}`,
    `Page title: ${input.title ?? '(none found)'}`,
    `Meta description: ${input.description ?? '(none found)'}`
  ];

  if (input.headings.length) {
    parts.push(`Headings:\n${input.headings.map((h) => `- ${h}`).join('\n')}`);
  }
  if (input.bodyExcerpt) {
    parts.push(`Body excerpt:\n${input.bodyExcerpt.slice(0, 3000)}`);
  }

  parts.push(
    `Return strict JSON with exactly these keys:
{
  "researchPrompt": "a self-contained research prompt for writing a piece that outranks this page",
  "rankingAngle": "what this competitor page misses and how we win the topic semantically",
  "suggestedTitle": "a stronger title for our competing piece"
}`
  );

  return parts.join('\n\n');
}

/** Tolerate models that wrap JSON in prose or code fences. */
function parseJsonResponse(raw: string): Record<string, unknown> {
  const withoutFence = raw
    .replace(/^\s*```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();

  try {
    return JSON.parse(withoutFence) as Record<string, unknown>;
  } catch {
    // Fall back to the first balanced-looking JSON object in the text.
    const start = withoutFence.indexOf('{');
    const end = withoutFence.lastIndexOf('}');
    if (start !== -1 && end > start) {
      return JSON.parse(withoutFence.slice(start, end + 1)) as Record<string, unknown>;
    }
    throw new Error('Model response was not valid JSON');
  }
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length ? value.trim() : undefined;
}

/**
 * Ask the configured model for the research prompt + ranking angle for one
 * competitor page. Provider-agnostic: takes any AiTextClient.
 */
export async function generateResearchPrompt(
  client: AiTextClient,
  systemPrompt: string,
  input: ResearchPromptInput
): Promise<ResearchPromptResult> {
  const raw = await client.complete({
    system: systemPrompt,
    user: buildUserPrompt(input),
    maxTokens: 1200,
    temperature: 0.4
  });

  const parsed = parseJsonResponse(raw);
  const researchPrompt = asString(parsed.researchPrompt);
  const rankingAngle = asString(parsed.rankingAngle);

  if (!researchPrompt) {
    throw new Error('Model response did not include a researchPrompt');
  }

  return {
    researchPrompt,
    rankingAngle: rankingAngle ?? '',
    suggestedTitle: asString(parsed.suggestedTitle)
  };
}
