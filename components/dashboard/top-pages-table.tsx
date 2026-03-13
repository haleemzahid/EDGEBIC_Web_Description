'use client';

import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import type { TopPage } from '@/data/analytics/get-analytics';

interface TopPagesTableProps {
  data: TopPage[];
}

export function TopPagesTable({
  data
}: TopPagesTableProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
        <CardDescription>
          Most visited pages in the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Page Path</TableHead>
              <TableHead className="text-right">Page Views</TableHead>
              <TableHead className="text-right">Users</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((page, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {page.path}
                </TableCell>
                <TableCell className="text-right">
                  {page.pageViews.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {page.users.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No data available. Set up GA4 environment variables to see
                  analytics.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
