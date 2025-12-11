/**
 * Public Contact Form API Route
 *
 * This route handles contact form submissions from your marketing pages
 * and saves them to the Contact table.
 *
 * POST /api/contact
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import { Caching, OrganizationCacheKey } from '@/data/caching';
import { prisma } from '@/lib/db/prisma';
import { sendContactFormEmail } from '@/lib/smtp/send-contact-form-email';

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(255),
  lastName: z.string().min(1, 'Last name is required').max(255),
  email: z.string().email('Valid email is required'),
  phone: z.string().max(32).optional(),
  productInterest: z.string().min(1, 'Please select a product'),
  hearAboutUs: z.string().min(1, 'Please select an option'),
  message: z.string().max(5000).optional(),
  captcha: z.string().optional()
});

// Get or create the default organization
async function getOrCreateOrganization() {
  // Try to find existing organization
  let organization = await prisma.organization.findFirst();

  // If no organization exists, create one
  if (!organization) {
    organization = await prisma.organization.create({
      data: {
        name: 'EDGEBIC',
        stripeCustomerId: 'default_stripe_customer'
      }
    });
  }

  return organization;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const validationResult = contactFormSchema.safeParse(body);

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

    const { firstName, lastName, email, phone, productInterest, hearAboutUs, message } = validationResult.data;

    // Get or create organization
    const organization = await getOrCreateOrganization();

    // Save to Contact table
    const contact = await prisma.contact.create({
      data: {
        organizationId: organization.id,
        name: `${firstName} ${lastName}`,
        email,
        phone: phone || null,
        record: 'PERSON',
        stage: 'LEAD',
        productInterest,
        hearAboutUs,
        description: message || null,
        isRead: false
      }
    });

    // Revalidate contacts cache so new contact shows immediately in CRM
    revalidateTag(
      Caching.createOrganizationTag(
        OrganizationCacheKey.Contacts,
        organization.id
      )
    );

    // Send email notification to both recipients
    const recipients = [
      'mudasirnadeem7979@gmail.com',
      'haleemzahid35@gmail.com'
    ];

    for (const recipient of recipients) {
      try {
        await sendContactFormEmail({
          recipient,
          firstName,
          lastName,
          email,
          phone: phone || undefined,
          productInterest,
          hearAboutUs,
          message: message || undefined
        });
      } catch (emailError) {
        console.error(`Error sending contact form email to ${recipient}:`, emailError);
        // Don't fail the request if email fails - contact is already saved
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Contact submitted successfully',
        id: contact.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add rate limiting
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
