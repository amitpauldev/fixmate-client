"use client";

import { useMemo, useState } from "react";
import type { Booking } from "@/features/bookings/types/booking";
import {
	TechnicianStatusTabs,
	type TechnicianRequestFilter,
} from "./technician-status-tabs";
import { TechnicianRequestCard } from "./technician-request-card";

type TechnicianRequestListProps = {
	bookings: Booking[];
	error?: string;
};

export function TechnicianRequestList({
	bookings,
	error,
}: TechnicianRequestListProps) {
	const [activeFilter, setActiveFilter] =
		useState<TechnicianRequestFilter>("all");

	const counts = useMemo<Record<TechnicianRequestFilter, number>>(
		() => ({
			all: bookings.length,
			requested: bookings.filter((booking) => booking.status === "requested")
				.length,
			accepted: bookings.filter((booking) => booking.status === "accepted")
				.length,
			"in-progress": bookings.filter(
				(booking) => booking.status === "in-progress",
			).length,
			completed: bookings.filter((booking) => booking.status === "completed")
				.length,
		}),
		[bookings],
	);

	const visibleBookings =
		activeFilter === "all"
			? bookings
			: bookings.filter((booking) => booking.status === activeFilter);

	return (
		<div>
			<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
				<div>
					<h1 className="text-3xl font-extrabold tracking-tight text-primary">
						Manage requests
					</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						Move each job forward one step at a time.
					</p>
				</div>
				<TechnicianStatusTabs
					activeFilter={activeFilter}
					onFilterChange={setActiveFilter}
					counts={counts}
				/>
			</div>

			{error ? (
				<div className="mt-8 rounded-2xl border border-destructive/25 bg-destructive/5 p-6 text-sm text-destructive">
					{error}
				</div>
			) : visibleBookings.length === 0 ? (
				<div className="mt-8 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
					<h2 className="text-lg font-bold text-card-foreground">
						No bookings found
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						There are no bookings in this category.
					</p>
				</div>
			) : (
				<div className="mt-8 grid gap-4">
					{visibleBookings.map((booking) => (
						<TechnicianRequestCard key={booking._id} booking={booking} />
					))}
				</div>
			)}
		</div>
	);
}
