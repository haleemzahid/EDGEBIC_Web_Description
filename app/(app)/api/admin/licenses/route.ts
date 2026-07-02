import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status');
    const search = searchParams.get('search'); // Search by email or customer name

    const skip = (page - 1) * limit;

    // Build where condition
    const where: Record<string, any> = {};
    if (status) {
      where.licenseStatus = status;
    }
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [licenses, total] = await Promise.all([
      prisma.purchase.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          customerName: true,
          amount: true,
          currency: true,
          stripeSessionId: true,
          stripePaymentId: true,
          status: true,
          licenseKey: true,
          licenseStatus: true,
          licenseType: true,
          licenseExpiresAt: true,
          activatedAt: true,
          activatedEmail: true,
          systemFingerprint: true,
          processorId: true,
          activationAttempts: true,
          maxActivationAttempts: true,
          downloadCount: true,
          maxDownloads: true,
          createdAt: true,
          updatedAt: true,
          expiresAt: true,
          activations: {
            select: {
              id: true,
              status: true,
              ipAddress: true,
              userAgent: true,
              createdAt: true,
              errorMessage: true
            },
            orderBy: { createdAt: 'desc' },
            take: 5 // Latest 5 activation attempts for overview
          }
        }
      }),
      prisma.purchase.count({ where })
    ]);

    // Calculate statistics
    const stats = await prisma.purchase.aggregate({
      where,
      _count: { id: true },
      _sum: { amount: true }
    });

    const statusCounts = await prisma.purchase.groupBy({
      by: ['licenseStatus'],
      _count: { id: true }
    });

    return NextResponse.json({
      licenses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      stats: {
        totalLicenses: stats._count.id,
        totalRevenue: stats._sum.amount || 0,
        statusBreakdown: statusCounts.reduce(
          (acc, item) => {
            acc[item.licenseStatus] = item._count.id;
            return acc;
          },
          {} as Record<string, number>
        )
      }
    });
  } catch (error) {
    console.error('Error fetching licenses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch licenses' },
      { status: 500 }
    );
  }
}
