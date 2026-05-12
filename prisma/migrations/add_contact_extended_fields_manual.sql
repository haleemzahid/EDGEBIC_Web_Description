-- Add extended property fields to Contact
ALTER TABLE "Contact"
  ADD COLUMN IF NOT EXISTS "jobTitle"         VARCHAR(128),
  ADD COLUMN IF NOT EXISTS "company"          VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "website"          VARCHAR(2048),
  ADD COLUMN IF NOT EXISTS "linkedIn"         VARCHAR(2048),
  ADD COLUMN IF NOT EXISTS "country"          VARCHAR(128),
  ADD COLUMN IF NOT EXISTS "timezone"         VARCHAR(64),
  ADD COLUMN IF NOT EXISTS "leadSource"       VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "leadSourceDate"   TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS "lastContactedAt"  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS "lastContactedNote" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "lastMeetingAt"    TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS "lastMeetingNote"  VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "stripeCustomerId" VARCHAR(255);
