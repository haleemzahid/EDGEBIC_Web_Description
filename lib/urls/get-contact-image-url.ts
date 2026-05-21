// Relative URL on purpose — never bake the upload-time origin into the
// stored Contact.image value. See get-user-image-url.ts for the rationale.
export function getContactImageUrl(contactId: string, hash: string): string {
  return `/api/contact-images/${contactId}?v=${hash}`;
}
