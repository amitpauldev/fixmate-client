"use server";

export async function updateServiceApproval(
	serviceId: string,
	approvalStatus: "approved" | "rejected",
) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/services/${serviceId}/approval`,
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

		return {
			success: true,
			message: "Service approval status updated successfully.",
		};
	} catch (error) {
		return {
			success: false,
			message: "An error occurred while updating service approval.",
		};
	}
}
