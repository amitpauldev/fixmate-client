import { getAllBookings } from "@/features/admin/api/admin.api";
import { AdminBookings } from "@/features/admin/components/bookings/admin-bookings";
import type { Booking } from "@/features/bookings/types/booking";
import { authServer } from "@/lib/auth/auth";
import { notFound } from "next/navigation";

export default async function AdminBookingsPage() {
	const session = await authServer();
	const userId = session?.user.id;

	if (!userId) {
		return (
			<main className="px-4 py-8 sm:px-6 lg:px-8">
				<div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
					Please sign in to view all bookings.
				</div>
			</main>
		);
	}

	if (session?.user.role !== "admin") {
		return notFound();
	}

	let bookings: Booking[] = [];
	let errorMessage: string | undefined;

	try {
		bookings = await getAllBookings();
	} catch (error) {
		errorMessage =
			error instanceof Error ? error.message : "Unable to load bookings.";
	}

	return (
		<main className="px-4 py-8 sm:px-6 lg:px-8">
			<AdminBookings bookings={bookings} error={errorMessage} />
		</main>
	);
}
