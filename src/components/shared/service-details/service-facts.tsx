import type { Service } from "@/features/services/types/service";

type ServiceFactsProps = {
	category: Service["category"];
	estimatedDuration: string;
	serviceMode: Service["serviceMode"];
	serviceArea: string;
};

export function ServiceFacts({
	category,
	estimatedDuration,
	serviceMode,
	serviceArea,
}: ServiceFactsProps) {
	const facts = [
		{ label: "Category", value: category },
		{ label: "Estimated time", value: estimatedDuration },
		{ label: "Service type", value: serviceMode },
		{ label: "Area covered", value: serviceArea },
	];

	return (
		<dl className="grid overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-2 lg:grid-cols-4">
			{facts.map((fact, index) => (
				<div
					key={fact.label}
					className={`px-5 py-4 sm:px-6 ${
						index > 0 ? "border-t border-border sm:border-t-0" : ""
					} ${index % 2 === 1 ? "sm:border-l sm:border-border" : ""} ${
						index >= 2 ? "lg:border-t-0" : ""
					} ${index > 0 ? "lg:border-l lg:border-border" : ""}`}
				>
					<dt className="text-xs font-medium text-muted-foreground">
						{fact.label}
					</dt>
					<dd className="mt-1 text-sm font-bold text-card-foreground">
						{fact.value}
					</dd>
				</div>
			))}
		</dl>
	);
}
