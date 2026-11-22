import { Booking } from "@/features/bookings/types/booking";

export async function getBookingsByCustomerId(
	customerId: string,
): Promise<Booking[]> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/bookings?customerId=${customerId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error("Error fetching bookings by customer ID:", error);
		throw error;
	}
}
