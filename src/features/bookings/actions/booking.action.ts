"use server";

import { Booking, BookingFormValues, BookingStatus } from "../types/booking";
import { revalidatePath } from "next/cache";

type BookingServiceResult = {
	success: boolean;
	data: Booking | null;
	message: string;
};

export async function createBooking(
	bookingData: BookingFormValues,
): Promise<BookingServiceResult> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bookingData),
			},
		);
		if (!response.ok) {
			throw new Error(`Failed to create booking: ${response.statusText}`);
		}
		const data = await response.json();
		return {
			success: true,
			data: data.data as Booking,
			message: data.message || "Booking created successfully",
		};
	} catch (error) {
		return {
			success: false,
			data: null,
			message: "Failed to create booking",
		};
	}
}

export async function cancelBooking(
	bookingId: string,
): Promise<BookingServiceResult> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}/cancel`,
			{
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ bookingId }),
			},
		);

		if (!response.ok) {
			throw new Error(`Failed to cancel booking: ${response.statusText}`);
		}

		const data = await response.json();

		return {
			success: true,
			data: null,
			message: data.message || "Booking canceled successfully",
		};
	} catch (error) {
		return {
			success: false,
			data: null,
			message: "Failed to cancel booking",
		};
	}
}

export async function updateBookingStatus(
	bookingId: string,
	status: BookingStatus,
): Promise<BookingServiceResult> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}/status`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status }),
			},
		);

		if (!response.ok) {
			throw new Error(
				`Failed to update booking status: ${response.statusText}`,
			);
		}

		const data = await response.json();

		revalidatePath("/dashboard/technician/requests");
		revalidatePath("/dashboard/customer/bookings");
		return {
			success: true,
			data: null,
			message: data.message || "Booking status updated successfully",
		};
	} catch (error) {
		return {
			success: false,
			data: null,
			message: "Failed to update booking status",
		};
	}
}

export async function addFinalAmount(
	bookingId: string,
	finalAmount: number,
): Promise<BookingServiceResult> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}/final-amount`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ finalAmount }),
			},
		);
		if (!response.ok) {
			throw new Error(`Failed to add final amount: ${response.statusText}`);
		}
		const data = await response.json();
		revalidatePath("/dashboard/technician/requests");
		revalidatePath("/dashboard/customer/bookings");
		return {
			success: true,
			data: data.data as Booking,
			message: data.message || "Final amount added successfully",
		};
	} catch (error) {
		return {
			success: false,
			data: null,
			message: "Failed to add final amount",
		};
	}
}
