import { type SoftwareStatus } from '@prisma/client';

export type ContactSoftwareDto = {
  id: string;
  contactId: string;
  name: string;
  installedVersion?: string;
  latestVersion?: string;
  installDate?: Date;
  status: SoftwareStatus;
  githubUrl?: string;
  docsUrl?: string;
  downloadUrl?: string;
  licenseKey?: string;
  licenseType?: string;
  seats?: number;
  os?: string;
  database?: string;
  installPath?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};
