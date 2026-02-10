import { getAllBookings } from "@/lib/actions/bookings";
import { formatPrice } from "@/lib/i18n-helpers";
import type { BookingStatus } from "@prisma/client";
import { AdminBookingActions } from "./booking-actions";

interface PageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
  }>;
}

const statusOptions: BookingStatus[] = [
  "PENDING",
  "CONFIRMED",
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
];

const statusColors: Record<BookingStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  DEPOSIT_PAID: "bg-indigo-100 text-indigo-800",
  SCHEDULED: "bg-purple-100 text-purple-800",
  IN_PROGRESS: "bg-cyan-100 text-cyan-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  NO_SHOW: "bg-gray-100 text-gray-800",
};

export default async function AdminBookingsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  let result: Awaited<ReturnType<typeof getAllBookings>> = {
    bookings: [],
    total: 0,
    page: 1,
    pageSize: 20,
    hasMore: false,
  };

  try {
    result = await getAllBookings({
      status: params.status as BookingStatus | undefined,
      search: params.search,
      page: params.page ? parseInt(params.page) : 1,
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Booking Management</h1>
          <p className="text-sm text-muted-foreground">
            {result.total} total bookings
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <a
          href="/admin/bookings"
          className={`rounded-md border px-3 py-1.5 text-sm ${!params.status ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
        >
          All
        </a>
        {statusOptions.map((status) => (
          <a
            key={status}
            href={`/admin/bookings?status=${status}`}
            className={`rounded-md border px-3 py-1.5 text-sm ${params.status === status ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
          >
            {status.replace("_", " ")}
          </a>
        ))}
      </div>

      {/* Search */}
      <form className="mb-4">
        <input
          name="search"
          defaultValue={params.search}
          placeholder="Search by booking number, name, phone..."
          className="w-full max-w-md rounded-md border px-3 py-2 text-sm"
        />
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Booking #</th>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Hospital</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {result.bookings.map((booking) => (
              <tr key={booking.id} className="border-b last:border-0">
                <td className="px-4 py-3 font-mono text-xs">
                  {booking.bookingNumber}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{booking.user.name || "N/A"}</p>
                  <p className="text-xs text-muted-foreground">
                    {booking.user.phone || booking.user.email}
                  </p>
                </td>
                <td className="px-4 py-3">{booking.hospital.nameKo}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColors[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  {formatPrice(booking.totalAmount, "ko")}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <AdminBookingActions
                    bookingId={booking.id}
                    currentStatus={booking.status}
                  />
                </td>
              </tr>
            ))}
            {result.bookings.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {result.hasMore && (
        <div className="mt-4 text-center">
          <a
            href={`/admin/bookings?${new URLSearchParams({
              ...(params.status ? { status: params.status } : {}),
              ...(params.search ? { search: params.search } : {}),
              page: String((result.page || 1) + 1),
            }).toString()}`}
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-accent"
          >
            Load more
          </a>
        </div>
      )}
    </div>
  );
}
