'use client';

import * as React from 'react';
import { format } from 'date-fns';
import {
  CheckCircle2Icon,
  CopyIcon,
  MoreHorizontalIcon,
  XCircleIcon
} from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import type { LicenseInventoryItem } from '@/data/inventory/get-inventory';

interface LicenseInventoryTableProps {
  licenses: LicenseInventoryItem[];
}

export function LicenseInventoryTable({
  licenses
}: LicenseInventoryTableProps): React.JSX.Element {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const getTypeBadge = (license: LicenseInventoryItem) => {
    if (license.licenseType !== 'trial') {
      return <Badge variant="outline">Full</Badge>;
    }
    const expired =
      !!license.licenseExpiresAt &&
      new Date(license.licenseExpiresAt).getTime() < Date.now();
    return (
      <div className="flex flex-col gap-0.5">
        <Badge
          className={
            expired
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }
        >
          {expired ? 'Trial expired' : 'Trial'}
        </Badge>
        {license.licenseExpiresAt && (
          <span className="text-xs text-muted-foreground">
            {expired ? 'ended' : 'ends'}{' '}
            {format(new Date(license.licenseExpiresAt), 'MMM dd, yyyy')}
          </span>
        )}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2Icon className="mr-1 size-3" />
            Active
          </Badge>
        );
      case 'inactive':
        return (
          <Badge
            variant="secondary"
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            Inactive
          </Badge>
        );
      case 'revoked':
        return (
          <Badge variant="destructive">
            <XCircleIcon className="mr-1 size-3" />
            Revoked
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (licenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>License Inventory</CardTitle>
          <CardDescription>
            No licenses found matching your criteria
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>License Inventory</CardTitle>
        <CardDescription>
          Manage and monitor all software licenses and activations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>License Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Activated</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licenses.map((license) => (
                <TableRow key={license.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {license.customerName}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {license.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {license.licenseKey ? (
                        <>
                          <code className="rounded bg-muted px-2 py-1 text-xs">
                            {license.licenseKey.substring(0, 16)}...
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6"
                            onClick={() =>
                              copyToClipboard(
                                license.licenseKey!,
                                'License key'
                              )
                            }
                          >
                            <CopyIcon className="size-3" />
                          </Button>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Not generated
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(license.licenseStatus)}</TableCell>
                  <TableCell>{getTypeBadge(license)}</TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(license.createdAt), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-sm">
                    {license.activatedAt ? (
                      <div className="flex flex-col">
                        <span>
                          {format(
                            new Date(license.activatedAt),
                            'MMM dd, yyyy'
                          )}
                        </span>
                        {license.activatedEmail && (
                          <span className="text-xs text-muted-foreground">
                            {license.activatedEmail}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        Not activated
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${(license.amount / 100).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {license.downloadCount} / {license.maxDownloads}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <MoreHorizontalIcon className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            copyToClipboard(license.id, 'License ID')
                          }
                        >
                          Copy License ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            copyToClipboard(license.email, 'Email')
                          }
                        >
                          Copy Email
                        </DropdownMenuItem>
                        {license.systemFingerprint && (
                          <DropdownMenuItem
                            onClick={() =>
                              copyToClipboard(
                                license.systemFingerprint!,
                                'System fingerprint'
                              )
                            }
                          >
                            Copy Fingerprint
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Revoke License
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
