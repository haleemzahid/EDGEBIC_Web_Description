import type { AiCompletionRequest, AiTextClient } from './types';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';

/**
 * Anthropic Messages API client. Raw fetch — no SDK dependency. Reads the key
 * from ANTHROPIC_API_KEY.
 */
export function createAnthropicClient(model: string): AiTextClient {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  return {
    provider: 'ANTHROPIC',
    model,
    async complete({
      system,
      user,
      maxTokens = 1024,
      temperature = 0.4
    }: AiCompletionRequest): Promise<string> {
      if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY is not set');
      }

      const response = await fetch(ANTHROPIC_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': ANTHROPIC_VERSION
        },
        body: JSON.stringify({
          model,
          max_tokens: maxTokens,
          temperature,
          system,
          messages: [{ role: 'user', content: user }]
        })
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => '');
        throw new Error(
          `Anthropic request failed (${response.status}): ${detail.slice(0, 500)}`
        );
      }

      const data = (await response.json()) as {
        content?: Array<{ type: string; text?: string }>;
      };
      const text = (data.content ?? [])
        .filter((block) => block.type === 'text' && typeof block.text === 'string')
        .map((block) => block.text as string)
        .join('')
        .trim();

      if (!text) {
        throw new Error('Anthropic returned an empty response');
      }
      return text;
    }
  };
}
