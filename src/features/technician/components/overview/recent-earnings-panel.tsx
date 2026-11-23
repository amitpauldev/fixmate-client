import Link from "next/link";
import { ArrowUpRight, ReceiptText } from "lucide-react";
import type { Payment } from "@/features/payments/types/types";

type RecentEarningsPanelProps = {
	payments: Payment[];
};

function formatDate(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Date not set";

	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}

function formatAmount(amount: number, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency.toUpperCase(),
		maximumFractionDigits: 0,
	}).format(amount);
}

export function RecentEarningsPanel({ payments }: RecentEarningsPanelProps) {
	const recentPayments = [...payments]
		.sort(
			(a, b) =>
				new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime(),
		)
		.slice(0, 4);

	return (
		<section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="font-bold text-card-foreground">Recent earnings</h2>
					<p className="mt-1 text-xs text-muted-foreground">
						Jobs customers have paid for
					</p>
				</div>
				<Link
					href="/dashboard/technician/requests"
					className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary"
					aria-label="View recent earnings"
				>
					View jobs
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
						No earnings yet
					</p>
				</div>
			) : (
				<div className="mt-4 grid">
					{recentPayments.map((payment) => (
						<div
							key={payment._id}
							className="flex items-center justify-between gap-4 border-b border-border/60 py-3 last:border-b-0"
						>
							<div className="min-w-0">
								<p className="truncate text-sm font-bold text-card-foreground">
									{payment.serviceTitle}
								</p>
								<p className="mt-1 truncate text-xs text-muted-foreground">
									{payment.customerName}, {formatDate(payment.paidAt)}
								</p>
							</div>
							<p className="shrink-0 text-sm font-bold text-card-foreground">
								{formatAmount(payment.amount, payment.currency)}
							</p>
						</div>
					))}
				</div>
			)}
		</section>
	);
}
