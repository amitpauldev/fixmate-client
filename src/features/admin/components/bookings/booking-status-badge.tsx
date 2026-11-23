import type { BookingStatus } from "@/features/bookings/types/booking";

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

export function formatBookingStatus(status: BookingStatus) {
	return status
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
	return (
		<span
			className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-bold ${statusStyles[status]}`}
		>
			<span className="mr-1.5 size-1.5 rounded-full bg-current" />
			{formatBookingStatus(status)}
		</span>
	);
}
