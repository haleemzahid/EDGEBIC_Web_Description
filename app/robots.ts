import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/urls/get-base-url';

/**
 * Paths no crawler should index, AI or otherwise. Kept in one place so the
 * wildcard rule and the AI-assistant rule below cannot drift apart.
 */
const DISALLOWED_PATHS = [
  '/api/',
  '/auth/',
  '/dashboard/',
  // Block old WordPress spam/junk paths
  '/wp-content/',
  '/wp-admin/',
  '/wp-includes/',
  '/wp-login.php',
  '/wp-json/',
  '/?mitra=',
  '/*?mitra=',
  // Test/demo pages
  '/test',
  '/test-home',
  '/navigation-demo',
  // Thank you pages
  '/thankyou',
  '/thankyou-for-downloading-*',
  '/thankyoudownload-*',
  // Transactional pages
  '/cart',
  '/checkout',
  // Old/archived versions
  '/excel-applications-old',
  '/production-scheduling-products_old',
  '/privacy-policy3',
  '/product-downloads-3',
  // Duplicate pages (canonical versions exist)
  '/aboutus',
  '/mission',
  // Hidden sections
  '/author/',
  '/category/',
  '/press_release/',
  '/products/'
];

/**
 * Explicit allows. '/api/' stays disallowed as a whole (auth, licensing and
 * dashboard routes), but the public content API that llms.txt invites agents
 * to call must be fetchable, otherwise every robots-compliant assistant
 * refuses the very endpoints we document. Longest-match wins in the Google,
 * Bing and OpenAI parsers, so '/api/v1/' beats '/api/'. '/api$' is the JSON
 * endpoint index only.
 */
const ALLOWED_PATHS = [
  '/',
  '/llms.txt',
  '/llms-full.txt',
  '/openapi.json',
  '/api$',
  '/api/v1/'
];

/**
 * Crawlers that feed AI assistants and answer engines.
 *
 * The wildcard rule already permits these, but several of these agents only
 * read the record that names them, and a few (Google-Extended,
 * Applebot-Extended) exist purely as an opt-out switch - silence there is
 * ambiguous. Naming them states the intent explicitly: this content is meant
 * to be read, quoted and cited by AI assistants.
 */
const AI_ASSISTANT_AGENTS = [
  // Classic search indexes that feed AI Overviews, Copilot and DuckDuckGo
  'Googlebot',
  'Bingbot',
  // OpenAI: training, ChatGPT search index, and user-triggered fetches
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google Gemini / AI Overviews grounding
  'Google-Extended',
  // Apple Intelligence
  'Applebot',
  'Applebot-Extended',
  // Meta AI
  'meta-externalagent',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  // Common Crawl, which seeds a large share of open model corpora
  'CCBot',
  // Other assistants
  'Amazonbot',
  'DuckAssistBot',
  'YouBot',
  'MistralAI-User',
  'cohere-ai',
  'Bytespider'
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: ALLOWED_PATHS,
        disallow: DISALLOWED_PATHS
      },
      {
        userAgent: AI_ASSISTANT_AGENTS,
        allow: ALLOWED_PATHS,
        disallow: DISALLOWED_PATHS
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
