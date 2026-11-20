import { headers } from "next/headers";
import Link from "next/link";
import { Plus } from "lucide-react";
import { MyServicesList } from "@/features/services/components/my-services-list";
import type { Service } from "@/features/services/types/service";
import { getServices, getServicesByTechnicianId } from "@/lib/api/services";
import { auth } from "@/lib/auth/auth";

export default async function MyServicesPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const userId = session?.user.id;

	let services: Service[] = [];
	let errorMessage = userId
		? undefined
		: "Your session could not be loaded. Please sign in again.";

	if (userId) {
		try {
			const technicianServices = await getServicesByTechnicianId(userId);
			services = technicianServices;
		} catch (error) {
			errorMessage =
				error instanceof Error
					? error.message
					: "Unable to load your services.";
		}
	}

	return (
		<div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
			<header className="mb-8 flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary">
						Technician workspace
					</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
						My services
					</h1>
					<p className="mt-2 max-w-xl text-sm text-muted-foreground">
						Manage the repair services customers can discover and book.
					</p>
				</div>
				<Link
					href="/dashboard/technician/add-service"
					className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-secondary px-5 text-sm font-bold text-secondary-foreground shadow-sm transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<Plus className="size-4" aria-hidden="true" />
					Add a service
				</Link>
			</header>
			<MyServicesList services={services} error={errorMessage} />
		</div>
	);
}
