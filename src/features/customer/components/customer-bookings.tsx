"use client";

import { useMemo, useState } from "react";
import type { Booking } from "../../bookings/types/booking";
import { BookingCard } from "./booking-card";
import { BookingStatusTabs, type BookingFilter } from "./booking-status-tabs";

type CustomerBookingsProps = {
	bookings: Booking[];
	error?: string;
};

export function CustomerBookings({ bookings, error }: CustomerBookingsProps) {
	const [activeFilter, setActiveFilter] = useState<BookingFilter>("all");

	const counts = useMemo<Record<BookingFilter, number>>(
		() => ({
			all: bookings.length,
			active: bookings.filter((booking) =>
				["requested", "accepted", "in-progress"].includes(booking.status),
			).length,
			"to-pay": bookings.filter(
				(booking) =>
					booking.status === "completed" && booking.paymentStatus === "unpaid",
			).length,
			paid: bookings.filter((booking) => booking.paymentStatus === "paid")
				.length,
			closed: bookings.filter((booking) =>
				["cancelled", "rejected"].includes(booking.status),
			).length,
		}),
		[bookings],
	);

	const filteredBookings = useMemo(() => {
		switch (activeFilter) {
			case "active":
				return bookings.filter((booking) =>
					["requested", "accepted", "in-progress"].includes(booking.status),
				);
			case "to-pay":
				return bookings.filter(
					(booking) =>
						booking.status === "completed" &&
						booking.paymentStatus === "unpaid",
				);
			case "paid":
				return bookings.filter((booking) => booking.paymentStatus === "paid");
			case "closed":
				return bookings.filter((booking) =>
					["cancelled", "rejected"].includes(booking.status),
				);
			default:
				return bookings;
		}
	}, [activeFilter, bookings]);

	return (
		<div>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-foreground">
						My bookings
					</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						Track each repair from request to payment.
					</p>
				</div>
				<BookingStatusTabs
					activeFilter={activeFilter}
					onFilterChange={setActiveFilter}
					counts={counts}
				/>
			</div>

			{error ? (
				<div className="mt-8 rounded-2xl border border-destructive/25 bg-destructive/5 p-6 text-sm text-destructive">
					{error}
				</div>
			) : filteredBookings.length === 0 ? (
				<div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center">
					<p className="text-base font-bold text-card-foreground">
						No bookings found
					</p>
					<p className="mt-2 text-sm text-muted-foreground">
						There are no bookings in this category.
					</p>
				</div>
			) : (
				<div className="mt-8 grid gap-4">
					{filteredBookings.map((booking) => (
						<BookingCard key={booking._id} booking={booking} />
					))}
				</div>
			)}
		</div>
	);
}
