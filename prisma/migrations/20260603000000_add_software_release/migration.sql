-- Global release catalog. One row per (product, version) — admin uploads new
-- releases here and the installed apps query it via /api/software/latest to
-- find out what's newer than what they have. Separate from ContactSoftware,
-- which tracks each customer's installed software per-contact.

CREATE TABLE "SoftwareRelease" (
    "id"          UUID         NOT NULL DEFAULT gen_random_uuid(),
    "product"     VARCHAR(255) NOT NULL,
    "version"     VARCHAR(64)  NOT NULL,
    "releaseDate" DATE         NOT NULL,
    "downloadUrl" VARCHAR(2048),
    "notes"       VARCHAR(8000),
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_SoftwareRelease" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "UX_SoftwareRelease_product_version"
    ON "SoftwareRelease" ("product", "version");

CREATE INDEX "IX_SoftwareRelease_product_releaseDate"
    ON "SoftwareRelease" ("product", "releaseDate");
