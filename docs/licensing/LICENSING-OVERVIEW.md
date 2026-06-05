# EDGEBI Licensing — Internal Overview

For maintainers. The desktop/API contract lives in
[`LICENSE-API-CONTRACT.md`](./LICENSE-API-CONTRACT.md); this file explains the
data model and where enforcement happens in the codebase.

## Data model (`prisma/schema.prisma`)

| Model | Role |
| --- | --- |
| `Purchase` (`purchases`) | The license. Holds the key (`licenseKey` + unique `licenseKeyHash`), `licenseStatus` (`inactive`/`active`/`revoked`), and **`seats`** (device cap, default 1). Also doubles as the Stripe purchase / dashboard customer row. The legacy `systemFingerprint`/`processorId` columns now only record the **most recently activated device** for display — they are NOT the enforcement gate. |
| `LicenseSeat` (`license_seats`) | One row per device that occupies a seat. `@@unique([purchaseId, systemFingerprint])`. `status = active` consumes a seat; `released` frees it. **Source of truth for seat enforcement:** `usedSeats = count(active)`. |
| `LicenseActivation` (`license_activations`) | Append-only audit log of every activation/validate/admin attempt (`success`/`failed`/`blocked`/`admin-update`). Never used for enforcement. |
| `LicenseUser` (`license_users`) | Operator roster (`@@unique([purchaseId, email])`). Auto-populated on activation and on approval; feeds password-reset. |
| `LicenseRequest` (`license_requests`) | Self-service request queue. `status` `pending`/`approved`/`rejected`; `groupKey` (email domain) buckets devices; `purchaseId` set on approval. |

Migration: `prisma/migrations/20260605000000_add_license_seats_and_requests/`
(adds `seats`, both tables, and **backfills a seat for every already-bound
Purchase** so the cutover is seamless).

## Where enforcement lives

- **Activation / seat consumption:** `app/(app)/api/license/activate/route.ts`.
  Transactional: finds-or-creates a `LicenseSeat` for the device; if new (or
  reclaiming a released seat) and `activeSeats >= purchase.seats`, returns `409`.
  The `@@unique([purchaseId, systemFingerprint])` makes the same machine
  idempotent. Email is informational (auto-added to roster).
- **Runtime validate:** `app/(app)/api/license/validate/route.ts` — valid iff
  `active` **and** an active seat matches by `systemFingerprint` OR `processorId`.
- **Software updates:** `app/(app)/api/software/latest/route.ts` — same
  seat-match gate before serving a customer's releases.
- **Seat count / release (admin):** `actions/licenses/update-license-seats.ts`,
  `actions/licenses/release-seat.ts`, and `PATCH /api/admin/licenses/[id]`.
  Lowering the cap below active usage is refused.

## Request → approval flow

1. Desktop app → `POST /api/license/request` (one row per device, all operators
   included). See `app/(app)/api/license/request/route.ts`.
2. Admin dashboard inbox (`components/dashboard/license-requests-inbox.tsx`)
   reads `GET /api/admin/license-requests` and lets the admin multi-select +
   **Approve** via `actions/licenses/approve-license-requests.ts`, which mints
   ONE key (`lib/license/license-key-generator.ts`), sets `seats = approved
   count`, registers the roster, links each request, and adds the owner to CRM.
3. App picks up the key via `GET /api/license/request` polling, then activates.

## Key generation

`lib/license/license-key-generator.ts` — `NTCB-XXXX-XXXX-XXXX-XXXX-XXXX`. Lookups
always go through `hashLicenseKey()` (SHA-256); the plaintext is never queried.
`generateLicenseKey(seed, email)` is called with a random UUID seed for
admin/approval-issued keys (the embedded purchaseId isn't verified server-side).

## Dashboard UI

- `components/dashboard/dashboard-overview.tsx` (`/dashboard/home`) — mounts the
  requests inbox + customers table + "Add license" (seats-aware, auto-generate).
- `components/dashboard/customers-table.tsx` — adds a `used / total` **Seats**
  column and embeds `license-seats-manager.tsx` (device list + release + seat cap
  + roster) in the details modal.

## Admin auth

API routes use `lib/auth/require-admin-api.ts` (`requireAdminApi()` → session +
`isAdmin`). Server actions use `authActionClient` + an inline `isAdmin` check.
