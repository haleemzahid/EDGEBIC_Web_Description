import type { AiCompletionRequest, AiTextClient } from './types';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * OpenAI Chat Completions client. Raw fetch — no SDK dependency. Reads the key
 * from OPENAI_API_KEY.
 */
export function createOpenAiClient(model: string): AiTextClient {
  const apiKey = process.env.OPENAI_API_KEY;

  return {
    provider: 'OPENAI',
    model,
    async complete({
      system,
      user,
      maxTokens = 1024,
      temperature = 0.4
    }: AiCompletionRequest): Promise<string> {
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not set');
      }

      const response = await fetch(OPENAI_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          temperature,
          max_tokens: maxTokens,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user }
          ]
        })
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => '');
        throw new Error(
          `OpenAI request failed (${response.status}): ${detail.slice(0, 500)}`
        );
      }

      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const text = (data.choices?.[0]?.message?.content ?? '').trim();

      if (!text) {
        throw new Error('OpenAI returned an empty response');
      }
      return text;
    }
  };
}
