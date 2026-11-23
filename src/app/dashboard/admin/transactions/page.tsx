import { getAllPayments } from "@/features/admin/api/admin.api";
import { AdminTransactions } from "@/features/admin/components/transactions/admin-transactions";
import type { Payment } from "@/features/payments/types/types";
import { authServer } from "@/lib/auth/auth";
import { notFound } from "next/navigation";

export default async function AdminTransactionsPage() {
	const session = await authServer();
	const userId = session?.user.id;

	if (!userId) {
		return (
			<main className="px-4 py-8 sm:px-6 lg:px-8">
				<div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
					Please sign in to view transactions.
				</div>
			</main>
		);
	}

	if (session?.user.role !== "admin") {
		return notFound();
	}

	let payments: Payment[] = [];
	let errorMessage: string | undefined;

	try {
		payments = await getAllPayments();
	} catch (error) {
		errorMessage =
			error instanceof Error ? error.message : "Unable to load transactions.";
	}

	return (
		<main className="px-4 py-8 sm:px-6 lg:px-8">
			<AdminTransactions payments={payments} error={errorMessage} />
		</main>
	);
}
