import type { Booking } from "@/features/bookings/types/booking";
import { getBookingsByCustomerId } from "@/lib/api/booking";
import { authServer } from "@/lib/auth/auth";
import { CustomerBookings } from "@/features/customer/components/customer-bookings";
import { notFound } from "next/navigation";

export default async function CustomerBookingsPage() {
	const session = await authServer();
	const userId = session?.user?.id;

	if (!userId) {
		return (
			<div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
				<div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
					Please sign in to view your bookings.
				</div>
			</div>
		);
	}

	if (session?.user?.role !== "customer") {
		return notFound();
	}

	let bookings: Booking[] = [];
	let errorMessage: string | undefined;

	try {
		bookings = await getBookingsByCustomerId(userId);
	} catch (error) {
		errorMessage =
			error instanceof Error ? error.message : "Unable to load your bookings.";
	}

	return (
		<div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
			<CustomerBookings bookings={bookings} error={errorMessage} />
		</div>
	);
}
