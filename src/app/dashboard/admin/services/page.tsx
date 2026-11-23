import { getAllServices } from "@/features/admin/api/admin.api";
import { ServiceApprovalList } from "@/features/admin/components/service-approve/service-approval-list";
import type { Service } from "@/features/services/types/service";

export default async function AdminServicesPage() {
	let services: Service[] = [];
	let error: string | null = null;

	try {
		services = await getAllServices();
	} catch (caughtError) {
		error =
			caughtError instanceof Error
				? caughtError.message
				: "Failed to load services.";
	}

	return (
		<main className="px-4 py-8 sm:px-6 lg:px-8">
			{error ? (
				<div className="rounded-2xl border border-status-rejected/30 bg-status-rejected/10 p-5 text-sm font-semibold text-status-rejected">
					{error}
				</div>
			) : (
				<ServiceApprovalList services={services} />
			)}
		</main>
	);
}
