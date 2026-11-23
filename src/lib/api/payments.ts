import { Payment } from "@/features/payments/types/types";

export async function getPaymentByCustomerId(
	customerId: string,
): Promise<Payment[]> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/payments?customerId=${customerId}`,
			{
				cache: "no-store",
			},
		);
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error("Error fetching payments by customer ID:", error);
		throw error;
	}
}

export async function getPaymentByTechnicianId(
	technicianId: string,
): Promise<Payment[]> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/payments?technicianId=${technicianId}`,
			{
				cache: "no-store",
			},
		);
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error("Error fetching payments by technician ID:", error);
		throw error;
	}
}
