"use client";

import { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cancelBooking } from "@/lib/actions/bookings";
import { Loader2, X } from "lucide-react";

interface BookingCancelButtonProps {
  bookingId: string;
}

export function BookingCancelButton({ bookingId }: BookingCancelButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleCancel() {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    startTransition(async () => {
      const result = await cancelBooking(bookingId);
      if (result.success) {
        router.refresh();
      }
    });
  }

  return (
    <Button
      variant="destructive"
      className="w-full"
      disabled={isPending}
      onClick={handleCancel}
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <X className="mr-2 h-4 w-4" />
      )}
      Cancel Booking
    </Button>
  );
}
