import { ReceiptText } from "lucide-react";
import type { Payment } from "@/features/payments/types/types";

type TransactionCardProps = {
	payment: Payment;
};

function formatDate(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Not set";

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

export function TransactionCard({ payment }: TransactionCardProps) {
	return (
		<article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
			<div className="flex items-start justify-between gap-4">
				<div className="flex min-w-0 items-start gap-3">
					<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
						<ReceiptText className="size-5" aria-hidden="true" />
					</span>
					<div className="min-w-0">
						<p className="truncate font-bold text-card-foreground">
							{payment.serviceTitle}
						</p>
						<p className="mt-1 text-xs text-muted-foreground">
							Paid {formatDate(payment.paidAt)}
						</p>
					</div>
				</div>
				<p className="shrink-0 text-sm font-bold text-card-foreground">
					{formatAmount(payment.amount, payment.currency)}
				</p>
			</div>

			<div className="mt-4 grid grid-cols-2 gap-3 border-t border-dashed border-border pt-4 text-sm">
				<div>
					<p className="text-xs text-muted-foreground">Customer</p>
					<p className="mt-1 truncate font-semibold text-primary">
						{payment.customerName}
					</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Technician</p>
					<p className="mt-1 truncate font-semibold text-primary">
						{payment.technicianName}
					</p>
				</div>
				<div className="col-span-2">
					<p className="text-xs text-muted-foreground">Transaction ID</p>
					<p className="mt-1 break-all text-xs text-muted-foreground">
						{payment.transactionId || payment.stripeSessionId}
					</p>
				</div>
			</div>
		</article>
	);
}
