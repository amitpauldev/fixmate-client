import { getServices } from "@/lib/api/services";
import type { Service } from "@/features/services/types/service";
import { ServicesPageHeader } from "@/components/services-public/services-page-header";
import { ServicesDirectory } from "@/components/services-public/services-directory";
import type { ServiceQueryParams } from "@/lib/api/services";
import { serviceCategories, serviceModes } from "@/features/services/schemas/service-form";

type ServicesPageProps = {
	searchParams: Promise<{
		category?: string | string[];
		serviceMode?: string | string[];
		sort?: string | string[];
	}>;
};

function getScalarParam(value: string | string[] | undefined) {
	return typeof value === "string" ? value : undefined;
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
	const params = await searchParams;
	const categoryParam = getScalarParam(params.category);
	const serviceModeParam = getScalarParam(params.serviceMode);
	const sortParam = getScalarParam(params.sort);

	const category = serviceCategories.includes(
		categoryParam as (typeof serviceCategories)[number],
	)
		? (categoryParam as (typeof serviceCategories)[number])
		: undefined;
	const serviceMode = serviceModes.includes(
		serviceModeParam as (typeof serviceModes)[number],
	)
		? (serviceModeParam as ServiceQueryParams["serviceMode"])
		: undefined;
	const sort = ["newest", "price-low", "price-high"].includes(sortParam || "")
		? (sortParam as ServiceQueryParams["sort"])
		: "newest";

	let services: Service[];
	let error: string | undefined;

	try {
		services = await getServices({ category, serviceMode, sort });
	} catch {
		services = [];
		error = "The service directory is temporarily unavailable. Please try again shortly.";
	}

	return (
		<>
			<ServicesPageHeader />
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
				<ServicesDirectory
					services={services}
					error={error}
					defaultValues={{ category, serviceMode, sort }}
				/>
			</div>
		</>
	);
}
