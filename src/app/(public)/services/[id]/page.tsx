import { getServiceById } from "@/lib/api/services";
import { getAuthUserById } from "@/lib/auth/auth";
import { notFound } from "next/navigation";
import { ServiceDetailsBreadcrumb } from "@/components/shared/service-details/service-details-breadcrumb";
import { ServiceHero } from "@/components/shared/service-details/service-hero";
import { ServicePricingCard } from "@/components/shared/service-details/service-pricing-card";
import { TechnicianCard } from "@/components/shared/service-details/technician-card";
import { ServiceFacts } from "@/components/shared/service-details/service-facts";

export default async function ServiceDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	let service: Awaited<ReturnType<typeof getServiceById>> = null;

	try {
		service = await getServiceById(id);
	} catch {
		notFound();
	}

	if (!service) {
		notFound();
	}

	let technician: Awaited<ReturnType<typeof getAuthUserById>> = null;

	try {
		technician = await getAuthUserById(service.technicianId);
	} catch {
		technician = null;
	}
	const technicianName =
		technician?.name?.trim() || service.technicianName || "FixMate technician";

	return (
		<div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
			<ServiceDetailsBreadcrumb category={service.category} />

			<div className="mx-auto mt-6 grid max-w-7xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
				<div className="min-w-0">
					<ServiceHero title={service.title} image={service.image} />

					<div className="mt-8">
						<h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							{service.title}
						</h1>
						<p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
							{service.description}
						</p>
					</div>
					<div className="mt-8">
						<ServiceFacts
							category={service.category}
							estimatedDuration={service.estimatedDuration}
							serviceMode={service.serviceMode}
							serviceArea={service.serviceArea}
						/>
					</div>
				</div>

				<aside className="grid gap-5 lg:sticky lg:top-24">
					<ServicePricingCard basePrice={service.basePrice} />
					<TechnicianCard
						name={technicianName}
						image={technician?.image ?? null}
						location={service.serviceArea}
					/>
				</aside>
			</div>
		</div>
	);
}
