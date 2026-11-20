import type { Service } from "@/features/services/types/service";
import type { ApiResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServices(): Promise<Service[]> {
	const response = await fetch(`${API_URL}/api/services`, {
		cache: "no-store",
	});

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
