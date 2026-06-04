import { NextRequest, NextResponse } from 'next/server';

import { dedupedAuth } from '@/lib/auth';
import { isAdmin } from '@/lib/auth/permissions';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';

// Admin audit view: "who requested a password reset". Lists PasswordResetCode
// rows with the requester (matched name / linked dashboard user), status, the
// IP + user-agent the request came from, and timestamps. The `codeHash` is
// never selected, so the actual codes are never exposed here.
//
// Auth is enforced inline: middleware only sets noindex headers on /api/admin,
// it does NOT gate access. ADMIN role required.

export async function GET(request: NextRequest) {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!(await isAdmin(session.user.id))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get('limit') || '50', 10))
    );
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    const where: Record<string, any> = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { requestedName: { contains: search, mode: 'insensitive' } }
      ];
    }

    const now = new Date();

    const [rows, total] = await Promise.all([
      prisma.passwordResetCode.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        // codeHash intentionally omitted — never expose it.
        select: {
          id: true,
          email: true,
          requestedName: true,
          userId: true,
          attempts: true,
          maxAttempts: true,
          expires: true,
          consumedAt: true,
          ipAddress: true,
          userAgent: true,
          createdAt: true,
          user: {
            select: { id: true, name: true, email: true, role: true }
          }
        }
      }),
      prisma.passwordResetCode.count({ where })
    ]);

    const requests = rows.map((row) => ({
      ...row,
      status: row.consumedAt
        ? 'verified'
        : row.expires <= now
          ? 'expired'
          : row.attempts >= row.maxAttempts
            ? 'locked'
            : 'pending'
    }));

    return NextResponse.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching password reset requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}
