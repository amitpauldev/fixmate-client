"use server";

import type { ServiceFormValues } from "../types/service";
import { uploadToImgBB } from "@/lib/utils/upload-to-imgbb";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type AddServiceResult = {
	success: boolean;
	message: string;
};

// Add service function
export async function addService(
	values: ServiceFormValues,
	imageFile?: File | null,
): Promise<AddServiceResult> {
	if (imageFile?.size) {
		if (
			!ALLOWED_IMAGE_TYPES.has(imageFile.type) ||
			imageFile.size > MAX_IMAGE_SIZE
		) {
			return {
				success: false,
				message: "Choose a JPG, PNG, or WebP image up to 8 MB.",
			};
		}

		try {
			const imageUrl = await uploadToImgBB(imageFile);
			values = { ...values, image: imageUrl };

			console.log("Image uploaded successfully:", imageUrl);
		} catch (error) {
			return {
				success: false,
				message: error instanceof Error ? error.message : "Image upload failed",
			};
		}
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/services`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			},
		);

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

// Update service function
export async function updateService(
	id: string,
	values: ServiceFormValues,
	imageFile?: File | null,
): Promise<AddServiceResult> {
	if (imageFile?.size) {
		if (
			!ALLOWED_IMAGE_TYPES.has(imageFile.type) ||
			imageFile.size > MAX_IMAGE_SIZE
		) {
			return {
				success: false,
				message: "Choose a JPG, PNG, or WebP image up to 8 MB.",
			};
		}

		try {
			const imageUrl = await uploadToImgBB(imageFile);
			values = { ...values, image: imageUrl };

			console.log("Image uploaded successfully:", imageUrl);
		} catch (error) {
			return {
				success: false,
				message: error instanceof Error ? error.message : "Image upload failed",
			};
		}
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			},
		);

		const data = await response.json();

		return {
			success: true,
			message: data.message || "Service updated successfully",
		};
	} catch {
		return {
			success: false,
			message: "Failed to update service",
		};
	}
}

export async function deleteService(id: string): Promise<AddServiceResult> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
			{
				method: "DELETE",
			},
		);
		const data = await response.json();

		return {
			success: true,
			message: data.message || "Service deleted successfully",
		};
	} catch {
		return {
			success: false,
			message: "Failed to delete service",
		};
	}
}
