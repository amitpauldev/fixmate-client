import type { Service } from "@/features/services/types/service";
import { ServiceCard } from "./service-card";
import { ServicesEmptyState } from "./services-empty-state";

type ServicesGridProps = {
	services: Service[];
	error?: string;
};

export function ServicesGrid({ services, error }: ServicesGridProps) {
	if (error || services.length === 0) {
		return <ServicesEmptyState error={error} />;
	}

	return (
		<section aria-label="Available repair services">
			<div className="mb-4 flex items-end justify-between">
				<div>
					<p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
						Available now
					</p>
					<h2 className="mt-1 text-xl font-bold text-foreground">
						{services.length} {services.length === 1 ? "service" : "services"}
					</h2>
				</div>
			</div>
			<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{services.map((service) => (
					<ServiceCard key={service._id} service={service} />
				))}
			</div>
		</section>
	);
}
