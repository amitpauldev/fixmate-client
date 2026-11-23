import {
	getAllBookings,
	getAllPayments,
	getAllServices,
	getAllUsers,
} from "@/features/admin/api/admin.api";
import { AdminOverview } from "@/features/admin/components/overview/admin-overview";
import type { Booking } from "@/features/bookings/types/booking";
import type { Payment } from "@/features/payments/types/types";
import type { Service } from "@/features/services/types/service";
import type { User } from "@/features/users/types/types";
import { authServer } from "@/lib/auth/auth";
import { notFound } from "next/navigation";

export default async function AdminDashboardPage() {
	const session = await authServer();
	const userId = session?.user.id;

	if (!userId) {
		return (
			<main className="px-4 py-8 sm:px-6 lg:px-8">
				<div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
					Please sign in to view the platform overview.
				</div>
			</main>
		);
	}

	if (session?.user.role !== "admin") {
		return notFound();
	}

	let users: User[] = [];
	let services: Service[] = [];
	let bookings: Booking[] = [];
	let payments: Payment[] = [];
	let errorMessage: string | undefined;

	try {
		[users, services, bookings, payments] = await Promise.all([
			getAllUsers(),
			getAllServices(),
			getAllBookings(),
			getAllPayments(),
		]);
	} catch (error) {
		errorMessage =
			error instanceof Error
				? error.message
				: "Unable to load the platform overview.";
	}

	return (
		<main className="px-4 py-8 sm:px-6 lg:px-8">
			<AdminOverview
				adminName={session.user.name}
				users={users}
				services={services}
				bookings={bookings}
				payments={payments}
				error={errorMessage}
			/>
		</main>
	);
}
