// Relative URL on purpose — never bake the upload-time origin into the
// stored User.image value. An absolute URL built from getBaseUrl() would
// freeze in whatever host was active at upload time (e.g. localhost when
// NEXT_PUBLIC_BASE_URL is unset), then 404 on the live site. A relative
// path resolves against whatever host the avatar is rendered on.
export function getUserImageUrl(userId: string, hash: string): string {
  return `/api/user-images/${userId}?v=${hash}`;
}
