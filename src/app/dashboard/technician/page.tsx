import { getBookingsByTechnicianId } from "@/lib/api/booking";
import { getPaymentByTechnicianId } from "@/lib/api/payments";
import { getServicesByTechnicianId } from "@/lib/api/services";
import { authServer } from "@/lib/auth/auth";
import { notFound } from "next/navigation";
import type { Booking } from "@/features/bookings/types/booking";
import type { Payment } from "@/features/payments/types/types";
import type { Service } from "@/features/services/types/service";
import { TechnicianOverview } from "@/features/technician/components/overview/technician-overview";

export default async function TechnicianDashboardPage() {
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

	if (session?.user.appRole !== "technician") {
		return notFound();
	}

	let services: Service[] = [];
	let payments: Payment[] = [];
	let bookings: Booking[] = [];
	let errorMessage: string | undefined;

	try {
		[services, payments, bookings] = await Promise.all([
			getServicesByTechnicianId(userId),
			getPaymentByTechnicianId(userId),
			getBookingsByTechnicianId(userId),
		]);
	} catch (error) {
		errorMessage =
			error instanceof Error
				? error.message
				: "Unable to load your technician overview.";
	}

	return (
		<div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
			<TechnicianOverview
				technicianName={session.user.name}
				services={services}
				payments={payments}
				bookings={bookings}
				error={errorMessage}
			/>
		</div>
	);
}
