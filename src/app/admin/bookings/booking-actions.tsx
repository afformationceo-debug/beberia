"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { updateBookingStatus } from "@/lib/actions/bookings";
import type { BookingStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";

const transitions: Partial<Record<BookingStatus, BookingStatus[]>> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["SCHEDULED", "CANCELLED"],
  SCHEDULED: ["IN_PROGRESS", "CANCELLED", "NO_SHOW"],
  IN_PROGRESS: ["COMPLETED"],
};

interface AdminBookingActionsProps {
  bookingId: string;
  currentStatus: BookingStatus;
}

export function AdminBookingActions({
  bookingId,
  currentStatus,
}: AdminBookingActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const nextStatuses = transitions[currentStatus] || [];

  if (nextStatuses.length === 0) return null;

  function handleStatusChange(status: BookingStatus) {
    startTransition(async () => {
      await updateBookingStatus(bookingId, status);
      router.refresh();
    });
  }

  return (
    <div className="flex gap-1">
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        nextStatuses.map((status) => (
          <Button
            key={status}
            size="sm"
            variant={status === "CANCELLED" || status === "NO_SHOW" ? "destructive" : "outline"}
            className="h-7 text-[11px]"
            onClick={() => handleStatusChange(status)}
          >
            {status.replace("_", " ")}
          </Button>
        ))
      )}
    </div>
  );
}
