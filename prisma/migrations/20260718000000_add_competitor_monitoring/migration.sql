-- Competitor Monitoring Agent (/admin/monitoring)
-- Purely additive: new enums + tables only. Nothing here alters or drops any
-- existing object, so it is safe to apply to a populated database.

-- CreateEnum
CREATE TYPE "AiProvider" AS ENUM ('OPENAI', 'ANTHROPIC');

-- CreateEnum
CREATE TYPE "MonitoredPageStatus" AS ENUM ('NEW', 'RESEARCHED', 'FAILED', 'IGNORED');

-- CreateEnum
CREATE TYPE "AgentRunStatus" AS ENUM ('RUNNING', 'SUCCESS', 'PARTIAL', 'FAILED');

-- CreateTable
CREATE TABLE "MonitoringAgent" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "competitorUrl" VARCHAR(2048),
    "sitemapUrls" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "checkFrequencyHours" INTEGER NOT NULL DEFAULT 24,
    "lastRunAt" TIMESTAMP(3),
    "nextRunAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_MonitoringAgent" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonitoredPage" (
    "id" UUID NOT NULL,
    "agentId" UUID NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "title" VARCHAR(1024),
    "description" VARCHAR(4000),
    "researchPrompt" VARCHAR(8000),
    "rankingAngle" VARCHAR(4000),
    "suggestedTitle" VARCHAR(1024),
    "status" "MonitoredPageStatus" NOT NULL DEFAULT 'NEW',
    "sitemapLastmod" TIMESTAMP(3),
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "researchedAt" TIMESTAMP(3),
    "errorMessage" VARCHAR(2000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_MonitoredPage" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentRun" (
    "id" UUID NOT NULL,
    "agentId" UUID NOT NULL,
    "status" "AgentRunStatus" NOT NULL DEFAULT 'RUNNING',
    "trigger" VARCHAR(32) NOT NULL DEFAULT 'manual',
    "urlsFound" INTEGER NOT NULL DEFAULT 0,
    "newPages" INTEGER NOT NULL DEFAULT 0,
    "researched" INTEGER NOT NULL DEFAULT 0,
    "failed" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "durationMs" INTEGER,
    "errorMessage" VARCHAR(2000),

    CONSTRAINT "PK_AgentRun" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonitoringSetting" (
    "id" UUID NOT NULL,
    "provider" "AiProvider" NOT NULL DEFAULT 'ANTHROPIC',
    "model" VARCHAR(128) NOT NULL DEFAULT 'claude-sonnet-4-5',
    "systemPrompt" VARCHAR(8000),
    "defaultCheckFrequencyHours" INTEGER NOT NULL DEFAULT 24,
    "maxPagesPerRun" INTEGER NOT NULL DEFAULT 25,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_MonitoringSetting" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IX_MonitoringAgent_isActive_nextRunAt" ON "MonitoringAgent"("isActive", "nextRunAt");

-- CreateIndex
CREATE INDEX "IX_MonitoredPage_agentId_status" ON "MonitoredPage"("agentId", "status");

-- CreateIndex
CREATE INDEX "IX_MonitoredPage_agentId_firstSeenAt" ON "MonitoredPage"("agentId", "firstSeenAt");

-- CreateIndex
CREATE UNIQUE INDEX "UX_MonitoredPage_agentId_url" ON "MonitoredPage"("agentId", "url");

-- CreateIndex
CREATE INDEX "IX_AgentRun_agentId_startedAt" ON "AgentRun"("agentId", "startedAt");

-- AddForeignKey
ALTER TABLE "MonitoredPage" ADD CONSTRAINT "MonitoredPage_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "MonitoringAgent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRun" ADD CONSTRAINT "AgentRun_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "MonitoringAgent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
