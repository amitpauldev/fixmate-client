import type { Payment } from "@/features/payments/types/types";

type CustomerPaymentsProps = {
	payments: Payment[];
	error?: string;
};

function formatAmount(amount: number, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency.toUpperCase(),
		maximumFractionDigits: 0,
	}).format(amount);
}

function formatPaidDate(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "N/A";

	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(date);
}

export function CustomerPayments({ payments, error }: CustomerPaymentsProps) {
	const total = payments.reduce((sum, payment) => sum + payment.amount, 0);
	const currency = payments[0]?.currency || "USD";

	return (
		<div>
			<h1 className="text-3xl font-bold tracking-tight text-foreground">
				Payment history
			</h1>
			<p className="mt-2 text-sm font-medium text-muted-foreground">
				{payments.length} {payments.length === 1 ? "payment" : "payments"},{" "}
				{formatAmount(total, currency)} in total.
			</p>

			{error ? (
				<div className="mt-6 rounded-2xl border border-destructive/25 bg-destructive/5 p-6 text-sm text-destructive">
					{error}
				</div>
			) : payments.length === 0 ? (
				<div className="mt-6 rounded-2xl border border-border bg-card p-10 text-center">
					<p className="text-base font-bold text-card-foreground">
						No payments found
					</p>
					<p className="mt-2 text-sm text-muted-foreground">
						Your completed payments will appear here.
					</p>
				</div>
			) : (
				<>
					<div className="mt-6 hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
						<table className="w-full table-fixed border-collapse text-left">
							<thead>
								<tr className="border-b border-border text-sm font-bold text-secondary">
									<th className="w-[38%] px-4 py-3.5">Service</th>
									<th className="w-[16%] px-4 py-3.5">Technician</th>
									<th className="w-[10%] px-4 py-3.5">Amount</th>
									<th className="w-[20%] px-4 py-3.5">Transaction ID</th>
									<th className="w-[16%] px-4 py-3.5">Paid on</th>
								</tr>
							</thead>
							<tbody>
								{payments.map((payment) => (
									<tr
										key={payment._id}
										className="border-b border-border/60 text-sm last:border-b-0"
									>
										<td className="px-4 py-3.5 font-bold text-foreground">
											{payment.serviceTitle}
										</td>
										<td className="px-4 py-3.5 text-primary-muted">
											{payment.technicianName}
										</td>
										<td className="px-4 py-3.5 font-bold text-card-foreground">
											{formatAmount(payment.amount, payment.currency)}
										</td>
										<td className="break-all px-4 py-3.5 text-xs text-muted-foreground">
											{payment.transactionId || payment.stripeSessionId}
										</td>
										<td className="px-4 py-3.5 text-card-foreground">
											{formatPaidDate(payment.paidAt)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="mt-6 grid gap-3 md:hidden">
						{payments.map((payment) => (
							<article
								key={payment._id}
								className="rounded-2xl border border-border bg-card p-4"
							>
								<div className="flex items-start justify-between gap-4">
									<h2 className="font-bold text-primary">
										{payment.serviceTitle}
									</h2>
									<p className="shrink-0 font-bold text-card-foreground">
										{formatAmount(payment.amount, payment.currency)}
									</p>
								</div>
								<dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
									<div>
										<dt className="text-muted-foreground">Technician</dt>
										<dd className="mt-1 text-primary">
											{payment.technicianName}
										</dd>
									</div>
									<div>
										<dt className="text-muted-foreground">Paid on</dt>
										<dd className="mt-1 text-card-foreground">
											{formatPaidDate(payment.paidAt)}
										</dd>
									</div>
									<div className="col-span-2">
										<dt className="text-muted-foreground">Transaction ID</dt>
										<dd className="mt-1 break-all text-xs text-muted-foreground">
											{payment.transactionId || payment.stripeSessionId}
										</dd>
									</div>
								</dl>
							</article>
						))}
					</div>
				</>
			)}
		</div>
	);
}
