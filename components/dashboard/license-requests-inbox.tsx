'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { DownloadIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';

import { approveLicenseRequests } from '@/actions/licenses/approve-license-requests';
import { rejectLicenseRequests } from '@/actions/licenses/reject-license-requests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface LicenseRequest {
  id: string;
  email: string;
  customerName: string | null;
  company: string | null;
  groupKey: string | null;
  deviceName: string | null;
  operatorEmails: string[];
  product: string | null;
  status: string;
  createdAt: string;
}

interface RequestGroup {
  groupKey: string;
  count: number;
  requestIds: string[];
  requests: LicenseRequest[];
}

// Admin inbox for self-service desktop license requests. Pending requests are
// grouped by org (email domain). The admin multi-selects devices and approves
// them into ONE key (seats = selected count, editable), rejects, or downloads
// the requester roster as CSV. After approval the issued key is shown to copy.
export function LicenseRequestsInbox(): React.JSX.Element {
  const router = useRouter();
  const [groups, setGroups] = React.useState<RequestGroup[]>([]);
  const [pendingCount, setPendingCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [forbidden, setForbidden] = React.useState(false);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [seats, setSeats] = React.useState<string>('');
  const [busy, setBusy] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/license-requests?status=pending');
      // Non-admins (e.g. members) can land on this dashboard — hide silently.
      if (res.status === 401 || res.status === 403) {
        setForbidden(true);
        return;
      }
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setGroups(data.groups ?? []);
      setPendingCount(data.stats?.pending ?? 0);
    } catch {
      toast.error('Could not load license requests');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  // Admin-only surface — render nothing for non-admins.
  if (forbidden) return <></>;

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleGroup = (group: RequestGroup, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const id of group.requestIds) {
        if (checked) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  };

  const selectedIds = Array.from(selected);

  const handleApprove = async () => {
    if (selectedIds.length === 0) return;
    setBusy(true);
    const seatCount = seats.trim() ? Number(seats) : undefined;
    const result = await approveLicenseRequests({
      requestIds: selectedIds,
      seats: seatCount
    });
    setBusy(false);
    if (!result?.serverError && !result?.validationErrors && result?.data) {
      const { licenseKey, seats: issuedSeats, approvedCount } = result.data;
      toast.success(`Approved ${approvedCount} device(s) → 1 key, ${issuedSeats} seats`, {
        description: `Key: ${licenseKey}`,
        duration: 15000,
        action: {
          label: 'Copy key',
          onClick: () => navigator.clipboard.writeText(licenseKey)
        }
      });
      setSelected(new Set());
      setSeats('');
      load();
      router.refresh();
    } else {
      toast.error(result?.serverError ?? 'Could not approve requests');
    }
  };

  const handleReject = async () => {
    if (selectedIds.length === 0) return;
    setBusy(true);
    const result = await rejectLicenseRequests({ requestIds: selectedIds });
    setBusy(false);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Requests rejected');
      setSelected(new Set());
      load();
    } else {
      toast.error(result?.serverError ?? 'Could not reject requests');
    }
  };

  const handleDownload = () => {
    const query = selectedIds.length
      ? `ids=${encodeURIComponent(selectedIds.join(','))}`
      : 'status=pending';
    window.open(
      `/api/admin/license-requests/export?${query}&format=csv`,
      '_blank'
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          License Requests
          {pendingCount > 0 && (
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
              {pendingCount} pending
            </Badge>
          )}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
          >
            <DownloadIcon className="mr-2 size-4" />
            Download CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={load}
          >
            <RefreshCwIcon className="mr-2 size-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-muted-foreground">
              Loading requests…
            </div>
          ) : groups.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No pending license requests. The desktop app posts here via{' '}
              <code className="rounded bg-gray-100 px-1 font-mono text-xs">
                POST /api/license/request
              </code>
              .
            </div>
          ) : (
            <div className="max-h-96 divide-y overflow-y-auto">
              {groups.map((group) => {
                const allSelected = group.requestIds.every((id) =>
                  selected.has(id)
                );
                return (
                  <div
                    key={group.groupKey}
                    className="p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={(c) => toggleGroup(group, Boolean(c))}
                      />
                      <span className="font-medium">{group.groupKey}</span>
                      <Badge variant="secondary">{group.count} device(s)</Badge>
                    </div>
                    <div className="space-y-1 pl-6">
                      {group.requests.map((req) => (
                        <div
                          key={req.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Checkbox
                            checked={selected.has(req.id)}
                            onCheckedChange={() => toggle(req.id)}
                          />
                          <span className="font-medium">{req.email}</span>
                          {req.deviceName && (
                            <span className="text-muted-foreground">
                              · {req.deviceName}
                            </span>
                          )}
                          {req.operatorEmails.length > 1 && (
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {req.operatorEmails.length} operators
                            </Badge>
                          )}
                          <span className="ml-auto text-xs text-muted-foreground">
                            {new Date(req.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Action bar */}
          {groups.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-gray-50 px-4 py-3">
              <div className="text-sm text-muted-foreground">
                {selectedIds.length} selected
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <label className="text-sm text-muted-foreground">Seats</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  placeholder={String(selectedIds.length || 1)}
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className="h-9 w-20 rounded-md border border-input bg-background px-2 text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  disabled={busy || selectedIds.length === 0}
                  onClick={handleReject}
                >
                  Reject
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  disabled={busy || selectedIds.length === 0}
                  onClick={handleApprove}
                >
                  Approve → issue 1 key
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
