-- Trial licensing: a license can now be time-limited. `licenseType`
-- distinguishes a perpetual "full" license (the default for every existing
-- row, so the cutover is a no-op) from a self-service "trial". `licenseExpiresAt`
-- is the validity cutoff enforced by activate / validate / software-latest;
-- NULL means the license never expires (every full license).

-- AlterTable: license type (default 'full' keeps all existing licenses perpetual)
ALTER TABLE "purchases" ADD COLUMN "licenseType" TEXT NOT NULL DEFAULT 'full';

-- AlterTable: optional validity cutoff for time-limited (trial) licenses
ALTER TABLE "purchases" ADD COLUMN "licenseExpiresAt" TIMESTAMP(3);

-- CreateIndex: fast filtering of trials in the admin dashboard / expiry sweeps
CREATE INDEX "purchases_licenseType_idx" ON "purchases"("licenseType");
