import type { Service } from "@/features/services/types/service";
import type { ApiResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ServiceQueryParams = {
	category?: string;
	serviceMode?: "Home Visit" | "Shop Drop-off";
	sort?: "newest" | "price-low" | "price-high";
};

export async function getServices(
	params: ServiceQueryParams = {},
): Promise<Service[]> {
	const searchParams = new URLSearchParams();
	const category = params.category?.trim();

	if (category) searchParams.set("category", category);
	if (params.serviceMode) searchParams.set("serviceMode", params.serviceMode);
	if (params.sort) searchParams.set("sort", params.sort);

	const query = searchParams.toString();
	const response = await fetch(
		`${API_URL}/api/services${query ? `?${query}` : ""}`,
		{
			cache: "no-store",
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch services");
	}

	const result: ApiResponse<Service[]> = await response.json();

	return result.data;
}

export async function getServicesByTechnicianId(
	technicianId: string,
): Promise<Service[]> {
	const response = await fetch(
		`${API_URL}/api/services/technician/${technicianId}`,
		{
			cache: "no-store",
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch services");
	}

	const result: ApiResponse<Service[]> = await response.json();

	return result.data;
}

export async function getServiceById(id: string): Promise<Service | null> {
	const response = await fetch(`${API_URL}/api/services/${id}`, {
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch service");
	}

	const result: ApiResponse<Service> = await response.json();

	return result.data;
}
