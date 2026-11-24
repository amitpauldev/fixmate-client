import Link from "next/link";
import { ArrowUpRight, CalendarCheck } from "lucide-react";
import type { Booking, BookingStatus } from "@/features/bookings/types/booking";

type LatestBookingsPanelProps = {
	bookings: Booking[];
};

const statusStyles: Record<BookingStatus, string> = {
	requested:
		"border-status-requested/25 bg-status-requested/10 text-status-requested",
	accepted:
		"border-status-accepted/25 bg-status-accepted/10 text-status-accepted",
	rejected:
		"border-status-rejected/25 bg-status-rejected/10 text-status-rejected",
	"in-progress":
		"border-status-progress/25 bg-status-progress/10 text-status-progress",
	completed:
		"border-status-completed/25 bg-status-completed/10 text-status-completed",
	cancelled:
		"border-status-cancelled/25 bg-status-cancelled/10 text-status-cancelled",
};

function formatStatus(status: BookingStatus) {
	return status
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

export function LatestBookingsPanel({ bookings }: LatestBookingsPanelProps) {
	const latestBookings = [...bookings]
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
		.slice(0, 5);

	return (
		<section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
			<div className="flex items-center justify-between">
				<h2 className="font-bold text-card-foreground">Latest bookings</h2>
				<Link
					href="/dashboard/admin/bookings"
					className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary"
				>
					All bookings
					<ArrowUpRight className="size-4" aria-hidden="true" />
				</Link>
			</div>

			{latestBookings.length === 0 ? (
				<div className="mt-5 flex min-h-28 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center">
					<CalendarCheck
						className="size-6 text-muted-foreground"
						aria-hidden="true"
					/>
					<p className="mt-2 text-sm text-muted-foreground">No bookings yet</p>
				</div>
			) : (
				<div className="mt-4 grid">
					{latestBookings.map((booking) => (
						<Link
							key={booking._id}
							href="/dashboard/admin/bookings"
							className="flex flex-col sm:flex-row items-start justify-between gap-3 border-b border-border/60 py-3 last:border-b-0"
						>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-bold text-card-foreground">
									{booking.serviceTitle}
								</p>

								<p className="mt-1 truncate text-xs text-muted-foreground">
									{booking.customerName} with {booking.technicianName}
								</p>
							</div>

							<span
								className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-bold ${statusStyles[booking.status]}`}
							>
								<span className="mr-1.5 size-1.5 rounded-full bg-current" />
								{formatStatus(booking.status)}
							</span>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
