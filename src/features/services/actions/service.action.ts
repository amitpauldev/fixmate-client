"use server";

import { apiClient } from "@/lib/api/api-client";
import { ServiceFormValues } from "../types/service";
import { uploadToImgBB } from "@/lib/utils/upload-to-imgbb";

export async function addService(
	values: ServiceFormValues,
	imageFile?: File | null,
) {
	if (imageFile?.size) {
		try {
			const imageUrl = await uploadToImgBB(imageFile);
			values.image = imageUrl;
		} catch (error) {
			return {
				success: false,
				message: error instanceof Error ? error.message : "Image upload failed",
			};
		}
	}
	console.log("Service values before API call:", values); // Debugging line

	try {
		const response = await apiClient("/services", {
			method: "POST",
			body: JSON.stringify(values),
		});

		const data = await response.json();

		return {
			success: true,
			message: data.message || "Service added successfully",
		};
	} catch {
		return {
			success: false,
			message: "Failed to add service",
		};
	}
}
