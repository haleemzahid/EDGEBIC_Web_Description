-- Backfill migration for two models that were added to the Prisma schema in
-- earlier work but only ever synced via `prisma db push` (no migration file
-- existed), so migrate-managed databases were missing them:
--   * LicenseUser        -> license_users   (operator roster / password-reset)
--   * PasswordResetCode  -> PasswordResetCode (6-digit desktop reset code)
-- Purely additive: CREATE TABLE / CREATE INDEX / ADD FOREIGN KEY only.

-- CreateTable
CREATE TABLE "license_users" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "license_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetCode" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "userId" UUID,
    "requestedName" VARCHAR(255),
    "codeHash" VARCHAR(128) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 5,
    "consumedAt" TIMESTAMP(3),
    "ipAddress" VARCHAR(64),
    "userAgent" VARCHAR(512),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_PasswordResetCode" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "license_users_email_idx" ON "license_users"("email");

-- CreateIndex
CREATE INDEX "license_users_purchaseId_idx" ON "license_users"("purchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "license_users_purchaseId_email_key" ON "license_users"("purchaseId", "email");

-- CreateIndex
CREATE INDEX "IX_PasswordResetCode_email" ON "PasswordResetCode"("email");

-- CreateIndex
CREATE INDEX "IX_PasswordResetCode_userId" ON "PasswordResetCode"("userId");

-- CreateIndex
CREATE INDEX "IX_PasswordResetCode_createdAt" ON "PasswordResetCode"("createdAt");

-- AddForeignKey
ALTER TABLE "license_users" ADD CONSTRAINT "license_users_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetCode" ADD CONSTRAINT "PasswordResetCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
