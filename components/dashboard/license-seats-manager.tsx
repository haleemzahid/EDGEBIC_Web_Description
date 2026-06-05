'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { releaseSeat } from '@/actions/licenses/release-seat';
import { updateLicenseSeats } from '@/actions/licenses/update-license-seats';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Seat {
  id: string;
  email: string;
  deviceName: string | null;
  systemFingerprint: string;
  processorId: string | null;
  status: string;
  firstActivatedAt: string;
  lastSeenAt: string;
}

interface RosterUser {
  id: string;
  email: string;
  name: string | null;
  lastSeenAt: string;
}

interface LicenseDetail {
  license: {
    id: string;
    seats: number;
    licenseSeats: Seat[];
    licenseUsers: RosterUser[];
  };
  seatStats: { total: number; used: number; remaining: number };
}

// Seat management embedded in the license details modal. Fetches the full seat
// list + roster from the admin endpoint and lets an admin release a seat or
// change the device cap via server actions.
export function LicenseSeatsManager({
  purchaseId
}: {
  purchaseId: string;
}): React.JSX.Element {
  const [detail, setDetail] = React.useState<LicenseDetail | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [seatInput, setSeatInput] = React.useState<string>('');
  const [busy, setBusy] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/licenses/${purchaseId}`);
      if (!res.ok) throw new Error('Failed to load license');
      const data: LicenseDetail = await res.json();
      setDetail(data);
      setSeatInput(String(data.license.seats));
    } catch {
      toast.error('Could not load seat details');
    } finally {
      setLoading(false);
    }
  }, [purchaseId]);

  React.useEffect(() => {
    load();
  }, [load]);

  const handleRelease = async (seatId: string) => {
    setBusy(true);
    const result = await releaseSeat({ seatId });
    setBusy(false);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Seat released');
      load();
    } else {
      toast.error(result?.serverError ?? 'Could not release seat');
    }
  };

  const handleUpdateSeats = async () => {
    const seats = Number(seatInput);
    if (!Number.isInteger(seats) || seats < 1) {
      toast.error('Enter a valid seat count');
      return;
    }
    setBusy(true);
    const result = await updateLicenseSeats({ purchaseId, seats });
    setBusy(false);
    if (!result?.serverError && !result?.validationErrors) {
      toast.success('Seat count updated');
      load();
    } else {
      toast.error(result?.serverError ?? 'Could not update seats');
    }
  };

  if (loading) {
    return (
      <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm text-muted-foreground">
        Loading seats…
      </div>
    );
  }

  if (!detail) return <></>;

  const activeSeats = detail.license.licenseSeats.filter(
    (s) => s.status === 'active'
  );

  return (
    <div className="mt-6 space-y-4">
      {/* Seat cap control */}
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Seats (devices)</h4>
          <Badge variant="secondary">
            {detail.seatStats.used} / {detail.seatStats.total} used
          </Badge>
        </div>
        <div className="flex items-end gap-2">
          <div>
            <label className="text-xs text-muted-foreground">Seat cap</label>
            <Input
              type="number"
              min={1}
              step={1}
              value={seatInput}
              onChange={(e) => setSeatInput(e.target.value)}
              className="w-28"
            />
          </div>
          <Button
            size="sm"
            variant="default"
            disabled={busy}
            onClick={handleUpdateSeats}
          >
            Update
          </Button>
        </div>
      </div>

      {/* Active devices */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h4 className="mb-3 font-medium text-gray-900">
          Active devices ({activeSeats.length})
        </h4>
        {activeSeats.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No devices have activated this key yet.
          </p>
        ) : (
          <div className="space-y-2">
            {activeSeats.map((seat) => (
              <div
                key={seat.id}
                className="flex items-center justify-between rounded border bg-white px-3 py-2 text-sm"
              >
                <div className="min-w-0">
                  <div className="font-medium">
                    {seat.deviceName || seat.email}
                  </div>
                  <div className="truncate font-mono text-xs text-muted-foreground">
                    {seat.email} · {seat.systemFingerprint.substring(0, 16)}…
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last seen:{' '}
                    {new Date(seat.lastSeenAt).toLocaleDateString()}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busy}
                  onClick={() => handleRelease(seat.id)}
                >
                  Release
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Operator roster */}
      {detail.license.licenseUsers.length > 0 && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-3 font-medium text-gray-900">
            Operator roster ({detail.license.licenseUsers.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {detail.license.licenseUsers.map((u) => (
              <Badge
                key={u.id}
                variant="outline"
              >
                {u.email}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
