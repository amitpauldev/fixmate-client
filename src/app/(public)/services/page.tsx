import { getServices } from "@/lib/api/services";
import type { Service } from "@/features/services/types/service";
import { ServicesFilter } from "@/components/services-public/services-filter";
import { ServicesGrid } from "@/components/services-public/services-grid";
import { ServicesPageHeader } from "@/components/services-public/services-page-header";

export default async function ServicesPage() {
	let services: Service[];
	let error: string | undefined;

	try {
		services = await getServices({});
	} catch {
		services = [];
		error = "The service directory is temporarily unavailable. Please try again shortly.";
	}

	return (
		<>
			<ServicesPageHeader />
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
				<ServicesFilter />
				<div className="mt-8">
					<ServicesGrid services={services} error={error} />
				</div>
			</div>
		</>
	);
}
