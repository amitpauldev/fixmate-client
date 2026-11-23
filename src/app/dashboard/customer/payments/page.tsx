import { getPaymentByCustomerId } from "@/lib/api/payments";
import { authServer } from "@/lib/auth/auth";
import type { Payment } from "@/features/payments/types/types";
import { notFound } from "next/navigation";
import { CustomerPayments } from "@/features/customer/components/customer-payments";

export default async function CustomerPaymentsPage() {
	const session = await authServer();
	const customerId = session?.user.id;

	if (!customerId) {
		return (
			<div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
				<div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
					Please sign in to view your payment history.
				</div>
			</div>
		);
	}

	if (session?.user.role !== "customer") {
		return notFound();
	}

	let customerPayments: Payment[] = [];
	let errorMessage: string | undefined;

	try {
		customerPayments = await getPaymentByCustomerId(customerId);
	} catch (error) {
		errorMessage =
			error instanceof Error
				? error.message
				: "Unable to load your payment history.";
	}

	return (
		<div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
			<CustomerPayments payments={customerPayments} error={errorMessage} />
		</div>
	);
}
