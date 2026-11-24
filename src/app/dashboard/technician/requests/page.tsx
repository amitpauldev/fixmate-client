import { getBookingsByTechnicianId } from "@/lib/api/booking";
import { authServer } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import type { Booking } from "@/features/bookings/types/booking";
import { TechnicianRequestList } from "@/features/technician/components/manage-request/technician-request-list";

export default async function TechnicianRequestsPage() {
	const session = await authServer();
	if (session?.user?.appRole !== "technician") {
		return redirect("/dashboard");
	}

	const technicianId = session?.user?.id;

	let bookings: Booking[] = [];
	let errorMessage: string | undefined;

	try {
		bookings = await getBookingsByTechnicianId(technicianId);
	} catch (error) {
		errorMessage =
			error instanceof Error ? error.message : "Unable to load your requests.";
	}

	return (
		<div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
			<TechnicianRequestList bookings={bookings} error={errorMessage} />
		</div>
	);
}
