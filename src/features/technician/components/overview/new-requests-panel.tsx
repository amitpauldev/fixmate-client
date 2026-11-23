import Link from "next/link";
import { ArrowUpRight, Inbox } from "lucide-react";
import type { Booking } from "@/features/bookings/types/booking";

type NewRequestsPanelProps = {
	bookings: Booking[];
};

function formatDate(value: Date | string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Date not set";

	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}

export function NewRequestsPanel({ bookings }: NewRequestsPanelProps) {
	const requests = [...bookings]
		.filter((booking) => booking.status === "requested")
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
		.slice(0, 4);

	return (
		<section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
			<div className="flex items-center justify-between">
				<h2 className="font-bold text-card-foreground">New requests</h2>
				<Link
					href="/dashboard/technician/requests"
					className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary"
				>
					Manage requests
					<ArrowUpRight className="size-4" aria-hidden="true" />
				</Link>
			</div>

			{requests.length === 0 ? (
				<div className="mt-5 flex min-h-28 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center">
					<Inbox
						className="size-6 text-muted-foreground"
						aria-hidden="true"
					/>
					<p className="mt-2 text-sm text-muted-foreground">
						No new requests
					</p>
				</div>
			) : (
				<div className="mt-4 grid gap-2">
					{requests.map((booking) => (
						<Link
							key={booking._id}
							href="/dashboard/technician/requests"
							className="group flex items-start justify-between gap-4 rounded-xl border border-border/70 px-4 py-3 transition-colors hover:bg-accent"
						>
							<div className="min-w-0">
								<p className="truncate text-sm font-bold text-card-foreground">
									{booking.serviceTitle}
								</p>
								<p className="mt-1 truncate text-xs text-muted-foreground">
									{booking.customerName},{" "}
									{formatDate(booking.preferredDate)}
								</p>
							</div>
							<span className="shrink-0 text-xs font-bold text-muted-foreground">
								#{booking._id.slice(-5).toUpperCase()}
							</span>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
