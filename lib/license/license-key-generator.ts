import crypto from 'crypto';
import { customAlphabet } from 'nanoid';

const LICENSE_KEY_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(LICENSE_KEY_ALPHABET, 8);

export interface LicenseKeyData {
  purchaseId: string;
  email: string;
  timestamp: number;
  productCode: string;
}

export class LicenseKeyGenerator {
  private static readonly ENCRYPTION_KEY =
    process.env.LICENSE_ENCRYPTION_KEY || '';
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly PRODUCT_CODE = 'NTCB'; // NTClipboard

  static generateLicenseKey(purchaseId: string, email: string): string {
    const keyData: LicenseKeyData = {
      purchaseId,
      email: email.toLowerCase(),
      timestamp: Date.now(),
      productCode: this.PRODUCT_CODE
    };

    const dataString = JSON.stringify(keyData);
    const encrypted = this.encrypt(dataString);

    // Format: NTCB-XXXX-XXXX-XXXX-XXXX-XXXX
    const segments = [
      this.PRODUCT_CODE,
      nanoid(),
      nanoid(),
      nanoid(),
      nanoid(),
      encrypted.slice(0, 8).toUpperCase()
    ];

    return segments.join('-');
  }

  static validateLicenseKey(licenseKey: string): {
    valid: boolean;
    data?: LicenseKeyData;
    error?: string;
  } {
    try {
      const segments = licenseKey.split('-');
      if (segments.length !== 6 || segments[0] !== this.PRODUCT_CODE) {
        return { valid: false, error: 'Invalid license key format' };
      }

      // For now, we'll validate format only
      // Full validation happens server-side with database lookup
      return { valid: true };
    } catch (error) {
      return { valid: false, error: 'Invalid license key' };
    }
  }

  static hashLicenseKey(licenseKey: string): string {
    return crypto.createHash('sha256').update(licenseKey).digest('hex');
  }

  // Authenticated AES-256-GCM. The previous implementation used GCM but threw
  // the auth tag away and used a hard-coded salt, so `decrypt()` could never
  // round-trip (final() rejects a missing tag) and the ciphertext was
  // unauthenticated. Format is `salt:iv:tag:ciphertext` (all hex); the salt and
  // a 12-byte GCM nonce are random per call, and the tag is verified on
  // decrypt so any tampering fails closed.
  private static encrypt(text: string): string {
    const salt = crypto.randomBytes(16);
    const iv = crypto.randomBytes(12); // 96-bit nonce — the GCM standard size
    const key = crypto.scryptSync(this.ENCRYPTION_KEY, salt, 32);
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final()
    ]);
    const tag = cipher.getAuthTag();

    return [
      salt.toString('hex'),
      iv.toString('hex'),
      tag.toString('hex'),
      encrypted.toString('hex')
    ].join(':');
  }

  private static decrypt(encryptedData: string): string {
    const [saltHex, ivHex, tagHex, dataHex] = encryptedData.split(':');
    const key = crypto.scryptSync(this.ENCRYPTION_KEY, Buffer.from(saltHex, 'hex'), 32);

    const decipher = crypto.createDecipheriv(
      this.ALGORITHM,
      key,
      Buffer.from(ivHex, 'hex')
    );
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'));

    return Buffer.concat([
      decipher.update(Buffer.from(dataHex, 'hex')),
      decipher.final()
    ]).toString('utf8');
  }
}
