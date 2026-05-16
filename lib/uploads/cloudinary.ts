import { v2 as cloudinary } from 'cloudinary';

// Shared upload backend used by installer files and ticket/message
// attachments. Two backends, chosen automatically:
//  - production (deployed): Cloudinary
//  - local dev: caller writes to disk and serves it via its own route
//
// Force a backend with UPLOAD_STORAGE = 'cloudinary' | 'local'.
//
// NOTE: Cloudinary free plan rejects raw files bigger than ~10 MB.

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export function useCloudinary(): boolean {
  const forced = process.env.UPLOAD_STORAGE;
  if (forced === 'cloudinary') return true;
  if (forced === 'local') return false;
  return process.env.NODE_ENV === 'production';
}

// Upload raw bytes (any file type kept as-is). When publicId is given the
// delivery URL is deterministic, so callers can rebuild it later from a
// stored name without persisting the full URL.
export async function uploadRawToCloudinary(
  buffer: Buffer,
  opts: { folder: string; publicId?: string }
): Promise<string> {
  const result = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'raw',
            folder: opts.folder,
            public_id: opts.publicId,
            use_filename: !opts.publicId,
            unique_filename: !opts.publicId,
            overwrite: false
          },
          (error, uploaded) => {
            if (error || !uploaded) {
              reject(
                new Error(error?.message || 'Cloudinary upload failed')
              );
              return;
            }
            resolve(uploaded as { secure_url: string });
          }
        )
        .end(buffer);
    }
  );
  return result.secure_url;
}

// Deterministic delivery URL for a raw asset uploaded with a known
// folder + public_id (the public_id here is the full stored name,
// extension included).
export function cloudinaryRawUrl(folder: string, storedName: string): string {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloud}/raw/upload/${folder}/${storedName}`;
}
