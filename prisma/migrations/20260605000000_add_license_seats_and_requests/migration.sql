-- Multi-seat licensing: a key may now be activated on up to `seats` distinct
-- devices. license_seats is the source of truth for current occupancy;
-- license_requests is the desktop-app self-service approval queue.

-- AlterTable: per-key device cap (default 1 keeps existing licenses single-seat)
ALTER TABLE "purchases" ADD COLUMN "seats" INTEGER NOT NULL DEFAULT 1;

-- CreateTable: current seat occupancy (one row per bound device)
CREATE TABLE "license_seats" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "systemFingerprint" TEXT NOT NULL,
    "processorId" TEXT,
    "deviceName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "firstActivatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "releasedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "license_seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable: self-service request / approval queue
CREATE TABLE "license_requests" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "customerName" TEXT,
    "company" TEXT,
    "groupKey" TEXT,
    "systemFingerprint" TEXT,
    "processorId" TEXT,
    "deviceName" TEXT,
    "operatorEmails" TEXT[],
    "product" TEXT,
    "requestedSeats" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "purchaseId" TEXT,
    "reviewedByUserId" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "note" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "license_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "license_seats_purchaseId_systemFingerprint_key" ON "license_seats"("purchaseId", "systemFingerprint");
CREATE INDEX "license_seats_purchaseId_idx" ON "license_seats"("purchaseId");
CREATE INDEX "license_seats_email_idx" ON "license_seats"("email");
CREATE INDEX "license_requests_status_idx" ON "license_requests"("status");
CREATE INDEX "license_requests_groupKey_idx" ON "license_requests"("groupKey");
CREATE INDEX "license_requests_email_idx" ON "license_requests"("email");

-- AddForeignKey
ALTER TABLE "license_seats" ADD CONSTRAINT "license_seats_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "license_requests" ADD CONSTRAINT "license_requests_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Backfill: every license already bound to a machine keeps that machine as its
-- first occupied seat so the cutover to seat-based enforcement is seamless.
INSERT INTO "license_seats" (
    "id", "purchaseId", "email", "systemFingerprint", "processorId",
    "status", "firstActivatedAt", "lastSeenAt", "createdAt", "updatedAt"
)
SELECT
    gen_random_uuid()::text,
    "id",
    COALESCE("activatedEmail", "email"),
    "systemFingerprint",
    "processorId",
    'active',
    COALESCE("activatedAt", CURRENT_TIMESTAMP),
    COALESCE("activatedAt", CURRENT_TIMESTAMP),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "purchases"
WHERE "systemFingerprint" IS NOT NULL;
