/**
 * Generates the ECDSA P-256 keypair that signs license-validation proofs.
 *
 *   npx tsx scripts/generate-license-signing-keys.ts
 *
 * - The PRIVATE key goes in the server env as `LICENSE_SIGNING_PRIVATE_KEY`
 *   (one-line, base64-encoded PEM — paste straight into .env / Vercel).
 * - The PUBLIC key is EMBEDDED in the desktop app so it can verify proofs
 *   offline. A fake/MITM server without the private key cannot forge a proof
 *   the desktop will accept. P-256 is verified natively by .NET's ECDsa.
 *
 * Run once and store the private key as a secret. Rotating it invalidates the
 * public key shipped in older desktop builds, so coordinate a rotation with a
 * desktop release that embeds the new public key.
 */
import crypto from 'crypto';

const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
  namedCurve: 'prime256v1' // a.k.a. P-256 / secp256r1
});

const privatePem = privateKey
  .export({ type: 'pkcs8', format: 'pem' })
  .toString();
const publicPem = publicKey.export({ type: 'spki', format: 'pem' }).toString();
const privateBase64 = Buffer.from(privatePem, 'utf8').toString('base64');
const keyId = crypto
  .createHash('sha256')
  .update(publicKey.export({ type: 'spki', format: 'der' }))
  .digest('hex')
  .slice(0, 8);

/* eslint-disable no-console */
console.log('\n=== License signing keypair (ECDSA P-256 / ES256) ===\n');
console.log(`Key ID (first 8 hex of SHA-256(pubkey)): ${keyId}\n`);

console.log('--- SERVER: add to .env (single line, base64 PEM) ---');
console.log(`LICENSE_SIGNING_PRIVATE_KEY="${privateBase64}"\n`);

console.log('--- PUBLIC KEY: embed this PEM in the desktop app ---');
console.log(publicPem);

console.log('--- (optional) also expose the public key to the server env ---');
console.log(
  `LICENSE_SIGNING_PUBLIC_KEY="${Buffer.from(publicPem, 'utf8').toString('base64')}"\n`
);
