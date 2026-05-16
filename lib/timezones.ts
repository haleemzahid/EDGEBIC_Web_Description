// Full IANA timezone list straight from the JS engine, so it stays current
// without shipping a hand-maintained data file. Falls back to a small common
// set on the rare engine that doesn't implement Intl.supportedValuesOf.
const FALLBACK_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Sao_Paulo',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Paris',
  'Europe/Moscow',
  'Asia/Dubai',
  'Asia/Karachi',
  'Asia/Kolkata',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Australia/Sydney'
];

export function getTimezones(): string[] {
  const supported = (
    Intl as typeof Intl & {
      supportedValuesOf?: (key: 'timeZone') => string[];
    }
  ).supportedValuesOf;
  if (typeof supported === 'function') {
    try {
      return supported('timeZone');
    } catch {
      // fall through
    }
  }
  return FALLBACK_TIMEZONES;
}
