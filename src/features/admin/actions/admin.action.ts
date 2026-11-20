"use server";

import { revalidatePath } from "next/cache";

export async function updateServiceApproval(
	serviceId: string,
	approvalStatus: "approved" | "rejected",
) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/admin/services/${serviceId}/approval`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ approvalStatus }),
			},
		);

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message || "Failed to update service approval.");
		}

		revalidatePath("/dashboard/admin/services");

		return {
			success: true,
			message: "Service approval status updated successfully.",
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "An error occurred while updating service approval.",
		};
	}
}
