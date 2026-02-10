import { Badge } from "@/components/ui/badge";
import type { BookingStatus } from "@prisma/client";

const statusStyles: Record<BookingStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  DEPOSIT_PAID: "bg-indigo-100 text-indigo-800 border-indigo-200",
  SCHEDULED: "bg-purple-100 text-purple-800 border-purple-200",
  IN_PROGRESS: "bg-cyan-100 text-cyan-800 border-cyan-200",
  COMPLETED: "bg-green-100 text-green-800 border-green-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
  NO_SHOW: "bg-gray-100 text-gray-800 border-gray-200",
};

interface BookingStatusBadgeProps {
  status: BookingStatus;
  label: string;
}

export function BookingStatusBadge({ status, label }: BookingStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`text-[11px] font-medium ${statusStyles[status]}`}
    >
      {label}
    </Badge>
  );
}
