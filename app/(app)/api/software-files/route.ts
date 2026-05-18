import { NextResponse, type NextRequest } from 'next/server';
import { Role } from '@prisma/client';

import { dedupedAuth } from '@/lib/auth';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { saveSoftwareFile } from '@/lib/software-files/storage';

// Team-side installer upload. Stores the file and returns an absolute
// downloadUrl that the Add/Edit software flow saves on ContactSoftware
// (which the My Software page + /api/software/latest then hand out).
export async function POST(req: NextRequest): Promise<Response> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Uploading installers is a CRM action — never a client-portal one.
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });
  if (!user || user.role === Role.CLIENT) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: 'Expected multipart/form-data' },
      { status: 400 }
    );
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  try {
    const saved = await saveSoftwareFile(file);
    // Store the RELATIVE public path only. The absolute URL is built at
    // read time (api/software/latest) against the canonical base URL, so
    // an installer uploaded from localhost still serves a correct public
    // link in production. Prefix with the canonical origin for the
    // immediate UI confirmation only.
    return NextResponse.json(
      {
        downloadUrl: saved.publicUrl,
        fileName: saved.fileName,
        sizeBytes: saved.sizeBytes
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to save file'
      },
      { status: 400 }
    );
  }
}
