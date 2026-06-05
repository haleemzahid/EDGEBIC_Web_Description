'use client';

import * as React from 'react';
import { CheckCircleIcon, ClockIcon } from 'lucide-react';

import { LicenseSeatsManager } from '@/components/dashboard/license-seats-manager';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { type PurchaseWithStats } from '@/data/purchases/get-purchases';

interface CustomersTableProps {
  searchTerm: string;
}

function getLicenseStatusBadge(
  licenseStatus: string,
  _activatedAt: Date | null
) {
  switch (licenseStatus) {
    case 'active':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Active
        </Badge>
      );
    case 'inactive':
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          Inactive
        </Badge>
      );
    case 'revoked':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Revoked
        </Badge>
      );
    default:
      return <Badge variant="secondary">{licenseStatus}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Processing
        </Badge>
      );
    case 'failed':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function getInstallerStatus(status: string) {
  switch (status) {
    case 'sent':
      return (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircleIcon className="size-4" />
          Sent
        </div>
      );
    case 'pending':
      return (
        <div className="flex items-center gap-2 text-yellow-600">
          <ClockIcon className="size-4" />
          Pending
        </div>
      );
    case 'failed':
      return (
        <div className="flex items-center gap-2 text-red-600">
          <span className="text-red-600">⚠</span>
          Failed
        </div>
      );
    default:
      return status;
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function getAvatarColor(index: number): string {
  const colors = [
    'bg-gradient-to-br from-orange-500 to-red-500',
    'bg-gradient-to-br from-blue-500 to-blue-600',
    'bg-gradient-to-br from-green-500 to-green-600',
    'bg-gradient-to-br from-purple-500 to-purple-600',
    'bg-gradient-to-br from-yellow-500 to-yellow-600'
  ];
  return colors[index % colors.length];
}

export function CustomersTable({
  searchTerm
}: CustomersTableProps): React.JSX.Element {
  const [purchases, setPurchases] = React.useState<PurchaseWithStats[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedPurchase, setSelectedPurchase] =
    React.useState<PurchaseWithStats | null>(null);
  const [showDetails, setShowDetails] = React.useState(false);
  const itemsPerPage = 5;

  // Fetch purchases data
  React.useEffect(() => {
    async function fetchPurchases() {
      setLoading(true);
      setError(null);
      try {
        const searchParams = new URLSearchParams();
        if (searchTerm) {
          searchParams.set('search', searchTerm);
        }

        const response = await fetch(
          `/api/purchases?${searchParams.toString()}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch purchases');
        }

        const data = await response.json();
        setPurchases(data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
        setError(
          'Failed to load customer data. Please check your database connection.'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPurchases();
  }, [searchTerm]);

  // Map purchase status to installer status
  const getInstallerStatusFromPurchase = (purchase: PurchaseWithStats) => {
    if (purchase.status === 'completed' && purchase.downloadCount > 0) {
      return 'sent';
    } else if (purchase.status === 'completed') {
      return 'pending';
    } else {
      return 'failed';
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(purchases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPurchases = purchases.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Helper functions for formatting
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100);
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const viewLicenseDetails = (purchase: PurchaseWithStats) => {
    setSelectedPurchase(purchase);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading customers...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="mb-2 text-muted-foreground">{error}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (purchases.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="mb-2 text-muted-foreground">
              No customer data available
            </div>
            <div className="text-sm text-muted-foreground">
              {searchTerm
                ? `No customers found matching "${searchTerm}"`
                : 'No purchases have been made yet, or there might be a database connection issue.'}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        {/* Scrollable table container with max height */}
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Installer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPurchases.map((purchase, index) => (
                <TableRow key={purchase.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback
                          className={`font-semibold text-white ${getAvatarColor(index)}`}
                        >
                          {getInitials(purchase.customerName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {purchase.customerName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {purchase.downloadCount > 0
                            ? 'Active User'
                            : 'New Customer'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{purchase.email}</TableCell>
                  <TableCell>
                    {new Date(purchase.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${(purchase.amount / 100).toFixed(2)}
                  </TableCell>
                  <TableCell>{getStatusBadge(purchase.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getLicenseStatusBadge(
                          purchase.licenseStatus,
                          purchase.activatedAt
                        )}
                      </div>
                      {purchase.licenseKey && (
                        <div className="font-mono text-xs text-muted-foreground">
                          {purchase.licenseKey.substring(0, 8)}...
                        </div>
                      )}
                      {purchase.activatedAt && (
                        <div className="text-xs text-muted-foreground">
                          {'Activated: '}
                          {new Date(purchase.activatedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {purchase.licenseKey ? (
                      <Badge
                        variant="outline"
                        className="font-mono"
                      >
                        {purchase.usedSeats ?? 0} / {purchase.seats ?? 1}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getInstallerStatus(
                      getInstallerStatusFromPurchase(purchase)
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => viewLicenseDetails(purchase)}
                      >
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, purchases.length)} of{' '}
            {purchases.length} customers
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {/* Page numbers */}
            {(() => {
              const pages = [];
              const maxVisiblePages = 5;
              let startPage = Math.max(
                1,
                currentPage - Math.floor(maxVisiblePages / 2)
              );
              const endPage = Math.min(
                totalPages,
                startPage + maxVisiblePages - 1
              );

              // Adjust startPage if we're near the end
              if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }

              // Show first page if not in visible range
              if (startPage > 1) {
                pages.push(
                  <Button
                    key={1}
                    variant="outline"
                    size="sm"
                    className={
                      currentPage === 1
                        ? 'bg-primary text-primary-foreground'
                        : ''
                    }
                    onClick={() => handlePageClick(1)}
                  >
                    1
                  </Button>
                );
                if (startPage > 2) {
                  pages.push(
                    <span
                      key="ellipsis1"
                      className="text-muted-foreground"
                    >
                      ...
                    </span>
                  );
                }
              }

              // Show visible page range
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className={
                      currentPage === i
                        ? 'bg-primary text-primary-foreground'
                        : ''
                    }
                    onClick={() => handlePageClick(i)}
                  >
                    {i}
                  </Button>
                );
              }

              // Show last page if not in visible range
              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  pages.push(
                    <span
                      key="ellipsis2"
                      className="text-muted-foreground"
                    >
                      ...
                    </span>
                  );
                }
                pages.push(
                  <Button
                    key={totalPages}
                    variant="outline"
                    size="sm"
                    className={
                      currentPage === totalPages
                        ? 'bg-primary text-primary-foreground'
                        : ''
                    }
                    onClick={() => handlePageClick(totalPages)}
                  >
                    {totalPages}
                  </Button>
                );
              }

              return pages;
            })()}
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>

        {/* License Details Modal */}
        {selectedPurchase && showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-11/12 max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  License Details: {selectedPurchase.customerName}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </div>

              <div className="max-h-96 overflow-y-auto p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Purchase Information */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-3 font-medium text-gray-900">
                      Purchase Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Customer:</span>{' '}
                        {selectedPurchase.customerName}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>{' '}
                        {selectedPurchase.email}
                      </div>
                      <div>
                        <span className="font-medium">Amount:</span>{' '}
                        {formatCurrency(
                          selectedPurchase.amount,
                          selectedPurchase.currency
                        )}
                      </div>
                      <div>
                        <span className="font-medium">Purchase Date:</span>{' '}
                        {formatDate(selectedPurchase.createdAt)}
                      </div>
                      <div>
                        <span className="font-medium">Payment Status:</span>
                        <span className="ml-2">
                          {getStatusBadge(selectedPurchase.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* License Information */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-3 font-medium text-gray-900">
                      License Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">License Key:</span>
                        <code className="mt-1 block rounded bg-gray-200 p-1 font-mono text-xs">
                          {selectedPurchase.licenseKey || 'Not generated'}
                        </code>
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>
                        <span className="ml-2">
                          {getLicenseStatusBadge(
                            selectedPurchase.licenseStatus,
                            selectedPurchase.activatedAt
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Activated:</span>{' '}
                        {selectedPurchase.activatedAt
                          ? formatDate(selectedPurchase.activatedAt)
                          : 'Not activated'}
                      </div>
                      <div>
                        <span className="font-medium">
                          Activation Attempts:
                        </span>{' '}
                        {selectedPurchase.activationAttempts} /{' '}
                        {selectedPurchase.maxActivationAttempts}
                      </div>
                      <div>
                        <span className="font-medium">Downloads:</span>{' '}
                        {selectedPurchase.downloadCount} /{' '}
                        {selectedPurchase.maxDownloads}
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Information */}
                {selectedPurchase.systemFingerprint && (
                  <div className="mt-6 rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-3 font-medium text-gray-900">
                      System Information
                    </h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">
                            System Fingerprint:
                          </span>
                          <code className="mt-1 block rounded bg-gray-200 p-1 font-mono text-xs">
                            {selectedPurchase.systemFingerprint}
                          </code>
                        </div>
                        <div>
                          <span className="font-medium">Processor ID:</span>
                          <code className="mt-1 block rounded bg-gray-200 p-1 font-mono text-xs">
                            {selectedPurchase.processorId || 'Not available'}
                          </code>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Activated Email:</span>{' '}
                          {selectedPurchase.activatedEmail || 'Not available'}
                        </div>
                        <div>
                          <span className="font-medium">License Hash:</span>{' '}
                          {selectedPurchase.licenseKeyHash
                            ? `${selectedPurchase.licenseKeyHash.substring(0, 16)}...`
                            : 'Not available'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Seat management (devices, release, seat cap, roster) */}
                {selectedPurchase.licenseKey && (
                  <LicenseSeatsManager purchaseId={selectedPurchase.id} />
                )}
              </div>

              <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
                <Button
                  variant="outline"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
