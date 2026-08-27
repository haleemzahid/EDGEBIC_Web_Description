/** Status code carried by a thrown health-check error, else 503. */
export function healthFailureStatus(err: unknown): number {
  if (
    typeof err === 'object' &&
    err !== null &&
    'statusCode' in err &&
    typeof (err as { statusCode: unknown }).statusCode === 'number'
  ) {
    return (err as { statusCode: number }).statusCode;
  }
  return 503;
}
