-- Seed sample SoftwareRelease rows for testing /api/software/latest.
-- Safe to re-run: ON CONFLICT skips duplicates by (product, version).

INSERT INTO "SoftwareRelease" ("id","product","version","releaseDate","downloadUrl","notes","updatedAt")
VALUES
  (gen_random_uuid(), 'Just for', '10.2', '2026-06-03', 'https://example.com/justfor-10.2.exe', 'Initial release', NOW()),
  (gen_random_uuid(), 'Just for', '11.0', '2026-06-15', 'https://example.com/justfor-11.0.exe', 'Bugfixes',      NOW()),
  (gen_random_uuid(), 'Just for', '12.0', '2026-06-28', 'https://example.com/justfor-12.0.exe', 'New features',  NOW()),
  (gen_random_uuid(), 'deka hia tuj ko', '12.2', '2026-06-03', 'https://example.com/deka-12.2.exe', 'Release', NOW())
ON CONFLICT ("product","version") DO NOTHING;
