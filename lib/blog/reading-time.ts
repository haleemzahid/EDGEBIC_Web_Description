export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): number {
  // Strip HTML and MDX tags
  const stripped = text.replace(/<[^>]*>/g, '').replace(/\{[^}]*\}/g, '');

  // Count words by splitting on whitespace
  const words = stripped
    .split(/\s+/)
    .filter((word) => word.length > 0);

  const minutes = Math.ceil(words.length / wordsPerMinute);

  return Math.max(1, minutes);
}
