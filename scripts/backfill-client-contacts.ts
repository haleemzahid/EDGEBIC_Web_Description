/**
 * Backfill script: create a Contact row for every existing CLIENT user and
 * every non-revoked CLIENT invitation that doesn't already have one.
 *
 * Run once with:  npx tsx scripts/backfill-client-contacts.ts
 */

import {
  ActionType,
  ActorType,
  ContactRecord,
  ContactStage,
  InvitationStatus,
  Role
} from '@prisma/client';

import { prisma } from '../lib/db/prisma';

type Candidate = {
  organizationId: string;
  email: string;
  name: string;
  source: 'user' | 'invitation';
};

async function main(): Promise<void> {
  const clientUsers = await prisma.user.findMany({
    where: {
      role: Role.CLIENT,
      email: { not: null },
      organizationId: { not: null }
    },
    select: { id: true, name: true, email: true, organizationId: true }
  });

  const clientInvitations = await prisma.invitation.findMany({
    where: {
      role: Role.CLIENT,
      status: { not: InvitationStatus.REVOKED }
    },
    select: { id: true, email: true, organizationId: true }
  });

  const candidates: Candidate[] = [
    ...clientUsers.map<Candidate>((u) => ({
      organizationId: u.organizationId!,
      email: u.email!,
      name: u.name || u.email!.split('@')[0],
      source: 'user'
    })),
    ...clientInvitations.map<Candidate>((i) => ({
      organizationId: i.organizationId,
      email: i.email,
      name: i.email.split('@')[0] || i.email,
      source: 'invitation'
    }))
  ];

  // De-dupe by (organizationId, lowercased email), preferring 'user' source
  // because the user table has a real display name.
  const dedup = new Map<string, Candidate>();
  for (const c of candidates) {
    const key = `${c.organizationId}:${c.email.toLowerCase()}`;
    const existing = dedup.get(key);
    if (!existing || (existing.source === 'invitation' && c.source === 'user')) {
      dedup.set(key, c);
    }
  }

  let created = 0;
  let skipped = 0;

  for (const candidate of dedup.values()) {
    const existingContact = await prisma.contact.findFirst({
      where: {
        organizationId: candidate.organizationId,
        email: { equals: candidate.email, mode: 'insensitive' }
      },
      select: { id: true }
    });

    if (existingContact) {
      skipped += 1;
      continue;
    }

    const contact = await prisma.contact.create({
      data: {
        organizationId: candidate.organizationId,
        record: ContactRecord.PERSON,
        name: candidate.name,
        email: candidate.email,
        stage: ContactStage.WON,
        isRead: false
      },
      select: { id: true, createdAt: true }
    });

    await prisma.contactActivity.create({
      data: {
        contactId: contact.id,
        actionType: ActionType.CREATE,
        actorId: 'backfill-script',
        actorType: ActorType.SYSTEM,
        metadata: {
          source: { old: '', new: `backfill-${candidate.source}` },
          email: { old: '', new: candidate.email }
        },
        occurredAt: contact.createdAt
      }
    });

    created += 1;
    console.log(
      `[+] Created contact for ${candidate.email} (org ${candidate.organizationId}, source: ${candidate.source})`
    );
  }

  console.log(`\nDone. Created: ${created}, skipped (already present): ${skipped}.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
