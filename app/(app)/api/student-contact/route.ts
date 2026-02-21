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

    // Save to Contact table with "Student" tag
    const contact = await prisma.contact.create({
      data: {
        organizationId: organization.id,
        name,
        email,
        record: 'PERSON',
        stage: 'LEAD',
        description: schoolName ? `School: ${schoolName}` : null,
        isRead: false,
        tags: {
          connect: { id: studentTag.id }
        }
      }
    });

    // Revalidate contacts cache so new contact shows immediately in CRM
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Contacts,
        organization.id
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
