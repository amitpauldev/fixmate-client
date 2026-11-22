"use client";

import { useMemo, useState } from "react";
import type { Service } from "@/features/services/types/service";
import type { ServiceQueryParams } from "@/lib/api/services";
import { ServicesFilter } from "./services-filter";
import { ServicesGrid } from "./services-grid";

type ServicesDirectoryProps = {
	services: Service[];
	error?: string;
	defaultValues: {
		category?: string;
		serviceMode?: ServiceQueryParams["serviceMode"];
		sort?: ServiceQueryParams["sort"];
	};
};

export function ServicesDirectory({
	services,
	error,
	defaultValues,
}: ServicesDirectoryProps) {
	const [search, setSearch] = useState("");

	const filteredServices = useMemo(() => {
		const normalizedSearch = search.trim().toLowerCase();

		if (!normalizedSearch) return services;

		return services.filter((service) =>
			[
				service.title,
				service.category,
				service.description,
				service.serviceArea,
				service.technicianName,
			].some((value) => value.toLowerCase().includes(normalizedSearch)),
		);
	}, [search, services]);

	const clearSearch = () => setSearch("");

	return (
		<>
			<ServicesFilter
				defaultValues={defaultValues}
				search={search}
				onSearchChange={setSearch}
				onClearSearch={clearSearch}
			/>
			<div className="mt-8">
				<ServicesGrid services={filteredServices} error={error} />
			</div>
		</>
	);
}
