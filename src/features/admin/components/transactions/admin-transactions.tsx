"use client";

import { useMemo, useState } from "react";
import { BadgeDollarSign, CircleDollarSign, Search, WalletCards } from "lucide-react";
import type { Payment } from "@/features/payments/types/types";
import { TransactionStatCard } from "./transaction-stat-card";
import { TransactionCard } from "./transaction-card";

type AdminTransactionsProps = {
	payments: Payment[];
	error?: string;
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

export function AdminTransactions({
	payments,
	error,
}: AdminTransactionsProps) {
	const [search, setSearch] = useState("");

	const totalRevenue = payments.reduce(
		(sum, payment) => sum + payment.amount,
		0,
	);
	const currency = payments[0]?.currency || "USD";
	const averagePayment =
		payments.length === 0 ? 0 : totalRevenue / payments.length;

	const visiblePayments = useMemo(() => {
		const query = search.trim().toLowerCase();

		return [...payments]
			.filter((payment) => {
				if (!query) return true;
				return [
					payment.customerName,
					payment.customerEmail,
					payment.technicianName,
					payment.serviceTitle,
					payment.transactionId,
					payment.stripeSessionId,
				].some((value) => value.toLowerCase().includes(query));
			})
			.sort(
				(a, b) =>
					new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime(),
			);
	}, [payments, search]);

	return (
		<div>
			<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<h1 className="text-3xl font-extrabold tracking-tight text-primary">
						Transactions
					</h1>
					<p className="mt-2 text-sm font-medium text-muted-foreground">
						All Stripe payment records across FixMate.
					</p>
				</div>

				<label className="relative block w-full lg:w-72">
					<span className="sr-only">Search transactions</span>
					<Search
						className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
						aria-hidden="true"
					/>
					<input
						type="search"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search transactions"
						className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm text-card-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
					/>
				</label>
			</div>

			{error ? (
				<div className="mt-6 rounded-2xl border border-destructive/25 bg-destructive/5 p-6 text-sm text-destructive">
					{error}
				</div>
			) : (
				<>
					<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
						<TransactionStatCard
							label="Total revenue"
							value={formatAmount(totalRevenue, currency)}
							detail="Completed Stripe payments"
							icon={CircleDollarSign}
							featured
						/>
						<TransactionStatCard
							label="Payments"
							value={payments.length}
							detail={`${payments.filter((payment) => payment.paymentStatus === "paid").length} confirmed payments`}
							icon={WalletCards}
						/>
						<TransactionStatCard
							label="Average payment"
							value={formatAmount(averagePayment, currency)}
							detail="Average across all transactions"
							icon={BadgeDollarSign}
						/>
					</div>

					{visiblePayments.length === 0 ? (
						<div className="mt-6 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
							<WalletCards
								className="mx-auto size-9 text-muted-foreground"
								aria-hidden="true"
							/>
							<h2 className="mt-4 text-lg font-bold text-foreground">
								No transactions found
							</h2>
							<p className="mt-1 text-sm text-muted-foreground">
								Try another customer, service or transaction ID.
							</p>
						</div>
					) : (
						<>
							<div className="mt-6 hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-sm md:block">
								<table className="w-full min-w-[980px] border-collapse">
									<thead>
										<tr className="border-b border-border text-left text-sm font-bold text-secondary">
											<th className="px-5 py-4">Customer</th>
											<th className="px-4 py-4">Technician</th>
											<th className="px-4 py-4">Service</th>
											<th className="px-4 py-4">Amount</th>
											<th className="px-4 py-4">Transaction ID</th>
											<th className="px-5 py-4 text-right">Date</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-border">
										{visiblePayments.map((payment) => (
											<tr
												key={payment._id}
												className="transition-colors hover:bg-accent/30"
											>
												<td className="px-5 py-4">
													<p className="text-sm font-bold text-primary">
														{payment.customerName}
													</p>
													<p className="mt-1 text-xs text-muted-foreground">
														{payment.customerEmail}
													</p>
												</td>
												<td className="px-4 py-4 text-sm font-semibold text-card-foreground">
													{payment.technicianName}
												</td>
												<td className="max-w-64 px-4 py-4">
													<p className="truncate text-sm font-semibold text-card-foreground">
														{payment.serviceTitle}
													</p>
												</td>
												<td className="px-4 py-4 text-sm font-bold text-card-foreground">
													{formatAmount(payment.amount, payment.currency)}
												</td>
												<td className="max-w-44 px-4 py-4 text-xs text-muted-foreground">
													<p className="truncate" title={payment.transactionId || payment.stripeSessionId}>
														{payment.transactionId || payment.stripeSessionId}
													</p>
												</td>
												<td className="px-5 py-4 text-right text-sm text-muted-foreground">
													{formatDate(payment.paidAt)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className="mt-6 grid gap-3 md:hidden">
								{visiblePayments.map((payment) => (
									<TransactionCard key={payment._id} payment={payment} />
								))}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
