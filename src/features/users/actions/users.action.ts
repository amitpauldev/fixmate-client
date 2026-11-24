"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AppRole = "customer" | "technician" | "admin";

export async function updateUserRole(userId: string, appRole: AppRole) {
	try {
		const requestHeaders = await headers();

		// Verify the current user is an admin
		const session = await auth.api.getSession({
			headers: requestHeaders,
		});

		if (!session || session.user.role !== "admin") {
			return {
				success: false,
				message: "Unauthorized",
			};
		}

		// Map application role to Better Auth role
		const role = appRole === "admin" ? "admin" : "user";

		// Update Better Auth's built-in role
		await auth.api.setRole({
			headers: requestHeaders,
			body: {
				userId,
				role,
			},
		});

		// Update custom appRole
		await auth.api.adminUpdateUser({
			headers: requestHeaders,
			body: {
				userId,
				data: {
					appRole,
				},
			},
		});

		return {
			success: true,
			message: "User role updated successfully",
		};
	} catch (error) {
		console.error("Failed to update user role:", error);

		return {
			success: false,
			message: "Failed to update user role",
		};
	}
}
