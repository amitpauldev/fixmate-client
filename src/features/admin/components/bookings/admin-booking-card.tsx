import type { Booking } from "@/features/bookings/types/booking";
import { BookingStatusBadge } from "./booking-status-badge";

type AdminBookingCardProps = {
	booking: Booking;
};

function formatDate(value: Date | string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Not set";

	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}

function formatAmount(booking: Booking) {
	const amount =
		booking.status === "completed" && booking.finalAmount
			? booking.finalAmount
			: booking.basePrice;
	return `Tk ${amount.toFixed(0)}`;
}

export function AdminBookingCard({ booking }: AdminBookingCardProps) {
	return (
		<article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0">
					<p className="text-xs font-bold text-muted-foreground">
						#{booking._id.slice(-5).toUpperCase()}
					</p>
					<h2 className="mt-1 font-bold text-card-foreground">
						{booking.serviceTitle}
					</h2>
				</div>
				<p className="shrink-0 text-sm font-bold text-card-foreground">
					{formatAmount(booking)}
				</p>
			</div>

			<div className="mt-4 grid grid-cols-2 gap-3 text-sm">
				<div>
					<p className="text-xs text-muted-foreground">Customer</p>
					<p className="mt-1 font-semibold text-primary">
						{booking.customerName}
					</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Technician</p>
					<p className="mt-1 font-semibold text-primary">
						{booking.technicianName}
					</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Preferred date</p>
					<p className="mt-1 text-card-foreground">
						{formatDate(booking.preferredDate)}
					</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Payment</p>
					<p
						className={`mt-1 font-bold ${
							booking.paymentStatus === "paid"
								? "text-status-completed"
								: "text-muted-foreground"
						}`}
					>
						{booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
					</p>
				</div>
			</div>

			<div className="mt-4 border-t border-dashed border-border pt-3">
				<BookingStatusBadge status={booking.status} />
			</div>
		</article>
	);
}
