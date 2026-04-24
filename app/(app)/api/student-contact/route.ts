/**
 * Student Free Trial Contact API Route
 *
 * Handles student free trial form submissions from the students page
 * and saves them to the Contact table with a "Student" tag.
 *
 * POST /api/student-contact
 */

import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { ActionType, ActorType } from '@prisma/client';
import { z } from 'zod';

import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';

// Verify reCAPTCHA token with Google
async function verifyCaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return false;
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `secret=${secretKey}&response=${token}`
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error verifying captcha:', error);
    return false;
  }
}

const studentFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Valid email is required'),
  schoolName: z.string().max(255).optional(),
  captcha: z.string().optional()
});

// Get or create the default organization
async function getOrCreateOrganization() {
  let organization = await prisma.organization.findFirst();

  if (!organization) {
    organization = await prisma.organization.create({
      data: {
        name: 'EDGEBI',
        stripeCustomerId: 'default_stripe_customer'
      }
    });
  }

  return organization;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = studentFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input',
          details: validationResult.error.errors
        },
        { status: 400 }
      );
    }

    const { name, email, schoolName, captcha } = validationResult.data;

    // Verify reCAPTCHA
    if (!captcha) {
      return NextResponse.json(
        {
          success: false,
          error: 'Captcha is required'
        },
        { status: 400 }
      );
    }

    const isCaptchaValid = await verifyCaptcha(captcha);

    if (!isCaptchaValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid captcha verification. Please try again.'
        },
        { status: 400 }
      );
    }

    // Get or create organization
    const organization = await getOrCreateOrganization();

    // Get or create the "Student" tag
    const studentTag = await prisma.contactTag.upsert({
      where: { text: 'Student' },
      update: {},
      create: { text: 'Student' }
    });

    const submittedDescription = schoolName ? `School: ${schoolName}` : null;

    // Upsert by email so repeat submissions don't create duplicate CRM rows.
    // Each submission records a ContactActivity and bumps createdAt so the
    // contact moves to the top of the default (createdAt desc) CRM sort.
    const contact = await prisma.$transaction(async (tx) => {
      const existing = await tx.contact.findFirst({
        where: {
          organizationId: organization.id,
          email: { equals: email, mode: 'insensitive' }
        },
        include: { tags: { select: { id: true } } }
      });

      const now = new Date();

      if (existing) {
        const hasStudentTag = existing.tags.some((t) => t.id === studentTag.id);
        const updated = await tx.contact.update({
          where: { id: existing.id },
          data: {
            name,
            description: submittedDescription ?? existing.description,
            isRead: false,
            createdAt: now,
            tags: hasStudentTag
              ? undefined
              : { connect: { id: studentTag.id } }
          }
        });

        const changes: Record<string, { old: string; new: string }> = {};
        if ((existing.name ?? '') !== name) {
          changes.name = { old: existing.name ?? '', new: name };
        }
        if ((existing.description ?? '') !== (submittedDescription ?? '')) {
          changes.message = {
            old: existing.description ?? '',
            new: submittedDescription ?? ''
          };
        }

        await tx.contactActivity.create({
          data: {
            contactId: updated.id,
            actionType: ActionType.UPDATE,
            actorId: 'public-student-form',
            actorType: ActorType.API,
            metadata:
              Object.keys(changes).length > 0
                ? changes
                : {
                    submission: {
                      old: '',
                      new: 'Re-submitted student free trial form'
                    }
                  },
            occurredAt: now
          }
        });

        return updated;
      }

      const created = await tx.contact.create({
        data: {
          organizationId: organization.id,
          name,
          email,
          record: 'PERSON',
          stage: 'LEAD',
          description: submittedDescription,
          isRead: false,
          tags: {
            connect: { id: studentTag.id }
          }
        }
      });

      await tx.contactActivity.create({
        data: {
          contactId: created.id,
          actionType: ActionType.CREATE,
          actorId: 'public-student-form',
          actorType: ActorType.API,
          metadata: {
            name: { old: '', new: name },
            email: { old: '', new: email },
            message: { old: '', new: submittedDescription ?? '' }
          },
          occurredAt: created.createdAt
        }
      });

      return created;
    });

    // Revalidate contacts cache so new/updated contact shows immediately in CRM
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Contacts,
        organization.id
      )
    );
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Contact,
        organization.id,
        contact.id
      )
    );
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.ContactTimelineEvents,
        organization.id,
        contact.id
      )
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Student contact submitted successfully',
        id: contact.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing student contact form:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
