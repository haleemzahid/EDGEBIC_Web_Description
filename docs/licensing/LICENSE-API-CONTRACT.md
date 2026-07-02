# EDGEBI Licensing — API Contract

**Audience:** the desktop/EDGEBI app team wiring activation, updates, and the
self-service license request flow.
**Base URL:** `https://usersolutions.com` (replace with your environment).
**Status:** authoritative. If code and this doc disagree, treat it as a bug in
one of them and reconcile.

---

## 1. Concepts

| Term | What it is |
| --- | --- |
| **License key** | The shared secret, format `NTCB-XXXX-XXXX-XXXX-XXXX-XXXX`. Server stores only a SHA-256 **hash** (`licenseKeyHash`) — the plaintext key is never looked up directly. One key per `Purchase` row. |
| **Seats** | How many **distinct devices** a key may be activated on (`Purchase.seats`, default `1`). |
| **Seat** | One occupied device slot (`LicenseSeat`). Created on first activation of a machine; `status = active` consumes capacity, `released` frees it for reuse. Source of truth for enforcement. |
| **Operator roster** | `LicenseUser` rows — every operator email seen on a license. Used by password-reset and to show who uses each key. |
| **License request** | `LicenseRequest` — a desktop app's self-service ask for a license. Queues as `pending`; an admin approves a batch into **one** key. |

