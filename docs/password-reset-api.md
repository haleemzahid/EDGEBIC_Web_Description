# Password Reset API (6-digit code) — desktop app integration

A secure, online forgot-password flow for the desktop app. The web
(usersolutions.com) generates a 6-digit code, **stores only its hash**, emails
it via Resend, and **verifies it online**. The desktop app never stores or
validates the code locally — it only relays the email and the code the user
types.

## Flow

```
Desktop app                         usersolutions.com (web)
-----------                         -----------------------
user clicks "Forgot password"
enters email
        ──POST /api/auth/password-reset/request──►  generate 6-digit code
                                                     store HMAC(code) + expiry
                                                     email the code (Resend)
        ◄────────── 200 generic ──────────────────  (always generic)

user reads email, types code
        ──POST /api/auth/password-reset/verify───►  check HMAC, expiry, attempts
        ◄──── { verified: true } ─────────────────  burn code (single-use)

verified → app lets the user set a new password locally
```

The code is bound to the email (the hash is `HMAC-SHA256(AUTH_SECRET,
"email:code")`), expires in 10 minutes, is single-use, and locks after 5 wrong
guesses.

## One-time server setup

1. **Set the shared secret** (the endpoints fail closed without it):

   ```bash
   # generate a key
   openssl rand -hex 32
   ```

   Put it in the server environment (and ship the same value inside the desktop
   app build):

   ```
   PASSWORD_RESET_API_KEY=<the generated key>
   ```

2. **Apply the database migration** (adds the `PasswordResetCode` table):

   ```bash
   npx prisma migrate dev --name add_password_reset_code   # local
   # or, on the deployed server:
   npx prisma migrate deploy
   ```

3. Email + `AUTH_SECRET` are already configured (Resend via `EMAIL_MAILER`,
   `EMAIL_RESEND_API_KEY`, `EMAIL_SENDER`). No extra email setup needed.

## Endpoints

All requests are JSON and require the header `X-Api-Key: <PASSWORD_RESET_API_KEY>`
(or `Authorization: Bearer <PASSWORD_RESET_API_KEY>`).

Base URL: `https://usersolutions.com`

### 1. Request a code

`POST /api/auth/password-reset/request`

```json
{ "email": "user@example.com" }
```

Always returns `200` with a generic body (so the API never reveals whether an
email is registered):

```json
{
  "success": true,
  "message": "If an account exists for that email, a password reset code has been sent.",
  "expiresInMinutes": 10
}
```

Other statuses: `400` invalid body, `401` bad/missing key, `429` rate limited,
`503` server key not configured.

> A code is only emailed when the address is recognised by the system (a
> dashboard user, a license holder, or a CRM contact). Unknown addresses get
> the same generic `200` but no email.

### 2. Verify a code

`POST /api/auth/password-reset/verify`

```json
{ "email": "user@example.com", "code": "048213" }
```

Success:

```json
{ "success": true, "verified": true }
```

Failure (`400`): `{ "success": false, "verified": false, "error": "Invalid code", "attemptsRemaining": 4 }`
— also `"Code has expired"`. Too many attempts returns `429`.

On `verified: true`, let the user set a new password in the app.

### 3. Admin audit (who requested a reset)

`GET /api/admin/password-reset-requests?page=1&limit=50&search=<email-or-name>`

Requires an authenticated **ADMIN** dashboard session (cookie), not the API
key. Returns requests with `email`, `requestedName`, linked `user`, `status`
(`pending` / `verified` / `expired` / `locked`), `attempts`, `ipAddress`,
`userAgent`, and timestamps. The code/hash is never returned.

## curl

```bash
curl -X POST https://usersolutions.com/api/auth/password-reset/request \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: $PASSWORD_RESET_API_KEY" \
  -d '{"email":"user@example.com"}'

curl -X POST https://usersolutions.com/api/auth/password-reset/verify \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: $PASSWORD_RESET_API_KEY" \
  -d '{"email":"user@example.com","code":"048213"}'
```

## C# / .NET desktop integration

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

public sealed class PasswordResetClient
{
    private static readonly HttpClient Http = new()
    {
        BaseAddress = new Uri("https://usersolutions.com")
    };

    // Ship this value in the app build / config. Same value as the server's
    // PASSWORD_RESET_API_KEY env var.
    private const string ApiKey = "<PASSWORD_RESET_API_KEY>";

    public sealed record RequestResult(bool Success, string Message, int ExpiresInMinutes);
    public sealed record VerifyResult(bool Success, bool Verified, string? Error, int? AttemptsRemaining);

    public async Task<RequestResult?> RequestCodeAsync(string email)
    {
        using var req = new HttpRequestMessage(HttpMethod.Post, "/api/auth/password-reset/request");
        req.Headers.Add("X-Api-Key", ApiKey);
        req.Content = JsonContent.Create(new { email });

        using var res = await Http.SendAsync(req);
        // 200 is always generic — show "check your email" regardless.
        return await res.Content.ReadFromJsonAsync<RequestResult>();
    }

    public async Task<VerifyResult?> VerifyCodeAsync(string email, string code)
    {
        using var req = new HttpRequestMessage(HttpMethod.Post, "/api/auth/password-reset/verify");
        req.Headers.Add("X-Api-Key", ApiKey);
        req.Content = JsonContent.Create(new { email, code });

        using var res = await Http.SendAsync(req);
        return await res.Content.ReadFromJsonAsync<VerifyResult>();
    }
}
```

Usage:

```csharp
var client = new PasswordResetClient();

// 1. user asks to reset
await client.RequestCodeAsync(email);
// UI: "If your email is registered, we've sent a 6-digit code (valid 10 min)."

// 2. user types the code
var verify = await client.VerifyCodeAsync(email, code);
if (verify is { Verified: true })
{
    // allow the user to set a new password locally
}
else
{
    // verify?.Error, verify?.AttemptsRemaining
}
```

## Security notes

- **Fail closed:** without `PASSWORD_RESET_API_KEY` set on the server, both
  endpoints return `503`. Configure it before going live.
- **Codes are never stored in plaintext** — only `HMAC-SHA256(AUTH_SECRET,
  "email:code")`. A database leak alone cannot reveal a code.
- **Single-use, 10-min expiry, 5-attempt lockout.** Requesting a new code
  invalidates older unused codes for that email.
- **Rate limiting:** per-IP (in-memory) plus a per-email 60-second cooldown and
  a 5-per-hour cap (DB-backed).
- **Anti-enumeration:** the request endpoint returns the same body for known,
  unknown, throttled, and email-send-failure cases. Residual risk: response
  timing differs slightly for known emails (an extra DB write + email send) —
  acceptable for this flow.
- The shared key is embedded in a distributed desktop app and is therefore
  extractable; treat it as anti-abuse hardening on top of the rate limits and
  generic responses, not as user authentication. Rotate it by changing the env
  var and shipping an app update.
```
