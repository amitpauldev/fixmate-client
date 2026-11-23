import { Booking } from "@/features/bookings/types/booking";
import { Payment } from "@/features/payments/types/types";
import { Service } from "@/features/services/types/service";

export async function getAllServices(): Promise<Service[]> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/admin/services`,
			{
				cache: "no-store",
			},
		);
		const result = await res.json();
		if (!res.ok) {
			throw new Error(result.message || "Failed to fetch all services.");
		}
		return result.data;
	} catch (error) {
		console.error("Error fetching all services:", error);
		throw new Error("Failed to fetch all services.");
	}
}

export async function getAllBookings(): Promise<Booking[]> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`,
			{
				cache: "no-store",
			},
		);
		const result = await res.json();
		if (!res.ok) {
			throw new Error(result.message || "Failed to fetch all bookings.");
		}
		return result.data;
	} catch (error) {
		console.error("Error fetching all bookings:", error);
		throw new Error("Failed to fetch all bookings.");
	}
}

export async function getAllPayments(): Promise<Payment[]> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/admin/payments`,
			{
				cache: "no-store",
			},
		);
		const result = await res.json();
		if (!res.ok) {
			throw new Error(result.message || "Failed to fetch all payments.");
		}
		return result.data;
	} catch (error) {
		console.error("Error fetching all payments:", error);
		throw new Error("Failed to fetch all payments.");
	}
}
