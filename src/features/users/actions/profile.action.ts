"use server";

import { uploadToImgBB } from "@/lib/utils/upload-to-imgbb";

export type ProfileImageResult = {
	success: boolean;
	imageUrl?: string;
	message: string;
};

export async function uploadProfileImage(
	file: File,
): Promise<ProfileImageResult> {
	if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
		return {
			success: false,
			message: "Choose a JPG, PNG, or WebP image.",
		};
	}

	if (file.size > 8 * 1024 * 1024) {
		return {
			success: false,
			message: "Choose an image smaller than 8 MB.",
		};
	}

	try {
		const imageUrl = await uploadToImgBB(file);
		return {
			success: true,
			imageUrl,
			message: "Photo uploaded successfully.",
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Unable to upload photo.",
		};
	}
}
