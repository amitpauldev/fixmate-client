"use client";

import { useMemo, useState } from "react";
import { Search, Wrench } from "lucide-react";
import type { Booking, BookingStatus } from "@/features/bookings/types/booking";
import { AdminBookingCard } from "./admin-booking-card";
import { BookingStatusBadge } from "./booking-status-badge";

type AdminBookingsProps = {
	bookings: Booking[];
	error?: string;
};

type BookingFilter = "all" | BookingStatus;

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

const filters: Array<{ value: BookingFilter; label: string }> = [
	{ value: "all", label: "All" },
	{ value: "requested", label: "Requested" },
	{ value: "accepted", label: "Accepted" },
	{ value: "in-progress", label: "In progress" },
	{ value: "completed", label: "Completed" },
	{ value: "rejected", label: "Rejected" },
	{ value: "cancelled", label: "Cancelled" },
];

export function AdminBookings({ bookings, error }: AdminBookingsProps) {
	const [activeFilter, setActiveFilter] = useState<BookingFilter>("all");
	const [search, setSearch] = useState("");

	const counts = useMemo(() => {
		const result: Record<BookingFilter, number> = {
			all: bookings.length,
			requested: 0,
			accepted: 0,
			rejected: 0,
			"in-progress": 0,
			completed: 0,
			cancelled: 0,
		};

		bookings.forEach((booking) => {
			result[booking.status]++;
		});

		return result;
	}, [bookings]);

	const visibleBookings = useMemo(() => {
		const query = search.trim().toLowerCase();

		return [...bookings]
			.filter(
				(booking) =>
					activeFilter === "all" || booking.status === activeFilter,
			)
			.filter((booking) => {
				if (!query) return true;
				return [
					booking.serviceTitle,
					booking.customerName,
					booking.technicianName,
					booking._id,
				].some((value) => value.toLowerCase().includes(query));
			})
			.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			);
	}, [activeFilter, bookings, search]);

	return (
		<div>
			<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<h1 className="text-3xl font-extrabold tracking-tight text-primary">
						All bookings
					</h1>
					<p className="mt-2 text-sm font-medium text-muted-foreground">
						Every repair job across the FixMate platform.
					</p>
				</div>

				<label className="relative block w-full lg:w-72">
					<span className="sr-only">Search bookings</span>
					<Search
						className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
						aria-hidden="true"
					/>
					<input
						type="search"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search bookings"
						className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm text-card-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
					/>
				</label>
			</div>

			{error ? (
				<div className="mt-6 rounded-2xl border border-destructive/25 bg-destructive/5 p-6 text-sm text-destructive">
					{error}
				</div>
			) : (
				<>
					<div
						className="mt-6 flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-1.5 shadow-sm"
						aria-label="Filter bookings"
					>
						{filters.map((filter) => {
							const active = activeFilter === filter.value;

							return (
								<button
									key={filter.value}
									type="button"
									aria-pressed={active}
									onClick={() => setActiveFilter(filter.value)}
									className={`cursor-pointer whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold transition-colors sm:px-4 ${
										active
											? "bg-primary text-primary-foreground shadow-sm"
											: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									}`}
								>
									{filter.label}{" "}
									<span className="ml-1">{counts[filter.value]}</span>
								</button>
							);
						})}
					</div>

					{visibleBookings.length === 0 ? (
						<div className="mt-6 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
							<Wrench
								className="mx-auto size-9 text-muted-foreground"
								aria-hidden="true"
							/>
							<h2 className="mt-4 text-lg font-bold text-foreground">
								No bookings found
							</h2>
							<p className="mt-1 text-sm text-muted-foreground">
								Try another status or search term.
							</p>
						</div>
					) : (
						<>
							<div className="mt-6 hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-sm md:block">
								<table className="w-full min-w-[980px] border-collapse">
									<thead>
										<tr className="border-b border-border text-left text-sm font-bold text-secondary">
											<th className="px-5 py-4">Ticket</th>
											<th className="px-4 py-4">Service</th>
											<th className="px-4 py-4">Customer</th>
											<th className="px-4 py-4">Technician</th>
											<th className="px-4 py-4">Date</th>
											<th className="px-4 py-4">Status</th>
											<th className="px-4 py-4">Payment</th>
											<th className="px-5 py-4 text-right">Amount</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-border">
										{visibleBookings.map((booking) => (
											<tr
												key={booking._id}
												className="transition-colors hover:bg-accent/30"
											>
												<td className="px-5 py-4 text-xs font-bold text-muted-foreground">
													#{booking._id.slice(-5).toUpperCase()}
												</td>
												<td className="max-w-52 px-4 py-4">
													<p className="truncate text-sm font-bold text-primary">
														{booking.serviceTitle}
													</p>
													<p className="mt-1 text-xs text-muted-foreground">
														{booking.category}
													</p>
												</td>
												<td className="px-4 py-4 text-sm font-semibold text-card-foreground">
													{booking.customerName}
												</td>
												<td className="px-4 py-4 text-sm text-primary">
													{booking.technicianName}
												</td>
												<td className="px-4 py-4 text-sm text-muted-foreground">
													{formatDate(booking.preferredDate)}
												</td>
												<td className="px-4 py-4">
													<BookingStatusBadge status={booking.status} />
												</td>
												<td className="px-4 py-4">
													<span
														className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${
															booking.paymentStatus === "paid"
																? "border-status-completed/25 bg-status-completed/10 text-status-completed"
																: "border-border bg-muted text-muted-foreground"
														}`}
													>
														{booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
													</span>
												</td>
												<td className="px-5 py-4 text-right text-sm font-bold text-card-foreground">
													{formatAmount(booking)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className="mt-6 grid gap-3 md:hidden">
								{visibleBookings.map((booking) => (
									<AdminBookingCard
										key={booking._id}
										booking={booking}
									/>
								))}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
