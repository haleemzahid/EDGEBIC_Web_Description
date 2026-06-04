export const MIN_INT32 = -2147483648;
export const MAX_INT32 = +2147483647;
export const MAX_IMAGE_SIZE = 1000000 * 5; // 5 MB
export const MINIMUM_PASSWORD_LENGTH = 8;
export const EMAIL_VERIFICATION_EXPIRY_HOURS = 24 * 30; // 30 days
export const EMAIL_CHANGE_EXPIRY_HOURS = 6;
export const PASSWORD_RESET_EXPIRY_HOURS = 6;
export const TOTP_AND_RECOVERY_CODES_EXPIRY_MINUTES = 12;

// 6-digit code reset flow (desktop app API).
export const PASSWORD_RESET_CODE_LENGTH = 6;
export const PASSWORD_RESET_CODE_EXPIRY_MINUTES = 10;
// Wrong-code guesses allowed before a code is locked out (online brute-force guard).
export const PASSWORD_RESET_CODE_MAX_ATTEMPTS = 5;
// Minimum seconds between two code emails for the same address.
export const PASSWORD_RESET_CODE_RESEND_COOLDOWN_SECONDS = 60;
// Maximum codes that may be issued for one address within a rolling hour.
export const PASSWORD_RESET_CODE_MAX_PER_HOUR = 5;
