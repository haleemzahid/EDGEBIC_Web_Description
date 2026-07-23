# Competitor Monitoring Agent

Watches competitor sitemaps for newly published content, and for every new page
generates the **research prompt** + **ranking angle** we need to publish a piece
that semantically outranks it.

Admin UI: **`/admin/monitoring`** (ADMIN role only — gated by
[app/(app)/admin/layout.tsx](../../app/(app)/admin/layout.tsx)).

---

## The flow

```
cron tick ──► /api/cron/monitoring  (CRON_SECRET)
                    │
                    ▼
        runDueAgents()  — picks agents whose nextRunAt <= now
                    │
                    ▼
        runMonitoringAgent(agentId)
          1. fetch every sitemap URL       lib/monitoring/sitemap.ts
             (follows <sitemapindex> automatically)
          2. diff vs MonitoredPage          → only genuinely new URLs
          3. fetch each new page            lib/monitoring/page-extract.ts
             → title, meta description, headings, body excerpt
          4. generate research prompt       lib/monitoring/research.ts
             via the configured provider    lib/monitoring/ai/*
          5. persist page + log AgentRun
```

A single bad URL never sinks a run: per-page failures are recorded on the page
(`status = FAILED`, `errorMessage`) and summarised on the `AgentRun`.

---

## Data model

| Model | Purpose |
|---|---|
| `MonitoringAgent` | One competitor: `sitemapUrls[]`, `checkFrequencyHours`, `isActive`, `lastRunAt`, `nextRunAt`. |
| `MonitoredPage` | One discovered URL. Unique on `(agentId, url)` — this is what makes re-runs only surface new blogs. Holds `title`, `researchPrompt`, `rankingAngle`, `suggestedTitle`, `status`. |
| `AgentRun` | Append-only run log: counts, duration, trigger (`manual` \| `cron`), errors. |
| `MonitoringSetting` | Singleton. Selects `provider` (OPENAI \| ANTHROPIC), `model`, `systemPrompt`, `defaultCheckFrequencyHours`, `maxPagesPerRun`. |

`title` is always the **competitor's** title. `suggestedTitle` is the title the
model proposes for **our** competing piece — they are deliberately separate.

---

## Provider abstraction

`lib/monitoring/ai/` exposes one interface, `AiTextClient`, with two
implementations built on raw `fetch` (no SDK dependency):

- `anthropic.ts` → Messages API, reads `ANTHROPIC_API_KEY`
- `openai.ts` → Chat Completions, reads `OPENAI_API_KEY`

`createAiClient(provider, model)` is the single switch point. Everything
downstream depends only on the interface, so adding a third provider is one file
plus one `case`.

Keys live in the server environment only — never in the database. The settings
API reports *whether* each key is present (`providerStatus`), never its value.

**If the selected provider's key is missing**, runs still work: new pages are
recorded with their titles, the run is marked `PARTIAL`, and the pages stay
queued (`NEW`) for the next run once a key is configured.

---

## Environment

```bash
ANTHROPIC_API_KEY=sk-ant-...   # required if provider = ANTHROPIC
OPENAI_API_KEY=sk-...          # required if provider = OPENAI
CRON_SECRET=<long random string>
```

---

## Scheduling

The cron endpoint accepts `GET` or `POST` and authorises via
`Authorization: Bearer $CRON_SECRET` (or an `x-cron-secret` header).

```bash
curl -X POST https://<host>/api/cron/monitoring \
  -H "Authorization: Bearer $CRON_SECRET"
```

Each agent decides for itself whether it is due based on its own
`checkFrequencyHours`, so **the cron can safely tick more often than any single
agent's cadence** — hourly is a good default.

Vercel Cron (`vercel.json`):

```json
{
  "crons": [{ "path": "/api/cron/monitoring", "schedule": "0 * * * *" }]
}
```

Any external scheduler (GitHub Actions, cron-job.org, a Windows scheduled task
running `curl`) works identically.

---

## API surface

All admin routes are gated by `requireAdminApi()`.

| Method | Route | Purpose |
|---|---|---|
| GET/POST | `/api/admin/monitoring/agents` | List / create agents |
| GET/PATCH/DELETE | `/api/admin/monitoring/agents/:id` | Detail / update / delete |
| POST | `/api/admin/monitoring/agents/:id/run` | Run one agent now |
| GET/PATCH | `/api/admin/monitoring/pages` | Discovered pages; set status (ignore / re-queue) |
| GET | `/api/admin/monitoring/runs` | Run history |
| GET/PATCH | `/api/admin/monitoring/settings` | Provider, model, prompt, cadence |
| GET/POST | `/api/cron/monitoring` | Scheduled run (CRON_SECRET) |

---

## Cost control

`maxPagesPerRun` (default 25) caps how many pages are sent to the model in one
run. Anything left over stays `NEW` and is picked up by the next run, so a
competitor with a 2,000-URL sitemap backfills gradually instead of in one
expensive burst.

---

## Operational notes

- **First run on a new agent is a backfill**: every URL in the sitemap is "new".
  Expect the first run to record many pages and research only `maxPagesPerRun`
  of them. Consider pointing the agent at a blog-specific sitemap rather than
  the root sitemap if you only care about articles.
- Sitemap crawling is bounded: index depth 2, 5,000 entries, 20s per fetch.
- Both run endpoints declare `maxDuration = 300`.
- Deleting an agent cascades to its pages and runs.
