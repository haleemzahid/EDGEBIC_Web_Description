DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'SoftwareStatus') THEN
    CREATE TYPE "SoftwareStatus" AS ENUM ('upToDate', 'updateAvailable', 'needsAttention', 'trial', 'notInstalled');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "ContactSoftware" (
  "id"               UUID NOT NULL DEFAULT gen_random_uuid(),
  "contactId"        UUID NOT NULL,
  "name"             VARCHAR(255) NOT NULL,
  "installedVersion" VARCHAR(32),
  "latestVersion"    VARCHAR(32),
  "installDate"      TIMESTAMP(3),
  "status"           "SoftwareStatus" NOT NULL DEFAULT 'upToDate',
  "githubUrl"        VARCHAR(2048),
  "docsUrl"          VARCHAR(2048),
  "downloadUrl"      VARCHAR(2048),
  "licenseKey"       VARCHAR(255),
  "licenseType"      VARCHAR(128),
  "seats"            INTEGER,
  "os"               VARCHAR(128),
  "database"         VARCHAR(128),
  "installPath"      VARCHAR(512),
  "notes"            VARCHAR(8000),
  "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PK_ContactSoftware" PRIMARY KEY ("id"),
  CONSTRAINT "FK_ContactSoftware_Contact" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "IX_ContactSoftware_contactId" ON "ContactSoftware"("contactId");