**Security model — the key is the secret.** Any email may activate a key as long
as a seat is free; the activating email is auto-added to the roster ("auto
include all users"). The **seat count**, not the email, is the limit. Keep the
key out of logs and crash reports.

---

## 2. Lifecycle

```
 ┌─────────────┐   POST /api/license/request    ┌──────────────────┐
 │ Desktop app │ ─────────────────────────────▶ │ Pending request  │
 │ (per device)│   (auto-includes all operators)│ queue (per device)│
 └─────────────┘                                 └──────────────────┘
        │  GET /api/license/request (poll)                  │
        │                                                   ▼
        │                                   Admin dashboard: multi-select
        │                                   devices → Approve → 1 key,
        │                                   seats = approved device count
        │                                                   │
        │   key delivered (poll response / admin shares it) │
        ▼                                                   ▼
 ┌─────────────┐   POST /api/license/activate   ┌──────────────────┐
 │ Desktop app │ ─────────────────────────────▶ │ Consume a seat    │
 │             │   (seat consumed per machine)  │ (N max, then 409) │
 └─────────────┘                                 └──────────────────┘
        │  POST /api/license/validate   (runtime check, holds a seat?)
        │  POST /api/license/deactivate (release this seat on revoke)
        │  POST /api/software/latest    (update check; seat-gated)
        ▼  GET  /api/software/download?token=… (gated installer)
```

Two ways the app gets a key:
1. **Self-service request → approval** (this contract's headline flow), or
2. **Admin issues directly** from the dashboard ("Add license", optionally
   auto-generated) and shares the key out-of-band.

Either way, the key is then **activated per device**.

---

## 3. Device fingerprint — REQUIRED reading

`/api/license/request`, `/api/license/activate`, and `/api/software/latest`
**derive the device fingerprint server-side from request headers** (not from the
body). The fingerprint is the seat key, so **each physical machine must produce a
distinct, stable fingerprint**. Send these headers on every call:

| Header | Use | Guidance |
| --- | --- | --- |
| `User-Agent` | platform detection + audit | Include OS, e.g. `EDGEBI/3.2 (Windows NT 10.0)` |
| `Accept-Language` | fingerprint component | e.g. `en-US` |
| `X-Timezone` | fingerprint component | IANA tz, e.g. `America/Detroit` |
| `X-Screen-Resolution` | fingerprint component | e.g. `1920x1080` |
| `X-Hardware-Info` | **primary distinguisher** | A stable per-machine value — e.g. the processor ID, motherboard serial, or a hashed machine GUID. **This is what makes two machines distinct.** |

> If you do **not** send a distinguishing `X-Hardware-Info`, two different
> machines can hash to the same fingerprint and collapse into one seat. Always
> send it. `processorId` (in the body) is stored alongside and used as a
> fallback match by `validate`/`software/latest`.

The fingerprint algorithm is `SHA-256(platform | language | timezone |
screenResolution | hardwareInfo)`.

---

## 4. Desktop-facing endpoints

### 4.1 `POST /api/license/request` — submit a license request

Self-register this device. Re-posting from the same device while pending updates
the existing request (no duplicates). If the device was already approved, the key
is returned immediately.

**Auth:** none. **Rate limit:** 30 requests / minute / IP.

Request body:
```jsonc
{
  "email": "operator@acme.com",        // required — device owner / requester
  "customerName": "Acme Plant 2",      // optional
  "company": "Acme Manufacturing",     // optional
  "product": "EDGEBI",                 // optional
  "deviceName": "LINE-PC-07",          // optional — shown in the admin inbox
  "processorId": "BFEBFBFF000906EA",   // required — stable hardware id
  "systemInfo": "Windows 11 / i7",     // optional — free-form
  "operatorEmails": ["op1@acme.com", "op2@acme.com"]  // optional — all users on this device
}
```

Responses:
```jsonc
// 200 — queued
{ "requestId": "clr_...", "status": "pending" }

// 200 — this device was already approved; here's the key
{ "requestId": "clr_...", "status": "approved", "licenseKey": "NTCB-…", "seats": 6 }

// 400 — { "error": "Invalid request data", "details": [...] }
// 429 — { "error": "Too many requests. Try again shortly." }
```

curl:
```bash
curl -X POST https://usersolutions.com/api/license/request \
  -H 'Content-Type: application/json' \
  -H 'X-Hardware-Info: BFEBFBFF000906EA' -H 'X-Timezone: America/Detroit' \
  -d '{"email":"operator@acme.com","processorId":"BFEBFBFF000906EA","operatorEmails":["op1@acme.com"]}'
```

### 4.2 `GET /api/license/request` — poll for approval

Poll until approved, then pick up the key. The key is returned **only** to the
matching requester (same `email` **and** same device fingerprint).

**Auth:** none. Query params: `email` (required).

```bash
curl 'https://usersolutions.com/api/license/request?email=operator@acme.com' \
  -H 'X-Hardware-Info: BFEBFBFF000906EA' -H 'X-Timezone: America/Detroit'
```
```jsonc
// 200
{ "requestId": "clr_...", "status": "pending|approved|rejected",
  "licenseKey": "NTCB-…" /* only when approved */, "seats": 6, "note": null }
// 404 — { "status": "not_found" }
```

### 4.2.1 `POST /api/license/trial` — instant self-service trial (no approval)

Mints a **time-limited** license immediately — no admin approval, unlike the
request→approve flow. Validity is `LICENSE_TRIAL_DAYS` (default **7**). The
returned key activates and validates exactly like a full key, but `activate` /
`validate` / `software/latest` start refusing it once `expiresAt` passes.

**One trial per identity (idempotent):** a device (fingerprint **or**
`processorId`) or email that already has a trial gets that **same** trial back —
even after it expired — so re-running never mints a fresh window. Send the §3
fingerprint headers.

**Auth:** none. **Rate limit:** 30 / min / IP. **Seats:** 1.

Request body:
```jsonc
{
  "email": "operator@acme.com",       // required
  "processorId": "BFEBFBFF000906EA",  // required — stable hardware id
  "customerName": "Acme Plant 2",     // optional
  "company": "Acme Manufacturing",    // optional
  "product": "EDGEBI",                // optional
  "deviceName": "LINE-PC-07",         // optional
  "systemInfo": "Windows 11 / i7"     // optional
}
```

Responses (`GET /api/license/trial?email=…` returns the same shape for a poll):
```jsonc
// 200 — trial issued or re-returned
{ "licenseKey": "NTCB-…", "licenseType": "trial", "status": "trial",
  "expiresAt": "2026-07-07T12:00:00.000Z", "seats": 1, "trialDaysRemaining": 7 }
// 200 — existing trial already past its window
{ "licenseKey": "NTCB-…", "licenseType": "trial", "status": "expired",
  "expiresAt": "2026-06-20T…", "seats": 1, "trialDaysRemaining": 0 }
// 400 { "error": "Invalid request data", "details": [...] }
// 429 { "error": "Too many requests. Try again shortly." }
// 404 (GET only) { "status": "not_found" }
```

curl:
```bash
curl -X POST https://usersolutions.com/api/license/trial \
  -H 'Content-Type: application/json' -H 'X-Hardware-Info: BFEBFBFF000906EA' \
  -d '{"email":"operator@acme.com","processorId":"BFEBFBFF000906EA"}'
```

### 4.3 `POST /api/license/activate` — activate (consume a seat)

Binds this machine to a seat. Idempotent for the same machine (re-activating just
refreshes `lastSeenAt`). Blocks with `409` when all seats are in use.

**Auth:** none (the key is the credential). Send the fingerprint headers (§3).

Request body:
```jsonc
{
  "licenseKey": "NTCB-XXXX-XXXX-XXXX-XXXX-XXXX",  // required
  "email": "operator@acme.com",                    // required — auto-added to roster
  "processorId": "BFEBFBFF000906EA",               // required
  "systemInfo": "Windows 11 / i7",                 // required (free-form)
  "deviceName": "LINE-PC-07"                        // optional
}
```

Responses:
```jsonc
// 200 — seat consumed (or refreshed)
{
  "licenseKey": "NTCB-…", "email": "operator@acme.com", "status": "active",
  "licenseType": "full",   // "full" | "trial"
  "activatedAt": "2026-06-05T12:00:00.000Z",
  "expiresAt": null,       // license-validity expiry (trials); null = perpetual
  "systemFingerprint": "9a1f…", "processorId": "BFEBFBFF000906EA",
  "seats": 6, "seatsUsed": 3, "seatsRemaining": 3
}
// 404 — { "error": "Invalid license key" }
// 403 — { "error": "License has been revoked" }
// 403 — { "error": "License has expired", "licenseType": "trial", "expiresAt": "…" }
// 409 — { "error": "License seat limit reached. All 6 seats are in use…", "seats": 6 }
// 400 — { "error": "Invalid request data", "details": [...] }
```

### 4.4 `POST /api/license/validate` — runtime check

Lightweight "is this device still licensed?" check. Valid when the license is
`active`, **not expired**, **and** this device holds an active seat (matched by
`systemFingerprint` **or** `processorId`).

**Auth:** none. Note: this endpoint takes `systemFingerprint` **in the body**
(unlike activate, which derives it from headers).

```jsonc
// request
{ "licenseKey": "NTCB-…", "systemFingerprint": "9a1f…", "processorId": "BFEBFBFF000906EA" }
// 200
{ "valid": true, "purchaseId": "…", "activatedAt": "…", "customerName": "Acme",
  "seats": 6, "licenseType": "trial", "expiresAt": "2026-07-07T12:00:00.000Z",
  // Present only when LICENSE_SIGNING_PRIVATE_KEY is configured (production).
  "proof": { "alg": "ES256", "keyId": "9a1f0b2c", "signedAt": "2026-06-30T…",
             "nonce": "…", "signature": "<base64>" } }
// 404 { "valid": false, "error": "License not found" }
// 400 { "valid": false, "error": "License is not active" }
// 403 { "valid": false, "error": "License expired", "licenseType": "trial", "expiresAt": "…" }
// 403 { "valid": false, "error": "System validation failed" }   // no active seat for this device
```

**Verifying the proof (REQUIRED for tamper-resistance).** When `proof` is
present the desktop MUST verify it with the **embedded** ECDSA P-256 public key
before trusting `valid`. The signed message is a fixed-order, pipe-joined string
(reproduce it byte-for-byte; see `lib/license/license-signing.ts`):

```
EDGEBI-LICENSE-PROOF-V1|valid=1|purchaseId=<id>|licenseKeyHash=<sha256(licenseKey)>
  |licenseType=<full|trial>|expiresAt=<iso or empty>|signedAt=<iso>|nonce=<hex>
```

`licenseKeyHash` binds the proof to one key (so a "valid" proof can't be replayed
for another license); reject the proof if `signedAt` is not within a few minutes
of now (replay defence). A missing `proof` means signing isn't configured on the
server — treat that as online-only trust (acceptable in dev, not production).

### 4.5 `POST /api/license/deactivate` — release this device's seat

The inverse of activate. Frees the seat this machine holds so another device can
reuse it (the desktop "revoke this device" action calls it). Matches the seat by
`systemFingerprint` **or** `processorId`, like validate. **Idempotent:** if the
device holds no active seat it still returns `200` — the desired end-state (no
active seat for this device) already holds. The `LicenseSeat` row is **kept for
audit** and only flipped `active → released` (so the device can re-activate and
reclaim the slot later). It never changes `licenseStatus`, so it can't un-revoke
a license; seat occupancy is the only thing it touches.

**Auth:** none (the key is the credential). Send the fingerprint headers (§3) for
the audit trail. **Rate limit:** 30 / min / IP.

Request body:
```jsonc
{
  "licenseKey": "NTCB-XXXX-XXXX-XXXX-XXXX-XXXX",  // required
  "systemFingerprint": "9a1f…",                    // server-issued fp from activate
  "processorId": "BFEBFBFF000906EA"                // fallback match
}
```
At least one of `systemFingerprint` / `processorId` is required.

Responses:
```jsonc
// 200 — seat released (or already free; alreadyReleased=true means no-op)
{ "success": true, "status": "released", "alreadyReleased": false,
  "seats": 6, "seatsUsed": 2, "seatsRemaining": 4 }
// 404 — { "error": "Invalid license key" }
// 400 — { "error": "Invalid request data", "details": [...] }
//        or { "error": "systemFingerprint or processorId is required" }
// 429 — { "error": "Too many requests. Try again shortly." }
```

curl:
```bash
curl -X POST https://usersolutions.com/api/license/deactivate \
  -H 'Content-Type: application/json' \
  -d '{"licenseKey":"NTCB-…","systemFingerprint":"9a1f…","processorId":"BFEBFBFF000906EA"}'
```

### 4.6 `POST /api/software/latest` — update check (seat-gated)

Machine-to-machine update check + install write-back. Returns only the calling
customer's software, never the whole catalog. Seat-gated: once a license has
occupied seats, the caller must hold one.

**Auth:** license key in `Authorization: Bearer <key>` (preferred) or
`X-License-Key` (or `licenseKey` in body, legacy). **Rate limit:** 20 / min / IP.

```jsonc
// request body (all optional except an implicit key via header)
{ "processorId": "BFEBFBFF000906EA", "product": "EDGEBI",
  "version": "10.2", "releaseDate": "3/6/2026", "downloadUrl": "https://…" }
// 200
{ "software": [ { "productName": "EDGEBI", "description": "…",
  "latestVersion": "10.3", "downloadUrl": "https://…/api/software/download?token=…",
  "releaseDate": "5/6/2026" } ] }
// 401 missing key · 403 not active / seat mismatch · 404 unknown key · 429 rate limited
```

### 4.7 `GET /api/software/download?token=…` — gated installer

Streams an installer using the short-lived, license-bound token minted by
`software/latest`. **Rate limit:** 10 / min / license. Token TTL ~1h. Requires
`SOFTWARE_DOWNLOAD_SECRET`.

---

## 5. Admin endpoints (used by the dashboard)

All require an **admin session** (NextAuth cookie, `role = ADMIN`); they return
`401`/`403` otherwise. Not for the desktop app.

| Endpoint | Purpose |
| --- | --- |
| `GET /api/admin/license-requests?status=pending&groupKey=&search=&page=&limit=` | Inbox of requests + `groups` (by email domain) + `stats`. |
| `GET /api/admin/license-requests/export?ids=a,b&format=csv` | Download requester roster (CSV default, `format=json`). Or `?status=pending` / `?groupKey=`. |
| `GET /api/admin/licenses?status=&search=&page=&limit=` | License list + pagination + stats. |
| `GET /api/admin/licenses/{id}` | One license incl. `seats`, `licenseSeats`, `licenseUsers`, recent `activations`, `seatStats`. |
| `PATCH /api/admin/licenses/{id}` | Body `{ licenseStatus?, seats?, notes? }`. Lowering `seats` below active usage → `409`. |

Approve / reject / release-seat / change-seat-count are Next.js **server
actions** (`actions/licenses/*`), invoked from the dashboard, not REST endpoints.
**Approve** mints one key with `seats = approved device count` (admin-overridable),
registers all requesters + operators on the roster, links each request to the
issued license, and returns the key.

---

## 6. Error reference

| Status | Meaning | Caller action |
| --- | --- | --- |
| 400 | Bad input (zod `details`) / license not active (validate) | Fix payload; re-request a license. |
| 401 | Missing key (software/latest) / no admin session | Provide key / sign in. |
| 403 | Revoked, **expired** (trial ended), or this device has no active seat | Stop; buy/renew or contact admin. |
| 404 | Unknown key / request not found | Re-check key; re-submit request. |
| 409 | All seats in use | Admin must release a seat or raise the cap. |
| 429 | Rate limited | Back off and retry. |
| 500 | Server error | Retry with backoff. |

---

## 7. Recommended desktop integration flow

```
on first run (no key stored):
    POST /api/license/request   (with all operator emails + hardware headers)
    loop: GET /api/license/request every ~30s
          until status == "approved" -> store licenseKey
on key present, app start:
    POST /api/license/activate  (consume/refresh this machine's seat)
        200            -> run
        409 seats full -> tell user "ask admin for another seat / release one"
        403 revoked    -> stop
periodically while running:
    POST /api/license/validate  (confirm seat still held)
    POST /api/software/latest    (offer updates; download via returned token URL)
on user "revoke / deactivate this device":
    POST /api/license/deactivate (free this machine's seat; best-effort)
        2xx -> seat released (also 2xx if it was already free — idempotent)
        then clear the local license regardless of the result
```

Send the §3 headers on **every** request so the server computes a consistent,
machine-distinct fingerprint.

---

## 8. Environment variables (server)

| Var | Used by |
| --- | --- |
| `LICENSE_ENCRYPTION_KEY` | Key generation (`lib/license/license-key-generator.ts`). |
| `LICENSE_SIGNING_PRIVATE_KEY` | ECDSA P-256 (ES256) signing of validate proofs (`lib/license/license-signing.ts`). Base64 PEM. **Set in production** for tamper-resistance. |
| `LICENSE_SIGNING_PUBLIC_KEY` | Optional explicit public key; otherwise derived from the private key. The same key is **embedded in the desktop** to verify proofs. |
| `LICENSE_TRIAL_DAYS` | Trial validity for `/api/license/trial` (default `7`). |
| `SOFTWARE_DOWNLOAD_SECRET` | Signing/verifying download tokens. |

Generate the signing keypair once with
`npx tsx scripts/generate-license-signing-keys.ts` and embed the printed public
key in the desktop build.

See also [`LICENSING-OVERVIEW.md`](./LICENSING-OVERVIEW.md) for the data model and
how seats are enforced in the codebase.
