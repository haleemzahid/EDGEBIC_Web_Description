-- Adds per-side soft-delete flags so admin and client each have an
-- independent "trash" view of an email thread (Gmail-style). Existing rows
-- default to visible on both sides.

ALTER TABLE "ContactEmailThread"
  ADD COLUMN "clientDeleted" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "teamDeleted"   BOOLEAN NOT NULL DEFAULT false;
