import { getAllUsers } from "@/features/admin/api/admin.api";
import { AllUsers } from "@/features/admin/components/all-users/all-users";
import type { User } from "@/features/users/types/types";
import { authServer } from "@/lib/auth/auth";
import { notFound } from "next/navigation";

export default async function AdminUsersPage() {
	const session = await authServer();
	const userId = session?.user.id;

	if (!userId) {
		return (
			<main className="px-4 py-8 sm:px-6 lg:px-8">
				<div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
					Please sign in to manage users.
				</div>
			</main>
		);
	}

	if (session?.user.role !== "admin") {
		return notFound();
	}

	let allUsers: User[] = [];
	let errorMessage: string | undefined;

	try {
		allUsers = await getAllUsers();
	} catch (error) {
		errorMessage =
			error instanceof Error ? error.message : "Unable to load users.";
	}

	return (
		<main className="px-4 py-8 sm:px-6 lg:px-8">
			<AllUsers
				users={allUsers}
				error={errorMessage}
				currentUserId={userId}
			/>
		</main>
	);
}
