import Link from "next/link";
import { ArrowUpRight, ReceiptText } from "lucide-react";
import type { Payment } from "@/features/payments/types/types";

type RecentRevenuePanelProps = {
	payments: Payment[];
};

function formatAmount(amount: number, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency.toUpperCase(),
		maximumFractionDigits: 0,
	}).format(amount);
}

export function RecentRevenuePanel({ payments }: RecentRevenuePanelProps) {
	const recentPayments = [...payments]
		.sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime())
		.slice(0, 4);

	return (
		<section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
			<div className="flex items-center justify-between">
				<h2 className="font-bold text-card-foreground">Recent revenue</h2>
				<Link
					href="/dashboard/admin/transactions"
					className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary"
				>
					Transactions
					<ArrowUpRight className="size-4" aria-hidden="true" />
				</Link>
			</div>

			{recentPayments.length === 0 ? (
				<div className="mt-5 flex min-h-28 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center">
					<ReceiptText
						className="size-6 text-muted-foreground"
						aria-hidden="true"
					/>
					<p className="mt-2 text-sm text-muted-foreground">
						No payment activity yet
					</p>
				</div>
			) : (
				<div className="mt-4 grid">
					{recentPayments.map((payment) => (
						<div
							key={payment._id}
							className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-border/60 py-3 last:border-b-0"
						>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-bold text-card-foreground">
									{payment.serviceTitle}
								</p>
								<p className="mt-1 truncate text-xs text-muted-foreground">
									{payment.customerName}
								</p>
							</div>
							<p className="shrink-0 text-sm font-bold text-status-completed">
								{formatAmount(payment.amount, payment.currency)}
							</p>
						</div>
					))}
				</div>
			)}
		</section>
	);
}
