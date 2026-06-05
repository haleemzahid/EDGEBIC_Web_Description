import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const license = await prisma.purchase.findUnique({
      where: { id },
      include: {
        activations: {
          orderBy: { createdAt: 'desc' },
          take: 50 // Get more activation history for details view
        },
        licenseSeats: {
          orderBy: { firstActivatedAt: 'desc' }
        },
        licenseUsers: {
          orderBy: { lastSeenAt: 'desc' }
        }
      }
    });

    if (!license) {
      return NextResponse.json({ error: 'License not found' }, { status: 404 });
    }

    // Calculate some additional stats
    const activationStats = {
      totalAttempts: license.activations.length,
      successfulAttempts: license.activations.filter(
        (a) => a.status === 'success'
      ).length,
      failedAttempts: license.activations.filter((a) => a.status === 'failed')
        .length,
      blockedAttempts: license.activations.filter((a) => a.status === 'blocked')
        .length,
      uniqueIPs: [...new Set(license.activations.map((a) => a.ipAddress))]
        .length,
      lastAttempt: license.activations[0]?.createdAt || null
    };

    const seatsUsed = license.licenseSeats.filter(
      (s) => s.status === 'active'
    ).length;
    const seatStats = {
      total: license.seats,
      used: seatsUsed,
      remaining: Math.max(0, license.seats - seatsUsed)
    };

    return NextResponse.json({
      license,
      activationStats,
      seatStats
    });
  } catch (error) {
    console.error('Error fetching license details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch license details' },
      { status: 500 }
    );
  }
}

// Update license status and/or seat count (admin function)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { licenseStatus, seats, notes } = body as {
      licenseStatus?: string;
      seats?: number;
      notes?: string;
    };

    const data: Record<string, unknown> = { updatedAt: new Date() };

    if (licenseStatus !== undefined) {
      if (!['inactive', 'active', 'revoked'].includes(licenseStatus)) {
        return NextResponse.json(
          { error: 'Invalid license status' },
          { status: 400 }
        );
      }
      data.licenseStatus = licenseStatus;
    }

    if (seats !== undefined) {
      const seatCount = Number(seats);
      if (!Number.isInteger(seatCount) || seatCount < 1) {
        return NextResponse.json(
          { error: 'Seats must be a positive integer' },
          { status: 400 }
        );
      }
      const activeSeats = await prisma.licenseSeat.count({
        where: { purchaseId: id, status: 'active' }
      });
      if (seatCount < activeSeats) {
        return NextResponse.json(
          {
            error: `${activeSeats} seats are in use. Release seats before lowering the cap to ${seatCount}.`
          },
          { status: 409 }
        );
      }
      data.seats = seatCount;
    }

    if (data.licenseStatus === undefined && data.seats === undefined) {
      return NextResponse.json(
        { error: 'Nothing to update' },
        { status: 400 }
      );
    }

    const updatedLicense = await prisma.purchase.update({
      where: { id },
      data
    });

    // Log the admin action
    await prisma.licenseActivation.create({
      data: {
        purchaseId: id,
        email: 'admin@system',
        systemFingerprint: 'admin-action',
        status: 'admin-update',
        errorMessage: `Updated ${
          licenseStatus !== undefined ? `status=${licenseStatus} ` : ''
        }${seats !== undefined ? `seats=${seats} ` : ''}Notes: ${notes || 'None'}`
      }
    });

    return NextResponse.json({
      success: true,
      license: updatedLicense
    });
  } catch (error) {
    console.error('Error updating license:', error);
    return NextResponse.json(
      { error: 'Failed to update license' },
      { status: 500 }
    );
  }
}
