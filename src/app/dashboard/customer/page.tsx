import type { Booking } from "@/features/bookings/types/booking";
import type { Payment } from "@/features/payments/types/types";
import { CustomerOverview } from "@/features/customer/components/customer-overview";
import { getBookingsByCustomerId } from "@/lib/api/booking";
import { getPaymentByCustomerId } from "@/lib/api/payments";
import { authServer } from "@/lib/auth/auth";
import { notFound } from "next/navigation";

export default async function CustomerDashboardPage() {
	const session = await authServer();
	const userId = session?.user.id;

	if (!userId) {
		return (
			<div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
				<div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
					Please sign in to view your overview.
				</div>
			</div>
		);
	}

	if (session?.user.appRole !== "customer") {
		return notFound();
	}

	let bookings: Booking[] = [];
	let payments: Payment[] = [];
	let errorMessage: string | undefined;

	try {
		[bookings, payments] = await Promise.all([
			getBookingsByCustomerId(userId),
			getPaymentByCustomerId(userId),
		]);
	} catch (error) {
		errorMessage =
			error instanceof Error ? error.message : "Unable to load your dashboard.";
	}

	return (
		<div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
			<CustomerOverview
				customerName={session.user.name}
				bookings={bookings}
				payments={payments}
				error={errorMessage}
			/>
		</div>
	);
}
