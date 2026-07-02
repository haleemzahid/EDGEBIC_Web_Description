import { prisma } from '@/lib/db/prisma';

export interface InventoryStats {
  totalLicenses: number;
  activeLicenses: number;
  inactiveLicenses: number;
  revokedLicenses: number;
  activationRate: number;
  totalRevenue: number;
  averageLicenseValue: number;
  licensesActivatedThisMonth: number;
  licensesActivatedLastMonth: number;
  recentActivations: LicenseInventoryItem[];
}

export interface LicenseInventoryItem {
  id: string;
  customerName: string;
  email: string;
  licenseKey: string | null;
  licenseStatus: string;
  licenseType: string;
  licenseExpiresAt: Date | null;
  amount: number;
  currency: string;
  createdAt: Date;
  activatedAt: Date | null;
  activatedEmail: string | null;
  systemFingerprint: string | null;
  processorId: string | null;
  activationAttempts: number;
  maxActivationAttempts: number;
  downloadCount: number;
  maxDownloads: number;
}

export interface LicenseActivationDetails {
  id: string;
  email: string;
  systemFingerprint: string;
  processorId: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  status: string;
  errorMessage: string | null;
  createdAt: Date;
}

export async function getInventoryStats(): Promise<InventoryStats> {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Get all purchases with license keys
    const allPurchases = await prisma.purchase.findMany({
      where: {
        status: 'completed'
      },
      select: {
        id: true,
        customerName: true,
        email: true,
        licenseKey: true,
        licenseStatus: true,
        licenseType: true,
        licenseExpiresAt: true,
        amount: true,
        currency: true,
        createdAt: true,
        activatedAt: true,
        activatedEmail: true,
        systemFingerprint: true,
        processorId: true,
        activationAttempts: true,
        maxActivationAttempts: true,
        downloadCount: true,
        maxDownloads: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate stats
    const totalLicenses = allPurchases.length;
    const activeLicenses = allPurchases.filter(
      (p) => p.licenseStatus === 'active'
    ).length;
    const inactiveLicenses = allPurchases.filter(
      (p) => p.licenseStatus === 'inactive'
    ).length;
    const revokedLicenses = allPurchases.filter(
      (p) => p.licenseStatus === 'revoked'
    ).length;

    const activationRate =
      totalLicenses > 0 ? (activeLicenses / totalLicenses) * 100 : 0;

    const totalRevenue =
      allPurchases.reduce((sum, p) => sum + p.amount, 0) / 100;
    const averageLicenseValue =
      totalLicenses > 0 ? totalRevenue / totalLicenses : 0;

    // Get licenses activated this month
    const licensesActivatedThisMonth = allPurchases.filter(
      (p) => p.activatedAt && p.activatedAt >= startOfMonth
    ).length;

    // Get licenses activated last month
    const licensesActivatedLastMonth = allPurchases.filter(
      (p) =>
        p.activatedAt &&
        p.activatedAt >= startOfLastMonth &&
        p.activatedAt <= endOfLastMonth
    ).length;

    // Get recent activations (last 10)
    const recentActivations = allPurchases
      .filter((p) => p.activatedAt)
      .slice(0, 10);

    return {
      totalLicenses,
      activeLicenses,
      inactiveLicenses,
      revokedLicenses,
      activationRate,
      totalRevenue,
      averageLicenseValue,
      licensesActivatedThisMonth,
      licensesActivatedLastMonth,
      recentActivations
    };
  } catch (error) {
    console.error('Error fetching inventory stats:', error);
    throw error;
  }
}

export async function getAllLicenses(
  searchTerm = '',
  status?: string
): Promise<LicenseInventoryItem[]> {
  try {
    const where: any = {
      status: 'completed'
    };

    if (searchTerm) {
      where.OR = [
        { customerName: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
        { licenseKey: { contains: searchTerm, mode: 'insensitive' } }
      ];
    }

    if (status && status !== 'all') {
      where.licenseStatus = status;
    }

    const licenses = await prisma.purchase.findMany({
      where,
      select: {
        id: true,
        customerName: true,
        email: true,
        licenseKey: true,
        licenseStatus: true,
        licenseType: true,
        licenseExpiresAt: true,
        amount: true,
        currency: true,
        createdAt: true,
        activatedAt: true,
        activatedEmail: true,
        systemFingerprint: true,
        processorId: true,
        activationAttempts: true,
        maxActivationAttempts: true,
        downloadCount: true,
        maxDownloads: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return licenses;
  } catch (error) {
    console.error('Error fetching all licenses:', error);
    throw error;
  }
}

export async function getLicenseActivations(
  purchaseId: string
): Promise<LicenseActivationDetails[]> {
  try {
    const activations = await prisma.licenseActivation.findMany({
      where: {
        purchaseId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return activations;
  } catch (error) {
    console.error('Error fetching license activations:', error);
    throw error;
  }
}

export async function getLicenseStatusDistribution() {
  try {
    const allPurchases = await prisma.purchase.findMany({
      where: {
        status: 'completed'
      },
      select: {
        licenseStatus: true
      }
    });

    const distribution = allPurchases.reduce(
      (acc, purchase) => {
        const status = purchase.licenseStatus;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(distribution).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      percentage: (value / allPurchases.length) * 100
    }));
  } catch (error) {
    console.error('Error fetching license status distribution:', error);
    throw error;
  }
}

export async function getMonthlyActivationTrend() {
  try {
    const months = [];
    const activations = [];

    // Get last 12 months of activation data
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const monthActivations = await prisma.purchase.count({
        where: {
          status: 'completed',
          activatedAt: {
            gte: startOfMonth,
            lte: endOfMonth
          }
        }
      });

      months.push(date.toLocaleDateString('en-US', { month: 'short' }));
      activations.push(monthActivations);
    }

    return { months, activations };
  } catch (error) {
    console.error('Error fetching monthly activation trend:', error);
    throw error;
  }
}
